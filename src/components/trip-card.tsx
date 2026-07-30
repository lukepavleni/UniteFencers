import Link from "next/link";
import { StatusBadge } from "~/components/status-badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { formatDate, type Trip, type VolunteerPlan } from "~/lib/trips";

export function TripCard({
  trip,
  plans,
}: {
  trip: Trip;
  plans: VolunteerPlan[];
}) {
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
            {formatDate(trip.available_start_date)} –{" "}
            {formatDate(trip.available_end_date)}
          </p>
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
                <li
                  key={plan.id}
                  className="flex flex-col gap-2 rounded-md border border-border p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{plan.opportunity_name}</p>
                    <p className="text-muted-foreground">{plan.organization}</p>
                    <p className="text-muted-foreground">
                      {formatDate(plan.opportunity_date)}
                      {plan.opportunity_time
                        ? ` · ${plan.opportunity_time}`
                        : ""}
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
            <p className="text-sm text-muted-foreground">
              No volunteering plans saved for this trip yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
