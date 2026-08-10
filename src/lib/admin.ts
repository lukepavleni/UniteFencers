import type { User } from "@supabase/supabase-js";

// Only this account may access admin features, even if `is_admin` is ever
// set on another user's app_metadata.
const ADMIN_EMAIL = "lukepavleni@gmail.com";

// `app_metadata` is only writable via the Supabase Auth admin API
// (service-role key), never by the user themselves, so this is safe to trust.
export function isAdmin(user: User | null): boolean {
  return user?.app_metadata?.is_admin === true && user?.email === ADMIN_EMAIL;
}
