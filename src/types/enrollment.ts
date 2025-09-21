export type EnrollmentStatus = 'active' | 'completed' | 'dropped';

export type EnrollmentTrend = 'increasing' | 'stable' | 'decreasing';

export interface StatusHistoryEntry {
  status: EnrollmentStatus;
  timestamp: string;
  changedBy?: string;
  note?: string;
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
  enrollmentDate: Date;
  currentStatus: EnrollmentStatus;
  courseId: string;
  courseName: string;
  progressPercentage?: number;
  lastActivity?: Date;
  completionDate?: Date;
  dropReason?: string;
  statusHistory?: StatusHistoryEntry[];
}

export interface CourseEnrollment {
  courseId: string;
  courseName: string;
  totalEnrolled: number;
  activeStudents: number;
  completedStudents: number;
  droppedStudents: number;
  enrollmentTrend: EnrollmentTrend;
}

export interface StudentFormData {
  fullName: string;
  email: string;
  enrollmentDate: string;
  currentStatus: EnrollmentStatus;
}
