import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatDate, formatDateShort, type Trip } from "~/lib/trips";

export function NextTripSummary({
  nextTrip,
  hasAnyTrips,
}: {
  nextTrip: Trip | null;
  hasAnyTrips: boolean;
}) {
  if (!nextTrip) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            {hasAnyTrips
              ? "No upcoming trips right now."
              : "You haven't planned a fencing trip yet."}
          </p>
          <Button asChild size="sm">
            <Link href="/trips/new">
              {hasAnyTrips ? "Plan a New Trip" : "Plan Your First Trip"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const availableDates = nextTrip.available_dates.slice().sort();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{nextTrip.nac_name}</CardTitle>
        <CardDescription>
          {nextTrip.city} · {nextTrip.venue}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Dates</p>
          <p className="font-medium">
            {formatDate(nextTrip.arrival_date)} –{" "}
            {formatDate(nextTrip.departure_date)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Available to volunteer
          </p>
          <p className="font-medium">
            {availableDates.length > 0
              ? availableDates.map((date) => formatDateShort(date)).join(", ")
              : "None"}
          </p>
        </div>
        <Button asChild size="sm" className="self-start">
          <Link href={`/trips/${nextTrip.id}/opportunities`}>View Trip</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
