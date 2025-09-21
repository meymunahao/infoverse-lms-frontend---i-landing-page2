import { useState } from "react";
import { resendVerificationEmail } from "../../lib/api/registration";
import type { RegistrationResponse } from "../../types/registration";

interface EmailVerificationProps {
  email: string;
  response: RegistrationResponse;
}

export const EmailVerification = ({ email, response }: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    const success = await resendVerificationEmail(email);
    setResent(success);
    setIsResending(false);
  };

  if (!response.verificationRequired) {
    return null;
  }

  return (
    <div className="space-y-5 rounded-3xl bg-sky-50/80 p-6 text-slate-700 shadow-inner">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">Verify your email</h3>
        <p>
          We've sent a secure verification link to <span className="font-semibold">{email}</span>. Click the link to activate your
          account and unlock your personalized learning experience.
        </p>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>Check spam or promotions folders if you don't see the email right away.</li>
        <li>The link expires in 24 hours for your security.</li>
        <li>Need help? Contact <a className="text-sky-600 underline-offset-4 hover:underline" href="mailto:support@infoverse.ai">support@infoverse.ai</a>.</li>
      </ul>
      <button
        type="button"
        onClick={handleResend}
        disabled={isResending}
        className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isResending ? "Sending…" : resent ? "Verification email resent" : "Resend verification email"}
      </button>
    </div>
  );
};
