"use client";

import { Mail, UserCheck, UserX, ShieldCheck } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onSendInvite: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onAssignPermissions: () => void;
  onClearSelection: () => void;
}

const actions = [
  {
    key: "sendInvite" as const,
    label: "Send Invite",
    icon: Mail,
  },
  {
    key: "activate" as const,
    label: "Mark Active",
    icon: UserCheck,
  },
  {
    key: "deactivate" as const,
    label: "Mark Inactive",
    icon: UserX,
  },
  {
    key: "permissions" as const,
    label: "Assign Permissions",
    icon: ShieldCheck,
  },
];

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onSendInvite,
  onActivate,
  onDeactivate,
  onAssignPermissions,
  onClearSelection,
}) => {
  if (selectedCount === 0) {
    return null;
  }

  const callbacks = {
    sendInvite: onSendInvite,
    activate: onActivate,
    deactivate: onDeactivate,
    permissions: onAssignPermissions,
  } as const;

  return (
    <div className="sticky top-4 z-20 flex items-center justify-between gap-4 rounded-2xl border border-[#33a1cd]/20 bg-[#33a1cd]/10 px-4 py-3 text-sm font-semibold text-[#0f172a] shadow-sm">
      <span>
        {selectedCount} tutor{selectedCount > 1 ? "s" : ""} selected
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              type="button"
              onClick={callbacks[action.key]}
              className="inline-flex items-center gap-2 rounded-full border border-[#dd7c5e]/50 bg-white px-3 py-1.5 text-xs font-semibold text-[#dd7c5e] transition hover:bg-[#dd7c5e]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {action.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onClearSelection}
          className="rounded-full border border-transparent px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33a1cd]"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
