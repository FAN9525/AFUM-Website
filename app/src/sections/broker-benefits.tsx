import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Megaphone, GraduationCap, HeadphonesIcon, Laptop, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Portfolio Protection',
    description: 'We manage your portfolio with the same care as our own—no unprofitable business, no unnecessary risks.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Positioning',
    description: 'Our selective approach ensures we remain competitive against top facilities, protecting your market position.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'With only 22 partners, you receive personalized attention from a relationship manager who knows your business.',
  },
  {
    icon: GraduationCap,
    title: 'Expert Knowledge',
    description: 'Access to deep product expertise and industry insights from a team focused on quality, not volume.',
  },
  {
    icon: Laptop,
    title: 'Efficient Systems',
    description: 'Digital tools designed for efficiency, not scale—because your time is valuable.',
  },
  {
    icon: Megaphone,
    title: 'Co-Branding Opportunities',
    description: 'Professional marketing materials that position you alongside a trusted, established brand.',
  },
];

export function BrokerBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[#1a1a2e] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E1E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[#8B1E1E] font-semibold text-sm uppercase tracking-wider"
              >
                The Admin Focus Difference
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-3xl md:text-4xl font-bold text-white mt-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                An Exclusive Partnership
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-20 h-1 bg-[#8B1E1E] rounded-full mt-4"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-300 mt-4 text-lg"
              >
                Being part of Admin Focus means joining an exclusive group of brokers 
                who value stability, expertise, and long-term relationships over quick wins. 
                We're not for everyone—and that's exactly the point.
              </motion.p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#8B1E1E]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B1E1E]/30 transition-colors">
                      <benefit.icon className="w-6 h-6 text-[#8B1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/broker-benefits.jpg"
                alt="Partnership and growth illustration"
                className="w-full h-auto object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/40 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#8B1E1E]/20 rounded-full flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#8B1E1E]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a2e]" style={{ fontFamily: 'Playfair Display, serif' }}>5,000+</p>
                  <p className="text-gray-600 text-sm">Policies Managed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
