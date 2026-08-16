/* ================================================================
 * app.js —— 应用入口：初始化 + 文件树点击 + 学习目录/章导航 + resize
 * ----------------------------------------------------------------
 * 初始化顺序：
 *   1. 渲染文件树（文件夹→文件 两级）
 *   2. 绑定文件树点击（文件夹展开 / 文件加载）
 *   3. 绑定内容区导航（学习目录跳章 / 上一章 / 下一章）
 *   4. 搜索 / 进度条 / 收缩 / 抽屉 / 滚动定位
 *   5. 默认加载第一个文件的第一个章节
 *   6. resize 时统一重适配所有动画
 * ================================================================ */
(function(){
  'use strict';

  /* 加载文件（默认其第一章节；无章节则渲染空态） */
  function loadFile(fileId, chapterId){
    /* 错题本虚拟入口 */
    if(fileId === 'wrongbook'){
      KB.render.renderWrongBook();
      return;
    }
    /* 今日待复习虚拟入口（遗忘曲线到期错题卷） */
    if(fileId === 'duetoday'){
      KB.render.renderDueToday();
      return;
    }
    const file = KB.getFile(fileId);
    if(!file || file.hidden) return;
    /* 先渲染章节（内部会 setActiveFile），再重建树 → 激活文件所在目录链正确展开 */
    KB.render.renderChapter(file, chapterId);
    KB_UI.renderTree();
    /* URL 路由：当前章节写 hash */
    const ch = KB.getActiveFile() && (file.chapters||[]).find(c=>c.id===KB.state.activeChapter);
    if(ch) writeHash(fileId, ch.id);
  }

  /* ---- 文件树点击委托：文件夹展开 / 文件加载 ---- */
  function initTree(){
    const tree = document.getElementById('file-tree');
    tree.addEventListener('click', e=>{
      /* 先命中文件：文件节点嵌套在父文件夹的 .ti-children 内，
         closest('.ti.folder') 会先匹配到祖先文件夹，导致「点文件把目录收起来」 */
      const fileEl = e.target.closest('.ti.file');
      if(fileEl){
        loadFile(fileEl.dataset.file);
        closeDrawer();
        return;
      }
      /* 虚拟入口（错题重做 / 今日待复习）：不带 .file/.folder class，单独命中 */
      const vEl = e.target.closest('.ti.wrongbook[data-file]');
      if(vEl){
        loadFile(vEl.dataset.file);
        closeDrawer();
        return;
      }
      const fEl = e.target.closest('.ti.folder');
      if(fEl){
        /* 只切换自身展开/折叠，不动祖先与兄弟 —— 否则点 408 会把 11408 关掉导致 408 消失 */
        fEl.classList.toggle('open');
      }
    });
  }
  /* 移动端抽屉：选中内容后收起（桌面端 sidebar 常驻，此函数无副作用） */
  function closeDrawer(){
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    if(sb && sb.classList.contains('open')) sb.classList.remove('open');
    if(ov && ov.classList.contains('show')) ov.classList.remove('show');
  }

  /* ---- URL 路由：#<fileId>/<chId>，刷新恢复位置、链接可分享 ---- */
  function writeHash(fileId, chId){
    if(location.hash === '#'+fileId+'/'+chId) return;
    history.replaceState(null, '', '#'+fileId+'/'+chId);
  }
  function parseHash(){
    const m = (location.hash||'').match(/^#([\w-]+)\/([\w-]+)/);
    return m ? { fileId:m[1], chId:m[2] } : null;
  }
  function initRouter(){
    window.addEventListener('hashchange', ()=>{
      const h = parseHash();
      if(!h) return;
      const cur = KB.getActiveFile();
      /* 已经在该位置则不重复渲染 */
      if(cur && cur.id===h.fileId && KB.state.activeChapter===h.chId) return;
      const f = KB.getFile(h.fileId);
      if(f && !f.hidden) loadFile(h.fileId, h.chId);
    });
  }

  /* ---- 内容区导航：上一章 / 下一章 ---- */
  function initNav(){
    const content = document.getElementById('content');
    content.addEventListener('click', e=>{
      const btn = e.target.closest('[data-nav]');
      if(btn){
        const file = KB.getActiveFile();
        if(file) KB.render.renderChapter(file, btn.dataset.nav);
      }
    });
  }

  /* ---- 右侧文章目录（md 风格 TOC）点击跳章 ---- */
  function initToc(){
    const toc = document.getElementById('toc');
    if(!toc) return;
    toc.addEventListener('click', e=>{
      /* 刷题页目录：页面内锚点平滑滚动（错题本 / 科目 / 文件） */
      const sc = e.target.closest('[data-scroll]');
      if(sc){
        e.preventDefault();
        const node = document.getElementById(sc.dataset.scroll);
        if(node) node.scrollIntoView({behavior:'smooth', block:'start'});
        return;
      }
      const item = e.target.closest('.toc-item[data-nav]');
      if(!item) return;
      e.preventDefault();
      const file = KB.getActiveFile();
      if(file) KB.render.renderChapter(file, item.dataset.nav);
    });
  }

  /* ---- 刷题模式：顶栏按钮 + 卡片点击直达章节练习 ---- */
  function initDrill(){
    const btn = document.getElementById('drill-btn');
    if(btn){
      btn.addEventListener('click', ()=>{
        if(KB.render && KB.render.renderDrill) KB.render.renderDrill();
      });
    }
    const content = document.getElementById('content');
    if(content){
      content.addEventListener('click', e=>{
        /* 刷题页内嵌的科目错题卡：进入该科目错题卷 */
        const wcard = e.target.closest('[data-wrong-folder]');
        if(wcard){
          e.preventDefault();
          if(KB.render && KB.render.renderWrongBook) KB.render.renderWrongBook(wcard.dataset.wrongFolder);
          return;
        }
        const card = e.target.closest('[data-drill-file]');
        if(!card) return;
        e.preventDefault();
        if(KB.render && KB.render.drillGo) KB.render.drillGo(card.dataset.drillFile, card.dataset.drillCh);
      });
    }
  }

  function init(){
    if(!KB.listVisibleFiles().length) return;
    KB_UI.renderTree();
    initTree();
    initNav();
    initToc();
    if(KB.search && KB.search.init) KB.search.init();
    if(KB.render && KB.render.initQuiz) KB.render.initQuiz();
    initDrill();
    if(KB_UI.initProgressBar) KB_UI.initProgressBar();
    if(KB_UI.initScrollSpy) KB_UI.initScrollSpy();
    if(KB_UI.initCollapse) KB_UI.initCollapse();
    if(KB_UI.initDrawer) KB_UI.initDrawer();

    /* 初始化路由监听;启动时优先恢复 hash 位置,否则加载第一个可见文件 */
    initRouter();
    const h = parseHash();
    if(h && KB.getFile(h.fileId) && !KB.getFile(h.fileId).hidden){
      loadFile(h.fileId, h.chId);
    } else {
      loadFile(KB.listVisibleFiles()[0].id);
    }

    /* resize 防抖：所有动画统一重适配 */
    let t;
    window.addEventListener('resize', ()=>{
      clearTimeout(t);
      t = setTimeout(()=>{ if(KB_ANIM && KB_ANIM.refitAll) KB_ANIM.refitAll(); }, 120);
    });
  }

  /* 暴露 init 供 loader.js 在数据加载完成后调用（不再自动 DOMContentLoaded） */
  window.KB_APP = { init: init };
})();
