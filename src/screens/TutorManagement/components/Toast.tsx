"use client";

import clsx from "clsx";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onDismiss?: () => void;
}

const toastStyles: Record<NonNullable<ToastProps["type"]>, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-rose-600 text-white",
  info: "bg-[#33a1cd] text-white",
};

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onDismiss }) => {
  return (
    <div className="fixed inset-x-4 bottom-6 z-50 flex justify-center">
      <div
        role="status"
        aria-live="assertive"
        className={clsx(
          "flex w-full max-w-md items-center justify-between gap-4 rounded-2xl px-5 py-4 shadow-lg",
          toastStyles[type],
        )}
      >
        <span className="text-sm font-semibold">{message}</span>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/10"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};
