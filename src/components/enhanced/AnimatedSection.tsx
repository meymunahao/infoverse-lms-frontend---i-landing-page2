'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type AnimatedSectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export default function AnimatedSection({
  as: Component = 'section',
  children,
  className,
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Component id={id} className={className}>
        {children}
      </Component>
    );
  }

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      id={id}
      className={clsx(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </MotionComponent>
  );
}
