/* 视觉层回归验证：逐章打开，检查图示是否真实可见（容器非黑块、文字非透明）
 * 用法：node verify-visual.js [index.html]
 */
'use strict';
const path = require('path');
const puppeteer = require('/Users/luoxin/.workbuddy/binaries/node/workspace/node_modules/puppeteer');
const SYS = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FILE = 'file://' + path.resolve(__dirname, process.argv[2] || 'index.html');

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', executablePath: SYS,
    args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));

  await page.goto(FILE, { waitUntil: 'networkidle0', timeout: 30000 });
  await sleep(800);

  const chapters = await page.evaluate(() =>
    (window.KB && KB.listFiles ? KB.listFiles() : []).flatMap(f =>
      (f.chapters || []).map(c => ({ file: f.id, ch: c.id }))));

  let totalSvg = 0, badBox = 0, badLabel = 0, checkedChapters = 0;
  const bad = [];
  const seenTitles = new Set();
  for (const { file, ch } of chapters) {
    await page.evaluate((fId, cId) => {
      const f = (window.KB.listFiles().find(x => x.id === fId));
      if (f) window.KB.render.renderChapter(f, cId);
    }, file, ch);
    await sleep(120);
    const r = await page.evaluate(() => {
      const h = document.querySelector('#content h1, #content h2, #content .ch-title');
      const title = h ? h.innerText.trim() : '(无标题)';
      const svgs = [...document.querySelectorAll('#content .dg-svg')];
      let boxBlack = 0, labelInvis = 0;
      for (const svg of svgs) {
        svg.querySelectorAll('.dg-container-box').forEach(b => {
          const fill = getComputedStyle(b).fill;
          if (!fill || fill === 'rgb(0, 0, 0)' || fill === 'none' || fill === 'transparent') boxBlack++;
        });
        svg.querySelectorAll('.dg-label, text').forEach(t => {
          const fill = getComputedStyle(t).fill;
          if (fill === 'rgb(0, 0, 0)' || fill === 'none' || fill === 'transparent') labelInvis++;
        });
      }
      return { n: svgs.length, boxBlack, labelInvis, title };
    });
    seenTitles.add(r.title);
    totalSvg += r.n;
    if (r.boxBlack || r.labelInvis) {
      badBox += r.boxBlack; badLabel += r.labelInvis;
      bad.push(`${file}/${ch}: box黑=${r.boxBlack} label不可见=${r.labelInvis}`);
    }
    checkedChapters++;
  }

  const contentLen = await page.evaluate(() => (document.getElementById('content') || {}).innerHTML?.length || -1);
  console.log('章节遍历数   :', checkedChapters);
  console.log('去重章节标题数:', seenTitles.size, '(应接近 198，证明逐章切换)');
  console.log('图示 dg-svg 总数:', totalSvg);
  console.log('黑块容器数   :', badBox);
  console.log('不可见文字数 :', badLabel);
  console.log('控制台报错   :', errors.length, errors.slice(0, 5));
  console.log('contentLen   :', contentLen);
  if (bad.length) { console.log('\\n❌ 视觉异常章节:'); bad.forEach(b => console.log('  -', b)); }
  else console.log('\\n✔ 全部图示视觉正常（无黑块、文字可见）');
  await browser.close();
  process.exit(bad.length || errors.length ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
