/* ================================================================
 * registry.js —— 图示注册表（KB_DIAG）
 * ----------------------------------------------------------------
 * 设计原则（与 quiz 文件的 quizFor 模式一致）：
 *   - 图在独立文件里按 id 注册（data/11408/diagrams-*.js）
 *   - 章节文件只写一行引用 { type:'diagram', ref:'<id>' }
 *   - 渲染期按 id 查表，加载顺序无关，章节文件不含图形数据
 * 注册两种形态：
 *   生成器图：{ id, svgType:'graph'|'bitfield', title, data }
 *   逃生舱图：{ id, svg:'<svg ...>' }（raw，仅一次性图，占比 ≤20%）
 * ================================================================ */
(function(){
  'use strict';
  const map = {};
  const order = [];

  const KB_DIAG = {
    register(entry){
      if(!entry || !entry.id) throw new Error('KB_DIAG.register: 缺少 id');
      if(map[entry.id]) throw new Error('KB_DIAG.register: 重复 id ' + entry.id);
      map[entry.id] = entry;
      order.push(entry.id);
    },
    get(id){ return map[id] || null; },
    list(){ return order.map(id => map[id]); },
    has(id){ return !!map[id]; }
  };

  window.KB_DIAG = KB_DIAG;
})();
