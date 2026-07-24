import Link from "next/link";

const stats = [
  { value: "12K+", label: "Fencers united" },
  { value: "480+", label: "Clubs onboard" },
  { value: "60+", label: "Tournaments run" },
  { value: "24", label: "Countries" },
];

const features = [
  {
    title: "Track every touch",
    body: "Log bouts, scores, and progress in real time. See your growth across every weapon, every season.",
  },
  {
    title: "Find your club",
    body: "Discover fencing clubs and coaches near you, and connect with a community built for the sport.",
  },
  {
    title: "Compete anywhere",
    body: "Register for tournaments, track brackets, and follow rankings — all from one place.",
  },
];

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-50">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, color-mix(in oklch, var(--color-brand) 22%, transparent), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative flex flex-col items-center gap-8 text-center">
          <span className="rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-300 backdrop-blur">
            The home for competitive fencing
          </span>

          <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl">
            Unite
            <br />
            <span className="text-brand">Fencers</span>
          </h1>

          <p className="max-w-xl text-lg text-zinc-400 sm:text-xl">
            One platform to train, track, and compete. Built for fencers who
            demand more from every bout.
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/notes"
              className="rounded-full bg-brand px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-foreground transition-transform hover:scale-105"
            >
              Get started
            </Link>
            <Link
              href="/notes"
              className="rounded-full border border-zinc-700 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-100 transition-colors hover:bg-zinc-900"
            >
              See how it works
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-zinc-800 bg-zinc-950">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-4xl font-black tracking-tight sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <h2 className="max-w-2xl text-4xl font-black uppercase tracking-tight sm:text-5xl">
          Everything you need,
          <br />
          <span className="text-zinc-500">on and off the strip.</span>
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-zinc-800 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-4 bg-zinc-950 p-8 transition-colors hover:bg-zinc-900"
            >
              <div className="h-10 w-10 rounded-full bg-brand transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-bold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium CTA banner */}
      <section className="relative overflow-hidden px-6 py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 50%, color-mix(in oklch, var(--color-brand) 18%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">
            En garde.
            <br />
            <span className="text-brand">Ready. Fence.</span>
          </h2>
          <p className="max-w-md text-zinc-400">
            Join thousands of fencers building their legacy, one touch at a
            time.
          </p>
          <Link
            href="/notes"
            className="mt-2 rounded-full bg-brand px-10 py-4 text-sm font-bold uppercase tracking-wide text-brand-foreground transition-transform hover:scale-105"
          >
            Join UniteFencers
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} UniteFencers</span>
          <span>Built for fencers, by fencers.</span>
        </div>
      </footer>
    </main>
  );
}
