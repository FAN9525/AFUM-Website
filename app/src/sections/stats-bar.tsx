import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Users, FileCheck, Handshake } from 'lucide-react';

const stats = [
  { icon: Calendar, value: 20, suffix: '+', label: 'Years of Excellence' },
  { icon: Users, value: 22, suffix: '', label: 'Select Broker Partners' },
  { icon: FileCheck, value: 5000, suffix: '+', label: 'Policies Underwritten' },
  { icon: Handshake, value: 15, suffix: '+', label: 'Years Avg. Partnership' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };
  
  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#8B1E1E]/20 rounded-xl mb-4">
                <stat.icon className="w-7 h-7 text-[#8B1E1E]" />
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Divider Lines */}
        <div className="hidden lg:block absolute top-1/2 left-1/4 w-px h-24 bg-gradient-to-b from-transparent via-[#8B1E1E]/30 to-transparent -translate-y-1/2" />
        <div className="hidden lg:block absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#8B1E1E]/30 to-transparent -translate-y-1/2" />
        <div className="hidden lg:block absolute top-1/2 left-3/4 w-px h-24 bg-gradient-to-b from-transparent via-[#8B1E1E]/30 to-transparent -translate-y-1/2" />
      </div>
    </section>
  );
}
