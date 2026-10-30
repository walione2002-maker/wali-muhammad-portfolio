'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

// Dynamic import with SSR false for lightweight client-side WebGL
const HeroInstrument = dynamic(() => import('@/components/canvas/HeroInstrument'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto h-[260px] xs:h-[300px] sm:h-[380px] lg:h-[460px] border border-[#1A1A1A] bg-[#0A0A0A] flex flex-col items-center justify-center text-[#555555] font-mono text-xs uppercase tracking-widest gap-2">
      <div className="w-5 h-5 border-2 border-[#333333] border-t-[#FF4D00] rounded-full animate-spin" />
      <span>Loading Instrument...</span>
    </div>
  ),
});

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 xs:pt-24 sm:pt-28 pb-10 sm:pb-14 z-10"
      aria-labelledby="hero-main-title"
    >
      {/* 
        Macro Layout:
        - Mobile (< lg): Centered vertical stack, media-led, balanced hierarchy.
        - Desktop (>= lg): Asymmetric 2-column grid with editorial left-offset.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center pt-2">
        {/* Authoritative Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* 1. Professional Label & Geographic Position */}
          <div className="inline-flex items-center justify-center lg:justify-start flex-wrap gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#999999] mb-4 sm:mb-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse shrink-0" />
              <span>Web Developer &amp; Product Engineer</span>
            </span>
            <span className="text-[#444444] hidden xs:inline">/</span>
            <span className="text-[#CCCCCC]">Karachi, Pakistan</span>
          </div>

          {/* 2. Bold Name Identity (Guaranteed Zero Mobile Clipping) */}
          <h1
            id="hero-main-title"
            className="font-display font-extrabold text-[2.85rem] xs:text-5xl sm:text-7xl lg:text-[5.75rem] text-[#E8E4DE] tracking-tight leading-[0.92] uppercase mb-4 sm:mb-6"
          >
            Wali<br />Muhammad
          </h1>

          {/* 3. High-Contrast Commercial Value Proposition */}
          <p className="text-[#C5C5C5] text-base xs:text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
            I engineer high-converting commercial storefronts, modern web applications, and interactive digital products with Next.js, TypeScript, and Three.js.
          </p>

          {/* Mobile-Only Hero Visual (Placed on its own row for mobile flow) */}
          <div className="lg:hidden w-full my-4">
            <HeroInstrument />
          </div>

          {/* 4. High-Contrast Dual Actions (Centered and Stackable on Mobile) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto lg:mx-0 mt-2">
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-[#E8E4DE] bg-[#E8E4DE] text-[#080808] hover:bg-transparent hover:text-[#E8E4DE] text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer min-h-[46px]"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform shrink-0" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#2A2A2A] bg-[#0A0A0A]/60 hover:border-[#555555] text-[#E8E4DE] hover:text-[#FF4D00] text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors cursor-pointer min-h-[46px]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* Desktop-Only Hero Visual (Right Column on lg+) */}
        <div className="hidden lg:block lg:col-span-5 w-full">
          <HeroInstrument />
        </div>
      </div>

      {/* 5. Authoritative Credentials & Trust Rail (Centered 2-col on mobile, 4-col on desktop) */}
      <div className="pt-8 sm:pt-10 mt-10 sm:mt-12 border-t border-[#1C1C1C] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs font-mono">
        <div className="text-center sm:text-left">
          <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Academic Background</span>
          <span className="text-[#E8E4DE] font-medium text-xs sm:text-sm block">FAST-NUCES Karachi</span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Core Architecture</span>
          <span className="text-[#E8E4DE] font-medium text-xs sm:text-sm block">Next.js 14 · Three.js</span>
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Production Deliveries</span>
          <span className="text-[#E8E4DE] font-medium text-xs sm:text-sm block">6 Live Deployed Sites</span>
        </div>
        <div className="text-center sm:text-left col-span-2 sm:col-span-1">
          <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Availability</span>
          <span className="text-[#10B981] font-medium text-xs sm:text-sm inline-flex items-center justify-center sm:justify-start gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span>Open for Engagements</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;