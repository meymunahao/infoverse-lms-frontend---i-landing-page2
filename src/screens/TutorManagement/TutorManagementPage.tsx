"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Home, UserPlus } from "lucide-react";

import { AdminSidebar } from "./components/AdminSidebar";
import { BulkActionsBar } from "./components/BulkActionsBar";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { Toast } from "./components/Toast";
import { TutorActions } from "./components/TutorActions";
import { TutorForm } from "./components/TutorForm";
import { TutorOverviewCard } from "./components/TutorOverviewCard";
import { TutorsList } from "./components/TutorsList";
import type { Tutor, TutorFormData, TutorOverview, TutorStatusFilter } from "./types";

const initialTutors: Tutor[] = [
  {
    id: "tutor-1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    specialization: ["Mathematics", "Physics"],
    coursesAssigned: ["Calculus I", "Quantum Mechanics"],
    joinedDate: new Date("2023-02-14"),
    status: "active",
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    feedbackScore: 4.8,
    notes: "Prefers asynchronous updates and weekly summaries.",
  },
  {
    id: "tutor-2",
    name: "Benjamin Lee",
    email: "ben.lee@example.com",
    specialization: ["Chemistry", "Biology"],
    coursesAssigned: ["Organic Chemistry", "Molecular Biology"],
    joinedDate: new Date("2022-11-03"),
    status: "pending",
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    feedbackScore: 4.4,
    notes: "Pending onboarding documents.",
  },
  {
    id: "tutor-3",
    name: "Cynthia Patel",
    email: "cynthia.patel@example.com",
    specialization: ["Computer Science", "Data Science"],
    coursesAssigned: ["Algorithms", "Intro to Machine Learning"],
    joinedDate: new Date("2021-09-22"),
    status: "active",
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    feedbackScore: 4.9,
    notes: "Great at mentoring junior tutors.",
  },
  {
    id: "tutor-4",
    name: "Diego Martinez",
    email: "diego.martinez@example.com",
    specialization: ["History", "Sociology"],
    coursesAssigned: ["World History", "Sociology of Education"],
    joinedDate: new Date("2020-01-12"),
    status: "inactive",
    lastActiveAt: new Date("2023-06-16"),
    feedbackScore: 4.2,
    notes: "On sabbatical leave until Q2.",
  },
  {
    id: "tutor-5",
    name: "Emily Carter",
    email: "emily.carter@example.com",
    specialization: ["English Literature", "Creative Writing"],
    coursesAssigned: ["Advanced Composition", "Literary Analysis"],
    joinedDate: new Date("2023-07-08"),
    status: "active",
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    feedbackScore: 4.7,
    notes: "Interested in launching a writing workshop.",
  },
];

const emptyForm: TutorFormData = {
  name: "",
  email: "",
  specialization: [],
  coursesAssigned: [],
  notes: "",
};

type ManagementMode = "overview" | "edit";

const sortStrings = (values: string[] = []): string[] => [...values].sort((a, b) => a.localeCompare(b));

const arraysEqual = (a: string[] = [], b: string[] = []): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = sortStrings(a);
  const sortedB = sortStrings(b);

  return sortedA.every((value, index) => sortedB[index] === value);
};

const computeOverview = (tutors: Tutor[]): TutorOverview => ({
  totalTutors: tutors.length,
  activeTutors: tutors.filter((tutor) => tutor.status === "active").length,
  pendingInvites: tutors.filter((tutor) => tutor.status === "pending").length,
});

export const TutorManagementPage: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors);
  const [mode, setMode] = useState<ManagementMode>("overview");
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(initialTutors[0]?.id ?? null);
  const [formData, setFormData] = useState<TutorFormData>(initialTutors[0] ? {
    name: initialTutors[0].name,
    email: initialTutors[0].email,
    specialization: initialTutors[0].specialization ?? [],
    coursesAssigned: initialTutors[0].coursesAssigned ?? [],
    notes: initialTutors[0].notes ?? "",
  } : emptyForm);
  const [status, setStatus] = useState<Tutor["status"]>(initialTutors[0]?.status ?? "active");
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof TutorFormData, string>>>({});
  const [selectedTutorIds, setSelectedTutorIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TutorStatusFilter>("all");
  const [specializationFilter, setSpecializationFilter] = useState<string>("all");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toastState, setToastState] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [autoSaveState, setAutoSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listSectionRef = useRef<HTMLDivElement | null>(null);

  const selectedTutor = useMemo(
    () => tutors.find((tutor) => tutor.id === selectedTutorId) ?? null,
    [selectedTutorId, tutors],
  );

  const overview = useMemo(() => computeOverview(tutors), [tutors]);

  const availableSpecializations = useMemo(() => {
    const values = new Set<string>();
    tutors.forEach((tutor) => (tutor.specialization ?? []).forEach((item) => values.add(item)));
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [tutors]);

  const availableCourses = useMemo(() => {
    const values = new Set<string>();
    tutors.forEach((tutor) => (tutor.coursesAssigned ?? []).forEach((course) => values.add(course)));
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [tutors]);

  const filteredTutors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tutors
      .filter((tutor) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          [
            tutor.name,
            tutor.email,
            ...(tutor.specialization ?? []),
            ...(tutor.coursesAssigned ?? []),
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesStatus = statusFilter === "all" || tutor.status === statusFilter;
        const matchesSpecialization =
          specializationFilter === "all" || (tutor.specialization ?? []).includes(specializationFilter);

        return matchesSearch && matchesStatus && matchesSpecialization;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, specializationFilter, statusFilter, tutors]);

  const isCreating = selectedTutorId === null;

  const hasChanges = useMemo(() => {
    if (isCreating) {
      return Boolean(
        formData.name.trim() ||
          formData.email.trim() ||
          (formData.specialization?.length ?? 0) > 0 ||
          (formData.coursesAssigned?.length ?? 0) > 0 ||
          formData.notes?.trim(),
      );
    }

    if (!selectedTutor) {
      return false;
    }

    return (
      formData.name.trim() !== selectedTutor.name.trim() ||
      formData.email.trim().toLowerCase() !== selectedTutor.email.trim().toLowerCase() ||
      !arraysEqual(formData.specialization ?? [], selectedTutor.specialization ?? []) ||
      !arraysEqual(formData.coursesAssigned ?? [], selectedTutor.coursesAssigned ?? []) ||
      (formData.notes ?? "").trim() !== (selectedTutor.notes ?? "").trim() ||
      status !== selectedTutor.status
    );
  }, [formData, isCreating, selectedTutor, status]);

  useEffect(() => {
    if (!selectedTutor && tutors.length > 0 && !isCreating) {
      setSelectedTutorId(tutors[0].id);
    }
  }, [isCreating, selectedTutor, tutors]);

  useEffect(() => {
    setSelectedTutorIds((ids) => ids.filter((id) => tutors.some((tutor) => tutor.id === id)));
  }, [tutors]);

  useEffect(() => {
    if (!selectedTutor) {
      setFormData(emptyForm);
      setStatus("active");
      setAutoSaveState("idle");
      return;
    }

    setFormData({
      name: selectedTutor.name,
      email: selectedTutor.email,
      specialization: [...(selectedTutor.specialization ?? [])],
      coursesAssigned: [...(selectedTutor.coursesAssigned ?? [])],
      notes: selectedTutor.notes ?? "",
    });
    setStatus(selectedTutor.status);
    setFormErrors({});
    setAutoSaveState("idle");
  }, [selectedTutor]);

  useEffect(() => {
    if (!selectedTutor || !hasChanges || isSaving || isCreating) {
      setAutoSaveState("idle");
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
      return;
    }

    setAutoSaveState("saving");

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      setAutoSaveState("saved");
      autoSaveTimerRef.current = null;
    }, 1200);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  }, [hasChanges, isCreating, isSaving, selectedTutor]);

  useEffect(() => {
    if (!toastState) {
      return;
    }

    const timer = setTimeout(() => setToastState(null), 4000);
    return () => clearTimeout(timer);
  }, [toastState]);

  const handleFieldChange = (field: keyof TutorFormData, value: string | string[]) => {
    setFormData((previous) => ({
      ...previous,
      [field]: Array.isArray(value) ? value : value,
    }));
  };

  const handleAddSpecialization = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setFormData((previous) => {
      const current = previous.specialization ?? [];
      if (current.includes(trimmed)) {
        return previous;
      }
      return { ...previous, specialization: [...current, trimmed] };
    });
  };

  const handleRemoveSpecialization = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      specialization: (previous.specialization ?? []).filter((item) => item !== value),
    }));
  };

  const handleAddCourse = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setFormData((previous) => {
      const current = previous.coursesAssigned ?? [];
      if (current.includes(trimmed)) {
        return previous;
      }
      return { ...previous, coursesAssigned: [...current, trimmed] };
    });
  };

  const handleRemoveCourse = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      coursesAssigned: (previous.coursesAssigned ?? []).filter((item) => item !== value),
    }));
  };

  const handleSelectTutor = (id: string) => {
    setSelectedTutorId(id);
    setMode("edit");
    setFormErrors({});
    setTimeout(() => {
      document.getElementById("tutor-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleToggleSelectTutor = (id: string) => {
    setSelectedTutorIds((previous) =>
      previous.includes(id) ? previous.filter((selectedId) => selectedId !== id) : [...previous, id],
    );
  };

  const handleToggleSelectAll = (selectAll: boolean) => {
    if (!selectAll) {
      setSelectedTutorIds((previous) => previous.filter((id) => !filteredTutors.some((tutor) => tutor.id === id)));
      return;
    }

    setSelectedTutorIds((previous) => {
      const combined = new Set([...previous, ...filteredTutors.map((tutor) => tutor.id)]);
      return Array.from(combined);
    });
  };

  const handleViewDetails = () => {
    setMode("overview");
    if (listSectionRef.current) {
      listSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInviteTutor = () => {
    setToastState({ message: "Invitation email sent to pending tutors.", type: "info" });
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof TutorFormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = "Tutor name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setToastState({ message: "Please resolve validation errors before saving.", type: "error" });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      if (isCreating) {
        const newTutor: Tutor = {
          id: `tutor-${Date.now()}`,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          specialization: [...(formData.specialization ?? [])],
          coursesAssigned: [...(formData.coursesAssigned ?? [])],
          joinedDate: new Date(),
          status,
          lastActiveAt: status === "active" ? new Date() : undefined,
          notes: formData.notes?.trim() ?? "",
        };

        setTutors((previous) => [newTutor, ...previous]);
        setSelectedTutorId(newTutor.id);
        setMode("edit");
        setToastState({ message: "Tutor created successfully.", type: "success" });
      } else if (selectedTutorId) {
        setTutors((previous) =>
          previous.map((tutor) =>
            tutor.id === selectedTutorId
              ? {
                  ...tutor,
                  name: formData.name.trim(),
                  email: formData.email.trim().toLowerCase(),
                  specialization: [...(formData.specialization ?? [])],
                  coursesAssigned: [...(formData.coursesAssigned ?? [])],
                  status,
                  lastActiveAt: status === "active" ? new Date() : tutor.lastActiveAt,
                  notes: formData.notes?.trim() ?? "",
                }
              : tutor,
          ),
        );
        setToastState({ message: "Tutor profile updated.", type: "success" });
      }

      setIsSaving(false);
      setAutoSaveState("saved");
    }, 900);
  };

  const handleDelete = () => {
    if (!selectedTutorId) {
      setFormData(emptyForm);
      setStatus("active");
      setMode("overview");
      return;
    }

    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!selectedTutorId) {
      return;
    }

    const tutorToRemove = selectedTutorId;
    setIsDeleting(true);

    setTimeout(() => {
      let nextTutorId: string | null = null;

      setTutors((previous) => {
        const updated = previous.filter((tutor) => tutor.id !== tutorToRemove);
        nextTutorId = updated[0]?.id ?? null;
        return updated;
      });

      setSelectedTutorIds((previous) => previous.filter((id) => id !== tutorToRemove));
      setSelectedTutorId(nextTutorId);
      setMode("overview");
      setToastState({ message: "Tutor removed from the roster.", type: "info" });
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }, 900);
  };

  const handleBulkActivate = () => {
    setTutors((previous) =>
      previous.map((tutor) =>
        selectedTutorIds.includes(tutor.id) ? { ...tutor, status: "active", lastActiveAt: new Date() } : tutor,
      ),
    );
    setToastState({ message: "Selected tutors marked as active.", type: "success" });
  };

  const handleBulkDeactivate = () => {
    setTutors((previous) =>
      previous.map((tutor) =>
        selectedTutorIds.includes(tutor.id) ? { ...tutor, status: "inactive" } : tutor,
      ),
    );
    setToastState({ message: "Selected tutors marked as inactive.", type: "info" });
  };

  const handleBulkInvite = () => {
    setToastState({ message: "Invitation emails queued for selected tutors.", type: "info" });
  };

  const handleBulkPermissions = () => {
    setToastState({ message: "Permissions update scheduled for selected tutors.", type: "success" });
  };

  const clearSelection = () => setSelectedTutorIds([]);

  const handleCreateTutor = () => {
    setSelectedTutorId(null);
    setFormData(emptyForm);
    setStatus("pending");
    setMode("edit");
    setFormErrors({});
    document.getElementById("tutor-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] gap-6 bg-[#33a1cd]/10 p-4 md:p-6">
        <AdminSidebar activeItem="tutors" />

        <main className="flex-1 rounded-3xl bg-[#f3f3f3] p-4 md:p-8">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">Tutor Details</h1>
                  <nav aria-label="Breadcrumb" className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Home className="h-4 w-4" aria-hidden="true" />
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    <span>Dashboard</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    <span className="font-semibold text-gray-700">Tutor Management</span>
                  </nav>
                </div>

                <button
                  type="button"
                  onClick={handleCreateTutor}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#dd7c5e] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#dd7c5e]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Add tutor
                </button>
              </div>

              <div className="flex gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => setMode("overview")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    mode === "overview"
                      ? "bg-[#dd7c5e] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Tutors List
                </button>
                <button
                  type="button"
                  onClick={() => setMode("edit")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    mode === "edit"
                      ? "bg-[#dd7c5e] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  disabled={!selectedTutor && !isCreating}
                >
                  Tutor Form
                </button>
              </div>
            </header>

            <TutorOverviewCard
              overview={overview}
              onViewDetails={handleViewDetails}
              onInviteTutor={handleInviteTutor}
            />

            <BulkActionsBar
              selectedCount={selectedTutorIds.length}
              onSendInvite={handleBulkInvite}
              onActivate={handleBulkActivate}
              onDeactivate={handleBulkDeactivate}
              onAssignPermissions={handleBulkPermissions}
              onClearSelection={clearSelection}
            />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div ref={listSectionRef} className={mode === "edit" ? "md:block hidden" : "block"}>
                <TutorsList
                  tutors={filteredTutors}
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  specializationFilter={specializationFilter}
                  onSpecializationFilterChange={setSpecializationFilter}
                  selectedTutorIds={selectedTutorIds}
                  onToggleSelectTutor={handleToggleSelectTutor}
                  onToggleSelectAll={handleToggleSelectAll}
                  onViewTutor={handleSelectTutor}
                  availableSpecializations={availableSpecializations}
                />
              </div>

              <section
                id="tutor-form-section"
                className={mode === "overview" ? "md:block hidden" : "block"}
              >
                <TutorForm
                  tutor={selectedTutor}
                  formData={formData}
                  errors={formErrors}
                  status={status}
                  onFieldChange={handleFieldChange}
                  onStatusChange={setStatus}
                  onAddSpecialization={handleAddSpecialization}
                  onRemoveSpecialization={handleRemoveSpecialization}
                  onAddCourse={handleAddCourse}
                  onRemoveCourse={handleRemoveCourse}
                  availableSpecializations={availableSpecializations}
                  availableCourses={availableCourses}
                  isSaving={isSaving}
                  autoSaveState={isCreating ? "idle" : autoSaveState}
                />

                <TutorActions
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onCancelEdit={isCreating ? () => setMode("overview") : undefined}
                  isSaving={isSaving}
                  isDeleting={isDeleting}
                  disableSave={!hasChanges}
                  disableDelete={isCreating}
                />
              </section>
            </div>
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete tutor"
        description="This action will permanently remove the tutor from the roster and revoke their platform access. Are you sure you want to continue?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteDialog(false)}
        loading={isDeleting}
      />

      {toastState && (
        <Toast
          message={toastState.message}
          type={toastState.type}
          onDismiss={() => setToastState(null)}
        />
      )}
    </div>
  );
};

export default TutorManagementPage;
