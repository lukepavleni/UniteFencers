"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NacOption } from "~/app/trips/nacs";
import { Select } from "~/components/ui/select";

export function NacSwitcher({
  nacOptions,
  selectedNacName,
}: {
  nacOptions: readonly NacOption[];
  selectedNacName: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(nacName: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("nac", nacName);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      value={selectedNacName}
      onChange={(event) => handleChange(event.target.value)}
      className="w-auto"
      aria-label="Attending competition"
    >
      {nacOptions.map((nac) => (
        <option key={nac.name} value={nac.name}>
          {nac.name} · {nac.city}
        </option>
      ))}
    </Select>
  );
}
