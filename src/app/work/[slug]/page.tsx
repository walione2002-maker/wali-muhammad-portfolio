import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { getProjectJsonLd, SITE_URL } from '@/lib/seo';
import { ArrowLeft, ExternalLink, Github, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = PROJECTS.find((p) => p.id === params.slug);
  if (!project) return {};

  const title = `${project.title} | Case Study by Wali Muhammad`;
  const description = `${project.tagline}. Detailed frontend and architecture case study covering technical challenge, implementation, and verified live performance.`;
  const url = `${SITE_URL}/work/${project.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: 'Wali Muhammad — Web Developer Portfolio',
      images: [
        {
          url: project.image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${project.title} preview by Wali Muhammad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image || '/og-image.png'],
      creator: '@walione2002',
    },
  };
}

export default function ProjectCaseStudyPage({ params }: Props) {
  const projectIndex = PROJECTS.findIndex((p) => p.id === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];
  const jsonLd = getProjectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#080808] text-[#E8E4DE] selection:bg-[#FF4D00] selection:text-[#080808]">
        {/* Navigation Header */}
        <header className="border-b border-[#1C1C1C] bg-[#080808]/90 backdrop-blur-md sticky top-0 z-40 safe-top">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#E8E4DE] transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Work</span>
            </Link>

            <Link
              href="/"
              className="font-display font-extrabold text-xs sm:text-base text-[#E8E4DE] tracking-tight hover:text-[#FF4D00] transition-colors truncate"
            >
              WALI MUHAMMAD
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 text-[11px] sm:text-xs font-mono text-[#666666] flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
            <span>/</span>
            <Link href="/work" className="hover:text-[#E8E4DE]">Work</Link>
            <span>/</span>
            <span className="text-[#FF4D00] truncate">{project.title}</span>
          </nav>

          {/* Project Title & Category */}
          <div className="mb-10 sm:mb-14 border-b border-[#1C1C1C] pb-8 sm:pb-12 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-4">
              <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider bg-[#141414] border border-[#222222] text-[#FF4D00]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#666666]">
                Year {project.year} · {project.role}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#E8E4DE] leading-[1.05] uppercase mb-4 sm:mb-6 break-words">
              {project.title}
            </h1>

            <p className="text-base xs:text-lg sm:text-2xl text-[#B0B0B0] font-light leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {project.tagline}
            </p>

            {/* Quick Live Link Action Rail */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E8E4DE] transition-colors min-h-[46px] touch-manipulation"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#262626] bg-[#0E0E0E] text-[#E8E4DE] font-mono text-xs uppercase tracking-widest hover:border-[#444444] transition-colors min-h-[46px] touch-manipulation"
                >
                  <Github className="w-4 h-4 shrink-0" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Performance & Impact Highlight Box */}
          <div className="mb-12 sm:mb-16 p-5 sm:p-8 bg-[#0F0F0F] border border-[#1C1C1C] flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 bg-[#161616] border border-[#262626] text-[#FF4D00] shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1">
                  Engineered Performance &amp; Client Impact
                </span>
                <span className="text-base sm:text-xl font-display font-bold text-[#E8E4DE] block">
                  {project.impactMetric}
                </span>
              </div>
            </div>

            <div className="text-[11px] sm:text-xs font-mono text-[#777777] bg-[#141414] px-3.5 py-1.5 border border-[#222222] self-center sm:self-auto flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Production Verified</span>
            </div>
          </div>

          {/* Case Study Core Editorial Breakdown (Left-aligned for reading) */}
          <div className="space-y-12 sm:space-y-16 text-[#C2BEB8] leading-relaxed font-light text-sm sm:text-lg text-left">
            {project.context && (
              <section aria-labelledby="section-context">
                <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                  01 / Commercial Context &amp; Objective
                </div>
                <h2 id="section-context" className="font-display font-bold text-xl sm:text-3xl text-[#E8E4DE] mb-3 sm:mb-4">
                  The Business Landscape
                </h2>
                <p>{project.context}</p>
              </section>
            )}

            <section aria-labelledby="section-challenge">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                02 / Technical Challenge
              </div>
              <h2 id="section-challenge" className="font-display font-bold text-xl sm:text-3xl text-[#E8E4DE] mb-3 sm:mb-4">
                Engineering Constraints &amp; Friction Points
              </h2>
              <p>{project.challenge}</p>
            </section>

            <section aria-labelledby="section-solution">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                03 / Engineering Solution
              </div>
              <h2 id="section-solution" className="font-display font-bold text-xl sm:text-3xl text-[#E8E4DE] mb-3 sm:mb-4">
                Architecture &amp; Implementation
              </h2>
              <p>{project.solution}</p>
            </section>

            {project.decision && (
              <section aria-labelledby="section-decision">
                <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                  04 / Architectural Decision
                </div>
                <h2 id="section-decision" className="font-display font-bold text-xl sm:text-3xl text-[#E8E4DE] mb-3 sm:mb-4">
                  The Trade-Off &amp; Strategic Judgment
                </h2>
                <p>{project.decision}</p>
              </section>
            )}

            <section aria-labelledby="section-stack" className="pt-8 border-t border-[#1C1C1C]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                05 / Technology Foundation
              </div>
              <h2 id="section-stack" className="font-display font-bold text-xl sm:text-3xl text-[#E8E4DE] mb-4 sm:mb-6">
                Tools, Frameworks &amp; Protocols
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-[#101010] border border-[#222222] font-mono text-xs sm:text-sm text-[#E8E4DE]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-[#1C1C1C] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/work/${prevProject.id}`}
              className="p-5 sm:p-6 bg-[#0B0B0B] border border-[#1A1A1A] hover:border-[#333333] transition-all group text-left"
            >
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-1">
                ← Previous Project
              </span>
              <span className="font-display font-bold text-base sm:text-lg text-[#E8E4DE] group-hover:text-[#FF4D00] transition-colors truncate block">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/work/${nextProject.id}`}
              className="p-5 sm:p-6 bg-[#0B0B0B] border border-[#1A1A1A] hover:border-[#333333] transition-all text-left sm:text-right group"
            >
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-1">
                Next Project →
              </span>
              <span className="font-display font-bold text-base sm:text-lg text-[#E8E4DE] group-hover:text-[#FF4D00] transition-colors truncate block">
                {nextProject.title}
              </span>
            </Link>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-14 sm:mt-20 p-6 sm:p-12 bg-[#0E0E0E] border border-[#222222] text-center">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E8E4DE] uppercase tracking-tight mb-3 sm:mb-4">
              Need a Similar Digital Product?
            </h3>
            <p className="text-[#999999] text-xs sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
              Available for commercial web development, e-commerce storefronts, and custom interactive web applications.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E8E4DE] transition-colors min-h-[46px] w-full sm:w-auto"
            >
              <span>Schedule Direct Project Inquiry</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
