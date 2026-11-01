import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowRight, Box, Sparkles } from 'lucide-react';
import { InteractiveLab } from '@/components/dom/InteractiveLab';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'Interactive 3D WebGL Lab | Real-Time Spatial Experiments | Wali Muhammad',
  description:
    'Six contained WebGL and Three.js experiments exploring physical transmission optics, 3D kinetic typography, spatial interface architecture, and custom GLSL vertex displacement shaders.',
  alternates: {
    canonical: `${SITE_URL}/lab`,
  },
  openGraph: {
    title: 'Interactive 3D WebGL Lab | Real-Time Spatial Experiments | Wali Muhammad',
    description:
      'Six contained WebGL and Three.js experiments exploring physical transmission optics, 3D kinetic typography, spatial interface architecture, and custom GLSL vertex displacement shaders.',
    url: `${SITE_URL}/lab`,
  },
};

const EXPERIMENT_DEEP_DIVES = [
  {
    num: '01',
    title: 'Gyroscopic Material Study',
    category: 'Transmission Optics & Gimbal Mechanics',
    summary:
      'A real-time study into physical transmission, optical refraction (IOR 1.54), and nested multi-axis gimbal rotations. Features an icosahedral crystal outer shell encasing an emissive quantum nucleus.',
    shaderDetails:
      'Utilizes Three.js MeshPhysicalMaterial with roughness 0.04, transmission 0.95, and clearcoat 1.0. Frame loop uses pre-allocated math objects to eliminate garbage collection spikes.',
    interaction: 'Drag with pointer to orbit camera; toggle between Refraction, Wireframe, and Kinetic modes.',
  },
  {
    num: '02',
    title: 'Spatial Interface Architecture',
    category: 'Isometric Product Decomposition',
    summary:
      'An architectural spatial exploration decomposing a complete full-stack web application into four physical strata: Database Layer, Backend Services, Component State, and UI Presentation.',
    shaderDetails:
      'Features custom depth separation logic with linear interpolation (lerp). Smoothly transitions from assembled monolithic form to an exploded isometric blueprint view.',
    interaction: 'Toggle between Assembled, Deconstructed, and Planar modes to inspect vertical bus conduits.',
  },
  {
    num: '03',
    title: 'Kinetic Typographic Field',
    category: '3D Extruded Glyphs & Velocity Physics',
    summary:
      'Engineered 3D beveled typographic glyphs spelling "BUILD WITH INTENT". Pointer speed creates interactive force waves that displace letters along dynamic vectors with elastic spring returns.',
    shaderDetails:
      'Constructed with procedural Three.js extruded geometries with 45° chamfered bevels. High-contrast grazing rim lights ensure typographic legibility from any viewing angle.',
    interaction: 'Move cursor across letterforms to generate force waves; toggle between Harmonic, Velocity, and Grid modes.',
  },
  {
    num: '04',
    title: 'Responsive Signal Architecture',
    category: 'Network Topology & Instanced Flow',
    summary:
      'Real-time simulation of global edge network traffic showing requests routing between Client Devices, Cloudflare Edge, Next.js App Servers, KV Caches, and Distributed Database Clusters.',
    shaderDetails:
      'Powered by GPU InstancedMesh rendering 30 concurrent photonic packets along 3D connection vectors, maintaining a locked 60 FPS draw budget.',
    interaction: 'Drag to inspect network topology; switch between Continuous, Burst, and Route modes.',
  },
  {
    num: '05',
    title: 'Generative Layout Engine',
    category: 'Parametric Constraints & Spatial Grids',
    summary:
      'A spatial grid layout engine where interface cards dynamically recalculate aspect ratios, column rhythms, and hierarchical scale in real time.',
    shaderDetails:
      'Implements spring interpolation matrices inside requestAnimationFrame. Wireframe calipers illustrate dynamic bounding frustum bounds.',
    interaction: 'Switch between Balanced (Golden-Ratio), Dense (Masonry), and Minimal (Monolithic) layouts.',
  },
  {
    num: '06',
    title: 'Topographic Shader Study',
    category: 'Real-time GLSL Elevation & Contours',
    summary:
      'A custom GLSL vertex deformation and fragment shader generating elevation contours, harmonic wave frequencies, and cursor-reactive radial shockwaves.',
    shaderDetails:
      'Custom vertex shader calculates analytical surface normals for accurate specular highlights. Fragment shader produces antialiased stepped elevation isoline ridges.',
    interaction: 'Move pointer to trigger surface elevation waves; toggle Frequencies, Topography, and Pulse modes.',
  },
];

export default function LabPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: '3D Lab', url: '/lab' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="min-h-screen bg-[#0B0D0C] text-[#F4F3EE] selection:bg-emerald-500 selection:text-black">
        {/* Navigation Header */}
        <header className="border-b border-white/10 bg-[#0B0D0C]/90 backdrop-blur-md sticky top-0 z-40 safe-top">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
            <Link
              href="/#doors-section"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to the doors</span>
            </Link>

            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-[#F4F3EE] tracking-tight hover:text-emerald-400 transition-colors"
            >
              WALI MUHAMMAD · 3D LAB
            </Link>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">3D Engineering Lab</span>
          </nav>

          {/* Heading */}
          <div className="mb-14 border-b border-white/10 pb-10 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 mb-3">
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              <span>Three.js · WebGL · 60 FPS Render Loops</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-4">
              Real-Time Spatial Lab
            </h1>
            <p className="text-base sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed">
              Six contained WebGL and Three.js experiments exploring physical transmission optics, 3D kinetic typography, spatial interface architecture, and custom GLSL vertex displacement shaders.
            </p>
          </div>

          {/* Mount the Interactive Lab Canvas */}
          <div className="mb-20">
            <InteractiveLab />
          </div>

          {/* Technical Deep Dives for All 6 Experiments */}
          <div className="border-t border-white/10 pt-16 mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F3EE] tracking-tight mb-10">
              Architectural Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXPERIMENT_DEEP_DIVES.map((exp) => (
                <div
                  key={exp.num}
                  className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-emerald-400 block mb-2 font-bold">
                      STUDY {exp.num} · {exp.category.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-[#F4F3EE] mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mb-4">
                      {exp.summary}
                    </p>
                    <div className="p-3 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-zinc-400 mb-4">
                      {exp.shaderDetails}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-white/10">
                    {exp.interaction}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
