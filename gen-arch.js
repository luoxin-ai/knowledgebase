'use strict';
// 生成 architecture.svg：项目整体架构图（独立内联样式，不依赖 main.css）
const fs = require('fs');
const W = 980, PAD = 34;
const LAYER_X = PAD, LAYER_W = W - PAD * 2;
const TITLE_H = 26, BOX_H = 54, GAP_V = 18, PAD_IN = 12, ROW_GAP = 10, MAX_PER_ROW = 3;

const TONES = {
  blue:   { fill:'#e8f0fe', stroke:'#1a73e8', text:'#0b3d91', tab:'#1a73e8' },
  green:  { fill:'#e6f4ea', stroke:'#1e8e3e', text:'#0d652d', tab:'#1e8e3e' },
  amber:  { fill:'#fef7e0', stroke:'#f9ab00', text:'#7a5b00', tab:'#f9ab00' },
  purple: { fill:'#f3e8fd', stroke:'#a142f4', text:'#4a1d7a', tab:'#a142f4' },
  teal:   { fill:'#e0f5f5', stroke:'#12a594', text:'#085c54', tab:'#12a594' },
  gray:   { fill:'#eceff1', stroke:'#5f6b7a', text:'#263238', tab:'#5f6b7a' },
};

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function wrap(d){
  if (d.length <= 34) return [d];
  if (d.includes(' · ')) {
    const parts = d.split(' · ');
    if (parts.length === 2) return parts;
    const l1 = parts.slice(0, Math.ceil(parts.length/2)).join(' · ');
    const l2 = parts.slice(Math.ceil(parts.length/2)).join(' · ');
    return [l1, l2];
  }
  const mid = Math.floor(d.length/2);
  let sp = d.indexOf(' ', mid);
  if (sp === -1) sp = d.lastIndexOf(' ', mid);
  if (sp === -1) return [d];
  return [d.slice(0,sp), d.slice(sp+1)];
}

const layers = [
  { name:'入口层 · Entry', tone:'blue', items:[
    { t:'index.html', d:'自包含单文件 · 0 外部引用 · file:// 与 HTTP 通用' } ] },
  { name:'核心引擎层 · Core Engine', tone:'green', items:[
    { t:'KB 注册表', d:'registry.js · register / listFiles' },
    { t:'KB_DIAG 图示注册表', d:'svg/registry.js · register/get/list/has' },
    { t:'KB_SVG 生成器', d:'svg/generators.js · graph / bitfield / raw' } ] },
  { name:'渲染层 · Rendering', tone:'amber', items:[
    { t:'renderer.js', d:'块渲染器 · renderDiagram 调用 KB_SVG 与 KB_DIAG' },
    { t:'markup / highlight', d:'排版与代码高亮' } ] },
  { name:'交互 / UI 层', tone:'purple', items:[
    { t:'app.js', d:'KB_APP.init · 路由 · 哈希' },
    { t:'sidebar.js', d:'章节树' },
    { t:'search.js', d:'全文搜索' },
    { t:'progress.js', d:'localStorage · 答题 / 错题 / 三态 / 遗忘曲线' },
    { t:'animations/*', d:'sort / tree / graph / huffman / kmp / os / network + factory' } ] },
  { name:'数据层 · Data', tone:'teal', items:[
    { t:'data/manifest.js', d:'KB_MANIFEST · 42 文件' },
    { t:'data/11408/', d:'408 · ds / co / os / cn + 数学 + 测验' },
    { t:'data/politics/', d:'毛原 / 毛中特 / 思修 / 史纲 / 思修' },
    { t:'data/english/', d:'完型 / 阅读 / 新题型 / 翻译 / 写作' } ] },
  { name:'构建与校验 · Build & Verify', tone:'gray', items:[
    { t:'build-preview.js', d:'内联全部 → index.html 自包含' },
    { t:'loader.js', d:'HTTP 部署时动态注入 42 数据文件' },
    { t:'test/smoke.test.js', d:'172 断言 · Node mock DOM' },
    { t:'verify-visual.js', d:'逐章真渲染 · 黑块回归检查' } ] },
];

const layerInfo = layers.map(L => {
  const rows = Math.ceil(L.items.length / MAX_PER_ROW);
  const h = TITLE_H + PAD_IN + rows*BOX_H + (rows-1)*ROW_GAP + PAD_IN;
  return { ...L, rows, h };
});

let y = 54;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 800" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">\n`;
svg += `<rect x="0" y="0" width="${W}" height="800" fill="#f7f8fa"/>\n`;
svg += `<text x="${W/2}" y="33" text-anchor="middle" font-size="20" font-weight="700" fill="#1f2933">一篇学完 · 交互式知识库 — 整体架构</text>\n`;

const boxes = [];
layerInfo.forEach((L, i) => {
  const tone = TONES[L.tone];
  const ly = y;
  // container
  svg += `<rect x="${LAYER_X}" y="${ly}" width="${LAYER_W}" height="${L.h}" rx="14" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="1.5"/>\n`;
  // title tab (rounded top only)
  svg += `<path d="M${LAYER_X},${ly+14} L${LAYER_X},${ly} Q${LAYER_X},${ly} ${LAYER_X},${ly} L${LAYER_X+LAYER_W},${ly} L${LAYER_X+LAYER_W},${ly+14} Z" fill="${tone.tab}"/>\n`;
  svg += `<rect x="${LAYER_X}" y="${ly+14}" width="${LAYER_W}" height="${TITLE_H-14}" fill="${tone.tab}"/>\n`;
  svg += `<text x="${LAYER_X+14}" y="${ly+17}" font-size="13" font-weight="700" fill="#ffffff">${esc(L.name)}</text>\n`;
  // items
  const gw = (LAYER_W - (MAX_PER_ROW+1)*16) / MAX_PER_ROW;
  L.items.forEach((it, idx) => {
    const row = Math.floor(idx / MAX_PER_ROW);
    const col = idx % MAX_PER_ROW;
    const inRowCount = Math.min(MAX_PER_ROW, L.items.length - row*MAX_PER_ROW);
    const totalRowW = inRowCount*gw + (inRowCount-1)*16;
    const startX = LAYER_X + (LAYER_W - totalRowW)/2;
    const bx = startX + col*(gw + 16);
    const by = ly + TITLE_H + PAD_IN + row*(BOX_H + ROW_GAP);
    svg += `<rect x="${bx}" y="${by}" width="${gw}" height="${BOX_H}" rx="8" fill="#ffffff" stroke="${tone.stroke}" stroke-width="1"/>\n`;
    svg += `<text x="${bx+gw/2}" y="${by+22}" text-anchor="middle" font-size="13" font-weight="700" fill="${tone.text}">${esc(it.t)}</text>\n`;
    const wl = wrap(it.d);
    if (wl[1]) {
      svg += `<text x="${bx+gw/2}" y="${by+37}" text-anchor="middle" font-size="10" fill="#52606d">${esc(wl[0])}</text>\n`;
      svg += `<text x="${bx+gw/2}" y="${by+49}" text-anchor="middle" font-size="10" fill="#52606d">${esc(wl[1])}</text>\n`;
    } else {
      svg += `<text x="${bx+gw/2}" y="${by+43}" text-anchor="middle" font-size="10" fill="#52606d">${esc(wl[0])}</text>\n`;
    }
  });
  boxes.push({ ly, ly2: ly + L.h });
  y += L.h + GAP_V;
});

const H = y + 20;
svg += `<defs><marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#5f6b7a"/></marker></defs>\n`;
for (let i = 0; i < boxes.length - 1; i++) {
  svg += `<line x1="${W/2}" y1="${boxes[i].ly2}" x2="${W/2}" y2="${boxes[i+1].ly}" stroke="#5f6b7a" stroke-width="2" marker-end="url(#ah)"/>\n`;
}
const midY = (boxes[3].ly2 + boxes[4].ly)/2;
svg += `<text x="${W/2+10}" y="${midY+4}" font-size="10" fill="#5f6b7a">读取数据：KB.listFiles / renderChapter</text>\n`;

svg = svg.replace(/viewBox="0 0 ${W} 800"/, `viewBox="0 0 ${W} ${H}"`);
svg = svg.replace(/height="800"/, `height="${H}"`);
svg += `</svg>\n`;
fs.writeFileSync('architecture.svg', svg, 'utf8');
console.log('written architecture.svg', svg.length, 'bytes, H=', H);
