'use client';

import dynamic from 'next/dynamic';
import { QualityGate } from '@/components/shared/QualityGate';
import { ContextLossHandler } from '@/components/shared/ContextLossHandler';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { DomOverlay } from '@/components/dom/DomOverlay';
import { ChromaticBackdrop } from '@/components/shared/ChromaticBackdrop';
import { useSectionDetection } from '@/hooks/useSectionDetection';

const Experience = dynamic(() => import('@/components/canvas/Experience'), {
  ssr: false,
});

export default function HomePage() {
  // Sync scrollProgress to activeSection & activeSectionIndex
  useSectionDetection();

  return (
    <>
      <QualityGate />
      <ContextLossHandler />
      <SmoothScroll>
        <main className="relative min-h-[700vh] w-full bg-[#05060A] text-slate-100 overflow-x-hidden">
          {/* Dynamic Reactive Chromatic Auroras (z-index: 0) */}
          <ChromaticBackdrop />

          {/* Fixed 3D Canvas Scene (z-index: 0) */}
          <Experience />

          {/* 3D Spatial Stage DOM Overlay (z-index: 10) */}
          <DomOverlay />

          {/* Virtual scroll runway for Lenis smooth interpolation (700vh) */}
          <div className="w-full h-[700vh] pointer-events-none" aria-hidden="true" />
        </main>
      </SmoothScroll>
    </>
  );
}
