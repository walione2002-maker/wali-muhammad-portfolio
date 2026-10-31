'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { type DoorCategoryId } from '@/types';

interface NavDoorItem {
  id: DoorCategoryId;
  label: string;
}

const DOOR_ITEMS: NavDoorItem[] = [
  { id: 'web-development', label: 'Web Development' },
  { id: 'fintech-apps', label: 'FinTech & Apps' },
  { id: 'spatial-web', label: '3D & Spatial Web' },
  { id: 'systems-archive', label: 'B2B & Digital Suites' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  const themeMode = usePortfolioStore((s) => s.themeMode);
  const activeDoorId = usePortfolioStore((s) => s.activeDoorId);
  const openDoorRoom = usePortfolioStore((s) => s.openDoorRoom);
  const closeDoorRoom = usePortfolioStore((s) => s.closeDoorRoom);
  const setProjectModalOpen = usePortfolioStore((s) => s.setProjectModalOpen);

  const isDark = themeMode === 'dark' || activeDoorId !== null;

  // Live ticking clock in Asia/Karachi timezone
  useEffect(() => {
    const updateKarachiTime = () => {
      const now = new Date();
      try {
        const timeStr = now
          .toLocaleTimeString('en-US', {
            timeZone: 'Asia/Karachi',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
          .toLowerCase()
          .replace(/\s+/g, '');

        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).formatToParts(now);

        const day = parts.find((p) => p.type === 'day')?.value ?? '';
        const month = parts.find((p) => p.type === 'month')?.value ?? '';
        const year = parts.find((p) => p.type === 'year')?.value ?? '';

        setTimeString(`${timeStr} · ${day} ${month}, ${year}`);
      } catch {
        setTimeString('Karachi, PK (UTC+5)');
      }
    };

    updateKarachiTime();
    const interval = setInterval(updateKarachiTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeDoorId !== null) {
      closeDoorRoom();
    }
    const el = document.getElementById('hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#hero';
    }
  };

  const handleDoorClick = (doorId: DoorCategoryId) => {
    openDoorRoom(doorId);
    const doorsSection = document.getElementById('doors-section');
    if (doorsSection) {
      doorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeDoorId !== null) {
      closeDoorRoom();
    }
    const el = document.getElementById('my-story') || document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#my-story';
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setProjectModalOpen(true, 'Web & E-Commerce');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0D0C]/90 backdrop-blur-md text-[#F4F3EE] border-b border-white/10'
          : 'bg-[#F4F3EE]/90 backdrop-blur-md text-[#141413] border-b border-black/10'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Side: Brand Name & Navigation Items */}
        <div className="flex items-center gap-6 xl:gap-8">
          {/* Brand Wordmark */}
          <Link
            href="/"
            onClick={handleHomeClick}
            className="group flex items-center gap-2 cursor-pointer shrink-0"
            aria-label="Wali Muhammad — Home"
          >
            <span
              className={`font-sans font-bold text-base sm:text-lg tracking-tight transition-colors ${
                isDark ? 'text-[#F4F3EE]' : 'text-[#141413]'
              }`}
            >
              Wali Muhammad
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
            {/* Home Link */}
            <button
              onClick={handleHomeClick}
              className={`relative py-1 text-xs xl:text-sm font-medium tracking-tight transition-colors ${
                activeDoorId === null
                  ? isDark
                    ? 'text-[#F4F3EE]'
                    : 'text-[#141413]'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Home
              {activeDoorId === null && (
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                    isDark ? 'bg-[#F4F3EE]' : 'bg-[#141413]'
                  }`}
                />
              )}
            </button>

            {/* 4 Architectural Doors */}
            {DOOR_ITEMS.map((door) => {
              const isActive = activeDoorId === door.id;
              return (
                <button
                  key={door.id}
                  onClick={() => handleDoorClick(door.id)}
                  className={`relative py-1 text-xs xl:text-sm font-medium tracking-tight transition-colors ${
                    isActive
                      ? isDark
                        ? 'text-[#F4F3EE]'
                        : 'text-[#141413]'
                      : isDark
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {door.label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        isDark ? 'bg-[#F4F3EE]' : 'bg-[#141413]'
                      }`}
                    />
                  )}
                </button>
              );
            })}

            {/* My Story */}
            <button
              onClick={handleStoryClick}
              className={`relative py-1 text-xs xl:text-sm font-medium tracking-tight transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
              }`}
            >
              My Story
            </button>

            {/* Contact */}
            <button
              onClick={handleContactClick}
              className={`relative py-1 text-xs xl:text-sm font-medium tracking-tight transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Right Side: Live Telemetry Strip & Quick Action */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Live Ticking Telemetry Strip */}
          <div
            className={`hidden md:flex items-center gap-3 text-xs font-mono tracking-wider transition-colors ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-70" />
              <span>Location: Karachi</span>
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5 tabular-nums" suppressHydrationWarning>
              <Clock className="w-3.5 h-3.5 opacity-70" />
              <span>{timeString || '10:22pm · 31 October, 2026'}</span>
            </span>
          </div>

          {/* Quick Talk CTA (Visible on lg+) */}
          <button
            onClick={() => setProjectModalOpen(true, 'Web Development')}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isDark
                ? 'border-white/20 text-[#F4F3EE] hover:bg-white/10'
                : 'border-black/20 text-[#141413] hover:bg-black/5'
            }`}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle (44px min tap target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDark
                ? 'border-white/20 text-[#F4F3EE] hover:bg-white/10'
                : 'border-black/20 text-[#141413] hover:bg-black/5'
            }`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sheet Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 px-6 py-8 flex flex-col justify-between overflow-y-auto safe-bottom z-50 ${
            isDark
              ? 'bg-[#0B0D0C]/98 backdrop-blur-xl text-[#F4F3EE]'
              : 'bg-[#F4F3EE]/98 backdrop-blur-xl text-[#141413]'
          }`}
        >
          <nav aria-label="Mobile Menu" className="my-auto py-4">
            <ul className="flex flex-col items-center gap-5 m-0 p-0 list-none text-center">
              <li>
                <button
                  onClick={(e) => {
                    handleHomeClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xl font-bold tracking-tight py-2 transition-colors ${
                    activeDoorId === null ? 'text-emerald-500 font-extrabold' : 'opacity-80'
                  }`}
                >
                  Home
                </button>
              </li>

              {DOOR_ITEMS.map((door) => (
                <li key={door.id}>
                  <button
                    onClick={() => {
                      handleDoorClick(door.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-xl font-bold tracking-tight py-2 transition-colors ${
                      activeDoorId === door.id ? 'text-emerald-500 font-extrabold' : 'opacity-80'
                    }`}
                  >
                    {door.label}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={(e) => {
                    handleStoryClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xl font-bold tracking-tight py-2 opacity-80 hover:opacity-100 transition-colors"
                >
                  My Story
                </button>
              </li>

              <li>
                <button
                  onClick={(e) => {
                    handleContactClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xl font-bold tracking-tight py-2 opacity-80 hover:opacity-100 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Bottom Telemetry & CTA */}
          <div
            className={`w-full max-w-sm mx-auto pt-6 border-t flex flex-col gap-4 text-center ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setProjectModalOpen(true, 'Web Development');
              }}
              className="w-full py-3.5 rounded-full bg-[#141413] text-[#F4F3EE] font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono opacity-60 tracking-wider">
              <span>Location: Karachi · </span>
              <span suppressHydrationWarning>{timeString || 'Asia/Karachi (UTC+5)'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
