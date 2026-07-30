import Link from "next/link";
import { redirect } from "next/navigation";
import { TripCard } from "~/components/trip-card";
import { Button } from "~/components/ui/button";
import { getTripsWithPlans } from "~/lib/get-trips-with-plans";
import { createClient } from "~/lib/supabase/server";

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { trips, plansByTripId } = await getTripsWithPlans(supabase, user.id);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">My Trips</h1>
          <p className="text-sm text-muted-foreground">
            Every fencing trip you've planned, and the volunteering saved
            against each one.
          </p>
        </div>
        {trips.length > 0 && (
          <Button asChild className="self-start sm:self-auto">
            <Link href="/trips/new">Plan New Trip</Link>
          </Button>
        )}
      </div>

      {message && (
        <p className="rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
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
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border p-10 text-center">
          <p className="text-muted-foreground">
            You have not planned any fencing trips yet.
          </p>
          <Button asChild>
            <Link href="/trips/new">Plan Your First Trip</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
