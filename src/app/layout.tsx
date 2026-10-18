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
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://walimuhammad.com'),
  title: {
    default: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
    template: '%s | Wali Muhammad',
  },
  description:
    'Wali Muhammad is a Full-Stack Engineer, FinTech Systems Architect & Creative Developer specializing in Next.js, TypeScript, React Three Fiber, WebGL 3D experiences, and quantitative risk engines. Explore 8 live production platforms running on zero-downtime edge architecture.',
  keywords: [
    // Brand Keywords
    'Wali Muhammad',
    'Wali Muhammad Full-Stack Engineer',
    'Wali Muhammad FinTech Systems Architect',
    'Wali Muhammad 3D WebGL Developer',
    'Wali Muhammad Portfolio',
    // High-Intent Client Search Keywords
    'Freelance Next.js & TypeScript Developer',
    'React Three Fiber & Three.js 3D Interactive Website Developer',
    'FinTech Quantitative & Risk Dashboard Engineer',
    'Luxury High-Conversion Web Architecture',
    'Cloudflare Edge & Vercel Full-Stack Engineer',
    'Creative Technologist Awwwards Standard',
    'Quantitative Position Sizing Algorithms',
    'Zero-Downtime Web Architecture',
    'Three.js WebGL Performance Specialist',
  ],
  authors: [{ name: 'Wali Muhammad', url: 'https://walimuhammad.com' }],
  creator: 'Wali Muhammad',
  publisher: 'Wali Muhammad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walimuhammad.com',
    siteName: 'Wali Muhammad — 3D Portfolio & Systems Architecture',
    title: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
    description:
      'Explore 8 live production platforms across FinTech, luxury commerce, and spatial 3D WebGL technology in an interactive spline-choreographed experience.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wali Muhammad — Flagship 3D Portfolio & Systems Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
    description:
      'Explore 8 live production platforms across FinTech, luxury commerce, and spatial 3D WebGL technology in an interactive spline-choreographed experience.',
    images: ['/og-image.png'],
    creator: '@walimuhammad',
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
    canonical: 'https://walimuhammad.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getJsonLdSchema();

  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface-primary text-slate-100 antialiased selection:bg-accent-gold/20 selection:text-accent-gold overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
