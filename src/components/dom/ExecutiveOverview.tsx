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
      accent: '#7C3AED', // Ultraviolet
      desc: 'Deploying immutable static infrastructure across global Cloudflare & Vercel edge networks with zero runtime vulnerabilities and instant atomic rollbacks.',
    },
  ];

  return (
    <section
      id="executive-overview"
      className="relative w-full h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto overflow-y-auto sm:overflow-visible py-8"
      aria-label="Executive Overview & Value Proposition"
    >
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(255,184,0,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
          <span>01 // Strategic Architecture</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight drop-shadow-lg">
          Engineering high-stakes web systems at the intersection of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
            financial rigor
          </span>{' '}
          and creative computing.
        </h2>

        <p className="mt-4 text-xs sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          I partner with executive founders, quantitative trading desks, and high-growth brands to transform complex mathematical models and ambitious brand narratives into resilient, lightning-fast digital products.
        </p>
      </div>

      {/* 4 Pillars Grid with Chromatic Edge Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10 max-w-5xl">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#0E1322]/80 border border-white/[0.08] backdrop-blur-2xl hover:bg-[#12192C]/90 transition-all duration-300 group"
              style={{
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border mb-3.5 group-hover:scale-110 transition-transform"
                style={{
                  borderColor: `${p.accent}50`,
                  backgroundColor: `${p.accent}15`,
                  color: p.accent,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mb-1.5">
                {p.title}
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
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
