import type { PropsWithChildren } from "react";

const brandHighlights = [
  "Enterprise-grade security",
  "Zero-trust authentication",
  "24/7 monitoring",
];

export const ForgotPasswordLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 overflow-hidden rounded-none bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-[2fr_3fr]">
        <section className="relative hidden items-center justify-center overflow-hidden bg-sky-500/90 px-10 py-12 text-white sm:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500" aria-hidden />
          <div className="relative z-10 flex max-w-md flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <span className="text-xl font-semibold tracking-wide">Infoverse</span>
              </div>
              <p className="text-sm font-medium uppercase tracking-widest text-white/80">
                Learning Platform
              </p>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight">Reset your password securely</h1>
              <p className="text-base text-white/80">
                We use encrypted tokens, dedicated delivery infrastructure, and proactive monitoring
                to keep your account protected at every step of the recovery journey.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-white/80">
              {brandHighlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                    ✓
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-white/80">
                Need help? Our security team is available around the clock at
                <a className="ml-1 underline" href="mailto:security@infoverse.com">
                  security@infoverse.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section className="relative flex items-center justify-center bg-neutral-50 px-6 py-16 sm:px-10 lg:px-16">
          <div className="absolute right-10 top-10 hidden text-sm font-medium text-neutral-500 sm:block">
            <span>Need to sign in?</span>{" "}
            <a href="/" className="text-sky-600 hover:text-sky-700 hover:underline">
              Return to login
            </a>
          </div>
          <div className="relative z-10 w-full max-w-xl">{children}</div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPasswordLayout;
