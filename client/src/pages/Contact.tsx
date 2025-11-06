import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement form submission
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@kuttyport.com",
      link: "mailto:support@kuttyport.com",
    },
    {
      icon: Phone,
      title: "Hotline",
      value: "+91 123 456 7890",
      link: "tel:+911234567890",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Coimbatore Hub, Tamil Nadu, India",
      link: null,
    },
    {
      icon: Clock,
      title: "Hours",
      value: "Mon-Sat: 9:00 AM - 6:00 PM",
      link: null,
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
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Have questions about our services? We're here to help you start shipping globally.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Send us a Message
                </h2>
                <Card className="border-2">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-medium">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-12"
                          data-testid="input-name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="designation" className="text-foreground font-medium">
                          Designation
                        </Label>
                        <Input
                          id="designation"
                          type="text"
                          placeholder="Your role/position"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="h-12"
                          data-testid="input-designation"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="h-12"
                            data-testid="input-email"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground font-medium">
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="h-12"
                            data-testid="input-phone"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-foreground font-medium">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="h-12"
                          data-testid="input-subject"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your export needs..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="min-h-[150px] resize-none"
                          data-testid="input-message"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full font-semibold" data-testid="button-send-message">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Map & Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <Card key={index} className="hover-elevate transition-all duration-300 border-2" data-testid={`card-contact-${index}`}>
                        <CardContent className="p-6 flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {info.title}
                            </p>
                            {info.link ? (
                              <a 
                                href={info.link} 
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {info.value}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Our Location
                  </h3>
                  <Card className="border-2 overflow-hidden">
                    <div className="h-96 bg-gradient-to-br from-primary/10 to-ring/10 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-16 w-16 text-primary mx-auto" />
                        <p className="text-lg font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Coimbatore Hub
                        </p>
                        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Tamil Nadu, India
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
