'use client';

import React from 'react';
import Image from 'next/image';
import { Github, Lock, ArrowUpRight, Globe } from 'lucide-react';
import { type ProjectData } from '@/types';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const setActiveProjectId = usePortfolioStore((s) => s.setActiveProjectId);

  const isActive = activeProjectId === project.id;
  const displayHost = project.displayUrl || 'vercel.app';

  return (
    <article
      onClick={() => setActiveProjectId(isActive ? null : project.id)}
      onMouseEnter={() => setActiveProjectId(project.id)}
      onMouseLeave={() => setActiveProjectId(null)}
      className={`group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 border bg-[#0B1120]/85 backdrop-blur-xl flex flex-col justify-between cursor-pointer sm:cursor-default ${
        isActive ? 'border-white/35 scale-[1.01]' : 'border-white/[0.12] hover:border-white/25'
      } ${className}`}
      style={{
        boxShadow: isActive
          ? `0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 35px -6px ${project.accentColor}60`
          : '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual macOS Browser Window Preview */}
      <div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-xl overflow-hidden border border-white/15 bg-slate-950 group/preview transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer shadow-lg"
          aria-label={`Open live website for ${project.title}`}
        >
          {/* macOS Browser Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/95 border-b border-white/10">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block shadow-sm" />
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/70 border border-white/10 text-[11px] font-mono text-slate-300 max-w-[220px] sm:max-w-[260px] truncate shadow-inner">
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate">{displayHost}</span>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </div>
          </div>

          {/* Visual Mockup Preview Banner */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} live screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.04]"
                unoptimized
              />
            ) : (
              <div
                className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center"
                style={{
                  background: `linear-gradient(135deg, #050816 0%, #0F172A 50%, ${project.accentColor}25 100%)`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg border border-white/20"
                  style={{
                    backgroundColor: `${project.accentColor}25`,
                    color: project.accentColor,
                  }}
                >
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="text-white font-bold font-display text-lg sm:text-xl tracking-tight">
                  {project.title}
                </h4>
              </div>
            )}

            {/* Bottom gradient shadow */}
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />

            {/* Prominent Hover Overlay (Desktop only) */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col items-center justify-center gap-2 p-4">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-950 shadow-2xl transition-transform duration-300 group-hover/preview:scale-105"
                style={{ backgroundColor: project.accentColor }}
              >
                <span>Click to Open Live Website</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[11px] text-slate-200 font-mono drop-shadow">
                Opens in a new browser tab
              </span>
            </div>
          </div>
        </a>

        {/* Content Info */}
        <div className="mt-5">
          {/* Category Tag & Stack Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border font-mono"
              style={{
                borderColor: `${project.accentColor}50`,
                color: project.accentColor,
                backgroundColor: `${project.accentColor}15`,
              }}
            >
              {project.category}
            </span>

            {project.stack?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-300 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-[26px] font-bold font-display text-white tracking-tight leading-snug">
            {project.title}
          </h3>

          {/* Tagline / Impact Metric */}
          {project.impactMetric && (
            <p className="mt-1 text-xs sm:text-sm font-medium text-cyan-400 font-mono">
              ✦ {project.impactMetric}
            </p>
          )}

          {/* Description */}
          <p className="mt-2 text-sm sm:text-[15px] text-slate-300 font-light leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl font-display font-bold text-sm text-slate-950 transition-all duration-200 shadow-md hover:brightness-110 active:scale-[0.97] cursor-pointer touch-manipulation"
          style={{
            backgroundColor: project.accentColor,
            boxShadow: `0 4px 20px -2px ${project.accentColor}60`,
          }}
          aria-label={`Visit live website for ${project.title}`}
        >
          <span>Visit Live Website</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 min-h-[48px] min-w-[48px] rounded-xl text-xs sm:text-sm font-mono font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] active:bg-white/[0.2] border border-white/10 transition-colors cursor-pointer shrink-0 active:scale-[0.97] touch-manipulation"
          aria-label={`View GitHub source code for ${project.title}`}
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
