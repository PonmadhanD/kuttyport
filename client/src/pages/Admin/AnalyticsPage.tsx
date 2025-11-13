import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Analytics data types
interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
}

interface TopPerformer {
  id: string;
  name: string;
  value: number;
  change: number;
  avatar: string;
}

const AnalyticsPage = () => {
  // Time range state
  const [timeRange, setTimeRange] = useState<string>('7d');
  
  // Sample metrics data
  const metrics: MetricCard[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '₹1,24,500',
      change: 12.5,
      icon: 'trending_up',
      color: 'text-green-500 bg-green-100 dark:bg-green-900/30'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: '1,845',
      change: 8.2,
      icon: 'shopping_cart',
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: 'customers',
      title: 'New Customers',
      value: '342',
      change: 5.7,
      icon: 'person_add',
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '3.42%',
      change: -1.2,
      icon: 'trending_up',
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30'
    }
  ];

  // Sample chart data
  const revenueData: ChartData[] = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4780 },
    { name: 'May', value: 5890 },
    { name: 'Jun', value: 6390 },
    { name: 'Jul', value: 7890 },
    { name: 'Aug', value: 8490 },
    { name: 'Sep', value: 7390 },
    { name: 'Oct', value: 8890 },
    { name: 'Nov', value: 9390 },
    { name: 'Dec', value: 10500 },
  ];

  const categoryData: ChartData[] = [
    { name: 'Electronics', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Home & Kitchen', value: 200 },
    { name: 'Books', value: 150 },
    { name: 'Others', value: 100 },
  ];

  // Sample top performers
  const topProducts: TopPerformer[] = [
    { id: '1', name: 'Wireless Earbuds', value: 12500, change: 15.2, avatar: 'headphones' },
    { id: '2', name: 'Smart Watch', value: 9870, change: 8.5, avatar: 'watch' },
    { id: '3', name: 'Bluetooth Speaker', value: 7650, change: 22.1, avatar: 'speaker' },
    { id: '4', name: 'Power Bank', value: 5430, change: -2.3, avatar: 'battery_charging_full' },
    { id: '5', name: 'USB-C Cable', value: 4320, change: 5.6, avatar: 'usb' },
  ];

  // Tabs state
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and analyze your business performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
            <option value="custom">Custom Range</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined mr-1 text-base">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${metric.color}`}>
                  <span className="material-symbols-outlined">{metric.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                    <span className={`ml-2 flex items-center text-sm font-medium ${metric.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {metric.change >= 0 ? (
                        <span className="material-symbols-outlined mr-1 text-sm">arrow_upward</span>
                      ) : (
                        <span className="material-symbols-outlined mr-1 text-sm">arrow_downward</span>
                      )}
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <button className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                Daily
              </button>
              <button className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                Weekly
              </button>
              <button className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                Monthly
              </button>
            </div>
          </div>
          <div className="h-80">
            <div className="h-80 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Revenue Overview</h3>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="12m">Last 12 months</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, 'Revenue']}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem',
                        fontSize: '0.875rem',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-gray-800">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Top Performing Products</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Best selling products by revenue</p>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {topProducts.map((product) => (
                <li key={product.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                        {product.avatar}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">₹{product.value.toLocaleString()}</p>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className={`inline-flex items-center text-xs ${product.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {product.change >= 0 ? (
                            <span className="material-symbols-outlined mr-1 text-xs">arrow_upward</span>
                          ) : (
                            <span className="material-symbols-outlined mr-1 text-xs">arrow_downward</span>
                          )}
                          {Math.abs(product.change)}%
                        </span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">vs last period</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 text-right sm:px-6 dark:border-gray-800">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              View all products
            </a>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales by Category */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sales by Category</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Revenue distribution across categories</p>
          </div>
          <div className="h-64">
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
              <div>
                <span className="material-symbols-outlined mx-auto h-12 w-12 text-gray-400">pie_chart</span>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Category Distribution</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Revenue by product category
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Traffic Sources</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Where your visitors are coming from</p>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Direct', value: 45, color: 'bg-blue-500' },
              { name: 'Organic Search', value: 30, color: 'bg-green-500' },
              { name: 'Social', value: 15, color: 'bg-purple-500' },
              { name: 'Email', value: 10, color: 'bg-amber-500' },
            ].map((source) => (
              <div key={source.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{source.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{source.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full ${source.color}`}
                    style={{ width: `${source.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Latest actions in the system</p>
          </div>
          <div className="flow-root">
            <ul className="-mb-8">
              {[
                { id: 1, user: 'John Doe', action: 'created', target: 'New Order', time: '2 min ago', icon: 'add_shopping_cart' },
                { id: 2, user: 'Jane Smith', action: 'updated', target: 'Product Catalog', time: '1 hour ago', icon: 'inventory_2' },
                { id: 3, user: 'Alex Johnson', action: 'completed', target: 'Delivery #1234', time: '3 hours ago', icon: 'local_shipping' },
                { id: 4, user: 'System', action: 'generated', target: 'Daily Report', time: '5 hours ago', icon: 'description' },
                { id: 5, user: 'Maria Garcia', action: 'added', target: 'New Product', time: '1 day ago', icon: 'add_box' },
              ].map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== 4 && (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <span className="material-symbols-outlined text-sm">
                            {activity.icon}
                          </span>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
