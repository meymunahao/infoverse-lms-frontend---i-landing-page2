import "./globals.css";

import React from "react";

import { Providers } from "./providers";

export const metadata = {
  title: "Infoverse LMS – Secure Login",
  description:
    "Sign in to Infoverse LMS with enterprise-grade security, social login, and accessibility-first design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className="min-h-screen bg-neutral-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
