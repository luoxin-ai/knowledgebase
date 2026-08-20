/* ================================================================
 * highlight.js —— C 代码语法高亮 + 代码块渲染（行号 / 复制）
 * ================================================================ */
(function(){
  'use strict';
  const { esc } = KB.markup;

  const C_KEYWORDS = 'auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|restrict|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while';

  function highlightLine(code){
    if(!code) return '';
    /* 审计 L5：修复「字符串字面量丢高亮」。此前先 esc(code) 把双引号变成 &quot;，
       再跑正则找字面量 '"...'" —— 已无字面引号，字符串组永远不匹配，字符串常量失去高亮。
       现改为对原始 code 正则扫描：匹配到的片段先 esc 再包 span；片段之间的普通文本也 esc，
       既恢复字符串高亮，又保证 < > & 等字符不会突破 HTML。 */
    const re = new RegExp(
      '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')|' +
      '\\b('+C_KEYWORDS+')\\b|' +
      '\\b(0[xX][0-9a-fA-F]+|\\d+\\.?\\d*)\\b',
      'g'
    );
    let out = '';
    let last = 0;
    let m;
    while((m = re.exec(code)) !== null){
      /* 匹配前的普通文本：转义后输出 */
      if(m.index > last) out += esc(code.slice(last, m.index));
      const text = m[0];
      if(m[1]) out += '<span class="tok-c">'+esc(text)+'</span>';
      else if(m[2]) out += '<span class="tok-s">'+esc(text)+'</span>';
      else if(m[3]) out += '<span class="tok-k">'+esc(text)+'</span>';
      else if(m[4]) out += '<span class="tok-n">'+esc(text)+'</span>';
      /* 防御零宽匹配死循环 */
      if(m.index === re.lastIndex) re.lastIndex++;
      last = m.index + text.length;
    }
    if(last < code.length) out += esc(code.slice(last));
    return out;
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
