'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function SpatialProjectOrbital() {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeProjectIndex = usePortfolioStore((s) => s.activeProjectIndex);
  const isMobileStore = usePortfolioStore((s) => s.isMobile);
  const setActiveProjectId = usePortfolioStore((s) => s.setActiveProjectId);
  const setActiveProjectIndex = usePortfolioStore((s) => s.setActiveProjectIndex);

  const isMobile =
    isMobileStore ||
    (typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)));

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Jump to specific project index and synchronize smooth scroll
  const goToProject = (targetIndex: number) => {
    const sanitizedIndex = (targetIndex + PROJECTS.length) % PROJECTS.length;
    setActiveProjectIndex(sanitizedIndex);
    setActiveProjectId(PROJECTS[sanitizedIndex].id);

    if (typeof window !== 'undefined') {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const projectFraction = sanitizedIndex / (PROJECTS.length - 1);
      // Map to showroom scroll progress range [0.28, 0.62]
      const targetProgress = 0.28 + projectFraction * 0.34;
      const targetY = targetProgress * totalScroll;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    goToProject(activeProjectIndex - 1);
  };

  const handleNext = () => {
    goToProject(activeProjectIndex + 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // Detect horizontal swipe gesture: deltaX > 35px & horizontal dominance
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between py-3 sm:py-10 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top Section Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-4 pointer-events-auto z-20">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-1 sm:mb-2 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
            <span>02 // 3D Spatial Orbital Constellation</span>
          </div>
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-md leading-tight">
            The 8 Live Deployments Showroom
          </h2>
          <p className="hidden sm:block mt-1 text-xs sm:text-sm text-slate-300 font-light max-w-xl">
            Scroll or swipe to orbit around the 3D centerpiece. Each project sweeps into forward focus in 3D perspective, synchronized with its satellite node.
          </p>
        </div>

        {/* Orbit Step Controls */}
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-slate-200 bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.12)]">
          <button
            onClick={handlePrev}
            className="p-1 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 touch-manipulation cursor-pointer"
            aria-label="Previous project in orbit"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
          </button>

          <span className="px-1.5 sm:px-2 text-slate-100 font-semibold">
            {activeProjectIndex + 1} / {PROJECTS.length}
          </span>

          <button
            onClick={handleNext}
            className="p-1 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 touch-manipulation cursor-pointer"
            aria-label="Next project in orbit"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
          </button>

          <span className="sm:hidden text-[9px] font-mono text-cyan-400/80 border-l border-white/15 pl-2 font-semibold">
            Swipe ↔
          </span>
        </div>
      </div>

      {/* 3D Spatial Orbital Stage — Zero animated blur filter & strictly GPU-composited transform & opacity */}
      <div
        className="relative w-full flex-1 flex items-center justify-center my-auto overflow-visible"
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
        }}
      >
        {PROJECTS.map((project, i) => {
          let diff = (i - activeProjectIndex) % PROJECTS.length;
          if (diff > PROJECTS.length / 2) diff -= PROJECTS.length;
          if (diff < -PROJECTS.length / 2) diff += PROJECTS.length;

          const isFront = diff === 0;

          // Spatial positioning coordinates
          let x = 0;
          let z = 0;
          let rotY = 0;
          let scale = 1;
          let opacity = 1;
          let isVisible = true;
          let zIndex = 30;

          if (isFront) {
            x = 0;
            z = 0;
            rotY = 0;
            scale = 1;
            opacity = 1;
            isVisible = true;
            zIndex = 30;
          } else if (diff === 1) {
            x = isMobile ? 180 : 380;
            z = isMobile ? -140 : -200;
            rotY = isMobile ? -22 : -32;
            scale = isMobile ? 0.82 : 0.85;
            opacity = 0.45;
            isVisible = true;
            zIndex = 20;
          } else if (diff === -1) {
            x = isMobile ? -180 : -380;
            z = isMobile ? -140 : -200;
            rotY = isMobile ? 22 : 32;
            scale = isMobile ? 0.82 : 0.85;
            opacity = 0.45;
            isVisible = true;
            zIndex = 20;
          } else {
            // Distant cards culled to prevent mobile compositor rasterization overhead
            x = diff > 0 ? (isMobile ? 280 : 600) : (isMobile ? -280 : -600);
            z = isMobile ? -280 : -450;
            rotY = diff > 0 ? -45 : 45;
            scale = 0.7;
            opacity = 0;
            isVisible = false;
            zIndex = 10;
          }

          const isCulled = !isVisible || opacity < 0.15;

          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isFront) goToProject(i);
              }}
              className="absolute select-none will-change-transform"
              style={{
                width: '100%',
                maxWidth: isMobile ? 'min(92vw, 390px)' : '460px',
                transform: `translate3d(${x}px, ${isMobile ? 24 : 0}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                visibility: isCulled ? 'hidden' : 'visible',
                pointerEvents: isFront ? 'auto' : !isMobile && Math.abs(diff) === 1 ? 'auto' : 'none',
                cursor: !isFront ? 'pointer' : 'default',
                transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease-out',
              }}
            >
              <ProjectCard project={project} isSpatialFront={isFront} />
            </div>
          );
        })}
      </div>

      {/* Bottom Orbital Quick-Selector Navigation Dots */}
      <div className="w-full flex items-center justify-center gap-2.5 z-20 pointer-events-auto px-4">
        {PROJECTS.map((proj, idx) => {
          const isActive = activeProjectIndex === idx;
          return (
            <button
              key={proj.id}
              onClick={() => goToProject(idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              aria-label={`Orbit directly to ${proj.title}`}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-2.5 shadow-[0_0_15px_rgba(0,240,255,0.9)]'
                    : 'w-2 h-2 bg-white/25 group-hover:bg-white/60'
                }`}
                style={{
                  backgroundColor: isActive ? proj.accentColor : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SpatialProjectOrbital;
