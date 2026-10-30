'use client';

import React from 'react';

interface CapabilityItem {
  number: string;
  title: string;
  focus: string;
  description: string;
  deliverables: string[];
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'Commercial Websites & E-Commerce',
    focus: 'Conversion & Authority',
    description:
      'Fast, mobile-first brand flagships, digital showcases, and online storefronts engineered to establish immediate credibility and drive qualified client inquiries.',
    deliverables: [
      'Next.js 14 App Router & Static Generation',
      'Mobile-First Responsive Layouts & iOS Safe Areas',
      'Technical SEO, Schema Markup & 95+ Core Web Vitals',
      'Frictionless Checkout Flows & WhatsApp Ordering Funnels',
    ],
  },
  {
    number: '02',
    title: 'Custom Web Applications',
    focus: 'Architecture & Scalability',
    description:
      'Bespoke web applications, internal tools, and client dashboards built with strict TypeScript and modern state architectures that scale without technical debt.',
    deliverables: [
      'Full-Stack TypeScript & Strict Type Safety',
      'Performant State Management & Client Data Flows',
      'FinTech Dashboards & Analytical Interfaces',
      'Edge-Deployed Cloudflare Pages & Vercel Infrastructure',
    ],
  },
  {
    number: '03',
    title: 'Interactive 3D & Spatial Web',
    focus: 'Engagement & Distinction',
    description:
      'Purpose-driven Three.js and WebGL viewports that give digital products an interactive edge—without compromising baseline performance or battery life.',
    deliverables: [
      'Three.js & React Three Fiber (R3F) Integration',
      'Real-time Physically-Based Shaders & Refraction',
      'Hardware-Accelerated 60–120 FPS Render Pipelines',
      'Spatial Product Customizers & Live 3D Document Export',
    ],
  },
];

export function ServicesSection() {
  return (
    <section
      id="capabilities"
      className="relative max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 z-10"
      aria-labelledby="capabilities-title"
    >
      {/* Section Header (Centered on mobile, left on desktop) */}
      <div className="mb-10 sm:mb-14 lg:mb-16 text-center lg:text-left">
        <div className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3 sm:mb-4">
          02 / Capabilities
        </div>
        <h2
          id="capabilities-title"
          className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          What<br />I Deliver
        </h2>
        <p className="text-[#B8B8B8] text-sm xs:text-base sm:text-xl mt-4 sm:mt-6 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
          Engineering digital products from architectural specification through to global edge deployment, prioritizing performance, code clarity, and commercial outcomes.
        </p>
      </div>

      {/* Numbered Editorial Capability Grid */}
      <div className="border-t border-[#1C1C1C]">
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.number}
            className="py-8 sm:py-12 lg:py-14 border-b border-[#1C1C1C] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start group hover:bg-[#111111]/25 transition-colors px-1 sm:px-2"
          >
            {/* Number & Focus (Centered on mobile, left on desktop) */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <span className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl text-[#555555] group-hover:text-[#FF4D00] transition-colors block">
                {cap.number}
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#888888] mt-1 sm:mt-2 block">
                {cap.focus}
              </span>
            </div>

            {/* Title & Core Description */}
            <div className="lg:col-span-5 pr-0 lg:pr-8 text-center lg:text-left">
              <h3 className="font-display font-bold text-xl xs:text-2xl sm:text-3xl text-[#E8E4DE] tracking-tight mb-3 sm:mb-4 group-hover:text-white transition-colors">
                {cap.title}
              </h3>
              <p className="text-[#B8B8B8] text-sm sm:text-base lg:text-lg font-light leading-relaxed text-left">
                {cap.description}
              </p>
            </div>

            {/* Deliverables / Details (Left-aligned for reading) */}
            <div className="lg:col-span-5 pt-2 lg:pt-0">
              <div className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#777777] mb-3 text-center lg:text-left">
                Core Deliverables
              </div>
              <ul className="space-y-2.5 sm:space-y-3 m-0 p-0 list-none text-left">
                {cap.deliverables.map((item) => (
                  <li
                    key={item}
                    className="text-xs sm:text-sm font-mono text-[#A8A8A8] flex items-baseline gap-2.5"
                  >
                    <span className="text-[#FF4D00] select-none font-bold shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;