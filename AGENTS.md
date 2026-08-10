# Database

## Production Supabase project

- **Project ref**: `dbjoirktcxbtfodmzgto`
- **Dashboard**: https://supabase.com/dashboard/project/dbjoirktcxbtfodmzgto
- All migrations in `supabase/migrations/` are deployed here. Verify status with:
  ```bash
  npx supabase migration list
  ```

## Tables

Defined via migrations in `supabase/migrations/`:

- `profiles`
- `trips`
- `volunteer_plans`
- `volunteer_opportunities`
- `messages`
- `fencing_schedule_entries`

## Migration workflow

See [.claude/rules/supabase.md](.claude/rules/supabase.md) for the full migration workflow (creating migrations, RLS conventions, local testing, and deploying with `supabase db push`).
