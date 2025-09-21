import { useEffect, useState } from "react";
import { EmailValidationResult } from "../types/registration";
import { normalizeEmail, validateEmail } from "../utils/registration/email";

interface UseEmailValidationParams {
  email: string;
  enabled?: boolean;
}

interface UseEmailValidationResult extends EmailValidationResult {
  normalizedEmail: string;
}

export const useEmailValidation = ({
  email,
  enabled = true,
}: UseEmailValidationParams): UseEmailValidationResult => {
  const [result, setResult] = useState<EmailValidationResult>({
    isValid: false,
    isDisposable: false,
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setResult(validateEmail(email));
  }, [email, enabled]);

  return {
    ...result,
    normalizedEmail: normalizeEmail(email),
  };
};
