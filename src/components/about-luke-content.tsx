import { UserRound } from "lucide-react";
import { PageHeader } from "~/components/page-header";

export function AboutLukeContent() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        icon={UserRound}
        title="Meet Luke"
        description="Competitive Fencer | Founder & Developer of UniteFencers"
      />

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p>
          Luke is a nationally ranked saber fencer who combined his passion for
          fencing, technology, and community service to create UniteFencers.
        </p>
        <p>
          After years of traveling across the country for national competitions
          and volunteering in different cities, Luke recognized an opportunity
          to make community service more accessible to fellow fencers.
        </p>
        <p>
          While volunteer opportunities existed in many tournament host cities,
          finding them often meant searching multiple websites, contacting
          organizations, and coordinating schedules around competitions.
        </p>
        <p className="rounded-xl border-l-4 border-l-brand bg-brand/10 p-4 text-lg font-semibold">
          He believed there had to be a better way.
        </p>
        <p>
          Inspired by his own experiences, Luke designed and developed
          UniteFencers, a platform that uses technology to automatically
          discover and organize volunteer opportunities near national fencing
          tournaments.
        </p>
        <p>
          The platform allows fencers to find their upcoming competitions,
          explore nearby service opportunities, register directly with local
          organizations, and maintain a personal record of their volunteer
          hours.
        </p>
        <p>
          What began as an idea to simplify volunteering became a way to connect
          athletes with communities across the country.
        </p>
        <p>
          Luke’s goal is to make community service a natural part of the
          competitive fencing experience, encouraging more athletes to give back
          wherever they travel.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-navy/30 bg-navy/10 p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="h-6 w-1.5 rounded-full bg-navy" />
          Beyond the Strip
        </h2>
        <p>
          For Luke, fencing has always been about more than competition. It has
          taught him discipline, perseverance, and the value of being part of a
          community.
        </p>
        <p>
          Creating UniteFencers allowed him to bring together his interests in
          technology, problem-solving, and service to build something that could
          benefit others.
        </p>
        <p className="font-semibold">
          His vision is simple: to help fencers make an impact not only through
          their achievements on the strip, but also through the difference they
          make beyond it.
        </p>
      </div>
    </div>
  );
}
