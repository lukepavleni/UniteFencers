import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  Inbox,
  MapPin,
  SearchX,
} from "lucide-react";
import Link from "next/link";
import { addVolunteerPlan } from "~/app/trips/actions";
import { findNacByName, NAC_OPTIONS } from "~/app/trips/nacs";
import { DashboardHero } from "~/components/dashboard-hero";
import { EditAvailabilityButton } from "~/components/edit-availability-button";
import { FencingSchedulePanel } from "~/components/fencing-schedule-panel";
import { NacSwitcher } from "~/components/nac-switcher";
import { OpportunityFilters } from "~/components/opportunity-filters";
import { PlanStatusPanel } from "~/components/plan-status-panel";
import { StatCardRow } from "~/components/stat-card-row";
import { Button } from "~/components/ui/button";
import { VolunteerOpportunityCard } from "~/components/volunteer-opportunity-card";
import { getCurrentUser } from "~/lib/auth";
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
  formatDateShort,
  type Trip,
  todayDateString,
} from "~/lib/trips";
import { cn } from "~/lib/utils";
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

const BENEFITS = [
  {
    icon: MapPin,
    tone: "sky",
    title: "Opportunities near the venue",
    body: "Browse volunteer events sorted by distance from your tournament.",
  },
  {
    icon: CalendarCheck,
    tone: "emerald",
    title: "Fits your fencing schedule",
    body: "Add your bouts and free days so service never clashes with fencing.",
  },
  {
    icon: Clock,
    tone: "violet",
    title: "Track your service hours",
    body: "Save plans, log hours after the trip, and get them confirmed.",
  },
] as const;

const BENEFIT_STYLES = {
  sky: "bg-tone-sky/10 border-tone-sky/30 [&_span]:bg-tone-sky",
  emerald: "bg-navy/10 border-navy/30 [&_span]:bg-navy",
  violet: "bg-brand/10 border-brand/30 [&_span]:bg-brand",
} as const;

function EmptyNote({
  icon: Icon,
  children,
}: {
  icon: typeof Inbox;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-tone-sky/40 bg-tone-sky/5 p-8 text-center text-sm text-muted-foreground">
      <span className="flex size-12 items-center justify-center rounded-full bg-tone-sky/15 text-tone-sky">
        <Icon className="size-6" />
      </span>
      <p className="max-w-sm">{children}</p>
    </div>
  );
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
  const user = await getCurrentUser();
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const firstName = fullName?.trim().split(/\s+/)[0];
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
    const { count: catalogCount } = await supabase
      .from("volunteer_opportunities")
      .select("id", { count: "exact", head: true })
      .eq("nac_event", selectedNacName)
      .not("signup_url", "is", null);

    return (
      <main className="flex flex-col gap-6 py-4">
        <DashboardHero
          firstName={firstName}
          nacName={nacInfo?.name ?? selectedNacName}
          city={nacInfo?.city}
          venue={nacInfo?.venue}
          startDate={nacInfo?.startDate}
          endDate={nacInfo?.endDate}
          actions={
            <NacSwitcher
              nacOptions={NAC_OPTIONS}
              selectedNacName={selectedNacName}
            />
          }
        />

        <div className="flex flex-col items-center gap-5 rounded-2xl border-2 border-brand/30 bg-linear-to-b from-brand/10 to-brand/5 px-6 py-12 text-center">
          <p className="text-xl font-semibold tracking-tight sm:text-2xl">
            You haven't planned a trip for {nacInfo?.name ?? selectedNacName}{" "}
            yet.
          </p>
          <p className="max-w-md text-muted-foreground">
            Plan your trip to find volunteer opportunities near the tournament.
          </p>
          {catalogCount ? (
            <span className="rounded-full bg-navy/15 px-4 py-1.5 text-sm font-semibold text-navy">
              {catalogCount} volunteer{" "}
              {catalogCount === 1 ? "opportunity" : "opportunities"} waiting
            </span>
          ) : null}
          <Button
            asChild
            variant="cta"
            size="cta"
            className="transition-transform hover:scale-105"
          >
            <Link
              href={`/trips/new?nac=${encodeURIComponent(selectedNacName)}`}
            >
              Find Volunteer Opportunities &amp; Plan This Trip
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            What you'll get
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, tone, title, body }) => (
              <div
                key={title}
                className={`flex flex-col gap-3 rounded-xl border p-5 ${BENEFIT_STYLES[tone]}`}
              >
                <span className="flex size-10 items-center justify-center rounded-xl text-white shadow-sm">
                  <Icon className="size-5" />
                </span>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Upcoming tournaments
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {NAC_OPTIONS.filter((nac) => nac.endDate >= today).map((nac) => (
              <Link
                key={nac.name}
                href={`/?nac=${encodeURIComponent(nac.name)}`}
                className={cn(
                  "flex flex-col gap-1 rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                  nac.name === selectedNacName
                    ? "border-brand ring-2 ring-brand/20"
                    : "border-border",
                )}
              >
                <p className="font-semibold">{nac.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {nac.city}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {formatDateShort(nac.startDate)} –{" "}
                  {formatDateShort(nac.endDate)}
                </p>
              </Link>
            ))}
          </div>
        </section>
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
      <DashboardHero
        firstName={firstName}
        nacName={selectedTrip.nac_name}
        city={selectedTrip.city}
        venue={selectedTrip.venue}
        startDate={nacInfo?.startDate ?? selectedTrip.arrival_date}
        endDate={nacInfo?.endDate ?? selectedTrip.departure_date}
        actions={
          <>
            <NacSwitcher
              nacOptions={NAC_OPTIONS}
              selectedNacName={selectedNacName}
            />
            <EditAvailabilityButton trip={selectedTrip} />
          </>
        }
      />

      <StatCardRow stats={stats} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="h-5 w-1.5 rounded-full bg-brand" />
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
            <EmptyNote icon={SearchX}>
              No opportunities match your filters — try widening the distance or
              sign-up type above.
            </EmptyNote>
          ) : (
            <EmptyNote icon={Inbox}>
              No volunteer opportunities are in our catalog for this NAC yet —
              check back closer to the tournament.
            </EmptyNote>
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
