import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import type { StructuredData } from "@/types/landing";

interface LandingPageLayoutProps {
  hero: ReactNode;
  courseCatalog: ReactNode;
  testimonials: ReactNode;
  pricing: ReactNode;
  callToAction: ReactNode;
  structuredData: StructuredData;
}

export const LandingPageLayout = ({
  hero,
  courseCatalog,
  testimonials,
  pricing,
  callToAction,
  structuredData,
}: LandingPageLayoutProps) => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <Script id="ld-json" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>

    <header className="relative isolate bg-gradient-to-br from-brand via-brand-dark to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 left-10 h-52 w-52 rounded-full bg-brand-light/30 blur-3xl" />
      </div>
      <div className="relative">
        <div className="container mx-auto flex flex-col gap-10 py-6">
          <nav className="flex items-center justify-between rounded-3xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
            <Link href="#hero" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand">I</span>
              <span>Infoverse Digital-Ed</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="#courses" className="transition hover:text-brand-light">
                Course Catalog
              </Link>
              <Link href="#pricing" className="transition hover:text-brand-light">
                Pricing
              </Link>
              <Link href="#success" className="transition hover:text-brand-light">
                Success Stories
              </Link>
              <Link
                href="#cta"
                className="rounded-full bg-white px-4 py-2 text-brand shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Start Free Trial
              </Link>
            </div>
          </nav>
          <section id="hero" className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            {hero}
          </section>
        </div>
      </div>
    </header>

    <main className="flex-1">
      <section id="courses" className="bg-white py-20">
        <div className="container mx-auto">
          {courseCatalog}
        </div>
      </section>

      <section id="pricing" className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto">
          {pricing}
        </div>
      </section>

      <section id="success" className="bg-white py-20">
        <div className="container mx-auto">
          {testimonials}
        </div>
      </section>
    </main>

    <section id="cta" className="bg-gradient-to-r from-brand-dark via-brand to-brand-light py-20 text-white">
      <div className="container mx-auto">
        {callToAction}
      </div>
    </section>

    <footer className="bg-slate-950 py-10 text-sm text-slate-300">
      <div className="container mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">Infoverse Digital-Ed</p>
          <p className="mt-2 max-w-xl text-slate-400">
            Empowering ambitious learners with adaptive digital courses, live tutoring, and success analytics for global exam
            boards.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white">
            GDPR Compliant
          </span>
          <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white">
            Safeguarding Certified
          </span>
          <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white">
            Secure Payments
          </span>
        </div>
      </div>
    </footer>
  </div>
);
