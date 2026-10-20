export type ProjectCategory = string;

export interface ProjectData {
  /** Unique slug identifier (kebab-case) */
  id: string;
  /** Display order index (0–7) */
  index: number;
  /** Project title as shown in the showroom */
  title: string;
  /** Short editorial tagline */
  tagline: string;
  /** Full description paragraph */
  description: string;
  /** Key client outcome / impact metric */
  impactMetric: string;
  /** Technology stack badges */
  stack: string[];
  /** Category / vertical label */
  category: ProjectCategory;
  /** Live production URL (Vercel deployment) */
  liveUrl: string;
  /** Clean live display domain for browser bar mockup */
  displayUrl?: string;
  /** GitHub repository URL (source code) */
  githubUrl: string;
  /** Accent color hex */
  accentColor: string;
  /** Angular position (radians) */
  orbitalAngle: number;
  /** Orbital ring radius */
  orbitalRadius: number;
}

export interface SectionConfig {
  id: number;
  name: string;
  scrollStart: number;
  scrollEnd: number;
}
