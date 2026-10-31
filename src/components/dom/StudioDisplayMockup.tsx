'use client';

import React from 'react';
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

export function StudioDisplayMockup({
  image,
  title = 'Project Preview',
  liveUrl,
  children,
  className = '',
  priority = false,
}: StudioDisplayMockupProps) {
  const content = (
    <div className={`w-full max-w-[720px] mx-auto select-none ${className}`}>
      {/* 1. MONITOR SCREEN BEZEL */}
      <div className="bg-[#0B0B0C] p-2.5 sm:p-3.5 md:p-4 rounded-t-[18px] sm:rounded-t-[22px] border-t border-x border-white/20 shadow-[0_35px_90px_rgba(0,0,0,0.75)] relative group">
        {/* FaceTime Camera Lens & Sensor Dot */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-600/60 shadow-inner flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* 2. INNER 16:10 DISPLAY VIEWPORT */}
        <div className="aspect-[16/10] w-full rounded-[8px] overflow-hidden bg-[#111312] relative border border-white/10 shadow-inner">
          {children ? (
            /* Live 3D / Interactive Canvas Container */
            <div className="w-full h-full relative z-10">{children}</div>
          ) : image ? (
            /* Project High-Resolution Image */
            <div className="w-full h-full relative">
              <Image
                src={image}
                alt={`${title} preview displayed in Apple Studio Display`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
              <span>Display Viewport</span>
            </div>
          )}

          {/* Subtle Glass Screen Reflection Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.07] z-20" />

          {/* Floating Hover Pill for External Links */}
          {liveUrl && !children && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px] z-30 pointer-events-none">
              <div className="bg-[#F4F3EE] text-[#141413] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-2xl flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <span>View live site</span>
                <ArrowUpRight className="w-4 h-4 text-[#141413]" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. SILVER ALUMINUM CHIN (00:15 – 00:18) */}
      <div className="h-7 sm:h-9 w-full bg-gradient-to-b from-[#E2E4E9] via-[#C8CBD2] to-[#9EA2AC] rounded-b-[16px] sm:rounded-b-[20px] border-t border-white/70 shadow-lg flex items-center justify-center relative">
        {/* Subtle center embossed logo/badge */}
        <div className="w-3.5 h-3.5 rounded-full opacity-35 bg-zinc-800 shadow-inner" />
      </div>

      {/* 4. TAPERED SILVER STAND & DESK REFLECTION */}
      <div className="relative z-0">
        {/* Brushed Aluminum Stand Neck */}
        <div className="w-20 sm:w-24 h-8 sm:h-11 bg-gradient-to-b from-[#9EA2AC] via-[#D4D7DF] to-[#AEB2BC] mx-auto [clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)] shadow-md border-x border-white/30" />

        {/* Flat Silver Base Plate */}
        <div className="w-32 sm:w-40 h-1.5 bg-gradient-to-r from-[#8E929B] via-[#E4E6EB] to-[#8E929B] mx-auto rounded-full shadow-[0_12px_30px_rgba(255,255,255,0.08)] border-t border-white/40" />

        {/* Ambient Desk Reflection Glow */}
        <div className="w-48 sm:w-64 h-3 bg-white/[0.05] mx-auto blur-md rounded-full mt-1" />
      </div>
    </div>
  );

  if (liveUrl && !children) {
    return (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open live site for ${title}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default StudioDisplayMockup;
