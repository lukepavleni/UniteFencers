import { AppShell } from "~/components/app-shell";
import { ServiceHoursSummary } from "~/components/service-hours-summary";
import { VolunteerPlanListItem } from "~/components/volunteer-plan-list-item";
import { requireUser } from "~/lib/auth";
import { getTripsWithPlans } from "~/lib/get-trips-with-plans";
import { createClient } from "~/lib/supabase/server";
import { addDays, todayDateString } from "~/lib/trips";
import { parseKnownDurationHours } from "~/lib/volunteer-opportunities";

export default async function ServiceHoursPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { trips, plansByTripId } = await getTripsWithPlans(supabase, user.id);
  const planList = trips.flatMap((trip) => plansByTripId.get(trip.id) ?? []);

  const today = todayDateString();
  const tripDepartureById = new Map(
    trips.map((trip) => [trip.id, trip.departure_date]),
  );

  const opportunityIds = [
    ...new Set(
      planList
        .map((plan) => plan.opportunity_id)
        .filter((id): id is string => id != null),
    ),
  ];
  const durationByOpportunityId = new Map<string, string | null>();
  if (opportunityIds.length > 0) {
    const { data: opportunities } = await supabase
      .from("volunteer_opportunities")
      .select("id, duration")
      .in("id", opportunityIds);
    for (const opportunity of opportunities ?? []) {
      durationByOpportunityId.set(opportunity.id, opportunity.duration);
    }
  }

  return (
    <AppShell>
      <main className="flex flex-col gap-8 py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Service Hours</h1>
          <p className="text-sm text-muted-foreground">
            Track your volunteering activity across every trip.
          </p>
        </div>

        <ServiceHoursSummary plans={planList} />

        {planList.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">All Activities</h2>
            <ul className="flex flex-col gap-2">
              {planList.map((plan) => {
                const departureDate = tripDepartureById.get(plan.trip_id);
                const canLogHours =
                  departureDate != null && departureDate < today;
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
                    logHoursAvailableFrom={
                      departureDate ? addDays(departureDate, 1) : null
                    }
                    allowEditHours
                  />
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </AppShell>
  );
}
