"use client";

import clsx from "clsx";
import React from "react";

interface FormValidationProps {
  id?: string;
  messages?: string[];
  variant?: "error" | "success" | "info";
  showIcon?: boolean;
}

export const FormValidation: React.FC<FormValidationProps> = ({
  id,
  messages,
  variant = "error",
  showIcon = true,
}) => {
  if (!messages?.length) {
    return null;
  }

  const styles = {
    error: "bg-rose-50 text-rose-700 border border-rose-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
  };

  return (
    <div
      id={id}
      role={variant === "error" ? "alert" : "status"}
      className={clsx(
        "flex w-full gap-2 rounded-xl px-4 py-3 text-sm leading-relaxed",
        styles[variant],
      )}
    >
      {showIcon ? (
        <span aria-hidden className="mt-0.5 text-lg">
          {variant === "error" && "⚠️"}
          {variant === "success" && "✅"}
          {variant === "info" && "💡"}
        </span>
      ) : null}
      <ul className="flex flex-1 flex-col gap-1">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
};
