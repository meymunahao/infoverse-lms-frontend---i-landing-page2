'use client';

import { useCallback } from 'react';

import type { CourseDetail } from '@/types/course';

interface TrackEventPayload {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export const useAnalytics = () => {
  const pushToDataLayer = useCallback((payload: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;

    const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer;

    if (Array.isArray(dataLayer)) {
      dataLayer.push(payload);
    } else {
      (window as typeof window & { dataLayer?: unknown[] }).dataLayer = [payload];
    }
  }, []);

  const trackEvent = useCallback(
    ({ category, action, label, value, metadata }: TrackEventPayload) => {
      pushToDataLayer({
        event: 'customEvent',
        category,
        action,
        label,
        value,
        ...metadata,
      });
    },
    [pushToDataLayer],
  );

  const trackEnrollmentStart = useCallback(
    (course: CourseDetail, option: string) => {
      trackEvent({
        category: 'enrolment',
        action: 'start',
        label: `${course.id}-${option}`,
        metadata: {
          courseId: course.id,
          option,
          price: course.price.amount,
          discount: course.price.discount,
        },
      });
    },
    [trackEvent],
  );

  const trackEngagement = useCallback(
    (course: CourseDetail, section: string) => {
      trackEvent({
        category: 'course-engagement',
        action: 'view',
        label: `${course.id}-${section}`,
      });
    },
    [trackEvent],
  );

  const trackConversion = useCallback(
    (course: CourseDetail, revenue: number) => {
      trackEvent({
        category: 'enrolment',
        action: 'complete',
        label: course.id,
        value: revenue,
        metadata: {
          currency: course.price.currency,
        },
      });
    },
    [trackEvent],
  );

  return {
    trackEvent,
    trackEnrollmentStart,
    trackEngagement,
    trackConversion,
  };
};
