import { type DashboardStat } from "@/types/dashboard";

export interface DashboardStatsCardsProps {
  stats: DashboardStat[];
}

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  return (
    <section aria-labelledby="dashboard-statistics" className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 id="dashboard-statistics" className="text-xl font-semibold text-slate-900">
          Key metrics
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.id}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
              aria-label={`${stat.label} ${stat.value}`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#BDD0D2] text-[#1d5d75]">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="mt-3 text-sm text-slate-600">{stat.helperText}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
