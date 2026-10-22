import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trophy, ArrowRight, RotateCcw } from "lucide-react";
import { GameShell, LockBadge, Mascot, POS_STYLE, Confetti } from "@/components/game/Game";
import { CASES } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { badgeUnlocked, posStatuses, totalStars, useProgress } from "@/lib/progress";
import { BADGE_MIN_STARS } from "@/lib/scoring";
import { PATHS } from "@/lib/learning";
import { playCelebration, speakNorma } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lencana")({
  head: () =>
    pageMeta("Galeri Lencana", "Kumpulkan empat lencana NORMAKITA dari setiap pos norma."),
  component: Page,
});

function Page() {
  const p = useProgress();
  const [voiced, setVoiced] = useState(false);

  const unlockedCount = p ? CASES.filter((c) => badgeUnlocked(p, c.id)).length : 0;
  const allUnlocked = unlockedCount === CASES.length;

  useEffect(() => {
    if (!p || voiced) return;
    setVoiced(true);
    if (allUnlocked) {
      playCelebration();
      speakNorma(
        "Luar biasa, Detektif! Kamu telah berhasil mengumpulkan seluruh empat lencana kebajikan NORMAKITA! Kamu adalah pahlawan norma sejati!",
      );
    } else if (unlockedCount > 0) {
      speakNorma(
        `Hebat! Kamu sudah berhasil mengumpulkan ${unlockedCount} lencana kebajikan. Ayo selesaikan pos berikutnya untuk melengkapi koleksimu!`,
      );
    }
  }, [p, voiced, allUnlocked, unlockedCount]);

  if (!p)
    return (
      <GameShell>
        <div className="h-96" />
      </GameShell>
    );

  const st = posStatuses(p);
  const currentPath = PATHS[p.path];

  const retryId =
    CASES.find((c) => st[c.id] === "active")?.id ??
    CASES.find((c) => !badgeUnlocked(p, c.id) && st[c.id] !== "locked")?.id ??
    1;

  return (
    <GameShell>
      {allUnlocked && <Confetti />}

      <div className="text-center">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-xs font-extrabold",
            currentPath.tagColor,
          )}
        >
          {currentPath.icon} {currentPath.name}
        </span>
        <h1 className="mt-2 font-display text-4xl font-black text-brown sm:text-5xl">
          GALERI LENCANA NORMAKITA
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Buktikan pemahamanmu dengan meraih minimal {BADGE_MIN_STARS} bintang di setiap pos norma.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <Mascot
          mood={allUnlocked ? "rayakan" : "ceria"}
          imgClass="w-32 sm:w-40"
          says={
            allUnlocked
              ? "Semua lencana berhasil kamu kumpulkan! Kamu adalah Detektif Norma Teladan!"
              : `Kamu sudah meraih ${unlockedCount} dari 4 lencana! Ayo teruskan semangat belajarmu!`
          }
        />

        <div className="rounded-3xl bg-card px-8 py-5 text-center shadow-soft border-2 border-border">
          <p className="text-xs font-bold text-muted-foreground uppercase">
            Koleksi Bintang Detektif
          </p>
          <p className="font-display text-5xl font-black text-gold-foreground">
            ⭐ {totalStars(p)}
            <span className="text-2xl text-muted-foreground font-bold">/16</span>
          </p>
          <p className="mt-1 text-xs font-semibold text-primary">
            {unlockedCount} dari 4 Lencana Terbuka
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {CASES.map((c) => {
          const on = badgeUnlocked(p, c.id);
          const style = POS_STYLE[c.color];
          const best = p.results[c.id]?.bestStars ?? 0;

          return (
            <div
              key={c.id}
              className={cn(
                "flex flex-col items-center rounded-3xl bg-card p-5 text-center shadow-soft border-2 transition",
                on ? "border-gold/60 shadow-md" : "border-border opacity-65 grayscale",
              )}
            >
              <div
                className={cn(
                  "relative grid size-24 place-items-center rounded-full border-8 border-gold text-5xl transition-transform",
                  on ? style.bg : "bg-muted",
                  on && "animate-pop",
                )}
              >
                {c.badge.emoji}
                {!on && <LockBadge />}
              </div>

              <p className="mt-3 font-display text-lg font-extrabold leading-tight text-brown">
                {c.badge.name}
              </p>
              <p className={cn("text-xs font-bold mt-0.5", style.text)}>{c.norma}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {on
                  ? `Raihan: ${best} / 4 ⭐ (Berhasil!)`
                  : `Butuh minimal ${BADGE_MIN_STARS} bintang di ${c.pos}`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/peta" className="btn-game bg-primary text-primary-foreground">
          KEMBALI KE PETA
        </Link>
        <Link to="/refleksi" className="btn-game bg-gold text-gold-foreground">
          MISI AKHIR & REFLEKSI →
        </Link>
        <Link
          to="/kasus/$id"
          params={{ id: String(retryId) }}
          className="btn-game bg-card text-foreground border-2 border-border"
        >
          <RotateCcw className="size-4" /> ULANGI MISI
        </Link>
      </div>
    </GameShell>
  );
}
