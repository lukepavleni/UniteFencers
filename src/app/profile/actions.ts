"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "~/lib/auth";
import { parseProfileInput, validateProfileInput } from "~/lib/profile";
import { redirectWithMessage } from "~/lib/redirect-with-message";
import { createClient } from "~/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const user = await requireUser();

  const input = parseProfileInput(formData);
  const validationError = validateProfileInput(input);
  if (validationError) {
    redirectWithMessage("/profile", validationError);
  }

  const supabase = await createClient();
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
    redirectWithMessage("/profile", error.message);
  }

  revalidatePath("/profile");
  redirectWithMessage("/profile", "Profile updated.");
}
