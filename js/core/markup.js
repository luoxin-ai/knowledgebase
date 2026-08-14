/* ================================================================
 * markup.js —— 行内标记解析
 * ----------------------------------------------------------------
 * 支持（在数据文件的 summary / points / details.body 中使用）：
 *   **文字**    → 重点标记（红色高亮）
 *   ==文字==    → 记忆标记（琥珀荧光）
 *   `代码`      → 行内代码
 *   [[口诀]] 内容 → 口诀提示块
 *   [[警示]] 内容 → 警示块
 * 注意：先转义再替换，数据中不要写原始 HTML。
 * ================================================================ */
(function(){
  'use strict';

  function esc(s){
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function inlineMarkup(s){
    if(!s) return '';
    let out = esc(s);
    out = out
      .replace(/==([^=\n]+)==/g, '<mark class="mk-mem">$1</mark>')
      .replace(/\*\*([^*\n]+)\*\*/g, '<b class="mk-key">$1</b>')
      .replace(/`([^`\n]+)`/g, '<code class="mk-code">$1</code>');
    out = out
      .replace(/\[\[口诀\]\]\s*([^\n]+)/g, '<div class="mk-mnemonic">$1</div>')
      .replace(/\[\[警示\]\]\s*([^\n]+)/g, '<div class="mk-warn">$1</div>');
    return out;
  }

  window.KB = window.KB || {};
  KB.markup = { esc, inlineMarkup };
})();
