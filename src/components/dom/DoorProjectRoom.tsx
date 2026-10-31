'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, ArrowUpRight, Box, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
    setTimeout(() => {
      const lineup = document.getElementById('doors-lineup') || document.getElementById('doors-section');
      if (lineup) {
        lineup.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const currentExperimentMeta =
    EXPERIMENTS.find((e) => e.id === activeExp) || EXPERIMENTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#0B0D0C] text-[#F4F3EE] pt-24 pb-36 relative overflow-x-hidden selection:bg-emerald-500 selection:text-black"
      style={{
        backgroundImage: `radial-gradient(circle 900px at 50% -120px, ${activeDoor.colors.glow}, transparent 70%)`,
      }}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* 1. Category Switcher Top Navigation Strip */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10 select-none">
          {DOORS_DATA.map((door) => {
            const isCurrent = door.id === activeDoorId;
            return (
              <button
                key={door.id}
                onClick={() => openDoorRoom(door.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
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

        {/* 2. Top Header (00:15) */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3 select-none">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeDoor.colors.accentHex }}
            />
            <span>Production Room · {activeDoor.nameplate}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-[4.25rem] font-bold tracking-tight text-[#F4F3EE] mb-4">
            {activeDoor.roomTitle}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
            {activeDoor.roomDescription}
          </p>
        </div>

        {/* 3. Alternating Split-Screen Project Rows (00:15 – 00:18) */}
        <div className="space-y-0">
          {roomProjects.map((project, index) => {
            // Even Rows (0, 2, 4 — like 00:15 & 00:18): Text Left (lg:col-span-5) · Mockup Right (lg:col-span-7)
            // Odd Rows (1, 3, 5 — like 00:17): Mockup Left (lg:col-span-7) · Text Right (lg:col-span-5)
            const isEven = index % 2 === 0;

            const textColumn = (
              <div className="flex flex-col items-start w-full">
                {/* 1. Uppercase Monospace Eyebrow */}
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{project.category.toUpperCase()} · LIVE</span>
                </span>

                {/* 2. Bold Project Title */}
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#F4F3EE] tracking-tight leading-tight mb-1">
                  {project.title}
                </h2>

                {/* 3. Muted Role/Type Subtitle */}
                <div className="text-zinc-400 text-sm sm:text-base font-medium mb-5">
                  {project.tagline || project.role}
                </div>

                {/* 4. Editorial Description Paragraph */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-5 font-light">
                  {project.description}
                </p>

                {/* 5. Compact Engineering Highlights (Challenge & Decision) */}
                <div className="border-l-2 border-emerald-500/40 pl-4 py-1 mb-6 space-y-2 text-xs sm:text-sm text-zinc-400 w-full">
                  {project.challenge && (
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold block">
                        The Challenge:
                      </span>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mt-0.5">
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  {project.decision ? (
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                        Engineering Decision:
                      </span>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light mt-0.5">
                        {project.decision}
                      </p>
                    </div>
                  ) : project.solution ? (
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                        Architectural Solution:
                      </span>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light mt-0.5">
                        {project.solution}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* 6. Dark Pill Tags */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-white/[0.06] border border-white/10 text-zinc-300 text-xs font-mono px-3.5 py-1.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 7. Dual Action Links (Matches BOTH 00:15 and 00:18) */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* White Pill Button (00:18) */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F4F3EE] text-[#0B0D0C] pl-5 pr-2 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer group"
                  >
                    <span>Visit the site</span>
                    <span className="w-7 h-7 rounded-full bg-[#0B0D0C] text-[#F4F3EE] flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  {/* Arrow Link (00:15) */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1.5 ml-4 transition-colors font-mono tracking-wider"
                    >
                      <span>↗ GitHub source &amp; architecture</span>
                    </a>
                  )}
                </div>
              </div>
            );

            const mockupColumn = (
              <div className="flex items-center justify-center w-full">
                <StudioDisplayMockup
                  image={project.image}
                  title={project.title}
                  liveUrl={project.liveUrl}
                  priority={index === 0}
                />
              </div>
            );

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="border-t border-white/10 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {isEven ? (
                  <>
                    <div className="lg:col-span-5 order-2 lg:order-1">{textColumn}</div>
                    <div className="lg:col-span-7 order-1 lg:order-2">{mockupColumn}</div>
                  </>
                ) : (
                  <>
                    <div className="lg:col-span-7 order-1 lg:order-1">{mockupColumn}</div>
                    <div className="lg:col-span-5 order-2 lg:order-2">{textColumn}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* 4. Special Integration for 3D & Spatial Web: Mount 6 WebGL Experiments inside Studio Display */}
        {activeDoor.includeLab && (
          <div className="mt-20 pt-20 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-10 select-none">
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
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border cursor-pointer ${
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
            <div className="max-w-[860px] mx-auto">
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
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer ${
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
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-300 border border-white/20 hover:border-white hover:text-white transition-all bg-white/[0.03] cursor-pointer"
          >
            {showAllProjects
              ? `Show Only ${activeDoor.title} Projects (${activeDoor.projectSlugs.length})`
              : `Show All 6 Production Case Studies (${PROJECTS.length})`}
          </button>

          <button
            onClick={() => setProjectModalOpen(true, activeDoor.navLabel)}
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors shadow-lg cursor-pointer"
          >
            Inquire About {activeDoor.navLabel}
          </button>
        </div>
      </div>

      {/* 6. FIXED BOTTOM-LEFT "← Back to the doors" PILL (00:15 – 00:18) */}
      <button
        onClick={handleBackToDoors}
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-10 z-50 bg-[#141716]/95 hover:bg-[#1E2321] text-[#F4F3EE] border border-white/15 pl-2.5 pr-5 py-2 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md inline-flex items-center gap-3 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Return to the architectural doors lineup"
      >
        <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-200" />
        </span>
        <span>Back to the doors</span>
      </button>
    </motion.div>
  );
}

export default DoorProjectRoom;
