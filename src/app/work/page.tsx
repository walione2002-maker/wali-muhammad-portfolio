import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowUpRight, ExternalLink, ShieldCheck } from 'lucide-react';
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

        <main className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-[11px] sm:text-xs font-mono text-[#666666] flex items-center gap-2">
            <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
            <span>/</span>
            <span className="text-[#FF4D00]">Work</span>
          </nav>

          {/* Page Heading (Centered on mobile, left on desktop) */}
          <div className="mb-12 sm:mb-16 border-b border-[#1C1C1C] pb-8 sm:pb-12 text-center sm:text-left">
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3">
              Commercial Portfolio Index
            </div>
            <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl lg:text-7xl text-[#E8E4DE] tracking-tight uppercase leading-[0.95] mb-4 sm:mb-6">
              Selected Works &amp;<br />Client Case Studies
            </h1>
            <p className="text-sm xs:text-base sm:text-xl text-[#A3A3A3] font-light max-w-2xl leading-relaxed mx-auto sm:mx-0">
              Every project represents a deployed commercial website or custom web application with sub-second performance, strict typography, and verified client outcomes.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="p-6 sm:p-8 bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#333333] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#141414] border border-[#222222] text-[#FF4D00]">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-[#666666]">
                      {project.year} · {project.role}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-xl xs:text-2xl sm:text-3xl text-[#E8E4DE] group-hover:text-[#FF4D00] transition-colors mb-3 break-words">
                    <Link href={`/work/${project.id}`}>{project.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-base text-[#999999] font-light mb-6 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="mb-6 p-3 sm:p-4 bg-[#111111] border border-[#1C1C1C] text-xs font-mono text-[#CCCCCC] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="truncate">{project.impactMetric}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#141414] border border-[#222222] font-mono text-[10px] sm:text-[11px] text-[#888888]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/work/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E8E4DE] hover:text-[#FF4D00] transition-colors font-semibold min-h-[44px]"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#666666] hover:text-[#CCCCCC] transition-colors min-h-[44px]"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
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
