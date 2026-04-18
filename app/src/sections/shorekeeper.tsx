import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Users, BarChart3, LogIn, ExternalLink } from 'lucide-react';

const audiences = [
  {
    icon: FileText,
    role: 'Policyholder',
    description: 'Track your claim from submission to settlement in real time. No more uncertainty — just clear, transparent progress at every stage.',
  },
  {
    icon: Users,
    role: 'Broker',
    description: 'Manage your entire book from a single dashboard. Monitor policies, submit claims on behalf of clients, and stay on top of your portfolio.',
  },
  {
    icon: BarChart3,
    role: 'Insurer Partner',
    description: 'Monitor underwriting performance with live data. Gain the visibility you need to make confident, informed decisions.',
  },
];

export function Shorekeeper() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="shorekeeper" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#8B1E1E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1a1a2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Logo + label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center mb-12"
        >
          <span className="text-[#8B1E1E] font-semibold text-sm uppercase tracking-wider mb-6">
            Our Technology Platform
          </span>
          <div className="bg-white rounded-2xl shadow-md px-10 py-6 inline-flex items-center justify-center border border-gray-100">
            <img
              src="/images/Shorekeeper_logo_cropped.png"
              alt="Shorekeeper"
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="w-20 h-1 bg-[#8B1E1E] rounded-full mt-8" />
        </motion.div>

        {/* Two-column layout: intro text + feature highlights */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start mb-20">

          {/* Left — intro paragraphs */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl md:text-4xl font-bold text-[#1a1a2e]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Purpose-Built for South African Insurance
            </motion.h2>

            {[
              'Admin Focus Underwriting Managers operates on Shorekeeper — a purpose-built insurance claims and operations platform developed by Open Door Software.',
              'Shorekeeper provides our clients, brokers and insurer partners with a single, secure portal to manage policies, track claims and communicate in real time. Designed specifically for the South African short-term insurance environment, it brings transparency and efficiency to every stage of the claims lifecycle.',
              'Whether you are a policyholder tracking a claim, a broker managing your book, or an insurer partner monitoring underwriting performance — Shorekeeper gives you the information you need, when you need it.',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-600 leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Right — feature pill-list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-[#1a1a2e] rounded-2xl p-8 shadow-xl space-y-5"
          >
            <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Shorekeeper Delivers
            </h3>
            {[
              'Single, secure portal for all stakeholders',
              'Real-time policy and claims tracking',
              'Broker book-of-business management',
              'Insurer underwriting performance dashboards',
              'Built for the South African short-term market',
              'Developed by Open Door Software',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-[#8B1E1E] flex-shrink-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Audience cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.role}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 group hover:shadow-md hover:border-[#8B1E1E]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#8B1E1E]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B1E1E]/20 transition-colors">
                <audience.icon className="w-6 h-6 text-[#8B1E1E]" />
              </div>
              <h4 className="text-[#1a1a2e] font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {audience.role}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{audience.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <a
            href="https://dev.shorekeeper.co.za/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#8B1E1E] hover:bg-[#7a1a1a] text-white font-semibold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <LogIn className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            Sign In to Shorekeeper
          </a>
          <a
            href="https://www.shorekeeper.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 group"
          >
            Visit Shorekeeper
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
