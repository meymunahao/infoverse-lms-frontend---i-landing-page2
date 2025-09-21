"use client";

import { useMemo } from "react";
import { Search, Filter } from "lucide-react";
import type { Tutor, TutorStatusFilter } from "../types";
import { StatusBadge } from "./StatusBadge";

interface TutorsListProps {
  tutors: Tutor[];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  statusFilter: TutorStatusFilter;
  onStatusFilterChange: (value: TutorStatusFilter) => void;
  specializationFilter: string;
  onSpecializationFilterChange: (value: string) => void;
  selectedTutorIds: string[];
  onToggleSelectTutor: (id: string) => void;
  onToggleSelectAll: (selectAll: boolean) => void;
  onViewTutor: (id: string) => void;
  availableSpecializations: string[];
}

export const TutorsList: React.FC<TutorsListProps> = ({
  tutors,
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusFilterChange,
  specializationFilter,
  onSpecializationFilterChange,
  selectedTutorIds,
  onToggleSelectTutor,
  onToggleSelectAll,
  onViewTutor,
  availableSpecializations,
}) => {
  const areAllSelected = useMemo(() => {
    if (!tutors.length) {
      return false;
    }

    return tutors.every((tutor) => selectedTutorIds.includes(tutor.id));
  }, [selectedTutorIds, tutors]);

  const quickAccessCourses = useMemo(() => {
    const courseMap = new Map<string, string>();

    tutors.forEach((tutor) => {
      (tutor.coursesAssigned ?? []).forEach((course) => {
        if (!courseMap.has(course)) {
          courseMap.set(course, tutor.id);
        }
      });
    });

    return Array.from(courseMap.entries());
  }, [tutors]);

  return (
    <section
      aria-labelledby="tutors-list-heading"
      className="bg-white rounded-2xl shadow-sm border border-[#bdd0d2]/60 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="tutors-list-heading"
            className="text-2xl md:text-3xl font-semibold text-gray-900"
          >
            Tutors
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Manage your tutor roster, review statuses, and access detailed profiles.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <label className="relative flex items-center">
            <span className="sr-only">Search tutors</span>
            <Search className="absolute left-3 h-4 w-4 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Search tutors"
              className="w-full md:w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#33a1cd] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#33a1cd]/40"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm font-medium text-gray-700">
          <Filter className="h-5 w-5 text-gray-500" aria-hidden="true" />
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value as TutorStatusFilter)}
            className="ml-auto rounded-md border border-gray-200 bg-white py-1.5 px-2 text-sm text-gray-900 focus:border-[#33a1cd] focus:outline-none focus:ring-2 focus:ring-[#33a1cd]/40"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm font-medium text-gray-700">
          <Filter className="h-5 w-5 text-gray-500" aria-hidden="true" />
          <span>Specialization</span>
          <select
            value={specializationFilter}
            onChange={(event) => onSpecializationFilterChange(event.target.value)}
            className="ml-auto rounded-md border border-gray-200 bg-white py-1.5 px-2 text-sm text-gray-900 focus:border-[#33a1cd] focus:outline-none focus:ring-2 focus:ring-[#33a1cd]/40"
          >
            <option value="all">All</option>
            {availableSpecializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm font-medium text-gray-700">
          <Filter className="h-5 w-5 text-gray-500" aria-hidden="true" />
          <span>Courses Assigned</span>
          <select
            defaultValue=""
            onChange={(event) => {
              const { value } = event.target;
              if (value) {
                onViewTutor(value);
                event.target.value = "";
              }
            }}
            className="ml-auto rounded-md border border-gray-200 bg-white py-1.5 px-2 text-sm text-gray-900 focus:border-[#33a1cd] focus:outline-none focus:ring-2 focus:ring-[#33a1cd]/40"
          >
            <option value="" disabled>
              Quick access
            </option>
            {quickAccessCourses.map(([course, tutorId]) => (
              <option key={course} value={tutorId}>
                {course}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                  <input
                    type="checkbox"
                    checked={areAllSelected}
                    onChange={(event) => onToggleSelectAll(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#33a1cd] focus:ring-[#33a1cd]"
                  />
                  Select all
                </label>
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-gray-600">
                Tutor
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-gray-600">
                Email
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-gray-600">
                Specialization
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-gray-600">
                Courses Assigned
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-gray-600">
                Joined
              </th>
              <th scope="col" className="px-4 py-3 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th scope="col" className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {tutors.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                  No tutors found. Adjust your filters or invite a new tutor to get started.
                </td>
              </tr>
            ) : (
              tutors.map((tutor) => {
                const isSelected = selectedTutorIds.includes(tutor.id);

                return (
                  <tr key={tutor.id} className={isSelected ? "bg-[#33a1cd]/5" : undefined}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${tutor.name}`}
                        checked={isSelected}
                        onChange={() => onToggleSelectTutor(tutor.id)}
                        className="h-4 w-4 rounded border-gray-300 text-[#33a1cd] focus:ring-[#33a1cd]"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      <div className="flex flex-col">
                        <span>{tutor.name}</span>
                        {typeof tutor.feedbackScore === "number" && (
                          <span className="text-xs text-gray-500">
                            Feedback score: {tutor.feedbackScore.toFixed(1)} / 5
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <a href={`mailto:${tutor.email}`} className="text-[#33a1cd] hover:underline">
                        {tutor.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {tutor.specialization?.join(", ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {tutor.coursesAssigned?.join(", ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(tutor.joinedDate))}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={tutor.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onViewTutor(tutor.id)}
                        className="rounded-lg border border-[#dd7c5e] px-3 py-1.5 text-sm font-medium text-[#dd7c5e] transition hover:bg-[#dd7c5e]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
