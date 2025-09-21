import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ElementType } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  loading?: boolean;
  icon?: ElementType;
  iconPosition?: "start" | "end";
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      children,
      className,
      variant = "solid",
      loading = false,
      disabled,
      icon: Icon,
      iconPosition = "start",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled ?? loading;

    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variant === "solid"
            ? "bg-[#DD7C5E] text-white shadow-sm hover:bg-[#c86d50] focus-visible:ring-[#DD7C5E]"
            : "border border-[#DD7C5E] bg-white text-[#DD7C5E] hover:bg-[#fde7df] focus-visible:ring-[#f1b7a3]",
          isDisabled && "cursor-not-allowed opacity-70",
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : Icon ? (
          <Icon
            className={clsx("h-4 w-4", iconPosition === "end" && "order-last")}
            aria-hidden="true"
          />
        ) : null}
        <span className="whitespace-nowrap">{children}</span>
      </button>
    );
  },
);

ActionButton.displayName = "ActionButton";
