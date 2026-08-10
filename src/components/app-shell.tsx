import { AppSidebar } from "~/components/app-sidebar";
import { getCurrentUser } from "~/lib/auth";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <AppSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
