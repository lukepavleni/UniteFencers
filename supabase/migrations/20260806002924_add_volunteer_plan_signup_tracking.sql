-- Support saving a volunteer plan directly from the opportunities catalog:
-- link back to the source opportunity (for dedupe + an external "manage
-- signup" link) and store its raw date/time text, since catalog opportunity
-- dates are free text (e.g. "Recurring shifts around Oct 9-12, 2026") and
-- can't reliably be parsed into a single `date` value.

alter table public.volunteer_plans
  add column if not exists opportunity_id uuid
    references public.volunteer_opportunities (id) on delete set null;

alter table public.volunteer_plans
  add column if not exists signup_url text;

alter table public.volunteer_plans
  add column if not exists event_date_time text;

alter table public.volunteer_plans
  alter column opportunity_date drop not null;

create index if not exists volunteer_plans_opportunity_id_idx
  on public.volunteer_plans (opportunity_id);

create unique index if not exists volunteer_plans_trip_opportunity_unique
  on public.volunteer_plans (trip_id, opportunity_id)
  where opportunity_id is not null;
