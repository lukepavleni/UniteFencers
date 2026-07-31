import { ServiceHoursSummary } from "~/components/service-hours-summary";
import { VolunteerPlanListItem } from "~/components/volunteer-plan-list-item";
import { requireUser } from "~/lib/auth";
import { createClient } from "~/lib/supabase/server";
import { VOLUNTEER_PLAN_COLUMNS, type VolunteerPlan } from "~/lib/trips";

export default async function ServiceHoursPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from("volunteer_plans")
    .select(VOLUNTEER_PLAN_COLUMNS)
    .eq("user_id", user.id)
    .order("opportunity_date", { ascending: true });

  const planList = (plans ?? []) as VolunteerPlan[];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Service Hours</h1>
        <p className="text-sm text-muted-foreground">
          Track your volunteering activity across every trip.
        </p>
      </div>

      <ServiceHoursSummary plans={planList} />

      {planList.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">All Activities</h2>
          <ul className="flex flex-col gap-2">
            {planList.map((plan) => (
              <VolunteerPlanListItem
                key={plan.id}
                plan={plan}
                showDistance={false}
              />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
