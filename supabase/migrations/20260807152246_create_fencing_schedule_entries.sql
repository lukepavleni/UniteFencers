-- A user's own fencing schedule for a trip (when they're on the strip, not
-- available to volunteer). Entirely user-entered -- nothing is pre-filled --
-- so the homepage can show real free-day info without guessing at a bout
-- schedule this app has no access to.

create table if not exists public.fencing_schedule_entries (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  event_date date not null,
  event_time text,
  label text not null,
  created_at timestamptz not null default now()
);

alter table public.fencing_schedule_entries enable row level security;

create index if not exists fencing_schedule_entries_trip_id_idx
  on public.fencing_schedule_entries (trip_id);
create index if not exists fencing_schedule_entries_user_id_idx
  on public.fencing_schedule_entries (user_id);

create policy "Users can view their own fencing schedule entries"
  on public.fencing_schedule_entries
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own fencing schedule entries"
  on public.fencing_schedule_entries
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own fencing schedule entries"
  on public.fencing_schedule_entries
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own fencing schedule entries"
  on public.fencing_schedule_entries
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
