'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  PasswordValidation,
  SecuritySettings,
} from '../types/security';
import { validatePassword } from '../utils/passwordValidation';

export interface UsePasswordValidationOptions {
  securitySettings: SecuritySettings;
  recentPasswordHashes?: string[];
  enableBreachCheck?: boolean;
}

export interface UsePasswordValidationResult {
  validation: PasswordValidation;
  compromised: boolean;
  checkingCompromise: boolean;
  reusedPassword: boolean;
  setIsCompromised: (value: boolean) => void;
}

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

const hashSHA256 = async (value: string) => {
  if (!value) {
    return '';
  }
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(value);
    const buffer = await window.crypto.subtle.digest('SHA-256', encoded);
    return toHex(buffer);
  }
  const nodeCrypto = await import('crypto');
  return nodeCrypto.createHash('sha256').update(value).digest('hex').toUpperCase();
};

const hashSHA1 = async (value: string) => {
  if (!value) {
    return '';
  }
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(value);
    const buffer = await window.crypto.subtle.digest('SHA-1', encoded);
    return toHex(buffer);
  }
  const nodeCrypto = await import('crypto');
  return nodeCrypto.createHash('sha1').update(value).digest('hex').toUpperCase();
};

const checkPasswordReuse = async (password: string, history: string[] = []) => {
  if (!password || history.length === 0) {
    return false;
  }
  const hash = await hashSHA256(password);
  return history.includes(hash);
};

const checkPasswordCompromise = async (password: string, signal?: AbortSignal) => {
  if (!password) {
    return false;
  }
  try {
    const hash = await hashSHA1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'Add-Padding': 'true',
      },
      signal,
    });
    if (!response.ok) {
      return false;
    }
    const text = await response.text();
    return text.toUpperCase().split('\n').some((line) => line.startsWith(suffix));
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return false;
    }
    console.warn('Password breach check failed', error);
    return false;
  }
};

export const usePasswordValidation = (
  password: string,
  { securitySettings, recentPasswordHashes = [], enableBreachCheck = true }: UsePasswordValidationOptions,
): UsePasswordValidationResult => {
  const [validation, setValidation] = useState<PasswordValidation>(() =>
    validatePassword(password, {
      minimumLength: securitySettings.minimumLength,
      requireMixedCase: securitySettings.requireMixedCase,
      requireNumber: securitySettings.requireNumber,
      requireSymbol: securitySettings.requireSymbol,
    }),
  );
  const [compromised, setCompromised] = useState(false);
  const [checkingCompromise, setCheckingCompromise] = useState(false);
  const [reusedPassword, setReusedPassword] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    const runValidation = async () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const reused = await checkPasswordReuse(password, recentPasswordHashes);
      if (!isMounted) return;
      setReusedPassword(reused);

      const base = validatePassword(password, {
        minimumLength: securitySettings.minimumLength,
        requireMixedCase: securitySettings.requireMixedCase,
        requireNumber: securitySettings.requireNumber,
        requireSymbol: securitySettings.requireSymbol,
        reused,
      });

      setValidation((prev) => ({
        ...base,
        requirements: {
          ...base.requirements,
          isNotPwned: prev?.requirements?.isNotPwned ?? true,
        },
      }));

      if (!password || !enableBreachCheck) {
        setCompromised(false);
        setCheckingCompromise(false);
        return;
      }

      abortRef.current = new AbortController();
      setCheckingCompromise(true);
      const compromisedResult = await checkPasswordCompromise(password, abortRef.current.signal);
      if (!isMounted) return;
      setCompromised(compromisedResult);
      setValidation((current) => ({
        ...current,
        requirements: {
          ...current.requirements,
          isNotPwned: !compromisedResult,
        },
      }));
      setCheckingCompromise(false);
    };

    runValidation();

    return () => {
      isMounted = false;
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [password, securitySettings, recentPasswordHashes, enableBreachCheck]);

  const memoizedValidation = useMemo(() => validation, [validation]);

  const setIsCompromised = useCallback((value: boolean) => {
    setCompromised(value);
    setValidation((current) => ({
      ...current,
      requirements: {
        ...current.requirements,
        isNotPwned: !value,
      },
    }));
  }, []);

  return {
    validation: memoizedValidation,
    compromised,
    checkingCompromise,
    reusedPassword,
    setIsCompromised,
  };
};
