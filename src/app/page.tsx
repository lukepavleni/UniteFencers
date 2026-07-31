import {
  Building2,
  Clock,
  Heart,
  MapPin,
  Navigation,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Dashboard } from "~/components/dashboard";
import { Button } from "~/components/ui/button";
import { getCurrentUser } from "~/lib/auth";

const steps = [
  {
    icon: MapPin,
    title: "Find your tournament",
    description:
      "Search for volunteer opportunities near the fencing tournament you're already attending.",
  },
  {
    icon: Search,
    title: "Browse opportunities",
    description:
      "See what's nearby, when it's happening, and how much time it takes.",
  },
  {
    icon: Heart,
    title: "Sign up and help out",
    description:
      "Claim a spot and turn your downtime between bouts into real community impact.",
  },
];

const benefits = [
  {
    icon: Navigation,
    title: "Convenient",
    description:
      "Opportunities are close to the venue, so there's no extra travel required.",
  },
  {
    icon: Clock,
    title: "Flexible",
    description:
      "Short time slots fit around your matches, so volunteering doesn't compete with competing.",
  },
  {
    icon: Heart,
    title: "Meaningful",
    description:
      "Every opportunity supports a real local organization, not just a checkbox.",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Competitive fencers",
    description:
      "Make good use of the gaps between pools and elimination rounds.",
  },
  {
    icon: Building2,
    title: "Teams and clubs",
    description:
      "Coordinate a group volunteer activity while you're already together.",
  },
  {
    icon: Heart,
    title: "Parents and families",
    description:
      "Find something worthwhile to do during the long stretches of a tournament day.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    return <Dashboard userId={user.id} />;
  }

  return <MarketingPage />;
}

function MarketingPage() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col items-center gap-16 px-4 py-20 sm:gap-20 sm:py-28">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Turn Free Time Into{" "}
            <span className="text-brand">Community Impact.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Find convenient volunteer opportunities near fencing tournaments and
            turn your free time into meaningful service.
          </p>
          <Button size="lg" asChild>
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-border px-4 py-16 sm:py-20"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          <div className="flex max-w-xl flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How UniteFencers Works
            </h2>
            <p className="text-muted-foreground">
              A simple way to fill the downtime at a tournament with something
              worthwhile.
            </p>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-navy text-navy-foreground">
                  <step.icon className="size-5 text-brand" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Step {index + 1}
                </p>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 px-4 py-16 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          <div className="flex max-w-xl flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why It's Useful
            </h2>
            <p className="text-muted-foreground">
              Volunteering shouldn't add stress to tournament weekends.
            </p>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-navy text-navy-foreground">
                  <benefit.icon className="size-5 text-brand" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          <div className="flex max-w-xl flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Who It's For
            </h2>
            <p className="text-muted-foreground">
              Anyone spending a weekend at a fencing tournament.
            </p>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-navy text-navy-foreground">
                  <audience.icon className="size-5 text-brand" />
                </div>
                <h3 className="font-semibold">{audience.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-navy px-4 py-16 text-navy-foreground sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="text-navy-foreground/70">
            Create an account and find volunteer opportunities at your next
            tournament.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 UniteFencers</p>
          <p>Made for the fencing community.</p>
        </div>
      </footer>
    </main>
  );
}
