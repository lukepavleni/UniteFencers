import type { User } from "@supabase/supabase-js";

// `app_metadata` is only writable via the Supabase Auth admin API
// (service-role key), never by the user themselves, so this is safe to trust.
export function isAdmin(user: User | null): boolean {
  return user?.app_metadata?.is_admin === true;
}
