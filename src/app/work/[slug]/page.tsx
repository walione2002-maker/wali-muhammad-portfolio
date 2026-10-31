import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { getProjectJsonLd, SITE_URL } from '@/lib/seo';
import { ArrowLeft, ExternalLink, Github, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { StudioDisplayMockup } from '@/components/dom/StudioDisplayMockup';
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
              WALI MUHAMMAD · PORTFOLIO
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-6 md:px-12 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-zinc-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#doors-section" className="hover:text-white transition-colors">Chambers</Link>
            <span>/</span>
            <span className="text-emerald-400 truncate">{project.title}</span>
          </nav>

          {/* Project Title & Category */}
          <div className="mb-12 border-b border-white/10 pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-white/[0.06] border border-white/10 text-emerald-400 rounded-md">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Year {project.year} · {project.role}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-4">
              {project.title}
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Quick Live Link Action Rail */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F4F3EE] text-[#0B0D0C] pl-6 pr-2 py-2 rounded-full font-semibold text-sm inline-flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-lg group cursor-pointer"
              >
                <span>Visit Live Website</span>
                <span className="w-8 h-8 rounded-full bg-[#0B0D0C] text-[#F4F3EE] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/30 rounded-full font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <Github className="w-4 h-4 shrink-0" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* 3D Apple Studio Display Mockup Showcase Frame */}
          <div className="mb-16">
            <StudioDisplayMockup
              image={project.image}
              title={project.title}
              liveUrl={project.liveUrl}
              priority
            />
          </div>

          {/* Performance & Impact Highlight Box */}
          <div className="mb-16 p-6 sm:p-8 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/[0.05] border border-white/10 text-amber-400 rounded-xl shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  Engineered Performance &amp; Client Impact
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#F4F3EE] block">
                  {project.impactMetric}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/25 px-3.5 py-1.5 rounded-full flex items-center gap-2 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Production Verified</span>
            </div>
          </div>

          {/* Case Study Core Editorial Breakdown */}
          <div className="space-y-14 text-zinc-300 leading-relaxed font-light text-base sm:text-lg">
            {project.context && (
              <section aria-labelledby="section-context">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                  01 / Commercial Context &amp; Objective
                </div>
                <h2 id="section-context" className="font-bold text-2xl sm:text-3xl text-[#F4F3EE] mb-4">
                  The Business Landscape
                </h2>
                <p>{project.context}</p>
              </section>
            )}

            <section aria-labelledby="section-challenge">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                02 / Technical Challenge
              </div>
              <h2 id="section-challenge" className="font-bold text-2xl sm:text-3xl text-[#F4F3EE] mb-4">
                Engineering Constraints &amp; Friction Points
              </h2>
              <p>{project.challenge}</p>
            </section>

            <section aria-labelledby="section-solution">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
                03 / Engineering Solution
              </div>
              <h2 id="section-solution" className="font-bold text-2xl sm:text-3xl text-[#F4F3EE] mb-4">
                Architecture &amp; Implementation
              </h2>
              <p>{project.solution}</p>
            </section>

            {project.decision && (
              <section aria-labelledby="section-decision">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
                  04 / Architectural Decision
                </div>
                <h2 id="section-decision" className="font-bold text-2xl sm:text-3xl text-[#F4F3EE] mb-4">
                  The Trade-Off &amp; Strategic Judgment
                </h2>
                <p>{project.decision}</p>
              </section>
            )}

            <section aria-labelledby="section-stack" className="pt-8 border-t border-white/10">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                05 / Technology Foundation
              </div>
              <h2 id="section-stack" className="font-bold text-2xl sm:text-3xl text-[#F4F3EE] mb-6">
                Tools, Frameworks &amp; Protocols
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 bg-white/[0.05] border border-white/10 font-mono text-xs text-zinc-300 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/work/${prevProject.id}`}
              className="p-6 bg-white/[0.03] border border-white/10 hover:border-white/30 rounded-2xl transition-all group text-left"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                ← Previous Project
              </span>
              <span className="font-bold text-lg text-[#F4F3EE] group-hover:text-emerald-400 transition-colors truncate block">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/work/${nextProject.id}`}
              className="p-6 bg-white/[0.03] border border-white/10 hover:border-white/30 rounded-2xl transition-all text-left sm:text-right group"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Next Project →
              </span>
              <span className="font-bold text-lg text-[#F4F3EE] group-hover:text-emerald-400 transition-colors truncate block">
                {nextProject.title}
              </span>
            </Link>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-16 p-8 sm:p-12 bg-white/[0.03] border border-white/10 rounded-3xl text-center">
            <h3 className="font-bold text-2xl sm:text-4xl text-[#F4F3EE] tracking-tight mb-4">
              Need a Similar Digital Product?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Available for commercial web development, quantitative FinTech applications, and custom spatial 3D WebGL interfaces.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F4F3EE] text-[#0B0D0C] rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-xl"
            >
              <span>Schedule Direct Project Inquiry</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </main>

        {/* Fixed Bottom-Left "← Back to the doors" Button */}
        <Link
          href="/#doors-section"
          className="fixed bottom-6 left-6 sm:bottom-8 sm:left-10 z-50 bg-[#141716]/95 hover:bg-[#1E2321] text-[#F4F3EE] border border-white/15 pl-2.5 pr-5 py-2 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md inline-flex items-center gap-3 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
          aria-label="Return to the architectural doors lineup"
        >
          <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-200" />
          </span>
          <span>Back to the doors</span>
        </Link>

        <SiteFooter />
      </div>
    </>
  );
}
