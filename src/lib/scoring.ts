import type { NormCase } from "./cases";

export const MAX_STARS = 4;
export const BADGE_MIN_STARS = 3;

const CONSEQUENCE_WORDS = [
  "akibat",
  "supaya",
  "agar",
  "sehingga",
  "nanti",
  "jika",
  "kalau",
  "membuat",
  "jadi",
  "minta maaf",
  "sebaiknya",
  "seharusnya",
  "karena",
  "dampak",
];

export type TeacherReview = { reason: boolean; consequence: boolean; note: string };

export type ScoreResult = {
  actionStar: 0 | 1;
  reasonStars: 0 | 2;
  extraStar: 0 | 1;
  total: number;
  needsClarify: boolean;
  feedback: string[];
  pendingReview?: boolean;
};

function hasAny(text: string, words: string[]) {
  return words.some((w) => text.toLowerCase().includes(w.toLowerCase()));
}

export function scoreCase(
  c: NormCase,
  actionId: string,
  reasonId: string | null,
  writtenText = "",
  review?: TeacherReview,
): ScoreResult {
  const action = c.actions.find((a) => a.id === actionId);
  const reason = c.reasons.find((r) => r.id === reasonId);
  const text = writtenText.trim().toLowerCase();
  const feedback: string[] = [];

  const actionStar: 0 | 1 = action?.correct ? 1 : 0;
  feedback.push(
    actionStar
      ? "Pilihanmu tepat!"
      : "Coba bandingkan lagi: siapa yang dirugikan oleh pilihan ini?",
  );

  const textHasPrinciple = text.length >= 8 && hasAny(text, c.principleKeywords || []);
  const reasonGood = !!reason?.good || textHasPrinciple || !!review?.reason;
  const reasonStars: 0 | 2 = reasonGood ? 2 : 0;
  if (reason) {
    feedback.push(
      reason.good
        ? reason.feedback
        : textHasPrinciple
          ? "Penjelasanmu sudah menghubungkan tindakan dengan prinsip norma. Bagus!"
          : reason.feedback,
    );
  }

  const textHasConsequence =
    text.length >= 12 && hasAny(text, CONSEQUENCE_WORDS) && (textHasPrinciple || text.length >= 20);
  const extraStar: 0 | 1 = textHasConsequence || review?.consequence ? 1 : 0;
  if (extraStar) {
    feedback.push("Kamu juga menjelaskan akibat atau cara memperbaikinya. Keren!");
  }

  const needsClarify = !review && text.length > 0 && !textHasPrinciple && !extraStar;
  const pendingReview = text.length > 0 && !review;

  if (pendingReview && !extraStar) {
    feedback.push("Tulisanmu tersimpan untuk ditinjau guru atau dapat diperjelas lagi.");
  }
  if (review?.note) {
    feedback.push(review.note);
  }

  return {
    actionStar,
    reasonStars,
    extraStar,
    total: (actionStar + reasonStars + extraStar) as number,
    needsClarify,
    pendingReview,
    feedback,
  };
}
