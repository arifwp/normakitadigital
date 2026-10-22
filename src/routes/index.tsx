import { createFileRoute, Link } from "@tanstack/react-router";
import { Map, HelpCircle, Sparkles, Compass } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GameShell, HowToPlayContent, Mascot, AudioControlModal } from "@/components/game/Game";
import { PATHS } from "@/lib/learning";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NORMAKITA Digital: Laboratorium Kasus Norma Berbasis CRT" },
      {
        name: "description",
        content:
          "Laboratorium kasus norma interaktif berbasis Culturally Responsive Teaching (CRT) dan Teaching at the Right Level (TaRL) untuk murid kelas V SD.",
      },
      { property: "og:title", content: "NORMAKITA Digital: Laboratorium Kasus Norma Berbasis CRT" },
      {
        property: "og:description",
        content: "Petualangan detektif norma berdiferensiasi untuk murid kelas V SD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const p = useProgress();
  const currentPath = p ? PATHS[p.path] : PATHS.bintang;

  return (
    <GameShell hideBar>
      <div className="flex items-center justify-between py-4">
        <span className="font-display text-lg font-extrabold text-primary">NORMAKITA DIGITAL</span>
        <div className="flex items-center gap-2">
          <AudioControlModal />
        </div>
      </div>

      <section className="grid min-h-[80vh] items-center gap-8 py-6 md:grid-cols-[1.25fr_1fr]">
        <div className="text-center md:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-extrabold text-secondary-foreground sm:text-sm">
            <Sparkles className="size-4 text-gold-foreground" /> Media Pembelajaran Pendidikan
            Pancasila Kelas V SD
          </div>

          <h1 className="font-display text-5xl font-black leading-tight text-brown sm:text-7xl">
            NORMAKITA <span className="text-primary">DIGITAL</span>
          </h1>

          <p className="mt-2 font-display text-xl font-bold text-primary sm:text-2xl">
            Laboratorium Kasus Norma Berbasis CRT & TaRL
          </p>

          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg md:mx-0">
            Jadilah Detektif Norma! Pecahkan berbagai kasus nyata di lingkungan sekolah dan
            Surakarta, pahami aturan hidup bersama, dan tentukan keputusan yang paling bertanggung
            jawab.
          </p>

          {/* TaRL Path Preview Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            <div className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-bold text-gold-foreground">
              <span>⭐</span> Jalur Bintang (Mengenali)
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-100 px-3 py-1 text-xs font-bold text-sky-900">
              <span>🌙</span> Jalur Bulan (Menerapkan)
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-100 px-3 py-1 text-xs font-bold text-orange-950">
              <span>☀️</span> Jalur Matahari (Menganalisis)
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start sm:justify-center">
            <Link
              to="/peta"
              className="btn-game w-full sm:w-auto bg-primary text-primary-foreground"
            >
              <Map className="size-5" /> MULAI PETUALANGAN
            </Link>

            <Link
              to="/diagnostik"
              className="btn-game w-full sm:w-auto bg-card text-foreground border-2 border-border"
            >
              <Compass className="size-5 text-primary" /> UJI KESIAPAN (DIAGNOSTIK)
            </Link>

            <Dialog>
              <DialogTrigger className="btn-game w-full sm:w-auto bg-gold text-gold-foreground">
                <HelpCircle className="size-5" /> CARA BERMAIN
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl bg-card">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">
                    Petunjuk Bermain Detektif
                  </DialogTitle>
                </DialogHeader>
                <HowToPlayContent />
              </DialogContent>
            </Dialog>
          </div>

          {p?.diagnosticDone && (
            <p className="mt-4 text-xs font-semibold text-muted-foreground">
              Jalur belajarmu saat ini: <b>{currentPath.name}</b> ({currentPath.title}).
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <Mascot
            mood="ceria"
            side="left"
            imgClass="w-60 sm:w-80"
            className="justify-center"
            says="Halo, Detektif Norma! Siap memecahkan misteri norma di sekitar kita? Klik tombol speaker di pojok awan bicaraku untuk mendengarkanku!"
          />
        </div>
      </section>
    </GameShell>
  );
}
