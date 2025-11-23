'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Card, CardHeader, CardTitle, CardContent, Loading, Button } from '@/components/ui';
import { useSubject, useUnits } from '@/lib/hooks/useOakData';

export default function SubjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: subject, error: subjectError, isLoading: subjectLoading } = useSubject(slug);
  const { data: units, error: unitsError, isLoading: unitsLoading } = useUnits({ subjectSlug: slug });

  const isLoading = subjectLoading || unitsLoading;
  const error = subjectError || unitsError;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !subject) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Subject
          </h2>
          <p className="text-text-light mb-6">
            Unable to load this subject. Please try again later.
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
          <span className="text-text-dark font-semibold">{subject.title}</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {subject.title}
          </h1>
          <p className="text-lg text-text-light">
            {subject.keyStageTitle}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            Units
          </h2>
        </div>

        {units && units.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <Link key={unit.slug} href={`/units/${unit.slug}`}>
                <Card hover>
                  <CardHeader>
                    <CardTitle>{unit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-light mb-2">
                      {unit.numberOfLessons} lesson{unit.numberOfLessons !== 1 ? 's' : ''}
                    </p>
                    {unit.yearTitle && (
                      <p className="text-sm text-primary font-semibold">
                        {unit.yearTitle}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">
              No units found for this subject.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
