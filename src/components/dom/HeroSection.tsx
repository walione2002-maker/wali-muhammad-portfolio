'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-8 pt-32 sm:pt-40 pb-16 z-10"
      aria-label="Wali Muhammad Hero Section"
    >
      <div>
        {/* Subtle Mono Label */}
        <div className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#737373] mb-8">
          Web Developer &amp; Product Engineer
        </div>

        {/* Viewport-Dominating Monumental Headline */}
        <h1 className="font-display font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-[#E8E4DE] tracking-tight leading-[0.92] uppercase mb-8">
          Wali<br className="hidden sm:inline" /> Muhammad
        </h1>

        {/* Candid, Real Statement */}
        <p className="text-[#A3A3A3] text-lg sm:text-2xl font-light leading-relaxed max-w-2xl mb-12">
          I build high-performance commercial websites, responsive web apps, and interactive digital products.
        </p>

        {/* Minimal Scroll Cue */}
        <div className="flex items-center gap-6">
          <a
            href="#websites"
            className="group inline-flex items-center gap-3 text-sm sm:text-base font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] border-b border-[#E8E4DE] hover:border-[#FF4D00] pb-1.5 transition-all cursor-pointer"
          >
            <span>Selected Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="text-sm sm:text-base font-mono tracking-widest uppercase text-[#737373] hover:text-[#E8E4DE] pb-1.5 transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Grounded Status Banner */}
      <div className="pt-12 mt-12 border-t border-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#737373]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-[#A3A3A3]">Based in Karachi, Pakistan</span>
          <span>·</span>
          <span>FAST-NUCES</span>
        </div>
        <div className="text-[#A3A3A3]">
          6 Production Projects Live
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
