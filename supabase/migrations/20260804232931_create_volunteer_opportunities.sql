-- Canonical catalog of volunteer opportunities scraped from Habitat for
-- Humanity, Meals on Wheels, Points of Light, and Idealist/VolunteerMatch
-- near each NAC/JO venue. Populated by an external import job using the
-- service role key (bypasses RLS), not by end users, so only select
-- policies are granted here. signup_url is the natural dedup key the
-- import job upserts on; it is nullable since some scraped listings never
-- expose a link, and Postgres treats multiple nulls as distinct so blanks
-- never collide.

create table if not exists public.volunteer_opportunities (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  organization text not null,
  event_date_time text,
  duration text,
  address text,
  zip text,
  city_state text,
  signup_url text,
  source_platform text not null,
  walk_in_or_approval_required text,
  age_requirement text,
  minor_policy text,
  nac_event text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.volunteer_opportunities enable row level security;

create unique index if not exists volunteer_opportunities_signup_url_idx
  on public.volunteer_opportunities (signup_url)
  where signup_url is not null;

create index if not exists volunteer_opportunities_nac_event_idx
  on public.volunteer_opportunities (nac_event);

create policy "Anyone can view volunteer opportunities"
on public.volunteer_opportunities
for select
to anon
using (true);

create policy "Authenticated users can view volunteer opportunities"
on public.volunteer_opportunities
for select
to authenticated
using (true);
