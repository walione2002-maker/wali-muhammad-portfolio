'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DOORS_DATA } from '@/data/projects';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { ArchitecturalDoor } from './ArchitecturalDoor';
import { type DoorCategoryId } from '@/types';
import { ArrowRight, Sparkles, LockOpen } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Exact benchmark sequence for horizontal slides (00:04 – 00:06):
// Slide 1 (00:04): Checklist Left · Terracotta Door (B2B & Digital Suites) Right
// Slide 2 (00:05): Purple Door (FinTech & Web Apps) Left · Checklist Right
// Slide 3 (00:05.5): Checklist Left · Green Door (3D & Spatial Web) Right
// Slide 4 (00:06): Blue Door (Web Development) Left · Checklist Right
const SLIDE_ORDER: DoorCategoryId[] = [
  'systems-archive',
  'fintech-apps',
  'spatial-web',
  'web-development',
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const openingDoorId = usePortfolioStore((s) => s.openingDoorId);
  const setOpeningDoorId = usePortfolioStore((s) => s.setOpeningDoorId);
  const openDoorRoom = usePortfolioStore((s) => s.openDoorRoom);
  const setThemeMode = usePortfolioStore((s) => s.setThemeMode);

  // Setup GSAP ScrollTrigger for pinned horizontal walkthrough
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Theme switch trigger: Entering doors-section switches to dark theme
    const themeTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 20%',
      onEnter: () => setThemeMode('dark'),
      onLeaveBack: () => setThemeMode('light'),
      onEnterBack: () => setThemeMode('dark'),
    });

    // 2. Pinned Horizontal Walkthrough on desktop (>= 1024px)
    let horizontalST: ScrollTrigger | null = null;
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop && pinContainerRef.current && sliderTrackRef.current) {
      // 5 panels: 4 alternating slides + 1 finale 4-door lineup
      // Total translation is -80% of 500% track width
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          scrub: 1.1,
          start: 'top top',
          end: '+=400%',
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.min(4, Math.floor(progress * 5));
            setActiveSlide(slideIndex);
          },
        },
      });

      tl.to(sliderTrackRef.current, {
        xPercent: -80,
        ease: 'none',
      });

      horizontalST = tl.scrollTrigger ?? null;
    }

    return () => {
      themeTrigger.kill();
      if (horizontalST) horizontalST.kill();
    };
  }, [setThemeMode]);

  // Stage 4 (00:13 – 00:14): The Close-Up Handle & Doorway Fly-Through Portal Animation
  const handleDoorClick = (doorId: DoorCategoryId, element: HTMLElement) => {
    setOpeningDoorId(doorId);

    if (sectionRef.current) {
      const rect = element.getBoundingClientRect();
      const secRect = sectionRef.current.getBoundingClientRect();

      // Target the doorway opening / dark portal cavity coordinate
      const originX = rect.left - secRect.left + rect.width * 0.55;
      const originY = rect.top - secRect.top + rect.height * 0.52;

      // Set transform origin straight to the clicked door's interior cavity
      gsap.set(sectionRef.current, {
        transformOrigin: `${originX}px ${originY}px`,
      });

      // 4-Phase Cinematic Camera Fly-Through Timeline (00:13 – 00:14)
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(sectionRef.current, { scale: 1, clearProps: 'transform,transformOrigin' });
          openDoorRoom(doorId);
        },
      });

      // Phase A (0ms – 350ms): Zoom camera toward clicked door (scale 2.2) while handle depresses
      tl.to(sectionRef.current, {
        scale: 2.2,
        duration: 0.35,
        ease: 'power2.in',
      });

      // Phase B (350ms – 900ms): Swing 3D slab inward (-82deg) & accelerate zoom (scale 7.5) into the black cavity
      tl.to(sectionRef.current, {
        scale: 7.5,
        duration: 0.55,
        ease: 'power3.in',
      });
    } else {
      openDoorRoom(doorId);
    }
  };

  const slidesData = SLIDE_ORDER.map((id) => DOORS_DATA.find((d) => d.id === id)!);

  return (
    <section
      id="doors-section"
      ref={sectionRef}
      aria-label="Architectural Doors & Services"
      className="bg-[#0B0D0C] text-[#F4F3EE] relative overflow-hidden transition-colors duration-500 w-full"
    >
      {/* 1. TOP DARK THEME UTILITY BAR (Stage 1 — 00:03 – 00:04) */}
      <div className="w-full border-b border-white/10 py-4 px-6 md:px-12 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-400 select-none">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR WORK</span>
        </span>
        <span className="hidden sm:inline text-zinc-400">WORKING FOR CLIENTS WORLDWIDE</span>
        <span className="text-zinc-300">BASED IN KARACHI, PK</span>
      </div>

      {/* Main Section Header (00:03 – 00:04) */}
      <div className="pt-10 sm:pt-14 pb-4 px-6 text-center max-w-4xl mx-auto select-none">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>02 / Capabilities &amp; Architecture</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#F4F3EE]">
          Magic happens behind the doors
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
          Step into 4 specialized production chambers engineered for performance, precision, and conversion.
        </p>
      </div>

      {/* 2. PINNED VIEWPORT CONTAINER FOR HORIZONTAL SCRUB (Stage 2 — 00:04 – 00:06) */}
      <div ref={pinContainerRef} className="relative w-full overflow-hidden">
        {/* Subtle Curved Orbital Spotlight Arc & Floor Line Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Soft emerald-slate radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)',
            }}
          />

          {/* Curved Orbital Arc SVG Stroke */}
          <svg
            className="w-full h-full opacity-35"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="720"
              cy="430"
              rx="680"
              ry="260"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </svg>

          {/* Continuous Horizontal Floor Line */}
          <div className="w-full h-[1px] bg-white/15 absolute bottom-0 left-0 right-0 z-10" />
        </div>

        {/* Desktop Slide Indicator Dots */}
        <div className="hidden lg:flex items-center justify-center gap-3 py-4 z-20 relative select-none">
          {['Terracotta', 'Purple', 'Green', 'Cobalt', '4-Door Lineup'].map((name, i) => (
            <div
              key={name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === i ? 'w-10 bg-white' : 'w-2 bg-white/20'
              }`}
              title={name}
            />
          ))}
        </div>

        {/* Horizontal Slider Track (5 Panels: 4 Slides + 1 Finale) */}
        <div
          ref={sliderTrackRef}
          className="flex flex-col lg:flex-row w-full lg:w-[500vw] items-stretch min-h-[640px] lg:h-[720px] relative z-10"
        >
          {/* SLIDES 1 to 4: Alternating Doors & Checklists */}
          {slidesData.map((door, index) => {
            // Alternating alignment matching 00:04 – 00:06:
            // Slide 1 (index 0, Terracotta): Checklist Left · Door Right
            // Slide 2 (index 1, Purple): Door Left · Checklist Right
            // Slide 3 (index 2, Green): Checklist Left · Door Right
            // Slide 4 (index 3, Blue): Door Left · Checklist Right
            const doorOnRight = index % 2 === 0;

            const checklistBlock = (
              <div className="flex flex-col items-start w-full max-w-xl">
                <span className="bg-white/[0.06] text-zinc-300 text-[11px] font-mono uppercase tracking-[0.16em] px-3 py-1 rounded inline-block mb-6">
                  {door.subtitleBadge}
                </span>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F3EE] mb-2.5 tracking-tight">
                  {door.title}
                </h3>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {door.roomDescription}
                </p>

                {/* Numbered Items 1 to 5 in Circular Outlines */}
                <div className="space-y-3.5 w-full">
                  {door.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-5 h-5 rounded-full border border-white/30 text-[11px] font-mono flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base text-[#F4F3EE] font-normal leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step Inside Button */}
                <button
                  onClick={(e) => handleDoorClick(door.id, e.currentTarget)}
                  className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white transition-all bg-white/[0.06] hover:bg-white/[0.12] group cursor-pointer"
                  style={{ color: door.colors.accentHex }}
                >
                  <span>Step Inside {door.nameplate}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );

            const doorBlock = (
              <div className="flex flex-col items-center justify-end pb-0">
                <ArchitecturalDoor
                  door={door}
                  isOpening={openingDoorId === door.id}
                  onClick={handleDoorClick}
                />
              </div>
            );

            return (
              <div
                key={door.id}
                className="w-full lg:w-[100vw] px-6 sm:px-12 lg:px-20 py-8 lg:py-12 flex items-center justify-center shrink-0 relative"
              >
                <div className="max-w-[1240px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {doorOnRight ? (
                    <>
                      <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
                        {checklistBlock}
                      </div>
                      <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2">
                        {doorBlock}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-1">
                        {doorBlock}
                      </div>
                      <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-2">
                        {checklistBlock}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* SLIDE 5: THE 4-DOOR FLUSH CORRIDOR LINEUP (Stage 3 — 00:06 – 00:07 & 00:12 – 00:13) */}
          <div
            id="doors-lineup"
            className="w-full lg:w-[100vw] px-4 sm:px-8 lg:px-14 py-8 lg:py-12 flex flex-col items-center justify-end shrink-0 relative"
          >
            {/* Corridor Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 select-none">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 bg-white/[0.05] border border-white/10 px-3.5 py-1.5 rounded-full mb-3">
                <LockOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>All Chambers Unlocked</span>
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F3EE] tracking-tight">
                Select a door to step inside
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base mt-2 font-light">
                Click any door below to inspect live client systems, verified outcomes, and our 3D engineering lab.
              </p>
            </div>

            {/* 4 Colored Doors Lineup (Blue, Purple, Green, Terracotta) Flush on Floor Line */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-end gap-4 md:gap-6 px-4 border-b border-white/15 pb-0 max-w-[1360px] w-full mx-auto">
              {DOORS_DATA.map((door) => (
                <div key={door.id} className="flex flex-col items-center gap-2">
                  <ArchitecturalDoor
                    door={door}
                    compact
                    isOpening={openingDoorId === door.id}
                    onClick={handleDoorClick}
                  />
                  {/* Subtle Sub-Label Under Door */}
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-medium pb-2">
                    {door.nameplate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
