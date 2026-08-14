/* ================================================================
 * search.js —— 全局搜索（跨全部知识文件）+ 下拉结果面板
 * ================================================================ */
(function(){
  'use strict';
  const { esc } = KB.markup;

  let panel, input, box, clear;

  function blockSearchText(b){
    const parts=[b.title||'', b.summary||'', b.points?b.points.join(' '):''];
    if(b.code) parts.push(b.code);
    if(b.desc) parts.push(b.desc);
    if(b.note) parts.push(b.note);
    if(b.formula) parts.push(b.formula);
    if(b.mistakes) b.mistakes.forEach(m=>{ parts.push(m.wrong); parts.push(m.right); });
    if(b.rows) b.rows.forEach(r=>r.forEach(c=>parts.push(String(c))));
    if(b.explain) b.explain.forEach(e=>parts.push(e.text));
    if(b.details) b.details.forEach(d=>{ parts.push(d.h||''); parts.push(d.body||''); });
    return parts.join(' ');
  }
  function stripTags(s){ const d=document.createElement('div'); d.innerHTML=s; return d.textContent||''; }

  function hl(text, q){
    if(!q) return esc(text);
    const rx = new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
    return esc(text).replace(rx,'<mark>$1</mark>');
  }

  function doSearch(q){
    q = q.trim().toLowerCase();
    box.classList.toggle('has-text', !!q);
    if(!q){ panel.classList.remove('show'); return; }

    const hits = KB.allBlocks().map(f=>{
      const text = blockSearchText(f.block);
      const idx = text.toLowerCase().indexOf(q);
      return { f, text, idx };
    }).filter(h=>h.idx>=0).sort((a,b)=>a.idx-b.idx).slice(0,16);

    if(!hits.length){
      panel.innerHTML = '<div class="sp-empty">未找到与「'+esc(input.value)+'」相关的内容<br>试试：KMP / 快排 / 循环队列 / WPL…</div>';
      panel.classList.add('show');
      return;
    }
    /* 按 文件夹 / 文件 分组 */
    const groups = {};
    hits.forEach(h=>{
      const file = h.f.file;
      const folder = KB.getFolder(file.folder);
      const key = (folder?folder.title:'未分组') + ' / ' + file.title;
      (groups[key]=groups[key]||[]).push(h);
    });
    panel.innerHTML = Object.keys(groups).map(gk=>{
      return '<div class="sp-group">'+esc(gk)+'</div>'+
        groups[gk].map(h=>{
          const { file, chapter, block } = h.f;
          const snippet = h.text.length>72 ? h.text.slice(0,72)+'…' : h.text;
          /* 确定性块 id：与 renderer.js 的 blk-文件-章-序 规则一致，渲染后即可定位 */
          const bid = block.id || ('blk-'+file.id+'-'+chapter.id+'-'+h.f.index);
          return '<div class="sp-item" data-file="'+file.id+'" data-ch="'+chapter.id+'" data-block="'+bid+'">'+
            '<span class="t"><span class="sp-dot t-'+block.type+'"></span>'+hl(block.title||'未知','')+'</span>'+
            '<span class="p">'+hl(stripTags(snippet), q)+'</span>'+
            '<span class="loc">第 '+chapter.num+' 章 · '+esc(chapter.title)+'</span></div>';
        }).join('');
    }).join('');
    panel.classList.add('show');
  }

  function init(){
    panel = document.getElementById('search-panel');
    input = document.getElementById('search-input');
    box   = document.getElementById('search-box');
    clear = document.getElementById('search-clear');
    if(!input) return;

    const debounced = debounce(function(){ doSearch(input.value); }, 160);
    input.addEventListener('input', debounced);
    input.addEventListener('focus', ()=>{ if(input.value.trim()) doSearch(input.value); });
    document.addEventListener('click', e=>{ if(!e.target.closest('.search-wrap')) panel.classList.remove('show'); });
    clear.addEventListener('click', ()=>{ input.value=''; doSearch(''); input.focus(); });

    input.addEventListener('keydown', e=>{
      if(e.key==='Enter'){
        const first = panel.querySelector('.sp-item');
        if(first){ goto(first); panel.classList.remove('show'); input.blur(); }
      }
      if(e.key==='Escape'){ panel.classList.remove('show'); input.blur(); }
    });

    panel.addEventListener('mousedown', e=>e.preventDefault()); // 保持输入焦点
    panel.addEventListener('click', e=>{
      const item = e.target.closest('.sp-item');
      if(item){ goto(item); panel.classList.remove('show'); }
    });
  }

  function goto(item){
    const file = KB.getFile(item.dataset.file);
    if(!file) return;
    if(KB.state.activeFile !== file.id || KB.state.activeChapter !== item.dataset.ch){
      /* keepScroll：不先回顶，交给 flashBlock 直接定位到块，避免二次滚动闪烁 */
      KB.render.renderChapter(file, item.dataset.ch, {silent:false, keepScroll:true});
    }
    setTimeout(()=>KB.render.flashBlock(item.dataset.block), 120);
  }

  function debounce(fn, ms){
    let t;
    return function(){ const a=arguments, c=this; clearTimeout(t); t=setTimeout(()=>fn.apply(c,a), ms); };
  }

  KB.search = { init };
})();
