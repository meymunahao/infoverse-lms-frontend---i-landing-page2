import { RecoveryResponse, SecuritySettings } from "../types/passwordRecovery";

export const defaultSecuritySettings: SecuritySettings = {
  maxAttemptsPerHour: 5,
  tokenExpiryMinutes: 20,
  cooldownPeriodMinutes: 5,
  requireAccountExistence: false,
  enableDeliveryTracking: true,
};

export const calculateProgressiveDelay = (attempts: number): number => {
  if (attempts <= 1) return 0;
  const baseDelay = 3000;
  const multiplier = Math.min(attempts - 1, 5);
  return baseDelay * multiplier;
};

export const deriveRateLimitMessage = (
  response?: RecoveryResponse,
  cooldownRemaining?: number,
): string | null => {
  if (cooldownRemaining && cooldownRemaining > 0) {
    const minutes = Math.ceil(cooldownRemaining / 60_000);
    return `Too many attempts. Try again in about ${minutes} minute${minutes > 1 ? "s" : ""}.`;
  }

  if (response?.rateLimitInfo && response.rateLimitInfo.attemptsRemaining <= 1) {
    return "You are nearing the maximum number of recovery attempts allowed per hour.";
  }

  return null;
};

export const shouldTriggerCaptcha = (
  attemptsWithinWindow: number,
  settings: SecuritySettings,
): boolean => attemptsWithinWindow >= Math.max(3, settings.maxAttemptsPerHour - 1);

export const getCooldownTarget = (
  lastAttempt: Date | null,
  settings: SecuritySettings,
): Date | null => {
  if (!lastAttempt) return null;
  return new Date(lastAttempt.getTime() + settings.cooldownPeriodMinutes * 60_000);
};

export const formatEstimatedDelivery = (minutes?: number): string | null => {
  if (typeof minutes !== "number") return null;
  if (minutes < 1) return "The reset email should arrive momentarily.";
  if (minutes <= 5) return "Expect the reset email within the next few minutes.";
  return `The reset email typically arrives within ${minutes} minutes.`;
};
