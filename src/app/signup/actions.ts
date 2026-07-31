"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { redirectWithMessage } from "~/lib/redirect-with-message";
import { createClient } from "~/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    redirectWithMessage("/signup", error.message);
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  redirectWithMessage("/signup", "Check your email to confirm your account.");
}
