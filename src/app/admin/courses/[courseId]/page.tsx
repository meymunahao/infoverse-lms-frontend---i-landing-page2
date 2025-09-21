import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { SidebarNav } from "../../components/sidebar-nav";
import { CourseForm } from "../components/course-form";
import type { Course, NavItem } from "../../types";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

const primaryNavigation: NavItem[] = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "#courses", icon: BookOpen },
  { label: "Students", href: "#students", icon: Users },
  { label: "Tutor", href: "#tutors", icon: GraduationCap },
];

const secondaryNavigation: NavItem[] = [
  { label: "Reports", href: "#reports", icon: ListChecks },
  { label: "Settings", href: "#settings", icon: Settings },
];

const footerNavigation: NavItem[] = [
  { label: "Help", href: "#help", icon: HelpCircle },
  { label: "Log out", href: "#logout", icon: LogOut },
];

export default function CourseDetailsPage({ params }: CoursePageProps) {
  const { courseId } = params;

  const course: Course = {
    id: courseId,
    title: "Design Thinking Fundamentals",
    instructor: "Jordan Blake",
    price: 199,
    category: "Product Design",
    description:
      "Empower your learners with a project-based introduction to design thinking, covering empathize to test with collaborative activities.",
    syllabus:
      "Week 1: Empathize and define with learner interviews.\nWeek 2: Ideation frameworks and rapid sketching challenges.\nWeek 3: Prototyping labs with feedback loops.\nWeek 4: User testing, iteration plans, and project presentations.",
    createdAt: new Date("2024-01-05T09:00:00Z"),
    updatedAt: new Date("2024-04-10T16:30:00Z"),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 md:flex-row">
      <SidebarNav
        primaryItems={primaryNavigation}
        secondaryItems={secondaryNavigation}
        footerItems={footerNavigation}
        activeHref="#courses"
        className="md:sticky md:top-0"
      />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <header className="flex flex-col gap-3" id="courses">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
                  Course management
                </p>
                <h1 className="text-3xl font-semibold text-slate-900">
                  Manage course
                </h1>
                <p className="text-sm text-slate-600">
                  Review and update course content, pricing, and syllabus details before publishing to learners.
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm">
                Course ID: <span className="font-semibold text-slate-700">{courseId}</span>
              </div>
            </div>
          </header>

          <CourseForm course={course} />
        </div>
      </main>
    </div>
  );
}
