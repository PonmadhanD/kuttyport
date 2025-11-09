import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Ship, Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Platform", path: "/platform" },
    { label: "Technology", path: "/technology" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Background Image Element */}
        <div className="absolute right-0 top-0 h-full w-1/3">
          <img 
            src="/images/Im1.png" 
            alt="" 
            className="h-full w-full object-cover object-left opacity-10"
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex h-20 items-center justify-between px-4">
          {/* Logo and Slogan */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3 cursor-pointer hover-elevate active-elevate-2 p-2 rounded-lg -ml-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                <img 
                  src="/favicon.png" 
                  alt="Kutty Port Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-foreground font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Kutty Port
                </span>
                <span className="text-xs text-muted-foreground font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Think Local, Ship Global
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  size="sm"
                  className="font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a href="/api/login" data-testid="button-login">
              <Button variant="ghost" size="sm" className="font-medium">
                Login
              </Button>
            </a>
            <a href="/api/login" data-testid="button-signup">
              <Button size="sm" className="font-medium">
                Sign Up
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-lg"
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 px-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive(item.path) ? "secondary" : "ghost"}
                    className="w-full justify-start font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-link-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-2">
                <a href="/api/login" className="w-full">
                  <Button variant="ghost" className="w-full font-medium" data-testid="mobile-button-login">
                    Login
                  </Button>
                </a>
                <a href="/api/login" className="w-full">
                  <Button className="w-full font-medium" data-testid="mobile-button-signup">
                    Sign Up
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
