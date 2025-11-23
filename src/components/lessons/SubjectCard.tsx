import Link from 'next/link';

interface SubjectCardProps {
  subject: {
    slug: string;
    title: string;
    description?: string;
    lessonCount?: number;
  };
  keyStage: number;
}

export function SubjectCard({ subject, keyStage }: SubjectCardProps) {
  return (
    <Link href={`/subjects/${subject.slug}`}>
      <div className="bg-[#BDD0D2] rounded-[15px] p-6 hover:bg-[#A8BFC1] transition-colors cursor-pointer h-[200px] flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-black mb-2">
              {subject.title}
            </h3>
            {subject.description && (
              <p className="text-sm text-black line-clamp-2">
                {subject.description}
              </p>
            )}
          </div>
        </div>

        {subject.lessonCount !== undefined && (
          <div className="text-sm text-black">
            {subject.lessonCount} lessons available
          </div>
        )}

        <div className="text-xs text-text-light">Key Stage {keyStage}</div>
      </div>
    </Link>
  );
}
