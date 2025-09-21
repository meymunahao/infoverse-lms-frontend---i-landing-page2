export interface Tutor {
  id: string;
  name: string;
  email: string;
  specialization?: string[];
  coursesAssigned?: string[];
  joinedDate: Date;
  status: "active" | "inactive" | "pending";
  lastActiveAt?: Date;
  feedbackScore?: number;
  notes?: string;
}

export interface TutorFormData {
  name: string;
  email: string;
  specialization?: string[];
  coursesAssigned?: string[];
  notes?: string;
}

export interface TutorOverview {
  totalTutors: number;
  activeTutors: number;
  pendingInvites: number;
}

export type TutorStatusFilter = "all" | Tutor["status"];
