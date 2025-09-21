import type { Metadata } from "next";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  NotebookPen,
  Settings,
  Users,
  LifeBuoy,
  LogOut,
  CalendarCheck,
  ListChecks,
} from "lucide-react";

import { AddTutorForm } from "@/components/dashboard/add-tutor-form";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { DashboardStatsCards } from "@/components/dashboard/dashboard-stats-cards";
import { RecentEnrollmentsTable } from "@/components/dashboard/recent-enrollments-table";
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation";
import { type ActionButtonConfig, type DashboardStat, type Enrollment, type NavItem, type OrganizationProfile } from "@/types/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard • Infoverse",
  description:
    "Monitor courses, students, and tutor activity with a responsive Infoverse admin dashboard built for Next.js App Router.",
};

const brand: OrganizationProfile = {
  name: "Infoverse",
  initials: "IV",
  tagline: "Learning Management",
  href: "/admin",
};

const navigation: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    label: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    id: "students",
    label: "Students",
    href: "/admin/students",
    icon: GraduationCap,
  },
  {
    id: "tutor",
    label: "Tutor",
    href: "/admin/tutors",
    icon: Users,
  },
];

const footerNavigation: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    id: "help",
    label: "Help",
    href: "/admin/help",
    icon: LifeBuoy,
  },
  {
    id: "logout",
    label: "Log out",
    href: "/logout",
    icon: LogOut,
    ariaLabel: "Log out of the Infoverse admin dashboard",
  },
];

const stats: DashboardStat[] = [
  {
    id: "total-courses",
    label: "Total courses",
    value: "5",
    helperText: "Active courses published this term.",
    icon: BookOpen,
  },
  {
    id: "total-students",
    label: "Total students enrolled",
    value: "20",
    helperText: "Learners actively progressing through content.",
    icon: GraduationCap,
  },
  {
    id: "recent-enrollments",
    label: "Recent enrollments",
    value: "8",
    helperText: "New enrollments added in the last 7 days.",
    icon: CalendarCheck,
  },
];

const quickActions: ActionButtonConfig[] = [
  {
    id: "create-course",
    label: "Create course",
    href: "/admin/courses/new",
    icon: NotebookPen,
    description: "Build a new learning path",
  },
  {
    id: "view-courses",
    label: "View courses",
    href: "/admin/courses",
    icon: BookOpen,
    description: "Browse all published classes",
  },
  {
    id: "manage-enrollments",
    label: "Manage enrollments",
    href: "/admin/enrollments",
    icon: ListChecks,
    description: "Review learner progress",
  },
];

const enrollments: Enrollment[] = [
  {
    id: "1",
    learnerName: "Alex Rivera",
    courseTitle: "Intro to Data Science",
    enrolledOn: "2024-07-18",
    status: "Active",
    progress: 82,
  },
  {
    id: "2",
    learnerName: "Priya Desai",
    courseTitle: "Creative Writing Fundamentals",
    enrolledOn: "2024-07-20",
    status: "Pending",
    progress: 45,
  },
  {
    id: "3",
    learnerName: "Jordan Smith",
    courseTitle: "Advanced UX Research",
    enrolledOn: "2024-07-21",
    status: "Completed",
    progress: 100,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-[120rem] flex-col gap-8 pb-12 lg:flex-row">
        <SidebarNavigation brand={brand} navItems={navigation} footerItems={footerNavigation} />
        <main className="flex-1 space-y-10 px-4 pb-6 pt-8 sm:px-6 lg:px-10">
          <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Admin</p>
              <h1 className="text-3xl font-bold text-slate-900">Admin dashboard</h1>
              <p className="text-sm text-slate-600">
                Manage courses, monitor student engagement, and collaborate with tutors from one responsive workspace.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 sm:self-auto">
              System status: Operational
            </div>
          </header>

          <DashboardStatsCards stats={stats} />

          <DashboardActions buttons={quickActions} />

          <RecentEnrollmentsTable enrollments={enrollments} />

          <AddTutorForm />
        </main>
      </div>
    </div>
  );
}
