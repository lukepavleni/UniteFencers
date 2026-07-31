import Link from "next/link";
import { ServiceHoursSummary } from "~/components/service-hours-summary";
import { TripCard } from "~/components/trip-card";
import { Button } from "~/components/ui/button";
import { getTripsWithPlans } from "~/lib/get-trips-with-plans";
import { createClient } from "~/lib/supabase/server";
import { todayDateString } from "~/lib/trips";

export async function Dashboard({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { trips, plansByTripId } = await getTripsWithPlans(supabase, userId);

  const today = todayDateString();
  const upcomingTrips = trips.filter((trip) => trip.departure_date >= today);
  const allPlans = trips.flatMap((trip) => plansByTripId.get(trip.id) ?? []);

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
        <h2 className="text-lg font-semibold">Upcoming Fencing Trips</h2>
        {upcomingTrips.length > 0 ? (
          <div className="flex flex-col gap-4">
            {upcomingTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                plans={plansByTripId.get(trip.id) ?? []}
              />
            ))}
          </div>
        ) : trips.length > 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No upcoming trips right now.
            </p>
            <Button asChild size="sm">
              <Link href="/trips/new">Plan a New Trip</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-border p-10 text-center">
            <p className="text-muted-foreground">
              You have not planned any fencing trips yet.
            </p>
            <Button asChild>
              <Link href="/trips/new">Plan Your First Trip</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Service Hours</h2>
        <ServiceHoursSummary plans={allPlans} />
      </div>
    </main>
  );
}
