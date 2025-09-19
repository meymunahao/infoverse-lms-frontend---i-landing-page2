import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';
import { designTokens } from './src/styles/design-tokens';

const fluidSize = (value: string) => {
  const numeric = Number.parseFloat(value.replace('rem', ''));
  const min = (numeric * 0.9).toFixed(3);
  const max = (numeric * 1.1).toFixed(3);
  return `clamp(${min}rem, calc(${numeric.toFixed(3)}rem + 0.5vw), ${max}rem)`;
};

const fontSize = Object.fromEntries(
  Object.entries(designTokens.typography).map(([key, [size, lineHeight]]) => [
    key,
    [fluidSize(size), { lineHeight }],
  ]),
);

const spacing = Object.fromEntries(
  Object.entries(designTokens.spacing).map(([key, value]) => [key, value]),
);

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  white: '#ffffff',
  black: '#000000',
  primary: designTokens.colors.primary,
  accent: designTokens.colors.accent,
  neutral: designTokens.colors.neutral,
};

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: spacing.sm,
        sm: spacing.sm,
        lg: spacing.lg,
        xl: spacing.lg,
        '2xl': spacing.xl,
      },
      screens: designTokens.breakpoints,
    },
    extend: {
      colors,
      spacing,
      fontSize,
      screens: designTokens.breakpoints,
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Inria Serif"', 'serif'],
      },
      borderRadius: {
        xl: '1.5rem',
      },
      boxShadow: {
        elevated: '0 10px 30px rgba(17, 24, 39, 0.12)',
      },
    },
  },
  plugins: [
    animatePlugin,
    plugin(({ addVariant }) => {
      addVariant('supports-backdrop', '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))');
    }),
  ],
};

export default config;
