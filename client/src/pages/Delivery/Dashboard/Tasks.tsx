import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Task = {
  id: string;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  title: string;
  orderId: string;
  from: string;
  to: string;
  distance: string;
  amount: string;
  time: string;
};

export default function Tasks() {
  const tasks: Task[] = [
    {
      id: '1',
      type: 'pickup',
      status: 'in-progress',
      title: 'Food Delivery',
      orderId: '#ORD-7890',
      from: 'Burger Palace, 123 Food St',
      to: '456 Customer Ave, Apt 3B',
      distance: '2.3 km',
      amount: '$8.50',
      time: '15-20 min'
    },
    {
      id: '2',
      type: 'delivery',
      status: 'pending',
      title: 'Grocery Delivery',
      orderId: '#ORD-7891',
      from: 'Fresh Mart, 789 Market St',
      to: '321 Home Rd, Floor 2',
      distance: '3.7 km',
      amount: '$12.75',
      time: '25-30 min'
    },
    {
      id: '3',
      type: 'pickup',
      status: 'pending',
      title: 'Parcel Delivery',
      orderId: '#ORD-7892',
      from: 'Office Depot, 555 Business Ave',
      to: '123 Startup Hub, Suite 400',
      distance: '5.1 km',
      amount: '$15.20',
      time: '30-35 min'
    },
  ];

  const getStatusBadge = (status: Task['status']) => {
    const statusMap = {
      'pending': { text: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
      'in-progress': { text: 'In Progress', class: 'bg-blue-100 text-blue-800' },
      'completed': { text: 'Completed', class: 'bg-green-100 text-green-800' },
      'cancelled': { text: 'Cancelled', class: 'bg-red-100 text-red-800' },
    };
    return statusMap[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-gray-500">Manage your current and upcoming deliveries</p>
        </div>
        <Button>Filter Tasks</Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Task Info */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {task.type === 'pickup' ? '🛍️' : '🚚'}
                      {task.title}
                      <span className="text-sm text-gray-500">{task.orderId}</span>
                    </h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-center">📍</span>
                        <span className="text-gray-600">{task.from}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-center">🏁</span>
                        <span className="text-gray-600">{task.to}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(task.status).class}`}>
                    {getStatusBadge(task.status).text}
                  </span>
                </div>
              </div>

              {/* Task Actions */}
              <div className="bg-gray-50 p-4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-between min-w-[200px]">
                <div className="grid grid-cols-2 gap-2 text-center mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="font-medium">{task.distance}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Earnings</div>
                    <div className="font-medium text-green-600">{task.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-medium">{task.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium">{task.type === 'pickup' ? 'Pickup' : 'Delivery'}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    {task.status === 'in-progress' ? 'Navigate' : 'View'}
                  </Button>
                  {task.status === 'in-progress' && (
                    <Button className="flex-1">Complete</Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
