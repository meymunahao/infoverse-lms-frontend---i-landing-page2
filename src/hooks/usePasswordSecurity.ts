'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type {
  AuthenticationState,
  PasswordChangeRequest,
  PasswordSecurityTelemetry,
  SecuritySettings,
} from '../types/security';

interface UsePasswordSecurityOptions {
  userId: string;
  securitySettings: SecuritySettings;
  authenticationState: AuthenticationState;
  onPasswordChanged?: () => void;
  onSessionInvalid?: () => void;
}

interface PasswordChangeResponse {
  success: boolean;
  message?: string;
  requiresTwoFactor?: boolean;
}

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const withinWindow = (start: Date) => Date.now() - start.getTime() < RATE_LIMIT_WINDOW_MS;

export const usePasswordSecurity = ({
  userId,
  securitySettings,
  authenticationState,
  onPasswordChanged,
  onSessionInvalid,
}: UsePasswordSecurityOptions) => {
  const [telemetry, setTelemetry] = useState<PasswordSecurityTelemetry>({ attempts: 0 });
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyingTwoFactor, setVerifyingTwoFactor] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [twoFactorSent, setTwoFactorSent] = useState(false);
  const requestController = useRef<AbortController | null>(null);

  const resetRateLimit = useCallback(() => {
    setTelemetry({ attempts: 0 });
    setRateLimited(false);
  }, []);

  const incrementAttempts = useCallback(() => {
    setTelemetry((current) => {
      const lastAttemptAt = current.lastAttemptAt && withinWindow(current.lastAttemptAt)
        ? current.lastAttemptAt
        : new Date();
      const attempts =
        current.lastAttemptAt && withinWindow(current.lastAttemptAt) ? current.attempts + 1 : 1;
      const lockoutExpiresAt =
        attempts >= RATE_LIMIT_MAX_ATTEMPTS
          ? new Date(Date.now() + RATE_LIMIT_WINDOW_MS)
          : undefined;
      return {
        attempts,
        lastAttemptAt,
        lockoutExpiresAt,
      };
    });
  }, []);

  const enforceRateLimit = useCallback(() => {
    const { attempts, lastAttemptAt, lockoutExpiresAt } = telemetry;
    if (attempts >= RATE_LIMIT_MAX_ATTEMPTS && lastAttemptAt && withinWindow(lastAttemptAt)) {
      setRateLimited(true);
      if (lockoutExpiresAt && lockoutExpiresAt.getTime() < Date.now()) {
        resetRateLimit();
        return false;
      }
      return true;
    }
    return false;
  }, [resetRateLimit, telemetry]);

  const ensureSession = useCallback(() => {
    if (!authenticationState.isAuthenticated || !authenticationState.sessionValid) {
      setSecurityError('Your session has expired. Please re-authenticate to continue.');
      onSessionInvalid?.();
      return false;
    }
    return true;
  }, [authenticationState, onSessionInvalid]);

  const sendTwoFactorChallenge = useCallback(async () => {
    if (!securitySettings.enableTwoFactor) {
      return { success: false, message: 'Two-factor authentication is not enabled.' };
    }
    if (!ensureSession()) {
      return { success: false, message: 'Session invalid.' };
    }
    setVerifyingTwoFactor(true);
    try {
      const response = await fetch('/api/security/send-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Unable to send verification code.');
      }
      setTwoFactorSent(true);
      return { success: true, message: 'Verification code sent.' };
    } catch (error) {
      setSecurityError((error as Error).message);
      return { success: false, message: (error as Error).message };
    } finally {
      setVerifyingTwoFactor(false);
    }
  }, [ensureSession, securitySettings.enableTwoFactor, userId]);

  const verifyTwoFactor = useCallback(
    async (code: string) => {
      if (!securitySettings.enableTwoFactor) {
        return { success: true };
      }
      if (!ensureSession()) {
        return { success: false, message: 'Session invalid.' };
      }
      setVerifyingTwoFactor(true);
      try {
        const response = await fetch('/api/security/verify-2fa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, code }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Invalid verification code.');
        }
        return { success: true };
      } catch (error) {
        const message = (error as Error).message;
        setSecurityError(message);
        return { success: false, message };
      } finally {
        setVerifyingTwoFactor(false);
      }
    },
    [ensureSession, securitySettings.enableTwoFactor, userId],
  );

  const submitChange = useCallback(
    async (payload: PasswordChangeRequest): Promise<PasswordChangeResponse> => {
      if (!ensureSession()) {
        return { success: false, message: 'Session invalid.' };
      }
      if (enforceRateLimit()) {
        return { success: false, message: 'Too many attempts. Please try again later.' };
      }
      if (securitySettings.requireCurrentPassword && !payload.currentPassword) {
        return { success: false, message: 'Current password is required.' };
      }
      if (payload.newPassword !== payload.confirmPassword) {
        return { success: false, message: 'Passwords do not match.' };
      }
      if (securitySettings.enableTwoFactor && !payload.twoFactorCode) {
        return { success: false, message: 'Two-factor verification is required.' };
      }

      setIsSubmitting(true);
      setSecurityError(null);
      requestController.current?.abort();
      requestController.current = new AbortController();

      try {
        const response = await fetch('/api/security/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: requestController.current.signal,
          body: JSON.stringify({ ...payload, userId }),
        });

        if (response.status === 429) {
          incrementAttempts();
          setRateLimited(true);
          return {
            success: false,
            message: 'Too many attempts. Please try again after a short delay.',
          };
        }

        if (response.status === 401) {
          onSessionInvalid?.();
          setSecurityError('Your session has expired. Please log in again.');
          return {
            success: false,
            message: 'Session expired.',
          };
        }

        if (response.status === 412) {
          setSecurityError('Password policy requirements were not met.');
          return { success: false, message: 'Password policy validation failed.' };
        }

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Unable to update password.');
        }

        resetRateLimit();
        onPasswordChanged?.();
        return { success: true };
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return { success: false, message: 'Request cancelled.' };
        }
        incrementAttempts();
        const message = (error as Error).message || 'Unable to update password.';
        setSecurityError(message);
        return { success: false, message };
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      ensureSession,
      enforceRateLimit,
      incrementAttempts,
      onPasswordChanged,
      onSessionInvalid,
      resetRateLimit,
      securitySettings.enableTwoFactor,
      securitySettings.requireCurrentPassword,
      userId,
    ],
  );

  const cancelRequest = useCallback(() => {
    requestController.current?.abort();
  }, []);

  const state = useMemo(
    () => ({
      telemetry,
      securityError,
      isSubmitting,
      verifyingTwoFactor,
      rateLimited,
      twoFactorSent,
    }),
    [telemetry, securityError, isSubmitting, verifyingTwoFactor, rateLimited, twoFactorSent],
  );

  return {
    ...state,
    submitChange,
    verifyTwoFactor,
    sendTwoFactorChallenge,
    cancelRequest,
    resetRateLimit,
    setSecurityError,
  };
};
