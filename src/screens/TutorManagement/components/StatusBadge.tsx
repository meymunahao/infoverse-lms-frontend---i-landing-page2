"use client";

import clsx from "clsx";
import type { Tutor } from "../types";

interface StatusBadgeProps {
  status: Tutor["status"];
}

const statusConfig: Record<Tutor["status"], { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
};
