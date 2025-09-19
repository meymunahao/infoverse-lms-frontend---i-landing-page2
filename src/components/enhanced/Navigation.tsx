'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useA11y } from '@/hooks/useA11y';

const navigation = [
  {
    label: 'Programs',
    href: '#programs',
    description: 'Immersive digital skills pathways designed for modern learners.',
    items: [
      { label: 'AI Literacy', href: '#ai-literacy' },
      { label: 'Product Design', href: '#product-design' },
      { label: 'Cloud Engineering', href: '#cloud' },
    ],
  },
  {
    label: 'Enterprise',
    href: '#enterprise',
    description: 'Custom onboarding, upskilling and analytics for organisations.',
    items: [
      { label: 'Team Analytics', href: '#team-analytics' },
      { label: 'Learning Paths', href: '#learning-paths' },
      { label: 'Talent Pipeline', href: '#talent' },
    ],
  },
  {
    label: 'Community',
    href: '#community',
    description: 'Live events, forums and mentorship to keep learners progressing.',
    items: [
      { label: 'Mentor Sessions', href: '#mentor-sessions' },
      { label: 'Global Hackathons', href: '#hackathons' },
    ],
  },
];

const navMotion = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
};

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { trapFocus, releaseFocus, announce } = useA11y();

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      announce('Navigation menu expanded. Press escape to close.');
      trapFocus(mobileMenuRef.current);
    } else {
      releaseFocus();
    }
  }, [mobileOpen, announce, trapFocus, releaseFocus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setActiveDropdown(null);
        announce('Navigation menu closed.');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [announce]);

  return (
    <header className="sticky top-0 z-50 bg-background/80 shadow-sm shadow-black/5 backdrop-blur-xl">
      <nav className="container flex items-center justify-between py-spacing-sm" aria-label="Primary navigation">
        <Link href="#" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-200 shadow-glow">ID</span>
          <span className="hidden sm:inline">Infoverse Digital-Ed</span>
        </Link>
        <div className="hidden items-center gap-spacing-md lg:flex">
          {navigation.map((item) => (
            <div key={item.label} className="relative">
              <button
                type="button"
                aria-expanded={activeDropdown === item.label}
                data-open={activeDropdown === item.label}
                className="group flex items-center gap-1 rounded-full px-spacing-sm py-2 text-sm font-medium text-neutral-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => setActiveDropdown(item.label)}
                onClick={() =>
                  setActiveDropdown((current) =>
                    current === item.label ? null : item.label,
                  )
                }
              >
                {item.label}
                <ChevronDown
                  className={clsx('h-4 w-4 transition-transform', {
                    'rotate-180': activeDropdown === item.label,
                  })}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    {...navMotion}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-0 mt-3 w-64 rounded-2xl border border-white/10 bg-surface/95 p-spacing-sm shadow-xl backdrop-blur-xl"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <p className="mb-spacing-xs text-xs text-neutral-300">{item.description}</p>
                    <ul className="space-y-spacing-3xs">
                      {item.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-lg px-spacing-2xs py-2 text-sm text-neutral-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link
            href="#apply"
            className="rounded-full bg-primary-500 px-spacing-sm py-2 text-sm font-semibold text-background shadow-glow transition hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
          >
            Apply now
          </Link>
          <Link
            href="#demo"
            className="rounded-full border border-white/20 px-spacing-sm py-2 text-sm font-semibold text-neutral-100 transition hover:border-primary-300 hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            Request demo
          </Link>
        </div>
        <button
          type="button"
          className="lg:hidden"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden"
          >
            <div className="space-y-spacing-xs border-t border-white/10 bg-surface/95 px-spacing-md pb-spacing-md pt-spacing-sm shadow-xl backdrop-blur-2xl">
              <ul className="space-y-spacing-2xs" role="list">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl bg-white/5 px-spacing-sm py-spacing-2xs text-left text-sm font-semibold text-neutral-100"
                      aria-expanded={activeDropdown === item.label}
                      onClick={() =>
                        setActiveDropdown((current) => (current === item.label ? null : item.label))
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={clsx('h-5 w-5 transition-transform', {
                          'rotate-180': activeDropdown === item.label,
                        })}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeDropdown === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-spacing-3xs space-y-spacing-3xs overflow-hidden px-spacing-2xs"
                        >
                          {item.items.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg px-spacing-2xs py-2 text-sm text-neutral-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-spacing-2xs">
                <Link
                  href="#apply"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-primary-500 px-spacing-sm py-spacing-2xs text-center text-sm font-semibold text-background shadow-glow"
                >
                  Apply now
                </Link>
                <Link
                  href="#demo"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-white/20 px-spacing-sm py-spacing-2xs text-center text-sm font-semibold text-neutral-100"
                >
                  Request demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
