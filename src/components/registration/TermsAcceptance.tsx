interface TermsAcceptanceProps {
  acceptedTerms: boolean;
  marketingOptIn: boolean;
  onToggleTerms: (checked: boolean) => void;
  onToggleMarketing: (checked: boolean) => void;
}

export const TermsAcceptance = ({
  acceptedTerms,
  marketingOptIn,
  onToggleTerms,
  onToggleMarketing,
}: TermsAcceptanceProps) => (
  <div className="space-y-4">
    <label className="flex items-start gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={acceptedTerms}
        onChange={(event) => onToggleTerms(event.target.checked)}
        className="mt-1 h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
        required
      />
      <span>
        I agree to the
        <a className="ml-1 text-sky-600 underline-offset-2 hover:underline" href="/terms" target="_blank" rel="noreferrer">
          Terms of Service
        </a>
        ,
        <a className="ml-1 text-sky-600 underline-offset-2 hover:underline" href="/privacy" target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        , and confirm I'm over 13 years of age.
      </span>
    </label>

    <label className="flex items-start gap-3 text-sm text-slate-600">
      <input
        type="checkbox"
        checked={marketingOptIn}
        onChange={(event) => onToggleMarketing(event.target.checked)}
        className="mt-1 h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
      />
      <span>
        Keep me informed about personalized learning tips, product updates, and occasional promotions. You can unsubscribe at any
        time.
      </span>
    </label>
  </div>
);
