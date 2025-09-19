'use client';

import { useEffect, useState } from 'react';

type ProgressiveImageState = {
  src: string;
  isLoaded: boolean;
  blurDataURL?: string;
};

const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iYiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiIGluPSJTb3VyY2VHcmFwaGljIiByZXN1bHQ9ImJsIiAvPjxmZUdhdXNzaWFuQmJQYXNzVGhyb3VnaCBpbj0iYmwiIHN0ZERldmlhdGlvbj0iMTAiIHJlc3VsdD0iYmIiIC8+PGZlQmxlbmQgaW49ImJiIiBtb2RlPSJub3JtYWwiIC8+PC9maWx0ZXI+PHJlY3QgZmlsbD0iI2YxZjRmNSIgZmlsdGVyPSJ1cmwoI2IpIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIvPjwvc3ZnPg==';

export function useProgressiveImage(src: string, placeholder: string = DEFAULT_BLUR_DATA_URL): ProgressiveImageState {
  const [state, setState] = useState<ProgressiveImageState>({
    src: placeholder,
    isLoaded: false,
    blurDataURL: placeholder,
  });

  useEffect(() => {
    setState({ src: placeholder, isLoaded: false, blurDataURL: placeholder });
    if (!src) return;

    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setState({ src, isLoaded: true, blurDataURL: placeholder });
    };

    return () => {
      image.onload = null;
    };
  }, [src, placeholder]);

  return state;
}

export function getResponsiveImageProps({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return {
    src,
    alt,
    width,
    height,
    sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
    quality: 85,
  } as const;
}
