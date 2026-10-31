'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLIP_ROLES } from '@/data/projects';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const setProjectModalOpen = usePortfolioStore((s) => s.setProjectModalOpen);

  // Split-flap auto-rotation every 2500ms
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % FLIP_ROLES.length);
    }, 2500);
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
    const el = document.getElementById('doors-section') || document.getElementById('doors-lineup');
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
      className="min-h-screen pt-14 bg-[#F4F3EE] text-[#141413] flex flex-col justify-between relative overflow-hidden"
    >
      {/* 1. MAIN EDITORIAL CONTENT AREA (00:00 – 00:03) */}
      <div className="max-w-[1380px] mx-auto w-full px-6 md:px-14 flex-1 grid grid-cols-1 lg:grid-cols-12 items-end pb-0 relative">
        {/* Left Column (lg:col-span-7 self-center py-10 lg:py-16 z-20) */}
        <div className="lg:col-span-7 self-center py-8 sm:py-12 z-20 flex flex-col items-start">
          {/* Eyebrow (00:00) */}
          <div className="text-xs md:text-sm font-medium text-[#141413]/80 mb-5 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>• Independent Freelancer &amp; FinTech Architect</span>
          </div>

          {/* Giant Headline (00:00) */}
          <h1 className="text-5xl sm:text-6xl md:text-[4.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-[#141413]">
            <span className="block">Hi, I&apos;m Wali.</span>
            <span className="block mt-1">I am a</span>
          </h1>

          {/* 3D HINGED ROLODEX / FLIP-BOARD PILL (00:00 – 00:02) */}
          <div
            onClick={handleManualFlip}
            className="bg-[#181818] p-2.5 sm:p-3.5 rounded-[24px] sm:rounded-[30px] inline-block mt-4 mb-9 shadow-[0_22px_50px_rgba(0,0,0,0.22)] relative perspective-1200 cursor-pointer select-none group"
            title="Click to flip role"
          >
            {/* Top Binder Post Left (Clasp locking white card) */}
            <div className="absolute left-[22%] -top-3.5 w-2.5 sm:w-3 h-8 sm:h-9 -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-400 via-zinc-800 to-black border border-black/40 shadow-lg z-30 pointer-events-none">
              <div className="absolute top-1 left-0.5 w-1 h-3 rounded-full bg-white/50 blur-[0.5px]" />
            </div>

            {/* Top Binder Post Right (Clasp locking white card) */}
            <div className="absolute right-[22%] -top-3.5 w-2.5 sm:w-3 h-8 sm:h-9 translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-400 via-zinc-800 to-black border border-black/40 shadow-lg z-30 pointer-events-none">
              <div className="absolute top-1 left-0.5 w-1 h-3 rounded-full bg-white/50 blur-[0.5px]" />
            </div>

            {/* Stacked Card Edge Underneath (Thick card stack appearance) */}
            <div className="absolute inset-x-3 -bottom-2 h-4 bg-[#E5E4DF] rounded-b-[20px] -z-10 border-t border-black/10 shadow-sm" />

            {/* The Swinging White Card */}
            <div
              className="bg-[#F7F6F2] rounded-[18px] sm:rounded-[22px] px-8 sm:px-14 py-5 sm:py-7 min-w-[300px] sm:min-w-[500px] md:min-w-[560px] shadow-[0_12px_25px_rgba(0,0,0,0.28)] relative origin-top preserve-3d"
              style={{
                transform: 'rotateX(8deg) rotateZ(-0.8deg)',
              }}
            >
              {/* Oblong Punched Hole Left */}
              <div className="absolute left-[22%] top-0 -translate-x-1/2 w-5 sm:w-6 h-2.5 sm:h-3 rounded-b-full bg-[#181818] shadow-inner z-20 pointer-events-none" />

              {/* Oblong Punched Hole Right */}
              <div className="absolute right-[22%] top-0 translate-x-1/2 w-5 sm:w-6 h-2.5 sm:h-3 rounded-b-full bg-[#181818] shadow-inner z-20 pointer-events-none" />

              {/* Horizontal Center Seam Line */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/[0.08] z-20 pointer-events-none" />

              {/* Mechanical Flapping Content with Spring Bounce */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoleIndex}
                  initial={{ rotateX: -85, opacity: 0 }}
                  animate={{
                    rotateX: [-85, 14, 5, 8],
                    opacity: 1,
                  }}
                  exit={{ rotateX: 85, opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.65, 0.85, 1],
                  }}
                  style={{
                    transformOrigin: '50% 0%',
                  }}
                  className="flex flex-col items-center justify-center preserve-3d"
                >
                  <span className="text-3xl sm:text-5xl md:text-[3.25rem] font-bold tracking-[-0.03em] text-[#141413] whitespace-nowrap text-center block">
                    {currentRole.label}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mt-1 sm:mt-1.5 text-center block">
                    {currentRole.badgeNote}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom CTA Row (00:00 – 00:03) */}
          <div className="flex flex-wrap items-center gap-6 mt-1">
            {/* Primary Dark Pill Button */}
            <button
              onClick={handleStartProject}
              className="bg-[#141413] text-[#F4F3EE] pl-6 pr-2 py-2 rounded-full inline-flex items-center gap-4 text-sm sm:text-base font-medium shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
            >
              <span>Start a project</span>
              <span className="w-9 h-9 rounded-full bg-[#F4F3EE] text-[#141413] flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            {/* Secondary Link */}
            <a
              href="#doors-section"
              onClick={handleSeeWork}
              className="text-sm sm:text-base font-medium text-[#141413] underline underline-offset-8 decoration-black/40 hover:decoration-black ml-2 cursor-pointer transition-colors"
            >
              See my work
            </a>
          </div>
        </div>

        {/* Right Column: Studio Cutout Standing Flush on Bottom (00:00 – 00:03) */}
        <div className="lg:col-span-5 relative flex justify-center items-end self-end h-full pt-8 z-10">
          <div className="relative w-full max-w-[440px] flex items-end justify-center select-none">
            {/* Photo Cutout if available in public/ */}
            {!imageError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/wali-portrait.png"
                alt="Wali Muhammad Cutout Portrait"
                onError={() => setImageError(true)}
                className="w-full max-h-[580px] object-cover object-bottom pointer-events-none drop-shadow-2xl"
              />
            ) : null}

            {/* Realistic Studio-Lit Suited Architect Silhouette sitting FLUSH at bottom */}
            {imageError && (
              <svg
                viewBox="0 0 460 620"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-h-[580px] drop-shadow-2xl pointer-events-none"
              >
                <defs>
                  <linearGradient id="charcoalSuit" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#252524" />
                    <stop offset="45%" stopColor="#181817" />
                    <stop offset="100%" stopColor="#0F0F0E" />
                  </linearGradient>
                  <linearGradient id="suitLapelLeft" x1="0%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#2F2F2D" />
                    <stop offset="100%" stopColor="#181817" />
                  </linearGradient>
                  <linearGradient id="suitLapelRight" x1="100%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#2F2F2D" />
                    <stop offset="100%" stopColor="#181817" />
                  </linearGradient>
                  <linearGradient id="crispShirt" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EFECE6" />
                  </linearGradient>
                  <linearGradient id="silkTie" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3E4550" />
                    <stop offset="100%" stopColor="#1C2128" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D8B49B" />
                    <stop offset="100%" stopColor="#C49B83" />
                  </linearGradient>
                  <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#222220" />
                    <stop offset="100%" stopColor="#121211" />
                  </linearGradient>
                </defs>

                {/* Head & Neck */}
                <ellipse cx="230" cy="180" rx="55" ry="68" fill="url(#skinGrad)" />
                {/* Wavy Styled Hair */}
                <path
                  d="M165 175 C 160 100, 300 95, 295 175 C 295 190, 280 135, 230 130 C 180 135, 168 190, 165 175 Z"
                  fill="url(#hairGrad)"
                />
                {/* Subtle Facial Details: Jawline, Ears */}
                <ellipse cx="172" cy="185" rx="10" ry="16" fill="#C49B83" />
                <ellipse cx="288" cy="185" rx="10" ry="16" fill="#C49B83" />
                <path d="M210 230 L 210 295 L 250 295 L 250 230 Z" fill="#BA8E76" />

                {/* Crisp White Shirt Collar */}
                <path
                  d="M202 288 L 230 355 L 258 288 L 246 278 L 230 298 L 214 278 Z"
                  fill="url(#crispShirt)"
                  stroke="#DDD8CE"
                  strokeWidth="2"
                />

                {/* Silk Tie with Windsor Knot */}
                <path d="M224 315 L 236 315 L 239 450 L 230 480 L 221 450 Z" fill="url(#silkTie)" />

                {/* Tailored Dark Charcoal Blazer (Sits flush at bottom y = 620) */}
                <path
                  d="M70 620 L 105 380 C 135 320, 185 295, 210 290 L 230 410 L 250 290 C 275 295, 325 320, 355 380 L 390 620 Z"
                  fill="url(#charcoalSuit)"
                />

                {/* Left Notched Lapel (Where the white arrow points!) */}
                <path
                  d="M190 292 L 230 435 L 195 390 L 140 325 Z"
                  fill="url(#suitLapelLeft)"
                  stroke="#333331"
                  strokeWidth="2"
                />

                {/* Right Notched Lapel */}
                <path
                  d="M270 292 L 230 435 L 265 390 L 320 325 Z"
                  fill="url(#suitLapelRight)"
                  stroke="#333331"
                  strokeWidth="2"
                />

                {/* Breast Welt Pocket with White Silk Pocket Square */}
                <path d="M125 435 L 175 435" stroke="#333331" strokeWidth="3" />
                <path d="M135 433 L 148 420 L 160 433 Z" fill="#FFFFFF" opacity="0.95" />

                {/* Center Button and Seam line */}
                <circle cx="230" cy="485" r="5" fill="#111110" stroke="#333331" strokeWidth="1.5" />
                <path d="M230 492 L 230 620" stroke="#1F1F1E" strokeWidth="2.5" />
              </svg>
            )}

            {/* WHITE HAND-DRAWN ARROW & ANNOTATION OVER THE SUIT (00:00 – 00:03) */}
            <div className="absolute bottom-[24%] left-[10%] sm:left-[16%] z-30 pointer-events-none flex flex-col items-start select-none">
              {/* Hand-Drawn Curved Arrow in crisp white ink pointing to lapel */}
              <svg
                width="74"
                height="56"
                viewBox="0 0 74 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F4F3EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] ml-8 -mb-2"
              >
                <path
                  d="M6 48 C 22 45, 42 34, 60 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M46 12 L 62 10 L 58 26"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Hand-drawn editorial annotation label */}
              <div className="bg-[#141413]/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 shadow-lg">
                <span className="font-serif italic font-semibold text-base sm:text-lg text-[#F4F3EE] tracking-tight leading-none block">
                  My chilly jacket
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-medium block mt-0.5">
                  FAST-NUCES · 6 Live Sites
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM FULL-WIDTH STATUS STRIP (00:00 – 00:03) */}
      <div className="border-t border-black/15 bg-[#F4F3EE] px-6 md:px-12 py-3.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em] text-[#141413]/80 z-30 w-full">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>AVAILABLE FOR WORK</span>
        </span>
        <span className="hidden sm:inline font-medium text-zinc-600">
          WORKING FOR CLIENTS WORLDWIDE
        </span>
        <span className="font-medium text-zinc-800">BASED IN KARACHI, PK</span>
      </div>
    </section>
  );
}

export default HeroSection;
