import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TimeRange = 'week' | 'month' | 'year';

type Transaction = {
  id: string;
  date: string;
  type: 'delivery' | 'bonus' | 'adjustment' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  description: string;
};

export default function Earnings() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  // Mock data for earnings
  const earningsData = {
    week: { total: 325.75, change: 12.5, transactions: 14 },
    month: { total: 1420.50, change: 8.3, transactions: 62 },
    year: { total: 18500.25, change: 15.7, transactions: 725 },
  };

  // Mock transactions
  const transactions: Transaction[] = [
    {
      id: 'TXN-7890',
      date: '2023-11-10',
      type: 'delivery',
      amount: 12.50,
      status: 'completed',
      description: 'Food delivery #ORD-7890'
    },
    {
      id: 'TXN-7889',
      date: '2023-11-10',
      type: 'bonus',
      amount: 5.00,
      status: 'completed',
      description: 'On-time delivery bonus'
    },
    {
      id: 'TXN-7888',
      date: '2023-11-09',
      type: 'delivery',
      amount: 18.75,
      status: 'completed',
      description: 'Grocery delivery #ORD-7888'
    },
    {
      id: 'TXN-7887',
      date: '2023-11-09',
      type: 'withdrawal',
      amount: -200.00,
      status: 'pending',
      description: 'Withdrawal to bank account (****1234)'
    },
  ];

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'delivery': return '🚚';
      case 'bonus': return '🎉';
      case 'adjustment': return '🔧';
      case 'withdrawal': return '💳';
      default: return '💰';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="text-gray-500">Track your earnings and transactions</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <Tabs defaultValue="week" onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <TabsList>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline">Withdraw Earnings</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-gray-500">Total Earnings</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(earningsData[timeRange].total)}
            </div>
            <p className={`text-sm ${earningsData[timeRange].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {earningsData[timeRange].change >= 0 ? '↑' : '↓'} {Math.abs(earningsData[timeRange].change)}% from last {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-gray-500">Completed Deliveries</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsData[timeRange].transactions}</div>
            <p className="text-sm text-gray-500">
              {Math.round(earningsData[timeRange].transactions / (timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365) * 10) / 10} per day
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-gray-500">Average per Delivery</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(earningsData[timeRange].total / earningsData[timeRange].transactions)}
            </div>
            <p className="text-sm text-gray-500">
              {timeRange === 'week' ? 'This week' : timeRange === 'month' ? 'This month' : 'This year'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transaction History</CardTitle>
            <Button variant="outline" size="sm">Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                <div className="p-2 bg-gray-100 rounded-full mr-3">
                  <span className="text-lg">{getTransactionIcon(txn.type)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{txn.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(txn.date).toLocaleDateString()} • 
                    <span className={`ml-1 ${getStatusColor(txn.status)}`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div className={`font-medium ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost">View All Transactions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
