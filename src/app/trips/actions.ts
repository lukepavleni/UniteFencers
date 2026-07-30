"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { findNacByName } from "./nacs";

interface TripInput {
  nacName: string;
  arrivalDate: string;
  departureDate: string;
  availableStartDate: string;
  availableEndDate: string;
}

function parseTripInput(formData: FormData): TripInput {
  return {
    nacName: formData.get("nacName") as string,
    arrivalDate: formData.get("arrivalDate") as string,
    departureDate: formData.get("departureDate") as string,
    availableStartDate: formData.get("availableStartDate") as string,
    availableEndDate: formData.get("availableEndDate") as string,
  };
}

function validateTripInput(input: TripInput): string | null {
  const nac = findNacByName(input.nacName);
  if (!nac) {
    return "Please select a valid NAC.";
  }

  if (
    !input.arrivalDate ||
    !input.departureDate ||
    !input.availableStartDate ||
    !input.availableEndDate
  ) {
    return "Please fill in all dates.";
  }

  if (input.departureDate < input.arrivalDate) {
    return "Departure date must be on or after the arrival date.";
  }

  if (input.availableEndDate < input.availableStartDate) {
    return "The 'available to volunteer' end date must be on or after the start date.";
  }

  if (
    input.availableStartDate < input.arrivalDate ||
    input.availableEndDate > input.departureDate
  ) {
    return "Your available-to-volunteer dates must fall within your arrival and departure dates.";
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
    available_start_date: input.availableStartDate,
    available_end_date: input.availableEndDate,
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
      available_start_date: input.availableStartDate,
      available_end_date: input.availableEndDate,
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
