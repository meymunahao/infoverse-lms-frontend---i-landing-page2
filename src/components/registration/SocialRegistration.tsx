import { useState } from "react";
import { registerWithProvider } from "../../lib/api/registration";
import type { RegistrationResponse, ValidationError } from "../../types/registration";

interface SocialRegistrationProps {
  onSuccess?: (response: RegistrationResponse) => void;
  onError?: (errors: ValidationError[]) => void;
}

export const SocialRegistration = ({ onSuccess, onError }: SocialRegistrationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleProvider = async (provider: "google") => {
    setIsLoading(true);
    try {
      const result = await registerWithProvider(provider);
      if (result.success) {
        onSuccess?.(result);
      } else if (result.errors) {
        onError?.(result.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-center">
        <span className="mx-4 text-sm font-medium text-slate-500">or continue with</span>
        <div className="flex-1 border-t border-dashed border-slate-200" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleProvider("google")}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-4 w-4" />
          </span>
          {isLoading ? "Connecting…" : "Sign up with Google"}
        </button>
      </div>
      <p className="text-center text-xs text-slate-500">
        We respect your privacy. Connecting a social account helps us pre-fill your profile and speed up onboarding.
      </p>
    </div>
  );
};
