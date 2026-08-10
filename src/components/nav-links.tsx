"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

const SIGNED_IN_LINKS = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "My Trips" },
  { href: "/service-hours", label: "Service Hours" },
];

// These 3 routes render AppSidebar instead, so the top nav stays clear there.
const SHELL_ROUTES = new Set(["/", "/trips", "/service-hours"]);

export function NavLinks() {
  const pathname = usePathname();

  if (SHELL_ROUTES.has(pathname)) {
    return null;
  }

  return (
    <div className="hidden items-center gap-1 md:flex">
      {SIGNED_IN_LINKS.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Button
            key={link.href}
            asChild
            variant="ghost"
            size="sm"
            className={
              isActive
                ? "bg-accent font-semibold text-accent-foreground"
                : undefined
            }
          >
            <Link href={link.href} aria-current={isActive ? "page" : undefined}>
              {link.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
