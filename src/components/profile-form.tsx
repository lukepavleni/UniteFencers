"use client";

import { useState } from "react";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { ProfileRole } from "~/lib/profile";

const selectClassName =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

interface ProfileFormDefaults {
  name?: string;
  role?: ProfileRole;
  dateOfBirth?: string;
}

export function ProfileForm({
  action,
  submitLabel,
  defaultValues,
  message,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: ProfileFormDefaults;
  message?: string;
}) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [role, setRole] = useState<ProfileRole | "">(defaultValues?.role ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(
    defaultValues?.dateOfBirth ?? "",
  );

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-lg border border-border p-6"
    >
      <div className="flex items-center gap-4">
        <Avatar name={name} className="size-14 text-xl" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="role">I am a...</Label>
        <select
          id="role"
          name="role"
          required
          value={role}
          onChange={(event) => setRole(event.target.value as ProfileRole)}
          className={selectClassName}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="adult">Parent / Adult</option>
          <option value="minor">Minor</option>
        </select>
      </div>

      {role === "minor" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </div>
      )}

      {message && (
        <p className="rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
          {message}
        </p>
      )}

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
