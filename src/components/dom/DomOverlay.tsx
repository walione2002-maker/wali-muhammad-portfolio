'use client';

import React, { useMemo } from 'react';
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
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  // Section 1: ExecutiveOverview [0.00 - 0.22]
  const overviewStyle = useMemo(() => {
    if (scrollProgress <= 0.12) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0px) scale(1)',
        pointerEvents: 'auto' as const,
      };
    }
    const t = Math.min(1, Math.max(0, (scrollProgress - 0.12) / 0.10));
    const opacity = 1 - t;
    const y = -t * 80;
    const z = -t * 400;
    const scale = 1 - t * 0.12;
    return {
      opacity,
      transform: `translate3d(0, ${y}px, ${z}px) scale(${scale})`,
      pointerEvents: opacity > 0.1 ? ('auto' as const) : ('none' as const),
    };
  }, [scrollProgress]);

  // Section 2: ProjectShowroom [0.20 - 0.70]
  const showroomStyle = useMemo(() => {
    if (scrollProgress < 0.20 || scrollProgress > 0.70) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -400px) scale(0.9)',
        pointerEvents: 'none' as const,
      };
    }
    let opacity = 1;
    let y = 0;
    let z = 0;
    let scale = 1;

    if (scrollProgress < 0.26) {
      // Entering from back
      const enterT = (scrollProgress - 0.20) / 0.06;
      opacity = enterT;
      y = (1 - enterT) * 60;
      z = (1 - enterT) * -350;
      scale = 0.9 + 0.1 * enterT;
    } else if (scrollProgress > 0.64) {
      // Exiting to back
      const exitT = (scrollProgress - 0.64) / 0.06;
      opacity = 1 - exitT;
      y = -exitT * 60;
      z = -exitT * 350;
      scale = 1 - exitT * 0.1;
    }

    return {
      opacity,
      transform: `translate3d(0, ${y}px, ${z}px) scale(${scale})`,
      pointerEvents: opacity > 0.2 ? ('auto' as const) : ('none' as const),
    };
  }, [scrollProgress]);

  // Section 3: TechStack [0.64 - 0.88]
  const techStackStyle = useMemo(() => {
    if (scrollProgress < 0.64 || scrollProgress > 0.88) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -400px) scale(0.9)',
        pointerEvents: 'none' as const,
      };
    }
    let opacity = 1;
    let y = 0;
    let z = 0;
    let scale = 1;

    if (scrollProgress < 0.70) {
      // Entering
      const enterT = (scrollProgress - 0.64) / 0.06;
      opacity = enterT;
      y = (1 - enterT) * 60;
      z = (1 - enterT) * -350;
      scale = 0.9 + 0.1 * enterT;
    } else if (scrollProgress > 0.82) {
      // Exiting
      const exitT = (scrollProgress - 0.82) / 0.06;
      opacity = 1 - exitT;
      y = -exitT * 60;
      z = -exitT * 350;
      scale = 1 - exitT * 0.1;
    }

    return {
      opacity,
      transform: `translate3d(0, ${y}px, ${z}px) scale(${scale})`,
      pointerEvents: opacity > 0.2 ? ('auto' as const) : ('none' as const),
    };
  }, [scrollProgress]);

  // Section 4: ContactPortal [0.84 - 1.00]
  const contactStyle = useMemo(() => {
    if (scrollProgress < 0.84) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -350px) scale(0.92)',
        pointerEvents: 'none' as const,
      };
    }
    let opacity = 1;
    let y = 0;
    let z = 0;
    let scale = 1;

    if (scrollProgress < 0.90) {
      const enterT = (scrollProgress - 0.84) / 0.06;
      opacity = enterT;
      y = (1 - enterT) * 50;
      z = (1 - enterT) * -300;
      scale = 0.92 + 0.08 * enterT;
    }

    return {
      opacity,
      transform: `translate3d(0, ${y}px, ${z}px) scale(${scale})`,
      pointerEvents: opacity > 0.2 ? ('auto' as const) : ('none' as const),
    };
  }, [scrollProgress]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
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
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform"
          style={overviewStyle}
        >
          <ExecutiveOverview />
        </div>

        {/* Section 2: 3D Spatial Orbital Showroom */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform"
          style={showroomStyle}
        >
          <ProjectShowroom />
        </div>

        {/* Section 3: Engineering & FinTech Architecture Stack */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform"
          style={techStackStyle}
        >
          <TechStack />
        </div>

        {/* Section 4: Client Brief & Executive Gateway */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform"
          style={contactStyle}
        >
          <ContactPortal />
        </div>
      </div>
    </div>
  );
}

export default DomOverlay;
