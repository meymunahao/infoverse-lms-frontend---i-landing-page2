import { Metadata } from 'next';
import {
  CourseDetail,
  CourseReview,
} from '@/types/course';

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
});

export const mockCourses: CourseDetail[] = [
  {
    id: 'a-level-biology-fast-track',
    title: 'A-Level Biology Fast Track Mastery',
    description:
      'High-impact revision programme combining exam technique, personalised tutoring and interactive labs to help you secure top A-level Biology grades.',
    longDescription:
      'Built for ambitious students targeting A* results, this fast-track biology course blends weekly live masterclasses, on-demand labs and exam board aligned assessments. You will practice with structured feedback, join tutor-led study pods and access visual revision guides designed for long-term retention. Our learning pathway adapts to your predicted exam date, recommended study schedule and knowledge gaps identified during diagnostic testing.',
    price: {
      amount: 349,
      currency: 'GBP',
      originalPrice: 499,
      discount: 30,
      paymentPlans: [
        {
          id: 'pay-in-full',
          label: 'Pay in Full',
          amount: 349,
          frequency: 'one-time',
          savingsPercentage: 15,
          benefits: ['Bonus exam technique clinic', 'Priority marking turnaround'],
        },
        {
          id: 'monthly-3',
          label: '3 Monthly Payments',
          amount: 129,
          frequency: 'monthly',
          benefits: ['Flexible payments', 'Cancel anytime before second instalment'],
        },
      ],
      limitedTimeOfferEnds: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    instructor: {
      id: 'dr-sophia-chan',
      name: 'Dr. Sophia Chan',
      title: 'Lead Biology Tutor & Former AQA Examiner',
      biography:
        'Dr. Chan has guided over 2,400 students to top exam results through evidence-based teaching. With a PhD in Molecular Biology and 12 years as an AQA examiner, she specialises in simplifying complex concepts and developing exam resilience.',
      credentials: [
        'Former Head of Biology at St. Edmunds College',
        'PhD in Molecular Biology from University of Cambridge',
        'Certified Cognitive Learning Specialist',
      ],
      experience:
        '15 years teaching A-Level Biology with extensive experience in online adaptive instruction and exam preparation.',
      specializations: [
        'A-Level Biology exam strategy',
        'Flipped classroom teaching',
        'Neuroscience-informed revision planning',
      ],
      avatar:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=256&h=256&q=80',
      rating: 4.9,
      totalStudents: 2400,
      introVideoUrl: 'https://player.vimeo.com/video/879735438?h=course',
      achievements: [
        'Average grade uplift of 1.8 within 12 weeks',
        '95% student satisfaction rating across cohorts',
        'Subject expert speaker at UK Biology Educators Summit',
      ],
    },
    curriculum: [
      {
        id: 'module-foundations',
        title: 'Diagnostic & Foundations Sprint',
        description:
          'Assess your current understanding and reinforce core biological principles with interactive flash diagnostics.',
        duration: 6,
        lessons: [
          {
            id: 'lesson-diagnostic',
            title: 'Interactive diagnostic assessment',
            duration: 1.5,
            isSample: true,
            previewUrl:
              'https://player.vimeo.com/video/879735111?h=sample-diagnostic',
          },
          {
            id: 'lesson-cell-structures',
            title: 'Cell structures deep dive',
            duration: 1,
          },
        ],
        assessments: [
          {
            id: 'assessment-foundations',
            title: 'Baseline mastery quiz',
            type: 'quiz',
            description: 'Automated diagnostic with personalised next steps.',
            duration: 0.5,
          },
        ],
        isPreviewAvailable: true,
      },
      {
        id: 'module-advanced',
        title: 'Advanced Topics Accelerator',
        description:
          'High-yield masterclasses covering gene expression, homeostasis and ecosystem dynamics with exam board alignment.',
        duration: 12,
        lessons: [
          {
            id: 'lesson-gene-expression',
            title: 'Gene expression walkthrough',
            duration: 1.25,
          },
          {
            id: 'lesson-homeostasis',
            title: 'Homeostasis case studies',
            duration: 1.5,
          },
        ],
        assessments: [
          {
            id: 'assessment-paper-1',
            title: 'AQA Paper 1 simulation',
            type: 'mock-exam',
            description: 'Full-length timed paper marked against official criteria.',
            duration: 2.5,
          },
        ],
        isPreviewAvailable: false,
      },
      {
        id: 'module-exam-technique',
        title: 'Exam Excellence Bootcamp',
        description:
          'Small group clinics focused on mark scheme decoding, data analysis and extended response mastery.',
        duration: 8,
        lessons: [
          {
            id: 'lesson-mark-schemes',
            title: 'Cracking the mark scheme',
            duration: 1,
          },
          {
            id: 'lesson-data-analysis',
            title: 'Data interpretation labs',
            duration: 1.5,
          },
        ],
        assessments: [
          {
            id: 'assessment-exam-technique',
            title: 'Exam technique challenge',
            type: 'assignment',
            description: 'Tutor-marked extended response with video feedback.',
            duration: 1,
          },
        ],
        isPreviewAvailable: true,
      },
    ],
    examBoards: ['AQA', 'OCR', 'Edexcel'],
    level: 'A-Level',
    duration: {
      hours: 64,
      weeks: 12,
    },
    difficulty: 'advanced',
    prerequisites: [
      'GCSE Biology grade 6 or above',
      'Existing study schedule of 4+ hours per week',
    ],
    learningOutcomes: [
      'Develop synoptic understanding across all core units',
      'Master data analysis and extended response techniques',
      'Build a personalised revision plan aligned to your exam board',
      'Gain exam confidence through weekly mock assessments',
    ],
    features: [
      'Weekly live tutoring pods capped at 8 students',
      'Adaptive homework and AI-marked quizzes',
      'Downloadable revision blueprints and flashcards',
      '24/7 tutor support via study coach chat',
    ],
    materials: [
      {
        id: 'material-revision-guide',
        title: 'Exam board aligned revision guide (download)',
        type: 'pdf',
        access: 'premium',
      },
      {
        id: 'material-lab-library',
        title: 'Interactive lab simulation library',
        type: 'interactive',
        access: 'premium',
      },
      {
        id: 'material-sample-lesson',
        title: 'Sample lesson: Cell structures deep dive',
        type: 'video',
        access: 'trial',
        url: 'https://player.vimeo.com/video/879735222?h=sample-lesson',
      },
    ],
    reviews: [
      {
        id: 'review-amelia',
        studentName: 'Amelia P.',
        rating: 5,
        comment:
          'Improved from a C to an A within one term. The diagnostics and weekly tutor feedback kept me focused and confident for the exam.',
        examBoard: 'OCR',
        gradeAchieved: 'Predicted A*',
        date: new Date('2024-02-10'),
        isVerified: true,
        improvement: 'Two grade uplift',
      },
      {
        id: 'review-freddie',
        studentName: 'Freddie L.',
        rating: 4.8,
        comment:
          'The mock exams and personalised mark scheme breakdowns made a huge difference. Loved the study pods and accountability coach.',
        examBoard: 'AQA',
        gradeAchieved: 'Achieved A',
        date: new Date('2024-03-02'),
        isVerified: true,
        improvement: 'From predicted B to achieved A',
      },
    ],
    enrollment: {
      totalStudents: 150,
      currentEnrollment: 124,
      successRate: 0.92,
    },
    highlights: [
      {
        id: 'highlight-support',
        label: 'Dedicated study coach',
        description: 'Unlimited chat support and weekly progress reviews.',
      },
      {
        id: 'highlight-guarantee',
        label: 'Grade uplift guarantee',
        description: 'Achieve at least one grade improvement or receive a full refund.',
      },
      {
        id: 'highlight-schedule',
        label: 'Flexible schedules',
        description: 'Choose from three cohort start dates each month.',
      },
    ],
    successStories: [
      {
        id: 'story-sana',
        studentName: 'Sana K.',
        achievement: 'Secured conditional offer from UCL Medicine',
        quote:
          'Infoverse made science revision feel achievable. The weekly clinics and structure built unstoppable confidence.',
      },
      {
        id: 'story-jacob',
        studentName: 'Jacob M.',
        achievement: 'Achieved A* in Biology and A in Chemistry',
        quote:
          'The exam technique bootcamps and tutor voice notes meant I always knew my next priority.',
      },
    ],
    guarantees: [
      '14-day money-back guarantee if you are not fully satisfied',
      'Exam board aligned curriculum mapped to AQA, OCR and Edexcel',
      'Verified instructors with enhanced DBS and safeguarding training',
    ],
    promotions: {
      urgencyMessage: 'Spring cohorts almost full – secure your space before 31 March to access the exam technique clinic bonus.',
      bonusMaterials: ['Exclusive synoptic essay planning workshop', 'Parent accountability roadmap'],
      spotsRemaining: 12,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    },
    relatedResources: [
      {
        id: 'resource-study-guide',
        title: 'Download the 7-day A-Level Biology revision sprint',
        type: 'guide',
        url: '/resources/a-level-biology-revision-guide',
      },
      {
        id: 'resource-webinar',
        title: 'Watch our parents webinar: Supporting exam season success',
        type: 'webinar',
        url: '/webinars/parent-support',
      },
    ],
  },
];

export const getCourseDetail = (courseId: string): CourseDetail | undefined =>
  mockCourses.find((course) => course.id === courseId);

export const getAllCourseIds = (): string[] => mockCourses.map((course) => course.id);

export const calculateDiscountedPrice = (course: CourseDetail): number => {
  if (!course.price.discount || !course.price.originalPrice) {
    return course.price.amount;
  }

  return Math.round(
    course.price.originalPrice - course.price.originalPrice * (course.price.discount / 100),
  );
};

export const formatPrice = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch (error) {
    return currencyFormatter.format(amount);
  }
};

export const getCourseMetadata = (course: CourseDetail): Metadata => {
  const title = `${course.title} | Infoverse Learning`;
  const description = course.description;
  const url = `https://infoverse-learning.com/courses/${course.id}`;

  return {
    title,
    description,
    keywords: [
      course.title,
      `${course.level} ${course.title}`,
      ...course.examBoards.map((board) => `${board} ${course.title}`),
      'online tutoring',
      'course enrolment',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      images: [
        {
          url: `https://infoverse-learning.com/api/og/courses/${course.id}`,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://infoverse-learning.com/api/og/courses/${course.id}`],
    },
    alternates: {
      canonical: url,
    },
  };
};

export const getStructuredData = (course: CourseDetail) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.title,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: 'Infoverse Learning',
    sameAs: 'https://infoverse-learning.com',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + course.duration.weeks * 7 * 24 * 60 * 60 * 1000).toISOString(),
    offers: {
      '@type': 'Offer',
      priceCurrency: course.price.currency,
      price: course.price.amount,
      availability: 'https://schema.org/LimitedAvailability',
      url: `https://infoverse-learning.com/courses/${course.id}`,
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue:
      course.reviews.reduce((total, review) => total + review.rating, 0) /
      Math.max(course.reviews.length, 1),
    reviewCount: course.reviews.length,
  },
  review: course.reviews.map((review: CourseReview) => ({
    '@type': 'Review',
    author: review.studentName,
    datePublished: review.date.toISOString(),
    reviewBody: review.comment,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
      worstRating: '1',
    },
  })),
});
