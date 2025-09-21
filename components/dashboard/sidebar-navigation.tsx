"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type NavItem, type OrganizationProfile } from "@/types/dashboard";

export interface SidebarNavigationProps {
  brand: OrganizationProfile;
  navItems: NavItem[];
  footerItems?: NavItem[];
}

export function SidebarNavigation({
  brand,
  navItems,
  footerItems = [
    {
      id: "settings",
      label: "Settings",
      href: "#settings",
      icon: Settings,
    },
    {
      id: "logout",
      label: "Log out",
      href: "#logout",
      icon: LogOut,
    },
    {
      id: "help",
      label: "Help",
      href: "#help",
      icon: LifeBuoy,
    },
  ],
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Admin navigation"
      className="w-full bg-[#33A1CD] text-white shadow-lg lg:w-72 lg:min-h-screen"
    >
      <div className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-lg font-semibold text-[#33A1CD]"
            >
              {brand.initials}
            </span>
            <div>
              <Link
                href={brand.href ?? "#"}
                className="text-lg font-semibold text-white transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                {brand.name}
              </Link>
              {brand.tagline ? (
                <p className="text-sm text-white/80">{brand.tagline}</p>
              ) : null}
            </div>
          </div>

          <nav aria-label="Primary">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname === item.href.replace(/\/#.*/, "");
                const Icon = item.icon ?? LayoutDashboard;

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel ?? item.label}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-[#33A1CD]",
                        isActive
                          ? "bg-white text-[#1d5d75] shadow"
                          : "hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-[#33A1CD]" : "text-white/90 group-hover:text-white",
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {footerItems.length ? (
          <div>
            <div className="hidden h-px bg-white/20 lg:block" />
            <ul className="mt-4 space-y-1" aria-label="Secondary">
              {footerItems.map((item) => {
                const Icon = item.icon ?? LayoutDashboard;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel ?? item.label}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-[#33A1CD]"
                    >
                      <Icon aria-hidden="true" className="h-5 w-5 text-white/90" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
