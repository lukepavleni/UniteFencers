import { CalendarDays, MapPin, Search, UserRound, Zap } from "lucide-react";
import { PageHeader } from "~/components/page-header";

const STEPS = [
  { icon: MapPin, label: "Choose your event", style: "bg-tone-sky" },
  { icon: CalendarDays, label: "Select your dates", style: "bg-tone-violet" },
  { icon: Search, label: "Find an opportunity", style: "bg-tone-emerald" },
  { icon: Zap, label: "Sign up", style: "bg-brand" },
];

export function AboutLukeContent() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        icon={UserRound}
        title="Meet Luke"
        description="Fencer and creator of Unite Fencers"
      />

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p>
          Luke is a fencer and the creator of Unite Fencers. Through his
          involvement in fencing, he has seen how much time and effort goes into
          making tournaments and national events happen, and how important
          volunteers are to the sport.
        </p>
        <p>
          He created Unite Fencers to make it easier for fencers and families to
          find volunteer opportunities at the events they are already attending.
          The idea is simple:
        </p>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3"
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm ${step.style}`}
              >
                <step.icon className="size-4" />
              </span>
              <span className="text-sm font-semibold">
                {index + 1}. {step.label}
              </span>
            </div>
          ))}
        </div>

        <p>
          Luke wanted to create something practical that could help connect the
          fencing community and make it easier for people to give back to the
          sport.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-brand/30 bg-brand/10 p-6 shadow-sm sm:p-8">
        <p>
          For Luke, fencing is about more than competing. It is also about being
          part of a community and helping make the sport better for everyone.
        </p>
        <p className="text-lg font-semibold">
          Unite Fencers is Luke's effort to use technology to solve a real need
          within the sport he loves.
        </p>
      </div>
    </div>
  );
}
