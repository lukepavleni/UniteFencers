import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { isAdmin } from "~/lib/admin";
import { getCurrentUser } from "~/lib/auth";
import { createClient } from "~/lib/supabase/server";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "My Trips" },
  { href: "/service-hours", label: "Service Hours" },
  { href: "/profile", label: "Profile" },
];

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
          UniteFencers
        </Link>

        {user ? (
          <div className="flex flex-wrap items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            {isAdmin(user) && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">Admin</Link>
              </Button>
            )}
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sign Out
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
