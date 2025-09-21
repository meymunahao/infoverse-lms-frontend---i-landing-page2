import type { ReactNode } from "react";

interface RegistrationLayoutProps {
  children: ReactNode;
}

const benefits = [
  "Personalized learning paths with adaptive recommendations",
  "Secure account management with zero-trust best practices",
  "Collaborate with tutors, parents, and peers effortlessly",
  "Progress analytics to keep you motivated and on track",
];

const motivators = [
  {
    title: "98% learner satisfaction",
    description: "Learners love how quickly they can get started with Infoverse.",
  },
  {
    title: "Bank-grade security",
    description: "We protect your data with industry-standard encryption and verification.",
  },
];

export const RegistrationLayout = ({ children }: RegistrationLayoutProps) => (
  <div className="relative min-h-screen bg-white">
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col overflow-hidden rounded-[30px] bg-slate-100 shadow-2xl lg:m-6 lg:flex-row">
      <aside className="relative flex flex-1 flex-col justify-between bg-sky-500/95 p-10 text-white lg:max-w-[480px]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white/80">
              <img
                src="/branding/infoverse-mark.png"
                alt="Infoverse logo"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">Infoverse</p>
              <p className="text-2xl font-semibold">Where learning feels personal</p>
            </div>
          </div>
          <p className="text-lg text-white/90">
            Join thousands of learners who trust Infoverse for personalized education with real-time guidance and measurable impact.
          </p>
        </div>
        <div className="space-y-6 rounded-3xl bg-white/10 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold">Why learners choose us</h3>
          <ul className="space-y-3 text-sm text-white/90">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-4 rounded-2xl bg-white/10 p-4 text-sm text-white/90">
            {motivators.map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-white">{item.title}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-white/70">
          Need help? <a href="mailto:onboarding@infoverse.ai" className="font-semibold text-white underline-offset-4 hover:underline">Contact onboarding support</a>
        </p>
      </aside>
      <main className="flex flex-1 flex-col justify-center bg-slate-50/60 px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-2xl space-y-10">{children}</div>
        <footer className="mt-12 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Infoverse Labs. All rights reserved.</span>
          <nav className="flex gap-4">
            <a className="hover:text-slate-700" href="/legal/terms">
              Terms
            </a>
            <a className="hover:text-slate-700" href="/legal/privacy">
              Privacy
            </a>
            <a className="hover:text-slate-700" href="/legal/cookies">
              Cookies
            </a>
          </nav>
        </footer>
      </main>
    </div>
  </div>
);
