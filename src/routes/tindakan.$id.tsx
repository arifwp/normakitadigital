import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CaseGate } from "@/components/game/CaseGate";
import { Mascot, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { progressStore } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tindakan/$id")({
  head: () => pageMeta("Pilih Tindakan", "Tentukan tindakan yang paling bertanggung jawab."),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  return (
    <CaseGate id={id}>
      {(c, p) => {
        const chosen = p.drafts[c.id]?.actionId;
        return (
          <div className="mx-auto max-w-3xl">
            <StepDots step={2} />
            <div className="flex items-center gap-4">
              <img src={c.image} alt="" className="hidden w-40 rounded-2xl sm:block" />
              <h1 className="text-2xl font-extrabold sm:text-3xl">{c.question}</h1>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {c.actions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => progressStore.setDraft(c.id, { actionId: a.id })}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-3xl border-4 bg-card p-5 text-center font-semibold shadow-soft transition hover:-translate-y-1",
                    chosen === a.id ? "border-primary bg-secondary" : "border-transparent",
                  )}
                  aria-pressed={chosen === a.id}
                >
                  <span className="text-5xl">{a.emoji}</span>
                  {a.label}
                </button>
              ))}
            </div>
            <Mascot mood="berpikir" className="mt-6" says="Pilih dulu, nanti kita pikirkan alasannya bersama." />
            <div className="mt-4 flex flex-wrap justify-between gap-3">
              <Link to="/kasus/$id" params={{ id }} className="btn-game bg-card text-foreground">← Kasus</Link>
              <button
                disabled={!chosen}
                onClick={() => navigate({ to: "/alasan/$id", params: { id } })}
                className="btn-game bg-primary text-primary-foreground"
              >
                LANJUT KE ALASAN →
              </button>
            </div>
          </div>
        );
      }}
    </CaseGate>
  );
}
