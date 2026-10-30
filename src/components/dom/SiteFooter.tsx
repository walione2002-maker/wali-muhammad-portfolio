'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 border-t border-[#1A1A1A] z-10 safe-bottom">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs font-mono text-[#666666] mb-8">
        <div>
          <p className="text-[#E8E4DE] font-display font-bold text-sm tracking-tight">WALI MUHAMMAD</p>
          <p className="mt-1 text-[#666666]">
            FinTech @ FAST-NUCES Karachi · Web Developer &amp; Digital Product Engineer
          </p>
          <p className="text-[#444444] mt-0.5">
            © {new Date().getFullYear()} Wali Muhammad. All rights reserved.
          </p>
        </div>

        {/* Sitemap Internal Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6">
          <Link href="/work" className="hover:text-[#FF4D00] transition-colors">
            Work Index
          </Link>
          <Link href="/services" className="hover:text-[#FF4D00] transition-colors">
            Services
          </Link>
          <Link href="/lab" className="hover:text-[#FF4D00] transition-colors">
            3D Lab
          </Link>
          <Link href="/about" className="hover:text-[#FF4D00] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#FF4D00] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Social and Top */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/walione2002-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8E4DE] transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/wali-muhammad-2002/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8E4DE] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="#main-content"
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