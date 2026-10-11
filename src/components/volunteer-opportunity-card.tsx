import { Clock, MapPin } from "lucide-react";
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
        "flex flex-col gap-3 rounded-xl border border-border border-l-4 border-l-brand bg-card p-5 text-sm shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-base font-semibold">{opportunity.event_name}</p>
          <p className="text-muted-foreground">{opportunity.organization}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {opportunity.duration ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-tone-violet/10 px-2.5 py-0.5 text-xs font-medium text-tone-violet">
              <Clock className="size-3" />
              {opportunity.duration}
            </span>
          ) : null}
          {opportunity.distance_miles != null ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-tone-sky/10 px-2.5 py-0.5 text-xs font-medium text-tone-sky">
              <MapPin className="size-3" />
              {opportunity.distance_from_venue}
            </span>
          ) : null}
        </div>
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
