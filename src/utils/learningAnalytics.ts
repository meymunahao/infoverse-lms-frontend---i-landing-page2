import { EnrolledCourse, LearningProgress, SuggestedCourse } from "../types/learning";

export const getDifficultyColor = (
  difficulty: EnrolledCourse["difficulty"] | SuggestedCourse["difficulty"],
): string => {
  switch (difficulty) {
    case "beginner":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "intermediate":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "advanced":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress < 40) {
    return "bg-rose-500";
  }
  if (progress < 70) {
    return "bg-amber-400";
  }
  return "bg-emerald-500";
};

export const calculateCompletionRate = (
  progress: LearningProgress[],
): number => {
  if (!progress.length) return 0;
  const totalLessons = progress.reduce((acc, course) => acc + course.totalLessons, 0);
  const completedLessons = progress.reduce((acc, course) => acc + course.lessonsCompleted, 0);
  return totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
};

export const calculateTotalCertificates = (progress: LearningProgress[]): number =>
  progress.reduce((acc, course) => acc + course.certificates.length, 0);

export const calculateAverageQuizScore = (progress: LearningProgress[]): number => {
  const allScores = progress.flatMap((course) => course.quiz_scores);
  if (!allScores.length) return 0;
  const averageScore = allScores.reduce((acc, score) => acc + score, 0) / allScores.length;
  return Math.round(averageScore);
};

export const formatHours = (hours: number): string => {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} min`;
  }
  if (hours % 1 === 0) {
    return `${hours} hr${hours === 1 ? "" : "s"}`;
  }
  return `${hours.toFixed(1)} hrs`;
};

export const formatMinutes = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (!hrs) return `${mins} min`;
  if (!mins) return `${hrs} hr${hrs === 1 ? "" : "s"}`;
  return `${hrs} hr${hrs === 1 ? "" : "s"} ${mins} min`;
};

export const calculateAveragePace = (progress: LearningProgress[]): number => {
  if (!progress.length) return 0;
  const totalTime = progress.reduce((acc, course) => acc + course.timeSpent, 0);
  const totalLessons = progress.reduce((acc, course) => acc + course.lessonsCompleted, 0);
  if (!totalLessons) return 0;
  return Math.round(totalTime / totalLessons);
};

export const getNextLessonLabel = (course: EnrolledCourse): string =>
  course.nextLesson ? `Next: ${course.nextLesson}` : "Resume learning";

export const buildCourseBreadcrumb = (course: EnrolledCourse): string[] => [
  "Dashboard",
  course.category,
  course.name,
];
