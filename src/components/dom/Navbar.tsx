'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

interface NavItem {
  label: string;
  href: string;
  id: SectionName | string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'Services', href: '/services', id: 'services' },
  { label: '3D Lab', href: '/lab', id: 'lab' },
  { label: 'About', href: '/about', id: 'about' },
  { label: 'Contact', href: '/contact', id: 'contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = usePortfolioStore((s) => s.activeSection);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/94 backdrop-blur-md border-b border-[#1C1C1C] transition-all safe-top">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Expanded Wide Site Container: max-w-[1560px] */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Wordmark aligned with outer left grid edge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
          <Link
            href="/"
            className="group cursor-pointer flex items-center gap-2 truncate"
            aria-label="Wali Muhammad — Home"
          >
            <span className="font-display font-extrabold text-sm xs:text-base sm:text-lg text-[#E8E4DE] tracking-tight group-hover:text-[#FF4D00] transition-colors truncate">
              WALI MUHAMMAD
            </span>
          </Link>
          <span className="text-[11px] font-mono text-[#666666] hidden lg:inline shrink-0">
            / Karachi (UTC+5)
          </span>
        </div>

        {/* Desktop Navigation Links aligned with outer right grid edge (>= md) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center gap-6 lg:gap-8 m-0 p-0 list-none">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors cursor-pointer py-1.5 ${
                      isActive
                        ? 'text-[#FF4D00] font-semibold border-b border-[#FF4D00]'
                        : 'text-[#AAAAAA] hover:text-[#E8E4DE]'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="w-[1px] h-4 bg-[#262626]" />

          {/* Direct Inquiry CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#E8E4DE] hover:text-[#FF4D00] transition-colors cursor-pointer group"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle (44px min tap target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#E8E4DE] hover:text-[#FF4D00] border border-[#262626] bg-[#0E0E0E] active:scale-95 transition-all touch-manipulation shrink-0"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Centered Mobile Navigation Sheet Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[#080808]/98 backdrop-blur-xl border-b border-[#1C1C1C] px-6 py-8 flex flex-col justify-between overflow-y-auto safe-bottom z-50 animate-fadeIn"
        >
          <nav aria-label="Mobile Menu" className="my-auto py-4">
            <ul className="flex flex-col items-center gap-5 m-0 p-0 list-none text-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="w-full">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full py-3 min-h-[48px] text-lg sm:text-xl font-display font-bold uppercase tracking-wider transition-colors ${
                      activeSection === item.id
                        ? 'text-[#FF4D00]'
                        : 'text-[#CCCCCC] hover:text-[#E8E4DE]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-full max-w-xs mx-auto pt-6 border-t border-[#1C1C1C] flex flex-col gap-3 text-center">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 min-h-[48px] bg-[#FF4D00] text-[#080808] font-mono text-xs uppercase tracking-widest font-bold transition-colors touch-manipulation"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="text-[11px] font-mono text-[#666666] mt-2">
              Karachi, Pakistan (UTC+5) · Open for Q4 Engagements
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;