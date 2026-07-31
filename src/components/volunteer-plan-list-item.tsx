import { StatusBadge } from "~/components/status-badge";
import { formatDate, type VolunteerPlan } from "~/lib/trips";
import { cn } from "~/lib/utils";

export function VolunteerPlanListItem({
  plan,
  showDistance = true,
  className,
}: {
  plan: VolunteerPlan;
  showDistance?: boolean;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex flex-col gap-2 rounded-md border border-border p-3 text-sm sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <p className="font-medium">{plan.opportunity_name}</p>
        <p className="text-muted-foreground">{plan.organization}</p>
        <p className="text-muted-foreground">
          {formatDate(plan.opportunity_date)}
          {plan.opportunity_time ? ` · ${plan.opportunity_time}` : ""}
          {showDistance && plan.distance_from_tournament
            ? ` · ${plan.distance_from_tournament}`
            : ""}
        </p>
      </div>
      <StatusBadge status={plan.status} />
    </li>
  );
}
