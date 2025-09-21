'use client';

import type { ReactNode } from 'react';

interface ChangePasswordLayoutProps {
  headline?: string;
  subheadline?: string;
  helpHref?: string;
  helpLabel?: string;
  children: ReactNode;
  illustrationUrl?: string;
}

export const ChangePasswordLayout = ({
  headline = 'Change Password',
  subheadline = 'Keep your account secure by creating a strong, unique password.',
  helpHref = '#support',
  helpLabel = 'Help',
  children,
  illustrationUrl,
}: ChangePasswordLayoutProps) => (
  <main className="relative flex min-h-screen bg-white text-slate-900">
    <div className="relative hidden flex-1 items-center justify-center overflow-hidden rounded-r-[2.5rem] bg-sky-500/95 p-12 text-white lg:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700" aria-hidden="true" />
      <div className="relative z-10 flex h-full w-full max-w-xl flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 shadow-lg backdrop-blur">
            <span className="text-xl font-semibold tracking-wide">Infoverse</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Security Center</p>
            <h1 className="text-3xl font-semibold">Stronger passwords, safer teams.</h1>
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          {illustrationUrl ? (
            <img
              src={illustrationUrl}
              alt="Information security illustration"
              className="max-h-[420px] w-full max-w-md rounded-3xl object-cover shadow-2xl shadow-sky-900/40"
            />
          ) : (
            <div className="flex h-64 w-full max-w-md items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-lg font-medium text-white/80 backdrop-blur">
              Secure Passwords
            </div>
          )}
        </div>
        <div className="space-y-1 text-white/80">
          <p className="text-sm font-medium uppercase tracking-[0.2em]">Security tips</p>
          <ul className="space-y-1 text-sm">
            <li>• Use a password manager to store and generate strong passwords.</li>
            <li>• Enable multi-factor authentication on all sensitive accounts.</li>
            <li>• Never reuse passwords across different services.</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="relative flex w-full flex-col justify-between px-6 py-10 sm:px-10 lg:w-[640px] lg:px-14">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.4em] text-sky-600">Account Security</p>
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{headline}</h2>
        <p className="text-base text-slate-600">{subheadline}</p>
      </header>
      <div className="mt-8 flex-1">{children}</div>
      <footer className="mt-12 flex items-center justify-between text-sm text-slate-500">
        <p>Need help securing your account?</p>
        <a
          href={helpHref}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
        >
          <span className="h-2 w-2 rounded-full bg-sky-500" aria-hidden="true" />
          {helpLabel}
        </a>
      </footer>
    </div>
  </main>
);
