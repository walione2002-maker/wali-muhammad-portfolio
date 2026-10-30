import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Linkedin, GraduationCap, MapPin, Terminal, Award } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'About Wali Muhammad | Web Developer & Digital Product Engineer',
  description:
    'Biographical background, engineering philosophy, and technical toolkit of Wali Muhammad — Web Developer and FinTech student at FAST-NUCES Karachi, Pakistan.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Wali Muhammad | Web Developer & Digital Product Engineer',
    description:
      'Biographical background, engineering philosophy, and technical toolkit of Wali Muhammad — Web Developer and FinTech student at FAST-NUCES Karachi, Pakistan.',
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
    skills: ['Three.js', 'React Three Fiber', 'GLSL Custom Shaders', 'InstancedMesh', 'Drei', 'Post-processing Pipeline'],
  },
  {
    category: 'Backend & Data Pipelines',
    skills: ['Node.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'Redis / KV Caching', 'Stripe / Commerce APIs'],
  },
  {
    category: 'Edge Deployment & Tooling',
    skills: ['Cloudflare Pages', 'Vercel Edge', 'Git / GitHub CI', 'Lighthouse Optimization', 'Hardware Clamped DPR'],
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

      <div className="min-h-screen bg-[#080808] text-[#E8E4DE] selection:bg-[#FF4D00] selection:text-[#080808]">
        {/* Navigation Header */}
        <header className="border-b border-[#1C1C1C] bg-[#080808]/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#E8E4DE] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/"
              className="font-display font-extrabold text-sm sm:text-base text-[#E8E4DE] tracking-tight hover:text-[#FF4D00] transition-colors"
            >
              WALI MUHAMMAD
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-[#666666] flex items-center gap-2">
            <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
            <span>/</span>
            <span className="text-[#FF4D00]">About</span>
          </nav>

          {/* Heading */}
          <div className="mb-16 border-b border-[#1C1C1C] pb-10">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3">
              Engineer Profile &amp; Background
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#E8E4DE] tracking-tight uppercase leading-[0.95] mb-6">
              Wali Muhammad
            </h1>
            <p className="text-lg sm:text-2xl text-[#B0B0B0] font-light leading-relaxed max-w-3xl">
              Web Developer and Digital Product Engineer based in Karachi, Pakistan. FinTech undergraduate at FAST-NUCES, bridging computational finance rigor with modern frontend architecture.
            </p>
          </div>

          {/* Quick Credential Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] flex items-start gap-4">
              <div className="p-3 bg-[#141414] border border-[#222222] text-[#FF4D00]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1">
                  Academic Foundation
                </span>
                <span className="font-display font-bold text-base text-[#E8E4DE] block">
                  FAST-NUCES Karachi
                </span>
                <span className="text-xs font-mono text-[#A0A0A0]">
                  Bachelor of Science in Financial Technology (FinTech)
                </span>
              </div>
            </div>

            <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] flex items-start gap-4">
              <div className="p-3 bg-[#141414] border border-[#222222] text-[#FF4D00]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-1">
                  Geographic Location
                </span>
                <span className="font-display font-bold text-base text-[#E8E4DE] block">
                  Karachi, Sindh, Pakistan
                </span>
                <span className="text-xs font-mono text-[#A0A0A0]">
                  Working globally across UTC+5 with US, UK, and EU clients
                </span>
              </div>
            </div>
          </div>

          {/* Biography & Philosophy Narrative */}
          <article className="space-y-12 text-[#B8B4AE] font-light text-base sm:text-lg leading-relaxed mb-20">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                01 / The Discipline
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-4">
                Engineering with Intent
              </h2>
              <p>
                Too much of the modern web relies on bloated site builders, copy-pasted component templates, and superficial visual noise. My work starts from a different premise: websites should be fast, authored with conviction, and commercially effective.
              </p>
              <p className="mt-4">
                Studying Financial Technology at FAST National University of Computer and Emerging Sciences (FAST-NUCES) provides me with a deep foundation in algorithmic efficiency, data structures, and mathematical modeling. I carry that discipline directly into frontend engineering: measuring frame budgets, minimizing layout shift, and ensuring clean, maintainable TypeScript codebases.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
                02 / Commercial Realism
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-4">
                Built for Measurable Client Conversion
              </h2>
              <p>
                Whether building a luxury corporate showcase like Corpassion Events, an instant-checkout herbal wellness storefront like Amirs Kalonji Oil, or a 3D WebGL resume builder, the primary goal remains constant: turning qualified visitors into paying clients and project inquiries.
              </p>
              <p className="mt-4">
                I do not treat 3D or WebGL as an excuse for poor performance. In my work, 3D is strictly clamped by hardware capability, automatically paused when offscreen, and paired with semantic text so that neither search engines nor low-power mobile devices are penalized.
              </p>
            </div>
          </article>

          {/* Skills & Technical Toolkit Matrix */}
          <section aria-labelledby="skills-matrix-title" className="mb-20 pt-10 border-t border-[#1C1C1C]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
              03 / Technical Matrix
            </div>
            <h2 id="skills-matrix-title" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-8">
              Core Competencies &amp; Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS_TABLE.map((s, idx) => (
                <div key={idx} className="p-6 bg-[#0B0B0B] border border-[#1A1A1A]">
                  <h3 className="font-display font-bold text-lg text-[#E8E4DE] mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#FF4D00]" />
                    <span>{s.category}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {s.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-[#121212] border border-[#222222] font-mono text-xs text-[#CCCCCC]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verification & Social Presence */}
          <section aria-labelledby="connect-title" className="mb-20 pt-10 border-t border-[#1C1C1C]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-2">
              04 / Profiles &amp; Verification
            </div>
            <h2 id="connect-title" className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] mb-6">
              Public Repositories &amp; Networks
            </h2>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/walione2002-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] border border-[#222222] hover:border-[#FF4D00] text-[#E8E4DE] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Github className="w-4 h-4 text-[#FF4D00]" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <a
                href="https://www.linkedin.com/in/wali-muhammad-2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] border border-[#222222] hover:border-[#FF4D00] text-[#E8E4DE] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>
            </div>
          </section>

          {/* Consultation CTA Banner */}
          <div className="p-8 sm:p-12 bg-[#0E0E0E] border border-[#222222] text-center">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E8E4DE] uppercase tracking-tight mb-4">
              Let&apos;s Build Together
            </h3>
            <p className="text-[#999999] text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
              Looking for a dedicated engineer for your commercial site, e-commerce storefront, or web app? Get in touch today.
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
