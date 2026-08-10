import Link from "next/link";
import { GoogleSignInButton } from "~/components/google-sign-in-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { signup } from "./actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-sm flex-col justify-center gap-6 px-4">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Sign up</h1>
        <p className="text-sm text-muted-foreground">
          Create an account to get started.
        </p>
      </div>

      <GoogleSignInButton text="signup_with" />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <form action={signup} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>
        {message && (
          <p className="rounded-md border border-border bg-muted p-3 text-sm text-muted-foreground">
            {message}
          </p>
        )}
        <Button type="submit">Sign up</Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}
