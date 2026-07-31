-- Admin-sent nudges to users who haven't signed up to volunteer yet.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users (id) on delete cascade,
  recipient_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create index if not exists messages_recipient_id_idx on public.messages (recipient_id);

-- Only the recipient can read their own messages. Inserts are performed by
-- the service-role client from an admin-only server action, which bypasses
-- RLS, so no insert/update/delete policy is granted here.
create policy "Recipients can view their own messages"
on public.messages
for select
to authenticated
using ((select auth.uid()) = recipient_id);
