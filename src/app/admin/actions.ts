"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "~/lib/auth";
import { redirectWithMessage } from "~/lib/redirect-with-message";
import { createAdminClient } from "~/lib/supabase/admin";

export async function sendAdminMessage(
  recipientId: string,
  formData: FormData,
) {
  const user = await requireAdmin();

  const body = (formData.get("body") as string | null)?.trim();

  if (!body) {
    redirectWithMessage("/admin", "Message cannot be empty.");
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.from("messages").insert({
    sender_id: user.id,
    recipient_id: recipientId,
    body,
  });

  if (error) {
    redirectWithMessage("/admin", error.message);
  }

  revalidatePath("/admin");
  redirectWithMessage("/admin", "Message sent.");
}
