import { useCallback, useEffect, useMemo, useState } from "react";
import { EmailValidation } from "../types/passwordRecovery";
import { inferMxCheck, validateEmailAddress } from "../utils/emailValidation";

const emptyValidation: EmailValidation = {
  isValid: false,
  errors: [],
  suggestions: [],
  domain: "",
  isDisposable: false,
  isRole: false,
};

export const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState<EmailValidation>(emptyValidation);
  const [isCheckingMx, setIsCheckingMx] = useState(false);
  const [mxVerified, setMxVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (!email) {
      setValidation(emptyValidation);
      setMxVerified(null);
      return;
    }

    const result = validateEmailAddress(email);
    setValidation(result);

    if (result.domain && result.isValid) {
      setIsCheckingMx(true);
      inferMxCheck(result.domain)
        .then((isValid) => setMxVerified(isValid))
        .finally(() => setIsCheckingMx(false));
    } else {
      setMxVerified(null);
    }
  }, [email]);

  const resetValidation = useCallback(() => {
    setValidation(emptyValidation);
    setMxVerified(null);
  }, []);

  const isValid = useMemo(() => {
    if (!email) return false;
    if (!validation.isValid) return false;
    if (mxVerified === false) return false;
    return true;
  }, [email, validation.isValid, mxVerified]);

  return {
    email,
    setEmail,
    validation,
    isValid,
    isCheckingMx,
    mxVerified,
    resetValidation,
  };
};
