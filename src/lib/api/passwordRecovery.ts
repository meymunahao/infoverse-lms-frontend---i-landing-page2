import { PasswordResetRequest, RecoveryResponse } from "../../types/passwordRecovery";

const API_ENDPOINT = "/api/auth/password/reset";

export const requestPasswordReset = async (
  payload: PasswordResetRequest,
): Promise<RecoveryResponse> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Unable to process password recovery request.";

    try {
      const body = (await response.json()) as Partial<RecoveryResponse> & { message?: string };
      if (body?.message) {
        message = body.message;
      }
    } catch (error) {
      console.error("Failed to parse password recovery error response", error);
    }

    throw new Error(message);
  }

  const result = (await response.json()) as RecoveryResponse;
  return result;
};
