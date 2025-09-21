"use client";

import { useAuthenticationContext } from "@/context/AuthenticationProvider";

export const useAuth = () => {
  const context = useAuthenticationContext();
  return context;
};
