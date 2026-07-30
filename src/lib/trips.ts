export interface Trip {
  id: string;
  nac_name: string;
  city: string;
  venue: string;
  arrival_date: string;
  departure_date: string;
  available_start_date: string;
  available_end_date: string;
}

export type VolunteerPlanStatus =
  | "saved"
  | "registered"
  | "completed"
  | "verified";

export interface VolunteerPlan {
  id: string;
  trip_id: string;
  opportunity_name: string;
  organization: string;
  opportunity_date: string;
  opportunity_time: string | null;
  distance_from_tournament: string | null;
  hours: number | null;
  status: VolunteerPlanStatus;
}

export function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function todayDateString(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}
