-- The partial unique index from the previous migration (`where signup_url
-- is not null`) can't be used as a PostgREST upsert conflict target -
-- PostgREST issues a plain `on conflict (signup_url)` with no predicate,
-- which Postgres can only match against an unconditional unique constraint.
-- A plain unique constraint already allows unlimited null signup_url rows
-- (SQL nulls are never equal to each other), so the partial predicate was
-- unnecessary anyway.

drop index if exists public.volunteer_opportunities_signup_url_idx;

alter table public.volunteer_opportunities
  add constraint volunteer_opportunities_signup_url_key unique (signup_url);
