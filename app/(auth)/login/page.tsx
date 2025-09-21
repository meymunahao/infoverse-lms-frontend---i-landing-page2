import React from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { LoginLayout } from "@/components/auth/LoginLayout";

export const metadata = {
  title: "Login to Infoverse LMS",
  description:
    "Securely sign in to Infoverse LMS using email, Google, or enterprise SSO with adaptive authentication.",
};

export default function LoginPage() {
  return (
    <LoginLayout>
      <div className="flex flex-col gap-8">
        <LoginForm />
        <section
          aria-label="Security highlights"
          className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-sm text-neutral-600 shadow-sm"
        >
          <h3 className="text-base font-semibold text-neutral-900">
            Security, accessibility, and performance built in
          </h3>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            <li>🔐 Tokens secured with HTTP-only cookies and rolling refresh.</li>
            <li>🛡️ Adaptive MFA, trusted device management, and biometric-ready flows.</li>
            <li>♿ WCAG-compliant experience with keyboard-first navigation.</li>
            <li>⚡ Optimised assets, service-worker ready, and analytics aware.</li>
          </ul>
        </section>
      </div>
    </LoginLayout>
  );
}
