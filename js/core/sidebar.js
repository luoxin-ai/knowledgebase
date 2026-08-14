/* ================================================================
 * sidebar.js —— 侧边栏：文件浏览器（目录→科目→文件 递归树）+ 收缩 + 抽屉
 * ----------------------------------------------------------------
 * 左侧只管「文件夹（可嵌套）→ 文件」结构：
 *   点击文件夹展开子项；点击文件在右侧加载。
 * 章节目录不放侧边栏，由右侧内容区的文章目录（TOC）承担。
 * ================================================================ */
window.KB_UI = (function(){
  'use strict';
  const { esc } = KB.markup;

  /* ---------- 渲染文件树（递归：目录 → 科目 → … → 文件） ---------- */
  function renderTree(){
    const root = document.getElementById('file-tree');
    if(!root) return;
    /* 记忆「用户手动展开、且不在激活路径上」的文件夹 —— 切换文件重建 DOM 时不能把它们收起来 */
    const manual = new Set();
    root.querySelectorAll('.ti.folder.open').forEach(el=>{
      if(!KB.folderContainsActive(el.dataset.folder)) manual.add(el.dataset.folder);
    });
    root.innerHTML = KB.rootFolders().map(f=>renderFolderNode(f)).join('');
    syncSidebarActive(manual);
  }

  function renderFolderNode(folder){
    const subs  = KB.childFolders(folder.id);
    const files = KB.filesInFolder(folder.id);
    /* 空科目：无子文件夹也无文件 → 只渲染标题，不展开 */
    if(!subs.length && !files.length){
      return '<div class="ti folder empty" data-folder="'+folder.id+'">'+
        '<div class="ti-head"><span class="ti-name">'+esc(folder.title)+'</span></div></div>';
    }
    const children = subs.map(f=>renderFolderNode(f)).join('') + files.map(f=>renderFileNode(f)).join('');
    const open = KB.folderContainsActive(folder.id) ? ' open' : '';
    const chev = '<svg class="ti-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    return '<div class="ti folder'+open+'" data-folder="'+folder.id+'">'+
      '<div class="ti-head">'+chev+'<span class="ti-name">'+esc(folder.title)+'</span></div>'+
      '<div class="ti-children">'+children+'</div></div>';
  }

  function renderFileNode(file){
    const active = file.id === KB.state.activeFile ? ' active' : '';
    return '<div class="ti file'+active+'" data-file="'+file.id+'">'+
      '<div class="ti-head"><span class="ti-name">'+esc(file.title)+'</span></div></div>';
  }

  /* ---------- 侧边栏状态同步 ---------- */
  function syncSidebarActive(manual){
    manual = manual || new Set();
    /* 文件节点激活 */
    document.querySelectorAll('.ti.file').forEach(el=>{
      el.classList.toggle('active', el.dataset.file===KB.state.activeFile);
    });
    /* 文件夹节点展开：激活路径（激活文件所在文件夹及其所有祖先）+ 用户手动展开的 */
    document.querySelectorAll('.ti.folder').forEach(el=>{
      const id = el.dataset.folder;
      el.classList.toggle('open', KB.folderContainsActive(id) || manual.has(id));
    });
  }

  function initScrollSpy(){
    const update = ()=>{
      /* 每次重新查询，避免章节切换后引用已脱离文档的旧节点 */
      const blocks = Array.from(document.querySelectorAll('.block'));
      if(!blocks.length) return;
      let cur = blocks[0];
      for(const b of blocks){ if(b.getBoundingClientRect().top <= 140) cur = b; else break; }
      if(cur.id !== KB.state.activeBlock) KB.setActiveBlock(cur.id);
    };
    window.addEventListener('scroll', ()=>requestAnimationFrame(update), {passive:true});
    update();
  }

  /* ---------- 收缩 / 抽屉 ---------- */
  function initCollapse(){
    const sb = document.getElementById('sidebar');
    const btn = document.getElementById('sidebar-collapse');
    const exp = document.getElementById('sidebar-expand');
    const setCollapsed = (on)=>{
      sb.classList.toggle('collapsed', on);
      /* body 级状态：驱动左边缘悬浮展开按钮的显隐 */
      document.body.classList.toggle('sidebar-collapsed', on);
    };
    if(btn) btn.addEventListener('click', ()=> setCollapsed(true));
    if(exp) exp.addEventListener('click', ()=> setCollapsed(false));
  }

  function initDrawer(){
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    const ham = document.getElementById('hamburger');
    if(ham) ham.addEventListener('click', ()=>{ sb.classList.remove('collapsed'); sb.classList.add('open'); ov.classList.add('show'); });
    if(ov) ov.addEventListener('click', ()=>{ sb.classList.remove('open'); ov.classList.remove('show'); });
  }

  /* ---------- 章节渲染完成回调 ---------- */
  function onChapterRendered(file, ch){
    syncSidebarActive();
  }

  /* ---------- 复制按钮 ---------- */
  function initCopyButtons(){
    document.querySelectorAll('.code-copy').forEach(btn=>{
      btn.removeEventListener('click', copyHandler);
      btn.addEventListener('click', copyHandler);
    });
  }
  function copyHandler(e){
    const btn = e.currentTarget;
    const block = btn.closest('.code-block');
    const code = block.getAttribute('data-code');
    const done = ()=>{ btn.textContent='✓ 已复制'; btn.classList.add('ok'); setTimeout(()=>{ btn.textContent='⧉ 复制'; btn.classList.remove('ok'); },1500); };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(code).then(done).catch(()=>fallbackCopy(code,done));
    } else fallbackCopy(code,done);
  }
  function fallbackCopy(text, cb){
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); }catch(err){}
    document.body.removeChild(ta); cb();
  }

  /* ---------- 进度条 ---------- */
  function initProgressBar(){
    const bar = document.getElementById('progress-bar');
    const onScroll = ()=>{
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      bar.style.width = (max>0 ? (window.scrollY/max)*100 : 0)+'%';
    };
    window.addEventListener('scroll', ()=>requestAnimationFrame(onScroll), {passive:true});
    onScroll();
  }

  return { renderTree, syncSidebarActive, initScrollSpy, initCollapse, initDrawer,
           onChapterRendered, initCopyButtons, initProgressBar };
})();
