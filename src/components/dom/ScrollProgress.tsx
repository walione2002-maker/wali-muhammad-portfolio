'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ScrollProgress() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  if (!hasEntered) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none bg-white/[0.05]"
      aria-hidden="true"
    >
      <div
        id="global-scroll-progress-bar"
        className="h-full w-full origin-left bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#FFB800] shadow-[0_0_12px_rgba(0,240,255,0.8)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

export default ScrollProgress;
