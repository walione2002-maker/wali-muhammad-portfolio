'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GyroscopicRings } from './GyroscopicRings';
import { RefractiveCoreOrb } from './RefractiveCoreOrb';
import { ProjectNodes } from './ProjectNodes';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const _targetPos = new THREE.Vector3();

export function Centerpiece() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const { scrollProgress, isMobile } = usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);
    const t = scrollProgress;

    // As user scrolls down the page, smoothly animate the 3D sculpture's X/Y/Z position:
    // - Hero (t < 0.15): Gliding on the right side of the Hero (desktop) or upper right (mobile)
    // - Websites Grid (0.15 <= t < 0.65): Sweeping across center behind the 2-column cards
    // - Services (0.65 <= t < 0.82): Orbiting to the left/center
    // - Contact (t >= 0.82): Orbiting close on the right/center
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;

    if (t < 0.15) {
      // Hero: Gliding on the right side of the screen
      targetX = isMobile ? 0 : 3.0;
      targetY = isMobile ? 1.4 : 0.2;
      targetZ = isMobile ? -1.5 : 0.2;
    } else if (t < 0.65) {
      // Websites Grid: Sweeps across the center in the background
      const gridProgress = (t - 0.15) / 0.50;
      targetX = Math.sin(gridProgress * Math.PI) * (isMobile ? 0.6 : 1.8) - (isMobile ? 0 : 0.3);
      targetY = -0.3;
      targetZ = isMobile ? -2.8 : -2.2;
    } else if (t < 0.82) {
      // Services: Orbiting on the left side
      targetX = isMobile ? 0 : -2.8;
      targetY = isMobile ? 0.6 : 0.2;
      targetZ = isMobile ? -1.6 : -0.4;
    } else {
      // Contact: Orbiting on the right side
      targetX = isMobile ? 0 : 2.4;
      targetY = isMobile ? 0.8 : 0.3;
      targetZ = isMobile ? -1.2 : 0.5;
    }

    _targetPos.set(targetX, targetY, targetZ);
    groupRef.current.position.lerp(_targetPos, dt * 3.5);

    // Continuous dynamic rotation on all axes
    groupRef.current.rotation.y += 0.38 * dt;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * Math.PI * 2) * 0.22,
      dt * 2.5
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      Math.cos(t * Math.PI * 2) * 0.15,
      dt * 2.5
    );
  });

  return (
    <group ref={groupRef} position={[3.0, 0, 0]} name="sculpture-centerpiece">
      <GyroscopicRings />
      <RefractiveCoreOrb />
      <ProjectNodes />
    </group>
  );
}

export default Centerpiece;
