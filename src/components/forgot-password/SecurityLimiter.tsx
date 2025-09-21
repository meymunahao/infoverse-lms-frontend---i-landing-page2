interface SecurityLimiterProps {
  attemptsRemaining: number;
  cooldownRemaining: number;
  captchaRequired: boolean;
  rateLimitMessage: string | null;
}

const formatDuration = (milliseconds: number) => {
  if (!milliseconds) return "";
  const minutes = Math.floor(milliseconds / 60_000);
  const seconds = Math.ceil((milliseconds % 60_000) / 1000);

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}${seconds > 0 ? ` ${seconds} seconds` : ""}`;
  }

  return `${seconds} seconds`;
};

export const SecurityLimiter = ({
  attemptsRemaining,
  cooldownRemaining,
  captchaRequired,
  rateLimitMessage,
}: SecurityLimiterProps) => {
  if (!rateLimitMessage && !captchaRequired && cooldownRemaining <= 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
      <div className="flex items-center gap-2 font-medium">
        <span aria-hidden className="text-base">⚠️</span>
        Security notice
      </div>
      {rateLimitMessage && <p className="mt-2">{rateLimitMessage}</p>}
      {cooldownRemaining > 0 && (
        <p className="mt-2">
          Please wait approximately {formatDuration(cooldownRemaining)} before submitting another request.
        </p>
      )}
      {attemptsRemaining <= 1 && attemptsRemaining >= 0 && (
        <p className="mt-2">
          You have {attemptsRemaining} recovery attempt{attemptsRemaining === 1 ? "" : "s"} remaining in this window.
        </p>
      )}
      {captchaRequired && (
        <p className="mt-2">
          Additional verification may be required on your next attempt. Completing any security challenge helps us protect your account.
        </p>
      )}
    </div>
  );
};

export default SecurityLimiter;
