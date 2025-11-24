interface CourseProgressCardProps {
  subjectName: string;
  progress: number;
  onClick?: () => void;
}

export default function CourseProgressCard({
  subjectName,
  progress,
  onClick,
}: CourseProgressCardProps) {
  // Get subject icon based on name
  const getSubjectIcon = (name: string) => {
    const icons: Record<string, JSX.Element> = {
      Mathematics: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      English: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      Science: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    };
    return icons[name] || icons.Mathematics;
  };

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-[#BDD0D2] to-[#A8BFC1] rounded-[20px] p-6 w-[232px] h-[167px] flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all hover:scale-105 shadow-md group"
    >
      {/* Subject Name with Icon */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="text-primary-dark group-hover:text-primary transition-colors">
          {getSubjectIcon(subjectName)}
        </div>
        <p className="text-lg text-black text-center font-bold">
          {subjectName}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-[10px] bg-white/50 rounded-[10px] overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-[10px] transition-all duration-500 shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-black text-right font-semibold">{progress}% Complete</p>
      </div>
    </div>
  );
}
