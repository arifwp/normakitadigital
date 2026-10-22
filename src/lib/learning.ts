export type LearningPath = 'bintang' | 'bulan' | 'matahari';
export const PATHS = {
 bintang: { name: 'Bintang', icon: '⭐', title: 'Misi Mengenali Norma', help: 'Amati gambar, ikuti petunjuk, lalu coba lagi.' },
 bulan: { name: 'Bulan', icon: '🌙', title: 'Misi Memahami dan Menerapkan Norma', help: 'Pilih tindakan, kenali norma, dan jelaskan akibatnya.' },
 matahari: { name: 'Matahari', icon: '☀️', title: 'Misi Menganalisis dan Menyelesaikan Kasus Norma', help: 'Bandingkan solusi dan pikirkan dampaknya bagi semua pihak.' },
} satisfies Record<LearningPath, {name:string; icon:string;title:string;help:string}>;
export type Evidence = { questionKey: string; actionCorrect: boolean; reasonCorrect: boolean; normCorrect: boolean; reviewed: boolean; consequence: boolean; path: LearningPath };
export function recommendDiagnostic(answers: boolean[]): LearningPath {
 const score = answers.filter(Boolean).length;
 return score >= 7 ? 'matahari' : score >= 4 ? 'bulan' : 'bintang';
}
export function recommendDevelopment(path: LearningPath, evidence: Evidence[]): LearningPath | null {
 const unique = new Map<string,Evidence>();
 evidence.filter(e=>e.path===path).forEach(e=>unique.set(e.questionKey,e));
 const recent=Array.from(unique.values()).slice(-3);
 if(recent.length<3) return null;
 const understanding=recent.filter(e=>e.actionCorrect&&e.normCorrect).length;
 const reasoning=recent.filter(e=>e.reasonCorrect).length;
 if(understanding===3&&reasoning===3) {
  if(path==='bintang') return 'bulan';
  if(path==='bulan'&&recent.filter(e=>e.reviewed&&e.consequence).length>=2) return 'matahari';
 }
 if(understanding<=1) return path==='matahari'?'bulan':path==='bulan'?'bintang':null;
 return null;
}
export function shuffle<T>(items: readonly T[], random= Math.random): T[] {
 const copy=[...items];
 for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1)); const a=copy[i], b=copy[j]; if(a!==undefined&&b!==undefined){copy[i]=b;copy[j]=a;}}
 return copy;
}
export function balancedOrder<T extends {id:string;correct?:boolean;good?:boolean}>(items:T[], previousSlots:number[], random=Math.random):T[]{
 const good=items.find(i=>i.correct||i.good); if(!good) return shuffle(items,random);
 const counts=Array.from({length:4},(_,i)=>previousSlots.filter(s=>s===i).length);
 const min=Math.min(...counts);
 const candidates=counts.map((v,i)=>({v,i})).filter(s=>s.v===min);
 const slot=candidates[Math.floor(random()*candidates.length)]?.i??0;
 const out=shuffle(items.filter(i=>i.id!==good.id),random); out.splice(slot,0,good); return out;
}
export const NORMA_NAMES=['Norma Agama','Norma Kesusilaan','Norma Kesopanan','Norma Hukum'];
export const DIAGNOSTIC = [
 {id:'d1',q:'Menghormati teman yang sedang beribadah berkaitan dengan norma apa?', options:NORMA_NAMES,correct:0},
 {id:'d2',q:'Kamu menemukan pensil berlabel nama. Apa tindakan yang tepat?',options:['Menyimpannya diam-diam','Mengembalikan kepada pemilik','Membuangnya','Meminjamkan tanpa izin'],correct:1},
 {id:'d3',q:'Saat orang lain berbicara, sikap yang santun adalah…',options:['Memotong pembicaraan','Mengejek','Mendengarkan hingga selesai','Berteriak'],correct:2},
 {id:'d4',q:'Mengapa kita mematuhi lampu penyeberangan?',options:['Agar terlihat berani','Hanya karena ada polisi','Agar lebih cepat','Untuk menjaga keselamatan semua orang'],correct:3},
 {id:'d5',q:'Temanmu beribadah dengan cara berbeda. Bagaimana sikapmu?',options:['Menghormati tanpa memaksakan keyakinan','Menyuruh mengikuti caraku','Menertawakan','Mengganggunya'],correct:0},
 {id:'d6',q:'Mengakui kesalahan meskipun tidak ada yang melihat mengikuti…',options:['Keinginan menang sendiri','Hati nurani yang jujur','Perintah untuk mengejek','Kebiasaan menyerobot'],correct:1},
 {id:'d7',q:'Apa akibatnya jika semua murid menyerobot antrean?',options:['Semua mendapat giliran adil','Antrean lebih nyaman','Antrean kacau dan teman dirugikan','Tidak ada perubahan'],correct:2},
 {id:'d8',q:'Sabuk pengaman belum terpasang. Apa tindakan yang bertanggung jawab?',options:['Tetap berdiri','Memakai setelah sampai','Melepas agar bebas','Memasang sebelum mobil berjalan'],correct:3},
];
export const FINAL_QUESTIONS = [
 {id:'f1',q:'Teman membutuhkan waktu beribadah sebelum latihan. Solusi yang menghormati semua adalah…',options:['Mengatur waktu latihan bersama','Melarang beribadah','Mengejeknya','Memaksa ikut latihan'],correct:0},
 {id:'f2',q:'Kamu merusakkan alat kelas tanpa sengaja. Langkah yang jujur adalah…',options:['Menyembunyikannya','Mengakui dan membantu memperbaiki','Menyalahkan teman','Pergi saja'],correct:1},
 {id:'f3',q:'Dua teman berbeda pendapat. Apa yang mendukung musyawarah santun?',options:['Memotong pendapat','Berteriak','Mendengarkan dan membandingkan alasan','Mengejek pilihan'],correct:2},
 {id:'f4',q:'Mengapa peraturan lalu lintas tetap perlu ditaati tanpa polisi?',options:['Supaya bisa berlomba','Hanya kebiasaan','Tidak perlu ditaati','Karena keselamatan semua orang tetap penting'],correct:3},
];
