/* ================================================================
 * renderer.js —— 块渲染器 + 章节/文件渲染
 * ----------------------------------------------------------------
 * 块类型：concept / keypoint / formula / code / table / error / animation
 * 渲染管线：renderChapter(file, chapterId) → 渲染该章 blocks → 通知侧边栏/动画
 * ================================================================ */
(function(){
  'use strict';
  const { esc, inlineMarkup } = KB.markup;
  const { renderCodeBlock } = KB.highlight;

  /* 待初始化的动画列表（renderChapter 收集，initAnimations 消费） */
  window.KB_PENDING_ANIMS = [];
  /* 动画初始化令牌：防止快速切章时多个 rAF 重复初始化同一批动画 */
  let animToken = 0;

  function renderDetails(details){
    if(!details||!details.length) return '';
    const body = details.map(d=>
      '<div class="sub-h">'+esc(d.h||'')+'</div><p>'+inlineMarkup(d.body||'')+'</p>'
    ).join('');
    return '<div class="details">'+body+'</div>';
  }
  function renderPoints(points){
    if(!points||!points.length) return '';
    return '<ul class="points">'+points.map(p=>'<li>'+inlineMarkup(p)+'</li>').join('')+'</ul>';
  }
  function blockHead(b){
    /* 类型色点（纯 CSS 上色，无图标、无标签）+ 可选考试权重标签 */
    return '<div class="block-head"><span class="block-dot"></span>'+
      '<div class="block-title">'+esc(b.title)+'</div>'+examBadge(b)+'</div>';
  }

  /* ---- 考试权重标注：exam: { forms, score, freq } ----
   * forms: 出题形式数组（选择 / 填空 / 简答 / 大题 / 综合）
   * score: 分值描述（如 "约 2-4 分"、"常以 10+ 分大题出现"）
   * freq : 频率（'高频' | '中频' | '偶考'）
   * 三项均可省略，缺哪项不渲染哪项 */
  function examBadge(b){
    const e = b.exam;
    if(!e || (!e.forms && !e.score && !e.freq)) return '';
    const parts = [];
    if(e.freq) parts.push('<span class="eb-freq f-'+({高频:'hi',中频:'mid',偶考:'lo'}[e.freq]||'mid')+'">'+esc(e.freq)+'</span>');
    if(e.forms) parts.push('<span class="eb-item">'+esc((e.forms||[]).join(' · '))+'</span>');
    if(e.score) parts.push('<span class="eb-item eb-score">'+esc(e.score)+'</span>');
    return '<div class="exam-badge">'+parts.join('')+'</div>';
  }

  /* ---- 各类型渲染器 ---- */
  function renderConcept(b){
    return blockHead(b)+'<div class="block-body">'+(b.points?renderPoints(b.points):'')+
      (b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+renderDetails(b.details)+'</div>';
  }
  function renderKeypoint(b){
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      renderPoints(b.points)+renderDetails(b.details)+'</div>';
  }
  function renderFormula(b){
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      '<div class="formula">'+esc(b.formula||'')+'</div>'+renderDetails(b.details)+'</div>';
  }
  function renderCode(b){
    const cx = b.complexity||{};
    const grid = (cx.best||cx.avg||cx.worst||cx.space||cx.stability)
      ? '<div class="complexity-grid">'+
        (cx.best?'<div class="cx-item green"><span class="cx-label">最好时间</span><span class="cx-value">'+esc(cx.best)+'</span></div>':'')+
        (cx.avg?'<div class="cx-item"><span class="cx-label">平均时间</span><span class="cx-value">'+esc(cx.avg)+'</span></div>':'')+
        (cx.worst?'<div class="cx-item red"><span class="cx-label">最坏时间</span><span class="cx-value">'+esc(cx.worst)+'</span></div>':'')+
        (cx.space?'<div class="cx-item"><span class="cx-label">空间</span><span class="cx-value">'+esc(cx.space)+'</span></div>':'')+
        (cx.stability?'<div class="cx-item"><span class="cx-label">稳定性</span><span class="cx-value">'+esc(cx.stability)+'</span></div>':'')+
        '</div>' : '';
    const explain = b.explain && b.explain.length
      ? '<div class="code-explain">'+b.explain.map(e=>'<div><span class="lnx">L'+(e.line||'')+'</span>'+inlineMarkup(e.text)+'</div>').join('')+'</div>'
      : '';
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      renderCodeBlock(b.code, b.lang||'C')+explain+grid+renderDetails(b.details)+'</div>';
  }
  function renderTable(b){
    const head = '<tr>'+b.headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr>';
    const body = b.rows.map(r=>'<tr>'+r.map((c,i)=>{
      const s=String(c);
      if(s==='稳定') return '<td class="stable-yes">'+s+'</td>';
      if(s==='不稳定') return '<td class="stable-no">'+s+'</td>';
      return '<td>'+inlineMarkup(s)+'</td>';
    }).join('')+'</tr>').join('');
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      '<div class="table-wrap"><table class="data-table"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div>'+
      (b.note?'<div class="table-note">'+inlineMarkup(b.note)+'</div>':'')+renderDetails(b.details)+'</div>';
  }
  function renderAnimation(b){
    KB_PENDING_ANIMS.push({ id:b.id, animType:b.animType, animConfig:b.animConfig });
    const modes = b.animModes
      ? '<div class="anim-modes">'+b.animModes.map((m,i)=>
          '<button class="mode-chip'+(i===0?' active':'')+'" data-mode="'+m.value+'">'+esc(m.label)+'</button>').join('')+'</div>'
      : '';
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      '<div class="anim-wrap">'+modes+
      '<canvas class="anim-canvas" id="canvas-'+b.id+'" height="300"></canvas>'+
      '<div class="anim-caption" id="caption-'+b.id+'">点击播放，逐步查看讲解</div>'+
      '<div class="anim-bar">'+
      '<button class="anim-btn play" id="play-'+b.id+'" title="播放">▶</button>'+
      '<button class="anim-btn" id="pause-'+b.id+'" title="暂停">⏸</button>'+
      '<button class="anim-btn" id="step-'+b.id+'" title="步进">⏭</button>'+
      '<button class="anim-btn" id="reset-'+b.id+'" title="重置">↺</button>'+
      '<select class="anim-speed" id="speed-'+b.id+'"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="4">4×</option></select>'+
      '<span class="anim-status" id="status-'+b.id+'">就绪</span>'+
      '</div></div>'+renderDetails(b.details)+'</div>';
  }
  function renderError(b){
    const items = (b.mistakes||[]).map((m,i)=>
      '<div class="err-item"><div class="err-head"><span>'+(i+1)+'</span> '+esc(m.title||'常见错误')+'</div>'+
      '<div class="err-wrong">'+inlineMarkup(m.wrong)+'</div>'+
      '<div class="err-right">'+inlineMarkup(m.right)+'</div>'+
      (m.why?'<div class="err-why">'+inlineMarkup(m.why)+'</div>':'')+'</div>'
    ).join('');
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      items+(b.note?'<div class="table-note">'+inlineMarkup(b.note)+'</div>':'')+'</div>';
  }

  /* ===================== 习题块 ===================== */
  /* 作答查表：block id + 题序 → 正确选项索引（DOM 不放明文答案，F12 不可见） */
  const quizAnswerMap = {};
  /* 测验模式洗牌序：block id → [原始题索引按展示序] */
  const quizOrderMap = {};

  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  function renderQuiz(b, mode){
    const qs = b.questions||[];
    const test = mode === 'test';   /* 测验模式：题序 + 选项乱序 */
    let order = qs.map((_,i)=>i);
    if(test) order = shuffle(order);
    quizOrderMap[b.id] = order;
    const list = order.map((src,shown)=>{
      const q = qs[src];
      const multi = !!q.multi;
      const fill = q.type === 'fill';
      const tf = q.type === 'tf';
      if(fill){
        /* 填空题：answer 为可接受答案数组（任意一个命中即算对），大小写不敏感、去空格 */
        quizAnswerMap[b.id+'-'+shown] = Array.isArray(q.answer) ? q.answer.map(s=>String(s)) : [String(q.answer)];
        return '<div class="qz-item fill" data-q="'+shown+'">'+
          '<div class="qz-stem"><span class="qz-multi-tag">填空</span>'+(shown+1)+'. '+inlineMarkup(q.stem)+'</div>'+
          '<div class="qz-fill-row"><input class="qz-fill-input" data-q="'+shown+'" type="text" autocomplete="off" placeholder="输入答案后回车">'+
          '<button class="qz-submit-fill" data-q="'+shown+'">提交</button></div>'+
          '<div class="qz-explain">'+inlineMarkup(q.explain||'')+'</div>'+
          '</div>';
      }
      if(tf){
        /* 判断题：answer 't'/'f' */
        quizAnswerMap[b.id+'-'+shown] = String(q.answer).toLowerCase()==='t';
        const opts = [['t','对','✓'],['f','错','✕']].map(p=>
          '<button class="qz-opt tf" data-q="'+shown+'" data-o="'+p[0]+'">'+
          '<span class="qz-letter">'+p[2]+'</span><span class="qz-text">'+p[1]+'</span></button>'
        ).join('');
        return '<div class="qz-item tf" data-q="'+shown+'">'+
          '<div class="qz-stem"><span class="qz-multi-tag">判断</span>'+(shown+1)+'. '+inlineMarkup(q.stem)+'</div>'+
          '<div class="qz-opts">'+opts+'</div>'+
          '<div class="qz-explain">'+inlineMarkup(q.explain||'')+'</div>'+
          '</div>';
      }
      let optIdx = q.options.map((_,i)=>i);
      if(test) optIdx = shuffle(optIdx);
      if(multi){
        /* 多选：answer 如 'abd' → 各字母选项索引集合 */
        const ansSet = new Set(String(q.answer).toLowerCase().split('').map(ch=>optIdx.indexOf(ch.charCodeAt(0)-97)));
        quizAnswerMap[b.id+'-'+shown] = ansSet;
      }else{
        quizAnswerMap[b.id+'-'+shown] = optIdx.indexOf(String(q.answer).toLowerCase().charCodeAt(0)-97);
      }
      const opts = optIdx.map((oi,pos)=>
        '<button class="qz-opt" data-q="'+shown+'" data-o="'+oi+'">'+
        '<span class="qz-letter">'+(multi?'☐':String.fromCharCode(65+pos))+'</span>'+
        '<span class="qz-text">'+inlineMarkup(q.options[oi])+'</span></button>'
      ).join('');
      return '<div class="qz-item'+(multi?' multi':'')+'" data-q="'+shown+'">'+
        '<div class="qz-stem">'+(multi?'<span class="qz-multi-tag">多选</span>':'')+(shown+1)+'. '+inlineMarkup(q.stem)+'</div>'+
        '<div class="qz-opts">'+opts+'</div>'+
        (multi?'<button class="qz-submit-multi" data-q="'+shown+'">提交答案</button>':'')+
        '<div class="qz-explain">'+inlineMarkup(q.explain||'')+'</div>'+
        '</div>';
    }).join('');
    return blockHead(b)+'<div class="block-body">'+(b.summary?'<p>'+inlineMarkup(b.summary)+'</p>':'')+
      '<div class="qz-mode-bar" data-quiz="'+b.id+'">'+
      '<span class="qz-mode-note">'+(test?'测验模式：题目与选项已打乱':'复习模式：按目录顺序')+'</span>'+
      '<button class="qz-mode-btn" data-mode="'+(test?'review':'test')+'">'+(test?'切换到复习模式':'切换到测验模式')+'</button>'+
      '</div>'+
      '<div class="qz-list" id="qlist-'+b.id+'">'+list+'</div>'+
      '<div class="qz-score" id="score-'+b.id+'"></div></div>';
  }
  /* 习题判分：内容区事件委托（app.js initQuiz 调用） */
  function initQuiz(){
    const content = document.getElementById('content');
    if(!content) return;
    content.addEventListener('click', e=>{
      /* 模式切换按钮：重新渲染该 quiz 块 */
      const mbtn = e.target.closest('.qz-mode-btn');
      if(mbtn){
        const bar = mbtn.closest('.qz-mode-bar');
        const blockEl = mbtn.closest('.block');
        const bId = bar && bar.dataset.quiz;
        const entry = bId ? KB.blockById(bId) : null;
        if(entry && blockEl){
          const tmp = document.createElement('div');
          tmp.innerHTML = renderQuiz(entry, mbtn.dataset.mode);
          const newBody = tmp.querySelector('.block-body');
          if(newBody) blockEl.querySelector('.block-body').replaceWith(newBody);
        }
        return;
      }
      const opt = e.target.closest('.qz-opt');
      /* ---- 填空题：提交按钮判分（关键词匹配） ---- */
      const fillBtn = e.target.closest('.qz-submit-fill');
      if(fillBtn){
        const item = fillBtn.closest('.qz-item');
        const block = fillBtn.closest('.block');
        if(!item || !block || item.classList.contains('answered')) return;
        const bId = block.id;
        const shown = parseInt(item.dataset.q,10);
        const key = bId+'-'+shown;
        const accepts = quizAnswerMap[key];
        if(!accepts) return;
        const input = item.querySelector('.qz-fill-input');
        const val = (input.value||'').trim();
        if(!val) return;
        /* 归一化：去空格、转小写、全角转半角（含 −→-、′→'） */
        const norm = s => String(s).trim().toLowerCase()
          .replace(/\s+/g,'')
          .replace(/−/g,'-').replace(/–/g,'-').replace(/—/g,'-')
          .replace(/′/g,"'").replace(/’/g,"'")
          .replace(/[（）]/g, m => m==='（'?'(':')')
          .replace(/[：]/g,':').replace(/[，]/g,',');
        const correct = accepts.some(a=>norm(a)===norm(val));
        item.classList.add('answered');
        item.classList.add(correct ? 'correct' : 'wrong');
        if(!correct){
          /* 显示标准答案 */
          const ref = document.createElement('div');
          ref.className = 'qz-fill-answer';
          ref.textContent = '标准答案：' + accepts.join(' 或 ');
          item.insertBefore(ref, item.querySelector('.qz-explain'));
        }
        input.disabled = true;
        fillBtn.remove();
        item.querySelector('.qz-explain').classList.add('show');
        if(window.KB_PROGRESS){
          const entry = KB.blockById(bId);
          const q = entry && entry.questions && (entry.questions[shownQIndex(bId, shown)] || null);
          if(q && q.qid){
            KB_PROGRESS.recordAnswer(q.qid, val, correct);
            if(typeof KB_UI !== 'undefined' && KB_UI.renderTree && !KB.state.refreshLock){
              KB.state.refreshLock = true;
              requestAnimationFrame(()=>{ KB_UI.renderTree(); KB.state.refreshLock = false; });
            }
          }
        }
        updateQuizScore(block);
        return;
      }
      /* ---- 判断题：对/错按钮判分 ---- */
      if(opt && opt.classList.contains('tf')){
        const item = opt.closest('.qz-item');
        const block = opt.closest('.block');
        if(!item || !block || item.classList.contains('answered')) return;
        const bId = block.id;
        const shown = parseInt(item.dataset.q,10);
        const key = bId+'-'+shown;
        const ansBool = quizAnswerMap[key];
        if(typeof ansBool !== 'boolean') return;
        const picked = opt.dataset.o === 't';
        const correct = picked === ansBool;
        item.classList.add('answered');
        item.classList.add(correct ? 'correct' : 'wrong');
        item.querySelectorAll('.qz-opt.tf').forEach(el=>{
          if(el.dataset.o === (ansBool?'t':'f')) el.classList.add('is-answer');
          if(el===opt && !correct) el.classList.add('is-picked');
          el.disabled = true;
        });
        item.querySelector('.qz-explain').classList.add('show');
        if(window.KB_PROGRESS){
          const entry = KB.blockById(bId);
          const q = entry && entry.questions && (entry.questions[shownQIndex(bId, shown)] || null);
          if(q && q.qid){
            KB_PROGRESS.recordAnswer(q.qid, picked?'对':'错', correct);
            if(typeof KB_UI !== 'undefined' && KB_UI.renderTree && !KB.state.refreshLock){
              KB.state.refreshLock = true;
              requestAnimationFrame(()=>{ KB_UI.renderTree(); KB.state.refreshLock = false; });
            }
          }
        }
        updateQuizScore(block);
        return;
      }
      /* ---- 多选题：提交按钮判分 ---- */
      const subBtn = e.target.closest('.qz-submit-multi');
      if(subBtn){
        const item = subBtn.closest('.qz-item');
        const block = subBtn.closest('.block');
        if(!item || !block || item.classList.contains('answered')) return;
        const bId = block.id;
        const shown = parseInt(item.dataset.q,10);
        const key = bId+'-'+shown;
        const ansSet = quizAnswerMap[key];
        if(!ansSet) return;
        const pickedSet = new Set(
          Array.from(item.querySelectorAll('.qz-opt.picked')).map(el=>parseInt(el.dataset.o,10))
        );
        if(pickedSet.size===0) return;   /* 未选任何项，忽略 */
        const correct = pickedSet.size===ansSet.size &&
          [...ansSet].every(i=>pickedSet.has(i));
        item.classList.add('answered');
        item.classList.add(correct ? 'correct' : 'wrong');
        item.querySelectorAll('.qz-opt').forEach(el=>{
          const oi = parseInt(el.dataset.o,10);
          if(ansSet.has(oi)) el.classList.add('is-answer');
          else if(el.classList.contains('picked')) el.classList.add('is-picked');
          el.disabled = true;
        });
        subBtn.remove();
        item.querySelector('.qz-explain').classList.add('show');
        if(window.KB_PROGRESS){
          const entry = KB.blockById(bId);
          const q = entry && entry.questions && (entry.questions[shownQIndex(bId, shown)] || null);
          if(q && q.qid){
            const pickStr = Array.from(item.querySelectorAll('.qz-opt'))
              .sort((a,c)=>parseInt(a.dataset.o,10)-parseInt(c.dataset.o,10))
              .filter(el=>el.classList.contains('picked'))
              .map(el=>String.fromCharCode(97+parseInt(el.dataset.o,10))).join('');
            KB_PROGRESS.recordAnswer(q.qid, pickStr, correct);
            if(typeof KB_UI !== 'undefined' && KB_UI.renderTree && !KB.state.refreshLock){
              KB.state.refreshLock = true;
              requestAnimationFrame(()=>{ KB_UI.renderTree(); KB.state.refreshLock = false; });
            }
          }
        }
        updateQuizScore(block);
        return;
      }
      /* ---- 多选题：选项点选（勾选/取消，不判分） ---- */
      if(opt){
        const item = opt.closest('.qz-item');
        if(item && item.classList.contains('multi') && !item.classList.contains('answered')){
          opt.classList.toggle('picked');
          const letter = opt.querySelector('.qz-letter');
          letter.textContent = opt.classList.contains('picked') ? '☑' : '☐';
          return;
        }
      }
      if(!opt) return;
      const item = opt.closest('.qz-item');
      const block = opt.closest('.block');
      if(!item || !block || item.classList.contains('answered')) return;
      const bId = block.id;
      const shown = parseInt(item.dataset.q,10);
      const key = bId+'-'+shown;
      const ansIdx = quizAnswerMap[key];
      if(ansIdx === undefined) return;
      const picked = parseInt(opt.dataset.o,10);
      const correct = picked===ansIdx;
      item.classList.add('answered');
      item.classList.add(correct ? 'correct' : 'wrong');
      item.querySelectorAll('.qz-opt').forEach(el=>{
        if(parseInt(el.dataset.o,10)===ansIdx) el.classList.add('is-answer');
        if(el===opt && !correct) el.classList.add('is-picked');
        el.disabled = true;
      });
      item.querySelector('.qz-explain').classList.add('show');
      /* 记录作答进度（qid 为稳定标识，与乱序无关） */
      if(window.KB_PROGRESS){
        const entry = KB.blockById(bId);
        const q = entry && entry.questions && (entry.questions[shownQIndex(bId, shown)] || null);
        /* 洗牌时 shown → 原始索引需要顺序表;复习模式两者一致 */
        if(q && q.qid){
          const pickLetter = opt.querySelector('.qz-letter').textContent.trim();
          KB_PROGRESS.recordAnswer(q.qid, pickLetter, correct);
          /* 错题计数实时更新侧边栏 */
          if(typeof KB_UI !== 'undefined' && KB_UI.renderTree && !KB.state.refreshLock){
            KB.state.refreshLock = true;
            requestAnimationFrame(()=>{ KB_UI.renderTree(); KB.state.refreshLock = false; });
          }
        }
      }
      updateQuizScore(block);
    });
    /* 填空题：输入框回车提交（委托 keydown） */
    content.addEventListener('keydown', e=>{
      if(e.key !== 'Enter') return;
      const input = e.target.closest('.qz-fill-input');
      if(!input) return;
      e.preventDefault();
      const btn = input.closest('.qz-item') && input.closest('.qz-item').querySelector('.qz-submit-fill');
      if(btn) btn.click();
    });
  }
  /* 测验模式下 shown 序号 → 原始题索引（复习模式恒等） */
  function shownQIndex(bId, shown){
    return quizOrderMap[bId] ? quizOrderMap[bId][shown] : shown;
  }
  function updateQuizScore(block){
    if(!block) return;
    const items = block.querySelectorAll('.qz-item');
    const done = block.querySelectorAll('.qz-item.answered').length;
    const right = block.querySelectorAll('.qz-item.correct').length;
    const el = block.querySelector('[id^="score-"]');
    if(!el) return;
    if(done===0){ el.textContent=''; return; }
    el.textContent = '已做 '+done+' / '+items.length+' 题 · 答对 '+right+' 题 · 正确率 '+(right/done*100).toFixed(0)+'%';
    el.classList.add('show');
  }

  const BlockRenderers = {
    concept: renderConcept, keypoint: renderKeypoint, formula: renderFormula,
    code: renderCode, table: renderTable, animation: renderAnimation, error: renderError,
    quiz: renderQuiz
  };

  /* ---- 右侧文章目录（md 风格竖排 TOC） ---- */
  function renderToc(file, activeChId){
    const toc = document.getElementById('toc');
    if(!toc) return;
    const items = (file.chapters||[]).map(c=>{
      const active = c.id===activeChId ? ' active' : '';
      return '<a class="toc-item'+active+'" data-nav="'+c.id+'" href="#ch-'+c.id+'">'+
        '<span class="toc-num">'+esc(c.num)+'</span><span class="toc-t">'+esc(c.title)+'</span></a>';
    }).join('');
    toc.innerHTML = '<div class="toc-head">'+esc(file.title)+'</div>'+
      '<nav class="toc-list">'+items+'</nav>';
  }

  /* ---- 章节渲染 ---- */
  function renderChapter(file, chapterId, opts){
    opts = opts||{};
    const ch = (file.chapters||[]).find(c=>c.id===chapterId) || (file.chapters&&file.chapters[0]);
    KB.setActiveFile(file.id);
    /* 销毁上一章节遗留的动画实例（停 rAF + 清空注册表），否则切章后 resize 会命中已脱离 DOM 的旧实例 */
    if(typeof KB_ANIM !== 'undefined' && KB_ANIM.disposeAll) KB_ANIM.disposeAll();
    const el = document.getElementById('content');
    if(!el) return;   /* 内容容器缺失时安全退出，避免后续 innerHTML 抛错 */
    /* 空文件 / 无章节：渲染干净空态 */
    if(!ch || !(file.chapters||[]).length){
      KB.setActiveChapter(null);
      if(el){
        const crumbs = KB.folderAncestors(file.folder).map(id=>KB.getFolder(id)).filter(Boolean).map(f=>'<span>'+esc(f.title)+'</span>');
        const crumb = '<div class="crumb">'+crumbs.join('<span class="sep">/</span>')+
          '<span class="sep">/</span><span>'+esc(file.title)+'</span></div>';
        el.innerHTML =
          '<section class="chapter empty-state">'+crumb+
          '<h2 class="empty-title">'+esc(file.title)+'</h2>'+
          '<p class="empty-text">内容整理中，敬请期待。</p>'+
          '<p class="empty-sub">（该文件暂无章节数据）</p></section>';
      }
      renderToc(file, null);
      return;
    }
    KB.setActiveChapter(ch.id);
    KB.setActiveBlock(null);
    KB_PENDING_ANIMS.length = 0;

    const blocks = (ch.blocks||[]).map((b, bi)=>{
      /* 确定性 id：文件+章节+块序，保证搜索/锚点在渲染前后都能定位到同一块 */
      b.id = b.id || ('blk-'+file.id+'-'+ch.id+'-'+bi);
      const r = BlockRenderers[b.type];
      return r ? '<article class="block t-'+b.type+'" id="'+b.id+'" data-block="'+b.id+'">'+r(b)+'</article>' : '';
    }).join('');

    const idx = file.chapters.indexOf(ch);
    const prev = idx>0 ? file.chapters[idx-1] : null;
    const next = idx<file.chapters.length-1 ? file.chapters[idx+1] : null;

    /* 章末课后练习：按「教材文件 + 章号」找到对应习题章（可能多个，如马原单选+多选），默认收起 */
    let quizSection = '';
    const qchs = KB.quizChaptersFor(file.id, ch.num);
    if(qchs.length){
      quizSection = qchs.map((qch,qi2)=>{
      const qOwner = (KB.listFiles().find(f=>f.quizFor && f.quizFor.book===file.id && (f.chapters||[]).includes(qch))||{}).id || 'q'+qi2;
      const qBlocks = (qch.blocks||[]).map((b, bi)=>{
        b.id = b.id || ('blk-'+file.id+'-'+ch.id+'-quiz-'+qOwner+'-'+bi);
        const r = BlockRenderers[b.type];
        return r ? '<article class="block t-'+b.type+'" id="'+b.id+'" data-block="'+b.id+'">'+r(b)+'</article>' : '';
      }).join('');
      const qCount = (qch.blocks||[]).reduce((s,b)=>s+((b.questions&&b.questions.length)||0),0);
      const hasMulti = (qch.blocks||[]).some(b=>(b.questions||[]).some(q=>q.multi));
      const quizLabel = qOwner.indexOf('multi')>=0 ? '课后练习 · 多选' : (qOwner.indexOf('single')>=0 ? '课后练习 · 单选' : '课后练习');
      /* 历史掌握度（localStorage 聚合），有作答才显示 */
      let statTxt = '';
      if(window.KB_PROGRESS){
        const st = KB_PROGRESS.chapterStats(file.id, ch.num);
        if(st && st.done>0){
          const pct = (st.right/st.done*100).toFixed(0);
          statTxt = '<span class="qs-stat'+(st.done>=st.total?' full':'')+'">上次 '+st.done+'/'+st.total+' · 正确率 '+pct+'%</span>';
        }
      }
      return
        '<details class="quiz-section">'+
        '<summary><span class="qs-title">'+esc(quizLabel)+'</span>'+
        '<span class="qs-meta">'+qCount+' 题'+(hasMulti?'（含多选）':'')+' · 点击展开，选完即时判分</span>'+statTxt+
        '<svg class="chev" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></summary>'+
        '<div class="qs-body">'+qBlocks+'</div></details>';
      }).join('');
    }

    const nav =
      '<div class="ch-nav">'+
      (prev?'<button class="ch-nav-btn" data-nav="'+prev.id+'"><span class="dir">← 上一章</span><span class="nm">'+esc(prev.title)+'</span></button>':'<button class="ch-nav-btn disabled"></button>')+
      (next?'<button class="ch-nav-btn next" data-nav="'+next.id+'"><span class="dir">下一章 →</span><span class="nm">'+esc(next.title)+'</span></button>':'<button class="ch-nav-btn disabled"></button>')+
      '</div>';

    const crumbs = KB.folderAncestors(file.folder).map(id=>KB.getFolder(id)).filter(Boolean).map(f=>'<span>'+esc(f.title)+'</span>');
    const crumb = '<div class="crumb">'+crumbs.join('<span class="sep">/</span>')+
      '<span class="sep">/</span><span>'+esc(file.title)+'</span>'+
      '<span class="sep">/</span><span class="cur">'+esc(ch.title)+'</span></div>';

    el.innerHTML =
      '<section class="chapter" id="ch-'+ch.id+'">'+
      '<div class="chapter-head">'+crumb+
      '<span class="ch-num">第 '+ch.num+' 章 · '+esc(ch.titleEn||'')+'</span>'+
      '<h1 class="ch-title">'+esc(ch.title)+'</h1>'+
      (ch.summary?'<p class="ch-summary">'+inlineMarkup(ch.summary)+'</p>':'')+
      '<div class="ch-meta"></div></div>'+
      '<div class="blocks">'+blocks+'</div>'+quizSection+nav+'</section>';

    renderToc(file, ch.id);

    if(!opts.keepScroll) window.scrollTo({top:0, left:0, behavior:'auto'});

    /* 通知外部（侧边栏高亮 / 动画初始化 / 进度） */
    if(typeof KB_UI !== 'undefined'){
      KB_UI.onChapterRendered(file, ch);
    }
    if(!opts.silent && typeof KB_ANIM !== 'undefined'){
      /* 延迟到下一帧：等布局稳定后再初始化动画，避免 canvas 尺寸抖动闪烁；
         用令牌校验，仅最后一次 renderChapter 的 rAF 才真正初始化 */
      animToken++;
      const tk = animToken;
      requestAnimationFrame(()=>{ if(tk === animToken) KB_ANIM.initAnimations(); });
    }
    if(typeof KB_UI !== 'undefined' && KB_UI.initCopyButtons){
      KB_UI.initCopyButtons();
    }
  }

  /* 跳转到指定块并闪动高亮 */
  function flashBlock(id){
    const node = document.getElementById(id);
    if(!node) return;
    KB.setActiveBlock(id);
    if(typeof KB_UI !== 'undefined' && KB_UI.syncSidebarActive) KB_UI.syncSidebarActive();
    node.scrollIntoView({behavior:'smooth', block:'start'});
    node.classList.remove('flash'); void node.offsetWidth; node.classList.add('flash');
    setTimeout(()=>node.classList.remove('flash'), 1500);
  }

  /* 错题本页面：聚合全部错题渲染成一张卷，答对自动移出（localStorage 由判分回调维护） */
  function renderWrongBook(){
    const el = document.getElementById('content');
    if(!el) return;
    /* 销毁上一章遗留动画实例，避免 innerHTML 替换后 resize 命中已脱离 DOM 的实例 */
    if(typeof KB_ANIM !== 'undefined' && KB_ANIM.disposeAll) KB_ANIM.disposeAll();
    KB_PENDING_ANIMS.length = 0;
    KB.setActiveFile('wrongbook');
    KB.setActiveChapter(null);
    const list = (window.KB_PROGRESS ? KB_PROGRESS.wrongList() : []);
    let body = '';
    if(!list.length){
      body = '<section class="chapter empty-state">'+
        '<h2 class="empty-title">错题本</h2>'+
        '<p class="empty-text">还没有错题记录。</p>'+
        '<p class="empty-sub">做题答错的题会自动收进来，重做答对后自动移出。</p></section>';
    } else {
      /* 按「科目 folder → 文件」两级分组渲染 quiz 块 */
      const groups = {};
      list.forEach(it=>{
        const fo = KB.getFolder(it.file.folder);
        const sid = fo ? fo.id : 'other';
        const key = sid+'/'+it.file.id;
        (groups[key] = groups[key] || { subject: fo?fo.title:'其他', file: it.file, items: [] }).items.push(it);
      });
      /* 按科目插入分组标题(直接在循环里构建,不用 split) */
      let html = '';
      let last = null;
      Object.keys(groups).forEach(k=>{
        const g = groups[k];
        if(g.subject!==last){
          last = g.subject;
          html += '<h2 class="group-sub-title">'+esc(g.subject)+'</h2>';
        }
        const qs2 = g.items.map(it=>it.question);
        const tb = { type:'quiz', id:'wrongbook-'+g.file.id, title:g.file.title+' · 错题',
          summary:'共 '+qs2.length+' 道错题，答对自动移出错题本。',
          questions:qs2 };
        virtualBlocks[tb.id] = tb;
        html += '<article class="block t-quiz" id="'+tb.id+'">'+renderQuiz(tb,'review')+'</article>';
      });
      body = '<section class="chapter"><div class="chapter-head">'+
        '<h1 class="ch-title">错题重做</h1>'+
        '<p class="ch-summary">共 '+list.length+' 道错题，按科目分组。答对后自动移出错题本；想清空全部进度请清浏览器 localStorage 的 kb: 前缀键。</p>'+
        '</div><div class="blocks">'+html+'</div></section>';
    }
    el.innerHTML = body;
    renderToc({ title:'错题本', chapters:[] }, null);
    window.scrollTo({top:0, left:0, behavior:'auto'});
    KB_UI.renderTree();
    /* 答对移出后刷新入口计数 */
    if(window.KB_PROGRESS && list.length){
      const orig = KB_PROGRESS.recordAnswer;
      /* 下次点击判分时由 initQuiz 调 recordAnswer；本页只负责展示，计数实时性靠 renderTree 刷新 */
    }
  }

  /* 虚拟块表：错题本/今日待复习页的临时 quiz 块（id 不在注册表），
     供 initQuiz 判分回调经 KB.blockById 找回 questions 数据 */
  const virtualBlocks = {};

  /* 今日待复习页面：遗忘曲线调度到期（1/3/7/15 天）的错题渲染成一张卷
   * 答对升级间隔档；连续答对到 15 天档即移出错题本 */
  function renderDueToday(){
    const el = document.getElementById('content');
    if(!el) return;
    /* 销毁上一章遗留动画实例（同 renderWrongBook） */
    if(typeof KB_ANIM !== 'undefined' && KB_ANIM.disposeAll) KB_ANIM.disposeAll();
    KB_PENDING_ANIMS.length = 0;
    KB.setActiveFile('duetoday');
    KB.setActiveChapter(null);
    const list = (window.KB_PROGRESS ? KB_PROGRESS.dueList() : []);
    let body = '';
    if(!list.length){
      body = '<section class="chapter empty-state">'+
        '<h2 class="empty-title">今日待复习</h2>'+
        '<p class="empty-text">今天没有到期的错题。</p>'+
        '<p class="empty-sub">错题按 1 / 3 / 7 / 15 天间隔安排复习，到期会自动出现在这里。</p></section>';
    } else {
      const groups = {};
      list.forEach(it=>{
        const k = it.file.id;
        (groups[k] = groups[k] || []).push(it);
      });
      const secs = Object.keys(groups).map(fid=>{
        const f = KB.getFile(fid);
        const qs = groups[fid].map(it=>it.question);
        const tmpBlock = { type:'quiz', id:'duetoday-'+fid, title:(f?f.title:fid)+' · 待复习',
          summary:'共 '+qs.length+' 道到期错题。',
          questions:qs };
        virtualBlocks[tmpBlock.id] = tmpBlock;
        return '<article class="block t-quiz" id="'+tmpBlock.id+'">'+renderQuiz(tmpBlock,'review')+'</article>';
      }).join('');
      body = '<section class="chapter"><div class="chapter-head">'+
        '<h1 class="ch-title">今日待复习</h1>'+
        '<p class="ch-summary">共 '+list.length+' 道错题到期。间隔重复节奏：答错重置为 1 天档；答对升级到 3 / 7 / 15 天档；15 天档答对即移出错题本。</p>'+
        '</div><div class="blocks">'+secs+'</div></section>';
    }
    el.innerHTML = body;
    renderToc({ title:'今日待复习', chapters:[] }, null);
    window.scrollTo({top:0, left:0, behavior:'auto'});
    KB_UI.renderTree();
  }

  /* blockById 兜底：真实注册表找不到时查虚拟块表（给判分回调用）。
     用 defineProperty 只挂一次，避免覆盖 registry 原实现 */
  if(!KB.__virtualBlockHook){
    const orig = KB.blockById.bind(KB);
    KB.blockById = function(id){
      return orig(id) || virtualBlocks[id] || null;
    };
    KB.__virtualBlockHook = true;
  }

  /* ============ 刷题模式：按科目分组的章节练习入口 ============ */
  /* fileId → (科目 folder 标题 → [带 quiz 的章节]) 的聚合 */
  function quizChaptersOf(fileId){
    const f = KB.getFile(fileId);
    if(!f) return [];
    return (f.chapters||[]).filter(ch=>{
      const qc = KB.quizChapterFor(fileId, ch.num);
      return qc && (qc.blocks||[]).some(b=>b.type==='quiz');
    }).map(ch=>{
      const st = window.KB_PROGRESS ? KB_PROGRESS.chapterStats(fileId, ch.num) : null;
      const qc = KB.quizChapterFor(fileId, ch.num);
      const cnt = (qc.blocks||[]).reduce((s,b)=>s+((b.questions&&b.questions.length)||0),0);
      return { ch, cnt, st };
    });
  }
  /* 科目(=folder)维度的聚合：subject 标题 + 该科目下所有教材章节 */
  function subjectsWithQuiz(){
    const out = [];
    KB.listVisibleFiles().forEach(f=>{
      const chs = quizChaptersOf(f.id);
      if(!chs.length) return;
      const fo = KB.getFolder(f.folder);
      const subject = fo ? fo.title : '其他';
      let g = out.find(x=>x.subject===subject && x.folderId===(fo&&fo.id));
      if(!g){ g = { subject, folderId: fo&&fo.id, files: [] }; out.push(g); }
      g.files.push({ file:f, chs });
    });
    return out;
  }

  function renderDrill(){
    const el = document.getElementById('content');
    if(!el) return;
    if(typeof KB_ANIM !== 'undefined' && KB_ANIM.disposeAll) KB_ANIM.disposeAll();
    KB_PENDING_ANIMS.length = 0;
    KB.setActiveFile('drill');
    KB.setActiveChapter(null);
    const groups = subjectsWithQuiz();
    if(!groups.length){
      el.innerHTML = '<section class="chapter empty-state">'+
        '<h2 class="empty-title">刷题</h2><p class="empty-text">暂无习题。</p></section>';
    } else {
      const secs = groups.map(g=>{
        const cards = g.files.map(({file,chs})=>
          '<div class="drill-file">'+esc(file.title)+'</div>'+
          '<div class="drill-grid">'+
          chs.map(({ch,cnt,st})=>{
            const pct = st && st.done>0 ? Math.round(st.right/st.done*100) : null;
            return '<div class="drill-card" role="button" tabindex="0" data-drill-file="'+file.id+'" data-drill-ch="'+ch.id+'">'+
              '<span class="dc-num">第 '+ch.num+' 章</span>'+
              '<span class="dc-title">'+esc(ch.title)+'</span>'+
              '<span class="dc-meta">'+cnt+' 题'+
              (pct!==null?'<span class="dc-stat'+(st.done>=cnt?' done':'')+'">已练 '+st.done+'/'+cnt+' · '+pct+'%</span>':'')+
              '</span></div>';
          }).join('')+'</div>'
        ).join('');
        return '<section class="drill-subject"><h2 class="drill-sub-title">'+esc(g.subject)+'</h2>'+cards+'</section>';
      }).join('');
      el.innerHTML = '<section class="chapter"><div class="chapter-head">'+
        '<h1 class="ch-title">刷题</h1>'+
        '<p class="ch-summary">选择章节进入做题模式：自动跳到章末练习并直接展开。带进度徽标的章节可续练。</p>'+
        '</div>'+secs+'</section>';
    }
    renderToc({ title:'刷题', chapters:[] }, null);
    window.scrollTo({top:0, left:0, behavior:'auto'});
    KB_UI.renderTree();
  }
  /* 刷题卡片点击：跳章 + 自动展开课后练习并滚动到位 */
  function drillGo(fileId, chId){
    const f = KB.getFile(fileId);
    if(!f) return;
    if(location.hash !== '#'+fileId+'/'+chId) history.replaceState(null,'','#'+fileId+'/'+chId);
    KB.render.renderChapter(f, chId);
    KB_UI.renderTree();
    /* 展开练习区：等章节 DOM + 动画布局稳定后，直接定位到练习区顶部 */
    setTimeout(()=>{
      const sec = document.querySelector('.quiz-section');
      if(!sec) return;
      sec.open = true;
      /* 再等展开动画完成，用绝对定位滚动，避免 scrollIntoView 受布局抖动影响 */
      setTimeout(()=>{
        const y = sec.getBoundingClientRect().top + window.pageYOffset - 16;
        window.scrollTo({ top:y, behavior:'auto' });
      }, 120);
    }, 80);
  }

  window.KB = window.KB || {};
  KB.render = { renderChapter, flashBlock, initQuiz, renderWrongBook, renderDueToday,
                renderDrill, drillGo };
})();
