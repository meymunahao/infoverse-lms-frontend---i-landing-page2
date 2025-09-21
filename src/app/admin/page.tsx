import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";
import { ActionButtons } from "./components/action-buttons";
import { DashboardStatsCards } from "./components/dashboard-stats-cards";
import { RecentEnrollmentsTable } from "./components/recent-enrollments-table";
import { SidebarNav } from "./components/sidebar-nav";
import type {
  ActionButtonConfig,
  EnrollmentRecord,
  NavItem,
  StatCardData,
} from "./types";

const primaryNavigation: NavItem[] = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "#courses", icon: BookOpen },
  { label: "Students", href: "#students", icon: Users },
  { label: "Tutor", href: "#tutors", icon: GraduationCap },
];

const secondaryNavigation: NavItem[] = [
  { label: "Reports", href: "#reports", icon: ListChecks },
  { label: "Settings", href: "#settings", icon: Settings },
];

const footerNavigation: NavItem[] = [
  { label: "Help", href: "#help", icon: HelpCircle },
  { label: "Log out", href: "#logout", icon: LogOut },
];

const statCards: StatCardData[] = [
  {
    id: "courses",
    title: "Total courses",
    value: "5",
    subtitle: "Active learning paths",
    trendLabel: "+2 new this month",
    trendDirection: "up",
  },
  {
    id: "students",
    title: "Total students enrolled",
    value: "20",
    subtitle: "Across all programs",
    trendLabel: "3 awaiting approval",
    trendDirection: "down",
  },
  {
    id: "recent",
    title: "Recent enrollments",
    value: "7",
    subtitle: "Joined in the last 7 days",
    trendLabel: "+4 vs last week",
    trendDirection: "up",
  },
];

const actionButtons: ActionButtonConfig[] = [
  {
    id: "create-course",
    label: "Create course",
    ariaLabel: "Create a new course",
    icon: PlusCircle,
    description: "Launch a new learning experience",
  },
  {
    id: "view-courses",
    label: "View courses",
    ariaLabel: "View all courses",
    icon: BookOpen,
    description: "Browse and manage available courses",
  },
  {
    id: "manage-enrollments",
    label: "Manage enrollments",
    ariaLabel: "Manage student enrollments",
    icon: Users,
    description: "Approve or adjust learner access",
  },
];

const recentEnrollments: EnrollmentRecord[] = [
  {
    id: "enrollment-1",
    learnerName: "Alex Morgan",
    courseName: "Data Science Foundations",
    enrolledOn: "Apr 12, 2024",
    status: "Active",
  },
  {
    id: "enrollment-2",
    learnerName: "Priya Patel",
    courseName: "Introduction to UX Design",
    enrolledOn: "Apr 11, 2024",
    status: "Pending",
  },
  {
    id: "enrollment-3",
    learnerName: "Diego Ramirez",
    courseName: "Agile Project Management",
    enrolledOn: "Apr 10, 2024",
    status: "Completed",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 md:flex-row">
      <SidebarNav
        primaryItems={primaryNavigation}
        secondaryItems={secondaryNavigation}
        footerItems={footerNavigation}
        activeHref="#dashboard"
        className="md:sticky md:top-0"
      />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <header className="flex flex-col gap-4" id="dashboard">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">Admin dashboard</h1>
                <p className="text-sm text-slate-600">
                  Welcome back! Review your academy performance and take action on the latest updates.
                </p>
              </div>
              <a
                href="#settings"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                Account settings
              </a>
            </div>
          </header>

          <DashboardStatsCards stats={statCards} />

          <ActionButtons actions={actionButtons} />

          <RecentEnrollmentsTable enrollments={recentEnrollments} />

          <section aria-labelledby="add-tutor" className="mt-2 rounded-2xl border border-dashed border-sky-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <div>
                <h2 id="add-tutor" className="text-xl font-semibold text-slate-900">
                  Add tutor
                </h2>
                <p className="text-sm text-slate-600">
                  Invite a new tutor by entering their email address. We will send them a welcome message with next steps.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row sm:items-center" noValidate>
                <label className="flex flex-1 flex-col gap-2" htmlFor="tutor-email">
                  <span className="text-sm font-medium text-slate-700">Tutor email</span>
                  <input
                    id="tutor-email"
                    name="tutor-email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    required
                    aria-describedby="tutor-email-helper"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
                >
                  Send invitation
                </button>
              </form>
              <p id="tutor-email-helper" className="text-sm text-slate-500">
                Tutors receive an email with sign-in instructions and recommended onboarding materials.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
