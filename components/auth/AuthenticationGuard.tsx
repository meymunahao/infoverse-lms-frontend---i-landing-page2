"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface AuthenticationGuardProps extends PropsWithChildren {
  fallback?: React.ReactNode;
  allowUnauthenticated?: boolean;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  children,
  fallback,
  allowUnauthenticated = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (allowUnauthenticated || isLoading) {
      return;
    }

    if (!isAuthenticated) {
      const search = new URLSearchParams({ returnTo: pathname ?? "/" });
      router.replace(`/login?${search.toString()}`);
    }
  }, [allowUnauthenticated, isAuthenticated, isLoading, pathname, router]);

  if (allowUnauthenticated) {
    return <>{children}</>;
  }

  if (!isAuthenticated && !isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
