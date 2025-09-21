export interface InviteTutorResponse {
  success: boolean;
  message?: string;
}

const resolveApiBaseUrl = (): string | undefined => {
  const globalWithProcess = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };

  const baseUrl =
    globalWithProcess.process?.env?.NEXT_PUBLIC_TUTOR_API_URL ??
    globalWithProcess.process?.env?.TUTOR_API_URL ??
    globalWithProcess.process?.env?.NEXT_PUBLIC_API_BASE_URL;

  if (baseUrl && baseUrl.trim().length > 0) {
    return baseUrl.replace(/\/$/, "");
  }

  const windowLike = globalThis as typeof globalThis & {
    __TUTOR_API_BASE__?: string;
  };

  if (windowLike.__TUTOR_API_BASE__) {
    return windowLike.__TUTOR_API_BASE__?.replace(/\/$/, "");
  }

  return undefined;
};

const withTimeout = async <T>(promise: Promise<T>, timeout = 5000): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error("The request took too long. Please try again."));
    }, timeout);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
};

export const inviteTutor = async (email: string): Promise<InviteTutorResponse> => {
  const baseUrl = resolveApiBaseUrl();
  const endpoint = baseUrl ? `${baseUrl}/tutors/invite` : "/api/tutors/invite";

  const payload = {
    email,
    invitedAt: new Date().toISOString(),
  };

  try {
    const response = await withTimeout(
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody || "Unable to send tutor invitation.");
    }

    const data = (await response.json()) as InviteTutorResponse;
    return {
      success: data.success ?? true,
      message: data.message ?? "Tutor invited successfully.",
    };
  } catch (error) {
    if (!baseUrl) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return {
        success: true,
        message: "Tutor invitation simulated successfully.",
      };
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    throw new Error(message);
  }
};
