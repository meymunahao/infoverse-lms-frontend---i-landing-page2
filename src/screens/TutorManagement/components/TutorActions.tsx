"use client";

import { Loader2 } from "lucide-react";

interface TutorActionsProps {
  onSave: () => void;
  onDelete: () => void;
  onCancelEdit?: () => void;
  isSaving: boolean;
  isDeleting: boolean;
  disableSave: boolean;
  disableDelete?: boolean;
}

export const TutorActions: React.FC<TutorActionsProps> = ({
  onSave,
  onDelete,
  onCancelEdit,
  isSaving,
  isDeleting,
  disableSave,
  disableDelete,
}) => {
  return (
    <div className="sticky bottom-0 z-10 mt-6 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-[#bdd0d2]/60 bg-white/95 p-4 shadow-md backdrop-blur">
      {onCancelEdit && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-[#33a1cd] hover:text-[#33a1cd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33a1cd]"
        >
          Cancel
        </button>
      )}

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting || disableDelete}
        className="inline-flex items-center gap-2 rounded-lg border border-[#dd7c5e] bg-white px-6 py-2 text-sm font-semibold text-[#dd7c5e] transition hover:bg-[#dd7c5e]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Delete
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving || disableSave}
        className="inline-flex items-center gap-2 rounded-lg bg-[#dd7c5e] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#dd7c5e]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Save changes
      </button>
    </div>
  );
};
