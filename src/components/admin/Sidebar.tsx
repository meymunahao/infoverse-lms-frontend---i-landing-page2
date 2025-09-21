import clsx from "clsx";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";

export interface SidebarProps {
  activePath?: string;
  className?: string;
  onNavigate?: (href: string) => void;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: (props: ComponentProps<typeof LayoutDashboard>) => JSX.Element;
}

const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (props) => <LayoutDashboard {...props} />,
  },
  {
    label: "Courses",
    href: "/admin/courses",
    icon: (props) => <BookOpen {...props} />,
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: (props) => <GraduationCap {...props} />,
  },
  {
    label: "Tutor",
    href: "/admin/tutors",
    icon: (props) => <UserRound {...props} />,
  },
];

const utilities: NavigationItem[] = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (props) => <Settings {...props} />,
  },
  {
    label: "Log out",
    href: "/logout",
    icon: (props) => <LogOut {...props} />,
  },
  {
    label: "Help",
    href: "/support",
    icon: (props) => <LifeBuoy {...props} />,
  },
];

export const Sidebar = ({ activePath = "/admin/dashboard", className, onNavigate }: SidebarProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <aside
      className={clsx(
        "flex h-full w-full flex-col justify-between rounded-2xl bg-[#33A1CD] p-6 text-slate-900 shadow-lg md:w-64",
        className,
      )}
      aria-label="Admin dashboard navigation"
    >
      <div>
        <div className="mb-10 flex items-center gap-3 rounded-xl bg-slate-100/80 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-base font-bold">
            IV
          </div>
          <span className="text-base font-medium">Infoverse</span>
        </div>
        <nav aria-label="Primary">
          <ul className="space-y-1 text-base font-medium">
            {navigation.map(({ label, href, icon: Icon }) => {
              const isActive = activePath === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(event) => handleClick(event, href)}
                    className={clsx(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#33A1CD]",
                      isActive
                        ? "bg-[#BDD0D2] text-slate-900 shadow"
                        : "text-slate-900/80 hover:bg-[#BDD0D2]/70 hover:text-slate-900",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div>
        <nav aria-label="Secondary">
          <ul className="space-y-1 text-base font-medium">
            {utilities.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(event) => handleClick(event, href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900/90 transition-colors hover:bg-[#BDD0D2]/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#33A1CD]"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
