"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

const SIGNED_IN_LINKS = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "My Trips" },
  { href: "/service-hours", label: "Service Hours" },
];

export function NavLinks() {
  const pathname = usePathname();

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
