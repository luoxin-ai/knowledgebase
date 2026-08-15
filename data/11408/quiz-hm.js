KB.register({
  id: 'quiz-hm',
  folder: 'math',
  hidden: true,
  quizFor: { book: 'hm', fromNum: 1 },
  type: 'book',
  title: '高数习题',
  source: '考研数学一配套自测',
  updated: '2026-08',
  chapters: [
    {
      id: 'qch1',
      num: 1,
      title: '函数极限连续·自测',
      titleEn: 'Quiz 1',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 1 章 函数极限连续',
          summary: '',
          questions: [
            { qid: 'qh-c1-q1', stem: '函数 f(x) = (x² - 1)/(x - 1) 在 x = 1 处', options: ['无定义且极限不存在', '无定义但极限存在', '有定义且连续', '有定义但极限不存在'], answer: 'b', explain: 'f(x) 在 x = 1 无定义,但 lim(x→1)(x² - 1)/(x - 1) = lim(x→1)(x + 1) = 2 存在,故选 b。' },
            { qid: 'qh-c1-q2', stem: 'lim(x→0) sin(3x)/x =', options: ['0', '1', '3', '∞'], answer: 'c', explain: '当 x→0 时 sin(3x) ~ 3x,故原极限 = lim 3x/x = 3,故选 c。' },
            { qid: 'qh-c1-q3', stem: 'lim(x→0) (1 - cos x)/x² =', options: ['1/2', '1', '0', '2'], answer: 'a', explain: '当 x→0 时 1 - cos x ~ x²/2,故原极限 = 1/2,故选 a。' },
            { qid: 'qh-c1-q4', stem: 'lim(x→∞) (1 + 2/x)^x =', options: ['e', 'e³', 'e^(1/2)', 'e²'], answer: 'd', explain: '(1 + 2/x)^x = [(1 + 2/x)^(x/2)]²,内层极限为 e,故原极限 = e²,故选 d。' },
            { qid: 'qh-c1-q5', stem: '当 x→0 时,tan x - sin x 是 x 的', options: ['高阶无穷小', '同阶但不等价无穷小', '等价无穷小', '低阶无穷小'], answer: 'a', explain: 'tan x - sin x = tan x(1 - cos x) ~ x · x²/2 = x³/2,是 x 的三阶无穷小,即为高阶无穷小,故选 a。' },
            { qid: 'qh-c1-q6', stem: 'lim(x→0⁺) x·ln x =', options: ['1', '0', '-∞', '∞'], answer: 'b', explain: '令 t = 1/x,当 x→0⁺ 时 t→∞,x·ln x = -ln t/t,而 ln t 增长慢于 t,故极限为 0,故选 b。' },
            { qid: 'qh-c1-q7', stem: 'lim(n→∞) (1/n + 1/n² + ... + 1/nⁿ) =', options: ['1', 'e', '∞', '0'], answer: 'd', explain: '记 Sₙ = ∑(k=1→n) n^(-k),当 n ≥ 2 时按公比 1/n 的等比级数放缩:Sₙ < (1/n)/(1 - 1/n) = 1/(n - 1),而 Sₙ ≥ 1/n,由夹逼准则 Sₙ → 0,故选 d。' },
            { qid: 'qh-c1-q8', stem: '函数 f(x) = |x| 在 x = 0 处', options: ['连续且可导', '不连续但可导', '连续但不可导', '不连续且不可导'], answer: 'c', explain: 'lim(x→0)|x| = 0 = f(0) 连续;但左导数为 -1,右导数为 1,不相等,故不可导,故选 c。' },
            { qid: 'qh-c1-q9', stem: 'x→0 时,与 x² 同阶但不等价的无穷小是', options: ['tan x', 'sin x²', '1 - cos x', 'x·ln(1 + x)'], answer: 'c', explain: '1 - cos x ~ x²/2,与 x² 同阶不等价;sin x² ~ x² 与 x·ln(1 + x) ~ x² 均为等价;tan x ~ x 是一阶,故选 c。' },
            { qid: 'qh-c1-q10', stem: 'lim(x→0) (e^x - 1 - x)/x² =', options: ['1/2', '0', '1', '∞'], answer: 'a', explain: '由泰勒公式 e^x = 1 + x + x²/2 + o(x²),分子 = x²/2 + o(x²),故极限为 1/2,故选 a。' },
            { qid: 'qh-c1-q11', stem: '若 lim(x→0) f(x)/x = 2,则 lim(x→0) f(x) =', options: ['1', '2', '不存在', '0'], answer: 'd', explain: 'f(x) = [f(x)/x]·x,而 x→0 且 f(x)/x → 2,故 f(x) → 0,故选 d。' },
            { qid: 'qh-c1-q12', stem: 'lim(x→0⁺) (1/x)^x =', options: ['0', '1', 'e', '∞'], answer: 'b', explain: '(1/x)^x = e^(-x·ln x),而 x→0⁺ 时 x·ln x → 0,故极限 = e⁰ = 1,故选 b。' },
            { qid: 'qh-c1-q13', stem: 'f(x) = { x + 1, x ≤ 0; k - x, x > 0 } 在 x = 0 连续,则 k =', options: ['0', '1', '2', '-1'], answer: 'b', explain: '左极限 = 1,右极限 = k,连续需 k = 1,故选 b。' },
            { qid: 'qh-c1-q14', stem: 'lim(x→0) [ln(1 + 2x)]/x =', options: ['1', '1/2', '0', '2'], answer: 'd', explain: 'x→0 时 ln(1 + 2x) ~ 2x,故极限 = 2,故选 d。' },
            { qid: 'qh-c1-q15', stem: '函数 f(x) = 1/(1 - e^(1/x)) 在 x = 0 处', options: ['是跳跃间断点', '是可去间断点', '是无穷间断点', '连续'], answer: 'a', explain: 'x→0⁺ 时 1/x → +∞,e^(1/x) → ∞,f → 0;x→0⁻ 时 e^(1/x) → 0,f → 1,左右极限存在但不等,为跳跃间断点,故选 a。' },
            { qid: 'qh-c1-q16', stem: 'lim(n→∞) ⁿ√(n² + n) =', options: ['0', '∞', '1', 'e'], answer: 'c', explain: 'ⁿ√(n² + n) = (n² + n)^(1/n),取对数得 ln(n² + n)/n → 0,故极限 = e⁰ = 1,故选 c。' },
            { qid: 'qh-c1-q17', stem: '在 x = 0 处补充定义函数值后能成为连续函数的是', options: ['f(x) = e^(-1/x²),f(0) = 0', 'f(x) = sin(1/x),f(0) = 0', 'f(x) = [x] 取整函数,f(0) = 0', 'f(x) = 1/x,f(0) = 0'], answer: 'a', explain: 'x→0 时 e^(-1/x²) → 0,与补充定义一致而连续;sin(1/x) 在 0 处极限不存在;取整函数与 1/x 在 0 处均非可去间断,故选 a。' },
            { qid: 'qh-c1-q18', stem: 'lim(x→0) (tan x - x)/x³ =', options: ['1/2', '1', '0', '1/3'], answer: 'd', explain: 'tan x = x + x³/3 + o(x³),分子 = x³/3 + o(x³),故极限为 1/3,故选 d。' },
            { qid: 'qh-c1-q19', stem: '设 f(x) 在 x = a 连续且 f(a) > 0,则存在 a 的某邻域使', options: ['f(x) > f(a) 恒成立', 'f(x) > 0 恒成立', 'f(x) 单调递增', 'f(x) 可导'], answer: 'b', explain: '由连续性与极限保号性,存在 δ > 0,当 |x - a| < δ 时 f(x) > f(a)/2 > 0,故选 b。' },
            { qid: 'qh-c1-q20', stem: 'lim(x→0) (3^x - 1)/x =', options: ['1', '3', '0', 'ln 3'], answer: 'd', explain: '3^x - 1 ~ x·ln 3,故极限 = ln 3,故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch2',
      num: 2,
      title: '一元微分·自测',
      titleEn: 'Quiz 2',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 2 章 一元微分',
          summary: '',
          questions: [
            { qid: 'qh-c2-q1', stem: 'f(x) = x³ 在 x = 1 处的切线斜率为', options: ['1', '3', '9', '1/3'], answer: 'b', explain: 'f′(x) = 3x²,f′(1) = 3,即切线斜率为 3,故选 b。' },
            { qid: 'qh-c2-q2', stem: '函数 f(x) = x³ - 3x 的单调递增区间为', options: ['(-1,1)', '(-∞,0)', '(-∞,-1) 与 (1,+∞)', '(0,+∞) 全部'], answer: 'c', explain: 'f′(x) = 3x² - 3 = 3(x - 1)(x + 1),f′ > 0 当 x < -1 或 x > 1,故选 c。' },
            { qid: 'qh-c2-q3', stem: 'f(x) = xe^x 的 n 阶导数 f⁽ⁿ⁾(x) =', options: ['(x + n)e^x', '(x - n)e^x', 'e^x', 'xⁿe^x'], answer: 'a', explain: '由莱布尼茨公式,只有 e^x 求导不变,得 f⁽ⁿ⁾(x) = x(e^x)⁽ⁿ⁾ + n(e^x)⁽ⁿ⁻¹⁾ = (x + n)e^x,故选 a。' },
            { qid: 'qh-c2-q4', stem: '罗尔定理不要求下列哪个条件?', options: ['f 在 [a,b] 连续', 'f 在 (a,b) 可导', 'f(a) = f(b)', 'f′ 在 (a,b) 连续'], answer: 'd', explain: '罗尔定理只需闭区间连续、开区间可导、端点函数值相等,不要求导函数连续,故选 d。' },
            { qid: 'qh-c2-q5', stem: 'f(x) = x³ - 3x² 的极大值为', options: ['0', '-1', '1', '2'], answer: 'a', explain: 'f′(x) = 3x(x - 2),驻点 x = 0,2;f′ 在 x = 0 左正右负取极大值 f(0) = 0,在 x = 2 取极小值 -4,故选 a。' },
            { qid: 'qh-c2-q6', stem: '曲线 y = x³ 的凹凸区间:在 (-∞,0) 上', options: ['凹(下凸)', '凸(上凸)', '既凹又凸', '为直线'], answer: 'b', explain: 'y″ = 6x,x < 0 时 y″ < 0,曲线上凸(凸),故选 b。' },
            { qid: 'qh-c2-q7', stem: 'lim(x→0) [f(x) - f(0)]/x 其中 f(x) = x|x|,该极限', options: ['等于 1', '不存在', '等于 -1', '等于 0'], answer: 'd', explain: 'x > 0 时比值为 x²/x = x → 0;x < 0 时为 -x²/x = -x → 0,左右极限均为 0,故该极限即 f′(0) = 0,故选 d。' },
            { qid: 'qh-c2-q8', stem: '拉格朗日中值定理中 ξ 满足 f′(ξ) =', options: ['f(b) - f(a)', '[f(b) - f(a)]/b', '[f(b) - f(a)]/(b - a)', 'f(a)/(b - a)'], answer: 'c', explain: '拉格朗日中值定理结论为 f(b) - f(a) = f′(ξ)(b - a),即 f′(ξ) = [f(b) - f(a)]/(b - a),故选 c。' },
            { qid: 'qh-c2-q9', stem: 'f(x) = e^(-x) 的 n 阶导数为', options: ['e^(-x)', '-e^(-x)', '(-1)ⁿe^(-x)', 'n·e^(-x)'], answer: 'c', explain: '每求导一次乘以 -1,n 次后得 (-1)ⁿe^(-x),故选 c。' },
            { qid: 'qh-c2-q10', stem: '函数 f(x) = x + 1/x 的极小值为', options: ['2', '-2', '1', '0'], answer: 'a', explain: 'f′(x) = 1 - 1/x²,驻点 x = ±1;x = 1 处 f′ 由负变正取极小值 f(1) = 2,故选 a。' },
            { qid: 'qh-c2-q11', stem: 'dy 与 Δy 的关系,当 f 可导时', options: ['dy = Δy 恒成立', 'dy 与 Δy 无关', 'Δy 是 dy 的主部', 'dy 是 Δy 的线性主部'], answer: 'd', explain: 'Δy = f′(x)Δx + o(Δx),dy = f′(x)Δx 是 Δy 的线性主部,故选 d。' },
            { qid: 'qh-c2-q12', stem: 'f(x) 在 x₀ 可导是在 x₀ 连续的', options: ['充分必要条件', '充分非必要条件', '必要非充分条件', '既非充分也非必要'], answer: 'b', explain: '可导必连续,但连续未必可导(如 |x| 在 0 处),故为充分非必要条件,故选 b。' },
            { qid: 'qh-c2-q13', stem: 'f(x) = x - sin x 在 (-∞,+∞) 内', options: ['单调递减', '单调递增', '有极值', '为周期函数'], answer: 'b', explain: 'f′(x) = 1 - cos x ≥ 0 恒成立且零点孤立,f 单调递增(严格),无极值,故选 b。' },
            { qid: 'qh-c2-q14', stem: 'f(x) = x⁴ - 2x² 的拐点个数为', options: ['0', '1', '3', '2'], answer: 'd', explain: 'y″ = 12x² - 4 = 0 得 x = ±1/√3,两处 y″ 变号,故拐点 2 个,故选 d。' },
            { qid: 'qh-c2-q15', stem: '由参数方程 x = t²,y = t³ 所确定函数的 dy/dx =', options: ['3t/2', '2t/3', '3t²', '2/(3t)'], answer: 'a', explain: 'dy/dx = (dy/dt)/(dx/dt) = 3t²/(2t) = 3t/2,故选 a。' },
            { qid: 'qh-c2-q16', stem: 'f(x) 满足 f(0) = 0 且 f′(0) = 2,则 lim(x→0) f(x)/(tan 2x) =', options: ['2', '1/2', '1', '4'], answer: 'c', explain: 'f(x)/tan 2x = [f(x)/x]·[x/tan 2x] → 2 · (1/2) = 1,故选 c。' },
            { qid: 'qh-c2-q17', stem: '设 f(x) 在 [0,1] 连续,在 (0,1) 可导且 f(1) = 0,则在 (0,1) 内至少存在一点 ξ 使', options: ['f′(ξ) = -f(ξ)/ξ(构造 F = x·f(x) 用罗尔定理)', 'f′(ξ) = 0', 'f(ξ) = 0', 'f′(ξ) = 1'], answer: 'a', explain: '令 F(x) = x·f(x),F(0) = 0 = F(1),由罗尔定理存在 ξ 使 F′(ξ) = f(ξ) + ξf′(ξ) = 0,即 f′(ξ) = -f(ξ)/ξ,故选 a。' },
            { qid: 'qh-c2-q18', stem: 'f(x) = x² 在 [-1,2] 上满足拉格朗日中值定理的 ξ =', options: ['1', '3/2', '1/2', '2'], answer: 'c', explain: '[f(2) - f(-1)]/(2 - (-1)) = 3/3 = 1,故 2ξ = 1,ξ = 1/2 ∈ (-1,2),故选 c。' },
            { qid: 'qh-c2-q19', stem: '函数 y = ln x 的微分 dy(x = e, dx = 1) 为', options: ['e', '1/e', '1', '0'], answer: 'b', explain: 'dy = dx/x,在 x = e 处 dy = 1/e,故选 b。' },
            { qid: 'qh-c2-q20', stem: '若 f′(x₀) = 0 且 f″(x₀) < 0,则 x₀ 是 f 的', options: ['极小值点', '拐点横坐标', '驻点但非极值点', '极大值点'], answer: 'd', explain: '二阶导数判别法:f″(x₀) < 0 时 f 在 x₀ 取极大值,同时 x₀ 也是驻点,但最准确的描述是极大值点,故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch3',
      num: 3,
      title: '一元积分·自测',
      titleEn: 'Quiz 3',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 3 章 一元积分',
          summary: '',
          questions: [
            { qid: 'qh-c3-q1', stem: '∫ x² dx =', options: ['x³ + C', 'x³/3 + C', '2x + C', '3x² + C'], answer: 'b', explain: '幂函数积分公式 ∫xⁿdx = x^(n+1)/(n + 1) + C,故原函数为 x³/3 + C,故选 b。' },
            { qid: 'qh-c3-q2', stem: '∫(0→1) e^x dx =', options: ['e', 'e + 1', 'e - 1', '1 - e'], answer: 'c', explain: '原函数为 e^x,代入得 e - e⁰ = e - 1,故选 c。' },
            { qid: 'qh-c3-q3', stem: '∫(0→π) sin x dx =', options: ['2', '0', '1', 'π'], answer: 'a', explain: '-cos x 在 0 到 π 上取值 -cos π + cos 0 = 1 + 1 = 2,故选 a。' },
            { qid: 'qh-c3-q4', stem: '∫ dx/(1 + x²) =', options: ['ln(1 + x²) + C', 'arcsin x + C', 'tan x + C', 'arctan x + C'], answer: 'd', explain: '基本积分公式 ∫dx/(1 + x²) = arctan x + C,故选 d。' },
            { qid: 'qh-c3-q5', stem: '∫ x·e^(x²) dx =', options: ['(1/2)e^(x²) + C', 'e^(x²) + C', '2e^(x²) + C', 'x²e^(x²)/2 + C'], answer: 'a', explain: '凑微分 x dx = d(x²)/2,得 ∫(1/2)e^(x²)d(x²) = (1/2)e^(x²) + C,故选 a。' },
            { qid: 'qh-c3-q6', stem: '定积分 ∫(-1→1) x³/(1 + x²) dx 的值为', options: ['1', 'ln 2', '0', '2'], answer: 'c', explain: '被积函数为奇函数,积分区间关于原点对称,由奇偶性得积分为 0,故选 c。' },
            { qid: 'qh-c3-q7', stem: '曲线 y = x² 与 y = x 所围图形面积为', options: ['1/3', '1/2', '1', '1/6'], answer: 'd', explain: '交点 x = 0,1,面积 = ∫(0→1)(x - x²)dx = 1/2 - 1/3 = 1/6,故选 d。' },
            { qid: 'qh-c3-q8', stem: '∫(0→+∞) e^(-x) dx =', options: ['0', 'e', '1', '发散'], answer: 'c', explain: '反常积分 = lim(t→∞)(-e^(-t) + 1) = 1,收敛于 1,故选 c。' },
            { qid: 'qh-c3-q9', stem: '∫ ln x dx =', options: ['x·ln x + x + C', 'ln x/x + C', 'x·ln x - x + C', '1/x + C'], answer: 'c', explain: '分部积分:∫ln x dx = x·ln x - ∫x·(1/x)dx = x·ln x - x + C,故选 c。' },
            { qid: 'qh-c3-q10', stem: '变上限积分 F(x) = ∫(0→x) sin(t²) dt,则 F′(x) =', options: ['sin(x²)', 'cos(x²)', '2x·sin(x²)', 'sin(t²)'], answer: 'a', explain: '变上限积分求导定理:F′(x) = sin(x²),上限为 x 无需链式因子,故选 a。' },
            { qid: 'qh-c3-q11', stem: '∫(0→1) dx/√(1 - x²) =', options: ['π', 'π/4', '2π', 'π/2'], answer: 'd', explain: '原函数 arcsin x,代入得 arcsin 1 - 0 = π/2,故选 d。' },
            { qid: 'qh-c3-q12', stem: 'F(x) 是 f(x) 在区间 I 上的原函数,则 ∫f(x)dx =', options: ['F(x)', 'F(x) + C', 'f(x) + C', 'F′(x) + C'], answer: 'b', explain: '不定积分是全体原函数,等于任一原函数加任意常数 C,故选 b。' },
            { qid: 'qh-c3-q13', stem: '∫(1→e) (ln x)/x dx =', options: ['1', '1/2', 'e - 1', '2'], answer: 'b', explain: '换元 u = ln x,积分变为 ∫(0→1)u du = 1/2,故选 b。' },
            { qid: 'qh-c3-q14', stem: 'y = sin x 在 [0,π] 上与 x 轴所围图形绕 x 轴旋转所得旋转体体积为', options: ['π/2', 'π²', '2π', 'π²/2'], answer: 'd', explain: 'V = π∫(0→π)sin²x dx = π·(π/2) = π²/2,由对称性 sin² 在半周期积分为 π/2,故选 d。' },
            { qid: 'qh-c3-q15', stem: '∫(0→π/2) cos x dx =', options: ['1', '0', '2', 'π/2'], answer: 'a', explain: 'sin x 在 0 到 π/2 上取值 sin(π/2) - sin 0 = 1,故选 a。' },
            { qid: 'qh-c3-q16', stem: '广义积分 ∫(1→+∞) dx/x² 的值为', options: ['发散', '1/2', '1', '∞'], answer: 'c', explain: 'p = 2 > 1 收敛,值为 [-1/x](1→∞) = 0 + 1 = 1,故选 c。' },
            { qid: 'qh-c3-q17', stem: '设 f(x) = x - 1,则 ∫(0→2)(x - 1)dx =', options: ['0', '1', '-1', '2'], answer: 'a', explain: '∫(0→2)(x - 1)dx = [x²/2 - x](0→2) = 2 - 2 = 0,验证了正负面积抵消,故选 a。' },
            { qid: 'qh-c3-q18', stem: '∫ sec²x dx =', options: ['sec x + C', '-cot x + C', 'tan x + C', 'ln|sec x| + C'], answer: 'c', explain: 'tan x 的导数为 sec²x,故积分为 tan x + C,故选 c。' },
            { qid: 'qh-c3-q19', stem: 'f(x) 在 [-a,a] 连续且为偶函数,则 ∫(-a→a) f(x)dx =', options: ['0', '2∫(0→a)f(x)dx', '∫(0→a)f(x)dx', '4∫(0→a)f(x)dx'], answer: 'b', explain: '偶函数在对称区间积分为两倍半区间积分,故选 b。' },
            { qid: 'qh-c3-q20', stem: '设 f(x) = ∫(x→x²) e^(-t²)dt,则 f′(x) =', options: ['e^(-x⁴) - e^(-x²)', '2x·e^(-x⁴)', 'e^(-x²)', '2x·e^(-x⁴) - e^(-x²)'], answer: 'd', explain: '拆成 ∫(x→0) + ∫(0→x²),求导得 -e^(-x²) + 2x·e^(-x⁴),故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch4',
      num: 4,
      title: '向量与空间几何·自测',
      titleEn: 'Quiz 4',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 4 章 向量与空间几何',
          summary: '',
          questions: [
            { qid: 'qh-c4-q1', stem: 'a = (1,2,3), b = (2,-1,1),则 a·b =', options: ['-3', '3', '7', '1'], answer: 'b', explain: '数量积 = 1·2 + 2·(-1) + 3·1 = 2 - 2 + 3 = 3,故选 b。' },
            { qid: 'qh-c4-q2', stem: 'a = (1,0,0), b = (0,1,0),则 a×b =', options: ['(1,1,0)', '0', '(0,0,1)', '(0,0,-1)'], answer: 'c', explain: '单位 x 轴向量叉乘 y 轴向量得 z 轴向量 (0,0,1),右手系,故选 c。' },
            { qid: 'qh-c4-q3', stem: '点 (1,2,3) 到平面 x + y + z = 1 的距离为', options: ['5√3/3', '√3', '5', '√3/3'], answer: 'a', explain: 'd = |1 + 2 + 3 - 1|/√(1 + 1 + 1) = 5/√3 = 5√3/3,故选 a。' },
            { qid: 'qh-c4-q4', stem: '平面 2x - y + 2z = 5 的法向量为', options: ['(2,1,2)', '(5,-1,5)', '(-2,1,-2)', '(2,-1,2)'], answer: 'd', explain: '一般式平面 Ax + By + Cz = D 的法向量即 (A,B,C) = (2,-1,2),注意与 (-2,1,-2) 平行但写法取系数本身,故选 d。' },
            { qid: 'qh-c4-q5', stem: '两平面 x + y + z = 1 与 x + y + z = 3 的位置关系是', options: ['平行', '相交于一条直线', '重合', '垂直'], answer: 'a', explain: '法向量相同 (1,1,1) 但常数不同,两平面平行且不重合,故选 a。' },
            { qid: 'qh-c4-q6', stem: '直线 (x - 1)/2 = y/3 = (z + 1)/1 的方向向量为', options: ['(1,0,-1)', '(2,3,1)', '(2,3,-1)', '(1/2,1/3,1)'], answer: 'b', explain: '对称式中分母即为方向向量分量,取 (2,3,1),故选 b。' },
            { qid: 'qh-c4-q7', stem: 'a·b = 0 是非零向量 a 与 b 垂直的', options: ['充分非必要条件', '必要非充分条件', '无关条件', '充分必要条件'], answer: 'd', explain: '非零向量时 cos θ = (a·b)/(|a||b|),a·b = 0 等价于 θ = π/2 即垂直,故选 d。' },
            { qid: 'qh-c4-q8', stem: '球面 (x - 1)² + y² + (z + 2)² = 9 的球心与半径为', options: ['(1,0,2),r = 3', '(-1,0,-2),r = 9', '(1,0,-2),r = 3', '(1,0,-2),r = 9'], answer: 'c', explain: '标准球面方程球心 (1,0,-2),半径 r = √9 = 3,故选 c。' },
            { qid: 'qh-c4-q9', stem: '旋转曲面 z = x² + y² 是', options: ['椭球面', '双曲面', '旋转抛物面', '圆锥面'], answer: 'c', explain: 'z = x² + y² 由抛物线绕 z 轴旋转所得,为旋转抛物面,故选 c。' },
            { qid: 'qh-c4-q10', stem: 'a = (1,1,1),b = (1,-1,0),则 cos⟨a,b⟩ =', options: ['0', '1/3', '1/√3', '1/√6'], answer: 'a', explain: 'a·b = 1 - 1 + 0 = 0,故夹角余弦为 0,两向量垂直,故选 a。' },
            { qid: 'qh-c4-q11', stem: '过点 (0,0,0) 且法向量为 (1,2,3) 的平面方程为', options: ['x + 2y + 3z = 6', '2x + y + 3z = 0', 'x/1 = y/2 = z/3', 'x + 2y + 3z = 0'], answer: 'd', explain: '点法式:1·(x - 0) + 2·(y - 0) + 3·(z - 0) = 0,即 x + 2y + 3z = 0,故选 d。' },
            { qid: 'qh-c4-q12', stem: '向量 a 与 b 的向量积模长 |a×b| 几何上表示', options: ['以 a,b 为邻边的三角形面积', '以 a,b 为邻边的平行四边形面积', '二者夹角', '长方体体积'], answer: 'b', explain: '|a×b| = |a||b|sinθ,恰为邻边平行四边形面积,三角形面积是其一半,故选 b。' },
            { qid: 'qh-c4-q13', stem: '曲面 x²/4 + y²/9 + z²/4 = 1 是', options: ['球面', '旋转椭球面', '椭圆柱面', '单叶双曲面'], answer: 'b', explain: 'x² 与 z² 系数相同,可视为椭圆绕 y 轴旋转生成,是旋转椭球面,故选 b。' },
            { qid: 'qh-c4-q14', stem: '点 (1,1,1) 到原点的距离为', options: ['3', '1', '√2', '√3'], answer: 'd', explain: 'd = √(1 + 1 + 1) = √3,故选 d。' },
            { qid: 'qh-c4-q15', stem: '直线 x = 1 + t,y = 2t,z = 3 - t 上对应 t = 1 的点为', options: ['(2,2,2)', '(1,2,3)', '(2,1,2)', '(1,1,1)'], answer: 'a', explain: '代入 t = 1:x = 2,y = 2,z = 2,得点 (2,2,2),故选 a。' },
            { qid: 'qh-c4-q16', stem: '混合积 (a×b)·c 的绝对值几何上表示', options: ['四面体体积', '三角形面积', '以三向量为棱的平行六面体体积', '三向量夹角和'], answer: 'c', explain: '混合积绝对值等于棱长为各向量的平行六面体体积,四面体体积为其 1/6,故选 c。' },
            { qid: 'qh-c4-q17', stem: 'zOx 平面(即 y = 0)上的曲线 z = x² 绕 z 轴旋转所得曲面为', options: ['z = x² + y²', 'z² = x² + y²', 'x² + z² = 1', 'z = x² - y²'], answer: 'a', explain: '绕 z 轴旋转将 x 替换为 ±√(x² + y²),得 z = x² + y²,故选 a。' },
            { qid: 'qh-c4-q18', stem: '两向量 a,b 共线的充要条件是', options: ['a·b = 0', 'a×b ≠ 0', 'a×b = 0', '|a| = |b|'], answer: 'c', explain: '共线即夹角为 0 或 π,sinθ = 0,等价于 a×b = 0;a·b = 0 是垂直,故选 c。' },
            { qid: 'qh-c4-q19', stem: '平面 x + y = 0 与平面 y + z = 0 的夹角余弦为', options: ['0', '1/2', '1', '√2/2'], answer: 'b', explain: '法向量 (1,1,0) 与 (0,1,1),cosθ = 1/(√2·√2) = 1/2,故选 b。' },
            { qid: 'qh-c4-q20', stem: '空间曲线 { x² + y² + z² = 4, z = 1 } 表示', options: ['一个球面', '一条直线', '一个椭圆面', '一个圆'], answer: 'd', explain: '球面被平面 z = 1 所截,截线为 x² + y² = 3,是半径 √3 的圆,故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch5',
      num: 5,
      title: '多元微分·自测',
      titleEn: 'Quiz 5',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 5 章 多元微分',
          summary: '',
          questions: [
            { qid: 'qh-c5-q1', stem: 'f(x,y) = x²y,则 ∂f/∂x =', options: ['x²', '2xy', 'x² + y', '2x'], answer: 'b', explain: '对 x 求偏导时把 y 视为常数,得 2xy,故选 b。' },
            { qid: 'qh-c5-q2', stem: 'f(x,y) = sin(xy),则 ∂f/∂y 在点 (1,0) 处的值为', options: ['0', '-1', '1', 'π/2'], answer: 'c', explain: '∂f/∂y = x·cos(xy),在 (1,0) 处 = 1·cos 0 = 1,故选 c。' },
            { qid: 'qh-c5-q3', stem: 'f(x,y) 在点 P 可微是其在 P 连续的', options: ['充分非必要条件', '必要非充分条件', '充要条件', '无关条件'], answer: 'a', explain: '可微必连续,偏导连续必可微,但连续不一定可微,故为充分非必要条件,故选 a。' },
            { qid: 'qh-c5-q4', stem: 'z = f(x,y) 的全微分 dz =', options: ['(∂z/∂x)dx - (∂z/∂y)dy', '(∂z/∂x)·(∂z/∂y)dxdy', '(∂z/∂x) + (∂z/∂y)', '(∂z/∂x)dx + (∂z/∂y)dy'], answer: 'd', explain: '全微分为偏导与相应自变量微分乘积之和,即 dz = zxdx + zydy,故选 d。' },
            { qid: 'qh-c5-q5', stem: '二元函数极值的必要条件:f 在 (x₀,y₀) 有极值且偏导存在,则', options: ['fₓ(x₀,y₀) = 0 且 f_y(x₀,y₀) = 0', 'fₓ(x₀,y₀) = 0 或 f_y(x₀,y₀) = 0', 'fₓₓ > 0', 'fₓ·f_y = 1'], answer: 'a', explain: '极值点处两偏导若存在必同时为零,即驻点,故选 a。' },
            { qid: 'qh-c5-q6', stem: 'z = x² + y² + 1 的极小值为', options: ['0', '1', '2', '不存在'], answer: 'b', explain: '驻点 (0,0),zₓₓ = 2 > 0 且 AC - B² = 4 > 0,取极小值 z = 1,故选 b。' },
            { qid: 'qh-c5-q7', stem: '拉格朗日乘数法求 f 在约束 g = 0 下的极值,引入的方程是', options: ['∇f = 0', '∇g = 0', 'f = λg', '∇f = λ∇g'], answer: 'd', explain: '构造 L = f - λg,驻点条件为 ∇f = λ∇g 且 g = 0,故选 d。' },
            { qid: 'qh-c5-q8', stem: 'f(x,y) = xy 在 (0,0) 处', options: ['极大值点', '极小值点', '驻点但非极值点', '不可导'], answer: 'c', explain: 'fₓ = y,f_y = x,(0,0) 是驻点,但 AC - B² = 0·0 - 1 = -1 < 0,非极值点(鞍点),故选 c。' },
            { qid: 'qh-c5-q9', stem: 'z = ln(1 + x² + y²),则 ∂z/∂x =', options: ['1/(1 + x² + y²)', '2x/(1 + x²)', '2x/(1 + x² + y²)', 'x + y'], answer: 'c', explain: '链式法则:外层导数 1/(1 + x² + y²) 乘以内层 2x,得 2x/(1 + x² + y²),故选 c。' },
            { qid: 'qh-c5-q10', stem: 'z = f(x² - y²) 且 f 可导,则 y·(∂z/∂x) + x·(∂z/∂y) =', options: ['0', '1', '2x', '-2y'], answer: 'a', explain: 'zₓ = 2x·f′,z_y = -2y·f′,则 y·2x·f′ + x·(-2y)·f′ = 0,故选 a。' },
            { qid: 'qh-c5-q11', stem: '函数 z = √(1 - x² - y²) 的定义域为', options: ['x² + y² < 1', 'x² + y² ≥ 1', '全平面', 'x² + y² ≤ 1'], answer: 'd', explain: '需被开方式非负:1 - x² - y² ≥ 0,即 x² + y² ≤ 1,含边界圆,故选 d。' },
            { qid: 'qh-c5-q12', stem: 'lim((x,y)→(0,0)) xy/(x² + y²) =', options: ['0', '不存在', '1/2', '∞'], answer: 'b', explain: '沿 y = kx 路径极限为 k/(1 + k²),随 k 变化,路径不同极限不同,故极限不存在,故选 b。' },
            { qid: 'qh-c5-q13', stem: '二阶混合偏导相等的充分条件是', options: ['f 存在一阶偏导', 'fₓ_y 与 f_yₓ 在区域内连续', 'f 可微', 'f 连续'], answer: 'b', explain: 'fₓ_y 与 f_yₓ 都连续时二者相等,仅可微或连续不足以保证,故选 b。' },
            { qid: 'qh-c5-q14', stem: 'f(x,y) = e^(xy),则 ∂²f/∂x∂y =', options: ['y²e^(xy)', 'x²e^(xy)', 'e^(xy)', '(1 + xy)e^(xy)'], answer: 'd', explain: 'fₓ = y·e^(xy),再对 y 求导得 e^(xy) + xy·e^(xy) = (1 + xy)e^(xy),故选 d。' },
            { qid: 'qh-c5-q15', stem: '方向导数存在与可微的关系:f 在 P 可微,则沿任意方向的方向导数', options: ['都存在且等于 ∇f·e', '未必存在', '都为 0', '都等于 1'], answer: 'a', explain: '可微时沿单位向量 e 的方向导数为 ∇f·e,处处存在;反之方向导数存在推不出可微,故选 a。' },
            { qid: 'qh-c5-q16', stem: '函数 u = x² + y² + z² 在 (1,1,1) 处的梯度模为', options: ['6', '√3', '2√3', '3'], answer: 'c', explain: '∇u = (2x,2y,2z),在 (1,1,1) 处为 (2,2,2),模为 2√3,故选 c。' },
            { qid: 'qh-c5-q17', stem: '函数在某点梯度方向是函数值', options: ['增长最快的方向', '下降最快的方向', '变化率为零的方向', '切线方向'], answer: 'a', explain: '梯度方向是方向导数取最大值的方向,即函数增长最快方向,负梯度方向下降最快,故选 a。' },
            { qid: 'qh-c5-q18', stem: 'z = arctan(y/x) 在点 (1,1) 处 ∂z/∂x =', options: ['1/2', '1', '-1/2', '-1'], answer: 'c', explain: 'zₓ = -y/(x² + y²),在 (1,1) 处 = -1/2,故选 c。' },
            { qid: 'qh-c5-q19', stem: '设 z = f(xy,x/y),f 有二阶连续偏导,则 z 是关于几个中间变量的复合函数?', options: ['1 个', '2 个', '3 个', '4 个'], answer: 'b', explain: '中间变量为 u = xy 与 v = x/y,共 2 个,树形结构两个分支,故选 b。' },
            { qid: 'qh-c5-q20', stem: '在约束 x + y = 1 下 f(x,y) = xy 的最大值为', options: ['1/2', '1', '0', '1/4'], answer: 'd', explain: 'y = 1 - x,f = x - x²,在 x = 1/2 取最大值 1/4,由对称性亦可猜中点,故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch6',
      num: 6,
      title: '多元积分·自测',
      titleEn: 'Quiz 6',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 6 章 多元积分',
          summary: '',
          questions: [
            { qid: 'qh-c6-q1', stem: '∫∫(D) dσ 其中 D = {(x,y):0 ≤ x ≤ 1,0 ≤ y ≤ 2} 的值为', options: ['1', '2', '1/2', '3'], answer: 'b', explain: '被积函数为 1 时二重积分值为区域面积,矩形面积 = 1 × 2 = 2,故选 b。' },
            { qid: 'qh-c6-q2', stem: '∫∫(D) xy dσ,D 为矩形 0≤x≤1,0≤y≤1,其值为', options: ['1/2', '1', '1/4', '0'], answer: 'c', explain: '∫(0→1)x dx · ∫(0→1)y dy = (1/2)² = 1/4,变量可分离,故选 c。' },
            { qid: 'qh-c6-q3', stem: '圆域 x² + y² = R² 上的二重积分 ∫∫dσ 用极坐标表示为', options: ['∫(0→2π)dθ∫(0→R)r dr', '∫(0→2π)dθ∫(0→R)dr', '∫(0→π)dθ∫(0→R)r dr', 'πR² 不必计算'], answer: 'a', explain: '极坐标面积元为 r dr dθ,θ 范围 0 到 2π,r 从 0 到 R,故选 a。' },
            { qid: 'qh-c6-q4', stem: '∫∫(D) (x² + y²) dσ,D:x² + y² ≤ 1 的值为', options: ['π', '2π', 'π/4', 'π/2'], answer: 'd', explain: '极坐标下 = ∫(0→2π)dθ∫(0→1)r²·r dr = 2π·(1/4) = π/2,故选 d。' },
            { qid: 'qh-c6-q5', stem: '交换积分次序:∫(0→1)dx∫(x→1)f dy 等于', options: ['∫(0→1)dy∫(0→y)f dx', '∫(0→1)dy∫(y→1)f dx', '∫(0→1)dy∫(0→1)f dx', '∫(1→0)dy∫(0→y)f dx'], answer: 'a', explain: '区域为 0 ≤ x ≤ y ≤ 1,交换后 y 从 0 到 1,x 从 0 到 y,故选 a。' },
            { qid: 'qh-c6-q6', stem: '曲线积分 ∮(L) x dy - y dx,L 为单位圆正向一周,其值为', options: ['0', '2π', 'π', '-2π'], answer: 'b', explain: '由格林公式 = ∫∫(D)(∂(x)/∂x - ∂(-y)/∂y)dσ = ∫∫(1 - (-1))dσ = 2·π = 2π,故选 b。' },
            { qid: 'qh-c6-q7', stem: '球体 x² + y² + z² ≤ R² 的体积为', options: ['πR³/3', '2πR³/3', '4πR²', '4πR³/3'], answer: 'd', explain: '球体积公式 V = 4πR³/3,可用球坐标三重积分验证,故选 d。' },
            { qid: 'qh-c6-q8', stem: '∫∫(Σ) dS 的几何意义是', options: ['曲面 Σ 围成的体积', '曲面的法向量', '曲面 Σ 的面积', '区域面积'], answer: 'c', explain: '第一类曲面积分对 1 积分得曲面面积,故选 c。' },
            { qid: 'qh-c6-q9', stem: 'Ω 由 z = x² + y² 与 z = 1 围成,将其上三重积分化为先 z 后 x,y 的累次积分时,z 的积分下限为', options: ['1 - x² - y²', '0', 'x² + y²', '√(x² + y²)'], answer: 'c', explain: '抛物面开口向上,区域内 z 介于抛物面 x² + y² 与平面 z = 1 之间,先对 z 积分时下限为 x² + y²,上限为 1,故选 c。' },
            { qid: 'qh-c6-q10', stem: '格林公式把闭曲线上的第二类曲线积分化为', options: ['D 上的二重积分', '曲线上的第一类积分', '曲面上的积分', '三重积分'], answer: 'a', explain: '格林公式:∮Pdx + Qdy = ∫∫(D)(∂Q/∂x - ∂P/∂y)dσ,化为区域二重积分,故选 a。' },
            { qid: 'qh-c6-q11', stem: '∫∫(D) e^(-x²-y²)dσ,D:x² + y² ≤ 1 的值为', options: ['π', '2π', '1 - e^(-1)', 'π(1 - e^(-1))'], answer: 'd', explain: '极坐标 = ∫(0→2π)dθ∫(0→1)e^(-r²)r dr = 2π·(1/2)(1 - e^(-1)) = π(1 - e^(-1)),故选 d。' },
            { qid: 'qh-c6-q12', stem: '第二类曲面积分 ∫∫(Σ) P dydz + Q dzdx + R dxdy 中,dxdy 表示', options: ['面积微元本身', '有向面积元在 xOy 面上的投影', '体积微元', '弧长微元'], answer: 'b', explain: '第二类积分按指定侧法向投影,dxdy 是有向曲面元在 xOy 坐标面上的投影,带符号,故选 b。' },
            { qid: 'qh-c6-q13', stem: '累次积分 ∫(0→1)dx∫(x→1)e^(-y²)dy 交换积分次序后的值为', options: ['1 - e^(-1)', '(1 - e^(-1))/2', '(1 - e^(-1))/4', 'e^(-1)'], answer: 'b', explain: '区域为 0 ≤ x ≤ y ≤ 1,交换为 ∫(0→1)e^(-y²)dy∫(0→y)dx = ∫(0→1)y·e^(-y²)dy = (1/2)(1 - e^(-1)),故选 b。' },
            { qid: 'qh-c6-q14', stem: 'Ω 为单位球,∫∫∫(Ω) zdV 的值为', options: ['π', '4π/3', '2π', '0'], answer: 'd', explain: '被积函数 z 为奇函数,区域关于 xOy 面对称,积分为 0,故选 d。' },
            { qid: 'qh-c6-q15', stem: 'xOy 面上薄片面密度 ρ(x,y),其质量为', options: ['∫∫(D)ρ(x,y)dσ', '∫∫(D)dσ', '∮ρds', '∫∫∫ρdV'], answer: 'a', explain: '面密度对区域积分即总质量 m = ∫∫ρdσ,故选 a。' },
            { qid: 'qh-c6-q16', stem: '高斯公式将闭曲面外侧的第二类曲面积分化为', options: ['闭曲线积分', '二重积分', '区域上的三重积分', '曲面面积分'], answer: 'c', explain: '高斯公式:∫∫(闭外侧)Pdydz + Qdzdx + Rdxdy = ∫∫∫(Ω)(∂P/∂x + ∂Q/∂y + ∂R/∂z)dV,故选 c。' },
            { qid: 'qh-c6-q17', stem: '∫(L) ds,L 为从 (0,0) 到 (1,0) 的线段,被积函数为 1 时值为', options: ['1', '0', '2', '√2'], answer: 'a', explain: '第一类曲线积分对 1 积分为弧长,线段长为 1,故选 a。' },
            { qid: 'qh-c6-q18', stem: '斯托克斯公式联系的是', options: ['曲面积分与三重积分', '二重积分与曲线积分(平面)', '空间闭曲线积分与曲面积分', '两类曲线积分'], answer: 'c', explain: '斯托克斯公式把空间闭曲线上的第二类积分化为以其为边界的曲面上的积分,格林是其平面特例,故选 c。' },
            { qid: 'qh-c6-q19', stem: 'D:x² + y² ≤ 4,∫∫(D) (x² + y²) dσ 的值为', options: ['16π/3', '8π', '4π/3', '2π'], answer: 'b', explain: '极坐标下 = ∫(0→2π)dθ∫(0→2)r²·r dr = 2π·[r⁴/4](0→2) = 2π·4 = 8π,故选 b。' },
            { qid: 'qh-c6-q20', stem: 'f(x,y) 在有界闭区域 D 上连续,则 ∫∫(D)f dσ', options: ['未必存在', '为零', '为正', '必存在'], answer: 'd', explain: '有界闭区域上连续函数的二重积分必定存在,这是积分存在性基本定理,故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch7',
      num: 7,
      title: '无穷级数·自测',
      titleEn: 'Quiz 7',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 7 章 无穷级数',
          summary: '',
          questions: [
            { qid: 'qh-c7-q1', stem: '∑(n=1→∞) 1/n² 的和为', options: ['发散', 'π²/6', '1', 'π/6'], answer: 'b', explain: 'p 级数 p = 2 收敛,经典结果为巴塞尔问题答案 π²/6,故选 b。' },
            { qid: 'qh-c7-q2', stem: '∑(n=1→∞) 1/n 是', options: ['收敛的', '绝对收敛', '发散的', '条件收敛'], answer: 'c', explain: '调和级数是 p = 1 的 p 级数,发散,虽有 1/n → 0 但部分和无界,故选 c。' },
            { qid: 'qh-c7-q3', stem: '级数收敛的必要条件是', options: ['uₙ → 0', 'uₙ → 1', 'uₙ 单调', 'uₙ > 0'], answer: 'a', explain: '收敛必推出通项趋于零;通项趋于零是必要而非充分条件,如调和级数,故选 a。' },
            { qid: 'qh-c7-q4', stem: '∑(n=0→∞) xⁿ 的收敛半径为', options: ['2', '∞', '0', '1'], answer: 'd', explain: '几何级数 |x| < 1 收敛,收敛半径 R = 1,故选 d。' },
            { qid: 'qh-c7-q5', stem: '∑(n=1→∞) (-1)ⁿ/n 是', options: ['条件收敛', '绝对收敛', '发散', '不能判定'], answer: 'a', explain: '由莱布尼茨判别法收敛,但绝对值级数为调和级数发散,故条件收敛,故选 a。' },
            { qid: 'qh-c7-q6', stem: '∑(n=1→∞) 1/ⁿ√n 即 ∑n^(-1/n) 的敛散性为', options: ['收敛', '发散', '条件收敛', '不能判定'], answer: 'b', explain: '通项 n^(-1/n) = e^(-ln n/n) → e⁰ = 1 ≠ 0,不满足收敛必要条件,发散,故选 b。' },
            { qid: 'qh-c7-q7', stem: '若 ∑uₙ 绝对收敛,则 ∑uₙ 本身', options: ['必发散', '未必收敛', '条件收敛', '必收敛'], answer: 'd', explain: '绝对收敛是最强的收敛形态,由柯西收敛准则可推出原级数收敛,故选 d。' },
            { qid: 'qh-c7-q8', stem: '幂级数 ∑(n=1→∞) xⁿ/n² 的收敛域为', options: ['(-1,1)', '(-1,1]', '[-1,1]', '[-1,1)'], answer: 'c', explain: 'R = 1;端点 x = ±1 时级数为 ∑1/n²,绝对收敛,故收敛域含两端点 [-1,1],故选 c。' },
            { qid: 'qh-c7-q9', stem: 'e^x 的麦克劳林级数为', options: ['∑xⁿ', '∑xⁿ/n', '∑(n=0→∞) xⁿ/n!', '∑(-1)ⁿxⁿ/(2n)!'], answer: 'c', explain: 'e^x = 1 + x + x²/2! + ... = ∑xⁿ/n!,在全数轴收敛,故选 c。' },
            { qid: 'qh-c7-q10', stem: '正项级数比较判别法的极限形式:若 lim uₙ/vₙ = l(0 < l < ∞),则', options: ['两级数同敛散', 'uₙ 收敛则 vₙ 发散', '都发散', '都收敛'], answer: 'a', explain: '极限为正常数时两正项级数同时收敛或同时发散,这是比较判别法核心结论,故选 a。' },
            { qid: 'qh-c7-q11', stem: '∑(n=1→∞) n!/nⁿ 的敛散性为', options: ['发散', '条件收敛', '不能判定', '收敛'], answer: 'd', explain: '比值 uₙ₊₁/uₙ = (nⁿ/(n+1)ⁿ)·1 = 1/(1 + 1/n)ⁿ → 1/e < 1,故收敛,故选 d。' },
            { qid: 'qh-c7-q12', stem: '函数项级数一致收敛保证和函数', options: ['可导性必成立不需条件', '为多项式', '连续(各项连续时)', '发散'], answer: 'c', explain: '各项连续且一致收敛时和函数连续,还可逐项积分;逐项求导需另加导级数一致收敛,故选 c。' },
            { qid: 'qh-c7-q13', stem: '∑(n=1→∞) sin(1/n²) 的敛散性为', options: ['发散', '条件收敛', '收敛', '不能判定'], answer: 'c', explain: 'n→∞ 时 sin(1/n²) ~ 1/n²,与 p 级数(p = 2)比较知收敛,故选 c。' },
            { qid: 'qh-c7-q14', stem: '∑(n=1→∞) (-1)ⁿ·n/(n + 1) 的敛散性为', options: ['绝对收敛', '发散', '条件收敛', '收敛'], answer: 'b', explain: '通项绝对值 → 1 ≠ 0,通项不趋于零,级数发散,故选 b。' },
            { qid: 'qh-c7-q15', stem: '幂级数 ∑(n=0→∞) x^(2n)/(2n)! 即 cosh x,其收敛半径为', options: ['∞', '1', '2', '0'], answer: 'a', explain: '系数只含偶次项,比值法 uₙ₊₁/uₙ = x²/[(2n+2)(2n+1)] → 0,对一切 x 收敛,R = ∞,故选 a。' },
            { qid: 'qh-c7-q16', stem: '∑(n=1→∞) [1/n - 1/(n + 1)] 的和为', options: ['0', '1/2', '发散', '1'], answer: 'd', explain: '部分和 Sₙ = 1 - 1/(n + 1) → 1,级数收敛于 1(裂项相消),故选 d。' },
            { qid: 'qh-c7-q17', stem: 'ln(1 + x) 的麦克劳林级数为', options: ['∑(n=1→∞)(-1)^(n-1)xⁿ/n', '∑xⁿ/n!', '∑xⁿ', '∑(-1)ⁿxⁿ'], answer: 'a', explain: 'ln(1 + x) = x - x²/2 + x³/3 - ... = ∑(-1)^(n-1)xⁿ/n,收敛域 (-1,1],故选 a。' },
            { qid: 'qh-c7-q18', stem: '若 ∑uₙ 收敛且 uₙ ≥ 0,则 ∑uₙ² 的敛散性', options: ['发散', '不能确定', '条件收敛', '收敛'], answer: 'd', explain: '∑uₙ 收敛则 uₙ → 0,n 大时 uₙ < 1,uₙ² ≤ uₙ,由比较判别法 ∑uₙ² 收敛,故选 d。' },
            { qid: 'qh-c7-q19', stem: '阿贝尔定理:幂级数在 x₀ 收敛,则在 |x| < |x₀| 处', options: ['条件收敛', '绝对收敛', '发散', '不能判定'], answer: 'b', explain: '阿贝尔定理断言收敛点内侧的各点均为绝对收敛点,这是求收敛半径的理论基础,故选 b。' },
            { qid: 'qh-c7-q20', stem: '傅里叶级数中 f(x) 的狄利克雷收敛定理:在间断点处级数收敛于', options: ['左极限', '右极限', '函数值', '左右极限的平均值'], answer: 'd', explain: '狄利克雷定理:间断点处收敛于 [f(x⁻) + f(x⁺)]/2,连续点处收敛于 f(x),故选 d。' }
          ]
        }
      ]
    },
    {
      id: 'qch8',
      num: 8,
      title: '常微分方程·自测',
      titleEn: 'Quiz 8',
      summary: '20 题。',
      blocks: [
        {
          type: 'quiz',
          title: '第 8 章 常微分方程',
          summary: '',
          questions: [
            { qid: 'qh-c8-q1', stem: 'y′ = 2x 的通解为', options: ['y = 2x² + C', 'y = x² + C', 'y = x + C', 'y = 2 + C'], answer: 'b', explain: '两边对 x 积分得 y = ∫2x dx = x² + C,故选 b。' },
            { qid: 'qh-c8-q2', stem: '方程 y″ - 3y′ + 2y = 0 的特征方程为', options: ['r² + 3r + 2 = 0', 'r² - 3r - 2 = 0', 'r² - 3r + 2 = 0', 'r - 3 = 0'], answer: 'c', explain: '常系数齐次方程特征方程为 r² - 3r + 2 = 0,即 (r - 1)(r - 2) = 0,故选 c。' },
            { qid: 'qh-c8-q3', stem: 'y″ - 3y′ + 2y = 0 的通解为', options: ['y = C₁e^x + C₂e^(2x)', 'y = C₁e^(-x) + C₂e^(2x)', 'y = (C₁ + C₂x)e^x', 'y = Ce^(2x)'], answer: 'a', explain: '特征根 r = 1,2 互异,通解为两指数解线性组合 C₁e^x + C₂e^(2x),故选 a。' },
            { qid: 'qh-c8-q4', stem: 'y″ + 4y = 0 的通解为', options: ['y = C₁e^(2x) + C₂e^(-2x)', 'y = (C₁ + C₂x)cos 2x', 'y = C₁cos x + C₂sin x', 'y = C₁cos 2x + C₂sin 2x'], answer: 'd', explain: '特征根 r = ±2i 为纯虚根,通解为三角组合 C₁cos 2x + C₂sin 2x,故选 d。' },
            { qid: 'qh-c8-q5', stem: '一阶线性方程 y′ + P(x)y = Q(x) 的通解公式中的积分因子为', options: ['e^∫P(x)dx', 'e^(-∫P(x)dx)', '∫P(x)dx', 'e^(Q(x))'], answer: 'a', explain: '乘以积分因子 μ = e^∫P dx 后左端化为 (μy)′,再积分得通解公式,故选 a。' },
            { qid: 'qh-c8-q6', stem: '微分方程 y′ = y 满足 y(0) = 1 的特解为', options: ['y = e^(-x)', 'y = e^x', 'y = x + 1', 'y = 1'], answer: 'b', explain: '分离变量得 y = Ce^x,代入 y(0) = 1 得 C = 1,特解 y = e^x,故选 b。' },
            { qid: 'qh-c8-q7', stem: '可分离变量方程 dy/dx = y² 的通解为', options: ['y = 1/(x + C)', 'y = Cx²', 'y = Ce^x', 'y = -1/(x + C)'], answer: 'd', explain: '∫dy/y² = ∫dx 得 -1/y = x + C,即 y = -1/(x + C),故选 d。' },
            { qid: 'qh-c8-q8', stem: 'y″ - 2y′ + y = 0 的通解为', options: ['y = C₁e^x + C₂e^(-x)', 'y = C₁cos x + C₂sin x', 'y = (C₁ + C₂x)e^x', 'y = Ce^(2x)'], answer: 'c', explain: '特征根 r = 1 为二重根,通解为 (C₁ + C₂x)e^x,重根带 x 因子,故选 c。' },
            { qid: 'qh-c8-q9', stem: 'n 阶线性齐次微分方程的通解中含有独立任意常数的个数为', options: ['n - 1 个', '1 个', 'n 个', 'n + 1 个'], answer: 'c', explain: 'n 阶齐次方程解空间为 n 维,通解为 n 个线性无关解的组合,含 n 个独立常数,故选 c。' },
            { qid: 'qh-c8-q10', stem: 'y″ + y = x 的一个特解形式可设为', options: ['y* = ax + b', 'y* = ae^x', 'y* = a sin x', 'y* = ax² + bx + c'], answer: 'a', explain: '自由项为一次多项式且 0 不是特征根,设特解为同次多项式 y* = ax + b,代入得 a = 1,b = 0,故选 a。' },
            { qid: 'qh-c8-q11', stem: '方程 dy/dx = (y/x) + tan(y/x) 是', options: ['线性方程', '齐次方程', '伯努利方程', '常系数方程'], answer: 'b', explain: '右端可写为关于 y/x 的函数,是齐次微分方程,令 u = y/x 可化为可分离变量方程,故选 b。' },
            { qid: 'qh-c8-q12', stem: 'y = e^(-2x) 是下列哪个方程的解?', options: ['y′ - 2y = 0', 'y′ + y = 0', 'y″ + y = 0', 'y′ + 2y = 0'], answer: 'd', explain: 'y′ = -2e^(-2x),代入 y′ + 2y = -2e^(-2x) + 2e^(-2x) = 0,满足该方程,故选 d。' },
            { qid: 'qh-c8-q13', stem: 'y″ + 2y′ + 5y = 0 的特征根为', options: ['r = -1 ± 2i', 'r = 1 ± 2i', 'r = -2 ± i', 'r = ±2i'], answer: 'a', explain: 'r² + 2r + 5 = 0,判别式 4 - 20 = -16,r = (-2 ± 4i)/2 = -1 ± 2i,故选 a。' },
            { qid: 'qh-c8-q14', stem: '伯努利方程 y′ + P(x)y = Q(x)yⁿ 的标准代换为 z =', options: ['yⁿ', 'y^(-n)', 'ln y', 'y^(1-n)'], answer: 'd', explain: '令 z = y^(1-n),方程化为一阶线性方程 z′ + (1 - n)Pz = (1 - n)Q,故选 d。' },
            { qid: 'qh-c8-q15', stem: 'y″ + y′ = 0 的通解为', options: ['y = C₁cos x + C₂sin x', 'y = (C₁ + C₂x)e^(-x)', 'y = C₁e^x + C₂e^(-x)', 'y = C₁ + C₂e^(-x)'], answer: 'd', explain: '特征根 r = 0,-1,对应解 1 与 e^(-x),通解 C₁ + C₂e^(-x),故选 d。' },
            { qid: 'qh-c8-q16', stem: '一阶方程 y′ = f(x,y) 满足利普希茨条件时,初值问题的解', options: ['存在但不唯一', '不存在', '存在且唯一', '必为显式解'], answer: 'c', explain: '皮卡存在唯一性定理:f 连续且关于 y 利普希茨时初值问题解存在唯一,故选 c。' },
            { qid: 'qh-c8-q17', stem: '方程 y·dx - x·dy = 0 化为 dy/dx 形式后是', options: ['dy/dx = x/y', 'dy/dx = y/x', 'dy/dx = -y/x', 'dy/dx = xy'], answer: 'b', explain: '移项得 y dx = x dy,即 dy/dx = y/x,为齐次方程,也可写 d(y/x) = 0 得 y = Cx,故选 b。' },
            { qid: 'qh-c8-q18', stem: 'y″ + 9y = 0 的解 y = sin 3x 的周期为', options: ['2π', 'π/3', '2π/3', 'π'], answer: 'c', explain: 'sin 3x 的角频率 3,周期 T = 2π/3,故选 c。' },
            { qid: 'qh-c8-q19', stem: '设 y₁,y₂ 是二阶齐次方程的两个线性无关解,则其通解为', options: ['y₁ + y₂', 'y₁y₂', 'C₁y₁ + C₂y₂', 'C(y₁ + y₂)'], answer: 'c', explain: '线性无关解构成解空间基,通解为任意线性组合 C₁y₁ + C₂y₂,故选 c。' },
            { qid: 'qh-c8-q20', stem: 'y′ = x + y 满足 y(0) = 0 的解,当 x = 0 处 y″ 的值为', options: ['0', '-1', '2', '1'], answer: 'd', explain: '由方程 y′ = x + y,y″ = 1 + y′;在 x = 0 处 y = 0,y′ = 0,故 y″(0) = 1 + 0 = 1,故选 d。' }
          ]
        }
      ]
    }
  ]
});
