import { ArrowRight, CalendarDays, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { AppShell } from "~/components/app-shell";
import { PageHeader } from "~/components/page-header";
import { TripCard } from "~/components/trip-card";
import { Button } from "~/components/ui/button";
import { StatCard } from "~/components/ui/stat-card";
import { requireUser } from "~/lib/auth";
import { getTripsWithPlans } from "~/lib/get-trips-with-plans";
import { createClient } from "~/lib/supabase/server";
import { todayDateString } from "~/lib/trips";

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;
  const user = await requireUser();
  const supabase = await createClient();

  const { trips, plansByTripId } = await getTripsWithPlans(supabase, user.id);
  const today = todayDateString();
  const upcomingTrips = trips.filter((trip) => trip.departure_date >= today);
  const totalPlans = trips.reduce(
    (total, trip) => total + (plansByTripId.get(trip.id)?.length ?? 0),
    0,
  );

  return (
    <AppShell>
      <main className="flex flex-col gap-8 py-4">
        <PageHeader
          icon={MapPin}
          title="My Trips"
          description="Every fencing trip you've planned, and the volunteering saved against each one."
          actions={
            trips.length > 0 ? (
              <Button
                asChild
                className="bg-brand text-brand-foreground shadow-lg shadow-black/20 hover:bg-brand/90"
              >
                <Link href="/trips/new">
                  Plan New Trip
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null
          }
        />

        {trips.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Trips planned"
              value={trips.length}
              icon={MapPin}
              tone="sky"
            />
            <StatCard
              label="Upcoming trips"
              value={upcomingTrips.length}
              icon={CalendarDays}
              tone="emerald"
            />
            <StatCard
              label="Volunteering plans"
              value={totalPlans}
              icon={Heart}
              tone="brand"
            />
          </div>
        )}

        {message && (
          <p className="rounded-xl border border-tone-sky/30 bg-tone-sky/10 p-4 text-sm font-medium text-foreground">
            {message}
          </p>
        )}

        {trips.length > 0 ? (
          <div className="flex flex-col gap-4">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                plans={plansByTripId.get(trip.id) ?? []}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-brand/30 bg-linear-to-b from-brand/10 to-brand/5 p-12 text-center">
            <p className="text-lg font-semibold">
              You have not planned any fencing trips yet.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground shadow-lg shadow-brand/30 hover:bg-brand/90"
            >
              <Link href="/trips/new">
                Plan Your First Trip
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </main>
    </AppShell>
  );
}
