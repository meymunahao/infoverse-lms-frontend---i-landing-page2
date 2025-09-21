'use client';

import { Eye, EyeOff } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface PasswordVisibilityToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visible: boolean;
  label?: string;
}

export const PasswordVisibilityToggle = ({
  visible,
  label = 'Toggle password visibility',
  className,
  ...props
}: PasswordVisibilityToggleProps) => (
  <button
    type="button"
    {...props}
    className={clsx(
      'flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500',
      className,
    )}
    aria-pressed={visible}
    aria-label={label}
  >
    {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
  </button>
);
