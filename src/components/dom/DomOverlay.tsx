'use client';

import React from 'react';
import { EntryGate } from './EntryGate';
import { Navigation } from './Navigation';
import { ScrollProgress } from './ScrollProgress';
import { ExecutiveOverview } from './ExecutiveOverview';
import { ProjectShowroom } from './ProjectShowroom';
import { TechStack } from './TechStack';
import { ContactPortal } from './ContactPortal';
import { usePortfolioStore } from '@/store/usePortfolioStore';

function getSectionStyle(sectionIndex: number, activeSectionIndex: number) {
  if (activeSectionIndex === sectionIndex) {
    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0px) scale(1)',
      pointerEvents: 'auto' as const,
      visibility: 'visible' as const,
    };
  }
  const isPast = activeSectionIndex > sectionIndex;
  return {
    opacity: 0,
    transform: isPast
      ? 'translate3d(0, -60px, -350px) scale(0.92)'
      : 'translate3d(0, 60px, -350px) scale(0.92)',
    pointerEvents: 'none' as const,
    visibility: 'hidden' as const,
  };
}

export function DomOverlay() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden h-[100dvh] w-screen"
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Pre-enter Gate */}
      <EntryGate />

      {/* Global Scroll HUD */}
      <ScrollProgress />
      <Navigation />

      {/* 3D Spatial Stage Container - always rendered for SEO crawlability */}
      <div
        className={`relative w-full h-full transition-opacity duration-700 ${
          hasEntered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Section 1: Strategic Architecture & Executive Overview */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out will-change-transform"
          style={getSectionStyle(1, activeSectionIndex)}
        >
          <ExecutiveOverview />
        </div>

        {/* Section 2: 3D Spatial Orbital Showroom */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out will-change-transform"
          style={getSectionStyle(2, activeSectionIndex)}
        >
          <ProjectShowroom />
        </div>

        {/* Section 3: Engineering & FinTech Architecture Stack */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out will-change-transform"
          style={getSectionStyle(3, activeSectionIndex)}
        >
          <TechStack />
        </div>

        {/* Section 4: Client Brief & Executive Gateway */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out will-change-transform"
          style={getSectionStyle(4, activeSectionIndex)}
        >
          <ContactPortal />
        </div>
      </div>
    </div>
  );
}

export default DomOverlay;
