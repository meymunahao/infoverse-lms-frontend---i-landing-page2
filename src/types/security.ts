export interface PasswordChangeRequest {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorCode?: string;
}

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';

export interface PasswordValidation {
  isValid: boolean;
  strength: PasswordStrength;
  score: number; // 0-100
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSymbols: boolean;
    isNotCommon: boolean;
    isNotPwned: boolean;
    matchesHistoryPolicy: boolean;
  };
  suggestions: string[];
}

export interface SecuritySettings {
  requireCurrentPassword: boolean;
  enableTwoFactor: boolean;
  passwordHistoryLimit: number;
  sessionTimeoutMinutes: number;
  allowPasswordReset: boolean;
  minimumLength: number;
  requireSymbol: boolean;
  requireNumber: boolean;
  requireMixedCase: boolean;
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  sessionValid: boolean;
  userId: string;
  lastPasswordChange: Date;
  requiresPasswordChange: boolean;
}

export interface PasswordSecurityTelemetry {
  attempts: number;
  lastAttemptAt?: Date;
  lockoutExpiresAt?: Date;
}

export type SecurityAlertVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface SecurityAlertMessage {
  id: string;
  variant: SecurityAlertVariant;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface PasswordHistoryEntry {
  hash: string;
  changedAt: string;
}
