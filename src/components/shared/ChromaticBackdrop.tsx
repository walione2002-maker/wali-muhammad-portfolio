'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

export function ChromaticBackdrop() {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);

  // Modern palette: Sapphire Blue + Indigo + Warm Gold
  let primaryColor = '#38BDF8';
  let secondaryColor = '#6366F1';

  if (activeProjectId) {
    const proj = PROJECTS.find((p) => p.id === activeProjectId);
    if (proj) {
      primaryColor = proj.accentColor;
      secondaryColor = proj.accentColor === '#38BDF8' ? '#6366F1' : '#38BDF8';
    }
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      aria-hidden="true"
    >
      {/* Primary Soft Radial Aurora */}
      <div
        className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vw] max-w-[850px] max-h-[850px] rounded-full blur-[90px] sm:blur-[140px] opacity-20 transition-all duration-700 ease-out transform-gpu"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Counter-Aurora */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full blur-[90px] sm:blur-[150px] opacity-18 transition-all duration-700 ease-out transform-gpu"
        style={{
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Specular Core Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full blur-[70px] sm:blur-[120px] opacity-12 transition-all duration-700 ease-out transform-gpu"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 65%)`,
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,25,0.85)_100%)]" />
    </div>
  );
}

export default ChromaticBackdrop;
