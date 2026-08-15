import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountMenu } from "~/components/account-menu";
import { MobileNav } from "~/components/mobile-nav";
import { NavLinks } from "~/components/nav-links";
import { Button } from "~/components/ui/button";
import { isAdmin } from "~/lib/admin";
import { getCurrentUser } from "~/lib/auth";
import { createClient } from "~/lib/supabase/server";

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function Navbar() {
  const user = await getCurrentUser();
  const admin = await isAdmin(user);

  return (
    <nav className="relative border-b border-border bg-background">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-x-4 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
          >
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-navy">Unite</span>
            <span className="text-brand">Fencers</span>
          </Link>
          {user && <NavLinks />}
        </div>

        {user ? (
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden md:block">
              <AccountMenu
                user={user}
                isAdmin={admin}
                signOutAction={signOut}
              />
            </div>
            <MobileNav user={user} isAdmin={admin} signOutAction={signOut} />
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
