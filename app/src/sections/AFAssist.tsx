import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, Zap, Bell, BarChart3, Shield, Clock } from 'lucide-react';

const AFAssist = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Submit claims, check policy details, and get instant updates from anywhere.',
    },
    {
      icon: Zap,
      title: 'Instant Quotes',
      description: 'Get real-time quotes for new business in seconds, not hours.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay informed with automated alerts for claims, renewals, and important updates.',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Insights',
      description: 'Access detailed analytics and reports on your portfolio performance.',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Bank-level security ensures your data is always protected.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access your information anytime, day or night, from any device.',
    },
  ];

  return (
    <section id="af-assist" className="py-24 bg-burgundy relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4"
          >
            Digital Platform
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            AF Assist
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our cutting-edge digital platform puts the power of Admin Focus in your hands. 
            Manage your portfolio, submit claims, and access insights—all from one powerful dashboard.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: App Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* App Header */}
                  <div className="bg-burgundy p-6 pt-10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white/70 text-sm">Welcome back</p>
                        <h4 className="text-white font-semibold">Broker Portal</h4>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">JD</span>
                      </div>
                    </div>
                  </div>
                  {/* App Content */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-burgundy/10 flex items-center justify-center mb-2">
                          <Zap className="w-4 h-4 text-burgundy" />
                        </div>
                        <p className="text-xs text-gray-500">New Quote</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-burgundy/10 flex items-center justify-center mb-2">
                          <Bell className="w-4 h-4 text-burgundy" />
                        </div>
                        <p className="text-xs text-gray-500">Claims</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Portfolio</span>
                        <span className="text-xs text-burgundy">View All</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-burgundy rounded-full" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">1,234 active policies</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                className="absolute -right-4 top-20 bg-white rounded-xl p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">Fast Processing</p>
                    <p className="text-xs text-gray-500">2 min avg</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group p-5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 text-white mb-3 group-hover:bg-white group-hover:text-burgundy transition-all">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-white/70 mb-4">Already a partner? Access your account</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-burgundy font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Login to AF Assist</span>
            <Smartphone className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AFAssist;
