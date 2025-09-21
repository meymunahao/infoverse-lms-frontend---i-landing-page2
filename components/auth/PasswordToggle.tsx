"use client";

import { Eye, EyeOff } from "lucide-react";
import React from "react";

interface PasswordToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  label?: string;
}

export const PasswordToggle: React.FC<PasswordToggleProps> = ({
  isVisible,
  onToggle,
  label = "Toggle password visibility",
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-neutral-500 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
    aria-label={label}
  >
    {isVisible ? (
      <EyeOff aria-hidden className="h-5 w-5" />
    ) : (
      <Eye aria-hidden className="h-5 w-5" />
    )}
  </button>
);
