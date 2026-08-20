/* 实测：测验模式(乱序)下单选/多选判分是否正确
 * 方法：注入一个答案已知的合成 quiz 文件 → renderChapter → 切到测验模式
 * → 点击"正确答案"对应的按钮 → 断言是否被判为 correct
 * 跑多轮以覆盖非恒等洗牌 */
'use strict';
const path = require('path');
const puppeteer = require('/Users/luoxin/.workbuddy/binaries/node/workspace/node_modules/puppeteer');
const SYS = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r=>setTimeout(r,ms));

(async()=>{
  const browser = await puppeteer.launch({ headless:'new', executablePath:SYS,
    args:['--no-sandbox','--disable-gpu','--allow-file-access-from-files'] });
  const page = await browser.newPage();
  page.on('pageerror', e=>console.log('PAGEERR', e.message));
  await page.goto('file://'+path.resolve('index.html'), { waitUntil:'networkidle0', timeout:30000 });
  await sleep(800);

  // 注入合成 quiz 文件（单选 answer='b'；多选 answer='abd'）
  await page.evaluate(()=>{
    KB.register({ id:'zztest', folder:'11408', type:'book', title:'测试', chapters:[{
      id:'c1', num:1, title:'测', blocks:[{
        type:'quiz', id:'zzq', title:'判分验证', questions:[
          { qid:'t-single', stem:'单选：选 B', options:['A错','B对','C错','D错'], answer:'b' },
          { qid:'t-multi', stem:'多选：选 ABD', options:['A对','B对','C错','D对'], answer:'abd', multi:true }
        ]}
      ]}]
    });
  });

  let singleWrong=0, multiWrong=0, rounds=0;
  for(let round=0; round<12; round++){
    // 渲染该章（默认复习模式）
    await page.evaluate(()=>{
      const f = KB.getFile('zztest');
      KB.render.renderChapter(f, 'c1');
    });
    await sleep(150);
    // 切到测验模式（乱序）
    await page.evaluate(()=>{
      const btn = document.querySelector('.qz-mode-btn');
      if(btn) btn.click();
    });
    await sleep(150);
    // 记录当前洗牌序，判断是否恒等（恒等则该轮 bug 不显现，跳过）
    const info = await page.evaluate(()=>{
      /* 按类选择，避免「测验模式题序乱序后 single 不在 data-q=0」导致的误判：
         单选 = 非 multi 的 qz-item；多选 = .qz-item.multi。再按原始索引点正确答案 */
      const singleItem = document.querySelector('.qz-item:not(.multi)');
      const singleBtns = singleItem ? [...singleItem.querySelectorAll('.qz-opt')] : [];
      const correctBtn = singleBtns.find(b=>b.dataset.o==='1');  // 'b' = 原始索引 1
      if(correctBtn) correctBtn.click();
      // 多选：点原始索引 {0,1,3}（answer='abd'），再提交
      const multiItem = document.querySelector('.qz-item.multi');
      if(multiItem){
        [...multiItem.querySelectorAll('.qz-opt')].forEach(b=>{
          if(['0','1','3'].includes(b.dataset.o)) b.click();
        });
        const sub = multiItem.querySelector('.qz-submit-multi');
        if(sub) sub.click();
      }
      const singleOk = singleItem && singleItem.classList.contains('correct');
      const singleBad = singleItem && singleItem.classList.contains('wrong');
      const multiOk = multiItem && multiItem.classList.contains('correct');
      const multiBad = multiItem && multiItem.classList.contains('wrong');
      return { singleOk, singleBad, multiOk, multiBad };
    });
    rounds++;
    if(info.singleBad) singleWrong++;
    if(info.multiBad) multiWrong++;
  }
  console.log('轮次:', rounds);
  console.log('单选-选了正确答案却被判错的次数:', singleWrong);
  console.log('多选-选了正确答案却被判错的次数:', multiWrong);
  console.log(singleWrong>0 || multiWrong>0 ? '❌ 确认 bug：测验模式判分错误' : '✔ 测验模式判分正常');
  await browser.close();
})().catch(e=>{ console.error('FATAL', e); process.exit(2); });
