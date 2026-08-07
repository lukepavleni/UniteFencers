import { createAdminClient } from "~/lib/supabase/admin";
import type { VolunteerPlanStatus } from "~/lib/trips";

export interface AdminVolunteerPlanOverview {
  id: string;
  opportunityName: string;
  opportunityDate: string | null;
  eventDateTime: string | null;
  status: VolunteerPlanStatus;
}

export interface AdminTripOverview {
  id: string;
  nacName: string;
  city: string;
  venue: string;
  arrivalDate: string;
  departureDate: string;
  plans: AdminVolunteerPlanOverview[];
}

export interface AdminUserOverview {
  id: string;
  email: string;
  trips: AdminTripOverview[];
  isVolunteering: boolean;
}

interface TripRow {
  id: string;
  user_id: string;
  nac_name: string;
  city: string;
  venue: string;
  arrival_date: string;
  departure_date: string;
}

interface VolunteerPlanRow {
  id: string;
  trip_id: string;
  opportunity_name: string;
  opportunity_date: string | null;
  event_date_time: string | null;
  status: VolunteerPlanStatus;
}

export async function getAdminOverview(): Promise<AdminUserOverview[]> {
  const supabaseAdmin = createAdminClient();

  const [usersResult, tripsResult, plansResult] = await Promise.all([
    supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
    supabaseAdmin
      .from("trips")
      .select(
        "id, user_id, nac_name, city, venue, arrival_date, departure_date",
      ),
    supabaseAdmin
      .from("volunteer_plans")
      .select(
        "id, trip_id, opportunity_name, opportunity_date, event_date_time, status",
      ),
  ]);

  const plansByTripId = new Map<string, AdminVolunteerPlanOverview[]>();
  for (const plan of (plansResult.data ?? []) as VolunteerPlanRow[]) {
    const existing = plansByTripId.get(plan.trip_id) ?? [];
    existing.push({
      id: plan.id,
      opportunityName: plan.opportunity_name,
      opportunityDate: plan.opportunity_date,
      eventDateTime: plan.event_date_time,
      status: plan.status,
    });
    plansByTripId.set(plan.trip_id, existing);
  }

  const tripsByUserId = new Map<string, AdminTripOverview[]>();
  for (const trip of (tripsResult.data ?? []) as TripRow[]) {
    const existing = tripsByUserId.get(trip.user_id) ?? [];
    existing.push({
      id: trip.id,
      nacName: trip.nac_name,
      city: trip.city,
      venue: trip.venue,
      arrivalDate: trip.arrival_date,
      departureDate: trip.departure_date,
      plans: plansByTripId.get(trip.id) ?? [],
    });
    tripsByUserId.set(trip.user_id, existing);
  }

  return (usersResult.data?.users ?? []).map((user) => {
    const trips = tripsByUserId.get(user.id) ?? [];
    return {
      id: user.id,
      email: user.email ?? "(no email)",
      trips,
      isVolunteering: trips.some((trip) => trip.plans.length > 0),
    };
  });
}
