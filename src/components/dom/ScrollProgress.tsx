'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ScrollProgress() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  if (!hasEntered) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none bg-white/[0.05]"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-accent-blue via-accent-gold to-yellow-300 shadow-[0_0_10px_rgba(201,169,110,0.8)] transition-all duration-75 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
      />
    </div>
  );
}

export default ScrollProgress;
