import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const stats = [
    { title: "Today's Earnings", value: "$125.50", change: "+5.2%", isPositive: true },
    { title: "Active Tasks", value: "3", change: "+1", isPositive: true },
    { title: "Completion Rate", value: "98%", change: "+2%", isPositive: true },
    { title: "Customer Rating", value: "4.8/5", change: "-0.1", isPositive: false },
  ];

  const recentActivities = [
    { id: 1, type: 'delivery', title: 'Package delivered', time: '10 min ago', details: 'Order #12345' },
    { id: 2, type: 'payment', title: 'Payment received', time: '2 hours ago', amount: '$45.75' },
    { id: 3, type: 'task', title: 'New task assigned', time: '4 hours ago', details: 'Express delivery' },
  ];

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Partner!</h1>
          <p className="text-gray-500">Here's what's happening with your deliveries today</p>
        </div>
        <Button>New Delivery</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`text-sm font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {activity.type === 'delivery' && '📦'}
                    {activity.type === 'payment' && '💰'}
                    {activity.type === 'task' && '✅'}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time} • {activity.details || ''}</p>
                    {activity.amount && (
                      <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col h-24">
                <span className="text-2xl mb-1">📱</span>
                <span>Start Delivery</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24">
                <span className="text-2xl mb-1">📋</span>
                <span>View Tasks</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24">
                <span className="text-2xl mb-1">📊</span>
                <span>Earnings</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24">
                <span className="text-2xl mb-1">⚙️</span>
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
