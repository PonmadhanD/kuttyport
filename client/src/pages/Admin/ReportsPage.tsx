import { useState } from 'react';
import { Link } from 'wouter';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Report type definition
interface Report {
  id: string;
  title: string;
  type: 'sales' | 'inventory' | 'delivery' | 'financial' | 'custom';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  lastGenerated: string;
  status: 'ready' | 'processing' | 'failed' | 'scheduled';
  scheduledNext?: string;
}

// Data point for charts
interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

// Sample data for charts
const salesData: DataPoint[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4780 },
  { name: 'May', value: 5890 },
  { name: 'Jun', value: 6390 },
  { name: 'Jul', value: 7890 },
  { name: 'Aug', value: 8490 },
];

const categoryData = [
  { name: 'Electronics', value: 400, color: '#3b82f6' },
  { name: 'Fashion', value: 300, color: '#8b5cf6' },
  { name: 'Home & Kitchen', value: 200, color: '#10b981' },
  { name: 'Books', value: 150, color: '#f59e0b' },
  { name: 'Others', value: 100, color: '#6b7280' },
];

// Time range type
type TimeRange = '7d' | '30d' | '90d' | '12m' | 'custom';

const ReportsPage = () => {
  // Sample reports data
  const [reports] = useState<Report[]>([
    {
      id: 'RPT-001',
      title: 'Weekly Sales Report',
      type: 'sales',
      frequency: 'weekly',
      lastGenerated: '2024-03-10T08:30:00',
      status: 'ready',
      scheduledNext: '2024-03-17T00:00:00'
    },
    {
      id: 'RPT-002',
      title: 'Monthly Financial Summary',
      type: 'financial',
      frequency: 'monthly',
      lastGenerated: '2024-03-01T00:00:00',
      status: 'ready',
      scheduledNext: '2024-04-01T00:00:00'
    },
    {
      id: 'RPT-003',
      title: 'Inventory Status',
      type: 'inventory',
      frequency: 'daily',
      lastGenerated: '2024-03-11T06:00:00',
      status: 'ready',
      scheduledNext: '2024-03-12T06:00:00'
    },
    {
      id: 'RPT-004',
      title: 'Delivery Performance',
      type: 'delivery',
      frequency: 'weekly',
      lastGenerated: '2024-03-07T18:45:00',
      status: 'ready',
      scheduledNext: '2024-03-14T00:00:00'
    },
    {
      id: 'RPT-005',
      title: 'Q1 2024 Financial Review',
      type: 'financial',
      frequency: 'quarterly',
      lastGenerated: '2024-01-01T00:00:00',
      status: 'ready',
      scheduledNext: '2024-04-01T00:00:00'
    },
    {
      id: 'RPT-006',
      title: 'Customer Acquisition Cost',
      type: 'custom',
      frequency: 'monthly',
      lastGenerated: '2024-03-05T10:15:00',
      status: 'ready',
      scheduledNext: '2024-04-01T00:00:00'
    },
    {
      id: 'RPT-007',
      title: 'Yearly Performance',
      type: 'financial',
      frequency: 'yearly',
      lastGenerated: '2024-01-15T00:00:00',
      status: 'ready',
      scheduledNext: '2025-01-15T00:00:00'
    },
    {
      id: 'RPT-008',
      title: 'Marketing ROI Analysis',
      type: 'custom',
      frequency: 'monthly',
      lastGenerated: '2024-03-01T09:30:00',
      status: 'processing',
      scheduledNext: '2024-04-01T00:00:00'
    }
  ]);

  // Chart data
  const [salesData] = useState<DataPoint[]>([
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ]);

  const [revenueData] = useState<DataPoint[]>([
    { name: 'Week 1', value: 2400 },
    { name: 'Week 2', value: 1398 },
    { name: 'Week 3', value: 9800 },
    { name: 'Week 4', value: 3908 },
  ]);

  const [deliveryMetrics] = useState({
    onTime: 92.5,
    delayed: 5.2,
    canceled: 2.3,
  });

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'scheduled' | 'templates'>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesFrequency = frequencyFilter === 'all' || report.frequency === frequencyFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesFrequency;
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      ready: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      scheduled: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    };
    
    const statusLabels = {
      ready: 'Ready',
      processing: 'Processing',
      failed: 'Failed',
      scheduled: 'Scheduled',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  // Get report type icon and color
  const getReportType = (type: string) => {
    const typeIcons = {
      sales: { icon: 'trending_up', color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30' },
      financial: { icon: 'account_balance_wallet', color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30' },
      inventory: { icon: 'inventory_2', color: 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30' },
      delivery: { icon: 'local_shipping', color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30' },
      custom: { icon: 'description', color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50' },
    };

    const typeLabels = {
      sales: 'Sales',
      financial: 'Financial',
      inventory: 'Inventory',
      delivery: 'Delivery',
      custom: 'Custom',
    };

    const typeData = typeIcons[type as keyof typeof typeIcons] || { icon: 'description', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' };
    
    return {
      icon: typeData.icon,
      color: typeData.color,
      label: typeLabels[type as keyof typeof typeLabels] || type,
    };
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format date without time
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Handle report generation
  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would download the report
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate and analyze business performance reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setActiveTab('templates')}
          >
            <span className="material-symbols-outlined mr-1 text-lg">add</span>
            New Report
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined mr-1 text-base">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">dashboard</span>
              Overview
            </span>
          </button>
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'reports' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('reports')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">description</span>
              All Reports
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {reports.length}
              </span>
            </span>
          </button>
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'scheduled' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('scheduled')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">schedule</span>
              Scheduled
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700/50 dark:text-gray-300">
                {reports.filter(r => r.status === 'scheduled').length}
              </span>
            </span>
          </button>
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'templates' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('templates')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">description</span>
              Templates
            </span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm dark:border-blue-900/30 dark:bg-gray-900/50">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reports</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {reports.length}
                    </p>
                    <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                      <span className="font-medium">+12.5%</span> from last month
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-900/30 dark:bg-gray-900/50">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ready</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {reports.filter(r => r.status === 'ready').length}
                    </p>
                    <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                      <span className="font-medium">+5.2%</span> from last week
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-purple-200 bg-white p-4 shadow-sm dark:border-purple-900/30 dark:bg-gray-900/50">
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <span className="material-symbols-outlined text-2xl">schedule</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {reports.filter(r => r.status === 'scheduled').length}
                    </p>
                    <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                      <span className="font-medium">+2</span> this week
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-amber-200 bg-white p-4 shadow-sm dark:border-amber-900/30 dark:bg-gray-900/50">
                <div className="flex items-center">
                  <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <span className="material-symbols-outlined text-2xl">analytics</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Report Types</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {new Set(reports.map(r => r.type)).size}
                    </p>
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                      <span className="font-medium">Sales, Financial, Inventory, Delivery, Custom</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Overview</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Time Range:</span>
                <select
                  className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="12m">Last 12 months</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Sales Trend Chart */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Sales Trend</h3>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-1 text-sm">download</span>
                    Export
                  </button>
                </div>
                <div className="h-80 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
                  <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Sales Trend</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={salesData}
                        margin={{
                          top: 10,
                          right: 10,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
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
                          tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Sales']}
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
                          fill="url(#colorSales)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Revenue by Category */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Revenue by Category</h3>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-1 text-sm">download</span>
                    Export
                  </button>
                </div>
                <div className="h-80 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700">
                  <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Revenue by Category</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [`$${value}`, props.payload.name]}
                          contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            padding: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                        />
                        <Legend 
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{
                            paddingTop: '1rem',
                            fontSize: '0.75rem',
                          }}
                          formatter={(value, entry: any, index) => (
                            <span className="text-xs text-gray-600">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Delivery Performance */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-4">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Delivery Performance</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">On-time delivery rate</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{deliveryMetrics.onTime}%</span>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="10"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - deliveryMetrics.onTime / 100)}`}
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">On Time</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">{deliveryMetrics.onTime}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delayed</p>
                    <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">{deliveryMetrics.delayed}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Canceled</p>
                    <p className="text-lg font-semibold text-red-600 dark:text-red-400">{deliveryMetrics.canceled}%</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Recent Reports</h3>
                  <Link
                    href="/admin/reports"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View all
                  </Link>
                </div>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {reports.slice(0, 4).map((report, index) => (
                      <li key={report.id}>
                        <div className="relative pb-8">
                          {index !== reports.length - 1 && (
                            <span
                              className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${getReportType(report.type).color}`}
                              >
                                <span className="material-symbols-outlined text-sm">
                                  {getReportType(report.type).icon}
                                </span>
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-800 dark:text-gray-200">
                                  <span className="font-medium">{report.title}</span> was generated
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(report.lastGenerated)}
                                </p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm">
                                {getStatusBadge(report.status)}
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
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[250px]">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="sales">Sales</option>
                    <option value="financial">Financial</option>
                    <option value="inventory">Inventory</option>
                    <option value="delivery">Delivery</option>
                    <option value="custom">Custom</option>
                  </select>
                  
                  <select
                    className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="ready">Ready</option>
                    <option value="processing">Processing</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select
                    className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    value={frequencyFilter}
                    onChange={(e) => setFrequencyFilter(e.target.value)}
                  >
                    <option value="all">All Frequencies</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  
                  <button
                    type="button"
                    className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <span className="material-symbols-outlined mr-1 text-base">filter_alt</span>
                    More Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Reports List */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Report
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Frequency
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Last Generated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => {
                        const typeInfo = getReportType(report.type);
                        return (
                          <tr 
                            key={report.id}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${selectedReport?.id === report.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                            onClick={() => setSelectedReport(report)}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${typeInfo.color}`}>
                                  <span className="material-symbols-outlined text-lg">
                                    {typeInfo.icon}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {report.title}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {report.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize">
                                {typeInfo.label}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {report.frequency.charAt(0).toUpperCase() + report.frequency.slice(1)}
                              </div>
                              {report.scheduledNext && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Next: {formatDateShort(report.scheduledNext)}
                                </div>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(report.lastGenerated)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {getStatusBadge(report.status)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGenerateReport();
                                  }}
                                  disabled={isGenerating}
                                >
                                  {isGenerating ? (
                                    <span className="material-symbols-outlined animate-spin">refresh</span>
                                  ) : (
                                    <span className="material-symbols-outlined">download</span>
                                  )}
                                </button>
                                <button 
                                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle view action
                                  }}
                                >
                                  <span className="material-symbols-outlined">visibility</span>
                                </button>
                                <button 
                                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle schedule action
                                  }}
                                >
                                  <span className="material-symbols-outlined">schedule</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center">
                          <div className="mx-auto flex flex-col items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined mb-2 text-4xl">description_off</span>
                            <p className="text-sm font-medium">No reports found</p>
                            <p className="mt-1 text-xs">Try adjusting your search or filters</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900/50 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
                      <span className="font-medium">{filteredReports.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700">
                        <span className="sr-only">Previous</span>
                        <span className="material-symbols-outlined h-5 w-5">chevron_left</span>
                      </button>
                      <button
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white">
                        2
                      </button>
                      <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white md:inline-flex">
                        3
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white md:inline-flex">
                        8
                      </button>
                      <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700">
                        <span className="sr-only">Next</span>
                        <span className="material-symbols-outlined h-5 w-5">chevron_right</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'scheduled' && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <div className="mx-auto max-w-md">
              <span className="material-symbols-outlined mx-auto h-12 w-12 text-gray-400">schedule</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No scheduled reports</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Schedule reports to be generated and delivered automatically.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setActiveTab('reports')}
                >
                  <span className="material-symbols-outlined mr-2 text-lg">add</span>
                  Schedule a Report
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'templates' && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <div className="mx-auto max-w-md">
              <span className="material-symbols-outlined mx-auto h-12 w-12 text-gray-400">description</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No report templates</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create custom report templates for your business needs.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined mr-2 text-lg">add</span>
                  Create Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Detail Panel */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedReport(null)}></div>
            
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle dark:bg-gray-900">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-900">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">
                        {selectedReport.title}
                      </h3>
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => setSelectedReport(null)}
                      >
                        <span className="sr-only">Close</span>
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                {selectedReport.title}
                              </h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                {selectedReport.id} • {getReportType(selectedReport.type).label} Report
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {selectedReport.frequency.charAt(0).toUpperCase() + selectedReport.frequency.slice(1)}
                              </div>
                              <div className="mt-1">
                                {getStatusBadge(selectedReport.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700">
                          <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Generated</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                {formatDate(selectedReport.lastGenerated)}
                              </dd>
                            </div>
                            {selectedReport.scheduledNext && (
                              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Next</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                  {formatDate(selectedReport.scheduledNext)}
                                </dd>
                              </div>
                            )}
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Report Type</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                <span className="inline-flex items-center">
                                  <span className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full ${getReportType(selectedReport.type).color}`}>
                                    <span className="material-symbols-outlined text-xs">
                                      {getReportType(selectedReport.type).icon}
                                    </span>
                                  </span>
                                  {getReportType(selectedReport.type).label}
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                {selectedReport.description || 'No description available.'}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Parameters</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <span className="font-medium">Time Range:</span> Last 30 days
                                  </div>
                                  <div>
                                    <span className="font-medium">Format:</span> PDF
                                  </div>
                                  <div>
                                    <span className="font-medium">Include Charts:</span> Yes
                                  </div>
                                  <div>
                                    <span className="font-medium">Data Granularity:</span> Daily
                                  </div>
                                </div>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Recipients</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                <div className="flex -space-x-2">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                  </div>
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                  </div>
                                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                  </div>
                                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                  </div>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                          onClick={() => {
                            handleGenerateReport();
                          }}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <span className="material-symbols-outlined mr-2 animate-spin">refresh</span>
                              Generating...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined mr-2">download</span>
                              Download Report
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          onClick={() => setSelectedReport(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
