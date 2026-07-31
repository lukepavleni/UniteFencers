export interface Trip {
  id: string;
  nac_name: string;
  city: string;
  venue: string;
  arrival_date: string;
  departure_date: string;
  available_dates: string[];
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

export const VOLUNTEER_PLAN_COLUMNS =
  "id, trip_id, opportunity_name, organization, opportunity_date, opportunity_time, distance_from_tournament, hours, status";

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

export function getDatesInRange(start: string, end: string): string[] {
  if (!start || !end || end < start) return [];

  const dates: string[] = [];
  let current = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);

  while (current <= last) {
    dates.push(current.toISOString().slice(0, 10));
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
  }

  return dates;
}
