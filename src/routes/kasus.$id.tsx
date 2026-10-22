import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Shuffle, Sparkles, Lightbulb, Target } from "lucide-react";
import { CaseGate } from "@/components/game/CaseGate";
import { Mascot, PosIcon, POS_STYLE, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { progressStore } from "@/lib/progress";
import { PATHS } from "@/lib/learning";
import { playPop } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kasus/$id")({
  head: ({ params }) => {
    return pageMeta(`Kasus Pos ${params.id}`, "Pecahkan kasus norma bersama detektif Si Norma.");
  },
  component: Page,
});

function Page() {
  const { id } = Route.useParams();

  return (
    <CaseGate id={id}>
      {(c, p) => {
        const style = POS_STYLE[c.color];
        const currentPath = PATHS[p.path];

        const handleShuffle = () => {
          playPop();
          progressStore.resetQuestion(Number(id));
        };

        return (
          <div className="mx-auto max-w-3xl">
            <StepDots step={1} />

            {/* Path and Pos Badge Header */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display font-bold text-card shadow-sm",
                    style.bg,
                  )}
                >
                  <PosIcon icon={c.icon} className="size-5" /> {c.pos} · {c.norma}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground bg-card px-3 py-1 rounded-full shadow-xs">
                  <MapPin className="size-4 text-primary" /> {c.place}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 font-display text-xs font-bold",
                    currentPath.tagColor,
                  )}
                >
                  {currentPath.icon} {currentPath.name}
                </span>
                <button
                  onClick={handleShuffle}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-bold shadow-xs hover:bg-secondary transition active:scale-95"
                  title="Ganti ke soal variasi lain di pos ini"
                >
                  <Shuffle className="size-3.5 text-primary" /> Ganti Kasus
                </button>
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl text-brown">{c.title}</h1>

            {/* Visual Scene & Image */}
            <div className="grid items-end gap-4 md:grid-cols-[1fr_auto]">
              <div className="relative overflow-hidden rounded-3xl border-4 border-card shadow-soft">
                <img
                  src={c.image}
                  alt={c.question}
                  width={1280}
                  height={768}
                  className="w-full object-cover max-h-[380px]"
                />
                {c.scene && (
                  <div className="absolute top-3 right-3 rounded-2xl bg-card/90 px-3 py-1.5 text-2xl shadow-sm backdrop-blur-xs">
                    {c.scene}
                  </div>
                )}
              </div>

              <Mascot
                mood="berpikir"
                imgClass="w-24 sm:w-32"
                className="md:flex-col-reverse md:items-center"
                says={`Amati situasi di ${c.place}. Kira-kira norma apa yang berlaku di sini?`}
              />
            </div>

            {/* Question Text Box */}
            <div className="mt-5 rounded-3xl bg-card p-6 shadow-soft border-2 border-border/60">
              <p className="font-display text-xl font-bold leading-relaxed text-foreground sm:text-2xl">
                {c.question}
              </p>
            </div>

            {/* TaRL Differentiated Scaffolding Card */}
            {p.path === "bintang" && c.hint && (
              <div className="mt-4 rounded-3xl border-2 border-gold bg-gold/15 p-4 text-left shadow-xs">
                <div className="flex items-center gap-2 text-gold-foreground font-display font-bold">
                  <Lightbulb className="size-5" /> Petunjuk Bantuan Si Norma:
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground/90">{c.hint}</p>
              </div>
            )}

            {p.path === "bulan" && (
              <div className="mt-4 rounded-3xl border-2 border-sky-400 bg-sky-100 p-4 text-left shadow-xs">
                <div className="flex items-center gap-2 text-sky-900 font-display font-bold">
                  <Target className="size-5 text-sky-600" /> Tantangan Tingkat Menengah:
                </div>
                <p className="mt-1 text-sm font-semibold text-sky-950">
                  Perhatikan norma yang berkaitan dan pikirkan apa akibat jangka panjang dari
                  tindakan yang kamu putuskan.
                </p>
              </div>
            )}

            {p.path === "matahari" && c.challenge && (
              <div className="mt-4 rounded-3xl border-2 border-orange-400 bg-orange-100 p-4 text-left shadow-xs">
                <div className="flex items-center gap-2 text-orange-950 font-display font-bold">
                  <Sparkles className="size-5 text-orange-600" /> Tantangan Analisis Multi-Pihak:
                </div>
                <p className="mt-1 text-sm font-semibold text-orange-950">{c.challenge}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Link to="/peta" className="btn-game bg-card text-foreground border-2 border-border">
                ← Peta
              </Link>
              <Link
                to="/tindakan/$id"
                params={{ id }}
                className="btn-game bg-primary text-primary-foreground"
              >
                PILIH TINDAKAN →
              </Link>
            </div>
          </div>
        );
      }}
    </CaseGate>
  );
}
