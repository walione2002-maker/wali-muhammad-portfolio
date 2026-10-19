'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const SECTIONS = [
  { id: 0, label: 'Entry Gate', targetProgress: 0.0, accent: '#FFB800' },
  { id: 1, label: 'Overview', targetProgress: 0.08, accent: '#8B5CF6' },
  { id: 2, label: 'Showroom', targetProgress: 0.45, accent: '#00F0FF' },
  { id: 3, label: 'Architecture', targetProgress: 0.76, accent: '#00FF9D' },
  { id: 4, label: 'Contact', targetProgress: 0.95, accent: '#FFB800' },
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
      className="hidden md:flex fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 flex-col items-end space-y-4 pointer-events-auto"
      aria-label="Section Navigation"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSectionIndex === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToProgress(sec.targetProgress)}
            className="group flex items-center gap-3 p-1 focus:outline-none cursor-pointer"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Hover Label */}
            <span
              className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? 'opacity-100 pr-1 font-semibold'
                  : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400'
              }`}
              style={{
                color: isActive ? sec.accent : undefined,
                textShadow: isActive ? `0 0 10px ${sec.accent}80` : undefined,
              }}
            >
              {sec.label}
            </span>

            {/* Dot / Pill Indicator */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-8'
                  : 'w-2 h-2 bg-white/20 group-hover:bg-white/60'
              }`}
              style={{
                backgroundColor: isActive ? sec.accent : undefined,
                boxShadow: isActive ? `0 0 14px ${sec.accent}` : undefined,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

export default Navigation;
