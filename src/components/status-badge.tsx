import { Badge } from "~/components/ui/badge";
import type { VolunteerPlanStatus } from "~/lib/trips";

const STATUS_LABELS: Record<VolunteerPlanStatus, string> = {
  saved: "Saved",
  registered: "Registered",
  completed: "Completed",
  verified: "Verified",
  missed: "Not Completed",
};

// Left-border accent for plan rows, matched to each status badge's color.
export const STATUS_ACCENT: Record<VolunteerPlanStatus, string> = {
  saved: "border-l-border",
  registered: "border-l-tone-sky",
  completed: "border-l-tone-violet",
  verified: "border-l-tone-emerald",
  missed: "border-l-destructive",
};

export function StatusBadge({ status }: { status: VolunteerPlanStatus }) {
  if (status === "verified") {
    return (
      <Badge className="bg-tone-emerald text-white">
        {STATUS_LABELS[status]}
      </Badge>
    );
  }

  if (status === "registered") {
    return (
      <Badge className="bg-tone-sky text-white">{STATUS_LABELS[status]}</Badge>
    );
  }

  if (status === "completed") {
    return (
      <Badge
        variant="outline"
        className="border-tone-violet/40 bg-tone-violet/10 text-tone-violet"
      >
        {STATUS_LABELS[status]}
      </Badge>
    );
  }

  if (status === "missed") {
    return <Badge variant="destructive">{STATUS_LABELS[status]}</Badge>;
  }

  return <Badge variant="secondary">{STATUS_LABELS[status]}</Badge>;
}
