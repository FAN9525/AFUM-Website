import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, FileCheck, TrendingUp, Clock, HeadphonesIcon, Shield } from 'lucide-react';

const BrokerBenefits = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: Phone,
      title: 'Direct Access',
      description: 'Speak directly with decision-makers who know your business. No call centers, no runaround.',
    },
    {
      icon: FileCheck,
      title: 'Swift Processing',
      description: 'Fast turnaround on quotes, policy changes, and claims. We respect your time.',
    },
    {
      icon: TrendingUp,
      title: 'Competitive Rates',
      description: 'Access to competitive premiums that help you win and retain clients.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for emergencies and urgent matters.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Dedicated Team',
      description: 'A consistent point of contact who understands your portfolio and preferences.',
    },
    {
      icon: Shield,
      title: 'Risk Expertise',
      description: 'Expert risk assessment and guidance to protect your clients effectively.',
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-burgundy/10 text-burgundy text-sm font-medium rounded-full mb-4"
          >
            Broker Benefits
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Brokers Choose Admin Focus
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We understand that your reputation depends on the partners you choose. 
            That's why we've built every aspect of our service around broker success.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-burgundy/10 text-burgundy mb-6 group-hover:bg-burgundy group-hover:text-white transition-all duration-300"
                whileHover={{ rotate: 10 }}
              >
                <benefit.icon className="w-7 h-7" />
              </motion.div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-burgundy/5 rounded-full transform translate-x-20 -translate-y-20 group-hover:bg-burgundy/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy/5 to-burgundy/10 rounded-3xl" />
          <div className="relative p-8 md:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-6xl text-burgundy/20 font-heading mb-4"
            >
              "
            </motion.div>
            <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-gray-800 mb-6 max-w-4xl mx-auto">
              When you call Admin Focus, someone who knows your business answers the phone. 
              That's rare in this industry.
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-burgundy/20 flex items-center justify-center">
                <span className="text-burgundy font-semibold">JV</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Johan V.</div>
                <div className="text-sm text-gray-500">Partner since 2008</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrokerBenefits;
