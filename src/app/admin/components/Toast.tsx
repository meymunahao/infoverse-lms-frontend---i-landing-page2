'use client';

import clsx from 'clsx';

export type ToastTone = 'success' | 'error' | 'info';

interface ToastProps {
  tone?: ToastTone;
  message: string;
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const toneStyles: Record<ToastTone, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  error: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
  info: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
};

export function Toast({ tone = 'info', message, onDismiss, actionLabel, onAction }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={clsx('flex items-start gap-3 rounded-2xl px-4 py-3 shadow-lg backdrop-blur', toneStyles[tone])}>
        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-current" aria-hidden="true" />
        <p className="text-sm font-medium">{message}</p>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="ml-auto rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#33A1CD] transition hover:text-[#2a82a4]"
          >
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={clsx(
              'rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-700',
              !actionLabel && 'ml-auto',
            )}
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

export default Toast;
