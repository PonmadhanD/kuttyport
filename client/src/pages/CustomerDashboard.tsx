import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Bot,
  Shield,
  HelpCircle,
  User,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import type { User as UserType } from "@shared/schema";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CustomerDashboardProps {
  user: UserType;
}

export default function CustomerDashboard({ user }: CustomerDashboardProps) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Package, label: "Book Shipment", path: "/dashboard/book" },
    { icon: MapPin, label: "Tracking", path: "/dashboard/tracking" },
    { icon: Bot, label: "AI Assistant", path: "/dashboard/assistant" },
    { icon: Shield, label: "Insurance", path: "/dashboard/insurance" },
    { icon: HelpCircle, label: "Support", path: "/dashboard/support" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
  ];

  // Mock data for demonstration
  const exportVolumeData = [
    { month: 'Jan', shipments: 5 },
    { month: 'Feb', shipments: 8 },
    { month: 'Mar', shipments: 12 },
    { month: 'Apr', shipments: 10 },
    { month: 'May', shipments: 15 },
    { month: 'Jun', shipments: 18 },
  ];

  const stats = [
    {
      title: "Active Shipments",
      value: "8",
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending Invoices",
      value: "₹45,000",
      icon: DollarSign,
      color: "text-ring",
      bgColor: "bg-ring/10",
    },
    {
      title: "Avg. Delivery Time",
      value: "12 days",
      icon: Clock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: CheckCircle2,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  const recentShipments = [
    {
      id: "KP-2024-001",
      destination: "Dubai, UAE",
      status: "In Transit",
      statusColor: "text-ring",
      date: "2024-11-05",
    },
    {
      id: "KP-2024-002",
      destination: "London, UK",
      status: "At Port",
      statusColor: "text-primary",
      date: "2024-11-04",
    },
    {
      id: "KP-2024-003",
      destination: "New York, USA",
      status: "Delivered",
      statusColor: "text-chart-4",
      date: "2024-11-01",
    },
  ];

  return (
    <DashboardLayout user={user} sidebarItems={sidebarItems}>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welcome back, {user.firstName || 'Exporter'}!
          </h1>
          <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
            Here's your export logistics overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`stat-${index}`}>
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Shipments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Shipments</span>
                <Package className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentShipments.map((shipment, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-card hover-elevate transition-all duration-300 cursor-pointer border"
                  data-testid={`shipment-${index}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {shipment.id}
                      </p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {shipment.destination}
                      </p>
                    </div>
                    <span className={`text-sm font-medium ${shipment.statusColor}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {shipment.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {new Date(shipment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Export Volume */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span style={{ fontFamily: 'Poppins, sans-serif' }}>Monthly Export Volume</span>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={exportVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }} />
                  <YAxis className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="shipments" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Support Ticket Status */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                No active support tickets
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
