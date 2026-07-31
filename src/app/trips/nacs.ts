// Placeholder NAC list — will be replaced with real tournament data later.
// startDate/endDate are placeholder tournament dates used to pre-fill a
// trip's arrival/departure when a NAC is selected.
export const NAC_OPTIONS = [
  {
    name: "Example NAC — Riverside",
    city: "Riverside, OH",
    venue: "Example Convention Center",
    startDate: "2026-08-06",
    endDate: "2026-08-09",
  },
  {
    name: "Example NAC — Lakeview",
    city: "Lakeview, TX",
    venue: "Example Sports Complex",
    startDate: "2026-09-10",
    endDate: "2026-09-13",
  },
  {
    name: "Example NAC — Fairview",
    city: "Fairview, CA",
    venue: "Example Arena",
    startDate: "2026-10-15",
    endDate: "2026-10-18",
  },
  {
    name: "Example NAC — Brookside",
    city: "Brookside, NY",
    venue: "Example Fieldhouse",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
  },
  {
    name: "Example NAC — Hillcrest",
    city: "Hillcrest, GA",
    venue: "Example Expo Center",
    startDate: "2026-12-03",
    endDate: "2026-12-06",
  },
] as const;

export type NacOption = (typeof NAC_OPTIONS)[number];

export function findNacByName(name: string): NacOption | undefined {
  return NAC_OPTIONS.find((nac) => nac.name === name);
}
