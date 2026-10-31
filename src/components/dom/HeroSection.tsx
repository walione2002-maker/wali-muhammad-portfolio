'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Sparkles, Box, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLIP_ROLES } from '@/data/projects';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// Dynamic import with SSR false for lightweight client-side Three.js instrument
const HeroInstrument = dynamic(() => import('@/components/canvas/HeroInstrument'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] flex flex-col items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest gap-2 bg-[#EBE9E1]/60 rounded-3xl">
      <div className="w-6 h-6 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
      <span>Loading 3D Instrument...</span>
    </div>
  ),
});

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'portrait' | 'instrument'>('portrait');
  const [imageError, setImageError] = useState(false);

  const setProjectModalOpen = usePortfolioStore((s) => s.setProjectModalOpen);

  // Split-flap auto-rotation every 2400ms
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % FLIP_ROLES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleManualFlip = () => {
    setActiveRoleIndex((prev) => (prev + 1) % FLIP_ROLES.length);
  };

  const handleStartProject = () => {
    setProjectModalOpen(true, 'Web & E-Commerce');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('doors-section') || document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#doors-section';
    }
  };

  const currentRole = FLIP_ROLES[activeRoleIndex] || FLIP_ROLES[0];

  return (
    <section
      id="hero"
      aria-label="Wali Muhammad Portfolio Introduction"
      className="bg-[#F4F3EE] text-[#141413] min-h-screen flex flex-col justify-between relative overflow-hidden pt-20"
    >
      {/* 1. Top Sub-Header Bar (below Navbar) */}
      <div className="w-full border-b border-black/10 py-3 px-6 md:px-12 flex items-center justify-between text-[11px] font-mono tracking-[0.16em] uppercase text-zinc-600">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>AVAILABLE FOR WORK</span>
        </span>
        <span className="hidden sm:inline text-zinc-500 font-medium">
          WORKING FOR CLIENTS WORLDWIDE
        </span>
        <span className="text-zinc-700 font-medium">BASED IN KARACHI, PK</span>
      </div>

      {/* 2. Center 12-Column Editorial Grid */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center flex-1">
        {/* Left Column (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Eyebrow */}
          <div className="text-sm md:text-base font-medium text-zinc-700 mb-4 flex items-center gap-2">
            <span className="text-emerald-700">•</span>
            <span>Independent Full-Stack &amp; FinTech Engineer</span>
          </div>

          {/* Giant Two-Line Intro */}
          <h1 className="text-5xl sm:text-6xl xl:text-[5.25rem] font-bold tracking-[-0.035em] leading-[1.04] text-[#141413]">
            <span className="block">Hi, I&apos;m Wali.</span>
            <span className="block font-semibold text-zinc-800">I am a</span>
          </h1>

          {/* 3D Mechanical Split-Flap Rolodex Badge */}
          <div
            onClick={handleManualFlip}
            className="inline-block relative mt-4 mb-8 bg-[#181817] p-2.5 sm:p-3.5 rounded-[26px] sm:rounded-[32px] shadow-[0_24px_50px_rgba(0,0,0,0.22)] border border-black/30 select-none cursor-pointer group"
            title="Click to flip role"
          >
            {/* Metallic Binder Ring 1 (Left) */}
            <div className="absolute left-14 sm:left-20 -top-3.5 w-3.5 sm:w-4 h-8 sm:h-9 rounded-full bg-gradient-to-b from-zinc-200 via-zinc-500 to-zinc-900 border border-black/40 shadow-lg z-30 pointer-events-none">
              <div className="absolute top-1 left-0.5 w-1 h-3 rounded-full bg-white/60 blur-[0.5px]" />
            </div>

            {/* Metallic Binder Ring 2 (Right) */}
            <div className="absolute right-14 sm:right-20 -top-3.5 w-3.5 sm:w-4 h-8 sm:h-9 rounded-full bg-gradient-to-b from-zinc-200 via-zinc-500 to-zinc-900 border border-black/40 shadow-lg z-30 pointer-events-none">
              <div className="absolute top-1 left-0.5 w-1 h-3 rounded-full bg-white/60 blur-[0.5px]" />
            </div>

            {/* Inner White Card */}
            <div className="bg-[#FAF9F5] rounded-[18px] sm:rounded-[22px] px-7 sm:px-12 py-4 sm:py-6 min-w-[290px] sm:min-w-[480px] md:min-w-[540px] relative overflow-hidden [perspective:1200px] shadow-inner border border-black/[0.04]">
              {/* Left Punch Hole */}
              <div className="absolute left-14 sm:left-20 top-0 -translate-x-0.5 w-4 h-2.5 rounded-b-full bg-[#181817] z-20 pointer-events-none" />

              {/* Right Punch Hole */}
              <div className="absolute right-14 sm:right-20 top-0 -translate-x-0.5 w-4 h-2.5 rounded-b-full bg-[#181817] z-20 pointer-events-none" />

              {/* Horizontal Center Split-Flap Seam Line */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/[0.08] z-20 pointer-events-none" />

              {/* Mechanical Flapping Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoleIndex}
                  initial={{ rotateX: -90, opacity: 0, y: -12 }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  exit={{ rotateX: 90, opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center [transform-style:preserve-3d]"
                >
                  <span className="text-3xl sm:text-5xl md:text-[3.5rem] font-extrabold tracking-[-0.03em] text-[#141413] whitespace-nowrap text-center block">
                    {currentRole.label}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mt-1 sm:mt-1.5 text-center block">
                    {currentRole.badgeNote}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Button Row */}
          <div className="flex flex-wrap items-center gap-7 mt-2">
            {/* Primary Pill Button */}
            <button
              onClick={handleStartProject}
              className="bg-[#141413] text-[#F4F3EE] pl-7 pr-2.5 py-2.5 rounded-full flex items-center gap-4 text-base font-medium shadow-lg hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <span>Start a project</span>
              <span className="w-10 h-10 rounded-full bg-[#F4F3EE] text-[#141413] flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>

            {/* Secondary Link */}
            <a
              href="#doors-section"
              onClick={handleSeeWork}
              className="text-[#141413] font-medium text-base underline underline-offset-8 decoration-black/40 hover:decoration-black transition-colors cursor-pointer"
            >
              See my work
            </a>
          </div>
        </div>

        {/* Right Column (lg:col-span-5 relative flex items-center justify-center) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full">
          {/* Studio Portrait & 3D Instrument Showcase Frame */}
          <div className="w-full max-w-[420px] h-[480px] sm:h-[530px] relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#EBE9E1] via-[#E4E1D8] to-[#D8D4C8] shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-black/[0.08] flex flex-col justify-between p-4 sm:p-5">
            {/* Top Frame Telemetry Header */}
            <div className="flex items-center justify-between w-full z-20">
              <span className="px-3 py-1 rounded-full bg-black/5 text-[10px] font-mono uppercase tracking-widest text-zinc-700 backdrop-blur-sm border border-black/5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-zinc-600" />
                <span>Wali Muhammad · 2026</span>
              </span>

              {/* View Switcher Pill */}
              <div className="flex items-center gap-1 bg-black/10 p-1 rounded-full backdrop-blur-sm border border-black/5">
                <button
                  onClick={() => setViewMode('portrait')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all ${
                    viewMode === 'portrait'
                      ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  title="Show Studio Portrait"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Studio</span>
                </button>
                <button
                  onClick={() => setViewMode('instrument')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all ${
                    viewMode === 'instrument'
                      ? 'bg-zinc-900 text-white shadow-sm font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  title="Inspect Real-Time 3D Instrument"
                >
                  <Box className="w-3 h-3" />
                  <span>3D Lab</span>
                </button>
              </div>
            </div>

            {/* Frame Body: Studio Cutout OR 3D Instrument */}
            <div className="relative w-full flex-1 flex items-center justify-center my-2 overflow-hidden">
              {viewMode === 'portrait' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Subtle Studio Glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-white/40 via-transparent to-transparent pointer-events-none" />

                  {/* Photo or Tailored Blazer Silhouette */}
                  {!imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/wali-portrait.png"
                      alt="Wali Muhammad — Suited Architect & Engineer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top rounded-2xl relative z-10"
                    />
                  ) : null}

                  {imageError && (
                    /* Ultra-Crisp Tailored Blazer Architectural Vector Silhouette */
                    <div className="relative w-full h-full flex flex-col items-center justify-end select-none">
                      <svg
                        viewBox="0 0 340 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full max-h-[380px] drop-shadow-xl"
                      >
                        <defs>
                          <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1E1E1D" />
                            <stop offset="50%" stopColor="#141413" />
                            <stop offset="100%" stopColor="#0B0D0C" />
                          </linearGradient>
                          <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2A2A28" />
                            <stop offset="100%" stopColor="#141413" />
                          </linearGradient>
                          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="100%" stopColor="#EFECE6" />
                          </linearGradient>
                        </defs>

                        {/* Head & Neck Silhouette */}
                        <ellipse cx="170" cy="115" rx="42" ry="52" fill="#D4B09A" />
                        {/* Hair Silhouette */}
                        <path
                          d="M128 105 C 128 65, 212 65, 212 105 C 212 110, 205 88, 170 86 C 135 88, 128 110, 128 105 Z"
                          fill="#181817"
                        />
                        {/* Neck */}
                        <path d="M152 150 L 152 195 L 188 195 L 188 150 Z" fill="#C9A18B" />

                        {/* Crisp White Shirt Collar & Tie */}
                        <path
                          d="M148 190 L 170 240 L 192 190 L 182 182 L 170 196 L 158 182 Z"
                          fill="url(#shirtGrad)"
                          stroke="#DDD8CE"
                          strokeWidth="1.5"
                        />
                        {/* Sleek Slate Tie */}
                        <path d="M166 210 L 174 210 L 176 310 L 170 330 L 164 310 Z" fill="#3D4552" />

                        {/* Tailored Dark Charcoal Blazer Shoulders & Chest */}
                        <path
                          d="M45 400 L 70 240 C 95 210, 130 195, 150 192 L 170 270 L 190 192 C 210 195, 245 210, 270 240 L 295 400 Z"
                          fill="url(#blazerGrad)"
                        />

                        {/* Left Tailored Lapel (Where the arrow points!) */}
                        <path
                          d="M136 193 L 170 295 L 140 265 L 102 215 Z"
                          fill="url(#lapelGrad)"
                          stroke="#383836"
                          strokeWidth="1.5"
                        />

                        {/* Right Tailored Lapel */}
                        <path
                          d="M204 193 L 170 295 L 200 265 L 238 215 Z"
                          fill="url(#lapelGrad)"
                          stroke="#383836"
                          strokeWidth="1.5"
                        />

                        {/* Blazer Pocket & Silk Square */}
                        <path d="M90 300 L 130 300" stroke="#383836" strokeWidth="2.5" />
                        <path d="M96 298 L 105 288 L 115 298 Z" fill="#FFFFFF" opacity="0.9" />

                        {/* Center Seam */}
                        <path d="M170 295 L 170 400" stroke="#262624" strokeWidth="2" />
                      </svg>
                    </div>
                  )}

                  {/* Hand-Drawn Curved Arrow & Callout Label (00:01 – 00:03) */}
                  <div className="absolute bottom-6 left-1 sm:left-3 z-30 pointer-events-none flex items-center gap-1.5 select-none">
                    <div className="flex flex-col items-start bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-black/10 shadow-sm">
                      <span className="font-serif italic font-semibold text-sm sm:text-base text-[#141413] tracking-tight leading-tight">
                        My FinTech blazer
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                        FAST-NUCES · 6 Live Sites
                      </span>
                    </div>

                    {/* Hand-drawn SVG Curved Arrow curving towards lapel */}
                    <svg
                      width="54"
                      height="42"
                      viewBox="0 0 54 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-zinc-900 drop-shadow-sm -mt-2 -rotate-3"
                    >
                      <path
                        d="M4 36 C 14 34, 28 26, 42 10"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M32 10 L 43 9 L 41 20"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                /* Interactive 3D Instrument View */
                <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black/90">
                  <HeroInstrument />
                </div>
              )}
            </div>

            {/* Bottom Frame Telemetry Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-600 border-t border-black/10 pt-2.5 z-20">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>60 FPS WebGL Engine</span>
              </span>
              <span className="text-zinc-500 hidden xs:inline">Next.js 14 · Three.js · Edge</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Hero Metadata Bar (matches 00:01 – 00:03 bottom edge) */}
      <div className="w-full border-t border-black/10 py-3.5 px-6 md:px-12 flex items-center justify-between text-[11px] font-mono tracking-[0.16em] uppercase text-zinc-600">
        <span>AVAILABLE FOR WORK</span>
        <span className="hidden sm:inline text-zinc-500 font-medium">
          WORKING FOR CLIENTS WORLDWIDE
        </span>
        <span className="text-zinc-700 font-medium">BASED IN KARACHI, PK</span>
      </div>
    </section>
  );
}

export default HeroSection;
