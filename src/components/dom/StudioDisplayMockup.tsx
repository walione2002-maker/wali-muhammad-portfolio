'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export interface StudioDisplayMockupProps {
  image?: string;
  title?: string;
  liveUrl?: string;
  children?: React.ReactNode;
  className?: string;
  priority?: boolean;
}

export const StudioDisplayMockup = memo(function StudioDisplayMockup({
  image,
  title = 'Project Preview',
  liveUrl,
  children,
  className = '',
  priority = false,
}: StudioDisplayMockupProps) {
  return (
    <div
      className={`relative p-4 sm:p-8 rounded-2xl overflow-hidden flex flex-col items-center justify-center group select-none ${className}`}
    >
      {/* 1. SOFT EMERALD-TEAL RADIAL BACKLIGHT GLOW (00:15 – 00:18) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(45, 106, 88, 0.38) 0%, rgba(11, 13, 12, 0) 72%)',
        }}
      />

      {/* 2. THE 3D HARDWARE MONITOR WRAPPER */}
      <div
        className="relative z-10 w-full max-w-[640px] flex flex-col items-center [perspective:1400px] transition-transform duration-700 ease-out group-hover:rotate-y-[-2.5deg] group-hover:rotate-x-[2deg] transform-gpu will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* SCREEN BEZEL (Anodized dark casing with subtle top & side borders) */}
        <div className="bg-[#080909] p-2.5 sm:p-3.5 rounded-t-[16px] border-t border-x border-white/25 shadow-[0_30px_80px_rgba(0,0,0,0.85)] w-full relative">
          {/* Top-Center FaceTime Camera & Ambient Light Sensor */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-600/60 shadow-inner flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          {/* 16:10 INNER DISPLAY VIEWPORT */}
          <div className="aspect-[16/10] w-full rounded-[8px] overflow-hidden bg-[#111312] relative border border-white/10 shadow-inner">
            {/* Sleek Glassmorphic Top Browser Status Bar */}
            <div className="absolute top-0 inset-x-0 h-6 bg-black/60 backdrop-blur-md z-30 flex items-center justify-between px-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-medium">
                live deployment · 98+ core web vitals
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Screen Content: Live 3D Canvas OR High-Res Screenshot */}
            {children ? (
              <div className="w-full h-full pt-6 relative z-10">{children}</div>
            ) : image ? (
              <div className="w-full h-full pt-6 relative overflow-hidden">
                <Image
                  src={image}
                  alt={`${title} preview displayed in Apple Studio Display`}
                  fill
                  priority={priority}
                  loading={priority ? undefined : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest pt-6">
                <span>Display Viewport</span>
              </div>
            )}

            {/* Glass Screen Reflection Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.06] z-20" />

            {/* Floating Hover Pill for External Link */}
            {liveUrl && !children && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/35 backdrop-blur-[2px] z-30 cursor-pointer"
              >
                <div className="bg-[#F4F3EE] text-[#0B0D0C] px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-2xl flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span>Open live site</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0B0D0C]" />
                </div>
              </a>
            )}
          </div>
        </div>

        {/* BRUSHED ANODIZED SILVER CHIN (00:15 – 00:18) */}
        <div className="h-7 sm:h-9 w-full max-w-[640px] bg-gradient-to-b from-[#DFE1E6] via-[#C5C8D0] to-[#989CA6] rounded-b-[14px] border-t border-white/70 shadow-xl flex items-center justify-center relative">
          {/* Subtle center logo deboss */}
          <div className="w-3.5 h-3.5 rounded-full opacity-35 bg-zinc-800 shadow-inner" />
        </div>

        {/* 3D TAPERED ALUMINUM L-STAND & BASE FOOT */}
        <div className="relative z-0 flex flex-col items-center">
          {/* Brushed Aluminum Neck */}
          <div className="w-20 sm:w-24 h-8 sm:h-10 bg-gradient-to-b from-[#989CA6] via-[#D5D8E0] to-[#B0B4BE] [clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)] shadow-md border-x border-white/40" />

          {/* Flat Aluminum Base Foot Plate */}
          <div className="w-32 sm:w-40 h-2 bg-gradient-to-r from-[#8E929B] via-[#E4E6EB] to-[#8E929B] rounded-full shadow-[0_12px_28px_rgba(0,0,0,0.8)] border-t border-white/50" />
        </div>
      </div>

      {/* 3. 3D PERSPECTIVE STUDIO DESK / FLOOR HORIZON PLANE (00:15 – 00:18) */}
      <div className="w-[115%] h-14 bg-gradient-to-b from-white/[0.04] to-transparent border-t border-white/[0.07] -mt-2 rounded-t-full pointer-events-none relative z-0 flex items-center justify-center">
        {/* Contact Shadow Under Base Foot */}
        <div className="w-44 sm:w-56 h-3 bg-black/60 blur-md rounded-full -mt-5" />
      </div>
    </div>
  );
});

export default StudioDisplayMockup;
