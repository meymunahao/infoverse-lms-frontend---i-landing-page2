'use client';

import { useState } from 'react';
import { ProfileCard } from '@/components/dashboard';
import { KeyStageSelector, SubjectCard } from '@/components/lessons';
import { useSubjects } from '@/lib/hooks/useOakData';
import { Loading } from '@/components/ui';

export default function BrowsePage() {
  const [selectedKeyStage, setSelectedKeyStage] = useState(1);

  const {
    data: subjects,
    error,
    isLoading,
  } = useSubjects({ keyStageSlug: `ks${selectedKeyStage}` });

  return (
    <div className="p-8">
      {/* Header with Profile Card */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-semibold text-black mb-6">
            Browse Courses
          </h1>
          <KeyStageSelector
            selectedKeyStage={selectedKeyStage}
            onSelect={setSelectedKeyStage}
          />
        </div>
        <ProfileCard />
      </div>

      {/* Subjects Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loading size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-xl text-red-500">
            Error loading subjects. Please try again later.
          </p>
        </div>
      ) : subjects && subjects.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-black mb-6">
            Available Subjects - Key Stage {selectedKeyStage}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject: any) => (
              <SubjectCard
                key={subject.slug}
                subject={subject}
                keyStage={selectedKeyStage}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-text-light">
            No subjects available for Key Stage {selectedKeyStage}
          </p>
        </div>
      )}
    </div>
  );
}
