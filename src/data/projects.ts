import { type ProjectData } from '@/types';

const ORBITAL_RADIUS = 4.5;
const toAngle = (i: number) => i * ((2 * Math.PI) / 6);

export const PROJECTS: ProjectData[] = [
  {
    id: 'corpassion-events',
    index: 0,
    title: 'Corpassion Events',
    tagline: 'High-End Event Architecture & Experiences',
    impactMetric: 'Interactive Portfolio & Direct Client Inquiry Funnel',
    description:
      'A bespoke digital portfolio and inquiry platform engineered for a luxury event planning and brand experience company.',
    challenge:
      'The client needed a digital presence that matched the visual prestige of high-budget corporate events while maintaining sub-second page loads on mobile.',
    solution:
      'Architected a fluid Next.js platform with modular media layouts, responsive inquiry funnels, and optimized image delivery on edge infrastructure.',
    role: 'Lead Frontend Engineer & UI Architect',
    year: '2025',
    featured: true,
    stack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    category: 'Commercial Event Architecture',
    liveUrl: 'https://corpassion-events.vercel.app',
    displayUrl: 'corpassion-events.vercel.app',
    image: '/projects/corpassion-events.png',
    githubUrl: 'https://github.com/walione2002-maker/corpassion-events',
    accentColor: '#F59E0B',
    orbitalAngle: toAngle(0),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: '3d-resume-builder',
    index: 1,
    title: '3D Interactive Resume Builder',
    tagline: 'Spatial 3D & WebGL Document Customization App',
    impactMetric: 'Real-time 3D Viewport Customization & Vector PDF Export',
    description:
      'An interactive WebGL application enabling candidates to design, inspect, and export technical resumes in a real-time 3D spatial viewport.',
    challenge:
      'Traditional resume builders offer static, two-dimensional previews with sluggish client-side rendering and rigid customization options.',
    solution:
      'Implemented a Three.js WebGL canvas with interactive spatial document geometry, live theme toggling, and clean vector PDF generation directly in the browser.',
    role: 'Creative Technologist & Developer',
    year: '2025',
    featured: true,
    stack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5 Canvas'],
    category: 'Spatial 3D Web Application',
    liveUrl: 'https://3d-resume-builder-self.vercel.app',
    displayUrl: '3d-resume-builder-self.vercel.app',
    image: '/projects/3d-resume-builder.png',
    githubUrl: 'https://github.com/walione2002-maker/resume-australia',
    accentColor: '#8B5CF6',
    orbitalAngle: toAngle(1),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'amirs-kalonji-oil',
    index: 2,
    title: 'Amirs Kalonji Oil',
    tagline: 'Direct-to-Consumer Wellness E-Commerce Storefront',
    impactMetric: 'High-Converting Customer Checkout & Product Storytelling',
    description:
      'A focused e-commerce product storefront built for a natural wellness brand, emphasizing customer trust and friction-free mobile purchasing.',
    challenge:
      'The client was losing mobile shoppers due to complicated checkout multi-step funnels and slow product loading times.',
    solution:
      'Engineered a streamlined Next.js storefront with dynamic product quantity controls, automated pricing calculation, and direct WhatsApp customer ordering.',
    role: 'Full-Stack Web Developer',
    year: '2025',
    featured: true,
    stack: ['Next.js 14', 'Tailwind CSS', 'Mobile First', 'Vercel'],
    category: 'Direct-to-Consumer E-Commerce',
    liveUrl: 'https://amirs-kalonji-oil.vercel.app',
    displayUrl: 'amirs-kalonji-oil.vercel.app',
    image: '/projects/amirs-kalonji-oil.png',
    githubUrl: 'https://github.com/walione2002-maker/amirs-kalonji-oil-website',
    accentColor: '#10B981',
    orbitalAngle: toAngle(2),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'nexus-bay',
    index: 3,
    title: 'Nexus Bay',
    tagline: 'Digital Agency & Commercial Services Showcase',
    impactMetric: 'Edge-Delivered Interactive Platform & 95+ Core Web Vitals',
    description:
      'A sleek corporate web platform designed for a digital studio to showcase technical services, case studies, and modern web capabilities.',
    challenge:
      'The studio required a distinctive commercial platform that communicated design maturity without sacrificing Core Web Vitals performance.',
    solution:
      'Developed a modern component architecture with semantic typography, micro-interactions, and edge routing on Vercel.',
    role: 'Frontend Architect',
    year: '2025',
    featured: true,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
    category: 'Commercial Agency Platform',
    liveUrl: 'https://nexus-bay.vercel.app',
    displayUrl: 'nexus-bay.vercel.app',
    image: '/projects/nexus-bay.png',
    githubUrl: 'https://github.com/walione2002-maker/nexusbay-digital',
    accentColor: '#06B6D4',
    orbitalAngle: toAngle(3),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'federal-sanitary-hub',
    index: 4,
    title: 'Federal Sanitary & Hardware Hub',
    tagline: 'Commercial Product Catalog & B2B Inquiries',
    impactMetric: 'Faceted Category Navigation & Instant Quotation Engine',
    description:
      'A digital product catalog and inquiry platform built for a commercial sanitary ware and hardware wholesale business.',
    challenge:
      'Managing hundreds of physical SKUs via phone calls and paper price sheets caused inventory confusion and lost wholesale inquiries.',
    solution:
      'Created a searchable, categorized digital product hub with instant quote submission forms and structured technical specifications.',
    role: 'Full-Stack Developer',
    year: '2025',
    featured: false,
    stack: ['Next.js', 'Faceted Search', 'SEO Architecture', 'Vercel'],
    category: 'B2B Product Catalog',
    liveUrl: 'https://federal-sanitary.vercel.app',
    displayUrl: 'federal-sanitary.vercel.app',
    image: '/projects/commercial-sanitary-hub.png',
    githubUrl: 'https://github.com/walione2002-maker/federal-sanitary',
    accentColor: '#3B82F6',
    orbitalAngle: toAngle(4),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'digital-wedding-suite',
    index: 5,
    title: 'Fatima & Ali Digital Wedding Suite',
    tagline: 'Interactive Event Invitation & Guest RSVP Platform',
    impactMetric: 'Mobile-First Event Schedules & Real-time Online Attendance',
    description:
      'A custom interactive digital invitation website featuring smooth scroll animations, venue directions, and online guest RSVP verification.',
    challenge:
      'Traditional physical invitations failed to capture real-time attendance counts or accommodate last-minute schedule changes.',
    solution:
      'Built an accessible, motion-enhanced invitation suite with live event timelines and instant mobile RSVP confirmation.',
    role: 'Frontend & Motion Engineer',
    year: '2025',
    featured: false,
    stack: ['Next.js', 'Motion Design', 'Mobile First', 'Vercel'],
    category: 'Interactive Event Suite',
    liveUrl: 'https://fatima-ali-wedding.vercel.app',
    displayUrl: 'fatima-ali-wedding.vercel.app',
    image: '/projects/digital-wedding-suite.png',
    githubUrl: 'https://github.com/walione2002-maker/fatima-ali-wedding',
    accentColor: '#EC4899',
    orbitalAngle: toAngle(5),
    orbitalRadius: ORBITAL_RADIUS,
  },
];
