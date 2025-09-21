import clsx from "clsx";
import type { ValidationError } from "../../types/registration";

interface EmailValidatorProps {
  value: string;
  onChange: (value: string) => void;
  error?: ValidationError;
  suggestion?: string;
  isChecking?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
}

export const EmailValidator = ({
  value,
  onChange,
  error,
  suggestion,
  isChecking,
  onSuggestionSelect,
}: EmailValidatorProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700" htmlFor="email">
      Email address
    </label>
    <div className="relative">
      <input
        id="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
        aria-invalid={Boolean(error)}
        aria-describedby="email-helper"
        placeholder="you@school.edu"
      />
      {isChecking && (
        <span className="absolute inset-y-0 right-4 flex items-center text-xs text-slate-500">Checking…</span>
      )}
    </div>
    <div id="email-helper" className="space-y-1 text-sm">
      {suggestion && !error && (
        <button
          type="button"
          onClick={() => onSuggestionSelect?.(suggestion)}
          className="text-left text-sky-600 underline-offset-4 hover:underline"
        >
          Did you mean <span className="font-semibold">{suggestion}</span>?
        </button>
      )}
      {error && (
        <p
          className={clsx("font-medium", {
            "text-amber-600": error.severity === "warning",
            "text-rose-600": error.severity !== "warning",
          })}
        >
          {error.message}
        </p>
      )}
    </div>
  </div>
);
