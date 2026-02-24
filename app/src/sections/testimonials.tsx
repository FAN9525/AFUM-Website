import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Admin Focus isn't just our underwriter—they're our strategic partner. After 18 years together, I can't imagine working with anyone else. They understand that our success is their success.",
    author: 'Sarah M.',
    location: 'Parys, Free State',
    years: '18 years',
    rating: 5,
  },
  {
    quote: "What sets Admin Focus apart is their selectivity. They don't take every broker, which means when you're in, you're truly valued. Our portfolio has never been in better hands.",
    author: 'John K.',
    location: 'Johannesburg, Gauteng',
    years: '16 years',
    rating: 5,
  },
  {
    quote: "In an industry obsessed with growth, Admin Focus focuses on what matters—stability, expertise, and genuine relationships. They've been our rock for over 20 years.",
    author: 'Linda T.',
    location: 'Pretoria, Gauteng',
    years: '20 years',
    rating: 5,
  },
  {
    quote: "The peace of mind that comes with knowing your underwriter isn't chasing every deal is invaluable. Admin Focus manages our portfolio with the same care we give our clients.",
    author: 'Michael R.',
    location: 'Bloemfontein, Free State',
    years: '15 years',
    rating: 5,
  },
  {
    quote: "Being part of the Admin Focus network feels like being in an exclusive club. The support, the expertise, the stability—it's everything a broker could ask for.",
    author: 'Patricia N.',
    location: 'Durban, KwaZulu-Natal',
    years: '17 years',
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  
  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const getInitialPosition = () => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  });
  
  const getExitPosition = () => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  });
  
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8B1E1E]/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[#8B1E1E] font-semibold text-sm uppercase tracking-wider"
          >
            Long-Term Partnerships
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mt-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Our Partners Say
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
            Our brokers aren't just clients—they're partners. Many have been with us for over 15 years.
          </motion.p>
        </div>
        
        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-16 h-16 bg-[#8B1E1E]/10 rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-[#8B1E1E]" />
            </div>
            
            {/* Testimonial Content */}
            <div className="relative min-h-[240px] flex items-center justify-center pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={getInitialPosition()}
                  animate={{ x: 0, opacity: 1 }}
                  exit={getExitPosition()}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center"
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#8B1E1E] text-[#8B1E1E]" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-[#1a1a2e] leading-relaxed mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Playfair Display, serif' }}>
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div>
                    <p className="font-semibold text-[#1a1a2e]">{testimonials[currentIndex].author}</p>
                    <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
                    <p className="text-[#8B1E1E] text-sm font-medium mt-1">Partner for {testimonials[currentIndex].years}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full border-[#1a1]/:bg-[#1a1a2e] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-[#8B1E1E] w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full border-[#1a1a2e]/20 hover:bg-[#1a1a2e] hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}