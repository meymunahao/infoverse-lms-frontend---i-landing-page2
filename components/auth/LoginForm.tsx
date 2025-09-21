"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { FormValidation } from "@/components/auth/FormValidation";
import { PasswordToggle } from "@/components/auth/PasswordToggle";
import { RememberMeToggle } from "@/components/auth/RememberMeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { createCodeChallenge, createCodeVerifier } from "@/lib/security/pkce";
import { computeDeviceFingerprint } from "@/lib/security/device";
import { initiateSocialAuth } from "@/lib/api/auth";
import type { LoginCredentials, SocialAuthProvider } from "@/types/auth";
import { loginSchema, validatePasswordStrength } from "@/utils/validation/login";

const codeVerifierStorageKey = "infoverse.auth.pkce";

const socialProviders: SocialAuthProvider[] = [
  {
    name: "Google",
    provider: "google",
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    scopes: ["openid", "email", "profile"],
    buttonText: "Continue with Google",
    icon: "google",
    pkce: true,
  },
];

export const LoginForm: React.FC = () => {
  const {
    login,
    isLoading,
    error,
    rememberMe,
    setRememberMe,
    setError,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get("returnTo") ?? "/dashboard";

  const initialCredentials: LoginCredentials = useMemo(
    () => ({
      email: searchParams?.get("email") ?? "",
      password: "",
      rememberMe,
    }),
    [rememberMe, searchParams],
  );

  const { values, errors, setFieldValue, validate } = useFormValidation(
    loginSchema,
    initialCredentials,
  );

  useEffect(() => {
    if (initialCredentials.email !== values.email) {
      setFieldValue("email", initialCredentials.email);
    }
  }, [initialCredentials.email, setFieldValue, values.email]);

  useEffect(() => {
    setFieldValue("rememberMe", rememberMe);
  }, [rememberMe, setFieldValue]);

  useEffect(() => {
    if (error) {
      const timeout = window.setTimeout(() => setError(null), 6000);
      return () => window.clearTimeout(timeout);
    }
  }, [error, setError]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showMfaPrompt, setShowMfaPrompt] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const requiresCaptcha = loginAttempts >= 3;

  useEffect(() => {
    let cancelled = false;
    const resolveFingerprint = async () => {
      try {
        if (typeof window !== "undefined") {
          const stored = window.localStorage.getItem("infoverse.auth.device");
          if (stored) {
            setDeviceId(stored);
            return;
          }
        }

        const fingerprint = await computeDeviceFingerprint();
        if (!cancelled) {
          setDeviceId(fingerprint);
          if (typeof window !== "undefined") {
            window.localStorage.setItem("infoverse.auth.device", fingerprint);
          }
        }
      } catch (fingerprintError) {
        console.warn("Unable to derive device fingerprint", fingerprintError);
      }
    };

    void resolveFingerprint();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (values.password.length === 0) {
      setPasswordFeedback([]);
      return;
    }

    const feedback = validatePasswordStrength(values.password);
    setPasswordFeedback(feedback.isValid ? [] : feedback.errors);
  }, [values.password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const result = validate(values);
    if (!result.isValid) {
      setFormError("Review the highlighted fields and try again.");
      return;
    }

    if (requiresCaptcha && !captchaSolved) {
      setFormError("Please complete the security check before trying again.");
      return;
    }

    const response = await login({
      ...values,
      deviceId: deviceId ?? undefined,
    });
    if (response.requiresTwoFactor) {
      setShowMfaPrompt(true);
      setFormError(
        "Two-factor authentication required. Check your device or email for the verification code.",
      );
      return;
    }

    if (response.success) {
      router.replace(returnTo);
      setLoginAttempts(0);
      setCaptchaSolved(false);
    } else if (response.errors?.length) {
      setLoginAttempts((attempts) => attempts + 1);
      setFormError(response.errors[0]);
    }
  };

  const handleSocialAuthorize = async (provider: SocialAuthProvider) => {
    if (typeof window === "undefined") return;

    setSocialLoading(provider.provider);
    try {
      const verifier = createCodeVerifier();
      const challenge = await createCodeChallenge(verifier);
      window.sessionStorage.setItem(codeVerifierStorageKey, verifier);

      const redirectUri = `${window.location.origin}/api/auth/${provider.provider}/callback`;
      const { authorizationUrl } = await initiateSocialAuth(
        provider,
        redirectUri,
        challenge,
      );

      window.location.href = authorizationUrl;
    } catch (authError) {
      console.error("Social login failed", authError);
      setFormError(
        "We couldn’t start the social sign-in process. Please try again or use another method.",
      );
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6"
      noValidate
      aria-describedby={formError ? "login-form-error" : undefined}
    >
      {formError || error ? (
        <FormValidation
          id="login-form-error"
          messages={[formError ?? error ?? ""]}
          variant="error"
        />
      ) : null}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          value={values.email}
          onChange={(event) => setFieldValue("email", event.target.value)}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm transition focus-visible:border-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          aria-invalid={Boolean(errors.email?.length)}
          aria-describedby={errors.email?.length ? "email-error" : undefined}
        />
        {errors.email?.length ? (
          <FormValidation id="email-error" messages={errors.email} variant="error" showIcon={false} />
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-neutral-700">
            Password
          </label>
          <Link
            href={`/forgot-password?email=${encodeURIComponent(values.email)}`}
            className="text-sm font-semibold text-sky-600 underline-offset-4 transition hover:text-sky-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative flex items-center">
          <input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="current-password"
            required
            value={values.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pr-12 text-base text-neutral-900 shadow-sm transition focus-visible:border-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            aria-invalid={Boolean(errors.password?.length)}
            aria-describedby={[
              errors.password?.length ? "password-error" : null,
              passwordFeedback.length ? "password-feedback" : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <PasswordToggle
              isVisible={passwordVisible}
              onToggle={() => setPasswordVisible((visible) => !visible)}
            />
          </div>
        </div>
        {errors.password?.length ? (
          <FormValidation id="password-error" messages={errors.password} variant="error" showIcon={false} />
        ) : null}
        {passwordFeedback.length ? (
          <FormValidation
            id="password-feedback"
            messages={passwordFeedback}
            variant="info"
            showIcon={false}
          />
        ) : null}
      </div>

      <RememberMeToggle
        checked={values.rememberMe}
        onChange={(checked) => {
          setRememberMe(checked);
          setFieldValue("rememberMe", checked);
        }}
        description="Use only on personal or trusted devices."
      />

      {requiresCaptcha ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <p className="font-medium">We detected multiple unsuccessful attempts.</p>
          <p className="mt-1">Complete the security check to keep your account safe.</p>
          <button
            type="button"
            onClick={() => setCaptchaSolved(true)}
            disabled={captchaSolved}
            className="mt-3 inline-flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:bg-amber-400"
          >
            {captchaSolved ? "Security check completed" : "I'm not a robot"}
          </button>
        </div>
      ) : null}

      {showMfaPrompt ? (
        <FormValidation
          messages={["Extra verification required. Complete the MFA challenge to finish signing in."]}
          variant="info"
        />
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#DD7C5E] px-4 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#d26d4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d26d4b] disabled:cursor-not-allowed disabled:opacity-75"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : null}
        Log In
      </button>

      <p className="text-center text-sm text-neutral-600">
        Not a member yet?{" "}
        <Link
          href={`/signup?email=${encodeURIComponent(values.email)}`}
          className="font-semibold text-sky-600 underline-offset-4 transition hover:text-sky-700 hover:underline"
        >
          Sign up
        </Link>
      </p>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-300" aria-hidden />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          OR
        </span>
        <div className="h-px flex-1 bg-neutral-300" aria-hidden />
      </div>

      <div className="grid gap-3">
        {socialProviders.map((provider) => (
          <SocialAuthButton
            key={provider.provider}
            provider={provider}
            onAuthorize={handleSocialAuthorize}
            isLoading={socialLoading === provider.provider}
          />
        ))}
      </div>
    </form>
  );
};
