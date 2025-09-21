import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  ariaLabel?: string;
  badge?: string;
}

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  trendLabel?: string;
  trendDirection?: "up" | "down";
}

export interface ActionButtonConfig {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  ariaLabel?: string;
  description?: string;
}

export interface EnrollmentRecord {
  id: string;
  learnerName: string;
  courseName: string;
  enrolledOn: string;
  status?: "Active" | "Pending" | "Completed";
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  category: string;
  description: string;
  syllabus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseFormValues {
  title: string;
  instructor: string;
  price: string;
  category: string;
  description: string;
  syllabus: string;
}

export type CourseFormErrors = Partial<Record<keyof CourseFormValues, string>>;
