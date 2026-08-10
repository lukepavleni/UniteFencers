import { MessageDialog } from "~/components/admin/message-dialog";
import { StatusBadge } from "~/components/status-badge";
import type { AdminUserOverview } from "~/lib/get-admin-overview";
import { formatDate } from "~/lib/trips";

export function AdminUserTable({ users }: { users: AdminUserOverview[] }) {
  if (users.length === 0) {
    return (
      <p className="rounded-lg border border-border p-10 text-center text-muted-foreground">
        No users have signed up yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Volunteering at</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 align-top font-medium">{user.email}</td>
              <td className="px-4 py-3 align-top">
                {user.isVolunteering ? (
                  <ul className="flex flex-col gap-2">
                    {user.trips
                      .filter((trip) => trip.plans.length > 0)
                      .map((trip) => (
                        <li key={trip.id}>
                          <p className="font-medium">
                            {trip.nacName} · {trip.city}
                          </p>
                          <ul className="flex flex-col gap-1 text-muted-foreground">
                            {trip.plans.map((plan) => (
                              <li
                                key={plan.id}
                                className="flex items-center gap-2"
                              >
                                <span>
                                  {plan.opportunityName} —{" "}
                                  {plan.opportunityDate
                                    ? formatDate(plan.opportunityDate)
                                    : (plan.eventDateTime ?? "Date TBA")}
                                </span>
                                <StatusBadge status={plan.status} />
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                ) : user.trips.length > 0 ? (
                  <p className="text-muted-foreground">
                    Has trips planned, but no volunteering saved yet.
                  </p>
                ) : (
                  <p className="text-muted-foreground">No trips planned yet.</p>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                {!user.isVolunteering && (
                  <MessageDialog
                    recipientId={user.id}
                    recipientEmail={user.email}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
