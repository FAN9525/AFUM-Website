import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { StatsBar } from './sections/stats-bar';
import { About } from './sections/about';
import { Products } from './sections/products';
import { BrokerBenefits } from './sections/broker-benefits';
import { AFAssist } from './sections/af-assist';
import { Testimonials } from './sections/testimonials';
import { Contact } from './sections/contact';
import { Footer } from './sections/footer';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 rounded-full bg-burgundy"
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white font-body"
        >
          <Header />
          <main>
            <Hero />
            <StatsBar />
            <About />
            <Products />
            <BrokerBenefits />
            <AFAssist />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <ScrollIndicator />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;