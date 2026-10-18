'use client';

import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function ContactPortal() {
  return (
    <section
      id="contact-portal"
      className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 py-28 max-w-7xl mx-auto"
      aria-label="Client Brief & Direct Contact Portal"
    >
      <div className="max-w-4xl my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-mono uppercase tracking-[0.2em] mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>04 // Client Brief & Executive Gateway</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-white leading-[1.05]">
          Ready to construct your next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-amber-400">
            flagship digital platform?
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
          Whether you require a quantitative risk engine, an Awwwards-caliber 3D web experience, or an enterprise full-stack deployment, I engineer systems designed to outperform.
        </p>

        {/* Quick Highlights */}
        <div className="flex flex-wrap gap-6 mt-8 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-gold" />
            <span>Guaranteed Core Web Vitals (95+)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-gold" />
            <span>Zero-Downtime CI/CD Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-gold" />
            <span>Institutional-Grade Security Protocols</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-12">
          <a
            href="mailto:contact@walimuhammad.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-gold text-slate-950 font-medium text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_35px_rgba(201,169,110,0.5)] focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
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
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 text-xs sm:text-sm font-mono tracking-wider transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
            <span>github.com/walione2002-maker</span>
          </a>

          <a
            href="https://linkedin.com/in/walimuhammad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 text-xs sm:text-sm font-mono tracking-wider transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-16 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <p>© 2026 Wali Muhammad. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Engineered with Next.js 14, R3F & Three.js</span>
          <span>·</span>
          <span>Cloudflare Edge</span>
        </p>
      </footer>
    </section>
  );
}

export default ContactPortal;
