"use client";

import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Heart,
  MapPin,
  Search,
} from "lucide-react";
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
    card: "border-tone-sky/30 bg-tone-sky/10",
    chip: "bg-tone-sky",
  },
  {
    icon: Search,
    title: "Browse opportunities",
    description: "Pick a time that fits your schedule.",
    card: "border-navy/30 bg-navy/10",
    chip: "bg-navy",
  },
  {
    icon: Heart,
    title: "Sign up and help out",
    description: "Claim a spot in seconds.",
    card: "border-brand/30 bg-brand/10",
    chip: "bg-brand",
  },
];

const highlights = [
  {
    icon: MapPin,
    label: "Opportunities near every NAC",
    style: "border-tone-sky/30 bg-tone-sky/10 text-tone-sky",
  },
  {
    icon: CalendarCheck,
    label: "Plan around days you compete",
    style: "border-navy/30 bg-navy/10 text-navy",
  },
  {
    icon: Clock,
    label: "Log your service hours",
    style: "border-brand/30 bg-brand/10 text-brand",
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
        className="mx-auto w-full max-w-[90rem] flex-col items-stretch gap-6 px-4 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-12"
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
            About us
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="flex flex-col">
          <section className="relative overflow-hidden rounded-2xl bg-navy shadow-lg">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/hero-food-service.webp)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/90 via-navy/70 to-navy/40"
            />
            <div className="relative flex max-w-2xl flex-col items-center gap-4 px-6 py-8 text-center text-navy-foreground sm:items-start sm:px-10 sm:py-12 sm:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                Turn Downtime Into{" "}
                <span className="text-tone-amber">Impact.</span>
              </h1>
              <p className="text-lg text-white/85">
                Volunteer near your next fencing tournament.
              </p>
              <Button
                size="lg"
                asChild
                className="h-12 gap-2 bg-brand px-8 text-base font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-105 hover:bg-brand/90"
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>
          </section>

          <section className="grid gap-4 py-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${item.style}`}
              >
                <item.icon className="size-5 shrink-0" />
                {item.label}
              </div>
            ))}
          </section>

          <section className="pt-10 pb-10 sm:pt-12 sm:pb-12">
            <div className="flex flex-col gap-6">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
                <span className="h-6 w-1.5 rounded-full bg-brand" />
                How It Works
              </h2>

              <div className="grid w-full gap-4 sm:grid-cols-3">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`flex flex-col gap-3 rounded-xl border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${step.card}`}
                  >
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl text-white shadow-sm ${step.chip}`}
                    >
                      <step.icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-semibold">
                      <span className="text-muted-foreground">
                        Step {index + 1} -
                      </span>{" "}
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy via-navy to-brand px-6 py-14 text-navy-foreground shadow-lg sm:px-8 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 left-1/3 size-56 rounded-full bg-tone-amber/20 blur-3xl"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to get started?
              </h2>
              <Button
                size="lg"
                asChild
                className="h-12 gap-2 bg-brand px-8 text-base font-bold text-brand-foreground shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-brand/90"
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="mission">
          <section>
            <OurMissionContent />
          </section>
        </TabsContent>

        <TabsContent value="about-luke">
          <section>
            <AboutLukeContent />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
