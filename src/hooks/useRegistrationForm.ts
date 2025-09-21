import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { ExtendedRegistrationData, RegistrationResponse, ValidationError } from "../types/registration";
import { useEmailValidation } from "./useEmailValidation";
import { usePasswordStrength } from "./usePasswordStrength";
import { useRegistrationAnalytics } from "./useRegistrationAnalytics";
import { applyRateLimiting, captureValidationErrors, isSuspectedBot } from "../utils/registration/security";
import { defaultPasswordRequirements, getPasswordErrors } from "../utils/registration/password";
import { createRegistration, checkEmailAvailability } from "../lib/api/registration";

const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Please enter your full name")
      .max(80, "Name is too long")
      .regex(/^[A-Za-zÀ-ž ,.'-]+$/, "Use only letters and spaces"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(defaultPasswordRequirements.minLength, `Use at least ${defaultPasswordRequirements.minLength} characters`)
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/\d/, "Include a number")
      .regex(/[^a-zA-Z0-9]/, "Include a special character"),
    accountType: z.enum(["student", "tutor", "parent"], {
      errorMap: () => ({ message: "Select your role" }),
    }),
    acceptedTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
    marketingOptIn: z.boolean().optional(),
    referralSource: z.string().max(80).optional(),
    learningGoals: z.string().max(180).optional(),
    experienceLevel: z.string().max(80).optional(),
    honeypot: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (/\d/.test(data.fullName)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Names cannot contain numbers",
        path: ["fullName"],
      });
    }
  });

const DEFAULT_FORM_DATA: ExtendedRegistrationData = {
  fullName: "",
  email: "",
  password: "",
  accountType: "student",
  acceptedTerms: false,
  marketingOptIn: true,
  referralSource: "",
  learningGoals: "",
  experienceLevel: "",
  honeypot: "",
};

interface UseRegistrationFormOptions {
  onSuccess?: (response: RegistrationResponse) => void;
  onError?: (errors: ValidationError[]) => void;
}

export const useRegistrationForm = ({
  onSuccess,
  onError,
}: UseRegistrationFormOptions = {}) => {
  const [formData, setFormData] = useState<ExtendedRegistrationData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, ValidationError>>({});
  const [status, setStatus] = useState<"idle" | "validating" | "submitting" | "success" | "error">("idle");
  const [response, setResponse] = useState<RegistrationResponse | null>(null);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const { trackEvent } = useRegistrationAnalytics();

  const passwordStrength = usePasswordStrength({ password: formData.password });
  const emailValidation = useEmailValidation({ email: formData.email, enabled: true });

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_FORM_DATA);
    setErrors({});
    setStatus("idle");
  }, []);

  useEffect(() => {
    if (!formData.email || !emailValidation.isValid) {
      setDuplicateEmail(false);
      return;
    }

    let active = true;
    setIsCheckingEmail(true);

    checkEmailAvailability(emailValidation.normalizedEmail)
      .then((available) => {
        if (active) {
          setDuplicateEmail(!available);
        }
      })
      .finally(() => {
        if (active) {
          setIsCheckingEmail(false);
        }
      });

    return () => {
      active = false;
    };
  }, [formData.email, emailValidation.normalizedEmail, emailValidation.isValid]);

  const aggregatedErrors = useMemo(() => Object.values(errors), [errors]);

  const updateField = useCallback(<K extends keyof ExtendedRegistrationData>(key: K, value: ExtendedRegistrationData[K]) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  }, []);

  const validateForm = useCallback(
    async (data: ExtendedRegistrationData): Promise<ValidationError[]> => {
      const validation = registrationSchema.safeParse(data);

      const validationErrors: ValidationError[] = [];

      if (!validation.success) {
        validation.error.issues.forEach((issue) => {
          validationErrors.push({
            field: issue.path.join("."),
            message: issue.message,
            severity: "error",
          });
        });
      }

      validationErrors.push(...getPasswordErrors(data.password));

      if (duplicateEmail) {
        validationErrors.push({
          field: "email",
          message: "This email is already registered. Try signing in instead.",
          severity: "error",
          suggestion: "Use the password reset option if you've forgotten your credentials.",
        });
      }

      if (emailValidation.isDisposable) {
        validationErrors.push({
          field: "email",
          message: "Disposable email addresses are blocked for security reasons.",
          severity: "error",
        });
      }

      return validationErrors;
    },
    [duplicateEmail, emailValidation.isDisposable],
  );

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (isSuspectedBot(formData)) {
        setErrors({
          honeypot: {
            field: "honeypot",
            message: "Bot detection triggered.",
            severity: "error",
          },
        });
        setStatus("error");
        return;
      }

      if (applyRateLimiting()) {
        setErrors({
          form: {
            field: "form",
            message: "Too many attempts. Please wait before trying again.",
            severity: "error",
          },
        });
        setStatus("error");
        return;
      }

      setStatus("validating");
      const validationErrors = await validateForm(formData);

      if (validationErrors.length > 0) {
        setErrors(captureValidationErrors(validationErrors));
        setStatus("error");
        onError?.(validationErrors);
        return;
      }

      try {
        setStatus("submitting");
        trackEvent({ name: "form", status: "submitted", metadata: { accountType: formData.accountType } });
        const result = await createRegistration(formData);
        setResponse(result);

        if (result.success) {
          setStatus("success");
          trackEvent({ name: "form", status: "succeeded", metadata: { verificationRequired: result.verificationRequired } });
          onSuccess?.(result);
        } else {
          setStatus("error");
          if (result.errors) {
            setErrors(captureValidationErrors(result.errors));
            onError?.(result.errors);
          }
        }
      } catch (error) {
        console.error("Unexpected registration error", error);
        setStatus("error");
        const fallbackError: ValidationError = {
          field: "form",
          message: "We ran into an unexpected issue. Please try again soon.",
          severity: "error",
        };
        setErrors({ form: fallbackError });
        onError?.([fallbackError]);
      }
    },
    [formData, onError, onSuccess, trackEvent, validateForm],
  );

  useEffect(() => {
    trackEvent({ name: "view", status: "started" });
  }, [trackEvent]);

  useEffect(() => {
    if (emailValidation.message) {
      setErrors((prev) => ({
        ...prev,
        email: {
          field: "email",
          message: emailValidation.message!,
          severity: emailValidation.isDisposable ? "warning" : "error",
          suggestion: emailValidation.suggestion,
        },
      }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  }, [emailValidation.isDisposable, emailValidation.message, emailValidation.suggestion]);

  return {
    formData,
    errors,
    aggregatedErrors,
    status,
    response,
    duplicateEmail,
    emailSuggestion: emailValidation.suggestion,
    isCheckingEmail,
    passwordStrength,
    updateField,
    handleSubmit,
    resetForm,
  };
};
