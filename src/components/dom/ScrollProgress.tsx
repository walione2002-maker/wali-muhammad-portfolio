'use client';

import React from 'react';

export function ScrollProgress() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none bg-white/[0.05]"
      aria-hidden="true"
    >
      <div
        id="global-scroll-progress-bar"
        className="h-full w-full origin-left bg-[#FF4D00] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

export default ScrollProgress;
