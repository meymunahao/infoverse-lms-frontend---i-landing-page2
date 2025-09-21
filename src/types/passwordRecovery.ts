export interface PasswordResetRequest {
  email: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
}

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: Date;
  isUsed: boolean;
  attempts: number;
  createdAt: Date;
}

export interface EmailValidation {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
  domain: string;
  isDisposable: boolean;
  isRole: boolean;
}

export interface RecoveryResponse {
  success: boolean;
  message: string;
  rateLimitInfo?: {
    attemptsRemaining: number;
    resetTime: Date;
  };
  estimatedDeliveryTime?: number;
}

export interface SecuritySettings {
  maxAttemptsPerHour: number;
  tokenExpiryMinutes: number;
  cooldownPeriodMinutes: number;
  requireAccountExistence: boolean;
  enableDeliveryTracking: boolean;
}
