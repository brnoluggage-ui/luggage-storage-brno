import { useState, useEffect } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { PaymentBanner } from '@/app/components/PaymentBanner';
import { LongTermRent } from '@/app/components/LongTermRent';
import { WhyChooseUs } from '@/app/components/WhyChooseUs';
import { Gallery } from '@/app/components/Gallery';
import { Reservation } from '@/app/components/Reservation';
import { Features } from '@/app/components/Features';
import { HowItWorks } from '@/app/components/HowItWorks';
import { Pricing } from '@/app/components/Pricing';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';
import { TermsAndPrivacy } from '@/app/components/TermsAndPrivacy';
import { UrgentBanner } from '@/app/components/UrgentBanner';
import { AdminReports } from '@/app/components/AdminReports';
import { WhereToFindUs } from '@/app/components/WhereToFindUs';
import { AboutUs } from '@/app/components/AboutUs';
import { FAQ } from '@/app/components/FAQ';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function App() {
  const [language, setLanguage] = useState<'cs' | 'en' | 'de' | 'pl' | 'uk' | 'fr' | 'es' | 'it'>('cs');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'canceled' | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [showAdminReports, setShowAdminReports] = useState(false);
  const [availability, setAvailability] = useState<{
    small: number;
    medium: number;
    large: number;
  } | null>(null);

  // Fetch locker availability from API
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/locker-availability`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.lockers) {
          setAvailability({
            small: data.lockers.small.free || 0,
            medium: data.lockers.medium.free || 0,
            large: data.lockers.large.free || 0,
          });
          
          if (data.fallback) {
            console.log('ℹ️ Using default availability (external API unavailable)');
          } else {
            console.log('✓ Live availability updated');
          }
        }
      } catch (error) {
        // Silently use fallback - this is expected when external API is down
        setAvailability({
          small: 10,
          medium: 10,
          large: 10,
        });
        console.log('ℹ️ Using default availability');
      }
    };

    // Fetch on mount
    fetchAvailability();

    // Refresh every 30 seconds
    const interval = setInterval(fetchAvailability, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check for admin reports URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin-reports') === 'true') {
      setShowAdminReports(true);
      return;
    }

    // Check for free booking redirect
    const freeBooking = urlParams.get('free_booking');
    const freeOrderId = urlParams.get('order_id');

    if (freeBooking === 'true' && freeOrderId) {
      setPaymentStatus('success');
      setOrderDetails({ orderId: freeOrderId });
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    // Check for Stripe redirect
    const sessionId = urlParams.get('session_id');
    const orderId = urlParams.get('order_id');
    const canceled = urlParams.get('canceled');

    if (canceled === 'true') {
      setPaymentStatus('canceled');
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (sessionId && orderId) {
      // Verify payment
      verifyPayment(sessionId, orderId);
    }
  }, []);

  const verifyPayment = async (sessionId: string, orderId: string) => {
    console.log('🔍 Frontend: Starting payment verification...', { sessionId, orderId });
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/verify-payment`;
      console.log('📡 Frontend: Calling verify-payment endpoint:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ sessionId, orderId }),
      });

      console.log('📡 Frontend: Received response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      const data = await response.json();
      console.log('📦 Frontend: Response data:', data);
      
      if (data.success && data.paymentStatus === 'paid') {
        console.log('✅ Frontend: Payment verified successfully!');
        setPaymentStatus('success');
        setOrderDetails(data.order);
      } else {
        console.warn('⚠️ Frontend: Payment verification failed or not paid:', data);
      }
      
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } catch (error) {
      console.error('❌ Frontend: Error verifying payment:', error);
    }
  };

  const translations = {
    cs: {
      paymentSuccess: 'Platba byla úspěšná!',
      paymentSuccessMessage: 'Děkujeme za vaši rezervaci. Přístupové kódy jsou odeslány v samostatném e-mailu spolu s potvrzením platby.',
      paymentCanceled: 'Platba byla zrušena',
      paymentCanceledMessage: 'Vaše platba byla zrušena. Můžete to zkusit znovu nebo zaplatit na místě.',
      close: 'Zavřít',
      orderId: 'Číslo objednávky',
      returnPromo: 'Vraťte se a ušetřete 10%!',
      returnPromoSubtitle: 'Použijte tento kód při příští návštěvě u kiosku.',
    },
    en: {
      paymentSuccess: 'Payment Successful!',
      paymentSuccessMessage: 'Thank you for your reservation. Access codes are sent in a separate email with the payment confirmation.',
      paymentCanceled: 'Payment Canceled',
      paymentCanceledMessage: 'Your payment was canceled. You can try again or pay on-site.',
      close: 'Close',
      orderId: 'Order ID',
      returnPromo: 'Come back & save 10%!',
      returnPromoSubtitle: 'Use this code on your next visit at the kiosk.',
    },
    de: {
      paymentSuccess: 'Zahlung erfolgreich!',
      paymentSuccessMessage: 'Vielen Dank für Ihre Reservierung. Zugangscodes werden in einer separaten E-Mail mit der Zahlungsbestätigung gesendet.',
      paymentCanceled: 'Zahlung abgebrochen',
      paymentCanceledMessage: 'Ihre Zahlung wurde abgebrochen. Sie können es erneut versuchen oder vor Ort bezahlen.',
      close: 'Schließen',
      orderId: 'Bestellnummer',
      returnPromo: 'Kommen Sie zurück & sparen Sie 10%!',
      returnPromoSubtitle: 'Verwenden Sie diesen Code bei Ihrem nächsten Besuch am Kiosk.',
    },
    pl: {
      paymentSuccess: 'Płatność pomyślna!',
      paymentSuccessMessage: 'Dziękujemy za Twoją rezerwację. Kody dostępu są wysyłane w osobnej wiadomości e-mailowej razem z potwierdzeniem płatności.',
      paymentCanceled: 'Płatność anulowana',
      paymentCanceledMessage: 'Twoja płatność została anulowana. Możesz spróbować ponownie lub zapłacić na miejscu.',
      close: 'Zamknij',
      orderId: 'Numer zamówienia',
      returnPromo: 'Wróć i zaoszczędź 10%!',
      returnPromoSubtitle: 'Użyj tego kodu podczas następnej wizyty w kiosku.',
    },
    uk: {
      paymentSuccess: 'Оплата успішна!',
      paymentSuccessMessage: 'Дякуємо за вашу резервацію. Коди доступу надсилаються окремою електронною поштою разом з підтвердженням оплати.',
      paymentCanceled: 'Оплату скасовано',
      paymentCanceledMessage: 'Вашу оплату скасовано. Ви можете спробувати ще раз або сплатити на місці.',
      close: 'Закрити',
      orderId: 'Номер замовлення',
      returnPromo: 'Поверніться та заощадьте 10%!',
      returnPromoSubtitle: 'Використовуйте цей код при наступному відвідуванні кіоску.',
    },
    fr: {
      paymentSuccess: 'Paiement réussi !',
      paymentSuccessMessage: 'Merci pour votre réservation. Les codes d\'accès sont envoyés par e-mail séparément avec la confirmation de paiement.',
      paymentCanceled: 'Paiement annulé',
      paymentCanceledMessage: 'Votre paiement a été annulé. Vous pouvez réessayer ou payer sur place.',
      close: 'Fermer',
      orderId: 'Numéro de commande',
      returnPromo: 'Revenez et économisez 10% !',
      returnPromoSubtitle: 'Utilisez ce code lors de votre prochaine visite au kiosque.',
    },
    es: {
      paymentSuccess: '¡Pago exitoso!',
      paymentSuccessMessage: 'Gracias por tu reserva. Los códigos de acceso se envían en un correo electrónico separado con la confirmación de pago.',
      paymentCanceled: 'Pago cancelado',
      paymentCanceledMessage: 'Tu pago fue cancelado. Puedes intentarlo de nuevo o pagar en el lugar.',
      close: 'Cerrar',
      orderId: 'Número de pedido',
      returnPromo: '¡Regresa y ahorra 10%!',
      returnPromoSubtitle: 'Usa este código en tu próxima visita al quiosco.',
    },
    it: {
      paymentSuccess: 'Pagamento riuscito!',
      paymentSuccessMessage: 'Grazie per la tua prenotazione. I codici di accesso vengono inviati in una email separata con la conferma del pagamento.',
      paymentCanceled: 'Pagamento annullato',
      paymentCanceledMessage: 'Il tuo pagamento è stato annullato. Puoi riprovare o pagare sul posto.',
      close: 'Chiudi',
      orderId: 'Numero d\'ordine',
      returnPromo: 'Torna e risparmia 10%!',
      returnPromoSubtitle: 'Usa questo codice alla tua prossima visita al chiosco.',
    },
  };

  const t = translations[language];

  // If admin reports view, show that instead
  if (showAdminReports) {
    return <AdminReports />;
  }

  return (
    <div className="size-full">
      <Navigation language={language} setLanguage={setLanguage} availability={availability} />

      {/* Sticky Book Now button - mobile only */}
      <a
        href="#reservation"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-lg py-4 rounded-2xl shadow-2xl transition-all"
      >
        📦 Book Now →
      </a>
      <Hero language={language} availability={availability} />
      <PaymentBanner language={language} />
      <Features language={language} />
      <HowItWorks language={language} />
      <Pricing language={language} />
      <LongTermRent language={language} />
      <WhyChooseUs language={language} />
      <Gallery language={language} />
      <AboutUs language={language} />
      <Reservation language={language} availability={availability} />
      <WhereToFindUs language={language} />
      <FAQ language={language} />
      <Contact language={language} />
      <Footer 
        language={language} 
        onShowTerms={() => setShowTerms(true)} 
        onShowPrivacy={() => setShowPrivacy(true)}
      />
      
      {showTerms && (
        <TermsAndPrivacy 
          language={language} 
          onClose={() => setShowTerms(false)} 
        />
      )}

      {showPrivacy && (
        <TermsAndPrivacy 
          language={language} 
          onClose={() => setShowPrivacy(false)} 
        />
      )}

      {/* Payment Success/Cancel Modal */}
      {paymentStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            {paymentStatus === 'success' ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.paymentSuccess}
                </h2>
                {orderDetails && (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg mb-4 inline-block">
                    <div className="text-xs font-semibold mb-1">{t.orderId}</div>
                    <div className="text-2xl font-bold">#{orderDetails.orderId}</div>
                  </div>
                )}
                <p className="text-lg text-gray-600 mb-6">
                  {t.paymentSuccessMessage}
                </p>

                {/* Return Promo Banner */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-5 mb-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-purple-900 mb-2">
                      {t.returnPromo}
                    </h3>
                    <div className="bg-white inline-block px-6 py-3 rounded-full shadow-md mb-3">
                      <span className="text-2xl font-mono font-bold text-purple-600">RETURN10</span>
                    </div>
                    <p className="text-sm text-purple-800">
                      {t.returnPromoSubtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setPaymentStatus(null)}
                  className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.paymentCanceled}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t.paymentCanceledMessage}
                </p>
                <button
                  onClick={() => setPaymentStatus(null)}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}