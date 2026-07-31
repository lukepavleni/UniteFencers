"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { findNacByName } from "./nacs";

interface TripInput {
  nacName: string;
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

function validateTripInput(input: TripInput): string | null {
  const nac = findNacByName(input.nacName);
  if (!nac) {
    return "Please select a valid NAC.";
  }

  if (!input.arrivalDate || !input.departureDate) {
    return "Please fill in your arrival and departure dates.";
  }

  if (input.departureDate < input.arrivalDate) {
    return "Departure date must be on or after the arrival date.";
  }

  if (input.availableDates.length === 0) {
    return "Select at least one day you're available to volunteer.";
  }

  const outOfRange = input.availableDates.some(
    (date) => date < input.arrivalDate || date > input.departureDate,
  );
  if (outOfRange) {
    return "Your available dates must fall within your arrival and departure dates.";
  }

  return null;
}

export async function createTrip(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const input = parseTripInput(formData);
  const validationError = validateTripInput(input);
  if (validationError) {
    redirect(`/trips/new?message=${encodeURIComponent(validationError)}`);
  }

  const nac = findNacByName(input.nacName);
  if (!nac) {
    redirect(
      `/trips/new?message=${encodeURIComponent("Please select a valid NAC.")}`,
    );
  }

  const { error } = await supabase.from("trips").insert({
    user_id: user.id,
    nac_name: nac.name,
    city: nac.city,
    venue: nac.venue,
    arrival_date: input.arrivalDate,
    departure_date: input.departureDate,
    available_dates: input.availableDates,
  });

  if (error) {
    redirect(`/trips/new?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/trips");
  redirect(`/trips?message=${encodeURIComponent("Trip saved.")}`);
}

export async function updateTrip(tripId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const input = parseTripInput(formData);
  const validationError = validateTripInput(input);
  if (validationError) {
    redirect(
      `/trips/${tripId}/edit?message=${encodeURIComponent(validationError)}`,
    );
  }

  const nac = findNacByName(input.nacName);
  if (!nac) {
    redirect(
      `/trips/${tripId}/edit?message=${encodeURIComponent("Please select a valid NAC.")}`,
    );
  }

  const { error } = await supabase
    .from("trips")
    .update({
      nac_name: nac.name,
      city: nac.city,
      venue: nac.venue,
      arrival_date: input.arrivalDate,
      departure_date: input.departureDate,
      available_dates: input.availableDates,
    })
    .eq("id", tripId)
    .eq("user_id", user.id);

  if (error) {
    redirect(
      `/trips/${tripId}/edit?message=${encodeURIComponent(error.message)}`,
    );
  }

  revalidatePath("/");
  revalidatePath("/trips");
  redirect(`/trips?message=${encodeURIComponent("Trip updated.")}`);
}
