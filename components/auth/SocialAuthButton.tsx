"use client";

import { Chrome, Github, Landmark, Loader2, UserRound } from "lucide-react";
import React from "react";

import type { SocialAuthProvider } from "@/types/auth";

const providerIcons: Record<SocialAuthProvider["provider"], React.ComponentType<{
  className?: string;
}>> = {
  google: Chrome,
  facebook: Landmark,
  github: Github,
  microsoft: UserRound,
};

interface SocialAuthButtonProps {
  provider: SocialAuthProvider;
  onAuthorize: (provider: SocialAuthProvider) => Promise<void> | void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onAuthorize,
  disabled,
  isLoading,
}) => {
  const Icon = providerIcons[provider.provider] ?? Chrome;

  return (
    <button
      type="button"
      onClick={() => onAuthorize(provider)}
      disabled={disabled || isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-sky-200 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
      ) : (
        <Icon className="h-5 w-5" aria-hidden />
      )}
      <span>{provider.buttonText}</span>
    </button>
  );
};
