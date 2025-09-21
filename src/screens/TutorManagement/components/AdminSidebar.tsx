"use client";

import { GraduationCap, LayoutDashboard, Users, Settings, LogOut, LifeBuoy } from "lucide-react";

interface AdminSidebarProps {
  activeItem?: "dashboard" | "courses" | "students" | "tutors";
}

const navigation = [
  { key: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { key: "courses" as const, label: "Courses", icon: GraduationCap },
  { key: "students" as const, label: "Students", icon: Users },
  { key: "tutors" as const, label: "Tutor", icon: GraduationCap },
];

const footerLinks = [
  { key: "settings", label: "Settings", icon: Settings },
  { key: "logout", label: "Log out", icon: LogOut },
  { key: "help", label: "Help", icon: LifeBuoy },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeItem = "tutors" }) => {
  return (
    <aside className="flex h-full w-full max-w-[260px] flex-col gap-8 rounded-3xl bg-[#33a1cd] p-6 text-white">
      <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-[#0f172a]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#bdd0d2] text-sm font-semibold uppercase tracking-wide">
          IV
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Infoverse</span>
          <span className="text-xs text-[#64748b]">Admin Console</span>
        </div>
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeItem;

          return (
            <a
              key={item.key}
              href="#"
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-[#0f172a] shadow-lg"
                  : "text-white/90 hover:bg-white/20"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto grid gap-2" aria-label="Account">
        {footerLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href="#"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/20"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
};
