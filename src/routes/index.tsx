import { createFileRoute, Link } from "@tanstack/react-router";
import { Map, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GameShell, HowToPlayContent, Mascot } from "@/components/game/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NORMAKITA Digital: Laboratorium Kasus Norma Berbasis CRT" },
      { name: "description", content: "Jelajahi kasus sehari-hari, temukan norma yang sesuai, dan pilih tindakan yang bertanggung jawab." },
      { property: "og:title", content: "NORMAKITA Digital: Laboratorium Kasus Norma Berbasis CRT" },
      { property: "og:description", content: "Petualangan detektif norma untuk murid kelas V SD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <GameShell hideBar>
      <section className="grid min-h-[85vh] items-center gap-6 py-8 md:grid-cols-[1.2fr_1fr]">
        <div className="text-center md:text-left">
          <p className="mb-2 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground">
            Untuk Detektif Kelas V SD
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-none text-brown sm:text-7xl">
            NORMAKITA <span className="text-primary">DIGITAL</span>
          </h1>
          <p className="mt-3 font-display text-xl font-bold text-primary sm:text-2xl">
            Laboratorium Kasus Norma Berbasis CRT
          </p>
          <p className="mx-auto mt-4 max-w-md text-lg md:mx-0">
            Jelajahi kasus sehari-hari, temukan norma yang sesuai, dan pilih tindakan yang bertanggung jawab.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start sm:justify-center">
            <Link to="/peta" className="btn-game bg-primary text-primary-foreground">
              <Map className="size-5" /> MULAI PETUALANGAN
            </Link>
            <Dialog>
              <DialogTrigger className="btn-game bg-gold text-gold-foreground">
                <HelpCircle className="size-5" /> CARA BERMAIN
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl bg-card">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">Cara Bermain</DialogTitle>
                </DialogHeader>
                <HowToPlayContent />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Mascot
          mood="ceria"
          side="left"
          imgClass="w-56 sm:w-72"
          className="justify-center"
          says="Halo, Detektif Norma! Siap memecahkan misteri norma di sekitar kita?"
        />
      </section>
    </GameShell>
  );
}
