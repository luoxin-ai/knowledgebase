/* ================================================================
 * factory.js —— 动画工厂注册 + 初始化入口
 * ----------------------------------------------------------------
 * 消费 renderer.js 收集的 KB_PENDING_ANIMS：
 *   [{ id, animType, animConfig }]
 * 渲染器已生成 #canvas-{id} / #play|pause|step|reset|speed|status-{id}
 * 与 mode-chip 按钮组，本模块负责实例化动画并绑定全部控件。
 * ================================================================ */
(function(){
  'use strict';

  const AnimationFactories = {
    bubbleSort:      (c,cfg)=>new KB_ANIM.BubbleSortAnimation(c,cfg),
    quickSort:       (c,cfg)=>new KB_ANIM.QuickSortAnimation(c,cfg),
    heapSort:        (c,cfg)=>new KB_ANIM.HeapSortAnimation(c,cfg),
    mergeSort:       (c,cfg)=>new KB_ANIM.MergeSortAnimation(c,cfg),
    insertionSort:   (c,cfg)=>new KB_ANIM.InsertionSortAnimation(c,cfg),
    shellSort:       (c,cfg)=>new KB_ANIM.ShellSortAnimation(c,cfg),
    selectionSort:   (c,cfg)=>new KB_ANIM.SelectionSortAnimation(c,cfg),
    radixSort:       (c,cfg)=>new KB_ANIM.RadixSortAnimation(c,cfg),
    treeTraversal:   (c,cfg)=>new KB_ANIM.TreeTraversalAnimation(c,cfg),
    graphTraversal:  (c,cfg)=>new KB_ANIM.GraphTraversalAnimation(c,cfg),
    huffman:         (c,cfg)=>new KB_ANIM.HuffmanAnimation(c,cfg),
    kmp:             (c,cfg)=>new KB_ANIM.KMPAnimation(c,cfg),
    pageReplace:     (c,cfg)=>new KB_ANIM.PageReplaceAnimation(c,cfg),
    processSchedule: (c,cfg)=>new KB_ANIM.ProcessScheduleAnimation(c,cfg),
    slidingWindow:   (c,cfg)=>new KB_ANIM.SlidingWindowAnimation(c,cfg),
    cacheMap:        (c,cfg)=>new KB_ANIM.CacheMapAnimation(c,cfg),
    pipeline:        (c,cfg)=>new KB_ANIM.PipelineAnimation(c,cfg),
    riemann:         (c,cfg)=>new KB_ANIM.RiemannAnimation(c,cfg),
    matrixMul:       (c,cfg)=>new KB_ANIM.MatrixMulAnimation(c,cfg)
  };

  function initAnimations(){
    if(!window.KB_PENDING_ANIMS) return;
    KB_PENDING_ANIMS.forEach(p=>{
      const canvas = document.getElementById('canvas-'+p.id);
      if(!canvas) return;
      const factory = AnimationFactories[p.animType];
      if(!factory) return;
      const anim = factory(canvas, p.animConfig);
      anim.statusEl = document.getElementById('status-'+p.id);
      anim.captionEl = document.getElementById('caption-'+p.id);
      const bind = (id, fn) => { const el=document.getElementById(id); if(el) el.addEventListener('click', fn); };
      bind('play-'+p.id,  ()=>anim.play());
      bind('pause-'+p.id, ()=>anim.pause());
      bind('step-'+p.id,  ()=>anim.stepForward());
      bind('reset-'+p.id, ()=>anim.reset());
      const speedSel = document.getElementById('speed-'+p.id);
      if(speedSel) speedSel.addEventListener('change', e=>anim.setSpeed(e.target.value));
      /* 模式切换（mode-chip） */
      const wrap = canvas.closest('.anim-wrap');
      if(wrap) wrap.querySelectorAll('.mode-chip').forEach(chip=>{
        chip.addEventListener('click', ()=>{
          wrap.querySelectorAll('.mode-chip').forEach(c=>c.classList.remove('active'));
          chip.classList.add('active');
          anim.setMode(chip.dataset.mode);
          anim.reset();
        });
      });
      anim.reset();
    });
  }

  function refitAll(){
    const { ALL_ANIMS } = KB_ANIM_BASE;
    ALL_ANIMS.forEach(a=>{ a._fit(); a.render(); });
  }

  /* 销毁全部动画实例：章节切换时调用，停掉 rAF 循环并清空注册表 */
  function disposeAll(){
    const { ALL_ANIMS } = KB_ANIM_BASE;
    ALL_ANIMS.forEach(a=>{ a.pause(); });
    ALL_ANIMS.length = 0;
  }

  window.KB_ANIM = window.KB_ANIM || {};
  KB_ANIM.AnimationFactories = AnimationFactories;
  KB_ANIM.initAnimations = initAnimations;
  KB_ANIM.refitAll = refitAll;
  KB_ANIM.disposeAll = disposeAll;
})();
