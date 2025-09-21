"use client";

import { useState } from "react";
import { useConversionTracking } from "@/hooks/useConversionTracking";

export const CallToAction = () => {
  const { handlePrimaryCta, handleLeadCapture } = useConversionTracking();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    handleLeadCapture("cta-footer");
    setTimeout(() => setIsSubmitted(false), 4000);
    setEmail("");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-center">
      <div className="space-y-6">
        <span className="badge bg-white/15 text-white">Ready to accelerate your exam prep?</span>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Unlock the Infoverse subscription and join thousands of high-performing students.
        </h2>
        <ul className="space-y-3 text-sm text-white/80">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
              1
            </span>
            <span>Personalised onboarding call with an Infoverse curriculum advisor.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
              2
            </span>
            <span>Adaptive study planner, revision library, and exam board-aligned resources.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
              3
            </span>
            <span>Real-time analytics and conversion tracking to showcase measurable progress.</span>
          </li>
        </ul>
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
          <span className="rounded-full bg-white/10 px-3 py-1">No credit card required</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Cancel anytime</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Live chat + WhatsApp support</span>
        </div>
      </div>

      <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cta-email" className="text-sm font-medium text-white">
              Get the exam strategy guide
            </label>
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email to receive the guide"
              className="mt-2 w-full rounded-xl border-0 bg-white px-4 py-3 text-slate-900 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            />
          </div>
          <button
            type="submit"
            onClick={() => handlePrimaryCta("cta-submit")}
            className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isSubmitted ? "Check your inbox" : "Send me the guide"}
          </button>
        </form>
        <p className="mt-6 text-xs text-white/70">
          By submitting, you agree to receive personalised course recommendations and our privacy policy. We respect your time—no
          spam, only exam-winning insights.
        </p>
      </div>
    </div>
  );
};
