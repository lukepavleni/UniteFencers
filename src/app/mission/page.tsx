import { AppShell } from "~/components/app-shell";
import { OurMissionContent } from "~/components/our-mission-content";

export default function MissionPage() {
  return (
    <AppShell>
      <main className="py-4">
        <OurMissionContent />
      </main>
    </AppShell>
  );
}
