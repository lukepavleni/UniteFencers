-- Store admin status as a profile attribute instead of Supabase Auth
-- app_metadata, so it can be granted/revoked with a plain SQL update.
alter table public.profiles
add column if not exists is_admin boolean not null default false;

-- Users can already select/update their own profile row (see
-- create_profiles migration). Revoke UPDATE on this specific column so a
-- user cannot self-grant admin through their own profile update — only the
-- service-role client (which bypasses RLS and column grants) can flip it.
revoke update (is_admin) on public.profiles from authenticated;
