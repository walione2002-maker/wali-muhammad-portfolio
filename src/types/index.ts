export type ProjectCategory =
  | 'Platform'
  | 'E-Commerce'
  | 'Creative Tech'
  | 'FinTech'
  | 'Web App';

export interface ProjectData {
  /** Unique slug identifier (kebab-case) */
  id: string;
  /** Display order index (0–7) */
  index: number;
  /** Project title as shown in the showroom */
  title: string;
  /** Short editorial tagline (≤ 12 words) */
  tagline: string;
  /** Full description paragraph for expanded state */
  description: string;
  /** Key client outcome / impact metric */
  impactMetric: string;
  /** Technology stack badges */
  stack: string[];
  /** Category / vertical label */
  category: ProjectCategory;
  /** Live production URL (Vercel deployment) */
  liveUrl: string;
  /** GitHub repository URL (source code) */
  githubUrl: string;
  /** Accent color hex for the orbital node emissive glow */
  accentColor: string;
  /**
   * Angular position (radians) of this project's orbital node
   * around the 3D centerpiece on the XZ plane.
   * Evenly distributed: index × (2π / 8)
   */
  orbitalAngle: number;
  /** Orbital ring radius from centerpiece origin */
  orbitalRadius: number;
}

export interface SectionConfig {
  id: number;
  name: string;
  scrollStart: number;
  scrollEnd: number;
}
