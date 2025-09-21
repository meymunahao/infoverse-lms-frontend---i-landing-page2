import { type LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  ariaLabel?: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  helperText: string;
  icon: LucideIcon;
}

export interface ActionButtonConfig {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
  ariaLabel?: string;
  description?: string;
  onClick?: () => void;
}

export interface Enrollment {
  id: string;
  learnerName: string;
  courseTitle: string;
  enrolledOn: string;
  status: "Active" | "Pending" | "Completed";
  progress: number;
}

export interface OrganizationProfile {
  name: string;
  initials: string;
  tagline?: string;
  href?: string;
}
