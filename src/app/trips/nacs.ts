// Real USA Fencing North American Cup / Junior Olympics schedule, sourced
// from https://www.usafencing.org/events-national and each event's own page
// (re-checked Aug 2026). Venue is "Venue TBA" where USA Fencing hasn't
// announced one yet. Only NACs with at least a confirmed city are listed
// here — refresh this list periodically as USA Fencing announces more
// dates/venues (e.g. the Feb/March 2027 NACs have no location announced
// yet). April 2027's venue is inferred from Cincinnati's only convention
// center (recently renamed from Duke Energy Convention Center) — USA
// Fencing hasn't published a dedicated event page confirming it yet.
export const NAC_OPTIONS = [
  {
    name: "October 2026 NAC",
    city: "Orlando, FL",
    venue: "Orange County Convention Center",
    address: "9899 International Dr, Orlando, FL 32819",
    startDate: "2026-10-09",
    endDate: "2026-10-12",
  },
  {
    name: "November 2026 NAC",
    city: "Columbus, OH",
    venue: "Greater Columbus Convention Center",
    address: "400 N High St, Columbus, OH 43215",
    startDate: "2026-11-20",
    endDate: "2026-11-23",
  },
  {
    name: "January 2027 Junior Olympics & Para NAC",
    city: "Oklahoma City, OK",
    venue: "Oklahoma City Convention Center",
    address: "100 Mick Cornett Dr, Oklahoma City, OK 73109",
    startDate: "2027-01-08",
    endDate: "2027-01-11",
  },
  {
    name: "April 2027 NAC",
    city: "Cincinnati, OH",
    venue: "First Financial Center",
    address: "525 Elm St, Cincinnati, OH 45202",
    startDate: "2027-04-16",
    endDate: "2027-04-19",
  },
] as const;

export type NacOption = (typeof NAC_OPTIONS)[number];

export function findNacByName(name: string): NacOption | undefined {
  return NAC_OPTIONS.find((nac) => nac.name === name);
}
