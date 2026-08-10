"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function OpportunitySignupActions({
  signupUrl,
  addAction,
  isSaved,
}: {
  signupUrl: string;
  addAction?: (formData: FormData) => void | Promise<void>;
  isSaved: boolean;
}) {
  const [hasClickedSignUp, setHasClickedSignUp] = useState(false);
  const canAddToTrip = hasClickedSignUp || isSaved;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild size="sm">
          <a
            href={signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setHasClickedSignUp(true)}
          >
            Sign Up
          </a>
        </Button>
        {addAction && canAddToTrip ? (
          <form action={addAction}>
            <Button
              type="submit"
              size="sm"
              variant={isSaved ? "outline" : "secondary"}
              disabled={isSaved}
              className={cn(
                !isSaved &&
                  hasClickedSignUp &&
                  "border border-brand text-brand",
              )}
            >
              {isSaved ? (
                "Added to My Trip"
              ) : hasClickedSignUp ? (
                <>
                  <Check /> Signed Up — Add to My Trip
                </>
              ) : (
                "Add to My Trip"
              )}
            </Button>
          </form>
        ) : null}
      </div>
      {addAction && !canAddToTrip ? (
        <p className="text-xs text-muted-foreground">
          Sign up above first, then come back here to add it to your trip.
        </p>
      ) : null}
    </div>
  );
}
