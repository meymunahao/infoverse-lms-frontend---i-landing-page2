/**
 * Oak National Academy API Types
 * Based on Oak National Academy API documentation
 */

export interface KeyStage {
  slug: string;
  title: string;
  shortCode: string;
  displayOrder: number;
}

export interface Subject {
  slug: string;
  title: string;
  keyStageSlug: string;
  keyStageTitle: string;
}

export interface Unit {
  slug: string;
  title: string;
  subjectSlug: string;
  subjectTitle: string;
  yearSlug?: string;
  yearTitle?: string;
  unitStudyOrder?: number;
  numberOfLessons: number;
}

export interface Lesson {
  slug: string;
  title: string;
  description?: string;
  unitSlug: string;
  unitTitle: string;
  lessonNumber: number;
  keyStageSlug: string;
  keyStageTitle: string;
  subjectSlug: string;
  subjectTitle: string;
  expired?: boolean;
  videoUrl?: string;
  worksheetUrl?: string;
  presentationUrl?: string;
  starterQuiz?: Quiz[];
  exitQuiz?: Quiz[];
}

export interface Quiz {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface Year {
  slug: string;
  title: string;
  displayOrder: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

// Filter and Query Types
export interface SubjectFilters {
  keyStageSlug?: string;
}

export interface UnitFilters {
  subjectSlug?: string;
  yearSlug?: string;
}

export interface LessonFilters {
  unitSlug?: string;
  subjectSlug?: string;
  keyStageSlug?: string;
}
