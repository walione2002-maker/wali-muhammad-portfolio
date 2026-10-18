'use client';

import React from 'react';
import { ExternalLink, Github, TrendingUp } from 'lucide-react';
import { type ProjectData } from '@/types';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const setActiveProjectId = usePortfolioStore((s) => s.setActiveProjectId);

  const isActive = activeProjectId === project.id;

  return (
    <article
      onMouseEnter={() => setActiveProjectId(project.id)}
      onMouseLeave={() => setActiveProjectId(null)}
      onFocus={() => setActiveProjectId(project.id)}
      onBlur={() => setActiveProjectId(null)}
      className={`group relative rounded-2xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 border ${
        isActive
          ? 'bg-slate-900/90 shadow-2xl scale-[1.02]'
          : 'bg-[#12121A]/70 hover:bg-[#151522]/85'
      }`}
      style={{
        borderColor: isActive ? project.accentColor : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isActive ? `0 0 35px -5px ${project.accentColor}40` : undefined,
      }}
      aria-label={`Case Study: ${project.title}`}
    >
      {/* Top Meta Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border text-xs"
          style={{
            borderColor: `${project.accentColor}50`,
            color: project.accentColor,
            backgroundColor: `${project.accentColor}15`,
          }}
        >
          {project.category}
        </span>
        <span className="text-xs font-mono text-slate-500">
          #0{project.index + 1}
        </span>
      </div>

      {/* Title & Tagline */}
      <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-slate-100 tracking-tight mb-2">
        {project.title}
      </h3>
      <p className="text-xs font-medium text-accent-gold/90 font-mono mb-3 tracking-wide">
        {project.tagline}
      </p>

      {/* Client Impact Outcome Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono mb-4 w-full">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">{project.impactMetric}</span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Links (Live + GitHub) */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-white transition-colors group/link focus:outline-none focus:ring-1 focus:ring-accent-gold"
          aria-label={`View live production deployment for ${project.title}`}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
          <span>Live Deployment</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-accent-gold group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-colors p-1.5 rounded-lg hover:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-slate-400"
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
