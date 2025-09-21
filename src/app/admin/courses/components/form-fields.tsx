"use client";

import clsx from "clsx";
import { useId } from "react";
import type { ChangeEvent, FocusEvent } from "react";

interface BaseFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  description?: string;
  disabled?: boolean;
}

interface TextFieldProps extends BaseFieldProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

interface TextareaFieldProps extends BaseFieldProps {
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

export function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  required,
  error,
  description,
  disabled,
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = `${name}-${generatedId}`;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="ml-1 text-[#DD7C5E]">*</span> : null}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={clsx(descriptionId, errorId)}
        className={clsx(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-[#DD7C5E] focus:outline-none focus:ring-2 focus:ring-[#f1b7a3]",
          disabled && "cursor-not-allowed bg-slate-100 text-slate-500",
          error && !disabled && "border-red-400 focus:border-red-400 focus:ring-red-200",
        )}
      />
      {description ? (
        <p id={descriptionId} className="text-sm text-slate-500">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  error,
  description,
  rows = 6,
  disabled,
}: TextareaFieldProps) {
  const generatedId = useId();
  const fieldId = `${name}-${generatedId}`;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="ml-1 text-[#DD7C5E]">*</span> : null}
      </label>
      <textarea
        id={fieldId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={clsx(descriptionId, errorId)}
        className={clsx(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-[#DD7C5E] focus:outline-none focus:ring-2 focus:ring-[#f1b7a3]",
          disabled && "cursor-not-allowed bg-slate-100 text-slate-500",
          error && !disabled && "border-red-400 focus:border-red-400 focus:ring-red-200",
        )}
      />
      {description ? (
        <p id={descriptionId} className="text-sm text-slate-500">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
