import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowUpRight, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'Commercial Web Projects & Case Studies | Wali Muhammad',
  description:
    'Curated collection of live client websites, direct-to-consumer e-commerce storefronts, and interactive 3D web applications built by Wali Muhammad.',
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    title: 'Commercial Web Projects & Case Studies | Wali Muhammad',
    description:
      'Curated collection of live client websites, direct-to-consumer e-commerce storefronts, and interactive 3D web applications built by Wali Muhammad.',
    url: `${SITE_URL}/work`,
  },
};

export default function WorkIndexPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ]);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Commercial Web Projects by Wali Muhammad',
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      description: p.tagline,
      url: `${SITE_URL}/work/${p.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
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
              WALI MUHAMMAD · WORK
            </Link>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">Selected Works</span>
          </nav>

          {/* Heading */}
          <div className="mb-14 sm:mb-20 border-b border-white/10 pb-10 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Commercial Portfolio &amp; Case Studies</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-4">
              Selected Works &amp; Systems
            </h1>
            <p className="text-base sm:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              Every project represents a deployed commercial platform or custom web application with sub-second performance, strict typography, and verified client outcomes.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/25 px-2.5 py-1 rounded-md">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#F4F3EE] tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                    <Link href={`/work/${project.id}`}>
                      {project.title}
                    </Link>
                  </h2>

                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/[0.05] border border-white/10 text-zinc-300 text-[11px] font-mono px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <Link
                    href={`/work/${project.id}`}
                    className="text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
