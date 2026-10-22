import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CaseGate } from "@/components/game/CaseGate";
import { Mascot, StepDots } from "@/components/game/Game";
import { pageMeta } from "@/lib/meta";
import { getOrInitActionOrder, progressStore } from "@/lib/progress";
import { PATHS } from "@/lib/learning";
import { playPop } from "@/lib/audio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tindakan/$id")({
  head: () =>
    pageMeta("Pilih Tindakan", "Tentukan tindakan yang paling adil dan bertanggung jawab."),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  return (
    <CaseGate id={id}>
      {(c, p) => {
        const posNum = Number(id);
        const draft = p.drafts[posNum] ?? {};
        const chosen = draft.actionId;
        const currentPath = PATHS[p.path];

        // Retrieve or initialize randomized balanced action order
        const orderedActionIds = getOrInitActionOrder(posNum, c, p);
        const orderedActions = orderedActionIds
          .map((aid) => c.actions.find((a) => a.id === aid))
          .filter(Boolean) as typeof c.actions;

        const handleSelect = (actionId: string) => {
          playPop();
          progressStore.setDraft(posNum, { actionId });
        };

        const handleContinue = () => {
          if (!chosen) return;
          playPop();
          navigate({ to: "/alasan/$id", params: { id } });
        };

        return (
          <div className="mx-auto max-w-3xl">
            <StepDots step={2} />

            {/* Header info */}
            <div className="flex flex-col gap-3 rounded-3xl bg-card p-5 shadow-soft sm:flex-row sm:items-center">
              <img
                src={c.image}
                alt=""
                className="hidden size-24 shrink-0 rounded-2xl object-cover sm:block"
              />
              <div className="flex-1">
                <span
                  className={cn(
                    "inline-block rounded-full px-3 py-0.5 text-xs font-bold",
                    currentPath.tagColor,
                  )}
                >
                  {currentPath.icon} {currentPath.name}
                </span>
                <h1 className="mt-1 font-display text-xl font-extrabold leading-snug sm:text-2xl text-brown">
                  {c.question}
                </h1>
              </div>
            </div>

            {/* Instruction banner */}
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-muted-foreground">
                Pilihlah satu tindakan terbaik (A, B, C, atau D):
              </p>
              {p.path === "bintang" && (
                <span className="text-xs font-semibold text-gold-foreground bg-gold/20 px-3 py-1 rounded-full">
                  💡 Kamu bisa mencoba lagi jika belum tepat
                </span>
              )}
            </div>

            {/* 4 Balanced Shuffled Actions (A, B, C, D) */}
            <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
              {orderedActions.map((a, idx) => {
                const letter = ["A", "B", "C", "D"][idx];
                const isSelected = chosen === a.id;

                return (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(a.id)}
                    className={cn(
                      "flex items-start gap-3.5 rounded-3xl border-3 p-4 text-left transition hover:-translate-y-1 shadow-soft",
                      isSelected
                        ? "border-primary bg-secondary/80 text-foreground ring-2 ring-primary/40"
                        : "border-border bg-card text-foreground hover:border-primary/50",
                    )}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-2xl font-display text-base font-extrabold shadow-xs",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {letter}
                    </span>

                    <div className="min-w-0 flex-1">
                      <span className="text-2xl">{a.emoji}</span>
                      <p className="mt-1 font-semibold text-sm leading-relaxed sm:text-base">
                        {a.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mascot guidance */}
            <Mascot
              mood="berpikir"
              className="mt-6"
              says="Pilihlah tindakan yang paling adil dan bertanggung jawab. Setelah ini kita akan menganalisis alasannya bersama!"
            />

            {/* Bottom Nav */}
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Link
                to="/kasus/$id"
                params={{ id }}
                className="btn-game bg-card text-foreground border-2 border-border"
              >
                ← Kembali ke Kasus
              </Link>
              <button
                disabled={!chosen}
                onClick={handleContinue}
                className="btn-game bg-primary text-primary-foreground disabled:opacity-40"
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
