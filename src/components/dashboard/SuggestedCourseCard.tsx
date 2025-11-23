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
  return (
    <div
      onClick={onClick}
      className="bg-[#BDD0D2] rounded-[15px] p-6 w-[232px] h-[167px] flex flex-col justify-end cursor-pointer hover:bg-[#A8BFC1] transition-colors"
    >
      <p className="text-base text-black font-medium mb-2 text-center">
        {courseName}
      </p>
      <p className="text-sm text-black text-center">{description}</p>
    </div>
  );
}
