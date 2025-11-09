import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Lightbulb,
  Users,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging cutting-edge AI and IoT technology to revolutionize export logistics.",
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making global trade accessible and affordable for every small business.",
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear pricing, real-time tracking, and honest communication at every step.",
    },
    {
      icon: TrendingUp,
      title: "Empowerment",
      description: "Equipping MSMEs with tools and insights to compete in global markets.",
    },
  ];

  const journey = [
    { year: "2020", milestone: "Company Founded", description: "Started with a vision to democratize global trade" },
    { year: "2021", milestone: "First Hub Established", description: "Launched our first local hub in Coimbatore" },
    { year: "2022", milestone: "Pan-India Expansion", description: "Expanded to 15+ cities across India" },
    { year: "2023", milestone: "AI Integration", description: "Deployed AI-powered routing and analytics" },
    { year: "2024", milestone: "10,000+ Exporters", description: "Serving thousands of MSMEs shipping globally" },
  ];

  const challenges = [
    "High logistics costs eating into profit margins",
    "Complex customs and documentation processes",
    "Lack of transparent tracking and visibility",
    "Delays and unreliable delivery timelines",
    "Limited access to export-focused infrastructure",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About Kutty Port
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              We're transforming small exports through AI, automation, and logistics intelligence.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-2 hover-elevate transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/40 z-10" />
                  <img 
                    src="/Im3.png" 
                    alt="Our Vision"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Eye className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Our Vision
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Empower every small exporter in India to access global trade effortlessly, 
                    breaking down barriers and creating opportunities for MSMEs to thrive internationally.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover-elevate transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-ring/20 to-ring/30 z-10" />
                  <img 
                    src="/Im4.png" 
                    alt="Our Mission"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-ring/10 flex items-center justify-center">
                    <Target className="h-10 w-10 text-ring" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Build a connected logistics ecosystem bridging MSMEs and ports efficiently, 
                    using AI-driven insights and smart infrastructure to make exporting seamless.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why We're Here */}
        <section className="py-20 bg-card">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Why We're Here
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                Small and medium exporters face unique challenges that prevent them from reaching their full potential
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-background">
                  <CheckCircle2 className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                  <p className="text-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {challenge}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="max-w-3xl mx-auto border-2 border-primary/20 overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="/Im5.png" 
                    alt="Solution Background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <CardContent className="p-8 relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Our Solution
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Kutty Port addresses these challenges head-on with AI-powered logistics, transparent pricing, 
                    real-time tracking, and comprehensive support — making global trade accessible to every MSME.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-950/50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Core Values
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                // Different blue shades for each card
                const bgGradients = [
                  'from-blue-500 to-blue-600',
                  'from-blue-600 to-blue-700',
                  'from-blue-700 to-blue-800',
                  'from-blue-600 to-blue-800'
                ];
                
                return (
                  <div 
                    key={index} 
                    className={`group relative h-full rounded-2xl bg-gradient-to-br ${bgGradients[index % bgGradients.length]} p-0.5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                    data-testid={`card-value-${index}`}
                  >
                    <div className="h-full rounded-[calc(1rem-2px)] bg-white dark:bg-gray-900 p-6 text-center transition-all duration-300 group-hover:bg-opacity-90 dark:group-hover:bg-opacity-90">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${bgGradients[index % bgGradients.length]} shadow-lg mb-4`}>
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {value.description}
                      </p>
                      
                      {/* 3D effect elements */}
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-tl-full bg-blue-600/30 dark:bg-blue-400/20 transition-all duration-300 group-hover:h-8 group-hover:w-8"></div>
                      <div className="absolute -top-1 -left-1 h-6 w-6 rounded-br-full bg-white/30 dark:bg-white/10 transition-all duration-300 group-hover:h-8 group-hover:w-8"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="relative py-24 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/20 dark:via-blue-950/10 dark:to-blue-900/30 animate-gradient"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl px-4 relative">
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-3">
                Our Growth Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                From humble beginnings to empowering thousands of exporters worldwide
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 dark:from-blue-800 dark:via-blue-400 dark:to-blue-800"></div>
              
              <div className="space-y-16 md:space-y-12">
                {journey.map((item, index) => (
                  <div 
                    key={index} 
                    className="group relative flex flex-col md:flex-row gap-6 items-start"
                    data-testid={`timeline-${index}`}
                  >
                    {/* Year Badge */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-sm md:text-base" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                          {item.year}
                        </span>
                        <div className="absolute -inset-2 rounded-full bg-blue-400/20 dark:bg-blue-500/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      {index < journey.length - 1 && (
                        <div className="hidden md:block absolute left-1/2 -bottom-14 w-0.5 h-12 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-400"></div>
                      )}
                    </div>
                    
                    {/* Content Card */}
                    <div className="flex-1 w-full">
                      <div className="relative group-hover:-translate-y-1 transition-transform duration-300">
                        <Card className="border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-900/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <CardContent className="relative p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                              <h3 className="text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {item.milestone}
                              </h3>
                            </div>
                            <p className="text-muted-foreground pl-5 border-l-2 border-blue-200 dark:border-blue-800 ml-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {item.description}
                            </p>
                            <div className="absolute -right-2 -bottom-2 h-4 w-4 rounded-tl-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="hidden md:block absolute -right-20 top-1/4 w-40 h-40 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl -z-10"></div>
              <div className="hidden md:block absolute -left-20 bottom-1/4 w-40 h-40 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl -z-10"></div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
