'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GyroscopicRings } from './GyroscopicRings';
import { RefractiveCoreOrb } from './RefractiveCoreOrb';
import { ProjectNodes } from './ProjectNodes';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function Centerpiece() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const { isMobile, activeSectionIndex } = usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);

    // Continuous dynamic rotation of the entire assembly
    const rotSpeed = activeSectionIndex === 1 ? 0.15 : 0.25; // Slower during website inspection
    groupRef.current.rotation.y += rotSpeed * dt;

    // Responsive positioning: slight horizontal offset on desktop to complement left hero text
    const targetX = isMobile ? 0 : 0.8;
    const targetY = isMobile ? 0.3 : 0;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, dt * 3);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, dt * 3);
  });

  return (
    <group ref={groupRef} position={[0.8, 0, 0]} name="sculpture-centerpiece">
      <GyroscopicRings />
      <RefractiveCoreOrb />
      <ProjectNodes />
    </group>
  );
}

export default Centerpiece;
