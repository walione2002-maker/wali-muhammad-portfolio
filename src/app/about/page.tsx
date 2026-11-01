import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Linkedin, GraduationCap, MapPin, Sparkles, Terminal } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'About Wali Muhammad | Full-Stack Engineer & FinTech Systems Architect',
  description:
    'Biographical background, engineering philosophy, and technical toolkit of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect, and student at FAST-NUCES Karachi, Pakistan.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Wali Muhammad | Full-Stack Engineer & FinTech Systems Architect',
    description:
      'Biographical background, engineering philosophy, and technical toolkit of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect, and student at FAST-NUCES Karachi, Pakistan.',
    url: `${SITE_URL}/about`,
  },
};

const SKILLS_TABLE = [
  {
    category: 'Frontend & Architecture',
    skills: ['Next.js 14 App Router', 'React 18', 'TypeScript (Strict)', 'Tailwind CSS', 'HTML5 Semantic Layout', 'CSS Subgrid'],
  },
  {
    category: '3D Graphics & Spatial Web',
    skills: ['Three.js', 'React Three Fiber (R3F)', 'GLSL Custom Shaders', 'InstancedMesh', 'Drei', 'Post-processing Pipeline'],
  },
  {
    category: 'Backend & Data Pipelines',
    skills: ['Node.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'Redis / KV Caching', 'Stripe / Commerce APIs'],
  },
  {
    category: 'Edge Deployment & Tooling',
    skills: ['Cloudflare Pages', 'Vercel Edge', 'Git / GitHub CI', 'Lighthouse 98+ Optimization', 'Hardware Clamped DPR'],
  },
];

export default function AboutPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
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
              WALI MUHAMMAD · ABOUT
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">About &amp; Story</span>
          </nav>

          {/* Heading */}
          <div className="mb-14 border-b border-white/10 pb-10 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Engineer Profile &amp; Background</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-4">
              Wali Muhammad
            </h1>
            <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              Full-Stack Engineer, FinTech Systems Architect at FAST-NUCES Karachi, and Creative 3D WebGL Developer bridging computational finance rigor with modern frontend architecture.
            </p>
          </div>

          {/* Quick Credential Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-start gap-4 text-left">
              <div className="p-3 bg-white/[0.05] border border-white/10 text-emerald-400 rounded-xl shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  Academic Focus
                </span>
                <span className="text-base font-bold text-[#F4F3EE] block">
                  B.S. Financial Technology (FinTech)
                </span>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  FAST-NUCES Karachi · 2025–Present
                </p>
              </div>
            </div>

            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-start gap-4 text-left">
              <div className="p-3 bg-white/[0.05] border border-white/10 text-amber-400 rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  Operations &amp; Base
                </span>
                <span className="text-base font-bold text-[#F4F3EE] block">
                  Karachi, Pakistan (PKT / UTC+5)
                </span>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Remote worldwide · Sub-24h turnaround
                </p>
              </div>
            </div>
          </div>

          {/* Core Biography Breakdown */}
          <div className="space-y-10 text-zinc-300 leading-relaxed font-light text-base sm:text-lg mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F3EE] tracking-tight mb-3">
                Software Engineering &amp; Computational Rigor
              </h2>
              <p>
                My work spans end-to-end commercial web engineering: high-converting direct-to-consumer storefronts, bespoke event architectures, quantitative financial interfaces, and real-time 3D spatial web applications. I specialize in building digital flagships that maintain sub-second page loads without sacrificing visual prestige.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F3EE] tracking-tight mb-3">
                Why Financial Technology &amp; 3D Graphics?
              </h2>
              <p>
                At FAST-NUCES Karachi, studying FinTech has instilled a rigorous discipline toward latency budgeting, edge reliability, state synchronization, and deterministic outcomes. In parallel, my work in Three.js and GLSL shaders proves that tactile, physical digital environments can turn mundane tools into memorable interactive experiences.
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="border-t border-white/10 pt-12 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F3EE] tracking-tight mb-6">
              Technical Foundation &amp; Tooling
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILLS_TABLE.map((group) => (
                <div key={group.category} className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/[0.05] border border-white/10 text-zinc-300 text-xs font-mono px-3 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Machine Link Banner */}
          <div className="p-8 sm:p-12 bg-white/[0.03] border border-white/10 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F3EE] tracking-tight mb-3">
              Inspect the Career Time Machine
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-6 font-light">
              Explore the 6 chronological milestones from 2026 down to 2022 on our interactive horological dial.
            </p>
            <Link
              href="/#my-story"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4F3EE] text-[#0B0D0C] font-semibold text-xs font-mono uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform"
            >
              <span>Launch Time Machine (2026 → 2022)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
