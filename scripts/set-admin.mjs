// One-time script to grant a user admin access.
//
// Usage:
//   node --env-file=.env.local scripts/set-admin.mjs someone@example.com
//
// Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL to be set
// (e.g. in .env.local). Sets app_metadata.is_admin = true for the given
// user, which src/lib/admin.ts checks to gate access to /admin.

import { createClient } from "@supabase/supabase-js";

const email = process.argv[2];

if (!email) {
  console.error(
    "Usage: node --env-file=.env.local scripts/set-admin.mjs <email>",
  );
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Pass --env-file=.env.local to node.",
  );
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

let user;
let page = 1;
const perPage = 1000;

while (!user) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    console.error("Failed to list users:", error.message);
    process.exit(1);
  }

  user = data.users.find((candidate) => candidate.email === email);

  if (data.users.length < perPage) break;
  page += 1;
}

if (!user) {
  console.error(`No user found with email ${email}`);
  process.exit(1);
}

const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
  user.id,
  { app_metadata: { is_admin: true } },
);

if (updateError) {
  console.error("Failed to update user:", updateError.message);
  process.exit(1);
}

console.log(`${email} is now an admin.`);
