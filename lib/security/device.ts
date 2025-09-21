const encoder = new TextEncoder();

const hashString = async (input: string): Promise<string> => {
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const computeDeviceFingerprint = async (): Promise<string> => {
  if (typeof window === "undefined") {
    return crypto.randomUUID();
  }

  const navigatorInfo = `${navigator.userAgent}|${navigator.language}|${navigator.platform}|${navigator.hardwareConcurrency}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "unknown";
  const screenInfo = `${window.screen.width}x${window.screen.height}|${window.screen.colorDepth}`;

  return await hashString(`${navigatorInfo}|${timezone}|${screenInfo}`);
};
