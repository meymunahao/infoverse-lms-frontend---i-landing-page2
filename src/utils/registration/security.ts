import { ExtendedRegistrationData, ValidationError } from "../../types/registration";
import { normalizeEmail } from "./email";

const HONEYPOT_FIELD_NAME = "confirmationCode";
const ATTEMPT_STORAGE_KEY = "registrationAttempts";
const MAX_ATTEMPTS_PER_HOUR = 10;

interface AttemptTrackerState {
  count: number;
  expiresAt: number;
}

export const sanitizeInput = (value: string): string =>
  value
    .trim()
    .replace(/[<>"'`]/g, "")
    .replace(/\s+/g, " ");

export const getHoneypotFieldName = (): string => HONEYPOT_FIELD_NAME;

export const isSuspectedBot = (formData: ExtendedRegistrationData): boolean => {
  if (formData.honeypot) {
    return true;
  }

  const suspiciousPatterns = [/http/i, /www\./i];
  return suspiciousPatterns.some((pattern) => pattern.test(formData.fullName));
};

export const normalizeRegistrationData = (
  formData: ExtendedRegistrationData,
): ExtendedRegistrationData => ({
  ...formData,
  fullName: sanitizeInput(formData.fullName),
  email: normalizeEmail(formData.email),
  referralSource: formData.referralSource?.trim() || undefined,
  learningGoals: formData.learningGoals?.trim() || undefined,
  experienceLevel: formData.experienceLevel?.trim() || undefined,
});

export const applyRateLimiting = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const now = Date.now();
  const stored = window.localStorage.getItem(ATTEMPT_STORAGE_KEY);
  const parsed: AttemptTrackerState | null = stored ? JSON.parse(stored) : null;

  if (!parsed || parsed.expiresAt < now) {
    const nextState: AttemptTrackerState = {
      count: 1,
      expiresAt: now + 60 * 60 * 1000,
    };
    window.localStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(nextState));
    return false;
  }

  if (parsed.count >= MAX_ATTEMPTS_PER_HOUR) {
    return true;
  }

  parsed.count += 1;
  window.localStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(parsed));
  return false;
};

export const captureValidationErrors = (errors: ValidationError[]): Record<string, ValidationError> =>
  errors.reduce<Record<string, ValidationError>>((accumulator, error) => {
    if (!accumulator[error.field]) {
      accumulator[error.field] = error;
    }
    return accumulator;
  }, {});

export const hashPassword = async (password: string): Promise<string> => {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    return password;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
};
