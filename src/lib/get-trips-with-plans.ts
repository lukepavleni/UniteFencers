import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type Trip,
  VOLUNTEER_PLAN_COLUMNS,
  type VolunteerPlan,
} from "~/lib/trips";

export async function getTripsWithPlans(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data: trips } = await supabase
    .from("trips")
    .select(
      "id, nac_name, city, venue, arrival_date, departure_date, available_dates",
    )
    .eq("user_id", userId)
    .order("arrival_date", { ascending: true });

  const tripList = (trips ?? []) as Trip[];
  const plansByTripId = new Map<string, VolunteerPlan[]>();

  if (tripList.length > 0) {
    const { data: plans } = await supabase
      .from("volunteer_plans")
      .select(VOLUNTEER_PLAN_COLUMNS)
      .in(
        "trip_id",
        tripList.map((trip) => trip.id),
      )
      .order("opportunity_date", { ascending: true });

    for (const plan of (plans ?? []) as VolunteerPlan[]) {
      const existing = plansByTripId.get(plan.trip_id) ?? [];
      existing.push(plan);
      plansByTripId.set(plan.trip_id, existing);
    }
  }

  return { trips: tripList, plansByTripId };
}
