'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

interface NavItem {
  label: string;
  href: string;
  id: SectionName;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Capabilities', href: '#capabilities', id: 'capabilities' },
  { label: '3D Lab', href: '#lab', id: 'lab' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = usePortfolioStore((s) => s.activeSection);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/92 backdrop-blur-md border-b border-[#1C1C1C] transition-all">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="group cursor-pointer flex items-center gap-2"
            aria-label="Wali Muhammad — Home"
          >
            <span className="font-display font-extrabold text-base sm:text-lg text-[#E8E4DE] tracking-tight group-hover:text-[#FF4D00] transition-colors">
              WALI MUHAMMAD
            </span>
          </a>
          <span className="text-xs font-mono text-[#666666] hidden lg:inline">
            / Karachi (UTC+5)
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 m-0 p-0 list-none">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors cursor-pointer py-1.5 ${
                      isActive
                        ? 'text-[#FF4D00] font-semibold border-b border-[#FF4D00]'
                        : 'text-[#AAAAAA] hover:text-[#E8E4DE]'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="w-[1px] h-4 bg-[#262626]" />

          {/* Direct Inquiry CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] transition-colors cursor-pointer group"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#E8E4DE] hover:text-[#FF4D00] border border-[#262626] active:scale-95 transition-transform touch-manipulation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808] border-b border-[#1C1C1C] px-6 py-6 pb-8 flex flex-col gap-4 safe-bottom">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-mono tracking-widest uppercase py-2.5 min-h-[44px] flex items-center transition-colors ${
                      activeSection === item.id
                        ? 'text-[#FF4D00] font-semibold'
                        : 'text-[#AAAAAA] hover:text-[#E8E4DE]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] border border-[#E8E4DE] text-[#E8E4DE] hover:bg-[#E8E4DE] hover:text-[#080808] font-mono text-xs tracking-widest uppercase mt-2 transition-colors touch-manipulation"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
