'use client';

import { useEffect, useMemo, useState } from 'react';

type ProgressiveImageOptions = {
  src: string;
  placeholder?: string;
  onLoad?: () => void;
};

const DEFAULT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4////fwAJ+wP7Slh3PQAAAABJRU5ErkJggg==';

export function useProgressiveImage({ src, placeholder, onLoad }: ProgressiveImageOptions) {
  const [currentSrc, setCurrentSrc] = useState(placeholder ?? DEFAULT_PLACEHOLDER);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      if (cancelled) return;
      setCurrentSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
    image.onerror = () => {
      if (cancelled) return;
      setIsLoaded(true);
    };

    return () => {
      cancelled = true;
    };
  }, [onLoad, src]);

  return useMemo(
    () => ({
      src: currentSrc,
      isLoaded,
      blurDataURL: placeholder ?? DEFAULT_PLACEHOLDER,
    }),
    [currentSrc, isLoaded, placeholder],
  );
}

export function getOptimizedImageProps({
  src,
  placeholder,
  sizes = '(min-width: 1024px) 50vw, 90vw',
  priority = false,
}: ProgressiveImageOptions & { sizes?: string; priority?: boolean }) {
  return {
    src,
    sizes,
    placeholder: 'blur' as const,
    blurDataURL: placeholder ?? DEFAULT_PLACEHOLDER,
    priority,
  };
}
