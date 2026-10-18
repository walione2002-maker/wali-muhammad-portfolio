'use client';

import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function ContactPortal() {
  return (
    <section
      id="contact-portal"
      className="w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-8 sm:py-12 overflow-y-auto sm:overflow-visible"
      aria-label="Client Brief & Direct Contact Portal"
    >
      <div className="max-w-4xl my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>04 // Client Brief & Executive Gateway</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.08] drop-shadow-lg">
          Ready to construct your next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
            flagship digital platform?
          </span>
        </h2>

        <p className="mt-4 text-xs sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          Whether you require a quantitative risk engine, an Awwwards-caliber 3D web experience, or an enterprise full-stack deployment, I engineer systems designed to outperform.
        </p>

        {/* Quick Highlights */}
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
            <span>Guaranteed Core Web Vitals (95+)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
            <span>Zero-Downtime CI/CD Architecture</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
            <span>Institutional-Grade Security Protocols</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <a
            href="mailto:contact@walimuhammad.com"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent-gold text-slate-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_35px_rgba(201,169,110,0.6)] focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
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
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 text-xs sm:text-sm font-mono tracking-wider transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
            <span>github.com/walione2002-maker</span>
          </a>

          <a
            href="https://linkedin.com/in/walimuhammad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 text-xs sm:text-sm font-mono tracking-wider transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <p>© 2026 Wali Muhammad. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Engineered with Next.js 14, R3F & Three.js</span>
          <span>·</span>
          <span className="text-cyan-400">Vercel Global Edge Network</span>
        </p>
      </footer>
    </section>
  );
}

export default ContactPortal;
