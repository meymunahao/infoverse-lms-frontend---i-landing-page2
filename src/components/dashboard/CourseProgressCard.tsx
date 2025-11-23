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
  return (
    <div
      onClick={onClick}
      className="bg-[#BDD0D2] rounded-[15px] p-6 w-[232px] h-[167px] flex flex-col justify-between cursor-pointer hover:bg-[#A8BFC1] transition-colors"
    >
      {/* Subject Name */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-base text-black text-center font-medium">
          {subjectName}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-[9px] bg-[#E6E6E6] rounded-[10px] overflow-hidden">
          <div
            className="h-full bg-white rounded-[10px] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-base text-black text-right">{progress}%</p>
      </div>
    </div>
  );
}
