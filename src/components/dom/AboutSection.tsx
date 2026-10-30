'use client';

import React from 'react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 z-10"
      aria-labelledby="about-title"
    >
      {/* Section Header (Centered on mobile, left on desktop) */}
      <div className="mb-10 sm:mb-14 lg:mb-16 text-center lg:text-left">
        <div className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#888888] mb-3 sm:mb-4">
          05 / Developer Profile
        </div>
        <h2
          id="about-title"
          className="font-display font-extrabold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase"
        >
          About<br />Wali
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-8 border-t border-[#1C1C1C]">
        {/* Core Narrative */}
        <div className="lg:col-span-7 space-y-6 text-[#B8B8B8] text-sm sm:text-base lg:text-lg font-light leading-relaxed text-left">
          <p>
            I am a Web Developer and digital product engineer based in <strong className="text-[#E8E4DE] font-medium">Karachi, Pakistan</strong>.
            Currently completing my degree in <strong className="text-[#E8E4DE] font-medium">FinTech at FAST-NUCES Karachi</strong>, I combine rigorous software engineering fundamentals with commercial design sensibility.
          </p>
          <p>
            Over the past few years, I have architected and deployed production web applications, high-converting direct-to-consumer e-commerce storefronts, B2B wholesale product hubs, and interactive 3D WebGL experiences.
          </p>
          <p>
            My approach to frontend engineering is anchored in three strict principles:
          </p>

          <div className="space-y-4 pt-2">
            <div className="border-l-2 border-[#FF4D00] pl-4 sm:pl-5">
              <strong className="text-[#E8E4DE] font-mono text-xs sm:text-sm uppercase tracking-wider block mb-1">
                1. Performance is Fundamental
              </strong>
              <p className="text-xs sm:text-sm text-[#999999]">
                Websites must load instantly regardless of network speed. Sub-second initial response times and 95+ Core Web Vitals are requirements, not bonuses.
              </p>
            </div>

            <div className="border-l-2 border-[#FF4D00] pl-4 sm:pl-5">
              <strong className="text-[#E8E4DE] font-mono text-xs sm:text-sm uppercase tracking-wider block mb-1">
                2. Design with Commercial Clarity
              </strong>
              <p className="text-xs sm:text-sm text-[#999999]">
                Visual flourishes must never obstruct the user&apos;s journey or the business&apos;s conversion objectives. Typography and layout should guide, not confuse.
              </p>
            </div>

            <div className="border-l-2 border-[#FF4D00] pl-4 sm:pl-5">
              <strong className="text-[#E8E4DE] font-mono text-xs sm:text-sm uppercase tracking-wider block mb-1">
                3. Strict Architecture &amp; Maintainability
              </strong>
              <p className="text-xs sm:text-sm text-[#999999]">
                Strict TypeScript typings, component isolation, semantic HTML5, and accessible WCAG standards ensure projects are dependable and painless to scale.
              </p>
            </div>
          </div>
        </div>

        {/* Technical & Academic Specs */}
        <div className="lg:col-span-5 lg:border-l lg:border-[#1C1C1C] lg:pl-12 space-y-6 sm:space-y-8">
          <div className="text-center lg:text-left">
            <div className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#777777] mb-2">
              Academic Background
            </div>
            <div className="font-display font-bold text-xl sm:text-2xl text-[#E8E4DE]">
              FAST-NUCES Karachi
            </div>
            <div className="text-xs sm:text-sm text-[#999999] font-mono mt-1">
              B.S. Financial Technology (FinTech)
            </div>
            <div className="text-[11px] sm:text-xs text-[#666666] font-mono mt-0.5">
              National University of Computer &amp; Emerging Sciences
            </div>
          </div>

          <div className="border-t border-[#1C1C1C] pt-6 text-center lg:text-left">
            <div className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#777777] mb-3">
              Core Technical Stack
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
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
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#141414] border border-[#242424] text-[#B0B0B0]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1C1C1C] pt-6 grid grid-cols-2 gap-4 text-xs font-mono text-center sm:text-left">
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Location</span>
              <span className="text-[#E8E4DE] text-xs sm:text-sm">Karachi, Pakistan</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Timezone</span>
              <span className="text-[#E8E4DE] text-xs sm:text-sm">PKT (UTC+5)</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Status</span>
              <span className="text-[#10B981] text-xs sm:text-sm">Available for Projects</span>
            </div>
            <div>
              <span className="text-[#666666] block uppercase tracking-wider mb-1 text-[10px] sm:text-xs">Focus</span>
              <span className="text-[#E8E4DE] text-xs sm:text-sm">Remote Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;