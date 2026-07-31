"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseProfileInput, validateProfileInput } from "~/lib/profile";
import { createClient } from "~/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const input = parseProfileInput(formData);
  const validationError = validateProfileInput(input);
  if (validationError) {
    redirect(`/profile?message=${encodeURIComponent(validationError)}`);
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      name: input.name,
      role: input.role,
      date_of_birth: input.role === "minor" ? input.dateOfBirth : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    redirect(`/profile?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/profile");
  redirect(`/profile?message=${encodeURIComponent("Profile updated.")}`);
}
