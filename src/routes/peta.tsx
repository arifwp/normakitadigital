import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Trophy, RotateCcw } from "lucide-react";
import { GameShell, LockBadge, Mascot, PosIcon, POS_STYLE, Stars } from "@/components/game/Game";
import { CASES } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { posStatuses, progressStore, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/peta")({
  head: () => pageMeta("Peta Petualangan", "Empat pos norma: agama, kesusilaan, kesopanan, dan hukum."),
  component: Peta,
});

const STATUS_LABEL = { locked: "Belum dibuka", active: "Sedang dikerjakan", done: "Selesai" };

function Peta() {
  const p = useProgress();
  if (!p) return <GameShell><div className="h-96" /></GameShell>;
  const st = posStatuses(p);

  return (
    <GameShell>
      <h1 className="text-center text-4xl font-extrabold text-brown">Peta Petualangan</h1>
      <p className="mb-6 text-center text-muted-foreground">Selesaikan pos satu per satu untuk membuka pos berikutnya.</p>
      {p.demo && (
        <p className="mx-auto mb-4 max-w-md rounded-2xl bg-gold/30 px-4 py-2 text-center text-sm font-semibold">
          Ini contoh progres. Tekan "Mulai dari awal" untuk bermain dari Pos 1.
        </p>
      )}

      <div className="relative mx-auto max-w-2xl rounded-[2.5rem] bg-sage p-4 shadow-soft sm:p-8">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path
            d="M30 8 C 90 15, 90 30, 70 37 S 10 50, 30 62 S 95 75, 70 92"
            fill="none"
            stroke="var(--brown)"
            strokeOpacity="0.35"
            strokeWidth="10"
            strokeDasharray="14 12"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ol className="relative grid gap-6">
          {CASES.map((c, i) => {
            const s = st[c.id] ?? "locked";
            const style = POS_STYLE[c.color];
            const stars = p.results[c.id]?.bestStars ?? 0;
            const card = (
              <div
                className={cn(
                  "relative flex w-full max-w-xs items-center gap-3 rounded-3xl bg-card p-4 shadow-soft transition",
                  s === "locked" && "opacity-55 grayscale",
                  s === "active" && cn("ring-4 scale-105", style.ring),
                  s !== "locked" && "hover:-translate-y-1 hover:shadow-lg",
                )}
              >
                <span className={cn("grid size-16 shrink-0 place-items-center rounded-2xl text-card", style.bg)}>
                  <PosIcon icon={c.icon} className="size-8" />
                </span>
                <div className="min-w-0">
                  <p className={cn("text-xs font-extrabold uppercase", style.text)}>{c.pos}</p>
                  <p className="font-display text-lg font-bold leading-tight">{c.norma}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{STATUS_LABEL[s]}</p>
                  <Stars count={stars} size="size-4" />
                </div>
                {s === "locked" && <LockBadge />}
                {s === "done" && (
                  <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-5" />
                  </span>
                )}
              </div>
            );
            return (
              <li key={c.id} className={cn("flex items-center gap-2", i % 2 ? "justify-end" : "justify-start")}>
                {s === "active" && i % 2 === 1 && <Mascot mood="ceria" imgClass="w-16 sm:w-24" />}
                {s === "locked" ? (
                  <div aria-disabled className="w-full max-w-xs cursor-not-allowed">{card}</div>
                ) : (
                  <Link to="/kasus/$id" params={{ id: String(c.id) }} className="w-full max-w-xs">
                    {card}
                  </Link>
                )}
                {s === "active" && i % 2 === 0 && <Mascot mood="ceria" imgClass="w-16 sm:w-24" />}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/lencana" className="btn-game bg-gold text-gold-foreground">
          <Trophy className="size-5" /> GALERI LENCANA
        </Link>
        <button
          className="btn-game bg-card text-foreground"
          onClick={() => {
            if (confirm("Hapus semua progres dan mulai dari Pos 1?")) progressStore.reset();
          }}
        >
          <RotateCcw className="size-5" /> Mulai dari awal
        </button>
      </div>
    </GameShell>
  );
}
