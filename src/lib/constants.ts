export const SECTION_THRESHOLDS = [
  { index: 0, name: 'hero', min: 0.0, max: 0.2 },
  { index: 1, name: 'websites', min: 0.2, max: 0.65 },
  { index: 2, name: 'services', min: 0.65, max: 0.82 },
  { index: 3, name: 'contact', min: 0.82, max: 1.0 },
] as const;

export const COLOR_PALETTE = {
  bgPrimary: '#050816',
  bgSecondary: '#0B1120',
  bgGlass: 'rgba(15, 23, 42, 0.72)',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  accentTeal: '#64FFDA',
  accentCyan: '#38BDF8',
  accentIndigo: '#6366F1',
  accentGold: '#F59E0B',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.18)',
  titanium: '#CBD5E1',
};

export const MOTION_TIMINGS = {
  entryGateDuration: 1.1,
  hoverTransition: 0.3,
  sectionDuration: 0.8,
  splineTension: 0.35,
};
