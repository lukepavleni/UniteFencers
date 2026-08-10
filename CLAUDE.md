# Next.js App

## Rules Index

Detailed rules live in `.claude/rules/`. When adding, updating, or deleting a rules file, keep this index in sync.

- [env-vars.md](.claude/rules/env-vars.md) — Environment variable access patterns
- [stack.md](.claude/rules/stack.md) — Framework, language, and tooling overview
- [styling.md](.claude/rules/styling.md) — Tailwind CSS and design token conventions
- [supabase.md](.claude/rules/supabase.md) — Database migrations and RLS patterns

## Production Supabase Project

Production uses the Supabase project with ref `dbjoirktcxbtfodmzgto`
(dashboard: https://supabase.com/dashboard/project/dbjoirktcxbtfodmzgto).
`.env.local` may point at a different project (e.g. for local dev) — do not
assume it matches production without checking.
