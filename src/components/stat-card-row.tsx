import { StatCard } from "~/components/ui/stat-card";
import type { TripStats } from "~/lib/trip-stats";

export function StatCardRow({ stats }: { stats: TripStats }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard
        label="Nearby opportunities"
        value={stats.nearbyOpportunities}
      />
      <StatCard label="Fits your free day" value={stats.fitsFreeDay} />
      <StatCard label="Logged hours" value={stats.loggedHours} />
      <StatCard
        label="Pending confirmations"
        value={stats.pendingConfirmations}
      />
    </div>
  );
}
