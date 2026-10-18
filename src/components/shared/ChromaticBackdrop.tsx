'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

export function ChromaticBackdrop() {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  // Derive primary chromatic accent
  let primaryColor = '#00F0FF'; // Electric Cyan default
  let secondaryColor = '#7C3AED'; // Ultraviolet default

  if (activeProjectId) {
    const proj = PROJECTS.find((p) => p.id === activeProjectId);
    if (proj) {
      primaryColor = proj.accentColor;
      secondaryColor = proj.accentColor === '#00F0FF' ? '#FF2E93' : '#00F0FF';
    }
  } else if (activeSectionIndex === 0) {
    primaryColor = '#FFB800'; // Molten Gold
    secondaryColor = '#00F0FF'; // Electric Cyan
  } else if (activeSectionIndex === 1) {
    primaryColor = '#3B82F6'; // Cobalt
    secondaryColor = '#FFB800'; // Gold
  } else if (activeSectionIndex === 2) {
    primaryColor = '#00F0FF'; // Electric Cyan
    secondaryColor = '#FF2E93'; // Hyper Magenta
  } else if (activeSectionIndex === 3) {
    primaryColor = '#7C3AED'; // Ultraviolet
    secondaryColor = '#00F0FF'; // Cyan
  } else if (activeSectionIndex === 4) {
    primaryColor = '#FF2E93'; // Hyper Magenta
    secondaryColor = '#FFB800'; // Molten Gold
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary Radial Aurora Glow */}
      <div
        className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] opacity-25 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Counter-Aurora Glow */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Center Subtle Specular Core Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[110px] opacity-15 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 65%)`,
        }}
      />

      {/* Fine Spatial Grain & Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.7)_100%)]" />
    </div>
  );
}

export default ChromaticBackdrop;
