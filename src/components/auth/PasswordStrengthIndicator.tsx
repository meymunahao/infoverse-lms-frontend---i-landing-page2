'use client';

import { CheckCircle2, Info } from 'lucide-react';
import clsx from 'clsx';
import type { PasswordValidation } from '../../types/security';
import { strengthColorMap, strengthCopyMap } from '../../utils/passwordStrength';

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
  isLoading?: boolean;
}

const requirementCopy: Record<keyof PasswordValidation['requirements'], string> = {
  minLength: 'Use at least the minimum required characters.',
  hasUppercase: 'Include uppercase letters (A-Z).',
  hasLowercase: 'Include lowercase letters (a-z).',
  hasNumbers: 'Include at least one number.',
  hasSymbols: 'Include a special character.',
  isNotCommon: 'Avoid common or predictable passwords.',
  isNotPwned: 'Password has not appeared in known breaches.',
  matchesHistoryPolicy: 'Do not reuse a recent password.',
};

export const PasswordStrengthIndicator = ({ validation, isLoading = false }: PasswordStrengthIndicatorProps) => {
  const { strength, score, requirements } = validation;

  return (
    <div className="space-y-4" aria-live="polite">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-slate-700">
          <span>Password strength</span>
          <span>{score}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
          <div
            className={clsx('h-full transition-all duration-300 ease-out', strengthColorMap[strength])}
            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
          />
        </div>
        <p className="text-sm text-slate-600" aria-live="assertive">
          {isLoading ? 'Evaluating password security…' : strengthCopyMap[strength]}
        </p>
      </div>
      <div className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700" role="list">
        {Object.entries(requirements).map(([key, met]) => (
          <div
            key={key}
            className={clsx('flex items-start gap-2 rounded-xl border border-transparent px-3 py-2 transition', {
              'border-emerald-200 bg-white shadow-sm': met,
            })}
            role="listitem"
          >
            <CheckCircle2
              className={clsx('mt-0.5 h-4 w-4 flex-shrink-0', met ? 'text-emerald-500' : 'text-slate-300')}
              aria-hidden="true"
            />
            <span className={clsx('leading-5', { 'text-slate-400 line-through': met })}>{requirementCopy[key as keyof PasswordValidation['requirements']]}</span>
          </div>
        ))}
      </div>
      {validation.suggestions.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-medium">Suggestions to strengthen your password</p>
              <ul className="list-disc space-y-1 pl-5">
                {validation.suggestions.map((suggestion) => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
