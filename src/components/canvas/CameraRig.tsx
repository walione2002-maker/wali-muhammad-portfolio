'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createCameraSpline, interpolateWaypointData } from '@/lib/cameraPath';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// Reusable module-scoped math objects (strictly ZERO allocations inside useFrame)
const _targetPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 0, 0);

export function CameraRig() {
  const { camera } = useThree();
  const spline = useMemo(() => createCameraSpline(), []);
  const initialMountRef = useRef(true);

  useFrame((state, delta) => {
    const { scrollProgress, hasEntered, isTransitioning } = usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);

    // If pre-enter state, hold at Waypoint 0 with subtle micro-drift
    const t = hasEntered ? scrollProgress : 0;

    // Spline curve position
    spline.getPointAt(t, _targetPos);

    // Responsive aspect-ratio compensation:
    // When aspect < 1.0 (mobile portrait), slightly pull back camera so 3D centerpiece
    // is never cropped horizontally and sits framed behind the mobile cards.
    const aspect = state.viewport.aspect;
    if (aspect < 1.0) {
      const mobileDistanceMultiplier = Math.min(1.45, 1.0 / Math.max(aspect, 0.6));
      _targetPos.multiplyScalar(mobileDistanceMultiplier);
    }

    // Interpolate lookAt and target FOV
    const { lookAt, fov } = interpolateWaypointData(t, _targetLookAt);

    // Pre-enter macro drift
    if (!hasEntered && !isTransitioning) {
      const elapsed = state.clock.getElapsedTime();
      _targetPos.x += Math.sin(elapsed * 0.45) * 0.15;
      _targetPos.y += Math.cos(elapsed * 0.35) * 0.1;
    }

    if (initialMountRef.current) {
      camera.position.copy(_targetPos);
      _currentLookAt.copy(lookAt);
      camera.lookAt(_currentLookAt);
      if ('fov' in camera) {
        (camera as THREE.PerspectiveCamera).fov = fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
      initialMountRef.current = false;
      return;
    }

    // Smooth lerp camera position
    const lerpSpeed = isTransitioning ? dt * 3.5 : dt * 4;
    camera.position.lerp(_targetPos, lerpSpeed);

    // Smooth lerp lookAt target
    _currentLookAt.lerp(lookAt, dt * 4);
    camera.lookAt(_currentLookAt);

    // Update FOV smoothly
    if ('fov' in camera) {
      const persCamera = camera as THREE.PerspectiveCamera;
      if (Math.abs(persCamera.fov - fov) > 0.05) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, fov, dt * 3.5);
        persCamera.updateProjectionMatrix();
      }
    }
  });

  return null;
}

export default CameraRig;
