/* ================================================================
 * test/smoke.test.js —— 回归冒烟测试
 * ----------------------------------------------------------------
 * 无 DOM 依赖的 Node 环境：mock 掉 document/canvas，
 * 按 index.html 的加载顺序装载全部 JS，验证：
 *   1. 注册表：文件夹 / 文件 / 块结构完整性
 *   2. 渲染管线：每章可渲染出 block HTML
 *   3. 动画引擎：19 类动画可实例化、步进到完成、模式切换正确
 *   4. 数据正确性：排序结果有序、KMP 命中位置正确
 *   5. 文档数字：README 题数/块数/分布与实况一致（防漂移）
 * 运行：node test/smoke.test.js
 * ================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

/* ---------------- mock 环境 ---------------- */
function makeCtx(){
  return new Proxy({}, {
    get(t, p){
      if(typeof p === 'symbol') return undefined;
      if(p in t) return t[p];
      t[p] = function(){};
      return t[p];
    },
    set(t, p, v){ t[p] = v; return true; }
  });
}
function makeEl(id){
  const classes = new Set();
  return {
    id, dataset: {}, style: {}, _innerHTML: '', textContent: '',
    classList: {
      add: c=>classes.add(c), remove: c=>classes.delete(c),
      toggle: (c,f)=>{ if(f===undefined){ classes.has(c)?classes.delete(c):classes.add(c); } else { f?classes.add(c):classes.delete(c); } },
      contains: c=>classes.has(c)
    },
    set innerHTML(v){ this._innerHTML = v; },
    get innerHTML(){ return this._innerHTML; },
    getBoundingClientRect(){ return { width: 680, height: 300, top: 120, left: 0 }; },
    querySelectorAll(){ return []; }, querySelector(){ return null; },
    closest(){ return null; },
    addEventListener(){}, removeEventListener(){},
    appendChild(){}, removeChild(){}, scrollIntoView(){}, select(){},
    setAttribute(){}, getAttribute(){ return null; }
  };
}
function makeCanvasEl(id){
  const el = makeEl(id);
  el.parentElement = makeEl(id+'-parent');
  el.getContext = ()=>makeCtx();
  return el;
}

const els = {};
const doc = {
  getElementById(id){
    if(!els[id]) els[id] = String(id).startsWith('canvas-') ? makeCanvasEl(id) : makeEl(id);
    return els[id];
  },
  createElement(){ return makeEl('dyn'); },
  querySelectorAll(){ return []; }, querySelector(){ return null; },
  addEventListener(){}, removeEventListener(){},
  body: makeEl('body'),
  documentElement: { scrollHeight: 1000 },
  execCommand(){ return true; }
};

global.window = global;
global.devicePixelRatio = 1;
global.performance = { now: ()=>Date.now() };
global.requestAnimationFrame = ()=>{ return 0; };
global.cancelAnimationFrame = ()=>{};
global.scrollTo = ()=>{};
Object.defineProperty(global, 'navigator', { value: { clipboard: null }, configurable: true, writable: true });
global.document = doc;

/* ---------------- 按 index.html 顺序装载 ---------------- */
const ROOT = path.join(__dirname, '..');
const files = [
  'js/core/registry.js',
  'data/11408/_index.js', 'data/11408/data-structure.js',
  'data/11408/quiz-ds-a.js', 'data/11408/quiz-ds-b.js',
  'data/11408/quiz-co.js', 'data/11408/quiz-os.js', 'data/11408/quiz-cn.js',
  'data/11408/quiz-hm.js', 'data/11408/quiz-la.js', 'data/11408/quiz-prob.js',
  'data/11408/computer-org.js', 'data/11408/operating-system.js', 'data/11408/computer-network.js',
  'data/11408/higher-math.js', 'data/11408/linear-algebra.js', 'data/11408/probability.js',
  'data/politics/_index.js', 'data/politics/maoyuan.js',
  'data/politics/quiz-maoyuan-single.js', 'data/politics/quiz-maoyuan-multi.js',
  'data/politics/maozedong.js', 'data/politics/quiz-maozedong-single.js', 'data/politics/quiz-maozedong-multi.js',
  'data/politics/sixiang.js', 'data/politics/quiz-sixiang-single.js', 'data/politics/quiz-sixiang-multi.js',
  'data/politics/shigang.js', 'data/politics/quiz-shigang-single.js', 'data/politics/quiz-shigang-multi.js',
  'data/politics/sixiu.js', 'data/politics/quiz-sixiu-single.js', 'data/politics/quiz-sixiu-multi.js',
  'data/english/_index.js', 'data/english/writing.js',
  'data/english/reading-simu.js',
  'data/english/cloze.js', 'data/english/newtype.js', 'data/english/translation.js',
  'js/core/markup.js', 'js/core/highlight.js', 'js/core/renderer.js',
  'js/core/sidebar.js', 'js/core/search.js',
  'js/core/progress.js',
  'js/animations/base.js', 'js/animations/sort.js', 'js/animations/tree.js',
  'js/animations/graph.js', 'js/animations/huffman.js', 'js/animations/kmp.js',
  'js/animations/os.js', 'js/animations/network.js', 'js/animations/extra.js',
  'js/animations/factory.js', 'js/core/app.js'
];
for(const f of files){
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  (0, eval)(code); // eslint-disable-line no-eval
}
/* 内存 localStorage（progress.js 需要） */
const _mem = {};
global.localStorage = {
  getItem: k=>Object.prototype.hasOwnProperty.call(_mem,k) ? _mem[k] : null,
  setItem: (k,v)=>{ _mem[k]=String(v); },
  removeItem: k=>{ delete _mem[k]; },
  get length(){ return Object.keys(_mem).length; },
  key: i=>Object.keys(_mem)[i] || null
};
/* progress.js 在 localStorage 之前装载会静默失败（read/write 包了 try-catch），
   这里重新装载一次保证 KB_PROGRESS 就绪 */
(0, eval)(fs.readFileSync(path.join(ROOT, 'js/core/progress.js'), 'utf8'));

let passed = 0, failed = 0;
function ok(name, cond, extra){
  if(cond){ passed++; console.log('  ✔ ' + name); }
  else { failed++; console.error('  ✘ ' + name + (extra!==undefined ? '  → ' + JSON.stringify(extra) : '')); }
}

/* ---------------- 1. 注册表结构 ---------------- */
console.log('\n[1] 注册表结构');
const folderIds = KB.listFolders().map(f=>f.id).sort();
ok('文件夹注册：11408/408/math/politics/english', JSON.stringify(folderIds) === JSON.stringify(['11408','408','english','math','politics']), folderIds);
const roots = KB.rootFolders().map(f=>f.id).sort();
ok('顶层目录：仅 11408', JSON.stringify(roots) === JSON.stringify(['11408']), roots);
const subs = KB.childFolders('11408').map(f=>f.id).sort();
ok('11408 下 4 个子科目：408 + math + politics + english', JSON.stringify(subs) === JSON.stringify(['408','english','math','politics']), subs);
ok('math 标题为 301 数学一', KB.getFolder('math').title === '301 数学一', KB.getFolder('math').title);
ok('politics/english 挂在 11408 下', KB.getFolder('politics').parent==='11408' && KB.getFolder('english').parent==='11408');
const fileIds = KB.listFiles().map(f=>f.id).sort();
ok('文件注册：35 个文件', fileIds.length===35, fileIds);
ok('侧边栏可见 17 个文件（习题 hidden）', KB.listVisibleFiles().length === 17, KB.listVisibleFiles().length);
ok('408 科目含 4 个可见文件（四门课）', KB.filesInFolder('408').length === 4);
ok('math 科目含 3 个文件（高数/线代/概率）', KB.filesInFolder('math').length === 3);
ok('folderContainsActive 向上识别祖先', (function(){
  KB.setActiveFile('ds');
  const r = KB.folderContainsActive('408') && KB.folderContainsActive('11408') && !KB.folderContainsActive('math');
  KB.setActiveFile(null);
  return r;
})());

/* ---------------- 2. 块数据完整性 ---------------- */
console.log('\n[2] 块数据完整性');
const all = KB.allBlocks();
ok('全库块数量 ≥ 60', all.length >= 60, all.length);
const typeSet = [...new Set(all.map(x=>x.block.type))].sort();
ok('可见块类型集合（vocab/reading 直接以 quiz 块入库）', JSON.stringify(typeSet) === JSON.stringify(['animation','code','concept','error','formula','keypoint','quiz','table']), typeSet);
let bad = 0;
for(const {block} of all){ if(!block.title || !block.type) bad++; }
ok('每块都有 title + type', bad === 0, bad);
/* 习题块数据校验（hidden 文件不入 allBlocks，直接从注册表取）：
   408+数学 8 个 quiz 文件共 900 题;每题 4 选项、answer ∈ abcd、解析含「故选X」 */
const quizIds = ['quiz-ds-a','quiz-ds-b','quiz-co','quiz-os','quiz-cn','quiz-hm','quiz-la','quiz-prob'];
const quizQs = quizIds
  .map(id => KB.getFile(id))
  .filter(Boolean)
  .flatMap(f => f.chapters)
  .flatMap(ch => ch.blocks)
  .filter(b => b.type==='quiz')
  .flatMap(b => b.questions||[]);
ok('408+数学习题共 960 题', quizQs.length === 960, quizQs.length);
ok('每题 4 个选项', quizQs.every(q=>Array.isArray(q.options) && q.options.length===4));
ok('answer 均为 abcd', quizQs.every(q=>'abcd'.includes(String(q.answer).toLowerCase())));
ok('每题都有解析', quizQs.every(q=>typeof q.explain==='string' && q.explain.length>=8));
ok('每题都有稳定 qid', quizQs.every(q=>typeof q.qid==='string' && q.qid.length>=6));
ok('qid 无重复', new Set(quizQs.map(q=>q.qid)).size === quizQs.length);
/* 解析中「选 X」与 answer 一致（拦截誊写错位）。
   只认肯定的「选 X」，排除「错选/误选/会选/而选/就选」等否定或假设表述 */
const mism = [];
quizQs.forEach((q,i)=>{
  const hits = String(q.explain).match(/(?:^|[^错误会就力而])选\s*([A-Da-d])/g);
  if(hits && hits.length){
    const last = hits[hits.length-1].match(/([A-Da-d])\s*$/)[1].toLowerCase();
    if(last !== String(q.answer).toLowerCase()) mism.push((i+1)+':'+last+'≠'+q.answer);
  }
});
ok('解析「选X」与 answer 一致', mism.length===0, mism.slice(0,6));
const dist = quizQs.reduce((m,q)=>{ m[q.answer]=(m[q.answer]||0)+1; return m; },{});
const dv = Object.values(dist);
ok('答案分布大致均衡（每种 ≥180）', dv.length===4 && dv.every(n=>n>=180), dist);
/* 章末课后练习映射：全部 7 本教材的每一章都能找到对应习题章 */
const books = [['ds',8],['co',6],['os',5],['cn',6],['hm',8],['la',6],['prob',7]];
const quizMapBad = [];
books.forEach(([bid,n])=>{
  for(let i=1;i<=n;i++){
    const qc = KB.quizChapterFor(bid, i);
    if(!(qc && qc.blocks && qc.blocks.some(b=>b.type==='quiz'))) quizMapBad.push(bid+'-ch'+i);
  }
});
ok('7 本教材 46 章均有课后练习', quizMapBad.length===0, quizMapBad);
/* 政治：马原单选+多选 100 题，多选 multi 校验 */
const myQs = ['quiz-maoyuan-single','quiz-maoyuan-multi']
  .map(id=>KB.getFile(id))
  .filter(Boolean)
  .flatMap(f=>f.chapters)
  .flatMap(c=>c.blocks||[])
  .filter(b=>b.type==='quiz')
  .flatMap(b=>b.questions||[]);
ok('马原习题共 100 题', myQs.length===100, myQs.length);
ok('马原单选无 multi、多选全有 multi 且 answer 合法', myQs.every(q=>{
  const a = String(q.answer||'').toLowerCase();
  if(a.length===1) return !q.multi && /^[a-d]$/.test(a);
  return !!q.multi && /^[a-d]{2,4}$/.test(a) && a===[...a].sort().join('');
}));
const myMap = [1,2,3,4,5,6,7,8].every(n=>{
  const qc = KB.quizChapterFor('maoyuan', n);
  return !qc || (qc.blocks && qc.blocks.some(b=>b.type==='quiz'));
});
ok('马原 8 章习题映射有效', myMap);
ok('搜索数据源不含 hidden 习题', all.every(x=>!x.file.hidden));
/* 新题型：填空/判断 —— 构造四题型块走一遍 renderChapter，验证渲染不炸且标记齐全 */
{
  const tmp = { id:'__typecheck__', folder:'408', type:'book', title:'题型自检', hidden:true,
    chapters:[{ id:'ch1', num:1, title:'题型自检', blocks:[
      { type:'quiz', id:'__tc__', questions:[
        { qid:'__tc-f1__', type:'fill', stem:'1+1=?', answer:['2'], explain:'基础' },
        { qid:'__tc-t1__', type:'tf', stem:'对的事', answer:'t', explain:'对' },
        { qid:'__tc-t2__', type:'tf', stem:'错的事', answer:'f', explain:'错' },
        { qid:'__tc-s1__', stem:'单选', options:['a1','b1','c1','d1'], answer:'b', explain:'故选 B' }
      ]}
    ]}]};
  KB.register(tmp);
  KB_PENDING_ANIMS.length = 0;
  KB.render.renderChapter(tmp, 'ch1', { silent:true });
  const tHtml = doc.getElementById('content')._innerHTML;
  ok('四题型（fill/tf/单选）渲染不炸', typeof tHtml === 'string' && tHtml.length > 0);
  ok('填空题渲染出输入框', tHtml.includes('qz-fill-input'));
  ok('判断题渲染出对/错按钮', tHtml.includes('qz-opt tf'));
  ok('单选题渲染出 ABCD 选项', tHtml.includes('qz-opt'));
  /* 遗忘曲线：档位演进 + 错题本进出 */
  KB_PROGRESS.recordAnswer('__tc-f1__','3',false);
  ok('答错进错题本', KB_PROGRESS.wrongQids().includes('__tc-f1__'));
  ok('刚答完未到期', KB_PROGRESS.isDue('__tc-f1__')===false);
  KB_PROGRESS.recordAnswer('__tc-f1__','2',true);
  ok('答对升档 stage=2', KB_PROGRESS.getAnswer('__tc-f1__').stage===2);
  KB_PROGRESS.recordAnswer('__tc-f1__','2',true);
  KB_PROGRESS.recordAnswer('__tc-f1__','2',true);
  ok('连对到最高档移出错题本', !KB_PROGRESS.wrongQids().includes('__tc-f1__'));
  ok('dueCount 归零', KB_PROGRESS.dueCount()===0);
  /* 孤儿错题清理：模块删除/改名后残留 qid（如已删词汇模块 en-vh-、习思想拆分前的 mzd-）
     不能 lookup 的错题应被自动清理，避免「计数有、页面空」的幽灵错题 */
  localStorage.setItem('kb:wrong', JSON.stringify(['en-vh-1','mzd-s-6', '__tc-f1__']));
  localStorage.setItem('kb:ans:__tc-f1__', JSON.stringify({pick:'a',correct:false,ts:Date.now()-2*86400000}));
  const cnt = KB_PROGRESS.dueCount();
  const left = JSON.parse(localStorage.getItem('kb:wrong'));
  ok('孤儿 qid 被清理且计数一致', cnt===1 && left.length===1 && left[0]==='__tc-f1__', {cnt,left});
  localStorage.setItem('kb:wrong', '[]');
  ok('dueCount 与 dueList 同口径', KB_PROGRESS.dueCount()===KB_PROGRESS.dueList().length);
  /* __typecheck__ 为 hidden 文件，不影响后续断言（listFiles 走 visible 过滤） */
}
/* P8 数据校验：animation 块的 animType 必须在 factory 注册表中 */
const registeredAnims = Object.keys(KB_ANIM.AnimationFactories);
const badAnim = all.filter(x=>x.block.type==='animation' && registeredAnims.indexOf(x.block.animType)<0).map(x=>x.block.animType);
ok('animType 全部已在 factory 注册', badAnim.length===0, badAnim);
/* P8：文件 id 全局唯一 */
const idCounts = {};
KB.listFiles().forEach(f=>{ idCounts[f.id]=(idCounts[f.id]||0)+1; });
ok('文件 id 全局唯一', Object.values(idCounts).every(n=>n===1), idCounts);
const animTypes = all.filter(x=>x.block.type==='animation').map(x=>x.block.animType).sort();
ok('19 类动画数据齐备', JSON.stringify(animTypes) ===
  JSON.stringify(['bubbleSort','cacheMap','graphTraversal','heapSort','huffman','insertionSort','kmp','matrixMul','mergeSort','pageReplace','pipeline','processSchedule','quickSort','radixSort','riemann','selectionSort','shellSort','slidingWindow','treeTraversal']), animTypes);

/* ---------------- 3. 渲染管线 ---------------- */
console.log('\n[3] 渲染管线');
for(const file of KB.listFiles()){
  KB_PENDING_ANIMS.length = 0;
  KB.render.renderChapter(file, file.chapters[0].id, { silent: true });
  const html = doc.getElementById('content')._innerHTML;
  ok(file.id + ' 渲染出章节', html.includes('chapter') && html.includes('class="block'), html.length);
}
/* 全部章节渲染，收集块 id 查重 */
const seen = new Set(); let dup = 0, totalRendered = 0;
for(const file of KB.listFiles()){
  for(const ch of file.chapters){
    KB_PENDING_ANIMS.length = 0;
    KB.render.renderChapter(file, ch.id, { silent: true });
    for(const b of ch.blocks){ totalRendered++; if(seen.has(b.id)) dup++; seen.add(b.id); }
  }
}
ok('全库 ' + totalRendered + ' 块无重复 id', dup === 0, dup);

/* 章末练习区：有习题映射的章节渲染必须含 quiz-section(防止 return 换行 ASI 等回归) */
let quizSecOk = 0, quizSecBad = 0;
for(const file of KB.listFiles()){
  for(const ch of file.chapters){
    const qc = KB.quizChapterFor(file.id, ch.num);
    if(!qc || !(qc.blocks||[]).some(b=>b.type==='quiz')) continue;
    KB_PENDING_ANIMS.length = 0;
    KB.render.renderChapter(file, ch.id, { silent: true });
    const html = doc.getElementById('content')._innerHTML;
    if(html.includes('quiz-section') && html.includes('qz-opt')) quizSecOk++; else quizSecBad++;
  }
}
ok('有习题的章节均渲染出 quiz-section（' + quizSecOk + ' 章）', quizSecBad === 0, quizSecBad);

/* ---------------- 4. 动画引擎 ---------------- */
console.log('\n[4] 动画引擎');
const isSortedAsc = a => { for(let i=1;i<a.length;i++) if(a[i-1]>a[i]) return false; return true; };
const makeCanvas = ()=> doc.getElementById('canvas-test-' + Math.random().toString(36).slice(2));

for(const t of all.filter(x=>x.block.type==='animation')){
  const { block } = t;
  const anim = KB_ANIM.AnimationFactories[block.animType](makeCanvas(), block.animConfig || {});
  ok(block.animType + ' 实例化成功且 steps>0', anim.steps && anim.steps.length > 0, anim.steps && anim.steps.length);
  while(anim.currentStep < anim.steps.length) anim.stepForward();
  const lastDesc = anim.steps[anim.steps.length-1].desc || '';
  const finished = /完成|成功|匹配|有序/.test(lastDesc);
  ok(block.animType + ' 步进到完成', anim.currentStep >= anim.steps.length && finished, lastDesc);
  anim.reset();
  ok(block.animType + ' reset 后回到 0 步', anim.currentStep === 0 && anim.isPlaying === false);
}

/* 排序正确性 */
const sortCases = ['bubbleSort','quickSort','heapSort','mergeSort'];
for(const name of sortCases){
  const anim = KB_ANIM.AnimationFactories[name](makeCanvas(), { data: [5,3,8,1,9,2,7,4,6,0] });
  while(anim.currentStep < anim.steps.length) anim.stepForward();
  const lastArr = anim.steps[anim.steps.length-1].arr;
  ok(name + ' 最终数组有序', isSortedAsc(lastArr), lastArr);
}

/* KMP 命中位置 */
const kmpAnim = KB_ANIM.AnimationFactories.kmp(makeCanvas(), { main:'ABABABCABAB', pattern:'ABABC' });
while(kmpAnim.currentStep < kmpAnim.steps.length) kmpAnim.stepForward();
const hit = kmpAnim.steps.find(s=>s.done && s.match===null);
ok('KMP 命中位置 = 2', hit && hit.start === 2, hit && hit.start);

/* 模式切换：树三种遍历 + 图双模式 */
const treeAnim = KB_ANIM.AnimationFactories.treeTraversal(makeCanvas(), { mode:'preorder' });
for(const mode of ['inorder','postorder']){
  treeAnim.setMode(mode);
  while(treeAnim.currentStep < treeAnim.steps.length) treeAnim.stepForward();
  const vis = treeAnim.steps[treeAnim.steps.length-1].visited;
  ok('treeTraversal['+mode+'] 访问 7 结点', vis && vis.length === 7, vis && vis.length);
}
const graphAnim = KB_ANIM.AnimationFactories.graphTraversal(makeCanvas(), { mode:'bfs' });
graphAnim.setMode('dfs');
while(graphAnim.currentStep < graphAnim.steps.length) graphAnim.stepForward();
const gVis = graphAnim.steps[graphAnim.steps.length-1].visited;
ok('graphTraversal[dfs] 访问 6 结点', gVis && gVis.length === 6, gVis && gVis.length);

/* 变速 */
const sp = KB_ANIM.AnimationFactories.quickSort(makeCanvas(), { data:[3,1,2] });
sp.setSpeed(4);
ok('setSpeed 生效', sp.speed === 4);

/* ---------------- 5. 行内标记 ---------------- */
console.log('\n[5] 行内标记');
const m = KB.markup.inlineMarkup('**重点** ==记忆== `代码` [[口诀]] 九九八十一 [[警示]] 别踩坑');
ok('重点标记', m.includes('mk-key'));
ok('记忆标记', m.includes('mk-mem'));
ok('行内代码', m.includes('mk-code'));
ok('口诀块', m.includes('mk-mnemonic'));
ok('警示块', m.includes('mk-warn'));

/* ---------------- 6. 文档数字防漂移（README ↔ 实况） ---------------- */
console.log('\n[6] 文档数字一致性（README ↔ 实况）');
{
  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  /* 排除第 2 节注册的题型自检夹具 __typecheck__（1 quiz 块 + 4 题），只统计真实内容 */
  const allBlkInc = KB.listFiles().filter(f=>f.id!=='__typecheck__')
    .flatMap(f=>f.chapters).flatMap(c=>c.blocks||[]);
  const typeCount = t => allBlkInc.filter(b=>b.type===t).length;
  const totalQ = allBlkInc.filter(b=>b.type==='quiz').flatMap(b=>b.questions||[]).length;
  const rnum = re => { const m = readme.match(re); return m ? +m[1] : null; };
  ok('README「全库 N 题」与实况一致', rnum(/全库\s*(\d+)\s*题/) === totalQ, { readme: rnum(/全库\s*(\d+)\s*题/), actual: totalQ });
  ok('README「N 个知识块」与实况一致', rnum(/(\d+)\s*个知识块/) === allBlkInc.length, { readme: rnum(/(\d+)\s*个知识块/), actual: allBlkInc.length });
  const distM = readme.match(/概念\s*(\d+)\s*\/\s*考点\s*(\d+)\s*\/\s*表格\s*(\d+)\s*\/\s*易错\s*(\d+)\s*\/\s*公式\s*(\d+)\s*\/\s*代码\s*(\d+)\s*\/\s*动画\s*(\d+)\s*\/\s*习题\s*(\d+)/);
  const distActual = ['concept','keypoint','table','error','formula','code','animation','quiz'].map(typeCount);
  ok('README 块类型分布与实况一致', !!distM && distM.slice(1).map(Number).join(',') === distActual.join(','), { readme: distM && distM.slice(1), actual: distActual });
  ok('README「N 个 Canvas 动画」与实况一致', rnum(/(\d+)\s*个\s*Canvas\s*动画/) === typeCount('animation'), { readme: rnum(/(\d+)\s*个\s*Canvas\s*动画/), actual: typeCount('animation') });
  const subjMap = [['数据结构','ds'],['计算机组成原理','co'],['操作系统','os'],['计算机网络','cn'],['高等数学','hm'],['线性代数','la'],['概率论与数理统计','prob']];
  for(const [name,id] of subjMap){
    const m = readme.match(new RegExp('\\| '+name+' \\|[^\\n]*?\\|[^\\n]*?\\|\\s*(\\d+)\\s*\\|'));
    const actual = KB.getFile(id).chapters.reduce((s,c)=>s+(c.blocks||[]).length,0);
    ok('README 科目表「'+name+'」块数与实况一致', !!m && +m[1] === actual, { readme: m && +m[1], actual });
  }
  const structMap = [['data-structure.js','ds'],['computer-org.js','co'],['operating-system.js','os'],['computer-network.js','cn'],['higher-math.js','hm'],['linear-algebra.js','la'],['probability.js','prob']];
  for(const [fname,id] of structMap){
    const m = readme.match(new RegExp(fname.replace(/\./g,'\\.')+'\\s+# [^\\n]*（\\d+ 章 (\\d+) 块）'));
    const actual = KB.getFile(id).chapters.reduce((s,c)=>s+(c.blocks||[]).length,0);
    ok('README 结构注释「'+fname+'」块数与实况一致', !!m && +m[1] === actual, { readme: m && +m[1], actual });
  }
}

/* ---------------- 汇总 ---------------- */
console.log('\n========================================');
console.log('通过 ' + passed + ' 项，失败 ' + failed + ' 项');
process.exit(failed ? 1 : 0);
