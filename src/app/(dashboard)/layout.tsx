'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-xl mx-2',
        {
          'bg-primary/5 text-primary': isActive,
          'text-gray-500 hover:bg-primary/5 hover:text-primary': !isActive,
        }
      )}
    >
      <span className={clsx("w-5 h-5", isActive ? "text-primary" : "text-gray-400")}>{icon}</span>
      {label}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Determine user badge based on role (defaulting to Free if not present)
  const userRole = user.role === 'premium' ? 'Premium' : 'Free';
  const isPremium = userRole === 'Premium';

  return (
    <div className="min-h-screen bg-background-light flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
               <Image
                  src="/LOGO.jpg"
                  alt="Infoverse"
                  width={32}
                  height={32}
                  className="rounded-lg object-cover"
                />
            </div>
            <span className="font-bold text-gray-900">Infoverse</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-50 text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex lg:flex-col',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-primary/10">
              <Image
                src="/LOGO.jpg"
                alt="Infoverse Digital-Ed Logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Infoverse</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          <NavItem
            href="/dashboard"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
            label="Dashboard"
            isActive={pathname === '/dashboard'}
          />
          <NavItem
            href="/browse"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            label="Browse"
            isActive={pathname?.startsWith('/browse')}
          />
           <NavItem
            href="/learning"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            label="My Learning"
            isActive={pathname === '/learning'}
          />
          <NavItem
            href="/settings"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label="Settings"
            isActive={pathname === '/settings'}
          />
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                 {user.name.charAt(0).toUpperCase()}
             </div>
             <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                 <span className={clsx(
                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                    isPremium ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"
                 )}>
                    {userRole} Account
                 </span>
             </div>
          </div>
          <Button
             variant="outline"
             size="sm"
             fullWidth
             onClick={() => {
                logout();
                router.push('/');
             }}
             className="text-xs h-9"
          >
             Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
           {children}
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
