import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface LoginLayoutProps extends PropsWithChildren {
  headline?: string;
  subHeadline?: string;
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({
  children,
  headline = "Welcome Back!",
  subHeadline = "Continue your journey to success!",
}) => {
  return (
    <div className="min-h-screen w-full bg-white px-4 py-12 text-neutral-900 sm:px-8">
      <div className="mx-auto flex min-h-[720px] w-full max-w-[1400px] flex-col overflow-hidden rounded-[30px] bg-[#33A1CD] shadow-2xl lg:min-h-[880px] lg:flex-row">
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[#33A1CD] px-8 py-10 text-white sm:px-12 lg:px-16">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-semibold">
              IV
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/80">
                Infoverse Learning
              </p>
              <p className="text-2xl font-semibold text-white">Where potential meets guidance</p>
            </div>
          </div>

          <div className="relative mt-16 max-w-lg">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Empower your growth
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Access tailored lessons, real-time tutoring, and analytics designed
              to keep you ahead. Sign in securely from any device and pick up
              exactly where you left off.
            </p>
            <div className="mt-10 grid gap-4 text-sm text-white/80 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-base font-semibold text-white">Multi-factor ready</p>
                <p className="mt-2 text-sm text-white/80">
                  Protect every login with adaptive security that recognises your
                  trusted devices.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-base font-semibold text-white">Frictionless access</p>
                <p className="mt-2 text-sm text-white/80">
                  Sign in with Google, email, or enterprise SSO without missing a
                  beat.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-10 text-sm text-white/80">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-base font-semibold">
                24/7
              </span>
              <p className="max-w-xs">
                Security monitoring and live support keep your learning on track.
              </p>
            </div>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 font-medium transition hover:border-white hover:text-white"
            >
              Need help?
            </Link>
          </div>
        </div>

        <div className="flex w-full max-w-xl flex-col justify-center gap-8 bg-[#F9F9F9] px-8 py-10 sm:px-12 lg:px-16">
          <header className="space-y-3 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">
              {subHeadline}
            </p>
            <h2 className="text-4xl font-semibold text-neutral-900 lg:text-5xl">
              {headline}
            </h2>
            <p className="text-base text-neutral-600">
              Log in with your credentials or choose a connected account to continue.
            </p>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};
