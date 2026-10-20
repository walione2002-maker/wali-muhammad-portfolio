'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/dom/ProjectCard';
import { Globe2, ArrowUpRight } from 'lucide-react';

export function WebsitesSection() {
  return (
    <section
      id="websites"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-32 z-10"
      aria-label="Live Websites and Client Work"
    >
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Featured Portfolio</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Live Websites &amp; Client Work
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
          Click any website below to open and explore the live project in a new tab. Each project was built from scratch with clean code, fast loading speeds, and responsive layouts.
        </p>
      </div>

      {/* 2-Column Desktop / 1-Column Mobile High-Visibility Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Bottom helper banner */}
      <div className="mt-14 p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Have a custom website or web app project in mind?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            I can build your next business website, client portal, or custom web platform.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md shrink-0 cursor-pointer"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </a>
      </div>
    </section>
  );
}

export default WebsitesSection;
