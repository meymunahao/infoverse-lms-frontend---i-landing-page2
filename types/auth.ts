export interface UserPreferences {
  locale: string;
  timezone: string;
  receiveSecurityAlerts: boolean;
  enableBiometrics: boolean;
  trustedDevices: Array<TrustedDevice>;
}

export interface TrustedDevice {
  deviceId: string;
  deviceName: string;
  lastUsedAt: Date;
  isTrusted: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "tutor" | "admin";
  avatar?: string;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  preferences: UserPreferences;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
  otpCode?: string;
  deviceId?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  requiresTwoFactor?: boolean;
  errors?: string[];
  mfaMethods?: string[];
  sessionId?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  sessionExpiry: Date | null;
  lastActivityAt: Date | null;
  rememberMe: boolean;
}

export interface SocialAuthProvider {
  name: string;
  provider: "google" | "facebook" | "github" | "microsoft";
  clientId: string;
  scopes: string[];
  buttonText: string;
  icon: string;
  pkce?: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  setRememberMe: (remember: boolean) => void;
  setError: (message: string | null) => void;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSymbol: boolean;
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CaptchaChallenge {
  token: string;
  provider: "recaptcha" | "hcaptcha" | "turnstile";
}

export interface SessionMetadata {
  sessionId: string;
  expiresAt: Date;
  issuedAt: Date;
  deviceId?: string;
  ipAddress?: string;
  location?: string;
  userAgent?: string;
}

export type AuthEvent =
  | { type: "LOGIN_SUCCESS"; payload: { user: User; sessionExpiry: Date } }
  | { type: "LOGIN_FAILURE"; payload: { error: string } }
  | { type: "LOGOUT" }
  | { type: "REFRESH"; payload: { sessionExpiry: Date; user?: User } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_REMEMBER_ME"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
