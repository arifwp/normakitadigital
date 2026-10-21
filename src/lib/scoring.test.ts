import { describe, expect, it } from "vitest";
import { getCase } from "./cases";
import { scoreCase } from "./scoring";
import { demoProgress, posStatuses, badgeUnlocked, emptyProgress } from "./progress";

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
