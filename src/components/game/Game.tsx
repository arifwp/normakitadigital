import { Link } from "@tanstack/react-router";
import {
  HandHeart,
  Heart,
  Smile,
  Scale,
  Star,
  Home,
  Lock,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import ceria from "@/assets/norma-ceria.png";
import berpikir from "@/assets/norma-berpikir.png";
import rayakan from "@/assets/norma-rayakan.png";
import type { NormCase } from "@/lib/cases";
import { totalStars, useProgress } from "@/lib/progress";
import { PATHS } from "@/lib/learning";
import { audioStore, playPop, speakNorma, stopVoice } from "@/lib/audio";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const POS_STYLE: Record<
  NormCase["color"],
  { bg: string; text: string; ring: string; soft: string }
> = {
  agama: {
    bg: "bg-pos-agama",
    text: "text-pos-agama",
    ring: "ring-pos-agama",
    soft: "bg-pos-agama/15",
  },
  susila: {
    bg: "bg-pos-susila",
    text: "text-pos-susila",
    ring: "ring-pos-susila",
    soft: "bg-pos-susila/15",
  },
  sopan: {
    bg: "bg-pos-sopan",
    text: "text-pos-sopan",
    ring: "ring-pos-sopan",
    soft: "bg-pos-sopan/15",
  },
  hukum: {
    bg: "bg-pos-hukum",
    text: "text-pos-hukum",
    ring: "ring-pos-hukum",
    soft: "bg-pos-hukum/15",
  },
};

export function PosIcon({ icon, className }: { icon: NormCase["icon"]; className?: string }) {
  const I = { "hand-heart": HandHeart, heart: Heart, smile: Smile, scale: Scale }[icon];
  return <I className={className} strokeWidth={2.5} />;
}

export function AudioControlModal() {
  const audio = useSyncExternalStore(audioStore.subscribe, audioStore.get, audioStore.get);
  const [testing, setTesting] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-sm font-bold shadow-soft transition hover:scale-105",
            audio.enabled ? "bg-card text-primary" : "bg-muted text-muted-foreground",
          )}
          title={audio.enabled ? "Pengaturan Audio (Aktif)" : "Audio Nonaktif (Klik untuk membuka)"}
          aria-label="Pengaturan Audio"
        >
          {audio.enabled ? (
            <Volume2 className="size-4 text-primary animate-pulse" />
          ) : (
            <VolumeX className="size-4" />
          )}
          <span className="hidden sm:inline">{audio.enabled ? "Audio Aktif" : "Mute"}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl bg-card p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl font-extrabold text-brown">
            <Volume2 className="size-6 text-primary" /> Pengaturan Audio
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Master Switch */}
          <div className="flex items-center justify-between rounded-2xl bg-secondary/50 p-3">
            <div>
              <p className="font-display font-bold">Suara & Efek Utama</p>
              <p className="text-xs text-muted-foreground">Nyalakan atau matikan semua audio</p>
            </div>
            <button
              onClick={() => audioStore.toggleMaster()}
              className={cn(
                "rounded-full px-4 py-1.5 font-display text-sm font-extrabold transition",
                audio.enabled
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {audio.enabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* BGM Switch */}
          <div className="flex items-center justify-between rounded-2xl bg-secondary/30 p-3">
            <div>
              <p className="font-display font-bold">Musik Latar (BGM Ceria)</p>
              <p className="text-xs text-muted-foreground">
                Melodi marimba lembut yang menenangkan
              </p>
            </div>
            <button
              disabled={!audio.enabled}
              onClick={() => audioStore.toggleBgm()}
              className={cn(
                "rounded-full px-4 py-1.5 font-display text-sm font-extrabold transition disabled:opacity-40",
                audio.bgmEnabled && audio.enabled
                  ? "bg-gold text-gold-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {audio.bgmEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Voice Switch */}
          <div className="flex items-center justify-between rounded-2xl bg-secondary/30 p-3">
            <div>
              <p className="font-display font-bold">Suara Maskot Si Norma</p>
              <p className="text-xs text-muted-foreground">
                Si Norma membacakan petunjuk dalam bahasa Indonesia
              </p>
            </div>
            <button
              disabled={!audio.enabled}
              onClick={() => audioStore.toggleVoice()}
              className={cn(
                "rounded-full px-4 py-1.5 font-display text-sm font-extrabold transition disabled:opacity-40",
                audio.voiceEnabled && audio.enabled
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {audio.voiceEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="rounded-2xl bg-secondary/30 p-3">
            <div className="flex justify-between font-display text-sm font-bold">
              <span>Volume Audio</span>
              <span>{Math.round(audio.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audio.volume}
              onChange={(e) => audioStore.setVolume(parseFloat(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          {/* Test Voice Button */}
          <button
            onClick={() => {
              if (!audio.enabled) audioStore.toggleMaster();
              setTesting(true);
              speakNorma(
                "Halo, Detektif Norma! Suaraku terdengar jelas, bukan? Ayo kita teruskan petualangan memecahkan kasus norma!",
                () => setTesting(false),
              );
            }}
            className="w-full rounded-2xl bg-gold px-4 py-2.5 font-display font-bold text-gold-foreground shadow-soft transition hover:brightness-105 active:scale-95"
          >
            {testing ? "🔊 Si Norma Sedang Berbicara..." : "🗣️ Tes Suara Si Norma"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GameShell({ children, hideBar }: { children: ReactNode; hideBar?: boolean }) {
  const p = useProgress();
  const activePath = p ? PATHS[p.path] : PATHS.bintang;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Decorative floating background elements */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-40"
        aria-hidden
      >
        <div className="absolute -left-12 top-20 h-32 w-64 rounded-full bg-sky/30 blur-2xl animate-float" />
        <div
          className="absolute -right-16 top-48 h-40 w-80 rounded-full bg-gold/25 blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-24 left-1/3 h-48 w-96 rounded-full bg-mint/30 blur-3xl animate-float"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      <div className="batik-ribbon" aria-hidden />

      {!hideBar && (
        <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-lg font-extrabold text-primary"
            >
              <Home className="size-5" /> NORMAKITA
            </Link>
            {p && (
              <Link
                to="/peta"
                className={cn(
                  "hidden items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-bold sm:inline-flex",
                  activePath.tagColor,
                )}
                title="Jalur Belajar TaRL"
              >
                <span>{activePath.icon}</span> {activePath.name}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <AudioControlModal />
            <Link
              to="/lencana"
              className="flex items-center gap-1.5 rounded-full bg-card px-4 py-1.5 font-display font-bold shadow-soft transition hover:scale-105"
              aria-label="Total bintang"
            >
              <Star className="size-5 fill-gold text-gold" /> {p ? totalStars(p) : "–"}
            </Link>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-5xl px-4 pb-16 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {children}
      </main>
    </div>
  );
}

const MASCOT = { ceria, berpikir, rayakan };

export function Mascot({
  mood,
  says,
  className,
  imgClass,
  side = "right",
}: {
  mood: keyof typeof MASCOT;
  says?: string;
  className?: string;
  imgClass?: string;
  side?: "left" | "right";
}) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPop();
    if (speaking) {
      stopVoice();
      setSpeaking(false);
    } else if (says) {
      setSpeaking(true);
      speakNorma(says, () => setSpeaking(false));
    }
  };

  return (
    <div className={cn("flex items-end gap-2", side === "left" && "flex-row-reverse", className)}>
      <img
        src={MASCOT[mood]}
        alt={`Si Norma ${mood}`}
        width={1024}
        height={1024}
        className={cn(
          "w-28 shrink-0 animate-float sm:w-36 transition-transform",
          imgClass,
          speaking && "scale-105",
        )}
      />
      {says && (
        <div className="relative mb-8 max-w-xs rounded-2xl border-2 border-primary/30 bg-card px-4 py-3 font-display text-base font-semibold leading-snug shadow-soft">
          <p className="pr-6">{says}</p>
          <button
            onClick={handleSpeak}
            className={cn(
              "absolute -top-3 -right-3 grid size-8 place-items-center rounded-full border-2 border-card bg-gold text-gold-foreground shadow-sm transition hover:scale-110",
              speaking && "animate-bounce bg-primary text-primary-foreground",
            )}
            title="Dengarkan Suara Si Norma"
            aria-label="Dengarkan Suara Si Norma"
          >
            <Volume2 className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function Stars({
  count,
  max = 4,
  size = "size-6",
}: {
  count: number;
  max?: number;
  size?: string;
}) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} dari ${max} bintang`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(size, i < count ? "fill-gold text-gold animate-pop" : "text-border")}
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function LockBadge() {
  return (
    <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-muted-foreground text-card">
      <Lock className="size-4" />
    </span>
  );
}

const CONFETTI_COLORS = [
  "bg-gold",
  "bg-pos-agama",
  "bg-pos-susila",
  "bg-pos-sopan",
  "bg-pos-hukum",
  "bg-primary",
];

export function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute top-0 h-3 w-2 rounded-sm animate-confetti",
            CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          )}
          style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 10) * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export function StepDots({ step }: { step: 1 | 2 | 3 | 4 }) {
  const labels = ["Kasus", "Tindakan", "Alasan", "Hasil"];
  return (
    <ol className="mb-5 flex justify-center gap-2 text-xs font-bold sm:text-sm">
      {labels.map((l, i) => (
        <li
          key={l}
          className={cn(
            "rounded-full px-3 py-1 transition-all",
            i + 1 === step
              ? "bg-primary text-primary-foreground shadow-sm scale-105"
              : i + 1 < step
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground",
          )}
        >
          {i + 1}. {l}
        </li>
      ))}
    </ol>
  );
}

export function HowToPlayContent() {
  return (
    <div className="grid gap-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="rounded-2xl bg-secondary/60 p-4">
        <h4 className="font-display font-extrabold text-primary text-base">
          Alur Petualangan Detektif
        </h4>
        <ol className="mt-2 grid gap-2.5 text-sm">
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-primary">1.</span>
            <span>
              <b>Baca Kasus:</b> Amati gambar dan cerita nyata di lingkungan sekolah & Surakarta.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-primary">2.</span>
            <span>
              <b>Pilih Tindakan (A, B, C, D):</b> Tentukan tindakan yang paling adil dan bertanggung
              jawab. Urutan pilihan selalu diacak secara seimbang!
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-primary">3.</span>
            <span>
              <b>Analisis Alasan:</b> Pilih alasan yang sesuai dengan prinsip norma dan tuliskan
              penjelasanmu.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-primary">4.</span>
            <span>
              <b>Pelajari Akibat & Bintang:</b> Lihat konsekuensi nyata dari tindakanmu.
            </span>
          </li>
        </ol>
      </div>

      <div className="rounded-2xl bg-gold/20 p-4">
        <h4 className="font-display font-extrabold text-gold-foreground text-base">
          Aturan Perolehan Bintang (Maks. 4⭐)
        </h4>
        <ul className="mt-2 space-y-1.5 text-sm font-semibold">
          <li>
            ⭐ <b>+1 Bintang:</b> Memilih tindakan yang tepat dan sesuai norma.
          </li>
          <li>
            ⭐⭐ <b>+2 Bintang:</b> Memilih alasan yang jelas dan sesuai prinsip norma.
          </li>
          <li>
            ⭐ <b>+1 Bintang:</b> Menjelaskan akibat tindakan atau merumuskan perbaikan bertanggung
            jawab.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl bg-card border-2 border-border p-4">
        <h4 className="font-display font-extrabold text-brown text-base">
          Jalur Belajar Berdiferensiasi (TaRL)
        </h4>
        <div className="mt-2 space-y-2 text-xs sm:text-sm">
          <div className="rounded-xl bg-gold/15 p-2.5">
            <p className="font-bold text-gold-foreground">
              ⭐ Kelompok Bintang (Misi Mengenali Norma)
            </p>
            <p className="text-muted-foreground">
              Dilengkapi petunjuk penuntun Si Norma dan visual konkret untuk membantu mengenali
              jenis norma.
            </p>
          </div>
          <div className="rounded-xl bg-sky/20 p-2.5">
            <p className="font-bold text-sky-900">
              🌙 Kelompok Bulan (Misi Memahami & Menerapkan Norma)
            </p>
            <p className="text-muted-foreground">
              Mengasah penalaran tentang alasan di balik norma dan analisis akibat dari tindakan
              sehari-hari.
            </p>
          </div>
          <div className="rounded-xl bg-orange-100 p-2.5">
            <p className="font-bold text-orange-950">
              ☀️ Kelompok Matahari (Misi Menganalisis & Menyelesaikan Kasus)
            </p>
            <p className="text-muted-foreground">
              Menghadapi kasus multi-pihak yang kompleks dan menyusun solusi yang bertanggung jawab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
