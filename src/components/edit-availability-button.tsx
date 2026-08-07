"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { updateTrip } from "~/app/trips/actions";
import { AvailabilityCalendar } from "~/components/availability-calendar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { Trip } from "~/lib/trips";

export function EditAvailabilityButton({ trip }: { trip: Trip }) {
  const [open, setOpen] = useState(false);
  const [availableDates, setAvailableDates] = useState<Set<string>>(
    () => new Set(trip.available_dates),
  );

  function toggleDate(date: string) {
    setAvailableDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  }

  const updateAvailability = updateTrip.bind(null, trip.id);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setAvailableDates(new Set(trip.available_dates));
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Edit knockout dates"
        >
          <CalendarDays className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit your knockout dates</DialogTitle>
        <form
          action={updateAvailability}
          onSubmit={() => setOpen(false)}
          className="mt-4 flex flex-col gap-4"
        >
          <input type="hidden" name="nacName" value={trip.nac_name} />
          <input type="hidden" name="arrivalDate" value={trip.arrival_date} />
          <input
            type="hidden"
            name="departureDate"
            value={trip.departure_date}
          />
          {Array.from(availableDates)
            .sort()
            .map((date) => (
              <input
                key={date}
                type="hidden"
                name="availableDates"
                value={date}
              />
            ))}
          <AvailabilityCalendar
            arrivalDate={trip.arrival_date}
            departureDate={trip.departure_date}
            availableDates={availableDates}
            onToggleDate={toggleDate}
          />
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
