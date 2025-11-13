import { useState } from 'react';
import { Link } from 'wouter';

// Transaction type definition
interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense' | 'refund' | 'payout';
  category: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  reference: string;
  paymentMethod?: string;
}

// Financial summary type
type TimeRange = 'today' | 'week' | 'month' | 'year' | 'all';

const FinancePage = () => {
  // Sample transactions data
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-1001',
      date: '2024-03-11T14:30:00',
      type: 'income',
      category: 'Delivery Fees',
      description: 'Delivery fee for ORD-20456',
      amount: 1250.00,
      status: 'completed',
      reference: 'ORD-20456',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'TXN-1002',
      date: '2024-03-10T11:15:00',
      type: 'expense',
      category: 'Fuel',
      description: 'Diesel for delivery vehicle',
      amount: 3250.00,
      status: 'completed',
      reference: 'FUEL-0342',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'TXN-1003',
      date: '2024-03-09T16:45:00',
      type: 'income',
      category: 'Service Fee',
      description: 'Service charge for March 2024',
      amount: 5000.00,
      status: 'completed',
      reference: 'INV-2024-03',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'TXN-1004',
      date: '2024-03-08T09:20:00',
      type: 'payout',
      category: 'Driver Payout',
      description: 'Weekly payout to driver (ID: DRV-0456)',
      amount: 12500.00,
      status: 'completed',
      reference: 'PAY-2024-10',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'TXN-1005',
      date: '2024-03-07T14:10:00',
      type: 'refund',
      category: 'Order Refund',
      description: 'Refund for cancelled order ORD-20421',
      amount: 750.00,
      status: 'completed',
      reference: 'REF-0342',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'TXN-1006',
      date: '2024-03-06T10:30:00',
      type: 'expense',
      category: 'Maintenance',
      description: 'Vehicle service and maintenance',
      amount: 4200.00,
      status: 'completed',
      reference: 'MNT-0123',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'TXN-1007',
      date: '2024-03-05T15:45:00',
      type: 'income',
      category: 'Delivery Fees',
      description: 'Delivery fee for ORD-20432',
      amount: 950.00,
      status: 'completed',
      reference: 'ORD-20432',
      paymentMethod: 'UPI'
    },
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<TimeRange>('month');
  const [activeTab, setActiveTab] = useState<'transactions' | 'invoices' | 'reports' | 'settings'>('transactions');

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.paymentMethod?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    // Filter by date range
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    let startDate = new Date();
    
    switch (dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
      default:
        startDate = new Date(0); // Beginning of time
    }
    
    const matchesDate = transactionDate >= startDate;
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  // Calculate financial summary
  const financialSummary = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    totalPayouts: transactions
      .filter(t => t.type === 'payout')
      .reduce((sum, t) => sum + t.amount, 0),
    totalRefunds: transactions
      .filter(t => t.type === 'refund')
      .reduce((sum, t) => sum + t.amount, 0),
    netBalance: transactions
      .reduce((sum, t) => {
        if (t.type === 'income') return sum + t.amount;
        if (t.type === 'expense' || t.type === 'payout' || t.type === 'refund') return sum - t.amount;
        return sum;
      }, 0)
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    };
    
    const statusLabels = {
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      processing: 'Processing',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  // Get transaction type icon and color
  const getTransactionType = (type: string) => {
    const typeIcons = {
      income: { icon: 'south_east', color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30' },
      expense: { icon: 'north_west', color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30' },
      refund: { icon: 'refresh', color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30' },
      payout: { icon: 'payments', color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30' },
    };

    const typeLabels = {
      income: 'Income',
      expense: 'Expense',
      refund: 'Refund',
      payout: 'Payout',
    };

    const typeData = typeIcons[type as keyof typeof typeIcons] || { icon: 'receipt', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' };
    
    return {
      icon: typeData.icon,
      color: typeData.color,
      label: typeLabels[type as keyof typeof typeLabels] || type,
    };
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
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

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const categoryIcons: Record<string, string> = {
      'Delivery Fees': 'local_shipping',
      'Service Fee': 'receipt_long',
      'Fuel': 'local_gas_station',
      'Maintenance': 'handyman',
      'Driver Payout': 'directions_car',
      'Order Refund': 'assignment_return',
      'Subscription': 'subscriptions',
      'Equipment': 'inventory_2',
      'Office Supplies': 'inventory',
      'Software': 'computer',
      'Marketing': 'campaign',
      'Other': 'receipt',
    };

    return categoryIcons[category] || 'receipt';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Finance</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your financial transactions, invoices, and reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="material-symbols-outlined mr-1 text-lg">add</span>
            New Transaction
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

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-900/30 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <span className="material-symbols-outlined text-2xl">south_east</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(financialSummary.totalIncome)}
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                <span className="font-medium">+12.5%</span> from last month
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-red-200 bg-white p-4 shadow-sm dark:border-red-900/30 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <span className="material-symbols-outlined text-2xl">north_west</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(financialSummary.totalExpenses)}
              </p>
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                <span className="font-medium">+5.2%</span> from last month
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-purple-200 bg-white p-4 shadow-sm dark:border-purple-900/30 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payouts</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(financialSummary.totalPayouts)}
              </p>
              <p className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                <span className="font-medium">+3.1%</span> from last month
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm dark:border-blue-900/30 dark:bg-gray-900/50">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Net Balance</p>
              <p className={`text-2xl font-semibold ${financialSummary.netBalance >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(financialSummary.netBalance)}
              </p>
              <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                <span className="font-medium">+7.8%</span> from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'transactions' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('transactions')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">receipt_long</span>
              Transactions
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {transactions.length}
              </span>
            </span>
          </button>
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'invoices' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('invoices')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">description</span>
              Invoices
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700/50 dark:text-gray-300">
                12
              </span>
            </span>
          </button>
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'reports' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('reports')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">analytics</span>
              Reports
            </span>
          </button>
          <button
            type="button"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'settings' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="flex items-center">
              <span className="material-symbols-outlined mr-2 text-base">settings</span>
              Settings
            </span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'transactions' && (
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
                      placeholder="Search transactions..."
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
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="refund">Refund</option>
                    <option value="payout">Payout</option>
                  </select>
                  
                  <select
                    className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select
                    className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as TimeRange)}
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="all">All Time</option>
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
            
            {/* Transactions List */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Transaction
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900/50">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => {
                        const typeInfo = getTransactionType(transaction.type);
                        return (
                          <tr 
                            key={transaction.id}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${selectedTransaction?.id === transaction.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                            onClick={() => setSelectedTransaction(transaction)}
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
                                    {transaction.description}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {transaction.reference}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <span className="material-symbols-outlined mr-2 text-gray-400">
                                  {getCategoryIcon(transaction.category)}
                                </span>
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {transaction.category}
                                </span>
                              </div>
                            </td>
                            <td className={`whitespace-nowrap px-6 py-4 text-right text-sm font-medium ${transaction.type === 'income' || transaction.type === 'refund' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {transaction.type === 'income' || transaction.type === 'refund' ? '+' : '-'}
                              {formatCurrency(transaction.amount)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {getStatusBadge(transaction.status)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(transaction.date)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
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
                                    // Handle download action
                                  }}
                                >
                                  <span className="material-symbols-outlined">download</span>
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
                            <span className="material-symbols-outlined mb-2 text-4xl">receipt_long</span>
                            <p className="text-sm font-medium">No transactions found</p>
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
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                      <span className="font-medium">{filteredTransactions.length}</span> results
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
                        5
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
        
        {activeTab === 'invoices' && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <div className="mx-auto max-w-md">
              <span className="material-symbols-outlined mx-auto h-12 w-12 text-gray-400">description</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No invoices</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new invoice.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined mr-2 text-lg">add</span>
                  New Invoice
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <div className="mx-auto max-w-md">
              <span className="material-symbols-outlined mx-auto h-12 w-12 text-gray-400">analytics</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No reports</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Generate financial reports to analyze your business performance.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined mr-2 text-lg">add</span>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <div className="mx-auto max-w-md">
              <span className="material-symbols-outlined mx-auto h-12 w-12 text-gray-400">settings</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Finance Settings</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Configure your financial settings, tax rates, and payment methods.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="material-symbols-outlined mr-2 text-lg">settings</span>
                  Configure Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Panel */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedTransaction(null)}></div>
            
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-900">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white" id="modal-title">
                        Transaction Details
                      </h3>
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
                        onClick={() => setSelectedTransaction(null)}
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
                                {selectedTransaction.description}
                              </h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                {selectedTransaction.reference} • {formatDate(selectedTransaction.date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-2xl font-bold ${selectedTransaction.type === 'income' || selectedTransaction.type === 'refund' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {selectedTransaction.type === 'income' || selectedTransaction.type === 'refund' ? '+' : '-'}
                                {formatCurrency(selectedTransaction.amount)}
                              </p>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {selectedTransaction.type === 'income' ? 'Received' : 'Paid'} via {selectedTransaction.paymentMethod || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700">
                          <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                {selectedTransaction.id}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                <span className="inline-flex items-center">
                                  {getTransactionType(selectedTransaction.type).label}
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                <span className="inline-flex items-center">
                                  <span className="material-symbols-outlined mr-2 text-gray-400">
                                    {getCategoryIcon(selectedTransaction.category)}
                                  </span>
                                  {selectedTransaction.category}
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                {getStatusBadge(selectedTransaction.status)}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                {formatDate(selectedTransaction.date)}
                              </dd>
                            </div>
                            {selectedTransaction.paymentMethod && (
                              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                  {selectedTransaction.paymentMethod}
                                </dd>
                              </div>
                            )}
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
                              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                                {selectedTransaction.description}
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
                            // Handle print or download
                            window.print();
                          }}
                        >
                          <span className="material-symbols-outlined mr-2">download</span>
                          Download Receipt
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                          onClick={() => setSelectedTransaction(null)}
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

export default FinancePage;
