-- Trip rows copy the NAC's venue at creation time. USA Fencing has since
-- announced venues for the November 2026 NAC (Greater Columbus Convention
-- Center) and January 2027 Junior Olympics & Para NAC (Oklahoma City
-- Convention Center), which were "Venue TBA" when earlier trips were
-- created. Backfill those existing rows so registration un-blocks for them
-- too (see src/app/trips/nacs.ts for the source of truth).

update public.trips
set venue = 'Greater Columbus Convention Center'
where nac_name = 'November 2026 NAC' and venue = 'Venue TBA';

update public.trips
set venue = 'Oklahoma City Convention Center'
where nac_name = 'January 2027 Junior Olympics & Para NAC' and venue = 'Venue TBA';
