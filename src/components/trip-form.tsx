"use client";

import { useEffect, useRef, useState } from "react";
import { findNacByName, NAC_OPTIONS } from "~/app/trips/nacs";
import { AvailabilityCalendar } from "~/components/availability-calendar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Select } from "~/components/ui/select";
import { addDays, getDatesInRange } from "~/lib/trips";

interface TripFormDefaults {
  nacName?: string;
  arrivalDate?: string;
  departureDate?: string;
  availableDates?: string[];
}

export function TripForm({
  action,
  submitLabel,
  defaultValues,
  message,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: TripFormDefaults;
  message?: string;
}) {
  const [nacName, setNacName] = useState(defaultValues?.nacName ?? "");
  const [arrivalDate, setArrivalDate] = useState(
    defaultValues?.arrivalDate ?? "",
  );
  const [departureDate, setDepartureDate] = useState(
    defaultValues?.departureDate ?? "",
  );
  const [availableDates, setAvailableDates] = useState<Set<string>>(
    () => new Set(defaultValues?.availableDates ?? []),
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Reset to "all days available" whenever the trip's date range changes.
    setAvailableDates(new Set(getDatesInRange(arrivalDate, departureDate)));
  }, [arrivalDate, departureDate]);

  function handleNacChange(value: string) {
    setNacName(value);
    const nac = findNacByName(value);
    if (nac) {
      // Widen a day on each side of the NAC's own dates -- volunteers are
      // usually in town (and available) the day before/after the event too.
      setArrivalDate(addDays(nac.startDate, -1));
      setDepartureDate(addDays(nac.endDate, 1));
      setCalendarOpen(true);
    }
  }

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

  const rangeDates = getDatesInRange(arrivalDate, departureDate);
  const calendarTriggerLabel =
    rangeDates.length === 0
      ? "Set your dates to choose availability"
      : `${availableDates.size} of ${rangeDates.length} days available`;

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-lg border border-border p-6"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nacName">NAC</Label>
        <Select
          id="nacName"
          name="nacName"
          required
          value={nacName}
          onChange={(event) => handleNacChange(event.target.value)}
        >
          <option value="" disabled>
            Select a NAC
          </option>
          {NAC_OPTIONS.map((nac) => (
            <option key={nac.name} value={nac.name}>
              {nac.name} — {nac.city}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="arrivalDate">Arrival</Label>
          <Input
            id="arrivalDate"
            name="arrivalDate"
            type="date"
            required
            value={arrivalDate}
            onChange={(event) => setArrivalDate(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="departureDate">Departure</Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="date"
            required
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Available to volunteer</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={rangeDates.length === 0}
              className="w-full justify-start font-normal"
            >
              {calendarTriggerLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <AvailabilityCalendar
              arrivalDate={arrivalDate}
              departureDate={departureDate}
              availableDates={availableDates}
              onToggleDate={toggleDate}
            />
            <Button
              type="button"
              size="sm"
              className="mt-3 w-full"
              onClick={() => setCalendarOpen(false)}
            >
              Done
            </Button>
          </PopoverContent>
        </Popover>
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
      </div>

      {message && (
        <p className="rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
          {message}
        </p>
      )}

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
