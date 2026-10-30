'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 border-t border-[#1A1A1A] z-10 safe-bottom">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-mono text-[#666666]">
        <div>
          <p>© {new Date().getFullYear()} Wali Muhammad. All rights reserved.</p>
          <p className="mt-1 text-[#444444]">
            FinTech @ FAST-NUCES Karachi · Web Developer &amp; Product Engineer
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-[#444444]">
            Next.js 14 · Three.js · Cloudflare Pages
          </span>

          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-[#888888] hover:text-[#FF4D00] transition-colors"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
