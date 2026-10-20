'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GyroscopicRings } from './GyroscopicRings';
import { RefractiveCoreOrb } from './RefractiveCoreOrb';
import { ProjectNodes } from './ProjectNodes';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const _targetPos = new THREE.Vector3();

export function Centerpiece() {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth C1 Catmull-Rom splines for zero-jerk, fluid 3D motion during scrolling
  const desktopSpline = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(2.8, 0.2, 0.2),   // t = 0.0: Hero (Right)
          new THREE.Vector3(1.4, -0.1, -1.8),  // t = 0.25: Websites top (Gliding center-back)
          new THREE.Vector3(-0.4, -0.3, -2.6), // t = 0.50: Websites middle (Deep background)
          new THREE.Vector3(-2.6, 0.1, -0.8),  // t = 0.75: Services (Left)
          new THREE.Vector3(2.2, 0.2, 0.0),    // t = 1.0: Contact (Right)
        ],
        false,
        'catmullrom',
        0.5
      ),
    []
  );

  const mobileSpline = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0.0, 1.2, -1.8),   // t = 0.0: Hero (Elevated center)
          new THREE.Vector3(0.2, 0.0, -3.2),   // t = 0.25: Websites top (Deep background)
          new THREE.Vector3(-0.2, -0.2, -3.4), // t = 0.50: Websites middle (Deep background)
          new THREE.Vector3(-0.1, 0.3, -2.4),  // t = 0.75: Services (Background)
          new THREE.Vector3(0.0, 0.6, -1.8),   // t = 1.0: Contact
        ],
        false,
        'catmullrom',
        0.5
      ),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const { scrollProgress, isMobile } = usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);
    const t = Math.max(0, Math.min(1, scrollProgress));

    // Sample the continuous spline curve
    const activeCurve = isMobile ? mobileSpline : desktopSpline;
    activeCurve.getPoint(t, _targetPos);

    // Smoothly interpolate position with frame-independent lerp
    groupRef.current.position.lerp(_targetPos, dt * 4.0);

    // Continuous dynamic rotation on all axes
    groupRef.current.rotation.y += 0.35 * dt;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * Math.PI * 2) * 0.2,
      dt * 2.5
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      Math.cos(t * Math.PI * 2) * 0.15,
      dt * 2.5
    );
  });

  return (
    <group ref={groupRef} position={[2.8, 0.2, 0.2]} name="sculpture-centerpiece">
      <GyroscopicRings />
      <RefractiveCoreOrb />
      <ProjectNodes />
    </group>
  );
}

export default Centerpiece;
