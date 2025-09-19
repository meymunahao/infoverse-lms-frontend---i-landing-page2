'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';

const focusableSelectors = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

type AccessibilityContextValue = {
  announce: (message: string) => void;
  trapFocus: (container: HTMLElement | null) => void;
  releaseFocus: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [focusContainer, setFocusContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!message || !liveRegionRef.current) return;
    const region = liveRegionRef.current;
    region.textContent = message;
    const timer = window.setTimeout(() => {
      region.textContent = '';
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!focusContainer) return;

    const getFocusableElements = () =>
      Array.from(
        focusContainer.querySelectorAll<HTMLElement>(focusableSelectors),
      ).filter((element) => !element.hasAttribute('disabled'));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!focusContainer.contains(event.target as Node)) {
        const focusable = getFocusableElements();
        focusable[0]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    const firstFocusable = getFocusableElements()[0];
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [focusContainer]);

  const value = useMemo(
    () => ({
      announce: (text: string) => setMessage(text),
      trapFocus: (container: HTMLElement | null) => setFocusContainer(container),
      releaseFocus: () => setFocusContainer(null),
    }),
    [],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        role="status"
        ref={liveRegionRef}
        className="sr-only"
      />
    </AccessibilityContext.Provider>
  );
}

export function useA11y() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useA11y must be used within an AccessibilityProvider');
  }
  return context;
}
