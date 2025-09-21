import { ExtendedRegistrationData, RegistrationResponse } from "../../types/registration";
import { hashPassword, normalizeRegistrationData } from "../../utils/registration/security";

const getProcessEnv = (): Record<string, string | undefined> | undefined => {
  if (typeof globalThis === "undefined") {
    return undefined;
  }

  const candidate = (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }).process;

  return candidate?.env;
};

const API_BASE =
  import.meta.env?.VITE_API_BASE_URL ?? getProcessEnv()?.NEXT_PUBLIC_API_BASE_URL ?? "/api";

interface RegistrationRequestPayload extends Omit<ExtendedRegistrationData, "password"> {
  passwordHash: string;
}

const withTimeout = async <T>(promise: Promise<T>, timeout = 12000): Promise<T> => {
  let timer: number;
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      timer = window.setTimeout(() => reject(new Error("Request timed out")), timeout);
    }),
  ]).finally(() => window.clearTimeout(timer));
};

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  try {
    const response = await withTimeout(
      fetch(`${API_BASE}/users/check-email?email=${encodeURIComponent(email)}`),
    );
    if (!response.ok) {
      return false;
    }
    const payload = (await response.json()) as { available: boolean };
    return payload.available;
  } catch (error) {
    console.error("Email availability check failed", error);
    return false;
  }
};

export const createRegistration = async (
  data: ExtendedRegistrationData,
): Promise<RegistrationResponse> => {
  const normalized = normalizeRegistrationData(data);
  const passwordHash = await hashPassword(normalized.password);

  const payload: RegistrationRequestPayload = {
    ...normalized,
    passwordHash,
  };

  try {
    const response = await withTimeout(
      fetch(`${API_BASE}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const result = (await response.json()) as RegistrationResponse;
    return result;
  } catch (error) {
    console.error("Registration request failed", error);
    return {
      success: false,
      verificationRequired: false,
      errors: [
        {
          field: "form",
          message: error instanceof Error ? error.message : "Unable to register right now",
          severity: "error",
        },
      ],
      nextSteps: ["Please try again or contact support."],
    };
  }
};

export const resendVerificationEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await withTimeout(
      fetch(`${API_BASE}/users/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }),
    );
    return response.ok;
  } catch (error) {
    console.error("Resend verification failed", error);
    return false;
  }
};

export const registerWithProvider = async (provider: "google"): Promise<RegistrationResponse> => {
  try {
    const response = await withTimeout(
      fetch(`${API_BASE}/auth/${provider}/start`, {
        method: "POST",
      }),
    );
    if (!response.ok) {
      throw new Error("Social authentication failed");
    }
    const payload = (await response.json()) as RegistrationResponse;
    return payload;
  } catch (error) {
    console.error("Social registration error", error);
    return {
      success: false,
      verificationRequired: false,
      errors: [
        {
          field: "social",
          message: "We couldn't connect to the provider. Please try again.",
          severity: "error",
        },
      ],
      nextSteps: [],
    };
  }
};
