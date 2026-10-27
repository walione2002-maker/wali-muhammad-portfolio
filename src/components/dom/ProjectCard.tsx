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
      onClick={() => setActiveProjectId(isActive ? null : project.id)}
      onMouseEnter={() => setActiveProjectId(project.id)}
      onMouseLeave={() => setActiveProjectId(null)}
      className={`group relative py-12 sm:py-16 border-t border-[#1A1A1A] transition-colors duration-300 ${
        isActive ? 'bg-[#111111]/40' : 'hover:bg-[#111111]/20'
      } ${className}`}
      aria-label={`Project: ${project.title}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Number */}
        <div className="lg:col-span-1">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#333333] group-hover:text-[#FF4D00] transition-colors">
            {projectNumber}
          </span>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-6 pr-0 lg:pr-8">
          <div className="text-xs font-mono tracking-widest uppercase text-[#737373] mb-2">
            {project.category}
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#E8E4DE] group-hover:text-white tracking-tight mb-4 transition-colors">
            {project.title}
          </h3>

          <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed mb-6 font-light">
            {project.description}
          </p>

          {/* Tech Stack in clean inline monospace */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#737373] mb-8">
            {project.stack?.map((tech, i) => (
              <span key={tech} className="flex items-center gap-3">
                <span className="text-[#9CA3AF]">{tech}</span>
                {i < (project.stack?.length || 0) - 1 && <span className="text-[#333333]">/</span>}
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
              aria-label={`Visit live website for ${project.title}`}
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
                aria-label={`View GitHub source code for ${project.title}`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Screenshot Visual Preview (No fake browser chrome) */}
        <div className="lg:col-span-5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-sm overflow-hidden border border-[#222222] group-hover:border-[#333333] transition-all bg-[#121212] aspect-[16/10] w-full cursor-pointer"
            aria-label={`Open preview for ${project.title}`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
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
