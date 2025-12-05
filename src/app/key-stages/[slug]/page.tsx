'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Container, Card, CardHeader, CardTitle, CardContent, Loading, Button } from '@/components/ui';
import { useSubjects } from '@/lib/hooks/useOakData';
import { useAuth } from '@/contexts/AuthContext';
import { SignupPromptModal } from '@/components/modals/SignupPromptModal';

export default function KeyStagePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { user } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const { data: subjects, error, isLoading } = useSubjects({ keyStageSlug: slug });

  const handleSubjectClick = (e: React.MouseEvent, subjectSlug: string) => {
    if (!user) {
      e.preventDefault();
      setShowSignupModal(true);
    }
    // If user is logged in, the link will work normally
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Subjects
          </h2>
          <p className="text-text-light mb-6">
            Unable to load subjects for this key stage. Please try again later.
          </p>
          <Link href="/key-stages">
            <Button variant="primary">Back to Key Stages</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const keyStageTitle = subjects?.[0]?.keyStageTitle || slug.toUpperCase();

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/key-stages" className="hover:text-primary">Key Stages</Link>
          {' / '}
          <span className="text-text-dark font-semibold">{keyStageTitle}</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {keyStageTitle}
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Explore subjects available for {keyStageTitle}
          </p>
        </div>

        {subjects && subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${slug}/${subject.slug}`}
                onClick={(e) => handleSubjectClick(e, subject.slug)}
              >
                <Card hover className="relative">
                  <CardHeader>
                    <CardTitle>{subject.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-light">
                      Click to explore units and lessons
                    </p>
                    {!user && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Sign up required
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">
              No subjects found for this key stage.
            </p>
          </div>
        )}

        {/* Signup Prompt Modal */}
        <SignupPromptModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          title="Sign Up to View Units"
          message="Create a free account to access all units and lessons for this subject."
        />
      </Container>
    </div>
  );
}
