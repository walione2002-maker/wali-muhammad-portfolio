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
      className={`group py-16 sm:py-24 border-t border-[#1C1C1C] transition-colors duration-300 ${
        isActive ? 'bg-[#111111]/30' : 'hover:bg-[#111111]/15'
      } ${className}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
          isReversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Project Visual Media (Large, High-Clarity Showcase) */}
        <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
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
                className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#141414] text-[#555555] font-mono text-xs uppercase tracking-widest">
                Preview Unavailable
              </div>
            )}

            {/* Subtle View Live Overlay Badge */}
            <div className="absolute top-4 right-4 bg-[#080808]/85 backdrop-blur-sm border border-[#222222] px-3 py-1 text-[11px] font-mono text-[#E8E4DE] uppercase tracking-wider flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:border-[#FF4D00] transition-all">
              <span>View Live</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4D00]" />
            </div>
          </a>
        </div>

        {/* Project Case Details & Storytelling */}
        <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          {/* Header Metadata */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase mb-3">
            <span className="font-display font-extrabold text-2xl text-[#666666] group-hover:text-[#FF4D00] transition-colors">
              {projectNumber}
            </span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#999999]">{project.category}</span>
            <span className="text-[#333333]">·</span>
            <span className="text-[#666666]">{project.year}</span>
          </div>

          <h3
            id={`project-title-${project.id}`}
            className="font-display font-bold text-3xl sm:text-4xl text-[#E8E4DE] group-hover:text-white tracking-tight mb-2 transition-colors"
          >
            <Link href={`/work/${project.id}`}>{project.title}</Link>
          </h3>

          <div className="text-xs font-mono text-[#FF4D00] mb-4">
            Role: {project.role}
          </div>

          <p className="text-[#B8B8B8] text-base leading-relaxed mb-6 font-light">
            {project.description}
          </p>

          {/* Structured Case Study Elements */}
          <div className="space-y-4 mb-8 pt-4 border-t border-[#1C1C1C]">
            {project.challenge && (
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#E8E4DE] block mb-1">
                  The Challenge
                </span>
                <p className="text-sm text-[#8E8E8E] font-light leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.decision && (
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF4D00] block mb-1">
                  Engineering Decision
                </span>
                <p className="text-sm text-[#8E8E8E] font-light leading-relaxed">
                  {project.decision}
                </p>
              </div>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {project.stack?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono bg-[#141414] border border-[#222222] text-[#A0A0A0]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6">
            <Link
              href={`/work/${project.id}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#FF4D00] hover:text-[#E8E4DE] border-b border-[#FF4D00] hover:border-[#E8E4DE] pb-1 transition-all cursor-pointer font-semibold"
            >
              <BookOpen className="w-4 h-4" />
              <span>Case Study</span>
            </Link>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] border-b border-[#E8E4DE] hover:border-[#FF4D00] pb-1 transition-all cursor-pointer"
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
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#737373] hover:text-[#E8E4DE] pb-1 transition-colors cursor-pointer"
                aria-label={`View GitHub repository for ${project.title} (opens in new tab)`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;