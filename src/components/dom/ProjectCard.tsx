'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, BookOpen } from 'lucide-react';
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
  const projectNumber = String(project.index + 1).padStart(2, '0');
  const isReversed = project.layoutVariant === 'split-reversed';

  return (
    <article
      id={`project-${project.id}`}
      onMouseEnter={() => setActiveProjectId(project.id)}
      onMouseLeave={() => setActiveProjectId(null)}
      className={`group py-12 sm:py-20 border-t border-[#1C1C1C] transition-colors duration-300 ${
        isActive ? 'bg-[#111111]/30' : 'hover:bg-[#111111]/15'
      } ${className}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* 
        Macro Layout:
        - Mobile (< lg): Stacked, centered macro hierarchy, media-led, readable left-aligned case details.
        - Desktop (>= lg): Asymmetric 2-column editorial grid with alternating reversed layouts.
      */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
          isReversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Project Visual Media (Full width on mobile, 7 cols on desktop) */}
        <div className={`w-full lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-sm overflow-hidden border border-[#222222] group-hover:border-[#444444] transition-all bg-[#121212] aspect-[16/10] w-full cursor-pointer shadow-2xl"
            aria-label={`Open live website for ${project.title}`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`Interface screenshot of ${project.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 ease-out"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#141414] text-[#555555] font-mono text-xs uppercase tracking-widest">
                Preview Unavailable
              </div>
            )}

            {/* View Live Overlay Badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#080808]/85 backdrop-blur-sm border border-[#222222] px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-[#E8E4DE] uppercase tracking-wider flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:border-[#FF4D00] transition-all">
              <span>View Live</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4D00]" />
            </div>
          </a>
        </div>

        {/* Project Case Details */}
        <div className={`w-full lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          {/* Header Metadata (Centered on mobile, left on desktop) */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 text-xs font-mono tracking-widest uppercase mb-2 sm:mb-3">
            <span className="font-display font-extrabold text-xl sm:text-2xl text-[#666666] group-hover:text-[#FF4D00] transition-colors">
              {projectNumber}
            </span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#999999] truncate">{project.category}</span>
            <span className="text-[#333333]">·</span>
            <span className="text-[#666666]">{project.year}</span>
          </div>

          {/* Project Title (Centered on mobile, left on desktop) */}
          <h3
            id={`project-title-${project.id}`}
            className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl text-[#E8E4DE] group-hover:text-white tracking-tight mb-2 transition-colors text-center lg:text-left break-words"
          >
            <Link href={`/work/${project.id}`}>{project.title}</Link>
          </h3>

          <div className="text-xs font-mono text-[#FF4D00] mb-4 text-center lg:text-left">
            Role: {project.role}
          </div>

          <p className="text-[#B8B8B8] text-sm sm:text-base leading-relaxed mb-6 font-light text-left">
            {project.description}
          </p>

          {/* Structured Challenge & Engineering Decision (Left-aligned for reading comfort) */}
          <div className="space-y-4 mb-6 pt-4 border-t border-[#1C1C1C] text-left">
            {project.challenge && (
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#E8E4DE] block mb-1">
                  The Challenge
                </span>
                <p className="text-xs sm:text-sm text-[#8E8E8E] font-light leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.decision && (
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF4D00] block mb-1">
                  Engineering Decision
                </span>
                <p className="text-xs sm:text-sm text-[#8E8E8E] font-light leading-relaxed">
                  {project.decision}
                </p>
              </div>
            )}
          </div>

          {/* Tech Stack Pills (Centered on mobile, left on desktop) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-6">
            {project.stack?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-mono bg-[#141414] border border-[#222222] text-[#A0A0A0]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links (Centered on mobile, stacked or flex on narrow screens) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2">
            <Link
              href={`/work/${project.id}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono tracking-widest uppercase text-[#FF4D00] hover:text-[#080808] border border-[#FF4D00] hover:bg-[#FF4D00] transition-all cursor-pointer font-semibold touch-manipulation"
            >
              <BookOpen className="w-4 h-4" />
              <span>Case Study</span>
            </Link>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#080808] border border-[#262626] hover:bg-[#E8E4DE] transition-all cursor-pointer touch-manipulation"
              aria-label={`Visit live website for ${project.title} (opens in new tab)`}
            >
              <span>Visit Deployment</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono tracking-widest uppercase text-[#737373] hover:text-[#E8E4DE] transition-colors cursor-pointer touch-manipulation"
                aria-label={`View GitHub repository for ${project.title} (opens in new tab)`}
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;