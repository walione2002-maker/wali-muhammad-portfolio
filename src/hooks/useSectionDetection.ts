'use client';

import { useEffect } from 'react';
import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

export function useSectionDetection() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);

  useEffect(() => {
    let newIndex = 0;
    let newSection: SectionName = 'entry-gate';

    if (scrollProgress >= 0.85) {
      newIndex = 4;
      newSection = 'contact-portal';
    } else if (scrollProgress >= 0.66) {
      newIndex = 3;
      newSection = 'tech-stack';
    } else if (scrollProgress >= 0.22) {
      newIndex = 2;
      newSection = 'project-showroom';
    } else if (scrollProgress >= 0.04) {
      newIndex = 1;
      newSection = 'executive-overview';
    } else {
      newIndex = 0;
      newSection = 'entry-gate';
    }

    if (newIndex !== activeSectionIndex) {
      setActiveSection(newSection, newIndex);
    }
  }, [scrollProgress, activeSectionIndex, setActiveSection]);
}

export default useSectionDetection;
