/* ================================================================
 * generators.js —— SVG 生成器（KB_SVG）
 * ----------------------------------------------------------------
 * 纯函数、零 DOM 依赖，返回 SVG 字符串；颜色全部走 CSS 类（var() 主题化）。
 * 坐标写死在数据里，本文件只做「哑巴渲染器」——改布局动数据、改样式动 CSS、
 * 改生成器本身永不需要。这是降低耦合的关键约定。
 * 两个生成器即全部契约：graph（节点-边）/ bitfield（位段条）。
 * raw 逃生舱图不含 type，由 renderer 直接出 entry.svg。
 * ================================================================ */
(function(){
  'use strict';

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* 每个 SVG 内联唯一 marker id，避免同页多图 arrow 冲突 */
  let SVG_SEQ = 0;

  /* ---------- graph：通用节点-边哑巴渲染器 ---------- */
  function nodeShape(n){
    const tone = n.tone || 'blue';
    const label = String(n.label == null ? '' : n.label);
    const lines = label.split('\n');
    let inner;
    if(n.shape === 'rect'){
      const w = n.w || 100, h = n.h || 44;
      const x = (n.x || 0) - w / 2, y = (n.y || 0) - h / 2;
      inner = '<rect class="dg-shape" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) +
        '" width="' + w + '" height="' + h + '" rx="8"></rect>';
    } else {
      const r = n.r || 20;
      inner = '<circle class="dg-shape" cx="' + (n.x || 0) + '" cy="' + (n.y || 0) + '" r="' + r + '"></circle>';
    }
    let text;
    if(lines.length === 1){
      text = '<text class="dg-label" x="' + (n.x || 0) + '" y="' + (n.y || 0) + '">' + esc(lines[0]) + '</text>';
    } else {
      const startY = (n.y || 0) - (lines.length - 1) * 8;
      text = '<text class="dg-label" x="' + (n.x || 0) + '" y="' + startY + '">' +
        lines.map((ln, i) => '<tspan x="' + (n.x || 0) + '" dy="' + (i === 0 ? 0 : 16) + '">' + esc(ln) + '</tspan>').join('') +
        '</text>';
    }
    return '<g class="dg-node tone-' + tone + '">' + inner + text + '</g>';
  }

  function edgeGeometry(e, a, b){
    if((e.curve || 0) > 0){
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const off = (e.curve || 0) * len * 0.28;
      const cx = mx - dy / len * off, cy = my + dx / len * off;
      return {
        d: 'M' + a.x + ',' + a.y + ' Q' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' ' + b.x + ',' + b.y,
        lx: 0.25 * a.x + 0.5 * cx + 0.25 * b.x,
        ly: 0.25 * a.y + 0.5 * cy + 0.25 * b.y - 7
      };
    }
    return { d: 'M' + a.x + ',' + a.y + ' L' + b.x + ',' + b.y, lx: (a.x + b.x) / 2, ly: (a.y + b.y) / 2 - 7 };
  }

  function graph(data){
    const W = data.width || 680, H = data.height || 300;
    const nodes = data.nodes || [];
    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.id] = n; });
    const containers = data.containers || [];
    // 容器也可作为边的端点：edgeGeometry 只用 x/y，容器 x/y 即其中心
    containers.forEach(c => { nodeMap[c.id] = c; });
    const uid = 'dg' + (++SVG_SEQ);

    /* 分区容器：大圆角浅底矩形作背景，底部居中分区标题，子节点叠加其上 */
    let conts = '<g class="dg-containers">';
    containers.forEach(c => {
      const tone = c.tone || 'gray';
      const cw = c.w || 160, ch = c.h || 120;
      const cx = (c.x || 0) - cw / 2, cy = (c.y || 0) - ch / 2;
      conts += '<g class="dg-container tone-' + tone + '">' +
        '<rect class="dg-shape dg-container-box" x="' + cx.toFixed(1) + '" y="' + cy.toFixed(1) +
        '" width="' + cw + '" height="' + ch + '" rx="14"></rect>';
      if(c.label) conts += '<text class="dg-container-label" x="' + (c.x || 0) + '" y="' + (cy + ch - 12) + '">' + esc(c.label) + '</text>';
      conts += '</g>';
    });
    conts += '</g>';

    let edges = '<g class="dg-edges">';
    (data.edges || []).forEach(e => {
      const a = nodeMap[e.from], b = nodeMap[e.to];
      if(!a || !b) return;
      const p = edgeGeometry(e, a, b);
      const arrow = e.arrow !== false;
      const cls = 'dg-edge' + (e.dashed ? ' dashed' : '') + (e.tone ? (' edge-' + e.tone) : '');
      edges += '<path class="' + cls + '" d="' + p.d + '"' +
        (arrow ? (' marker-end="url(#dg-arrow-' + uid + ')"') : '') + '></path>';
      if(e.label) edges += '<text class="dg-edge-label" x="' + p.lx.toFixed(1) + '" y="' + p.ly.toFixed(1) + '">' + esc(e.label) + '</text>';
    });
    edges += '</g>';

    const ns = '<g class="dg-nodes">' + nodes.map(nodeShape).join('') + '</g>';

    let notes = '<g class="dg-notes">';
    (data.notes || []).forEach(nt => {
      notes += '<text class="dg-note' + (nt.small ? ' small' : '') + '" x="' + (nt.x || 0) + '" y="' + (nt.y || 0) + '">' + esc(nt.text) + '</text>';
    });
    notes += '</g>';

    return '<svg class="dg-svg" viewBox="0 0 ' + W + ' ' + H + '" width="100%" ' +
      'preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(data.aria || data.title || '示意图') + '">' +
      '<title>' + esc(data.title || '示意图') + '</title>' +
      '<defs><marker id="dg-arrow-' + uid + '" viewBox="0 0 10 10" refX="9" refY="5" ' +
      'markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
      '<path d="M0,0 L10,5 L0,10 z" fill="var(--text-3)"></path></marker></defs>' +
      conts + edges + ns + notes + '</svg>';
  }

  /* ---------- bitfield：位段条 ---------- */
  function bitfield(data){
    const total = data.totalBits || 32;
    const segs = data.segs || [];
    const W = 680, padX = 12, y = 52, h = 48;
    const innerW = W - padX * 2;
    const bitW = innerW / total;
    let x = padX;
    let body = '';
    segs.forEach(s => {
      const w = s.bits * bitW;
      const tone = s.tone || 'blue';
      body += '<g class="dg-node tone-' + tone + '">' +
        '<rect class="dg-shape" x="' + x.toFixed(1) + '" y="' + y + '" width="' + Math.max(0, (w - 2)).toFixed(1) + '" height="' + h + '" rx="6"></rect>' +
        '<text class="dg-label" x="' + (x + w / 2).toFixed(1) + '" y="' + (y + h / 2) + '">' + esc(s.name) + '</text></g>';
      body += '<text class="dg-note" x="' + (x + w / 2).toFixed(1) + '" y="' + (y + h + 16) + '">' + s.bits + ' 位</text>';
      if(s.note) body += '<text class="dg-note small" x="' + (x + w / 2).toFixed(1) + '" y="' + (y + h + 30) + '">' + esc(s.note) + '</text>';
      x += w;
    });
    let bitLabels = '';
    if(data.bitLabels){
      for(let i = 0; i <= total; i++){
        const bx = padX + i * bitW;
        bitLabels += '<text class="dg-note small" x="' + bx.toFixed(1) + '" y="' + (y - 14) + '">' + esc(total - i) + '</text>';
      }
    }
    const H = y + h + (segs.some(s => s.note) ? 48 : 32);
    return '<svg class="dg-svg" viewBox="0 0 ' + W + ' ' + H + '" width="100%" ' +
      'preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(data.aria || data.title || '位段划分') + '">' +
      '<title>' + esc(data.title || '位段划分') + '</title>' + bitLabels + body + '</svg>';
  }

  window.KB_SVG = { graph, bitfield };
})();
