"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { type ActionButtonConfig } from "@/types/dashboard";

export interface DashboardActionsProps {
  buttons: ActionButtonConfig[];
}

export function DashboardActions({ buttons }: DashboardActionsProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleInteraction = (button: ActionButtonConfig) => () => {
    setActiveButton(button.id);
    button.onClick?.();
    window.setTimeout(() => setActiveButton(null), 240);
  };

  return (
    <section aria-labelledby="dashboard-quick-actions" className="space-y-3">
      <h2 id="dashboard-quick-actions" className="text-xl font-semibold text-slate-900">
        Quick actions
      </h2>
      <div className="flex flex-wrap gap-3">
        {buttons.map((button) => {
          const Icon = button.icon;
          const sharedClasses = cn(
            "group inline-flex min-w-[12rem] flex-1 items-center justify-between gap-3 rounded-xl border border-transparent bg-[#DD7C5E] px-5 py-4 text-left text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#c96d52] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b95d42] focus-visible:ring-offset-slate-100 active:translate-y-0",
            activeButton === button.id && "ring-2 ring-offset-2 ring-offset-slate-100 ring-[#b95d42]",
          );

          const content = (
            <span className="flex w-full items-center justify-between gap-3">
              <span className="flex flex-col">
                <span className="text-base font-semibold">{button.label}</span>
                {button.description ? (
                  <span className="text-sm text-white/90">{button.description}</span>
                ) : null}
              </span>
              <Icon aria-hidden="true" className="h-5 w-5 text-white/90 transition-transform group-hover:scale-110" />
            </span>
          );

          if (button.href) {
            return (
              <Link
                key={button.id}
                href={button.href}
                aria-label={button.ariaLabel ?? button.label}
                className={sharedClasses}
                onClick={handleInteraction(button)}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={button.id}
              type="button"
              aria-label={button.ariaLabel ?? button.label}
              className={sharedClasses}
              onClick={handleInteraction(button)}
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}
