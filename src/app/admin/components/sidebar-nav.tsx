import clsx from "clsx";
import type { NavItem } from "../types";

interface SidebarNavProps {
  primaryItems: NavItem[];
  secondaryItems?: NavItem[];
  footerItems?: NavItem[];
  activeHref?: string;
  className?: string;
}

const linkStyles =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500";

export function SidebarNav({
  primaryItems,
  secondaryItems,
  footerItems,
  activeHref,
  className,
}: SidebarNavProps) {
  return (
    <aside
      className={clsx(
        "flex w-full flex-col gap-6 bg-sky-500 px-4 py-6 text-white md:h-screen md:max-w-xs md:px-6",
        className,
      )}
      aria-label="Admin dashboard navigation"
    >
      <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2 text-white shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-base font-semibold text-sky-600">
          IV
        </div>
        <span className="text-lg font-semibold tracking-wide">Infoverse</span>
      </div>

      <nav aria-label="Primary">
        <ul className="flex flex-col gap-2">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel ?? item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    linkStyles,
                    isActive
                      ? "bg-white text-sky-700 shadow-sm"
                      : "hover:bg-white/15 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="truncate text-base">{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto inline-flex min-w-[2rem] justify-center rounded-full bg-white/20 px-2 text-xs font-semibold">
                      {item.badge}
                    </span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {secondaryItems && secondaryItems.length > 0 ? (
        <nav aria-label="Secondary" className="border-t border-white/20 pt-4">
          <ul className="flex flex-col gap-2">
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-label={item.ariaLabel ?? item.label}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      linkStyles,
                      isActive
                        ? "bg-white text-sky-700 shadow-sm"
                        : "hover:bg-white/15 hover:text-white",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="truncate text-base">{item.label}</span>
                    {item.badge ? (
                      <span className="ml-auto inline-flex min-w-[2rem] justify-center rounded-full bg-white/20 px-2 text-xs font-semibold">
                        {item.badge}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {footerItems && footerItems.length > 0 ? (
        <nav aria-label="Account" className="mt-auto border-t border-white/20 pt-4">
          <ul className="flex flex-col gap-2">
            {footerItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-label={item.ariaLabel ?? item.label}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      linkStyles,
                      isActive
                        ? "bg-white text-sky-700 shadow-sm"
                        : "hover:bg-white/15 hover:text-white",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="truncate text-base">{item.label}</span>
                    {item.badge ? (
                      <span className="ml-auto inline-flex min-w-[2rem] justify-center rounded-full bg-white/20 px-2 text-xs font-semibold">
                        {item.badge}
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </aside>
  );
}
