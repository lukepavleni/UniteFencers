-- Fencing trips a user plans (tied to a NAC tournament) and the volunteer
-- opportunities they save against each trip.
-- NAC options shown in the UI are placeholder data for now; opportunity
-- matching against a trip's location/dates is not implemented yet.

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  nac_name text not null,
  city text not null,
  venue text not null,
  arrival_date date not null,
  departure_date date not null,
  available_start_date date not null,
  available_end_date date not null,
  created_at timestamptz not null default now()
);

alter table public.trips enable row level security;

create index if not exists trips_user_id_idx on public.trips (user_id);

create policy "Users can view their own trips"
  on public.trips
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own trips"
  on public.trips
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own trips"
  on public.trips
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own trips"
  on public.trips
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create type public.volunteer_plan_status as enum (
  'saved',
  'registered',
  'completed',
  'verified'
);

create table if not exists public.volunteer_plans (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  opportunity_name text not null,
  organization text not null,
  opportunity_date date not null,
  opportunity_time text,
  distance_from_tournament text,
  hours numeric(5, 2),
  status public.volunteer_plan_status not null default 'saved',
  created_at timestamptz not null default now()
);

alter table public.volunteer_plans enable row level security;

create index if not exists volunteer_plans_trip_id_idx
  on public.volunteer_plans (trip_id);
create index if not exists volunteer_plans_user_id_idx
  on public.volunteer_plans (user_id);

create policy "Users can view their own volunteer plans"
  on public.volunteer_plans
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own volunteer plans"
  on public.volunteer_plans
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own volunteer plans"
  on public.volunteer_plans
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own volunteer plans"
  on public.volunteer_plans
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
