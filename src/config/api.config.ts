/**
 * Oak National Academy API Configuration
 * Now proxied through our backend API
 */

export const OAK_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1/oak';

export const API_ENDPOINTS = {
  keyStages: '/keystages',
  subjects: (keyStage: string) => `/keystages/${keyStage}/subjects`,
  units: (subject: string) => `/subjects/${subject}/units`,
  lessons: (unit: string) => `/units/${unit}/lessons`,
} as const;

export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  cacheTime: 1000 * 60 * 5, // 5 minutes
} as const;
