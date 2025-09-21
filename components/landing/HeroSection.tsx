"use client";

import Image from "next/image";
import { useState } from "react";
import { useConversionTracking } from "@/hooks/useConversionTracking";

interface HeroSectionProps {
  marketingMessage: string;
  headline: string;
  valueProposition: string;
  supportingCopy: string;
  examBoards: string[];
  heroImage: {
    src: string;
    alt: string;
  };
  stats: Array<{
    value: string;
    label: string;
    helper?: string;
  }>;
}

export const HeroSection = ({
  marketingMessage,
  headline,
  valueProposition,
  supportingCopy,
  examBoards,
  heroImage,
  stats,
}: HeroSectionProps) => {
  const { handlePrimaryCta } = useConversionTracking();
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePrimaryCta("hero-primary", { emailCaptured: Boolean(email) });
    setEmail("");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="space-y-8 text-white">
        <span className="badge bg-white/10 text-sm uppercase tracking-wide text-white/80">
          {marketingMessage}
        </span>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{headline}</h1>
        <p className="text-xl text-white/80 lg:text-2xl">{valueProposition}</p>
        <p className="max-w-xl text-base text-white/70 lg:text-lg">{supportingCopy}</p>

        <div className="flex flex-wrap gap-2">
          {examBoards.map((board) => (
            <span key={board} className="badge bg-white/15 text-xs text-white/90">
              {board}
            </span>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur md:flex-row md:items-center"
        >
          <div className="flex-1">
            <label htmlFor="hero-email" className="sr-only">
              Email address
            </label>
            <input
              id="hero-email"
              type="email"
              required
              placeholder="Enter your school or parent email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-slate-900 shadow focus-visible:ring-2 focus-visible:ring-brand"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-elevated transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Start 7-day free trial
          </button>
        </form>

        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/5 p-5">
              <dt className="text-sm uppercase tracking-wide text-white/70">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-semibold text-white">{stat.value}</dd>
              {stat.helper ? <p className="mt-1 text-xs text-white/60">{stat.helper}</p> : null}
            </div>
          ))}
        </dl>
      </div>

      <div className="relative isolate">
        <div className="absolute inset-0 rounded-[48px] bg-white/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[40px] border border-white/20 bg-white/5 shadow-2xl">
          <Image
            priority
            src={heroImage.src}
            alt={heroImage.alt}
            width={960}
            height={960}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black/70 to-transparent p-6 text-sm text-white">
            <p className="font-semibold">Live cohort enrolment now open</p>
            <p className="text-white/80">Limited seats with top examiners and tailored progress dashboards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
