import type {
  LoginCredentials,
  LoginResponse,
  SocialAuthProvider,
  User,
} from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: User;
  sessionId?: string;
  requiresTwoFactor?: boolean;
  mfaMethods?: string[];
}

const jsonHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  return (await response.json()) as T;
}

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await parseResponse<TokenResponse | LoginResponse>(response);

  if ("accessToken" in data) {
    return {
      success: true,
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      requiresTwoFactor: data.requiresTwoFactor,
      mfaMethods: data.mfaMethods,
      sessionId: data.sessionId,
    };
  }

  return data;
};

export const refreshSession = async (): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await parseResponse<TokenResponse | LoginResponse>(response);

  if ("accessToken" in data) {
    return {
      success: true,
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      sessionId: data.sessionId,
      requiresTwoFactor: data.requiresTwoFactor,
    };
  }

  return data;
};

export const getActiveSession = async (): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/session`, {
    method: "GET",
    credentials: "include",
    headers: jsonHeaders,
  });

  return await parseResponse<LoginResponse>(response);
};

export const completeLogout = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/password/forgot`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email }),
  });
};

export const verifyTwoFactor = async (
  sessionId: string,
  otp: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/mfa/verify`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({ sessionId, otp }),
  });

  return await parseResponse<LoginResponse>(response);
};

export const initiateSocialAuth = async (
  provider: SocialAuthProvider,
  redirectUri: string,
  codeChallenge: string,
): Promise<{ authorizationUrl: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/${provider.provider}/init`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({
      clientId: provider.clientId,
      scopes: provider.scopes,
      redirectUri,
      codeChallenge,
    }),
  });

  return await parseResponse<{ authorizationUrl: string }>(response);
};

export const completeSocialAuth = async (
  provider: SocialAuthProvider,
  redirectUri: string,
  code: string,
  codeVerifier: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/${provider.provider}/callback`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({
      code,
      codeVerifier,
      redirectUri,
    }),
  });

  return await parseResponse<LoginResponse>(response);
};

export const registerTrustedDevice = async (
  deviceName: string,
): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/devices`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({ deviceName }),
  });
};
