import { NAC_OPTIONS } from "~/app/trips/nacs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const selectClassName =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

interface TripFormDefaults {
  nacName?: string;
  arrivalDate?: string;
  departureDate?: string;
  availableStartDate?: string;
  availableEndDate?: string;
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
  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-lg border border-border p-6"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nacName">NAC</Label>
        <select
          id="nacName"
          name="nacName"
          required
          defaultValue={defaultValues?.nacName ?? ""}
          className={selectClassName}
        >
          <option value="" disabled>
            Select a NAC
          </option>
          {NAC_OPTIONS.map((nac) => (
            <option key={nac.name} value={nac.name}>
              {nac.name} — {nac.city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="arrivalDate">Arrival</Label>
          <Input
            id="arrivalDate"
            name="arrivalDate"
            type="date"
            required
            defaultValue={defaultValues?.arrivalDate}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="departureDate">Departure</Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="date"
            required
            defaultValue={defaultValues?.departureDate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Available to volunteer</p>
        <p className="text-xs text-muted-foreground">
          The days within your trip you're free to volunteer.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="availableStartDate">From</Label>
          <Input
            id="availableStartDate"
            name="availableStartDate"
            type="date"
            required
            defaultValue={defaultValues?.availableStartDate}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="availableEndDate">To</Label>
          <Input
            id="availableEndDate"
            name="availableEndDate"
            type="date"
            required
            defaultValue={defaultValues?.availableEndDate}
          />
        </div>
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
