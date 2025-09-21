import { AnalyticsTracker } from "@/components/landing/AnalyticsTracker";
import { CallToAction } from "@/components/landing/CallToAction";
import { CourseGrid } from "@/components/landing/CourseGrid";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingPageLayout } from "@/components/landing/LandingPageLayout";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import type { LandingPageCourse, StructuredData, SubscriptionPlan, Testimonial } from "@/types/landing";

const courses: LandingPageCourse[] = [
  {
    id: "cambridge-alevel-maths",
    title: "Cambridge A-Level Mathematics Mastery",
    description:
      "Weekly examiner clinics, adaptive homework, and AI-powered progress dashboards covering Pure, Mechanics, and Statistics papers.",
    shortDescription: "All exam papers, worked solutions, and revision clinics for Cambridge International.",
    price: { amount: 79, currency: "GBP", originalPrice: 99, discount: 20 },
    examBoards: ["Cambridge", "EDEXCEL"],
    level: "A-Level",
    duration: "12-week accelerator",
    studentCount: 1824,
    rating: 4.9,
    thumbnailUrl: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Live weekly workshops led by former Cambridge examiners",
      "200+ question bank with exam-style marking schemes",
      "1:1 goal-setting with personalised study planner",
    ],
    instructor: {
      name: "Dr. Maya Grant",
      credentials: "Former Cambridge International examiner & author",
    },
    difficulty: "Advanced",
    successRate: 94,
    lastUpdated: "2024-09-15",
  },
  {
    id: "aqa-gcse-combined-science",
    title: "AQA GCSE Combined Science Fast Track",
    description:
      "Interactive lab simulations, mnemonic-led revision, and bite-sized exam prep for biology, chemistry, and physics.",
    shortDescription: "Boost GCSE Combined Science grades with interactive labs and weekly mastery checks.",
    price: { amount: 59, currency: "GBP", originalPrice: 75, discount: 22 },
    examBoards: ["AQA"],
    level: "GCSE",
    duration: "8-week sprint",
    studentCount: 2940,
    rating: 4.8,
    thumbnailUrl: "https://images.unsplash.com/photo-1559757175-5700dde67565?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Exam-board specific flashcards and lab simulations",
      "Weekly diagnostic quizzes with parent reports",
      "Saturday live helpdesk with senior tutor",
    ],
    instructor: {
      name: "Jamie Ortega",
      credentials: "Lead GCSE science coach, ex-AQA marker",
    },
    difficulty: "Intermediate",
    successRate: 89,
    lastUpdated: "2024-10-01",
  },
  {
    id: "ibdp-economics-slvhl",
    title: "IB Diploma Economics HL & SL Excellence",
    description:
      "Case-study masterclasses, 15-mark essay breakdowns, and IA coaching tailored to the latest IB specs.",
    shortDescription: "Score 6s and 7s with IA clinics, Paper 3 drills, and examiner-led debriefs.",
    price: { amount: 92, currency: "GBP", originalPrice: 119, discount: 23 },
    examBoards: ["IB Diploma"],
    level: "IB Diploma",
    duration: "16-week mastery programme",
    studentCount: 1165,
    rating: 4.95,
    thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Paper 1 & 2 timed essay critiques every week",
      "Exclusive IA templates with examiner annotations",
      "University admissions clinics with alumni mentors",
    ],
    instructor: {
      name: "Lina Chow",
      credentials: "IB Chief Examiner, 15 years experience",
    },
    difficulty: "Advanced",
    successRate: 96,
    lastUpdated: "2024-08-20",
  },
  {
    id: "edexcel-igcse-english",
    title: "EDEXCEL iGCSE English Language Distinction",
    description:
      "Close reading workshops, creative writing labs, and personalised feedback on past paper responses.",
    shortDescription: "Master persuasive writing and comprehension with weekly feedback loops.",
    price: { amount: 54, currency: "GBP", originalPrice: 69, discount: 21 },
    examBoards: ["EDEXCEL", "Cambridge"],
    level: "GCSE",
    duration: "10-week storytelling series",
    studentCount: 2074,
    rating: 4.7,
    thumbnailUrl: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Individual writing diagnostics every fortnight",
      "Voice, tone, and structure coaching with editors",
      "Live mock orals with examiner feedback",
    ],
    instructor: {
      name: "Aisha Patel",
      credentials: "Head of English, former EDEXCEL lead moderator",
    },
    difficulty: "Intermediate",
    successRate: 91,
    lastUpdated: "2024-07-05",
  },
  {
    id: "ocr-alevel-physics",
    title: "OCR A-Level Physics Precision",
    description:
      "Experiment deconstructions, advanced math cross-training, and exam technique clinics for Papers 1-3.",
    shortDescription: "Stay ahead with data logging labs, exam hacks, and targeted revision maps.",
    price: { amount: 84, currency: "GBP", originalPrice: 109, discount: 23 },
    examBoards: ["OCR"],
    level: "A-Level",
    duration: "14-week labs + theory",
    studentCount: 1588,
    rating: 4.85,
    thumbnailUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Virtual lab library with examiner-marked worksheets",
      "Weekly office hours with Russell Group physicists",
      "AI-powered formula sheet builder",
    ],
    instructor: {
      name: "Prof. Declan Hughes",
      credentials: "OCR Principal Examiner & Cambridge Fellow",
    },
    difficulty: "Advanced",
    successRate: 93,
    lastUpdated: "2024-09-30",
  },
  {
    id: "ibdp-mathematics-aa",
    title: "IB Diploma Mathematics AA HL Confidence",
    description:
      "Structured theory refreshers, calculator clinics, and IA mentorship across Analysis & Approaches HL.",
    shortDescription: "Weekly Paper 1 & 2 practice with examiner critique and theory deep dives.",
    price: { amount: 95, currency: "GBP", originalPrice: 129, discount: 26 },
    examBoards: ["IB Diploma"],
    level: "IB Diploma",
    duration: "18-week guided pathway",
    studentCount: 1324,
    rating: 4.92,
    thumbnailUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1000&q=80",
    features: [
      "HL focused problem banks and solution walkthroughs",
      "IA mentorship with former IB moderators",
      "Exam-day mindset coaching and accountability pods",
    ],
    instructor: {
      name: "Noah Bennet",
      credentials: "IB Math Lead Examiner, 12 years",
    },
    difficulty: "Advanced",
    successRate: 95,
    lastUpdated: "2024-08-12",
  },
];

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 49, yearly: 499, currency: "GBP" },
    features: [
      "Access to 2 live cohorts and full on-demand library",
      "Weekly progress email for parents or guardians",
      "Smart revision planner with adaptive reminders",
    ],
    courseAccess: "limited",
    supportLevel: "basic",
    trialDays: 7,
    bestFor: "focused revision sprints",
  },
  {
    id: "premium",
    name: "Premium",
    price: { monthly: 79, yearly: 799, currency: "GBP" },
    features: [
      "Unlimited courses across all exam boards",
      "Monthly 1:1 strategy session with lead tutor",
      "Mock exam marking with personalised video feedback",
      "Priority support via live chat and WhatsApp",
    ],
    courseAccess: "full",
    supportLevel: "priority",
    isPopular: true,
    trialDays: 14,
    bestFor: "multi-subject mastery",
  },
  {
    id: "enterprise",
    name: "Family & Schools",
    price: { monthly: 149, yearly: 1490, currency: "GBP" },
    features: [
      "10 seats with family or cohort management dashboard",
      "Dedicated academic coach and onboarding webinar",
      "Integration with Google Classroom & Microsoft Teams",
      "Custom analytics export for SLT reporting",
    ],
    courseAccess: "premium",
    supportLevel: "dedicated",
    familySeats: 10,
    trialDays: 21,
    bestFor: "families and partner schools",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "sophia-cambridge",
    studentName: "Sophia M.",
    course: "Cambridge A-Level Mathematics",
    examBoard: "Cambridge",
    grade: "A*",
    quote:
      "Infoverse gave me the confidence to tackle complex paper 3 questions. I improved from a B to an A* in one term and secured an offer from Imperial College.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    verificationStatus: "verified",
    improvement: "+2 grades",
    destinationUniversity: "Imperial College London",
  },
  {
    id: "daniel-ib",
    studentName: "Daniel K.",
    course: "IB Diploma Economics HL",
    examBoard: "IB Diploma",
    grade: "7",
    quote:
      "The IA masterclasses and weekly hotseat sessions translated directly into my final grade. I also received scholarship offers from three universities.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    verificationStatus: "verified",
    improvement: "+1 grade",
    destinationUniversity: "University of Warwick",
  },
  {
    id: "leah-gcse",
    studentName: "Leah A.",
    course: "AQA GCSE Combined Science",
    examBoard: "AQA",
    grade: "9-9",
    quote:
      "Interactive labs and personalised weekly targets helped me jump from grade 6 to consistent 9s. My parents loved the detailed progress analytics.",
    avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
    verificationStatus: "verified",
    improvement: "+3 grades",
  },
];

const structuredData: StructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name: "Infoverse Digital-Ed Course Catalog",
  description:
    "High-impact digital courses for Cambridge, AQA, EDEXCEL, OCR, IB Diploma, GCSE, and A-Level with live examiners, analytics, and flexible subscriptions.",
  provider: {
    "@type": "Organization",
    name: "Infoverse Digital-Ed",
    url: "https://infoverse.education",
    sameAs: [
      "https://www.facebook.com/infoverse",
      "https://www.linkedin.com/company/infoverse",
    ],
  },
  programType: "OnlineEducation",
  timeToComplete: "P1M",
  educationalCredentialAwarded: "Certificate of Completion",
  hasCourseInstance: courses.map((course) => ({
    "@type": "Course",
    name: course.title,
    description: course.shortDescription,
    provider: {
      "@type": "Organization",
      name: "Infoverse Digital-Ed",
    },
    educationalCredentialAwarded: course.level,
    offers: {
      "@type": "Offer",
      price: course.price.amount,
      priceCurrency: course.price.currency,
      availability: "https://schema.org/InStock",
    },
  })),
};

export default function Page() {
  return (
    <LandingPageLayout
      structuredData={structuredData}
      hero={
        <>
          <AnalyticsTracker />
          <HeroSection
            marketingMessage="We offer flexible, comprehensive courses for Cambridge, AQA, EDEXCEL, OCR, IB Diploma, GCSE, and A' level."
            headline="Your personalised path to exam success"
            valueProposition="Flexible, comprehensive courses aligned to every major exam board, taught by examiners and powered by real-time analytics."
            supportingCopy="Join 10,000+ students from 32 countries levelling up their performance with Infoverse's adaptive learning platform, live cohorts, and performance dashboards."
            examBoards={["Cambridge", "AQA", "EDEXCEL", "OCR", "IB Diploma", "GCSE", "A-Level"]}
            heroImage={{
              src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
              alt: "Focused student studying for global exam boards",
            }}
            stats={[
              { value: "32", label: "Countries represented", helper: "Global Infoverse community" },
              { value: "94%", label: "Target grade attainment", helper: "Within the first exam season" },
              { value: "48h", label: "Support response time", helper: "Dedicated tutor replies" },
            ]}
          />
        </>
      }
      courseCatalog={<CourseGrid courses={courses} />}
      pricing={<PricingSection plans={subscriptionPlans} />}
      testimonials={<TestimonialSection testimonials={testimonials} />}
      callToAction={<CallToAction />}
    />
  );
}
