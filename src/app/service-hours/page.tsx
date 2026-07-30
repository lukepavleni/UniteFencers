import { redirect } from "next/navigation";
import { ServiceHoursSummary } from "~/components/service-hours-summary";
import { StatusBadge } from "~/components/status-badge";
import { createClient } from "~/lib/supabase/server";
import { formatDate, type VolunteerPlan } from "~/lib/trips";

export default async function ServiceHoursPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: plans } = await supabase
    .from("volunteer_plans")
    .select(
      "id, trip_id, opportunity_name, organization, opportunity_date, opportunity_time, distance_from_tournament, hours, status",
    )
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
              <li
                key={plan.id}
                className="flex flex-col gap-2 rounded-md border border-border p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{plan.opportunity_name}</p>
                  <p className="text-muted-foreground">{plan.organization}</p>
                  <p className="text-muted-foreground">
                    {formatDate(plan.opportunity_date)}
                    {plan.opportunity_time ? ` · ${plan.opportunity_time}` : ""}
                  </p>
                </div>
                <StatusBadge status={plan.status} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
