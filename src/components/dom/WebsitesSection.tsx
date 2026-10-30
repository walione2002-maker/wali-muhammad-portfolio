'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/dom/ProjectCard';
import { ArrowUpRight, Github } from 'lucide-react';

export function WebsitesSection() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const archiveProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-labelledby="selected-work-title"
    >
      {/* Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#737373] mb-4">
          01 / Selected Work
        </div>
        <h2
          id="selected-work-title"
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          Featured<br />Projects
        </h2>
        <p className="text-[#888888] text-base sm:text-lg mt-6 max-w-xl font-light">
          A curated selection of live production websites, e-commerce platforms, and interactive 3D web products engineered for international clients and growing brands.
        </p>
      </div>

      {/* Primary Featured Case Studies */}
      <div className="border-b border-[#1A1A1A]">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Secondary Project Archive */}
      {archiveProjects.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#1A1A1A]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] tracking-tight">
                Project Archive &amp; Experiments
              </h3>
              <p className="text-[#737373] text-xs sm:text-sm font-mono mt-1">
                Additional client deliveries and specialized web applications.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#1A1A1A] border-y border-[#1A1A1A]">
            {archiveProjects.map((proj) => (
              <div
                key={proj.id}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111111]/30 transition-colors px-2"
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <span className="font-mono text-xs text-[#555555]">
                    {String(proj.index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#E8E4DE]">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-[#888888] font-light mt-0.5">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-start md:self-auto shrink-0 text-xs font-mono">
                  <div className="hidden sm:flex items-center gap-2 text-[#666666]">
                    {proj.stack.slice(0, 3).join(' · ')}
                  </div>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#E8E4DE] hover:text-[#FF4D00] transition-colors"
                    aria-label={`View live site for ${proj.title}`}
                  >
                    <span>Live Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#737373] hover:text-[#E8E4DE] transition-colors"
                      aria-label={`View GitHub repository for ${proj.title}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default WebsitesSection;
