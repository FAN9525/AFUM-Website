import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['18 Water Street', 'Klipspruit Mall', 'Parys, 9585'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@adminfocus.co.za'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['010 006 5266'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Friday', '8:00 AM - 5:00 PM'],
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E1E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1a1a2e]/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[#8B1E1E] font-semibold text-sm uppercase tracking-wider"
          >
            By Invitation
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mt-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Inquire About Partnership
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-20 h-1 bg-[#8B1E1E] rounded-full mx-auto mt-4"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Admin Focus partners are hand-picked. If you believe your brokerage aligns with our 
            philosophy of quality over quantity, we invite you to reach out. Our team will 
            review your inquiry and respond within 48 hours.
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#8B1E1E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#8B1E1E]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Thank You
                  </h3>
                  <p className="text-gray-600">
                    Your inquiry has been received. Our team will review your application and 
                    contact you within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#1a1a2e] font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        required
                        className="border-gray-200 focus:border-[#8B1E1E] focus:ring-[#8B1E1E]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brokerage" className="text-[#1a1a2e] font-medium">
                        Brokerage Name *
                      </Label>
                      <Input
                        id="brokerage"
                        placeholder="Your Brokerage"
                        required
                        className="border-gray-200 focus:border-[#8B1E1E] focus:ring-[#8B1E1E]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#1a1a2e] font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@brokerage.co.za"
                        required
                        className="border-gray-200 focus:border-[#8B1E1E] focus:ring-[#8B1E1E]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#1a1a2e] font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+27 12 345 6789"
                        required
                        className="border-gray-200 focus:border-[#8B1E1E] focus:ring-[#8B1E1E]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#1a1a2e] font-medium">
                      Tell Us About Your Brokerage
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Share your brokerage history, client base, and why you believe you'd be a good fit for Admin Focus..."
                      rows={5}
                      className="border-gray-200 focus:border-[#8B1E1E] focus:ring-[#8B1E1E] resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8B1E1E] hover:bg-[#6B1717] text-white font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Submit Inquiry
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you acknowledge that Admin Focus reviews all inquiries 
                    and partnership is by invitation only.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            {/* Exclusive Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#1a1a2e] rounded-xl p-6 text-white"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B1E1E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#8B1E1E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">An Exclusive Network</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Admin Focus serves only 22 carefully selected brokers. Partnership is by 
                    invitation, ensuring every relationship receives the attention and expertise 
                    it deserves.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#8B1E1E]/10 rounded-xl flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-[#8B1E1E]" />
                  </div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{info.title}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </div>
            
            {/* AF Assist Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#8B1E1E] rounded-xl p-6 text-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">AF Assist - 24/7 Emergency</h3>
                  <p className="text-white/80 text-sm mb-2">For policyholders and brokers</p>
                  <a href="tel:0861999007" className="text-2xl font-bold text-white hover:text-white/90 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                    0861 999 007
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
