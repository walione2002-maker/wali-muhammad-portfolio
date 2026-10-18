import * as THREE from 'three';

export interface CameraWaypoint {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  sectionId: number; // 0–4
  sectionName: string;
}

export const WAYPOINTS: CameraWaypoint[] = [
  {
    position: new THREE.Vector3(0, 0, 12),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 50,
    sectionId: 0,
    sectionName: 'entry-gate',
  },
  {
    position: new THREE.Vector3(6, 4, 8),
    lookAt: new THREE.Vector3(0, 0.5, 0),
    fov: 45,
    sectionId: 1,
    sectionName: 'executive-overview',
  },
  {
    position: new THREE.Vector3(8, 1, 0),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 40,
    sectionId: 2,
    sectionName: 'project-showroom',
  },
  {
    position: new THREE.Vector3(4, 6, -5),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 42,
    sectionId: 3,
    sectionName: 'tech-stack',
  },
  {
    position: new THREE.Vector3(0, 3, 4),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 35,
    sectionId: 4,
    sectionName: 'contact-portal',
  },
];

/**
 * Builds a CatmullRomCurve3 through all 5 position waypoints.
 * Tension is 0.35 for smooth, non-overshooting arcs.
 */
export function createCameraSpline(): THREE.CatmullRomCurve3 {
  const points = WAYPOINTS.map((w) => w.position.clone());
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
}

// Reusable module vector to satisfy zero-allocation in useFrame
const _tempLookAt = new THREE.Vector3();

/**
 * Interpolates lookAt target and FOV for a given normalized scroll t in [0, 1].
 * An optional target vector can be supplied to prevent GC allocations.
 */
export function interpolateWaypointData(t: number, targetLookAt?: THREE.Vector3) {
  const clampedT = Math.max(0, Math.min(1, t));
  const segmentCount = WAYPOINTS.length - 1; // 4 segments
  const rawIndex = clampedT * segmentCount;
  const i = Math.min(Math.floor(rawIndex), segmentCount - 1);
  const alpha = rawIndex - i;

  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];

  const dest = targetLookAt || _tempLookAt;
  dest.copy(a.lookAt).lerp(b.lookAt, alpha);

  const fov = THREE.MathUtils.lerp(a.fov, b.fov, alpha);
  const sectionId = alpha < 0.5 ? a.sectionId : b.sectionId;
  const sectionName = alpha < 0.5 ? a.sectionName : b.sectionName;

  return {
    lookAt: dest,
    fov,
    sectionId,
    sectionName,
  };
}
