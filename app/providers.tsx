"use client";

import React, { PropsWithChildren } from "react";

import { AuthenticationProvider } from "@/context/AuthenticationProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
};
