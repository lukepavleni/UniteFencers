import Link from "next/link";
import { Button } from "~/components/ui/button";
import type { VolunteerPlan } from "~/lib/trips";

function sumHours(plans: VolunteerPlan[]): number {
  return plans.reduce((total, plan) => total + (plan.hours ?? 0), 0);
}

export function ServiceHoursSummary({ plans }: { plans: VolunteerPlan[] }) {
  if (plans.length === 0) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          You haven't logged any service hours yet. Plan a trip and save
          volunteer opportunities to start tracking your hours.
        </p>
        <Button asChild size="sm" className="self-center">
          <Link href="/trips/new">Plan Your Volunteering</Link>
        </Button>
      </div>
    );
  }

  const upcoming = plans.filter((plan) => plan.status === "registered");
  const completed = plans.filter((plan) => plan.status === "completed");
  const verified = plans.filter((plan) => plan.status === "verified");
  const hoursAwaitingVerification = sumHours(completed);
  const verifiedHours = sumHours(verified);

  const stats = [
    { label: "Upcoming Activities", value: upcoming.length },
    { label: "Completed Activities", value: completed.length },
    { label: "Hours Awaiting Verification", value: hoursAwaitingVerification },
    { label: "Verified Service Hours", value: verifiedHours },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1 rounded-lg border border-border p-4 text-center"
        >
          <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
