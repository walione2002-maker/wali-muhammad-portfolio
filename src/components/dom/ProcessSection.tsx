'use client';

import React from 'react';

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  details: string[];
}

const STEPS: ProcessStep[] = [
  {
    step: '01',
    phase: 'Discovery & Planning',
    title: 'Architecture & Performance Planning',
    description:
      'Before writing code, we align on commercial goals, technical requirements, target conversion paths, and performance budgets.',
    details: [
      'Technical requirements & API specifications',
      'Information architecture & conversion funnel mapping',
      'Performance budgeting (Core Web Vitals targets)',
      'Tech stack selection tailored to long-term scale',
    ],
  },
  {
    step: '02',
    phase: 'Production Engineering',
    title: 'Component Architecture & Responsive Motion',
    description:
      'Translating product designs into clean Next.js 14 code with strict TypeScript safety, accessible UI primitives, and zero-jank interaction design.',
    details: [
      'Strict TypeScript implementation with zero loose any types',
      'Mobile-first responsive styling and iOS viewport optimization',
      'Semantic HTML5 structure and WCAG 2.2 AA accessibility',
      'Continuous staging environments for client review',
    ],
  },
  {
    step: '03',
    phase: 'Optimization & Handoff',
    title: 'Edge Deployment & Global Launch',
    description:
      'Rigorous end-to-end testing across physical mobile and desktop devices, technical SEO verification, and sub-second edge deployment.',
    details: [
      'Automated production build checks and bundle optimization',
      'Rich JSON-LD structured data and social Open Graph tags',
      'Global edge distribution via Cloudflare Pages and Vercel',
      'Complete code repository handoff and documentation',
    ],
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 z-10"
      aria-labelledby="process-title"
    >
      {/* Section Header (Centered on mobile, left on desktop) */}
      <div className="mb-10 sm:mb-14 lg:mb-16 text-center lg:text-left">
        <div className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3 sm:mb-4">
          04 / Working Process
        </div>
        <h2
          id="process-title"
          className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          How<br />I Work
        </h2>
        <p className="text-[#B8B8B8] text-sm xs:text-base sm:text-xl mt-4 sm:mt-6 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
          A disciplined, transparent delivery framework designed to give remote founders, agencies, and enterprise clients predictable outcomes.
        </p>
      </div>

      {/* 3-Step Process Grid (Stacked on mobile, 3-col on lg) */}
      <div className="border-t border-[#1C1C1C] grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#1C1C1C]">
        {STEPS.map((s) => (
          <div
            key={s.step}
            className="py-10 sm:py-12 lg:py-14 lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between mb-6 sm:mb-8">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#555555]">
                  {s.step}
                </span>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#FF4D00]">
                  {s.phase}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#E8E4DE] tracking-tight mb-3 sm:mb-4 text-center sm:text-left">
                {s.title}
              </h3>

              <p className="text-[#B8B8B8] text-sm sm:text-base leading-relaxed font-light mb-6 sm:mb-8 text-left">
                {s.description}
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-2.5 border-t border-[#1C1C1C] pt-6 m-0 p-0 list-none text-left">
              {s.details.map((item) => (
                <li
                  key={item}
                  className="text-xs sm:text-sm font-mono text-[#999999] flex items-baseline gap-2.5"
                >
                  <span className="text-[#555555] select-none shrink-0">/</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;