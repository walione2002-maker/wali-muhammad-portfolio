'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, MapPin, GraduationCap, Send, ArrowUpRight } from 'lucide-react';

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
      <div id="about" className="-top-28 relative" />

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: About Wali Muhammad */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Developer Background</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6">
            Hi, I&apos;m Wali Muhammad
          </h2>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            <p>
              I am a Web Developer and digital product engineer based in <strong>Karachi, Pakistan</strong>.
              Currently completing my degree in <strong>FinTech at FAST-NUCES Karachi</strong>, I combine modern software engineering with practical commercial understanding.
            </p>
            <p>
              Over the past few years, I have built and deployed commercial e-commerce storefronts, corporate booking systems, interactive 3D web applications, and digital showcases.
            </p>
            <p>
              Whether you need a high-converting marketing website, an e-commerce platform, or a bespoke web application, I deliver clean architecture, dependable performance, and transparent communication.
            </p>
          </div>

          {/* Quick Specs Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0B1120]/80 border border-white/10 backdrop-blur-md">
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase tracking-wider">Location</span>
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1120]/80 border border-white/10 backdrop-blur-md">
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase tracking-wider">Education</span>
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>FAST-NUCES Karachi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Contact Portal */}
        <div className="lg:col-span-6 rounded-3xl p-8 sm:p-12 bg-[#0B1120]/90 backdrop-blur-xl border border-white/15 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available For New Projects</span>
          </div>

          <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3 tracking-tight">
            Let&apos;s Build Something Great
          </h3>

          <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
            Have a website, digital store, or custom platform you want to build? Reach out directly and let&apos;s discuss your timeline and vision.
          </p>

          {/* 1-Click Copy Email Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Direct Email</span>
                <span className="text-sm sm:text-base font-mono text-white font-medium truncate block">{emailAddress}</span>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer border border-white/10 shrink-0"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Mailto Button */}
            <a
              href={`mailto:${emailAddress}?subject=Website%20Inquiry%20for%20Wali%20Muhammad`}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-display font-bold text-base shadow-glow transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Email Me Directly</span>
            </a>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="https://github.com/walione2002-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://www.linkedin.com/in/wali-muhammad-2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Wali Muhammad. All rights reserved.</p>
        <p className="flex items-center gap-1.5 font-mono">
          <span>Built with Next.js 14, Tailwind CSS &amp; Three.js</span>
          <span>·</span>
          <span>Karachi, Pakistan</span>
        </p>
      </footer>
    </section>
  );
}

export default ContactSection;
