import { Link } from "wouter";
import { Ship, Mail, Phone, Linkedin } from "lucide-react";

export function PublicFooter() {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Platform", path: "/platform" },
    { label: "Technology", path: "/technology" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Logo + Slogan + Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ring">
                <Ship className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Kutty Port
                </span>
                <span className="text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Think Local, Ship Global
                </span>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              Empowering small and medium exporters with AI-powered logistics solutions. 
              From your doorstep to global ports, we make exporting seamless.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity hover-elevate p-2 rounded-md inline-block" 
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Connect with Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Connect with Us
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:support@kuttyport.com"
                className="flex items-center space-x-3 text-sm opacity-80 hover:opacity-100 transition-opacity hover-elevate p-2 rounded-md"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>support@kuttyport.com</span>
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center space-x-3 text-sm opacity-80 hover:opacity-100 transition-opacity hover-elevate p-2 rounded-md"
                data-testid="link-phone"
              >
                <Phone className="h-5 w-5" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>+91 123 456 7890</span>
              </a>
              <a
                href="https://linkedin.com/company/kuttyport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm opacity-80 hover:opacity-100 transition-opacity hover-elevate p-2 rounded-md"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
                <span style={{ fontFamily: 'Inter, sans-serif' }}>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-70" style={{ fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} Kutty Port. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
