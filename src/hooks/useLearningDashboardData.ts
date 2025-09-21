import { useEffect, useMemo, useState } from "react";
import {
  EnrolledCourse,
  LearningProgress,
  StudentProfile,
  SuggestedCourse,
} from "../types/learning";

interface UseLearningDashboardDataResult {
  profile: StudentProfile;
  enrolledCourses: EnrolledCourse[];
  suggestedCourses: SuggestedCourse[];
  learningProgress: LearningProgress[];
  activeCourseId: string | null;
  recentlyAccessed: string[];
  setActiveCourseId: (courseId: string | null) => void;
  updateCourseProgress: (courseId: string, progress: Partial<LearningProgress>) => void;
}

const sampleProfile: StudentProfile = {
  id: "student-1",
  fullName: "Jordan Carter",
  email: "jordan.carter@example.edu",
  learningStreak: 12,
  totalCoursesCompleted: 8,
  currentLevel: "Intermediate Scholar",
  joinDate: new Date("2022-06-01"),
};

const sampleCourses: EnrolledCourse[] = [
  {
    id: "course-1",
    name: "Foundations of Data Science",
    progress: 30,
    lastAccessed: new Date(),
    nextLesson: "Module 3 · Probability Basics",
    estimatedTimeToComplete: 12,
    difficulty: "beginner",
    category: "Data & Analytics",
    instructor: "Dr. Elena Ramirez",
  },
  {
    id: "course-2",
    name: "Full Stack Web Development",
    progress: 70,
    lastAccessed: new Date(),
    nextLesson: "Sprint 4 · API Integration",
    estimatedTimeToComplete: 20,
    difficulty: "intermediate",
    category: "Software Engineering",
    instructor: "Andre Wallace",
  },
  {
    id: "course-3",
    name: "Designing Accessible Interfaces",
    progress: 50,
    lastAccessed: new Date(),
    nextLesson: "Chapter 5 · Inclusive Typography",
    estimatedTimeToComplete: 9,
    difficulty: "advanced",
    category: "Design & UX",
    instructor: "Priya Natarajan",
  },
];

const sampleSuggestedCourses: SuggestedCourse[] = [
  {
    id: "suggested-1",
    name: "Product Analytics with SQL",
    description: "Build data fluency and translate insights into product strategy.",
    rating: 4.8,
    enrollmentCount: 1250,
    duration: 8,
    difficulty: "intermediate",
    price: 0,
    tags: ["data", "sql", "product"],
  },
  {
    id: "suggested-2",
    name: "Creative Coding with JavaScript",
    description: "Blend art and code to create interactive learning experiences.",
    rating: 4.6,
    enrollmentCount: 980,
    duration: 6,
    difficulty: "beginner",
    tags: ["javascript", "creative", "frontend"],
  },
  {
    id: "suggested-3",
    name: "Leadership for Remote Teams",
    description: "Lead distributed teams with confidence and empathy.",
    rating: 4.9,
    enrollmentCount: 1520,
    duration: 5,
    difficulty: "advanced",
    price: 49,
    tags: ["leadership", "remote", "management"],
  },
];

const sampleProgress: LearningProgress[] = [
  {
    courseId: "course-1",
    lessonsCompleted: 7,
    totalLessons: 24,
    timeSpent: 310,
    lastPosition: {
      lessonId: "probability-basics",
      timestamp: Date.now() - 1000 * 60 * 60,
    },
    quiz_scores: [82, 76],
    certificates: [],
  },
  {
    courseId: "course-2",
    lessonsCompleted: 18,
    totalLessons: 26,
    timeSpent: 1240,
    lastPosition: {
      lessonId: "api-integration",
      timestamp: Date.now() - 1000 * 60 * 60 * 8,
    },
    quiz_scores: [91, 94, 88],
    certificates: ["rest-architecture"],
  },
  {
    courseId: "course-3",
    lessonsCompleted: 10,
    totalLessons: 20,
    timeSpent: 640,
    lastPosition: {
      lessonId: "inclusive-typography",
      timestamp: Date.now() - 1000 * 60 * 30,
    },
    quiz_scores: [78, 85],
    certificates: [],
  },
];

export const useLearningDashboardData = (): UseLearningDashboardDataResult => {
  const [enrolledCourses, setEnrolledCourses] = useState(sampleCourses);
  const [learningProgress, setLearningProgress] = useState(sampleProgress);
  const [recentlyAccessed, setRecentlyAccessed] = useState<string[]>([]);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(sampleCourses[0]?.id ?? null);

  useEffect(() => {
    if (activeCourseId) {
      setRecentlyAccessed((prev) => {
        const filtered = prev.filter((id) => id !== activeCourseId);
        return [activeCourseId, ...filtered].slice(0, 5);
      });
    }
  }, [activeCourseId]);

  const updateCourseProgress = (courseId: string, progressDelta: Partial<LearningProgress>) => {
    setLearningProgress((prev) =>
      prev.map((progress) =>
        progress.courseId === courseId ? { ...progress, ...progressDelta } : progress,
      ),
    );

    if (typeof progressDelta.lessonsCompleted === "number" && typeof progressDelta.totalLessons === "number") {
      const percent = Math.min(
        100,
        Math.round((progressDelta.lessonsCompleted / progressDelta.totalLessons) * 100),
      );
      setEnrolledCourses((prev) =>
        prev.map((course) => (course.id === courseId ? { ...course, progress: percent } : course)),
      );
    }
  };

  const value = useMemo(
    () => ({
      profile: sampleProfile,
      enrolledCourses,
      suggestedCourses: sampleSuggestedCourses,
      learningProgress,
      activeCourseId,
      recentlyAccessed,
      setActiveCourseId,
      updateCourseProgress,
    }),
    [activeCourseId, enrolledCourses, learningProgress, recentlyAccessed],
  );

  return value;
};
