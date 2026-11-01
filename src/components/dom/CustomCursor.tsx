'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isClickingRef = useRef<boolean>(false);

  const themeMode = usePortfolioStore((s) => s.themeMode);
  const activeDoorId = usePortfolioStore((s) => s.activeDoorId);
  const isDark = themeMode === 'dark' || activeDoorId !== null;

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Direct hardware-accelerated GSAP quickTo setters for 120FPS trailing ring & instant center dot
    const quickDotX = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power2.out' });
    const quickDotY = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power2.out' });

    const quickRingX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power3.out' });
    const quickRingY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power3.out' });

    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      }
      quickDotX(clientX);
      quickDotY(clientY);
      quickRingX(clientX);
      quickRingY(clientY);
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      gsap.to(ring, {
        scale: isHoveredRef.current ? 1.15 : 0.8,
        duration: 0.12,
        ease: 'power1.out',
      });
      gsap.to(dot, { scale: 0.7, duration: 0.1 });
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      gsap.to(ring, {
        scale: isHoveredRef.current ? 1.4 : 1,
        duration: 0.16,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: isHoveredRef.current ? 1.4 : 1,
        duration: 0.14,
      });
    };

    // Fast pointerover / pointerout delegation for interactive element hover detection (NO mousemove DOM searches!)
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      if (interactive && !isHoveredRef.current) {
        isHoveredRef.current = true;
        ring.classList.add('cursor-hover-active');
        gsap.to(ring, {
          scale: 1.45,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dot, {
          scale: 1.5,
          duration: 0.18,
          overwrite: 'auto',
        });
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      if (interactive && isHoveredRef.current) {
        isHoveredRef.current = false;
        ring.classList.remove('cursor-hover-active');
        gsap.to(ring, {
          scale: 1,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.18,
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer Trailing Halo Ring (GSAP quickTo at 0.18s) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform transform-gpu transition-[border-color,background-color] duration-200 ${
          isDark
            ? 'border-white/35 bg-white/[0.02] [&.cursor-hover-active]:border-emerald-400/80 [&.cursor-hover-active]:bg-emerald-400/[0.08]'
            : 'border-black/35 bg-black/[0.02] [&.cursor-hover-active]:border-black/75 [&.cursor-hover-active]:bg-black/[0.06]'
        }`}
      />

      {/* Center Precision Dot (GSAP quickTo at 0.04s) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform transform-gpu transition-colors duration-200 ${
          isDark ? 'bg-white' : 'bg-[#141413]'
        }`}
      />
    </div>
  );
}

export default CustomCursor;
