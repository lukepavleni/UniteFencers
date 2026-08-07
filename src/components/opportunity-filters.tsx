"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";

const DISTANCE_OPTIONS = [
  { value: "5", label: "Within 5 miles" },
  { value: "10", label: "Within 10 miles" },
  { value: "25", label: "Within 25 miles" },
  { value: "any", label: "Any distance" },
];

const QUALIFICATION_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "walk-in", label: "Walk-in accepted" },
  { value: "registration", label: "Registration required" },
];

export function OpportunityFilters({
  defaultDistance,
  defaultQualification,
}: {
  defaultDistance: string;
  defaultQualification: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="distance-filter">Distance</Label>
        <Select
          id="distance-filter"
          value={defaultDistance}
          onChange={(event) => updateParam("distance", event.target.value)}
        >
          {DISTANCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="qualification-filter">Sign-up type</Label>
        <Select
          id="qualification-filter"
          value={defaultQualification}
          onChange={(event) => updateParam("qualification", event.target.value)}
        >
          {QUALIFICATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
