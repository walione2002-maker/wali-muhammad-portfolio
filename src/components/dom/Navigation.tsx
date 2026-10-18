'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const SECTIONS = [
  { id: 0, label: 'Entry Gate', targetProgress: 0.0 },
  { id: 1, label: 'Overview', targetProgress: 0.25 },
  { id: 2, label: 'Showroom', targetProgress: 0.5 },
  { id: 3, label: 'Architecture', targetProgress: 0.75 },
  { id: 4, label: 'Contact', targetProgress: 1.0 },
];

export function Navigation() {
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  if (!hasEntered) return null;

  const scrollToProgress = (targetProgress: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = targetProgress * totalScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end space-y-4 pointer-events-auto"
      aria-label="Section Navigation"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSectionIndex === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToProgress(sec.targetProgress)}
            className="group flex items-center gap-3 p-1 focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Hover Label */}
            <span
              className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? 'opacity-100 text-accent-gold pr-1'
                  : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400'
              }`}
            >
              {sec.label}
            </span>

            {/* Dot Indicator */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-8 bg-accent-gold shadow-[0_0_12px_rgba(201,169,110,0.8)]'
                  : 'w-2 h-2 bg-white/20 group-hover:bg-white/60'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

export default Navigation;
