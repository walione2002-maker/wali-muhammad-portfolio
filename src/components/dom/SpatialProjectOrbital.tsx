'use client';

import React, { useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function SpatialProjectOrbital() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const setActiveProjectId = usePortfolioStore((s) => s.setActiveProjectId);
  const setActiveProjectIndex = usePortfolioStore((s) => s.setActiveProjectIndex);

  // Normalized progress within the showroom section [0.26, 0.64]
  const showroomProgress = useMemo(() => {
    return Math.max(0, Math.min(1, (scrollProgress - 0.26) / 0.38));
  }, [scrollProgress]);

  // Current orbital rotation angle in radians (full 360 sweep across Section 2)
  const currentOrbitAngle = showroomProgress * (Math.PI * 2);

  const touchStartXRef = React.useRef<number | null>(null);
  const touchStartYRef = React.useRef<number | null>(null);

  // Compute 3D spatial properties for each card with mobile optimizations
  const cardsSpatialData = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return PROJECTS.map((project, i) => {
      const baseAngle = i * ((Math.PI * 2) / PROJECTS.length);
      let deltaAngle = (baseAngle - currentOrbitAngle) % (Math.PI * 2);
      if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
      if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;

      const cosVal = Math.cos(deltaAngle); // 1 at front, -1 at back
      const sinVal = Math.sin(deltaAngle);

      // Distance from front
      const absDelta = Math.abs(deltaAngle);
      const isFront = absDelta < Math.PI / 8;

      // 3D Spatial coordinates optimized for mobile portrait & desktop
      const radiusX = isMobile ? 180 : 440;
      const x = sinVal * radiusX;
      const z = (cosVal - 1) * (isMobile ? 220 : 350);
      const rotY = -deltaAngle * (isMobile ? 20 : 35);
      const scale = isMobile
        ? 0.75 + 0.25 * ((cosVal + 1) / 2)
        : 0.68 + 0.32 * ((cosVal + 1) / 2);
      const opacity = Math.max(0.15, Math.min(1, 0.2 + 0.8 * ((cosVal + 1) / 2)));
      // Strictly zero filter blur on mobile to guarantee 60 FPS in iOS Safari & Android WebKit
      const blurPx = isMobile ? 0 : Math.max(0, (1 - cosVal) * 3.5);

      return {
        project,
        i,
        x,
        z,
        rotY,
        scale,
        opacity,
        blurPx,
        isFront,
        absDelta,
        isMobile,
      };
    });
  }, [currentOrbitAngle]);

  // Synchronize front card with global store
  useEffect(() => {
    if (activeSectionIndex !== 2) return;
    let closestIndex = 0;
    let minDelta = Infinity;

    cardsSpatialData.forEach(({ absDelta, i }) => {
      if (absDelta < minDelta) {
        minDelta = absDelta;
        closestIndex = i;
      }
    });

    const frontProject = PROJECTS[closestIndex];
    if (frontProject && activeProjectId !== frontProject.id) {
      setActiveProjectId(frontProject.id);
      setActiveProjectIndex(closestIndex);
    }
  }, [cardsSpatialData, activeSectionIndex, activeProjectId, setActiveProjectId, setActiveProjectIndex]);

  // Scroll to a specific project by index
  const scrollToProject = (targetIndex: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const projectFraction = targetIndex / (PROJECTS.length - 1);
    // Map to showroom scroll progress range [0.28, 0.62]
    const targetProgress = 0.28 + projectFraction * 0.34;
    const targetY = targetProgress * totalScroll;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    const currentIdx = PROJECTS.findIndex((p) => p.id === activeProjectId);
    const nextIdx = (currentIdx - 1 + PROJECTS.length) % PROJECTS.length;
    scrollToProject(nextIdx);
  };

  const handleNext = () => {
    const currentIdx = PROJECTS.findIndex((p) => p.id === activeProjectId);
    const nextIdx = (currentIdx + 1) % PROJECTS.length;
    scrollToProject(nextIdx);
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

    // Detect horizontal swipe (horizontal delta > vertical delta and > 40px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
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
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-1 sm:mb-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-slate-300 bg-surface-secondary/90 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-white/10 backdrop-blur-xl">
          <button
            onClick={handlePrev}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 touch-manipulation"
            aria-label="Previous project in orbit"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
          </button>

          <span className="px-1.5 sm:px-2 text-slate-200">
            {PROJECTS.findIndex((p) => p.id === activeProjectId) + 1} / {PROJECTS.length}
          </span>

          <button
            onClick={handleNext}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 touch-manipulation"
            aria-label="Next project in orbit"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
          </button>

          <span className="sm:hidden text-[9px] font-mono text-cyan-400/70 border-l border-white/10 pl-2">
            Swipe ↔
          </span>
        </div>
      </div>

      {/* 3D Spatial Orbital Stage */}
      <div
        className="relative w-full flex-1 flex items-center justify-center my-auto overflow-visible"
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
        }}
      >
        {cardsSpatialData.map(({ project, x, z, rotY, scale, opacity, blurPx, isFront, isMobile, i }) => {
          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isFront) scrollToProject(i);
              }}
              className="absolute transition-all duration-300 ease-out select-none will-change-transform"
              style={{
                width: '100%',
                maxWidth: isMobile ? 'min(92vw, 390px)' : '460px',
                transform: `translate3d(${x}px, ${isMobile ? 24 : 0}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: opacity,
                filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
                zIndex: isFront ? 30 : Math.round(50 + z / 10),
                pointerEvents: isFront ? 'auto' : !isMobile && Math.abs(x) < 320 ? 'auto' : 'none',
                cursor: !isFront ? 'pointer' : 'default',
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
          const isActive = activeProjectId === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => scrollToProject(idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={`Orbit directly to ${proj.title}`}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-2.5 shadow-[0_0_12px_rgba(0,240,255,0.8)]'
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
