"use client";

import { useState } from "react";
import { logVolunteerHours } from "~/app/trips/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function LogHoursButton({
  planId,
  opportunityName,
  knownHours,
}: {
  planId: string;
  opportunityName: string;
  knownHours: number | null;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"ask" | "manual-hours">("ask");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const manualTotalMinutes = Number(hours || 0) * 60 + Number(minutes || 0);

  function resetAndClose() {
    setOpen(false);
    setStep("ask");
    setHours("");
    setMinutes("");
  }

  const logHours = logVolunteerHours.bind(null, planId);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setStep("ask");
          setHours("");
          setMinutes("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          Log Hours
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Did you complete "{opportunityName}"?</DialogTitle>

        {step === "ask" && (
          <div className="mt-4 flex justify-end gap-2">
            <form action={logHours} onSubmit={() => resetAndClose()}>
              <input type="hidden" name="attended" value="no" />
              <Button type="submit" variant="outline" size="sm">
                No, I didn't
              </Button>
            </form>
            {knownHours != null ? (
              <form action={logHours} onSubmit={() => resetAndClose()}>
                <input type="hidden" name="attended" value="yes" />
                <Button type="submit" size="sm">
                  Yes, I completed it
                </Button>
              </form>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={() => setStep("manual-hours")}
              >
                Yes, I completed it
              </Button>
            )}
          </div>
        )}

        {step === "manual-hours" && (
          <form
            action={logHours}
            onSubmit={() => resetAndClose()}
            className="mt-4 flex flex-col gap-4"
          >
            <input type="hidden" name="attended" value="yes" />
            <p className="text-sm text-muted-foreground">
              How long did you volunteer for?
            </p>
            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  min={0}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep("ask")}
              >
                Back
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={manualTotalMinutes <= 0}
              >
                Log Hours
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
