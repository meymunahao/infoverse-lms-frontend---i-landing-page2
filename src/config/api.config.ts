/**
 * Oak National Academy API Configuration
 */

export const OAK_API_BASE_URL = 'https://api.thenational.academy';

export const API_ENDPOINTS = {
  keyStages: '/key-stages',
  subjects: '/subjects',
  units: '/units',
  lessons: '/lessons',
  years: '/years',
} as const;

export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  cacheTime: 1000 * 60 * 5, // 5 minutes
} as const;
