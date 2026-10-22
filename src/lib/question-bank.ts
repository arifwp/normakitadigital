import { CASES, type NormCase } from "./cases";
import { balancedOrder, type LearningPath } from "./learning";

import ibadah from "@/assets/kasus-ibadah.jpg";
import pasar from "@/assets/kasus-pasar.jpg";
import kantin from "@/assets/kasus-kantin.jpg";
import kantinHasil from "@/assets/hasil-kantin.jpg";
import lalulintas from "@/assets/kasus-lalulintas.jpg";

export const ADDITIONAL_CASES: NormCase[] = [
  // POS 1: NORMA AGAMA
  {
    id: 1,
    key: "1-1",
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Balai Warga Surakarta",
    title: "Latihan Musik di Balai Warga",
    image: ibadah,
    goodImage: ibadah,
    scene: "🏘️ 🎵 🤫 🕊️",
    hint: "Amati warga yang sedang khusyuk beribadah. Musik keras bisa mengecilkan kekhusyukan mereka.",
    challenge:
      "Bandingkan menunda latihan sebentar atau memindahkan latihan ke ruang tertutup. Rumuskan solusi yang menghormati kedua belah pihak.",
    question:
      "Beberapa warga sedang beribadah di ruang samping Balai Warga. Kelompok musikmu dijadwalkan berlatih alat musik bernada keras. Apa tindakan yang menghormati ibadah warga?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label: "Mengecilkan volume musik atau menunda latihan sebentar hingga ibadah selesai.",
        correct: true,
        consequence:
          "Warga dapat beribadah dengan tenang, dan kelompok musik tetap dapat berlatih setelahnya dengan penuh kerukunan.",
      },
      {
        id: "b",
        emoji: "📢",
        label:
          "Tetap memainkan musik dengan keras karena jadwal latihan sudah dibuat terlebih dahulu.",
        correct: false,
        consequence: "Ibadah warga menjadi sangat terganggu dan memicu rasa kecewa antarwarga.",
      },
      {
        id: "c",
        emoji: "🏃",
        label: "Meninggalkan tempat latihan tanpa berpamitan dan membiarkan alat musik berserakan.",
        correct: false,
        consequence: "Masalah jadwal tidak selesai dan alat musik bisa rusak.",
      },
      {
        id: "d",
        emoji: "😠",
        label: "Menuntut warga untuk pindah tempat ibadah ke lokasi lain yang jauh.",
        correct: false,
        consequence:
          "Sikap tidak toleran ini melanggar norma agama dan merusak kerukunan bermasyarakat.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena setiap orang berhak menjalankan ibadah agamanya dengan rasa tenang dan dihormati sesama.",
        good: true,
        feedback: "Alasanmu sangat tepat! Toleransi beragama menjaga ketenteraman bersama.",
      },
      {
        id: "r2",
        label: "Karena jadwal kelompok musik lebih penting daripada kegiatan orang lain.",
        good: false,
        feedback:
          "Apakah mendahulukan kepentingan kelompok sendiri tanpa peduli sesama mencerminkan norma agama?",
      },
      {
        id: "r3",
        label: "Karena orang yang beribadah seharusnya tahan terhadap suara berisik apa pun.",
        good: false,
        feedback:
          "Norma agama mengajarkan kita untuk saling berempati dan tidak sengaja mengganggu ibadah orang lain.",
      },
      {
        id: "r4",
        label: "Karena balai warga adalah milik kelompok kami seutuhnya.",
        good: false,
        feedback:
          "Fasilitas umum adalah milik bersama yang harus digunakan dengan saling menghargai.",
      },
    ],
    principleKeywords: [
      "ibadah",
      "tenang",
      "toleransi",
      "menghormati",
      "rukun",
      "agama",
      "khusyuk",
    ],
    normExplanation:
      "Norma agama menuntut kita menghormati hak setiap insan untuk beribadah dengan damai tanpa gangguan.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },
  {
    id: 1,
    key: "1-2",
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Ruang makan sekolah",
    title: "Waktu Berdoa Sebelum Makan",
    image: ibadah,
    goodImage: ibadah,
    scene: "🍱 🙏 🧒 🕊️",
    hint: "Lihat cara Sari berdoa. Keyakinan teman bisa berbeda dengan keyakinan kita, namun sama-sama mulia.",
    challenge:
      "Bagaimana cara mengajak teman-teman makan bersama secara kompak tanpa mengganggu doa teman yang berbeda agama?",
    question:
      "Saat jam makan siang, Sari ingin berdoa menurut cara agamanya sebelum membuka bekal. Teman di sebelahnya mengajak langsung makan dan bercanda. Apa sikap yang tepat?",
    actions: [
      {
        id: "a",
        emoji: "🙏",
        label:
          "Memberi waktu hening agar Sari dapat berdoa dengan tenang sesuai tata cara agamanya.",
        correct: true,
        consequence:
          "Sari merasa dihargai keyakinannya dan suasana makan bersama menjadi hangat penuh persahabatan.",
      },
      {
        id: "b",
        emoji: "😆",
        label: "Menertawakan gerakan tangan Sari saat sedang berdoa.",
        correct: false,
        consequence: "Sari merasa sedih, tersinggung, dan malu menjalankan kewajiban agamanya.",
      },
      {
        id: "c",
        emoji: "🍽️",
        label: "Menarik sendok Sari dan menyuruhnya berdoa di luar ruangan saja.",
        correct: false,
        consequence:
          "Tindakan ini menyakiti hati teman dan bertentangan dengan ajaran budi pekerti serta norma agama.",
      },
      {
        id: "d",
        emoji: "🙈",
        label: "Pura-pura tidak melihat dan menyenggol meja Sari hingga minumannya tumpah.",
        correct: false,
        consequence: "Menimbulkan keributan dan menunjukkan sikap yang tidak peduli pada teman.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena menghormati cara berdoa orang lain adalah wujud pengamalan rasa syukur dan toleransi beragama.",
        good: true,
        feedback:
          "Hebat! Kamu memahami bahwa setiap pemeluk agama wajib saling menghargai cara beribadah.",
      },
      {
        id: "r2",
        label: "Karena semua orang harus berdoa dengan cara yang sama persis seperti caraku.",
        good: false,
        feedback:
          "Indonesia kaya akan keberagaman agama. Kita wajib saling menghargai perbedaan tersebut.",
      },
      {
        id: "r3",
        label: "Karena berdoa sebelum makan membuang waktu bermain saat istirahat.",
        good: false,
        feedback: "Berdoa adalah bentuk ibadah dan syukur kepada Tuhan yang patut kita hormati.",
      },
      {
        id: "r4",
        label: "Karena makan bersama tidak membutuhkan tata tertib dan sopan santun.",
        good: false,
        feedback: "Makan bersama tetap memerlukan tenggang rasa dan sikap saling menghormati.",
      },
    ],
    principleKeywords: [
      "doa",
      "syukur",
      "toleransi",
      "menghormati",
      "keyakinan",
      "agama",
      "tenggang rasa",
    ],
    normExplanation:
      "Norma agama mengajarkan kita bersyukur kepada Tuhan dan menghormati cara beribadah teman yang berbeda.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },
  {
    id: 1,
    key: "1-3",
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Kunjungan tempat ibadah Surakarta",
    title: "Melepas Sepatu di Pintu Tempat Ibadah",
    image: ibadah,
    goodImage: ibadah,
    scene: "🕌 👟 🪧 🕊️",
    hint: "Perhatikan tanda petunjuk di dekat pintu masuk tempat suci. Kesucian tempat ibadah harus dijaga.",
    challenge:
      "Bandingkan mengingatkan teman dengan berbisik santun dan memperingatkan dengan berteriak di serambi tempat ibadah. Mana yang sesuai adab?",
    question:
      "Dalam kegiatan karyawisata ke tempat ibadah bersejarah di Surakarta, terdapat papan petunjuk 'Batas Suci: Alas Kaki Harap Dilepas'. Seorang teman lupa dan hendak melangkah masuk mengenakan sepatu. Apa yang sebaiknya dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "👟",
        label:
          "Mengingatkan teman dengan santun dan mengajaknya meletakkan sepatu di rak yang tersedia.",
        correct: true,
        consequence:
          "Tempat ibadah tetap suci dan bersih, serta teman belajar menghormati tata tertib tempat ibadah.",
      },
      {
        id: "b",
        emoji: "🏃",
        label: "Ikut masuk memakai sepatu karena mengira tidak ada petugas yang melihat.",
        correct: false,
        consequence:
          "Lantai tempat ibadah menjadi kotor dan kalian melanggar aturan kesucian tempat ibadah.",
      },
      {
        id: "c",
        emoji: "📢",
        label:
          "Berteriak keras memanggil nama teman di dalam ruangan tempat ibadah hingga pengunjung kaget.",
        correct: false,
        consequence:
          "Suasana hening tempat ibadah menjadi gaduh dan mengganggu kekhusyukan para pengunjung.",
      },
      {
        id: "d",
        emoji: "👟",
        label: "Menendang sepatu teman ke halaman jalanan.",
        correct: false,
        consequence:
          "Perilaku kasar ini memicu kemarahan dan merusak suasana damai di tempat ibadah.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena menjaga kesucian dan kebersihan tempat ibadah adalah bentuk ketaatan pada adab dan norma agama.",
        good: true,
        feedback: "Luar biasa! Menjaga kesucian rumah ibadah adalah cerminan akhlak terpuji.",
      },
      {
        id: "r2",
        label: "Karena aturan batas suci hanya berlaku bagi orang tua, bukan untuk anak sekolah.",
        good: false,
        feedback:
          "Aturan tempat ibadah berlaku untuk semua orang demi memelihara kesucian bersama.",
      },
      {
        id: "r3",
        label: "Karena memakai sepatu di dalam tempat ibadah membuat penampilan lebih keren.",
        good: false,
        feedback:
          "Tempat ibadah memiliki aturan kesucian yang harus dijunjung di atas penampilan pribadi.",
      },
      {
        id: "r4",
        label: "Karena membiarkan teman salah adalah hal yang wajar selama bukan urusan kita.",
        good: false,
        feedback: "Mengingatkan teman dalam kebaikan dan ketaatan norma adalah perbuatan mulia.",
      },
    ],
    principleKeywords: ["suci", "kebersihan", "adab", "ibadah", "menghormati", "aturan", "sopan"],
    normExplanation:
      "Norma agama menuntun kita mematuhi adab kesucian rumah ibadah sebagai penghormatan kepada Sang Pencipta.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },
  {
    id: 1,
    key: "1-4",
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Aula serbaguna sekolah",
    title: "Musyawarah Jadwal Aula Sekolah",
    image: ibadah,
    goodImage: ibadah,
    scene: "🏫 📅 🤝 🕊️",
    hint: "Dua kegiatan sama-sama penting: satu untuk ibadah doa bersama, satu untuk latihan drama sekolah.",
    challenge:
      "Analisis kebutuhan waktu kedua kelompok. Bagaimana cara menyusun pembagian jadwal yang adil tanpa merugikan ibadah?",
    question:
      "Dua kelompok murid memerlukan aula sekolah di waktu yang hampir bersamaan: kelompok rohani untuk ibadah doa bersama dan kelompok seni untuk gladi bersih drama. Bagaimana solusi yang adil?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label:
          "Bermusyawarah bersama guru pembina untuk membagi giliran waktu penggunaan aula secara adil.",
        correct: true,
        consequence:
          "Ibadah dapat berlangsung hening sesuai jadwal, dan latihan drama tetap terlaksana dengan lancar.",
      },
      {
        id: "b",
        emoji: "🔒",
        label: "Mengunci pintu aula dari dalam agar kelompok lain tidak bisa masuk.",
        correct: false,
        consequence:
          "Menimbulkan perselisihan sengit antarmurid dan melanggar aturan penggunaan fasilitas sekolah.",
      },
      {
        id: "c",
        emoji: "🚫",
        label:
          "Melarang kelompok lain beribadah karena menganggap latihan seni lebih menyenangkan.",
        correct: false,
        consequence:
          "Menunjukkan sikap intoleran yang tidak menghargai kebutuhan rohani sesama teman.",
      },
      {
        id: "d",
        emoji: "😤",
        label: "Membuat keributan di depan aula agar kedua kegiatan sama-sama batal.",
        correct: false,
        consequence:
          "Sikap merugikan semua pihak dan memperkeruh persaudaraan di lingkungan sekolah.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena kebutuhan ibadah dan kegiatan belajar perlu diselaraskan dengan musyawarah yang menghormati hak bersama.",
        good: true,
        feedback:
          "Sangat bijak! Musyawarah yang adil mencerminkan nilai luhur Pancasila dan norma agama.",
      },
      {
        id: "r2",
        label: "Karena kelompok yang datang lebih dulu berhak memakai aula seharian penuh.",
        good: false,
        feedback:
          "Fasilitas sekolah dirancang untuk dinikmati bersama dengan rasa saling bertenggang rasa.",
      },
      {
        id: "r3",
        label: "Karena kegiatan ibadah tidak perlu diberi tempat di lingkungan sekolah.",
        good: false,
        feedback:
          "Norma agama dan pendidikan Pancasila menjamin kebebasan beribadah bagi seluruh murid.",
      },
      {
        id: "r4",
        label: "Karena tidak perlu memikirkan kebutuhan kelompok lain.",
        good: false,
        feedback: "Sikap egois bertentangan dengan semangat persaudaraan dan toleransi.",
      },
    ],
    principleKeywords: [
      "musyawarah",
      "adil",
      "ibadah",
      "jadwal",
      "rukun",
      "toleransi",
      "fasilitas",
    ],
    normExplanation:
      "Norma agama menumbuhkan semangat perdamaian, musyawarah, dan saling memberi kemudahan dalam kebaikan.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },
  {
    id: 1,
    key: "1-5",
    pos: "Pos 1",
    norma: "Norma Agama",
    color: "agama",
    icon: "hand-heart",
    place: "Kantin sekolah Surakarta",
    title: "Menghormati Teman yang Berpuasa",
    image: ibadah,
    goodImage: ibadah,
    scene: "🍱 🤲 🤝 🕊️",
    hint: "Perhatikan teman yang sedang berpuasa. Bagaimana sikap kita saat menyantap makanan di dekatnya?",
    challenge:
      "Bandingkan makan sambil memamerkan aroma lezat di depan teman dan makan dengan wajar tanpa menggoda. Jelaskan dampaknya bagi perasaan teman.",
    question:
      "Di bulan puasa, Farhan sedang berpuasa sunnah. Ketika istirahat, kamu dan teman-teman hendak makan bekal di kantin. Bagaimana sikap terpuji terhadap Farhan?",
    actions: [
      {
        id: "a",
        emoji: "🤲",
        label:
          "Makan dengan santun tanpa memamerkan makanan atau menggoda Farhan agar membatalkan puasanya.",
        correct: true,
        consequence:
          "Farhan dapat menjalankan ibadah puasanya dengan tabah dan merasa didukung oleh sahabat-sahabatnya.",
      },
      {
        id: "b",
        emoji: "🍟",
        label:
          "Menyodorkan camilan ke dekat wajah Farhan sambil mengejek agar ia membatalkan puasanya.",
        correct: false,
        consequence:
          "Perilaku menggoda ini tidak menghargai ibadah teman dan melukai perasaan Farhan.",
      },
      {
        id: "c",
        emoji: "🗣️",
        label: "Menyuruh Farhan keluar dari kantin dan mengucilkannya dari lingkaran pertemanan.",
        correct: false,
        consequence:
          "Farhan merasa sedih karena dikucilkan hanya karena menjalankan kewajiban ibadahnya.",
      },
      {
        id: "d",
        emoji: "😆",
        label: "Menertawakan Farhan karena tubuhnya tampak lemas.",
        correct: false,
        consequence:
          "Menunjukkan sikap kurang terpuji yang tidak memiliki empati terhadap ibadah orang lain.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena menghargai teman yang beribadah puasa adalah wujud kasih sayang dan tenggang rasa antarumat beragama.",
        good: true,
        feedback:
          "Pilihan dan alasanmu sangat mulia! Menghargai teman yang berpuasa mempererat persaudaraan.",
      },
      {
        id: "r2",
        label: "Karena berpuasa itu aneh dan tidak perlu dihargai di lingkungan sekolah.",
        good: false,
        feedback: "Berpuasa adalah ajaran suci dalam agama yang patut kita hormati bersama.",
      },
      {
        id: "r3",
        label: "Karena bercanda menggoda orang lapar selalu menyenangkan.",
        good: false,
        feedback: "Menggoda ibadah orang lain bukanlah lelucon yang baik menurut norma agama.",
      },
      {
        id: "r4",
        label: "Karena siapa yang berpuasa harus bersembunyi dari pandangan orang lain.",
        good: false,
        feedback:
          "Di sekolah yang ramah, setiap murid berhak beribadah dengan rasa aman dan dihargai.",
      },
    ],
    principleKeywords: [
      "puasa",
      "hormat",
      "tenggang rasa",
      "empati",
      "ibadah",
      "sahabat",
      "kasih sayang",
    ],
    normExplanation:
      "Norma agama menanamkan rasa empati, kesetiakawanan, dan saling mendukung dalam kebajikan ibadah.",
    badge: { name: "Sahabat Kebaikan", emoji: "🕊️" },
  },

  // POS 2: NORMA KESUSILAAN
  {
    id: 2,
    key: "2-1",
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Ruang kelas V SD",
    title: "Buku Pelajaran yang Tertinggal",
    image: pasar,
    goodImage: pasar,
    scene: "📚 🧒 🤝 💙",
    hint: "Di sampul buku tertulis nama pemiliknya. Hati nurani kita selalu tahu mana hak kita dan mana hak orang lain.",
    challenge:
      "Bandingkan mengembalikan buku langsung ke pemiliknya dengan menyimpannya untuk keperluan pribadi. Mengapa kejujuran membawa ketenangan batin?",
    question:
      "Setelah jam pelajaran selesai, kamu melihat buku tulis bersampul rapi milik teman tertinggal di bawah laci meja. Ruang kelas sudah mulai sepi. Apa tindakan yang sesuai hati nurani?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label:
          "Mengamankan buku tersebut dan menyerahkannya langsung kepada pemiliknya atau guru piket.",
        correct: true,
        consequence:
          "Temanmu sangat terbantu karena catatan tugasnya tidak hilang, dan hatimu merasa tenang berbuat jujur.",
      },
      {
        id: "b",
        emoji: "🎒",
        label:
          "Memasukkan buku itu ke dalam tas sendiri untuk dipakai menulis catatan pribadi di rumah.",
        correct: false,
        consequence:
          "Temanmu kebingungan dan sedih mencari bukunya, sementara batinmu diliputi rasa bersalah.",
      },
      {
        id: "c",
        emoji: "🗑️",
        label: "Membuang buku itu ke tempat sampah agar laci meja tampak bersih.",
        correct: false,
        consequence:
          "Hasil kerja keras temanmu hancur sia-sia akibat tindakan yang tidak bertanggung jawab.",
      },
      {
        id: "d",
        emoji: "🙈",
        label: "Menyobek halaman yang ada namanya agar tidak ketahuan siapa pemilik aslinya.",
        correct: false,
        consequence:
          "Tindakan merusak dan menyembunyikan kebenaran adalah pelanggaran berat norma kesusilaan.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena hati nurani mengajarkan kita untuk jujur dan tidak mengambil barang yang bukan hak milik kita.",
        good: true,
        feedback: "Tepat sekali! Kejujuran bersumber dari bisikan hati nurani yang bersih.",
      },
      {
        id: "r2",
        label:
          "Karena barang yang tertinggal otomatis menjadi milik siapa pun yang menemukannya pertama kali.",
        good: false,
        feedback:
          "Barang milik orang lain tetap merupakan hak pemiliknya, bukan menjadi milik penemu.",
      },
      {
        id: "r3",
        label: "Karena tidak ada kamera pengawas, jadi tidak ada yang tahu jika diambil.",
        good: false,
        feedback:
          "Norma kesusilaan tidak bergantung pada ada tidaknya orang lain yang melihat, melainkan pengawasan batin sendiri.",
      },
      {
        id: "r4",
        label: "Karena buku teman terlihat lebih bagus daripada buku milik sendiri.",
        good: false,
        feedback: "Keinginan memiliki tidak boleh mengabaikan kejujuran dan hak orang lain.",
      },
    ],
    principleKeywords: [
      "jujur",
      "hati nurani",
      "milik",
      "amanah",
      "mengembalikan",
      "tanggung jawab",
    ],
    normExplanation:
      "Norma kesusilaan membimbing manusia untuk senantiasa berbuat jujur, adil, dan menjauhi perbuatan tercela.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },
  {
    id: 2,
    key: "2-2",
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Ruang kelompok belajar",
    title: "Koreksi Kesalahan Poster Kelompok",
    image: pasar,
    goodImage: pasar,
    scene: "🎨 📝 🛠️ 💙",
    hint: "Berani mengakui kekeliruan sendiri adalah ciri anak berjiwa ksatria dan jujur.",
    challenge:
      "Bandingkan mengakui kesalahan lebih awal untuk diperbaiki bersama dengan menyembunyikannya hingga dinilai guru. Apa konsekuensi jangka panjangnya?",
    question:
      "Saat membuat poster pameran budaya Surakarta, kamu menyadari bahwa kamu keliru menuliskan tanggal festival penting. Teman sekelompok belum ada yang tahu. Apa tindakan yang jujur dan ksatria?",
    actions: [
      {
        id: "a",
        emoji: "🛠️",
        label:
          "Terus terang memberitahu teman kelompok tentang kekeliruan itu dan bersama-sama memperbaikinya.",
        correct: true,
        consequence:
          "Poster menjadi benar dan berkualitas sebelum dipamerkan, serta teman-teman menghargai kejujuranmu.",
      },
      {
        id: "b",
        emoji: "🤫",
        label: "Diam saja dan berharap guru tidak memperhatikan kesalahan tanggal tersebut.",
        correct: false,
        consequence:
          "Informasi yang salah tersebar ke pengunjung pameran dan nilai kelompok bisa berkurang.",
      },
      {
        id: "c",
        emoji: "👉",
        label:
          "Menuduh teman lain yang menulis bagian tanggal tersebut agar diri sendiri terhindar dari teguran.",
        correct: false,
        consequence:
          "Memfitnah teman merusak kepercayaan persahabatan dan menodai suara hati nurani.",
      },
      {
        id: "d",
        emoji: "✂️",
        label: "Menggunting bagian poster itu secara diam-diam sehingga poster menjadi robek.",
        correct: false,
        consequence:
          "Karya poster menjadi rusak dan kerja keras seluruh anggota kelompok menjadi sia-sia.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena kejujuran dan keberanian mengakui kesalahan adalah wujud tanggung jawab moral terhadap kelompok.",
        good: true,
        feedback:
          "Mantap! Mengakui kesalahan dan memperbaikinya adalah tanda kedewasaan budi pekerti.",
      },
      {
        id: "r2",
        label: "Karena mengakui kesalahan akan membuat diri tampak lemah di hadapan teman.",
        good: false,
        feedback: "Mengakui kesalahan justru menunjukkan keberanian dan integritas yang tinggi.",
      },
      {
        id: "r3",
        label: "Karena menyalahkan teman lain lebih mudah daripada ikut memperbaiki poster.",
        good: false,
        feedback:
          "Melempar kesalahan kepada orang lain melanggar norma kesusilaan dan menyakiti hati nurani.",
      },
      {
        id: "r4",
        label: "Karena ketepatan informasi tidak ada artinya dalam tugas sekolah.",
        good: false,
        feedback:
          "Kejujuran dan ketepatan informasi sangat penting dalam karya ilmiah dan belajar.",
      },
    ],
    principleKeywords: [
      "jujur",
      "tanggung jawab",
      "mengakui",
      "kelompok",
      "kesalahan",
      "hati nurani",
    ],
    normExplanation:
      "Norma kesusilaan menuntut setiap insan untuk berani jujur, sportif, dan bertanggung jawab atas tindakan sendiri.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },
  {
    id: 2,
    key: "2-3",
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Taman Balekambang Surakarta",
    title: "Botol Minum di Taman Balekambang",
    image: pasar,
    goodImage: pasar,
    scene: "🌳 🧴 🧑‍✈️ 💙",
    hint: "Botol minum itu memiliki stiker nama pemiliknya. Bayangkan bagaimana rasanya jika botol kesayanganmu hilang.",
    challenge:
      "Mengapa menitipkan ke pos petugas informasi taman jauh lebih bertanggung jawab daripada membawanya pulang dengan alasan sayang dibiarkan?",
    question:
      "Saat berlibur di Taman Balekambang Surakarta, kamu menemukan botol minum bagus berstiker nama anak tertinggal di bangku taman. Pemiliknya sudah tidak terlihat. Apa yang semestinya dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🧑‍✈️",
        label:
          "Menyerahkan botol tersebut ke Pos Pengamanan / Informasi Taman agar diumumkan kepada pemiliknya.",
        correct: true,
        consequence:
          "Pemilik dapat menemukan kembali botol minumnya yang hilang, dan hatimu bahagia telah berbuat baik.",
      },
      {
        id: "b",
        emoji: "🎒",
        label: "Memasukkannya ke ransel pribadi dan menggunakannya sebagai botol minum sendiri.",
        correct: false,
        consequence:
          "Pemilik kehilangan barang berharganya dan kamu telah berbuat tidak jujur mengambil hak orang lain.",
      },
      {
        id: "c",
        emoji: "🗑️",
        label: "Membuang botol itu ke danau taman agar tidak perlu repot membawanya.",
        correct: false,
        consequence: "Mengotori lingkungan wisata taman dan merusak barang milik orang lain.",
      },
      {
        id: "d",
        emoji: "🏷️",
        label: "Mencopot stiker namanya dan menjualnya kepada teman bermain di kampung.",
        correct: false,
        consequence:
          "Perbuatan ini tercela karena sengaja menghilangkan jejak kepemilikan orang demi keuntungan pribadi.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena membantu mengamankan barang temuan dan mengembalikannya adalah panggilan hati nurani untuk peduli.",
        good: true,
        feedback: "Hebat! Kamu peduli terhadap kesulitan orang lain dan menjaga amanah kejujuran.",
      },
      {
        id: "r2",
        label: "Karena botol yang bagus sayang jika tidak diambil untuk koleksi pribadi.",
        good: false,
        feedback:
          "Sebagus apa pun barang orang lain, mengambil tanpa hak bertentangan dengan hati nurani.",
      },
      {
        id: "r3",
        label: "Karena petugas taman pasti tidak peduli dengan barang-barang kecil yang hilang.",
        good: false,
        feedback: "Pos informasi bertugas resmi membantu pengunjung menemukan barang yang hilang.",
      },
      {
        id: "r4",
        label: "Karena siapa yang ceroboh meninggalkan barang pantas kehilangan barangnya.",
        good: false,
        feedback:
          "Norma kesusilaan mengajarkan kita berempati, bukan memanfaatkan keteledoran orang lain.",
      },
    ],
    principleKeywords: ["peduli", "jujur", "hati nurani", "amanah", "mengembalikan", "empati"],
    normExplanation:
      "Norma kesusilaan menumbuhkan kepedulian terhadap sesama dan membentengi diri dari keinginan mengambil hak orang lain.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },
  {
    id: 2,
    key: "2-4",
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Ruang kelas saat koreksi nilai",
    title: "Nilai yang Bukan Milikku",
    image: pasar,
    goodImage: pasar,
    scene: "📝 👩‍🏫 💙 ✨",
    hint: "Guru tidak sengaja salah menulis angka nilai lebih tinggi. Kejujuran diuji saat kesalahan menguntungkan kita.",
    challenge:
      "Bandingkan keuntungan nilai semu sesaat dengan rasa bangga atas nilai murni hasil usaha sendiri. Apa maknanya bagi karaktermu?",
    question:
      "Ibu Guru membagikan lembar ulangan harian. Ketika kamu periksa, ternyata ada soal salah yang terlanjur dicentang benar, sehingga nilaimu tertulis 100 padahal aslinya 85. Apa tindakan terpuji?",
    actions: [
      {
        id: "a",
        emoji: "👩‍🏫",
        label:
          "Menemui Ibu Guru dengan sopan dan menunjukkan kekeliruan koreksi tersebut secara jujur.",
        correct: true,
        consequence:
          "Ibu Guru bangga atas kejujuranmu, nilaimu sesuai kemampuan nyata, dan batinmu sangat bangga serta tenang.",
      },
      {
        id: "b",
        emoji: "🤫",
        label:
          "Diam saja dan menyembunyikan lembar ulangan agar mendapat pujian nilai sempurna dari orang tua.",
        correct: false,
        consequence:
          "Kamu mendapatkan nilai palsu dan hati nuranimu dihantui rasa bersalah karena membohongi diri sendiri.",
      },
      {
        id: "c",
        emoji: "📢",
        label:
          "Mengejek teman-teman lain yang mendapat nilai lebih rendah dari nilai salah tersebut.",
        correct: false,
        consequence:
          "Sikap sombong atas kepalsuan sangat melukai perasaan teman dan melanggar norma kesusilaan.",
      },
      {
        id: "d",
        emoji: "✏️",
        label: "Menghapus coretan guru dan menambahi jawaban agar cocok dengan nilai 100.",
        correct: false,
        consequence:
          "Memalsukan lembar ujian adalah tindakan tidak terpuji yang merusak integritas kejujuran.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena kejujuran sejati bernilai lebih mulia daripada sekadar angka nilai di atas kertas.",
        good: true,
        feedback:
          "Luar biasa! Karakter jujur adalah harta terindah dalam diri seorang pelajar Pancasila.",
      },
      {
        id: "r2",
        label: "Karena selama guru tidak sadar, berarti itu sudah menjadi rezeki kita.",
        good: false,
        feedback: "Kesalahan orang lain tidak boleh dijadikan alasan untuk berbuat tidak jujur.",
      },
      {
        id: "r3",
        label: "Karena nilai tinggi adalah satu-satunya hal yang paling berharga di sekolah.",
        good: false,
        feedback:
          "Kejujuran dan budi pekerti jauh lebih utama daripada mengejar nilai dengan cara curang.",
      },
      {
        id: "r4",
        label: "Karena teman-teman lain pasti juga akan diam jika mengalami hal yang sama.",
        good: false,
        feedback:
          "Kebenaran hati nurani dinilai dari tindakan kita sendiri, bukan dari kesalahan orang lain.",
      },
    ],
    principleKeywords: [
      "jujur",
      "integritas",
      "hati nurani",
      "nilai",
      "koreksi",
      "tulus",
      "berani",
    ],
    normExplanation:
      "Norma kesusilaan mengajarkan kita berpegang teguh pada kejujuran, sekalipun ada peluang untuk berlaku curang.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },
  {
    id: 2,
    key: "2-5",
    pos: "Pos 2",
    norma: "Norma Kesusilaan",
    color: "susila",
    icon: "heart",
    place: "Warung kejujuran sekolah Surakarta",
    title: "Kembalian Lebih di Warung Kejujuran",
    image: pasar,
    goodImage: pasar,
    scene: "💵 🏪 🤝 💙",
    hint: "Di warung kejujuran, tidak ada penjaga kasir. Pengawas sejatimu adalah Tuhan dan hati nuranimu.",
    challenge:
      "Apa pengaruh sikap jujur setiap murid terhadap kelangsungan warung kejujuran yang melayani seluruh warga sekolah?",
    question:
      "Kamu membeli alat tulis di Warung Kejujuran sekolah seharga lima ribu rupiah. Ketika mengambil uang kembalian di kotak dari pecahan sepuluh ribu, kamu keliru mengambil tujuh ribu rupiah (lebih dua ribu). Apa yang harus dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "💵",
        label:
          "Menghitung kembali dengan teliti dan segera mengembalikan kelebihan dua ribu rupiah ke dalam kotak kembalian.",
        correct: true,
        consequence:
          "Uang kas warung kejujuran tetap cocok dan kamu mempraktikkan amanah kejujuran dalam tindakan nyata.",
      },
      {
        id: "b",
        emoji: "🪙",
        label:
          "Menyimpan kelebihan uang dua ribu rupiah itu ke saku untuk jajan tambahan di luar sekolah.",
        correct: false,
        consequence:
          "Kas warung kejujuran mengalami tekor dan kamu telah melanggar prinsip kejujuran batin.",
      },
      {
        id: "c",
        emoji: "🙈",
        label: "Berpura-pura lupa dan cepat-cepat pergi dari warung kejujuran.",
        correct: false,
        consequence:
          "Kamu membiarkan ketidakjujuran merusak kebiasaan baik dan melukai rasa percaya diri.",
      },
      {
        id: "d",
        emoji: "🗣️",
        label:
          "Memberitahu teman lain agar mengambil kembalian lebih juga karena tidak ada yang menjaga.",
        correct: false,
        consequence:
          "Mengajak orang lain berbuat curang dapat menyebabkan warung kejujuran bangkrut dan tutup.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena uang kelebihan itu bukan hak milik kita dan mengambilnya melanggar suara hati nurani.",
        good: true,
        feedback:
          "Sangat membanggakan! Kamu membuktikan diri sebagai detektif yang amanah dan jujur sejati.",
      },
      {
        id: "r2",
        label:
          "Karena dua ribu rupiah adalah jumlah kecil yang tidak akan diperhatikan oleh pengurus koperasi.",
        good: false,
        feedback:
          "Kejujuran tidak diukur dari besar kecilnya uang, melainkan dari ketulusan hati nurani.",
      },
      {
        id: "r3",
        label: "Karena uang kembalian yang sudah ada di tangan otomatis menjadi milik kita.",
        good: false,
        feedback: "Kekeliruan hitung harus diperbaiki dengan jujur demi menjaga hak sesama.",
      },
      {
        id: "r4",
        label:
          "Karena warung kejujuran dibuat memang untuk mengetes seberapa banyak kita bisa untung.",
        good: false,
        feedback: "Warung kejujuran didirikan untuk melatih pembiasaan karakter jujur para murid.",
      },
    ],
    principleKeywords: [
      "jujur",
      "amanah",
      "kembalian",
      "hati nurani",
      "koperasi",
      "tanggung jawab",
    ],
    normExplanation:
      "Norma kesusilaan menuntun kita untuk selalu amanah dan tidak mengambil apa pun yang bukan menjadi hak kita.",
    badge: { name: "Penjaga Hati Nurani", emoji: "💙" },
  },

  // POS 3: NORMA KESOPANAN
  {
    id: 3,
    key: "3-1",
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Ruang kelas V SD",
    title: "Menunggu Giliran Bicara dalam Diskusi",
    image: kantin,
    goodImage: kantinHasil,
    scene: "🧒 💬 🙋 🌼",
    hint: "Dengarkan teman sampai selesai berbicara. Mengangkat tangan sebelum berbicara adalah adab diskusi yang santun.",
    challenge:
      "Bandingkan langsung memotong pembicaraan teman dengan mencatat poin tanggapan dan menunggu giliran. Solusi mana yang membuat diskusi berjalan produktif?",
    question:
      "Dalam diskusi kelompok PPKn, Danu sedang bersemangat menyampaikan usulannya. Kamu memiliki ide lain yang berbeda dan ingin segera berbicara. Bagaimana sikap yang santun?",
    actions: [
      {
        id: "a",
        emoji: "🙋",
        label:
          "Mendengarkan Danu hingga selesai, lalu mengangkat tangan dengan sopan untuk menyampaikan pendapat.",
        correct: true,
        consequence:
          "Danu merasa dihargai, gagasanmu dapat didengarkan dengan jelas, dan suasana diskusi berjalan tertib saling menghormati.",
      },
      {
        id: "b",
        emoji: "🗣️",
        label: "Langsung memotong pembicaraan Danu dengan suara lebih keras di tengah kalimatnya.",
        correct: false,
        consequence:
          "Danu merasa kesal karena diinterupsi dan diskusi berubah menjadi ajang saling teriak.",
      },
      {
        id: "c",
        emoji: "😆",
        label: "Menertawakan gaya bicara Danu di depan anggota kelompok lainnya.",
        correct: false,
        consequence: "Menyakiti perasaan teman dan melanggar norma kesopanan dalam bermusyawarah.",
      },
      {
        id: "d",
        emoji: "🚶",
        label: "Berdiri dan meninggalkan meja diskusi sambil menggebrak meja.",
        correct: false,
        consequence:
          "Perilaku tidak terpuji yang merusak kerja sama kelompok dan mencoreng tata krama pergaulan.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena mendengarkan orang lain hingga tuntas adalah wujud tata krama dan penghormatan terhadap pendapat sesama.",
        good: true,
        feedback:
          "Pilihan santun! Menghargai pembicara mencerminkan murid yang beradab dan berbudaya luhur.",
      },
      {
        id: "r2",
        label: "Karena siapa yang bersuara paling keras adalah pemenang diskusi.",
        good: false,
        feedback:
          "Diskusi bukanlah lomba berteriak, melainkan wadah bertukar pikiran secara santun.",
      },
      {
        id: "r3",
        label: "Karena ide kita pasti jauh lebih pintar dibandingkan pendapat teman.",
        good: false,
        feedback:
          "Kesopanan menuntut kita tetap rendah hati dan tidak meremehkan pendapat orang lain.",
      },
      {
        id: "r4",
        label: "Karena menunggu giliran hanya menghabiskan waktu diskusi.",
        good: false,
        feedback:
          "Tertib giliran justru membuat jalannya diskusi menjadi cepat terarah dan bermakna.",
      },
    ],
    principleKeywords: [
      "santun",
      "giliran",
      "mendengarkan",
      "sopan",
      "musyawarah",
      "tata krama",
      "menghargai",
    ],
    normExplanation:
      "Norma kesopanan mengatur adab berkomunikasi, seperti tidak memotong pembicaraan orang lain dan bertutur kata santun.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },
  {
    id: 3,
    key: "3-2",
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Perpustakaan sekolah",
    title: "Izin Sebelum Meminjam Peralatan Teman",
    image: kantin,
    goodImage: kantinHasil,
    scene: "🖍️ 🧒 🤝 🌼",
    hint: "Gunakan kata ajaib 'Tolong' dan 'Bolehkah saya meminjam?'. Jangan langsung mengambil barang milik orang lain.",
    challenge:
      "Bagaimana cara bertutur kata yang santun jika teman ternyata sedang membutuhkan peralatan itu juga?",
    question:
      "Saat mengerjakan tugas gambar di perpustakaan, pensil warnamu patah. Di meja sebelah, pensil warna milik Rian sedang tergeletak rapi. Apa yang sebaiknya dilakukan?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label:
          "Menyapa Rian dengan ramah, meminta izin meminjam dengan sopan, dan mengembalikannya segera setelah selesai.",
        correct: true,
        consequence:
          "Rian meminjamkan dengan ikhlas, barang terjaga baik, dan persahabatan kalian semakin akrab.",
      },
      {
        id: "b",
        emoji: "🤫",
        label:
          "Mengambil pensil warna Rian diam-diam tanpa bertanya karena merasa sudah berteman akrab.",
        correct: false,
        consequence:
          "Rian panik mencari pensilnya dan merasa hak miliknya tidak dihargai oleh teman.",
      },
      {
        id: "c",
        emoji: "📢",
        label:
          "Menuntut Rian meminjamkan semua pensil warnanya sambil mengancam tidak mau berteman.",
        correct: false,
        consequence:
          "Perilaku memaksa dan kasar melanggar norma kesopanan serta merusak hubungan pertemanan.",
      },
      {
        id: "d",
        emoji: "🖍️",
        label: "Mengambil tanpa izin lalu sengaja mematahkan ujung pensilnya.",
        correct: false,
        consequence:
          "Tindakan merusak barang orang lain adalah perbuatan buruk yang tidak beradab.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena meminta izin dengan tutur kata santun menghormati kepemilikan orang lain dan menjaga adab berteman.",
        good: true,
        feedback:
          "Hebat! Kata santun 'tolong' dan izin adalah tanda anak yang berbudi pekerti halus.",
      },
      {
        id: "r2",
        label:
          "Karena dengan teman sebangku kita bebas mengambil barang apa saja tanpa perlu izin.",
        good: false,
        feedback:
          "Sekalipun dengan teman akrab, izin meminjam tetap wajib dijaga demi saling menghormati.",
      },
      {
        id: "r3",
        label: "Karena meminta izin terasa merepotkan dan memalukan.",
        good: false,
        feedback: "Meminta izin dengan sopan adalah sikap terhormat, bukan hal yang memalukan.",
      },
      {
        id: "r4",
        label: "Karena barang di sekolah adalah milik umum yang boleh dipakai sesuka hati.",
        good: false,
        feedback:
          "Peralatan pribadi milik teman harus dijaga hak kepemilikannya dengan izin yang baik.",
      },
    ],
    principleKeywords: [
      "izin",
      "santun",
      "pinjam",
      "sopan",
      "menghargai",
      "tata krama",
      "terima kasih",
    ],
    normExplanation:
      "Norma kesopanan membiasakan kita untuk selalu meminta izin sebelum meminjam dan mengucapkan terima kasih.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },
  {
    id: 3,
    key: "3-3",
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Gedung Wayang Orang Sriwedari Surakarta",
    title: "Menonton Pertunjukan dengan Santun",
    image: kantin,
    goodImage: kantinHasil,
    scene: "🎭 👏 🤫 🌼",
    hint: "Amati para penonton lain dan seniman di panggung. Sikap tertib mendukung apresiasi seni budaya Surakarta.",
    challenge:
      "Bandingkan memberikan tepuk tangan apresiatif di saat jeda adegan dengan berteriak-teriak saat pemain berdialog. Jelaskan dampaknya bagi penonton lain.",
    question:
      "Saat menonton pertunjukan seni wayang orang di Sriwedari Surakarta, teman di sampingmu ingin berbicara kencang dan berdiri di kursi sehingga menutupi penonton di belakang. Apa tindakan yang tepat?",
    actions: [
      {
        id: "a",
        emoji: "🤫",
        label:
          "Mengajak teman duduk tenang dan mengingatkannya dengan berbisik ramah agar tidak mengganggu penonton lain.",
        correct: true,
        consequence:
          "Seluruh penonton dapat menikmati pentas budaya dengan nyaman dan para pemain di panggung merasa dihormati.",
      },
      {
        id: "b",
        emoji: "📢",
        label:
          "Ikut berdiri di atas kursi dan berteriak-teriak agar terlihat mencolok dalam rekaman video.",
        correct: false,
        consequence:
          "Penonton di belakang terhalang pandangannya dan suasana gedung pertunjukan menjadi kacau.",
      },
      {
        id: "c",
        emoji: "🍿",
        label: "Melemparkan bungkus makanan ke arah panggung pertunjukan saat lampu padam.",
        correct: false,
        consequence:
          "Perilaku sangat tidak sopan yang mencoreng nama baik sekolah dan merendahkan karya seni.",
      },
      {
        id: "d",
        emoji: "😆",
        label: "Mengejek pakaian adat yang dikenakan oleh para pemain di panggung.",
        correct: false,
        consequence:
          "Menunjukkan sikap tidak berbudaya yang melanggar adab kesopanan apresiasi seni tradisi.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena menjaga ketertiban, ketenangan, dan kesantunan di tempat umum adalah cerminan budaya luhur yang beradab.",
        good: true,
        feedback: "Mantap! Kamu adalah duta budaya yang mengedepankan tata krama di ruang publik.",
      },
      {
        id: "r2",
        label:
          "Karena kita sudah membeli tiket masuk, jadi bebas berbuat apa saja di dalam gedung.",
        good: false,
        feedback:
          "Membeli tiket tidak memberi hak untuk mengabaikan kenyamanan dan hak orang lain.",
      },
      {
        id: "r3",
        label: "Because membuat keributan di gedung seni adalah hak kebebasan berekspresi.",
        good: false,
        feedback:
          "Kebebasan berekspresi di ruang publik dibatasi oleh norma kesopanan dan hak penonton lain.",
      },
      {
        id: "r4",
        label: "Karena penonton di belakang seharusnya berdiri juga jika pandangannya terhalang.",
        good: false,
        feedback:
          "Sikap saling menjaga kenyamanan bersama jauh lebih mulia daripada memicu ketidaktertiban berantai.",
      },
    ],
    principleKeywords: [
      "santun",
      "tertib",
      "pertunjukan",
      "sopan",
      "menghargai",
      "budaya",
      "tata krama",
    ],
    normExplanation:
      "Norma kesopanan memandu kita menjaga tata susila dan ketertiban saat berada di tempat umum dan fasilitas seni budaya.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },
  {
    id: 3,
    key: "3-4",
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Ruang kelompok belajar",
    title: "Menghargai Perbedaan Pendapat Musyawarah",
    image: kantin,
    goodImage: kantinHasil,
    scene: "💬 🤝 🎨 🌼",
    hint: "Perbedaan usulan adalah hal wajar. Sampaikan alasan dengan tutur bahasa yang sejuk tanpa kata-kata kasar.",
    challenge:
      "Bagaimana cara menyatukan dua usulan yang berbeda menjadi kesepakatan mufakat yang menyenangkan semua anggota?",
    question:
      "Dalam rapat pemilihan tema hiasan kelas menyambut Hari Kemerdekaan, sebagian teman memilih tema adat Jawa Surakarta, sedangkan kamu mengusulkan tema Nusantara. Suasana mulai memanas. Apa sikap yang santun?",
    actions: [
      {
        id: "a",
        emoji: "🤝",
        label:
          "Menyampaikan usulan dengan bahasa yang santun, mendengarkan argumen teman dengan tenang, dan memadukan kedua ide secara serasi.",
        correct: true,
        consequence:
          "Kelompok menemukan perpaduan hiasan yang kreatif dan seluruh anggota merasa gagasannya dihargai dengan baik.",
      },
      {
        id: "b",
        emoji: "😡",
        label:
          "Menuduh usulan teman kuno dan membentak anggota yang tidak setuju dengan pendapatmu.",
        correct: false,
        consequence:
          "Hubungan pertemanan menjadi retak dan musyawarah kelas berujung pada pertengkaran yang tidak sehat.",
      },
      {
        id: "c",
        emoji: "🚶",
        label:
          "Ngambek dan menyatakan tidak mau ikut kerja bakti menghias kelas jika usulanmu tidak dipilih.",
        correct: false,
        consequence:
          "Menunjukkan sikap kekanak-kanakan yang tidak bertanggung jawab dalam kerja sama kelompok.",
      },
      {
        id: "d",
        emoji: "🤫",
        label:
          "Menghasut beberapa teman secara sembunyi-sembunyi untuk membenci teman yang berbeda pendapat.",
        correct: false,
        consequence:
          "Perilaku memecah belah persaudaraan ini bertentangan keras dengan norma kesopanan dan Pancasila.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena musyawarah mufakat menuntut tata krama saling menghargai perbedaan demi tercapainya kebaikan bersama.",
        good: true,
        feedback:
          "Sangat bijaksana! Musyawarah dengan etika santun adalah perwujudan sila keempat Pancasila.",
      },
      {
        id: "r2",
        label: "Karena pendapat kita selalu yang paling benar dan wajib dipatuhi semua orang.",
        good: false,
        feedback: "Sikap memaksakan kehendak bertentangan dengan adab kesopanan dan musyawarah.",
      },
      {
        id: "r3",
        label: "Karena teman yang berbeda pendapat harus dianggap sebagai lawan.",
        good: false,
        feedback: "Perbedaan pendapat adalah kekayaan pikiran, bukan alasan untuk memusuhi teman.",
      },
      {
        id: "r4",
        label: "Karena membentak adalah cara terbaik untuk memenangkan perdebatan.",
        good: false,
        feedback:
          "Tutur kata yang santun dan alasan yang logis jauh lebih berdaya daripada bentakan kasar.",
      },
    ],
    principleKeywords: [
      "musyawarah",
      "santun",
      "menghargai",
      "sopan",
      "mufakat",
      "tata krama",
      "rukun",
    ],
    normExplanation:
      "Norma kesopanan mengajarkan kita berbesar hati, menghargai pandangan orang lain, dan mengutamakan mufakat damai.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },
  {
    id: 3,
    key: "3-5",
    pos: "Pos 3",
    norma: "Norma Kesopanan",
    color: "sopan",
    icon: "smile",
    place: "Gerbang sekolah di pagi hari",
    title: "Menyapa Santun Saat Bertemu Guru",
    image: kantin,
    goodImage: kantinHasil,
    scene: "🏫 🎒 🙋 🌼",
    hint: "Ingat budaya 5S: Senyum, Salam, Sapa, Sopan, dan Santun saat berpapasan dengan guru dan tamu sekolah.",
    challenge:
      "Bandingkan mengucapkan salam dengan senyum hangat dan menundukkan pandangan pura-pura tidak kenal. Apa pengaruhnya bagi suasana sekolah?",
    question:
      "Pagi hari di depan gerbang sekolah, kamu berpapasan dengan Bapak Guru piket dan beberapa orang tua murid. Bagaimana sikap beradab yang mencerminkan budaya 5S?",
    actions: [
      {
        id: "a",
        emoji: "🙋",
        label:
          "Tersenyum ramah, mengangguk hormat, dan mengucapkan salam 'Selamat pagi Bapak Guru' dengan suara santun.",
        correct: true,
        consequence:
          "Bapak Guru dan tamu merasa dihargai, suasana pagi menjadi ceria, dan budaya santun sekolah terjaga harum.",
      },
      {
        id: "b",
        emoji: "🏃",
        label:
          "Berlari kencang menyerobot jalan di depan guru tanpa menyapa dan hampir menabrak orang tua murid.",
        correct: false,
        consequence:
          "Tindakan ceroboh ini membahayakan keselamatan dan dinilai tidak beretika santun terhadap orang tua.",
      },
      {
        id: "c",
        emoji: "📱",
        label: "Menunduk cuek sambil memainkan tali tas dan pura-pura tidak melihat siapa pun.",
        correct: false,
        consequence:
          "Menunjukkan sikap acuh tak acuh yang kurang elok dalam budaya pergaulan sekolah.",
      },
      {
        id: "d",
        emoji: "🗣️",
        label: "Memanggil nama panggilan guru dengan nada bercanda seperti memanggil kawan sebaya.",
        correct: false,
        consequence:
          "Melanggar tata krama penghormatan murid kepada pendidik dan orang yang lebih tua.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena menghormati guru dan orang yang lebih tua dengan salam dan sapaan santun adalah adab luhur bangsa kita.",
        good: true,
        feedback:
          "Bagus sekali! Senyum, salam, dan sapa adalah cermin keanggunan budi pekerti pelajar.",
      },
      {
        id: "r2",
        label:
          "Karena menyapa hanya perlu dilakukan jika kita membutuhkan bantuan nilai dari guru.",
        good: false,
        feedback:
          "Kesopanan diberikan secara tulus kepada siapa saja, bukan karena ada pamrih tertentu.",
      },
      {
        id: "r3",
        label: "Karena orang modern tidak perlu lagi menjaga adat istiadat kesantunan.",
        good: false,
        feedback:
          "Kesopanan dan keramahan adalah karakter luhur yang tidak akan lekang oleh kemajuan zaman.",
      },
      {
        id: "r4",
        label: "Karena menyapa orang dewasa membuat kita kehilangan waktu bermain.",
        good: false,
        feedback:
          "Mengucapkan salam hanya butuh beberapa detik namun memberi kebahagiaan bagi banyak orang.",
      },
    ],
    principleKeywords: ["sapa", "salam", "hormat", "santun", "sopan", "5S", "guru", "adab"],
    normExplanation:
      "Norma kesopanan memelihara keluhuran pekerti melalui kebiasaan senyum, salam, sapa, serta hormat kepada yang lebih tua.",
    badge: { name: "Duta Kesopanan", emoji: "🌼" },
  },

  // POS 4: NORMA HUKUM
  {
    id: 4,
    key: "4-1",
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "Depan Benteng Vastenburg Surakarta",
    title: "Menyeberang Tertib di Zebra Cross",
    image: lalulintas,
    goodImage: lalulintas,
    scene: "🚸 🚶 🚗 🛡️",
    hint: "Zebra cross dan jembatan penyeberangan adalah jalur resmi yang dilindungi oleh undang-undang lalu lintas.",
    challenge:
      "Bandingkan menghemat beberapa langkah dengan menyeberang sembarangan versus berjalan sedikit menuju zebra cross. Siapa saja yang terancam bahaya jika kita menyeberang sembarangan?",
    question:
      "Jalan raya di depan Benteng Vastenburg Surakarta sedang cukup ramai oleh kendaraan bermotor. Zebra cross penyeberangan terletak sekitar 20 meter dari posisimu berdiri. Apa tindakan yang tertib hukum?",
    actions: [
      {
        id: "a",
        emoji: "🚶",
        label:
          "Berjalan menuju zebra cross dan menyeberang di tempat resmi tersebut dengan menengok kanan-kiri secara waspada.",
        correct: true,
        consequence:
          "Kamu menyeberang dengan aman dan selamat, pengendara dapat melihat penyeberang dengan jelas, dan lalu lintas tertib.",
      },
      {
        id: "b",
        emoji: "🏃",
        label:
          "Langsung melompati pembatas jalan di tengah lalu lintas padat untuk menghemat waktu.",
        correct: false,
        consequence:
          "Perilaku berbahaya yang melanggar hukum lalu lintas dan mengancam keselamatan nyawa diri sendiri serta pengendara lain.",
      },
      {
        id: "c",
        emoji: "🙈",
        label:
          "Mengikuti orang dewasa yang menyeberang sembarangan di tikungan jalan yang berbahaya.",
        correct: false,
        consequence:
          "Meniru pelanggaran hukum tetap merupakan kesalahan yang berisiko fatal menimbulkan kecelakaan.",
      },
      {
        id: "d",
        emoji: "🚷",
        label: "Bermain petak umpet di median pemisah jalan raya saat kendaraan melaju.",
        correct: false,
        consequence: "Sangat membahayakan jiwa dan melanggar peraturan peruntukan jalan umum.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena undang-undang lalu lintas menetapkan fasilitas zebra cross untuk melindungi keselamatan pejalan kaki dan pengendara.",
        good: true,
        feedback:
          "Tepat sekali! Mematuhi rambu resmi adalah kewajiban hukum demi keselamatan bersama.",
      },
      {
        id: "r2",
        label:
          "Karena zebra cross hanya boleh digunakan jika sedang ada polisi yang menyeberangkan.",
        good: false,
        feedback:
          "Fasilitas penyeberangan resmi berlaku setiap saat sebagai jalur keselamatan yang sah.",
      },
      {
        id: "r3",
        label: "Karena melompati pagar jalan lebih seru dan menguji keberanian anak sekolah.",
        good: false,
        feedback:
          "Keberanian sejati adalah berani disiplin dan mematuhi aturan hukum keselamatan jiwa.",
      },
      {
        id: "r4",
        label: "Karena pejalan kaki tidak terikat oleh peraturan perundang-undangan lalu lintas.",
        good: false,
        feedback:
          "Seluruh pengguna jalan, termasuk pejalan kaki, wajib menaati aturan keselamatan hukum jalan raya.",
      },
    ],
    principleKeywords: [
      "zebra cross",
      "aturan",
      "hukum",
      "keselamatan",
      "tertib",
      "rambu",
      "pengendara",
    ],
    normExplanation:
      "Norma hukum lalu lintas dibuat negara untuk menjamin keselamatan raga seluruh masyarakat di jalan raya.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
  {
    id: 4,
    key: "4-2",
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "City Walk Slamet Riyadi Surakarta",
    title: "Menjaga Ketertiban Jalur Sepeda",
    image: lalulintas,
    goodImage: lalulintas,
    scene: "🚲 🛤️ ⚽ 🛡️",
    hint: "Jalur sepeda memiliki marka rambu khusus dari pemerintah. Jalan raya bukan arena bermain sepak bola.",
    challenge:
      "Bandingkan bermain di lapangan taman yang aman dengan bermain di jalur lalu lintas sepeda. Jelaskan konsekuensi hukum jika terjadi kecelakaan.",
    question:
      "Kamu sedang berjalan di City Walk Slamet Riyadi Surakarta di samping jalur khusus sepeda. Temanmu ingin menendang bola sepak di tengah jalur sepeda tersebut. Apa yang perlu kamu lakukan?",
    actions: [
      {
        id: "a",
        emoji: "⚽",
        label:
          "Mengajak teman bermain bola di taman kota terdekat yang aman dan tidak menghalangi jalur sepeda.",
        correct: true,
        consequence:
          "Pesepeda dapat melaju dengan lancar dan aman, serta kalian dapat bermain dengan leluasa tanpa risiko kecelakaan.",
      },
      {
        id: "b",
        emoji: "🏃",
        label: "Ikut bermain bola di jalur sepeda karena menganggap pesepeda bisa menghindar.",
        correct: false,
        consequence:
          "Bola mengenai roda sepeda, pesepeda terjatuh luka-luka, dan kalian bertanggung jawab atas kecelakaan itu.",
      },
      {
        id: "c",
        emoji: "🎒",
        label: "Menumpuk tas sekolah di tengah jalur sepeda sebagai tiang gawang.",
        correct: false,
        consequence:
          "Merintangi fasilitas publik yang melanggar aturan ketertiban umum dan membahayakan pengguna jalan.",
      },
      {
        id: "d",
        emoji: "🚲",
        label: "Mendorong teman yang lewat agar terjatuh ke jalur kendaraan bermotor.",
        correct: false,
        consequence:
          "Tindakan pidana berbahaya yang mengancam nyawa orang lain dan dapat dikenai sanksi hukum berat.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena fasilitas jalur sepeda diatur oleh peraturan daerah untuk keselamatan pesepeda dan tidak boleh disalahgunakan.",
        good: true,
        feedback:
          "Tepat sekali! Memanfaatkan fasilitas umum sesuai peruntukannya adalah kewajiban hukum setiap warga negara.",
      },
      {
        id: "r2",
        label:
          "Karena pejalan kaki dan anak-anak berhak memakai semua jalur jalan raya tanpa batas.",
        good: false,
        feedback:
          "Setiap jalur lalu lintas memiliki peruntukan resmi yang diatur hukum demi keselamatan bersama.",
      },
      {
        id: "r3",
        label: "Karena pesepeda yang melintas harus selalu mengalah pada anak yang bermain bola.",
        good: false,
        feedback:
          "Jalur sepeda dibuat khusus untuk mobilitas pesepeda, bukan tempat rekreasi bermain bola.",
      },
      {
        id: "r4",
        label: "Karena aturan ketertiban umum hanya berlaku di jalan tol saja.",
        good: false,
        feedback:
          "Peraturan ketertiban umum berlaku di seluruh wilayah kota demi kenyamanan seluruh warga.",
      },
    ],
    principleKeywords: [
      "aturan",
      "jalur",
      "sepeda",
      "keselamatan",
      "fasilitas",
      "ketertiban",
      "hukum",
    ],
    normExplanation:
      "Norma hukum mengatur peruntukan sarana publik agar setiap warga negara dapat beraktivitas secara tertib dan aman.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
  {
    id: 4,
    key: "4-3",
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "Mobil antar jemput sekolah",
    title: "Sabuk Pengaman Mobil Antar Jemput",
    image: lalulintas,
    goodImage: lalulintas,
    scene: "🚗 🪢 ✅ 🛡️",
    hint: "Undang-Undang Lalu Lintas mewajibkan penggunaan sabuk keselamatan bagi seluruh penumpang mobil.",
    challenge:
      "Seorang teman merasa risih memakai sabuk pengaman karena jarak sekolah dekat. Kalimat ajakan bijak apa yang dapat meyakinkannya?",
    question:
      "Kamu dan kawan-kawan menaiki mobil antar jemput sekolah. Sopir hendak menyalakan mesin kendaraan, namun ada teman yang enggan mengunci sabuk pengaman karena merasa perjalanannya dekat. Apa sikap yang benar?",
    actions: [
      {
        id: "a",
        emoji: "🪢",
        label:
          "Memasang sabuk pengaman sendiri dan mengajak teman mengunci sabuk pengamannya demi keselamatan bersama.",
        correct: true,
        consequence:
          "Semua penumpang terlindungi aman saat mobil mengerem mendadak dan mematuhi undang-undang keselamatan transportasi.",
      },
      {
        id: "b",
        emoji: "🤸",
        label:
          "Ikut melepas sabuk pengaman dan berdiri di antara kursi mobil saat mobil mulai melaju.",
        correct: false,
        consequence:
          "Sangat berbahaya jika mobil berbelok tajam atau mengerem mendadak, tubuh dapat terlempar dan terluka parah.",
      },
      {
        id: "c",
        emoji: "🚪",
        label: "Membuka kunci pintu mobil saat mobil sedang melaju untuk merasakan hembusan angin.",
        correct: false,
        consequence:
          "Perbuatan ceroboh yang sangat berbahaya dan melanggar standar keselamatan transportasi.",
      },
      {
        id: "d",
        emoji: "🤷",
        label: "Mengejek teman yang patuh memakai sabuk pengaman sebagai anak penakut.",
        correct: false,
        consequence:
          "Mendorong orang lain melanggar hukum keselamatan adalah perilaku yang keliru.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena mematuhi aturan sabuk keselamatan adalah kewajiban hukum untuk mencegah cedera fatal saat terjadi insiden di jalan.",
        good: true,
        feedback:
          "Sangat cerdas! Keselamatan adalah hal utama yang dilindungi secara tegas oleh norma hukum.",
      },
      {
        id: "r2",
        label:
          "Karena sabuk pengaman hanya wajib dipasang jika mobil melewati depan kantor polisi.",
        good: false,
        feedback:
          "Kecelakaan dapat terjadi di mana saja tanpa menunggu ada polisi. Aturan hukum berlaku sepanjang waktu.",
      },
      {
        id: "r3",
        label: "Karena perjalanan jarak dekat dijamin bebas dari segala macam marabahaya di jalan.",
        good: false,
        feedback:
          "Bahaya lalu lintas tidak ditentukan oleh jarak tempuh. Kewaspadaan hukum harus selalu dijaga.",
      },
      {
        id: "r4",
        label: "Karena sabuk pengaman dipasang hanya agar mobil tampak mewah.",
        good: false,
        feedback:
          "Sabuk pengaman adalah perangkat keselamatan resmi berstandar hukum dunia otomotif.",
      },
    ],
    principleKeywords: [
      "sabuk",
      "keselamatan",
      "aturan",
      "hukum",
      "penumpang",
      "mobil",
      "lindungi",
    ],
    normExplanation:
      "Norma hukum mewajibkan penggunaan perangkat keselamatan demi meminimalisasi risiko kecelakaan bagi semua pengguna kendaraan.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
  {
    id: 4,
    key: "4-4",
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "Jalan menuju sekolah",
    title: "Helm Berstandar Sebelum Berangkat",
    image: lalulintas,
    goodImage: lalulintas,
    scene: "🏍️ ⛑️ ✅ 🛡️",
    hint: "Undang-Undang Lalu Lintas mewajibkan pengendara dan penumpang sepeda motor mengenakan helm SNI yang terkunci klik.",
    challenge:
      "Bandingkan membawa helm hanya di cantelan motor versus mengenakannya dengan benar di kepala. Analisis akibat hukum dan fisiknya bila terjadi senggolan di jalan.",
    question:
      "Kamu diantar kakak ke sekolah menaiki sepeda motor. Kakak menyodorkan helm anak berstandar SNI, namun buru-buru ingin langsung tancap gas sebelum helmmu terpasang dan berbunyi klik. Apa tindakan yang tepat?",
    actions: [
      {
        id: "a",
        emoji: "⛑️",
        label:
          "Meminta kakak menunggu sejenak, lalu memakai dan mengunci tali helm dengan benar hingga berbunyi 'klik' sebelum melaju.",
        correct: true,
        consequence:
          "Kepalamu terlindungi maksimal sesuai standar undang-undang keselamatan dan perjalanan ke sekolah berlangsung aman.",
      },
      {
        id: "b",
        emoji: "💨",
        label: "Membiarkan helm dipegang di tangan saja agar tidak merusak tatanan rambut.",
        correct: false,
        consequence:
          "Helm di tangan tidak melindungi kepala dari benturan dan merupakan pelanggaran hukum lalu lintas yang nyata.",
      },
      {
        id: "c",
        emoji: "🛵",
        label: "Menyuruh kakak mengebut melanggar lampu merah agar tidak terlambat masuk gerbang.",
        correct: false,
        consequence:
          "Pelanggaran hukum ganda yang sangat membahayakan nyawa kalian dan pengguna jalan lainnya.",
      },
      {
        id: "d",
        emoji: "🙈",
        label:
          "Meninggalkan helm di rumah karena mengira anak SD tidak akan terkena sanksi hukum lalu lintas.",
        correct: false,
        consequence:
          "Anak-anak sangat rentan cedera di jalan raya dan aturan hukum melindungi semua pembonceng sepeda motor.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena memakai helm berstandar SNI adalah aturan hukum wajib untuk melindungi kepala dan keselamatan nyawa di jalan raya.",
        good: true,
        feedback:
          "Tepat dan mantap! Disiplin memakai helm melindungi aset paling berharga yaitu keselamatan diri kita.",
      },
      {
        id: "r2",
        label: "Karena helm hanya dipakai sebagai hiasan pelengkap pakaian sekolah.",
        good: false,
        feedback:
          "Fungsi utama helm adalah pelindung kepala berstandar hukum keselamatan transportasi.",
      },
      {
        id: "r3",
        label:
          "Karena aturan helm dibuat hanya untuk mencari keuntungan denda tilang bagi pemerintah.",
        good: false,
        feedback:
          "Aturan hukum keselamatan dirancang oleh negara murni untuk menyelamatkan jiwa rakyatnya.",
      },
      {
        id: "r4",
        label: "Karena naik motor pelan-pelan tidak memerlukan alat keselamatan apa pun.",
        good: false,
        feedback:
          "Risiko benturan di jalan raya bisa berasal dari pengendara lain, sehingga pelindung helm wajib dipakai.",
      },
    ],
    principleKeywords: [
      "helm",
      "SNI",
      "aturan",
      "hukum",
      "keselamatan",
      "motor",
      "nyawa",
      "lalu lintas",
    ],
    normExplanation:
      "Norma hukum lalu lintas menegakkan kewajiban penggunaan helm SNI demi keselamatan dan perlindungan kepala setiap warga.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
  {
    id: 4,
    key: "4-5",
    pos: "Pos 4",
    norma: "Norma Hukum",
    color: "hukum",
    icon: "scale",
    place: "Bantaran Kali Pepe / Bengawan Solo Surakarta",
    title: "Larangan Membuang Sampah ke Sungai",
    image: lalulintas,
    goodImage: lalulintas,
    scene: "🌊 🚯 ♻️ 🛡️",
    hint: "Peraturan Daerah (Perda) secara resmi melarang pembuangan sampah ke sungai dan saluran air karena memicu banjir.",
    challenge:
      "Analisis dampak pembuangan sampah ke sungai bagi warga di hilir. Jelaskan mengapa sanksi hukum diperlukan untuk menegakkan kebersihan lingkungan.",
    question:
      "Dalam kegiatan jalan sehat menyusuri bantaran Kali Pepe Surakarta, seorang teman hendak melemparkan kantong plastik bekas botol minuman ke dalam aliran sungai. Apa tindakan yang tertib aturan?",
    actions: [
      {
        id: "a",
        emoji: "♻️",
        label:
          "Mencegah teman membuang sampah ke sungai dan mengajaknya membawa sampah tersebut ke tempat sampah terdekat.",
        correct: true,
        consequence:
          "Sungai tetap bersih terbebas dari sumbatan banjir, ekosistem air terlindungi, dan kalian mematuhi Peraturan Daerah tentang kebersihan lingkungan.",
      },
      {
        id: "b",
        emoji: "🌊",
        label:
          "Ikut membuang sampah ke sungai karena melihat air sungai sedang mengalir deras ke hilir.",
        correct: false,
        consequence:
          "Sampah menyumbat aliran air, meracuni habitat ikan, mencemari sungai Bengawan Solo, dan melanggar hukum lingkungan.",
      },
      {
        id: "c",
        emoji: "🙈",
        label:
          "Membiarkannya karena menganggap kebersihan sungai adalah urusan petugas kebersihan semata.",
        correct: false,
        consequence:
          "Sikap abai ini membuat pencemaran sungai terus berulang dan merugikan seluruh warga kota.",
      },
      {
        id: "d",
        emoji: "🗑️",
        label: "Mendorong tempat sampah kota ke dalam sungai untuk lelucon.",
        correct: false,
        consequence: "Tindakan perusakan fasilitas umum yang diancam pidana sanksi hukum tegas.",
      },
    ],
    reasons: [
      {
        id: "r1",
        label:
          "Karena peraturan hukum lingkungan melarang pembuangan sampah ke sungai demi mencegah bencana banjir dan menjaga kelestarian air.",
        good: true,
        feedback:
          "Hebat! Kamu peduli lingkungan hidup dan menaati peraturan hukum kebersihan daerah.",
      },
      {
        id: "r2",
        label: "Karena membuang sampah ke sungai lebih praktis daripada mencari tong sampah.",
        good: false,
        feedback:
          "Kemudahan pribadi tidak boleh mengorbankan kelestarian lingkungan dan melanggar peraturan perundang-undangan.",
      },
      {
        id: "r3",
        label:
          "Karena air sungai akan menghanyutkan semua kotoran tanpa menimbulkan dampak apa pun.",
        good: false,
        feedback:
          "Sampah yang terbawa arus akan menumpuk di pintu air, menyebabkan pendangkalan, dan menimbulkan banjir parah.",
      },
      {
        id: "r4",
        label:
          "Karena larangan membuang sampah hanya berlaku bagi pabrik besar, bukan untuk warga.",
        good: false,
        feedback:
          "Undang-Undang dan Perda lingkungan hidup mengikat seluruh warga negara tanpa kecuali.",
      },
    ],
    principleKeywords: [
      "lingkungan",
      "sampah",
      "sungai",
      "banjir",
      "peraturan",
      "hukum",
      "perda",
      "sanksi",
    ],
    normExplanation:
      "Norma hukum lingkungan mewajibkan setiap warga negara menjaga kebersihan sungai dan fasilitas umum dari pencemaran.",
    badge: { name: "Pelindung Ketertiban", emoji: "🛡️" },
  },
];

// Complete Question Bank combining base cases and additional situated cases
export const QUESTION_BANK: NormCase[] = [...CASES, ...ADDITIONAL_CASES];

export function findQuestion(key: string): NormCase | undefined {
  return QUESTION_BANK.find((q) => q.key === key);
}

export function getQuestionsByPos(posId: number): NormCase[] {
  return QUESTION_BANK.filter((q) => q.id === posId);
}

export function selectQuestion(pos: number, previousKey?: string, random = Math.random): NormCase {
  const list = QUESTION_BANK.filter((q) => q.id === pos && q.key !== previousKey);
  if (list.length === 0) {
    return QUESTION_BANK.find((q) => q.id === pos) || CASES[pos - 1]!;
  }
  return list[Math.floor(random() * list.length)] ?? list[0]!;
}

export function prepareQuestion(c: NormCase, path: LearningPath, slots: number[]) {
  return {
    key: c.key ?? `${c.id}-0`,
    path,
    actionOrder: balancedOrder(c.actions, slots).map((a) => a.id),
    reasonOrder: balancedOrder(c.reasons, []).map((r) => r.id),
  };
}
