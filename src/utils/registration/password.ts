import { PasswordRequirements, PasswordStrengthResult, ValidationError } from "../../types/registration";

const COMMON_PASSWORDS = new Set([
  "password",
  "123456",
  "qwerty",
  "111111",
  "12345678",
  "letmein",
]);

export const defaultPasswordRequirements: PasswordRequirements = {
  minLength: 12,
  requireLowercase: true,
  requireUppercase: true,
  requireNumbers: true,
  requireSymbols: true,
  preventCommonPasswords: true,
};

export const getPasswordStrength = (
  password: string,
  requirements: PasswordRequirements = defaultPasswordRequirements,
): PasswordStrengthResult => {
  const feedback: string[] = [];
  const unmetRequirements: string[] = [];

  if (!password || password.length === 0) {
    return { score: 0, label: "weak", feedback: ["Create a secure password"], unmetRequirements };
  }

  let score = 0;

  if (password.length >= requirements.minLength) {
    score += 1;
  } else {
    unmetRequirements.push(`Use at least ${requirements.minLength} characters`);
  }

  if (requirements.requireLowercase && /[a-z]/.test(password)) {
    score += 1;
  } else if (requirements.requireLowercase) {
    unmetRequirements.push("Add a lowercase letter");
  }

  if (requirements.requireUppercase && /[A-Z]/.test(password)) {
    score += 1;
  } else if (requirements.requireUppercase) {
    unmetRequirements.push("Add an uppercase letter");
  }

  if (requirements.requireNumbers && /\d/.test(password)) {
    score += 1;
  } else if (requirements.requireNumbers) {
    unmetRequirements.push("Include at least one number");
  }

  if (requirements.requireSymbols && /[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else if (requirements.requireSymbols) {
    unmetRequirements.push("Add a special character");
  }

  if (requirements.preventCommonPasswords && COMMON_PASSWORDS.has(password.toLowerCase())) {
    unmetRequirements.push("Avoid common passwords");
    score = Math.min(score, 2);
  }

  const label: PasswordStrengthResult["label"] =
    score <= 1 ? "weak" : score === 2 ? "fair" : score === 3 ? "good" : score === 4 ? "strong" : "very-strong";

  if (label === "weak" || label === "fair") {
    feedback.push("Use a combination of letters, numbers, and symbols");
  }
  if (password.length < requirements.minLength + 2) {
    feedback.push("Longer passwords are harder to guess");
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push("Special characters greatly improve security");
  }

  return { score: Math.min(score, 5), label, feedback, unmetRequirements };
};

export const getPasswordErrors = (
  password: string,
  requirements: PasswordRequirements = defaultPasswordRequirements,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (requirements.preventCommonPasswords && COMMON_PASSWORDS.has(password.toLowerCase())) {
    errors.push({
      field: "password",
      message: "This password is too common and easy to guess.",
      severity: "error",
    });
  }

  if (password.length < requirements.minLength) {
    errors.push({
      field: "password",
      message: `Passwords must be at least ${requirements.minLength} characters long.`,
      severity: "error",
    });
  }

  return errors;
};
