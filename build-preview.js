'use strict';
/* ================================================================
 * build-preview.js —— 生成本地自包含入口 index.html
 * ----------------------------------------------------------------
 * 背景：index.html 原本靠 loader 动态注入 42 个 data/*.js。
 * 在 Chrome 下 file:// 能加载外部脚本，但 Safari 等浏览器会拦截
 * file:// 页面的外部子资源 → 脚本/样式全挂 → 白屏。
 * 本脚本把 css + 全部固定 js + manifest 列出的全部 data js 内联成
 * 单文件，不再依赖任何外部资源；file:// 双击即可完整运行。
 *
 * 用法：node build-preview.js   （改完 js/css/data 后重跑一次即可）
 * ================================================================ */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function read(p){ return fs.readFileSync(path.join(ROOT, p), 'utf8'); }

/* 固定 JS（除 loader.js：数据已内联，无需动态加载） */
const fixed = [
  'js/core/registry.js',
  'js/svg/registry.js',
  'js/svg/generators.js',
  'js/core/markup.js',
  'js/core/highlight.js',
  'js/core/renderer.js',
  'js/core/sidebar.js',
  'js/core/search.js',
  'js/core/progress.js',
  'js/animations/base.js',
  'js/animations/sort.js',
  'js/animations/tree.js',
  'js/animations/graph.js',
  'js/animations/huffman.js',
  'js/animations/kmp.js',
  'js/animations/os.js',
  'js/animations/network.js',
  'js/animations/extra.js',
  'js/animations/factory.js',
  'js/core/app.js'
];

/* 从 manifest.js 解析数据清单 */
const win = {};
new Function('window', read('data/manifest.js'))(win);
const dataFiles = win.KB_MANIFEST;

const css = read('css/main.css');

let js = '';
for(const f of fixed){ js += '\n/* ===== ' + f + ' ===== */\n' + read(f); }
for(const f of dataFiles){ js += '\n/* ===== ' + f + ' ===== */\n' + read(f); }
js += '\n/* ===== boot ===== */\nif(window.KB_APP && KB_APP.init){ KB_APP.init(); }\n';

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>一篇学完 · 交互式知识库</title>
<style>
${css}
</style>
</head>
<body>
<header class="topbar">
  <button class="hamburger" id="hamburger" aria-label="打开侧边栏">☰</button>
  <div class="brand"><div class="brand-logo">篇</div><span class="brand-title">一篇学完</span></div>
  <div class="search-wrap">
    <div class="search-box" id="search-box">
      <input id="search-input" type="text" placeholder="搜索全部知识…" autocomplete="off" spellcheck="false">
      <button class="search-clear" id="search-clear">✕</button>
    </div>
    <div class="search-panel" id="search-panel"></div>
  </div>
  <button class="drill-btn" id="drill-btn">刷题</button>
</header>
<div class="progress-track"><div class="progress-bar" id="progress-bar"></div></div>
<div class="layout">
  <aside class="sidebar" id="sidebar"><div class="sidebar-inner">
    <div class="sidebar-top"><span class="sidebar-title">知识库</span>
      <button class="sidebar-collapse" id="sidebar-collapse" aria-label="收起侧边栏"></button></div>
    <nav class="tree" id="file-tree"></nav>
  </div></aside>
  <main class="main"><div class="content" id="content"></div></main>
  <aside class="toc" id="toc"></aside>
</div>
<button class="sidebar-expand" id="sidebar-expand" aria-label="展开侧边栏"></button>
<div class="overlay" id="overlay"></div>
<script>
${js}
</script>
</body>
</html>`;

const outIndex = path.join(ROOT, 'index.html');
fs.writeFileSync(outIndex, html, 'utf8');
console.log('written', path.relative(process.cwd(), outIndex), (html.length/1024).toFixed(0)+'KB');
