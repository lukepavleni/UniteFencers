"use client";

import { useState } from "react";
import { updateVolunteerHours } from "~/app/trips/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function EditHoursButton({
  planId,
  opportunityName,
  currentHours,
}: {
  planId: string;
  opportunityName: string;
  currentHours: number;
}) {
  const [open, setOpen] = useState(false);
  const initialHours = Math.floor(currentHours);
  const initialMinutes = Math.round((currentHours - initialHours) * 60);
  const [hours, setHours] = useState(String(initialHours));
  const [minutes, setMinutes] = useState(String(initialMinutes));

  const totalMinutes = Number(hours || 0) * 60 + Number(minutes || 0);
  const updateHours = updateVolunteerHours.bind(null, planId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="xs" variant="outline">
          Edit hours
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit logged hours for "{opportunityName}"</DialogTitle>
        <form
          action={updateHours}
          onSubmit={() => setOpen(false)}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="edit-hours">Hours</Label>
              <Input
                id="edit-hours"
                name="hours"
                type="number"
                min={0}
                step={1}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="edit-minutes">Minutes</Label>
              <Input
                id="edit-minutes"
                name="minutes"
                type="number"
                min={0}
                max={59}
                step={1}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={totalMinutes <= 0}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
