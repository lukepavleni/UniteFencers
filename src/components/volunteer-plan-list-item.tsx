import { removeVolunteerPlan } from "~/app/trips/actions";
import { StatusBadge } from "~/components/status-badge";
import { Button } from "~/components/ui/button";
import { formatDate, type VolunteerPlan } from "~/lib/trips";
import { cn } from "~/lib/utils";

export function VolunteerPlanListItem({
  plan,
  showDistance = true,
  showActions = false,
  className,
}: {
  plan: VolunteerPlan;
  showDistance?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  const when = plan.opportunity_date
    ? formatDate(plan.opportunity_date)
    : (plan.event_date_time ?? "Date TBA");

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
          {when}
          {plan.opportunity_time ? ` · ${plan.opportunity_time}` : ""}
          {showDistance && plan.distance_from_tournament
            ? ` · ${plan.distance_from_tournament}`
            : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={plan.status} />
        {showActions && (
          <>
            {plan.signup_url && (
              <Button asChild size="xs" variant="outline">
                <a
                  href={plan.signup_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage signup
                </a>
              </Button>
            )}
            <form action={removeVolunteerPlan.bind(null, plan.id)}>
              <Button
                type="submit"
                size="xs"
                variant="ghost"
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </form>
          </>
        )}
      </div>
    </li>
  );
}
