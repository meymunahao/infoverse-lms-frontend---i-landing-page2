'use client';

import { useEffect } from 'react';

type Measure = {
  label: string;
  duration: number;
};

type Callback = (measure: Measure) => void;

const subscribers = new Set<Callback>();

export function subscribePerformance(callback: Callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function recordRender(label: string, startMark: number) {
  const duration = performance.now() - startMark;
  subscribers.forEach((callback) => callback({ label, duration }));
}

export function usePerformanceMonitor(label: string) {
  useEffect(() => {
    const start = performance.now();
    requestAnimationFrame(() => recordRender(label, start));
  }, [label]);
}
