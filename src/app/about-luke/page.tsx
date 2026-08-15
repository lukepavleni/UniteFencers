import { AboutLukeContent } from "~/components/about-luke-content";
import { AppShell } from "~/components/app-shell";

export default function AboutLukePage() {
  return (
    <AppShell>
      <main className="py-4">
        <AboutLukeContent />
      </main>
    </AppShell>
  );
}
