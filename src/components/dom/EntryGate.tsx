'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useEntryTransition } from '@/hooks/useEntryTransition';

export function EntryGate() {
  const hasEntered = usePortfolioStore((s) => s.hasEntered);
  const isTransitioning = usePortfolioStore((s) => s.isTransitioning);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const { startEntry } = useEntryTransition();

  const handleEnter = useCallback(() => {
    startEntry(
      titleRef.current,
      subtitleRef.current,
      ctaRef.current,
      containerRef.current
    );
  }, [startEntry]);

  // Keyboard shortcut: Pressing Enter or Space triggers entry
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!hasEntered && !isTransitioning) {
          e.preventDefault();
          handleEnter();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasEntered, isTransitioning, handleEnter]);

  if (hasEntered && !isTransitioning) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]/92 backdrop-blur-md px-6 text-center select-none transition-opacity duration-300 safe-top safe-bottom"
      aria-label="Welcome Gate - Wali Muhammad"
    >
      {/* Category / Location Tag in minimal mono */}
      <div className="relative z-10 text-xs font-mono tracking-[0.3em] uppercase text-[#888888] mb-6 sm:mb-8">
        Karachi, PK · Portfolio 2026
      </div>

      {/* Monumental Editorial Headline */}
      <h1
        ref={titleRef}
        className="relative z-10 font-display font-extrabold text-5xl xs:text-6xl sm:text-8xl md:text-9xl text-[#E8E4DE] tracking-tight leading-[0.95] mb-5 sm:mb-6 max-w-6xl will-change-transform"
      >
        WALI MUHAMMAD
      </h1>

      {/* Minimal Subtitle */}
      <p
        ref={subtitleRef}
        className="relative z-10 font-sans text-sm sm:text-lg md:text-xl font-normal text-[#9CA3AF] max-w-xl mb-10 sm:mb-14 will-change-transform px-2 tracking-wide"
      >
        Web Developer &amp; Digital Product Engineer
      </p>

      {/* Primary Outlined Brutalist CTA */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-none">
        <button
          ref={ctaRef}
          onClick={handleEnter}
          disabled={isTransitioning}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 min-h-[52px] border border-[#E8E4DE] bg-transparent hover:bg-[#E8E4DE] text-[#E8E4DE] hover:text-[#080808] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 touch-manipulation"
        >
          <span>ENTER</span>
          <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-[11px] text-[#555555] font-mono tracking-wider uppercase">
          {isMobile ? (
            'Tap enter to begin'
          ) : (
            <>
              Press <kbd className="px-1.5 py-0.5 border border-[#333333] text-[#888888]">↵ Enter</kbd> to begin
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default EntryGate;
