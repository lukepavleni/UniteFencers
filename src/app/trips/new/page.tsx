import { TripForm } from "~/components/trip-form";
import { requireUser } from "~/lib/auth";
import { createTrip } from "../actions";

export default async function NewTripPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; nac?: string }>;
}) {
  const { message, nac } = await searchParams;
  await requireUser();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Plan Your Volunteering
        </h1>
        <p className="text-sm text-muted-foreground">
          Tell us which NAC you're attending and your dates. We'll save this as
          a trip so you can find volunteer opportunities near it.
        </p>
      </div>

      <TripForm
        action={createTrip}
        submitLabel="Save Trip"
        message={message}
        defaultValues={nac ? { nacName: nac } : undefined}
      />
    </main>
  );
}
