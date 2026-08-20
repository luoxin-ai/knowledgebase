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
    /* 遗忘曲线调度：错题答对升级 stage（1→3→7→15 天），15 天档答对即移出错题本（掌握）；
       答错重置 stage=1。老数据无 stage 的错题首次答对视为 stage 1。 */
    const prev = getAnswer(qid);
    let stage = 1;
    if(prev && prev.stage){
      stage = correct ? Math.min(prev.stage + 1, REVIEW_INTERVALS.length) : 1;
    }
    write(KEY_ANS+qid, { pick, correct, ts: Date.now(), stage });
    let wrong = read(KEY_WRONG, []);
    if(correct){
      const i = wrong.indexOf(qid);
      /* 连续答对到最高档才移出错题本 */
      if(i >= 0 && stage >= REVIEW_INTERVALS.length){ wrong.splice(i,1); write(KEY_WRONG, wrong); }
    } else if(wrong.indexOf(qid) < 0){
      wrong.push(qid); write(KEY_WRONG, wrong);
    }
  }

  /* ---- 遗忘曲线复习调度（简化 SM2：1/3/7/15 天间隔重推） ---- */
  const REVIEW_INTERVALS = [1, 3, 7, 15];
  function daysToNextMs(a){
    const days = a && a.stage ? (REVIEW_INTERVALS[a.stage-1] || 15) : 1;
    return days * 86400000;
  }
  /* 某题当前是否到期应复习（仅针对错题本中的题） */
  function isDue(qid){
    const wrong = read(KEY_WRONG, []);
    if(wrong.indexOf(qid) < 0) return false;
    const a = getAnswer(qid);
    if(!a || !a.ts) return true;   /* 老数据无时间戳，视为到期 */
    return Date.now() >= a.ts + daysToNextMs(a);
  }
  /* 全部到期错题（供"今日待复习"入口） */
  function dueList(){
    return read(KEY_WRONG, []).filter(isDue).map(lookup).filter(Boolean);
  }
  /* 计数与 dueList 同口径：只统计能查到的到期错题，避免孤儿 qid 造成数字虚高 */
  function dueCount(){
    return read(KEY_WRONG, []).filter(isDue).map(lookup).filter(Boolean).length;
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
    pruneOrphans();
  }
  /* 清理孤儿错题 qid：模块删除/重构改名（如词汇模块移除、习思想拆分）后，
     kb:wrong 里残留的 qid 无法 lookup，会造成「计数有、页面空」的幽灵错题。
     仅当索引就绪时调用，避免误删。 */
  function pruneOrphans(){
    const wrong = read(KEY_WRONG, []);
    if(!wrong.length) return;
    const keep = wrong.filter(qid => !!qIndex[qid]);
    if(keep.length !== wrong.length) write(KEY_WRONG, keep);
  }
  function lookup(qid){
    if(!qIndex) buildIndex();
    return qIndex[qid] || null;
  }

  /* ---- 章掌握度：某教材文件的章 → { done, right, total } ---- */
  function chapterStats(bookId, num){
    /* 审计 M1：改用复数 quizChaptersFor，覆盖「单选+多选」等多个习题文件命中的章节，
       与渲染端 renderChapter 口径一致；原 quizChapterFor 只取首个，双习题科(如马原)题量对不上 */
    const qchs = KB.quizChaptersFor(bookId, num);
    if(!qchs.length) return null;
    let done=0, right=0, total=0;
    qchs.forEach(qch=>{
      (qch.blocks||[]).forEach(b=>{
        (b.questions||[]).forEach(q=>{
          if(!q.qid) return;
          total++;
          const a = getAnswer(q.qid);
          if(a){ done++; if(a.correct) right++; }
        });
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
           markBlock, blockState, masters, resetAll,
           isDue, dueList, dueCount, REVIEW_INTERVALS };
})();
