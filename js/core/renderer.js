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
    /* 类型色点（纯 CSS 上色，无图标、无标签） */
    return '<div class="block-head"><span class="block-dot"></span>'+
      '<div class="block-title">'+esc(b.title)+'</div></div>';
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

  const BlockRenderers = {
    concept: renderConcept, keypoint: renderKeypoint, formula: renderFormula,
    code: renderCode, table: renderTable, animation: renderAnimation, error: renderError
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
      '<div class="ch-meta">'+
      (ch.blocks?'<span class="ch-meta-item"><b>'+ch.blocks.length+'</b> 个考点</span>':'')+
      '</div></div>'+
      '<div class="blocks">'+blocks+'</div>'+nav+'</section>';

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

  window.KB = window.KB || {};
  KB.render = { renderChapter, flashBlock };
})();
