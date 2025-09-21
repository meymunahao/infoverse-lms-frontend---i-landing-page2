import clsx from "clsx";
import type { ActionButtonConfig } from "../types";

interface ActionButtonsProps {
  actions: ActionButtonConfig[];
}

export function ActionButtons({ actions }: ActionButtonsProps) {
  return (
    <section aria-labelledby="dashboard-actions">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="dashboard-actions" className="text-xl font-semibold text-slate-900">
            Quick actions
          </h2>
          <p className="text-sm text-slate-600">
            Speed up your workflow with these frequently used actions.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return action.href ? (
            <a
              key={action.id}
              href={action.href}
              aria-label={action.ariaLabel ?? action.label}
              className={clsx(
                "group flex items-center justify-between rounded-xl border border-sky-600 bg-sky-500 px-5 py-4 text-white transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2",
              )}
            >
              <div>
                <span className="text-lg font-semibold">{action.label}</span>
                {action.description ? (
                  <p className="text-sm text-sky-100">{action.description}</p>
                ) : null}
              </div>
              {Icon ? <Icon className="h-5 w-5 text-sky-100 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : null}
            </a>
          ) : (
            <button
              key={action.id}
              type="button"
              aria-label={action.ariaLabel ?? action.label}
              className={clsx(
                "group flex items-center justify-between rounded-xl border border-sky-600 bg-sky-500 px-5 py-4 text-white transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2",
              )}
            >
              <div>
                <span className="text-lg font-semibold">{action.label}</span>
                {action.description ? (
                  <p className="text-sm text-sky-100">{action.description}</p>
                ) : null}
              </div>
              {Icon ? <Icon className="h-5 w-5 text-sky-100 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
