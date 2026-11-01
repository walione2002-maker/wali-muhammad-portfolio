import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, MessageSquare, Mail, Clock, MapPin, Sparkles, Send, ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact & Commercial Project Inquiries | Wali Muhammad',
  description:
    'Start a project inquiry with Wali Muhammad — Full-Stack Engineer & FinTech Systems Architect in Karachi, Pakistan. WhatsApp, direct email, and response within 24 hours.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact & Commercial Project Inquiries | Wali Muhammad',
    description:
      'Start a project inquiry with Wali Muhammad — Full-Stack Engineer & FinTech Systems Architect in Karachi, Pakistan. WhatsApp, direct email, and response within 24 hours.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
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
              WALI MUHAMMAD · CONTACT
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-zinc-500 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">Direct Inquiries</span>
          </nav>

          {/* Heading */}
          <div className="mb-14 border-b border-white/10 pb-10 text-left">
            <div className="flex items-center gap-3 select-none mb-3">
              <div className="w-3 h-3 rounded-[2px] bg-[#34D399] shadow-[0_0_12px_#34D399] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-300 font-semibold">
                AVAILABLE FOR NEW WORK
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F3EE] mb-4">
              Got a project?<br />
              <span className="text-zinc-400">Let&apos;s build it together.</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed">
              I&apos;m taking on new freelance work: commercial websites, FinTech web apps, 3D WebGL interfaces and visual systems. Tell me what you&apos;re building and I&apos;ll get back to you within a day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Direct Contact Channels */}
            <div className="lg:col-span-6 space-y-4">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/923141151656?text=Hi%20Wali,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white/[0.03] border border-white/10 hover:border-emerald-400/50 rounded-2xl block transition-all group"
              >
                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Direct WhatsApp (Fastest)
                  </span>
                </div>
                <div className="text-xl font-bold text-[#F4F3EE] group-hover:text-emerald-400 transition-colors">
                  +92 314 1151656
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Instant mobile messaging · Same-day reply
                </p>
              </a>

              {/* Email Card */}
              <a
                href="mailto:walione2002@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                className="p-6 bg-white/[0.03] border border-white/10 hover:border-amber-400/50 rounded-2xl block transition-all group"
              >
                <div className="flex items-center gap-2 mb-2 text-amber-400">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Direct Email
                  </span>
                </div>
                <div className="text-xl font-bold text-[#F4F3EE] group-hover:text-amber-400 transition-colors truncate">
                  walione2002@gmail.com
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Comprehensive briefs &amp; specifications
                </p>
              </a>
            </div>

            {/* Location & Timezone Details */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-zinc-400">
                  <Clock className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-sky-400">
                    Local Time &amp; Hours
                  </span>
                </div>
                <div className="text-xl font-bold text-[#F4F3EE]">
                  Karachi, Pakistan (PKT / UTC+5)
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Flexible overlap with North America, Europe &amp; Asia-Pacific
                </p>
              </div>

              <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-zinc-400">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-purple-400">
                    Base Institution
                  </span>
                </div>
                <div className="text-xl font-bold text-[#F4F3EE]">
                  FAST-NUCES Karachi
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Department of Computer Science &amp; Financial Technology
                </p>
              </div>
            </div>
          </div>

          {/* Quick Trigger to Modal on Home */}
          <div className="p-8 sm:p-12 bg-white/[0.03] border border-white/10 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F3EE] tracking-tight mb-3">
              Need a Formal Project Consultation?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-6 font-light">
              Use our structured consultation brief on the homepage to specify your chamber, timeline, and budget.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F4F3EE] text-[#0B0D0C] rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-xl"
            >
              <span>Open Project Brief Modal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
