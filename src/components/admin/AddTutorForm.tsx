"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { inviteTutor } from "../../lib/api/tutors";

const emailPattern =
  /^(?:[a-zA-Z0-9_'^&\/+{}=!?$%#~`\-]+(?:\.[a-zA-Z0-9_'^&\/+{}=!?$%#~`\-]+)*|"(?:[^"\\]|\\.)+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

type FormStatus = "idle" | "loading" | "success" | "error";

export interface AddTutorFormProps {
  className?: string;
}

export const AddTutorForm = ({ className }: AddTutorFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<Set<string>>(() => new Set());

  const trimmedEmail = email.trim();

  const inlineError = useMemo(() => {
    if (!trimmedEmail && touched) {
      return "Tutor email is required.";
    }

    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      return "Enter a valid email address.";
    }

    return "";
  }, [trimmedEmail, touched]);

  useEffect(() => {
    if (status === "success") {
      inputRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    if (status === "error") {
      statusRef.current?.focus();
    }
  }, [status, feedback]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    const normalizedEmail = trimmedEmail.toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setFeedback("Tutor email is required.");
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setFeedback("Enter a valid email address.");
      return;
    }

    if (invitedEmails.has(normalizedEmail)) {
      setStatus("error");
      setFeedback("This tutor has already been invited.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("");
      const response = await inviteTutor(normalizedEmail);

      if (!response.success) {
        throw new Error(response.message ?? "We could not invite this tutor. Try again later.");
      }

      setInvitedEmails((prev) => {
        const next = new Set(prev);
        next.add(normalizedEmail);
        return next;
      });

      setStatus("success");
      setFeedback(response.message ?? "Tutor invite sent successfully.");
      setEmail("");
      setTouched(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "We could not send the invitation. Please try again.";
      setStatus("error");
      setFeedback(message);
    }
  };

  return (
    <section className={className} aria-labelledby="add-tutor-heading">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="mb-6">
          <h2 id="add-tutor-heading" className="text-2xl font-semibold text-slate-900">
            Add Tutor
          </h2>
          <p className="mt-1 text-sm text-slate-600">Enter the tutor's email to send an invitation.</p>
        </div>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit}
          aria-busy={status === "loading"}
        >
          <div>
            <label htmlFor="tutor-email" className="text-sm font-medium text-slate-800">
              Tutor email
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="tutor-email"
                ref={inputRef}
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter tutor's email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setStatus("idle");
                  setFeedback("");
                  if (!touched) {
                    setTouched(true);
                  }
                }}
                onBlur={() => setTouched(true)}
                aria-invalid={Boolean(inlineError)}
                aria-describedby="tutor-email-description tutor-email-feedback"
                className="w-full rounded-xl border border-slate-300 bg-[#BDD0D2] px-4 py-3 text-base text-slate-900 placeholder:text-slate-600 focus:border-[#33A1CD] focus:outline-none focus:ring-2 focus:ring-[#33A1CD]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[#DD7C5E] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#c96f55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2563A] focus-visible:ring-offset-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Add Tutor's Email"
                )}
              </button>
            </div>
            <p id="tutor-email-description" className="mt-2 text-xs text-slate-500">
              We'll send a secure invitation to the tutor with onboarding instructions.
            </p>
            <p
              id="tutor-email-feedback"
              ref={statusRef}
              role={status === "error" || status === "success" ? "alert" : undefined}
              tabIndex={-1}
              aria-live={status === "error" ? "assertive" : "polite"}
              className={clsx(
                "mt-2 text-sm",
                inlineError && status !== "error" ? "text-[#B2563A]" : undefined,
                status === "error" ? "text-[#B2563A]" : undefined,
                status === "success" ? "text-emerald-600" : undefined,
              )}
            >
              {status === "error" ? feedback || inlineError : null}
              {status === "success" ? feedback : null}
              {status !== "error" && status !== "success" ? inlineError : null}
            </p>
          </div>
        </form>
        {status === "success" ? (
          <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 shadow-inner animate-pulse">
            Invitation sent! We'll notify you when the tutor joins the platform.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AddTutorForm;
