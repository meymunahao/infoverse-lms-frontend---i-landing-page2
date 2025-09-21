export interface LandingPageCourse {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: {
    amount: number;
    currency: string;
    originalPrice?: number;
    discount?: number;
  };
  examBoards: string[];
  level: "GCSE" | "A-Level" | "IB Diploma";
  duration: string;
  studentCount: number;
  rating: number;
  thumbnailUrl: string;
  features: string[];
  instructor: {
    name: string;
    credentials: string;
    avatar?: string;
  };
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  successRate?: number;
  lastUpdated?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: string[];
  courseAccess: "limited" | "full" | "premium";
  supportLevel: "basic" | "priority" | "dedicated";
  isPopular?: boolean;
  trialDays?: number;
  familySeats?: number;
  bestFor?: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  examBoard: string;
  grade: string;
  quote: string;
  avatar?: string;
  verificationStatus: "verified" | "unverified";
  improvement?: string;
  destinationUniversity?: string;
}

export interface StructuredData {
  '@context': "https://schema.org";
  '@type': "EducationalOccupationalProgram";
  name: string;
  description: string;
  provider: {
    '@type': "Organization";
    name: string;
    url: string;
    sameAs?: string[];
  };
  programType: string;
  timeToComplete: string;
  educationalCredentialAwarded?: string;
  hasCourseInstance: Array<{
    '@type': "Course";
    name: string;
    description: string;
    provider: {
      '@type': "Organization";
      name: string;
    };
    educationalCredentialAwarded?: string;
    offers: {
      '@type': "Offer";
      price: number;
      priceCurrency: string;
      availability: string;
    };
  }>;
}
