'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'My Websites', href: '#websites' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#070B19]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="Wali Muhammad Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#38BDF8]" />
          <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            Wali Muhammad
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          {/* High-Contrast Contact Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/[0.05] text-slate-300 hover:text-white border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070B19]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-cyan-300 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm shadow-md mt-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
