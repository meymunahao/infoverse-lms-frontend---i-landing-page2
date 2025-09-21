'use client';

import { useMemo } from 'react';
import type { ElementType } from 'react';
import { Users, GraduationCap, LayoutDashboard, UserCog, LogOut, LifeBuoy, Settings } from 'lucide-react';
import clsx from 'clsx';

interface SidebarNavItem {
  label: string;
  href: string;
  icon: ElementType;
  isActive?: boolean;
}

interface AdminSidebarProps {
  activePath?: string;
  className?: string;
}

const baseItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Courses',
    href: '/admin/courses',
    icon: GraduationCap,
  },
  {
    label: 'Students',
    href: '/admin/students',
    icon: Users,
  },
  {
    label: 'Tutor',
    href: '/admin/tutors',
    icon: UserCog,
  },
];

const footerItems: SidebarNavItem[] = [
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    label: 'Log out',
    href: '/logout',
    icon: LogOut,
  },
  {
    label: 'Help',
    href: '/support',
    icon: LifeBuoy,
  },
];

export function AdminSidebar({ activePath = '/admin/students', className }: AdminSidebarProps) {
  const items = useMemo(() => {
    return baseItems.map((item) => ({
      ...item,
      isActive: activePath.startsWith(item.href),
    }));
  }, [activePath]);

  return (
    <aside
      className={clsx(
        'flex w-full max-w-xs flex-col justify-between rounded-2xl bg-[#33A1CD] p-6 text-slate-900 shadow-lg',
        className,
      )}
      aria-label="Admin navigation"
    >
      <div>
        <div className="mb-10 flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 text-sm font-medium uppercase tracking-wide text-slate-900 shadow">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-900">
            IV
          </div>
          <span className="text-lg font-semibold">Infoverse</span>
        </div>

        <nav className="space-y-1" aria-label="Main">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors',
                item.isActive ? 'bg-[#BDD0D2] text-slate-900' : 'text-white/90 hover:bg-white/20',
              )}
              aria-current={item.isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-2" aria-label="Secondary">
        {footerItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/20"
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export default AdminSidebar;
