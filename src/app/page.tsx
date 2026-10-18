'use client';

import dynamic from 'next/dynamic';
import { QualityGate } from '@/components/shared/QualityGate';
import { ContextLossHandler } from '@/components/shared/ContextLossHandler';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { DomOverlay } from '@/components/dom/DomOverlay';
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
        <main className="relative min-h-[500vh] w-full bg-[#0A0A0F] text-slate-100 overflow-x-hidden">
          {/* Fixed 3D Canvas Background (z-index: 0) */}
          <Experience />

          {/* Semantic HTML5 DOM Overlay (z-index: 10) */}
          <DomOverlay />
        </main>
      </SmoothScroll>
    </>
  );
}
