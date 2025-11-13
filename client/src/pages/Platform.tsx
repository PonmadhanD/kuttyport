import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from 'wouter';
import {
  Package,
  Truck,
  Settings,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function Platform() {
  const [, setLocation] = useLocation();
  const portals = [
    {
      icon: Package,
      title: "Customer Portal",
      description: "Book, track, and manage all your export shipments in one place",
      features: [
        "Easy shipment booking with step-by-step guidance",
        "Real-time tracking with live map updates",
        "AI assistant for instant support",
        "Invoice management and payment tracking",
        "Insurance options for cargo protection",
      ],
      color: "from-primary to-primary/80",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      dataTestId: "card-customer-portal",
    },
    {
      icon: Truck,
      title: "Delivery Partner Portal",
      description: "Manage routes, deliveries, and earnings efficiently",
      features: [
        "Smart route assignments with AI optimization",
        "Flexible shift selection (Customer↔Hub or Hub↔Hub)",
        "Real-time earnings and incentive tracking",
        "Performance score and gamified rewards",
        "Direct communication with hub managers",
      ],
      color: "from-blue-500 to-blue-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      dataTestId: "card-delivery-portal",
    },
    {
      icon: Settings,
      title: "Managers & Admin Portal",
      description: "Complete operations management and oversight",
      features: [
        "Hub operations and shipment management",
        "Delivery partner assignment and tracking",
        "Customer query handling and support",
        "AI analytics for performance insights",
        "System-wide controls and approvals",
      ],
      color: "from-chart-3 to-chart-3/80",
      iconBg: "bg-chart-3/10",
      iconColor: "text-chart-3",
      dataTestId: "card-admin-portal",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Choose Your Portal
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Specialized dashboards for every role in the export logistics ecosystem
            </p>
          </div>
        </section>

        {/* Portal Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {portals.map((portal, index) => (
                <Card 
                  key={index} 
                  className="hover-elevate transition-all duration-300 border-2 overflow-hidden group cursor-pointer"
                  data-testid={portal.dataTestId}
                >
                  <div className={`h-2 bg-gradient-to-r ${portal.color}`} />
                  <CardHeader className="space-y-4 pb-6">
                    <div className={`h-16 w-16 rounded-2xl ${portal.iconBg} flex items-center justify-center`}>
                      <portal.icon className={`h-10 w-10 ${portal.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {portal.title}
                    </CardTitle>
                    <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {portal.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        KEY FEATURES:
                      </h4>
                      <ul className="space-y-2">
                        {portal.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Shield className={`h-5 w-5 ${portal.iconColor} flex-shrink-0 mt-0.5`} />
                            <span className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button 
                        className="w-full group-hover:shadow-lg transition-all" 
                        data-testid={`button-login-${index}`}
                        onClick={() => {
                          console.log('Portal title:', portal.title); // Debug log
                          if (portal.title === 'Delivery Partner Portal') {
                            setLocation('/delivery/dashboard');
                          } else if (portal.title === 'Managers & Admin Portal') {
                            setLocation('/admin/dashboard');
                          } else {
                            window.location.href = '/api/login';
                          }
                        }}
                      >
                        Login to Portal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <a href="/api/login" className="block">
                        <Button variant="outline" className="w-full" data-testid={`button-signup-${index}`}>
                          Sign Up
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-ring">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Not sure which portal is right for you?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Contact our team and we'll help you get started with the right solution
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="text-lg font-semibold">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
