"use client";

import { FormEvent, useMemo, useState } from "react";
import { useEmailValidation } from "../../hooks/useEmailValidation";
import { usePasswordRecovery } from "../../hooks/usePasswordRecovery";
import EmailValidationFeedback from "./EmailValidationFeedback";
import SecurityLimiter from "./SecurityLimiter";
import SuccessMessage from "./SuccessMessage";
import EmailDeliveryStatus from "./EmailDeliveryStatus";

const troubleshootingTips = [
  "Check spam, junk, and quarantine folders, then add security@infoverse.com to your safe senders list.",
  "If you use a corporate email, contact your IT team to allow reset emails from infoverse.com.",
  "Try searching your inbox for \"Infoverse password reset\" to surface the latest message.",
  "Request a resend after a few minutes if the email has not arrived.",
];

export const PasswordRecoveryForm = () => {
  const { email, setEmail, validation, isValid, isCheckingMx, mxVerified } = useEmailValidation();
  const { state, submitRequest, resendRequest, resetStates } = usePasswordRecovery();
  const [honeypot, setHoneypot] = useState("");
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const isSubmitDisabled = useMemo(() => {
    if (state.isSubmitting) return true;
    if (!formTouched) return true;
    return !isValid;
  }, [formTouched, isValid, state.isSubmitting]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormTouched(true);
    if (!isValid) {
      return;
    }

    const result = await submitRequest(email, honeypot);
    if (result?.success) {
      setShowTroubleshooting(true);
    }
  };

  const showSuccessState = state.response?.success;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl shadow-sky-100">
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
          Secure recovery
        </div>
        <h2 className="text-3xl font-semibold text-neutral-900">Forgot password?</h2>
        <p className="text-base leading-relaxed text-neutral-600">
          Enter the email address associated with your account. We will send a secure link to help you
          reset your password. For your protection we never reveal whether an account exists.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-neutral-800">
            Email address
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                if (!formTouched) setFormTouched(true);
                setEmail(event.target.value);
                if (showSuccessState) {
                  resetStates();
                  setShowTroubleshooting(false);
                }
              }}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100"
              aria-describedby="email-help"
              aria-invalid={!validation.isValid && formTouched}
              required
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              {state.isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600" aria-hidden />
              )}
            </div>
          </div>
          <p id="email-help" className="text-sm text-neutral-500">
            We send reset links that expire after 20 minutes. Each link can be used only once.
          </p>
          <div className="sr-only" aria-hidden>
            <label htmlFor="organization" className="hidden">
              Organization
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>
          <EmailValidationFeedback
            validation={validation}
            isCheckingMx={isCheckingMx}
            mxVerified={mxVerified}
          />
        </div>

        {state.error && (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-200 transition disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          {state.isSubmitting ? "Securing request…" : "Send reset link"}
        </button>

        <SecurityLimiter
          attemptsRemaining={state.attemptsRemaining}
          cooldownRemaining={state.cooldownRemaining}
          captchaRequired={state.captchaRequired}
          rateLimitMessage={state.rateLimitMessage}
        />
      </form>

      {showSuccessState && state.response && (
        <SuccessMessage
          message={
            state.response.message ||
            "If an account matches the email provided, we'll send password reset instructions shortly."
          }
          estimatedDeliveryCopy={state.estimatedDeliveryCopy}
          onResend={() => {
            void resendRequest();
          }}
        />
      )}

      <EmailDeliveryStatus
        status={state.deliveryStatus}
        estimatedDeliveryCopy={state.estimatedDeliveryCopy}
      />

      {showTroubleshooting && (
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h3 className="text-base font-semibold text-neutral-900">Trouble receiving the email?</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            {troubleshootingTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" aria-hidden />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-sm text-neutral-600">
            Still stuck? <a className="text-sky-700 underline" href="mailto:help@infoverse.com">Contact support</a> for
            personal assistance.
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordRecoveryForm;
