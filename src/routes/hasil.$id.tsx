import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RotateCcw, Shuffle, ArrowRight, Award, Sparkles, HelpCircle } from "lucide-react";
import { CaseGate } from "@/components/game/CaseGate";
import { Confetti, Mascot, Stars, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { BADGE_MIN_STARS } from "@/lib/scoring";
import { progressStore } from "@/lib/progress";
import { PATHS, recommendDevelopment } from "@/lib/learning";
import { playCelebration, playTryAgain, speakNorma } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hasil/$id")({
  head: () =>
    pageMeta(
      "Konsekuensi & Bintang",
      "Lihat akibat tindakanmu, perolehan bintang, dan refleksi norma.",
    ),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return <CaseGate id={id}>{(c, p) => <HasilInner c={c} p={p} id={id} />}</CaseGate>;
}

function HasilInner({ c, p, id }: { c: NormCase; p: Progress; id: string }) {
  const posNum = Number(id);
  const navigate = useNavigate();
  const [soundPlayed, setSoundPlayed] = useState(false);
  const r = p.results[posNum];
  const s = r?.score;
  const great = s ? s.actionStar === 1 && s.reasonStars === 2 : false;

  // Play sound effect once on arrival
  useEffect(() => {
    if (!r || soundPlayed || !s) return;
    setSoundPlayed(true);
    if (great) {
      playCelebration();
      speakNorma(
        `Hebat sekali, Detektif! Pilihan tindakan dan alasanmu sangat bijak sesuai dengan ${c.norma}. Kamu memperoleh ${s.total} bintang!`,
      );
    } else {
      playTryAgain();
      speakNorma(
        `Tidak apa-apa, Detektif! Setiap kasus adalah kesempatan belajar. Coba amati akibatnya dan pikirkan perasaan semua orang ya!`,
      );
    }
  }, [r, soundPlayed, great, s, c.norma]);

  if (!r || !s) return <Navigate to="/kasus/$id" params={{ id }} />;

  const action = c.actions.find((a) => a.id === r.actionId) || c.actions[0]!;
  const badgeWon = r.bestStars >= BADGE_MIN_STARS;
  const currentPath = PATHS[p.path];
  const nextRecommendedPath = recommendDevelopment(p.path, p.history);

  const handleTryAnotherCase = () => {
    progressStore.resetQuestion(posNum);
    navigate({ to: "/kasus/$id", params: { id } });
  };

  return (
    <div className="mx-auto max-w-3xl">
      {s.total >= 3 && <Confetti />}
      <StepDots step={4} />

      {/* Title Header */}
      <div className="text-center">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-xs font-extrabold",
            currentPath.tagColor,
          )}
        >
          {currentPath.icon} {currentPath.name}
        </span>
        <h1 className="mt-2 font-display text-3xl font-black text-brown sm:text-5xl">
          {great ? "🎉 Misi Terselesaikan dengan Baik!" : "🤔 Ayo Pikirkan Bersama"}
        </h1>
      </div>

      {/* Situation Result Image & Consequence Banner */}
      <div className="mt-5 overflow-hidden rounded-3xl border-4 border-card shadow-soft">
        <img
          src={action.correct ? c.goodImage : c.image}
          alt="Situasi setelah tindakan dilakukan"
          width={1280}
          height={768}
          className="w-full object-cover max-h-[360px]"
        />
      </div>

      {/* Consequence card */}
      <div
        className={cn(
          "mt-4 rounded-3xl p-5 shadow-soft border-2",
          action.correct ? "bg-card border-primary/30" : "bg-card border-border",
        )}
      >
        <p className="text-xs font-extrabold uppercase text-primary">
          Konsekuensi Nyata dari Pilihanmu:
        </p>
        <p className="mt-1 font-display text-lg font-bold leading-relaxed text-foreground sm:text-xl">
          {action.consequence}
        </p>
      </div>

      {/* Star Rubric & Feedback Box */}
      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
        <div className="rounded-3xl bg-secondary/70 p-6 border border-primary/20 shadow-soft">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Hasil Analisis Kasus
              </p>
              <Stars count={s.total} size="size-7" />
            </div>
            <div className="text-right">
              <span className="font-display text-3xl font-black text-primary">{s.total}</span>
              <span className="text-lg font-bold text-muted-foreground">/4 ⭐</span>
            </div>
          </div>

          {/* Rubric Breakdown */}
          <div className="mt-4 space-y-2 text-sm font-semibold">
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl p-2",
                s.actionStar ? "bg-card text-foreground" : "bg-muted/60 text-muted-foreground",
              )}
            >
              <span>{s.actionStar ? "✅" : "⬜"}</span>
              <span>
                <b>+1 Bintang:</b>{" "}
                {s.actionStar ? "Tindakan tepat dan bertanggung jawab" : "Tindakan belum tepat"}
              </span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 rounded-xl p-2",
                s.reasonStars
                  ? "bg-card text-primary font-bold shadow-xs"
                  : "bg-muted/60 text-muted-foreground",
              )}
            >
              <span>{s.reasonStars ? "✅" : "⬜"}</span>
              <span>
                <b>+2 Bintang:</b>{" "}
                {s.reasonStars
                  ? "Alasan jelas sesuai prinsip norma"
                  : "Alasan perlu diperjelas sesuai norma"}
              </span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 rounded-xl p-2",
                s.extraStar ? "bg-card text-foreground" : "bg-muted/60 text-muted-foreground",
              )}
            >
              <span>{s.extraStar ? "✅" : "⬜"}</span>
              <span>
                <b>+1 Bintang:</b>{" "}
                {s.extraStar
                  ? "Menjelaskan akibat tindakan / solusi perbaikan"
                  : "Belum menjelaskan akibat / solusi"}
              </span>
            </div>
          </div>

          {/* Written Feedback */}
          <div className="mt-4 rounded-2xl bg-card p-4 space-y-1.5 border border-border/80">
            <p className="text-xs font-bold text-muted-foreground uppercase">Catatan Evaluasi:</p>
            {s.feedback.map((f, idx) => (
              <p key={idx} className="text-sm font-medium text-foreground">
                💬 {f}
              </p>
            ))}
          </div>

          {/* Norm Principle Explanation */}
          <div className="mt-4 rounded-2xl bg-card/90 p-4 border border-border/80">
            <p className="font-display text-sm font-extrabold text-primary">{c.norma}:</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {c.normExplanation}
            </p>
          </div>

          {/* Badge announcement */}
          {badgeWon && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gold/25 p-3.5 border border-gold/40">
              <span className="text-3xl">{c.badge.emoji}</span>
              <div>
                <p className="font-display text-sm font-extrabold text-gold-foreground">
                  Lencana Terbuka!
                </p>
                <p className="text-xs text-foreground font-semibold">
                  Selamat, kamu meraih lencana <b>"{c.badge.name}"</b>!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mascot Reaction */}
        <div className="flex justify-center md:justify-end">
          <Mascot
            mood={great ? "rayakan" : "berpikir"}
            className="md:flex-col-reverse md:items-center"
            says={
              great
                ? "Hebat! Keputusanmu membuktikan bahwa kamu peduli pada hak dan perasaan orang lain!"
                : "Tidak perlu berkecil hati. Ayo amati kembali petunjuknya dan coba lagi!"
            }
          />
        </div>
      </div>

      {/* Path Advancement Banner if recommended */}
      {nextRecommendedPath && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl bg-gold/25 p-5 border-2 border-gold shadow-soft">
          <div className="flex items-center gap-3">
            <Sparkles className="size-8 text-gold-foreground shrink-0" />
            <div>
              <h3 className="font-display text-lg font-black text-gold-foreground">
                Rekomendasi Jalur Baru Tersedia!
              </h3>
              <p className="text-xs text-foreground">
                Kamu konsisten menunjukkan pemahaman dan penalaran yang luar biasa! Kamu siap
                mencoba <b>{PATHS[nextRecommendedPath].name}</b>.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playCelebration();
              progressStore.setPath(nextRecommendedPath);
              navigate({ to: "/peta" });
            }}
            className="btn-game bg-primary text-primary-foreground text-sm shrink-0"
          >
            Coba {PATHS[nextRecommendedPath].name} →
          </button>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/kasus/$id"
          params={{ id }}
          className="btn-game bg-card text-foreground border-2 border-border"
        >
          <RotateCcw className="size-4" /> ULANGI KASUS INI
        </Link>
        <button
          onClick={handleTryAnotherCase}
          className="btn-game bg-secondary text-secondary-foreground border border-primary/30"
        >
          <Shuffle className="size-4" /> COBA KASUS LAIN DI POS INI
        </button>
        <Link to="/peta" className="btn-game bg-primary text-primary-foreground">
          LANJUTKAN KE PETA <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
