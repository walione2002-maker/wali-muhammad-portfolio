'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  const navLinks = [
    { label: 'Work', href: '#websites', id: 'websites' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  if (!hasEntered) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Wali Muhammad Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38BDF8] animate-pulse" />
          <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            Wali Muhammad
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.id || (link.id === 'about' && activeSection === 'contact');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Availability Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Q4/2026</span>
          </div>

          {/* High-Contrast Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-display font-bold text-xs sm:text-sm tracking-wide shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/[0.05] text-slate-300 hover:text-white border border-white/10 active:scale-95 transition-transform touch-manipulation"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050816]/98 border-b border-white/10 px-6 py-6 pb-8 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 safe-bottom">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-300 transition-colors py-2 min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-display font-bold text-sm shadow-md mt-2 active:scale-95 transition-transform touch-manipulation"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
