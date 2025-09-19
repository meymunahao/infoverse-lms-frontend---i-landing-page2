import type { Config } from 'tailwindcss';
import { colors, typography, breakpoints, spacing } from './src/styles/design-tokens';
import animatePlugin from 'tailwindcss-animate';

const spacingScale = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => [`spacing-${key}`, value]),
);

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: spacing.md,
        sm: spacing.lg,
        lg: spacing.lg,
        xl: spacing.xl,
      },
      screens: breakpoints,
    },
    extend: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        foreground: colors.foreground,
        primary: {
          ...colors.primary,
          DEFAULT: colors.primary[500],
        },
        accent: {
          ...colors.accent,
          DEFAULT: colors.accent[400],
        },
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
      },
      fontSize: typography,
      spacing: {
        ...spacingScale,
        ...spacing,
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.25)',
        card: '0 24px 70px rgba(15, 23, 42, 0.35)',
      },
      backdropBlur: {
        xs: '4px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(4px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', filter: 'blur(20px)' },
          '50%': { opacity: '0.95', filter: 'blur(30px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 8s ease-in-out infinite',
      },
      screens: breakpoints,
    },
  },
  plugins: [animatePlugin],
};

export default config;
