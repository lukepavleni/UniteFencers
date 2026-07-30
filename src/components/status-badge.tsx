import { Badge } from "~/components/ui/badge";
import type { VolunteerPlanStatus } from "~/lib/trips";

const STATUS_LABELS: Record<VolunteerPlanStatus, string> = {
  saved: "Saved",
  registered: "Registered",
  completed: "Completed",
  verified: "Verified",
};

export function StatusBadge({ status }: { status: VolunteerPlanStatus }) {
  if (status === "verified") {
    return (
      <Badge className="bg-brand text-brand-foreground">
        {STATUS_LABELS[status]}
      </Badge>
    );
  }

  if (status === "registered") {
    return <Badge>{STATUS_LABELS[status]}</Badge>;
  }

  if (status === "completed") {
    return <Badge variant="outline">{STATUS_LABELS[status]}</Badge>;
  }

  return <Badge variant="secondary">{STATUS_LABELS[status]}</Badge>;
}
