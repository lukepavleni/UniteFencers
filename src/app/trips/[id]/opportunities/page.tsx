import Link from "next/link";
import { redirect } from "next/navigation";
import { addVolunteerPlan } from "~/app/trips/actions";
import { OpportunityFilters } from "~/components/opportunity-filters";
import { Button } from "~/components/ui/button";
import { VolunteerOpportunityCard } from "~/components/volunteer-opportunity-card";
import { VolunteerPlanListItem } from "~/components/volunteer-plan-list-item";
import { requireUser } from "~/lib/auth";
import {
  DEFAULT_MAX_DISTANCE_MILES,
  filterOpportunities,
} from "~/lib/filter-opportunities";
import { createClient } from "~/lib/supabase/server";
import { VOLUNTEER_PLAN_COLUMNS, type VolunteerPlan } from "~/lib/trips";
import {
  type QualificationFilter,
  VOLUNTEER_OPPORTUNITY_COLUMNS,
  type VolunteerOpportunity,
} from "~/lib/volunteer-opportunities";

export default async function TripOpportunitiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ distance?: string; qualification?: string }>;
}) {
  const { id } = await params;
  const { distance = DEFAULT_MAX_DISTANCE_MILES, qualification = "any" } =
    await searchParams;
  const user = await requireUser();
  const supabase = await createClient();

  const { data: trip } = await supabase
    .from("trips")
    .select("id, nac_name, city, venue")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!trip) {
    redirect("/trips");
  }

  const { data: plans } = await supabase
    .from("volunteer_plans")
    .select(VOLUNTEER_PLAN_COLUMNS)
    .eq("trip_id", trip.id)
    .order("opportunity_date", { ascending: true });

  const planList = (plans ?? []) as VolunteerPlan[];
  const savedOpportunityIds = new Set(
    planList.map((plan) => plan.opportunity_id).filter(Boolean),
  );

  const { data: opportunities } = await supabase
    .from("volunteer_opportunities")
    .select(VOLUNTEER_OPPORTUNITY_COLUMNS)
    .eq("nac_event", trip.nac_name)
    .not("signup_url", "is", null)
    .order("organization", { ascending: true });

  const qualificationFilter = qualification as QualificationFilter;

  const venueAnnounced = trip.venue !== "Venue TBA";
  const catalogList = (opportunities ?? []) as VolunteerOpportunity[];
  const opportunityList = filterOpportunities(catalogList, {
    distance,
    qualification: qualificationFilter,
  });

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <Button asChild variant="ghost" size="sm" className="self-start">
          <Link href="/trips">← Back to My Trips</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          Opportunities for {trip.nac_name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {trip.city} · {trip.venue}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Volunteer Opportunities Near {trip.nac_name}
        </h2>
        <OpportunityFilters
          defaultDistance={distance}
          defaultQualification={qualification}
        />
        {opportunityList.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {opportunityList.map((opportunity) => (
              <VolunteerOpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isSaved={savedOpportunityIds.has(opportunity.id)}
                addAction={addVolunteerPlan.bind(null, trip.id, opportunity.id)}
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

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">My Saved Plans</h2>
        {planList.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {planList.map((plan) => (
              <VolunteerPlanListItem
                key={plan.id}
                plan={plan}
                className="rounded-lg p-4"
                showActions
              />
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
            No volunteering plans saved for this trip yet. Click "Add to My
            Trip" on an opportunity above once you've signed up.
          </p>
        )}
      </div>
    </main>
  );
}
