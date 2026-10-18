'use client';

import React from 'react';
import { ShieldCheck, Cpu, Globe2, Zap } from 'lucide-react';

export function ExecutiveOverview() {
  const pillars = [
    {
      icon: Cpu,
      title: 'FinTech & Quant Architecture',
      desc: 'Designing mathematical risk engines, multi-asset position sizing algorithms, and real-time execution pipelines with sub-millisecond precision.',
    },
    {
      icon: Globe2,
      title: 'Creative Technology & 3D WebGL',
      desc: 'Crafting spatial computing web applications, procedural shaders, and immersive interactive graphics without external asset bottlenecks.',
    },
    {
      icon: Zap,
      title: 'Full-Stack Performance Engineering',
      desc: 'Delivering sub-second Core Web Vitals, enterprise Next.js App Router architectures, and high-converting commercial e-commerce storefronts.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Downtime Edge Distribution',
      desc: 'Deploying immutable static infrastructure across global Cloudflare edge networks with zero runtime vulnerabilities and instant atomic rollbacks.',
    },
  ];

  return (
    <section
      id="executive-overview"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      aria-label="Executive Overview & Value Proposition"
    >
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-mono uppercase tracking-[0.2em] mb-6">
          <span>01 // Strategic Architecture</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-tight">
          Engineering high-stakes web systems at the intersection of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-yellow-200 to-amber-400">
            financial rigor
          </span>{' '}
          and creative computing.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          I partner with executive founders, quantitative trading desks, and high-growth brands to transform complex mathematical models and ambitious brand narratives into resilient, lightning-fast digital products.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-5xl">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#12121A]/60 border border-white/[0.08] backdrop-blur-xl hover:border-accent-gold/30 hover:bg-[#151522]/80 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-gold mb-5 group-hover:scale-110 group-hover:border-accent-gold/40 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white mb-2">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
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
