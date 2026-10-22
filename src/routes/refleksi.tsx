import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Trophy, Sparkles, Award, BookmarkCheck, Heart, RotateCcw } from "lucide-react";
import { GameShell, Mascot, PosIcon, POS_STYLE, Stars, Confetti } from "@/components/game/Game";
import { CASES } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { posStatuses, progressStore, totalStars, useProgress } from "@/lib/progress";
import { FINAL_QUESTIONS, PATHS } from "@/lib/learning";
import { playCorrect, playPop, playCelebration, speakNorma } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/refleksi")({
  head: () =>
    pageMeta(
      "Misi Akhir & Refleksi",
      "Evaluasi pemahaman norma dan refleksi penerapan dalam kehidupan sehari-hari.",
    ),
  component: Page,
});

const LABEL = { locked: "Belum dibuka", active: "Sedang dikerjakan", done: "Selesai" };

function Page() {
  const p = useProgress();
  const [savedToast, setSavedToast] = useState(false);

  if (!p)
    return (
      <GameShell>
        <div className="h-96" />
      </GameShell>
    );

  const st = posStatuses(p);
  const doneCount = CASES.filter((c) => st[c.id] === "done").length;
  const currentPath = PATHS[p.path];
  const allPosDone = doneCount === CASES.length;

  const handleSelectFinal = (qId: string, optIdx: number) => {
    playPop();
    progressStore.setFinalEvaluation(qId, optIdx);
    const q = FINAL_QUESTIONS.find((item) => item.id === qId);
    if (q && optIdx === q.correct) {
      playCorrect();
    }
  };

  const finalScore = FINAL_QUESTIONS.filter((q) => p.finalEvaluations[q.id] === q.correct).length;

  const handleSaveReflection = () => {
    playCelebration();
    setSavedToast(true);
    speakNorma(
      "Refleksimu luar biasa, Detektif! Memahami norma dan menerapkannya dalam kehidupan nyata adalah kunci menjadi pribadi yang mulia dan bertanggung jawab.",
    );
    setTimeout(() => setSavedToast(false), 4000);
  };

  return (
    <GameShell>
      {allPosDone && <Confetti />}

      <div className="text-center">
        <span className="inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold text-secondary-foreground">
          Tahap 5 · Evaluasi Pemahaman & Refleksi Bermakna
        </span>
        <h1 className="mt-2 font-display text-3xl font-black text-brown sm:text-5xl">
          Misi Akhir & Refleksi Detektif
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Uji pemahaman akhirmu tentang 4 norma dan tuliskan komitmen kebaikanmu dalam kehidupan
          sehari-hari.
        </p>
      </div>

      {/* Progress & Badge Summary Card */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-card p-5 shadow-soft border border-border text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase">Progres Pos Norma</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-primary">
            {doneCount}{" "}
            <span className="text-lg font-normal text-muted-foreground">/ 4 Selesai</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Agama, Susila, Sopan, Hukum</p>
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-soft border border-border text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase">
            Total Bintang Terkumpul
          </p>
          <p className="mt-1 font-display text-3xl font-extrabold text-gold-foreground">
            ⭐ {totalStars(p)}{" "}
            <span className="text-lg font-normal text-muted-foreground">/ 16</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Dari ketepatan dan alasan</p>
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-soft border border-border text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase">Jalur Belajar (TaRL)</p>
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold shadow-xs">
            <span>{currentPath.icon}</span> {currentPath.name}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{currentPath.subtitle}</p>
        </div>
      </div>

      {/* SECTION 1: FINAL MISSION EVALUATION (4 QUESTIONS) */}
      <section className="mt-8 rounded-3xl bg-card p-6 shadow-soft border-2 border-border">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="size-6 text-primary" />
          <h2 className="font-display text-xl font-extrabold text-brown sm:text-2xl">
            Bagian 1: Evaluasi Pemahaman Empat Norma
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Pilihlah solusi paling tepat yang mencerminkan pemahamanmu terhadap norma agama,
          kesusilaan, kesopanan, dan hukum.
        </p>

        <div className="mt-6 space-y-5">
          {FINAL_QUESTIONS.map((fq, idx) => {
            const selectedOpt = p.finalEvaluations[fq.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === fq.correct;

            return (
              <div key={fq.id} className="rounded-2xl bg-secondary/30 p-4 border border-border/80">
                <div className="flex items-start gap-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-xs font-bold">
                    {idx + 1}
                  </span>
                  <p className="font-display text-base font-bold text-foreground">{fq.q}</p>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {fq.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectFinal(fq.id, optIdx)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl border-2 p-2.5 text-left text-xs sm:text-sm font-semibold transition",
                          isSelected
                            ? isCorrect
                              ? "border-primary bg-primary/10 text-primary font-bold"
                              : "border-border bg-card text-foreground"
                            : "border-border bg-card text-foreground hover:border-primary/40",
                        )}
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-[11px] font-bold">
                          {["A", "B", "C", "D"][optIdx]}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <p
                    className={cn(
                      "mt-2 text-xs font-bold",
                      isCorrect ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {isCorrect
                      ? "✅ Jawabanmu sangat tepat dan sesuai prinsip norma!"
                      : "💡 Jawaban tersimpan. Kamu dapat mempertimbangkan opsi yang paling adil."}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="font-display text-sm font-bold text-foreground">
            Skor Misi Akhir:{" "}
            <span className="text-primary text-base font-black">
              {finalScore} / {FINAL_QUESTIONS.length} Benar
            </span>
          </p>
          <span className="text-xs text-muted-foreground font-semibold">
            Tersimpan di perangkat
          </span>
        </div>
      </section>

      {/* SECTION 2: THREE GUIDED PERSONAL REFLECTIONS */}
      <section className="mt-8 rounded-3xl bg-sage/80 p-6 shadow-soft border-2 border-border/80">
        <div className="flex items-center gap-3">
          <Mascot mood="berpikir" imgClass="w-20" />
          <div>
            <div className="flex items-center gap-2">
              <Heart className="size-5 text-rose-500 fill-rose-500" />
              <h2 className="font-display text-xl font-extrabold text-brown sm:text-2xl">
                Bagian 2: Tiga Refleksi Bermakna Detektif
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Renungkan pengalaman belajarmu dan tuliskan dengan jujur menggunakan kata-katamu
              sendiri.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* Reflection 1 */}
          <div className="rounded-2xl bg-card p-4 shadow-xs border border-border">
            <label
              htmlFor="ref-1"
              className="font-display text-sm sm:text-base font-extrabold text-brown block"
            >
              1. Apa hal paling berharga yang kamu pelajari dari misi kasus norma hari ini?
            </label>
            <textarea
              id="ref-1"
              rows={3}
              value={p.reflections?.learned ?? ""}
              onChange={(e) => progressStore.setReflections({ learned: e.target.value })}
              placeholder="Contoh: Saya belajar bahwa norma agama, susila, kesopanan, dan hukum sangat penting untuk menjaga kerukunan..."
              className="mt-2 w-full rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-hidden"
            />
          </div>

          {/* Reflection 2 */}
          <div className="rounded-2xl bg-card p-4 shadow-xs border border-border">
            <label
              htmlFor="ref-2"
              className="font-display text-sm sm:text-base font-extrabold text-brown block"
            >
              2. Mengapa alasan di balik tindakan penting untuk dipertimbangkan sebelum bertindak?
            </label>
            <textarea
              id="ref-2"
              rows={3}
              value={p.reflections?.reasonImportance ?? ""}
              onChange={(e) => progressStore.setReflections({ reasonImportance: e.target.value })}
              placeholder="Contoh: Karena tindakan yang baik harus didasari niat tulus dan memikirkan akibatnya bagi orang lain..."
              className="mt-2 w-full rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-hidden"
            />
          </div>

          {/* Reflection 3 */}
          <div className="rounded-2xl bg-card p-4 shadow-xs border border-border">
            <label
              htmlFor="ref-3"
              className="font-display text-sm sm:text-base font-extrabold text-brown block"
            >
              3. Bagaimana kamu akan menerapkan pemahaman norma ini dalam kehidupan sehari-hari (di
              rumah, sekolah, atau masyarakat)?
            </label>
            <textarea
              id="ref-3"
              rows={3}
              value={p.reflections?.dailyLife ?? ""}
              onChange={(e) => progressStore.setReflections({ dailyLife: e.target.value })}
              placeholder="Contoh: Di sekolah saya akan selalu mengantre tertib di kantin, di rumah saya mematuhi nasihat orang tua..."
              className="mt-2 w-full rounded-xl border border-border p-3 text-sm focus:border-primary focus:outline-hidden"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Tulisanmu tersimpan otomatis di perangkat ini.
          </p>
          <button
            onClick={handleSaveReflection}
            className="btn-game bg-primary text-primary-foreground text-sm"
          >
            💾 Simpan Refleksi Detektif
          </button>
        </div>

        {savedToast && (
          <div className="mt-3 rounded-xl bg-gold/30 p-2.5 text-center text-xs font-bold text-gold-foreground animate-in fade-in">
            ✅ Refleksimu tersimpan dengan baik! Si Norma bangga padamu!
          </div>
        )}
      </section>

      {/* Pos Breakdown Grid */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {CASES.map((c) => {
          const r = p.results[c.id];
          const style = POS_STYLE[c.color];
          return (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-soft border border-border/80"
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl text-card shadow-xs",
                  style.bg,
                )}
              >
                <PosIcon icon={c.icon} className="size-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm sm:text-base truncate">
                  {c.pos} · {c.norma}
                </p>
                <p className="text-xs text-muted-foreground">{LABEL[st[c.id] ?? "locked"]}</p>
                {r && (
                  <p className="text-xs font-medium text-foreground truncate">
                    Skor: {r.bestStars}/4 ⭐
                  </p>
                )}
              </div>
              <Stars count={r?.bestStars ?? 0} size="size-4" />
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/peta" className="btn-game bg-primary text-primary-foreground">
          KEMBALI KE PETA
        </Link>
        <Link to="/lencana" className="btn-game bg-gold text-gold-foreground">
          <Trophy className="size-5" /> GALERI LENCANA
        </Link>
        <button
          className="btn-game bg-card text-foreground border-2 border-border"
          onClick={() => {
            if (confirm("Hapus semua progres dan mulai petualangan baru dari awal?")) {
              progressStore.reset();
            }
          }}
        >
          <RotateCcw className="size-4" /> Reset Progres
        </button>
      </div>
    </GameShell>
  );
}
