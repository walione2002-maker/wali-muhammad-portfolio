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

// Sequence for horizontal slides as per benchmark video:
// Slide 1: systems-archive (Terracotta Door on Right, Checklist on Left)
// Slide 2: fintech-apps (Purple Door on Left, Checklist on Right)
// Slide 3: spatial-web (Green Door on Right, Checklist on Left)
// Slide 4: web-development (Blue Door on Left, Checklist on Right)
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
      // 5 panels: 4 slides + 1 finale lineup
      // Total translation is -80% of 500% width
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=380%',
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

  // 3D Camera Portal Zoom-in when any door is clicked (00:13 – 00:14)
  const handleDoorClick = (doorId: DoorCategoryId, element: HTMLElement) => {
    setOpeningDoorId(doorId);

    if (sectionRef.current) {
      const rect = element.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const doorCenterX = rect.left + rect.width / 2;
      const doorCenterY = rect.top + rect.height / 2;

      const moveX = (centerX - doorCenterX) * 3.4;
      const moveY = (centerY - doorCenterY) * 3.4;

      // Cinematic camera flight through the door portal cavity
      gsap.to(sectionRef.current, {
        scale: 4.8,
        x: moveX,
        y: moveY,
        duration: 0.85,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(sectionRef.current, { scale: 1, x: 0, y: 0 });
          openDoorRoom(doorId);
        },
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
      {/* 1. Top Dark Utility Bar (00:03 – 00:04) */}
      <div className="w-full border-b border-white/10 py-3.5 px-6 md:px-12 flex items-center justify-between text-[11px] font-mono tracking-[0.16em] uppercase text-zinc-400">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR WORK</span>
        </span>
        <span className="hidden sm:inline text-zinc-400">WORKING FOR CLIENTS WORLDWIDE</span>
        <span className="text-zinc-300">BASED IN KARACHI, PK</span>
      </div>

      {/* Main Section Header */}
      <div className="pt-10 sm:pt-14 pb-4 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>02 / Capabilities &amp; Architecture</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F3EE]">
          Magic happens behind the doors
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto font-light">
          Step into 4 specialized production chambers engineered for performance, precision, and conversion.
        </p>
      </div>

      {/* 2. Pinned Viewport Container for Desktop Horizontal Walkthrough */}
      <div ref={pinContainerRef} className="relative w-full overflow-hidden">
        {/* Desktop Slide Indicator Dots */}
        <div className="hidden lg:flex items-center justify-center gap-3 py-4 z-20 relative">
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
          className="flex flex-col lg:flex-row w-full lg:w-[500vw] items-stretch min-h-[620px] lg:h-[720px]"
        >
          {/* SLIDES 1 to 4 */}
          {slidesData.map((door, index) => {
            // Alternating alignment:
            // Slide 1 (index 0, Terracotta): Door on Right, Checklist on Left
            // Slide 2 (index 1, Purple): Door on Left, Checklist on Right
            // Slide 3 (index 2, Green): Door on Right, Checklist on Left
            // Slide 4 (index 3, Blue): Door on Left, Checklist on Right
            const doorOnRight = index % 2 === 0;

            return (
              <div
                key={door.id}
                className="w-full lg:w-[100vw] px-6 sm:px-12 lg:px-20 py-8 lg:py-12 flex items-center justify-center shrink-0"
              >
                <div className="max-w-[1240px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Column in Grid */}
                  <div
                    className={`lg:col-span-6 flex items-center justify-center ${
                      doorOnRight ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    {doorOnRight ? (
                      /* Door on Right */
                      <ArchitecturalDoor
                        door={door}
                        isOpening={openingDoorId === door.id}
                        onClick={handleDoorClick}
                      />
                    ) : (
                      /* Checklist on Left (when door is on right) */
                      <div className="flex flex-col items-start w-full">
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400 bg-white/[0.05] border border-white/10 px-3 py-1 rounded inline-block mb-3">
                          {door.subtitleBadge}
                        </span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F3EE] mb-3">
                          {door.title}
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                          {door.roomDescription}
                        </p>

                        {/* 5 Numbered Deliverables Checklist */}
                        <div className="space-y-3 w-full">
                          {door.checklist.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3.5">
                              <span className="w-6 h-6 rounded-full border border-white/25 text-xs font-mono flex items-center justify-center shrink-0 text-zinc-300 bg-white/[0.03]">
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
                          className="mt-7 inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white transition-all bg-white/[0.06] hover:bg-white/[0.12] group cursor-pointer"
                          style={{ color: door.colors.accentHex }}
                        >
                          <span>Step Inside {door.nameplate}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column in Grid */}
                  <div
                    className={`lg:col-span-6 flex items-center justify-center ${
                      doorOnRight ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    {!doorOnRight ? (
                      /* Door on Left */
                      <ArchitecturalDoor
                        door={door}
                        isOpening={openingDoorId === door.id}
                        onClick={handleDoorClick}
                      />
                    ) : (
                      /* Checklist on Left */
                      <div className="flex flex-col items-start w-full">
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400 bg-white/[0.05] border border-white/10 px-3 py-1 rounded inline-block mb-3">
                          {door.subtitleBadge}
                        </span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F3EE] mb-3">
                          {door.title}
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                          {door.roomDescription}
                        </p>

                        {/* 5 Numbered Deliverables Checklist */}
                        <div className="space-y-3 w-full">
                          {door.checklist.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3.5">
                              <span className="w-6 h-6 rounded-full border border-white/25 text-xs font-mono flex items-center justify-center shrink-0 text-zinc-300 bg-white/[0.03]">
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
                          className="mt-7 inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white transition-all bg-white/[0.06] hover:bg-white/[0.12] group cursor-pointer"
                          style={{ color: door.colors.accentHex }}
                        >
                          <span>Step Inside {door.nameplate}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* SLIDE 5: THE 4-DOOR LINEUP FINALE (#doors-lineup) */}
          <div
            id="doors-lineup"
            className="w-full lg:w-[100vw] px-6 sm:px-10 lg:px-16 py-10 lg:py-14 flex flex-col items-center justify-center shrink-0"
          >
            {/* Finale Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
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

            {/* 4 Colored Doors Lineup (Blue, Purple, Green, Terracotta) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1360px] w-full mx-auto items-end justify-items-center">
              {DOORS_DATA.map((door) => (
                <div key={door.id} className="flex flex-col items-center gap-3 w-full max-w-[280px]">
                  <ArchitecturalDoor
                    door={door}
                    compact
                    isOpening={openingDoorId === door.id}
                    onClick={handleDoorClick}
                  />
                  {/* Subtle Sub-Label Under Door */}
                  <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-medium">
                    {door.nameplate}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle Floor Reflection Line */}
            <div className="w-full max-w-[1280px] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
