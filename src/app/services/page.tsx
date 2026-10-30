import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, getServicesJsonLd, getBreadcrumbJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, ShoppingBag, Layers, Box } from 'lucide-react';
import { SiteFooter } from '@/components/dom/SiteFooter';

export const metadata: Metadata = {
  title: 'Web Engineering & Digital Product Services | Wali Muhammad',
  description:
    'Commercial web engineering services by Wali Muhammad: High-performance Next.js websites, e-commerce storefronts, custom web applications, and interactive 3D WebGL experiences.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Web Engineering & Digital Product Services | Wali Muhammad',
    description:
      'Commercial web engineering services by Wali Muhammad: High-performance Next.js websites, e-commerce storefronts, custom web applications, and interactive 3D WebGL experiences.',
    url: `${SITE_URL}/services`,
  },
};

const SERVICES = [
  {
    number: '01',
    title: 'Business & Brand Website Architecture',
    icon: Globe,
    tagline: 'High-Performance Next.js Digital Flagships',
    description:
      'Precision-engineered commercial websites designed for corporate brands, digital agencies, and modern founders. Focused on sub-second edge distribution, editorial typography, and structured inquiry funnels.',
    deliverables: [
      'Next.js 14 App Router with static or edge rendering',
      'Editorial, brand-aligned responsive design for all viewports',
      'Perfect 95+ Core Web Vitals (LCP < 1.2s, CLS < 0.05)',
      'Enterprise technical SEO, JSON-LD structured schemas, and OpenGraph',
      'Headless CMS or code-managed content pipelines',
    ],
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages / Vercel'],
  },
  {
    number: '02',
    title: 'E-Commerce & High-Conversion Storefronts',
    icon: ShoppingBag,
    tagline: 'Frictionless Direct-to-Consumer & B2B Catalogs',
    description:
      'Fast, mobile-optimized online stores and product catalogs engineered to turn first-time visitors into paying customers. Specialized in emerging market direct checkouts and automated WhatsApp order routing.',
    deliverables: [
      'Single-screen instant checkout flows with zero login barriers',
      'Real-time quantity calculations and instant price updates',
      'Automated WhatsApp and direct SMS order notification bridges',
      'High-speed faceted product catalog filtering and search',
      'Sub-second image delivery and localized payment gateways',
    ],
    tech: ['Next.js', 'Stripe / WhatsApp Commerce API', 'Faceted Search', 'Tailwind CSS'],
  },
  {
    number: '03',
    title: 'Custom Web Applications & Portals',
    icon: Layers,
    tagline: 'Bespoke Software Tools & Client Interfaces',
    description:
      'Complex frontends, interactive SaaS dashboards, and workflow automation tools built with strict TypeScript type safety and maintainable state architecture.',
    deliverables: [
      'Modular component hierarchy with zero-bloat state management (Zustand)',
      'Real-time document builders, exporters, and vector PDF generators',
      'Role-based access control and secure API integration',
      'Strict accessibility compliance (WCAG 2.1 AA keyboard/screen reader)',
      'Comprehensive error handling and offline-ready service caching',
    ],
    tech: ['React 18', 'TypeScript', 'Zustand', 'REST / GraphQL APIs', 'Vector PDF'],
  },
  {
    number: '04',
    title: 'Interactive 3D & Real-Time WebGL',
    icon: Box,
    tagline: 'Hardware-Clamped Spatial Product Visualizers',
    description:
      'Sophisticated Three.js and WebGL product experiences that elevate digital storytelling without slowing down page load times or draining mobile device batteries.',
    deliverables: [
      'Custom 3D model visualizers with physical transmission glass & metallic shaders',
      'Adaptive quality management (automatic tier scaling from mobile to desktop)',
      'Offscreen canvas auto-pause via IntersectionObserver',
      'Instant static HTML fallback when WebGL or reduced-motion is requested',
      'Zero garbage-collection frame loops pinned at 60 FPS',
    ],
    tech: ['Three.js', 'React Three Fiber', 'GLSL Custom Shaders', 'Drei'],
  },
];

const FAQS = [
  {
    q: 'What is your typical project timeline?',
    a: 'Most commercial websites and focused e-commerce storefronts are delivered within 2 to 4 weeks. Custom web applications and interactive 3D visualizers generally take 4 to 8 weeks depending on specification complexity.',
  },
  {
    q: 'Do you work with international clients outside Pakistan?',
    a: 'Yes. I regularly work with international founders, digital studios, and businesses across North America, Europe, Australia, and the Middle East. Work is organized with clear asynchronous updates, milestone reviews, and flexible meeting windows.',
  },
  {
    q: 'What makes your development approach different from templates or agency builders?',
    a: 'I engineer bespoke digital products using clean Next.js and strict TypeScript. Every layout, typography scale, and interaction is authored specifically for your brand rather than bloated drag-and-drop themes, resulting in sub-second load times and higher client conversion.',
  },
  {
    q: 'How do you handle hosting and post-launch maintenance?',
    a: 'Projects are deployed to enterprise edge networks (Cloudflare Pages or Vercel) with continuous git integration. Full documentation and handoff training are provided, alongside optional monthly maintenance retainers.',
  },
];

export default function ServicesPage() {
  const servicesLd = getServicesJsonLd();
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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

        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-mono text-[#666666] flex items-center gap-2">
            <Link href="/" className="hover:text-[#E8E4DE]">Home</Link>
            <span>/</span>
            <span className="text-[#FF4D00]">Services</span>
          </nav>

          {/* Page Heading */}
          <div className="mb-16 border-b border-[#1C1C1C] pb-10">
            <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3">
              Capabilities &amp; Commercial Offerings
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#E8E4DE] tracking-tight uppercase leading-[0.95] mb-6">
              Engineering Services &amp;<br />Digital Solutions
            </h1>
            <p className="text-base sm:text-xl text-[#A3A3A3] font-light max-w-2xl leading-relaxed">
              Tailored frontend architecture and product engineering for companies that demand performance, design distinction, and reliable delivery.
            </p>
          </div>

          {/* Services Detailed List */}
          <div className="space-y-12 mb-24">
            {SERVICES.map((s) => {
              const IconComp = s.icon;
              return (
                <article
                  key={s.number}
                  className="p-8 sm:p-12 bg-[#0C0C0C] border border-[#1C1C1C] hover:border-[#333333] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono font-bold text-[#FF4D00]">
                        SERVICE {s.number}
                      </span>
                      <div className="p-2 bg-[#141414] border border-[#222222] text-[#E8E4DE]">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h2 className="font-display font-black text-2xl sm:text-4xl text-[#E8E4DE] uppercase tracking-tight mb-3">
                      {s.title}
                    </h2>

                    <p className="text-xs font-mono uppercase tracking-wider text-[#FF4D00] mb-4">
                      {s.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-[#A0A0A0] font-light leading-relaxed mb-6">
                      {s.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {s.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-[#141414] border border-[#222222] font-mono text-[11px] text-[#888888]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-[#0E0E0E] p-6 sm:p-8 border border-[#1A1A1A]">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-4">
                      Core Client Deliverables
                    </span>
                    <ul className="space-y-3 m-0 p-0 list-none">
                      {s.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#CCCCCC] font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#FF4D00] flex-shrink-0 mt-1" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Frequently Asked Questions */}
          <section aria-labelledby="faq-title" className="mb-24 pt-12 border-t border-[#1C1C1C]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF4D00] mb-3">
              Client Consultation
            </div>
            <h2 id="faq-title" className="font-display font-black text-3xl sm:text-5xl text-[#E8E4DE] uppercase tracking-tight mb-12">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-6 sm:p-8 bg-[#0B0B0B] border border-[#1C1C1C]">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#E8E4DE] mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-sm sm:text-base text-[#999999] font-light leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Consultation CTA Banner */}
          <div className="p-8 sm:p-12 bg-[#0E0E0E] border border-[#222222] text-center">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E8E4DE] uppercase tracking-tight mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-[#999999] text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
              Send an inquiry with your project scope, timeline, and goals. I respond within 24 hours.
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
