import { redirect } from "next/navigation";
import { completeOnboarding } from "~/app/onboarding/actions";
import { ProfileForm } from "~/components/profile-form";
import { requireUser } from "~/lib/auth";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;
  const user = await requireUser();

  if (user.user_metadata?.onboarding_complete === true) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome to UniteFencers
        </h1>
        <p className="text-sm text-muted-foreground">
          Let's set up your profile before you get started.
        </p>
      </div>

      <ProfileForm
        action={completeOnboarding}
        submitLabel="Finish setup"
        message={message}
        defaultValues={{
          name: (user.user_metadata?.full_name as string | undefined) ?? "",
        }}
      />
    </main>
  );
}
