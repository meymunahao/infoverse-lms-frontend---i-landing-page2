import clsx from "clsx";

export interface ActionButton {
  label: string;
  href: string;
  description?: string;
  onClick?: () => void | Promise<void>;
}

export interface ActionButtonsProps {
  actions: ActionButton[];
  className?: string;
}

const buttonClasses =
  "flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-[#DD7C5E] px-5 py-3 text-lg font-semibold text-white shadow transition hover:translate-y-[-1px] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2563A] focus-visible:ring-offset-2";

export const ActionButtons = ({ actions, className }: ActionButtonsProps) => (
  <section aria-label="Quick actions" className={clsx("w-full", className)}>
    <div className="grid gap-3 md:grid-cols-3">
      {actions.map((action) => (
        <a
          key={action.href}
          href={action.href}
          onClick={action.onClick}
          className={buttonClasses}
        >
          <span className="text-center">
            <span className="block text-lg font-semibold">{action.label}</span>
            {action.description ? (
              <span className="mt-1 block text-sm font-normal text-white/90">{action.description}</span>
            ) : null}
          </span>
        </a>
      ))}
    </div>
  </section>
);

export default ActionButtons;
