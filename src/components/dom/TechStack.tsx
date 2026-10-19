'use client';

import React from 'react';
import { Terminal, Box, Layers, Server } from 'lucide-react';

export function TechStack() {
  const categories = [
    {
      icon: Terminal,
      title: 'FinTech & Quantitative Core',
      accent: '#00FF9D', // Matrix Neon Emerald
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
      accent: '#00E5FF', // Cyber Cyan
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
      accent: '#38BDF8', // Laser Cyan
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
      accent: '#10B981', // Emerald
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
      className="w-full h-[100dvh] max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 flex flex-col justify-center py-4 sm:py-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] overflow-y-auto"
      aria-label="Engineering & FinTech Architecture Stack"
    >
      <div className="max-w-3xl mb-4 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-1.5 sm:mb-3 shadow-[0_0_20px_rgba(0,255,157,0.25)]">
          <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
          <span>03 // Wireframe Architecture Stack · Geometric Kernel Active</span>
        </div>
        <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight drop-shadow-md">
          Engineering & FinTech{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,157,0.4)]">
            Architecture Stack
          </span>
        </h2>
        <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
          The 3D centerpiece behind this section renders in wireframe mode, exposing the underlying geometry just as this architecture matrix exposes the foundational engineering substrate behind every production deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-6 max-w-5xl">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] sm:backdrop-blur-2xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-4">
                <div
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                  style={{
                    borderColor: `${cat.accent}60`,
                    backgroundColor: `${cat.accent}20`,
                    color: cat.accent,
                  }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold font-display text-white">
                  {cat.title}
                </h3>
              </div>

              <ul className="grid grid-cols-2 gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-200 bg-white/[0.04] px-2 py-1 rounded border border-white/[0.08]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: cat.accent, color: cat.accent }}
                    />
                    <span className="truncate">{skill}</span>
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
