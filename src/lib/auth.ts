import { redirect } from "next/navigation";
import { cache } from "react";
import { isAdmin } from "~/lib/admin";
import { createClient } from "~/lib/supabase/server";

// Memoized per-request (React's request cache), so Navbar and the page it
// wraps share a single Supabase Auth round trip instead of each making one.
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!(await isAdmin(user))) {
    redirect("/");
  }
  return user;
}
