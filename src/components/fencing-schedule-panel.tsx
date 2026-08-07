import { deleteScheduleEntry } from "~/app/trips/schedule-actions";
import { ScheduleEntryDialog } from "~/components/schedule-entry-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type FencingScheduleEntry, formatDateShort } from "~/lib/trips";

export function FencingSchedulePanel({
  tripId,
  entries,
}: {
  tripId: string;
  entries: FencingScheduleEntry[];
}) {
  const sorted = entries
    .slice()
    .sort((a, b) =>
      `${a.event_date}${a.event_time ?? ""}`.localeCompare(
        `${b.event_date}${b.event_time ?? ""}`,
      ),
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your fencing schedule</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven't added your fencing schedule yet — add the dates and
            times you're fencing so you can plan volunteering around them.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 text-sm">
            {sorted.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-2"
              >
                <div>
                  <p className="font-medium">{entry.label}</p>
                  <p className="text-muted-foreground">
                    {formatDateShort(entry.event_date)}
                    {entry.event_time ? ` · ${entry.event_time}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <ScheduleEntryDialog
                    tripId={tripId}
                    entry={entry}
                    trigger={
                      <Button type="button" size="xs" variant="outline">
                        Edit
                      </Button>
                    }
                  />
                  <form action={deleteScheduleEntry.bind(null, entry.id)}>
                    <Button
                      type="submit"
                      size="xs"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
        <ScheduleEntryDialog
          tripId={tripId}
          trigger={
            <Button type="button" size="sm" className="self-start">
              Add schedule entry
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
