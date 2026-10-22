import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Trophy,
  RotateCcw,
  Shuffle,
  Sparkles,
  Compass,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { GameShell, LockBadge, Mascot, PosIcon, POS_STYLE, Stars } from "@/components/game/Game";
import { CASES } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { getActiveCase, posStatuses, progressStore, useProgress } from "@/lib/progress";
import { PATHS, recommendDevelopment, type LearningPath } from "@/lib/learning";
import { getQuestionsByPos } from "@/lib/question-bank";
import { playPop, playCelebration } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/peta")({
  head: () =>
    pageMeta(
      "Peta Petualangan Norma",
      "Peta misi kasus norma berbasis TaRL: kelompok Bintang, Bulan, dan Matahari.",
    ),
  component: Peta,
});

const STATUS_LABEL = { locked: "Belum dibuka", active: "Sedang dikerjakan", done: "Selesai" };

function Peta() {
  const p = useProgress();
  const [showTeacherPanel, setShowTeacherPanel] = useState(false);

  if (!p)
    return (
      <GameShell>
        <div className="h-96" />
      </GameShell>
    );

  const st = posStatuses(p);
  const currentPath = PATHS[p.path];
  const devRecommendation = recommendDevelopment(p.path, p.history);

  const handleShuffleCase = (e: React.MouseEvent, posId: number) => {
    e.preventDefault();
    e.stopPropagation();
    playPop();
    progressStore.resetQuestion(posId);
  };

  const handleUpgradePath = (newPath: LearningPath) => {
    playCelebration();
    progressStore.setPath(newPath);
  };

  return (
    <GameShell>
      {/* Title & TaRL Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 font-display text-xs font-bold text-secondary-foreground sm:text-sm">
          <Sparkles className="size-4 text-gold-foreground" /> Laboratorium Kasus Norma
          Berdiferensiasi (TaRL)
        </div>
        <h1 className="mt-2 font-display text-4xl font-black text-brown sm:text-5xl">
          Peta Petualangan Norma
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Selesaikan setiap pos kasus untuk mengumpulkan 4 lencana kebajikan dan memecahkan misteri
          norma.
        </p>
      </div>

      {/* Active Path Card & Diagnostic CTA */}
      <div className="mx-auto mt-6 max-w-3xl">
        <div
          className={cn("rounded-3xl border-3 p-5 shadow-soft transition-all", currentPath.color)}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card text-3xl shadow-sm">
                {currentPath.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-black",
                      currentPath.tagColor,
                    )}
                  >
                    Jalur Aktif
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">
                    {currentPath.subtitle}
                  </span>
                </div>
                <h2 className="font-display text-xl font-extrabold sm:text-2xl">
                  {currentPath.name}: {currentPath.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {currentPath.help}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
              <Link
                to="/diagnostik"
                className="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1.5 font-display text-xs font-bold text-foreground shadow-sm transition hover:scale-105"
              >
                <Compass className="size-4 text-primary" />
                {p.diagnosticDone ? "Ulangi Asesmen" : "Ikuti Asesmen Awal"}
              </Link>
              <button
                onClick={() => setShowTeacherPanel(!showTeacherPanel)}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3.5 py-1.5 font-display text-xs font-bold text-secondary-foreground shadow-sm transition hover:bg-secondary"
              >
                <UserCheck className="size-4" />
                Mode Guru
              </button>
            </div>
          </div>

          {/* Development Path Progression Alert */}
          {devRecommendation && (
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-card/90 p-3.5 shadow-sm border border-primary/20">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="font-display text-sm font-extrabold text-primary">
                    Rekomendasi Kenaikan Jalur!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pemahamanmu berkembang sangat baik. Kamu siap mencoba tantangan{" "}
                    <b>{PATHS[devRecommendation].name}</b>!
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleUpgradePath(devRecommendation)}
                className="rounded-full bg-primary px-3 py-1.5 font-display text-xs font-bold text-primary-foreground shadow-sm hover:scale-105"
              >
                Naik ke {PATHS[devRecommendation].name} <ArrowUpRight className="inline size-3.5" />
              </button>
            </div>
          )}

          {/* Teacher Path Override Panel */}
          {showTeacherPanel && (
            <div className="mt-4 rounded-2xl bg-card p-4 border border-border">
              <p className="font-display text-sm font-bold text-brown">
                Penetapan Jalur Belajar oleh Guru:
              </p>
              <p className="text-xs text-muted-foreground">
                Pilih jalur secara manual sesuai hasil observasi atau kesiapan belajar murid:
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {(["bintang", "bulan", "matahari"] as LearningPath[]).map((pathKey) => {
                  const target = PATHS[pathKey];
                  const isCurrent = p.path === pathKey;
                  return (
                    <button
                      key={pathKey}
                      onClick={() => {
                        playPop();
                        progressStore.setPath(pathKey);
                      }}
                      className={cn(
                        "rounded-xl border-2 p-3 text-left transition",
                        isCurrent
                          ? "border-primary bg-secondary text-primary font-bold shadow-xs"
                          : "border-border hover:border-primary/50 text-foreground",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold">{target.name}</span>
                        <span>{target.icon}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                        {target.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {p.demo && (
        <p className="mx-auto mt-4 max-w-md rounded-2xl bg-gold/20 px-4 py-2 text-center text-xs font-semibold text-gold-foreground">
          Ini contoh progres awal. Kamu bisa langsung mengerjakan Pos 3, atau menekan "Mulai dari
          awal" untuk reset.
        </p>
      )}

      {/* Map Board */}
      <div className="relative mx-auto mt-6 max-w-3xl rounded-[2.5rem] bg-sage p-4 shadow-soft sm:p-8">
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M30 8 C 90 15, 90 30, 70 37 S 10 50, 30 62 S 95 75, 70 92"
            fill="none"
            stroke="var(--brown)"
            strokeOpacity="0.3"
            strokeWidth="10"
            strokeDasharray="14 12"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="relative grid gap-6">
          {CASES.map((baseCase, i) => {
            const s = st[baseCase.id] ?? "locked";
            const activeCase = getActiveCase(baseCase.id, p);
            const style = POS_STYLE[activeCase.color];
            const stars = p.results[baseCase.id]?.bestStars ?? 0;
            const availableVariants = getQuestionsByPos(baseCase.id);

            const card = (
              <div
                className={cn(
                  "relative flex w-full max-w-sm items-center gap-3.5 rounded-3xl bg-card p-4 shadow-soft transition",
                  s === "locked" && "opacity-55 grayscale",
                  s === "active" && cn("ring-4 scale-102", style.ring),
                  s !== "locked" && "hover:-translate-y-1 hover:shadow-lg",
                )}
              >
                <span
                  className={cn(
                    "grid size-16 shrink-0 place-items-center rounded-2xl text-card shadow-sm",
                    style.bg,
                  )}
                >
                  <PosIcon icon={activeCase.icon} className="size-8" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn("text-xs font-extrabold uppercase", style.text)}>
                      {activeCase.pos}
                    </p>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      Kasus {activeCase.key ?? `${activeCase.id}-0`}
                    </span>
                  </div>

                  <p className="font-display text-base font-bold leading-tight truncate sm:text-lg">
                    {activeCase.title}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground truncate">
                    📍 {activeCase.place}
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    <Stars count={stars} size="size-4" />
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {STATUS_LABEL[s]}
                    </span>
                  </div>
                </div>

                {s === "locked" && <LockBadge />}
                {s === "done" && (
                  <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <Check className="size-5" />
                  </span>
                )}

                {/* Shuffle Question Button */}
                {s !== "locked" && (
                  <button
                    onClick={(e) => handleShuffleCase(e, baseCase.id)}
                    className="absolute -bottom-2 -right-2 grid size-8 place-items-center rounded-full border-2 border-card bg-gold text-gold-foreground shadow-sm hover:scale-110 active:rotate-180 transition-transform"
                    title={`Acak soal lain dari ${availableVariants.length} variasi di pos ini`}
                  >
                    <Shuffle className="size-3.5" />
                  </button>
                )}
              </div>
            );

            return (
              <li
                key={baseCase.id}
                className={cn("flex items-center gap-3", i % 2 ? "justify-end" : "justify-start")}
              >
                {s === "active" && i % 2 === 1 && (
                  <Mascot
                    mood="ceria"
                    imgClass="w-20 sm:w-28"
                    says="Pos ini siap diselidiki! Ayo klik untuk mulai!"
                  />
                )}

                {s === "locked" ? (
                  <div aria-disabled className="w-full max-w-sm cursor-not-allowed">
                    {card}
                  </div>
                ) : (
                  <Link
                    to="/kasus/$id"
                    params={{ id: String(baseCase.id) }}
                    className="w-full max-w-sm"
                  >
                    {card}
                  </Link>
                )}

                {s === "active" && i % 2 === 0 && (
                  <Mascot
                    mood="ceria"
                    imgClass="w-20 sm:w-28"
                    says="Pos ini siap diselidiki! Ayo klik untuk mulai!"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/lencana" className="btn-game bg-gold text-gold-foreground">
          <Trophy className="size-5" /> GALERI LENCANA
        </Link>
        <Link to="/refleksi" className="btn-game bg-primary text-primary-foreground">
          MISI AKHIR & REFLEKSI →
        </Link>
        <button
          className="btn-game bg-card text-foreground border-2 border-border"
          onClick={() => {
            if (confirm("Hapus semua progres dan mulai petualangan baru dari Pos 1?")) {
              progressStore.reset();
            }
          }}
        >
          <RotateCcw className="size-5" /> Mulai dari awal
        </button>
      </div>
    </GameShell>
  );
}
