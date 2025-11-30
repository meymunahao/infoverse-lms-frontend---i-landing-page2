'use client';

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import clsx from 'clsx';

interface LessonCardProps {
  lesson: {
    slug: string;
    title: string;
    lessonNumber: number;
    duration?: string; // e.g., "15 min"
  };
  subjectSlug: string;
  isPaidSubject?: boolean; // Indicates if the parent subject is a paid one
  isFirstLesson?: boolean; // Indicates if this is the first lesson in the list
}

export function LessonCard({
  lesson,
  subjectSlug,
  isPaidSubject = false,
  isFirstLesson = false,
}: LessonCardProps) {
  const { user } = useAuth();
  const isLocked = isPaidSubject && user?.role === 'free' && !isFirstLesson;

  const icon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <Card 
      className={clsx(
        "flex items-center justify-between p-4 md:p-6 bg-white rounded-xl shadow-soft border border-gray-100 transition-all duration-300",
        isLocked ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base md:text-lg">
          {lesson.lessonNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            {lesson.duration && <span>{lesson.duration}</span>}
            {isFirstLesson && !isLocked && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                Free Preview
              </span>
            )}
            {isLocked && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium flex items-center gap-1">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Premium
              </span>
            )}
          </div>
        </div>
      </div>
      <Link href={isLocked ? '#' : `/lessons/${lesson.slug}`} passHref legacyBehavior>
        <Button 
          size="sm" 
          className={clsx(
            "ml-4 flex-shrink-0",
            isLocked ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
          )}
          disabled={isLocked}
          onClick={(e) => isLocked && e.preventDefault()} // Prevent navigation if locked
        >
          {isLocked ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ) : (
            <>{icon} Start</>
          )}
        </Button>
      </Link>
    </Card>
  );
}
