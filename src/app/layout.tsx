import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { getJsonLdSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export const viewport: Viewport = {
  themeColor: '#050816',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://devwalimuhammad.pages.dev'),
  title: {
    default: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan — Official Portfolio',
    template: '%s | Wali Muhammad',
  },
  description:
    'Official portfolio of Wali Muhammad — Full-Stack Web Developer, FinTech Student at FAST-NUCES Karachi, and Digital Product Creator in Pakistan. Explore live client websites and web applications built by Wali Muhammad.',
  keywords: [
    // Primary Name & Local Keywords
    'Wali Muhammad',
    'Wali Muhammad Karachi',
    'Wali Muhammad Pakistan',
    'Wali Muhammad Web Developer',
    'Wali Muhammad Software Engineer',
    'Wali Muhammad FAST-NUCES',
    'Wali Muhammad Portfolio',
    'Web Developer Karachi',
    'Web Developer Pakistan',
    'Full-Stack Developer Karachi',
    // Services & Client Queries
    'Freelance Web Developer Karachi',
    'Next.js Developer Pakistan',
    'React Developer Karachi',
    'E-Commerce Website Developer Karachi',
    'Custom Web Application Development',
    'Interactive 3D Web Developer',
    'FinTech Web Developer',
  ],
  authors: [{ name: 'Wali Muhammad', url: 'https://devwalimuhammad.pages.dev' }],
  creator: 'Wali Muhammad',
  publisher: 'Wali Muhammad',
  other: {
    'geo.region': 'PK-SD',
    'geo.placename': 'Karachi, Sindh, Pakistan',
    'geo.position': '24.8607;67.0011',
    'ICBM': '24.8607, 67.0011',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devwalimuhammad.pages.dev',
    siteName: 'Wali Muhammad — Web Developer Portfolio',
    title: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan — Official Portfolio',
    description:
      'Official portfolio of Wali Muhammad — Full-Stack Web Developer, FinTech Student at FAST-NUCES Karachi, and Digital Product Creator in Pakistan. Explore live client websites and web applications built by Wali Muhammad.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wali Muhammad — Web Developer & Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wali Muhammad | Web Developer & Software Engineer in Karachi, Pakistan',
    description:
      'Official portfolio of Wali Muhammad — Full-Stack Web Developer, FinTech Student at FAST-NUCES Karachi, and Digital Product Creator in Pakistan. Explore live client websites and web applications built by Wali Muhammad.',
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
    <html lang="en" className={`${inter.variable} ${interTight.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050816] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
