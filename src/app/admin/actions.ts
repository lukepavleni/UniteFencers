"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "~/lib/admin";
import { createAdminClient } from "~/lib/supabase/admin";
import { createClient } from "~/lib/supabase/server";

export async function sendAdminMessage(
  recipientId: string,
  formData: FormData,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdmin(user)) {
    redirect("/");
  }

  const body = (formData.get("body") as string | null)?.trim();

  if (!body) {
    redirect(
      `/admin?message=${encodeURIComponent("Message cannot be empty.")}`,
    );
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.from("messages").insert({
    sender_id: user.id,
    recipient_id: recipientId,
    body,
  });

  if (error) {
    redirect(`/admin?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin");
  redirect(`/admin?message=${encodeURIComponent("Message sent.")}`);
}
