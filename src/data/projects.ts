import { type ProjectData } from '@/types';

const ORBITAL_RADIUS = 4.5;
const toAngle = (i: number) => i * ((2 * Math.PI) / 8);

export const PROJECTS: ProjectData[] = [
  {
    id: 'zynnco-chauffeurs',
    index: 0,
    title: 'Zynnco Chauffeurs',
    tagline: 'Luxury Chauffeur & Executive Fleet Booking Platform',
    impactMetric: '+68% Booking Conversion · Sub-800ms Fleet Dispatch Search',
    description:
      'High-conversion luxury chauffeur and executive fleet reservation platform engineered for high-net-worth clientele. Features instant route distance calculation, dynamic vehicle class selection, Stripe checkout integration, and sub-second Core Web Vitals delivered on Next.js and Tailwind CSS.',
    stack: ['Next.js', 'Tailwind CSS', 'UI/UX Architecture', 'Vercel'],
    category: 'Platform',
    liveUrl: 'https://zynnco-rkgn4e6vy-wali-muhammad-s-projects.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/zynnco',
    accentColor: '#C9A96E', // Champagne gold
    orbitalAngle: toAngle(0),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'corpassion-events',
    index: 1,
    title: 'Corpassion Events',
    tagline: 'High-End Event Architecture & Experience Platform',
    impactMetric: '3.4x Inbound Corporate Lead Growth · 60 FPS Micro-Interactions',
    description:
      'Bespoke digital architecture platform designed for premier corporate events and experiential brand activations. Integrates fluid scroll choreography, interactive multi-category project showcases, and a high-converting client inquiry funnel running on modern edge infrastructure.',
    stack: ['Modern Web Stack', 'Interactive Motion', 'Vercel'],
    category: 'Platform',
    liveUrl: 'https://corpassion-events.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/corpassion-events',
    accentColor: '#8B5CF6', // Violet
    orbitalAngle: toAngle(1),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: '3d-resume-builder',
    index: 2,
    title: '3D Interactive Resume Builder',
    tagline: 'Spatial 3D & WebGL Resume Generation App',
    impactMetric: 'Zero-Latency 3D Canvas Manipulation · Instant PDF Vector Output',
    description:
      'Spatial computing web application empowering professionals to build, customize, and inspect resumes inside an interactive 3D WebGL viewport. Engineered with Three.js, dynamic geometry transformations, and high-fidelity print-ready vector PDF document export.',
    stack: ['Three.js', 'WebGL', 'JavaScript', 'Vercel'],
    category: 'Creative Tech',
    liveUrl: 'https://3d-resume-builder-self.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/resume-australia',
    accentColor: '#06B6D4', // Cyan
    orbitalAngle: toAngle(2),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'nexus-bay',
    index: 3,
    title: 'Nexus Bay',
    tagline: 'Full-Stack Digital Platform & Commercial Web Experience',
    impactMetric: '99.99% Edge Availability · 100/100 Lighthouse Performance',
    description:
      'Enterprise-scale full-stack digital platform showcasing high-performance commercial product catalogs and interactive digital experiences. Built with strict TypeScript, modular Next.js App Router components, and edge caching for seamless content delivery.',
    stack: ['Next.js', 'TypeScript', 'Responsive UI', 'Vercel'],
    category: 'Platform',
    liveUrl: 'https://nexus-bay.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/nexusbay-digital',
    accentColor: '#3B82F6', // Blue
    orbitalAngle: toAngle(3),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'amirs-kalonji-oil',
    index: 4,
    title: 'Amirs Kalonji Oil',
    tagline: 'Direct-to-Consumer E-Commerce & Brand Storefront',
    impactMetric: '+44% Checkout Completion · Sub-Second Core Web Vitals',
    description:
      'Conversion-engineered direct-to-consumer e-commerce storefront for an organic wellness brand. Incorporates clinical trust-signal architecture, dynamic product storytelling, frictionless cart checkout workflows, and edge SEO optimization.',
    stack: ['Conversion UI', 'Web Performance', 'Vercel'],
    category: 'E-Commerce',
    liveUrl: 'https://amirs-kalonji-oil.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/amirs-kalonji-oil-website',
    accentColor: '#10B981', // Emerald
    orbitalAngle: toAngle(4),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'digital-wedding-suite',
    index: 5,
    title: 'Bespoke Digital Wedding Suite',
    tagline: 'Interactive Motion-Driven Event Invitation & RSVP Web App',
    impactMetric: '100% Mobile Guest RSVP Completion · Cinematic Scroll Orchestration',
    description:
      'Luxury bespoke digital invitation and guest management web application. Features interactive cinematic scroll animations, real-time database guest attendance tracking, Google Maps directions, and custom typographic motion design.',
    stack: ['Custom Animations', 'Frontend Engineering', 'Vercel'],
    category: 'Web App',
    liveUrl: 'https://fatima-ali-wedding.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/fatima-ali-wedding',
    accentColor: '#F43F5E', // Rose
    orbitalAngle: toAngle(5),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'commercial-sanitary-hub',
    index: 6,
    title: 'Commercial Sanitary & Hardware Hub',
    tagline: 'B2B/B2C Product Catalog & Retail Web System',
    impactMetric: '10,000+ SKU Instant Search Index · 2.8x B2B Inquiry Growth',
    description:
      'Robust B2B and B2C commercial hardware catalog and purchasing platform. Engineered with lightning-fast faceted category filtering, technical SEO schema markup, commercial quote request flows, and responsive mobile architecture.',
    stack: ['Full-Stack Web Architecture', 'Technical SEO', 'Vercel'],
    category: 'E-Commerce',
    liveUrl: 'https://federal-sanitary.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/federal-sanitary',
    accentColor: '#F59E0B', // Amber
    orbitalAngle: toAngle(6),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'fintech-risk-engine',
    index: 7,
    title: 'FinTech Market Structure & Risk Engine',
    tagline: 'Quantitative Position Sizing, Technical Analysis & Risk Management System',
    impactMetric: 'Sub-15ms Algorithmic Calculation · Real-Time Portfolio Drawdown Guard',
    description:
      'Institutional quantitative finance analysis system built on Python and TypeScript. Computes dynamic position sizing using fractional Kelly models, tracks multi-timeframe market structure anomalies, and provides real-time portfolio risk dashboards for active traders.',
    stack: ['Python', 'TypeScript', 'Financial Algorithms'],
    category: 'FinTech',
    liveUrl: 'https://market-structure.vercel.app',
    githubUrl: 'https://github.com/walione2002-maker/fintech-risk-engine',
    accentColor: '#EF4444', // Red
    orbitalAngle: toAngle(7),
    orbitalRadius: ORBITAL_RADIUS,
  },
];
