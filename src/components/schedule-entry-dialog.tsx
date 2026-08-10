"use client";

import { useState } from "react";
import {
  addScheduleEntry,
  updateScheduleEntry,
} from "~/app/trips/schedule-actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { FencingScheduleEntry } from "~/lib/trips";

export function ScheduleEntryDialog({
  tripId,
  entry,
  trigger,
}: {
  tripId: string;
  entry?: FencingScheduleEntry;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const action = entry
    ? updateScheduleEntry.bind(null, entry.id)
    : addScheduleEntry.bind(null, tripId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {entry ? "Edit schedule entry" : "Add schedule entry"}
        </DialogTitle>
        <form
          action={action}
          onSubmit={() => setOpen(false)}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eventDate">Date</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              defaultValue={entry?.event_date}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="eventTime">Time</Label>
            <Input
              id="eventTime"
              name="eventTime"
              type="time"
              defaultValue={entry?.event_time ?? ""}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="label">What's happening</Label>
            <Input
              id="label"
              name="label"
              type="text"
              placeholder="Pools, DE, Team event"
              defaultValue={entry?.label}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" size="sm">
              {entry ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
