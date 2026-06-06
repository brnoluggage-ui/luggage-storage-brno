import { useState, useEffect } from 'react';
import { FileText, TrendingUp, Calendar, BarChart3, PieChart, Loader2, RefreshCw, TrendingDown, DollarSign, Package } from 'lucide-react';
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface DashboardData {
  today: {
    orders: number;
    revenueCZK: number;
    revenueEUR: number;
    change: number;
  };
  week: {
    orders: number;
    revenueCZK: number;
    revenueEUR: number;
  };
  month: {
    orders: number;
    revenueCZK: number;
    revenueEUR: number;
  };
  allTime: {
    orders: number;
    revenueCZK: number;
    revenueEUR: number;
  };
  lockers: {
    S: number;
    M: number;
    L: number;
  };
  recentOrders: Array<{
    orderId: string;
    customerName: string;
    lockerSize: string;
    totalPrice: number;
    currency: string;
    createdAt: string;
    status: string;
  }>;
  lastUpdated: string;
}

export function AdminReports() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchDashboardData = async () => {
    try {
      setDashboardLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/dashboard-stats`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setDashboardData(result.data);
      } else {
        console.error('Dashboard error:', result);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchDashboardData, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const sendReport = async (reportType: string, reportName: string) => {
    setLoading(reportType);
    setStatus(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/send-${reportType}-report`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `✅ ${reportName} report sent successfully to info@luggagestoragebrno.cz!`,
        });
      } else {
        console.error('Report error details:', data);
        const errorDetails = data.details || data.error || 'Unknown error';
        const errorStack = data.stack ? `\n\nStack: ${data.stack}` : '';
        setStatus({
          type: 'error',
          message: `❌ Failed to send report: ${errorDetails}${errorStack}`,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Network error: ${error.message}`,
      });
    } finally {
      setLoading(null);
    }
  };

  const sendAllReports = async () => {
    setLoading('all');
    setStatus(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-91daaa27/send-all-reports`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '✅ All reports sent successfully to info@luggagestoragebrno.cz!',
        });
      } else {
        console.error('Report error details:', data);
        const errorDetails = data.details || data.error || 'Unknown error';
        const errorStack = data.stack ? `\n\nStack: ${data.stack}` : '';
        setStatus({
          type: 'error',
          message: `❌ Failed to send reports: ${errorDetails}${errorStack}`,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Network error: ${error.message}`,
      });
    } finally {
      setLoading(null);
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📊 Business Dashboard & Reports
          </h1>
          <p className="text-xl text-gray-600">
            Real-time analytics and automated business intelligence for info@luggagestoragebrno.cz
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Live Dashboard
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'reports'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              Email Reports
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Refresh Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={fetchDashboardData}
                disabled={dashboardLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${dashboardLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {dashboardLoading && !dashboardData ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              </div>
            ) : dashboardData ? (
              <>
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Today */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase">Today</h3>
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-gray-900">{dashboardData.today.orders}</div>
                      <div className="text-sm text-gray-600">Orders</div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CZK:</span>
                        <span className="font-semibold">{dashboardData.today.revenueCZK.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">EUR:</span>
                        <span className="font-semibold">€{dashboardData.today.revenueEUR.toLocaleString()}</span>
                      </div>
                    </div>
                    {dashboardData.today.change !== 0 && (
                      <div className={`mt-3 text-sm font-semibold flex items-center gap-1 ${dashboardData.today.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {dashboardData.today.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {dashboardData.today.change > 0 ? '+' : ''}{dashboardData.today.change}% vs yesterday
                      </div>
                    )}
                  </div>

                  {/* This Week */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase">This Week</h3>
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-gray-900">{dashboardData.week.orders}</div>
                      <div className="text-sm text-gray-600">Orders</div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CZK:</span>
                        <span className="font-semibold">{dashboardData.week.revenueCZK.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">EUR:</span>
                        <span className="font-semibold">€{dashboardData.week.revenueEUR.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* This Month */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase">This Month</h3>
                      <Calendar className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-gray-900">{dashboardData.month.orders}</div>
                      <div className="text-sm text-gray-600">Orders</div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CZK:</span>
                        <span className="font-semibold">{dashboardData.month.revenueCZK.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">EUR:</span>
                        <span className="font-semibold">€{dashboardData.month.revenueEUR.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* All Time */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase">All Time</h3>
                      <DollarSign className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="mb-2">
                      <div className="text-3xl font-bold text-gray-900">{dashboardData.allTime.orders}</div>
                      <div className="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CZK:</span>
                        <span className="font-semibold">{dashboardData.allTime.revenueCZK.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">EUR:</span>
                        <span className="font-semibold">€{dashboardData.allTime.revenueEUR.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Locker Distribution */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Package className="w-6 h-6 text-blue-600" />
                      Locker Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RePieChart>
                        <Pie
                          data={[
                            { name: 'Small (S)', value: dashboardData.lockers.S },
                            { name: 'Medium (M)', value: dashboardData.lockers.M },
                            { name: 'Large (L)', value: dashboardData.lockers.L },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{dashboardData.lockers.S}</div>
                        <div className="text-sm text-gray-600">Small</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{dashboardData.lockers.M}</div>
                        <div className="text-sm text-gray-600">Medium</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{dashboardData.lockers.L}</div>
                        <div className="text-sm text-gray-600">Large</div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Comparison */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                      Revenue Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { period: 'Today', CZK: dashboardData.today.revenueCZK, EUR: dashboardData.today.revenueEUR },
                          { period: 'Week', CZK: dashboardData.week.revenueCZK, EUR: dashboardData.week.revenueEUR },
                          { period: 'Month', CZK: dashboardData.month.revenueCZK, EUR: dashboardData.month.revenueEUR },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="CZK" fill="#3b82f6" name="CZK Revenue" />
                        <Bar dataKey="EUR" fill="#10b981" name="EUR Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Recent Orders
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Locker</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.recentOrders.length > 0 ? (
                          dashboardData.recentOrders.map((order, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4 font-mono text-sm">{order.orderId.substring(0, 12)}...</td>
                              <td className="py-3 px-4">{order.customerName}</td>
                              <td className="py-3 px-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                                  {order.lockerSize}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-semibold">
                                {order.totalPrice} {order.currency}
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleString('cs-CZ')}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                                  order.status === 'paid' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-gray-500">
                              No orders yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  Last updated: {new Date(dashboardData.lastUpdated).toLocaleString('cs-CZ')}
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-gray-500">
                Failed to load dashboard data
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            {/* Status Message */}
            {status && (
              <div
                className={`mb-8 p-6 rounded-xl border-l-4 ${
                  status.type === 'success'
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <p
                  className={`font-semibold ${
                    status.type === 'success' ? 'text-green-900' : 'text-red-900'
                  }`}
                >
                  {status.message}
                </p>
              </div>
            )}

            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Daily Report */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Today's performance vs. yesterday with detailed metrics
                    </p>
                    <button
                      onClick={() => sendReport('daily', 'Daily')}
                      disabled={loading !== null}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {loading === 'daily' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Daily Report</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Weekly Report */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Weekly Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      7-day trends and week-over-week comparison
                    </p>
                    <button
                      onClick={() => sendReport('weekly', 'Weekly')}
                      disabled={loading !== null}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {loading === 'weekly' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Weekly Report</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Monthly Report */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 hover:border-green-300 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Monthly Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Month-to-date performance and trends
                    </p>
                    <button
                      onClick={() => sendReport('monthly', 'Monthly')}
                      disabled={loading !== null}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {loading === 'monthly' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Monthly Report</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quarterly Report */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quarterly Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      3-month business insights and analysis
                    </p>
                    <button
                      onClick={() => sendReport('quarterly', 'Quarterly')}
                      disabled={loading !== null}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {loading === 'quarterly' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Quarterly Report</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Yearly Report */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-100 hover:border-pink-300 transition-all md:col-span-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <PieChart className="w-8 h-8 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Yearly Report</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Annual performance summary and year-over-year growth
                    </p>
                    <button
                      onClick={() => sendReport('yearly', 'Yearly')}
                      disabled={loading !== null}
                      className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {loading === 'yearly' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Yearly Report</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Send All Button */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">🚀 Send All Reports</h3>
              <p className="mb-6 opacity-90">
                Send all five reports (Daily, Weekly, Monthly, Quarterly, Yearly) at once for testing purposes
              </p>
              <button
                onClick={sendAllReports}
                disabled={loading !== null}
                className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-400 text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg"
              >
                {loading === 'all' ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending All Reports...
                  </>
                ) : (
                  <>📊 Send All Reports</>
                )}
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">📧 Report Destination</h4>
              <p className="text-blue-800 mb-4">
                All reports will be sent to: <strong>info@luggagestoragebrno.cz</strong>
              </p>
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Check your spam/junk folder if you don't see the reports in your inbox.
                Mark the first report as "Not Spam" to ensure future reports arrive in your inbox.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}