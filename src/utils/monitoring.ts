'use client';

export type ErrorReport = {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
};

export async function reportError(error: ErrorReport) {
  try {
    await fetch('/api/report-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...error, timestamp: new Date().toISOString() }),
    });
  } catch (networkError) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to report error', networkError);
    }
  }
}
