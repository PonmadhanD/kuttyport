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
      color: "from-purple-500 to-blue-500",
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
      color: "from-blue-500 to-cyan-500",
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
      color: "from-emerald-500 to-teal-500",
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
      color: "from-amber-500 to-orange-500",
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
      color: "from-indigo-500 to-violet-500",
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
      color: "from-rose-500 to-pink-500",
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
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Future-Ready",
      description: "Continuous updates with latest technology advances",
      color: "text-emerald-500",
    },
    {
      icon: Globe,
      title: "Affordable",
      color: "text-amber-500",
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
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 relative bg-blue-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Why Choose Our Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Built specifically for MSMEs with enterprise-grade capabilities at accessible prices
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-100 to-white shadow-md flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 ${benefit.color || 'text-blue-500'}`}>
                      <benefit.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-10 rounded-3xl"></div>
          </div>
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Transform Your Export Business?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join hundreds of MSMEs already growing their export business with our technology platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started for Free
              </a>
              <a 
                href="#solutions" 
                className="px-8 py-4 bg-white text-gray-800 font-medium rounded-full border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
