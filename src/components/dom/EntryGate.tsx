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
      className={`fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-12 lg:p-16 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] h-[100dvh] select-none bg-gradient-to-b from-[#040714]/75 via-transparent to-[#040714]/95 ${
        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Portfolio Entrance"
    >
      {/* Top Header Row */}
      <header className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-300 font-mono font-medium">
            Zero-Downtime Edge System · Cloudflare / Vercel
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-400 font-mono">
          <span>Awwwards Jury Standard</span>
          <span className="text-amber-400">·</span>
          <span>WebGL 2.0 60 FPS</span>
        </div>
      </header>

      {/* Monumental Center Typography */}
      <div className="flex flex-col items-center justify-center text-center my-auto px-2 sm:px-4">
        <div className="overflow-hidden py-1 sm:py-2">
          <p
            ref={subtitleRef}
            className="text-[10px] sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-cyan-300 font-mono mb-2 sm:mb-6 font-semibold drop-shadow-[0_0_12px_rgba(255,184,0,0.5)]"
          >
            Full-Stack Engineer · FinTech Systems Architect · Creative Developer
          </p>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase font-display leading-[0.9] sm:leading-[0.88] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-400 drop-shadow-[0_0_50px_rgba(0,240,255,0.25)] max-w-6xl mx-auto"
        >
          Wali Muhammad
        </h1>

        <p className="mt-3 sm:mt-6 text-xs sm:text-base text-slate-300 max-w-xl font-light tracking-wide leading-relaxed">
          Architecting high-converting digital platforms, quantitative risk engines, and spatial 3D web applications with zero-downtime reliability.
        </p>

        {/* Enter Button CTA */}
        <div className="mt-8 sm:mt-12">
          <button
            ref={ctaRef}
            onClick={handleEnter}
            disabled={isTransitioning}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[linear-gradient(145deg,rgba(14,19,42,0.95),rgba(6,9,22,0.98))] hover:bg-slate-900 border border-cyan-400/40 hover:border-amber-400/80 text-slate-100 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:shadow-[0_0_40px_rgba(255,184,0,0.45)] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer touch-manipulation"
            aria-label="Enter the 3D Portfolio Experience"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin-slow shadow-sm" />
            <span>Enter Experience</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/15 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <footer className="flex items-center justify-between w-full max-w-7xl mx-auto text-xs text-slate-400 font-mono tracking-widest uppercase">
        <div className="flex items-center space-x-2">
          <span className="text-cyan-400 font-semibold">8 Live Deployments</span>
          <span>·</span>
          <span>Procedural R3F Engine</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Scroll-driven Camera Spline</span>
          <span className="text-amber-300 font-semibold">[ 00 / 04 ]</span>
        </div>
      </footer>
    </div>
  );
}

export default EntryGate;
