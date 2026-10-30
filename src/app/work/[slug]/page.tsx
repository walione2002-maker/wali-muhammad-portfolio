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
        <header className="border-b border-[#1C1C1C] bg-[#080808]/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#E8E4DE] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Work</span>
            </Link>

            <Link
              href="/"
              className="font-display font-extrabold text-sm sm:text-base text-[#E8E4DE] tracking-tight hover:text-[#FF4D00] transition-colors"
            >
              WALI MUHAMMAD
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono text-[#666666] flex items-center gap-2">
            <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
            <span>/</span>
            <Link href="/work" className="hover:text-[#E8E4DE]">Work</Link>
            <span>/</span>
            <span className="text-[#FF4D00]">{project.title}</span>
          </nav>

          {/* Project Title & Category */}
          <div className="mb-12 border-b border-[#1C1C1C] pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#141414] border border-[#222222] text-[#FF4D00]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#666666]">
                Year {project.year} · {project.role}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#E8E4DE] leading-[1.05] uppercase mb-6">
              {project.title}
            </h1>

            <p className="text-lg sm:text-2xl text-[#B0B0B0] font-light leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Quick Live Link Action Rail */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E8E4DE] transition-colors"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#262626] bg-[#0E0E0E] text-[#E8E4DE] font-mono text-xs uppercase tracking-widest hover:border-[#444444] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Performance & Impact Highlight Box */}
          <div className="mb-16 p-6 sm:p-8 bg-[#0F0F0F] border border-[#1C1C1C] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#161616] border border-[#262626] text-[#FF4D00] mt-1">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1">
                  Engineered Performance &amp; Client Impact
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-[#E8E4DE]">
                  {project.impactMetric}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#777777] bg-[#141414] px-4 py-2 border border-[#222222] self-start sm:self-auto flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Production Verified</span>
            </div>
          </div>

          {/* Case Study Core Editorial Breakdown */}
          <div className="space-y-16 text-[#C2BEB8] leading-relaxed font-light text-base sm:text-lg">
            {/* 01 Context */}
            {project.context && (
              <section aria-labelledby="section-context">
                <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                  01 / Commercial Context &amp; Objective
                </div>
                <h2 id="section-context" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-4">
                  The Business Landscape
                </h2>
                <p>{project.context}</p>
              </section>
            )}

            {/* 02 Challenge */}
            <section aria-labelledby="section-challenge">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                02 / Technical Challenge
              </div>
              <h2 id="section-challenge" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-4">
                Engineering Constraints &amp; Friction Points
              </h2>
              <p>{project.challenge}</p>
            </section>

            {/* 03 Solution */}
            <section aria-labelledby="section-solution">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                03 / Engineering Solution
              </div>
              <h2 id="section-solution" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-4">
                Architecture &amp; Implementation
              </h2>
              <p>{project.solution}</p>
            </section>

            {/* 04 Decision */}
            {project.decision && (
              <section aria-labelledby="section-decision">
                <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                  04 / Architectural Decision
                </div>
                <h2 id="section-decision" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-4">
                  The Trade-Off &amp; Strategic Judgment
                </h2>
                <p>{project.decision}</p>
              </section>
            )}

            {/* 05 Tech Stack */}
            <section aria-labelledby="section-stack" className="pt-8 border-t border-[#1C1C1C]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                05 / Technology Foundation
              </div>
              <h2 id="section-stack" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-6">
                Tools, Frameworks &amp; Protocols
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#101010] border border-[#222222] font-mono text-xs sm:text-sm text-[#E8E4DE]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="mt-20 pt-10 border-t border-[#1C1C1C] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/work/${prevProject.id}`}
              className="p-6 bg-[#0B0B0B] border border-[#1A1A1A] hover:border-[#333333] transition-all group"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-2">
                ← Previous Project
              </span>
              <span className="font-display font-bold text-lg text-[#E8E4DE] group-hover:text-[#FF4D00] transition-colors">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/work/${nextProject.id}`}
              className="p-6 bg-[#0B0B0B] border border-[#1A1A1A] hover:border-[#333333] transition-all text-left sm:text-right group"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-2">
                Next Project →
              </span>
              <span className="font-display font-bold text-lg text-[#E8E4DE] group-hover:text-[#FF4D00] transition-colors">
                {nextProject.title}
              </span>
            </Link>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-20 p-8 sm:p-12 bg-[#0E0E0E] border border-[#222222] text-center">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E8E4DE] uppercase tracking-tight mb-4">
              Need a Similar Digital Product?
            </h3>
            <p className="text-[#999999] text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
              Available for commercial web development, e-commerce storefronts, and custom interactive web applications.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E8E4DE] transition-colors"
            >
              <span>Schedule Direct Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
