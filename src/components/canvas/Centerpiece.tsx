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
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Subtle dynamic tilt depending on active section
    let targetRotX = 0;
    let targetRotZ = 0;
    if (activeSectionIndex === 1) {
      targetRotX = 0.15;
      targetRotZ = -0.1;
    } else if (activeSectionIndex === 2) {
      targetRotX = 0.05;
      targetRotZ = 0.05;
    } else if (activeSectionIndex === 3) {
      targetRotX = 0.25;
      targetRotZ = 0.15;
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      dt * 2
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      dt * 2
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} name="procedural-centerpiece">
      <GyroscopicRings />
      <RefractiveCoreOrb />
      <ProjectNodes />
    </group>
  );
}

export default Centerpiece;
