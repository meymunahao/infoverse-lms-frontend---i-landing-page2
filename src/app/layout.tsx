import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutWrapper } from '@/components/layout';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Infoverse Digital-Ed | Educational Platform',
  description:
    'Access quality educational content from Oak National Academy for Key Stages 1-4. Explore subjects, units, and lessons aligned with the UK curriculum.',
  keywords: [
    'education',
    'Oak National Academy',
    'Key Stages',
    'UK curriculum',
    'learning',
    'lessons',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
