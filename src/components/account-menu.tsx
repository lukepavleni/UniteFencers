"use client";

import type { User } from "@supabase/supabase-js";
import { LogOut, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface AccountMenuProps {
  user: User;
  isAdmin: boolean;
  signOutAction: () => Promise<void>;
}

export function AccountMenu({
  user,
  isAdmin,
  signOutAction,
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fullName = user.user_metadata?.full_name as string | undefined;
  const initials = (fullName || user.email || "U")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="size-8 rounded-full p-0 text-xs font-semibold"
          aria-label="Account menu"
        >
          {initials}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40">
        <div className="flex flex-col gap-1">
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sm"
            >
              <Settings className="size-4" />
              Profile
            </Button>
          </Link>
          {isAdmin && (
            <Link href="/admin" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-sm"
              >
                <Shield className="size-4" />
                Admin
              </Button>
            </Link>
          )}
          <form action={signOutAction} className="w-full">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
