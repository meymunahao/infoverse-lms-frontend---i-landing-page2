import type { EnrollmentRecord } from "../types";

interface RecentEnrollmentsTableProps {
  enrollments: EnrollmentRecord[];
}

export function RecentEnrollmentsTable({ enrollments }: RecentEnrollmentsTableProps) {
  return (
    <section aria-labelledby="recent-enrollments" className="mt-8">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="recent-enrollments" className="text-xl font-semibold text-slate-900">
            Recent enrollments
          </h2>
          <p className="text-sm text-slate-600">
            Stay up to date with the latest learners joining your courses.
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200" role="grid">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Learner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Enrolled on
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900">{enrollment.learnerName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{enrollment.courseName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{enrollment.enrolledOn}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{enrollment.status ?? "Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
