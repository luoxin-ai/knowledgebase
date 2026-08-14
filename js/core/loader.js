/* ================================================================
 * loader.js —— 数据文件动态加载器
 * ----------------------------------------------------------------
 * 按 data/manifest.js 的清单串行注入 <script>，全部完成后调用
 * KB_APP.init()。这样 index.html 永远只静态加载固定文件
 * （registry + manifest + core + animations + app + loader），
 * 新增百十个文档只改 manifest.js，index 无需维护。
 * ================================================================ */
(function(){
  'use strict';

  function loadScript(src){
    return new Promise(function(resolve){
      var s = document.createElement('script');
      var done = false;
      function finish(){ if(!done){ done = true; clearTimeout(timer); resolve(); } }
      var timer = setTimeout(function(){
        console.warn('[KB] 数据文件加载超时：'+src);
        finish();
      }, 10000);
      s.src = src;
      s.async = false;                 /* 保持执行顺序 */
      s.onload = function(){ finish(); };
      s.onerror = function(){ console.warn('[KB] 数据文件加载失败：'+src); finish(); /* 失败也继续，不阻塞其余 */ };
      document.body.appendChild(s);
    });
  }

  function loadAll(list){
    return list.reduce(function(p, src){
      return p.then(function(){ return loadScript(src); });
    }, Promise.resolve());
  }

  function boot(){
    var list = window.KB_MANIFEST || [];
    loadAll(list).then(function(){
      if(window.KB_APP && typeof KB_APP.init === 'function'){
        KB_APP.init();
      } else {
        console.error('[KB] KB_APP.init 未找到，请确认 app.js 已加载');
      }
    });
  }

  if(document.readyState !== 'loading'){
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot);
  }
})();
