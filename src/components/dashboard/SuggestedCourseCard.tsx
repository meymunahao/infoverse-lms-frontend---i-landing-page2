import type { ReactNode } from 'react';

interface SuggestedCourseCardProps {
  courseName: string;
  description: string;
  onClick?: () => void;
}

export default function SuggestedCourseCard({
  courseName,
  description,
  onClick,
}: SuggestedCourseCardProps) {
  // Get subject icon based on name
  const getSubjectIcon = (name: string) => {
    const icons: Record<string, ReactNode> = {
      History: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      Geography: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      Art: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    };
    return icons[name] || icons.History;
  };

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-secondary-light to-secondary rounded-[20px] p-6 w-[232px] h-[167px] flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all hover:scale-105 shadow-md group relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>

      {/* Icon */}
      <div className="flex justify-center">
        <div className="text-white group-hover:scale-110 transition-transform">
          {getSubjectIcon(courseName)}
        </div>
      </div>

      {/* Text content */}
      <div>
        <p className="text-lg text-white font-bold mb-1 text-center">
          {courseName}
        </p>
        <p className="text-sm text-white/90 text-center">{description}</p>
      </div>
    </div>
  );
}
