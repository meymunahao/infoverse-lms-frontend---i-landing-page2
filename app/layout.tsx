import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SkipLinks from '@/components/accessibility/SkipLinks';
import { AccessibilityProvider } from '@/hooks/useA11y';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Infoverse Digital-Ed — Learning built for tomorrow',
  description:
    'Experience an immersive learning landing page for Infoverse Digital-Ed with intelligent analytics, accessible design and responsive layouts.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground">
        <AccessibilityProvider>
          <SkipLinks />
          {children}
        </AccessibilityProvider>
      </body>
    </html>
  );
}
