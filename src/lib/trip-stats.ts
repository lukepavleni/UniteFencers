import type { Trip, VolunteerPlan } from "~/lib/trips";
import {
  opportunityFallsOnAvailableDate,
  type VolunteerOpportunity,
} from "~/lib/volunteer-opportunities";

export interface TripStats {
  nearbyOpportunities: number;
  fitsFreeDay: number;
  loggedHours: number;
  pendingConfirmations: number;
}

export function computeTripStats({
  trip,
  tripPlans,
  filteredOpportunities,
  today,
}: {
  trip: Trip;
  tripPlans: VolunteerPlan[];
  filteredOpportunities: VolunteerOpportunity[];
  today: string;
}): TripStats {
  const nearbyOpportunities = filteredOpportunities.length;

  const fitsFreeDay = filteredOpportunities.filter((opportunity) =>
    opportunityFallsOnAvailableDate(opportunity, trip.available_dates),
  ).length;

  const loggedHours = tripPlans
    .filter((plan) => plan.status === "completed")
    .reduce((total, plan) => total + (plan.hours ?? 0), 0);

  const pendingConfirmations =
    trip.departure_date < today
      ? tripPlans.filter((plan) => plan.status === "registered").length
      : 0;

  return {
    nearbyOpportunities,
    fitsFreeDay,
    loggedHours,
    pendingConfirmations,
  };
}
