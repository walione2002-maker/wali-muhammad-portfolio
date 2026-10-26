import * as THREE from 'three';

export interface CameraWaypoint {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  sectionId: number;
  sectionName: string;
}

export const WAYPOINTS: CameraWaypoint[] = [
  {
    // Section 0: Hero
    position: new THREE.Vector3(0, 0.2, 11.2),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 46,
    sectionId: 0,
    sectionName: 'hero',
  },
  {
    // Section 1: Websites Showcase (Orbital side perspective)
    position: new THREE.Vector3(5.8, 1.2, 7.2),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 42,
    sectionId: 1,
    sectionName: 'websites',
  },
  {
    // Section 2: Services (Elevated architectural 3/4)
    position: new THREE.Vector3(-4.6, 3.6, 5.0),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 38,
    sectionId: 2,
    sectionName: 'services',
  },
  {
    // Section 3: Contact & About (Intimate overhead approach)
    position: new THREE.Vector3(0, 2.8, 5.8),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 35,
    sectionId: 3,
    sectionName: 'contact',
  },
];

/**
 * Builds a CatmullRomCurve3 through all 4 section waypoints.
 * Tension is 0.35 for smooth, natural curvature without overshoot.
 */
export function createCameraSpline(): THREE.CatmullRomCurve3 {
  const points = WAYPOINTS.map((w) => w.position.clone());
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
}

// Reusable module vector to satisfy strictly zero GC allocations in useFrame
const _tempLookAt = new THREE.Vector3();

/**
 * Interpolates lookAt target and FOV for a given normalized scroll t in [0, 1].
 */
export function interpolateWaypointData(t: number, targetLookAt?: THREE.Vector3) {
  const clampedT = Math.max(0, Math.min(1, t));
  const segmentCount = WAYPOINTS.length - 1; // 3 segments
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
