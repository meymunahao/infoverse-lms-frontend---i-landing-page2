import clsx from "clsx";
import type { UserProfile } from "../../types/registration";

interface OnboardingStep {
  title: string;
  description: string;
  completed: boolean;
}

interface OnboardingFlowProps {
  profile: UserProfile;
}

const buildSteps = (profile: UserProfile): OnboardingStep[] => [
  {
    title: "Confirm your email",
    description: profile.isEmailVerified
      ? "Email verified. You're ready to explore Infoverse!"
      : "Check your inbox for the verification link to secure your account.",
    completed: profile.isEmailVerified,
  },
  {
    title: "Tell us about your goals",
    description: "Share your learning goals so we can personalize recommendations immediately.",
    completed: profile.onboardingCompleted,
  },
  {
    title: profile.accountType === "tutor" ? "Set up your tutor profile" : "Start your first learning path",
    description:
      profile.accountType === "tutor"
        ? "Add your expertise, availability, and certifications to reach new learners."
        : "Choose a topic and we'll craft the perfect starting path for you.",
    completed: profile.onboardingCompleted,
  },
];

export const OnboardingFlow = ({ profile }: OnboardingFlowProps) => {
  const steps = buildSteps(profile);

  return (
    <section className="space-y-6 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
      <header className="space-y-1">
        <p className="text-sm font-medium uppercase tracking-wide text-sky-600">Next steps</p>
        <h3 className="text-2xl font-semibold text-slate-900">You're almost set!</h3>
        <p className="text-sm text-slate-600">
          Complete these quick steps to personalize your Infoverse experience and unlock tailored recommendations.
        </p>
      </header>
      <ol className="space-y-4">
        {steps.map((step) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden
              className={clsx(
                "mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                step.completed ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600",
              )}
            >
              {step.completed ? "✓" : steps.indexOf(step) + 1}
            </span>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-slate-800">{step.title}</h4>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
