import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "~/env";

export async function createClient(options?: { rememberMe?: boolean }) {
  const cookieStore = await cookies();
  const rememberMe = options?.rememberMe ?? true;

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              // When the user doesn't check "remember me", drop the
              // persistence lifetime so the auth cookie becomes a
              // session cookie (cleared when the browser fully closes)
              // instead of surviving across restarts.
              const cookieOptions = rememberMe
                ? options
                : { ...options, maxAge: undefined, expires: undefined };
              cookieStore.set(name, value, cookieOptions);
            }
          } catch {
            // The `setAll` method is called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    },
  );
}
