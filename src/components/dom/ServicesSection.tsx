'use client';

import React from 'react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Websites & E-Commerce',
    description:
      'Fast, mobile-first brand websites, digital catalogs, and e-commerce stores built to turn visitors into customers.',
    deliverables: [
      'Next.js 14 & React Architecture',
      'Mobile-First Responsive Design',
      'Technical SEO & Core Web Vitals',
      'E-Commerce & Order Management',
    ],
  },
  {
    number: '02',
    title: 'Custom Web Applications',
    description:
      'Tailored web applications, internal tools, and client dashboards engineered with full-stack TypeScript.',
    deliverables: [
      'Interactive State & Data Flows',
      'REST & GraphQL Integrations',
      'FinTech & Analytical Interfaces',
      'Edge-Deployed Scalable Backends',
    ],
  },
  {
    number: '03',
    title: 'Interactive 3D & Creative Web',
    description:
      'Immersive WebGL experiences and real-time spatial interfaces built to make brands stand out from the noise.',
    deliverables: [
      'Three.js & React Three Fiber',
      '60–120 FPS Real-Time Shaders',
      'Dynamic Camera & Scroll Rigs',
      'Hardware-Accelerated Motion',
    ],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-36 z-10"
      aria-label="Capabilities"
    >
      {/* Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="text-xs font-mono tracking-[0.25em] uppercase text-[#737373] mb-4">
          02 / Capabilities
        </div>
        <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#E8E4DE] tracking-tight leading-[0.95] uppercase">
          What<br />I Do
        </h2>
        <p className="text-[#888888] text-base sm:text-lg mt-6 max-w-xl font-light">
          Engineering digital products from scratch to deployment with a focus on speed, clarity, and dependable execution.
        </p>
      </div>

      {/* Numbered Editorial List */}
      <div className="border-t border-[#1A1A1A]">
        {SERVICES.map((service) => (
          <div
            key={service.number}
            className="py-12 sm:py-16 border-b border-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
          >
            {/* Number */}
            <div className="lg:col-span-2">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#333333] group-hover:text-[#FF4D00] transition-colors">
                {service.number}
              </span>
            </div>

            {/* Title & Core Description */}
            <div className="lg:col-span-5 pr-0 lg:pr-8">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#E8E4DE] tracking-tight mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-[#A3A3A3] text-base sm:text-lg font-light leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Deliverables / Details */}
            <div className="lg:col-span-5 pt-2 lg:pt-0">
              <div className="text-xs font-mono tracking-widest uppercase text-[#555555] mb-4">
                Capabilities
              </div>
              <ul className="space-y-2.5">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-mono text-[#888888] flex items-center gap-3"
                  >
                    <span className="text-[#333333]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
