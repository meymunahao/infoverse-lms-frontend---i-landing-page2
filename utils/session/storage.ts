import type { SessionMetadata } from "@/types/auth";

const STORAGE_KEY = "infoverse.auth.session-metadata";

type StoredMetadata = Omit<SessionMetadata, "expiresAt" | "issuedAt"> & {
  expiresAt: string;
  issuedAt: string;
};

const canUseWindow = (): boolean => typeof window !== "undefined";

export const persistSessionMetadata = (metadata: SessionMetadata): void => {
  if (!canUseWindow()) return;

  const payload: StoredMetadata = {
    ...metadata,
    expiresAt: metadata.expiresAt.toISOString(),
    issuedAt: metadata.issuedAt.toISOString(),
  };

  const storage = metadata.expiresAt.getTime() - Date.now() > 24 * 60 * 60 * 1000
    ? window.localStorage
    : window.sessionStorage;

  storage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const getStoredSessionMetadata = (): SessionMetadata | null => {
  if (!canUseWindow()) return null;

  const stored =
    window.sessionStorage.getItem(STORAGE_KEY) ??
    window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const metadata: StoredMetadata = JSON.parse(stored);
    return {
      ...metadata,
      expiresAt: new Date(metadata.expiresAt),
      issuedAt: new Date(metadata.issuedAt),
    };
  } catch (error) {
    console.warn("Unable to parse stored session metadata", error);
    clearStoredSessionMetadata();
    return null;
  }
};

export const clearStoredSessionMetadata = (): void => {
  if (!canUseWindow()) return;

  window.sessionStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(STORAGE_KEY);
};
