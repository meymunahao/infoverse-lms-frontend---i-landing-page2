'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/key-stages', label: 'Key Stages' },
    { href: '/subjects', label: 'Subjects' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="bg-primary text-white shadow-lg">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-1 shadow-md group-hover:shadow-lg transition-shadow">
              <Image
                src="/LOGO.jpg"
                alt="Infoverse Digital-Ed Logo"
                width={48}
                height={48}
                className="object-cover rounded-full"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold group-hover:text-secondary-light transition-colors">
              Infoverse Digital-Ed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-secondary-light transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login">
              <button className="px-4 py-2 bg-secondary hover:bg-secondary-dark rounded-lg transition-colors font-medium">
                Login
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 hover:text-secondary-light transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full text-left py-2 hover:text-secondary-light transition-colors mt-2">
              Login
            </button>
          </Link>
        </nav>
      </Container>
    </header>
  );
};
