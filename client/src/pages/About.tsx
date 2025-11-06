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
              <Card className="border-2 hover-elevate transition-all duration-300">
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

              <Card className="border-2 hover-elevate transition-all duration-300">
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
              <Card className="max-w-3xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-ring/5">
                <CardContent className="p-8">
                  <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Our Solution
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Kutty Port addresses these challenges head-on with AI-powered logistics, transparent pricing, 
                    real-time tracking, and comprehensive support — making global trade accessible to every MSME.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Core Values
              </h2>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="hover-elevate transition-all duration-300 border-2" data-testid={`card-value-${index}`}>
                  <CardContent className="p-6 space-y-4 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-ring/10 flex items-center justify-center mx-auto">
                      <value.icon className="h-10 w-10 text-ring" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="py-20 bg-card">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                From humble beginnings to empowering thousands of exporters
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {journey.map((item, index) => (
                  <div key={index} className="flex gap-6" data-testid={`timeline-${index}`}>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold text-sm" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                          {item.year}
                        </span>
                      </div>
                      {index < journey.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <Card className="hover-elevate transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {item.milestone}
                          </h3>
                          <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
