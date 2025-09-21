import { useEffect, useState } from "react";
import { PasswordRequirements, PasswordStrengthResult } from "../types/registration";
import { defaultPasswordRequirements, getPasswordStrength } from "../utils/registration/password";

interface UsePasswordStrengthOptions {
  password: string;
  requirements?: PasswordRequirements;
}

export const usePasswordStrength = ({
  password,
  requirements = defaultPasswordRequirements,
}: UsePasswordStrengthOptions): PasswordStrengthResult => {
  const [result, setResult] = useState<PasswordStrengthResult>(() =>
    getPasswordStrength(password, requirements),
  );

  useEffect(() => {
    setResult(getPasswordStrength(password, requirements));
  }, [password, requirements]);

  return result;
};
