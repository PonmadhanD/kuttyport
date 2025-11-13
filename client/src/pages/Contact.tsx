import { useState } from "react";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

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
    // TODO: Implement actual submission (e.g. API endpoint or email service)
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ponmadhan1122@gmail.com",
      link: "mailto:ponmadhan1122@gmail.com",
    },
    {
      icon: Phone,
      title: "Hotline",
      value: "+91 9943244480",
      link: "tel:+919943244480",
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
            <h1
              className="text-5xl md:text-6xl font-bold text-foreground mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Get in Touch
            </h1>
            <p
              className="text-xl text-muted-foreground leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Have questions about our services? We're here to help you start
              shipping globally.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Contact Form */}
              <div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 transition duration-300"></div>

                  <Card className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 border-white/10 shadow-xl overflow-hidden">
                    <CardContent className="p-8 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full -ml-20 -mb-20"></div>

                      <div className="relative">
                        <h2
                          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Send us a Message
                        </h2>
                        <p
                          className="text-muted-foreground mb-6"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          We'll get back to you within 24 hours
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Name & Designation */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-2 group">
                              <Label
                                htmlFor="name"
                                className="text-foreground/80 font-medium group-focus-within:text-blue-600 transition-colors"
                              >
                                Name *
                              </Label>
                              <Input
                                id="name"
                                type="text"
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                required
                                className="h-12 bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              />
                            </div>

                            {/* Designation */}
                            <div className="space-y-2 group">
                              <Label
                                htmlFor="designation"
                                className="text-foreground/80 font-medium group-focus-within:text-blue-600 transition-colors"
                              >
                                Designation
                              </Label>
                              <Input
                                id="designation"
                                type="text"
                                placeholder="Your role/position"
                                value={formData.designation}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    designation: e.target.value,
                                  })
                                }
                                className="h-12 bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              />
                            </div>

                            {/* Email */}
                            <div className="space-y-2 group">
                              <Label
                                htmlFor="email"
                                className="text-foreground/80 font-medium group-focus-within:text-blue-600 transition-colors"
                              >
                                Email *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                required
                                className="h-12 bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2 group">
                              <Label
                                htmlFor="phone"
                                className="text-foreground/80 font-medium group-focus-within:text-blue-600 transition-colors"
                              >
                                Phone *
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                required
                                className="h-12 bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              />
                            </div>
                          </div>

                          {/* Subject */}
                          <div className="space-y-2 group">
                            <Label
                              htmlFor="subject"
                              className="text-foreground/80 font-medium group-focus-within:text-blue-600 transition-colors"
                            >
                              Subject *
                            </Label>
                            <Input
                              id="subject"
                              type="text"
                              placeholder="How can we help?"
                              value={formData.subject}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  subject: e.target.value,
                                })
                              }
                              required
                              className="h-12 bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            />
                          </div>

                          {/* Message */}
                          <div className="space-y-2 group">
                            <Label
                              htmlFor="message"
                              className="text-foreground/80 font-medium group-focus-within:text-blue-600 transition-colors"
                            >
                              Message *
                            </Label>
                            <Textarea
                              id="message"
                              placeholder="Tell us more about your export needs..."
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                              required
                              className="min-h-[150px] bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                            />
                          </div>

                          {/* Submit */}
                          <div className="pt-2">
                            <Button
                              type="submit"
                              size="lg"
                              className="w-full font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                              <span>Send Message</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Button>
                          </div>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right: Contact Info & Map */}
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Contact Information
                  </h2>
                  <div className="grid gap-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <Card 
                          className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <CardContent className="p-6 flex items-start space-x-4">
                            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <info.icon className="h-6 w-6 text-blue-500 group-hover:text-purple-600 transition-colors duration-300" />
                            </div>
                            <div className="flex-1">
                              <p
                                className="text-sm font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {info.title}
                              </p>
                              {info.link ? (
                                <a
                                  href={info.link}
                                  className="text-base font-semibold text-foreground hover:text-blue-600 transition-colors inline-flex items-center group-hover:translate-x-1 transition-transform duration-200"
                                  style={{ fontFamily: "Poppins, sans-serif" }}
                                >
                                  {info.value}
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-4 w-4 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </a>
                              ) : (
                                <p
                                  className="text-base font-semibold text-foreground"
                                  style={{ fontFamily: "Poppins, sans-serif" }}
                                >
                                  {info.value}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Section */}
                <div>
                  <h3
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Our Location
                  </h3>
                  <Card className="border-2 border-white/10 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-96 w-full relative">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125223.60310386298!2d76.860673!3d11.0065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582d5471c1a5%3A0x7fec1f9a4a4a4a4a!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg"
                        title="Coimbatore Location"
                      />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <a
                          href="https://www.google.com/maps/place/Coimbatore,+Tamil+Nadu/@11.0065002,76.860673,12z/data=!3m1!4b1!4m5!3m4!1s0x3ba8582d5471c1a5:0x7fec1f9a4a4a4a4a!8m2!3d11.0168445!4d76.9558321"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-white text-blue-700 font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <MapPin className="h-5 w-5 mr-2 text-red-500" />
                          <span className="text-sm font-semibold">View on Google Maps</span>
                        </a>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-white">
                      <p className="text-sm text-center text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span className="font-semibold">Coimbatore Hub</span> • Tamil Nadu, India
                      </p>
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
