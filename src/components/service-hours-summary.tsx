import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Hourglass,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { StatCard } from "~/components/ui/stat-card";
import type { VolunteerPlan } from "~/lib/trips";

function sumHours(plans: VolunteerPlan[]): number {
  return plans.reduce((total, plan) => total + (plan.hours ?? 0), 0);
}

export function ServiceHoursSummary({ plans }: { plans: VolunteerPlan[] }) {
  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-brand/30 bg-linear-to-b from-brand/10 to-brand/5 p-12 text-center">
        <p className="max-w-md text-muted-foreground">
          You haven't logged any service hours yet. Plan a trip and save
          volunteer opportunities to start tracking your hours.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-brand text-brand-foreground shadow-lg shadow-brand/30 hover:bg-brand/90"
        >
          <Link href="/trips/new">
            Plan Your Volunteering
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const upcoming = plans.filter((plan) => plan.status === "registered");
  const completed = plans.filter((plan) => plan.status === "completed");
  const verified = plans.filter((plan) => plan.status === "verified");
  const hoursAwaitingVerification = sumHours(completed);
  const verifiedHours = sumHours(verified);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Upcoming Activities"
        value={upcoming.length}
        icon={CalendarCheck}
        tone="sky"
      />
      <StatCard
        label="Completed Activities"
        value={completed.length}
        icon={CheckCircle2}
        tone="violet"
      />
      <StatCard
        label="Hours Awaiting Verification"
        value={hoursAwaitingVerification}
        icon={Hourglass}
        tone="amber"
      />
      <StatCard
        label="Verified Service Hours"
        value={verifiedHours}
        icon={BadgeCheck}
        tone="emerald"
      />
    </div>
  );
}
