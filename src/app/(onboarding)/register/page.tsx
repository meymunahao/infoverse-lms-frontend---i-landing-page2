"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { RegistrationLayout } from "./RegistrationLayout";
import { RegistrationForm } from "../../../components/registration/RegistrationForm";
import { OnboardingFlow } from "../../../components/registration/OnboardingFlow";
import type { RegistrationResponse, UserProfile } from "../../../types/registration";

const securityHighlights = [
  {
    title: "Email verification",
    description: "Activate your account through a secure link sent instantly to your inbox.",
  },
  {
    title: "Password intelligence",
    description: "Visual strength guidance and breach detection keep your account secure.",
  },
  {
    title: "Smart fraud defense",
    description: "Rate limiting, CAPTCHA readiness, and honeypots protect against bad actors.",
  },
];

export default function RegistrationPage() {
  const [registrationResponse, setRegistrationResponse] = useState<RegistrationResponse | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const showOnboarding = useMemo(
    () => Boolean(registrationResponse?.success && profile),
    [registrationResponse?.success, profile],
  );

  return (
    <RegistrationLayout>
      <div className="space-y-12">
        <RegistrationForm
          onSuccess={(response, createdProfile) => {
            setRegistrationResponse(response);
            setProfile(createdProfile);
          }}
        />

        <section className="rounded-3xl bg-white/60 p-6 shadow-sm ring-1 ring-slate-100">
          <header className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-6 w-6 text-sky-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Security you can trust</h2>
              <p className="text-sm text-slate-600">Our layered defenses keep your registration and learning journey protected.</p>
            </div>
          </header>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {securityHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200/80 bg-white p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {registrationResponse && !registrationResponse.success && registrationResponse.errors && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50/80 p-5 text-sm text-rose-700">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="h-5 w-5" />
              We couldn't finish your registration
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {registrationResponse.errors.map((error) => (
                <li key={`${error.field}-${error.message}`}>{error.message}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-rose-600">
              If this persists, contact <a className="underline" href="mailto:support@infoverse.ai">support@infoverse.ai</a> for help.
            </p>
          </div>
        )}

        {showOnboarding && profile && (
          <OnboardingFlow profile={profile} />
        )}
      </div>
    </RegistrationLayout>
  );
}
