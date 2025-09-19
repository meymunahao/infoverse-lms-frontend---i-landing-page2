'use client';

import { useEffect } from 'react';

export type PerformancePayload = {
  name: string;
  duration: number;
  timestamp: number;
};

type Reporter = (payload: PerformancePayload) => void;

const defaultReporter: Reporter = (payload) => {
  if (process.env.NODE_ENV !== 'production') {
    console.table([{ Component: payload.name, 'Render (ms)': payload.duration.toFixed(2) }]);
  }
};

export function usePerformanceMonitor(name: string, reporter: Reporter = defaultReporter) {
  useEffect(() => {
    if (typeof performance === 'undefined') return;
    const startMark = `${name}-start-${crypto.randomUUID()}`;
    performance.mark(startMark);

    return () => {
      const endMark = `${name}-end-${crypto.randomUUID()}`;
      performance.mark(endMark);
      const measureName = `${name}-${Date.now()}`;
      performance.measure(measureName, startMark, endMark);
      const entries = performance.getEntriesByName(measureName);
      const duration = entries.at(-1)?.duration ?? 0;
      reporter({ name, duration, timestamp: Date.now() });
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
    };
  }, [name, reporter]);
}
