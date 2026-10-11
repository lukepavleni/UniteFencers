import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy via-navy to-brand p-6 text-navy-foreground shadow-lg sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-1/3 size-56 rounded-full bg-tone-amber/20 blur-3xl"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Icon className="size-6" />
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="text-sm text-white/85">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? (
          <div className="flex items-center gap-2 text-foreground">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
