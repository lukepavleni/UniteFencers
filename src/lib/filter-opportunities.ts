import {
  getQualificationBucket,
  type QualificationFilter,
  type VolunteerOpportunity,
} from "~/lib/volunteer-opportunities";

export const DEFAULT_MAX_DISTANCE_MILES = "10";

export interface OpportunityFilterState {
  distance: string;
  qualification: QualificationFilter;
}

export function filterOpportunities(
  opportunities: VolunteerOpportunity[],
  { distance, qualification }: OpportunityFilterState,
): VolunteerOpportunity[] {
  const maxDistanceMiles =
    distance === "any" ? null : Number.parseFloat(distance);

  return opportunities
    .filter(
      (opportunity) =>
        maxDistanceMiles == null ||
        opportunity.distance_miles == null ||
        opportunity.distance_miles <= maxDistanceMiles,
    )
    .filter(
      (opportunity) =>
        qualification === "any" ||
        getQualificationBucket(opportunity) === qualification,
    );
}
