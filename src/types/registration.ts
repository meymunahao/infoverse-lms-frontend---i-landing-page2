export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
  marketingOptIn?: boolean;
  referralSource?: string;
}

export interface ExtendedRegistrationData extends RegistrationData {
  accountType: "student" | "tutor" | "parent";
  marketingOptIn?: boolean;
  referralSource?: string;
  learningGoals?: string;
  experienceLevel?: string;
  honeypot?: string;
}

export interface RegistrationResponse {
  success: boolean;
  userId?: string;
  verificationRequired: boolean;
  errors?: ValidationError[];
  nextSteps: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  suggestion?: string;
  severity: "error" | "warning" | "info";
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  preventCommonPasswords: boolean;
}

export interface PasswordStrengthResult {
  score: number;
  label: "weak" | "fair" | "good" | "strong" | "very-strong";
  feedback: string[];
  unmetRequirements: string[];
}

export interface UserPreferences {
  communicationChannels: ("email" | "sms" | "in-app")[];
  language: string;
  learningPace: "self-guided" | "structured" | "intensive";
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  accountType: "student" | "tutor" | "parent";
  registrationDate: Date;
  onboardingCompleted: boolean;
  preferences: UserPreferences;
}

export interface EmailValidationResult {
  isValid: boolean;
  isDisposable: boolean;
  suggestion?: string;
  message?: string;
}

export interface RegistrationAnalyticsEvent {
  name: string;
  status: "started" | "submitted" | "succeeded" | "failed" | "abandoned";
  metadata?: Record<string, unknown>;
}
