import ActionButtons from "../../../components/admin/ActionButtons";
import AddTutorForm from "../../../components/admin/AddTutorForm";
import DashboardStats from "../../../components/admin/DashboardStats";
import EnrollmentsTable from "../../../components/admin/EnrollmentsTable";
import Sidebar from "../../../components/admin/Sidebar";
import type { ActionButton } from "../../../components/admin/ActionButtons";
import type { DashboardStats as DashboardStatsType, Enrollment } from "../../../types/dashboard";

const dashboardStats: DashboardStatsType = {
  totalCourses: 5,
  totalStudents: 20,
  recentEnrollmentsCount: 6,
};

const actionButtons: ActionButton[] = [
  {
    label: "Create Course",
    href: "/admin/courses/new",
    description: "Build a new learning experience in minutes.",
  },
  {
    label: "View Courses",
    href: "/admin/courses",
    description: "Review and edit all published courses.",
  },
  {
    label: "Manage Enrollments",
    href: "/admin/enrollments",
    description: "Approve requests and track learner progress.",
  },
];

const recentEnrollments: Enrollment[] = [
  {
    id: "1",
    studentName: "Sophia Martinez",
    enrolledOn: new Date("2024-05-17"),
    courseName: "Introduction to Data Science",
  },
  {
    id: "2",
    studentName: "Liam Johnson",
    enrolledOn: new Date("2024-05-15"),
    courseName: "Creative Writing Essentials",
  },
  {
    id: "3",
    studentName: "Ava Patel",
    enrolledOn: new Date("2024-05-12"),
    courseName: "Advanced Web Development",
  },
];

const AdminDashboardPage = () => (
  <div className="min-h-screen bg-slate-100 py-6 sm:py-10">
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[#33A1CD] p-4 sm:p-6 lg:p-8 shadow-2xl">
        <div className="flex flex-col gap-6 rounded-2xl bg-[#F3F3F3] p-4 sm:p-6 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row">
            <Sidebar className="lg:max-w-xs" />
            <main className="flex-1 space-y-10">
              <header className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">Overview</p>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">
                  Monitor course performance, review student activity, and invite tutors to collaborate with your
                  learning team.
                </p>
              </header>

              <DashboardStats stats={dashboardStats} />

              <ActionButtons actions={actionButtons} />

              <section aria-labelledby="recent-enrollments-heading" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 id="recent-enrollments-heading" className="text-2xl font-semibold text-slate-900">
                      Recent Enrollments
                    </h2>
                    <p className="text-sm text-slate-600">
                      Track the latest students joining your courses.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-slate-700 shadow">
                    {recentEnrollments.length} new this week
                  </span>
                </div>
                <EnrollmentsTable enrollments={recentEnrollments} />
              </section>

              <AddTutorForm className="max-w-3xl" />
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;
