'use client';

import dynamic from 'next/dynamic';
import { QualityGate } from '@/components/shared/QualityGate';
import { ContextLossHandler } from '@/components/shared/ContextLossHandler';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ChromaticBackdrop } from '@/components/shared/ChromaticBackdrop';
import { Navbar } from '@/components/dom/Navbar';
import { HeroSection } from '@/components/dom/HeroSection';
import { WebsitesSection } from '@/components/dom/WebsitesSection';
import { ServicesSection } from '@/components/dom/ServicesSection';
import { ContactSection } from '@/components/dom/ContactSection';
import { ScrollProgress } from '@/components/dom/ScrollProgress';
import { useSectionDetection } from '@/hooks/useSectionDetection';

const Experience = dynamic(() => import('@/components/canvas/Experience'), {
  ssr: false,
});

export default function HomePage() {
  // Sync scrollProgress to discrete activeSection & activeSectionIndex
  useSectionDetection();

  return (
    <>
      <QualityGate />
      <ContextLossHandler />
      <ScrollProgress />
      <SmoothScroll>
        <div className="relative min-h-screen w-full bg-[#070B19] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Dynamic Reactive Chromatic Auroras (z-index: 0) */}
          <ChromaticBackdrop />

          {/* Fixed 3D Canvas Scene (z-index: 0) */}
          <Experience />

          {/* Fixed Navigation Bar (z-index: 40) */}
          <Navbar />

          {/* Natural Vertically Flowing Content Sections (z-index: 10) */}
          <main className="relative z-10 w-full">
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
