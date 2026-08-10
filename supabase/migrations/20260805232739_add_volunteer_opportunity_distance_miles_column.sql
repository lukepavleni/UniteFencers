-- Numeric companion to the free-text distance_from_venue, so the app can
-- actually filter opportunities by real distance from the NAC/JO venue
-- (e.g. a 10-mile radius) instead of just displaying a string.

alter table public.volunteer_opportunities
  add column if not exists distance_miles numeric;
