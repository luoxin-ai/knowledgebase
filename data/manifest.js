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
  'data/11408/diagrams-ds.js',
  'data/11408/quiz-ds-a.js',
  'data/11408/quiz-ds-b.js',
  'data/11408/quiz-co.js',
  'data/11408/quiz-os.js',
  'data/11408/quiz-cn.js',
  'data/11408/computer-org.js',
  'data/11408/diagrams-co.js',
  'data/11408/operating-system.js',
  'data/11408/diagrams-os.js',
  'data/11408/computer-network.js',
  'data/11408/diagrams-cn.js',
  'data/11408/higher-math.js',
  'data/11408/linear-algebra.js',
  'data/11408/probability.js',
  'data/11408/quiz-hm.js',
  'data/11408/quiz-la.js',
  'data/11408/quiz-prob.js',
  'data/politics/_index.js',
  'data/politics/maoyuan.js',
  'data/politics/quiz-maoyuan-single.js',
  'data/politics/quiz-maoyuan-multi.js',
  'data/politics/maozedong.js',
  'data/politics/quiz-maozedong-single.js',
  'data/politics/quiz-maozedong-multi.js',
  'data/politics/sixiang.js',
  'data/politics/quiz-sixiang-single.js',
  'data/politics/quiz-sixiang-multi.js',
  'data/politics/shigang.js',
  'data/politics/quiz-shigang-single.js',
  'data/politics/quiz-shigang-multi.js',
  'data/politics/sixiu.js',
  'data/politics/quiz-sixiu-single.js',
  'data/politics/quiz-sixiu-multi.js',
  'data/english/_index.js',
  'data/english/cloze.js',
  'data/english/reading-simu.js',
  'data/english/newtype.js',
  'data/english/translation.js',
  'data/english/writing.js'
];
