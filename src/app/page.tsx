'use client';

import React from 'react';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { Navbar } from '@/components/dom/Navbar';
import { HeroSection } from '@/components/dom/HeroSection';
import { WebsitesSection } from '@/components/dom/WebsitesSection';
import { ServicesSection } from '@/components/dom/ServicesSection';
import { InteractiveLab } from '@/components/dom/InteractiveLab';
import { ProcessSection } from '@/components/dom/ProcessSection';
import { AboutSection } from '@/components/dom/AboutSection';
import { ContactSection } from '@/components/dom/ContactSection';
import { SiteFooter } from '@/components/dom/SiteFooter';
import { ScrollProgress } from '@/components/dom/ScrollProgress';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />

      <SmoothScroll>
        <div className="relative min-h-screen w-full bg-[#080808] text-[#E8E4DE] overflow-x-hidden selection:bg-[#FF4D00] selection:text-[#080808]">
          {/* Main Navigation Header */}
          <Navbar />

          {/* Core Flowing Architectural Sections */}
          <main id="main-content" className="relative z-10 w-full">
            <HeroSection />
            <WebsitesSection />
            <ServicesSection />
            <InteractiveLab />
            <ProcessSection />
            <AboutSection />
            <ContactSection />
            <SiteFooter />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}
