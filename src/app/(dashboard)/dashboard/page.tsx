'use client';

import { useRouter } from 'next/navigation';
import {
  ProfileCard,
  CourseProgressCard,
  SuggestedCourseCard,
} from '@/components/dashboard';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  // TODO: Fetch actual user courses and progress from API
  const myCourses = [
    { id: 1, name: 'Mathematics', progress: 30 },
    { id: 2, name: 'English', progress: 70 },
    { id: 3, name: 'Science', progress: 50 },
  ];

  // TODO: Fetch suggested courses from API based on user's key stage
  const suggestedCourses = [
    {
      id: 1,
      name: 'History',
      description: 'Learn about historical events',
    },
    {
      id: 2,
      name: 'Geography',
      description: 'Explore the world',
    },
    {
      id: 3,
      name: 'Art',
      description: 'Express your creativity',
    },
  ];

  return (
    <div className="p-8">
      {/* Header with Profile Card */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-xl text-gray-600">Continue your learning journey</p>
        </div>
        <ProfileCard />
      </div>

      {/* My Courses Section */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-black mb-2">My Courses</h2>
          <p className="text-lg text-gray-600">Pick up where you left off</p>
        </div>

        <div className="flex gap-6 flex-wrap">
          {myCourses.map((course) => (
            <CourseProgressCard
              key={course.id}
              subjectName={course.name}
              progress={course.progress}
              onClick={() =>
                router.push(`/subjects/${course.name.toLowerCase()}`)
              }
            />
          ))}
        </div>
      </section>

      {/* Suggested Courses Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-black mb-2">
            Suggested New Courses
          </h2>
          <p className="text-lg text-gray-600">Explore new subjects to expand your knowledge</p>
        </div>

        <div className="flex gap-6 flex-wrap">
          {suggestedCourses.map((course) => (
            <SuggestedCourseCard
              key={course.id}
              courseName={course.name}
              description={course.description}
              onClick={() => router.push('/browse')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
