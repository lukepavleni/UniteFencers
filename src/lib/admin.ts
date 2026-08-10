import type { User } from "@supabase/supabase-js";
import { createClient } from "~/lib/supabase/server";

// Only this account may access admin features, even if `is_admin` is ever
// set on another profile.
const ADMIN_EMAIL = "lukepavleni@gmail.com";

// `profiles.is_admin` can only be flipped by the service-role client — see
// the `revoke update (is_admin)` in the add_profiles_is_admin migration —
// so a user's own session can never set this on themselves.
export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user || user.email !== ADMIN_EMAIL) {
    return false;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return data?.is_admin === true;
}
