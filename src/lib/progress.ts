import { useEffect, useState, useSyncExternalStore } from "react";
import { CASES, type NormCase } from "./cases";
import { BADGE_MIN_STARS, type ScoreResult } from "./scoring";
import { balancedOrder, type Evidence, type LearningPath } from "./learning";
import { findQuestion, selectQuestion } from "./question-bank";

export type CaseResult = {
  questionKey?: string;
  actionId: string;
  reasonId: string;
  text: string;
  score: ScoreResult;
  bestStars: number;
  path?: LearningPath;
  timestamp?: number;
};

export type Draft = {
  questionKey?: string;
  actionId?: string;
  reasonId?: string;
  text?: string;
  normId?: string;
  shuffledActionIds?: string[];
  shuffledReasonIds?: string[];
  actionSlot?: number;
  path?: LearningPath;
};

export type Reflections = {
  learned: string;
  reasonImportance: string;
  dailyLife: string;
};

export type Progress = {
  results: Record<number, CaseResult>;
  drafts: Record<number, Draft>;
  activeQuestions: Record<number, string>;
  path: LearningPath;
  diagnosticDone: boolean;
  diagnosticScore: number;
  diagnosticAnswers: boolean[];
  reflections: Reflections;
  reflection: string; // compatibility
  finalEvaluations: Record<string, number>;
  history: Evidence[];
  actionSlotsUsed: number[];
  demo: boolean;
};

const KEY = "normakita-progress-v2";

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
      1: {
        questionKey: "1-0",
        actionId: "a",
        reasonId: "r1",
        text: "",
        score: demoScore(1, 2, 1),
        bestStars: 4,
        path: "bintang",
      },
      2: {
        questionKey: "2-0",
        actionId: "a",
        reasonId: "r1",
        text: "",
        score: demoScore(1, 2, 0),
        bestStars: 3,
        path: "bintang",
      },
    },
    drafts: {},
    activeQuestions: { 1: "1-0", 2: "2-0", 3: "3-0", 4: "4-0" },
    path: "bintang",
    diagnosticDone: true,
    diagnosticScore: 6,
    diagnosticAnswers: [true, true, true, true, true, true, false, false],
    reflections: {
      learned: "Saya belajar bahwa norma menjaga ketertiban dan kedamaian di mana saja.",
      reasonImportance:
        "Alasan penting agar kita berbuat baik dari hati nurani, bukan karena terpaksa.",
      dailyLife: "Saya akan selalu mengantre dengan tertib dan menghormati ibadah teman.",
    },
    reflection: "Saya belajar bahwa norma menjaga ketertiban dan kedamaian di mana saja.",
    finalEvaluations: {},
    history: [],
    actionSlotsUsed: [0, 1],
    demo: true,
  };
}

export function emptyProgress(): Progress {
  return {
    results: {},
    drafts: {},
    activeQuestions: {},
    path: "bintang",
    diagnosticDone: false,
    diagnosticScore: 0,
    diagnosticAnswers: [],
    reflections: { learned: "", reasonImportance: "", dailyLife: "" },
    reflection: "",
    finalEvaluations: {},
    history: [],
    actionSlotsUsed: [],
    demo: false,
  };
}

let state: Progress = demoProgress();
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      state = { ...emptyProgress(), ...JSON.parse(raw) };
    }
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
  setPath(path: LearningPath) {
    save({ ...state, path });
  },
  setDiagnostic(answers: boolean[], score: number, recommendedPath: LearningPath) {
    save({
      ...state,
      diagnosticDone: true,
      diagnosticScore: score,
      diagnosticAnswers: answers,
      path: recommendedPath,
    });
  },
  setDraft(id: number, d: Partial<Draft>) {
    save({
      ...state,
      drafts: {
        ...state.drafts,
        [id]: { ...state.drafts[id], ...d },
      },
    });
  },
  setActiveQuestion(id: number, key: string) {
    save({
      ...state,
      activeQuestions: { ...state.activeQuestions, [id]: key },
      drafts: {
        ...state.drafts,
        [id]: { ...state.drafts[id], questionKey: key },
      },
    });
  },
  resetQuestion(id: number) {
    const currentKey = state.drafts[id]?.questionKey || state.activeQuestions[id] || `${id}-0`;
    const newCase = selectQuestion(id, currentKey);
    const newKey = newCase.key ?? `${id}-0`;

    // Calculate balanced slot for new question
    const balancedActions = balancedOrder(newCase.actions, state.actionSlotsUsed);
    const actionSlot = balancedActions.findIndex((a) => a.correct);
    const shuffledActionIds = balancedActions.map((a) => a.id);
    const shuffledReasonIds = balancedOrder(newCase.reasons, []).map((r) => r.id);

    const nextSlots =
      actionSlot >= 0 ? [...state.actionSlotsUsed, actionSlot] : state.actionSlotsUsed;

    save({
      ...state,
      activeQuestions: { ...state.activeQuestions, [id]: newKey },
      actionSlotsUsed: nextSlots,
      drafts: {
        ...state.drafts,
        [id]: {
          questionKey: newKey,
          actionId: undefined,
          reasonId: undefined,
          text: "",
          normId: undefined,
          shuffledActionIds,
          shuffledReasonIds,
          actionSlot,
          path: state.path,
        },
      },
    });
    return newCase;
  },
  submit(id: number, r: Omit<CaseResult, "bestStars">) {
    const prev = state.results[id]?.bestStars ?? 0;
    const caseKey =
      r.questionKey || state.drafts[id]?.questionKey || state.activeQuestions[id] || `${id}-0`;
    const newBest = Math.max(prev, r.score.total);

    const c = findQuestion(caseKey) || CASES[id - 1]!;
    const actionCorrect = !!c.actions.find((a) => a.id === r.actionId)?.correct;
    const reasonCorrect = !!c.reasons.find((re) => re.id === r.reasonId)?.good;

    const evidence: Evidence = {
      questionKey: caseKey,
      actionCorrect,
      reasonCorrect,
      normCorrect: actionCorrect,
      reviewed: !!r.score.pendingReview,
      consequence: r.score.extraStar === 1,
      path: state.path,
    };

    save({
      ...state,
      history: [...state.history, evidence],
      results: {
        ...state.results,
        [id]: {
          ...r,
          questionKey: caseKey,
          path: state.path,
          bestStars: newBest,
          timestamp: Date.now(),
        },
      },
    });
  },
  setReflections(reflections: Partial<Reflections>) {
    save({
      ...state,
      reflections: { ...state.reflections, ...reflections },
      reflection: reflections.learned ?? state.reflection,
    });
  },
  setReflection(text: string) {
    save({
      ...state,
      reflection: text,
      reflections: { ...state.reflections, learned: text },
    });
  },
  setFinalEvaluation(id: string, optionIndex: number) {
    save({
      ...state,
      finalEvaluations: { ...state.finalEvaluations, [id]: optionIndex },
    });
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

/** Ambil kasus aktif untuk suatu pos berdasarkan progres saat ini */
export function getActiveCase(posId: number | string, p: Progress): NormCase {
  const id = Number(posId);
  const key = p.drafts[id]?.questionKey || p.activeQuestions[id] || p.results[id]?.questionKey;
  if (key) {
    const found = findQuestion(key);
    if (found) return found;
  }
  return CASES.find((c) => c.id === id) || CASES[0]!;
}

/** Ambil atau inisialisasi urutan tindakan acak yang seimbang (A, B, C, D) */
export function getOrInitActionOrder(posId: number, c: NormCase, p: Progress): string[] {
  const existing = p.drafts[posId]?.shuffledActionIds;
  if (
    existing &&
    existing.length === c.actions.length &&
    c.actions.every((a) => existing.includes(a.id))
  ) {
    return existing;
  }
  const ordered = balancedOrder(c.actions, p.actionSlotsUsed);
  const slot = ordered.findIndex((a) => a.correct);
  const ids = ordered.map((a) => a.id);
  progressStore.setDraft(posId, {
    shuffledActionIds: ids,
    actionSlot: slot >= 0 ? slot : 0,
    questionKey: c.key ?? `${posId}-0`,
  });
  return ids;
}

/** Ambil atau inisialisasi urutan alasan acak yang seimbang */
export function getOrInitReasonOrder(posId: number, c: NormCase, p: Progress): string[] {
  const existing = p.drafts[posId]?.shuffledReasonIds;
  if (
    existing &&
    existing.length === c.reasons.length &&
    c.reasons.every((r) => existing.includes(r.id))
  ) {
    return existing;
  }
  const ordered = balancedOrder(c.reasons, []);
  const ids = ordered.map((r) => r.id);
  progressStore.setDraft(posId, { shuffledReasonIds: ids });
  return ids;
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
