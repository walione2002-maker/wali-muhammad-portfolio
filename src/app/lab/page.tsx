import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

      <div className="min-h-screen bg-[#080808] text-[#E8E4DE] selection:bg-[#FF4D00] selection:text-[#080808]">
        {/* Navigation Header */}
        <header className="border-b border-[#1C1C1C] bg-[#080808]/90 backdrop-blur-md sticky top-0 z-40 safe-top">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#E8E4DE] transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/"
              className="font-display font-extrabold text-xs sm:text-base text-[#E8E4DE] tracking-tight hover:text-[#FF4D00] transition-colors truncate"
            >
              WALI MUHAMMAD
            </Link>
          </div>
        </header>

        <main className="w-full">
          {/* Breadcrumbs */}
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8">
            <nav aria-label="Breadcrumb" className="text-[11px] sm:text-xs font-mono text-[#666666] flex items-center gap-2">
              <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
              <span>/</span>
              <span className="text-[#FF4D00]">Interactive 3D Lab</span>
            </nav>
          </div>

          {/* Mount the Real-Time WebGL Lab Console */}
          <InteractiveLab />

          {/* Deep Indexable Semantic Text Documentation for Search Engines & Assistive Tech */}
          <section className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 border-t border-[#1C1C1C]" aria-labelledby="lab-docs-title">
            <div className="mb-10 sm:mb-12 text-center lg:text-left">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2 sm:mb-3">
                Engineering Specification
              </div>
              <h2 id="lab-docs-title" className="font-display font-black text-2xl xs:text-3xl sm:text-5xl text-[#E8E4DE] uppercase tracking-tight mb-3 sm:mb-4">
                Architecture &amp; Shader Research
              </h2>
              <p className="text-[#A0A0A0] text-xs sm:text-base lg:text-lg max-w-3xl font-light leading-relaxed mx-auto lg:mx-0">
                Complete technical documentation for the six real-time experiments. All shaders, materials, and physics calculations are engineered for 60 FPS frame pacing with hardware-clamped DPR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {EXPERIMENT_DEEP_DIVES.map((exp) => (
                <article
                  key={exp.num}
                  className="p-5 sm:p-8 bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#333333] transition-all flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xs font-mono font-bold text-[#FF4D00]">
                        EXPERIMENT {exp.num}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#666666] uppercase">
                        Real-time WebGL
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-2xl text-[#E8E4DE] mb-2">
                      {exp.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs font-mono text-[#888888] mb-4">
                      {exp.category}
                    </p>

                    <p className="text-xs sm:text-sm text-[#A0A0A0] font-light leading-relaxed mb-6">
                      {exp.summary}
                    </p>

                    <div className="p-3.5 sm:p-4 bg-[#111111] border border-[#1C1C1C] text-[11px] sm:text-xs font-mono text-[#CCCCCC] space-y-2 mb-6">
                      <div>
                        <span className="text-[#FF4D00] block uppercase text-[10px] tracking-wider mb-0.5">
                          Shader / Architecture:
                        </span>
                        <span>{exp.shaderDetails}</span>
                      </div>
                      <div>
                        <span className="text-[#777777] block uppercase text-[10px] tracking-wider mb-0.5">
                          Interaction:
                        </span>
                        <span className="text-[#999999]">{exp.interaction}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Consultation CTA Banner */}
            <div className="mt-14 sm:mt-20 p-6 sm:p-12 bg-[#0E0E0E] border border-[#222222] text-center">
              <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E8E4DE] uppercase tracking-tight mb-3 sm:mb-4">
                Need Custom 3D Web Experiences?
              </h3>
              <p className="text-[#999999] text-xs sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
                I build high-performance WebGL product visualizers and interactive 3D tools that run seamlessly across both mobile and desktop hardware.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E8E4DE] transition-colors min-h-[46px] w-full sm:w-auto"
              >
                <span>Discuss a 3D Web Project</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
