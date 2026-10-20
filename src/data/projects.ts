import { type ProjectData } from '@/types';

const ORBITAL_RADIUS = 4.5;
const toAngle = (i: number) => i * ((2 * Math.PI) / 6);

export const PROJECTS: ProjectData[] = [
  {
    id: 'corpassion-events',
    index: 0,
    title: 'Corpassion Events',
    tagline: 'High-End Event Architecture & Experiences',
    impactMetric: 'Interactive Event Portfolio & Client Inquiry Funnel',
    description:
      'A modern showcase and inquiry website built for a corporate event planning and brand experience company.',
    stack: ['Next.js', 'Tailwind CSS', 'Interactive UI', 'Vercel'],
    category: 'Event Management & Experiences',
    liveUrl: 'https://corpassion-events.vercel.app',
    displayUrl: 'corpassion-events.vercel.app',
    image: '/projects/corpassion-events.png',
    githubUrl: 'https://github.com/walione2002-maker/corpassion-events',
    accentColor: '#F59E0B', // Warm Amber Gold
    orbitalAngle: toAngle(0),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: '3d-resume-builder',
    index: 1,
    title: '3D Interactive Resume Builder',
    tagline: 'Spatial 3D & WebGL Resume Generation App',
    impactMetric: 'Live 3D Document Customization & Vector PDF Export',
    description:
      'An interactive web app that lets users build, customize, and export professional resumes in a live 3D view.',
    stack: ['Three.js', 'WebGL', 'JavaScript', 'Vercel'],
    category: '3D Web Application',
    liveUrl: 'https://3d-resume-builder-self.vercel.app',
    displayUrl: '3d-resume-builder-self.vercel.app',
    image: '/projects/3d-resume-builder.png',
    githubUrl: 'https://github.com/walione2002-maker/resume-australia',
    accentColor: '#8B5CF6', // Vibrant Violet
    orbitalAngle: toAngle(1),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'nexus-bay',
    index: 2,
    title: 'Nexus Bay',
    tagline: 'Digital Agency & Commercial Web Platform',
    impactMetric: 'Interactive Service Showcase & Fast Edge Delivery',
    description:
      'A sleek commercial web platform showcasing digital products, company services, and modern interactive design.',
    stack: ['Next.js', 'TypeScript', 'Responsive UI', 'Vercel'],
    category: 'Digital Agency & Commercial Platform',
    liveUrl: 'https://nexus-bay.vercel.app',
    displayUrl: 'nexus-bay.vercel.app',
    image: '/projects/nexus-bay.png',
    githubUrl: 'https://github.com/walione2002-maker/nexusbay-digital',
    accentColor: '#06B6D4', // Electric Cyan
    orbitalAngle: toAngle(2),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'amirs-kalonji-oil',
    index: 3,
    title: 'Amirs Kalonji Oil',
    tagline: 'Direct-to-Consumer E-Commerce Storefront',
    impactMetric: 'High-Converting Customer Checkout & Product Storytelling',
    description:
      'An online product storefront built for a natural wellness brand with a simple, high-converting customer checkout.',
    stack: ['Next.js', 'Tailwind CSS', 'E-Commerce', 'Vercel'],
    category: 'Direct-to-Consumer E-Commerce',
    liveUrl: 'https://amirs-kalonji-oil.vercel.app',
    displayUrl: 'amirs-kalonji-oil.vercel.app',
    image: '/projects/amirs-kalonji-oil.png',
    githubUrl: 'https://github.com/walione2002-maker/amirs-kalonji-oil-website',
    accentColor: '#10B981', // Emerald Green
    orbitalAngle: toAngle(3),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'digital-wedding-suite',
    index: 4,
    title: 'Fatima & Ali Digital Wedding Suite',
    tagline: 'Interactive Event Invitation & Guest RSVP App',
    impactMetric: 'Fluid Mobile Scroll & Online Attendance Confirmation',
    description:
      'A custom digital wedding invitation website featuring smooth scroll animations, event schedules, and online guest RSVPs.',
    stack: ['Next.js', 'Custom Motion', 'Mobile First', 'Vercel'],
    category: 'Interactive Event Invitation',
    liveUrl: 'https://fatima-ali-wedding.vercel.app',
    displayUrl: 'fatima-ali-wedding.vercel.app',
    image: '/projects/digital-wedding-suite.png',
    githubUrl: 'https://github.com/walione2002-maker/fatima-ali-wedding',
    accentColor: '#EC4899', // Rose Pink
    orbitalAngle: toAngle(4),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'commercial-sanitary-hub',
    index: 5,
    title: 'Federal Sanitary & Hardware Hub',
    tagline: 'Commercial Product Catalog & Retail Platform',
    impactMetric: 'Faceted Category Search & Instant Quote Inquiries',
    description:
      'A complete digital product catalog and inquiry platform built for a sanitary ware and hardware retail business.',
    stack: ['Next.js', 'Catalog Filtering', 'SEO', 'Vercel'],
    category: 'Commercial Product Catalog',
    liveUrl: 'https://federal-sanitary.vercel.app',
    displayUrl: 'federal-sanitary.vercel.app',
    image: '/projects/commercial-sanitary-hub.png',
    githubUrl: 'https://github.com/walione2002-maker/federal-sanitary',
    accentColor: '#3B82F6', // Royal Blue
    orbitalAngle: toAngle(5),
    orbitalRadius: ORBITAL_RADIUS,
  },
];
