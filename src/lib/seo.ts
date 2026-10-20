import { PROJECTS } from '@/data/projects';

export function getJsonLdSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://devwalimuhammad.pages.dev/#website',
        url: 'https://devwalimuhammad.pages.dev',
        name: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan',
        description:
          'Official portfolio of Wali Muhammad — Full-Stack Web Developer, FinTech Student at FAST-NUCES Karachi, and Digital Product Creator in Pakistan. Explore live client websites and web applications built by Wali Muhammad.',
        publisher: {
          '@id': 'https://devwalimuhammad.pages.dev/#person',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://devwalimuhammad.pages.dev/#webpage',
        url: 'https://devwalimuhammad.pages.dev',
        name: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan — Official Portfolio',
        isPartOf: {
          '@id': 'https://devwalimuhammad.pages.dev/#website',
        },
        about: {
          '@id': 'https://devwalimuhammad.pages.dev/#person',
        },
        primaryImageOfPage: 'https://devwalimuhammad.pages.dev/og-image.png',
        description:
          'Official portfolio of Wali Muhammad showcasing live client websites, e-commerce stores, and custom web applications.',
      },
      {
        '@type': 'Person',
        '@id': 'https://devwalimuhammad.pages.dev/#person',
        name: 'Wali Muhammad',
        alternateName: [
          'Wali Muhammad Karachi',
          'Wali Muhammad Developer',
          'Wali Muhammad FAST-NUCES',
          'Wali Muhammad Pakistan',
        ],
        jobTitle: 'Web Developer & Software Engineer',
        url: 'https://devwalimuhammad.pages.dev',
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'FAST National University of Computer and Emerging Sciences (FAST-NUCES Karachi)',
          url: 'https://khi.nu.edu.pk',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Karachi',
          addressRegion: 'Sindh',
          addressCountry: 'Pakistan',
        },
        sameAs: [
          'https://github.com/walione2002-maker',
          'https://www.linkedin.com/in/wali-muhammad-2002/',
        ],
        knowsAbout: [
          'Web Development',
          'Next.js',
          'React',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Tailwind CSS',
          'Three.js',
          'E-Commerce Development',
          'FinTech Systems',
          'Full-Stack Engineering',
        ],
      },
      {
        '@type': 'Service',
        name: 'Business & Brand Website Development',
        serviceType: 'Web Development',
        provider: { '@id': 'https://devwalimuhammad.pages.dev/#person' },
        description:
          'Clean, fast, mobile-friendly websites designed to make your business look professional and turn visitors into customers.',
      },
      {
        '@type': 'Service',
        name: 'E-Commerce & Online Booking Systems',
        serviceType: 'E-Commerce Development',
        provider: { '@id': 'https://devwalimuhammad.pages.dev/#person' },
        description:
          'Online stores, product catalogs, and custom booking platforms built for smooth customer checkout and easy management.',
      },
      {
        '@type': 'Service',
        name: 'Custom Web Applications & Interactive 3D',
        serviceType: 'Software Engineering',
        provider: { '@id': 'https://devwalimuhammad.pages.dev/#person' },
        description:
          'Bespoke web applications, client portals, and interactive 3D experiences tailored to unique business ideas.',
      },
      {
        '@type': 'ItemList',
        name: 'Featured Live Websites by Wali Muhammad',
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
