export const colors = {
  primary: {
    50: '#f0f6ff',
    100: '#e0edff',
    200: '#b9d7ff',
    300: '#84b7ff',
    400: '#4a8cff',
    500: '#1a64ff',
    600: '#0d4bdb',
    700: '#0f3caa',
    800: '#133489',
    900: '#122d6f',
  },
  accent: {
    50: '#fff3ef',
    100: '#ffe1d7',
    200: '#ffbda9',
    300: '#ff9271',
    400: '#ff6b41',
    500: '#ff4a1d',
    600: '#db340f',
    700: '#aa260f',
    800: '#881f12',
    900: '#711d14',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5f5',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

export const typographyScale = {
  xs: ['0.75rem', '1.2'],
  sm: ['0.875rem', '1.4'],
  base: ['1rem', '1.6'],
  lg: ['1.125rem', '1.65'],
  xl: ['1.25rem', '1.7'],
  '2xl': ['1.5rem', '1.1'],
  '3xl': ['1.875rem', '1.1'],
  '4xl': ['2.25rem', '1.05'],
  '5xl': ['3rem', '1.05'],
  '6xl': ['3.75rem', '1.02'],
  '7xl': ['4.5rem', '1'],
} as const;

export const breakpoints = {
  xs: '20rem',
  sm: '30rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
} as const;

export const spacingScale = {
  none: '0px',
  '3xs': '0.25rem',
  '2xs': '0.5rem',
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4.5rem',
  '3xl': '6rem',
} as const;

export const designTokens = {
  colors,
  typography: typographyScale,
  breakpoints,
  spacing: spacingScale,
} as const;

export type DesignTokens = typeof designTokens;
