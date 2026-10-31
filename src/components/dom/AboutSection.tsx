'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCcw, Sparkles } from 'lucide-react';
import { TIMELINE_DATA } from '@/data/projects';
import { AnimatePresence, motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const compassSvgRef = useRef<SVGSVGElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Generate 144 ticks around compass circle (r = 500, center = 550, 550)
  const ticks = useMemo(() => {
    const list: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      isMajor: boolean;
      angle: number;
    }> = [];
    const cx = 550;
    const cy = 550;
    const outerR = 500;

    for (let i = 0; i < 144; i++) {
      const angleDeg = (i * 360) / 144;
      const angleRad = (angleDeg * Math.PI) / 180;
      const isMajor = i % 6 === 0;
      const length = isMajor ? 24 : 12;
      const innerR = outerR - length;

      const cos = Math.cos(angleRad);
      const sin = Math.sin(angleRad);

      list.push({
        x1: cx + innerR * cos,
        y1: cy + innerR * sin,
        x2: cx + outerR * cos,
        y2: cy + outerR * sin,
        isMajor,
        angle: angleDeg,
      });
    }
    return list;
  }, []);

  // GSAP ScrollTrigger to rotate the SVG compass dial from 0deg to -120deg as user scrolls through milestones
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let compassST: ScrollTrigger | null = null;

    if (sectionRef.current && compassSvgRef.current) {
      const tween = gsap.to(compassSvgRef.current, {
        rotateZ: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      compassST = tween.scrollTrigger ?? null;
    }

    return () => {
      if (compassST) compassST.kill();
    };
  }, []);

  // Setup IntersectionObserver for each milestone card in the right column
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = document.querySelectorAll('.milestone-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIdx(index);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: [0.2, 0.5],
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleRewind = () => {
    const firstCard = document.getElementById('milestone-0');
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.min(5, Math.floor(ratio * 6));
    const targetCard = document.getElementById(`milestone-${targetIdx}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeMilestone = TIMELINE_DATA[activeIdx] || TIMELINE_DATA[0];

  return (
    <section
      id="my-story"
      ref={sectionRef}
      aria-label="Wali Muhammad Career Timeline & Story"
      className="bg-[#0B0D0C] text-[#F4F3EE] relative overflow-hidden pt-8 pb-28 border-t border-white/10"
    >
      {/* 1. TOP RADIAL TIME-MACHINE COMPASS DIAL ARC (00:07 & 00:13) */}
      <div className="h-44 sm:h-56 w-full overflow-hidden relative flex justify-center items-start select-none pointer-events-none">
        {/* Warm copper/amber atmospheric radial glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(50% 90% at 50% 0%, rgba(217, 119, 6, 0.22) 0%, rgba(11, 13, 12, 0) 100%)',
          }}
        />

        {/* Dynamic Rotating Horological Compass SVG Wheel */}
        <svg
          ref={compassSvgRef}
          width="1100"
          height="1100"
          viewBox="0 0 1100 1100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-[880px] sm:-top-[840px] z-10 transition-transform will-change-transform drop-shadow-[0_0_35px_rgba(245,158,11,0.2)]"
        >
          {/* Concentric Outer Ring */}
          <circle cx="550" cy="550" r="500" stroke="#F59E0B" strokeOpacity="0.4" strokeWidth="2" />
          <circle
            cx="550"
            cy="550"
            r="474"
            stroke="#FFFFFF"
            strokeOpacity="0.12"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle cx="550" cy="550" r="440" stroke="#F59E0B" strokeOpacity="0.18" strokeWidth="1" />

          {/* 144 Radial Tick Marks */}
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isMajor ? '#F59E0B' : '#FFFFFF'}
              strokeOpacity={t.isMajor ? 0.9 : 0.22}
              strokeWidth={t.isMajor ? 2.5 : 1}
            />
          ))}

          {/* Center Pivot Marker */}
          <circle cx="550" cy="550" r="8" fill="#F59E0B" />
          <circle cx="550" cy="550" r="28" stroke="#F59E0B" strokeOpacity="0.5" strokeWidth="1.5" />
        </svg>

        {/* Center Golden Index Triangle Needle */}
        <div className="absolute top-2 z-20 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-amber-400 drop-shadow-[0_0_8px_#F59E0B]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/90 mt-1 font-semibold">
            TIME MACHINE DIAL
          </span>
        </div>
      </div>

      {/* 2. TWO-COLUMN STICKY TIME-MACHINE LAYOUT */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Sticky Column (lg:col-span-5 lg:sticky lg:top-32) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-start select-none">
          {/* Eyebrow */}
          <div className="text-zinc-400 text-sm font-medium flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            <span>My story</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F3EE] tracking-tight">
            Let&apos;s go back in time.
          </h2>

          {/* Giant Kinetic Year Counter (00:08 – 00:11) */}
          <div className="my-3 sm:my-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-[5.5rem] sm:text-[7.5rem] xl:text-[9.5rem] font-extrabold tracking-[-0.04em] leading-none text-[#F4F3EE] tabular-nums"
              >
                {activeMilestone.year}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Active Date Range Subtitle */}
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-zinc-400 mb-8 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeMilestone.dateRange}</span>
          </div>

          {/* Interactive Step Counter & Scrubber Bar (00:08 – 00:11) */}
          <div className="flex items-center gap-4 pt-2">
            {/* Rewind Button */}
            <button
              onClick={handleRewind}
              title="Rewind to 2026 Milestone 01"
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer bg-white/[0.04]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Monospace Step Fraction */}
            <span className="font-mono text-sm text-[#F4F3EE] font-semibold tabular-nums">
              {activeMilestone.stepIndex}
            </span>

            {/* Interactive Horizontal Scrubber Bar */}
            <div
              onClick={handleScrubberClick}
              title="Click track to scrub timeline"
              className="w-36 sm:w-52 h-2 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:brightness-110"
                style={{ width: `${((activeIdx + 1) / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Scrolling Milestones Column (lg:col-span-7 space-y-20 sm:space-y-28 py-6) */}
        <div className="lg:col-span-7 space-y-16 sm:space-y-24 py-4">
          {TIMELINE_DATA.map((milestone, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div
                key={milestone.id}
                id={`milestone-${idx}`}
                data-index={idx}
                className={`milestone-card transition-all duration-500 rounded-3xl p-6 sm:p-8 border ${
                  isActive
                    ? 'opacity-100 translate-x-0 bg-white/[0.04] border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
                    : 'opacity-35 hover:opacity-75 border-transparent bg-transparent'
                }`}
              >
                {/* Emerald Monospace Badge */}
                <div className="inline-block text-xs font-mono uppercase tracking-[0.16em] text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/25 px-3 py-1 rounded-md mb-4 font-semibold">
                  {milestone.badgeText}
                </div>

                {/* Milestone Title */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F4F3EE] tracking-tight mb-2">
                  {milestone.title}
                </h3>

                {/* Subtitle / Institution */}
                <div className="text-zinc-400 text-sm sm:text-base md:text-lg font-medium mb-6">
                  {milestone.subtitle}
                </div>

                {/* Bullets List */}
                <ul className="space-y-3.5 m-0 p-0 list-none">
                  {milestone.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-zinc-300 text-sm sm:text-base leading-relaxed flex items-start gap-3 font-light"
                    >
                      <span className="text-amber-400 font-bold select-none shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
