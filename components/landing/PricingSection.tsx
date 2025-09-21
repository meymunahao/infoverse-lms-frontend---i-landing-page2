"use client";

import { useState } from "react";
import { useConversionTracking } from "@/hooks/useConversionTracking";
import type { SubscriptionPlan } from "@/types/landing";
import { formatCurrency, resolveBillingPrice } from "@/utils/pricing";

interface PricingSectionProps {
  plans: SubscriptionPlan[];
}

export const PricingSection = ({ plans }: PricingSectionProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { handlePlanSelection } = useConversionTracking();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <span className="badge bg-white/10 text-white/80">Transparent pricing</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Flexible subscription plans</h2>
        <p className="mt-4 max-w-3xl text-base text-white/70 md:mx-auto">
          Choose the access level that fits your learning goals. Switch plans or cancel anytime. Annual billing unlocks two free
          months plus dedicated onboarding for schools.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1 text-sm text-white">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-4 py-2 transition ${billingCycle === "monthly" ? "bg-white text-brand" : "text-white/80"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`rounded-full px-4 py-2 transition ${billingCycle === "yearly" ? "bg-white text-brand" : "text-white/80"}`}
          >
            Yearly <span className="ml-1 hidden text-xs font-semibold text-accent sm:inline">Save 2 months</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const price = resolveBillingPrice(billingCycle, plan.price);
          const priceLabel = formatCurrency(price, plan.price.currency);

          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl transition ${plan.isPopular ? "relative isolate bg-gradient-to-br from-white/10 via-white/5 to-white/0" : ""}`}
            >
              {plan.isPopular ? (
                <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white shadow">
                  Most popular
                </span>
              ) : null}
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                {plan.bestFor ? <p className="text-sm text-white/70">Best for {plan.bestFor}</p> : null}
                <div className="flex items-baseline gap-2 text-white">
                  <span className="text-4xl font-bold">{priceLabel}</span>
                  <span className="text-sm text-white/60">per {billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
                {plan.trialDays ? (
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {plan.trialDays}-day free trial included
                  </p>
                ) : null}
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3 text-sm text-white/70">
                <p>Course access: <span className="font-semibold text-white">{plan.courseAccess}</span></p>
                <p>Support level: <span className="font-semibold text-white">{plan.supportLevel}</span></p>
                {plan.familySeats ? <p>Family seats: {plan.familySeats}</p> : null}
              </div>

              <button
                onClick={() => handlePlanSelection(plan.id, billingCycle)}
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Start free trial
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
