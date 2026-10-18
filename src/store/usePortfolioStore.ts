import { create } from 'zustand';

export type QualityTier = 'high' | 'medium' | 'low';

export type SectionName =
  | 'entry-gate'
  | 'executive-overview'
  | 'project-showroom'
  | 'tech-stack'
  | 'contact-portal';

export interface PortfolioState {
  // ── Gate state ──────────────────────────────────────────
  /** Whether the user has clicked "ENTER EXPERIENCE" */
  hasEntered: boolean;
  /** Whether the entry GSAP transition is currently playing */
  isTransitioning: boolean;

  // ── Scroll state ────────────────────────────────────────
  /** Normalized 0–1 Lenis scroll progress across full page height */
  scrollProgress: number;
  /** Currently active section derived from scrollProgress thresholds */
  activeSection: SectionName;
  /** Index 0–4 of active section (mirrors activeSection for numeric use) */
  activeSectionIndex: number;

  // ── Project interaction ─────────────────────────────────
  /** ID of the project card currently hovered/focused (null = none) */
  activeProjectId: string | null;

  // ── Performance ─────────────────────────────────────────
  /** GPU capability tier detected at mount (drives LOD, post-processing) */
  qualityTier: QualityTier;

  // ── WebGL resilience ────────────────────────────────────
  /** Incremented on WebGL context-loss to force Canvas remount */
  contextLossCount: number;

  // ── Actions ─────────────────────────────────────────────
  setHasEntered: (val: boolean) => void;
  setIsTransitioning: (val: boolean) => void;
  setScrollProgress: (val: number) => void;
  setActiveSection: (section: SectionName, index: number) => void;
  setActiveProjectId: (id: string | null) => void;
  setQualityTier: (tier: QualityTier) => void;
  incrementContextLoss: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  hasEntered: false,
  isTransitioning: false,
  scrollProgress: 0,
  activeSection: 'entry-gate',
  activeSectionIndex: 0,
  activeProjectId: null,
  qualityTier: 'high',
  contextLossCount: 0,

  setHasEntered: (val) => set({ hasEntered: val }),
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  setScrollProgress: (val) => set({ scrollProgress: val }),
  setActiveSection: (section, index) =>
    set({ activeSection: section, activeSectionIndex: index }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  incrementContextLoss: () =>
    set((s) => ({ contextLossCount: s.contextLossCount + 1 })),
}));
