import { useEffect, type ReactNode } from 'react';
import { Header } from '@/sections/header';
import { Footer } from '@/sections/footer';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `${title} | Admin Focus`;
    return () => {
      document.title = 'Admin Focus';
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-white font-body">
      <Header />
      <main className="pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return (
    <header className="mb-10">
      <h1
        className="text-3xl md:text-4xl font-heading font-medium text-[#1a1a2e]"
      >
        {children}
      </h1>
      <div className="w-20 h-1 bg-burgundy rounded-full mt-4" />
    </header>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-heading font-medium text-[#1a1a2e] mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
