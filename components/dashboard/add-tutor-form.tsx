"use client";

import { FormEvent, useState } from "react";

import { cn } from "@/lib/utils";

export interface AddTutorFormProps {
  onSubmit?: (email: string) => Promise<void> | void;
}

export function AddTutorForm({ onSubmit }: AddTutorFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      await onSubmit?.(email);
      setStatus("success");
      setEmail("");
    } finally {
      window.setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <section aria-labelledby="add-tutor" className="space-y-4">
      <div className="space-y-1">
        <h2 id="add-tutor" className="text-xl font-semibold text-slate-900">
          Add tutor
        </h2>
        <p className="text-sm text-slate-600">
          Invite instructors to collaborate on new and existing courses.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="text-sm font-medium text-slate-700" htmlFor="tutor-email">
          Tutor email
        </label>
        <input
          id="tutor-email"
          type="email"
          name="tutor-email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter tutor's email"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-base text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33A1CD]"
        />
        <button
          type="submit"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg bg-[#DD7C5E] px-4 py-2 text-base font-semibold text-white shadow-sm transition hover:bg-[#c96d52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b95d42] disabled:cursor-not-allowed disabled:opacity-70",
            status === "submitting" && "animate-pulse",
          )}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending invite..." : "Send invite"}
        </button>
        <p aria-live="polite" className="text-sm text-emerald-600">
          {status === "success" ? "Invitation sent successfully." : "\u00A0"}
        </p>
      </form>
    </section>
  );
}
