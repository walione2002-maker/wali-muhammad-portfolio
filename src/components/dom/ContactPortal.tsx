'use client';

import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function ContactPortal() {
  return (
    <section
      id="contact-portal"
      className="w-full h-[100dvh] max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 flex flex-col justify-between py-4 sm:py-12 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] overflow-y-auto"
      aria-label="Client Brief & Direct Contact Portal"
    >
      <div className="max-w-4xl my-auto py-2">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-2 sm:mb-4 shadow-[0_0_20px_rgba(255,184,0,0.25)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>04 // Client Brief & Executive Gateway</span>
        </div>

        <h2 className="text-2xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.08] drop-shadow-lg">
          Ready to construct your next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-violet-400 drop-shadow-[0_0_30px_rgba(255,184,0,0.4)]">
            flagship digital platform?
          </span>
        </h2>

        <p className="mt-2.5 sm:mt-4 text-[11px] sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          Whether you require a quantitative risk engine, an Awwwards-caliber 3D web experience, or an enterprise full-stack deployment, I engineer systems designed to outperform.
        </p>

        {/* Quick Highlights */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6 text-[10px] sm:text-xs font-mono text-slate-200">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] px-3 py-1.5 rounded-lg border border-amber-400/30 shadow-[0_0_12px_rgba(255,184,0,0.15)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Core Web Vitals (95+)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] px-3 py-1.5 rounded-lg border border-cyan-400/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero-Downtime CI/CD</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] px-3 py-1.5 rounded-lg border border-pink-400/30 shadow-[0_0_12px_rgba(236,72,153,0.15)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
            <span>Institutional Security</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mt-6 sm:mt-8">
          <a
            href="mailto:contact@devwalimuhammad.pages.dev"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,184,0,0.7)] focus:outline-none focus:ring-2 focus:ring-amber-400/50 touch-manipulation cursor-pointer"
            aria-label="Direct Email Inquiry to Wali Muhammad"
          >
            <Mail className="w-4 h-4 text-slate-950" />
            <span>Initiate Project Brief</span>
            <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://github.com/walione2002-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-slate-100 text-xs sm:text-sm font-mono tracking-wider transition-colors touch-manipulation cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
            <span>github.com/walione2002-maker</span>
          </a>

          <a
            href="https://linkedin.com/in/walimuhammad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-slate-100 text-xs sm:text-sm font-mono tracking-wider transition-colors touch-manipulation cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-4 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-slate-400">
        <p>© 2026 Wali Muhammad. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Engineered with Next.js 14, R3F & Three.js</span>
          <span>·</span>
          <span className="text-cyan-400 font-semibold">Cloudflare Pages Edge Deployment</span>
        </p>
      </footer>
    </section>
  );
}

export default ContactPortal;
