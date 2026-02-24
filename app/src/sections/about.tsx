import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Clock, HeadphonesIcon, BookOpen, Users, Shield } from 'lucide-react';

const features = [
  { icon: Users, text: 'Hand-picked broker partnerships' },
  { icon: Clock, text: 'Relationships spanning 15+ years' },
  { icon: Shield, text: 'Portfolio-focused underwriting' },
  { icon: TrendingUp, text: 'Competitive commission structures' },
  { icon: HeadphonesIcon, text: 'Dedicated relationship managers' },
  { icon: BookOpen, text: 'Comprehensive product expertise' },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1E1E]/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/about-office.jpg"
                alt="Modern Admin Focus office"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-6 -right-6 bg-[#1a1a2e] rounded-xl shadow-xl p-6 hidden md:block"
            >
              <div className="text-center">
                <p className="text-4xl font-bold text-[#8B1E1E]" style={{ fontFamily: 'Playfair Display, serif' }}>22</p>
                <p className="text-white text-sm">Select Partners</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-[#8B1E1E] font-semibold text-sm uppercase tracking-wider">
                Our Philosophy
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl md:text-4xl font-bold text-[#1a1a2e]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Quality Over Quantity
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-20 h-1 bg-[#8B1E1E] rounded-full"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-gray-600 leading-relaxed"
            >
              Admin Focus is not the biggest UMA in the market—and that's by design. We serve 
              only 22 carefully selected brokers, each with whom we've built relationships 
              spanning more than 15 years. We don't accept every broker who applies. 
              Partnership with us is by invitation only.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-gray-600 leading-relaxed"
            >
              We don't chase unprofitable business. Our focus is on managing our portfolio 
              with precision, ensuring we remain competitive against top facilities while 
              providing our brokers with the stability and support they need to thrive.
            </motion.p>
            
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-[#8B1E1E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B1E1E]/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-[#8B1E1E]" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
