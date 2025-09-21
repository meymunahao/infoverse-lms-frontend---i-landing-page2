import { EmailValidation } from "../../types/passwordRecovery";

interface EmailValidationFeedbackProps {
  validation: EmailValidation;
  isCheckingMx: boolean;
  mxVerified: boolean | null;
}

export const EmailValidationFeedback = ({
  validation,
  isCheckingMx,
  mxVerified,
}: EmailValidationFeedbackProps) => {
  if (!validation && !isCheckingMx) {
    return null;
  }

  return (
    <div className="mt-3 space-y-2 text-sm" aria-live="polite">
      {validation.errors.map((error) => (
        <p key={error} className="flex items-start gap-2 text-red-600">
          <span className="mt-0.5 text-base leading-none">•</span>
          <span>{error}</span>
        </p>
      ))}
      {validation.suggestions.map((suggestion) => (
        <p key={suggestion} className="flex items-start gap-2 text-amber-600">
          <span className="mt-0.5 text-base leading-none">•</span>
          <span>{suggestion}</span>
        </p>
      ))}
      {isCheckingMx && (
        <p className="flex items-center gap-2 text-sky-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-600" aria-hidden />
          Validating email server configuration…
        </p>
      )}
      {!isCheckingMx && validation.domain && mxVerified === false && (
        <p className="flex items-start gap-2 text-amber-600">
          <span className="mt-0.5 text-base leading-none">•</span>
          <span>
            We could not verify the email domain. Please double-check for typos or use a different
            email address.
          </span>
        </p>
      )}
      {!isCheckingMx && validation.isValid && mxVerified && (
        <p className="flex items-center gap-2 text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden />
          Email looks good and ready for secure reset.
        </p>
      )}
    </div>
  );
};

export default EmailValidationFeedback;
