import { useEffect, useState, useSyncExternalStore } from "react";
import { CASES } from "./cases";
import { BADGE_MIN_STARS, type ScoreResult } from "./scoring";

export type CaseResult = {
  actionId: string;
  reasonId: string;
  text: string;
  score: ScoreResult;
  bestStars: number;
};

export type Draft = { actionId?: string; reasonId?: string; text?: string };

export type Progress = {
  results: Record<number, CaseResult>;
  drafts: Record<number, Draft>;
  reflection: string;
  demo: boolean;
};

const KEY = "normakita-progress-v1";

const demoScore = (a: 0 | 1, r: 0 | 2, e: 0 | 1): ScoreResult => ({
  actionStar: a,
  reasonStars: r,
  extraStar: e,
  total: a + r + e,
  needsClarify: false,
  feedback: [],
});

/** Data demonstrasi: dua pos pertama sudah selesai */
export function demoProgress(): Progress {
  return {
    results: {
      1: { actionId: "a", reasonId: "r1", text: "", score: demoScore(1, 2, 1), bestStars: 4 },
      2: { actionId: "a", reasonId: "r1", text: "", score: demoScore(1, 2, 0), bestStars: 3 },
    },
    drafts: {},
    reflection: "",
    demo: true,
  };
}

export function emptyProgress(): Progress {
  return { results: {}, drafts: {}, reflection: "", demo: false };
}

let state: Progress = demoProgress();
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...emptyProgress(), ...JSON.parse(raw) };
  } catch {
    /* abaikan */
  }
}

function save(next: Progress) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* abaikan */
  }
  listeners.forEach((l) => l());
}

export const progressStore = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  setDraft(id: number, d: Draft) {
    save({ ...state, drafts: { ...state.drafts, [id]: { ...state.drafts[id], ...d } } });
  },
  submit(id: number, r: Omit<CaseResult, "bestStars">) {
    const prev = state.results[id]?.bestStars ?? 0;
    save({
      ...state,
      results: { ...state.results, [id]: { ...r, bestStars: Math.max(prev, r.score.total) } },
    });
  },
  setReflection(text: string) {
    save({ ...state, reflection: text });
  },
  reset() {
    save(emptyProgress());
  },
  loadDemo() {
    save(demoProgress());
  },
};

/** Status pos: terkunci, aktif, atau selesai */
export type PosStatus = "locked" | "active" | "done";

export function posStatuses(p: Progress): Record<number, PosStatus> {
  const out: Record<number, PosStatus> = {};
  let activeSet = false;
  CASES.forEach((c, i) => {
    const prevDone = i === 0 || !!p.results[CASES[i - 1]!.id];
    if (p.results[c.id]) out[c.id] = "done";
    else if (prevDone && !activeSet) {
      out[c.id] = "active";
      activeSet = true;
    } else out[c.id] = "locked";
  });
  return out;
}

export function totalStars(p: Progress) {
  return Object.values(p.results).reduce((s, r) => s + r.bestStars, 0);
}

export function badgeUnlocked(p: Progress, id: number) {
  return (p.results[id]?.bestStars ?? 0) >= BADGE_MIN_STARS;
}

/** Hook aman SSR: mengembalikan null sebelum progres lokal dimuat */
export function useProgress(): Progress | null {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    load();
    setReady(true);
    listeners.forEach((l) => l());
  }, []);
  const snap = useSyncExternalStore(progressStore.subscribe, progressStore.get, progressStore.get);
  return ready ? snap : null;
}
