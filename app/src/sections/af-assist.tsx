import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Clock, Shield, HeadphonesIcon } from 'lucide-react';

export function AFAssist() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section className="py-16 lg:py-20 bg-[#8B1E1E] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6"
          >
            <HeadphonesIcon className="w-10 h-10 text-[#8B1E1E]" />
          </motion.div>
          
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            AF Assist - 24/7 Emergency Support
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white/80 text-lg mb-8"
          >
            Help is just a phone call away, any time of day or night
          </motion.p>
          
          {/* Phone Number */}
          <motion.a
            href="tel:0861999007"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-4 bg-white text-[#1a1a2e] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <Phone className="w-8 h-8 text-[#8B1E1E] group-hover:scale-110 transition-transform" />
            <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              0861 999 007
            </span>
          </motion.a>
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Available 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Emergency Assistance</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Phone className="w-5 h-5" />
              <span className="font-medium">Toll-Free Number</span>
            </div>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white/60 mt-6 max-w-xl mx-auto"
          >
            Our dedicated emergency assistance line is available around the clock 
            for policyholders and brokers. Whether it's a claim emergency or general 
            assistance, we're here to help.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
