import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from 'react';
import { Home, MapPin, FileText, Shield, BarChart3, CheckCircle2, Clock, Globe, Truck, Building2, Ship, ArrowRight, ChevronRight } from 'lucide-react';

export default function Landing() {
  const services = [
    {
      icon: Home,
      title: "Doorstep Pickup",
      description: "We collect your shipments right from your location, saving you time and effort.",
      gradient: "from-blue-700 to-blue-800",
      iconBg: "bg-white/20",
      iconColor: "text-white"
    },
    {
      icon: Building2,
      title: "Smart Hub Network",
      description: "Optimized local, regional, and port hubs for faster processing and routing.",
      gradient: "from-blue-800 to-blue-900",
      iconBg: "bg-white/20",
      iconColor: "text-white"
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "AI-powered tracking with live updates at every stage of your shipment journey.",
      gradient: "from-blue-900 to-blue-950",
      iconBg: "bg-white/20",
      iconColor: "text-white"
    },
    {
      icon: FileText,
      title: "Customs Assistance",
      description: "Complete documentation and customs clearance support for hassle-free exports.",
      gradient: "from-blue-600 to-blue-700",
      iconBg: "bg-white/20",
      iconColor: "text-white"
    },
    {
      icon: Shield,
      title: "Insurance & Security",
      description: "Comprehensive cargo insurance options to protect your valuable shipments.",
      gradient: "from-blue-800 to-blue-900",
      iconBg: "bg-white/20",
      iconColor: "text-white"
    },
    {
      icon: BarChart3,
      title: "AI-Driven Analytics",
      description: "Data insights and performance dashboards to optimize your export operations.",
      gradient: "from-blue-700 to-blue-800",
      iconBg: "bg-white/20",
      iconColor: "text-white"
    },
  ];

  const clients = [
    { 
      name: "Organic Oils - Salem", 
      type: "Agricultural Products",
      icon: "🌱",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    { 
      name: "Handloom Exports - Kanchipuram", 
      type: "Textiles",
      icon: "🧵",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    { 
      name: "Spice Traders - Cochin", 
      type: "Food Products",
      icon: "🌶️",
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    },
    { 
      name: "Handicrafts - Jaipur", 
      type: "Artisan Goods",
      icon: "🎨",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600"
    },
    { 
      name: "Tea Estates - Darjeeling", 
      type: "Beverages",
      icon: "🍵",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600"
    },
    { 
      name: "Leather Goods - Chennai", 
      type: "Fashion",
      icon: "👝",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600"
    },
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

              {/* Right: Image */}
              <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/Im1.png" 
                    alt="Export Flow Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
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
                <div className="relative z-10 w-full h-full">
                  <img 
                    src="/Im2.png" 
                    alt="Why Choose Us Visual"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-ring/20" />
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
                <div className="relative z-10 w-full h-full">
                  <img 
                    src="/Ima3.png" 
                    alt="Who We Are Visual"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-chart-3/20 to-chart-4/20" />
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
                <div 
                  key={index} 
                  className={`rounded-xl overflow-hidden bg-gradient-to-br ${service.gradient} text-white transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-xl ${service.iconBg} ${service.iconColor}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    </div>
                    <p className="text-white/90 flex-grow font-medium">
                      {service.description}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <div className="h-1 w-8 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
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
                <div key={index} className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`h-16 w-16 rounded-full ${client.bgColor} flex items-center justify-center flex-shrink-0 text-3xl`}>
                        {client.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {client.name}
                        </h4>
                        <p className={`text-sm font-medium ${client.textColor} truncate`} style={{ fontFamily: 'Inter, sans-serif' }}>
                          {client.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <span className="inline-flex items-center text-xs font-medium text-gray-500">
                        Trusted Partner
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Hub Network & Process Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-4">
                OUR PROCESS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Seamless Global Logistics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                From local pickup to international delivery - all in one platform
              </p>
            </div>

            <div className="relative">
              {/* Vertical Timeline */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 to-blue-200 transform -translate-x-1/2"></div>
              
              {/* Process Steps */}
              <div className="space-y-12 md:space-y-16">
                {[
                  {
                    icon: Home,
                    title: '1. Book Shipment',
                    description: 'Create your shipment in minutes with our easy-to-use platform',
                    color: 'text-blue-500',
                    bg: 'bg-blue-50',
                    position: 'md:flex-row',
                    delay: 'delay-100'
                  },
                  {
                    icon: Building2,
                    title: '2. Local Collection',
                    description: 'We pick up from your location with real-time tracking',
                    color: 'text-green-500',
                    bg: 'bg-green-50',
                    position: 'md:flex-row-reverse',
                    delay: 'delay-200'
                  },
                  {
                    icon: Truck,
                    title: '3. Regional Processing',
                    description: 'Consolidation and documentation at our regional hub',
                    color: 'text-purple-500',
                    bg: 'bg-purple-50',
                    position: 'md:flex-row',
                    delay: 'delay-300'
                  },
                  {
                    icon: Ship,
                    title: '4. Port Operations',
                    description: 'Customs clearance and loading onto international vessels',
                    color: 'text-amber-500',
                    bg: 'bg-amber-50',
                    position: 'md:flex-row-reverse',
                    delay: 'delay-400'
                  },
                  {
                    icon: Globe,
                    title: '5. Global Delivery',
                    description: 'Worldwide distribution to the final destination',
                    color: 'text-rose-500',
                    bg: 'bg-rose-50',
                    position: 'md:flex-row',
                    delay: 'delay-500'
                  }
                ].map((step, index) => (
                  <div key={index} className={`flex flex-col items-center ${step.position} gap-8`}>
                    <div className="w-full md:w-1/2">
                      <div className={`p-6 rounded-2xl shadow-sm border border-gray-100 ${step.bg} transition-all duration-300 hover:shadow-md`}>
                        <div className={`w-12 h-12 rounded-lg ${step.bg} flex items-center justify-center mb-4`}>
                          <step.icon className={`w-6 h-6 ${step.color}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex flex-wrap justify-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                {[
                  { icon: '🚚', label: 'Fast Pickup' },
                  { icon: '📱', label: 'Real-time Tracking' },
                  { icon: '🤖', label: 'AI Optimization' },
                  { icon: '🌱', label: 'Eco-friendly' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* New Section for Flowchart and Stats - Added to fix the JSX structure */}
        <section className="py-20 bg-background">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="relative max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
                  {[
                    { icon: Home, label: 'Customer', color: 'text-primary' },
                    { icon: Building2, label: 'Local Hub', color: 'text-ring' },
                    { icon: Truck, label: 'Regional Hub', color: 'text-chart-3' },
                    { icon: Ship, label: 'Port Hub', color: 'text-chart-4' },
                    { icon: Globe, label: 'Export', color: 'text-chart-5' },
                  ].map((item, index) => (
                    <React.Fragment key={item.label}>
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`h-24 w-24 rounded-2xl bg-card border-2 flex items-center justify-center hover-elevate transition-all duration-300 ${item.color}`}>
                          <item.icon className="h-12 w-12" />
                        </div>
                        <span className="font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.label}
                        </span>
                      </div>
                      {index < 4 && (
                        <ChevronRight className="h-8 w-8 text-ring hidden md:block flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

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
                    Cost Effective
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Save up to 30% on logistics costs with our hub model
                  </p>
                </div>
                <div className="space-y-2">
                  <Shield className="h-10 w-10 text-green-500 mx-auto" />
                  <h3 className="font-semibold text-foreground text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Secure & Reliable
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Your shipments are protected with our security measures
                  </p>
                </div>
              </div>
            </div>
        </section>
      </main>

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
      
      <PublicFooter />
    </div>
  );
}
