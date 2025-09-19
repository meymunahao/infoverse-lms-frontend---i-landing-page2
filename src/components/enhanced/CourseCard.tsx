'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: string;
  image: string;
  highlight?: ReactNode;
};

type CourseCardProps = {
  course: Course;
  onSelect?: (course: Course) => void;
  isActive?: boolean;
};

export default function CourseCard({ course, onSelect, isActive }: CourseCardProps) {
  const handleClick = () => {
    onSelect?.(course);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.(course);
    }
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition focus-within:-translate-y-1 focus-within:ring-2 focus-within:ring-primary-400',
        isActive && 'ring-2 ring-primary-400 ring-offset-2',
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={course.title}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold uppercase tracking-wide text-white">
          <span className="rounded-full bg-primary-500/90 px-3 py-1">{course.level}</span>
          <span className="rounded-full bg-accent-500/90 px-3 py-1">{course.price}</span>
        </div>
        <Image
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={course.title}
          {...getOptimizedImageProps({ src: course.image, sizes: '(min-width: 768px) 350px, 90vw' })}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-neutral-900">{course.title}</h3>
          <p className="text-sm text-neutral-600">{course.description}</p>
        </div>
        <dl className="grid grid-cols-2 gap-4 text-xs text-neutral-500">
          <div>
            <dt className="uppercase tracking-wide">Category</dt>
            <dd className="text-sm font-semibold text-neutral-800">{course.category}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wide">Duration</dt>
            <dd className="text-sm font-semibold text-neutral-800">{course.duration}</dd>
          </div>
        </dl>
        {course.highlight ? <div className="text-sm text-neutral-600">{course.highlight}</div> : null}
      </div>
    </motion.article>
  );
}
