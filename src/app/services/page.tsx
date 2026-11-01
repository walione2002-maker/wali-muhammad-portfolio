import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getServicesJsonLd, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, ShoppingBag, Layers, Box, Sparkles, ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';
import { DOORS_DATA } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Web Engineering & Digital Product Services | Wali Muhammad',
  description:
    'Commercial web engineering services by Wali Muhammad: High-performance Next.js websites, FinTech web apps, commercial e-commerce storefronts, and interactive 3D WebGL experiences.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Web Engineering & Digital Product Services | Wali Muhammad',
    description:
      'Commercial web engineering services by Wali Muhammad: High-performance Next.js websites, FinTech web apps, commercial e-commerce storefronts, and interactive 3D WebGL experiences.',
    url: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);
  const servicesLd = getServicesJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
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
              WALI MUHAMMAD · SERVICES
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">Services &amp; Architecture</span>
          </nav>

          {/* Heading */}
          <div className="mb-14 sm:mb-20 border-b border-white/10 pb-10 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>02 / Capabilities &amp; Engineering Disciplines</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-4">
              4 Production Chambers
            </h1>
            <p className="text-base sm:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
              Every production chamber is calibrated for maximum performance, strict type safety, sub-second edge distribution, and proven client outcomes.
            </p>
          </div>

          {/* 4 Architectural Door Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-20">
            {DOORS_DATA.map((door, idx) => (
              <div
                key={door.id}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-white/25 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${door.colors.primary}20`,
                        borderColor: door.colors.trim,
                        color: door.colors.accentHex,
                      }}
                    >
                      CHAMBER 0{idx + 1} · {door.nameplate}
                    </span>
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: door.colors.accentHex }} />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F3EE] tracking-tight mb-3">
                    {door.title}
                  </h2>

                  <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {door.roomDescription}
                  </p>

                  {/* Checklist */}
                  <div className="space-y-3 mb-8">
                    {door.checklist.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: door.colors.accentHex }}
                        />
                        <span className="text-xs sm:text-sm text-zinc-300 font-light leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/#doors-section`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors"
                >
                  <span>Step inside {door.nameplate}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Direct Consultation Banner */}
          <div className="p-8 sm:p-14 bg-white/[0.03] border border-white/10 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-4xl font-bold text-[#F4F3EE] tracking-tight mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Tell me about what you are building. I will evaluate the requirements and respond with a scoped proposal within 24 hours.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F4F3EE] text-[#0B0D0C] rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-xl"
            >
              <span>Start a Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
