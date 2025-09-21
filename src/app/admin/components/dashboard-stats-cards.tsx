import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { StatCardData } from "../types";

interface DashboardStatsCardsProps {
  stats: StatCardData[];
}

const trendIconMap = {
  up: ArrowUpRight,
  down: ArrowDown,
} as const;

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  return (
    <section aria-labelledby="dashboard-statistics" className="mt-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="dashboard-statistics" className="text-xl font-semibold text-slate-900">
            Key metrics
          </h2>
          <p className="text-sm text-slate-600">
            Track the performance of your learning programs at a glance.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.trendDirection ? trendIconMap[stat.trendDirection] : null;
          return (
            <article
              key={stat.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                {stat.subtitle ? (
                  <p className="mt-1 text-sm text-slate-600">{stat.subtitle}</p>
                ) : null}
              </div>

              {stat.trendLabel && Icon ? (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{stat.trendLabel}</span>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
