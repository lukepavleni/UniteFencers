import Link from "next/link";
import { addVolunteerPlan } from "~/app/trips/actions";
import { findNacByName, NAC_OPTIONS } from "~/app/trips/nacs";
import { EditAvailabilityButton } from "~/components/edit-availability-button";
import { FencingSchedulePanel } from "~/components/fencing-schedule-panel";
import { NacSwitcher } from "~/components/nac-switcher";
import { OpportunityFilters } from "~/components/opportunity-filters";
import { PlanStatusPanel } from "~/components/plan-status-panel";
import { StatCardRow } from "~/components/stat-card-row";
import { Button } from "~/components/ui/button";
import { VolunteerOpportunityCard } from "~/components/volunteer-opportunity-card";
import {
  DEFAULT_MAX_DISTANCE_MILES,
  filterOpportunities,
} from "~/lib/filter-opportunities";
import { getTripsWithPlans } from "~/lib/get-trips-with-plans";
import { createClient } from "~/lib/supabase/server";
import { computeTripStats } from "~/lib/trip-stats";
import {
  addDays,
  FENCING_SCHEDULE_ENTRY_COLUMNS,
  type FencingScheduleEntry,
  type Trip,
  todayDateString,
} from "~/lib/trips";
import {
  type QualificationFilter,
  VOLUNTEER_OPPORTUNITY_COLUMNS,
  type VolunteerOpportunity,
} from "~/lib/volunteer-opportunities";

function resolveSelectedNacName(
  trips: Trip[],
  requestedNac: string | undefined,
  today: string,
) {
  if (requestedNac) return requestedNac;

  const upcomingTrip = trips.filter((trip) => trip.departure_date >= today)[0];
  if (upcomingTrip) return upcomingTrip.nac_name;
  if (trips.length > 0) return trips[trips.length - 1].nac_name;

  const upcomingNac = NAC_OPTIONS.filter((nac) => nac.startDate >= today)[0];
  return (upcomingNac ?? NAC_OPTIONS[NAC_OPTIONS.length - 1]).name;
}

export async function Dashboard({
  userId,
  searchParams = {},
}: {
  userId: string;
  searchParams?: {
    nac?: string;
    distance?: string;
    qualification?: string;
  };
}) {
  const supabase = await createClient();
  const { trips, plansByTripId } = await getTripsWithPlans(supabase, userId);

  const today = todayDateString();
  const selectedNacName = resolveSelectedNacName(
    trips,
    searchParams.nac,
    today,
  );
  const selectedTrip = trips.find((trip) => trip.nac_name === selectedNacName);
  const nacInfo = findNacByName(selectedNacName);

  if (!selectedTrip) {
    return (
      <main className="flex flex-col gap-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Find service near your fencing schedule
            </h1>
            {nacInfo && (
              <p className="text-sm text-muted-foreground">
                {nacInfo.name} · {nacInfo.city} · {nacInfo.venue}
              </p>
            )}
          </div>
          <NacSwitcher
            nacOptions={NAC_OPTIONS}
            selectedNacName={selectedNacName}
          />
        </div>

        <div className="flex flex-col items-center gap-4 rounded-lg border border-border p-10 text-center">
          <p className="text-muted-foreground">
            You haven't planned a trip for {nacInfo?.name ?? selectedNacName}{" "}
            yet.
          </p>
          <Button asChild>
            <Link
              href={`/trips/new?nac=${encodeURIComponent(selectedNacName)}`}
            >
              Plan This Trip
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const tripPlans = plansByTripId.get(selectedTrip.id) ?? [];

  const { distance = DEFAULT_MAX_DISTANCE_MILES, qualification = "any" } =
    searchParams;
  const qualificationFilter = qualification as QualificationFilter;

  const { data: opportunities } = await supabase
    .from("volunteer_opportunities")
    .select(VOLUNTEER_OPPORTUNITY_COLUMNS)
    .eq("nac_event", selectedTrip.nac_name)
    .not("signup_url", "is", null)
    .order("organization", { ascending: true });

  const catalogList = (opportunities ?? []) as VolunteerOpportunity[];
  const filteredOpportunities = filterOpportunities(catalogList, {
    distance,
    qualification: qualificationFilter,
  });

  const { data: scheduleEntries } = await supabase
    .from("fencing_schedule_entries")
    .select(FENCING_SCHEDULE_ENTRY_COLUMNS)
    .eq("trip_id", selectedTrip.id)
    .eq("user_id", userId)
    .order("event_date", { ascending: true });

  const stats = computeTripStats({
    trip: selectedTrip,
    tripPlans,
    filteredOpportunities,
    today,
  });

  const durationByOpportunityId = new Map(
    catalogList.map((opportunity) => [opportunity.id, opportunity.duration]),
  );
  const savedOpportunityIds = new Set(
    tripPlans.map((plan) => plan.opportunity_id).filter(Boolean),
  );
  const venueAnnounced = selectedTrip.venue !== "Venue TBA";
  const canLogHours = selectedTrip.departure_date < today;

  return (
    <main className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Find service near your fencing schedule
          </h1>
          <p className="text-sm text-muted-foreground">
            {selectedTrip.nac_name} · {selectedTrip.city} · {selectedTrip.venue}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <NacSwitcher
            nacOptions={NAC_OPTIONS}
            selectedNacName={selectedNacName}
          />
          <EditAvailabilityButton trip={selectedTrip} />
        </div>
      </div>

      <StatCardRow stats={stats} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Recommended opportunities
          </h2>
          <OpportunityFilters
            defaultDistance={distance}
            defaultQualification={qualification}
          />
          {filteredOpportunities.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {filteredOpportunities.map((opportunity) => (
                <VolunteerOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isSaved={savedOpportunityIds.has(opportunity.id)}
                  addAction={addVolunteerPlan.bind(
                    null,
                    selectedTrip.id,
                    opportunity.id,
                  )}
                  venueAnnounced={venueAnnounced}
                />
              ))}
            </ul>
          ) : catalogList.length > 0 ? (
            <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
              No opportunities match your filters — try widening the distance or
              sign-up type above.
            </p>
          ) : (
            <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
              No volunteer opportunities are in our catalog for this NAC yet —
              check back closer to the tournament.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-80 lg:shrink-0">
          <FencingSchedulePanel
            tripId={selectedTrip.id}
            entries={(scheduleEntries ?? []) as FencingScheduleEntry[]}
          />
          <PlanStatusPanel
            plans={tripPlans}
            durationByOpportunityId={durationByOpportunityId}
            canLogHours={canLogHours}
            logHoursAvailableFrom={addDays(selectedTrip.departure_date, 1)}
          />
        </div>
      </div>
    </main>
  );
}
