interface SuccessMessageProps {
  message: string;
  estimatedDeliveryCopy: string | null;
  onResend?: () => void;
}

export const SuccessMessage = ({ message, estimatedDeliveryCopy, onResend }: SuccessMessageProps) => {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <span aria-hidden className="text-2xl">✅</span>
        Request received
      </div>
      <p className="mt-3 text-sm leading-relaxed text-emerald-700">{message}</p>
      {estimatedDeliveryCopy && (
        <p className="mt-3 text-sm leading-relaxed text-emerald-700">{estimatedDeliveryCopy}</p>
      )}
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
        <li>Look for an email from security@infoverse.com with the subject "Reset your Infoverse password".</li>
        <li>Reset links expire within 20 minutes and can only be used once.</li>
        <li>If you do not see the email, check spam or quarantine folders and mark the message as safe.</li>
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <a href="/" className="font-medium text-sky-700 underline underline-offset-2">
          Return to login
        </a>
        <a href="mailto:support@infoverse.com" className="text-sky-600 hover:text-sky-700">
          Contact support
        </a>
        {onResend && (
          <button
            type="button"
            onClick={onResend}
            className="rounded-full border border-emerald-300 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-800"
          >
            Resend email
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage;
