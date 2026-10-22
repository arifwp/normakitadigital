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
    key: "1-0",
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Ruang kelas sekolah",
    title: "Teman yang Sedang Beribadah",
    image: ibadah,
    goodImage: ibadah,
    scene: "🏫 🙏 🤫 🕊️",
    hint: "Amati Aisyah yang sedang beribadah. Pikirkan bagaimana kita bisa saling menghormati keyakinan teman.",
    challenge:
      "Bandingkan mengajak teman pindah dengan menegur keras. Solusi mana yang paling santun dan menjaga kerukunan?",
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
      {
        id: "d",
        emoji: "😠",
        label: "Memarahi teman dengan kasar di depan Aisyah.",
        correct: false,
        consequence: "Suasana kelas menjadi ribut dan keributan justru makin mengganggu Aisyah.",
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
        label: "Karena jam istirahat adalah waktu bebas untuk ribut sesuka hati.",
        good: false,
        feedback: "Coba pikirkan lagi, apakah bebas berarti boleh mengganggu orang lain?",
      },
      {
        id: "r3",
        label: "Karena ibadah teman tidak ada hubungannya denganku sama sekali.",
        good: false,
        feedback: "Bagaimana perasaanmu jika ibadahmu sendiri diganggu?",
      },
      {
        id: "r4",
        label: "Karena ingin dipuji sebagai murid yang paling berkuasa di kelas.",
        good: false,
        feedback: "Kebaikan dilakukan dengan tulus untuk menghargai sesama, bukan mencari pujian.",
      },
    ],
    principleKeywords: [
      "hormat",
      "menghargai",
      "tenang",
      "khusyuk",
      "keyakinan",
      "ibadah",
      "ganggu",
      "rukun",
    ],
    normExplanation:
      "Norma agama mengajarkan kita beribadah kepada Tuhan Yang Maha Esa dan menghormati orang lain yang menjalankan ibadah sesuai keyakinannya.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },
  {
    id: 2,
    key: "2-0",
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Pasar Gede Surakarta",
    title: "Dompet di Pasar",
    image: pasar,
    goodImage: pasar,
    scene: "🏪 👛 👵 💙",
    hint: "Ingat suara hati nuranimu. Barang yang bukan milik kita harus dikembalikan kepada pemiliknya.",
    challenge:
      "Bandingkan menitipkan ke pos petugas keamanan pasar dan mencari pemiliknya sendiri. Mana langkah paling aman dan bertanggung jawab?",
    question:
      "Saat menemani ibu ke Pasar Gede Surakarta, Bayu menemukan dompet di jalan. Di dekatnya, seorang nenek tampak sedang mencari sesuatu di tasnya. Apa yang sebaiknya Bayu lakukan?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label: "Bertanya kepada nenek apakah dompet itu miliknya, lalu mengembalikannya.",
        correct: true,
        consequence:
          "Nenek lega dompetnya kembali. Bayu merasa senang dan damai karena sudah berbuat jujur.",
      },
      {
        id: "b",
        emoji: "💰",
        label: "Menyimpan dompet itu untuk diri sendiri karena tidak ada yang melihat.",
        correct: false,
        consequence:
          "Nenek kehilangan uang belanjanya dan sedih. Hati Bayu pun tidak tenang dan gelisah.",
      },
      {
        id: "c",
        emoji: "🚶",
        label: "Membiarkan dompet tergeletak di jalan dan pura-pura tidak melihat.",
        correct: false,
        consequence:
          "Dompet bisa terinjak atau diambil orang yang berniat jahat, dan nenek tetap kebingungan.",
      },
      {
        id: "d",
        emoji: "📣",
        label: "Membuka isi dompet dan memamerkannya kepada orang-orang di pasar.",
        correct: false,
        consequence: "Privasi pemilik dompet terbuka dan berisiko menimbulkan keributan di pasar.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena jujur itu benar menurut hati nurani, dan barang orang lain bukan milik kita.",
        good: true,
        feedback: "Alasanmu jelas. Kamu mendengarkan hati nuranimu!",
      },
      {
        id: "r2",
        label: "Karena tidak ada yang melihat, jadi barang temuan boleh dimiliki sendiri.",
        good: false,
        feedback:
          "Coba pikirkan lagi, apakah sesuatu jadi benar hanya karena tidak ada orang yang melihat?",
      },
      {
        id: "r3",
        label: "Karena repot kalau harus mengurus barang orang lain.",
        good: false,
        feedback: "Bagaimana perasaan pemilik barang jika tidak ada yang mau peduli dan menolong?",
      },
      {
        id: "r4",
        label: "Karena orang yang kehilangan pasti ceroboh dan pantas kehilangan barang.",
        good: false,
        feedback:
          "Setiap orang bisa tertimpa musibah. Sikap susila mengajarkan kita untuk berempati.",
      },
    ],
    principleKeywords: [
      "jujur",
      "hati nurani",
      "milik",
      "kembali",
      "menolong",
      "kasihan",
      "benar",
      "empati",
    ],
    normExplanation:
      "Norma kesusilaan bersumber dari bisikan hati nurani manusia. Berbuat jujur, ikhlas, dan peduli membuat batin kita tenang dan dipercaya sesama.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },
  {
    id: 3,
    key: "3-0",
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Kantin sekolah",
    title: "Antrean di Kantin",
    image: kantin,
    goodImage: kantinHasil,
    scene: "🍱 🧑‍🤝‍🧑 🙋 🌼",
    hint: "Perhatikan hak orang lain yang sudah antre lebih dulu. Mengingatkan dengan santun adalah kunci kesopanan.",
    challenge:
      "Bagaimana cara menegur teman yang menyerobot tanpa mempermalukannya di depan orang banyak?",
    question:
      "Seorang murid menyela antrean kantin dan berdiri di depan teman-temannya. Menurutmu, apa yang perlu dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🙋",
        label: "Mengingatkan dengan sopan agar ia kembali ke belakang antrean sesuai urutan.",
        correct: true,
        consequence:
          "Antrean menjadi tertib dan adil. Mengingatkan dengan santun menjaga perasaan teman dan suasana kantin tetap nyaman.",
      },
      {
        id: "b",
        emoji: "🏃",
        label: "Ikut menyela antrean supaya cepat mendapat makanan juga.",
        correct: false,
        consequence:
          "Antrean menjadi kacau dan saling dorong. Banyak teman merasa kesal dan dirugikan.",
      },
      {
        id: "c",
        emoji: "😶",
        label: "Membiarkannya meskipun teman-teman yang sudah antre lama merasa kecewa.",
        correct: false,
        consequence:
          "Teman yang sudah disiplin merasa diperlakukan tidak adil, dan kebiasaan menyela bisa terulang terus.",
      },
      {
        id: "d",
        emoji: "😡",
        label: "Mendorongnya keluar dari antrean sambil membentak dengan keras.",
        correct: false,
        consequence:
          "Terjadi pertengkaran fisik di kantin dan suasana menjadi tegang serta menakutkan.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena setiap orang perlu menghargai giliran dan hak orang lain secara tertib dan adil.",
        good: true,
        feedback: "Alasanmu jelas. Kamu sudah memikirkan keadilan dan kenyamanan bersama!",
      },
      {
        id: "r2",
        label: "Karena saya ingin mendapatkan makanan lebih cepat daripada teman-teman lain.",
        good: false,
        feedback:
          "Coba pikirkan lagi, apakah tindakan mementingkan diri sendiri itu adil bagi teman yang lain?",
      },
      {
        id: "r3",
        label: "Karena membiarkan pelanggaran kecil tidak akan berdampak apa pun.",
        good: false,
        feedback: "Apa akibatnya jika semua murid berpikir boleh menyela antrean?",
      },
      {
        id: "r4",
        label: "Karena yang berbadan besar berhak mendapat posisi di depan.",
        good: false,
        feedback:
          "Dalam norma kesopanan, semua orang berkedudukan setara dan saling menghargai giliran.",
      },
    ],
    principleKeywords: [
      "giliran",
      "adil",
      "tertib",
      "antre",
      "sopan",
      "menghargai",
      "sabar",
      "santun",
    ],
    normExplanation:
      "Norma kesopanan mengatur tata krama, kesantunan, dan cara bersikap baik dalam masyarakat, seperti membudayakan antre dan berbicara dengan hormat.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },
  {
    id: 4,
    key: "4-0",
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "Jalan Slamet Riyadi dekat sekolah",
    title: "Lampu Merah Penyeberangan",
    image: lalulintas,
    goodImage: lalulintas,
    scene: "🚦 🚸 🚗 🛡️",
    hint: "Peraturan lalu lintas dibuat resmi untuk melindungi keselamatan jiwa semua pengguna jalan.",
    challenge:
      "Mengapa aturan hukum keselamatan tetap wajib dipatuhi sekalipun tidak ada petugas polisi yang menjaga?",
    question:
      "Lampu penyeberangan masih merah, tetapi Dimas ingin langsung berlari menyeberang karena takut terlambat masuk kelas. Apa yang sebaiknya dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🚦",
        label: "Menahan Dimas dan menunggu lampu hijau menyala bersama-sama.",
        correct: true,
        consequence:
          "Semua murid menyeberang dengan tertib dan selamat saat lampu hijau menyala untuk pejalan kaki.",
      },
      {
        id: "b",
        emoji: "💨",
        label: "Ikut berlari menyeberang karena jalan terlihat sepi sesaat.",
        correct: false,
        consequence:
          "Kendaraan yang melaju cepat harus mengerem mendadak. Kalian hampir celaka dan membahayakan pengendara lain!",
      },
      {
        id: "c",
        emoji: "🤷",
        label: "Membiarkan Dimas menyeberang sendiri saat lampu merah.",
        correct: false,
        consequence:
          "Dimas berada dalam bahaya besar tertabrak kendaraan dan melanggar peraturan keselamatan resmi.",
      },
      {
        id: "d",
        emoji: "🏃",
        label: "Menyuruh Dimas menyeberang lebih cepat agar tidak tertangkap guru piket.",
        correct: false,
        consequence:
          "Tindakan ini sangat berbahaya karena mementingkan rasa takut daripada keselamatan nyawa.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena aturan lalu lintas dibuat negara untuk menjamin keselamatan dan ketertiban semua orang.",
        good: true,
        feedback:
          "Alasanmu jelas. Kamu paham bahwa hukum dan aturan melindungi keselamatan kita semua!",
      },
      {
        id: "r2",
        label: "Karena aturan lalu lintas hanya perlu dipatuhi saat ada polisi yang berjaga.",
        good: false,
        feedback:
          "Coba pikirkan lagi, apakah bahaya kendaraan menghilang hanya karena tidak ada polisi?",
      },
      {
        id: "r3",
        label: "Karena takut terlambat sekolah lebih penting daripada keselamatan diri.",
        good: false,
        feedback: "Mana yang lebih utama: datang cepat atau sampai di sekolah dengan selamat?",
      },
      {
        id: "r4",
        label: "Karena pejalan kaki selalu kebal dari bahaya jalan raya.",
        good: false,
        feedback:
          "Pejalan kaki adalah pengguna jalan yang rentan dan wajib mematuhi rambu lalu lintas.",
      },
    ],
    principleKeywords: [
      "aturan",
      "selamat",
      "keselamatan",
      "bahaya",
      "lampu",
      "tertabrak",
      "hukum",
      "sanksi",
    ],
    normExplanation:
      "Norma hukum adalah peraturan resmi yang dibuat oleh pemerintah atau negara bersifat mengikat dan memiliki sanksi tegas demi menjaga keamanan dan ketertiban umum.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
];

export function getCase(id: number | string) {
  return CASES.find((c) => c.id === Number(id));
}
