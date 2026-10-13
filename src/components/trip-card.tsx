import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { DeleteTripButton } from "~/components/delete-trip-button";
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
  formatDateShort,
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
    <Card className="overflow-hidden border-t-4 border-t-brand shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{trip.nac_name}</CardTitle>
        <CardDescription className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {trip.city} · {trip.venue}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-tone-sky/30 bg-tone-sky/10 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-tone-sky">
              <CalendarDays className="size-3.5" />
              Arrival
            </p>
            <p className="font-semibold">{formatDate(trip.arrival_date)}</p>
          </div>
          <div className="rounded-xl border border-navy/30 bg-navy/10 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-navy">
              <CalendarDays className="size-3.5" />
              Departure
            </p>
            <p className="font-semibold">{formatDate(trip.departure_date)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-muted-foreground">Available to volunteer</p>
          {trip.available_dates.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {trip.available_dates
                .slice()
                .sort()
                .map((date) => (
                  <span
                    key={date}
                    className="rounded-full bg-tone-emerald/15 px-2.5 py-0.5 text-xs font-semibold text-tone-emerald"
                  >
                    {formatDateShort(date)}
                  </span>
                ))}
            </div>
          ) : (
            <p className="font-medium">None</p>
          )}
          {knockoutDates.length > 0 && (
            <p className="text-muted-foreground">
              Knockout:{" "}
              {knockoutDates.map((date) => formatDateShort(date)).join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="cta">
            <Link href={`/trips/${trip.id}/edit`}>Edit Trip</Link>
          </Button>
          <Button asChild variant="cta" size="cta">
            <Link href={`/trips/${trip.id}/opportunities`}>
              View Opportunities
            </Link>
          </Button>
          <DeleteTripButton tripId={trip.id} nacName={trip.nac_name} />
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="h-4 w-1 rounded-full bg-brand" />
            Volunteering plans
          </p>
          {plans.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {plans.map((plan) => (
                <VolunteerPlanListItem key={plan.id} plan={plan} showActions />
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-tone-sky/40 bg-tone-sky/5 p-4 text-center text-sm text-muted-foreground">
              No volunteering plans saved for this trip yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
