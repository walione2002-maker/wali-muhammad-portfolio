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

export function DomOverlay() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  return (
    <div className="relative w-full z-10">
      {/* Pre-enter Gate */}
      <EntryGate />

      {/* Global Scroll HUD */}
      <ScrollProgress />
      <Navigation />

      {/* Scrollable Semantic Content */}
      <div
        className={`w-full transition-opacity duration-1000 ${
          hasEntered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ExecutiveOverview />
        <ProjectShowroom />
        <TechStack />
        <ContactPortal />
      </div>
    </div>
  );
}

export default DomOverlay;
