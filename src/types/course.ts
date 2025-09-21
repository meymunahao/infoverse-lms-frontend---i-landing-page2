export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: CoursePrice;
  instructor: InstructorProfile;
  curriculum: CourseModule[];
  examBoards: string[];
  level: 'GCSE' | 'A-Level' | 'IB Diploma';
  duration: {
    hours: number;
    weeks: number;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  features: string[];
  materials: CourseMaterial[];
  reviews: CourseReview[];
  enrollment: {
    totalStudents: number;
    currentEnrollment: number;
    successRate: number;
  };
  highlights?: CourseHighlight[];
  successStories?: SuccessStory[];
  guarantees?: string[];
  promotions?: CoursePromotion;
  relatedResources?: RelatedResource[];
}

export interface CoursePrice {
  amount: number;
  currency: string;
  originalPrice?: number;
  discount?: number;
  paymentPlans?: PaymentPlan[];
  limitedTimeOfferEnds?: string;
}

export interface PaymentPlan {
  id: string;
  label: string;
  amount: number;
  frequency: 'one-time' | 'monthly' | 'quarterly';
  savingsPercentage?: number;
  benefits?: string[];
}

export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  biography: string;
  credentials: string[];
  experience: string;
  specializations: string[];
  avatar: string;
  rating: number;
  totalStudents: number;
  introVideoUrl?: string;
  achievements?: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  lessons: Lesson[];
  assessments: Assessment[];
  isPreviewAvailable: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  previewUrl?: string;
  isSample?: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'assignment' | 'mock-exam' | 'project';
  description: string;
  duration?: number;
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'worksheet' | 'interactive' | 'audio';
  access: 'free' | 'premium' | 'trial';
  url?: string;
}

export interface CourseReview {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  examBoard: string;
  gradeAchieved?: string;
  date: Date;
  isVerified: boolean;
  improvement?: string;
}

export interface CourseHighlight {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  achievement: string;
  quote: string;
  avatar?: string;
}

export interface CoursePromotion {
  urgencyMessage?: string;
  bonusMaterials?: string[];
  spotsRemaining?: number;
  expiresAt?: string;
}

export interface RelatedResource {
  id: string;
  title: string;
  type: 'blog' | 'guide' | 'webinar' | 'download';
  url: string;
}
