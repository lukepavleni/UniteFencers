import { redirect } from "next/navigation";
import { AdminUserTable } from "~/components/admin/admin-user-table";
import { isAdmin } from "~/lib/admin";
import { getAdminOverview } from "~/lib/get-admin-overview";
import { createClient } from "~/lib/supabase/server";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdmin(user)) {
    redirect("/");
  }

  const users = await getAdminOverview();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Everyone who's signed up, and what they're volunteering at.
        </p>
      </div>

      {message && (
        <p className="rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
          {message}
        </p>
      )}

      <AdminUserTable users={users} />
    </main>
  );
}
