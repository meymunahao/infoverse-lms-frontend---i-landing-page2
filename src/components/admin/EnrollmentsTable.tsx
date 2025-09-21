import clsx from "clsx";
import type { Enrollment } from "../../types/dashboard";

export interface EnrollmentsTableProps {
  enrollments: Enrollment[];
  className?: string;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

export const EnrollmentsTable = ({ enrollments, className }: EnrollmentsTableProps) => (
  <div className={clsx("overflow-hidden rounded-xl border border-slate-200 bg-white shadow", className)}>
    <table className="min-w-full divide-y divide-slate-200" role="grid">
      <thead className="bg-[#BDD0D2]">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-900"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-900"
          >
            Enrolled On
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-[#F3F7F8] text-sm text-slate-700">
        {enrollments.map((enrollment) => (
          <tr key={enrollment.id} className="hover:bg-[#E1EEF0]">
            <td className="px-6 py-4 font-medium text-slate-900">
              <div>{enrollment.studentName}</div>
              {enrollment.courseName ? (
                <span className="text-xs text-slate-600">{enrollment.courseName}</span>
              ) : null}
            </td>
            <td className="px-6 py-4">{formatDate(enrollment.enrolledOn)}</td>
          </tr>
        ))}
        {enrollments.length === 0 ? (
          <tr>
            <td className="px-6 py-6 text-center text-sm text-slate-600" colSpan={2}>
              No enrollments yet. New learners will appear here as soon as they join.
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  </div>
);

export default EnrollmentsTable;
