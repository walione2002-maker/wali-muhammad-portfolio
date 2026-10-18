'use client';

import React from 'react';
import { Terminal, Box, Layers, Server } from 'lucide-react';

export function TechStack() {
  const categories = [
    {
      icon: Terminal,
      title: 'FinTech & Quantitative Core',
      accent: '#EF4444',
      skills: [
        'Python Quantitative Pipelines',
        'Mathematical Position Sizing',
        'Multi-Timeframe Market Structure',
        'Monte Carlo Risk Simulations',
        'Real-time Tick Data Processing',
        'Portfolio Drawdown Controls',
      ],
    },
    {
      icon: Box,
      title: 'Spatial 3D & Creative Tech',
      accent: '#06B6D4',
      skills: [
        'Three.js & WebGL 2.0 Runtime',
        'React Three Fiber / Drei',
        'Procedural Geometry & Shaders',
        'GSAP Animation Choreography',
        'Spline-Driven Camera Systems',
        'Zero-Allocation useFrame Math',
      ],
    },
    {
      icon: Layers,
      title: 'Full-Stack Architecture',
      accent: '#3B82F6',
      skills: [
        'Next.js 14 App Router',
        'TypeScript Enterprise Strict',
        'Tailwind CSS & Design Systems',
        'Zustand Reactive State',
        'Conversion-Rate UX Architecture',
        'Sub-second Core Web Vitals',
      ],
    },
    {
      icon: Server,
      title: 'Zero-Downtime Cloud & DevOps',
      accent: '#10B981',
      skills: [
        'Cloudflare Pages Edge Network',
        'Vercel Global Deployments',
        'GitHub Actions Automated CI/CD',
        'Strict Content-Security-Policy',
        'Atomic Zero-Downtime Releases',
        'SEO & JSON-LD Structured Data',
      ],
    },
  ];

  return (
    <section
      id="tech-stack"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-28 max-w-7xl mx-auto"
      aria-label="Engineering & FinTech Architecture Stack"
    >
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-[0.2em] mb-4">
          <span>03 // Technical Substrate · Wireframe State Active</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white">
          Engineering & FinTech Architecture Stack
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 font-light leading-relaxed">
          The 3D centerpiece behind this section is rendered in wireframe mode, exposing the underlying geometry just as this architecture matrix exposes the foundational engineering stack behind every deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#12121A]/70 border border-white/[0.08] backdrop-blur-xl hover:border-white/[0.15] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: `${cat.accent}40`,
                    backgroundColor: `${cat.accent}15`,
                    color: cat.accent,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  {cat.title}
                </h3>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/[0.03] px-3 py-2 rounded-lg border border-white/[0.04]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: cat.accent }}
                    />
                    <span>{skill}</span>
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

export default TechStack;
