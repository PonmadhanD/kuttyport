import { Link } from "wouter";
import { Globe, BookOpen, Mail, Phone, Clock, Linkedin } from 'lucide-react';

/**
 * Kutty Port Footer Component
 * Focus: Network, Expertise, and Support for MSME Exporters
 */
export const PublicFooter = () => {
    const contactInfo = {
        email: 'ponmadhan1122@gmail.com',
        phone: '+91 9943244490',
        linkedin: 'https://www.linkedin.com/in/ponmadhan-d'
    };

    return (
        <footer className="bg-gradient-to-br from-blue-800 to-blue-600 text-blue-100 pt-16 pb-6 shadow-2xl">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Main Grid: 4 Pillars */}
                <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8">
                    {/* Pillar 1: Company & Mission */}
                    <div className="col-span-2 md:col-span-1 space-y-4 pr-8">
                        <span className="text-3xl font-bold text-blue-100">Kutty Port</span>
                        <p className="text-sm font-medium text-blue-100/90 mt-2 leading-relaxed">
                            Empowering small and medium exporters with AI-powered logistics solutions.
                        </p>
                        <blockquote className="border-l-4 border-blue-300 pl-3 italic text-lg text-white">
                            Think Local, Ship Global.
                        </blockquote>
                        <a 
                            href={contactInfo.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm font-semibold">Connect on LinkedIn</span>
                        </a>
                    </div>

                    {/* Pillar 2: The Network (Global Reach) */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-blue-200" />
                            Our Global Reach
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { text: 'India Hubs (Mumbai, Chennai, JNPT)', url: '/hubs' },
                                { text: 'Target Markets', url: '/markets' },
                                { text: 'Partner Network', url: '/partners' },
                                { text: 'Track Shipment', url: '/tracking' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={item.url} 
                                        className="hover:text-blue-200 transition-colors duration-200 flex items-center"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pillar 3: Expertise & Resources */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2 text-blue-200" />
                            Exporter Resources
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link 
                                    href="/customs-guide" 
                                    className="hover:text-blue-200 transition-colors duration-200 flex items-center font-semibold text-yellow-300"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 mr-2"></span>
                                    Customs Guide 
                                    <span className="text-xs text-red-300 font-bold ml-1">(NEW)</span>
                                </Link>
                            </li>
                            {[
                                { text: 'Export FAQs', url: '/faq' },
                                { text: 'Blog / Case Studies', url: '/blog' },
                                { text: 'Technology & AI', url: '/technology' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={item.url} 
                                        className="hover:text-blue-200 transition-colors duration-200 flex items-center"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pillar 4: Support & Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Get in Touch
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-5 h-5 text-blue-200 flex-shrink-0" />
                                <a 
                                    href={`mailto:${contactInfo.email}`} 
                                    className="text-sm hover:text-blue-200 transition-colors duration-200 truncate"
                                >
                                    {contactInfo.email}
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-5 h-5 text-blue-200 flex-shrink-0" />
                                <a 
                                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} 
                                    className="text-sm hover:text-blue-200 transition-colors duration-200 whitespace-nowrap"
                                >
                                    {contactInfo.phone}
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-200 flex-shrink-0" />
                                <span className="text-sm">Mon-Fri, 9:00 AM - 6:00 PM IST</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar (Legal Strip) */}
                <div className="border-t border-blue-500/30 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-blue-200/80">
                    <p className="order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {new Date().getFullYear()} Kutty Port. All rights reserved.
                    </p>
                    <div className="order-1 md:order-2 flex space-x-4">
                        <Link 
                            href="/privacy" 
                            className="hover:text-white transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            href="/terms" 
                            className="hover:text-white transition-colors duration-200"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
  );
}
