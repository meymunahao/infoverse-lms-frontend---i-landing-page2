"use client";

import { Users, UserCheck, MailOpen } from "lucide-react";
import type { TutorOverview } from "../types";

interface TutorOverviewCardProps {
  overview: TutorOverview;
  onViewDetails?: () => void;
  onInviteTutor?: () => void;
}

const metrics = [
  {
    key: "totalTutors" as const,
    label: "Total Tutors",
    icon: Users,
    accent: "bg-[#bdd0d2]",
  },
  {
    key: "activeTutors" as const,
    label: "Active Tutors",
    icon: UserCheck,
    accent: "bg-[#33a1cd]",
  },
  {
    key: "pendingInvites" as const,
    label: "Pending Invites",
    icon: MailOpen,
    accent: "bg-[#dd7c5e]",
  },
];

export const TutorOverviewCard: React.FC<TutorOverviewCardProps> = ({
  overview,
  onViewDetails,
  onInviteTutor,
}) => {
  return (
    <section
      aria-labelledby="tutor-overview-heading"
      className="bg-white rounded-2xl shadow-sm border border-[#bdd0d2]/60 p-6 md:p-8 flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="tutor-overview-heading"
            className="text-2xl md:text-3xl font-semibold text-gray-900"
          >
            Tutors Overview
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Track tutor engagement and onboarding progress at a glance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onInviteTutor}
            className="rounded-lg border border-[#dd7c5e] text-[#dd7c5e] px-4 py-2 text-sm font-medium transition hover:bg-[#dd7c5e]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
          >
            Invite Tutor
          </button>
          <button
            type="button"
            onClick={onViewDetails}
            className="rounded-lg bg-[#dd7c5e] text-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[#dd7c5e]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dd7c5e]"
          >
            View Tutors Details
          </button>
        </div>
      </div>

      <dl className="grid gap-4 md:grid-cols-3">
        {metrics.map(({ key, label, icon: Icon, accent }) => (
          <div
            key={key}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/80 p-4"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-full ${accent} text-white`}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <dt className="text-sm font-medium text-gray-600">{label}</dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {overview[key]}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
};
