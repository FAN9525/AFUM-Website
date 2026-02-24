import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Phone } from 'lucide-react';

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8B1E1E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1a1a2e]/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1E1E]/10 text-[#8B1E1E] rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                Exclusive Underwriting Since 2004
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Stability Through{' '}
              <span className="text-[#8B1E1E]">Selective</span> Partnership
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
            >
              Admin Focus Underwriting Managers partners with a select group of brokers, 
              building relationships that span decades. We don't chase volume—we protect 
              portfolios with precision and care.
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-[#8B1E1E] hover:bg-[#6B1717] text-white font-semibold px-8 py-6 text-lg group"
              >
                Inquire About Partnership
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => scrollToSection('#about')}
                variant="outline"
                className="border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white px-8 py-6 text-lg"
              >
                Our Philosophy
              </Button>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-[#8B1E1E]" />
                <span>FSP 50086</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-[#8B1E1E]" />
                <span>FAIS Compliant</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#8B1E1E]" />
                <span>Underwritten by Guardrisk</span>
              </div>
            </motion.div>
          </div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero-image.jpg"
                alt="Professional insurance brokers collaborating"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#8B1E1E]/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#8B1E1E]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a2e]">15+ Years</p>
                  <p className="text-sm text-gray-600">Average Partnership</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-[#1a1a2e]/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-[#1a1a2e]/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
