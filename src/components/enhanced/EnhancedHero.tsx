'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { getOptimizedImageProps, useProgressiveImage } from '@/utils/imageOptimization';

const stats = [
  { label: 'Learners empowered', value: '32k+' },
  { label: 'Expert mentors', value: '120' },
  { label: 'Exam success rate', value: '94%' },
];

export default function EnhancedHero() {
  const heroImage = useProgressiveImage({
    src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
  });

  return (
    <AnimatedSection className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-400 px-6 py-20 text-white shadow-elevated" id="main">
      <div className="absolute -left-20 top-10 hidden h-64 w-64 rounded-full bg-white/10 blur-3xl lg:block" aria-hidden></div>
      <div className="absolute -right-16 bottom-0 hidden h-72 w-72 rounded-full bg-accent-200/30 blur-3xl lg:block" aria-hidden></div>
      <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
          >
            <span className="size-2 rounded-full bg-accent-300" aria-hidden></span>
            Next-gen learning platform
          </motion.p>
          <motion.h1
            className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Infoverse Digital-Ed helps ambitious learners achieve exam mastery with confidence.
          </motion.h1>
          <motion.p
            className="max-w-xl text-base text-white/80 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Adaptive course pathways, immersive study rooms, and mentor-led cohorts designed to fit your goals.
          </motion.p>
          <motion.div
            className="flex flex-col items-start gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="#courses"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-600 transition hover:bg-neutral-100"
            >
              Explore learning paths
            </Link>
            <Link
              href="#cta"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View success stories
            </Link>
          </motion.div>
          <motion.dl
            className="grid gap-6 sm:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <dt className="text-xs uppercase tracking-wide text-white/70">{stat.label}</dt>
                <dd className="text-3xl font-semibold md:text-4xl">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-6 rounded-3xl bg-white/20 blur-2xl" aria-hidden></div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/40 bg-white/10 backdrop-blur-lg md:aspect-video">
            <Image
              alt="Students collaborating in a virtual classroom"
              fill
              className="object-cover"
              {...getOptimizedImageProps({
                src: heroImage.src,
                placeholder: heroImage.blurDataURL,
                sizes: '(min-width: 1024px) 500px, 90vw',
                priority: true,
              })}
            />
            <motion.div
              className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/80 p-4 text-sm text-neutral-800 backdrop-blur"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Live cohort</p>
                <p className="text-sm font-semibold">STEM Excellence Bootcamp</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500">Starting</p>
                <p className="text-sm font-semibold">28 Nov</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
