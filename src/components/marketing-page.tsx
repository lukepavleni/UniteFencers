"use client";

import { Heart, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { AboutLukeContent } from "~/components/about-luke-content";
import { OurMissionContent } from "~/components/our-mission-content";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const steps = [
  {
    icon: MapPin,
    title: "Find your tournament",
    description: "See what's nearby.",
  },
  {
    icon: Search,
    title: "Browse opportunities",
    description: "Pick a time that fits your schedule.",
  },
  {
    icon: Heart,
    title: "Sign up and help out",
    description: "Claim a spot in seconds.",
  },
];

const TAB_TRIGGER_CLASS =
  "max-sm:flex-1 max-sm:!justify-center rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground data-[state=active]:!bg-brand/10 data-[state=active]:!text-brand data-[state=active]:font-semibold data-[state=active]:shadow-none";

export function MarketingPage() {
  return (
    <main className="flex flex-col">
      <Tabs
        defaultValue="home"
        orientation="vertical"
        className="mx-auto w-full max-w-6xl flex-col items-stretch gap-6 px-4 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-12"
      >
        <TabsList
          variant="line"
          className="w-full shrink-0 items-stretch justify-start gap-1 bg-transparent p-0 max-sm:!h-auto max-sm:!w-full max-sm:!flex-row sm:w-52"
        >
          <TabsTrigger value="home" className={TAB_TRIGGER_CLASS}>
            Home
          </TabsTrigger>
          <TabsTrigger value="mission" className={TAB_TRIGGER_CLASS}>
            Our Mission
          </TabsTrigger>
          <TabsTrigger value="about-luke" className={TAB_TRIGGER_CLASS}>
            About Luke
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="flex flex-col">
          <section className="flex flex-col items-center gap-8 py-12 sm:py-20">
            <div className="flex max-w-xl flex-col items-center gap-5 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                Turn Downtime Into <span className="text-brand">Impact.</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Volunteer near your next fencing tournament.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </section>

          <section className="border-t border-border py-12 sm:py-16">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                How It Works
              </h2>

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

          <section className="-mx-4 border-t border-border bg-navy px-4 py-12 text-navy-foreground sm:px-8 sm:py-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to get started?
              </h2>
              <Button
                size="lg"
                asChild
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="mission">
          <section className="py-12 sm:py-16">
            <OurMissionContent />
          </section>
        </TabsContent>

        <TabsContent value="about-luke">
          <section className="py-12 sm:py-16">
            <AboutLukeContent />
          </section>
        </TabsContent>
      </Tabs>

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 UniteFencers</p>
          <p>Made for the fencing community.</p>
        </div>
      </footer>
    </main>
  );
}
