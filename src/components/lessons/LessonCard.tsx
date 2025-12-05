'use client';

import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface LessonCardProps {
  lesson: {
    slug: string;
    title: string;
    lessonNumber: number;
    duration?: string; // e.g., "15 min"
  };
  subjectSlug: string;
}

export function LessonCard({
  lesson,
}: LessonCardProps) {
  const icon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <Card
      className="flex items-center justify-between p-4 md:p-6 bg-white rounded-xl shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base md:text-lg">
          {lesson.lessonNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
            {lesson.title}
          </h3>
          {lesson.duration && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span>{lesson.duration}</span>
            </div>
          )}
        </div>
      </div>
      <Link href={`/lessons/${lesson.slug}`}>
        <Button size="sm" className="ml-4 flex-shrink-0">
          {icon} Start
        </Button>
      </Link>
    </Card>
  );
}
