import { EmailValidationResult } from "../../types/registration";

const EMAIL_REGEX =
  /^(?:[a-zA-Z0-9_'^&%+`{}~!-]+(?:\.[a-zA-Z0-9_'^&%+`{}~!-]+)*|"(?:[^"]|\\.)+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const COMMON_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "protonmail.com",
  "edu.com",
];

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "throwawaymail.com",
  "yopmail.com",
]);

const MAX_DISTANCE_FOR_SUGGESTION = 2;

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0),
  );

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] =
          Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
      }
    }
  }

  return matrix[a.length][b.length];
}

export const validateEmailFormat = (email: string): boolean => EMAIL_REGEX.test(email);

export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
};

export const suggestEmailDomain = (email: string): string | undefined => {
  if (!email.includes("@")) {
    return undefined;
  }

  const [local, domain] = email.split("@");
  if (!domain) {
    return undefined;
  }

  let bestMatch: { domain: string; distance: number } | null = null;

  for (const commonDomain of COMMON_EMAIL_DOMAINS) {
    const distance = levenshteinDistance(domain.toLowerCase(), commonDomain);
    if (distance <= MAX_DISTANCE_FOR_SUGGESTION) {
      if (!bestMatch || distance < bestMatch.distance) {
        bestMatch = { domain: commonDomain, distance };
      }
    }
  }

  return bestMatch ? `${local}@${bestMatch.domain}` : undefined;
};

export const validateEmail = (email: string): EmailValidationResult => {
  if (!email) {
    return {
      isValid: false,
      isDisposable: false,
      message: "Email is required",
    };
  }

  const trimmed = email.trim();
  const isValid = validateEmailFormat(trimmed);
  const isDisposable = isDisposableEmail(trimmed);
  const suggestion = suggestEmailDomain(trimmed);

  return {
    isValid,
    isDisposable,
    suggestion: isValid ? suggestion : undefined,
    message: !isValid
      ? "Please enter a valid email address"
      : isDisposable
        ? "Disposable email addresses are not supported"
        : undefined,
  };
};

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();
