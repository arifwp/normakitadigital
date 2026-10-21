import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CaseGate } from "@/components/game/CaseGate";
import { Mascot, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { progressStore } from "@/lib/progress";
import { scoreCase } from "@/lib/scoring";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alasan/$id")({
  head: () => pageMeta("Analisis Alasan", "Jelaskan mengapa kamu memilih tindakan itu."),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [askClarify, setAskClarify] = useState(false);
  return (
    <CaseGate id={id}>
      {(c, p) => {
        const d = p.drafts[c.id] ?? {};
        if (!d.actionId) return <Navigate to="/tindakan/$id" params={{ id }} />;
        const action = c.actions.find((a) => a.id === d.actionId)!;

        const finish = (force: boolean) => {
          if (!d.reasonId) return;
          const score = scoreCase(c, d.actionId!, d.reasonId, d.text ?? "");
          if (score.needsClarify && !force) {
            setAskClarify(true);
            return;
          }
          progressStore.submit(c.id, { actionId: d.actionId!, reasonId: d.reasonId, text: d.text ?? "", score });
          navigate({ to: "/hasil/$id", params: { id } });
        };

        return (
          <div className="mx-auto max-w-3xl">
            <StepDots step={3} />
            <p className="rounded-2xl bg-secondary px-4 py-2 font-semibold">
              Pilihanmu: {action.emoji} {action.label}
            </p>
            <h1 className="mt-5 text-3xl font-extrabold">Mengapa kamu memilih tindakan itu?</h1>
            <div className="mt-4 grid gap-3">
              {c.reasons.map((r) => (
                <button
                  key={r.id}
                  onClick={() => progressStore.setDraft(c.id, { reasonId: r.id })}
                  aria-pressed={d.reasonId === r.id}
                  className={cn(
                    "rounded-2xl border-4 bg-card p-4 text-left text-lg font-semibold shadow-soft transition hover:-translate-y-0.5",
                    d.reasonId === r.id ? "border-primary bg-secondary" : "border-transparent",
                  )}
                >
                  💭 {r.label}
                </button>
              ))}
            </div>
            <label className="mt-6 block font-display text-xl font-bold" htmlFor="tulis">
              Coba jelaskan dengan kata-katamu sendiri. <span className="text-sm font-semibold text-muted-foreground">(boleh dikosongkan)</span>
            </label>
            <p className="text-sm text-muted-foreground">Tip: ceritakan apa akibatnya, atau bagaimana cara memperbaikinya, untuk +1 bintang.</p>
            <textarea
              id="tulis"
              value={d.text ?? ""}
              onChange={(e) => {
                setAskClarify(false);
                progressStore.setDraft(c.id, { text: e.target.value });
              }}
              rows={3}
              maxLength={300}
              className="mt-2 w-full rounded-2xl border-2 bg-card p-4 text-lg focus:border-primary focus:outline-none"
              placeholder="Menurutku..."
            />
            {askClarify && (
              <div className="mt-4 rounded-3xl bg-gold/25 p-4">
                <Mascot mood="berpikir" imgClass="w-20" says="Penjelasanmu menarik! Bisakah kamu ceritakan sedikit lebih jelas, misalnya apa akibatnya?" />
                <div className="mt-2 flex flex-wrap gap-2">
                  <button className="btn-game bg-card text-foreground" onClick={() => document.getElementById("tulis")?.focus()}>Perjelas</button>
                  <button className="btn-game bg-primary text-primary-foreground" onClick={() => finish(true)}>Lanjutkan saja</button>
                </div>
              </div>
            )}
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Link to="/tindakan/$id" params={{ id }} className="btn-game bg-card text-foreground">← Tindakan</Link>
              <button disabled={!d.reasonId} onClick={() => finish(false)} className="btn-game bg-primary text-primary-foreground">
                LIHAT HASIL ⭐
              </button>
            </div>
          </div>
        );
      }}
    </CaseGate>
  );
}
