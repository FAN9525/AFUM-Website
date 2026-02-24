import { Linkedin, Facebook, Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Broker Portal', href: '#benefits' },
  { name: 'Get a Quote', href: '#contact' },
  { name: 'Contact', href: '#contact' },
];

const products = [
  { name: 'Domestic Insurance', href: '#products' },
  { name: 'Commercial Insurance', href: '#products' },
  { name: 'Agri Insurance', href: '#products' },
  { name: 'Hospitality Insurance', href: '#products' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-[#1a1a2e] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="block mb-6">
              <img 
                src="/images/af-logo.png" 
                alt="Admin Focus Underwriting Managers" 
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted short-term insurance underwriter since 2004. 
              FAIS compliant, broker-focused, committed to excellence.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#8B1E1E]/80 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/AdminFocusUnderwritingManagers/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#8B1E1E]/80 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <div className="footer-title text-lg font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-gray-400 hover:text-[#8B1E1E] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <div className="text-lg font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'white !important' }}>
              Our Products
            </div>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(product.href); }}
                    className="text-gray-400 hover:text-[#8B1E1E] transition-colors text-sm"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <div className="text-lg font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'white !important' }}>
              Contact Us
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8B1E1E] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  18 Water Street, Klipspruit Mall<br />
                  Parys, 9585, South Africa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8B1E1E] flex-shrink-0" />
                <a href="mailto:contact@adminfocus.co.za" className="text-gray-400 hover:text-[#8B1E1E] transition-colors text-sm">
                  contact@adminfocus.co.za
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8B1E1E] flex-shrink-0" />
                <a href="tel:0100065266" className="text-gray-400 hover:text-[#8B1E1E] transition-colors text-sm">
                  010 006 5266
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8B1E1E] flex-shrink-0" />
                <div>
                  <span className="text-gray-400 text-sm">AF Assist 24/7:</span>
                  <a href="tel:0861999007" className="text-[#8B1E1E] hover:text-[#6B1717] transition-colors text-sm block font-semibold">
                    0861 999 007
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Admin Focus Underwriting Managers. All rights reserved.</p>
              <p className="mt-1">
                Authorised Financial Services Provider (FSP 50086) | Underwritten by Guardrisk Insurance Company
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#8B1E1E] transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8B1E1E] transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
