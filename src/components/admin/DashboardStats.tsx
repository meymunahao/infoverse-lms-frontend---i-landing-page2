import clsx from "clsx";
import type { DashboardStats as DashboardStatsType } from "../../types/dashboard";

export interface DashboardStatsProps {
  stats: DashboardStatsType;
  className?: string;
}

const cardBaseClasses =
  "flex flex-col justify-between rounded-xl bg-[#BDD0D2] px-6 py-5 shadow transition-shadow hover:shadow-lg";

export const DashboardStats = ({ stats, className }: DashboardStatsProps) => (
  <section aria-labelledby="dashboard-metrics" className={className}>
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 id="dashboard-metrics" className="text-2xl font-semibold text-slate-900">
        Key metrics
      </h2>
      <p className="text-sm text-slate-600">
        Snapshot of the latest activity across your learning platform.
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      <article className={clsx(cardBaseClasses)}>
        <header>
          <p className="text-lg font-medium text-slate-700">Total Courses</p>
        </header>
        <p className="mt-4 text-4xl font-bold text-slate-900">{stats.totalCourses}</p>
      </article>
      <article className={clsx(cardBaseClasses)}>
        <header>
          <p className="text-lg font-medium text-slate-700">Total Students Enrolled</p>
        </header>
        <p className="mt-4 text-4xl font-bold text-slate-900">{stats.totalStudents}</p>
      </article>
      <article className={clsx(cardBaseClasses, "bg-slate-100 text-slate-900")}
        aria-label="Recent enrollments summary"
      >
        <header>
          <p className="text-lg font-medium text-slate-700">Recent Enrollments</p>
        </header>
        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          {stats.recentEnrollmentsCount} learners joined a course in the last 7 days. Keep monitoring this
          momentum to ensure every student receives a warm welcome.
        </p>
      </article>
    </div>
  </section>
);

export default DashboardStats;
