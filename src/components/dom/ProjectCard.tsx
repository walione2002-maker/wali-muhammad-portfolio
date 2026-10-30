'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
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

  return (
    <article
      id={`project-${project.id}`}
      onMouseEnter={() => setActiveProjectId(project.id)}
      onMouseLeave={() => setActiveProjectId(null)}
      className={`group py-12 sm:py-16 border-t border-[#1A1A1A] transition-colors duration-300 ${
        isActive ? 'bg-[#111111]/30' : 'hover:bg-[#111111]/15'
      } ${className}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Number */}
        <div className="lg:col-span-1">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#333333] group-hover:text-[#FF4D00] transition-colors">
            {projectNumber}
          </span>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-6 pr-0 lg:pr-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-widest uppercase text-[#737373] mb-2">
            <span>{project.category}</span>
            <span className="text-[#333333]">·</span>
            <span>{project.year}</span>
          </div>

          <h3
            id={`project-title-${project.id}`}
            className="font-display font-bold text-2xl sm:text-4xl text-[#E8E4DE] group-hover:text-white tracking-tight mb-3 transition-colors"
          >
            {project.title}
          </h3>

          <div className="text-xs font-mono text-[#FF4D00] mb-4">
            Role: {project.role}
          </div>

          <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed mb-4 font-light">
            {project.description}
          </p>

          {/* Contextual Challenge & Solution */}
          {project.challenge && (
            <div className="mb-6 p-4 border border-[#1A1A1A] bg-[#0E0E0E] text-xs font-sans text-[#888888] space-y-2">
              <div>
                <strong className="text-[#E8E4DE] font-mono uppercase tracking-wider block mb-0.5">
                  The Problem:
                </strong>
                {project.challenge}
              </div>
              <div>
                <strong className="text-[#E8E4DE] font-mono uppercase tracking-wider block mb-0.5">
                  Implementation:
                </strong>
                {project.solution}
              </div>
            </div>
          )}

          {/* Tech Stack in clean inline monospace */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#737373] mb-6">
            {project.stack?.map((tech, i) => (
              <span key={tech} className="flex items-center gap-3">
                <span className="text-[#9CA3AF] bg-[#141414] px-2 py-0.5 border border-[#222222]">
                  {tech}
                </span>
                {i < (project.stack?.length || 0) - 1 && (
                  <span className="text-[#333333]">/</span>
                )}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] border-b border-[#E8E4DE] hover:border-[#FF4D00] pb-1 transition-all cursor-pointer"
              aria-label={`Visit live website for ${project.title} (opens in new tab)`}
            >
              <span>View Site</span>
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
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Screenshot Visual Preview */}
        <div className="lg:col-span-5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-sm overflow-hidden border border-[#222222] group-hover:border-[#383838] transition-all bg-[#121212] aspect-[16/10] w-full cursor-pointer"
            aria-label={`Open live preview for ${project.title}`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#141414] text-[#444444] font-mono text-xs uppercase tracking-widest">
                Preview
              </div>
            )}
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
