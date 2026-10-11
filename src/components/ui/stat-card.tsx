import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export type StatTone = "sky" | "emerald" | "amber" | "violet" | "brand";

const TONE_STYLES: Record<
  StatTone,
  { card: string; chip: string; value: string }
> = {
  sky: {
    card: "border-tone-sky/30 bg-tone-sky/10",
    chip: "bg-tone-sky text-white",
    value: "text-tone-sky",
  },
  emerald: {
    card: "border-tone-emerald/30 bg-tone-emerald/10",
    chip: "bg-tone-emerald text-white",
    value: "text-tone-emerald",
  },
  amber: {
    card: "border-tone-amber/30 bg-tone-amber/10",
    chip: "bg-tone-amber text-white",
    value: "text-tone-amber",
  },
  violet: {
    card: "border-tone-violet/30 bg-tone-violet/10",
    chip: "bg-tone-violet text-white",
    value: "text-tone-violet",
  },
  brand: {
    card: "border-brand/30 bg-brand/10",
    chip: "bg-brand text-brand-foreground",
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
