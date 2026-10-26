'use client';

import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useEntryTransition } from '@/hooks/useEntryTransition';

export function EntryGate() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered);
  const isTransitioning = usePortfolioStore((s) => s.isTransitioning);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const { startEntry } = useEntryTransition();

  const handleEnter = () => {
    startEntry(
      titleRef.current,
      subtitleRef.current,
      ctaRef.current,
      containerRef.current
    );
  };

  // Keyboard shortcut: Pressing Enter or Space triggers entry
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!hasEntered && !isTransitioning) {
          e.preventDefault();
          handleEnter();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasEntered, isTransitioning]);

  if (hasEntered && !isTransitioning) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816]/95 backdrop-blur-xl px-6 text-center select-none transition-opacity duration-300"
      aria-label="Welcome Gate - Wali Muhammad Portfolio"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(5,8,22,0.95)_75%)] pointer-events-none" />

      {/* Decorative Top Accent Tag */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs tracking-wider uppercase font-mono mb-8 shadow-glow">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Spatial 3D Portfolio · 2026</span>
      </div>

      {/* Monumental Headline */}
      <h1
        ref={titleRef}
        className="relative z-10 font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[1.05] mb-4 max-w-5xl will-change-transform"
      >
        WALI MUHAMMAD
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="relative z-10 font-display text-lg sm:text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 max-w-2xl mb-12 will-change-transform"
      >
        Web Developer &amp; Digital Product Creator
      </p>

      {/* Primary CTA Button */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <button
          ref={ctaRef}
          onClick={handleEnter}
          disabled={isTransitioning}
          className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-display font-bold text-base sm:text-lg tracking-wide shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_45px_rgba(56,189,248,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          <span>ENTER EXPERIENCE</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-xs text-slate-500 font-mono tracking-wider uppercase">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Enter</kbd> or click to begin
        </span>
      </div>
    </div>
  );
}

export default EntryGate;
