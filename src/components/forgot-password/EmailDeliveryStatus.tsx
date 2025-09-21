interface EmailDeliveryStatusProps {
  status: "idle" | "queued" | "sent" | "delivered" | "delayed";
  estimatedDeliveryCopy: string | null;
}

const statusCopy: Record<EmailDeliveryStatusProps["status"], { title: string; description: string }> = {
  idle: {
    title: "Awaiting request",
    description: "Submit the form to begin the secure password reset process.",
  },
  queued: {
    title: "Request queued",
    description: "We are generating your single-use, time-limited password reset link.",
  },
  sent: {
    title: "Email sent",
    description: "Your email provider has accepted the reset instructions for delivery.",
  },
  delivered: {
    title: "Delivered",
    description: "Most reset emails arrive within moments. Follow the link to continue.",
  },
  delayed: {
    title: "Delivery delay",
    description: "Delivery is taking longer than expected. Check spam folders or contact support if you do not receive it soon.",
  },
};

const statusSteps: Array<{ key: "queued" | "sent" | "delivered" | "delayed"; label: string }> = [
  { key: "queued", label: "Queued" },
  { key: "sent", label: "Sent" },
  { key: "delivered", label: "Delivered" },
];

const statusIndex: Record<EmailDeliveryStatusProps["status"], number> = {
  idle: -1,
  queued: 0,
  sent: 1,
  delivered: 2,
  delayed: 1.5,
};

export const EmailDeliveryStatus = ({ status, estimatedDeliveryCopy }: EmailDeliveryStatusProps) => {
  const { title, description } = statusCopy[status];
  const activeThreshold = statusIndex[status];

  return (
    <div className="mt-8 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-sm font-semibold text-sky-900">{title}</h3>
          <p className="mt-2 text-sm text-neutral-600">{description}</p>
          {estimatedDeliveryCopy && status !== "idle" && (
            <p className="mt-3 text-sm font-medium text-sky-700">{estimatedDeliveryCopy}</p>
          )}
        </div>
        <div className="flex items-center gap-2" aria-hidden>
          {statusSteps.map((step, index) => {
            const isDelayed = status === "delayed" && index === 2;
            const isActive = activeThreshold >= index || isDelayed;
            const baseClasses = "h-2 w-10 rounded-full transition-colors";
            const activeClasses = isDelayed
              ? "bg-amber-400"
              : index === 2
                ? "bg-emerald-500"
                : "bg-sky-500";
            const inactiveClasses = "bg-neutral-200";

            return <span key={step.key} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailDeliveryStatus;
