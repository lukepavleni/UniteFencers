import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { VolunteerPlanListItem } from "~/components/volunteer-plan-list-item";
import {
  formatDate,
  getDatesInRange,
  type Trip,
  type VolunteerPlan,
} from "~/lib/trips";

export function TripCard({
  trip,
  plans,
}: {
  trip: Trip;
  plans: VolunteerPlan[];
}) {
  const rangeDates = getDatesInRange(trip.arrival_date, trip.departure_date);
  const knockoutDates = rangeDates.filter(
    (date) => !trip.available_dates.includes(date),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{trip.nac_name}</CardTitle>
        <CardDescription>
          {trip.city} · {trip.venue}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Arrival</p>
            <p className="font-medium">{formatDate(trip.arrival_date)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Departure</p>
            <p className="font-medium">{formatDate(trip.departure_date)}</p>
          </div>
        </div>

        <div className="text-sm">
          <p className="text-muted-foreground">Available to volunteer</p>
          <p className="font-medium">
            {trip.available_dates.length > 0
              ? trip.available_dates
                  .slice()
                  .sort()
                  .map((date) => formatDate(date))
                  .join(", ")
              : "None"}
          </p>
          {knockoutDates.length > 0 && (
            <p className="text-muted-foreground">
              Knockout:{" "}
              {knockoutDates.map((date) => formatDate(date)).join(", ")}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/trips/${trip.id}/edit`}>Edit Trip</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/trips/${trip.id}/opportunities`}>
              View Opportunities
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <p className="text-sm font-medium">Volunteering plans</p>
          {plans.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {plans.map((plan) => (
                <VolunteerPlanListItem key={plan.id} plan={plan} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No volunteering plans saved for this trip yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
