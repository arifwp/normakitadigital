import kantin from "@/assets/kasus-kantin.jpg";
import kantinHasil from "@/assets/hasil-kantin.jpg";
import ibadah from "@/assets/kasus-ibadah.jpg";
import pasar from "@/assets/kasus-pasar.jpg";
import lalulintas from "@/assets/kasus-lalulintas.jpg";

export type ActionOption = {
  id: string;
  emoji: string;
  label: string;
  correct: boolean;
  consequence: string;
};

export type ReasonOption = {
  id: string;
  label: string;
  /** true = alasan jelas dan sesuai prinsip norma */
  good: boolean;
  feedback: string;
};

export type NormCase = {
  key?: string;
  hint?: string;
  challenge?: string;
  scene?: string;
  id: number;
  pos: string;
  norma: string;
  color: "agama" | "susila" | "sopan" | "hukum";
  icon: "hand-heart" | "heart" | "smile" | "scale";
  place: string;
  title: string;
  image: string;
  goodImage: string;
  question: string;
  actions: ActionOption[];
  reasons: ReasonOption[];
  /** kata kunci prinsip norma untuk jawaban tertulis */
  principleKeywords: string[];
  normExplanation: string;
  badge: { name: string; emoji: string };
};

export const CASES: NormCase[] = [
  {
    id: 1,
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Ruang kelas",
    title: "Teman yang Sedang Beribadah",
    image: ibadah,
    goodImage: ibadah,
    question:
      "Saat istirahat, Aisyah sedang salat di sudut kelas. Beberapa teman bercanda dengan suara keras di dekatnya. Apa yang perlu dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🤫",
        label: "Mengajak teman bicara pelan atau pindah tempat agar Aisyah tenang beribadah.",
        correct: true,
        consequence:
          "Aisyah bisa beribadah dengan khusyuk. Teman-teman tetap bisa bermain tanpa mengganggu.",
      },
      {
        id: "b",
        emoji: "📢",
        label: "Ikut bercanda lebih keras karena sedang jam istirahat.",
        correct: false,
        consequence: "Aisyah terganggu dan sulit berkonsentrasi. Ia merasa tidak dihargai.",
      },
      {
        id: "c",
        emoji: "🙈",
        label: "Diam saja, itu bukan urusanku.",
        correct: false,
        consequence: "Suara keras terus berlanjut dan ibadah Aisyah tetap terganggu.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label: "Karena setiap orang berhak beribadah dengan tenang sesuai keyakinannya.",
        good: true,
        feedback: "Alasanmu jelas. Kamu menghormati keyakinan teman!",
      },
      {
        id: "r2",
        label: "Karena jam istirahat adalah waktu bebas untuk ribut.",
        good: false,
        feedback: "Coba pikirkan lagi, apakah bebas berarti boleh mengganggu orang lain?",
      },
      {
        id: "r3",
        label: "Karena ibadah teman tidak ada hubungannya denganku.",
        good: false,
        feedback: "Bagaimana perasaanmu jika ibadahmu diganggu?",
      },
    ],
    principleKeywords: ["hormat", "menghargai", "tenang", "khusyuk", "keyakinan", "ibadah", "ganggu"],
    normExplanation:
      "Norma agama mengajarkan kita beribadah dan menghormati orang lain yang menjalankan ibadah sesuai keyakinannya.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },
  {
    id: 2,
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Pasar tradisional",
    title: "Dompet di Pasar",
    image: pasar,
    goodImage: pasar,
    question:
      "Saat menemani ibu ke pasar, Bayu menemukan dompet di jalan. Di dekatnya, seorang nenek tampak sedang mencari sesuatu di tasnya. Apa yang sebaiknya Bayu lakukan?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label: "Bertanya kepada nenek apakah dompet itu miliknya, lalu mengembalikannya.",
        correct: true,
        consequence:
          "Nenek lega dompetnya kembali. Bayu merasa senang karena sudah berbuat jujur.",
      },
      {
        id: "b",
        emoji: "💰",
        label: "Menyimpan dompet itu untuk diri sendiri.",
        correct: false,
        consequence: "Nenek kehilangan uang belanjanya dan sedih. Hati Bayu pun tidak tenang.",
      },
      {
        id: "c",
        emoji: "🚶",
        label: "Membiarkan dompet di jalan dan pergi.",
        correct: false,
        consequence: "Dompet bisa diambil orang lain dan nenek tetap kebingungan.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label: "Karena jujur itu benar menurut hati nurani, dan barang orang lain bukan milik kita.",
        good: true,
        feedback: "Alasanmu jelas. Kamu mendengarkan hati nuranimu!",
      },
      {
        id: "r2",
        label: "Karena tidak ada yang melihat, jadi boleh diambil.",
        good: false,
        feedback: "Coba pikirkan lagi, apakah sesuatu jadi benar hanya karena tidak ada yang melihat?",
      },
      {
        id: "r3",
        label: "Karena repot kalau harus mencari pemiliknya.",
        good: false,
        feedback: "Bagaimana perasaan pemilik dompet jika tidak ada yang mau menolong?",
      },
    ],
    principleKeywords: ["jujur", "hati nurani", "milik", "kembali", "menolong", "kasihan", "benar"],
    normExplanation:
      "Norma kesusilaan berasal dari hati nurani. Jujur dan peduli membuat kita dipercaya orang lain.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },
  {
    id: 3,
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Kantin sekolah",
    title: "Antrean di Kantin",
    image: kantin,
    goodImage: kantinHasil,
    question:
      "Seorang murid menyela antrean kantin dan berdiri di depan teman-temannya. Menurutmu, apa yang perlu dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🙋",
        label: "Mengingatkan dengan sopan agar ia kembali ke belakang antrean.",
        correct: true,
        consequence:
          "Antrean menjadi lebih tertib ketika semua murid menghargai giliran. Mengingatkan teman dengan sopan membantu menjaga kenyamanan bersama.",
      },
      {
        id: "b",
        emoji: "🏃",
        label: "Ikut menyela supaya cepat mendapat makanan.",
        correct: false,
        consequence: "Antrean menjadi kacau dan berdesakan. Banyak teman merasa kesal.",
      },
      {
        id: "c",
        emoji: "😶",
        label: "Membiarkannya meskipun teman lain dirugikan.",
        correct: false,
        consequence:
          "Teman yang sudah lama menunggu jadi dirugikan, dan kebiasaan menyela bisa terulang.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label: "Karena setiap orang perlu menghargai giliran orang lain.",
        good: true,
        feedback: "Alasanmu jelas. Kamu sudah memikirkan perasaan teman!",
      },
      {
        id: "r2",
        label: "Karena saya ingin mendapatkan makanan lebih cepat daripada teman lain.",
        good: false,
        feedback: "Coba pikirkan lagi, apakah tindakan itu adil bagi semua orang?",
      },
      {
        id: "r3",
        label: "Karena membiarkan masalah akan membuat semua orang selalu tertib.",
        good: false,
        feedback: "Apa akibatnya jika semua murid menyela antrean?",
      },
    ],
    principleKeywords: ["giliran", "adil", "tertib", "antre", "sopan", "menghargai", "sabar"],
    normExplanation:
      "Norma kesopanan mengatur cara kita bersikap baik kepada orang lain, seperti antre dan berbicara dengan santun.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },
  {
    id: 4,
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "Jalan menuju sekolah",
    title: "Lampu Merah Penyeberangan",
    image: lalulintas,
    goodImage: lalulintas,
    question:
      "Lampu penyeberangan masih merah, tetapi Dimas ingin langsung berlari menyeberang karena takut terlambat. Apa yang sebaiknya dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🚦",
        label: "Menahan Dimas dan menunggu lampu hijau bersama-sama.",
        correct: true,
        consequence: "Semua murid menyeberang dengan selamat saat lampu hijau menyala.",
      },
      {
        id: "b",
        emoji: "💨",
        label: "Ikut berlari menyeberang karena jalan terlihat sepi.",
        correct: false,
        consequence: "Motor yang melaju harus mengerem mendadak. Kalian hampir celaka!",
      },
      {
        id: "c",
        emoji: "🤷",
        label: "Membiarkan Dimas menyeberang sendiri.",
        correct: false,
        consequence: "Dimas dalam bahaya dan bisa tertabrak kendaraan.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label: "Karena aturan lalu lintas dibuat untuk menjaga keselamatan semua orang.",
        good: true,
        feedback: "Alasanmu jelas. Kamu paham aturan melindungi kita!",
      },
      {
        id: "r2",
        label: "Karena aturan hanya perlu dipatuhi kalau ada polisi.",
        good: false,
        feedback: "Coba pikirkan lagi, apakah bahaya hilang saat tidak ada polisi?",
      },
      {
        id: "r3",
        label: "Karena terlambat sekolah lebih buruk daripada melanggar aturan.",
        good: false,
        feedback: "Mana yang lebih penting: datang cepat atau datang dengan selamat?",
      },
    ],
    principleKeywords: ["aturan", "selamat", "keselamatan", "bahaya", "lampu", "tertabrak", "hukum"],
    normExplanation:
      "Norma hukum adalah aturan tertulis dari pemerintah. Ada sanksi bagi yang melanggar, dan tujuannya melindungi semua orang.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
];

export function getCase(id: number | string) {
  return CASES.find((c) => c.id === Number(id));
}
