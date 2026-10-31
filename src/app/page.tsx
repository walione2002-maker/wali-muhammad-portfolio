'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ScrollProgress } from '@/components/dom/ScrollProgress';
import { CustomCursor } from '@/components/dom/CustomCursor';
import { Navbar } from '@/components/dom/Navbar';
import { HeroSection } from '@/components/dom/HeroSection';
import { ServicesSection } from '@/components/dom/ServicesSection';
import { AboutSection } from '@/components/dom/AboutSection';
import { ContactSection } from '@/components/dom/ContactSection';
import { SiteFooter } from '@/components/dom/SiteFooter';
import { DoorProjectRoom } from '@/components/dom/DoorProjectRoom';

export default function HomePage() {
  const activeDoorId = usePortfolioStore((s) => s.activeDoorId);
  const themeMode = usePortfolioStore((s) => s.themeMode);

  return (
    <>
      {/* Top Global Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Awwwards-Tier Custom Magnetic Cursor */}
      <CustomCursor />

      <SmoothScroll>
        <div
          className={`relative min-h-screen w-full transition-colors duration-500 overflow-x-hidden ${
            activeDoorId !== null || themeMode === 'dark'
              ? 'bg-[#0B0D0C] text-[#F4F3EE]'
              : 'bg-[#F4F3EE] text-[#141413]'
          }`}
        >
          {/* Main Global Navigation Bar */}
          <Navbar />

          {/* Conditional Spatial Door Room vs. Benchmark Main Scroll Flow */}
          <AnimatePresence mode="wait">
            {activeDoorId !== null ? (
              /* SPATIAL DOOR PROJECT ROOM */
              <motion.main
                key={`room-${activeDoorId}`}
                id="main-content"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full bg-[#0B0D0C] min-h-screen"
              >
                <DoorProjectRoom />
                <ContactSection />
                <SiteFooter />
              </motion.main>
            ) : (
              /* BENCHMARK CONTINUOUS SCROLL JOURNEY */
              <motion.main
                key="main-scroll-flow"
                id="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 w-full overflow-x-hidden"
              >
                {/* 1. Hero Section (#hero — Light Studio #F4F3EE with 3D Mechanical Split-Flap Role Switcher & Annotated Portrait/3D Instrument) */}
                <HeroSection />

                {/* 2. Services / Architectural Doors Section (#doors-section — Dark Obsidian #0B0D0C GSAP Pinned Horizontal Walkthrough + 4-Door Lineup) */}
                <ServicesSection />

                {/* 3. Time Machine About Section (#my-story — Rotating Copper Radial Dial + Sticky Giant 2026->2022 Counter + 6 Milestones) */}
                <AboutSection />

                {/* 4. Contact Section (#contact — "Got a project? Let's build it together." + Interactive Project Brief Modal) */}
                <ContactSection />

                {/* 5. Site Footer */}
                <SiteFooter />
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </SmoothScroll>
    </>
  );
}
