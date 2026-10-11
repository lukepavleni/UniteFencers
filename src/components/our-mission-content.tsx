import { Handshake, Heart, HeartHandshake, Users } from "lucide-react";
import { PageHeader } from "~/components/page-header";

const PILLARS = [
  {
    icon: Users,
    title: "Connect",
    body: "Bring fencers, families, coaches, clubs and organizers together.",
    style: "border-tone-sky/30 bg-tone-sky/10",
    chip: "bg-tone-sky",
  },
  {
    icon: Handshake,
    title: "Contribute",
    body: "Help people find where their time and skills are needed.",
    style: "border-tone-emerald/30 bg-tone-emerald/10",
    chip: "bg-tone-emerald",
  },
  {
    icon: Heart,
    title: "Give back",
    body: "Make service a natural part of being involved in the sport.",
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
        <p>
          Our mission is to strengthen the fencing community by making it easier
          for people to connect, contribute, and give back.
        </p>
        <p>
          Fencing events across the country rely on volunteers. Behind every
          tournament are people who give their time to help athletes, families,
          coaches, officials, and organizers create successful events.
        </p>
        <p>
          At the same time, many members of the fencing community are willing to
          help but may not know where their time and skills are needed.
        </p>
        <p className="rounded-xl border-l-4 border-l-brand bg-brand/10 p-4 text-lg font-semibold">
          Unite Fencers was created to connect those two sides.
        </p>
        <p>
          The platform brings together fencers, families, coaches, clubs,
          tournament organizers, and volunteers, making it easier for members of
          the community to find meaningful ways to contribute at the events they
          attend.
        </p>
        <p>
          Our goal is not simply to fill volunteer positions. It is to encourage
          a stronger culture of service within fencing and make volunteering a
          natural part of being involved in the sport.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-tone-violet/30 bg-tone-violet/10 p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1.5 rounded-full bg-tone-violet" />
          Why It Matters
        </h2>
        <p>
          Fencing is about more than competition. It is also about the people
          who make the sport possible.
        </p>
        <p>
          When members of the community volunteer, they help events run more
          smoothly, support fellow fencers, and strengthen the connections that
          make the sport special.
        </p>
        <p>
          Unite Fencers believes that everyone in the fencing community has
          something to contribute.
        </p>
        <p className="font-semibold">
          By making it easier to give back, we can make the entire fencing
          community stronger.
        </p>
      </div>
    </div>
  );
}
