import { CheckCircle2, Info, Loader2 } from "lucide-react";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { defaultPasswordRequirements } from "../../utils/registration/password";
import { getHoneypotFieldName } from "../../utils/registration/security";
import type { RegistrationResponse, UserProfile } from "../../types/registration";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { EmailValidator } from "./EmailValidator";
import { TermsAcceptance } from "./TermsAcceptance";
import { SocialRegistration } from "./SocialRegistration";
import { EmailVerification } from "./EmailVerification";

interface RegistrationFormProps {
  onSuccess?: (response: RegistrationResponse, profile: UserProfile | null) => void;
}

export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const {
    formData,
    errors,
    aggregatedErrors,
    status,
    response,
    duplicateEmail,
    emailSuggestion,
    isCheckingEmail,
    passwordStrength,
    updateField,
    handleSubmit,
  } = useRegistrationForm({
    onSuccess: (result) => {
      const profile: UserProfile | null = result.userId
        ? {
            id: result.userId,
            fullName: formData.fullName,
            email: formData.email,
            isEmailVerified: !result.verificationRequired,
            accountType: formData.accountType,
            registrationDate: new Date(),
            onboardingCompleted: false,
            preferences: {
              communicationChannels: ["email", "in-app"],
              language: "en",
              learningPace: "structured",
            },
          }
        : null;

      onSuccess?.(result, profile);
    },
  });

  const honeypotFieldName = getHoneypotFieldName();

  const isSubmitting = status === "submitting";

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-slate-900">Create your Infoverse account</h1>
        <p className="text-base text-slate-600">
          Unlock adaptive learning experiences tailored to your goals. Registration takes less than two minutes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            inputMode="text"
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
            aria-invalid={Boolean(errors.fullName)}
            placeholder="Jordan Williams"
          />
          {errors.fullName && <p className="text-sm text-rose-600">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="accountType">
            I'm registering as a
          </label>
          <select
            id="accountType"
            value={formData.accountType}
            onChange={(event) => updateField("accountType", event.target.value as typeof formData.accountType)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="parent">Parent</option>
          </select>
        </div>
      </div>

      <EmailValidator
        value={formData.email}
        onChange={(value) => updateField("email", value)}
        error={errors.email}
        suggestion={emailSuggestion}
        isChecking={isCheckingEmail}
        onSuggestionSelect={(suggestion) => updateField("email", suggestion)}
      />
      {duplicateEmail && !errors.email && (
        <p className="text-sm text-amber-600">This email is already registered. Try logging in instead.</p>
      )}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700" htmlFor="password">
          Create password
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
            placeholder="••••••••••••"
            aria-invalid={Boolean(errors.password)}
          />
          <Info className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        </div>
        <PasswordStrengthMeter strength={passwordStrength} requirements={defaultPasswordRequirements} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="learningGoals">
            Learning goal (optional)
          </label>
          <input
            id="learningGoals"
            value={formData.learningGoals ?? ""}
            onChange={(event) => updateField("learningGoals", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
            placeholder="Prepare for calculus finals"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="experienceLevel">
            Experience level (optional)
          </label>
          <select
            id="experienceLevel"
            value={formData.experienceLevel ?? ""}
            onChange={(event) => updateField("experienceLevel", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="referralSource">
          Referral or invitation code (optional)
        </label>
        <input
          id="referralSource"
          value={formData.referralSource ?? ""}
          onChange={(event) => updateField("referralSource", event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring focus:ring-sky-200"
          placeholder="FRIEND-2024"
        />
      </div>

      <TermsAcceptance
        acceptedTerms={formData.acceptedTerms}
        marketingOptIn={formData.marketingOptIn ?? false}
        onToggleTerms={(checked) => updateField("acceptedTerms", checked)}
        onToggleMarketing={(checked) => updateField("marketingOptIn", checked)}
      />

      <input
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        value={formData.honeypot ?? ""}
        onChange={() => updateField("honeypot", "")}
        name={honeypotFieldName}
      />

      {aggregatedErrors.length > 0 && (
        <div className="space-y-2 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-sm text-rose-700">
          <div className="flex items-center gap-2 font-semibold">
            <Info className="h-4 w-4" />
            Let's fix a few things
          </div>
          <ul className="list-disc space-y-1 pl-5">
            {aggregatedErrors.map((error) => (
              <li key={`${error.field}-${error.message}`}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Creating account…
          </>
        ) : (
          <>Complete registration</>
        )}
      </button>

      <SocialRegistration
        onSuccess={(result) => onSuccess?.(result, null)}
        onError={(socialErrors) => {
          socialErrors.forEach((error) => console.warn("Social registration error", error));
        }}
      />

      {response && formData.email && (
        <EmailVerification email={formData.email} response={response} />
      )}

      <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <span className="font-semibold text-slate-800">What happens after you sign up?</span>
        </div>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          <li>Personalized onboarding flow tailored to {formData.accountType}s</li>
          <li>Progress tracking and smart reminders to keep you engaged</li>
          <li>Secure account management with multi-layer protection</li>
          <li>Access to live support if you need help getting started</li>
        </ul>
      </div>
    </form>
  );
};
