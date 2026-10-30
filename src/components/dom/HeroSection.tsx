'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

// Dynamic import with SSR false for lightweight client-side WebGL
const HeroInstrument = dynamic(() => import('@/components/canvas/HeroInstrument'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[420px] lg:h-[480px] border border-[#1A1A1A] bg-[#0A0A0A] flex flex-col items-center justify-center text-[#555555] font-mono text-xs uppercase tracking-widest gap-2">
      <div className="w-5 h-5 border-2 border-[#333333] border-t-[#FF4D00] rounded-full animate-spin" />
      <span>Loading Instrument...</span>
    </div>
  ),
});

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-16 z-10"
      aria-labelledby="hero-main-title"
    >
      {/* 2-Column Desktop Grid: Typography Left, Interactive Instrument Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4">
        {/* Left Column: Authoritative Editorial Copy */}
        <div className="lg:col-span-7">
          {/* Editorial Eyebrow */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#999999] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse" />
            <span>Web Developer &amp; Product Engineer</span>
            <span className="text-[#444444]">/</span>
            <span className="text-[#CCCCCC]">Karachi, Pakistan</span>
          </div>

          {/* Balanced Headline with Zero Accidental Overflow */}
          <h1
            id="hero-main-title"
            className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[5.75rem] text-[#E8E4DE] tracking-tight leading-[0.92] uppercase mb-6"
          >
            Wali<br />Muhammad
          </h1>

          {/* Clear, High-Contrast Commercial Value Proposition */}
          <p className="text-[#C5C5C5] text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-xl mb-10">
            I engineer high-converting commercial storefronts, modern web applications, and interactive digital products with Next.js, TypeScript, and Three.js.
          </p>

          {/* High-Contrast Dual Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#E8E4DE] bg-[#E8E4DE] text-[#080808] hover:bg-transparent hover:text-[#E8E4DE] text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 border border-[#2A2A2A] hover:border-[#555555] text-[#E8E4DE] hover:text-[#FF4D00] text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: Original Interactive Instrument Visual */}
        <div className="lg:col-span-5 w-full">
          <HeroInstrument />
        </div>
      </div>

      {/* Authoritative Credentials & Trust Rail */}
      <div className="pt-12 mt-16 border-t border-[#1C1C1C] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
        <div>
          <span className="text-[#666666] block uppercase tracking-wider mb-1">Academic Background</span>
          <span className="text-[#E8E4DE] font-medium text-sm">FinTech @ FAST-NUCES Karachi</span>
        </div>
        <div>
          <span className="text-[#666666] block uppercase tracking-wider mb-1">Core Architecture</span>
          <span className="text-[#E8E4DE] font-medium text-sm">Next.js 14 · TypeScript · Three.js</span>
        </div>
        <div>
          <span className="text-[#666666] block uppercase tracking-wider mb-1">Production Deliveries</span>
          <span className="text-[#E8E4DE] font-medium text-sm">6 Live Deployed Platforms</span>
        </div>
        <div>
          <span className="text-[#666666] block uppercase tracking-wider mb-1">Availability</span>
          <span className="text-[#10B981] font-medium text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Open for Q4/2026 Engagements
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
