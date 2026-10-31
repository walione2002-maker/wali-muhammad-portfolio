import type { Metadata, Viewport } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { getJsonLdSchema } from '@/lib/seo';
import { CustomCursor } from '@/components/dom/CustomCursor';
import { SmoothScroll } from '@/components/shared/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
});

export const viewport: Viewport = {
  themeColor: '#F4F3EE',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://devwalimuhammad.pages.dev'),
  title: {
    default: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
    template: '%s | Wali Muhammad',
  },
  description:
    'Official portfolio of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect at FAST-NUCES Karachi, and Creative 3D WebGL Developer. Explore live client platforms, commercial storefronts, and spatial systems.',
  keywords: [
    'Wali Muhammad',
    'Wali Muhammad Karachi',
    'Wali Muhammad Pakistan',
    'Wali Muhammad Web Developer',
    'Wali Muhammad Software Engineer',
    'Wali Muhammad FAST-NUCES',
    'Wali Muhammad Portfolio',
    'Full-Stack Developer Karachi',
    'FinTech Software Architect',
    'Three.js Developer Pakistan',
    'Next.js 14 Developer',
    'Creative Technologist',
  ],
  authors: [{ name: 'Wali Muhammad', url: 'https://devwalimuhammad.pages.dev' }],
  creator: 'Wali Muhammad',
  publisher: 'Wali Muhammad',
  other: {
    'geo.region': 'PK-SD',
    'geo.placename': 'Karachi, Sindh, Pakistan',
    'geo.position': '24.8607;67.0011',
    ICBM: '24.8607, 67.0011',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devwalimuhammad.pages.dev',
    siteName: 'Wali Muhammad — Engineering Portfolio',
    title: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
    description:
      'Official portfolio of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect at FAST-NUCES Karachi, and Creative 3D WebGL Developer.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wali Muhammad — Full-Stack Engineer & FinTech Architect Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wali Muhammad | Full-Stack Engineer & FinTech Architect',
    description:
      'Official portfolio of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect at FAST-NUCES Karachi & 3D WebGL Developer.',
    images: ['/og-image.png'],
    creator: '@walione2002',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://devwalimuhammad.pages.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getJsonLdSchema();

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F4F3EE] text-[#141413] antialiased selection:bg-[#141413] selection:text-[#F4F3EE] transition-colors duration-500 overflow-x-hidden">
        {/* Global Custom Magnetic Cursor */}
        <CustomCursor />
        {/* Global Lenis / GSAP Smooth Scroll */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
