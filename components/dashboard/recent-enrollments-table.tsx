import { formatEnrollmentDate, getInitials } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { type Enrollment } from "@/types/dashboard";

export interface RecentEnrollmentsTableProps {
  enrollments: Enrollment[];
}

export function RecentEnrollmentsTable({
  enrollments,
}: RecentEnrollmentsTableProps) {
  return (
    <section aria-labelledby="recent-enrollments" className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="recent-enrollments" className="text-xl font-semibold text-slate-900">
          Recent enrollments
        </h2>
        <p className="text-sm text-slate-600">
          Latest activity from the past two weeks.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200" role="grid">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide text-slate-600"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide text-slate-600"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide text-slate-600"
                >
                  Enrolled on
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide text-slate-600"
                >
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {enrollments.map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="transition-colors hover:bg-slate-50 focus-within:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BDD0D2] text-sm font-semibold text-[#1d5d75]">
                        {getInitials(enrollment.learnerName)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {enrollment.learnerName}
                        </p>
                        <p className="text-sm text-slate-600">{enrollment.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {enrollment.courseTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {formatEnrollmentDate(enrollment.enrolledOn)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-slate-800">
                        {enrollment.progress}% complete
                      </span>
                      <span className="h-2 w-full rounded-full bg-slate-200">
                        <span
                          style={{ width: `${Math.min(enrollment.progress, 100)}%` }}
                          className={cn(
                            "block h-full rounded-full bg-[#33A1CD] transition-all",
                            enrollment.progress >= 100 && "bg-emerald-500",
                          )}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {enrollments.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-slate-600">
            No enrollments recorded this week.
          </div>
        ) : null}
      </div>
    </section>
  );
}
