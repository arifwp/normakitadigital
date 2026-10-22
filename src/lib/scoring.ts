import type { NormCase } from './cases';
export const MAX_STARS=4;
export const BADGE_MIN_STARS=3;
export type TeacherReview={reason:boolean;consequence:boolean;note:string};
export type ScoreResult={actionStar:0|1;reasonStars:0|2;extraStar:0|1;total:number;needsClarify:boolean;feedback:string[];pendingReview?:boolean};
// Open-ended writing is never scored by keywords. A teacher reviews its meaning.
export function scoreCase(c:NormCase,actionId:string,reasonId:string|null,writtenText='',review?:TeacherReview):ScoreResult{
 const action=c.actions.find(a=>a.id===actionId),reason=c.reasons.find(r=>r.id===reasonId);
 const actionStar=action?.correct?1:0;
 const reasonStars=reason?.good||review?.reason?2:0;
 const extraStar=review?.consequence?1:0;
 const pendingReview=writtenText.trim().length>0&&!review;
 return {actionStar,reasonStars,extraStar,total:actionStar+reasonStars+extraStar,needsClarify:false,pendingReview,feedback:[actionStar?'Pilihanmu tepat!':'Coba bandingkan lagi: siapa yang dirugikan oleh pilihan ini?',reason?.feedback??'Jelaskan alasanmu bersama guru.',...(pendingReview?['Tulisanmu tersimpan untuk ditinjau guru. Belum diberi nilai, bukan berarti salah.']:[]),...(review?.note?[review.note]:[])]};
}
