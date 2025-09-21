"use client";

import type { ChangeEvent } from "react";
import type { Tutor, TutorFormData } from "../types";

interface TutorFormProps {
  tutor: Tutor | null;
  formData: TutorFormData;
  errors: Partial<Record<keyof TutorFormData, string>>;
  status: Tutor["status"];
  onFieldChange: (field: keyof TutorFormData, value: string | string[]) => void;
  onStatusChange: (status: Tutor["status"]) => void;
  onAddSpecialization: (value: string) => void;
  onRemoveSpecialization: (value: string) => void;
  onAddCourse: (value: string) => void;
  onRemoveCourse: (value: string) => void;
  availableSpecializations: string[];
  availableCourses: string[];
  isSaving: boolean;
  autoSaveState: "idle" | "saving" | "saved" | "error";
}

const inputBaseClasses =
  "block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#33a1cd] focus:outline-none focus:ring-2 focus:ring-[#33a1cd]/40";

export const TutorForm: React.FC<TutorFormProps> = ({
  tutor,
  formData,
  errors,
  status,
  onFieldChange,
  onStatusChange,
  onAddSpecialization,
  onRemoveSpecialization,
  onAddCourse,
  onRemoveCourse,
  availableSpecializations,
  availableCourses,
  isSaving,
  autoSaveState,
}) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    onFieldChange(name as keyof TutorFormData, value);
  };

  const renderTagList = (
    values: string[] | undefined,
    onRemove: (value: string) => void,
    label: string,
  ) => {
    if (!values?.length) {
      return <p className="text-sm text-gray-500">No {label.toLowerCase()} added yet.</p>;
    }

    return (
      <ul className="flex flex-wrap gap-2">
        {values.map((value) => (
          <li key={value} className="flex items-center gap-2 rounded-full bg-[#bdd0d2]/40 px-3 py-1 text-sm font-medium text-gray-700">
            <span>{value}</span>
            <button
              type="button"
              onClick={() => onRemove(value)}
              className="text-xs font-semibold text-[#dd7c5e] hover:text-[#dd7c5e]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderSuggestions = (
    suggestions: string[],
    onSelect: (value: string) => void,
    selected: string[] | undefined,
  ) => {
    if (!suggestions.length) {
      return null;
    }

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => {
          const isSelected = selected?.includes(suggestion);

          return (
            <button
              type="button"
              key={suggestion}
              onClick={() => onSelect(suggestion)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                isSelected
                  ? "border-[#dd7c5e] bg-[#dd7c5e] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#dd7c5e] hover:text-[#dd7c5e]"
              }`}
            >
              {suggestion}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section
      aria-labelledby="tutor-information-heading"
      className="bg-white rounded-2xl shadow-sm border border-[#bdd0d2]/60 p-6 md:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            id="tutor-information-heading"
            className="text-2xl md:text-3xl font-semibold text-gray-900"
          >
            Tutor's Information
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Update personal details, teaching specializations, and assigned courses.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full bg-[#bdd0d2]/30 px-4 py-2 text-xs font-semibold text-gray-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>
            {autoSaveState === "saving" && "Saving draft..."}
            {autoSaveState === "saved" && "All changes saved"}
            {autoSaveState === "error" && "Unable to autosave"}
            {autoSaveState === "idle" && "Draft up to date"}
          </span>
        </div>
      </div>

      <form className="mt-6 grid gap-6" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Tutor's Name
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Ada Lovelace"
              className={`${inputBaseClasses} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-300" : ""}`}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "tutor-name-error" : undefined}
            />
            {errors.name && (
              <span id="tutor-name-error" className="text-xs font-medium text-red-500">
                {errors.name}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="tutor@example.com"
              className={`${inputBaseClasses} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-300" : ""}`}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "tutor-email-error" : undefined}
            />
            {errors.email && (
              <span id="tutor-email-error" className="text-xs font-medium text-red-500">
                {errors.email}
              </span>
            )}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Specializations</span>
              <button
                type="button"
                onClick={() => onFieldChange("specialization", [])}
                className="text-xs font-semibold text-[#dd7c5e] hover:text-[#dd7c5e]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
              >
                Clear all
              </button>
            </div>
            {renderTagList(formData.specialization, onRemoveSpecialization, "Specializations")}
            {renderSuggestions(availableSpecializations, onAddSpecialization, formData.specialization)}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add custom specialization"
                className={inputBaseClasses}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    const value = event.currentTarget.value.trim();
                    if (value) {
                      onAddSpecialization(value);
                      event.currentTarget.value = "";
                    }
                  }
                }}
              />
              <span className="text-xs text-gray-500">Press Enter to add</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Courses Assigned</span>
              <button
                type="button"
                onClick={() => onFieldChange("coursesAssigned", [])}
                className="text-xs font-semibold text-[#dd7c5e] hover:text-[#dd7c5e]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
              >
                Clear all
              </button>
            </div>
            {renderTagList(formData.coursesAssigned, onRemoveCourse, "Courses")}
            {renderSuggestions(availableCourses, onAddCourse, formData.coursesAssigned)}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add custom course"
                className={inputBaseClasses}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    const value = event.currentTarget.value.trim();
                    if (value) {
                      onAddCourse(value);
                      event.currentTarget.value = "";
                    }
                  }
                }}
              />
              <span className="text-xs text-gray-500">Press Enter to add</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <span className="font-medium">Status</span>
            <select
              value={status}
              onChange={(event) => onStatusChange(event.target.value as Tutor["status"])}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-[#33a1cd] focus:outline-none focus:ring-2 focus:ring-[#33a1cd]/40"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <span className="font-medium">Joined Platform</span>
            <span className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600">
              {tutor
                ? new Intl.DateTimeFormat("en", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(tutor.joinedDate))
                : "—"}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <span className="font-medium">Last Active</span>
            <span className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600">
              {tutor?.lastActiveAt
                ? new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
                    Math.round(
                      ((tutor.lastActiveAt.getTime ? tutor.lastActiveAt.getTime() : new Date(tutor.lastActiveAt).getTime()) -
                        Date.now()) /
                        (1000 * 60 * 60 * 24),
                    ),
                    "day",
                  )
                : "—"}
            </span>
          </div>
        </div>

        <div className="grid gap-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-700">Internal Notes</span>
          <textarea
            name="notes"
            placeholder="Add notes about this tutor's onboarding progress, communication preferences, or recent feedback."
            value={formData.notes ?? ""}
            className={`${inputBaseClasses} min-h-[120px]`}
            onChange={handleInputChange}
            disabled={isSaving}
          />
          <p className="text-xs text-gray-500">
            Notes are visible only to administrators. Remember to save changes to keep everyone informed.
          </p>
        </div>
      </form>
    </section>
  );
};
