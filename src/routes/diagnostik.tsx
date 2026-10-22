import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { GameShell, Mascot, Confetti } from "@/components/game/Game";
import { DIAGNOSTIC, PATHS, recommendDiagnostic, type LearningPath } from "@/lib/learning";
import { pageMeta } from "@/lib/meta";
import { progressStore, useProgress } from "@/lib/progress";
import { playCorrect, playPop, playTryAgain, playCelebration, speakNorma } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostik")({
  head: () =>
    pageMeta(
      "Asesmen Kesiapan Belajar",
      "Asesmen awal singkat untuk menentukan jalur belajar detektif norma yang paling tepat bagimu.",
    ),
  component: DiagnostikPage,
});

function DiagnostikPage() {
  const p = useProgress();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentQ = DIAGNOSTIC[currentIndex];
  const isLast = currentIndex === DIAGNOSTIC.length - 1;

  const handleSelectOption = (idx: number) => {
    playPop();
    const updated = [...selectedAnswers];
    updated[currentIndex] = idx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (selectedAnswers[currentIndex] === undefined) return;

    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate results
      const booleanAnswers = DIAGNOSTIC.map((q, idx) => selectedAnswers[idx] === q.correct);
      const score = booleanAnswers.filter(Boolean).length;
      const recommendedPath = recommendDiagnostic(booleanAnswers);

      progressStore.setDiagnostic(booleanAnswers, score, recommendedPath);
      playCelebration();
      setShowResult(true);

      speakNorma(
        `Luar biasa, Detektif! Berdasarkan asesmen awal, kamu direkomendasikan memulai petualangan di ${PATHS[recommendedPath].name}. Mari kita mulai petualangan!`,
      );
    }
  };

  const handlePrev = () => {
    playPop();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setCurrentIndex(0);
    setShowResult(false);
  };

  if (!p)
    return (
      <GameShell>
        <div className="h-96" />
      </GameShell>
    );

  if (showResult) {
    const recommended = PATHS[p.path];
    return (
      <GameShell>
        <Confetti />
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 font-display text-sm font-bold text-gold-foreground">
            <Sparkles className="size-4" /> Asesmen Awal Selesai!
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold text-brown sm:text-5xl">
            Selamat, Detektif Hebat!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Kamu telah menyelesaikan 8 tantangan awal dengan penuh semangat.
          </p>

          {/* Path Recommendation Card */}
          <div
            className={cn("mt-6 rounded-3xl border-4 p-6 shadow-soft text-left", recommended.color)}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-2xl bg-card text-3xl shadow-sm">
                {recommended.icon}
              </span>
              <div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 font-display text-xs font-bold",
                    recommended.tagColor,
                  )}
                >
                  Rekomendasi Jalur Belajarmu
                </span>
                <h2 className="mt-1 font-display text-2xl font-extrabold">{recommended.name}</h2>
                <p className="text-sm font-semibold">{recommended.title}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-card/80 p-4 backdrop-blur-xs">
              <p className="font-display font-bold text-base text-foreground">
                Karakteristik Jalur Ini:
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{recommended.description}</p>
              <p className="mt-2 text-xs font-semibold text-primary">💡 {recommended.help}</p>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Catatan: Jalur ini disesuaikan dengan kesiapan belajarmu saat ini dan dapat berkembang
              kapan saja. Guru juga dapat menyesuaikan jalur sesuai kebutuhan belajarmu.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate({ to: "/peta" })}
              className="btn-game w-full sm:w-auto bg-primary text-primary-foreground"
            >
              MASUK KE PETA PETUALANGAN <ArrowRight className="size-5" />
            </button>
            <button
              onClick={handleReset}
              className="btn-game w-full sm:w-auto bg-card text-foreground"
            >
              <RotateCcw className="size-5" /> Ulangi Asesmen
            </button>
          </div>
        </div>
      </GameShell>
    );
  }

  const selectedCurrent = selectedAnswers[currentIndex];

  return (
    <GameShell>
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold text-secondary-foreground sm:text-sm">
            Tahap 1 · Misi Diagnostik Kesiapan Belajar
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-brown sm:text-4xl">
            Tantangan Kesiapan Detektif
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Jawablah 8 pertanyaan singkat berikut untuk membantu Si Norma menyiapkan petualangan
            yang paling pas untukmu!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between font-display text-xs font-bold text-muted-foreground">
            <span>
              Soal {currentIndex + 1} dari {DIAGNOSTIC.length}
            </span>
            <span>{Math.round(((currentIndex + 1) / DIAGNOSTIC.length) * 100)}%</span>
          </div>
          <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / DIAGNOSTIC.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="mt-6 rounded-3xl border-2 border-border bg-card p-6 shadow-soft">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary font-display text-lg font-extrabold text-primary">
              {currentIndex + 1}
            </span>
            <h2 className="font-display text-xl font-bold leading-snug sm:text-2xl">
              {currentQ.q}
            </h2>
          </div>

          {/* Options */}
          <div className="mt-6 grid gap-3">
            {currentQ.options.map((opt, idx) => {
              const letter = ["A", "B", "C", "D"][idx];
              const isSelected = selectedCurrent === idx;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(idx)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 p-4 text-left font-semibold transition hover:-translate-y-0.5",
                    isSelected
                      ? "border-primary bg-secondary/80 text-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/50",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mascot Prompt */}
        <Mascot
          mood="berpikir"
          className="mt-6"
          says="Jawablah dengan jujur sesuai apa yang kamu ketahui. Tidak ada yang salah atau benar di sini, semuanya membantu kita belajar!"
        />

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="btn-game bg-card text-foreground disabled:opacity-40"
          >
            ← Sebelumnya
          </button>
          <button
            onClick={handleNext}
            disabled={selectedCurrent === undefined}
            className="btn-game bg-primary text-primary-foreground disabled:opacity-50"
          >
            {isLast ? "LIHAT REKOMENDASI JALUR →" : "SELANJUTNYA →"}
          </button>
        </div>
      </div>
    </GameShell>
  );
}
