'use client';

import { usePortfolioStore } from '@/store/usePortfolioStore';

export function useScrollProgress() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  return {
    scrollProgress,
    activeSection,
    activeSectionIndex,
  };
}

export default useScrollProgress;
