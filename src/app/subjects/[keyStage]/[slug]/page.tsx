'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardTitle, Loading, Button } from '@/components/ui';
import { useSubjects, useUnits, useMyProgress, useEnroll } from '@/lib/hooks/useOakData';
import { useAuth } from '@/contexts/AuthContext';

const UNITS_PER_PAGE = 5;

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const keyStage = params.keyStage as string;
  const slug = params.slug as string;
  const { user } = useAuth();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Enrollment hooks
  const { data: myProgress } = useMyProgress();
  const { enroll, isEnrolling, error: enrollError } = useEnroll();
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  // Fetch subjects for this keyStage to get subject details
  const { data: subjects, error: subjectsError, isLoading: subjectsLoading } = useSubjects({ keyStageSlug: keyStage });
  const { data: units, error: unitsError, isLoading: unitsLoading } = useUnits({ keyStageSlug: keyStage, subjectSlug: slug });

  // Find the specific subject from the subjects list
  const subject = subjects?.find(s => s.slug === slug);

  // Check if user is already enrolled in this subject
  const isEnrolled = useMemo(() => {
    return myProgress?.some(p => p.subjectSlug === slug && p.keyStage === keyStage) || false;
  }, [myProgress, slug, keyStage]);

  // Pagination logic
  const totalPages = useMemo(() => {
    if (!units) return 0;
    return Math.ceil(units.length / UNITS_PER_PAGE);
  }, [units]);

  const paginatedUnits = useMemo(() => {
    if (!units) return [];
    const startIndex = (currentPage - 1) * UNITS_PER_PAGE;
    return units.slice(startIndex, startIndex + UNITS_PER_PAGE);
  }, [units, currentPage]);

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const result = await enroll({
      subjectSlug: slug,
      keyStage: keyStage,
    });

    if (result) {
      setEnrollSuccess(true);
      setTimeout(() => setEnrollSuccess(false), 3000);
    }
  };

  const isLoading = subjectsLoading || unitsLoading;
  const error = subjectsError || unitsError;

  // Debug: Check for duplicate or missing slugs
  if (units && units.length > 0) {
    const slugs = units.map(u => u.slug);
    const uniqueSlugs = new Set(slugs);
    if (slugs.length !== uniqueSlugs.size) {
      console.warn('⚠️ Duplicate unit slugs detected:', slugs);
    }
    const undefinedSlugs = slugs.filter(s => !s);
    if (undefinedSlugs.length > 0) {
      console.warn('⚠️ Units with undefined slugs:', undefinedSlugs.length);
    }
  }

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
      <Card className="p-6 shadow-soft">
        <div className="flex items-center justify-between flex-wrap gap-4">
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
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              ← Back
            </Button>
            {user && (
              isEnrolled ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Enrolled</span>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? 'Enrolling...' : 'Enroll in Course'}
                </Button>
              )
            )}
            {!user && (
              <Button variant="primary" onClick={() => router.push('/login')}>
                Sign in to Enroll
              </Button>
            )}
          </div>
        </div>

        {/* Success/Error Messages */}
        {enrollSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            Successfully enrolled in {subject.title}! This course now appears in your dashboard.
          </div>
        )}
        {enrollError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {enrollError}
          </div>
        )}
      </Card>

      {/* Units Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Units in {subject.title}</h2>
          {units && units.length > 0 && (
            <span className="text-sm text-gray-500">
              Showing {((currentPage - 1) * UNITS_PER_PAGE) + 1}-{Math.min(currentPage * UNITS_PER_PAGE, units.length)} of {units.length} units
            </span>
          )}
        </div>

        {paginatedUnits && paginatedUnits.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              {paginatedUnits.map((unit, index) => {
                const uniqueKey = unit.slug || `${unit.subjectSlug}-${unit.unitNumber || index}`;

                return (
                  <div key={uniqueKey}>
                    <Link href={`/units/${unit.slug}`} className="block">
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
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </Button>
              </div>
            )}
          </>
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