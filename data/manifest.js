/* ================================================================
 * data/manifest.js —— 数据文件清单（唯一的加载清单）
 * ----------------------------------------------------------------
 * 新增知识文档：在此追加一行路径即可，index.html 永远不用改。
 * 顺序约定：先 _index.js（定义文件夹/科目层级），再各数据文件。
 * loader.js 会按此清单串行动态加载，全部完成后初始化应用。
 * ================================================================ */
window.KB_MANIFEST = [
  'data/11408/_index.js',
  'data/11408/data-structure.js',
  'data/11408/quiz-ds-a.js',
  'data/11408/quiz-ds-b.js',
  'data/11408/computer-org.js',
  'data/11408/operating-system.js',
  'data/11408/computer-network.js',
  'data/11408/higher-math.js',
  'data/11408/linear-algebra.js',
  'data/11408/probability.js',
  'data/papers/_index.js',
  'data/papers/kmp-paper.js'
];
