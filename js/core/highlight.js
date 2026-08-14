/* ================================================================
 * highlight.js —— C 代码语法高亮 + 代码块渲染（行号 / 复制）
 * ================================================================ */
(function(){
  'use strict';
  const { esc } = KB.markup;

  const C_KEYWORDS = 'auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|restrict|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while';

  function highlightLine(code){
    if(!code) return '';
    const src = esc(code);
    /* 四个捕获组：注释 / 字符串 / 关键字 / 数字
       此前关键字用 (?:C_KEYWORDS) 非捕获组，导致 replace 回调第 5 个参数
       (offset) 被误当成数字，关键字被替换成行内偏移数字；现改为捕获组，
       回调参数 c/s/k/n 与组号一一对应，offset 不再被误用 */
    const re = new RegExp(
      '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')|' +
      '\\b('+C_KEYWORDS+')\\b|' +
      '\\b(0[xX][0-9a-fA-F]+|\\d+\\.?\\d*)\\b',
      'g'
    );
    return src.replace(re, (m, c, s, k, n)=>{
      if(c) return '<span class="tok-c">'+c+'</span>';
      if(s) return '<span class="tok-s">'+s+'</span>';
      if(k) return '<span class="tok-k">'+k+'</span>';
      if(n) return '<span class="tok-n">'+n+'</span>';
      return m;
    });
  }

  /** 渲染带行号 + 复制按钮的代码块 */
  function renderCodeBlock(code, lang){
    if(!code) return '';
    const lines = code.replace(/\n$/,'').split('\n');
    const rows = lines.map((ln,i)=>
      '<div class="code-line"><span class="ln">'+(i+1)+'</span><span class="src">'+(highlightLine(ln)||' ')+'</span></div>'
    ).join('');
    const safe = esc(code).replace(/"/g,'&quot;');
    return '<div class="code-block" data-code="'+safe+'">'+
      '<div class="code-bar"><span class="code-dots"><i></i><i></i><i></i></span>'+
      '<span class="code-lang">'+(lang||'C')+'</span>'+
      '<button class="code-copy" title="复制代码">⧉ 复制</button></div>'+
      '<div class="code-pre">'+rows+'</div></div>';
  }

  window.KB = window.KB || {};
  KB.highlight = { highlightLine, renderCodeBlock };
})();
