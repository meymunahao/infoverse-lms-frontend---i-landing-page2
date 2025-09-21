import { z } from "zod";

import type { LoginCredentials, PasswordValidationResult } from "@/types/auth";

const COMMON_EMAIL_TYPO_DOMAINS = [
  "gamil.com",
  "gmial.com",
  "gnail.com",
  "hotnail.com",
  "outlok.com",
  "icloud.co",
];

const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /\d/,
  symbol: /[^a-zA-Z0-9]/,
};

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(PASSWORD_REQUIREMENTS.minLength, "Password must be at least 8 characters")
      .regex(PASSWORD_REQUIREMENTS.upper, "Include at least one uppercase letter")
      .regex(PASSWORD_REQUIREMENTS.lower, "Include at least one lowercase letter")
      .regex(PASSWORD_REQUIREMENTS.number, "Include at least one number")
      .regex(PASSWORD_REQUIREMENTS.symbol, "Include at least one symbol"),
    rememberMe: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    const domain = data.email.split("@")[1];
    if (domain && COMMON_EMAIL_TYPO_DOMAINS.includes(domain.toLowerCase())) {
      ctx.addIssue({
        path: ["email"],
        code: z.ZodIssueCode.custom,
        message: `Did you mean ${domain.replace(/i/, "o")}?`,
      });
    }
  });

export type LoginSchema = z.infer<typeof loginSchema>;

export const validateLoginPayload = (
  credentials: LoginCredentials,
): ReturnType<typeof loginSchema.safeParse> => {
  return loginSchema.safeParse(credentials);
};

export const validatePasswordStrength = (
  password: string,
): PasswordValidationResult => {
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push("Use at least 8 characters.");
  }
  if (!PASSWORD_REQUIREMENTS.upper.test(password)) {
    errors.push("Add an uppercase letter.");
  }
  if (!PASSWORD_REQUIREMENTS.lower.test(password)) {
    errors.push("Add a lowercase letter.");
  }
  if (!PASSWORD_REQUIREMENTS.number.test(password)) {
    errors.push("Include a number.");
  }
  if (!PASSWORD_REQUIREMENTS.symbol.test(password)) {
    errors.push("Include a special symbol.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
