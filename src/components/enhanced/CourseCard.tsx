'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Clock3, Layers3 } from 'lucide-react';
import clsx from 'clsx';

export type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  category: string;
  href?: string;
};

const levelColors: Record<CourseCardProps['level'], string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-danger/10 text-danger',
};

export default function CourseCard({
  title,
  description,
  duration,
  level,
  price,
  image,
  category,
  href = '#',
}: CourseCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-background/95 to-background/95 shadow-card"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={`${title} course preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <span className="absolute left-spacing-2xs top-spacing-2xs inline-flex items-center gap-1 rounded-full bg-background/80 px-spacing-3xs py-1 text-xs font-medium text-neutral-100 backdrop-blur">
          <Layers3 className="h-3.5 w-3.5" aria-hidden />
          {category}
        </span>
        <span
          className={clsx(
            'absolute right-spacing-2xs top-spacing-2xs inline-flex items-center gap-1 rounded-full px-spacing-3xs py-1 text-xs font-semibold backdrop-blur',
            levelColors[level],
          )}
        >
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
          {level}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-spacing-xs p-spacing-sm">
        <div className="space-y-spacing-3xs">
          <h3 className="text-xl font-semibold text-neutral-50">{title}</h3>
          <p className="text-sm text-neutral-300">{description}</p>
        </div>
        <dl className="mt-auto flex items-center justify-between text-sm text-neutral-200">
          <div className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary-200" aria-hidden />
            <span>{duration}</span>
          </div>
          <dd className="rounded-full bg-white/5 px-spacing-3xs py-1 font-semibold text-primary-100">{price}</dd>
        </dl>
        <Link
          href={href}
          className="mt-spacing-2xs inline-flex items-center justify-center rounded-full border border-white/10 px-spacing-sm py-spacing-2xs text-sm font-semibold text-neutral-100 transition hover:border-primary-400 hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          View curriculum
        </Link>
      </div>
    </motion.article>
  );
}
