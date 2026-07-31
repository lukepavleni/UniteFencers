-- Replace the trip's single "available to volunteer" date range with an
-- explicit set of available dates, so individual knockout (unavailable)
-- days within a trip can be excluded instead of only supporting one
-- contiguous range. A day within [arrival_date, departure_date] that is
-- not present in available_dates is treated as a knockout day.

alter table public.trips
  drop column if exists available_start_date,
  drop column if exists available_end_date;

alter table public.trips
  add column if not exists available_dates date[] not null default '{}';
