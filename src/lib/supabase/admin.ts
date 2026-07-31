import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "~/env";

// Bypasses Row Level Security entirely — only import this in server-only
// code (Server Components, Server Actions, Route Handlers), never in a
// "use client" file, since it authenticates with the service-role key.
export function createAdminClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (from the Supabase dashboard → Settings → API) to use admin features.",
    );
  }

  return createSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
