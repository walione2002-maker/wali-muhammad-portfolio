'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/dom/ProjectCard';

export function WebsitesSection() {
  return (
    <section
      id="websites"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-label="Selected Work"
    >
      {/* Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#737373] mb-4">
          01 / Portfolio
        </div>
        <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase">
          Selected<br />Work
        </h2>
        <p className="text-[#888888] text-base sm:text-lg mt-6 max-w-xl font-light">
          Six live production websites and web applications built with Next.js, React, and Three.js.
        </p>
      </div>

      {/* Full-width Staggered Editorial Project List */}
      <div className="border-b border-[#1A1A1A]">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default WebsitesSection;
