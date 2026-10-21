import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { CaseGate } from "@/components/game/CaseGate";
import { Confetti, Mascot, Stars, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { BADGE_MIN_STARS } from "@/lib/scoring";

export const Route = createFileRoute("/hasil/$id")({
  head: () => pageMeta("Konsekuensi & Bintang", "Lihat akibat tindakanmu dan bintang yang kamu peroleh."),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <CaseGate id={id}>
      {(c, p) => {
        const r = p.results[c.id];
        if (!r) return <Navigate to="/kasus/$id" params={{ id }} />;
        const action = c.actions.find((a) => a.id === r.actionId)!;
        const s = r.score;
        const great = s.actionStar === 1 && s.reasonStars === 2;
        return (
          <div className="mx-auto max-w-3xl">
            {s.total > 0 && <Confetti />}
            <StepDots step={4} />
            <h1 className="text-center text-4xl font-extrabold">{great ? "Analisis Selesai!" : "Ayo Pikirkan Lagi"}</h1>
            <img
              src={action.correct ? c.goodImage : c.image}
              alt="Situasi setelah tindakan dilakukan"
              width={1280}
              height={768}
              className="mt-4 w-full rounded-3xl border-4 border-card shadow-soft"
            />
            <p className="mt-4 rounded-3xl bg-card p-5 text-lg font-semibold shadow-soft">{action.consequence}</p>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="rounded-3xl bg-secondary p-5">
                <div className="flex items-center justify-between">
                  <Stars count={s.total} size="size-9" />
                  <span className="font-display text-2xl font-extrabold">{s.total}/4</span>
                </div>
                <ul className="mt-3 grid gap-1 font-semibold">
                  <li>{s.actionStar ? "✅ +1 bintang: tindakan tepat" : "⬜ Tindakan belum tepat"}</li>
                  <li className={s.reasonStars ? "font-display text-xl font-extrabold text-primary" : ""}>
                    {s.reasonStars ? "✅ +2 bintang untuk alasan yang jelas" : "⬜ Alasan bisa diperjelas untuk +2 bintang"}
                  </li>
                  <li>{s.extraStar ? "✅ +1 bintang: menjelaskan akibat atau perbaikan" : "⬜ Jelaskan akibatnya untuk +1 bintang"}</li>
                </ul>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  {s.feedback.map((f) => <p key={f}>💬 {f}</p>)}
                </div>
                <p className="mt-3 rounded-2xl bg-card p-3 text-sm"><b>{c.norma}:</b> {c.normExplanation}</p>
                {r.bestStars >= BADGE_MIN_STARS && (
                  <p className="mt-3 font-bold">🏅 Lencana "{c.badge.name}" terbuka!</p>
                )}
              </div>
              <Mascot
                mood={great ? "rayakan" : "berpikir"}
                className="md:flex-col-reverse md:items-center"
                says={great ? "Hebat! Alasanmu membantu kita memahami akibat dari tindakan itu!" : "Tidak apa-apa! Coba lagi dan pikirkan perasaan semua orang, ya."}
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/kasus/$id" params={{ id }} className="btn-game bg-card text-foreground">ULANGI MISI</Link>
              <Link to="/peta" className="btn-game bg-primary text-primary-foreground">LANJUTKAN PETUALANGAN →</Link>
            </div>
          </div>
        );
      }}
    </CaseGate>
  );
}
