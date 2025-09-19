'use client';

import Link from 'next/link';

const links = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#course-filters', label: 'Skip to course filters' },
  { href: '#dashboard', label: 'Skip to learner dashboard' },
];

export default function SkipLinks() {
  return (
    <nav aria-label="Skip links" className="skip-links">
      <ul className="flex gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="sr-only focus:not-sr-only focus:fixed focus:left-spacing-md focus:top-spacing-md focus:z-50 focus:rounded-full focus:bg-primary-500 focus:px-spacing-sm focus:py-2 focus:text-background focus:shadow-glow"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
