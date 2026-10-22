import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { NormCase } from "@/lib/cases";
import { getActiveCase, posStatuses, useProgress, type Progress } from "@/lib/progress";
import { GameShell, Mascot } from "./Game";

/** Memastikan pos ada dan sudah terbuka sebelum isi halaman ditampilkan */
export function CaseGate({
  id,
  children,
}: {
  id: string;
  children: (c: NormCase, p: Progress) => ReactNode;
}) {
  const p = useProgress();
  if (!p)
    return (
      <GameShell>
        <div className="h-96" />
      </GameShell>
    );
  const c = getActiveCase(id, p);
  if (!c || posStatuses(p)[c.id] === "locked") {
    return (
      <GameShell>
        <div className="mx-auto mt-10 max-w-md text-center">
          <Mascot
            mood="berpikir"
            className="justify-center"
            says="Pos ini masih terkunci. Selesaikan pos sebelumnya dulu, ya!"
          />
          <Link to="/peta" className="btn-game mt-6 bg-primary text-primary-foreground">
            KEMBALI KE PETA
          </Link>
        </div>
      </GameShell>
    );
  }
  return <GameShell>{children(c, p)}</GameShell>;
}
