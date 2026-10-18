'use client';

import React from 'react';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectShowroom() {
  return (
    <section
      id="project-showroom"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-28 max-w-7xl mx-auto"
      aria-label="The 8 Live Deployments Showroom"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <span>02 // Production Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white">
            The 8 Live Deployments Showroom
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 font-light max-w-2xl">
            Hover or focus any project card to activate its corresponding 3D orbital node in the kinetic sculpture. Each platform is live on Vercel with verified GitHub source repositories.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400 bg-surface-secondary/80 px-4 py-2.5 rounded-xl border border-white/[0.08] self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>8 / 8 Active Edge Services</span>
        </div>
      </div>

      {/* 8 Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectShowroom;
