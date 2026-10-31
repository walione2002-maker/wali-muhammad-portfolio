'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Box, Sparkles, Layers } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { DOORS_DATA, PROJECTS, EXPERIMENTS } from '@/data/projects';
import { StudioDisplayMockup } from './StudioDisplayMockup';
import { type DoorCategoryId, type LabExperimentId } from '@/types';

// Dynamic import for WebGL LabCanvas inside Studio Display screen
const LabCanvas = dynamic(() => import('@/components/canvas/LabCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest gap-2 bg-[#0B0D0C]">
      <div className="w-6 h-6 border-2 border-zinc-600 border-t-emerald-500 rounded-full animate-spin" />
      <span>Initializing 3D Pipeline...</span>
    </div>
  ),
});

export function DoorProjectRoom() {
  const activeDoorId = usePortfolioStore((s) => s.activeDoorId);
  const openDoorRoom = usePortfolioStore((s) => s.openDoorRoom);
  const closeDoorRoom = usePortfolioStore((s) => s.closeDoorRoom);
  const setProjectModalOpen = usePortfolioStore((s) => s.setProjectModalOpen);

  const activeExp = usePortfolioStore((s) => s.activeExperiment);
  const setActiveExp = usePortfolioStore((s) => s.setActiveExperiment);
  const experimentModes = usePortfolioStore((s) => s.experimentModes);
  const setExperimentMode = usePortfolioStore((s) => s.setExperimentMode);

  const [showAllProjects, setShowAllProjects] = useState(false);

  if (!activeDoorId) return null;

  const activeDoor = DOORS_DATA.find((d) => d.id === activeDoorId) || DOORS_DATA[0];

  // Filter projects for this door room
  const roomProjects = showAllProjects
    ? PROJECTS
    : PROJECTS.filter((p) => activeDoor.projectSlugs.includes(p.id));

  const handleBackToDoors = () => {
    closeDoorRoom();
    const lineup = document.getElementById('doors-lineup') || document.getElementById('doors-section');
    if (lineup) {
      lineup.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentExperimentMeta =
    EXPERIMENTS.find((e) => e.id === activeExp) || EXPERIMENTS[0];

  return (
    <div
      className="min-h-screen bg-[#0B0D0C] text-[#F4F3EE] pt-28 pb-36 relative overflow-x-hidden selection:bg-emerald-500 selection:text-black"
      style={{
        backgroundImage: `radial-gradient(circle 800px at 50% -100px, ${activeDoor.colors.glow}, transparent 70%)`,
      }}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* 1. Category Switcher Pills at the Top */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10">
          {DOORS_DATA.map((door) => {
            const isCurrent = door.id === activeDoorId;
            return (
              <button
                key={door.id}
                onClick={() => openDoorRoom(door.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-white text-zinc-950 font-bold border-white shadow-lg scale-105'
                    : 'bg-white/[0.04] text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: door.colors.accentHex }}
                />
                <span>{door.navLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Giant Category Room Header (00:14 – 00:15) */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeDoor.colors.accentHex }}
            />
            <span>Production Room · {activeDoor.nameplate}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-5">
            {activeDoor.roomTitle}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {activeDoor.roomDescription}
          </p>

          <div className="border-b border-white/10 mt-10" />
        </div>

        {/* 3. Alternating Split-Screen Project Rows (00:15 – 00:18) */}
        <div className="space-y-24 sm:space-y-32">
          {roomProjects.map((project, index) => {
            // Even rows (index % 2 === 0): Info Left (lg:col-span-5), Mockup Right (lg:col-span-7)
            // Odd rows (index % 2 === 1): Mockup Left (lg:col-span-7), Info Right (lg:col-span-5)
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Left Column in DOM */}
                <div
                  className={`lg:col-span-5 flex flex-col items-start ${
                    isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                  }`}
                >
                  {/* Eyebrow */}
                  <span className="text-xs font-mono tracking-[0.16em] uppercase text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{project.category.toUpperCase()} · {project.year} · LIVE</span>
                  </span>

                  {/* Project Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F3EE] tracking-tight mb-2">
                    {project.title}
                  </h2>

                  {/* Role subtitle */}
                  <div className="text-zinc-400 font-medium text-sm sm:text-base mb-5">
                    {project.role}
                  </div>

                  {/* Editorial summary */}
                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>

                  {/* Architectural Breakdown Box: Challenge & Decision */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 space-y-3 text-sm w-full">
                    {project.challenge && (
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
                          The Challenge
                        </span>
                        <p className="text-zinc-400 text-xs sm:text-sm font-light">
                          {project.challenge}
                        </p>
                      </div>
                    )}

                    {project.solution && (
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
                          Architectural Solution
                        </span>
                        <p className="text-zinc-400 text-xs sm:text-sm font-light">
                          {project.solution}
                        </p>
                      </div>
                    )}

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold block mb-0.5">
                        Impact &amp; Metric
                      </span>
                      <p className="text-zinc-300 text-xs sm:text-sm font-medium">
                        {project.impactMetric}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/[0.06] border border-white/10 text-zinc-300 text-xs font-mono px-3 py-1.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Primary White Pill Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#F4F3EE] text-[#0B0D0C] pl-6 pr-2 py-2 rounded-full font-semibold text-sm inline-flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-lg group cursor-pointer"
                    >
                      <span>Visit the site</span>
                      <span className="w-8 h-8 rounded-full bg-[#0B0D0C] text-[#F4F3EE] flex items-center justify-center group-hover:rotate-45 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </a>

                    {/* Secondary Link to Detail / GitHub */}
                    <Link
                      href={`/work/${project.id}`}
                      className="text-zinc-400 hover:text-white text-xs sm:text-sm font-mono tracking-wider uppercase inline-flex items-center gap-1.5 py-2 transition-colors"
                    >
                      <span>Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-300 p-2 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column in DOM: Apple Studio Display Monitor */}
                <div
                  className={`lg:col-span-7 flex items-center justify-center ${
                    isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                  }`}
                >
                  <StudioDisplayMockup
                    image={project.image}
                    title={project.title}
                    liveUrl={project.liveUrl}
                    priority={index === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Special Integration for Door 3 (spatial-web): Mount 6 WebGL Experiments inside Studio Display! */}
        {activeDoor.includeLab && (
          <div className="mt-32 pt-20 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-full mb-3">
                <Box className="w-3.5 h-3.5" />
                <span>Hardware-Accelerated WebGL Studio Display</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F3EE]">
                Interactive 3D Engineering Lab
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-2 font-light">
                Inspect Wali&apos;s 6 real-time Three.js spatial shader experiments pinned at 60 FPS directly within this Studio Display.
              </p>

              {/* 6 Experiment Switcher Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {EXPERIMENTS.map((exp) => {
                  const isCurrent = exp.id === activeExp;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExp(exp.id)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
                        isCurrent
                          ? 'bg-emerald-500 text-black font-bold border-emerald-400 shadow-md scale-105'
                          : 'bg-white/[0.05] text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{exp.number} · {exp.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Apple Studio Display Mounting Live 3D Canvas */}
            <div className="max-w-[920px] mx-auto">
              <StudioDisplayMockup title={currentExperimentMeta.title}>
                <div className="w-full h-full relative bg-[#080808]">
                  <LabCanvas />

                  {/* Mode Bar Overlay at the Bottom of Screen */}
                  <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-xs font-mono">
                    <span className="text-zinc-300 font-medium truncate max-w-[200px] sm:max-w-none">
                      {currentExperimentMeta.number} · {currentExperimentMeta.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {currentExperimentMeta.modes.map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setExperimentMode(currentExperimentMeta.id, mode)}
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider transition-all ${
                            experimentModes[currentExperimentMeta.id] === mode
                              ? 'bg-emerald-500 text-black font-bold'
                              : 'text-zinc-400 hover:text-white bg-white/10'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </StudioDisplayMockup>
            </div>
          </div>
        )}

        {/* 5. Bottom Room Footer & All Case Studies Toggle */}
        <div className="mt-28 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-300 border border-white/20 hover:border-white hover:text-white transition-all bg-white/[0.03]"
          >
            {showAllProjects
              ? `Show Only ${activeDoor.title} Projects (${activeDoor.projectSlugs.length})`
              : `Show All 6 Production Case Studies (${PROJECTS.length})`}
          </button>

          <button
            onClick={() => setProjectModalOpen(true, activeDoor.navLabel)}
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors shadow-lg"
          >
            Inquire About {activeDoor.navLabel}
          </button>
        </div>
      </div>

      {/* 6. Fixed Bottom-Left "← Back to the doors" Button (00:15 – 00:18) */}
      <button
        onClick={handleBackToDoors}
        className="fixed bottom-7 left-6 sm:left-10 z-50 bg-[#161918]/90 hover:bg-[#222725] text-[#F4F3EE] border border-white/15 px-5 py-3 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.65)] backdrop-blur-md flex items-center gap-3 text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Return to the architectural doors lineup"
      >
        <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs">
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-200" />
        </span>
        <span>Back to the doors</span>
      </button>
    </div>
  );
}

export default DoorProjectRoom;
