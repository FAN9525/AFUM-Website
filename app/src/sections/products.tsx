import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const products = [
  {
    logo: '/images/logo-domestic.png',
    title: 'Domestic Insurance',
    shortTitle: 'Personal Focus',
    description: 'Comprehensive home and contents coverage, expertly underwritten for clients who value protection over price.',
    features: ['All-risk cover', 'Theft protection', 'Liability cover', 'Building insurance'],
    details: 'Our Domestic Package offers comprehensive protection for homeowners, covering everything from structural damage to personal belongings. With flexible options and competitive premiums, we ensure your clients have peace of mind.',
  },
  {
    logo: '/images/logo-commercial.png',
    title: 'Commercial Insurance',
    shortTitle: 'Commercial Focus',
    description: 'Business packages designed for stability, protecting commercial assets with precision and expertise.',
    features: ['Property cover', 'Business interruption', 'Liability protection', 'Asset coverage'],
    details: 'Designed for businesses of all sizes, our Commercial Insurance package safeguards against property damage, business interruption, and liability claims. We understand the unique risks businesses face and provide tailored solutions.',
  },
  {
    logo: '/images/logo-agri.png',
    title: 'Agri Insurance',
    shortTitle: 'Agri Focus',
    description: 'Specialized farm coverage combining residential and commercial protection for agricultural operations.',
    features: ['Farm buildings', 'Equipment cover', 'Livestock options', 'Crop insurance'],
    details: 'Farming operations require specialized insurance that addresses both residential and commercial aspects. Our Agri Insurance provides comprehensive coverage for farm buildings, equipment, livestock, and crops against various risks.',
  },
  {
    logo: '/images/logo-hospitality.png',
    title: 'Hospitality Insurance',
    shortTitle: 'Hospitality Focus',
    description: 'Tailored solutions for guesthouses, hotels, and tourism businesses that demand excellence.',
    features: ['Guest liability', 'Property cover', 'Business interruption', 'Contents insurance'],
    details: 'The South African tourism industry demands specialized insurance solutions. From small guesthouses to luxury hotel chains, our Hospitality Insurance covers property, liability, and business interruption risks specific to the tourism sector.',
  },
];

export function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  
  return (
    <section id="products" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#8B1E1E]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1a1a2e]/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[#8B1E1E] font-semibold text-sm uppercase tracking-wider"
          >
            Our Expertise
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mt-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Products Underwritten with Care
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
            We don't underwrite everything—we underwrite what we know. Each product is 
            managed with the expertise that comes from 20 years of selective focus.
          </motion.p>
        </div>
        
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.3 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                {/* Logo */}
                <div className="mb-5 flex justify-center h-24 items-center">
                  <img 
                    src={product.logo} 
                    alt={product.shortTitle}
                    className="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                  {product.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5 justify-center">
                  {product.features.slice(0, 3).map((feature) => (
                    <span 
                      key={feature}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="flex items-center gap-2 text-[#1a1a2e] font-medium text-sm group/btn mx-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex flex-col items-center gap-3 mb-2">
              {selectedProduct && (
                <img 
                  src={selectedProduct.logo} 
                  alt={selectedProduct.shortTitle}
                  className="h-24 w-auto object-contain"
                />
              )}
              <DialogTitle className="text-2xl text-[#1a1a2e] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                {selectedProduct?.title}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              {selectedProduct?.details}
            </p>
            <div>
              <h4 className="font-semibold text-[#1a1a2e] mb-2">Coverage Includes:</h4>
              <ul className="space-y-2">
                {selectedProduct?.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-[#8B1E1E] rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button 
              onClick={() => {
                setSelectedProduct(null);
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-[#8B1E1E] hover:bg-[#6B1717] text-white font-semibold"
            >
              Speak to a Partner
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
