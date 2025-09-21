export interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  recentEnrollmentsCount: number;
}

export interface Enrollment {
  id: string;
  studentName: string;
  enrolledOn: Date;
  courseName?: string;
}

export type TutorInviteStatus = "pending" | "accepted" | "rejected";

export interface TutorInvite {
  email: string;
  invitedAt: Date;
  status: TutorInviteStatus;
}
