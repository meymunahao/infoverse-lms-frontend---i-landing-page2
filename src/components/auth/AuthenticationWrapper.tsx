'use client';

import { ReactNode, useEffect, useState } from 'react';
import type { AuthenticationState, SecuritySettings } from '../../types/security';
import { SecurityAlert } from './SecurityAlert';

interface AuthenticationWrapperProps {
  authenticationState: AuthenticationState;
  securitySettings: SecuritySettings;
  onLogout?: () => void;
  onRefreshSession?: () => Promise<boolean>;
  children: ReactNode;
}

export const AuthenticationWrapper = ({
  authenticationState,
  securitySettings,
  onLogout,
  onRefreshSession,
  children,
}: AuthenticationWrapperProps) => {
  const [sessionValid, setSessionValid] = useState(authenticationState.sessionValid);
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(
    authenticationState.requiresPasswordChange,
  );
  const [sessionCheckedAt, setSessionCheckedAt] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSessionValid(authenticationState.sessionValid);
    setRequiresPasswordChange(authenticationState.requiresPasswordChange);
  }, [authenticationState]);

  useEffect(() => {
    if (!securitySettings.sessionTimeoutMinutes) {
      return;
    }
    const timeoutMs = securitySettings.sessionTimeoutMinutes * 60 * 1000;
    const timer = setTimeout(async () => {
      if (onRefreshSession) {
        setLoading(true);
        const refreshed = await onRefreshSession();
        setLoading(false);
        setSessionCheckedAt(new Date());
        setSessionValid(refreshed);
        if (!refreshed) {
          onLogout?.();
        }
      } else {
        setSessionValid(false);
        onLogout?.();
      }
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [onLogout, onRefreshSession, securitySettings.sessionTimeoutMinutes, sessionCheckedAt]);

  if (!authenticationState.isAuthenticated || !sessionValid) {
    return (
      <div className="space-y-4 p-8">
        <SecurityAlert
          variant="warning"
          title="Session expired"
          description="For security reasons you have been signed out. Please sign in again to change your password."
          action={
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Return to login
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {requiresPasswordChange && (
        <div className="p-6">
          <SecurityAlert
            variant="warning"
            title="Password change required"
            description="Your organization requires you to update your password before continuing."
          />
        </div>
      )}
      {loading && (
        <div className="p-6">
          <SecurityAlert
            variant="info"
            title="Refreshing session"
            description="Confirming your session is still valid…"
          />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};
