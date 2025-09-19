'use client';

import clsx from 'clsx';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useAnnouncer, useFocusTrap } from '@/hooks/useA11y';

const navigation = [
  {
    label: 'Programs',
    href: '#courses',
    description: 'Browse live cohorts, masterclasses, and bootcamps.',
    children: [
      { label: 'STEM Excellence', href: '#courses', description: 'Interactive STEM exam prep.' },
      { label: 'Humanities Accelerator', href: '#courses', description: 'Essay coaching and language mastery.' },
      { label: 'Professional Certifications', href: '#courses', description: 'Industry-recognised certifications.' },
    ],
  },
  {
    label: 'Outcomes',
    href: '#dashboard',
    description: 'View personalised analytics to stay on track.',
    children: [
      { label: 'Progress Insights', href: '#dashboard' },
      { label: 'Mentor Feedback', href: '#testimonials' },
      { label: 'Success Stories', href: '#success' },
    ],
  },
  {
    label: 'Resources',
    href: '#resources',
    description: 'Toolkits, guides, and exam strategies for students.',
    children: [
      { label: 'Resource Library', href: '#resources' },
      { label: 'Live Events', href: '#events' },
      { label: 'Help Centre', href: '#footer' },
    ],
  },
];

function Dropdown({
  label,
  description,
  children,
}: (typeof navigation)[number]) {
  const [open, setOpen] = useState(false);
  const buttonId = `${label.toLowerCase()}-menu`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={`${buttonId}-trigger`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-primary-600 focus-visible:text-primary-600"
      >
        {label}
        <ChevronDown className="size-4" aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          aria-labelledby={`${buttonId}-trigger`}
          className="absolute left-0 mt-3 min-w-[16rem] rounded-xl border border-neutral-200 bg-white p-4 shadow-elevated"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">{description}</p>
          <ul className="space-y-2">
            {children?.map((item) => (
              <li key={item.label}>
                <Link
                  className="block rounded-lg p-3 text-sm text-neutral-700 transition hover:bg-neutral-100 focus-visible:bg-primary-50"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                >
                  <span className="font-medium text-neutral-900">{item.label}</span>
                  {item.description ? (
                    <p className="text-xs text-neutral-500">{item.description}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const { announce } = useAnnouncer();
  useFocusTrap(mobileOpen, mobileNavRef);

  const toggleMobile = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      announce(`Navigation ${next ? 'opened' : 'closed'}`);
      return next;
    });
  };

  return (
    <header className="supports-backdrop:backdrop-blur-xl sticky top-0 z-50 border-b border-neutral-200 bg-white/90">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary-600" aria-label="Infoverse Digital-Ed home">
          <span className="size-10 rounded-full bg-primary-100" aria-hidden></span>
          Infoverse Digital-Ed
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Dropdown key={item.label} {...item} />
          ))}
          <Link
            className="text-sm font-medium text-neutral-700 hover:text-primary-600 focus-visible:text-primary-600"
            href="#success"
          >
            Success
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link className="text-sm font-medium text-neutral-700 hover:text-primary-600" href="#login">
            Log in
          </Link>
          <Link
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 focus-visible:bg-primary-600"
            href="#cta"
          >
            Join the waitlist
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        ref={mobileNavRef}
        id="mobile-navigation"
        className={clsx(
          'md:hidden',
          mobileOpen ? 'max-h-[24rem] border-b border-neutral-200 bg-white shadow-inner transition-all' : 'max-h-0 overflow-hidden',
        )}
      >
        <nav className="container flex flex-col gap-6 py-6" aria-label="Mobile">
          {navigation.map((item) => (
            <div key={item.label}>
              <p className="text-sm font-semibold text-neutral-900">{item.label}</p>
              <p className="text-xs text-neutral-500">{item.description}</p>
              <ul className="mt-3 space-y-2">
                {item.children?.map((child) => (
                  <li key={child.label}>
                    <Link
                      className="block rounded-lg bg-neutral-50 p-3 text-sm font-medium text-neutral-700"
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <Link className="text-sm font-medium text-neutral-700" href="#login">
              Log in
            </Link>
            <Link
              className="rounded-full bg-primary-500 px-4 py-3 text-center text-sm font-semibold text-white"
              href="#cta"
              onClick={() => setMobileOpen(false)}
            >
              Join the waitlist
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
