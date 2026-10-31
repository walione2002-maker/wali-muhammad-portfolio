'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function SiteFooter() {
  const openDoorRoom = usePortfolioStore((s) => s.openDoorRoom);
  const setProjectModalOpen = usePortfolioStore((s) => s.setProjectModalOpen);

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D0C] text-[#F4F3EE] border-t border-white/10 relative z-10 safe-bottom">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-white/10">
          {/* Brand & Academic Credentials */}
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#F4F3EE]">
              Wali Muhammad
            </span>
            <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-mono max-w-sm leading-relaxed">
              Full-Stack Engineer, FinTech Systems Architect at FAST-NUCES Karachi &amp; 3D WebGL Developer.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for International Select Engagements</span>
            </div>
          </div>

          {/* Quick Production Chambers */}
          <div className="md:col-span-4 flex flex-col items-start">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
              Production Chambers
            </span>
            <div className="flex flex-col space-y-2.5 text-xs font-mono">
              <button
                onClick={() => openDoorRoom('web-development')}
                className="text-zinc-400 hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span>Web Development</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => openDoorRoom('fintech-apps')}
                className="text-zinc-400 hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span>FinTech &amp; Web Applications</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => openDoorRoom('spatial-web')}
                className="text-zinc-400 hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span>3D Spatial Web &amp; 60 FPS Lab</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => openDoorRoom('systems-archive')}
                className="text-zinc-400 hover:text-white transition-colors text-left flex items-center gap-1.5"
              >
                <span>B2B Commercial Hubs &amp; Suites</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </button>
            </div>
          </div>

          {/* Navigation & Action */}
          <div className="md:col-span-3 flex flex-col items-start">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
              Connect &amp; Inquire
            </span>
            <div className="flex flex-col space-y-2.5 text-xs font-mono">
              <button
                onClick={() => setProjectModalOpen(true, 'Web & E-Commerce')}
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-left"
              >
                Start a Project Consultation ↗
              </button>
              <a
                href="#my-story"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Time Machine / My Story
              </a>
              <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors">
                Independent 3D Lab
              </Link>
              <Link href="/work" className="text-zinc-400 hover:text-white transition-colors">
                Full Production Archive
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright, Profiles, and Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} Wali Muhammad. Engineered with Next.js 14, Three.js &amp; GSAP.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/walione2002-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/wali-muhammad-2002/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={handleScrollTop}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 px-2.5 rounded-full border border-white/10 hover:border-white/30"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
