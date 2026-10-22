import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CaseGate } from "@/components/game/CaseGate";
import { Mascot, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { getOrInitReasonOrder, progressStore } from "@/lib/progress";
import { scoreCase } from "@/lib/scoring";
import { NORMA_NAMES, PATHS } from "@/lib/learning";
import { playPop, playCorrect, playTryAgain } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alasan/$id")({
  head: () =>
    pageMeta("Analisis Alasan", "Jelaskan mengapa kamu memilih tindakan itu berdasarkan norma."),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [askClarify, setAskClarify] = useState(false);

  return (
    <CaseGate id={id}>
      {(c, p) => {
        const posNum = Number(id);
        const d = p.drafts[posNum] ?? {};
        if (!d.actionId) return <Navigate to="/tindakan/$id" params={{ id }} />;

        const action = c.actions.find((a) => a.id === d.actionId)!;
        const currentPath = PATHS[p.path];

        // Retrieve or initialize randomized balanced reason order
        const orderedReasonIds = getOrInitReasonOrder(posNum, c, p);
        const orderedReasons = orderedReasonIds
          .map((rid) => c.reasons.find((r) => r.id === rid))
          .filter(Boolean) as typeof c.reasons;

        const handleSelectReason = (reasonId: string) => {
          playPop();
          progressStore.setDraft(posNum, { reasonId });
        };

        const handleSelectNorm = (norm: string) => {
          playPop();
          progressStore.setDraft(posNum, { normId: norm });
        };

        const finish = (force: boolean) => {
          if (!d.reasonId) return;
          const score = scoreCase(c, d.actionId!, d.reasonId, d.text ?? "");

          if (score.needsClarify && !force) {
            playTryAgain();
            setAskClarify(true);
            return;
          }

          if (score.total >= 3) {
            playCorrect();
          } else {
            playTryAgain();
          }

          progressStore.submit(posNum, {
            questionKey: c.key ?? `${posNum}-0`,
            actionId: d.actionId!,
            reasonId: d.reasonId,
            text: d.text ?? "",
            score,
            path: p.path,
          });

          navigate({ to: "/hasil/$id", params: { id } });
        };

        return (
          <div className="mx-auto max-w-3xl">
            <StepDots step={3} />

            {/* Recap Chosen Action */}
            <div className="rounded-3xl bg-secondary/80 p-4 font-semibold border border-primary/20">
              <span className="text-xs uppercase font-extrabold text-primary block mb-1">
                Tindakan Pilihanmu:
              </span>
              <p className="text-base sm:text-lg flex items-center gap-2">
                <span className="text-2xl">{action.emoji}</span> {action.label}
              </p>
            </div>

            {/* TaRL: Norm identification challenge for Bulan & Matahari */}
            {(p.path === "bulan" || p.path === "matahari") && (
              <div className="mt-5 rounded-3xl bg-card p-5 border-2 border-border shadow-soft">
                <label className="font-display text-base font-extrabold text-brown sm:text-lg block">
                  Menurutmu, kasus ini paling berkaitan erat dengan norma apa?
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {NORMA_NAMES.map((n) => {
                    const isNormSelected = d.normId === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleSelectNorm(n)}
                        className={cn(
                          "rounded-2xl border-2 p-2.5 text-center text-xs sm:text-sm font-bold transition",
                          isNormSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-xs"
                            : "border-border bg-card text-foreground hover:border-primary/50",
                        )}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reasons Multiple Choice */}
            <h2 className="mt-6 font-display text-2xl font-extrabold text-brown sm:text-3xl">
              Mengapa kamu memilih tindakan itu?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Pilih satu alasan yang paling sesuai dengan prinsip dan nilai kebaikan:
            </p>

            <div className="mt-4 grid gap-3">
              {orderedReasons.map((r, idx) => {
                const isSelected = d.reasonId === r.id;
                const letter = ["A", "B", "C", "D"][idx];

                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectReason(r.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex items-start gap-3.5 rounded-2xl border-3 p-4 text-left transition hover:-translate-y-0.5 shadow-soft",
                      isSelected
                        ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/30"
                        : "border-border bg-card text-foreground hover:border-primary/50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold shadow-xs",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {letter}
                    </span>
                    <p className="text-sm font-semibold leading-relaxed sm:text-base">{r.label}</p>
                  </button>
                );
              })}
            </div>

            {/* Open-ended elaboration for +1 bonus star */}
            <div className="mt-6 rounded-3xl bg-card p-5 border-2 border-border shadow-soft">
              <label className="block font-display text-lg font-bold text-brown" htmlFor="tulis">
                Jelaskan dengan kata-katamu sendiri{" "}
                <span className="text-xs font-semibold text-muted-foreground">(Opsional)</span>
              </label>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                ⭐ <b>Tip Detektif:</b> Ceritakan apa akibat dari pilihan ini, atau bagaimana cara
                memperbaikinya, untuk meraih +1 bintang tambahan!
              </p>
              <textarea
                id="tulis"
                value={d.text ?? ""}
                onChange={(e) => {
                  setAskClarify(false);
                  progressStore.setDraft(posNum, { text: e.target.value });
                }}
                rows={3}
                maxLength={400}
                className="mt-3 w-full rounded-2xl border-2 border-border bg-background p-4 text-base focus:border-primary focus:outline-hidden"
                placeholder="Menurutku, tindakan ini penting karena akibatnya..."
              />
            </div>

            {/* Clarify Helper Box */}
            {askClarify && (
              <div className="mt-4 rounded-3xl bg-gold/25 p-4 border border-gold/40">
                <Mascot
                  mood="berpikir"
                  imgClass="w-20"
                  says="Gagasanmu bagus! Bisakah kamu tambahkan sedikit kalimat, misalnya siapa yang terbantu atau apa akibat baiknya?"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className="btn-game bg-card text-foreground border border-border"
                    onClick={() => document.getElementById("tulis")?.focus()}
                  >
                    ✏️ Tambah Penjelasan
                  </button>
                  <button
                    className="btn-game bg-primary text-primary-foreground"
                    onClick={() => finish(true)}
                  >
                    Lanjutkan Saja →
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Nav */}
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Link
                to="/tindakan/$id"
                params={{ id }}
                className="btn-game bg-card text-foreground border-2 border-border"
              >
                ← Kembali ke Tindakan
              </Link>
              <button
                disabled={!d.reasonId}
                onClick={() => finish(false)}
                className="btn-game bg-primary text-primary-foreground disabled:opacity-40"
              >
                LIHAT HASIL & KONSEKUENSI ⭐
              </button>
            </div>
          </div>
        );
      }}
    </CaseGate>
  );
}
