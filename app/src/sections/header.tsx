import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { 
    name: 'Products', 
    href: '#products',
    dropdown: [
      { name: 'Domestic Insurance', href: '#products' },
      { name: 'Commercial Insurance', href: '#products' },
      { name: 'Agri Insurance', href: '#products' },
      { name: 'Hospitality Insurance', href: '#products' },
    ]
  },
  { name: 'Partnership', href: '#benefits' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center group"
          >
            <img 
              src="/images/af-logo.png" 
              alt="Admin Focus Underwriting Managers" 
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="flex items-center gap-1 text-gray-700 hover:text-[#8B1E1E] font-medium transition-colors relative group"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B1E1E] transition-all duration-250 group-hover:w-full" />
                </a>
                
                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#8B1E1E] transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-[#8B1E1E] hover:bg-[#6B1717] text-white font-semibold px-6"
            >
              Inquire
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Logo */}
                <img 
                  src="/images/af-logo.png" 
                  alt="Admin Focus Underwriting Managers" 
                  className="h-12 w-auto object-contain mb-4"
                />
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="text-lg font-medium text-gray-800 hover:text-[#8B1E1E] transition-colors"
                    >
                      {link.name}
                    </a>
                    {link.dropdown && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                            className="text-sm text-gray-600 hover:text-[#8B1E1E] transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button 
                  onClick={() => scrollToSection('#contact')}
                  className="bg-[#8B1E1E] hover:bg-[#6B1717] text-white font-semibold w-full mt-4"
                >
                  Inquire About Partnership
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
