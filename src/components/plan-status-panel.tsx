import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { VolunteerPlanListItem } from "~/components/volunteer-plan-list-item";
import type { VolunteerPlan } from "~/lib/trips";
import { parseKnownDurationHours } from "~/lib/volunteer-opportunities";

export function PlanStatusPanel({
  plans,
  durationByOpportunityId,
  canLogHours,
  logHoursAvailableFrom,
}: {
  plans: VolunteerPlan[];
  durationByOpportunityId: Map<string, string | null>;
  canLogHours: boolean;
  logHoursAvailableFrom: string | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your volunteering plans</CardTitle>
      </CardHeader>
      <CardContent>
        {plans.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {plans.map((plan) => {
              const knownHours = plan.opportunity_id
                ? parseKnownDurationHours(
                    durationByOpportunityId.get(plan.opportunity_id) ?? null,
                  )
                : null;

              return (
                <VolunteerPlanListItem
                  key={plan.id}
                  plan={plan}
                  showDistance={false}
                  canLogHours={canLogHours}
                  knownHours={knownHours}
                  logHoursAvailableFrom={logHoursAvailableFrom}
                  allowEditHours
                />
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No volunteering plans saved for this trip yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
