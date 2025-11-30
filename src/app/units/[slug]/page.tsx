'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, Loading, Button } from '@/components/ui';
import { LessonCard } from '@/components/lessons/LessonCard';
import { useUnit, useLessons, useSubject } from '@/lib/hooks/useOakData'; // Assuming useSubject is available

const PAID_SUBJECTS = ['german', 'french', 'spanish', 'latin']; // Re-define for consistency

export default function UnitPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: unit, error: unitError, isLoading: unitLoading } = useUnit(slug);
  const { data: lessons, error: lessonsError, isLoading: lessonsLoading } = useLessons({ unitSlug: slug });

  // Fetch subject details to determine if it's a paid subject
  const { data: subject, isLoading: subjectMetaLoading } = useSubject(unit?.subjectSlug || '', { enabled: !!unit?.subjectSlug });
  const isPaidSubject = PAID_SUBJECTS.includes(subject?.slug.toLowerCase() || '');

  const isLoading = unitLoading || lessonsLoading || subjectMetaLoading;
  const error = unitError || lessonsError;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-soft">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Unit
        </h2>
        <p className="text-gray-500 mb-6">
          Unable to load this unit. Please try again later.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          ← Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Breadcrumbs and Title */}
      <Card className="p-6 shadow-soft">
        <nav className="mb-3 text-sm font-medium text-gray-500">
          <Link href="/browse" className="hover:text-primary">Browse</Link>
          <span className="mx-2">/</span>
          <Link href={`/subjects/${unit.subjectSlug}`} className="hover:text-primary">
            {unit.subjectTitle}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{unit.title}</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Unit {unit.unitNumber}: {unit.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{unit.subjectTitle}</span>
          {unit.yearTitle && (
            <>
              <span className="text-gray-300">•</span>
              <span>{unit.yearTitle}</span>
            </>
          )}
          <span className="text-gray-300">•</span>
          <span>{unit.numberOfLessons} Lessons</span>
        </div>
      </Card>

      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lessons in this Unit</h2>
        {lessons && lessons.length > 0 ? (
          <div className="space-y-4">
            {lessons
              .sort((a, b) => a.lessonNumber - b.lessonNumber)
              .map((lesson, index) => (
                <LessonCard
                  key={lesson.slug}
                  lesson={lesson}
                  subjectSlug={unit.subjectSlug} // Pass subjectSlug to LessonCard
                  isPaidSubject={isPaidSubject}
                  isFirstLesson={index === 0}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft">
            <p className="text-lg text-gray-500">
              No lessons found for this unit yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}