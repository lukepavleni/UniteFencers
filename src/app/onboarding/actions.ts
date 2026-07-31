"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseProfileInput, validateProfileInput } from "~/lib/profile";
import { createClient } from "~/lib/supabase/server";

export async function completeOnboarding(formData: FormData) {
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
    redirect(`/onboarding?message=${encodeURIComponent(validationError)}`);
  }

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
    redirect(`/onboarding?message=${encodeURIComponent(error.message)}`);
  }

  const { error: updateUserError } = await supabase.auth.updateUser({
    data: { onboarding_complete: true },
  });

  if (updateUserError) {
    redirect(
      `/onboarding?message=${encodeURIComponent(updateUserError.message)}`,
    );
  }

  revalidatePath("/", "layout");
  redirect("/");
}
