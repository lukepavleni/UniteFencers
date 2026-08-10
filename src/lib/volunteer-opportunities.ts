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

const SINGLE_DURATION_PATTERN = /^(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)$/i;
const RANGE_DURATION_PATTERN =
  /^(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)$/i;

/**
 * Only returns a value for unambiguous free-text durations like "3 hours" or
 * "2-3 hours". Vague text ("Flexible", "Varies", "A few hours") returns null
 * so the volunteer is asked to enter hours manually instead of guessing.
 */
export function parseKnownDurationHours(
  duration: string | null,
): number | null {
  if (!duration) return null;
  const trimmed = duration.trim();

  const single = trimmed.match(SINGLE_DURATION_PATTERN);
  if (single) return Number.parseFloat(single[1]);

  const range = trimmed.match(RANGE_DURATION_PATTERN);
  if (range) {
    return (Number.parseFloat(range[1]) + Number.parseFloat(range[2])) / 2;
  }

  return null;
}

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

const DATE_RANGE_PATTERN =
  /\b([A-Za-z]{3,9})\.?\s+(\d{1,2})\s*-\s*(\d{1,2}),\s*(\d{4})\b/;

/**
 * Only returns a value for unambiguous free-text date ranges like
 * "Oct 8-13, 2026" (the format this app's catalog rows actually use — see
 * the widen_volunteer_opportunity_date_windows migration). Anything else
 * returns null rather than guessing.
 */
export function extractEventDateRange(
  eventDateTime: string | null,
): { start: string; end: string } | null {
  if (!eventDateTime) return null;

  const match = eventDateTime.match(DATE_RANGE_PATTERN);
  if (!match) return null;

  const [, monthName, startDay, endDay, year] = match;
  const monthIndex = MONTH_INDEX[monthName.toLowerCase()];
  if (monthIndex == null) return null;

  const month = String(monthIndex + 1).padStart(2, "0");
  const start = `${year}-${month}-${startDay.padStart(2, "0")}`;
  const end = `${year}-${month}-${endDay.padStart(2, "0")}`;
  if (end < start) return null;

  return { start, end };
}

/**
 * Whether an opportunity's date window overlaps at least one of the trip's
 * available (non-knockout) dates. Unparseable event_date_time returns false
 * rather than counting an unknown date as a match.
 */
export function opportunityFallsOnAvailableDate(
  opportunity: Pick<VolunteerOpportunity, "event_date_time">,
  availableDates: string[],
): boolean {
  const range = extractEventDateRange(opportunity.event_date_time);
  if (!range) return false;

  return availableDates.some(
    (date) => date >= range.start && date <= range.end,
  );
}
