'use client';

import React from 'react';
import { ArrowDown, Mail, MapPin, Sparkles, Code2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-8 pt-32 sm:pt-40 pb-20 z-10"
      aria-label="Wali Muhammad Hero Section"
    >
      <div className="max-w-3xl">
        {/* Geographic Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Based in Karachi, Pakistan · Working with Clients Worldwide</span>
        </div>

        {/* Massive Clean Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[1.08] mb-4">
          Wali Muhammad
        </h1>

        {/* Clear Subtitle */}
        <p className="font-display font-semibold text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 mb-6">
          Web Developer &amp; Digital Product Creator
        </p>

        {/* Short, normal 1-sentence intro (under 22 words) */}
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-10 font-sans">
          I design and build fast, modern websites, e-commerce stores, and custom web applications for businesses and brands.
        </p>

        {/* Two Unmistakable Hero Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Primary Solid Button */}
          <a
            href="#websites"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-base shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Explore My 8 Live Websites</span>
            <ArrowDown className="w-5 h-5 stroke-[2.5]" />
          </a>

          {/* Secondary Button */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0F172A]/80 hover:bg-[#1E293B] text-white font-semibold text-base border border-white/15 hover:border-white/30 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>Get In Touch</span>
          </a>
        </div>

        {/* Highlights / Quick Stats Banner */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
            <span className="text-slate-200 font-medium">8 Live Deployed Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-200 font-medium">Next.js, React &amp; TypeScript</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-200 font-medium">FinTech @ FAST-NUCES Karachi</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
