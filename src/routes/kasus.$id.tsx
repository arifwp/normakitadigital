import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { CaseGate } from "@/components/game/CaseGate";
import { Mascot, PosIcon, POS_STYLE, StepDots } from "@/components/game/Game";
import { getCase } from "@/lib/cases";
import { pageMeta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kasus/$id")({
  head: ({ params }) => {
    const c = getCase(params.id);
    return pageMeta(c ? `${c.pos}: ${c.title}` : "Kasus", c ? c.question : "Kasus norma");
  },
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <CaseGate id={id}>
      {(c) => {
        const style = POS_STYLE[c.color];
        return (
          <div className="mx-auto max-w-3xl">
            <StepDots step={1} />
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display font-bold text-card", style.bg)}>
                <PosIcon icon={c.icon} className="size-5" /> {c.pos} · {c.norma}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <MapPin className="size-4" /> {c.place}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">{c.title}</h1>
            <div className="grid items-end gap-4 md:grid-cols-[1fr_auto]">
              <img src={c.image} alt={c.question} width={1280} height={768} className="w-full rounded-3xl border-4 border-card shadow-soft" />
              <Mascot mood="berpikir" imgClass="w-24 sm:w-32" className="md:flex-col-reverse md:items-center" says="Coba amati baik-baik. Apa yang sedang terjadi?" />
            </div>
            <p className="mt-5 rounded-3xl bg-card p-5 text-lg font-semibold shadow-soft">{c.question}</p>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Link to="/peta" className="btn-game bg-card text-foreground">← Peta</Link>
              <Link to="/tindakan/$id" params={{ id }} className="btn-game bg-primary text-primary-foreground">PILIH TINDAKAN →</Link>
            </div>
          </div>
        );
      }}
    </CaseGate>
  );
}
