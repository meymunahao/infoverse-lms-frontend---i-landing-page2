'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Public navigation links (visible to logged out users only)
  const publicNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
  ];

  // Authenticated navigation links (only visible when logged in)
  // Logged-in users only see Dashboard and Browse
  const authenticatedNavLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/browse', label: 'Browse' },
  ];

  // Determine which nav links to show - logged in users see ONLY authenticated links
  const navLinks = user ? authenticatedNavLinks : publicNavLinks;

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-white/80 backdrop-blur-md border-b border-gray-100"
      )}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-primary/5">
              <Image
                src="/Transparent logo.png"
                alt="Infoverse Logo"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight">
              Infoverse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}

            {/* Logged Out: Show CTA buttons */}
            {!user && (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="px-5">
                    Login
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="primary" size="sm" className="px-6 shadow-sm">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            )}

            {/* Logged In: Show user menu */}
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-5"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="flex flex-col space-y-2 pt-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Logged Out: Show CTA buttons */}
            {!user && (
              <div className="flex flex-col gap-2 pt-2 px-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth variant="primary">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            )}

            {/* Logged In: Show user info and logout */}
            {user && (
              <div className="flex flex-col gap-2 pt-4 px-4 border-t border-gray-100 mt-2">
                <div className="text-sm text-gray-600 pb-2">
                  Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
                </div>
                <Button
                  fullWidth
                  variant="outline"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};