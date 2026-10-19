'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

export function ChromaticBackdrop() {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  // Derive primary & secondary chromatic palette accents
  let primaryColor = '#00F0FF'; // Electric Cyan default
  let secondaryColor = '#FFB800'; // Molten Gold default

  if (activeProjectId) {
    const proj = PROJECTS.find((p) => p.id === activeProjectId);
    if (proj) {
      primaryColor = proj.accentColor;
      secondaryColor = proj.accentColor === '#00F0FF' ? '#FF2E93' : '#00F0FF';
    }
  } else if (activeSectionIndex === 0) {
    // Section 00 (Entry Gate): Electric Cyan + Molten Gold
    primaryColor = '#00F0FF';
    secondaryColor = '#FFB800';
  } else if (activeSectionIndex === 1) {
    // Section 01 (Strategic Architecture): Ultraviolet + Laser Cyan
    primaryColor = '#8B5CF6';
    secondaryColor = '#38BDF8';
  } else if (activeSectionIndex === 2) {
    // Section 02 (8 Live Deployments): Electric Cyan + Hyper Magenta
    primaryColor = '#00F0FF';
    secondaryColor = '#FF2E93';
  } else if (activeSectionIndex === 3) {
    // Section 03 (Wireframe Architecture Stack): Matrix Neon Emerald + Cyber Cyan
    primaryColor = '#00FF9D';
    secondaryColor = '#00E5FF';
  } else if (activeSectionIndex === 4) {
    // Section 04 (Client Brief Portal): Supernova Gold + Hyper Violet
    primaryColor = '#FFB800';
    secondaryColor = '#EC4899';
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden h-[100dvh] w-screen"
      aria-hidden="true"
    >
      {/* Primary Radial Aurora Glow */}
      <div
        className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[80px] sm:blur-[140px] opacity-25 transition-all duration-700 ease-out transform-gpu"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Counter-Aurora Glow */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[80px] sm:blur-[150px] opacity-20 transition-all duration-700 ease-out transform-gpu"
        style={{
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Center Subtle Specular Core Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[60px] sm:blur-[110px] opacity-15 transition-all duration-700 ease-out transform-gpu"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 65%)`,
        }}
      />

      {/* Fine Spatial Grain & Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,7,20,0.75)_100%)]" />
    </div>
  );
}

export default ChromaticBackdrop;
