import clsx from "clsx";
import type { PasswordRequirements, PasswordStrengthResult } from "../../types/registration";

interface PasswordStrengthMeterProps {
  strength: PasswordStrengthResult;
  requirements: PasswordRequirements;
}

const strengthColors: Record<PasswordStrengthResult["label"], string> = {
  weak: "bg-red-500",
  fair: "bg-orange-400",
  good: "bg-amber-400",
  strong: "bg-green-500",
  "very-strong": "bg-emerald-600",
};

const strengthLabels: Record<PasswordStrengthResult["label"], string> = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
  "very-strong": "Very Strong",
};

export const PasswordStrengthMeter = ({ strength, requirements }: PasswordStrengthMeterProps) => {
  const totalSegments = 5;
  const activeSegments = Math.max(1, strength.score);

  return (
    <div className="space-y-2" aria-live="polite">
      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
        <span>Password strength</span>
        <span className="text-slate-800">{strengthLabels[strength.label]}</span>
      </div>
      <div className="flex gap-1" role="progressbar" aria-valuemin={0} aria-valuemax={totalSegments} aria-valuenow={activeSegments}>
        {Array.from({ length: totalSegments }, (_, index) => (
          <span
            key={index}
            className={clsx(
              "h-2 flex-1 rounded-full transition-all duration-500",
              index < activeSegments ? strengthColors[strength.label] : "bg-slate-200",
            )}
          />
        ))}
      </div>
      {strength.unmetRequirements.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
          {strength.unmetRequirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      )}
      {strength.feedback.length > 0 && (
        <div className="rounded-lg bg-slate-100 p-3 text-xs text-slate-700">
          {strength.feedback.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}
      <div className="grid gap-1 text-[11px] text-slate-500 md:grid-cols-2">
        <span>• Minimum {requirements.minLength} characters</span>
        <span>• Upper &amp; lowercase letters</span>
        <span>• At least one number</span>
        <span>• Special character required</span>
      </div>
    </div>
  );
};
