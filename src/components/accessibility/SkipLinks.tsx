'use client';

import Link from 'next/link';

const skipTargets = [
  { href: '#main', label: 'Skip to main content' },
  { href: '#courses', label: 'Skip to courses section' },
  { href: '#dashboard', label: 'Skip to progress dashboard' },
  { href: '#footer', label: 'Skip to footer' },
];

export default function SkipLinks(): JSX.Element {
  return (
    <nav aria-label="Skip links">
      {skipTargets.map(({ href, label }) => (
        <Link key={href} href={href} className="skip-link">
          {label}
        </Link>
      ))}
    </nav>
  );
}
