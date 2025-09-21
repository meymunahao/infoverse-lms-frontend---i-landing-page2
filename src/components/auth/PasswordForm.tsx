'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import clsx from 'clsx';
import { ShieldCheck, ShieldQuestion } from 'lucide-react';
import type {
  AuthenticationState,
  PasswordChangeRequest,
  SecuritySettings,
} from '../../types/security';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { usePasswordSecurity } from '../../hooks/usePasswordSecurity';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle';
import { SecurityAlert } from './SecurityAlert';

interface PasswordFormProps {
  securitySettings: SecuritySettings;
  authenticationState: AuthenticationState;
  recentPasswordHashes?: string[];
  onPasswordChanged?: () => void;
  onSessionInvalid?: () => void;
  onLogout?: () => void;
}

const generateStrongPassword = (length = 16) => {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+[]{}';
  const values = new Uint32Array(length);
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
  } else {
    for (let i = 0; i < values.length; i += 1) {
      values[i] = Math.floor(Math.random() * charset.length);
    }
  }
  return Array.from(values)
    .map((value) => charset[value % charset.length])
    .join('');
};

export const PasswordForm = ({
  securitySettings,
  authenticationState,
  recentPasswordHashes,
  onPasswordChanged,
  onSessionInvalid,
  onLogout,
}: PasswordFormProps) => {
  const [form, setForm] = useState<PasswordChangeRequest>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<'success' | 'error' | 'info'>('info');

  const {
    validation,
    compromised,
    checkingCompromise,
    reusedPassword,
    setIsCompromised,
  } = usePasswordValidation(form.newPassword, {
    securitySettings,
    recentPasswordHashes,
  });

  const {
    submitChange,
    sendTwoFactorChallenge,
    securityError,
    isSubmitting,
    verifyingTwoFactor,
    rateLimited,
    twoFactorSent,
    setSecurityError,
  } = usePasswordSecurity({
    userId: authenticationState.userId,
    securitySettings,
    authenticationState,
    onPasswordChanged: () => {
      onPasswordChanged?.();
      setStatusVariant('success');
      setStatusMessage('Password updated successfully. You will be signed out in a moment.');
    },
    onSessionInvalid,
  });

  const passwordsMatch = form.newPassword.length > 0 && form.newPassword === form.confirmPassword;
  const charCount = form.newPassword.length;
  const formDisabled = isSubmitting || verifyingTwoFactor;

  const handleInputChange = (field: keyof PasswordChangeRequest) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (field === 'newPassword') {
        setStatusMessage(null);
        setSecurityError(null);
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    if (!validation.isValid) {
      setStatusVariant('error');
      setStatusMessage('Please meet all password requirements before continuing.');
      return;
    }

    if (compromised) {
      setStatusVariant('error');
      setStatusMessage('This password appears in known breaches. Please choose another password.');
      return;
    }

    if (!passwordsMatch) {
      setStatusVariant('error');
      setStatusMessage('New password and confirmation do not match.');
      return;
    }

    if (securitySettings.enableTwoFactor && !twoFactorCode) {
      setStatusVariant('error');
      setStatusMessage('Enter the verification code sent to your trusted device.');
      return;
    }

    const result = await submitChange({
      ...form,
      twoFactorCode,
    });

    if (!result.success) {
      setStatusVariant('error');
      setStatusMessage(result.message || 'Unable to update password.');
      return;
    }

    setStatusVariant('success');
    setStatusMessage('Password updated successfully. For security, you will be asked to sign in again.');
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTwoFactorCode('');
    setIsCompromised(false);
  };

  const handleGeneratePassword = () => {
    const generated = generateStrongPassword();
    setForm((prev) => ({ ...prev, newPassword: generated, confirmPassword: generated }));
    setStatusVariant('info');
    setStatusMessage('Generated a strong password. Remember to store it securely.');
  };

  const breachStatus = useMemo(() => {
    if (checkingCompromise) {
      return 'Checking for known breaches…';
    }
    if (compromised) {
      return 'Password found in breach data';
    }
    return 'No known breaches detected';
  }, [checkingCompromise, compromised]);

  return (
    <form className="flex h-full flex-col gap-8" onSubmit={handleSubmit} aria-describedby="password-policy">
      <div className="space-y-4">
        {statusMessage && (
          <SecurityAlert
            variant={statusVariant === 'success' ? 'success' : statusVariant === 'error' ? 'error' : 'info'}
            title={statusVariant === 'success' ? 'Success' : statusVariant === 'error' ? 'Action required' : 'Notice'}
            description={statusMessage}
          />
        )}
        {securityError && (
          <SecurityAlert
            variant="error"
            title="Security warning"
            description={securityError}
            action={
              rateLimited ? (
                <p className="text-sm font-medium">
                  Too many attempts. Try again later or contact support if this was not you.
                </p>
              ) : undefined
            }
          />
        )}
        {reusedPassword && (
          <SecurityAlert
            variant="warning"
            title="Recently used password detected"
            description="For your protection, choose a password you have not used recently."
          />
        )}
        {compromised && !checkingCompromise && (
          <SecurityAlert
            variant="error"
            title="Compromised password"
            description="This password has been exposed in public data breaches. We strongly recommend choosing another password."
            action={
              <button
                type="button"
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-red-900 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                onClick={() => setIsCompromised(false)}
              >
                I will choose a different password
              </button>
            }
          />
        )}
      </div>

      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Secure your account</h3>
            <p className="text-sm text-slate-500">
              Update your password regularly and avoid reusing passwords across accounts. Changes take effect immediately.
            </p>
          </div>
          <ShieldCheck className="h-8 w-8 text-sky-500" aria-hidden="true" />
        </div>

        {securitySettings.requireCurrentPassword && (
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-semibold text-slate-700">
              Current password
            </label>
            <div className="relative flex items-center">
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                required={securitySettings.requireCurrentPassword}
                value={form.currentPassword}
                onChange={handleInputChange('currentPassword')}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-base text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                autoComplete="current-password"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <PasswordVisibilityToggle visible={showCurrent} onClick={() => setShowCurrent((prev) => !prev)} />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">
            New password
          </label>
          <div className="relative flex items-center">
            <input
              id="newPassword"
              name="newPassword"
              type={showNew ? 'text' : 'password'}
              value={form.newPassword}
              onChange={handleInputChange('newPassword')}
              className={clsx(
                'h-12 w-full rounded-2xl border bg-white px-4 pr-12 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-sky-100',
                validation.isValid ? 'border-emerald-300 focus:border-emerald-400' : 'border-slate-200 focus:border-sky-400',
              )}
              aria-describedby="password-policy"
              autoComplete="new-password"
            />
            <div className="absolute inset-y-0 right-3 flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">{charCount} chars</span>
              <PasswordVisibilityToggle visible={showNew} onClick={() => setShowNew((prev) => !prev)} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
            Confirm new password
          </label>
          <div className="relative flex items-center">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              className={clsx(
                'h-12 w-full rounded-2xl border bg-white px-4 pr-12 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-sky-100',
                passwordsMatch && form.confirmPassword
                  ? 'border-emerald-300 focus:border-emerald-400'
                  : 'border-slate-200 focus:border-sky-400',
              )}
              autoComplete="new-password"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <PasswordVisibilityToggle visible={showConfirm} onClick={() => setShowConfirm((prev) => !prev)} />
            </div>
          </div>
          <p className={clsx('text-sm', passwordsMatch ? 'text-emerald-600' : 'text-slate-500')}>
            {passwordsMatch && form.confirmPassword ? 'Passwords match.' : 'Re-enter the new password to confirm.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <ShieldQuestion className="h-5 w-5 text-slate-400" aria-hidden="true" />
          <div className="flex-1">
            <p id="password-policy" className="font-medium text-slate-700">
              Password policy
            </p>
            <p>
              Minimum length {securitySettings.minimumLength}+ characters with uppercase, lowercase, numbers, and symbols. Avoid common
              phrases or reused passwords.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-sky-400 px-4 py-2 text-sm font-semibold text-sky-600 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
            onClick={handleGeneratePassword}
          >
            Generate secure password
          </button>
        </div>

        {securitySettings.enableTwoFactor && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="twoFactorCode" className="text-sm font-semibold text-slate-700">
                Two-factor verification code
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-sky-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
                onClick={sendTwoFactorChallenge}
                disabled={verifyingTwoFactor}
              >
                {twoFactorSent ? 'Resend code' : 'Send code'}
              </button>
            </div>
            <input
              id="twoFactorCode"
              name="twoFactorCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              value={twoFactorCode}
              onChange={(event) => setTwoFactorCode(event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="Enter 6-digit code"
            />
          </div>
        )}

        <div className="flex flex-col gap-6 rounded-3xl bg-slate-50/80 p-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Breach monitoring</span>
            <span className={clsx('font-semibold', compromised ? 'text-red-600' : 'text-emerald-600')}>
              {breachStatus}
            </span>
          </div>
          <PasswordStrengthIndicator validation={validation} isLoading={checkingCompromise} />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onLogout}
          className="order-2 text-sm font-semibold text-slate-500 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 sm:order-1"
        >
          Cancel and return to login
        </button>
        <button
          type="submit"
          disabled={formDisabled}
          className="order-1 inline-flex items-center justify-center rounded-full bg-[#DD7C5E] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#c96d52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DD7C5E] disabled:cursor-not-allowed disabled:bg-slate-300 sm:order-2"
        >
          {formDisabled ? 'Securing…' : 'Change password and log out'}
        </button>
      </div>
    </form>
  );
};
