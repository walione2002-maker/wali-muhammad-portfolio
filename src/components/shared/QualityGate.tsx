'use client';

import { useGpuTier } from '@/hooks/useGpuTier';

export function QualityGate() {
  useGpuTier();
  return null;
}

export default QualityGate;
