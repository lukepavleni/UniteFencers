import { redirect } from "next/navigation";
import { updateProfile } from "~/app/profile/actions";
import { ProfileForm } from "~/components/profile-form";
import { Avatar } from "~/components/ui/avatar";
import { getCurrentAge, type Profile } from "~/lib/profile";
import { createClient } from "~/lib/supabase/server";
import { formatDate } from "~/lib/trips";

export default async function ProfilePage({
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, role, date_of_birth")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile) {
    redirect("/onboarding");
  }

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Your account details.</p>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-border p-6">
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} className="size-14 text-xl" />
          <div>
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm text-muted-foreground">
              {profile.role === "minor" ? "Minor" : "Parent / Adult"}
              {profile.role === "minor" && profile.date_of_birth
                ? ` · ${getCurrentAge(profile.date_of_birth)} years old`
                : ""}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        {profile.role === "minor" && profile.date_of_birth && (
          <div>
            <p className="text-sm text-muted-foreground">Date of birth</p>
            <p className="font-medium">{formatDate(profile.date_of_birth)}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">Member since</p>
          <p className="font-medium">{memberSince}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Edit your profile
        </h2>
        <ProfileForm
          action={updateProfile}
          submitLabel="Save changes"
          message={message}
          defaultValues={{
            name: profile.name,
            role: profile.role,
            dateOfBirth: profile.date_of_birth ?? "",
          }}
        />
      </div>
    </main>
  );
}
