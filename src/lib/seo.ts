import { PROJECTS } from '@/data/projects';

export function getJsonLdSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://devwalimuhammad.pages.dev/#website',
        url: 'https://devwalimuhammad.pages.dev',
        name: 'Wali Muhammad | Flagship 3D Portfolio & Systems Architecture',
        description:
          'Personal portfolio and engineering showcase of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect & Creative Developer.',
        publisher: {
          '@id': 'https://devwalimuhammad.pages.dev/#person',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://devwalimuhammad.pages.dev/#webpage',
        url: 'https://devwalimuhammad.pages.dev',
        name: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
        isPartOf: {
          '@id': 'https://devwalimuhammad.pages.dev/#website',
        },
        about: {
          '@id': 'https://devwalimuhammad.pages.dev/#person',
        },
        primaryImageOfPage: 'https://devwalimuhammad.pages.dev/og-image.png',
        description:
          'Luxury 3D WebGL portfolio presenting 8 live production platforms across FinTech, luxury commerce, and creative technology.',
      },
      {
        '@type': 'Person',
        '@id': 'https://devwalimuhammad.pages.dev/#person',
        name: 'Wali Muhammad',
        jobTitle:
          'Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
        url: 'https://devwalimuhammad.pages.dev',
        sameAs: [
          'https://github.com/walione2002-maker',
          'https://linkedin.com/in/walimuhammad',
        ],
        knowsAbout: [
          'Next.js',
          'React Three Fiber',
          'Three.js',
          'TypeScript',
          'Python',
          'Quantitative Finance',
          'FinTech Systems Architecture',
          'WebGL 2.0',
          'Cloudflare Edge & Workers',
          'Vercel Global Deployments',
          'Financial Risk Algorithms',
          'Tailwind CSS',
          'GSAP Animation Choreography',
          'Lenis Smooth Scroll',
        ],
      },
      {
        '@type': 'Service',
        name: 'FinTech Systems Architecture & Quantitative Risk Engineering',
        serviceType: 'Financial Engineering',
        provider: { '@id': 'https://devwalimuhammad.pages.dev/#person' },
        description:
          'Institutional quantitative market structure analysis, mathematical position sizing algorithms, and real-time portfolio risk dashboards with sub-millisecond calculation speed.',
      },
      {
        '@type': 'Service',
        name: 'Spatial 3D & Creative WebGL Development',
        serviceType: 'Creative Technology',
        provider: { '@id': 'https://devwalimuhammad.pages.dev/#person' },
        description:
          'Award-winning 3D web applications, procedural shaders, and CatmullRom spline camera choreography in React Three Fiber with zero external asset bottlenecks.',
      },
      {
        '@type': 'Service',
        name: 'High-Conversion Enterprise Full-Stack Web Development',
        serviceType: 'Full-Stack Software Engineering',
        provider: { '@id': 'https://devwalimuhammad.pages.dev/#person' },
        description:
          'Next.js 14 App Router platforms, conversion-optimized DTC storefronts, strict TypeScript systems, and zero-downtime Cloudflare Edge CI/CD distribution.',
      },
      {
        '@type': 'ItemList',
        name: '8 Live Production Deployments & Case Studies',
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project) => ({
          '@type': 'ListItem',
          position: project.index + 1,
          name: project.title,
          description: `${project.tagline}. ${project.description}`,
          url: project.liveUrl,
        })),
      },
    ],
  };
}
