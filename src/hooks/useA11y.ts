'use client';

import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];

export function useAnnouncer() {
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (regionRef.current) return;
    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
    regionRef.current = region;

    return () => {
      region.remove();
      regionRef.current = null;
    };
  }, []);

  const announce = useCallback((message: string) => {
    if (!regionRef.current) return;
    regionRef.current.textContent = '';
    window.setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
    }, 50);
  }, []);

  return { announce };
}

export function useFocusTrap<T extends HTMLElement>(active: boolean, ref: React.RefObject<T>) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const container = ref.current;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(',')));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      if (focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!container.contains(event.relatedTarget as Node)) {
        first?.focus();
      }
    };

    if (first && !container.contains(document.activeElement)) {
      first.focus();
    }

    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [active, ref]);
}

export function useReducedMotion() {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = media.matches;
    const updateMotion = () => {
      prefersReducedMotion.current = media.matches;
    };
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  return prefersReducedMotion;
}
