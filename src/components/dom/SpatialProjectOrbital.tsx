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

  // Compute 3D spatial properties for each card
  const cardsSpatialData = useMemo(() => {
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

      // 3D Spatial coordinates
      // X spreads horizontally, Z recedes deep into space
      const radiusX = typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 440;
      const x = sinVal * radiusX;
      const z = (cosVal - 1) * 350; // 0px at front, -700px at back
      const rotY = -deltaAngle * 35; // Slight inward face towards core
      const scale = 0.68 + 0.32 * ((cosVal + 1) / 2);
      const opacity = Math.max(0.15, Math.min(1, 0.2 + 0.8 * ((cosVal + 1) / 2)));
      const blurPx = Math.max(0, (1 - cosVal) * 3.5);

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

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-6 sm:py-10">
      {/* Top Section Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto z-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] mb-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Layers className="w-3.5 h-3.5" />
            <span>02 // 3D Spatial Orbital Constellation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
            The 8 Live Deployments Showroom
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 font-light max-w-xl">
            Scroll to orbit around the 3D centerpiece. Each project sweeps into forward focus in 3D perspective, synchronized with its satellite node.
          </p>
        </div>

        {/* Orbit Step Controls */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-surface-secondary/90 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-xl">
          <button
            onClick={handlePrev}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
            aria-label="Previous project in orbit"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
          </button>

          <span className="px-2 text-slate-200">
            {PROJECTS.findIndex((p) => p.id === activeProjectId) + 1} / {PROJECTS.length}
          </span>

          <button
            onClick={handleNext}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
            aria-label="Next project in orbit"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
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
        {cardsSpatialData.map(({ project, x, z, rotY, scale, opacity, blurPx, isFront, i }) => {
          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isFront) scrollToProject(i);
              }}
              className="absolute transition-all duration-300 ease-out select-none will-change-transform"
              style={{
                width: '100%',
                maxWidth: '460px',
                transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: opacity,
                filter: `blur(${blurPx}px)`,
                zIndex: isFront ? 30 : Math.round(50 + z / 10),
                pointerEvents: isFront ? 'auto' : Math.abs(x) < 320 ? 'auto' : 'none',
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
