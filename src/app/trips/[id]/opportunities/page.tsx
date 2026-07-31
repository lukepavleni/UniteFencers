import Link from "next/link";
import { redirect } from "next/navigation";
import { StatusBadge } from "~/components/status-badge";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/server";
import { formatDate, type VolunteerPlan } from "~/lib/trips";

export default async function TripOpportunitiesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
    .select(
      "id, trip_id, opportunity_name, organization, opportunity_date, opportunity_time, distance_from_tournament, hours, status",
    )
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
            <li
              key={plan.id}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{plan.opportunity_name}</p>
                <p className="text-muted-foreground">{plan.organization}</p>
                <p className="text-muted-foreground">
                  {formatDate(plan.opportunity_date)}
                  {plan.opportunity_time ? ` · ${plan.opportunity_time}` : ""}
                  {plan.distance_from_tournament
                    ? ` · ${plan.distance_from_tournament}`
                    : ""}
                </p>
              </div>
              <StatusBadge status={plan.status} />
            </li>
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
