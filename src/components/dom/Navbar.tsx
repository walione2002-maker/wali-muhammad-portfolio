'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-[#1A1A1A] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="group cursor-pointer flex items-center gap-2"
          aria-label="Wali Muhammad Home"
        >
          <span className="font-display font-bold text-base sm:text-lg text-[#E8E4DE] tracking-tight group-hover:text-[#FF4D00] transition-colors">
            WALI MUHAMMAD
          </span>
          <span className="text-[11px] font-mono text-[#555555] hidden sm:inline">
            / Karachi
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.id || (link.id === 'about' && activeSection === 'contact');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#FF4D00] font-semibold'
                      : 'text-[#888888] hover:text-[#E8E4DE]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="w-[1px] h-4 bg-[#222222]" />

          {/* Minimal Text Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] transition-colors cursor-pointer group"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#E8E4DE] hover:text-[#FF4D00] border border-[#222222] active:scale-95 transition-transform touch-manipulation"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808] border-b border-[#1A1A1A] px-6 py-6 pb-8 flex flex-col gap-4 safe-bottom">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono tracking-widest uppercase text-[#888888] hover:text-[#FF4D00] transition-colors py-2 min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] border border-[#E8E4DE] text-[#E8E4DE] hover:bg-[#E8E4DE] hover:text-[#080808] font-mono text-xs tracking-widest uppercase mt-2 transition-colors touch-manipulation"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
