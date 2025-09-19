'use client';

export async function reportError(error: unknown) {
  try {
    const body = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };

    await fetch('/api/report-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (reportError) {
    console.error('Failed to report error', reportError);
  }
}
