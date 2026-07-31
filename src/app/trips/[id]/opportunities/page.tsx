import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { VolunteerPlanListItem } from "~/components/volunteer-plan-list-item";
import { requireUser } from "~/lib/auth";
import { createClient } from "~/lib/supabase/server";
import { VOLUNTEER_PLAN_COLUMNS, type VolunteerPlan } from "~/lib/trips";

export default async function TripOpportunitiesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

      {planList.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {planList.map((plan) => (
            <VolunteerPlanListItem
              key={plan.id}
              plan={plan}
              className="rounded-lg p-4"
            />
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
          No volunteering plans saved for this trip yet. Opportunity matching
          isn't available yet — check back once it's ready.
        </p>
      )}
    </main>
  );
}
