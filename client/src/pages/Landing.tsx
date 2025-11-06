import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Package,
  MapPin,
  FileText,
  Shield,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Clock,
  Globe,
  Truck,
  Building2,
  Ship,
  ArrowRight,
} from "lucide-react";

export default function Landing() {
  const services = [
    {
      icon: Home,
      title: "Doorstep Pickup",
      description: "We collect your shipments right from your location, saving you time and effort.",
    },
    {
      icon: Building2,
      title: "Smart Hub Network",
      description: "Optimized local, regional, and port hubs for faster processing and routing.",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "AI-powered tracking with live updates at every stage of your shipment journey.",
    },
    {
      icon: FileText,
      title: "Customs Assistance",
      description: "Complete documentation and customs clearance support for hassle-free exports.",
    },
    {
      icon: Shield,
      title: "Insurance & Security",
      description: "Comprehensive cargo insurance options to protect your valuable shipments.",
    },
    {
      icon: BarChart3,
      title: "AI-Driven Analytics",
      description: "Data insights and performance dashboards to optimize your export operations.",
    },
  ];

  const clients = [
    { name: "Organic Oils - Salem", type: "Agricultural Products" },
    { name: "Handloom Exports - Kanchipuram", type: "Textiles" },
    { name: "Spice Traders - Cochin", type: "Food Products" },
    { name: "Handicrafts - Jaipur", type: "Artisan Goods" },
    { name: "Tea Estates - Darjeeling", type: "Beverages" },
    { name: "Leather Goods - Chennai", type: "Fashion" },
    { name: "Electronics - Bengaluru", type: "Technology" },
    { name: "Ayurvedic Products - Kerala", type: "Healthcare" },
    { name: "Jewelry - Mumbai", type: "Precious Goods" },
  ];

  const benefits = [
    "End-to-End Shipping Simplified",
    "Transparent Pricing",
    "AI-Powered Real-Time Tracking",
    "Seamless Document & Customs Support",
  ];

  const hubSteps = [
    { icon: Home, label: "Customer", color: "text-primary" },
    { icon: Building2, label: "Local Hub", color: "text-ring" },
    { icon: Truck, label: "Regional Hub", color: "text-chart-3" },
    { icon: Ship, label: "Port Hub", color: "text-chart-4" },
    { icon: Globe, label: "Export", color: "text-chart-5" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-card overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Headline & CTA */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Empowering Small Exporters to Go Global
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    AI + IoT powered logistics network for MSMEs, from your doorstep to port.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/api/login" data-testid="button-get-started">
                    <Button size="lg" className="text-lg font-semibold w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                  <a href="/api/login" data-testid="button-join-exporter">
                    <Button size="lg" variant="outline" className="text-lg font-semibold w-full sm:w-auto">
                      Join as Exporter
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right: Animated Cargo Flow Visual */}
              <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-ring/10 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Package className="h-10 w-10 text-primary" />
                      </div>
                      <span className="text-sm font-medium">Local</span>
                    </div>
                    <ArrowRight className="h-8 w-8 text-ring" />
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-20 rounded-2xl bg-ring/20 flex items-center justify-center">
                        <Truck className="h-10 w-10 text-ring" />
                      </div>
                      <span className="text-sm font-medium">Hub</span>
                    </div>
                    <ArrowRight className="h-8 w-8 text-ring" />
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-20 w-20 rounded-2xl bg-chart-3/20 flex items-center justify-center">
                        <Ship className="h-10 w-10 text-chart-3" />
                      </div>
                      <span className="text-sm font-medium">Port</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <ArrowRight className="h-8 w-8 text-chart-5 rotate-90" />
                    <div className="h-20 w-20 rounded-2xl bg-chart-5/20 flex items-center justify-center">
                      <Globe className="h-10 w-10 text-chart-5" />
                    </div>
                    <span className="text-sm font-medium">Global</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Image/Visual */}
              <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-primary/10 to-ring/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative z-10">
                  <TrendingUp className="h-48 w-48 text-primary opacity-20" />
                </div>
              </div>

              {/* Right: Key Points */}
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Why Choose Us
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-ring flex-shrink-0 mt-1" />
                      <p className="text-lg text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are / Mission */}
        <section className="py-20 bg-card">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Who We Are
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  We're building the next-gen export ecosystem for small businesses — connecting local 
                  entrepreneurs to global markets through intelligent logistics, AI-driven insights, 
                  and seamless end-to-end support.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Our mission is to democratize global trade by making export logistics accessible, 
                  affordable, and efficient for MSMEs across India.
                </p>
              </div>

              {/* Right: Image */}
              <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-ring/10 to-chart-3/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative z-10">
                  <Globe className="h-48 w-48 text-ring opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Comprehensive logistics solutions tailored for small and medium exporters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover-elevate transition-all duration-300 border-2" data-testid={`card-service-${index}`}>
                  <CardContent className="p-8 space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-ring/10 flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-ring" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Major Clients Carousel */}
        <section className="py-20 bg-card">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Trusted by Exporters Across India
              </h2>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Join hundreds of successful MSMEs shipping globally
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-client-${index}`}>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {client.name}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {client.type}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hub Model Illustration */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Smart Hub Model
              </h2>
              <p className="text-lg text-ring font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Faster • Smarter • Greener Export Chain
              </p>
            </div>

            {/* Hub Flow Diagram */}
            <div className="relative max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
                {hubSteps.map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
                    <div className="flex flex-col items-center space-y-3">
                      <div className={`h-24 w-24 rounded-2xl bg-card border-2 flex items-center justify-center hover-elevate transition-all duration-300 ${step.color}`}>
                        <step.icon className="h-12 w-12" />
                      </div>
                      <span className="font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {step.label}
                      </span>
                    </div>
                    {index < hubSteps.length - 1 && (
                      <ArrowRight className="h-8 w-8 text-ring hidden md:block flex-shrink-0" />
                    )}
                    {index < hubSteps.length - 1 && (
                      <ArrowRight className="h-8 w-8 text-ring md:hidden rotate-90 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <Clock className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Faster Delivery
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Optimized routing reduces transit time by up to 40%
                  </p>
                </div>
                <div className="space-y-2">
                  <BarChart3 className="h-10 w-10 text-ring mx-auto" />
                  <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    AI-Powered Intelligence
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Smart predictions and real-time optimization
                  </p>
                </div>
                <div className="space-y-2">
                  <Globe className="h-10 w-10 text-chart-3 mx-auto" />
                  <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Sustainable Logistics
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Eco-friendly practices reduce carbon footprint
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Go Global?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join thousands of MSMEs already shipping worldwide with Kutty Port
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/api/login">
                <Button size="lg" variant="secondary" className="text-lg font-semibold w-full sm:w-auto">
                  Start Shipping Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="text-lg font-semibold w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Contact Sales
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
