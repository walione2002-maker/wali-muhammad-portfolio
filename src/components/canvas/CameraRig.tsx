'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const _camTarget = new THREE.Vector3(0, 0, 11);
const _lookTarget = new THREE.Vector3(0, 0, 0);

export function CameraRig() {
  const { camera } = useThree();
  const initialMountRef = useRef(true);

  useFrame((state, delta) => {
    const { isMobile } = usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);
    const aspect = state.viewport.aspect;

    const baseZ = isMobile ? 12 : 10.5;
    const baseY = isMobile ? 0.3 : 0;
    _camTarget.set(0, baseY, baseZ);

    if (aspect < 1.0) {
      _camTarget.z *= Math.min(1.35, 1.0 / Math.max(aspect, 0.65));
      _camTarget.y += (1.0 - aspect) * 0.4;
    }

    // Subtle pointer parallax on desktop
    if (!isMobile) {
      _camTarget.x += state.pointer.x * 0.35;
      _camTarget.y += state.pointer.y * 0.25;
    }

    if (initialMountRef.current) {
      camera.position.copy(_camTarget);
      camera.lookAt(_lookTarget);
      initialMountRef.current = false;
      return;
    }

    camera.position.lerp(_camTarget, dt * 3.5);
    camera.lookAt(_lookTarget);
  });

  return null;
}

export default CameraRig;
