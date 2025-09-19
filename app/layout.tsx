import type { Metadata } from 'next';
import { Inter, Inria_Serif } from 'next/font/google';
import type { ReactNode } from 'react';
import '../app/globals.css';
import SkipLinks from '../src/components/accessibility/SkipLinks';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const inriaSerif = Inria_Serif({ subsets: ['latin'], variable: '--font-inria', display: 'swap', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Infoverse Digital-Ed',
  description: 'Unlock a universe of knowledge with adaptive learning paths designed for modern learners.',
  openGraph: {
    title: 'Infoverse Digital-Ed',
    description: 'Personalized exam prep with immersive courses, live cohorts, and real-time progress tracking.',
    url: 'https://infoversedigitaleducation.net',
    siteName: 'Infoverse Digital-Ed',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b',
        width: 1200,
        height: 630,
        alt: 'Learners collaborating online',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infoverse Digital-Ed',
    description: 'Learning reimagined with immersive, data-informed online courses.',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${inriaSerif.variable}`} suppressHydrationWarning>
      <body className="bg-neutral-50">
        <SkipLinks />
        {children}
      </body>
    </html>
  );
}
