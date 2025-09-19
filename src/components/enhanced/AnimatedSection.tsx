'use client';

import { motion, type MotionProps } from 'framer-motion';
import { ComponentPropsWithoutRef, ReactNode, useMemo } from 'react';
import clsx from 'clsx';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type AnimatedSectionProps<T extends keyof JSX.IntrinsicElements = 'section'> = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: T;
  direction?: Direction;
  once?: boolean;
} & MotionProps & Omit<ComponentPropsWithoutRef<T>, 'children'>;

const getOffset = (direction: Direction) => {
  switch (direction) {
    case 'up':
      return { y: 32 };
    case 'down':
      return { y: -32 };
    case 'left':
      return { x: 32 };
    case 'right':
      return { x: -32 };
    default:
      return {};
  }
};

export default function AnimatedSection<T extends keyof JSX.IntrinsicElements = 'section'>({
  children,
  className,
  delay = 0,
  as: Component = 'section' as T,
  direction = 'up',
  once = true,
  ...rest
}: AnimatedSectionProps<T>) {
  const offsets = useMemo(() => getOffset(direction), [direction]);
  const MotionComponent = useMemo(() => motion(Component as any), [Component]);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, scale: 0.98, ...offsets },
        visible: { opacity: 1, scale: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.9, ease: 'easeOut', delay }}
      className={clsx('group relative isolate', className)}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      {children}
    </MotionComponent>
  );
}
