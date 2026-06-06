import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const BUSINESS_EMAIL = 'info@luggagestoragebrno.cz';

interface OrderData {
  orderId: string;
  lockerSize: 'S' | 'M' | 'L';
  currency: 'CZK' | 'EUR';
  totalPrice: number;
  durationDays: number;
  durationHours: number;
  dropOffDate: string;
  dropOffTime: string;
  pickUpDate: string;
  pickUpTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentStatus: string;
  createdAt: string;
}

interface ReportStats {
  period: string;
  totalOrders: number;
  totalRevenueCZK: number;
  totalRevenueEUR: number;
  ordersByLocker: { S: number; M: number; L: number };
  revenueByLocker: { S: number; M: number; L: number };
  ordersByCurrency: { CZK: number; EUR: number };
  avgStorageDays: number;
  avgStorageHours: number;
  mostPopularLocker: 'S' | 'M' | 'L';
  peakBookingHours: { [hour: string]: number };
  avgOrderValue: { CZK: number; EUR: number };
  comparisonToPrevious?: {
    ordersDiff: number;
    revenueDiff: number;
    percentageChange: number;
  };
}

// Helper to get Brno time
function getBrnoTime(date: Date = new Date()) {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Prague' }));
}

// Get all orders from KV store
async function getAllOrders(): Promise<OrderData[]> {
  const allOrders = await kv.getByPrefix('order_');
  return allOrders
    .filter(item => item.key && item.key.startsWith('order_ORDER-'))
    .map(item => item.value as OrderData)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Filter orders by date range
function filterOrdersByDateRange(orders: OrderData[], startDate: Date, endDate: Date): OrderData[] {
  return orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startDate && orderDate <= endDate;
  });
}

// Calculate statistics
function calculateStats(orders: OrderData[], period: string, previousOrders?: OrderData[]): ReportStats {
  const stats: ReportStats = {
    period,
    totalOrders: orders.length,
    totalRevenueCZK: 0,
    totalRevenueEUR: 0,
    ordersByLocker: { S: 0, M: 0, L: 0 },
    revenueByLocker: { S: 0, M: 0, L: 0 },
    ordersByCurrency: { CZK: 0, EUR: 0 },
    avgStorageDays: 0,
    avgStorageHours: 0,
    mostPopularLocker: 'M',
    peakBookingHours: {},
    avgOrderValue: { CZK: 0, EUR: 0 },
  };

  let totalDays = 0;
  let totalHours = 0;

  orders.forEach(order => {
    // Revenue totals
    if (order.currency === 'CZK') {
      stats.totalRevenueCZK += order.totalPrice;
      stats.ordersByCurrency.CZK++;
    } else {
      stats.totalRevenueEUR += order.totalPrice;
      stats.ordersByCurrency.EUR++;
    }

    // Locker statistics
    stats.ordersByLocker[order.lockerSize]++;
    stats.revenueByLocker[order.lockerSize] += order.totalPrice;

    // Duration statistics
    totalDays += order.durationDays;
    totalHours += order.durationHours;

    // Peak booking hours
    const bookingHour = new Date(order.createdAt).getHours();
    const hourKey = `${String(bookingHour).padStart(2, '0')}:00`;
    stats.peakBookingHours[hourKey] = (stats.peakBookingHours[hourKey] || 0) + 1;
  });

  // Calculate averages
  if (orders.length > 0) {
    stats.avgStorageDays = Number((totalDays / orders.length).toFixed(2));
    stats.avgStorageHours = Number((totalHours / orders.length).toFixed(2));
    
    if (stats.ordersByCurrency.CZK > 0) {
      stats.avgOrderValue.CZK = Number((stats.totalRevenueCZK / stats.ordersByCurrency.CZK).toFixed(2));
    }
    if (stats.ordersByCurrency.EUR > 0) {
      stats.avgOrderValue.EUR = Number((stats.totalRevenueEUR / stats.ordersByCurrency.EUR).toFixed(2));
    }
  }

  // Find most popular locker
  const lockerEntries = Object.entries(stats.ordersByLocker) as [('S' | 'M' | 'L'), number][];
  stats.mostPopularLocker = lockerEntries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];

  // Compare to previous period
  if (previousOrders && previousOrders.length > 0) {
    const prevRevenueCZK = previousOrders
      .filter(o => o.currency === 'CZK')
      .reduce((sum, o) => sum + o.totalPrice, 0);
    const prevRevenueEUR = previousOrders
      .filter(o => o.currency === 'EUR')
      .reduce((sum, o) => sum + o.totalPrice, 0);
    
    const prevTotalRevenue = prevRevenueCZK + (prevRevenueEUR * 25); // Approximate conversion
    const currentTotalRevenue = stats.totalRevenueCZK + (stats.totalRevenueEUR * 25);
    
    stats.comparisonToPrevious = {
      ordersDiff: stats.totalOrders - previousOrders.length,
      revenueDiff: Number((currentTotalRevenue - prevTotalRevenue).toFixed(2)),
      percentageChange: Number((((currentTotalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100).toFixed(2)),
    };
  }

  return stats;
}

// Send email via Resend
async function sendEmail(subject: string, htmlContent: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Brno Luggage Storage <send@luggagestoragebrno.cz>',
        to: [BUSINESS_EMAIL],
        subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
      throw new Error(`Failed to send email: ${error}`);
    } else {
      console.log(`Report sent successfully: ${subject}`);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Helper function to generate report HTML
function generateReportHTML(stats: ReportStats, orders: OrderData[], reportType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'): string {
  const topBookingHours = Object.entries(stats.peakBookingHours)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 30px; }
    .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
    .stat-box { background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
    .stat-label { font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold; }
    .stat-value { font-size: 28px; font-weight: bold; color: #1f2937; margin-top: 5px; }
    .stat-sub { font-size: 14px; color: #6b7280; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #2563eb; color: white; font-weight: bold; }
    tr:hover { background: #f9fafb; }
    .positive { color: #10b981; font-weight: bold; }
    .negative { color: #ef4444; font-weight: bold; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
    .badge-success { background: #d1fae5; color: #065f46; }
    .badge-warning { background: #fef3c7; color: #92400e; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <h1>📊 Brno Luggage Storage - ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h1>
  
  <div class="stat-grid">
    <div class="stat-box">
      <div class="stat-label">Total Orders</div>
      <div class="stat-value">${stats.totalOrders}</div>
      ${stats.comparisonToPrevious ? `<div class="stat-sub ${stats.comparisonToPrevious.ordersDiff >= 0 ? 'positive' : 'negative'}">${stats.comparisonToPrevious.ordersDiff >= 0 ? '+' : ''}${stats.comparisonToPrevious.ordersDiff} vs previous period</div>` : ''}
    </div>
    
    <div class="stat-box">
      <div class="stat-label">Revenue (CZK)</div>
      <div class="stat-value">${stats.totalRevenueCZK.toLocaleString()} Kč</div>
      <div class="stat-sub">${stats.ordersByCurrency.CZK} orders</div>
    </div>
    
    <div class="stat-box">
      <div class="stat-label">Revenue (EUR)</div>
      <div class="stat-value">€${stats.totalRevenueEUR.toLocaleString()}</div>
      <div class="stat-sub">${stats.ordersByCurrency.EUR} orders</div>
    </div>
    
    <div class="stat-box">
      <div class="stat-label">Avg Storage Duration</div>
      <div class="stat-value">${stats.avgStorageDays}d ${stats.avgStorageHours}h</div>
      <div class="stat-sub">per booking</div>
    </div>
  </div>

  ${stats.comparisonToPrevious ? `
  <h2>📈 Period Comparison</h2>
  <div class="stat-grid">
    <div class="stat-box">
      <div class="stat-label">Revenue Change</div>
      <div class="stat-value ${stats.comparisonToPrevious.revenueDiff >= 0 ? 'positive' : 'negative'}">
        ${stats.comparisonToPrevious.revenueDiff >= 0 ? '+' : ''}${stats.comparisonToPrevious.revenueDiff.toLocaleString()} Kč
      </div>
      <div class="stat-sub ${stats.comparisonToPrevious.percentageChange >= 0 ? 'positive' : 'negative'}">
        ${stats.comparisonToPrevious.percentageChange >= 0 ? '+' : ''}${stats.comparisonToPrevious.percentageChange.toFixed(2)}%
      </div>
    </div>
  </div>
  ` : ''}

  <h2>🔐 Locker Performance</h2>
  <table>
    <thead>
      <tr>
        <th>Locker Size</th>
        <th>Orders</th>
        <th>Revenue</th>
        <th>% of Total</th>
      </tr>
    </thead>
    <tbody>
      ${(['S', 'M', 'L'] as const).map(size => {
        const percentage = stats.totalOrders > 0 ? ((stats.ordersByLocker[size] / stats.totalOrders) * 100).toFixed(1) : 0;
        return `
          <tr>
            <td><strong>${size}</strong> ${size === stats.mostPopularLocker ? '<span class="badge badge-success">Most Popular</span>' : ''}</td>
            <td>${stats.ordersByLocker[size]}</td>
            <td>${stats.revenueByLocker[size].toLocaleString()}</td>
            <td>${percentage}%</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>

  <h2>⏰ Peak Booking Hours</h2>
  <table>
    <thead>
      <tr>
        <th>Hour</th>
        <th>Bookings</th>
        <th>% of Total</th>
      </tr>
    </thead>
    <tbody>
      ${topBookingHours.map(([hour, count]) => {
        const percentage = stats.totalOrders > 0 ? ((count / stats.totalOrders) * 100).toFixed(1) : 0;
        return `
          <tr>
            <td>${hour}</td>
            <td>${count}</td>
            <td>${percentage}%</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>

  <h2>💳 Average Order Value</h2>
  <div class="stat-grid">
    <div class="stat-box">
      <div class="stat-label">CZK Orders</div>
      <div class="stat-value">${stats.avgOrderValue.CZK.toFixed(2)} Kč</div>
      <div class="stat-sub">average per order</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">EUR Orders</div>
      <div class="stat-value">€${stats.avgOrderValue.EUR.toFixed(2)}</div>
      <div class="stat-sub">average per order</div>
    </div>
  </div>

  <h2>📋 Recent Orders (Last 10)</h2>
  <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Date</th>
        <th>Locker</th>
        <th>Duration</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      ${orders.slice(0, 10).map(order => `
        <tr>
          <td><code>${order.orderId.substring(0, 20)}...</code></td>
          <td>${new Date(order.createdAt).toLocaleString('cs-CZ')}</td>
          <td>${order.lockerSize}</td>
          <td>${order.durationDays}d ${order.durationHours}h</td>
          <td><strong>${order.totalPrice.toFixed(2)} ${order.currency}</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    <p>This is an automated report from Brno Luggage Storage</p>
    <p>Generated on ${getBrnoTime().toLocaleString('cs-CZ', { dateStyle: 'full', timeStyle: 'short' })}</p>
  </div>
</body>
</html>
  `;
}

// Helper function to generate report stats
async function generateReportStats(startDate: Date, endDate: Date): Promise<ReportStats> {
  const allOrders = await getAllOrders();
  const filteredOrders = filterOrdersByDateRange(allOrders, startDate, endDate);
  return calculateStats(filteredOrders, `${startDate.toLocaleDateString('cs-CZ')} to ${endDate.toLocaleDateString('cs-CZ')}`);
}

// Helper function to get orders in a specific range
async function getOrdersInRange(startDate: Date, endDate: Date): Promise<OrderData[]> {
  const allOrders = await getAllOrders();
  return filterOrdersByDateRange(allOrders, startDate, endDate);
}

// ==================== EXPORTED REPORT FUNCTIONS ====================

export async function sendDailyReport() {
  const now = getBrnoTime();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStats = await generateReportStats(now, now);
  const yesterdayStats = await generateReportStats(yesterday, yesterday);

  const comparison = {
    ordersDiff: todayStats.totalOrders - yesterdayStats.totalOrders,
    revenueDiff: todayStats.totalRevenueCZK - yesterdayStats.totalRevenueCZK,
    percentageChange: yesterdayStats.totalOrders > 0
      ? ((todayStats.totalOrders - yesterdayStats.totalOrders) / yesterdayStats.totalOrders) * 100
      : 0,
  };

  todayStats.comparisonToPrevious = comparison;

  const recentOrders = await getOrdersInRange(now, now);
  const emailHTML = generateReportHTML(todayStats, recentOrders, 'daily');

  await sendEmail(`📊 Daily Report - ${now.toLocaleDateString('cs-CZ')}`, emailHTML);
}

export async function sendWeeklyReport() {
  const now = getBrnoTime();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 6);
  
  const lastWeekStart = new Date(weekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastWeekEnd = new Date(weekStart);
  lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);

  const thisWeekStats = await generateReportStats(weekStart, now);
  const lastWeekStats = await generateReportStats(lastWeekStart, lastWeekEnd);

  const comparison = {
    ordersDiff: thisWeekStats.totalOrders - lastWeekStats.totalOrders,
    revenueDiff: thisWeekStats.totalRevenueCZK - lastWeekStats.totalRevenueCZK,
    percentageChange: lastWeekStats.totalOrders > 0
      ? ((thisWeekStats.totalOrders - lastWeekStats.totalOrders) / lastWeekStats.totalOrders) * 100
      : 0,
  };

  thisWeekStats.comparisonToPrevious = comparison;

  const recentOrders = await getOrdersInRange(weekStart, now);
  const emailHTML = generateReportHTML(thisWeekStats, recentOrders, 'weekly');

  await sendEmail(`📊 Weekly Report - Week of ${weekStart.toLocaleDateString('cs-CZ')}`, emailHTML);
}

export async function sendMonthlyReport() {
  const now = getBrnoTime();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const thisMonthStats = await generateReportStats(monthStart, now);
  const lastMonthStats = await generateReportStats(lastMonthStart, lastMonthEnd);

  const comparison = {
    ordersDiff: thisMonthStats.totalOrders - lastMonthStats.totalOrders,
    revenueDiff: thisMonthStats.totalRevenueCZK - lastMonthStats.totalRevenueCZK,
    percentageChange: lastMonthStats.totalOrders > 0
      ? ((thisMonthStats.totalOrders - lastMonthStats.totalOrders) / lastMonthStats.totalOrders) * 100
      : 0,
  };

  thisMonthStats.comparisonToPrevious = comparison;

  const recentOrders = await getOrdersInRange(monthStart, now);
  const emailHTML = generateReportHTML(thisMonthStats, recentOrders, 'monthly');

  await sendEmail(`📊 Monthly Report - ${now.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' })}`, emailHTML);
}

export async function sendQuarterlyReport() {
  const now = getBrnoTime();
  const quarter = Math.floor(now.getMonth() / 3);
  const quarterStart = new Date(now.getFullYear(), quarter * 3, 1);
  
  const lastQuarterStart = new Date(now.getFullYear(), (quarter - 1) * 3, 1);
  const lastQuarterEnd = new Date(now.getFullYear(), quarter * 3, 0);

  const thisQuarterStats = await generateReportStats(quarterStart, now);
  const lastQuarterStats = await generateReportStats(lastQuarterStart, lastQuarterEnd);

  const comparison = {
    ordersDiff: thisQuarterStats.totalOrders - lastQuarterStats.totalOrders,
    revenueDiff: thisQuarterStats.totalRevenueCZK - lastQuarterStats.totalRevenueCZK,
    percentageChange: lastQuarterStats.totalOrders > 0
      ? ((thisQuarterStats.totalOrders - lastQuarterStats.totalOrders) / lastQuarterStats.totalOrders) * 100
      : 0,
  };

  thisQuarterStats.comparisonToPrevious = comparison;

  const recentOrders = await getOrdersInRange(quarterStart, now);
  const emailHTML = generateReportHTML(thisQuarterStats, recentOrders, 'quarterly');

  await sendEmail(`📊 Quarterly Report - Q${quarter + 1} ${now.getFullYear()}`, emailHTML);
}

export async function sendYearlyReport() {
  const now = getBrnoTime();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  
  const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);

  const thisYearStats = await generateReportStats(yearStart, now);
  const lastYearStats = await generateReportStats(lastYearStart, lastYearEnd);

  const comparison = {
    ordersDiff: thisYearStats.totalOrders - lastYearStats.totalOrders,
    revenueDiff: thisYearStats.totalRevenueCZK - lastYearStats.totalRevenueCZK,
    percentageChange: lastYearStats.totalOrders > 0
      ? ((thisYearStats.totalOrders - lastYearStats.totalOrders) / lastYearStats.totalOrders) * 100
      : 0,
  };

  thisYearStats.comparisonToPrevious = comparison;

  const recentOrders = await getOrdersInRange(yearStart, now);
  const emailHTML = generateReportHTML(thisYearStats, recentOrders, 'yearly');

  await sendEmail(`📊 Yearly Report - ${now.getFullYear()}`, emailHTML);
}

// Get live dashboard statistics
export async function getDashboardStats() {
  const now = getBrnoTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Get all orders
  const allOrders = await getAllOrders();
  
  // Today's orders
  const todayOrders = filterOrdersByDateRange(allOrders, today, now);
  
  // Yesterday's orders
  const yesterdayOrders = filterOrdersByDateRange(allOrders, yesterday, today);
  
  // This week's orders
  const weekOrders = filterOrdersByDateRange(allOrders, weekStart, now);
  
  // This month's orders
  const monthOrders = filterOrdersByDateRange(allOrders, monthStart, now);
  
  // Calculate totals
  const todayRevenueCZK = todayOrders.filter(o => o.currency === 'CZK').reduce((sum, o) => sum + o.totalPrice, 0);
  const todayRevenueEUR = todayOrders.filter(o => o.currency === 'EUR').reduce((sum, o) => sum + o.totalPrice, 0);
  
  const weekRevenueCZK = weekOrders.filter(o => o.currency === 'CZK').reduce((sum, o) => sum + o.totalPrice, 0);
  const weekRevenueEUR = weekOrders.filter(o => o.currency === 'EUR').reduce((sum, o) => sum + o.totalPrice, 0);
  
  const monthRevenueCZK = monthOrders.filter(o => o.currency === 'CZK').reduce((sum, o) => sum + o.totalPrice, 0);
  const monthRevenueEUR = monthOrders.filter(o => o.currency === 'EUR').reduce((sum, o) => sum + o.totalPrice, 0);
  
  // Locker breakdown
  const lockerCounts = { S: 0, M: 0, L: 0 };
  allOrders.forEach(order => {
    if (lockerCounts[order.lockerSize] !== undefined) {
      lockerCounts[order.lockerSize]++;
    }
  });
  
  // Recent orders (last 10)
  const recentOrders = allOrders.slice(0, 10).map(order => ({
    orderId: order.orderId,
    customerName: order.customerName,
    lockerSize: order.lockerSize,
    totalPrice: order.totalPrice,
    currency: order.currency,
    createdAt: order.createdAt,
    status: order.status || 'pending',
  }));
  
  return {
    today: {
      orders: todayOrders.length,
      revenueCZK: Math.round(todayRevenueCZK),
      revenueEUR: Math.round(todayRevenueEUR),
      change: yesterdayOrders.length > 0 
        ? Math.round(((todayOrders.length - yesterdayOrders.length) / yesterdayOrders.length) * 100)
        : 0,
    },
    week: {
      orders: weekOrders.length,
      revenueCZK: Math.round(weekRevenueCZK),
      revenueEUR: Math.round(weekRevenueEUR),
    },
    month: {
      orders: monthOrders.length,
      revenueCZK: Math.round(monthRevenueCZK),
      revenueEUR: Math.round(monthRevenueEUR),
    },
    allTime: {
      orders: allOrders.length,
      revenueCZK: Math.round(allOrders.filter(o => o.currency === 'CZK').reduce((sum, o) => sum + o.totalPrice, 0)),
      revenueEUR: Math.round(allOrders.filter(o => o.currency === 'EUR').reduce((sum, o) => sum + o.totalPrice, 0)),
    },
    lockers: lockerCounts,
    recentOrders,
    lastUpdated: now.toISOString(),
  };
}