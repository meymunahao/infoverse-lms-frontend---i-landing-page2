'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Loading, Button } from '@/components/ui';
import { useSubject, useUnits } from '@/lib/hooks/useOakData';

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: subject, error: subjectError, isLoading: subjectLoading } = useSubject(slug);
  const { data: units, error: unitsError, isLoading: unitsLoading } = useUnits({ subjectSlug: slug });

  const isLoading = subjectLoading || unitsLoading;
  const error = subjectError || unitsError;

  const icon = (
    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold shadow-sm">
        {subject?.title.charAt(0).toUpperCase()}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-soft">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Subject
        </h2>
        <p className="text-gray-500 mb-6">
          Unable to load this subject. Please try again later.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          ← Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="p-6 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <p className="text-sm text-gray-500">Subject Overview</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {subject.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Key Stage: {subject.keyStageTitle}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          ← Back to Browse
        </Button>
      </Card>

      {/* Units Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Units in {subject.title}</h2>
        {units && units.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {units.map((unit) => (
              <Link key={unit.slug} href={`/units/${unit.slug}`} className="block">
                <Card hover className="p-5 flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Unit {unit.unitNumber}: {unit.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {unit.numberOfLessons} lesson{unit.numberOfLessons !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Unit →
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft">
            <p className="text-lg text-gray-500">
              No units found for this subject yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}