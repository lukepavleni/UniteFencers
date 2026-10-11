import { CalendarDays, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { formatDateShort } from "~/lib/trips";

export function DashboardHero({
  firstName,
  nacName,
  city,
  venue,
  startDate,
  endDate,
  actions,
}: {
  firstName?: string;
  nacName: string;
  city?: string;
  venue?: string;
  startDate?: string;
  endDate?: string;
  actions: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-navy p-6 text-navy-foreground shadow-lg sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-hands.webp)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/90 via-navy/70 to-navy/40"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {firstName ? `Hi ${firstName} — ` : ""}find service near your
            fencing schedule
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/85">
            <span className="font-semibold text-white">{nacName}</span>
            {city ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {city}
                {venue ? ` · ${venue}` : ""}
              </span>
            ) : null}
            {startDate && endDate ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatDateShort(startDate)} – {formatDateShort(endDate)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2 text-foreground">{actions}</div>
      </div>
    </section>
  );
}
