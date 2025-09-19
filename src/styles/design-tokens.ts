export const colors = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  accent: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#16a34a',
  warning: '#f59e0b',
  danger: '#dc2626',
  background: '#0f172a',
  surface: '#111c3d',
  foreground: '#f8fafc',
};

export const typography = {
  xs: 'clamp(0.75rem, 0.72rem + 0.15vw, 0.8rem)',
  sm: 'clamp(0.875rem, 0.83rem + 0.2vw, 0.95rem)',
  base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
  lg: 'clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)',
  xl: 'clamp(1.25rem, 1.15rem + 0.35vw, 1.5rem)',
  '2xl': 'clamp(1.5rem, 1.35rem + 0.45vw, 1.875rem)',
  '3xl': 'clamp(1.875rem, 1.65rem + 0.55vw, 2.25rem)',
  '4xl': 'clamp(2.25rem, 1.95rem + 0.65vw, 2.75rem)',
  '5xl': 'clamp(2.75rem, 2.35rem + 0.8vw, 3.5rem)',
  '6xl': 'clamp(3.25rem, 2.75rem + 0.9vw, 4rem)',
  '7xl': 'clamp(3.75rem, 3.15rem + 1vw, 4.5rem)',
};

export const breakpoints = {
  xs: '360px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const spacing = {
  none: '0px',
  '3xs': '0.25rem',
  '2xs': '0.5rem',
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
  '3xl': '6rem',
};

export const designTokens = {
  colors,
  typography,
  breakpoints,
  spacing,
};

export type DesignTokens = typeof designTokens;
