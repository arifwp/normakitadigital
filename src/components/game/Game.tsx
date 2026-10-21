import { Link } from "@tanstack/react-router";
import { HandHeart, Heart, Smile, Scale, Star, Home, Lock } from "lucide-react";
import type { ReactNode } from "react";
import ceria from "@/assets/norma-ceria.png";
import berpikir from "@/assets/norma-berpikir.png";
import rayakan from "@/assets/norma-rayakan.png";
import type { NormCase } from "@/lib/cases";
import { totalStars, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const POS_STYLE: Record<NormCase["color"], { bg: string; text: string; ring: string; soft: string }> = {
  agama: { bg: "bg-pos-agama", text: "text-pos-agama", ring: "ring-pos-agama", soft: "bg-pos-agama/15" },
  susila: { bg: "bg-pos-susila", text: "text-pos-susila", ring: "ring-pos-susila", soft: "bg-pos-susila/15" },
  sopan: { bg: "bg-pos-sopan", text: "text-pos-sopan", ring: "ring-pos-sopan", soft: "bg-pos-sopan/15" },
  hukum: { bg: "bg-pos-hukum", text: "text-pos-hukum", ring: "ring-pos-hukum", soft: "bg-pos-hukum/15" },
};

export function PosIcon({ icon, className }: { icon: NormCase["icon"]; className?: string }) {
  const I = { "hand-heart": HandHeart, heart: Heart, smile: Smile, scale: Scale }[icon];
  return <I className={className} strokeWidth={2.5} />;
}

export function GameShell({ children, hideBar }: { children: ReactNode; hideBar?: boolean }) {
  const p = useProgress();
  return (
    <div className="min-h-screen">
      <div className="batik-ribbon" aria-hidden />
      {!hideBar && (
        <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-primary">
            <Home className="size-5" /> NORMAKITA
          </Link>
          <Link
            to="/lencana"
            className="flex items-center gap-1.5 rounded-full bg-card px-4 py-1.5 font-display font-bold shadow-soft"
            aria-label="Total bintang"
          >
            <Star className="size-5 fill-gold text-gold" /> {p ? totalStars(p) : "–"}
          </Link>
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
  return (
    <div className={cn("flex items-end gap-2", side === "left" && "flex-row-reverse", className)}>
      <img
        src={MASCOT[mood]}
        alt={`Si Norma ${mood}`}
        width={1024}
        height={1024}
        className={cn("w-28 shrink-0 animate-float sm:w-36", imgClass)}
      />
      {says && (
        <div className="relative mb-10 max-w-xs rounded-2xl border-2 border-primary/30 bg-card px-4 py-3 font-display text-base font-semibold leading-snug shadow-soft">
          {says}
        </div>
      )}
    </div>
  );
}

export function Stars({ count, max = 4, size = "size-6" }: { count: number; max?: number; size?: string }) {
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

const CONFETTI_COLORS = ["bg-gold", "bg-pos-agama", "bg-pos-susila", "bg-pos-sopan", "bg-pos-hukum", "bg-primary"];

export function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className={cn("absolute top-0 h-3 w-2 rounded-sm animate-confetti", CONFETTI_COLORS[i % CONFETTI_COLORS.length])}
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
            "rounded-full px-3 py-1",
            i + 1 === step ? "bg-primary text-primary-foreground" : i + 1 < step ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {i + 1}. {l}
        </li>
      ))}
    </ol>
  );
}

export function HowToPlayContent() {
  const steps = [
    ["📖", "Baca kasus", "Amati gambar dan cerita di setiap pos."],
    ["👆", "Pilih tindakan", "Tentukan apa yang sebaiknya dilakukan."],
    ["💬", "Jelaskan alasan", "Pilih alasan dan tulis dengan kata-katamu sendiri."],
    ["⭐", "Kumpulkan bintang", "1 bintang untuk tindakan tepat, +2 untuk alasan jelas, +1 jika kamu menjelaskan akibatnya."],
  ];
  return (
    <ol className="grid gap-3">
      {steps.map(([e, t, d], i) => (
        <li key={t} className="flex items-start gap-3 rounded-2xl bg-secondary p-3">
          <span className="text-3xl">{e}</span>
          <div>
            <p className="font-display text-lg font-bold">
              {i + 1}. {t}
            </p>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
