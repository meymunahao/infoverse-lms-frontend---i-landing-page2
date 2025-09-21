"use client";

import { useMemo, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { LandingPageCourse } from "@/types/landing";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
  courses: LandingPageCourse[];
}

export const CourseGrid = ({ courses }: CourseGridProps) => {
  const { trackEvent } = useAnalytics();
  const [selectedBoard, setSelectedBoard] = useState<string>("All exam boards");
  const [selectedLevel, setSelectedLevel] = useState<LandingPageCourse["level"] | "All levels">("All levels");

  const examBoards = useMemo(() => {
    const boards = new Set<string>();
    courses.forEach((course) => course.examBoards.forEach((board) => boards.add(board)));
    return ["All exam boards", ...Array.from(boards).sort()];
  }, [courses]);

  const levels: Array<LandingPageCourse["level"] | "All levels"> = ["All levels", "GCSE", "A-Level", "IB Diploma"];

  const filteredCourses = courses.filter((course) => {
    const matchesBoard =
      selectedBoard === "All exam boards" || course.examBoards.includes(selectedBoard);
    const matchesLevel = selectedLevel === "All levels" || course.level === selectedLevel;
    return matchesBoard && matchesLevel;
  });

  const handleBoardChange = (board: string) => {
    setSelectedBoard(board);
    trackEvent("course_board_filter", { board });
  };

  const handleLevelChange = (level: LandingPageCourse["level"] | "All levels") => {
    setSelectedLevel(level);
    trackEvent("course_level_filter", { level });
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="section-title">Course Catalog</h2>
          <p className="section-subtitle">
            Explore live and on-demand classes led by examiners, with adaptive assessments and AI study planners tailored to your
            exam board.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Limited-time launch pricing</p>
          <p className="mt-1 text-sm text-slate-600">
            Save up to 35% when you enroll before 31 December. Cancel anytime during the free trial.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {examBoards.map((board) => (
            <button
              key={board}
              onClick={() => handleBoardChange(board)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${selectedBoard === board ? "border-brand bg-brand/10 text-brand" : "border-slate-200 bg-white text-slate-600"}`}
            >
              {board}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${selectedLevel === level ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-600"}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-brand/40 bg-brand/5 p-10 text-center">
          <p className="text-lg font-semibold text-brand">We are launching new courses every month.</p>
          <p className="mt-2 text-sm text-slate-600">
            Share your interests via live chat or book a curriculum advisor to curate your personal study pathway.
          </p>
        </div>
      ) : null}
    </div>
  );
};
