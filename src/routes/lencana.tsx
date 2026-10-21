import { createFileRoute, Link } from "@tanstack/react-router";
import { GameShell, LockBadge, Mascot, POS_STYLE } from "@/components/game/Game";
import { CASES } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { badgeUnlocked, posStatuses, totalStars, useProgress } from "@/lib/progress";
import { BADGE_MIN_STARS } from "@/lib/scoring";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lencana")({
  head: () => pageMeta("Galeri Lencana", "Kumpulkan empat lencana NORMAKITA dari setiap pos norma."),
  component: Page,
});

function Page() {
  const p = useProgress();
  if (!p) return <GameShell><div className="h-96" /></GameShell>;
  const st = posStatuses(p);
  const retryId = CASES.find((c) => st[c.id] === "active")?.id ?? CASES.find((c) => !badgeUnlocked(p, c.id) && st[c.id] !== "locked")?.id ?? 1;

  return (
    <GameShell>
      <h1 className="text-center text-4xl font-extrabold text-brown sm:text-5xl">GALERI LENCANA NORMAKITA</h1>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Mascot mood="rayakan" imgClass="w-32 sm:w-40" says="Petualanganmu makin hebat! Ayo lanjutkan misi berikutnya!" />
        <div className="rounded-3xl bg-card px-8 py-4 text-center shadow-soft">
          <p className="text-sm font-bold text-muted-foreground">Total bintang</p>
          <p className="font-display text-5xl font-extrabold text-gold-foreground">⭐ {totalStars(p)}<span className="text-2xl text-muted-foreground">/16</span></p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {CASES.map((c) => {
          const on = badgeUnlocked(p, c.id);
          const style = POS_STYLE[c.color];
          return (
            <div key={c.id} className={cn("flex flex-col items-center rounded-3xl bg-card p-5 text-center shadow-soft", !on && "opacity-60 grayscale")}>
              <div className={cn("relative grid size-24 place-items-center rounded-full border-8 border-gold text-5xl", on ? style.bg : "bg-muted", on && "animate-pop")}>
                {c.badge.emoji}
                {!on && <LockBadge />}
              </div>
              <p className="mt-3 font-display text-lg font-extrabold leading-tight">{c.badge.name}</p>
              <p className={cn("text-xs font-bold", style.text)}>{c.norma}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {on ? "Sudah didapat!" : `Raih minimal ${BADGE_MIN_STARS} bintang di ${c.pos}`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/peta" className="btn-game bg-primary text-primary-foreground">KEMBALI KE PETA</Link>
        <Link to="/refleksi" className="btn-game bg-gold text-gold-foreground">LIHAT PROGRES</Link>
        <Link to="/kasus/$id" params={{ id: String(retryId) }} className="btn-game bg-card text-foreground">ULANGI MISI</Link>
      </div>
    </GameShell>
  );
}
