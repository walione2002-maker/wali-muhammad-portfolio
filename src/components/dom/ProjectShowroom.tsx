'use client';

import React from 'react';
import { SpatialProjectOrbital } from './SpatialProjectOrbital';

export function ProjectShowroom() {
  return (
    <section
      id="project-showroom"
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
      aria-label="The 8 Live Deployments Showroom"
    >
      <SpatialProjectOrbital />
    </section>
  );
}

export default ProjectShowroom;
