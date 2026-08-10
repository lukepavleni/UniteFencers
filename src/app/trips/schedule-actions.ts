"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "~/lib/auth";
import { createClient } from "~/lib/supabase/server";

function parseScheduleEntryInput(formData: FormData) {
  return {
    eventDate: formData.get("eventDate") as string,
    eventTime: (formData.get("eventTime") as string) || null,
    label: formData.get("label") as string,
  };
}

export async function addScheduleEntry(tripId: string, formData: FormData) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: trip } = await supabase
    .from("trips")
    .select("id")
    .eq("id", tripId)
    .eq("user_id", user.id)
    .single();
  if (!trip) return;

  const { eventDate, eventTime, label } = parseScheduleEntryInput(formData);
  if (!eventDate || !label) return;

  await supabase.from("fencing_schedule_entries").insert({
    trip_id: tripId,
    user_id: user.id,
    event_date: eventDate,
    event_time: eventTime,
    label,
  });

  revalidatePath("/");
}

export async function updateScheduleEntry(entryId: string, formData: FormData) {
  const user = await requireUser();
  const supabase = await createClient();

  const { eventDate, eventTime, label } = parseScheduleEntryInput(formData);
  if (!eventDate || !label) return;

  await supabase
    .from("fencing_schedule_entries")
    .update({ event_date: eventDate, event_time: eventTime, label })
    .eq("id", entryId)
    .eq("user_id", user.id);

  revalidatePath("/");
}

export async function deleteScheduleEntry(entryId: string) {
  const user = await requireUser();
  const supabase = await createClient();

  await supabase
    .from("fencing_schedule_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", user.id);

  revalidatePath("/");
}
