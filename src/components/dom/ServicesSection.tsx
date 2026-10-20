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
      'Clean, fast, mobile-friendly websites designed to make your business look professional and turn visitors into customers.',
    highlights: ['Next.js & React Architecture', 'Mobile-First Responsive Design', 'SEO & High-Speed Performance'],
    accentColor: '#38BDF8', // Cyan
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce & Booking Systems',
    description:
      'Online stores, product catalogs, and custom booking platforms built for smooth customer checkout and easy management.',
    highlights: ['Secure Checkout & Payments', 'Automated Invoicing & WhatsApp Funnels', 'Inventory & Booking Workflows'],
    accentColor: '#10B981', // Emerald
  },
  {
    icon: Box,
    title: 'Custom Web Apps & Interactive 3D',
    description:
      'Bespoke web applications, financial dashboards, and interactive 3D experiences tailored to unique ideas.',
    highlights: ['Interactive 3D / WebGL Experience', 'FinTech & Analytics Dashboards', 'Full-Stack Database Integration'],
    accentColor: '#8B5CF6', // Purple
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-32 z-10"
      aria-label="Services: How I Help Businesses"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <span>What I Offer</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          How I Help Businesses
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3">
          Simple, direct web development services tailored to your exact business goals. No confusing tech jargon—just fast, reliable, beautiful websites.
        </p>
      </div>

      {/* 3 Clean Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="group relative rounded-2xl p-8 bg-[#0F172A]/85 backdrop-blur-xl border border-white/[0.12] hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              {/* Top Section */}
              <div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/15 shadow-inner transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${service.accentColor}20`,
                    color: service.accentColor,
                  }}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
              </div>

              {/* Bottom Feature List */}
              <ul className="pt-6 border-t border-white/10 space-y-2.5">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
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
