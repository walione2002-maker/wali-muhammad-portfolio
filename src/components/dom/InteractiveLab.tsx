'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { type LabVisualMode } from '@/types';
import { Sparkles, Eye, Cpu, RotateCcw } from 'lucide-react';

// Dynamic import with SSR false so WebGL strictly loads client-side
const LabCanvas = dynamic(() => import('@/components/canvas/LabCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-[#555555] font-mono text-xs uppercase tracking-widest gap-2">
      <div className="w-6 h-6 border-2 border-[#333333] border-t-[#FF4D00] rounded-full animate-spin" />
      <span>Initializing WebGL Shaders...</span>
    </div>
  ),
});

export function InteractiveLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const labMode = usePortfolioStore((s) => s.labMode);
  const setLabMode = usePortfolioStore((s) => s.setLabMode);

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

  const modes: { id: LabVisualMode; label: string; icon: React.ElementType }[] = [
    { id: 'refraction', label: '01 Refraction', icon: Sparkles },
    { id: 'wireframe', label: '02 Wireframe', icon: Cpu },
    { id: 'kinetic', label: '03 Kinetic', icon: Eye },
  ];

  return (
    <section
      id="lab"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-labelledby="lab-section-title"
    >
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#737373] mb-4">
          03 / Spatial &amp; WebGL Lab
        </div>
        <h2
          id="lab-section-title"
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          Interactive<br />Spatial Lab
        </h2>
        <p className="text-[#888888] text-base sm:text-lg mt-6 max-w-xl font-light">
          A contained WebGL laboratory demonstrating real-time physically-based materials, custom GLSL refraction, and gyroscopic spatial physics. Drag to rotate and inspect geometry.
        </p>
      </div>

      {/* Main Interactive Laboratory Console */}
      <div
        ref={containerRef}
        className="border border-[#1A1A1A] bg-[#0A0A0A] overflow-hidden"
      >
        {/* Lab Top Controls Bar */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4 bg-[#0D0D0D]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#E8E4DE]">
              Hardware Accelerated Viewport
            </span>
            <span className="text-xs font-mono text-[#555555] hidden sm:inline">
              / Drag to Rotate
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            {modes.map((m) => {
              const isActive = labMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setLabMode(m.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#FF4D00] text-[#080808] bg-[#FF4D00] font-semibold'
                      : 'border-[#222222] text-[#888888] hover:text-[#E8E4DE] hover:border-[#444444]'
                  }`}
                  aria-pressed={isActive}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Canvas Viewport */}
        <div className="relative h-[420px] sm:h-[540px] w-full bg-[#080808] flex items-center justify-center cursor-grab active:cursor-grabbing">
          {isInViewport ? (
            <LabCanvas />
          ) : (
            <div className="text-xs font-mono text-[#444444] uppercase tracking-widest flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>Canvas Paused (Off-screen)</span>
            </div>
          )}

          {/* Interaction Cue Overlay (Desktop) */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 pointer-events-none text-[11px] font-mono text-[#666666] tracking-wider uppercase bg-[#080808]/80 backdrop-blur-sm px-3 py-1.5 border border-[#1A1A1A]">
            Mode: <span className="text-[#FF4D00]">{labMode.toUpperCase()}</span> · Click &amp; Drag Orbit
          </div>
        </div>

        {/* Lab Bottom Context Footer */}
        <div className="p-4 sm:px-6 sm:py-4 border-t border-[#1A1A1A] bg-[#0D0D0D] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#737373]">
          <div>
            <span className="text-[#555555] block uppercase mb-0.5">Shader Pipeline</span>
            <span className="text-[#E8E4DE]">Transmission Physical Material</span>
          </div>
          <div>
            <span className="text-[#555555] block uppercase mb-0.5">Geometry Complexity</span>
            <span className="text-[#E8E4DE]">Nested Torus Rings + Octahedron</span>
          </div>
          <div>
            <span className="text-[#555555] block uppercase mb-0.5">Performance Gating</span>
            <span className="text-[#10B981]">IntersectionObserver Auto-Halt Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveLab;
