import { EmailValidation } from "../types/passwordRecovery";

const roleAccounts = new Set([
  "admin",
  "support",
  "info",
  "help",
  "sales",
  "security",
]);

const disposableDomains = new Set([
  "mailinator.com",
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
  "yopmail.com",
]);

const commonDomainTypos: Record<string, string> = {
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gnail.com": "gmail.com",
  "hotnail.com": "hotmail.com",
  "yaho.com": "yahoo.com",
  "outlok.com": "outlook.com",
};

const emailRegex =
  /^(?![_.+-])([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/;

export const validateEmailAddress = (email: string): EmailValidation => {
  const normalized = email.trim().toLowerCase();
  const [localPart = "", domain = ""] = normalized.split("@");

  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!normalized) {
    errors.push("Email is required.");
  } else if (!emailRegex.test(normalized)) {
    errors.push("Enter a valid email address using letters, numbers, and @ symbol.");
  }

  if (domain && commonDomainTypos[domain]) {
    suggestions.push(`Did you mean ${commonDomainTypos[domain]}?`);
  }

  if (domain) {
    const domainParts = domain.split(".");
    if (domainParts.length < 2) {
      errors.push("Email domain is incomplete.");
    }
  }

  if (domain && disposableDomains.has(domain)) {
    errors.push("Disposable email addresses are not supported for password recovery.");
  }

  let localNormalized = "";
  if (localPart) {
    localNormalized = localPart.replace(/[^a-zA-Z]/g, "");
    if (roleAccounts.has(localNormalized)) {
      suggestions.push(
        "We recommend using a personal email address instead of a shared role account.",
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    suggestions,
    domain,
    isDisposable: domain ? disposableDomains.has(domain) : false,
    isRole: Boolean(localNormalized && roleAccounts.has(localNormalized)),
  };
};

export const inferMxCheck = async (domain: string): Promise<boolean> => {
  if (!domain) return false;
  await new Promise((resolve) => setTimeout(resolve, 350));
  return !disposableDomains.has(domain);
};

export const normalizeEmailForRequest = (email: string): string => email.trim().toLowerCase();
