'use client';

import React from 'react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-labelledby="about-title"
    >
      {/* Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#737373] mb-4">
          05 / Developer Profile
        </div>
        <h2
          id="about-title"
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          About<br />Wali
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-[#1A1A1A]">
        {/* Core Narrative */}
        <div className="lg:col-span-7 space-y-6 text-[#A3A3A3] text-base sm:text-lg font-light leading-relaxed">
          <p>
            I am a Web Developer and digital product engineer based in <strong className="text-[#E8E4DE] font-normal">Karachi, Pakistan</strong>.
            Currently completing my degree in <strong className="text-[#E8E4DE] font-normal">FinTech at FAST-NUCES Karachi</strong>, I combine rigorous software engineering fundamentals with commercial design sensibility.
          </p>
          <p>
            Over the past few years, I have architected and deployed production web applications, high-converting direct-to-consumer e-commerce storefronts, B2B wholesale product hubs, and interactive 3D WebGL experiences.
          </p>
          <p>
            My approach to frontend engineering is anchored in three strict principles:
          </p>

          <div className="space-y-4 pt-2">
            <div className="border-l-2 border-[#FF4D00] pl-4">
              <strong className="text-[#E8E4DE] font-mono text-sm uppercase tracking-wider block mb-1">
                1. Performance is Fundamental
              </strong>
              <p className="text-sm text-[#888888]">
                Websites must load instantly regardless of network speed. Sub-second initial response times and 95+ Core Web Vitals are requirements, not bonuses.
              </p>
            </div>

            <div className="border-l-2 border-[#FF4D00] pl-4">
              <strong className="text-[#E8E4DE] font-mono text-sm uppercase tracking-wider block mb-1">
                2. Design with Commercial Clarity
              </strong>
              <p className="text-sm text-[#888888]">
                Visual flourishes must never obstruct the user&apos;s journey or the business&apos;s conversion objectives. Typography and layout should guide, not confuse.
              </p>
            </div>

            <div className="border-l-2 border-[#FF4D00] pl-4">
              <strong className="text-[#E8E4DE] font-mono text-sm uppercase tracking-wider block mb-1">
                3. Strict Architecture &amp; Long-Term Maintainability
              </strong>
              <p className="text-sm text-[#888888]">
                Strict TypeScript typings, component isolation, semantic HTML5, and accessible WCAG standards ensure projects are dependable and painless to scale.
              </p>
            </div>
          </div>
        </div>

        {/* Technical & Academic Specs */}
        <div className="lg:col-span-5 lg:border-l lg:border-[#1A1A1A] lg:pl-12 space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#555555] mb-2">
              Academic Background
            </div>
            <div className="font-display font-bold text-xl text-[#E8E4DE]">
              FAST-NUCES Karachi
            </div>
            <div className="text-sm text-[#888888] font-mono mt-1">
              B.S. Financial Technology (FinTech)
            </div>
            <div className="text-xs text-[#666666] font-mono mt-0.5">
              National University of Computer &amp; Emerging Sciences
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-6">
            <div className="text-xs font-mono tracking-widest uppercase text-[#555555] mb-3">
              Core Technical Stack
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                'Next.js 14',
                'TypeScript',
                'React 18',
                'Tailwind CSS',
                'Three.js',
                'WebGL',
                'GSAP',
                'Zustand',
                'Cloudflare Pages',
                'Vercel',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#121212] border border-[#222222] text-[#9CA3AF]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-6 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#555555] block uppercase tracking-wider mb-1">Location</span>
              <span className="text-[#E8E4DE]">Karachi, Pakistan</span>
            </div>
            <div>
              <span className="text-[#555555] block uppercase tracking-wider mb-1">Timezone</span>
              <span className="text-[#E8E4DE]">PKT (UTC+5)</span>
            </div>
            <div>
              <span className="text-[#555555] block uppercase tracking-wider mb-1">Status</span>
              <span className="text-[#10B981]">Available for Projects</span>
            </div>
            <div>
              <span className="text-[#555555] block uppercase tracking-wider mb-1">Focus</span>
              <span className="text-[#E8E4DE]">Remote International</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
