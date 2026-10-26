'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/dom/ProjectCard';
import { Globe2, ArrowUpRight } from 'lucide-react';

export function WebsitesSection() {
  return (
    <section
      id="websites"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-label="Live Websites and Client Work"
    >
      {/* Section Header */}
      <div className="mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4 shadow-glow">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Featured Portfolio · 6 Production Deliveries</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
          Live Websites &amp; Client Projects
        </h2>
        <p className="text-slate-400 text-base sm:text-xl mt-4 max-w-2xl leading-relaxed">
          Every project below is live and deployed in production. Built with high-speed performance, clean code architecture, and mobile-first responsiveness.
        </p>
      </div>

      {/* 2-Column Responsive High-Visibility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Conversion Banner */}
      <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-[#0B1120]/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <h3 className="text-white font-display font-bold text-xl sm:text-2xl">
            Have a custom website or web app project in mind?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mt-1.5 max-w-xl">
            From modern business websites to high-converting online stores and custom web platforms, I deliver end-to-end results.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-display font-bold text-base shadow-glow shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
        </a>
      </div>
    </section>
  );
}

export default WebsitesSection;
