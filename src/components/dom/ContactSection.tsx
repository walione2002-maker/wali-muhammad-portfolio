'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'walione2002@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-36 pb-16 z-10"
      aria-label="About and Contact Section"
    >
      {/* Anchor for #about navigation */}
      <div id="about" className="-top-24 relative" />

      {/* Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#737373] mb-4">
          03 / Contact &amp; About
        </div>
        <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase">
          Let&apos;s<br />Talk
        </h2>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-[#1A1A1A]">
        {/* Left Column: Direct Large Email & Action */}
        <div className="lg:col-span-7">
          <div className="text-xs font-mono tracking-widest uppercase text-[#555555] mb-4">
            Direct Inquiry
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-8">
            <a
              href={`mailto:${emailAddress}?subject=Website%20Inquiry%20for%20Wali%20Muhammad`}
              className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-[#E8E4DE] hover:text-[#FF4D00] transition-colors break-all"
            >
              {emailAddress}
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-[#737373] hover:text-[#E8E4DE] border border-[#222222] hover:border-[#444444] px-3 py-1.5 transition-colors self-start cursor-pointer touch-manipulation"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[#888888] text-base sm:text-lg font-light leading-relaxed max-w-xl mb-10">
            Have a project in mind, an existing website that needs a complete rebuild, or a custom web app? Reach out anytime.
          </p>

          {/* Social and Profile Links */}
          <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-[#1A1A1A]">
            <a
              href={`mailto:${emailAddress}?subject=Website%20Inquiry%20for%20Wali%20Muhammad`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] border-b border-[#E8E4DE] hover:border-[#FF4D00] pb-1 transition-all cursor-pointer"
            >
              <span>Email Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/walione2002-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#737373] hover:text-[#E8E4DE] pb-1 transition-colors cursor-pointer"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/wali-muhammad-2002/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#737373] hover:text-[#E8E4DE] pb-1 transition-colors cursor-pointer"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: About Background */}
        <div className="lg:col-span-5 lg:border-l lg:border-[#1A1A1A] lg:pl-12">
          <div className="text-xs font-mono tracking-widest uppercase text-[#555555] mb-4">
            About
          </div>

          <div className="space-y-4 text-[#A3A3A3] text-sm sm:text-base font-light leading-relaxed">
            <p>
              I am Wali Muhammad — a web developer based in <strong>Karachi, Pakistan</strong>, currently completing my degree in <strong>FinTech at FAST-NUCES Karachi</strong>.
            </p>
            <p>
              I build production-grade web solutions: corporate showcases, e-commerce storefronts, 3D WebGL applications, and client platforms with clean architecture and modern performance standards.
            </p>
            <p>
              Available for freelance engagements and long-term contracts worldwide.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1A1A1A] grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#555555] block uppercase tracking-wider mb-1">Location</span>
              <span className="text-[#E8E4DE]">Karachi, Pakistan</span>
            </div>
            <div>
              <span className="text-[#555555] block uppercase tracking-wider mb-1">Education</span>
              <span className="text-[#E8E4DE]">FAST-NUCES Karachi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="mt-24 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#555555] safe-bottom">
        <p>© {new Date().getFullYear()} Wali Muhammad</p>
        <p>Karachi, Pakistan · Next.js 14 &amp; Three.js</p>
      </footer>
    </section>
  );
}

export default ContactSection;
