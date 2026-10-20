import { create } from 'zustand';

export type QualityTier = 'high' | 'medium' | 'low';

export type SectionName = 'hero' | 'websites' | 'services' | 'contact';

export interface PortfolioState {
  // Gate state (unlocked immediately on load)
  hasEntered: boolean;
  isTransitioning: boolean;

  // Scroll state
  scrollProgress: number;
  activeSection: SectionName;
  activeSectionIndex: number;

  // Project interaction
  activeProjectId: string | null;
  activeProjectIndex: number;

  // Performance
  qualityTier: QualityTier;
  isMobile: boolean;

  // WebGL resilience
  contextLossCount: number;

  // Actions
  setHasEntered: (val: boolean) => void;
  setIsTransitioning: (val: boolean) => void;
  setScrollProgress: (val: number) => void;
  setActiveSection: (section: SectionName, index: number) => void;
  setActiveProjectId: (id: string | null) => void;
  setActiveProjectIndex: (index: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  setIsMobile: (val: boolean) => void;
  incrementContextLoss: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  hasEntered: true, // Immediate scroll from millisecond zero
  isTransitioning: false,
  scrollProgress: 0,
  activeSection: 'hero',
  activeSectionIndex: 0,
  activeProjectId: null,
  activeProjectIndex: 0,
  qualityTier: 'high',
  isMobile: false,
  contextLossCount: 0,

  setHasEntered: (val) => set({ hasEntered: val }),
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  setScrollProgress: (val) => set({ scrollProgress: val }),
  setActiveSection: (section, index) =>
    set({ activeSection: section, activeSectionIndex: index }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setIsMobile: (val) => set({ isMobile: val }),
  incrementContextLoss: () =>
    set((s) => ({ contextLossCount: s.contextLossCount + 1 })),
}));
