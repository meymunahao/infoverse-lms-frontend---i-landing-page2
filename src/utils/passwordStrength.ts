import type { PasswordStrength } from '../types/security';

const STRENGTH_THRESHOLDS: Array<{ min: number; strength: PasswordStrength }> = [
  { min: 0, strength: 'weak' },
  { min: 25, strength: 'fair' },
  { min: 45, strength: 'good' },
  { min: 70, strength: 'strong' },
  { min: 90, strength: 'very-strong' },
];

const SEQUENTIAL_PATTERNS = [/abcdefghijklmnopqrstuvwxyz/i, /0123456789/];

export const countCharacterSets = (password: string) => {
  const sets = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^\da-zA-Z]/.test(password),
  };

  return {
    ...sets,
    fulfilled: Object.values(sets).filter(Boolean).length,
  };
};

export const penalizeSequences = (password: string): number => {
  let penalty = 0;
  for (const pattern of SEQUENTIAL_PATTERNS) {
    if (pattern.test(password)) {
      penalty += 10;
    }
  }
  if (/([a-zA-Z0-9])\1{2,}/.test(password)) {
    penalty += 15;
  }
  return penalty;
};

export const calculatePasswordScore = (password: string): number => {
  if (!password) {
    return 0;
  }

  const base = Math.min(40, password.length * 3);
  const { fulfilled } = countCharacterSets(password);
  const varietyBonus = fulfilled * 12;
  const uniqueCharacters = new Set(password).size;
  const uniquenessBonus = Math.min(20, uniqueCharacters * 1.5);
  const sequencePenalty = penalizeSequences(password);

  const entropyScore = base + varietyBonus + uniquenessBonus - sequencePenalty;

  return Math.max(0, Math.min(100, Math.round(entropyScore)));
};

export const determineStrength = (score: number): PasswordStrength => {
  let current: PasswordStrength = 'weak';
  for (const threshold of STRENGTH_THRESHOLDS) {
    if (score >= threshold.min) {
      current = threshold.strength;
    }
  }
  return current;
};

export const strengthColorMap: Record<PasswordStrength, string> = {
  'weak': 'bg-red-500',
  'fair': 'bg-orange-500',
  'good': 'bg-yellow-500',
  'strong': 'bg-emerald-500',
  'very-strong': 'bg-green-600',
};

export const strengthCopyMap: Record<PasswordStrength, string> = {
  'weak': 'Weak – vulnerable to attacks',
  'fair': 'Fair – improve with more variety',
  'good': 'Good – could still be stronger',
  'strong': 'Strong – meets recommended policies',
  'very-strong': 'Very strong – excellent protection',
};
