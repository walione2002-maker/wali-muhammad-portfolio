'use client';

import React from 'react';
import { ShieldCheck, Cpu, Globe2, Zap, Sparkles } from 'lucide-react';

export function ExecutiveOverview() {
  const pillars = [
    {
      icon: Cpu,
      title: 'FinTech & Quant Architecture',
      accent: '#FFB800', // Molten Gold
      desc: 'Designing mathematical risk engines, multi-asset position sizing algorithms, and real-time execution pipelines with sub-millisecond precision.',
    },
    {
      icon: Globe2,
      title: 'Spatial 3D & Creative Computing',
      accent: '#00F0FF', // Electric Cyan
      desc: 'Crafting spatial computing web applications, procedural shaders, and immersive interactive graphics without external asset bottlenecks.',
    },
    {
      icon: Zap,
      title: 'Full-Stack Performance Engineering',
      accent: '#10B981', // Neon Emerald
      desc: 'Delivering sub-second Core Web Vitals, enterprise Next.js App Router architectures, and high-converting commercial e-commerce storefronts.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Downtime Edge Distribution',
      accent: '#8B5CF6', // Ultraviolet
      desc: 'Deploying immutable static infrastructure across global Cloudflare & Vercel edge networks with zero runtime vulnerabilities and instant atomic rollbacks.',
    },
  ];

  return (
    <section
      id="executive-overview"
      className="relative w-full h-[100dvh] flex flex-col justify-center px-4 sm:px-12 lg:px-20 max-w-7xl mx-auto overflow-y-auto py-4 sm:py-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      aria-label="Executive Overview & Value Proposition"
    >
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-violet-500/15 border border-violet-400/40 text-violet-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-2 sm:mb-4 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
          <span>01 // Strategic Architecture</span>
        </div>

        <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight drop-shadow-lg">
          Engineering high-stakes web systems at the intersection of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-sky-400 drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]">
            financial rigor
          </span>{' '}
          and creative computing.
        </h2>

        <p className="mt-2 sm:mt-4 text-[11px] sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          I partner with executive founders, quantitative trading desks, and high-growth brands to transform complex mathematical models and ambitious brand narratives into resilient, lightning-fast digital products.
        </p>
      </div>

      {/* 4 Pillars Grid with Chromatic Edge Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-6 mt-4 sm:mt-8 max-w-5xl">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[linear-gradient(145deg,rgba(14,19,42,0.96),rgba(6,9,22,0.98))] sm:backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 transition-all duration-300 group shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
            >
              <div
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center border mb-2 sm:mb-3.5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                style={{
                  borderColor: `${p.accent}60`,
                  backgroundColor: `${p.accent}20`,
                  color: p.accent,
                }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-sm sm:text-lg font-bold font-display text-white mb-1">
                {p.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExecutiveOverview;
