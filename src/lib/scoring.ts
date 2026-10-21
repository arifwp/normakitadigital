import type { NormCase } from "./cases";

export const MAX_STARS = 4;
/** Bintang minimal agar lencana pos terbuka */
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
];

export type ScoreResult = {
  actionStar: 0 | 1;
  reasonStars: 0 | 2;
  extraStar: 0 | 1;
  total: number;
  /** jawaban tertulis ada tetapi belum bisa dinilai dengan yakin */
  needsClarify: boolean;
  feedback: string[];
};

function hasAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function scoreCase(
  c: NormCase,
  actionId: string,
  reasonId: string | null,
  writtenText = "",
): ScoreResult {
  const action = c.actions.find((a) => a.id === actionId);
  const reason = c.reasons.find((r) => r.id === reasonId);
  const text = writtenText.trim().toLowerCase();
  const feedback: string[] = [];

  const actionStar: 0 | 1 = action?.correct ? 1 : 0;
  feedback.push(
    actionStar ? "Pilihanmu tepat!" : "Coba pikirkan lagi, apakah tindakan itu adil bagi semua orang?",
  );

  const textHasPrinciple = text.length >= 10 && hasAny(text, c.principleKeywords);
  const reasonGood = !!reason?.good || textHasPrinciple;
  const reasonStars: 0 | 2 = reasonGood ? 2 : 0;
  if (reason) feedback.push(reason.good ? reason.feedback : textHasPrinciple ? "Penjelasanmu sudah menyebut prinsip norma. Bagus!" : reason.feedback);

  const extraStar: 0 | 1 =
    text.length >= 15 && hasAny(text, CONSEQUENCE_WORDS) && hasAny(text, c.principleKeywords) ? 1 : 0;
  if (extraStar) feedback.push("Kamu juga menjelaskan akibat atau cara memperbaikinya. Keren!");

  const needsClarify = text.length > 0 && !textHasPrinciple && !extraStar;

  return {
    actionStar,
    reasonStars,
    extraStar,
    total: actionStar + reasonStars + extraStar,
    needsClarify,
    feedback,
  };
}
