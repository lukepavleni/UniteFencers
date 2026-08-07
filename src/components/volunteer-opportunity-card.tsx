import { OpportunitySignupActions } from "~/components/opportunity-signup-actions";
import { cn } from "~/lib/utils";
import type { VolunteerOpportunity } from "~/lib/volunteer-opportunities";

export function VolunteerOpportunityCard({
  opportunity,
  isSaved = false,
  addAction,
  venueAnnounced = true,
  className,
}: {
  opportunity: VolunteerOpportunity;
  isSaved?: boolean;
  addAction?: (formData: FormData) => void | Promise<void>;
  venueAnnounced?: boolean;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex flex-col gap-3 rounded-md border border-border p-4 text-sm",
        className,
      )}
    >
      <div>
        <p className="font-medium">{opportunity.event_name}</p>
        <p className="text-muted-foreground">{opportunity.organization}</p>
        <p className="text-muted-foreground">
          {[
            opportunity.duration,
            opportunity.distance_miles != null
              ? opportunity.distance_from_venue
              : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      {opportunity.description ? <p>{opportunity.description}</p> : null}

      <dl className="grid gap-1 text-muted-foreground">
        {opportunity.age_requirement ? (
          <div>
            <dt className="inline font-medium text-foreground">
              Age requirement:{" "}
            </dt>
            <dd className="inline">{opportunity.age_requirement}</dd>
          </div>
        ) : null}
        {opportunity.minor_policy ? (
          <div>
            <dt className="inline font-medium text-foreground">Minors: </dt>
            <dd className="inline">{opportunity.minor_policy}</dd>
          </div>
        ) : null}
        {opportunity.walk_in_or_approval_required ? (
          <div>
            <dt className="inline font-medium text-foreground">
              Qualifications:{" "}
            </dt>
            <dd className="inline">
              {opportunity.walk_in_or_approval_required}
            </dd>
          </div>
        ) : null}
        {opportunity.event_date_time ? (
          <div>
            <dt className="inline font-medium text-foreground">When: </dt>
            <dd className="inline">{opportunity.event_date_time}</dd>
          </div>
        ) : null}
      </dl>

      {!venueAnnounced ? (
        <p className="text-sm text-muted-foreground italic">
          To be announced when USA Fencing announces the venue.
        </p>
      ) : opportunity.signup_url ? (
        <OpportunitySignupActions
          signupUrl={opportunity.signup_url}
          addAction={addAction}
          isSaved={isSaved}
        />
      ) : null}
    </li>
  );
}
