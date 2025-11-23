import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light">
      <div className="text-center">
        <Loading size="lg" />
        <p className="mt-4 text-text-light">Loading...</p>
      </div>
    </div>
  );
};
