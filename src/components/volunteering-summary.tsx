import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { formatDate, type VolunteerPlan } from "~/lib/trips";

export function VolunteeringSummary({
  nextOpportunity,
  verifiedHours,
  hoursAwaitingVerification,
  planNewHref,
}: {
  nextOpportunity: VolunteerPlan | null;
  verifiedHours: number;
  hoursAwaitingVerification: number;
  planNewHref: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="sm:col-span-1">
        <CardContent>
          <p className="text-sm text-muted-foreground">Next Opportunity</p>
          {nextOpportunity ? (
            <>
              <p className="font-medium">{nextOpportunity.opportunity_name}</p>
              <p className="text-sm text-muted-foreground">
                {nextOpportunity.organization}
              </p>
              <p className="text-sm text-muted-foreground">
                {nextOpportunity.opportunity_date
                  ? formatDate(nextOpportunity.opportunity_date)
                  : (nextOpportunity.event_date_time ?? "Date TBA")}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm text-muted-foreground">
                No opportunity saved yet.
              </p>
              <Button asChild size="xs" variant="outline">
                <Link href={planNewHref}>Find an Opportunity</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="text-center">
          <p className="text-2xl font-bold tracking-tight">
            {hoursAwaitingVerification}
          </p>
          <p className="text-xs text-muted-foreground">
            Hours Awaiting Verification
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="text-center">
          <p className="text-2xl font-bold tracking-tight">{verifiedHours}</p>
          <p className="text-xs text-muted-foreground">
            Verified Service Hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
