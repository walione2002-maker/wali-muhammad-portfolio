'use client';

import React from 'react';
import Image from 'next/image';
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
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-4">
          01 / Selected Work
        </div>
        <h2
          id="selected-work-title"
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          Featured<br />Projects
        </h2>
        <p className="text-[#A3A3A3] text-base sm:text-xl mt-6 max-w-2xl font-light leading-relaxed">
          Detailed case studies across commercial e-commerce storefronts, high-end corporate platforms, and interactive 3D WebGL applications.
        </p>
      </div>

      {/* Primary Featured Case Studies */}
      <div className="border-b border-[#1C1C1C]">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Secondary Project Archive */}
      {archiveProjects.length > 0 && (
        <div className="mt-24 pt-12 border-t border-[#1C1C1C]">
          <div className="mb-8">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] tracking-tight">
              Selected Archive &amp; Specialized Work
            </h3>
            <p className="text-[#888888] text-sm font-mono mt-1">
              Production catalogs and interactive digital event suites.
            </p>
          </div>

          <div className="divide-y divide-[#1C1C1C] border-y border-[#1C1C1C]">
            {archiveProjects.map((proj) => (
              <div
                key={proj.id}
                className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#111111]/30 transition-colors px-3 group"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-mono text-sm text-[#555555] group-hover:text-[#FF4D00] transition-colors">
                    {String(proj.index + 1).padStart(2, '0')}
                  </span>

                  {/* Thumbnail */}
                  {proj.image && (
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded overflow-hidden border border-[#222222] shrink-0 bg-[#121212]">
                      <Image
                        src={proj.image}
                        alt={`Thumbnail of ${proj.title}`}
                        fill
                        className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-lg sm:text-xl text-[#E8E4DE] group-hover:text-white transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-sm text-[#888888] font-light mt-0.5 max-w-xl">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-start md:self-auto shrink-0 text-xs font-mono">
                  <div className="hidden lg:flex items-center gap-2 text-[#666666]">
                    {proj.stack.slice(0, 3).join(' · ')}
                  </div>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#E8E4DE] hover:text-[#FF4D00] transition-colors px-3 py-1.5 border border-[#262626] hover:border-[#444444]"
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
                      className="p-1.5 text-[#737373] hover:text-[#E8E4DE] transition-colors"
                      aria-label={`View GitHub repository for ${proj.title}`}
                    >
                      <Github className="w-4 h-4" />
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
