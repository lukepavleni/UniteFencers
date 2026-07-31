"use client";

import { cn } from "~/lib/utils";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthsInRange(
  start: string,
  end: string,
): { year: number; month: number }[] {
  if (!start || !end || end < start) return [];

  const months: { year: number; month: number }[] = [];
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  while (cursor <= endDate) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}

function getMonthDates(year: number, month: number): string[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from(
    { length: daysInMonth },
    (_, day) =>
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`,
  );
}

export function AvailabilityCalendar({
  arrivalDate,
  departureDate,
  availableDates,
  onToggleDate,
}: {
  arrivalDate: string;
  departureDate: string;
  availableDates: Set<string>;
  onToggleDate: (date: string) => void;
}) {
  const months = getMonthsInRange(arrivalDate, departureDate);

  if (months.length === 0) {
    return (
      <p className="max-w-64 text-sm text-muted-foreground">
        Set your arrival and departure dates first.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium">Available to volunteer</p>
        <p className="max-w-64 text-xs text-muted-foreground">
          Click a day to mark it as a knockout day (not available).
        </p>
      </div>

      {months.map(({ year, month }) => {
        const monthDates = getMonthDates(year, month);
        const firstWeekday = new Date(`${monthDates[0]}T00:00:00`).getDay();

        return (
          <div key={`${year}-${month}`} className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-muted-foreground">
              {MONTH_LABELS[month]} {year}
            </p>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthDates.map((date, index) => {
                const inRange = date >= arrivalDate && date <= departureDate;
                const isAvailable = availableDates.has(date);
                const dayNumber = Number(date.slice(8, 10));

                return (
                  <button
                    key={date}
                    type="button"
                    disabled={!inRange}
                    onClick={() => onToggleDate(date)}
                    style={
                      index === 0
                        ? { gridColumnStart: firstWeekday + 1 }
                        : undefined
                    }
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-md text-xs font-medium transition-colors",
                      !inRange && "text-muted-foreground/30",
                      inRange &&
                        isAvailable &&
                        "bg-primary text-primary-foreground",
                      inRange &&
                        !isAvailable &&
                        "bg-destructive/10 text-destructive line-through",
                    )}
                  >
                    {dayNumber}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-primary" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-destructive/40" /> Knockout
        </span>
      </div>
    </div>
  );
}
