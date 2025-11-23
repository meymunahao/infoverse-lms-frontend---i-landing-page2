'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Card, CardHeader, CardTitle, CardContent, Loading, Button } from '@/components/ui';
import { useUnit, useLessons } from '@/lib/hooks/useOakData';

export default function UnitPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: unit, error: unitError, isLoading: unitLoading } = useUnit(slug);
  const { data: lessons, error: lessonsError, isLoading: lessonsLoading } = useLessons({ unitSlug: slug });

  const isLoading = unitLoading || lessonsLoading;
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
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Unit
          </h2>
          <p className="text-text-light mb-6">
            Unable to load this unit. Please try again later.
          </p>
          <Link href="/subjects">
            <Button variant="primary">Back to Subjects</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/subjects" className="hover:text-primary">Subjects</Link>
          {' / '}
          <Link href={`/subjects/${unit.subjectSlug}`} className="hover:text-primary">
            {unit.subjectTitle}
          </Link>
          {' / '}
          <span className="text-text-dark font-semibold">{unit.title}</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {unit.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-lg text-text-light">
            <span>{unit.subjectTitle}</span>
            {unit.yearTitle && (
              <>
                <span>•</span>
                <span>{unit.yearTitle}</span>
              </>
            )}
            <span>•</span>
            <span>{unit.numberOfLessons} lessons</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            Lessons
          </h2>
        </div>

        {lessons && lessons.length > 0 ? (
          <div className="space-y-4">
            {lessons
              .sort((a, b) => a.lessonNumber - b.lessonNumber)
              .map((lesson) => (
                <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
                  <Card hover>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {lesson.lessonNumber}
                      </div>
                      <div className="flex-grow">
                        <CardHeader className="mb-2">
                          <CardTitle>{lesson.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {lesson.description && (
                            <p className="text-text-light mb-2">
                              {lesson.description}
                            </p>
                          )}
                          {lesson.expired && (
                            <span className="inline-block px-3 py-1 bg-secondary text-white text-sm rounded-full">
                              Content may be outdated
                            </span>
                          )}
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">
              No lessons found for this unit.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
