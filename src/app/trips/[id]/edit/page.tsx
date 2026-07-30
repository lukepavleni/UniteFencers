import { redirect } from "next/navigation";
import { TripForm } from "~/components/trip-form";
import { createClient } from "~/lib/supabase/server";
import { updateTrip } from "../../actions";

export default async function EditTripPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string }>;
}) {
  const { id } = await params;
  const { message } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: trip } = await supabase
    .from("trips")
    .select(
      "id, nac_name, city, venue, arrival_date, departure_date, available_start_date, available_end_date",
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!trip) {
    redirect("/trips");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Edit Trip</h1>
        <p className="text-sm text-muted-foreground">
          Update your NAC and dates.
        </p>
      </div>

      <TripForm
        action={updateTrip.bind(null, trip.id)}
        submitLabel="Save Changes"
        message={message}
        defaultValues={{
          nacName: trip.nac_name,
          arrivalDate: trip.arrival_date,
          departureDate: trip.departure_date,
          availableStartDate: trip.available_start_date,
          availableEndDate: trip.available_end_date,
        }}
      />
    </main>
  );
}
