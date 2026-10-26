'use client';

import React from 'react';
import { Layout, ShoppingBag, Box, CheckCircle2 } from 'lucide-react';

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  highlights: string[];
  accentColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: Layout,
    title: 'Business & Brand Websites',
    description:
      'Fast, mobile-first websites designed to elevate your brand authority and turn visitors into high-value clients.',
    highlights: [
      'Next.js 14 & React Architecture',
      'Mobile-First Responsive Layouts',
      'Technical SEO & 95+ Core Web Vitals',
      'CMS & Content Architecture',
    ],
    accentColor: '#38BDF8', // Cyan
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce & Booking Engines',
    description:
      'High-converting online storefronts, catalog systems, and reservation flows engineered for frictionless customer checkout.',
    highlights: [
      'Secure Multi-Currency Checkout',
      'Product Filtering & Search',
      'WhatsApp Order & Inquiry Funnels',
      'Automated Invoicing & Alerts',
    ],
    accentColor: '#10B981', // Emerald
  },
  {
    icon: Box,
    title: 'Custom Web Apps & Interactive 3D',
    description:
      'Bespoke web applications, real-time dashboards, and interactive 3D WebGL experiences that captivate users.',
    highlights: [
      'Three.js & React Three Fiber (R3F)',
      'FinTech & Analytical Dashboards',
      'Full-Stack TypeScript & Cloudflare',
      'Zero-Jank 60–120 FPS Motion Design',
    ],
    accentColor: '#8B5CF6', // Purple
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-label="Services: How I Help Businesses"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold mb-4">
          <span>Engineered for Growth</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
          How I Help Businesses Grow
        </h2>
        <p className="text-slate-400 text-base sm:text-xl mt-4 leading-relaxed">
          Direct, reliable engineering with no confusing jargon. Every digital product is built with speed, security, and real business results in mind.
        </p>
      </div>

      {/* 3 Service Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="group relative rounded-2xl p-8 bg-[#0B1120]/85 backdrop-blur-xl border border-white/[0.12] hover:border-white/30 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* Glowing Icon Container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/15 shadow-inner transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.accentColor}20`,
                    color: service.accentColor,
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                  {service.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <ul className="pt-6 border-t border-white/10 space-y-3">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: service.accentColor }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ServicesSection;
