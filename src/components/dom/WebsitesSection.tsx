'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/dom/ProjectCard';
import { ArrowUpRight, Github, ArrowRight } from 'lucide-react';

export function WebsitesSection() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const archiveProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="relative max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 z-10"
      aria-labelledby="selected-work-title"
    >
      {/* Section Header (Centered on mobile, 2-column on desktop) */}
      <div className="mb-10 sm:mb-14 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 text-center lg:text-left">
        <div>
          <div className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3 sm:mb-4">
            01 / Selected Work
          </div>
          <h2
            id="selected-work-title"
            className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
          >
            Featured<br />Projects
          </h2>
          <p className="text-[#A3A3A3] text-sm xs:text-base sm:text-xl mt-4 sm:mt-6 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
            Detailed case studies across commercial e-commerce storefronts, high-end corporate platforms, and interactive 3D WebGL applications.
          </p>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#262626] bg-[#0E0E0E] text-[#E8E4DE] hover:border-[#FF4D00] hover:text-[#FF4D00] font-mono text-xs uppercase tracking-widest transition-colors self-center lg:self-end min-h-[44px] touch-manipulation"
        >
          <span>View All Case Studies ({PROJECTS.length})</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </Link>
      </div>

      {/* Primary Featured Case Studies */}
      <div className="border-b border-[#1C1C1C]">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Secondary Project Archive (Mobile Stacked Card Layout) */}
      {archiveProjects.length > 0 && (
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#1C1C1C]">
          <div className="mb-8 text-center sm:text-left">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] tracking-tight">
              Selected Archive &amp; Specialized Work
            </h3>
            <p className="text-[#888888] text-xs sm:text-sm font-mono mt-1">
              Production catalogs and interactive digital event suites.
            </p>
          </div>

          <div className="divide-y divide-[#1C1C1C] border-y border-[#1C1C1C]">
            {archiveProjects.map((proj) => (
              <div
                key={proj.id}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#111111]/30 transition-colors px-2 sm:px-3 group"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 min-w-0 text-center sm:text-left">
                  <span className="font-mono text-sm text-[#555555] group-hover:text-[#FF4D00] transition-colors shrink-0 hidden sm:inline">
                    {String(proj.index + 1).padStart(2, '0')}
                  </span>

                  {/* Thumbnail (Centered on mobile) */}
                  {proj.image && (
                    <div className="relative w-full max-w-[240px] sm:max-w-none sm:w-24 h-32 sm:h-16 rounded overflow-hidden border border-[#222222] shrink-0 bg-[#121212] mx-auto sm:mx-0">
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
                      <Link href={`/work/${proj.id}`}>{proj.title}</Link>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#888888] font-light mt-1 max-w-xl">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start md:justify-end gap-3 sm:gap-4 shrink-0 text-xs font-mono">
                  <Link
                    href={`/work/${proj.id}`}
                    className="inline-flex items-center gap-1.5 text-[#FF4D00] hover:text-[#E8E4DE] transition-colors px-3 py-2 border border-[#262626] hover:border-[#FF4D00] min-h-[40px]"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#E8E4DE] hover:text-[#FF4D00] transition-colors px-3 py-2 border border-[#262626] hover:border-[#444444] min-h-[40px]"
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
                      className="p-2 text-[#737373] hover:text-[#E8E4DE] transition-colors min-h-[40px] flex items-center justify-center"
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