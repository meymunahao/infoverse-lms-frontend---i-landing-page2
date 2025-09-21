"use client";

import clsx from "clsx";
import React, { useId } from "react";

interface RememberMeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export const RememberMeToggle: React.FC<RememberMeToggleProps> = ({
  checked,
  onChange,
  label = "Keep me signed in",
  description,
  disabled,
}) => {
  const id = useId();

  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        type="button"
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative h-6 w-11 rounded-full border border-neutral-200 transition-colors",
          checked
            ? "bg-sky-500/90 hover:bg-sky-500 focus-visible:outline-sky-500"
            : "bg-neutral-200 hover:bg-neutral-300 focus-visible:outline-neutral-500",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
      <label htmlFor={id} className="flex cursor-pointer flex-col gap-1">
        <span className="text-sm font-medium text-neutral-800">{label}</span>
        {description ? (
          <span className="text-xs text-neutral-500">{description}</span>
        ) : null}
      </label>
    </div>
  );
};
