'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

export function ChromaticBackdrop() {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  // Dynamic palette calculation
  let primaryColor = '#38BDF8';
  let secondaryColor = '#6366F1';

  if (activeProjectId) {
    const proj = PROJECTS.find((p) => p.id === activeProjectId);
    if (proj) {
      primaryColor = proj.accentColor;
      secondaryColor = proj.accentColor === '#38BDF8' ? '#6366F1' : '#38BDF8';
    }
  } else if (activeSectionIndex === 3) {
    primaryColor = '#F59E0B'; // Gold
    secondaryColor = '#38BDF8';
  } else if (activeSectionIndex === 2) {
    primaryColor = '#8B5CF6'; // Purple
    secondaryColor = '#6366F1';
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      aria-hidden="true"
    >
      {/* Primary Radial Aurora */}
      <div
        className="absolute top-1/4 -right-1/4 w-[55vw] sm:w-[75vw] h-[55vw] sm:h-[75vw] max-w-[900px] max-h-[900px] rounded-full blur-[60px] sm:blur-[160px] opacity-16 sm:opacity-20 transition-all duration-700 ease-out transform-gpu will-change-transform"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Counter-Aurora */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[50vw] sm:w-[70vw] h-[50vw] sm:h-[70vw] max-w-[850px] max-h-[850px] rounded-full blur-[60px] sm:blur-[160px] opacity-14 sm:opacity-18 transition-all duration-700 ease-out transform-gpu will-change-transform"
        style={{
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Specular Core Glow (Desktop only to prevent overdraw on mobile GPUs) */}
      {!isMobile && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full blur-[80px] sm:blur-[130px] opacity-12 transition-all duration-700 ease-out transform-gpu will-change-transform"
          style={{
            background: `radial-gradient(circle, ${primaryColor} 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,22,0.85)_100%)]" />
    </div>
  );
}

export default ChromaticBackdrop;
