/* ================================================================
 * data/papers/kmp-paper.js —— 论文精读示例
 * ----------------------------------------------------------------
 * 演示 paper 类型资源：用与教材相同的 block 规范组织论文阅读笔记。
 * 标题：Fast Pattern Matching in Strings
 * 作者：D. E. Knuth, J. H. Morris, V. R. Pratt（1977, SIAM J. Computing）
 * ================================================================ */
KB.register({
  id: 'kmp-paper',
  folder: 'papers',
  type: 'paper',
  title: 'KMP 原始论文精读',
  cover: '📄',
  source: 'Knuth, Morris & Pratt, SIAM J. Comput. 6(2), 1977',
  updated: '2026-08',
  chapters: [
    {
      id: 'pp-ch1', num: 1, title: '论文核心：线性时间模式匹配', titleEn: 'Linear Pattern Matching',
      summary: '提出 O(m+n) 的模式匹配算法，主串指针不回退，为字符串处理奠定理论基础。',
      blocks: [
        { type: 'concept', title: '问题与动机',
          points: [
            '问题：在主串 S[0..n-1] 中查找模式 P[0..m-1]',
            '朴素匹配最坏 O(nm)（如 S 全 a、P 以 b 结尾）',
            '论文目标：最坏情形也做到 O(n+m)'
          ],
          summary: '论文核心贡献：把匹配从 O(nm) 降到 **O(n+m)**，且不要求主串可回溯。',
          details: [
            { h: '为什么朴素算法慢', body: '每次失配主串指针都要退回去重比，最坏情况下每个位置都比 m 次。' },
            { h: '关键洞察', body: '失配时已比较过的字符蕴含信息——模式串自身的「真前后缀相等」结构可以决定 j 跳到哪里，而主串指针不必回退。' }
          ]
        },
        { type: 'keypoint', title: 'failure function（失败函数）',
          points: [
            '定义：f(j) = P[0..j-1] 的最长相等真前后缀长度',
            '即教材中的 next 数组（下标约定略有差异）',
            '匹配循环：失配时 j ← f(j)，i 不变'
          ],
          summary: '论文用 failure function 统一描述「j 该跳到哪」，这是 KMP 的全部秘密。',
          details: [
            { h: '与 408 教材的关系', body: '教材的 next 数组 = 论文的 failure function + 下标平移：next[0] = -1 是哨兵。**看懂论文再看教材的 next 推导会豁然开朗**。' },
            { h: '构造复杂度', body: 'failure function 的构造也是线性扫描 + 回退，O(m)。整个算法 O(m) + O(n) = O(n+m)。' }
          ]
        },
        { type: 'code', title: '论文算法伪代码还原',
          summary: 'C 语言还原论文核心循环，与数据结构教材完全一致。',
          lang: 'C',
          code: `/* 匹配主循环（论文 Algorithm 2 的现代写法） */
int kmp(const char *s, const char *p){
    int n = strlen(s), m = strlen(p);
    int *f = (int *)malloc(m * sizeof(int));
    computeFailure(p, m, f);          /* f[j] = 最长相等真前后缀长度 */
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (j == -1 || s[i] == p[j]) { i++; j++; }
        else j = f[j] - 1;            /* 论文下标从 1 起，平移到 0 起 */
    }
    free(f);
    return j == m ? i - m : -1;
}`,
          explain: [
            { line: 9, text: 'j == -1 表示模式串整体右移一位，i 继续前进' },
            { line: 10, text: '失配跳转：主串指针 i 从不回退' }
          ],
          complexity: { best: 'O(n+m)', avg: 'O(n+m)', worst: 'O(n+m)', space: 'O(m)', stability: '—' },
          details: [
            { h: '历史注记', body: '论文同时给出线性时间构造 failure function 的方法（j 与 k 同步推进、失配沿 f 回退），即教材 getNext 的原型。' }
          ]
        },
        { type: 'table', title: '论文 vs 教材：记号对照',
          headers: ['维度', 'KMP 论文(1977)', '408 教材'],
          rows: [
            ['下标起点', '1 开始', '1 开始（部分教材 0 起）'],
            ['失败函数', 'f(j)（真前后缀长度）', 'next[j]'],
            ['哨兵', 'f(1) = 0', 'next[1] = 0'],
            ['失配跳转', 'j ← f(j)', 'j ← next[j]'],
            ['时间复杂度', 'O(m+n) 最坏', 'O(m+n) 最坏']
          ],
          note: '**结论**：概念同源、记号平移，考试按教材 next 数组写即可。',
          details: [
            { h: '读论文的价值', body: '理解 failure function 的**构造原理**（为什么线性），比背 next 推导更抗考——408 大题可能要求证明或设计变体。' }
          ]
        },
        { type: 'concept', title: '影响与后续发展',
          points: [
            'BM 算法：从右向左匹配，跳过更多字符',
            'Z 算法 / 后缀数组：线性时间的其他路径',
            'KMP 思想渗透到 AC 自动机（多模式匹配）'
          ],
          summary: 'KMP 开启了**线性时间字符串匹配**研究，是 AC 自动机、BM、Z 算法等的基础。',
          details: [
            { h: 'AC 自动机', body: '在 KMP 单模式失配跳转思想之上，把模式集合建成 Trie + fail 指针，一次扫描匹配全部模式串——正则引擎与敏感词过滤的核心。' },
            { h: '面试延伸', body: '「如何统计主串中模式串出现次数」→ KMP 匹配成功时 j = f(j) 继续；「求最长回文子串」→ Manacher，是 KMP 思想的镜像。' }
          ]
        }
      ]
    }
  ]
});
