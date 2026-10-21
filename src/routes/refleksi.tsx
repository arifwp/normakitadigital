import { createFileRoute, Link } from "@tanstack/react-router";
import { GameShell, Mascot, PosIcon, POS_STYLE, Stars } from "@/components/game/Game";
import { CASES } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { posStatuses, progressStore, totalStars, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/refleksi")({
  head: () => pageMeta("Progres & Refleksi", "Lihat progres setiap pos dan hubungkan kasus dengan pengalamanmu."),
  component: Page,
});

const LABEL = { locked: "Belum dibuka", active: "Sedang dikerjakan", done: "Selesai" };

function Page() {
  const p = useProgress();
  if (!p) return <GameShell><div className="h-96" /></GameShell>;
  const st = posStatuses(p);
  const done = CASES.filter((c) => st[c.id] === "done").length;

  return (
    <GameShell>
      <h1 className="text-center text-4xl font-extrabold">Progres & Refleksi</h1>
      <p className="mb-6 text-center font-semibold text-muted-foreground">
        {done} dari 4 pos selesai · ⭐ {totalStars(p)} bintang
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {CASES.map((c) => {
          const r = p.results[c.id];
          const style = POS_STYLE[c.color];
          return (
            <div key={c.id} className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-soft">
              <span className={cn("grid size-12 place-items-center rounded-2xl text-card", style.bg)}>
                <PosIcon icon={c.icon} className="size-6" />
              </span>
              <div className="flex-1">
                <p className="font-display font-bold">{c.pos} · {c.norma}</p>
                <p className="text-sm text-muted-foreground">{LABEL[st[c.id] ?? "locked"]}</p>
                {r && <p className="text-sm">Pilihan: {c.actions.find((a) => a.id === r.actionId)?.emoji} {c.actions.find((a) => a.id === r.actionId)?.correct ? "tepat" : "perlu dipikirkan lagi"}</p>}
              </div>
              <Stars count={r?.bestStars ?? 0} size="size-4" />
            </div>
          );
        })}
      </div>

      <section className="mt-8 rounded-3xl bg-sage p-6">
        <Mascot mood="berpikir" imgClass="w-24" says="Pernahkah kamu mengalami situasi serupa?" />
        <label htmlFor="refleksi" className="mt-3 block font-display text-xl font-bold">
          Bagaimana kebiasaan baik di lingkunganmu membantu menyelesaikan masalah seperti ini?
        </label>
        <textarea
          id="refleksi"
          rows={4}
          maxLength={500}
          value={p.reflection}
          onChange={(e) => progressStore.setReflection(e.target.value)}
          placeholder="Di rumah / sekolah / kampungku, kami biasa..."
          className="mt-2 w-full rounded-2xl border-2 bg-card p-4 text-lg focus:border-primary focus:outline-none"
        />
        <p className="text-sm text-muted-foreground">Tulisanmu tersimpan otomatis di perangkat ini.</p>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/peta" className="btn-game bg-primary text-primary-foreground">KEMBALI KE PETA</Link>
        <Link to="/lencana" className="btn-game bg-gold text-gold-foreground">GALERI LENCANA</Link>
        <button
          className="btn-game bg-card text-foreground"
          onClick={() => confirm("Hapus semua progres dan mulai dari Pos 1?") && progressStore.reset()}
        >
          Reset progres
        </button>
      </div>
    </GameShell>
  );
}
