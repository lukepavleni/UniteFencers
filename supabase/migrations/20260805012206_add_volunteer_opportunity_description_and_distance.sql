-- Add a free-text description of what volunteers do, and a distance from
-- the NAC/JO venue (convention center), to the volunteer opportunities
-- catalog. Both are approximate/scraped-style text fields, matching the
-- rest of this table, rather than structured/geocoded values.

alter table public.volunteer_opportunities
  add column if not exists description text,
  add column if not exists distance_from_venue text;
