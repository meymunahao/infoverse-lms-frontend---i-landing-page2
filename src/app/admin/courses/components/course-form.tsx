"use client";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  Save,
  Trash2,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { validateCourseForm } from "../../utils/course-validation";
import type {
  Course,
  CourseFormErrors,
  CourseFormValues,
} from "../../types";
import { ActionButton } from "./action-button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { TextField, TextareaField } from "./form-fields";

const textDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const textTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const blankCourseValues: CourseFormValues = {
  title: "",
  instructor: "",
  price: "",
  category: "",
  description: "",
  syllabus: "",
};

const mapCourseToFormValues = (course: Course): CourseFormValues => ({
  title: course.title,
  instructor: course.instructor,
  price: course.price.toFixed(2),
  category: course.category,
  description: course.description,
  syllabus: course.syllabus,
});

interface CourseFormProps {
  course: Course;
}

type AlertState = { type: "success" | "error"; message: string } | null;

type AutoSaveStatus = "idle" | "saving" | "saved";

export function CourseForm({ course }: CourseFormProps) {
  const initialValuesRef = useRef<CourseFormValues>(mapCourseToFormValues(course));
  const savedSnapshotRef = useRef(JSON.stringify(initialValuesRef.current));

  const [formValues, setFormValues] = useState<CourseFormValues>(
    initialValuesRef.current,
  );
  const [formErrors, setFormErrors] = useState<CourseFormErrors>(() =>
    validateCourseForm(initialValuesRef.current),
  );
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof CourseFormValues, boolean>>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("idle");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [lastAutoSaveAt, setLastAutoSaveAt] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>(course.updatedAt);

  const pendingAutoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeAutoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialRenderRef = useRef(true);

  const hasChanges = useMemo(() => {
    return JSON.stringify(formValues) !== savedSnapshotRef.current;
  }, [formValues]);

  const formatTimestamp = useCallback((date: Date | null) => {
    if (!date) {
      return "Not available";
    }

    return `${textDateFormatter.format(date)} at ${textTimeFormatter.format(date)}`;
  }, []);

  const formattedCreatedAt = useMemo(
    () => formatTimestamp(course.createdAt),
    [course.createdAt, formatTimestamp],
  );

  const formattedUpdatedAt = useMemo(
    () => formatTimestamp(lastUpdatedAt),
    [lastUpdatedAt, formatTimestamp],
  );

  const formattedAutoSave = useMemo(() => {
    if (!lastAutoSaveAt) {
      return null;
    }

    return `${textTimeFormatter.format(lastAutoSaveAt)}`;
  }, [lastAutoSaveAt]);

  const clearAutoSaveTimers = useCallback(() => {
    if (pendingAutoSaveRef.current) {
      clearTimeout(pendingAutoSaveRef.current);
      pendingAutoSaveRef.current = null;
    }

    if (activeAutoSaveRef.current) {
      clearTimeout(activeAutoSaveRef.current);
      activeAutoSaveRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAutoSaveTimers();
    };
  }, [clearAutoSaveTimers]);

  useEffect(() => {
    setFormErrors(validateCourseForm(formValues));
  }, [formValues]);

  useEffect(() => {
    if (isDeleted) {
      clearAutoSaveTimers();
      setAutoSaveStatus("idle");
      setInfoMessage(null);
      return;
    }

    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }

    if (!hasChanges) {
      clearAutoSaveTimers();
      return;
    }

    clearAutoSaveTimers();

    pendingAutoSaveRef.current = setTimeout(() => {
      const nextErrors = validateCourseForm(formValues);
      if (Object.keys(nextErrors).length > 0) {
        setAutoSaveStatus("idle");
        return;
      }

      setAutoSaveStatus("saving");
      setInfoMessage("Auto-saving changes...");

      activeAutoSaveRef.current = setTimeout(() => {
        savedSnapshotRef.current = JSON.stringify(formValues);
        setAutoSaveStatus("saved");
        const savedAt = new Date();
        setLastAutoSaveAt(savedAt);
        setLastUpdatedAt(savedAt);
        setInfoMessage("All changes auto-saved.");
      }, 900);
    }, 1800);
  }, [formValues, hasChanges, isDeleted, clearAutoSaveTimers]);

  useEffect(() => {
    if (autoSaveStatus !== "saved") {
      return;
    }

    const timeout = setTimeout(() => {
      setInfoMessage(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [autoSaveStatus]);

  useEffect(() => {
    if (!hasChanges) {
      return;
    }

    setAlert((previous) =>
      previous?.type === "success" ? null : previous,
    );
  }, [hasChanges]);

  const markFieldTouched = useCallback(
    (field: keyof CourseFormValues) => {
      setTouchedFields((previous) => ({ ...previous, [field]: true }));
    },
    [],
  );

  const handleInputChange = useCallback(
    (field: keyof CourseFormValues) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues((previous) => ({
          ...previous,
          [field]: event.target.value,
        }));
      },
    [],
  );

  const handleTextareaChange = useCallback(
    (field: keyof CourseFormValues) =>
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFormValues((previous) => ({
          ...previous,
          [field]: event.target.value,
        }));
      },
    [],
  );

  const handleBlur = useCallback(
    (field: keyof CourseFormValues) =>
      (_event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        markFieldTouched(field);
      },
    [markFieldTouched],
  );

  const getFieldError = useCallback(
    (field: keyof CourseFormValues) => {
      if (!formErrors[field]) {
        return undefined;
      }

      if (isSubmitted || touchedFields[field]) {
        return formErrors[field];
      }

      return undefined;
    },
    [formErrors, isSubmitted, touchedFields],
  );

  const disableInputs = isSaving || isDeleting || isDeleted;

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitted(true);
      clearAutoSaveTimers();
      setAutoSaveStatus("idle");
      setInfoMessage(null);

      const nextErrors = validateCourseForm(formValues);
      setFormErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setAlert({
          type: "error",
          message: "Please fix the highlighted fields before saving.",
        });
        return;
      }

      setIsSaving(true);
      setAlert(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 900));

        const savedAt = new Date();
        savedSnapshotRef.current = JSON.stringify(formValues);
        setLastUpdatedAt(savedAt);
        setLastAutoSaveAt(savedAt);
        setAutoSaveStatus("saved");
        setInfoMessage("Course details saved.");
        setAlert({
          type: "success",
          message: "Course details saved successfully.",
        });
      } catch (error) {
        console.error(error);
        setAlert({
          type: "error",
          message: "We were unable to save the course. Please try again.",
        });
      } finally {
        setIsSaving(false);
      }
    },
    [
      clearAutoSaveTimers,
      formValues,
    ],
  );

  const handleDeleteRequest = useCallback(() => {
    setIsConfirmOpen(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setIsConfirmOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
      setIsConfirmOpen(false);
      setIsDeleting(true);
      clearAutoSaveTimers();
      setAutoSaveStatus("idle");
      setInfoMessage(null);
      setAlert(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 900));

        savedSnapshotRef.current = JSON.stringify(blankCourseValues);
        setFormValues(blankCourseValues);
        setTouchedFields({});
        setIsSubmitted(false);
        setIsDeleted(true);
        setLastAutoSaveAt(null);
        setAlert({
          type: "success",
          message: "Course deleted. You can safely navigate back to the course list.",
        });
      } catch (error) {
        console.error(error);
        setAlert({
          type: "error",
          message: "We were unable to delete the course. Please try again.",
        });
      } finally {
        setIsDeleting(false);
      }
    },
    [clearAutoSaveTimers],
  );

  useEffect(() => {
    if (!infoMessage || autoSaveStatus === "saving") {
      return;
    }

    const timeout = setTimeout(() => {
      setInfoMessage(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [infoMessage, autoSaveStatus]);

  return (
    <section
      aria-labelledby="course-details-heading"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1
            id="course-details-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Course details
          </h1>
          <p className="text-sm text-slate-600">
            Update your course information, keep the syllabus fresh, and share
            the latest pricing with learners.
          </p>
        </div>
        <div className="flex flex-col items-start rounded-xl bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600 sm:items-end">
          <span>Created {formattedCreatedAt}</span>
          <span>Last updated {formattedUpdatedAt}</span>
        </div>
      </header>

      {alert ? (
        <div
          role="alert"
          className={
            alert.type === "success"
              ? "mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              : "mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          }
        >
          {alert.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5" aria-hidden="true" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5" aria-hidden="true" />
          )}
          <span>{alert.message}</span>
        </div>
      ) : null}

      {infoMessage ? (
        <div
          className="mt-4 flex items-start gap-3 rounded-xl border border-dashed border-[#DD7C5E]/40 bg-[#fde7df]/40 px-4 py-3 text-sm text-[#7a3f2d]"
          aria-live="polite"
        >
          <Info className="mt-0.5 h-5 w-5" aria-hidden="true" />
          <div className="flex flex-col">
            <span>{infoMessage}</span>
            {formattedAutoSave ? (
              <span className="text-xs text-[#a8644c]">
                Last auto-save at {formattedAutoSave}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {isDeleted ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          This course has been deleted. Restoring it will require creating a
          new course entry.
        </p>
      ) : null}

      <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            label="Course title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange("title")}
            onBlur={handleBlur("title")}
            placeholder="Design Thinking Fundamentals"
            required
            error={getFieldError("title")}
            disabled={disableInputs}
          />
          <TextField
            label="Instructor"
            name="instructor"
            value={formValues.instructor}
            onChange={handleInputChange("instructor")}
            onBlur={handleBlur("instructor")}
            placeholder="Jordan Blake"
            required
            error={getFieldError("instructor")}
            disabled={disableInputs}
          />
          <TextField
            label="Price"
            name="price"
            type="text"
            value={formValues.price}
            onChange={handleInputChange("price")}
            onBlur={handleBlur("price")}
            placeholder="199.00"
            required
            description="Enter the amount learners will pay (numbers only)."
            error={getFieldError("price")}
            disabled={disableInputs}
          />
          <TextField
            label="Category"
            name="category"
            value={formValues.category}
            onChange={handleInputChange("category")}
            onBlur={handleBlur("category")}
            placeholder="Product Design"
            required
            error={getFieldError("category")}
            disabled={disableInputs}
          />
          <div className="md:col-span-2">
            <TextareaField
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleTextareaChange("description")}
              onBlur={handleBlur("description")}
              placeholder="Summarize the learning outcomes and who this course is for."
              required
              rows={5}
              error={getFieldError("description")}
              disabled={disableInputs}
            />
          </div>
          <div className="md:col-span-2">
            <TextareaField
              label="Syllabus"
              name="syllabus"
              value={formValues.syllabus}
              onChange={handleTextareaChange("syllabus")}
              onBlur={handleBlur("syllabus")}
              placeholder="Provide a week-by-week breakdown or bullet list of the topics covered."
              required
              rows={10}
              description="Include lesson titles, key exercises, and assessment details."
              error={getFieldError("syllabus")}
              disabled={disableInputs}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500" aria-live="polite">
            {autoSaveStatus === "saving"
              ? "Saving changes..."
              : autoSaveStatus === "saved"
                ? lastAutoSaveAt
                  ? `All changes saved at ${textTimeFormatter.format(lastAutoSaveAt)}.`
                  : "All changes saved."
                : hasChanges
                  ? "You have unsaved changes."
                  : "All changes are synced."}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionButton
              type="submit"
              icon={Save}
              loading={isSaving}
              disabled={isDeleted || isDeleting}
              aria-label="Save course details"
            >
              Save
            </ActionButton>
            <ActionButton
              type="button"
              variant="outline"
              icon={Trash2}
              onClick={handleDeleteRequest}
              loading={isDeleting}
              disabled={isDeleted}
              aria-label="Delete this course"
            >
              Delete
            </ActionButton>
          </div>
        </div>
      </form>

      <ConfirmationDialog
        open={isConfirmOpen}
        title="Delete course"
        description="This action cannot be undone. Deleting will remove the course from the catalog and revoke learner access."
        confirmLabel="Confirm delete"
        cancelLabel="Cancel"
        loading={isDeleting}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
