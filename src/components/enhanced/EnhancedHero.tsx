'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { useProgressiveImage } from '@/utils/imageOptimization';

const stats = [
  { label: 'Active learners', value: '48k+' },
  { label: 'Course completion', value: '92%' },
  { label: 'Hiring partners', value: '120+' },
];

const floatingElements = [
  { label: 'AI Labs', x: '-10%', y: '15%', delay: 0 },
  { label: 'Design Sprint', x: '15%', y: '65%', delay: 0.4 },
  { label: 'Career Mentors', x: '55%', y: '35%', delay: 0.8 },
];

export default function EnhancedHero() {
  const heroImage = useProgressiveImage(
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80',
  );

  return (
    <AnimatedSection className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface via-background/90 to-primary-900/20 px-spacing-md py-spacing-xl shadow-card">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_55%)]" />
      <div className="grid gap-spacing-lg lg:grid-cols-2 lg:items-center">
        <div className="space-y-spacing-md">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-spacing-2xs py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-100"
          >
            Beyond learning, build momentum
          </motion.div>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight text-neutral-50 md:text-6xl">
            Learning experiences engineered for a digital-first world
          </h1>
          <p className="max-w-xl text-lg text-neutral-300">
            Accelerate workforce capability with personalised pathways, live mentoring and real-time impact analytics. Infoverse Digital-Ed keeps learners inspired and leaders informed.
          </p>
          <div className="flex flex-col gap-spacing-2xs sm:flex-row sm:items-center">
            <Link
              href="#apply"
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-spacing-md py-spacing-2xs text-base font-semibold text-background shadow-glow transition hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            >
              Explore programs
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-spacing-md py-spacing-2xs text-base font-semibold text-neutral-100 transition hover:border-primary-300 hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            >
              Book a strategy call
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-spacing-sm sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-spacing-2xs">
                <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400">{stat.label}</dt>
                <dd className="text-2xl font-semibold text-neutral-50">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-[4/5] w-full max-w-md">
            <Image
              src={heroImage.src}
              alt="Learners collaborating across a digital workspace"
              fill
              className="rounded-3xl object-cover transition duration-700"
              placeholder="blur"
              blurDataURL={heroImage.blurDataURL}
              priority
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-3xl bg-primary-500/30 blur-2xl sm:block" />
            <div className="absolute -right-10 bottom-10 hidden h-28 w-28 rounded-full bg-accent-500/30 blur-3xl sm:block" />
          </div>
          <ul className="pointer-events-none absolute inset-0 hidden lg:block">
            {floatingElements.map((item) => (
              <motion.li
                key={item.label}
                className="absolute rounded-full border border-white/10 bg-white/10 px-spacing-sm py-2 text-xs font-medium text-neutral-100 shadow-glow backdrop-blur-md"
                style={{ left: item.x, top: item.y }}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, repeatType: 'mirror', duration: 6, delay: item.delay }}
              >
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
