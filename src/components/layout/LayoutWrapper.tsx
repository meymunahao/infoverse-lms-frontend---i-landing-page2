'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show Header/Footer on auth pages and dashboard pages
  const isAuthPage =
    pathname?.startsWith('/login') || pathname?.startsWith('/register');
  const isDashboardPage =
    pathname?.startsWith('/dashboard') || pathname?.startsWith('/browse');

  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
