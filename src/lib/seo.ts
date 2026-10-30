import { PROJECTS } from '@/data/projects';
import { type ProjectData } from '@/types';

export const SITE_URL = 'https://devwalimuhammad.pages.dev';

export function getHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan',
        description:
          'Official portfolio of Wali Muhammad — Full-Stack Web Developer, FinTech Student at FAST-NUCES Karachi, and Digital Product Creator in Pakistan.',
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan — Official Portfolio',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#person`,
        },
        primaryImageOfPage: `${SITE_URL}/og-image.png`,
        description:
          'Official portfolio of Wali Muhammad showcasing live client websites, e-commerce stores, and custom web applications.',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Wali Muhammad',
        alternateName: [
          'Wali Muhammad Karachi',
          'Wali Muhammad Developer',
          'Wali Muhammad FAST-NUCES',
          'Wali Muhammad Pakistan',
        ],
        jobTitle: 'Web Developer & Digital Product Engineer',
        url: SITE_URL,
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
          'Tailwind CSS',
          'Three.js',
          'E-Commerce Development',
          'FinTech Systems',
          'Full-Stack Engineering',
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Featured Projects by Wali Muhammad',
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project) => ({
          '@type': 'ListItem',
          position: project.index + 1,
          name: project.title,
          description: `${project.tagline}. ${project.description}`,
          url: `${SITE_URL}/work/${project.id}`,
        })),
      },
    ],
  };
}

export function getProjectJsonLd(project: ProjectData) {
  const isApp = project.id === '3d-resume-builder';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isApp ? 'SoftwareApplication' : 'CreativeWork',
        '@id': `${SITE_URL}/work/${project.id}/#project`,
        name: project.title,
        headline: project.tagline,
        description: project.description,
        url: `${SITE_URL}/work/${project.id}`,
        author: {
          '@id': `${SITE_URL}/#person`,
        },
        creator: {
          '@type': 'Person',
          name: 'Wali Muhammad',
        },
        dateCreated: `${project.year}-01-01`,
        keywords: project.stack.join(', '),
        ...(isApp
          ? {
              applicationCategory: 'DesignApplication',
              operatingSystem: 'Any Web Browser',
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/work/${project.id}/#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Work',
            item: `${SITE_URL}/work`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `${SITE_URL}/work/${project.id}`,
          },
        ],
      },
    ],
  };
}

export function getServicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Business & Brand Website Development',
        serviceType: 'Web Development',
        provider: { '@id': `${SITE_URL}/#person` },
        description:
          'High-performance Next.js commercial websites engineered with editorial typography, sub-second edge response, and qualified conversion architecture.',
      },
      {
        '@type': 'Service',
        name: 'E-Commerce & Online Booking Systems',
        serviceType: 'E-Commerce Development',
        provider: { '@id': `${SITE_URL}/#person` },
        description:
          'Direct-to-consumer storefronts, streamlined single-screen checkouts, and custom automated order routing systems.',
      },
      {
        '@type': 'Service',
        name: 'Custom Web Applications & Interactive 3D',
        serviceType: 'Software Engineering',
        provider: { '@id': `${SITE_URL}/#person` },
        description:
          'Bespoke web applications, interactive WebGL tools, and real-time Three.js product visualizers tailored to modern business requirements.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${SITE_URL}/services`,
          },
        ],
      },
    ],
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// Backward compatibility alias
export const getJsonLdSchema = getHomeJsonLd;
