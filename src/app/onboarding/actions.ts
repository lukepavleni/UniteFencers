"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "~/lib/auth";
import { parseProfileInput, validateProfileInput } from "~/lib/profile";
import { redirectWithMessage } from "~/lib/redirect-with-message";
import { createClient } from "~/lib/supabase/server";

export async function completeOnboarding(formData: FormData) {
  const user = await requireUser();

  const input = parseProfileInput(formData);
  const validationError = validateProfileInput(input);
  if (validationError) {
    redirectWithMessage("/onboarding", validationError);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      name: input.name,
      role: input.role,
      date_of_birth: input.role === "minor" ? input.dateOfBirth : null,
    },
    { onConflict: "id" },
  );

  if (error) {
    redirectWithMessage("/onboarding", error.message);
  }

  const { error: updateUserError } = await supabase.auth.updateUser({
    data: { onboarding_complete: true },
  });

  if (updateUserError) {
    redirectWithMessage("/onboarding", updateUserError.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
