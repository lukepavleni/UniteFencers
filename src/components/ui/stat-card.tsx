import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export type StatTone = "sky" | "emerald" | "amber" | "violet" | "brand";

const TONE_STYLES: Record<
  StatTone,
  { card: string; chip: string; value: string }
> = {
  sky: {
    card: "border-tone-sky/50 bg-tone-sky/15",
    chip: "bg-tone-sky text-white",
    value: "text-tone-sky",
  },
  emerald: {
    card: "border-navy/40 bg-[oklch(0.9_0.05_258)]",
    chip: "bg-navy text-white",
    value: "text-navy",
  },
  amber: {
    card: "border-brand/50 bg-brand/15",
    chip: "bg-brand text-white",
    value: "text-brand",
  },
  violet: {
    card: "border-[oklch(0.35_0_0)]/40 bg-[oklch(0.93_0_0)]",
    chip: "bg-[oklch(0.35_0_0)] text-white",
    value: "text-[oklch(0.35_0_0)]",
  },
  brand: {
    card: "border-brand/50 bg-brand/15",
    chip: "bg-brand text-white",
    value: "text-brand",
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "sky",
}: {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  tone?: StatTone;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <Card className={cn("py-4 shadow-sm", styles.card)}>
      <CardContent className="flex items-center gap-4">
        {Icon ? (
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl shadow-sm",
              styles.chip,
            )}
          >
            <Icon className="size-5" />
          </span>
        ) : null}
        <div className="min-w-0">
          <p className={cn("text-3xl font-bold tracking-tight", styles.value)}>
            {value}
          </p>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
