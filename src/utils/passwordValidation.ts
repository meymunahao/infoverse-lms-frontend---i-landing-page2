import type { PasswordValidation, PasswordStrength } from '../types/security';
import { calculatePasswordScore, determineStrength, countCharacterSets } from './passwordStrength';

const COMMON_PASSWORDS = new Set<string>([
  'password',
  '123456',
  '123456789',
  'qwerty',
  'letmein',
  'welcome',
  'admin',
  'infoverse',
  'changeme',
  'password1',
]);

export interface ValidatePasswordOptions {
  minimumLength?: number;
  reused?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
  requireMixedCase?: boolean;
}

const buildSuggestions = (
  requirements: PasswordValidation['requirements'],
  strength: PasswordStrength,
): string[] => {
  const suggestions: string[] = [];
  if (!requirements.minLength) {
    suggestions.push('Use at least twelve characters.');
  }
  if (!requirements.hasUppercase) {
    suggestions.push('Add uppercase characters (A-Z).');
  }
  if (!requirements.hasLowercase) {
    suggestions.push('Include lowercase characters (a-z).');
  }
  if (!requirements.hasNumbers) {
    suggestions.push('Mix in numbers to increase complexity.');
  }
  if (!requirements.hasSymbols) {
    suggestions.push('Add special characters like ! @ # %.');
  }
  if (!requirements.isNotCommon) {
    suggestions.push('Avoid commonly used or compromised passwords.');
  }
  if (!requirements.matchesHistoryPolicy) {
    suggestions.push('Choose a password you have not used recently.');
  }
  if (strength === 'fair' || strength === 'weak') {
    suggestions.push('Consider using a passphrase of unrelated words.');
  }
  return suggestions;
};

export const validatePassword = (
  password: string,
  options: ValidatePasswordOptions = {},
): PasswordValidation => {
  const minimumLength = options.minimumLength ?? 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^\da-zA-Z]/.test(password);
  const isNotCommon = password ? !COMMON_PASSWORDS.has(password.toLowerCase()) : false;
  const matchesHistoryPolicy = options.reused ? !options.reused : true;

  const requirements = {
    minLength: password.length >= minimumLength,
    hasUppercase: options.requireMixedCase ? hasUppercase : hasUppercase || !password,
    hasLowercase: options.requireMixedCase ? hasLowercase : hasLowercase || !password,
    hasNumbers: options.requireNumber ? hasNumbers : hasNumbers || !password,
    hasSymbols: options.requireSymbol ? hasSymbols : hasSymbols || !password,
    isNotCommon,
    isNotPwned: true,
    matchesHistoryPolicy,
  };

  const score = calculatePasswordScore(password);
  const strength: PasswordStrength = determineStrength(score);
  const fulfilled = Object.values(requirements).filter(Boolean).length;
  const isValid = fulfilled >= 7 && score >= 45;
  const suggestions = buildSuggestions(requirements, strength);

  return {
    isValid,
    strength,
    score,
    requirements,
    suggestions,
  };
};

export const evaluateCharacterDiversity = (password: string) => countCharacterSets(password);

export const isCommonPassword = (password: string) => COMMON_PASSWORDS.has(password.toLowerCase());
