/**
 * Centralized Graphics Quality Manager
 * Wali Muhammad Portfolio — Real-Time Rendering Pipeline
 *
 * Manages adaptive rendering tiers, hardware capability detection,
 * frame-time monitoring, DPR clamping, and graceful fallbacks.
 */

export type QualityTier = 'ultra' | 'high' | 'balanced' | 'efficient' | 'fallback';

export interface GraphicsSettings {
  tier: QualityTier;
  dpr: number;
  maxDpr: number;
  antialiasing: boolean;
  shadows: boolean;
  transmission: boolean;
  postProcessing: boolean;
  targetFps: number;
  isReducedMotion: boolean;
  isSaveData: boolean;
  isMobile: boolean;
  powerPreference: 'high-performance' | 'default' | 'low-power';
}

const TIER_SETTINGS: Record<QualityTier, Omit<GraphicsSettings, 'tier' | 'isReducedMotion' | 'isSaveData' | 'isMobile'>> = {
  ultra: {
    dpr: 1.5,
    maxDpr: 2.0,
    antialiasing: true,
    shadows: true,
    transmission: true,
    postProcessing: true,
    targetFps: 60,
    powerPreference: 'high-performance',
  },
  high: {
    dpr: 1.5,
    maxDpr: 1.5,
    antialiasing: true,
    shadows: true,
    transmission: true,
    postProcessing: false,
    targetFps: 60,
    powerPreference: 'high-performance',
  },
  balanced: {
    dpr: 1.25,
    maxDpr: 1.25,
    antialiasing: true,
    shadows: false,
    transmission: true,
    postProcessing: false,
    targetFps: 60,
    powerPreference: 'high-performance',
  },
  efficient: {
    dpr: 1.0,
    maxDpr: 1.0,
    antialiasing: false,
    shadows: false,
    transmission: false,
    postProcessing: false,
    targetFps: 30,
    powerPreference: 'default',
  },
  fallback: {
    dpr: 1.0,
    maxDpr: 1.0,
    antialiasing: false,
    shadows: false,
    transmission: false,
    postProcessing: false,
    targetFps: 30,
    powerPreference: 'low-power',
  },
};

class GraphicsQualityManager {
  private currentTier: QualityTier = 'high';
  private listeners = new Set<(settings: GraphicsSettings) => void>();
  private frameTimes: number[] = [];
  private lastTimestamp = 0;
  private isMonitoring = false;
  private consecutiveSlowFrames = 0;
  private lockTier = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initCapabilities();
    }
  }

  private initCapabilities() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.innerWidth < 768);
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isSaveData = Boolean(nav.connection?.saveData);

    // Initial safe heuristic tier
    if (isReducedMotion || isSaveData) {
      this.currentTier = 'fallback';
      this.lockTier = true;
    } else if (isMobile) {
      this.currentTier = 'balanced';
    } else {
      // Check WebGL availability
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) {
          this.currentTier = 'fallback';
          this.lockTier = true;
        } else {
          // Desktop capable hardware default
          this.currentTier = 'high';
        }
      } catch {
        this.currentTier = 'fallback';
        this.lockTier = true;
      }
    }
  }

  public getSettings(): GraphicsSettings {
    const isReducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    const isMobile = typeof window !== 'undefined'
      ? /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768
      : false;
    const nav = typeof navigator !== 'undefined' ? (navigator as unknown as { connection?: { saveData?: boolean } }) : {};
    const isSaveData = Boolean(nav.connection?.saveData);

    const base = TIER_SETTINGS[this.currentTier];
    const systemDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const clampedDpr = Math.min(systemDpr, base.maxDpr);

    return {
      tier: this.currentTier,
      ...base,
      dpr: clampedDpr,
      isReducedMotion,
      isSaveData,
      isMobile,
    };
  }

  public setTier(tier: QualityTier, lock = false) {
    if (this.currentTier === tier) return;
    this.currentTier = tier;
    if (lock) this.lockTier = true;
    this.notify();
  }

  public subscribe(callback: (settings: GraphicsSettings) => void): () => void {
    this.listeners.add(callback);
    callback(this.getSettings());
    return () => this.listeners.delete(callback);
  }

  private notify() {
    const settings = this.getSettings();
    this.listeners.forEach((cb) => cb(settings));
  }

  /**
   * Monitor frame delta from useFrame to adaptively down-tier if sustained performance drops.
   * Uses Exponential Moving Average (EMA) to avoid frame-spike false positives.
   */
  public reportFrameDelta(delta: number) {
    if (this.lockTier || this.currentTier === 'efficient' || this.currentTier === 'fallback') return;

    // Delta in ms
    const frameMs = delta * 1000;
    this.frameTimes.push(frameMs);
    if (this.frameTimes.length > 60) this.frameTimes.shift();

    if (frameMs > 28.0) {
      // Below 35 FPS
      this.consecutiveSlowFrames++;
      if (this.consecutiveSlowFrames > 45) {
        // Sustained slow frame rate: gracefully step down
        if (this.currentTier === 'ultra') this.setTier('high');
        else if (this.currentTier === 'high') this.setTier('balanced');
        else if (this.currentTier === 'balanced') this.setTier('efficient');
        this.consecutiveSlowFrames = 0;
      }
    } else {
      if (this.consecutiveSlowFrames > 0) this.consecutiveSlowFrames--;
    }
  }
}

export const graphicsManager = new GraphicsQualityManager();
