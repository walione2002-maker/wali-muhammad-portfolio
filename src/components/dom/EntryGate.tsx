'use client';

import React, { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
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
    if (hasEntered || isTransitioning) return;
    startEntry(
      titleRef.current,
      subtitleRef.current,
      ctaRef.current,
      containerRef.current
    );
  };

  // Completely unmount once entered to ensure 0 DOM obstruction
  if (hasEntered && !isTransitioning) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-12 lg:p-16 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] h-[100dvh] select-none bg-gradient-to-b from-[#0A0A0F]/65 via-transparent to-[#0A0A0F]/90 backdrop-blur-[2px] ${
        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Portfolio Entrance"
    >
      {/* Top Header Row */}
      <header className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 font-mono">
            Zero-Downtime Edge System · Cloudflare / Vercel
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-500 font-mono">
          <span>Awwwards Jury Standard</span>
          <span className="text-accent-gold">·</span>
          <span>WebGL 2.0</span>
        </div>
      </header>

      {/* Monumental Center Typography */}
      <div className="flex flex-col items-center justify-center text-center my-auto px-2 sm:px-4">
        <div className="overflow-hidden py-1 sm:py-2">
          <p
            ref={subtitleRef}
            className="text-[10px] sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-accent-gold font-mono mb-2 sm:mb-6 font-medium"
          >
            Full-Stack Engineer · FinTech Systems Architect · Creative Developer
          </p>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase font-display leading-[0.9] sm:leading-[0.88] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-2xl max-w-6xl mx-auto"
        >
          Wali Muhammad
        </h1>

        <p className="mt-3 sm:mt-6 text-xs sm:text-base text-slate-400 max-w-xl font-light tracking-wide leading-relaxed">
          Architecting high-converting digital platforms, quantitative risk engines, and spatial 3D web applications with zero-downtime reliability.
        </p>

        {/* Enter Button CTA */}
        <div className="mt-8 sm:mt-12">
          <button
            ref={ctaRef}
            onClick={handleEnter}
            disabled={isTransitioning}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-surface-secondary/90 hover:bg-slate-900 border border-slate-700/80 hover:border-accent-gold/60 text-slate-100 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium shadow-2xl transition-all duration-500 hover:shadow-[0_0_35px_rgba(201,169,110,0.35)] focus:outline-none focus:ring-2 focus:ring-accent-gold/50 cursor-pointer touch-manipulation"
            aria-label="Enter the 3D Portfolio Experience"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-gold animate-spin-slow" />
            <span>Enter Experience</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-accent-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-gold/0 via-accent-gold/10 to-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <footer className="flex items-center justify-between w-full max-w-7xl mx-auto text-xs text-slate-500 font-mono tracking-widest uppercase">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">8 Live Deployments</span>
          <span>·</span>
          <span>Procedural R3F Engine</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Scroll-driven Camera Spline</span>
          <span>[ 00 / 04 ]</span>
        </div>
      </footer>
    </div>
  );
}

export default EntryGate;
