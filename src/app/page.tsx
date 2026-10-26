'use client';

import dynamic from 'next/dynamic';
import { QualityGate } from '@/components/shared/QualityGate';
import { ContextLossHandler } from '@/components/shared/ContextLossHandler';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ChromaticBackdrop } from '@/components/shared/ChromaticBackdrop';
import { EntryGate } from '@/components/dom/EntryGate';
import { Navbar } from '@/components/dom/Navbar';
import { HeroSection } from '@/components/dom/HeroSection';
import { WebsitesSection } from '@/components/dom/WebsitesSection';
import { ServicesSection } from '@/components/dom/ServicesSection';
import { ContactSection } from '@/components/dom/ContactSection';
import { ScrollProgress } from '@/components/dom/ScrollProgress';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const Experience = dynamic(() => import('@/components/canvas/Experience'), {
  ssr: false,
});

export default function HomePage() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  return (
    <>
      <QualityGate />
      <ContextLossHandler />
      <ScrollProgress />

      {/* Cinematic Entry Gate */}
      <EntryGate />

      <SmoothScroll>
        <div className="relative min-h-screen w-full bg-[#050816] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Dynamic Reactive Chromatic Auroras (z-index: 0) */}
          <ChromaticBackdrop />

          {/* Fixed 3D Canvas Scene (z-index: 0) */}
          <Experience />

          {/* Fixed Navigation Bar (z-index: 40) */}
          <Navbar />

          {/* Natural Vertically Flowing Content Sections (z-index: 10) */}
          <main
            className={`relative z-10 w-full transition-opacity duration-700 ${
              hasEntered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <HeroSection />
            <WebsitesSection />
            <ServicesSection />
            <ContactSection />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}
