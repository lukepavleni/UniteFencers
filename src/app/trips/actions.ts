"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "~/lib/auth";
import { redirectWithMessage } from "~/lib/redirect-with-message";
import { createClient } from "~/lib/supabase/server";
import { findNacByName, type NacOption } from "./nacs";

interface TripInput {
  nacName: string;
  arrivalDate: string;
  departureDate: string;
  availableDates: string[];
}

interface ValidatedTripInput {
  nac: NacOption;
  arrivalDate: string;
  departureDate: string;
  availableDates: string[];
}

function parseTripInput(formData: FormData): TripInput {
  return {
    nacName: formData.get("nacName") as string,
    arrivalDate: formData.get("arrivalDate") as string,
    departureDate: formData.get("departureDate") as string,
    availableDates: formData.getAll("availableDates") as string[],
  };
}

function validateTripInput(
  input: TripInput,
): { error: string } | { error: null; data: ValidatedTripInput } {
  const nac = findNacByName(input.nacName);
  if (!nac) {
    return { error: "Please select a valid NAC." };
  }

  if (!input.arrivalDate || !input.departureDate) {
    return { error: "Please fill in your arrival and departure dates." };
  }

  if (input.departureDate < input.arrivalDate) {
    return { error: "Departure date must be on or after the arrival date." };
  }

  if (input.availableDates.length === 0) {
    return {
      error: "Select at least one day you're available to volunteer.",
    };
  }

  const outOfRange = input.availableDates.some(
    (date) => date < input.arrivalDate || date > input.departureDate,
  );
  if (outOfRange) {
    return {
      error:
        "Your available dates must fall within your arrival and departure dates.",
    };
  }

  return {
    error: null,
    data: {
      nac,
      arrivalDate: input.arrivalDate,
      departureDate: input.departureDate,
      availableDates: input.availableDates,
    },
  };
}

export async function createTrip(formData: FormData) {
  const user = await requireUser();

  const validated = validateTripInput(parseTripInput(formData));
  if (validated.error !== null) {
    redirectWithMessage("/trips/new", validated.error);
  }

  const { nac, arrivalDate, departureDate, availableDates } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase.from("trips").insert({
    user_id: user.id,
    nac_name: nac.name,
    city: nac.city,
    venue: nac.venue,
    arrival_date: arrivalDate,
    departure_date: departureDate,
    available_dates: availableDates,
  });

  if (error) {
    redirectWithMessage("/trips/new", error.message);
  }

  revalidatePath("/");
  revalidatePath("/trips");
  redirectWithMessage("/trips", "Trip saved.");
}

export async function updateTrip(tripId: string, formData: FormData) {
  const user = await requireUser();

  const validated = validateTripInput(parseTripInput(formData));
  if (validated.error !== null) {
    redirectWithMessage(`/trips/${tripId}/edit`, validated.error);
  }

  const { nac, arrivalDate, departureDate, availableDates } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("trips")
    .update({
      nac_name: nac.name,
      city: nac.city,
      venue: nac.venue,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      available_dates: availableDates,
    })
    .eq("id", tripId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(`/trips/${tripId}/edit`, error.message);
  }

  revalidatePath("/");
  revalidatePath("/trips");
  redirectWithMessage("/trips", "Trip updated.");
}
