"use client";

import { Clock, Heart, Home, MapPin, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trips", label: "My Trips", icon: MapPin },
  { href: "/service-hours", label: "Service Hours", icon: Clock },
  { href: "/mission", label: "Our Mission", icon: Heart },
  { href: "/about-luke", label: "About us", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-52 shrink-0 flex-col gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            className={cn(
              "justify-start gap-2",
              isActive && "bg-brand/10 font-semibold text-brand",
            )}
          >
            <Link href={item.href} aria-current={isActive ? "page" : undefined}>
              <item.icon className="size-4" />
              {item.label}
            </Link>
          </Button>
        );
      })}
    </aside>
  );
}
