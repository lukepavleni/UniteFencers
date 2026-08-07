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
  opportunity_id: string | null;
  opportunity_name: string;
  organization: string;
  opportunity_date: string | null;
  opportunity_time: string | null;
  event_date_time: string | null;
  distance_from_tournament: string | null;
  signup_url: string | null;
  hours: number | null;
  status: VolunteerPlanStatus;
}

export const VOLUNTEER_PLAN_COLUMNS =
  "id, trip_id, opportunity_id, opportunity_name, organization, opportunity_date, opportunity_time, event_date_time, distance_from_tournament, signup_url, hours, status";

export function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function todayDateString(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
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
