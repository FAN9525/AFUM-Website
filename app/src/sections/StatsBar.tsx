import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Clock, Shield } from 'lucide-react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsBar = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: 99,
      suffix: '%',
      label: 'Partner Retention',
      description: 'Long-term relationships',
    },
    {
      icon: Users,
      value: 15,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Trusted industry experience',
    },
    {
      icon: Clock,
      value: 24,
      suffix: 'h',
      label: 'Response Time',
      description: 'Swift claim processing',
    },
    {
      icon: Shield,
      value: 4,
      suffix: '',
      label: 'Specialized Products',
      description: 'Comprehensive coverage',
    },
  ];

  return (
    <section className="relative py-16 bg-gray-100 overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #8B1E1E 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-burgundy/10 text-burgundy mb-4 group-hover:bg-burgundy group-hover:text-white transition-all duration-300"
                whileHover={{ rotate: 5 }}
              >
                <stat.icon className="w-7 h-7" />
              </motion.div>
              <div className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
