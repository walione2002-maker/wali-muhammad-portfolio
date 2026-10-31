'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const themeMode = usePortfolioStore((s) => s.themeMode);
  const activeDoorId = usePortfolioStore((s) => s.activeDoorId);
  const isDark = themeMode === 'dark' || activeDoorId !== null;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring configuration for the trailing halo ring
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Trailing Halo Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: springX,
          y: springY,
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: isHovered
            ? isDark
              ? 'rgba(52, 211, 153, 0.7)'
              : 'rgba(20, 20, 19, 0.6)'
            : isDark
            ? 'rgba(244, 243, 238, 0.35)'
            : 'rgba(20, 20, 19, 0.3)',
          backgroundColor: isHovered
            ? isDark
              ? 'rgba(52, 211, 153, 0.08)'
              : 'rgba(20, 20, 19, 0.05)'
            : 'transparent',
          transform: isClicking ? 'translate(-50%, -50%) scale(0.85)' : 'translate(-50%, -50%) scale(1)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          width: isHovered ? 8 : 5,
          height: isHovered ? 8 : 5,
          backgroundColor: isHovered
            ? isDark
              ? '#34D399'
              : '#141413'
            : isDark
            ? '#F4F3EE'
            : '#141413',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
        }}
      />
    </div>
  );
}

export default CustomCursor;
