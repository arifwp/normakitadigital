import { describe, expect, it } from "vitest";
import { getCase, CASES } from "./cases";
import { scoreCase } from "./scoring";
import {
  demoProgress,
  posStatuses,
  badgeUnlocked,
  emptyProgress,
  progressStore,
  totalStars,
  getOrInitActionOrder,
} from "./progress";
import { QUESTION_BANK, getQuestionsByPos, selectQuestion } from "./question-bank";
import {
  balancedOrder,
  recommendDiagnostic,
  recommendDevelopment,
  type Evidence,
} from "./learning";

const kantin = getCase(3)!;

describe("penilaian bintang", () => {
  it("tindakan tepat tanpa alasan yang baik hanya 1 bintang", () => {
    expect(scoreCase(kantin, "a", "r2").total).toBe(1);
  });

  it("tindakan tepat + alasan jelas = 3 bintang", () => {
    const s = scoreCase(kantin, "a", "r1");
    expect(s.reasonStars).toBe(2);
    expect(s.total).toBe(3);
  });

  it("menjelaskan akibat memberi bintang ke-4 (maksimal 4)", () => {
    const s = scoreCase(kantin, "a", "r1", "Agar semua dapat giliran yang adil dan tertib");
    expect(s.total).toBe(4);
  });

  it("tulisan tidak jelas tidak dianggap salah, tetapi diminta diperjelas", () => {
    const s = scoreCase(kantin, "a", "r1", "ya begitu");
    expect(s.needsClarify).toBe(true);
    expect(s.total).toBe(3);
  });

  it("anti-exploit: mengulang pos yang sama tidak menduplikasi total bintang", () => {
    const p = emptyProgress();
    // Pos 1 dapat 3 bintang
    p.results[1] = {
      actionId: "a",
      reasonId: "r1",
      text: "",
      score: {
        actionStar: 1,
        reasonStars: 2,
        extraStar: 0,
        total: 3,
        needsClarify: false,
        feedback: [],
      },
      bestStars: 3,
    };
    expect(totalStars(p)).toBe(3);

    // Mengulang dan dapat 3 bintang lagi di Pos 1
    p.results[1] = {
      actionId: "a",
      reasonId: "r1",
      text: "",
      score: {
        actionStar: 1,
        reasonStars: 2,
        extraStar: 0,
        total: 3,
        needsClarify: false,
        feedback: [],
      },
      bestStars: Math.max(3, 3),
    };
    // Total bintang tetap 3, bukan 6!
    expect(totalStars(p)).toBe(3);
  });
});

describe("bank soal dan variasi kasus (Bagian A & B)", () => {
  it("setiap pos memiliki minimal 5 variasi soal", () => {
    [1, 2, 3, 4].forEach((posId) => {
      const questions = getQuestionsByPos(posId);
      expect(questions.length).toBeGreaterThanOrEqual(5);
    });
  });

  it("setiap soal memiliki 4 pilihan tindakan (A, B, C, D) dengan tepat satu kunci benar", () => {
    QUESTION_BANK.forEach((q) => {
      expect(q.actions.length).toBe(4);
      const correctActions = q.actions.filter((a) => a.correct);
      expect(correctActions.length).toBe(1);

      expect(q.reasons.length).toBe(4);
      const goodReasons = q.reasons.filter((r) => r.good);
      expect(goodReasons.length).toBe(1);
    });
  });

  it("pengacakan pilihan menghasilkan posisi jawaban benar yang seimbang dan tidak merusak kunci jawaban", () => {
    const slotsUsed: number[] = [];
    const occurrences = [0, 0, 0, 0];

    // Simulasikan 12 soal berurutan
    for (let i = 0; i < 12; i++) {
      const ordered = balancedOrder(kantin.actions, slotsUsed);
      expect(ordered.length).toBe(4);

      // Kunci jawaban tetap 'a' yang correct: true
      const correctItem = ordered.find((item) => item.correct);
      expect(correctItem?.id).toBe("a");

      const slot = ordered.findIndex((item) => item.correct);
      expect(slot).toBeGreaterThanOrEqual(0);
      expect(slot).toBeLessThanOrEqual(3);

      slotsUsed.push(slot);
      occurrences[slot]++;
    }

    // Semua slot (0, 1, 2, 3) pernah terpakai secara seimbang
    occurrences.forEach((count) => {
      expect(count).toBeGreaterThan(0);
    });
  });

  it("pengacakan tidak berubah selama satu sesi pengerjaan (draft terjaga)", () => {
    const p = emptyProgress();
    const order1 = getOrInitActionOrder(3, kantin, p);
    expect(order1.length).toBe(4);

    // Panggil kedua kali dengan state p yang memegang draft
    p.drafts[3] = { shuffledActionIds: order1 };
    const order2 = getOrInitActionOrder(3, kantin, p);
    expect(order2).toEqual(order1);
  });
});

describe("sistem TaRL dan diagnostik (Bagian C & D)", () => {
  it("rekomendasi diagnostik sesuai dengan tingkat kesiapan murid", () => {
    // Skor < 4 -> Bintang
    expect(recommendDiagnostic([true, true, false, false, false, false, false, false])).toBe(
      "bintang",
    );
    // Skor 4-6 -> Bulan
    expect(recommendDiagnostic([true, true, true, true, true, false, false, false])).toBe("bulan");
    // Skor 7-8 -> Matahari
    expect(recommendDiagnostic([true, true, true, true, true, true, true, true])).toBe("matahari");
  });

  it("rekomendasi perkembangan jalur mendeteksi pemahaman konsisten", () => {
    const evidenceBintang: Evidence[] = [
      {
        questionKey: "1-1",
        actionCorrect: true,
        reasonCorrect: true,
        normCorrect: true,
        reviewed: false,
        consequence: true,
        path: "bintang",
      },
      {
        questionKey: "1-2",
        actionCorrect: true,
        reasonCorrect: true,
        normCorrect: true,
        reviewed: false,
        consequence: true,
        path: "bintang",
      },
      {
        questionKey: "1-3",
        actionCorrect: true,
        reasonCorrect: true,
        normCorrect: true,
        reviewed: false,
        consequence: true,
        path: "bintang",
      },
    ];
    // Murid di Bintang dengan 3 jawaban benar direkomendasikan naik ke Bulan
    expect(recommendDevelopment("bintang", evidenceBintang)).toBe("bulan");
  });
});

describe("progres", () => {
  it("awal permainan hanya pos 1 terbuka", () => {
    const st = posStatuses(emptyProgress());
    expect(st[1]).toBe("active");
    expect(st[2]).toBe("locked");
  });

  it("data demo: dua lencana terbuka, pos 3 aktif", () => {
    const p = demoProgress();
    expect([1, 2, 3, 4].filter((id) => badgeUnlocked(p, id))).toEqual([1, 2]);
    expect(posStatuses(p)[3]).toBe("active");
  });
});
