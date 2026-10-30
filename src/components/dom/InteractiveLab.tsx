'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { type LabExperimentId, type LabExperimentMeta } from '@/types';
import { RotateCcw, Cpu, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { graphicsManager, type GraphicsSettings } from '@/lib/graphics/quality';

// Dynamic import with SSR false for strict client-side WebGL lifecycle
const LabCanvas = dynamic(() => import('@/components/canvas/LabCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-[#666666] font-mono text-xs uppercase tracking-widest gap-3 bg-[#080808]">
      <div className="w-6 h-6 border-2 border-[#333333] border-t-[#FF4D00] rounded-full animate-spin" />
      <span>Initializing WebGL Pipeline...</span>
    </div>
  ),
});

const EXPERIMENTS: LabExperimentMeta[] = [
  {
    id: '01-gyroscopic',
    number: '01',
    title: 'Gyroscopic Material Study',
    tagline: 'Physical Transmission & Gyroscopic Mechanics',
    description:
      'A study in real-time transmission optics, refraction index dispersion, and nested gimbal harmonic rotation.',
    interactionHint: 'Drag to Orbit 3D Gimbal · Switch Shader Modes Below',
    technology: ['Three.js', 'MeshPhysicalMaterial', 'Gimbal Physics'],
    modes: ['refraction', 'wireframe', 'kinetic'],
  },
  {
    id: '02-spatial-system',
    number: '02',
    title: 'Spatial Interface Architecture',
    tagline: 'Modular Planar Systems in 3D Space',
    description:
      'An exploration of interface layers (client presentation, state, services, database) assembling into a coherent digital product structure.',
    interactionHint: 'Drag to Inspect Layer Depth · Toggle Exploded View',
    technology: ['Spatial UI', 'Layered Geometry', 'Isometric Matrix'],
    modes: ['assembled', 'deconstructed', 'planar'],
  },
  {
    id: '03-kinetic-type',
    number: '03',
    title: 'Kinetic Typographic Field',
    tagline: 'Dynamic Velocity Displacement Sculpture',
    description:
      'Beveled 3D letterforms forming "BUILD WITH INTENT". Pointer velocity generates elastic displacement waves with damped return.',
    interactionHint: 'Move Cursor Across Letters to Generate Force Wave',
    technology: ['3D Extruded Glyphs', 'Elastic Springs', 'Velocity Physics'],
    modes: ['harmonic', 'velocity', 'grid'],
  },
  {
    id: '04-signal-architecture',
    number: '04',
    title: 'Responsive Signal Architecture',
    tagline: 'Edge Routing & Packet Flow Simulation',
    description:
      'Real-time graph visualization representing global network packets traveling between client devices, edge nodes, and database clusters.',
    interactionHint: 'Drag to Rotate Topology · Toggle Surge Velocity',
    technology: ['InstancedMesh', 'Graph Networks', 'Edge Simulation'],
    modes: ['continuous', 'burst', 'route'],
  },
  {
    id: '05-layout-engine',
    number: '05',
    title: 'Generative Layout Engine',
    tagline: 'Dynamic Grid & Constraint Adaptation',
    description:
      'Spatial grid modules that dynamically recalculate aspect ratios, column rhythms, and component scales in real time.',
    interactionHint: 'Toggle Layout Density Modes · Drag to Inspect',
    technology: ['Parametric Layouts', 'Dynamic Constraints', 'Interpolation'],
    modes: ['balanced', 'dense', 'minimal'],
  },
  {
    id: '06-topographic-shader',
    number: '06',
    title: 'Topographic Shader Study',
    tagline: 'Real-time GLSL Surface Displacement',
    description:
      'Custom GLSL vertex deformation and contour line shaders generating elevation ridges, ripple interference, and shockwaves.',
    interactionHint: 'Move Cursor to Generate Elevation Ripples',
    technology: ['GLSL Shaders', 'Vertex Displacement', 'Contour Mapping'],
    modes: ['frequencies', 'topography', 'pulse'],
  },
];

export function InteractiveLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [settings, setSettings] = useState<GraphicsSettings>(graphicsManager.getSettings());
  const [showMobileGrid, setShowMobileGrid] = useState(false);

  const activeExpId = usePortfolioStore((s) => s.activeExperiment);
  const setActiveExp = usePortfolioStore((s) => s.setActiveExperiment);
  const experimentModes = usePortfolioStore((s) => s.experimentModes);
  const setExperimentMode = usePortfolioStore((s) => s.setExperimentMode);

  useEffect(() => {
    return graphicsManager.subscribe((s) => setSettings(s));
  }, []);

  // Viewport intersection observer to completely halt WebGL rendering off-screen
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const currentIndex = EXPERIMENTS.findIndex((e) => e.id === activeExpId);
  const activeExp = EXPERIMENTS[currentIndex !== -1 ? currentIndex : 0];
  const activeMode = experimentModes[activeExp.id] || activeExp.modes[0];

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + EXPERIMENTS.length) % EXPERIMENTS.length;
    setActiveExp(EXPERIMENTS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % EXPERIMENTS.length;
    setActiveExp(EXPERIMENTS[nextIdx].id);
  };

  return (
    <section
      id="lab"
      className="relative max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 z-10"
      aria-labelledby="lab-section-title"
    >
      {/* Section Header (Centered on mobile, left-aligned on desktop) */}
      <div className="mb-10 sm:mb-14 text-center lg:text-left">
        <div className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3 sm:mb-4">
          03 / Spatial &amp; WebGL Lab
        </div>
        <h2
          id="lab-section-title"
          className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          Interactive<br />Engineering Lab
        </h2>
        <p className="text-[#A3A3A3] text-sm xs:text-base sm:text-xl mt-4 sm:mt-6 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
          Six distinct, contained WebGL experiments exploring spatial mechanics, kinetic typography, information architecture, and real-time GLSL shader physics.
        </p>
      </div>

      {/* 
        Mobile Experiment Stepper & Selector Bar (< lg):
        Prev/Next Buttons + Active Indicator + Grid View Toggle
      */}
      <div className="lg:hidden mb-4 space-y-2">
        <div className="flex items-center justify-between p-2.5 bg-[#0F0F0F] border border-[#222222]">
          <button
            onClick={handlePrev}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#E8E4DE] hover:text-[#FF4D00] border border-[#262626] bg-[#141414] active:scale-95 transition-all touch-manipulation"
            aria-label="Previous Experiment"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center px-2 min-w-0 flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D00] font-bold block">
              EXP {activeExp.number} OF 06
            </span>
            <span className="font-display font-bold text-xs sm:text-sm text-[#E8E4DE] truncate block">
              {activeExp.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowMobileGrid(!showMobileGrid)}
              className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center border transition-all touch-manipulation ${
                showMobileGrid
                  ? 'border-[#FF4D00] text-[#FF4D00] bg-[#1C1C1C]'
                  : 'border-[#262626] text-[#AAAAAA] hover:text-[#E8E4DE] bg-[#141414]'
              }`}
              aria-label="Toggle All Experiments Grid"
              aria-expanded={showMobileGrid}
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#E8E4DE] hover:text-[#FF4D00] border border-[#262626] bg-[#141414] active:scale-95 transition-all touch-manipulation"
              aria-label="Next Experiment"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Expandable Direct-Selection Grid */}
        {showMobileGrid && (
          <div className="grid grid-cols-2 gap-2 p-3 bg-[#0C0C0C] border border-[#262626] animate-fadeIn">
            {EXPERIMENTS.map((exp) => {
              const isSelected = activeExpId === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    setActiveExp(exp.id);
                    setShowMobileGrid(false);
                  }}
                  className={`p-3 text-left border transition-all cursor-pointer min-h-[56px] flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF4D00] bg-[#181818] text-[#E8E4DE]'
                      : 'border-[#1C1C1C] bg-[#0F0F0F] text-[#777777] hover:text-[#CCCCCC]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#FF4D00]' : 'text-[#666666]'}`}>
                    EXP {exp.number}
                  </span>
                  <span className="font-display font-bold text-xs truncate block mt-1">
                    {exp.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop 6-Column Experiment Selector (>= lg) */}
      <div className="hidden lg:grid grid-cols-6 gap-2 mb-6">
        {EXPERIMENTS.map((exp) => {
          const isSelected = activeExpId === exp.id;
          return (
            <button
              key={exp.id}
              onClick={() => setActiveExp(exp.id)}
              className={`p-3 sm:p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#FF4D00] bg-[#141414] text-[#E8E4DE]'
                  : 'border-[#1C1C1C] bg-[#0A0A0A] text-[#777777] hover:text-[#CCCCCC] hover:border-[#333333]'
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-mono font-bold tracking-wider ${
                    isSelected ? 'text-[#FF4D00]' : 'text-[#555555]'
                  }`}
                >
                  EXP {exp.number}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                )}
              </div>
              <div className="font-display font-bold text-xs sm:text-sm tracking-tight leading-snug break-words">
                {exp.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Laboratory Console */}
      <div
        ref={containerRef}
        className="border border-[#1C1C1C] bg-[#0A0A0A] overflow-hidden shadow-2xl"
      >
        {/* Lab Top Status Bar */}
        <div className="p-3.5 sm:px-6 sm:py-4 border-b border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0F0F0F] text-center sm:text-left">
          <div className="min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#E8E4DE] font-semibold truncate">
                Exp {activeExp.number}: {activeExp.title}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-[#888888] mt-0.5 truncate">
              {activeExp.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-[11px] font-mono text-[#777777] bg-[#141414] px-3 py-1.5 border border-[#222222] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
              <span className="uppercase">{settings.tier} TIER</span>
            </div>
            <div className="text-[11px] font-mono text-[#777777] bg-[#141414] px-3 py-1.5 border border-[#222222] hidden md:block">
              {activeExp.interactionHint}
            </div>
          </div>
        </div>

        {/* 3D Canvas Viewport */}
        <div className="relative h-[340px] xs:h-[380px] sm:h-[480px] lg:h-[560px] w-full bg-[#080808] flex items-center justify-center cursor-grab active:cursor-grabbing">
          {isInViewport ? (
            <LabCanvas />
          ) : (
            <div className="text-xs font-mono text-[#555555] uppercase tracking-widest flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>Canvas Paused (Off-screen)</span>
            </div>
          )}

          {/* Centered Secondary Controls Bar */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 pointer-events-auto">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#666666] mr-1 hidden sm:inline">
              Mode:
            </span>
            {activeExp.modes.map((m) => {
              const isModeActive = activeMode === m;
              return (
                <button
                  key={m}
                  onClick={() => setExperimentMode(activeExp.id, m)}
                  className={`px-3 py-2 min-h-[40px] text-[11px] sm:text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer touch-manipulation ${
                    isModeActive
                      ? 'border-[#FF4D00] text-[#080808] bg-[#FF4D00] font-bold shadow-md'
                      : 'border-[#262626] text-[#A0A0A0] bg-[#0E0E0E]/85 backdrop-blur-sm hover:text-[#E8E4DE] hover:border-[#444444]'
                  }`}
                  aria-pressed={isModeActive}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lab Bottom Context & Telemetry Footer (Stacked on mobile, 3-col on sm+) */}
        <div className="p-4 sm:px-6 sm:py-4 border-t border-[#1C1C1C] bg-[#0F0F0F] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-mono text-[#777777] text-center sm:text-left">
          <div>
            <span className="text-[#555555] block uppercase mb-0.5 text-[10px] sm:text-xs">Technology</span>
            <span className="text-[#E8E4DE]">{activeExp.technology.join(' · ')}</span>
          </div>
          <div>
            <span className="text-[#555555] block uppercase mb-0.5 text-[10px] sm:text-xs">Experiment Concept</span>
            <span className="text-[#A0A0A0] line-clamp-1">{activeExp.description}</span>
          </div>
          <div>
            <span className="text-[#555555] block uppercase mb-0.5 text-[10px] sm:text-xs">Performance Lifecycle</span>
            <span className="text-[#10B981]">DPR {settings.dpr.toFixed(1)} Clamped · Auto-Pause Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveLab;