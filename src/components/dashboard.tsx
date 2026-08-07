import Link from "next/link";
import { NextTripSummary } from "~/components/next-trip-summary";
import { Button } from "~/components/ui/button";
import { VolunteeringSummary } from "~/components/volunteering-summary";
import { getTripsWithPlans } from "~/lib/get-trips-with-plans";
import { createClient } from "~/lib/supabase/server";
import { todayDateString } from "~/lib/trips";

export async function Dashboard({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { trips, plansByTripId } = await getTripsWithPlans(supabase, userId);

  const today = todayDateString();
  const upcomingTrips = trips.filter((trip) => trip.departure_date >= today);
  const nextTrip = upcomingTrips[0] ?? null;
  const allPlans = trips.flatMap((trip) => plansByTripId.get(trip.id) ?? []);

  const nextOpportunity =
    allPlans.find(
      (plan) => plan.status === "saved" || plan.status === "registered",
    ) ?? null;
  const verifiedHours = allPlans
    .filter((plan) => plan.status === "verified")
    .reduce((total, plan) => total + (plan.hours ?? 0), 0);
  const hoursAwaitingVerification = allPlans
    .filter((plan) => plan.status === "completed")
    .reduce((total, plan) => total + (plan.hours ?? 0), 0);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="max-w-md text-muted-foreground">
          Plan your volunteering around your upcoming fencing trips.
        </p>
        <Button size="lg" asChild>
          <Link href="/trips/new">Plan Your Volunteering</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Your Next Trip</h2>
        <NextTripSummary nextTrip={nextTrip} hasAnyTrips={trips.length > 0} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Volunteering Summary</h2>
        <VolunteeringSummary
          nextOpportunity={nextOpportunity}
          verifiedHours={verifiedHours}
          hoursAwaitingVerification={hoursAwaitingVerification}
          planNewHref={
            nextTrip ? `/trips/${nextTrip.id}/opportunities` : "/trips/new"
          }
        />
      </div>
    </main>
  );
}
