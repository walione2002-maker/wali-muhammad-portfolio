'use client';

import React from 'react';
import { ExternalLink, Github, TrendingUp, Sparkles } from 'lucide-react';
import { type ProjectData } from '@/types';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isSpatialFront?: boolean;
}

export function ProjectCard({
  project,
  className = '',
  style,
  onClick,
  isSpatialFront = false,
}: ProjectCardProps) {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const setActiveProjectId = usePortfolioStore((s) => s.setActiveProjectId);

  const isActive = activeProjectId === project.id || isSpatialFront;

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setActiveProjectId(project.id)}
      onMouseLeave={() => setActiveProjectId(null)}
      onFocus={() => setActiveProjectId(project.id)}
      onBlur={() => setActiveProjectId(null)}
      className={`group relative rounded-2xl p-4 sm:p-7 transition-all duration-300 border bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] sm:backdrop-blur-2xl ${
        isActive
          ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)]'
          : 'hover:border-white/20'
      } ${className}`}
      style={{
        borderColor: isActive ? `${project.accentColor}` : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isActive
          ? `0 0 45px -8px ${project.accentColor}60, inset 0 1px 1px rgba(255, 255, 255, 0.2)`
          : undefined,
        ...style,
      }}
      aria-label={`Case Study: ${project.title}`}
    >
      {/* Luminous Chromatic Top Glow Edge */}
      {isActive && (
        <div
          className="absolute -top-[1px] left-6 sm:left-8 right-6 sm:right-8 h-[2.5px] rounded-full blur-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          }}
        />
      )}

      {/* Top Meta Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border font-semibold shadow-sm"
            style={{
              borderColor: `${project.accentColor}70`,
              color: project.accentColor,
              backgroundColor: `${project.accentColor}20`,
            }}
          >
            {project.category}
          </span>
          {isActive && (
            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(255,184,0,0.6)]">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 animate-spin-slow" />
              <span>In Focus</span>
            </span>
          )}
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-slate-400 font-medium">
          #0{project.index + 1}
        </span>
      </div>

      {/* Title & Tagline */}
      <h3 className="text-lg sm:text-2xl font-bold font-display text-white group-hover:text-slate-100 tracking-tight mb-1 sm:mb-1.5 leading-tight">
        {project.title}
      </h3>
      <p
        className="text-[11px] sm:text-xs font-medium font-mono mb-2 sm:mb-3 tracking-wide truncate sm:whitespace-normal font-semibold drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ color: project.accentColor }}
      >
        {project.tagline}
      </p>

      {/* Client Impact Outcome Badge */}
      <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-[11px] font-mono mb-2.5 sm:mb-4 w-full shadow-[0_0_15px_rgba(16,185,129,0.18)] font-medium">
        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">{project.impactMetric}</span>
      </div>

      {/* Description */}
      <p className="text-[11px] sm:text-sm text-slate-200 font-light leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
        {project.description}
      </p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[9px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-md bg-white/[0.06] text-slate-200 border border-white/[0.1]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Links (Live + GitHub) */}
      <div className="flex items-center justify-between pt-2.5 sm:pt-4 border-t border-white/[0.1]">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-100 hover:text-white transition-colors group/link focus:outline-none focus:ring-1 focus:ring-cyan-400 py-1 sm:py-0 touch-manipulation"
          aria-label={`View live production deployment for ${project.title}`}
        >
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: project.accentColor }}
          />
          <span className="drop-shadow-sm">Live Deployment</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-cyan-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/[0.1] focus:outline-none focus:ring-1 focus:ring-slate-300 touch-manipulation"
          aria-label={`View source code on GitHub for ${project.title}`}
        >
          <Github className="w-4 h-4" />
          <span className="text-[11px] font-mono">Source</span>
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
