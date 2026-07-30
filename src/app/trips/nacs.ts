// Placeholder NAC list — will be replaced with real tournament data later.
export const NAC_OPTIONS = [
  {
    name: "Example NAC — Riverside",
    city: "Riverside, OH",
    venue: "Example Convention Center",
  },
  {
    name: "Example NAC — Lakeview",
    city: "Lakeview, TX",
    venue: "Example Sports Complex",
  },
  {
    name: "Example NAC — Fairview",
    city: "Fairview, CA",
    venue: "Example Arena",
  },
  {
    name: "Example NAC — Brookside",
    city: "Brookside, NY",
    venue: "Example Fieldhouse",
  },
  {
    name: "Example NAC — Hillcrest",
    city: "Hillcrest, GA",
    venue: "Example Expo Center",
  },
] as const;

export type NacOption = (typeof NAC_OPTIONS)[number];

export function findNacByName(name: string): NacOption | undefined {
  return NAC_OPTIONS.find((nac) => nac.name === name);
}
