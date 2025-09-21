'use client';

import { useCallback, useMemo, useState } from 'react';

import type { CourseDetail } from '@/types/course';

export type EnrollmentOption = 'full-course' | 'modular' | 'trial';

export interface EnrolmentResult {
  courseId: string;
  option: EnrollmentOption;
  timestamp: string;
}

interface UseEnrollmentParams {
  course: CourseDetail;
  onEnrol?: (result: EnrolmentResult) => Promise<void> | void;
}

export const useEnrollment = ({ course, onEnrol }: UseEnrollmentParams) => {
  const [selectedOption, setSelectedOption] = useState<EnrollmentOption>('full-course');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPreviewAccess, setHasPreviewAccess] = useState(false);

  const spotsRemaining = useMemo(() => {
    const remaining = course.enrollment.totalStudents - course.enrollment.currentEnrollment;
    return remaining > 0 ? remaining : 0;
  }, [course.enrollment.currentEnrollment, course.enrollment.totalStudents]);

  const urgencyLevel = useMemo(() => {
    if (spotsRemaining <= 5) return 'critical';
    if (spotsRemaining <= 12) return 'high';
    return 'steady';
  }, [spotsRemaining]);

  const conversionScore = useMemo(() => {
    const scarcityWeight = spotsRemaining === 0 ? 1 : 1 - Math.min(spotsRemaining / 40, 1);
    const successWeight = course.enrollment.successRate;
    const reviewWeight =
      course.reviews.reduce((total, review) => total + review.rating, 0) /
      Math.max(course.reviews.length, 1) /
      5;

    return Number(((scarcityWeight + successWeight + reviewWeight) / 3).toFixed(2));
  }, [course.enrollment.successRate, course.reviews, spotsRemaining]);

  const handlePreviewToggle = useCallback(() => {
    setHasPreviewAccess((previous) => !previous);
  }, []);

  const handleEnrol = useCallback(
    async (option?: EnrollmentOption) => {
      const currentOption = option ?? selectedOption;
      setIsSubmitting(true);

      try {
        const payload: EnrolmentResult = {
          courseId: course.id,
          option: currentOption,
          timestamp: new Date().toISOString(),
        };

        await onEnrol?.(payload);
        return payload;
      } finally {
        setIsSubmitting(false);
      }
    },
    [course.id, onEnrol, selectedOption],
  );

  return {
    selectedOption,
    setSelectedOption,
    isSubmitting,
    hasPreviewAccess,
    handlePreviewToggle,
    handleEnrol,
    spotsRemaining,
    urgencyLevel,
    conversionScore,
  };
};
