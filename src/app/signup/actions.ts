"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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
    redirect(`/signup?message=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  redirect("/signup?message=Check your email to confirm your account.");
}
