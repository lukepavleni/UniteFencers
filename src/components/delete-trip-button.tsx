"use client";

import { useState } from "react";
import { deleteTrip } from "~/app/trips/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function DeleteTripButton({
  tripId,
  nacName,
}: {
  tripId: string;
  nacName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
        >
          Delete Trip
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete {nacName}?</DialogTitle>
        <p className="mt-2 text-sm text-muted-foreground">
          This will permanently delete this trip and any volunteering plans
          saved against it. This can't be undone.
        </p>
        <form
          action={deleteTrip.bind(null, tripId)}
          className="mt-4 flex justify-end gap-2"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="destructive" size="sm">
            Delete
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
