import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Cloud,
  Radio,
  BarChart3,
  Database,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Lock,
} from "lucide-react";

export default function Technology() {
  const technologies = [
    {
      icon: Brain,
      title: "AI & Automation",
      description: "Advanced machine learning algorithms power our smart routing, predictive analytics, and automated decision-making systems.",
      features: [
        "Smart route optimization for faster deliveries",
        "Predictive shipment arrival times",
        "Anomaly detection for quality control",
        "Intelligent pricing recommendations",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Built on enterprise-grade cloud platforms (AWS/Azure) ensuring scalability, reliability, and 99.9% uptime.",
      features: [
        "Real-time data synchronization",
        "Auto-scaling for peak demand",
        "Multi-region redundancy",
        "Secure encrypted storage",
      ],
    },
    {
      icon: Radio,
      title: "IoT & Smart Sensors",
      description: "Internet of Things devices monitor your cargo conditions in real-time throughout the entire journey.",
      features: [
        "Temperature and humidity monitoring",
        "GPS location tracking",
        "Impact and vibration detection",
        "Real-time alerts for anomalies",
      ],
    },
    {
      icon: BarChart3,
      title: "Data Analytics & BI",
      description: "Powerful business intelligence dashboards provide actionable insights for exporters and partners.",
      features: [
        "Export performance metrics",
        "Delay pattern analysis",
        "Cost optimization insights",
        "Predictive demand forecasting",
      ],
    },
    {
      icon: Database,
      title: "ERP Integration",
      description: "Seamless integration with your existing systems for customs, billing, and inventory management.",
      features: [
        "Automated customs documentation",
        "Real-time billing synchronization",
        "Inventory tracking integration",
        "Multi-system data consolidation",
      ],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Enterprise-level security protocols protect your sensitive data and ensure safe transactions.",
      features: [
        "End-to-end data encryption",
        "Multi-factor authentication",
        "Regular security audits",
        "GDPR compliance",
      ],
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Scalable",
      description: "Grows with your business from 10 to 10,000 shipments",
    },
    {
      icon: TrendingUp,
      title: "Future-Ready",
      description: "Continuous updates with latest technology advances",
    },
    {
      icon: Globe,
      title: "Affordable",
      description: "Enterprise capabilities at MSME-friendly prices",
    },
    {
      icon: Lock,
      title: "Cloud-Based",
      description: "Access from anywhere, anytime, on any device",
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
              Smart, Scalable & MSME-Friendly Export Technology
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              At Kutty Port, we simplify shipping with intelligent AI + IoT systems designed for small exporters
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technologies.map((tech, index) => {
                // Map each card to its corresponding image (Im6 to Im11)
                const imageNumber = index + 6; // 6-11 for Im6 to Im11
                const imagePath = `/Im${imageNumber}.png`;
                
                return (
                  <div key={index} className="relative group rounded-xl overflow-hidden h-full">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={imagePath} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
                    </div>
                    
                    {/* Content */}
                    <Card className="border-0 bg-transparent shadow-none h-full">
                      <CardContent className="p-8 space-y-4 relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                          <tech.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {tech.title}
                        </h3>
                        <p className="text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {tech.description}
                        </p>
                        <ul className="space-y-3 pt-4">
                          {tech.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2 group-hover:translate-x-1 transition-transform duration-200">
                              <div className="h-2 w-2 rounded-full bg-white mt-2 flex-shrink-0" />
                              <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-200" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Decorative elements */}
                        <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-tl-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -top-2 -left-2 h-4 w-4 rounded-br-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Our Tech */}
        <section className="py-20 bg-card">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Why Choose Our Technology
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Built specifically for MSMEs with enterprise-grade capabilities at accessible prices
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center space-y-4" data-testid={`benefit-${index}`}>
                  <div className="h-20 w-20 rounded-2xl bg-ring/10 flex items-center justify-center mx-auto">
                    <benefit.icon className="h-12 w-12 text-ring" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Visual */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Technology Stack
              </h2>
            </div>

            <Card className="border-2 bg-gradient-to-br from-card to-background">
              <CardContent className="p-12">
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="space-y-2">
                      <Cloud className="h-12 w-12 text-primary mx-auto" />
                      <p className="font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Cloud Platform</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>AWS/Azure</p>
                    </div>
                    <div className="space-y-2">
                      <Brain className="h-12 w-12 text-ring mx-auto" />
                      <p className="font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>AI Engine</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>ML Algorithms</p>
                    </div>
                    <div className="space-y-2">
                      <Radio className="h-12 w-12 text-chart-3 mx-auto" />
                      <p className="font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>IoT Layer</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Smart Sensors</p>
                    </div>
                    <div className="space-y-2">
                      <Database className="h-12 w-12 text-chart-4 mx-auto" />
                      <p className="font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>Data Platform</p>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>Analytics & BI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
