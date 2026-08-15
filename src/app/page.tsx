import { AppShell } from "~/components/app-shell";
import { Dashboard } from "~/components/dashboard";
import { MarketingPage } from "~/components/marketing-page";
import { getCurrentUser } from "~/lib/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    nac?: string;
    distance?: string;
    qualification?: string;
  }>;
}) {
  const user = await getCurrentUser();

  return (
    <AppShell>
      {user ? (
        <Dashboard userId={user.id} searchParams={await searchParams} />
      ) : (
        <MarketingPage />
      )}
    </AppShell>
  );
}
