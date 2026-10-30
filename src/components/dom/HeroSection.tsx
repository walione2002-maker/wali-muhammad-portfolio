'use client';

import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-32 sm:pt-40 pb-16 z-10"
      aria-label="Introduction & Overview"
    >
      <div>
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#737373] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse" />
          <span>Web Developer &amp; Product Engineer</span>
          <span className="text-[#333333]">/</span>
          <span className="text-[#A3A3A3]">Karachi, Pakistan</span>
        </div>

        {/* Viewport-Dominating Monumental Headline */}
        <h1 className="font-display font-extrabold text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-[#E8E4DE] tracking-tight leading-[0.92] uppercase mb-8">
          Wali<br className="hidden sm:inline" /> Muhammad
        </h1>

        {/* Precise, Believable Commercial Value Proposition */}
        <p className="text-[#A3A3A3] text-lg sm:text-2xl font-light leading-relaxed max-w-2xl mb-12">
          I engineer high-converting commercial storefronts, modern web applications, and interactive 3D digital products with Next.js, TypeScript, and Three.js.
        </p>

        {/* Dual High-Contrast Actions */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-6 py-3.5 border border-[#E8E4DE] bg-[#E8E4DE] text-[#080808] hover:bg-transparent hover:text-[#E8E4DE] text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer"
          >
            <span>Selected Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 border border-[#222222] hover:border-[#444444] text-[#E8E4DE] hover:text-[#FF4D00] text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Grounded Trust & Context Footer */}
      <div className="pt-12 mt-12 border-t border-[#1A1A1A] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-[#737373]">
        <div>
          <span className="text-[#555555] block uppercase tracking-wider mb-1">Background</span>
          <span className="text-[#E8E4DE]">FinTech @ FAST-NUCES Karachi</span>
        </div>
        <div>
          <span className="text-[#555555] block uppercase tracking-wider mb-1">Core Architecture</span>
          <span className="text-[#E8E4DE]">Next.js 14 · TypeScript · Three.js</span>
        </div>
        <div>
          <span className="text-[#555555] block uppercase tracking-wider mb-1">Production Track Record</span>
          <span className="text-[#E8E4DE]">6 Production Deployments Live</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
