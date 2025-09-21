export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  learningStreak: number;
  totalCoursesCompleted: number;
  currentLevel: string;
  joinDate: Date;
}

export interface EnrolledCourse {
  id: string;
  name: string;
  progress: number; // 0-100
  lastAccessed: Date;
  nextLesson?: string;
  estimatedTimeToComplete: number; // in hours
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  instructor: string;
}

export interface SuggestedCourse {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  rating: number;
  enrollmentCount: number;
  duration: number; // in hours
  difficulty: "beginner" | "intermediate" | "advanced";
  price?: number;
  tags: string[];
}

export interface LearningProgress {
  courseId: string;
  lessonsCompleted: number;
  totalLessons: number;
  timeSpent: number; // in minutes
  lastPosition: {
    lessonId: string;
    timestamp: number;
  };
  quiz_scores: number[];
  certificates: string[];
}
