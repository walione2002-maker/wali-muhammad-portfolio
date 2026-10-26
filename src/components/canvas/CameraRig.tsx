'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { createCameraSpline, interpolateWaypointData } from '@/lib/cameraPath';

// Module-scoped reusable math objects to ensure strictly ZERO allocations in useFrame
const _camTarget = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();
const _tempSplinePos = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const spline = useMemo(() => createCameraSpline(), []);
  const initialMountRef = useRef(true);

  useFrame((state, delta) => {
    const { hasEntered, isTransitioning, entryProgress, scrollProgress, isMobile } =
      usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);
    const aspect = state.viewport.aspect;

    // 1. Entry Gate State: Camera holds close or warps during transition
    if (!hasEntered) {
      if (isTransitioning) {
        // FOV Warp stretch 46 -> 60 -> 46
        const warpFov = 46 + Math.sin(entryProgress * Math.PI) * 14;
        (camera as THREE.PerspectiveCamera).fov = warpFov;
        camera.updateProjectionMatrix();

        // Slight push back as entry proceeds
        _camTarget.set(0, 0.2, 11.2 + (1 - entryProgress) * 2.0);
      } else {
        // Holding at initial gate position
        _camTarget.set(0, 0.2, 13.0);
        (camera as THREE.PerspectiveCamera).fov = 48;
        camera.updateProjectionMatrix();
      }
      _lookTarget.set(0, 0, 0);

      camera.position.lerp(_camTarget, dt * 5.0);
      camera.lookAt(_lookTarget);
      return;
    }

    // 2. Normal Entered State: Camera moves along Catmull-Rom spline with scroll
    const t = Math.max(0, Math.min(1, scrollProgress));
    spline.getPointAt(t, _tempSplinePos);
    _camTarget.copy(_tempSplinePos);

    // Mobile aspect ratio compensation (prevent clipping in vertical viewports)
    if (aspect < 1.0) {
      _camTarget.z *= Math.min(1.4, 1.0 / Math.max(aspect, 0.65));
      _camTarget.y += (1.0 - aspect) * 0.5;
    }

    // Subtle pointer parallax on desktop
    if (!isMobile) {
      _camTarget.x += state.pointer.x * 0.45;
      _camTarget.y += state.pointer.y * 0.3;
    }

    // Interpolate lookAt & FOV from waypoints
    const waypointData = interpolateWaypointData(t, _lookTarget);
    const targetFov = waypointData.fov;

    const persCam = camera as THREE.PerspectiveCamera;
    if (Math.abs(persCam.fov - targetFov) > 0.05) {
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetFov, dt * 3.0);
      persCam.updateProjectionMatrix();
    }

    if (initialMountRef.current) {
      camera.position.copy(_camTarget);
      camera.lookAt(_lookTarget);
      initialMountRef.current = false;
      return;
    }

    camera.position.lerp(_camTarget, dt * 4.0);
    camera.lookAt(_lookTarget);
  });

  return null;
}

export default CameraRig;
