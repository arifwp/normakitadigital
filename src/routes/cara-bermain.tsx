import { createFileRoute, Link } from "@tanstack/react-router";
import { GameShell, HowToPlayContent, Mascot } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/cara-bermain")({
  head: () => pageMeta("Cara Bermain", "Pelajari cara membaca kasus, memilih tindakan, menjelaskan alasan, dan mengumpulkan bintang."),
  component: Page,
});

function Page() {
  return (
    <GameShell>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-4 text-center text-4xl font-extrabold">Cara Bermain</h1>
        <Mascot mood="ceria" says="Ikuti 4 langkah ini di setiap pos, ya!" className="mb-4 justify-center" />
        <HowToPlayContent />
        <div className="mt-6 text-center">
          <Link to="/peta" className="btn-game bg-primary text-primary-foreground">MULAI PETUALANGAN</Link>
        </div>
      </div>
    </GameShell>
  );
}
