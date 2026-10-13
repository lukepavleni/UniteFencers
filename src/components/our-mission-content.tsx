import { Handshake, Heart, HeartHandshake, Users } from "lucide-react";
import { PageHeader } from "~/components/page-header";

const PILLARS = [
  {
    icon: Users,
    title: "Connect",
    body: "Connect traveling fencers with local volunteer organizations in tournament host cities.",
    style: "border-tone-sky/30 bg-tone-sky/10",
    chip: "bg-tone-sky",
  },
  {
    icon: Handshake,
    title: "Contribute",
    body: "Turn time between competitions into meaningful community service.",
    style: "border-navy/30 bg-navy/10",
    chip: "bg-navy",
  },
  {
    icon: Heart,
    title: "Give back",
    body: "Make a positive impact in the communities that welcome us.",
    style: "border-brand/30 bg-brand/10",
    chip: "bg-brand",
  },
];

export function OurMissionContent() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        icon={HeartHandshake}
        title="Our Mission"
        description="Connecting the Fencing Community Through Service"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className={`flex flex-col gap-3 rounded-xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${pillar.style}`}
          >
            <span
              className={`flex size-11 items-center justify-center rounded-xl text-white shadow-sm ${pillar.chip}`}
            >
              <pillar.icon className="size-5" />
            </span>
            <p className="text-lg font-semibold">{pillar.title}</p>
            <p className="text-sm text-muted-foreground">{pillar.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1.5 rounded-full bg-brand" />
          Our Mission
        </h2>
        <p>
          Every year, competitive fencers travel across the country for
          tournaments, visiting communities they might otherwise never
          experience.
        </p>
        <p>
          At the same time, local nonprofits and community organizations are
          looking for volunteers.
        </p>
        <p className="rounded-xl border-l-4 border-l-brand bg-brand/10 p-4 text-lg font-semibold">
          UniteFencers was created to bridge that gap.
        </p>
        <p>
          Our platform uses technology to automatically discover volunteer
          opportunities near national fencing competitions, making it easier for
          fencers to connect with local organizations and turn their time
          between competitions into meaningful service.
        </p>
        <p>
          By simplifying the search for volunteer opportunities, we hope to
          inspire more athletes to give back wherever they compete.
        </p>
        <p className="font-semibold">
          Our goal is simple: turn every fencing trip into an opportunity to
          make a difference.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-navy/30 bg-navy/10 p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1.5 rounded-full bg-navy" />
          Why It Matters
        </h2>
        <p>
          Fencing takes athletes to cities across the country. Each trip is an
          opportunity not only to compete, but also to connect with and
          contribute to the local community.
        </p>
        <p>
          By making volunteer opportunities easier to discover, UniteFencers
          helps athletes turn their passion for fencing into a positive impact
          beyond the sport.
        </p>
        <p className="font-semibold">
          We believe that the communities we visit should benefit from our
          presence, too.
        </p>
      </div>
    </div>
  );
}
