import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as reports from "./reports.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-91daaa27/health", (c) => {
  return c.json({
    status: "ok",
    version: "2.0-locker-size-fix",
    timestamp: new Date().toISOString()
  });
});

// Create Stripe checkout session
app.post("/make-server-91daaa27/create-checkout-session", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      orderId, 
      lockerSize, 
      dropOffDate, 
      dropOffTime, 
      pickUpDate, 
      pickUpTime,
      durationDays,
      durationHours,
      totalPrice,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      priorityAccess,
      latesurance,
      promoCode,
      promoDiscount,
      originalPrice
    } = body;

    console.log('Create checkout session request:', {
      orderId,
      lockerSize,
      totalPrice,
      currency,
      promoCode,
      promoDiscount,
      originalPrice,
      latesurance
    });

    // Validate required fields
    if (!orderId || !totalPrice || !customerEmail) {
      console.error('Missing required fields:', { orderId: !!orderId, totalPrice: !!totalPrice, customerEmail: !!customerEmail });
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Validate totalPrice is a positive number
    if (isNaN(totalPrice) || totalPrice <= 0) {
      console.error('Invalid totalPrice:', totalPrice);
      return c.json({ error: `Invalid total price: ${totalPrice}` }, 400);
    }

    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('Stripe secret key not configured');
      return c.json({ error: "Payment system not configured" }, 500);
    }

    // Store order in KV store
    await kv.set(`order:${orderId}`, {
      orderId,
      lockerSize,
      dropOffDate,
      dropOffTime,
      pickUpDate,
      pickUpTime,
      durationDays,
      durationHours,
      totalPrice,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      priorityAccess: priorityAccess || false,
      latesurance: latesurance || false,
      promoCode: promoCode || null,
      promoDiscount: promoDiscount || 0,
      originalPrice: originalPrice || totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    // Create Stripe checkout session
    const stripe = await import('npm:stripe@17.5.0').then(m => new m.default(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    }));

    // Convert price to smallest currency unit (cents for CZK/EUR)
    const amountInCents = Math.round(totalPrice * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Luggage Storage - Locker ${lockerSize}`,
              description: `${durationDays} days, ${durationHours} hours | ${dropOffDate} ${dropOffTime} - ${pickUpDate} ${pickUpTime}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${c.req.header('origin') || 'https://luggagestoragebrno.cz'}?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${c.req.header('origin') || 'https://luggagestoragebrno.cz'}?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        orderId,
        lockerSize,
        dropOffDate,
        dropOffTime,
        pickUpDate,
        pickUpTime,
        customerName,
        customerPhone
      }
    });

    return c.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return c.json({ 
      error: "Failed to create checkout session",
      details: error.message 
    }, 500);
  }
});

// Stripe webhook handler - This processes payments even if customer closes browser
app.post("/make-server-91daaa27/stripe-webhook", async (c) => {
  console.log('🔔 Stripe webhook received');
  
  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('❌ STRIPE_SECRET_KEY not configured');
      return c.json({ error: "Payment system not configured" }, 500);
    }

    const stripe = await import('npm:stripe@17.5.0').then(m => new m.default(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    }));

    const body = await c.req.text();
    const sig = c.req.header('stripe-signature');

    // Note: For production, you should verify the webhook signature
    // For now, we'll parse the event directly
    let event;
    try {
      event = JSON.parse(body);
      console.log('📦 Webhook event type:', event.type);
    } catch (err) {
      console.error('❌ Webhook body parsing failed:', err);
      return c.json({ error: 'Invalid payload' }, 400);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('💳 Payment completed for session:', session.id);
      console.log('📋 Session metadata:', session.metadata);

      const orderId = session.metadata?.orderId;
      
      if (!orderId) {
        console.error('❌ No orderId in session metadata');
        return c.json({ error: 'Missing orderId' }, 400);
      }

      // Fetch order from KV store
      const order = await kv.get(`order:${orderId}`);
      console.log('📋 Order fetched:', {
        exists: !!order,
        orderId: order?.orderId,
        status: order?.status
      });

      if (!order) {
        console.error('❌ Order not found:', orderId);
        return c.json({ error: 'Order not found' }, 404);
      }

      // Check if already processed to avoid duplicate processing
      if (order.status === 'paid' && order.lockerNum) {
        console.log('⚠️ Order already processed with locker assignment, skipping');
        return c.json({ received: true, status: 'already_processed' });
      }

      // Submit order to kiosk webhook to get locker assignment
      console.log('🔐 [WEBHOOK] Submitting order to kiosk webhook for locker assignment...');
      let lockerAssignment = null;
      
      try {
        const WEBHOOK_URL = "https://unheroical-nonunderstandable-tessa.ngrok-free.dev/webhook/order";
        const WEBHOOK_SECRET = "lsb-webhook-2026";

        // Map locker size to the format expected by webhook
        const lockerTypeMap = {
          'S': 'small',
          'M': 'medium',
          'L': 'large'
        };

        const mappedLockerType = lockerTypeMap[order.lockerSize];
        console.log('🔍 [WEBHOOK] Locker size mapping DEBUG:', {
          rawLockerSize: order.lockerSize,
          lockerSizeType: typeof order.lockerSize,
          mapKeys: Object.keys(lockerTypeMap),
          mappedValue: mappedLockerType,
          finalValue: mappedLockerType || 'medium',
          fallbackUsed: !mappedLockerType
        });

        // Split customer name into first name and surname
        const nameParts = order.customerName.split(' ');
        const firstName = nameParts[0] || '';
        const surname = nameParts.slice(1).join(' ') || '';

        const webhookData = {
          locker_type: mappedLockerType || 'medium',
          name: firstName,
          surname: surname,
          email: order.customerEmail,
          phone: order.customerPhone || '',
          amount_czk: parseFloat(order.totalPrice),
          rent_start: `${order.dropOffDate}T${order.dropOffTime}:00`,
          rent_end: `${order.pickUpDate}T${order.pickUpTime}:00`,
          order_id: order.orderId,
        };

        console.log('📤 [WEBHOOK] Sending to kiosk:', JSON.stringify(webhookData, null, 2));
        console.log('⚠️ [WEBHOOK] LOCKER_TYPE being sent:', webhookData.locker_type);

        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Secret": WEBHOOK_SECRET,
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "Brno-Luggage-Storage-Server/1.0",
            "Accept": "application/json",
          },
          body: JSON.stringify(webhookData),
        });

        console.log('📥 [WEBHOOK] Kiosk response status:', webhookResponse.status, webhookResponse.statusText);

        // Check if response is JSON before parsing
        const contentType = webhookResponse.headers.get('content-type');
        console.log('📥 [WEBHOOK] Content-type:', contentType);

        if (contentType && contentType.includes('application/json')) {
          const webhookResult = await webhookResponse.json();
          console.log('📥 [WEBHOOK] Response data:', webhookResult);

          if (webhookResponse.ok && webhookResult.ok) {
            lockerAssignment = {
              lockerNum: webhookResult.locker_num,
              pin: webhookResult.pin
            };
            console.log(`✅ [WEBHOOK] Locker assigned: #${webhookResult.locker_num}, PIN: ${webhookResult.pin}`);
          } else {
            console.error('❌ [WEBHOOK] Kiosk failed:', webhookResult.error || webhookResult.message || 'Unknown error');
          }
        } else {
          // Response is not JSON (probably HTML error page)
          const responseText = await webhookResponse.text();
          console.error('❌ [WEBHOOK] Non-JSON response:', {
            status: webhookResponse.status,
            contentType,
            bodyPreview: responseText.substring(0, 200)
          });
        }
      } catch (webhookError) {
        console.error('❌ [WEBHOOK] Failed to call kiosk:', webhookError);
        console.error('Webhook error details:', {
          message: webhookError.message,
          name: webhookError.name
        });
      }

      // Update order status in KV store
      await kv.set(`order:${orderId}`, {
        ...order,
        status: 'paid',
        paymentId: session.payment_intent,
        paidAt: new Date().toISOString(),
        ...(lockerAssignment && {
          lockerNum: lockerAssignment.lockerNum,
          pin: lockerAssignment.pin
        })
      });
      console.log('✅ [WEBHOOK] Order updated in KV store');

      // Send notification email to business owner
      try {
        const resendApiKey = Deno.env.get('RESEND_API_KEY');
        
        if (resendApiKey) {
          console.log('📧 [WEBHOOK] Sending business notification email...');
          
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              from: 'Luggage Storage Brno <onboarding@resend.dev>',
              to: ['brnoluggage@gmail.com'],
              subject: `🎒 New PAID Order #${order.orderId} - ${order.customerName}${lockerAssignment ? ` - Locker #${lockerAssignment.lockerNum}` : ''}`,
              html: `
                <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">
                  <h2 style=\"color: #2563eb;\">✅ New Luggage Storage Reservation - PAID</h2>
                  
                  <div style=\"background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;\">
                    <p style=\"margin: 0; color: #166534; font-weight: bold;\">Payment Confirmed via Stripe Webhook!</p>
                  </div>
                  
                  ${lockerAssignment ? `
                  <div style=\"background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;\">
                    <h3 style=\"margin-top: 0; color: #1e40af;\">🔐 Locker Assignment</h3>
                    <p style=\"font-size: 20px; font-weight: bold; margin: 10px 0;\">Locker Number: #${lockerAssignment.lockerNum}</p>
                    <p style=\"font-size: 20px; font-weight: bold; margin: 10px 0;\">PIN Code: ${lockerAssignment.pin}</p>
                    <p style=\"color: #1e40af; font-size: 14px; margin-top: 15px;\">✅ Customer has been automatically emailed these details by the kiosk system.</p>
                  </div>
                  ` : `
                  <div style=\"background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;\">
                    <p style=\"margin: 0; color: #92400e; font-weight: bold;\">⚠️ Locker assignment failed - Manual assignment required!</p>
                    <p style=\"margin: 10px 0 0 0; color: #92400e;\">Please assign a locker manually and send access codes to the customer.</p>
                  </div>
                  `}
                  
                  <div style=\"background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
                    <h3 style=\"margin-top: 0; color: #1f2937;\">Order Details</h3>
                    <p><strong>Order ID:</strong> #${order.orderId}</p>
                    <p><strong>Locker Size:</strong> ${order.lockerSize}</p>
                    <p><strong>Number of Lockers:</strong> ${order.lockerCount || 1}</p>
                    ${order.promoCode ? `<p><strong>Promo Code:</strong> ${order.promoCode}</p>` : ''}
                    ${order.promoCode ? `<p><strong>Original Price:</strong> ${order.originalPrice} CZK</p>` : ''}
                    ${order.promoCode ? `<p><strong>Discount:</strong> ${order.promoDiscount}%</p>` : ''}
                    <p><strong>Total Price:</strong> ${order.totalPrice} CZK</p>
                    <p><strong>Duration:</strong> ${order.durationDays} days, ${order.durationHours} hours</p>
                    ${order.priorityAccess ? '<p><strong>🌟 Priority Access:</strong> Yes</p>' : ''}
                    ${order.latesurance ? '<p><strong>🛡️ Latesurance:</strong> Yes</p>' : ''}
                  </div>

                  <div style=\"background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
                    <h3 style=\"margin-top: 0; color: #1f2937;\">Rental Period</h3>
                    <p><strong>Drop-off:</strong> ${order.dropOffDate} at ${order.dropOffTime}</p>
                    <p><strong>Pick-up:</strong> ${order.pickUpDate} at ${order.pickUpTime}</p>
                  </div>

                  <div style=\"background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
                    <h3 style=\"margin-top: 0; color: #1f2937;\">Customer Information</h3>
                    <p><strong>Name:</strong> ${order.customerName}</p>
                    <p><strong>Email:</strong> ${order.customerEmail}</p>
                    <p><strong>Phone:</strong> ${order.customerPhone}</p>
                  </div>

                  <p style=\"color: #6b7280; font-size: 14px; margin-top: 30px;\">
                    Payment processed automatically via Stripe webhook (server-side).
                  </p>
                </div>
              `
            })
          });

          if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            console.error('❌ [WEBHOOK] Failed to send business email:', errorText);
          } else {
            const emailData = await emailResponse.json();
            console.log('✅ [WEBHOOK] Business notification sent to brnoluggage@gmail.com', emailData);
          }
        } else {
          console.log('⚠️ [WEBHOOK] RESEND_API_KEY not configured');
        }
      } catch (emailError) {
        console.error('❌ [WEBHOOK] Email error:', emailError);
      }
    }

    return c.json({ received: true });
  } catch (error) {
    console.error('❌ Stripe webhook error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create free booking (0 CZK) - bypasses Stripe
app.post("/make-server-91daaa27/create-free-booking", async (c) => {
  console.log('🆓 Free booking endpoint called');
  try {
    const body = await c.req.json();
    const {
      orderId,
      lockerSize,
      dropOffDate,
      dropOffTime,
      pickUpDate,
      pickUpTime,
      durationDays,
      durationHours,
      totalPrice,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      latesurance,
      promoCode,
      promoDiscount,
      originalPrice
    } = body;

    console.log('🆓 Free booking request:', {
      orderId,
      lockerSize,
      customerEmail,
      promoCode
    });

    // Validate required fields
    if (!orderId || !customerEmail || !lockerSize) {
      console.error('❌ Missing required fields');
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Store order in KV store
    const order = {
      orderId,
      lockerSize,
      dropOffDate,
      dropOffTime,
      pickUpDate,
      pickUpTime,
      durationDays,
      durationHours,
      totalPrice: 0,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      latesurance: latesurance || false,
      promoCode: promoCode || null,
      promoDiscount: promoDiscount || 0,
      originalPrice: originalPrice || 0,
      status: 'paid',
      paymentMethod: 'free_promo',
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await kv.set(`order:${orderId}`, order);
    console.log('✅ Free order saved to KV store');

    // Submit order to kiosk webhook to get locker assignment
    console.log('🔐 [FREE] Submitting to kiosk webhook for locker assignment...');
    let lockerAssignment = null;

    try {
      const WEBHOOK_URL = "https://unheroical-nonunderstandable-tessa.ngrok-free.dev/webhook/order";
      const WEBHOOK_SECRET = "lsb-webhook-2026";

      // Map locker size to the format expected by webhook
      const lockerTypeMap = {
        'S': 'small',
        'M': 'medium',
        'L': 'large'
      };

      const mappedLockerType = lockerTypeMap[lockerSize];
      console.log('🔍 [FREE] Locker size mapping:', {
        rawLockerSize: lockerSize,
        mappedValue: mappedLockerType
      });

      // Split customer name into first name and surname
      const nameParts = customerName.split(' ');
      const firstName = nameParts[0] || '';
      const surname = nameParts.slice(1).join(' ') || '';

      const webhookData = {
        locker_type: mappedLockerType || 'medium',
        name: firstName,
        surname: surname,
        email: customerEmail,
        phone: customerPhone || '',
        amount_czk: 0,
        rent_start: `${dropOffDate}T${dropOffTime}:00`,
        rent_end: `${pickUpDate}T${pickUpTime}:00`,
        order_id: orderId,
      };

      console.log('📤 [FREE] Sending to kiosk:', JSON.stringify(webhookData, null, 2));

      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": WEBHOOK_SECRET,
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "Brno-Luggage-Storage-Server/1.0",
          "Accept": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      console.log('📥 [FREE] Kiosk response status:', webhookResponse.status);

      const contentType = webhookResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const webhookResult = await webhookResponse.json();
        console.log('📥 [FREE] Response data:', webhookResult);

        if (webhookResponse.ok && webhookResult.ok) {
          lockerAssignment = {
            lockerNum: webhookResult.locker_num,
            pin: webhookResult.pin
          };
          console.log(`✅ [FREE] Locker assigned: #${webhookResult.locker_num}, PIN: ${webhookResult.pin}`);
        } else {
          console.error('❌ [FREE] Kiosk failed:', webhookResult.error || webhookResult.message);
        }
      } else {
        const responseText = await webhookResponse.text();
        console.error('❌ [FREE] Non-JSON response:', responseText.substring(0, 200));
      }
    } catch (webhookError) {
      console.error('❌ [FREE] Webhook error:', webhookError);
    }

    // Update order with locker assignment
    if (lockerAssignment) {
      await kv.set(`order:${orderId}`, {
        ...order,
        lockerNum: lockerAssignment.lockerNum,
        pin: lockerAssignment.pin
      });
      console.log('✅ [FREE] Order updated with locker assignment');
    }

    // Send notification email to business owner
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');

      if (resendApiKey) {
        console.log('📧 [FREE] Sending business notification email...');

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Luggage Storage Brno <onboarding@resend.dev>',
            to: ['brnoluggage@gmail.com'],
            subject: `🆓 FREE Order #${orderId} - ${customerName}${lockerAssignment ? ` - Locker #${lockerAssignment.lockerNum}` : ''}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">🆓 New FREE Luggage Storage Reservation</h2>

                <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
                  <p style="margin: 0; color: #166534; font-weight: bold;">Free Booking via Admin Promo Code: ${promoCode}</p>
                </div>

                ${lockerAssignment ? `
                <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
                  <h3 style="margin-top: 0; color: #1e40af;">🔐 Locker Assignment</h3>
                  <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">Locker Number: #${lockerAssignment.lockerNum}</p>
                  <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">PIN Code: ${lockerAssignment.pin}</p>
                  <p style="color: #1e40af; font-size: 14px; margin-top: 15px;">✅ Customer has been automatically emailed these details by the kiosk system.</p>
                </div>
                ` : `
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                  <p style="margin: 0; color: #92400e; font-weight: bold;">⚠️ Locker assignment failed - Manual assignment required!</p>
                </div>
                `}

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1f2937;">Order Details</h3>
                  <p><strong>Order ID:</strong> #${orderId}</p>
                  <p><strong>Locker Size:</strong> ${lockerSize}</p>
                  <p><strong>Number of Lockers:</strong> ${lockerCount || 1}</p>
                  <p><strong>Promo Code:</strong> ${promoCode}</p>
                  <p><strong>Original Price:</strong> ${originalPrice} CZK</p>
                  <p><strong>Total Price:</strong> 0 CZK (FREE)</p>
                  <p><strong>Duration:</strong> ${durationDays} days, ${durationHours} hours</p>
                  ${latesurance ? '<p><strong>🛡️ Latesurance:</strong> Yes (FREE)</p>' : ''}
                </div>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1f2937;">Rental Period</h3>
                  <p><strong>Drop-off:</strong> ${dropOffDate} at ${dropOffTime}</p>
                  <p><strong>Pick-up:</strong> ${pickUpDate} at ${pickUpTime}</p>
                </div>

                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1f2937;">Customer Information</h3>
                  <p><strong>Name:</strong> ${customerName}</p>
                  <p><strong>Email:</strong> ${customerEmail}</p>
                  <p><strong>Phone:</strong> ${customerPhone}</p>
                </div>

                <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                  This was a FREE booking using admin promo code. No payment was processed.
                </p>
              </div>
            `
          })
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error('❌ [FREE] Failed to send email:', errorText);
        } else {
          console.log('✅ [FREE] Notification sent to brnoluggage@gmail.com');
        }
      }
    } catch (emailError) {
      console.error('❌ [FREE] Email error:', emailError);
    }

    return c.json({
      success: true,
      order: {
        orderId,
        lockerNum: lockerAssignment?.lockerNum,
        pin: lockerAssignment?.pin
      },
      message: 'Free booking created successfully'
    });
  } catch (error) {
    console.error('❌ [FREE] Error:', error);
    return c.json({
      error: "Failed to create free booking",
      details: error.message
    }, 500);
  }
});

// Verify payment and update order status
app.post("/make-server-91daaa27/verify-payment", async (c) => {
  console.log('🔍 verify-payment endpoint called');
  try {
    const { sessionId, orderId } = await c.req.json();
    console.log('📦 Received payload:', { sessionId, orderId });

    if (!sessionId || !orderId) {
      console.error('❌ Missing sessionId or orderId');
      return c.json({ error: "Missing session ID or order ID" }, 400);
    }

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('❌ STRIPE_SECRET_KEY not configured');
      return c.json({ error: "Payment system not configured" }, 500);
    }

    console.log('✅ Stripe key configured, retrieving session...');
    const stripe = await import('npm:stripe@17.5.0').then(m => new m.default(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    }));

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('💳 Stripe session retrieved:', {
      payment_status: session.payment_status,
      payment_intent: session.payment_intent
    });

    if (session.payment_status === 'paid') {
      console.log('✅ Payment confirmed as PAID, fetching order...');
      // Update order status in KV store
      const order = await kv.get(`order:${orderId}`);
      console.log('📋 Order fetched from KV store:', {
        exists: !!order,
        orderId: order?.orderId,
        customerEmail: order?.customerEmail,
        customerName: order?.customerName
      });
      
      if (order) {
        // Submit order to kiosk webhook to get locker assignment
        console.log('🔐 Submitting order to kiosk webhook for locker assignment...');
        let lockerAssignment = null;
        
        try {
          const WEBHOOK_URL = "https://unheroical-nonunderstandable-tessa.ngrok-free.dev/webhook/order";
          const WEBHOOK_SECRET = "lsb-webhook-2026";

          // Map locker size to the format expected by webhook
          const lockerTypeMap = {
            'S': 'small',
            'M': 'medium',
            'L': 'large'
          };

          const mappedLockerType = lockerTypeMap[order.lockerSize];
          console.log('🔍 [VERIFY] Locker size mapping DEBUG:', {
            rawLockerSize: order.lockerSize,
            lockerSizeType: typeof order.lockerSize,
            mapKeys: Object.keys(lockerTypeMap),
            mappedValue: mappedLockerType,
            finalValue: mappedLockerType || 'medium',
            fallbackUsed: !mappedLockerType
          });

          // Split customer name into first name and surname
          const nameParts = order.customerName.split(' ');
          const firstName = nameParts[0] || '';
          const surname = nameParts.slice(1).join(' ') || '';

          const webhookData = {
            locker_type: mappedLockerType || 'medium',
            name: firstName,
            surname: surname,
            email: order.customerEmail,
            phone: order.customerPhone || '',
            amount_czk: parseFloat(order.totalPrice),
            rent_start: `${order.dropOffDate}T${order.dropOffTime}:00`,
            rent_end: `${order.pickUpDate}T${order.pickUpTime}:00`,
            order_id: order.orderId,
          };

          console.log('📤 [VERIFY] Sending to kiosk:', JSON.stringify(webhookData, null, 2));
          console.log('⚠️ [VERIFY] LOCKER_TYPE being sent:', webhookData.locker_type);

          const webhookResponse = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Webhook-Secret": WEBHOOK_SECRET,
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "Brno-Luggage-Storage-Server/1.0",
              "Accept": "application/json",
            },
            body: JSON.stringify(webhookData),
          });

          console.log('📥 Webhook response status:', webhookResponse.status, webhookResponse.statusText);

          // Check if response is JSON before parsing
          const contentType = webhookResponse.headers.get('content-type');
          console.log('📥 Webhook response content-type:', contentType);

          if (contentType && contentType.includes('application/json')) {
            const webhookResult = await webhookResponse.json();
            console.log('📥 Webhook response data:', webhookResult);

            if (webhookResponse.ok && webhookResult.ok) {
              lockerAssignment = {
                lockerNum: webhookResult.locker_num,
                pin: webhookResult.pin
              };
              console.log(`✅ Locker assigned: #${webhookResult.locker_num}, PIN: ${webhookResult.pin}`);
            } else {
              console.error('❌ Webhook failed:', webhookResult.error || webhookResult.message || 'Unknown error');
            }
          } else {
            // Response is not JSON (probably HTML error page)
            const responseText = await webhookResponse.text();
            console.error('❌ Webhook returned non-JSON response:', {
              status: webhookResponse.status,
              contentType,
              bodyPreview: responseText.substring(0, 200)
            });
          }
        } catch (webhookError) {
          console.error('❌ Failed to call kiosk webhook:', webhookError);
          console.error('Webhook error details:', {
            message: webhookError.message,
            name: webhookError.name,
            stack: webhookError.stack
          });
          // Don't fail the whole payment if webhook fails
        }

        // Update order in KV store with payment info and locker assignment
        await kv.set(`order:${orderId}`, {
          ...order,
          status: 'paid',
          paymentId: session.payment_intent,
          paidAt: new Date().toISOString(),
          ...(lockerAssignment && {
            lockerNum: lockerAssignment.lockerNum,
            pin: lockerAssignment.pin
          })
        });
        console.log('✅ Order status updated to PAID in KV store');

        // Send notification email to business owner AFTER successful payment
        try {
          const resendApiKey = Deno.env.get('RESEND_API_KEY');
          
          console.log('📧 Email sending attempt:', {
            hasResendKey: !!resendApiKey,
            resendKeyLength: resendApiKey ? resendApiKey.length : 0,
            resendKeyFirst5: resendApiKey ? resendApiKey.substring(0, 5) + '...' : 'N/A',
            customerEmail: order.customerEmail,
            orderId: order.orderId,
            customerName: order.customerName,
            totalPrice: order.totalPrice,
            promoCode: order.promoCode,
            promoDiscount: order.promoDiscount,
            originalPrice: order.originalPrice
          });
          
          if (resendApiKey) {
            // Send email to business owner
            const emailResponse = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
              },
              body: JSON.stringify({
                from: 'Luggage Storage Brno <onboarding@resend.dev>',
                to: ['brnoluggage@gmail.com'],
                subject: `🎒 New PAID Order #${order.orderId} - ${order.customerName}${lockerAssignment ? ` - Locker #${lockerAssignment.lockerNum}` : ''}`,
                html: `
                  <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">
                    <h2 style=\"color: #2563eb;\">✅ New Luggage Storage Reservation - PAID</h2>
                    
                    <div style=\"background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;\">
                      <p style=\"margin: 0; color: #166534; font-weight: bold;\">Payment Confirmed!</p>
                    </div>
                    
                    ${lockerAssignment ? `
                    <div style=\"background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;\">
                      <h3 style=\"margin-top: 0; color: #1e40af;\">🔐 Locker Assignment</h3>
                      <p style=\"font-size: 20px; font-weight: bold; margin: 10px 0;\">Locker Number: #${lockerAssignment.lockerNum}</p>
                      <p style=\"font-size: 20px; font-weight: bold; margin: 10px 0;\">PIN Code: ${lockerAssignment.pin}</p>
                      <p style=\"color: #1e40af; font-size: 14px; margin-top: 15px;\">✅ Customer has been automatically emailed these details by the kiosk system.</p>
                    </div>
                    ` : `
                    <div style=\"background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;\">
                      <p style=\"margin: 0; color: #92400e; font-weight: bold;\">⚠️ Locker assignment failed - Manual assignment required!</p>
                      <p style=\"margin: 10px 0 0 0; color: #92400e;\">Please assign a locker manually and send access codes to the customer.</p>
                    </div>
                    `}
                    
                    <div style=\"background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
                      <h3 style=\"margin-top: 0; color: #1f2937;\">Order Details</h3>
                      <p><strong>Order ID:</strong> #${order.orderId}</p>
                      <p><strong>Locker Size:</strong> ${order.lockerSize}</p>
                      <p><strong>Number of Lockers:</strong> ${order.lockerCount || 1}</p>
                      ${order.promoCode ? `<p><strong>Promo Code:</strong> ${order.promoCode}</p>` : ''}
                      ${order.promoCode ? `<p><strong>Original Price:</strong> ${order.originalPrice}</p>` : ''}
                      ${order.promoCode ? `<p><strong>Discount:</strong> ${order.promoDiscount}</p>` : ''}
                      <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                      <p><strong>Duration:</strong> ${order.durationDays} days, ${order.durationHours} hours</p>
                      ${order.priorityAccess ? '<p><strong>🌟 Priority Access:</strong> Yes</p>' : ''}
                      ${order.latesurance ? '<p><strong>🛡️ Latesurance:</strong> Yes</p>' : ''}
                    </div>

                    <div style=\"background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
                      <h3 style=\"margin-top: 0; color: #1f2937;\">Rental Period</h3>
                      <p><strong>Drop-off:</strong> ${order.dropOffDate} at ${order.dropOffTime}</p>
                      <p><strong>Pick-up:</strong> ${order.pickUpDate} at ${order.pickUpTime}</p>
                    </div>

                    <div style=\"background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;\">
                      <h3 style=\"margin-top: 0; color: #1f2937;\">Customer Information</h3>
                      <p><strong>Name:</strong> ${order.customerName}</p>
                      <p><strong>Email:</strong> ${order.customerEmail}</p>
                      <p><strong>Phone:</strong> ${order.customerPhone}</p>
                    </div>

                    <p style=\"color: #6b7280; font-size: 14px; margin-top: 30px;\">
                      Payment has been successfully processed via Stripe.
                    </p>
                  </div>
                `
              })
            });

            if (!emailResponse.ok) {
              const errorText = await emailResponse.text();
              console.error('Failed to send email via Resend:', errorText);
            } else {
              const emailData = await emailResponse.json();
              console.log('✅ Email notification sent successfully to brnoluggage@gmail.com', emailData);
            }
          } else {
            console.log('⚠️ RESEND_API_KEY not configured - email notification skipped');
          }
        } catch (emailError) {
          console.error('Failed to send notification email:', emailError);
          // Don't fail the request if email fails, just log it
        }
      }

      return c.json({ 
        success: true, 
        order,
        paymentStatus: 'paid' 
      });
    } else {
      return c.json({ 
        success: false, 
        paymentStatus: session.payment_status 
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return c.json({ 
      error: "Failed to verify payment",
      details: error.message 
    }, 500);
  }
});

// Google Ads XML Product Feed
app.get("/make-server-91daaa27/products.xml", (c) => {
  const baseUrl = c.req.header('origin') || 'https://luggagestoragebrno.cz';
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Brno Luggage Storage - Self-Service Lockers</title>
    <link>${baseUrl}</link>
    <description>Affordable self-service luggage storage at Brno Main Train Station</description>
    
    <!-- Medium Locker (M) -->
    <item>
      <g:id>locker-medium</g:id>
      <g:title>Medium Luggage Locker - Brno Train Station</g:title>
      <g:description>Secure self-service medium locker (50×60×60 cm) at Brno hlavní nádraží. Hourly &amp; daily rates available. Operating hours 7:30-18:00.</g:description>
      <g:link>${baseUrl}</g:link>
      <g:image_link>${baseUrl}/locker-image.jpg</g:image_link>
      <g:price>38 CZK</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Brno Luggage Storage</g:brand>
      <g:google_product_category>Luggage &amp; Bags</g:google_product_category>
    </item>
    
    <!-- Large Locker (L) -->
    <item>
      <g:id>locker-large</g:id>
      <g:title>Large Luggage Locker - Brno Train Station</g:title>
      <g:description>Secure self-service large locker (50×60×85 cm) at Brno hlavní nádraží. Hourly &amp; daily rates available. Operating hours 7:30-18:00.</g:description>
      <g:link>${baseUrl}</g:link>
      <g:image_link>${baseUrl}/locker-image.jpg</g:image_link>
      <g:price>41 CZK</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Brno Luggage Storage</g:brand>
      <g:google_product_category>Luggage &amp; Bags</g:google_product_category>
    </item>
  </channel>
</rss>`;

  return c.text(xml, 200, { 'Content-Type': 'application/xml' });
});

// Test endpoint to check if reports module is working
app.get("/make-server-91daaa27/test-reports", async (c) => {
  try {
    const testData = {
      reportsModuleLoaded: typeof reports !== 'undefined',
      sendDailyReportExists: typeof reports.sendDailyReport === 'function',
      resendKeyConfigured: !!Deno.env.get('RESEND_API_KEY'),
      timestamp: new Date().toISOString(),
    };
    return c.json({ success: true, data: testData });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return c.json({ error: 'Test failed', details: error.message, stack: error.stack }, 500);
  }
});

// Report endpoints - Daily Report
app.post("/make-server-91daaa27/send-daily-report", async (c) => {
  try {
    console.log('Starting daily report generation...');
    await reports.sendDailyReport();
    console.log('Daily report sent successfully!');
    return c.json({ success: true, message: 'Daily report sent successfully' });
  } catch (error) {
    console.error('Error sending daily report:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to send daily report', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Weekly Report
app.post("/make-server-91daaa27/send-weekly-report", async (c) => {
  try {
    console.log('Starting weekly report generation...');
    await reports.sendWeeklyReport();
    console.log('Weekly report sent successfully!');
    return c.json({ success: true, message: 'Weekly report sent successfully' });
  } catch (error) {
    console.error('Error sending weekly report:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to send weekly report', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Monthly Report
app.post("/make-server-91daaa27/send-monthly-report", async (c) => {
  try {
    console.log('Starting monthly report generation...');
    await reports.sendMonthlyReport();
    console.log('Monthly report sent successfully!');
    return c.json({ success: true, message: 'Monthly report sent successfully' });
  } catch (error) {
    console.error('Error sending monthly report:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to send monthly report', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Quarterly Report
app.post("/make-server-91daaa27/send-quarterly-report", async (c) => {
  try {
    console.log('Starting quarterly report generation...');
    await reports.sendQuarterlyReport();
    console.log('Quarterly report sent successfully!');
    return c.json({ success: true, message: 'Quarterly report sent successfully' });
  } catch (error) {
    console.error('Error sending quarterly report:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to send quarterly report', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Yearly Report
app.post("/make-server-91daaa27/send-yearly-report", async (c) => {
  try {
    console.log('Starting yearly report generation...');
    await reports.sendYearlyReport();
    console.log('Yearly report sent successfully!');
    return c.json({ success: true, message: 'Yearly report sent successfully' });
  } catch (error) {
    console.error('Error sending yearly report:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to send yearly report', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Manual trigger for all reports (useful for testing)
app.post("/make-server-91daaa27/send-all-reports", async (c) => {
  try {
    console.log('Starting all reports generation...');
    await reports.sendDailyReport();
    console.log('✓ Daily report sent');
    await reports.sendWeeklyReport();
    console.log('✓ Weekly report sent');
    await reports.sendMonthlyReport();
    console.log('✓ Monthly report sent');
    await reports.sendQuarterlyReport();
    console.log('✓ Quarterly report sent');
    await reports.sendYearlyReport();
    console.log('✓ Yearly report sent');
    console.log('All reports sent successfully!');
    return c.json({ success: true, message: 'All reports sent successfully' });
  } catch (error) {
    console.error('Error sending reports:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to send reports', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Get live dashboard statistics
app.get("/make-server-91daaa27/dashboard-stats", async (c) => {
  try {
    console.log('Fetching dashboard statistics...');
    const stats = await reports.getDashboardStats();
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to fetch dashboard stats', 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Proxy endpoint for locker availability API
app.get("/make-server-91daaa27/locker-availability", async (c) => {
  try {
    console.log('Fetching locker availability from external API...');
    
    const response = await fetch('https://unheroical-nonunderstandable-tessa.ngrok-free.dev/api/availability', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    console.log('✓ Successfully fetched availability from external API');
    return c.json(data);
  } catch (error) {
    console.warn('External availability API unavailable, using fallback data:', error instanceof Error ? error.message : error);
    // Always return valid fallback data, never fail
    return c.json({
      lockers: {
        small: { free: 10 },
        medium: { free: 10 },
        large: { free: 10 }
      },
      fallback: true,
      reason: 'External API connection failed'
    });
  }
});

// Validate promo code
app.post("/make-server-91daaa27/validate-promo-code", async (c) => {
  try {
    const { code } = await c.req.json();
    
    if (!code) {
      return c.json({ valid: false, error: 'No code provided' }, 400);
    }

    console.log(`Validating promo code: ${code}`);

    // Fetch promo code validity from external API
    try {
      const response = await fetch('https://unheroical-nonunderstandable-tessa.ngrok-free.dev/api/promo-codes/validate', {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.toUpperCase() })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log('✓ Promo code validation response from API:', data);
      return c.json(data);
    } catch (apiError) {
      console.warn('External promo code API unavailable, using fallback:', apiError instanceof Error ? apiError.message : apiError);
      
      // Fallback: Validate hardcoded promo codes
      const hardcodedPromoCodes = {
        'BAGS15': { valid: true, discount: 15, type: 'percentage' },
        'WELCOME10': { valid: true, discount: 10, type: 'percentage' },
        'FIRST15': { valid: true, discount: 15, type: 'percentage' },
      };

      const upperCode = code.toUpperCase();
      if (hardcodedPromoCodes[upperCode]) {
        return c.json({
          valid: true,
          code: upperCode,
          discount: hardcodedPromoCodes[upperCode].discount,
          type: hardcodedPromoCodes[upperCode].type,
          fallback: true
        });
      } else {
        return c.json({
          valid: false,
          error: 'Invalid promo code',
          fallback: true
        });
      }
    }
  } catch (error) {
    console.error('Error validating promo code:', error);
    return c.json({ 
      valid: false,
      error: 'Failed to validate promo code',
      details: error.message 
    }, 500);
  }
});

// Validate promo code (with amount and email for reservation system)
app.post("/make-server-91daaa27/validate-promo", async (c) => {
  try {
    const { code, amount, email } = await c.req.json();
    
    if (!code) {
      return c.json({ ok: false, message: 'No code provided' }, 400);
    }

    console.log(`Validating promo code: ${code} for amount: ${amount}, email: ${email}`);

    // Try external API first
    try {
      const ngrokUrl = `https://unheroical-nonunderstandable-tessa.ngrok-free.dev/validate-promo?code=${encodeURIComponent(code)}&amount=${amount}&email=${encodeURIComponent(email)}`;
      console.log(`Calling ngrok API: ${ngrokUrl}`);
      
      const response = await fetch(ngrokUrl, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'Brno-Luggage-Storage-Server/1.0',
          'Accept': 'application/json',
        }
      });

      console.log(`ngrok API response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log('✓ Promo code validation response from external API:', data);
      return c.json(data);
    } catch (apiError) {
      console.warn('External promo code API unavailable, using fallback:', apiError instanceof Error ? apiError.message : apiError);
      
      // Fallback: Validate hardcoded promo codes
      const hardcodedPromoCodes = {
        'BAGS15': { discount_percentage: 15, first_order_only: true },
        'WELCOME10': { discount_percentage: 10, first_order_only: false },
        'FIRST15': { discount_percentage: 15, first_order_only: true },
        'SAVE15': { discount_percentage: 15, first_order_only: false },
        'RETURN10': { discount_percentage: 10, first_order_only: false },
        'ADMIN99': { discount_percentage: 99, email_restricted: 'albert.krajcovic@zdravestravovani.cz' },
        'ADMINFREE': { discount_percentage: 100, email_restricted: 'albert.krajcovic@zdravestravovani.cz' },
      };

      const upperCode = code.toUpperCase();
      if (hardcodedPromoCodes[upperCode]) {
        const promoConfig = hardcodedPromoCodes[upperCode];
        
        // Check email restriction for admin codes
        if (promoConfig.email_restricted && email.toLowerCase() !== promoConfig.email_restricted.toLowerCase()) {
          return c.json({
            ok: false,
            message: '❌ This promo code is restricted to specific users',
            fallback: true
          });
        }
        
        const discountPercentage = promoConfig.discount_percentage;
        let discountAmount = Math.round((amount * discountPercentage) / 100);

        // Allow 100% discount for admin codes
        if (discountPercentage === 100) {
          discountAmount = amount;
          return c.json({
            ok: true,
            code: upperCode,
            discount_czk: discountAmount,
            message: `✅ Admin promo code applied! 100% off - FREE booking`,
            fallback: true
          });
        }

        // Ensure minimum charge of 15 CZK (Stripe requirement for CZK currency)
        const finalAmount = amount - discountAmount;
        if (finalAmount < 15) {
          discountAmount = amount - 15;
        }

        return c.json({
          ok: true,
          code: upperCode,
          discount_czk: discountAmount,
          message: `✅ Promo code applied! ${discountPercentage}% off (${discountAmount} Kč saved) [Fallback mode]`,
          fallback: true
        });
      } else {
        return c.json({
          ok: false,
          message: '❌ Invalid promo code',
          fallback: true
        });
      }
    }
  } catch (error) {
    console.error('Error validating promo code:', error);
    return c.json({ 
      ok: false,
      message: 'Failed to validate promo code',
      error: error.message 
    }, 500);
  }
});

// Start the server
Deno.serve(app.fetch);