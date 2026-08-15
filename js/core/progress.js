/* ================================================================
 * progress.js —— 学习进度系统（答题驱动）
 * ----------------------------------------------------------------
 * 存储（localStorage）：
 *   kb:ans:<qid>       → { pick, correct, ts }    单题作答记录
 *   kb:wrong           → [qid, ...]                错题引用
 *   kb:master          → [blockId, ...]            手动标记已掌握的考点块
 * 能力：
 *   1. 记录作答（renderer 判分时回调 recordAnswer）
 *   2. 章掌握度聚合：quizChapterFor 各章答题情况 → done/right/total
 *   3. 错题本：收集错题 qid，提供错题卷数据（重做答对自动移出）
 *   4. 考点块三态标记（已掌握/存疑/未标记）
 * ================================================================ */
window.KB_PROGRESS = (function(){
  'use strict';

  const KEY_ANS = 'kb:ans:';      /* 前缀：每题一条 */
  const KEY_WRONG = 'kb:wrong';
  const KEY_MASTER = 'kb:master';

  function read(k, dft){
    try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : dft; }
    catch(e){ return dft; }
  }
  function write(k, v){
    try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){}
  }

  /* ---- 作答记录 ---- */
  function getAnswer(qid){ return read(KEY_ANS+qid, null); }
  function recordAnswer(qid, pick, correct){
    write(KEY_ANS+qid, { pick, correct, ts: Date.now() });
    let wrong = read(KEY_WRONG, []);
    if(correct){
      const i = wrong.indexOf(qid);
      if(i >= 0){ wrong.splice(i,1); write(KEY_WRONG, wrong); }
    } else if(wrong.indexOf(qid) < 0){
      wrong.push(qid); write(KEY_WRONG, wrong);
    }
  }

  /* ---- 题目索引：qid → { file, chapter, block, question, qIndex } ---- */
  let qIndex = null;
  function buildIndex(){
    qIndex = {};
    KB.listFiles().forEach(file=>{
      (file.chapters||[]).forEach(ch=>{
        (ch.blocks||[]).forEach(b=>{
          if(b.type!=='quiz' || !b.questions) return;
          b.questions.forEach((q,i)=>{
            if(q.qid) qIndex[q.qid] = { file, chapter:ch, block:b, question:q, qIndex:i };
          });
        });
      });
    });
  }
  function lookup(qid){
    if(!qIndex) buildIndex();
    return qIndex[qid] || null;
  }

  /* ---- 章掌握度：某教材文件的章 → { done, right, total } ---- */
  function chapterStats(bookId, num){
    const qch = KB.quizChapterFor(bookId, num);
    if(!qch) return null;
    let done=0, right=0, total=0;
    (qch.blocks||[]).forEach(b=>{
      (b.questions||[]).forEach(q=>{
        if(!q.qid) return;
        total++;
        const a = getAnswer(q.qid);
        if(a){ done++; if(a.correct) right++; }
      });
    });
    return { done, right, total };
  }

  /* ---- 错题本 ---- */
  function wrongQids(){ return read(KEY_WRONG, []); }
  function wrongList(){
    return wrongQids().map(lookup).filter(Boolean);
  }

  /* ---- 考点块掌握标记（三态：null → master → doubt → null） ---- */
  function masters(){ return read(KEY_MASTER, []); }
  function markBlock(blockId, state){  /* state: 'master' | 'doubt' | null */
    let m = read(KEY_MASTER, []);
    let d = read('kb:doubt', []);
    m = m.filter(id=>id!==blockId);
    d = d.filter(id=>id!==blockId);
    if(state==='master') m.push(blockId);
    if(state==='doubt') d.push(blockId);
    write(KEY_MASTER, m);
    write('kb:doubt', d);
  }
  function blockState(blockId){
    if(read(KEY_MASTER, []).indexOf(blockId)>=0) return 'master';
    if(read('kb:doubt', []).indexOf(blockId)>=0) return 'doubt';
    return null;
  }

  /* 清空全部进度 */
  function resetAll(){
    try{
      const keys = [];
      for(let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if(k && k.indexOf('kb:')===0) keys.push(k);
      }
      keys.forEach(k=>localStorage.removeItem(k));
    }catch(e){}
    qIndex = null;
  }

  return { recordAnswer, getAnswer, lookup, chapterStats, wrongQids, wrongList,
           markBlock, blockState, masters, resetAll };
})();
