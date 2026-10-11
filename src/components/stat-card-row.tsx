import { CalendarCheck, Clock, Hourglass, MapPin } from "lucide-react";
import { StatCard } from "~/components/ui/stat-card";
import type { TripStats } from "~/lib/trip-stats";

export function StatCardRow({ stats }: { stats: TripStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Nearby opportunities"
        value={stats.nearbyOpportunities}
        icon={MapPin}
        tone="sky"
      />
      <StatCard
        label="Fit your free day"
        value={stats.fitsFreeDay}
        icon={CalendarCheck}
        tone="emerald"
      />
      <StatCard
        label="Logged hours"
        value={stats.loggedHours}
        icon={Clock}
        tone="violet"
      />
      <StatCard
        label="Pending confirmations"
        value={stats.pendingConfirmations}
        icon={Hourglass}
        tone="amber"
      />
    </div>
  );
}
