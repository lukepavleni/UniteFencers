"use client";

import type { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";

interface MobileNavProps {
  user: User | null;
  isAdmin: boolean;
  signOutAction: () => Promise<void>;
}

const SIGNED_IN_LINKS = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "My Trips" },
  { href: "/service-hours", label: "Service Hours" },
];

export function MobileNav({ user, isAdmin, signOutAction }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {isOpen && (
        <div className="absolute inset-x-0 top-14 z-50 border-b border-border bg-background">
          <nav className="flex flex-col gap-1 p-4">
            {SIGNED_IN_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            {isAdmin && (
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                <Button
                  variant={pathname === "/admin" ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  Admin
                </Button>
              </Link>
            )}
            <Link href="/profile" onClick={() => setIsOpen(false)}>
              <Button
                variant={pathname === "/profile" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
              >
                Profile
              </Button>
            </Link>
            <form action={signOutAction} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Sign Out
              </Button>
            </form>
          </nav>
        </div>
      )}
    </div>
  );
}
