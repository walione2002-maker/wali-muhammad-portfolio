'use client';

import React from 'react';

export function Lighting() {
  return (
    <>
      {/* Studio ambient base illumination */}
      <ambientLight intensity={0.45} color="#0e1320" />

      {/* Primary key light with subtle warm specular sheen */}
      <directionalLight
        position={[12, 18, 12]}
        intensity={1.6}
        color="#ffffff"
        castShadow={false}
      />

      {/* Cool blue fill light to lift shadow details */}
      <directionalLight
        position={[-12, 6, -8]}
        intensity={0.8}
        color="#93c5fd"
      />

      {/* Rim light 1: Sharp cyan/electric blue back-rim highlight */}
      <pointLight
        position={[-9, 7, -9]}
        intensity={2.8}
        color="#38bdf8"
        distance={30}
        decay={2}
      />

      {/* Rim light 2: Warm champagne gold side accent */}
      <pointLight
        position={[9, -6, 9]}
        intensity={2.4}
        color="#F59E0B"
        distance={30}
        decay={2}
      />

      {/* Internal core illumination: Glows from inside the refractive core */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        color="#60a5fa"
        distance={6}
        decay={2}
      />
    </>
  );
}

export default Lighting;
