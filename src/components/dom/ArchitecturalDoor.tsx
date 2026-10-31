'use client';

import React, { useRef, useState } from 'react';
import { type DoorConfig, type DoorCategoryId } from '@/types';

export interface ArchitecturalDoorProps {
  door: DoorConfig;
  isOpen?: boolean;
  isOpening?: boolean;
  onClick: (doorId: DoorCategoryId, element: HTMLElement) => void;
  compact?: boolean;
  className?: string;
}

export function ArchitecturalDoor({
  door,
  isOpen = false,
  isOpening = false,
  onClick,
  compact = false,
  className = '',
}: ArchitecturalDoorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      onClick(door.id, containerRef.current);
    }
  };

  // Door Leaf 3D Physics:
  // Default: 0deg, Hover: -11deg, Opening/Open: -78deg
  const doorRotationY = isOpening || isOpen ? -78 : isHovered ? -11 : 0;

  // Handle Rotation:
  // Default: 0deg, Hover: -22deg, Opening/Open: -35deg
  const handleRotation = isOpening || isOpen ? -35 : isHovered ? -22 : 0;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group [perspective:1600px] transition-transform duration-300 ${
        compact
          ? 'w-full max-w-[270px] sm:max-w-[290px] h-[390px] sm:h-[450px]'
          : 'w-[280px] sm:w-[320px] md:w-[340px] h-[470px] sm:h-[530px]'
      } ${className}`}
      style={{
        filter: isHovered || isOpening ? `drop-shadow(0 20px 40px ${door.colors.glow})` : undefined,
      }}
    >
      {/* 1. OUTER MOLDED ARCHITRAVE FRAME */}
      <div
        className="absolute inset-0 rounded-t-[14px] p-2.5 sm:p-3 border-t-4 border-x-2 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col justify-end"
        style={{
          backgroundColor: door.colors.panelDark,
          borderColor: door.colors.trim,
        }}
      >
        {/* Architrave stepped inner edge highlight */}
        <div className="absolute inset-0.5 rounded-t-[12px] border-t border-x border-white/20 pointer-events-none" />

        {/* 2. DARK INTERIOR PORTAL CAVITY (BEHIND THE DOOR LEAF) */}
        <div
          className="relative w-full h-full rounded-t-[10px] bg-[#050706] overflow-hidden flex items-center justify-center border border-black/60 shadow-inner"
          style={{
            boxShadow: `inset 0 0 55px ${door.colors.glow}`,
          }}
        >
          {/* Subtle warm vertical portal light beam that intensifies on crack / swing */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-white/30 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isOpening || isOpen ? 0.95 : isHovered ? 0.6 : 0.15,
            }}
          />
          {/* Portal glow aura */}
          <div
            className="w-24 h-48 rounded-full blur-2xl transition-transform duration-700 pointer-events-none"
            style={{
              backgroundColor: door.colors.accentHex,
              opacity: isOpening || isOpen ? 0.75 : isHovered ? 0.45 : 0.2,
              transform: isOpening || isOpen ? 'scale(2.5)' : 'scale(1)',
            }}
          />

          {/* 3. THE SWINGING DOOR LEAF */}
          <div
            className="absolute inset-0 rounded-t-[8px] flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{
              backgroundColor: door.colors.primary,
              backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 2px, transparent 2px, transparent 10px)`,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${doorRotationY}deg)`,
              transition: isOpening
                ? 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)'
                : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)',
              boxShadow:
                isOpening || isHovered
                  ? '18px 0 35px rgba(0,0,0,0.65)'
                  : '4px 0 15px rgba(0,0,0,0.4)',
            }}
          >
            {/* Door Leaf Outer 3D Bevel Trim */}
            <div className="absolute inset-0 border border-white/10 rounded-t-[8px] pointer-events-none" />

            {/* TOP RECESSED WAINSCOT PANEL */}
            <div className="w-[84%] h-[36%] mx-auto mt-4 sm:mt-5 rounded-[8px] border-2 border-black/35 shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.45)] relative flex flex-col items-center justify-start p-2 sm:p-3 bg-black/10">
              {/* Inner recessed rim highlight */}
              <div className="absolute inset-1 rounded-[6px] border border-black/20 pointer-events-none" />

              {/* POLISHED BRASS NAMEPLATE PLAQUE (Top Center — exact match to video 00:04 – 00:06) */}
              <div className="bg-gradient-to-b from-[#FCE38A] via-[#D4AF37] to-[#8E6E14] text-[#1A1405] px-3 sm:px-3.5 py-1.5 rounded-[5px] border border-[#FFF3B0]/60 shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative mx-auto mt-3 sm:mt-4 w-[90%] text-center select-none">
                {/* 4 Tiny Brass Corner Rivets */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />

                {/* Bold Engraved Uppercase Nameplate Text */}
                <span className="font-sans font-black tracking-[0.14em] text-[9px] sm:text-[10px] md:text-[11px] uppercase block drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] truncate">
                  {door.nameplate}
                </span>
              </div>
            </div>

            {/* BOTTOM RECESSED WAINSCOT PANEL */}
            <div className="w-[84%] h-[46%] mx-auto mb-4 sm:mb-5 rounded-[8px] border-2 border-black/35 shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.45)] relative flex items-center justify-center bg-black/10">
              {/* Inner sub-panel molding */}
              <div className="w-[82%] h-[82%] rounded-[5px] border border-black/30 shadow-inner" />
            </div>

            {/* SCULPTED GOLD LEVER HANDLE & KEYHOLE ESCUTCHEON (Right Edge of Door) */}
            <div className="absolute right-3.5 top-[52%] -translate-y-1/2 z-20 flex flex-col items-end gap-1.5">
              {/* Floating "Click to open" Pill Badge (video 00:05 & 00:06) */}
              <div
                className={`absolute right-14 top-0 -translate-y-1 bg-[#F4F3EE] text-[#141413] text-[10px] sm:text-[11px] font-semibold px-3 py-1 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.5)] border border-black/10 whitespace-nowrap transition-all duration-300 pointer-events-none flex items-center gap-1.5 ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-85'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Click to open</span>
              </div>

              {/* Gold Lever Handle: Rosette backplate + Lever bar */}
              <div className="relative flex items-center justify-end">
                {/* Circular brass rosette backplate */}
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-b from-[#FFF099] via-[#D4AF37] to-[#7A5C0D] border border-[#FFF3B0]/80 shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center relative z-10" />

                {/* Sculpted horizontal gold lever bar */}
                <div
                  className="w-9 sm:w-12 h-2 sm:h-2.5 rounded-full bg-gradient-to-b from-[#FFF099] via-[#D4AF37] to-[#7A5C0D] shadow-[0_4px_10px_rgba(0,0,0,0.6)] origin-right transition-transform duration-300 absolute right-2.5 sm:right-3"
                  style={{
                    transform: `rotate(${handleRotation}deg)`,
                  }}
                />
              </div>

              {/* Brass Keyhole Plate: Oval gold escutcheon with skeleton keyhole */}
              <div className="w-3.5 sm:w-4 h-5 sm:h-6 rounded-full bg-gradient-to-b from-[#FFF099] via-[#D4AF37] to-[#7A5C0D] border border-[#FFF3B0]/60 shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center mt-1 mr-1">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1A1405]" />
                  <div className="w-0.5 h-1.5 bg-[#1A1405] -mt-0.5 rounded-b-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outer Frame Bottom Threshold Sill */}
        <div className="w-full h-2 rounded-b-sm bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 border-t border-black/40 mt-1 shadow-md" />
      </div>
    </div>
  );
}

export default ArchitecturalDoor;
