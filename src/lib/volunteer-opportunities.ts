export interface VolunteerOpportunity {
  id: string;
  event_name: string;
  organization: string;
  event_date_time: string | null;
  duration: string | null;
  address: string | null;
  city_state: string | null;
  signup_url: string | null;
  walk_in_or_approval_required: string | null;
  age_requirement: string | null;
  minor_policy: string | null;
  description: string | null;
  distance_from_venue: string | null;
  distance_miles: number | null;
  nac_event: string;
}

export const VOLUNTEER_OPPORTUNITY_COLUMNS =
  "id, event_name, organization, event_date_time, duration, address, city_state, signup_url, walk_in_or_approval_required, age_requirement, minor_policy, description, distance_from_venue, distance_miles, nac_event";

export type QualificationFilter = "any" | "walk-in" | "registration";

export function getQualificationBucket(
  opportunity: Pick<VolunteerOpportunity, "walk_in_or_approval_required">,
): Exclude<QualificationFilter, "any"> | null {
  const text = opportunity.walk_in_or_approval_required;
  if (!text) return null;
  return /walk[- ]?in/i.test(text) ? "walk-in" : "registration";
}
