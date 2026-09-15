import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { StatsBar } from './sections/stats-bar';
import { About } from './sections/about';
import { Products } from './sections/products';
import { BrokerBenefits } from './sections/broker-benefits';
import { AFAssist } from './sections/af-assist';
import { Shorekeeper } from './sections/shorekeeper';
// import { Testimonials } from './sections/testimonials';
import { Contact } from './sections/contact';
import { Footer } from './sections/footer';
import ScrollIndicator from './components/ScrollIndicator';
import { EveWidget } from './components/EveWidget';
import { AdminPage } from './pages/AdminPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TcfPage } from './pages/TcfPage';

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminPage />;
  }
  if (window.location.pathname.startsWith('/complaints')) {
    return <ComplaintsPage />;
  }
  if (window.location.pathname.startsWith('/privacy-policy')) {
    return <PrivacyPolicyPage />;
  }
  if (window.location.pathname.startsWith('/tcf')) {
    return <TcfPage />;
  }
  const [isLoading,         setIsLoading]         = useState(true);
  const [eveProductContext, setEveProductContext]  = useState('');
  const [eveForceOpen,      setEveForceOpen]       = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const hash = window.location.hash;
    if (!hash) return;
    const timer = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ productContext: string }>).detail;
      setEveProductContext(detail.productContext ?? '');
      setEveForceOpen(true);
    };
    window.addEventListener('eve:open', handler);
    return () => window.removeEventListener('eve:open', handler);
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
            <Shorekeeper />
            {/* <Testimonials /> */}
            <Contact />
          </main>
          <Footer />
          <ScrollIndicator />
          <EveWidget
            productContext={eveProductContext}
            forceOpen={eveForceOpen}
            onOpenHandled={() => setEveForceOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;