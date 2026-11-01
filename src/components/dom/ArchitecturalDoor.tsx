'use client';

import React, { useRef, useState, memo } from 'react';
import { type DoorConfig, type DoorCategoryId } from '@/types';

export interface ArchitecturalDoorProps {
  door: DoorConfig;
  isOpen?: boolean;
  isOpening?: boolean;
  onClick: (doorId: DoorCategoryId, element: HTMLElement) => void;
  compact?: boolean;
  className?: string;
}

export const ArchitecturalDoor = memo(function ArchitecturalDoor({
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

  // Door Leaf 3D Inward Swing Physics (00:04, 00:05, 00:14)
  // Default: 0deg, Hover: -12deg, Opening/Open: -82deg
  const doorRotationY = isOpening || isOpen ? -82 : isHovered ? -12 : 0;

  // Gold Lever Handle Depression Physics (00:05, 00:13, 00:14)
  // Default: 0deg, Hover: -25deg, Opening/Open: -42deg
  const handleRotation = isOpening || isOpen ? -42 : isHovered ? -25 : 0;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none cursor-pointer group [perspective:1600px] transition-transform duration-300 transform-gpu ${
        compact
          ? 'w-[230px] sm:w-[260px] h-[390px] sm:h-[450px]'
          : 'w-[250px] sm:w-[285px] h-[430px] sm:h-[490px]'
      } ${className}`}
      style={{
        filter: isHovered || isOpening ? `drop-shadow(0 20px 45px ${door.colors.glow})` : undefined,
      }}
    >
      {/* 1. OUTER STEPPED DOOR FRAME (MOLDED CASING — 00:04 – 00:07 & 00:13) */}
      <div
        className="absolute inset-0 rounded-t-[18px] p-3 sm:p-3.5 border-t-2 border-x-2 border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col justify-end"
        style={{
          backgroundColor: door.colors.panelDark,
          borderColor: door.colors.trim,
        }}
      >
        {/* Molded Architrave Stepped Inner Edge Highlight */}
        <div className="absolute inset-1 rounded-t-[14px] border-t border-x border-white/15 pointer-events-none" />

        {/* 2. PITCH-BLACK PORTAL INTERIOR (DEEP ROOM CAVITY BEHIND DOOR LEAF — 00:14) */}
        <div
          className="relative w-full h-full rounded-t-[12px] bg-[#040505] overflow-hidden flex items-center justify-center border border-black/80 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]"
        >
          {/* Subtle vertical inner left edge highlight */}
          <div className="w-[1px] h-full absolute left-0 top-0 bg-white/10 pointer-events-none" />

          {/* Atmospheric Portal Light Beam (intensifies on crack / full inward swing) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/25 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isOpening || isOpen ? 0.95 : isHovered ? 0.55 : 0.15,
            }}
          />

          {/* Portal Glow Aura */}
          <div
            className="w-28 h-56 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: door.colors.accentHex,
              opacity: isOpening || isOpen ? 0.8 : isHovered ? 0.5 : 0.2,
              transform: isOpening || isOpen ? 'scale(2.6)' : 'scale(1)',
            }}
          />

          {/* 3. 3D SWINGING DOOR SLAB WITH REAL SIDE-EDGE THICKNESS (00:04 – 00:14) */}
          <div
            className="absolute inset-0 rounded-t-[10px] [transform-style:preserve-3d] pointer-events-none will-change-transform transform-gpu"
            style={{
              transformOrigin: 'left center',
              transform: `rotateY(${doorRotationY}deg)`,
              transition: isOpening
                ? 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)'
                : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {/* FRONT FACE OF THE DOOR SLAB */}
            <div
              className="absolute inset-0 rounded-t-[10px] flex flex-col justify-between overflow-hidden shadow-2xl border border-white/10"
              style={{
                backgroundColor: door.colors.primary,
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 8px)',
                boxShadow:
                  isOpening || isHovered
                    ? '20px 0 40px rgba(0,0,0,0.75)'
                    : '6px 0 18px rgba(0,0,0,0.5)',
              }}
            >
              {/* UPPER RECESSED WAINSCOT MOLDING FRAME */}
              <div className="w-[84%] h-[38%] mx-auto mt-4 sm:mt-5 rounded-[8px] border-2 border-black/40 shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.5)] relative flex flex-col items-center justify-start p-2 sm:p-2.5 bg-black/15">
                {/* Inner molding highlight rim */}
                <div className="absolute inset-1 rounded-[6px] border border-black/25 pointer-events-none" />

                {/* POLISHED BRASS NAMEPLATE (Top Center Plaque — 00:04 – 00:06 & 00:13) */}
                <div className="w-[78%] mx-auto mt-6 py-2 px-3 rounded-[6px] bg-gradient-to-b from-[#FDEB93] via-[#D8B141] to-[#967215] border border-[#FFF6C2]/70 shadow-[0_6px_15px_rgba(0,0,0,0.55)] relative text-center select-none">
                  {/* 4 Brass Corner Screws */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#5C4509] border border-[#FFF3B0]/70" />

                  {/* Bold Engraved Uppercase Nameplate Text */}
                  <span className="font-sans font-black tracking-[0.15em] text-[9px] sm:text-[10px] md:text-[11px] uppercase block text-[#141209] drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)] truncate">
                    {door.nameplate}
                  </span>
                </div>
              </div>

              {/* LOWER RECESSED WAINSCOT MOLDING FRAME */}
              <div className="w-[84%] h-[44%] mx-auto mb-4 sm:mb-5 rounded-[8px] border-2 border-black/40 shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.5)] relative flex items-center justify-center bg-black/15">
                {/* Inner sub-panel molding */}
                <div className="w-[82%] h-[82%] rounded-[5px] border border-black/30 shadow-inner" />
              </div>
            </div>

            {/* REAL 3D EXTRUDED RIGHT-THICKNESS EDGE (14px thick slab visible at 00:14) */}
            <div
              className="w-[14px] h-full absolute right-0 top-0 origin-right [transform:rotateY(90deg)] shadow-inner border-l border-white/20 pointer-events-none"
              style={{
                backgroundColor: door.colors.panelDark,
                boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.6)',
              }}
            />

            {/* REAL 3D EXTRUDED TOP-THICKNESS EDGE */}
            <div
              className="h-[14px] w-full absolute top-0 left-0 origin-top [transform:rotateX(-90deg)] shadow-inner border-b border-white/15 pointer-events-none"
              style={{
                backgroundColor: door.colors.panelDark,
              }}
            />

            {/* REAR FACE OF THE DOOR SLAB (visible in 3D perspective during inward swing) */}
            <div
              className="absolute inset-0 rounded-t-[10px] [transform:translateZ(-14px)] pointer-events-none border border-white/5 shadow-2xl"
              style={{
                backgroundColor: door.colors.panelDark,
              }}
            />

            {/* SCULPTED BRASS LEVER HANDLE & KEYHOLE ESCUTCHEON (Right Edge — 00:05, 00:13, 00:14) */}
            <div className="absolute right-3.5 top-[54%] -translate-y-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
              {/* Circular Brass Rosette Backplate */}
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-b from-[#FFF3A8] via-[#D4AF37] to-[#785A0A] border border-[#FFF6C2]/80 shadow-[0_2px_6px_rgba(0,0,0,0.65)] flex items-center justify-center relative">
                {/* Center Pivot Screw */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#4A3906]" />

                {/* Sculpted 3D Horizontal Gold Lever Handle Bar */}
                <div
                  className="w-11 h-2.5 rounded-full bg-gradient-to-b from-[#FFF3A8] via-[#D4AF37] to-[#785A0A] shadow-[0_5px_12px_rgba(0,0,0,0.75)] origin-right transition-transform duration-300 absolute right-2.5 sm:right-3 will-change-transform transform-gpu"
                  style={{
                    transform: `rotate(${handleRotation}deg)`,
                  }}
                />
              </div>

              {/* Vertical Oval Brass Keyhole Escutcheon Plate (00:14) */}
              <div className="w-4 h-7 rounded-full bg-gradient-to-b from-[#FCE38A] via-[#C59B27] to-[#785A0A] border border-[#FFF6C2]/60 shadow-md flex flex-col items-center justify-center mt-1">
                {/* Dark Keyhole Cutout (Circle + Slot) */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#181307]" />
                <div className="w-0.5 h-2 bg-[#181307] -mt-0.5 rounded-b-sm" />
              </div>
            </div>

            {/* FLOATING "CLICK TO OPEN" PILL BADGE (00:05 & 00:06) */}
            <div
              className={`absolute right-16 top-[54%] -translate-y-1/2 bg-[#F4F3EE] text-[#141413] text-xs font-semibold px-4 py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6)] border border-black/10 whitespace-nowrap transition-all duration-300 pointer-events-none flex items-center gap-2 z-40 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-85'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Click to open</span>
            </div>
          </div>
        </div>

        {/* Outer Frame Bottom Threshold Sill (Sitting flush on horizontal floor line) */}
        <div className="w-full h-2 rounded-b-sm bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 border-t border-black/40 mt-1 shadow-md" />
      </div>
    </div>
  );
});

export default ArchitecturalDoor;
