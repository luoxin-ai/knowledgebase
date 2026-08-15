/* ================================================================
 * data/english/reading-simu.js —— 模拟阅读精读（第一批）
 * ----------------------------------------------------------------
 * 五篇原创模拟阅读，难度对标 2015-2020 考研英语一：
 *   P1 算法推荐与公共注意力（科技与社会）
 *   P2 自动化与就业（科技与社会）
 *   P3 成长型思维（教育/心理）
 *   P4 零工经济（经济/职场）
 *   P5 博物馆数字化（文化/媒体）
 * 每篇五件套：原文 / 词汇注释 / 长难句分析 / 题目 / 逐题解析
 * ================================================================ */
KB.register({
  id: 'reading-simu',
  folder: 'english',
  type: 'book',
  title: '模拟阅读精读（第一批）',
  source: '考研英语一风格自编模拟 · 贴近真题难度',
  updated: '2026-08',
  chapters: [

    /* ==================== Passage 1 算法推荐与公共注意力 ==================== */
    {
      id: 'p1', num: 1, title: '算法推荐与公共注意力', titleEn: 'Text 1 · Algorithms and Public Attention',
      summary: '推荐算法以「参与度」为目标重塑公共阅读，作者指出其设计已是不容回避的伦理问题。',
      blocks: [
        { type: 'concept', title: 'Passage 1 原文',
          exam: { freq: '阅读 A 节', forms: ['主旨题','细节题','推理题','词义题','态度题'], score: '10 分' },
          summary: '算法信息流按「参与度」筛选内容，激起强情绪者上位、细致公允者沉没，作者主张其设计目标本身是伦理问题。',
          details: [
            { h: 'Para 1', body: `When the editors of a leading news application boast that their recommendation engine decides what forty million people read each morning, they are not exaggerating. Algorithmic feeds now supply a substantial share of the information that citizens of industrialized countries consume, from headlines to hobby tips. What was once a curator's job—selecting, ordering, and presenting material—has quietly migrated into systems that no single human being fully understands. The shift has been gradual enough to escape notice, yet total enough to resist reversal.` },
            { h: 'Para 2', body: `The logic that drives these systems is disarmingly simple. A recommendation algorithm is trained to maximize a single measurable quantity: engagement, usually defined as time spent and actions taken on the platform. Engineers call this the objective function, and almost nobody outside the profession has heard of it. Content that provokes strong reactions is promoted, whatever its accuracy, because outraged readers click, comment, and return. Material that is nuanced or reassuring, by contrast, tends to sink from view—not because anyone decided it should, but because the mathematics of optimization treats it as worthless.` },
            { h: 'Para 3', body: `The consequences of this arrangement are still being debated, but early evidence is troubling. Researchers who tracked the browsing records of thousands of volunteers found that users of algorithmic feeds were more likely to encounter emotionally charged claims and less likely to correct false beliefs later. Attention, once a renewable resource, is fragmented into slices too brief for sustained argument. Critics argue that a public habituated to such feeds gradually loses tolerance for the slow, patient reading that democratic deliberation presupposes.` },
            { h: 'Para 4', body: `Defenders of the technology respond that the picture is overdrawn. Personalization, they point out, has made vast stores of knowledge accessible to people who would never have entered a good library, and most users report satisfaction with their feeds. The problem, in this view, lies not with algorithms themselves but with the advertising model that rewards attention rather than judgment. Change the incentives, and the same technology could elevate the quality of public discourse.` },
            { h: 'Para 5', body: `Both camps, however, tend to assume that the choice of what to optimize is a purely commercial one. It is not. When a system shapes what billions read, its design becomes an ethical question, as unavoidable as the safety of a bridge. Engineers who write the objective function are, whether they accept the label or not, drafting the terms on which a society argues with itself.` }
          ]
        },

        { type: 'table', title: '词汇注释',
          headers: ['词汇/短语', '释义', '备注'],
          rows: [
            ['curator / curate', 'n. 策展人 / v. 挑选、编排（内容）', '[[熟词僻义]] curate 本指「策展」，引申为内容筛选'],
            ['engagement', 'n. 用户参与度', '[[熟词僻义]] 本义「订婚；约定」，平台语境指停留与互动'],
            ['feed', 'n. 信息流', '[[熟词僻义]] 本义「喂养；饲料」，algorithmic feed 算法信息流'],
            ['nuanced', 'adj. 有细微差别的', 'nuance n. 细微差别；material that is nuanced 细腻公允的内容'],
            ['overdrawn', 'adj. 夸张的、言过其实的', '[[熟词僻义]] overdraw 本义「透支（账户）」'],
            ['habituated', 'adj. 习惯于……的', 'habituate v. 使习惯于（to）；a public habituated to… 已习惯于…的公众'],
            ['presuppose', 'v. 以……为前提；预先假定', 'pre（预先）+ suppose（假定）'],
            ['deliberation', 'n. 审议；深思熟虑', 'democratic deliberation 民主审议'],
            ['discourse', 'n. 话语；论述', 'public discourse 公共话语，阅读高频词'],
            ['objective function', '目标函数', 'objective 此处取「目标的」义；optimization n. 优化']
          ],
          note: '**读真题技巧**：本篇抽象名词多（engagement / deliberation / discourse），先抓动词逻辑再看名词。'
        },

        { type: 'error', title: '长难句分析',
          summary: '本篇长难句集中在「插入语 + 从句嵌套」，先拎主干再回填修饰。',
          mistakes: [
            { title: 'what 主语从句 + 破折号插入语 + 定语从句',
              wrong: '曾经是策展人的工作，安静地迁移进了没人完全理解的系统里。（误把插入语当主句成分）',
              right: `「曾经由策展人承担的那份工作——挑选、排序、呈现材料——已悄然迁移到没有任何单个人能完全理解的系统中。」主干：What was once a curator's job（主语从句）has migrated into systems（谓宾）；双破折号内是 job 的同位说明；that no single human being fully understands 是 systems 的定语从句。`,
              why: '结构：What-从句作 S + has migrated 作 V + into systems 作状语；插入语 selecting, ordering, and presenting material 解释 job；定语从句修饰 systems。主干 SVO 只有三个词：job / migrated / systems。' },
            { title: '定语从句 + 让步插入 + because 原因状从',
              wrong: '内容被推广无论其准确性，因为愤怒的读者点击、评论并返回。（把 whatever 从句当主句）',
              right: '「激起强烈情绪反应的内容会被推高——无论其准确性如何——因为被激怒的读者会点击、评论并回访。」主干：Content is promoted；that provokes strong reactions 修饰 Content；whatever its accuracy 是让步插入；because 引导原因状语。',
              why: '主干 SVO：Content（S）is promoted（V+被动）；三层修饰依次后置：定语从句 → 让步插入 → 原因从句。[[口诀]] 主干先行，修饰后置。' },
            { title: '宾语从句 + 过去分词后置定语 + 定语从句嵌套',
              wrong: '批评者认为，习惯于这种信息流的公众逐渐失去了宽容。（丢失定语从句层级）',
              right: '「批评者认为，已习惯于此类信息流的公众会逐渐失去对民主审议所必需的那种缓慢而耐心的阅读的容忍。」主干：Critics argue that a public loses tolerance；habituated to such feeds 是后置分词定语修饰 public；that democratic deliberation presupposes 修饰 reading。',
              why: 'argue 后接宾语从句（S=a public，V=loses，O=tolerance）；两级后置修饰：分词短语→public，定语从句→reading。翻译时把后置定语提前。' },
            { title: 'whether 让步插入 + 介词前置定语从句',
              wrong: '编写目标函数的工程师们，无论是否接受这个标签，都在起草条款。（丢失 on which 从句内容）',
              right: '「编写目标函数的工程师，无论是否接受这一名分，实际上正在起草一个社会同自身争论时所依据的规则。」主干：Engineers are drafting the terms；whether they accept the label or not 让步插入；on which a society argues with itself 修饰 terms（介词前置的定语从句）。',
              why: '主干 SVO：Engineers（S）are drafting（V）the terms（O）；who write the objective function 修饰 Engineers。on which = on the terms，指「依据这些条款」。' }
          ]
        },

        { type: 'quiz', title: 'Passage 1 题目',
          summary: '5 题：主旨 / 细节 / 推理 / 词义 / 态度。',
          questions: [
            { qid: 'en-r-1-q1', stem: `The text is mainly concerned with`,
              options: [`the exaggerated claims made by editors of news applications`, `how recommendation algorithms shape public reading and the debate over their design`, `why the advertising model rewards attention rather than judgment`, `the decline of democratic deliberation in industrialized countries`],
              answer: 'b',
              explain: `解析:全文围绕推荐算法如何决定公共阅读(Para 1-3 机制与后果)、辩护方观点(Para 4)与作者的伦理升华(Para 5)展开,选 B。A 以偏概全,首段编辑的炫耀只是引子;C 张冠李戴,这是 Para 4 辩护方观点而非全文主旨;D 无中生有,民主审议只是论证中的一环。` },
            { qid: 'en-r-1-q2', stem: `According to Paragraph 2, recommendation systems give priority to content that`,
              options: [`has been verified for accuracy`, `is nuanced and carefully balanced`, `arouses intense emotional reactions`, `appeals to a small group of devoted readers`],
              answer: 'c',
              explain: `解析:Para 2 第 4 句指出激起强烈反应的内容会被推广,无论其准确性如何,选 C。A 与原文 whatever its accuracy 相反;B 与原文相反,nuanced 的内容 tends to sink from view;D 无中生有,原文未提及小众读者。` },
            { qid: 'en-r-1-q3', stem: `It can be inferred from Paragraph 4 that defenders of personalization believe`,
              options: [`algorithms should be prohibited from ranking news content`, `libraries remain the best source of knowledge for ordinary people`, `public discourse has already been elevated by personalized feeds`, `the fault lies in the incentive structure, not in the technology itself`],
              answer: 'd',
              explain: `解析:Para 4 第 3 句:The problem...lies not with algorithms themselves but with the advertising model that rewards attention rather than judgment,即问题在激励机制而非技术本身,选 D。A 与辩护立场相反;B 偷换概念,原文说个性化让知识对「不进图书馆的人」可达,并非主张图书馆最好;C 程度失当,「提升公共话语」是虚拟语气 Change the incentives 之后的可能性,不是已发生的事实。` },
            { qid: 'en-r-1-q4', stem: `The word "habituated" (Paragraph 3) is closest in meaning to`,
              options: [`accustomed`, `confined`, `attracted`, `exposed`],
              answer: 'a',
              explain: `解析:habituated 意为「习惯了的」(habituate v. 使习惯于),a public habituated to such feeds 指已习惯此类信息流的公众,选 A。B confined「受限制的」、C attracted「被吸引的」、D exposed「被暴露的」均只触及接触过程或状态的一面,未表达「长期形成习惯」义。` },
            { qid: 'en-r-1-q5', stem: `Toward the design of recommendation systems, the author's attitude can best be described as`,
              options: [`indifferent to its social consequences`, `skeptical of any attempt to regulate it`, `supportive of the advertising model behind it`, `concerned about its ethical implications`],
              answer: 'd',
              explain: `解析:Para 5 第 3 句:its design becomes an ethical question, as unavoidable as the safety of a bridge,作者明确将其设计上升为伦理问题,态度是关切,选 D。A 与全文批评立场相反;B 无中生有,作者未讨论监管;C 张冠李戴,广告模式是 Para 4 辩护方的分析对象,作者并非支持。` }
          ]
        },

        { type: 'keypoint', title: '逐题解析',
          points: [
            '第 1 题【主旨题】选 B。定位全文结构:Para 1 引出现象 → Para 2 机制 → Para 3 后果 → Para 4 争论 → Para 5 伦理定性。A 以偏概全(首段细节作饵);C 张冠李戴(辩护方观点);D 程度失当(原文只说 lose tolerance for slow reading,未说审议「衰落」)。',
            '第 2 题【细节题】选 C。定位 Para 2 第 4 句 Content that provokes strong reactions is promoted, whatever its accuracy。A 与 whatever its accuracy 相反;B 与第 5 句 nuanced...tends to sink 相反;D 无中生有。',
            '第 3 题【推理题】选 D。定位 Para 4 第 3 句 lies not with algorithms themselves but with the advertising model(...incentives)。A 与辩护立场相反;B 偷换概念(可达性≠图书馆最优);C 程度失当(虚拟语气误读为事实)。',
            '第 4 题【词义题】选 A。定位 Para 3 第 4 句,habituated to such feeds 与 gradual 形成呼应,取「习惯」义。B 偷换概念;C 程度失当;D 混淆「接触」与「适应」。',
            '第 5 题【态度题】选 D。定位 Para 5 第 3 句 ethical question + as unavoidable as the safety of a bridge(类比桥梁安全,分量极重)。A 相反;B 无中生有;C 张冠李戴。[[口诀]] 态度题先看副词与类比,类比即立场。'
          ]
        }
      ]
    },

    /* ==================== Passage 2 自动化与就业 ==================== */
    {
      id: 'p2', num: 2, title: '自动化与就业', titleEn: 'Text 2 · Automation and Work',
      summary: '从勒德分子到生成式 AI，两百年自动化史「转移而非消灭」工作，真正的问题是回报分配。',
      blocks: [
        { type: 'concept', title: 'Passage 2 原文',
          exam: { freq: '阅读 A 节', forms: ['细节题','推理题','词义题','主旨题'], score: '10 分' },
          summary: '技术革命反复改写就业构成而非总量；本轮自动化的新特点是吞噬认知任务的中层岗位，核心问题是「谁拥有机器、如何分配收益」。',
          details: [
            { h: 'Para 1', body: `In 1811, framework knitters in the English Midlands smashed the machines that had begun to replace them, giving the English language the word "Luddite". Their rebellion failed, and so, two centuries later, has every confident prediction that automation would produce mass unemployment. Yet the anxiety never quite disappears; it merely changes its object. Today the machinery in question composes prose, drafts contracts, and writes computer code, and the unease it provokes is once again audible among office workers who imagined themselves immune.` },
            { h: 'Para 2', body: `The standard economic reply is that technology destroys particular jobs while creating new categories of work nobody had imagined. The typist vanished; the software engineer arrived. Between 1850 and 2020, farm employment in industrialized countries collapsed from roughly half the workforce to under three percent, yet total employment did not fall, because rising productivity generated demand for goods and services that earlier generations could not have named. History, on this reading, is a record of relocation rather than removal.` },
            { h: 'Para 3', body: `What distinguishes the current wave of automation is the kind of task it absorbs. Earlier technologies replaced muscle and routine: lifting, sorting, welding. The newest systems substitute for judgment itself—summarizing documents, evaluating loan applications, even drafting medical notes. Because such cognitive work constitutes the core of middle-class professions, the ladder by which previous generations climbed upward may be losing its lower rungs. An accountant who started with bookkeeping no longer has the bookkeeping to start with.` },
            { h: 'Para 4', body: `Labor market data already hint at this hollowing. Across advanced economies, employment growth since 2000 has concentrated at the two ends of the skill distribution—high-paid professional work and low-paid personal services—while routine middle occupations have contracted. The pattern is consistent with machines eating the middle of the wage structure first. Notably, the total volume of work has held up; it is the composition, and the bargaining power attached to each slot, that has shifted.` },
            { h: 'Para 5', body: `The lesson of two centuries is therefore not that anxiety is foolish but that its object has been misidentified. Automation has rarely reduced the quantity of work available; it has repeatedly redistributed the rewards. The urgent question is not how many jobs will survive, but who will own the machines that do them—and how the gains they generate will be shared. That is a political question, and no algorithm will answer it.` }
          ]
        },

        { type: 'table', title: '词汇注释',
          headers: ['词汇/短语', '释义', '备注'],
          rows: [
            ['Luddite', 'n. 勒德分子；强烈反对新技术者', '源自 1811 年捣毁机器的英国织袜工，阅读文化背景高频词'],
            ['audible', 'adj. 听得见的；显而易见的', 'unease is audible 不安显而易见，转移形容'],
            ['immune', 'adj. 免疫的；不受影响的', 'be immune to... 对……免疫/不受影响'],
            ['vanish', 'v. 消失', 'The typist vanished 打字员消失了'],
            ['relocation', 'n. 转移；重新安置', 'relocation rather than removal 转移而非移除，对仗结构'],
            ['absorb', 'v. 承接；吞下；吸收', '[[熟词僻义]] the task it absorbs 技术「承接」的任务'],
            ['rung', 'n. （梯子的）横档；（晋升的）台阶', '[[熟词僻义]] the lower rungs 职业阶梯的入门层'],
            ['hollowing', 'n. 中空化', '[[熟词僻义]] hollow 本义 n.「洞」，v.「掏空」，此处指就业结构中空'],
            ['composition', 'n. 构成；成分', '[[熟词僻义]] 本义「作文；作曲」'],
            ['bargaining power', '议价能力', 'bargain v. 讨价还价；n. 交易，经济类高频']
          ],
          note: '**对仗修辞**：relocation rather than removal、not the quantity...but the rewards，英语一议论文常见破题句式。'
        },

        { type: 'error', title: '长难句分析',
          summary: '本篇三处典型结构：并列套嵌、Because 原因前置、not...but 否定转移。',
          mistakes: [
            { title: '并列句 + 嵌套定语从句',
              wrong: '当今的机器问题写散文，起草合同并编写计算机代码。（丢失 in question 与 audible 从句）',
              right: '「当今所说的这种机器会撰写文章、起草合同、编写代码，而它所激起的不安在那些自以为免疫的办公室职员中再度清晰可闻。」主干①：the machinery composes...drafts...and writes（三个并列谓语）；主干②：the unease is audible。in question 后置定语「所说的」；it provokes 与 who imagined themselves immune 均为嵌套定语从句。',
              why: '结构：and 连接两个分句；第一分句 S=the machinery，三个并列 V；第二分句 S=the unease，V=is audible，among office workers 地点状语内嵌 who 从句。' },
            { title: 'Because 原因状从 + 介词前置定语从句',
              wrong: '因为这类认知工作构成中产阶级职业的核心，梯子可能正在失去它的低横档。（丢失 by which 层级）',
              right: '「由于这类认知工作构成了中产阶级职业的核心，前几代人借以上升的阶梯可能正在失去其底部的横档。」主干：the ladder may be losing its lower rungs；Because 原因状从在前；by which previous generations climbed upward 修饰 ladder（介词 by 前置）。',
              why: '主干 SVO：ladder（S）/ is losing（V）/ rungs（O）；by which = by the ladder（凭借梯子）。抽象比喻：ladder=职业晋升通道，lower rungs=入门级岗位。' },
            { title: 'not...but 并列 + 破折号补充 + 双重嵌套定语从句',
              wrong: '紧急的问题不是多少工作会存活，而是谁将拥有做这些工作的机器。（丢失破折号后的分享分句）',
              right: '「紧迫的问题不是多少工作会幸存，而是谁将拥有那些干活机器——以及它们创造的收益将如何分配。」主干：The question is not A but B；A=how many jobs will survive，B=who will own the machines；破折号补充第二个 B 元素 how the gains will be shared；that do them 与 they generate 均为嵌套定语从句。',
              why: '表语从句并列（not...but...and 结构）；that do them 修饰 machines（them=the jobs），they generate 修饰 gains（省略 that）。[[口诀]] not A but B，B 后还能挂 and C。' }
          ]
        },

        { type: 'quiz', title: 'Passage 2 题目',
          summary: '5 题：细节 / 推理 / 词义 / 细节 / 主旨。',
          questions: [
            { qid: 'en-r-2-q1', stem: `The word "Luddite" (Paragraph 1) originated with workers who`,
              options: [`composed prose and drafted contracts`, `destroyed the machinery replacing them`, `predicted mass unemployment in offices`, `refused to be retrained for new occupations`],
              answer: 'b',
              explain: `解析:Para 1 第 1 句:framework knitters...smashed the machines that had begun to replace them, giving the English language the word "Luddite",即捣毁替代自己的机器的工人,选 B。A 张冠李戴,撰写文章起草合同是「当今的机器」;C 张冠李戴,预测失业的是「后来的预言家」;D 无中生有,原文未提拒绝再培训。` },
            { qid: 'en-r-2-q2', stem: `The author mentions the accountant and bookkeeping (Paragraph 3) to illustrate that`,
              options: [`bookkeeping no longer requires professional training`, `cognitive work is better paid than routine work`, `entry-level tasks that once trained beginners are being automated`, `accountants are the profession most threatened by AI`],
              answer: 'c',
              explain: `解析:Para 3 第 4 句指出职业阶梯 losing its lower rungs,第 5 句用会计做例证:过去从记账起步的会计如今已无记账可做,说明入门级任务正被自动化,选 C。A 偷换概念,问题在于入门台阶消失而非不需要训练;B 无中生有,此处未做薪酬比较;D 程度失当,会计只是例子,非「受威胁最大」。` },
            { qid: 'en-r-2-q3', stem: `The phrase "losing its lower rungs" (Paragraph 3) suggests that`,
              options: [`professional ladders are becoming safer to climb`, `the starting positions for career advancement are disappearing`, `workers are refusing bottom-level occupations`, `wages have fallen across all skill levels`],
              answer: 'b',
              explain: `解析:rung 本义「梯子横档」,the lower rungs 喻指职业晋升的入门岗位;结合上文 the ladder by which previous generations climbed upward,losing its lower rungs 指向上通道的起点正在消失,选 B。A 与原意相反;C 偷换概念,是机器吞噬而非工人拒绝;D 无中生有,Para 4 才谈工资结构且是「两端增长、中间收缩」。` },
            { qid: 'en-r-2-q4', stem: `According to Paragraph 4, employment growth since 2000 in advanced economies`,
              options: [`has occurred at both ends of the skill distribution`, `has fallen in total volume of work`, `has concentrated in routine middle occupations`, `has reduced bargaining power for high-paid professionals`],
              answer: 'a',
              explain: `解析:Para 4 第 2 句:employment growth...has concentrated at the two ends of the skill distribution—high-paid professional work and low-paid personal services,选 A。B 与第 4 句 the total volume of work has held up 相反;C 与原文相反,收缩的恰是中间层;D 张冠李戴,原文说议价能力 attached to each slot 整体发生转移,未指高端议价能力下降。` },
            { qid: 'en-r-2-q5', stem: `The author concludes that the real question raised by automation is`,
              options: [`how many jobs will survive the transition`, `whether algorithms can settle political disputes`, `why anxiety about technology is foolish`, `how the gains from machines will be distributed`],
              answer: 'd',
              explain: `解析:Para 5 第 3 句:The urgent question is not how many jobs will survive, but who will own the machines...and how the gains...will be shared,真正问题是收益归属与分配,选 D。A 与 not 后的内容一致,恰是作者否定的问题;B 程度失当,作者说 no algorithm will answer it,意在强调这是政治问题,而非讨论算法能否调解纠纷;C 相反,作者明言 anxiety is not foolish。` }
          ]
        },

        { type: 'keypoint', title: '逐题解析',
          points: [
            '第 1 题【细节题】选 B。定位 Para 1 第 1 句 smashed the machines that had begun to replace them。A 张冠李戴（当今机器的能力）；C 张冠李戴（失败的是预言家）；D 无中生有。',
            '第 2 题【推理题】选 C。定位 Para 3 第 4-5 句，例证服务于段落论点 the ladder...losing its lower rungs。A 偷换概念；B 无中生有；D 程度失当。',
            '第 3 题【词义题】选 B。定位 Para 3 第 4 句，rung 比喻义「（晋升）台阶」。A 相反；C 偷换概念（主体错置）；D 无中生有。',
            '第 4 题【细节题】选 A。定位 Para 4 第 2 句 two ends of the skill distribution。B 与第 4 句相反；C 相反；D 张冠李戴。',
            '第 5 题【主旨题】选 D。定位 Para 5 第 3 句 not...but...and 结构的宾语。A 被 not 否定；B 程度失当；C 与第 1 句 not that anxiety is foolish 相反。[[口诀]] 结论段 not A but B,答案永远在 B。'
          ]
        }
      ]
    },

    /* ==================== Passage 3 成长型思维 ==================== */
    {
      id: 'p3', num: 3, title: '成长型思维', titleEn: 'Text 3 · Growth Mindset',
      summary: '成长型思维理论实验精巧、干预廉价，但大样本重复显示效应有限，作者的结论是「有限但真实」。',
      blocks: [
        { type: 'concept', title: 'Passage 3 原文',
          exam: { freq: '阅读 A 节', forms: ['细节题','推理题','词义题','态度题','主旨题'], score: '10 分' },
          summary: '夸努力与夸聪明的实验揭示信念影响行为，但大规模重复实验效应量小，心态只是多因素之一。',
          details: [
            { h: 'Para 1', body: `Few ideas in modern educational psychology have traveled as far as the "growth mindset": the belief that intellectual ability is not a fixed inheritance but a muscle that strengthens with effort. Proposed by psychologists studying how children interpret failure, the concept has been adopted by ministries of education, corporate training programs, and countless classroom posters. Its spread owes much to its flattering simplicity—anyone can grow—yet the research behind it is more complicated than the slogan suggests, and psychologists themselves have struggled to decide how much of the promise survives contact with ordinary classrooms.` },
            { h: 'Para 2', body: `The original experiments were elegantly spare. Children were given a puzzle set, praised either for their intelligence or for their effort, and then offered a choice between an easy puzzle and a hard one. Those told they were "smart" tended to pick the easy task, apparently to protect the label; those praised for working hard largely chose the difficult one. When both groups later confronted an insoluble puzzle, the "smart" children abandoned it sooner and enjoyed it less.` },
            { h: 'Para 3', body: `From such findings grew a theory with practical weight: students who believe ability is malleable treat setbacks as information rather than verdicts, persist longer, and achieve more. Interventions designed to teach this belief—sometimes no more than two online sessions—have reported measurable gains in grades among weak students, at trivial cost compared with conventional tutoring. The mechanism appears to operate through help-seeking: fixed-mindset students conceal confusion, because admitting it threatens their identity.` },
            { h: 'Para 4', body: `Recent large-scale replications, however, have tempered the enthusiasm. A study covering more than a hundred thousand students found the average effect of mindset interventions on achievement to be real but small, concentrated among the weakest students and almost invisible among the rest. Effects also varied dramatically with context: the same program that worked in one school did nothing in its neighbor, depending on how teachers talked about ability in daily practice.` },
            { h: 'Para 5', body: `The reasonable conclusion is neither dismissal nor devotion. Mindset is one strand in a braid that includes prior attainment, home circumstances, and instruction quality. What the research does establish is more modest than the posters claim but still valuable: how students explain their own struggle changes what they do next, and a few carefully chosen words from an adult can bend that explanation in a better direction.` }
          ]
        },

        { type: 'table', title: '词汇注释',
          headers: ['词汇/短语', '释义', '备注'],
          rows: [
            ['inheritance', 'n. 遗传；继承物', 'fixed inheritance 固定天赋，与 muscle 对举'],
            ['malleable', 'adj. 可塑的；易改变的', 'ability is malleable 能力可塑，同根 malleability'],
            ['verdict', 'n. 裁决；定论', 'setbacks as information rather than verdicts 挫折是信息而非判决'],
            ['insoluble', 'adj. 不能解决的', '[[熟词僻义]] 另义「不可溶解的」，此处指「无解的」谜题'],
            ['intervention', 'n. 干预；介入', 'mindset interventions 心态干预（实验处理手段）'],
            ['replication', 'n. 重复实验；复制', 'replicate v. 重复验证，科学方法类高频词'],
            ['dismissal', 'n. 否定；不予考虑', 'neither dismissal nor devotion 既不否定也不盲从'],
            ['attainment', 'n. 成就；学业成绩', 'prior attainment 先前成绩，教育测量术语'],
            ['braid', 'n. 辫子；（交织的）一股', 'one strand in a braid 比喻「多因素交织中的一股」'],
            ['bend', 'v. 使改变方向', '[[熟词僻义]] 本义「弄弯」，bend the explanation 扭转其解释']
          ],
          note: '**实验类文章套路**：实验设计（Para 2）→ 理论与机制（Para 3）→ 重复验证与质疑（Para 4）→ 平衡结论（Para 5），英语一科研题材通行结构。'
        },

        { type: 'error', title: '长难句分析',
          summary: '本篇难点是「分号并列 + 分隔同位语 + 主语从句开头」，抓对等连接即可破题。',
          mistakes: [
            { title: '分号并列 + 过去分词后置定语',
              wrong: '被告知聪明的孩子倾向于选择简单的任务来保护标签；被表扬努力的孩子选择了困难的。（丢失 apparently 与 largely 的限定）',
              right: '「被说『聪明』的孩子倾向于挑容易的任务，显然是为了保住这个标签；而因努力受到表扬的孩子大多选择了难题。」主干：Those...tended to pick the easy task; those...chose the difficult one；told they were "smart" 与 praised for working hard 均为后置分词定语；apparently to protect the label 是目的状语。',
              why: '分号连接两个对仗分句，S 分别是 Those/those，各自带后置分词定语；to protect 不定式表目的。翻译时后置定语提前，分号译成「而」。' },
            { title: '分隔式同位语 + 定语从句',
              wrong: '设计用来教授这种信念的干预措施报告了成绩的进步。（丢失破折号插入的补充信息）',
              right: '「旨在灌输这种信念的干预——有时不过是两节在线课程——据报道能提升弱生的成绩，且与常规辅导相比成本微不足道。」主干：Interventions have reported measurable gains；designed to teach this belief 后置定语；破折号内 sometimes no more than two online sessions 是同位语；at trivial cost... 状语。',
              why: '主干 SVO：Interventions（S）have reported（V）gains（O）；no more than「不过是」= 仅仅，体现干预之廉价。compared with conventional tutoring 过去分词状语。' },
            { title: '主语从句 + 比较从句 + 冒号解释 + 嵌套宾语从句',
              wrong: '研究确立的东西比海报宣称的更谦虚但仍有价值：学生如何解释自己的斗争改变了他们接下来做什么。（层次尚可但丢失 a few words 分句）',
              right: '「研究确实确立的东西比海报宣称的要朴素，但仍有价值：学生如何解释自己的挣扎会改变其后续行为，而成年人几句斟酌过的话就能把这种解释引向更好的方向。」主干：What the research does establish is more modest but still valuable；冒号后解释：how students explain their own struggle（主语从句）changes what they do next（宾语从句），and 并列第二分句。',
              why: 'What-从句作 S + is 系动词 + 表语；more modest than the posters claim 中 than 引导比较从句；冒号后两个 and 并列分句，各自内嵌 wh-从句。does establish 中 does 为强调。' }
          ]
        },

        { type: 'quiz', title: 'Passage 3 题目',
          summary: '5 题：细节 / 推理 / 词义 / 态度 / 主旨。',
          questions: [
            { qid: 'en-r-3-q1', stem: `In the puzzle experiments (Paragraph 2), children praised for being smart`,
              options: [`performed better on insoluble puzzles`, `worked harder to justify the praise`, `tended to choose easier tasks and give up sooner`, `refused to attempt any further puzzles`],
              answer: 'c',
              explain: `解析:Para 2 第 3 句:Those told they were "smart" tended to pick the easy task,第 4 句:the "smart" children abandoned it sooner,即倾向于选易题且放弃更早,选 C。A 与第 4 句 enjoyed it less、sooner abandoned 相反;B 相反,坚持更久的是受表扬努力的孩子;D 程度失当,是「更早放弃」而非「拒绝尝试」。` },
            { qid: 'en-r-3-q2', stem: `It can be inferred from Paragraph 3 that students with a fixed mindset avoid asking for help because`,
              options: [`teachers respond poorly to their questions`, `they expect interventions to solve their problems`, `online sessions discourage interaction`, `admitting confusion threatens how they see themselves`],
              answer: 'd',
              explain: `解析:Para 3 第 3 句:fixed-mindset students conceal confusion, because admitting it threatens their identity,隐瞒困惑是因为承认困惑威胁其自我认同,选 D。A 无中生有;B 张冠李戴,interventions 是外部研究手段而非学生的期待;C 无中生有,原文未说在线课程抑制互动。` },
            { qid: 'en-r-3-q3', stem: `The word "tempered" (Paragraph 4) is closest in meaning to`,
              options: [`moderated`, `confirmed`, `dismissed`, `strengthened`],
              answer: 'a',
              explain: `解析:temper v. 本义「回火;使缓和」,此处 have tempered the enthusiasm 指大样本重复实验「使热情降温/收敛」,且下文说效应 real but small,与「缓和」吻合,选 A。B 与 however 转折逻辑矛盾;C 程度失当,效应仍 real;D 与 real but small 相反。` },
            { qid: 'en-r-3-q4', stem: `The author's attitude toward growth-mindset theory is one of`,
              options: [`outright skepticism about its scientific basis`, `enthusiasm for its classroom applications`, `qualified acceptance of its limited but real value`, `indifference to the replication debate`],
              answer: 'c',
              explain: `解析:Para 5 第 1 句:neither dismissal nor devotion,第 3 句:more modest than the posters claim but still valuable,作者的态度是有保留的接受,选 C。A 程度失当,作者承认效应 real;B 程度失当,作者明确与海报式热情保持距离;D 相反,Para 4 整段讨论重复实验,作者并非漠然。` },
            { qid: 'en-r-3-q5', stem: `Which of the following best summarizes the text?`,
              options: [`Praising effort rather than intelligence guarantees academic success`, `Large-scale replications have disproven growth-mindset theory`, `Teachers' daily language matters more than students' beliefs`, `Mindset is one contributing factor among several, with modest effects`],
              answer: 'd',
              explain: `解析:Para 5 第 2 句:Mindset is one strand in a braid that includes prior attainment, home circumstances, and instruction quality,且效应 real but small,即「多因素之一、效应有限」,选 D。A 程度失当,guarantees 过于绝对,原文只说 can bend the explanation;B 程度失当,重复实验未推翻理论,只是效应小;C 无中生有,原文未做此比较。` }
          ]
        },

        { type: 'keypoint', title: '逐题解析',
          points: [
            '第 1 题【细节题】选 C。定位 Para 2 第 3-4 句（pick the easy task + abandoned it sooner）。A 相反；B 张冠李戴（坚持的是 effort 组）；D 程度失当。',
            '第 2 题【推理题】选 D。定位 Para 3 第 3 句 conceal confusion, because admitting it threatens their identity。A、C 无中生有；B 张冠李戴。',
            '第 3 题【词义题】选 A。定位 Para 4 第 1 句，temper「使缓和」，下文 real but small 印证。B 与转折矛盾；C 程度失当；D 相反。',
            '第 4 题【态度题】选 C。定位 Para 5 第 1 句 neither dismissal nor devotion + 第 3 句 but still valuable。A、B 程度失当；D 相反。',
            '第 5 题【主旨题】选 D。定位 Para 5 第 2 句 one strand in a braid。A 程度失当（guarantees 绝对化）；B 程度失当（disproven 错）；C 无中生有。[[口诀]] 含「淡化」措辞(neither...nor, modest, small but real)的文章,主旨答案往往也是克制表述。'
          ]
        }
      ]
    },

    /* ==================== Passage 4 零工经济 ==================== */
    {
      id: 'p4', num: 4, title: '零工经济', titleEn: 'Text 4 · The Gig Economy',
      summary: '零工经济给予真实灵活性的同时剥离了劳动保障，作者的药方是「重新定价」而非取缔。',
      blocks: [
        { type: 'concept', title: 'Passage 4 原文',
          exam: { freq: '阅读 A 节', forms: ['细节题','推理题','词义题','主旨题'], score: '10 分' },
          summary: '平台工作的灵活性真实可感，但成本是结构性（无保障、算法管理）；政策任务是为其附上保障与透明。',
          details: [
            { h: 'Para 1', body: `A decade ago, driving for a ride-hailing platform or delivering restaurant meals was a sideline for students and the underemployed. Today, platforms mediate a meaningful share of the labor market in most advanced economies: by some counts, more than one worker in ten earns part of a living this way, and for a growing minority it is the only income. The "gig economy" has grown from curiosity to institution with astonishing speed.` },
            { h: 'Para 2', body: `To its defenders, the arrangement's appeal is genuine freedom. Workers choose when to log in, for how long, and—within limits—where. Parents schedule work around school runs; students around lectures; retirees around grandchildren. Surveys consistently find that a majority of platform workers value flexibility above higher pay, and many report satisfaction with work they could not otherwise have combined with other obligations. For people excluded from conventional employment by circumstance or geography, the platforms have opened a door that offices never left unlocked.` },
            { h: 'Para 3', body: `The costs, however, are structured rather than accidental. Because gig workers are classified as independent contractors, they fall outside the minimum wage, sick pay, and pension contributions that employees take for granted. The platforms' algorithms assign tasks, set rates, and deactivate workers whose ratings slip—a form of management without managers, in which discipline is exercised by numbers and appeal is difficult. Income fluctuates with demand and with unilateral changes to the pay formula, which workers discover rather than negotiate.` },
            { h: 'Para 4', body: `Regulators have begun to respond, unevenly. A European directive will require platforms to presume employment status when they control the terms of work; several American states have enacted opposite rules, keeping gig work contractual by statute. Judges, asked to decide whether a courier is really a business, have produced rulings that turn on details as fine as whether the company owns the uniform. The law, built around a binary that digital work has blurred, struggles to name what these workers are.` },
            { h: 'Para 5', body: `Yet the popularity of gig work cannot be dismissed as false consciousness. It reflects a sober trade: certainty surrendered for autonomy. The task for policy is not to abolish the trade but to reprice it—to attach portable benefits, earnings floors, and transparent algorithms to work that has already escaped the office. The platform economy is here; the question is on whose terms.` }
          ]
        },

        { type: 'table', title: '词汇注释',
          headers: ['词汇/短语', '释义', '备注'],
          rows: [
            ['sideline', 'n. 副业', '[[熟词僻义]] 本义「（球场）边线」，a sideline for students 学生的副业'],
            ['mediate', 'v. 作为中介连接', '[[熟词僻义]] 本义「调停」，platforms mediate the labor market 平台中介化劳动力市场'],
            ['log in', '登录；上线接单', 'when to log in 何时上线'],
            ['contractor', 'n. 承包人；合同工', 'independent contractor 独立承包人，零工定性争议核心'],
            ['deactivate', 'v. 停用；封禁（账号）', 'de-（去除）+ activate（激活）'],
            ['unilateral', 'adj. 单方面的', 'uni（单一）+ lateral（侧面的），unilateral changes 单方变更'],
            ['statute', 'n. 成文法；法规', 'by statute 依成文法，与 case law 判例法相对'],
            ['binary', 'n. 二元对立', '[[熟词僻义]] 本义「二进制的」，此处指「雇员/承包人」的二元划分'],
            ['false consciousness', '虚假意识', '社会学术语：被系统性扭曲的利益认知'],
            ['earnings floor', '收入下限', '[[熟词僻义]] floor 本义「地板」，经济语境指「底线、下限」']
          ],
          note: '**熟词僻义密度**：本篇 sideline / mediate / binary / floor 四处僻义，是英语一词多义的典型样本。'
        },

        { type: 'error', title: '长难句分析',
          summary: '本篇长难句聚焦「Because 前置因果 + 破折号同位语 + 分词插入」三类。',
          mistakes: [
            { title: 'Because 原因状从 + 定语从句',
              wrong: '因为零工被归类为独立承包人，他们落在最低工资之外、病假工资和员工视为理所当然的养老金缴费。（介词短语归属混乱）',
              right: '「由于零工被归类为独立承包人，他们不受最低工资、病假工资和养老金缴费的保护——而这些是正式雇员视为理所当然的待遇。」主干：they fall outside the minimum wage, sick pay, and pension contributions；Because 状从在前；that employees take for granted 修饰三个并列宾语。',
              why: '主干 SVO：they（S）fall outside（V+介）三个并列 O；take for granted「视为理所当然」嵌在定语从句中。翻译时把 fall outside 译为「不在……覆盖之内」。' },
            { title: '破折号同位语 + 非限定定语从句',
              wrong: '平台算法分配任务、设定费率并停用评分下滑的工人——一种没有管理者的管理形式，其中纪律由数字行使。（丢失 appeal is difficult）',
              right: '「平台算法分配任务、设定费率，并停用评分下滑的劳动者——这是一种没有管理者的管理，其中纪律由数字执行，而申诉十分困难。」主干：The algorithms assign..., set..., and deactivate...；破折号后 a form of management without managers 是同位语；in which...and... 是非限定定语从句，修饰 form。',
              why: '主干三个并列谓语；whose ratings slip 修饰 workers；同位语 + in which 从句双层后置修饰。management without managers 是矛盾修饰法（oxymoron）。' },
            { title: '分词插入 + that 定语从句 + as fine as 比较',
              wrong: '法官们被要求决定快递员是否真的是一门生意，产出了依赖于细节的裁决，就像公司是否拥有制服一样细。（语序错乱）',
              right: '「当法官被要求裁定一名快递员究竟算不算一门生意时，他们作出的裁决取决于诸如『公司是否拥有制服』这般细微的细节。」主干：Judges have produced rulings；asked to decide... 过去分词插入（= when they are asked）；that turn on details 定语从句；as fine as whether... 比较结构。',
              why: '主干 SVO：Judges（S）have produced（V）rulings（O）；turn on「取决于」；as fine as「细到……的程度」。分词插入语还原为状语从句再翻译。' }
          ]
        },

        { type: 'quiz', title: 'Passage 4 题目',
          summary: '5 题：细节 / 细节 / 词义 / 推理 / 主旨。',
          questions: [
            { qid: 'en-r-4-q1', stem: `According to Paragraph 3, algorithmic management on platforms is characterized by`,
              options: [`negotiated changes to pay formulas`, `discipline exercised through ratings and metrics`, `managers who handle workers' appeals`, `stable income guaranteed across demand cycles`],
              answer: 'b',
              explain: `解析:Para 3 第 3 句:deactivate workers whose ratings slip...discipline is exercised by numbers,即以评分与数字实施纪律,选 B。A 与第 4 句 which workers discover rather than negotiate 相反;C 与 appeal is difficult 相反;D 与 Income fluctuates with demand 相反。` },
            { qid: 'en-r-4-q2', stem: `Surveys cited in Paragraph 2 indicate that many platform workers`,
              options: [`value flexibility more than higher wages`, `prefer conventional employment when available`, `are excluded from ordinary family life`, `consider gig work a temporary stage`],
              answer: 'a',
              explain: `解析:Para 2 第 3 句:a majority of platform workers value flexibility above higher pay,多数人把灵活性置于更高报酬之上,选 A。B 相反,许多人 report satisfaction with work they could not otherwise have combined with other obligations;C 相反,正是能兼顾家庭才满意;D 无中生有,原文未涉「过渡性」。` },
            { qid: 'en-r-4-q3', stem: `The word "unilateral" (Paragraph 3) suggests that changes to the pay formula are made`,
              options: [`in consultation with workers`, `at random intervals`, `with regulatory approval`, `by the platforms alone`],
              answer: 'd',
              explain: `解析:unilateral = uni(单一) + lateral(侧) 即「单方面的」,且下文 which workers discover rather than negotiate 印证:费率变更由平台单方作出,工人只是事后发现,选 D。A 与 rather than negotiate 相反;B 偷换概念,「单方」不等于「随机」;C 无中生有。` },
            { qid: 'en-r-4-q4', stem: `The author implies that the popularity of gig work`,
              options: [`reflects a deliberate trade of security for autonomy`, `results from workers' ignorance of their rights`, `will fade once regulations take effect`, `proves contracting is superior to employment`],
              answer: 'a',
              explain: `解析:Para 5 第 1-2 句:cannot be dismissed as false consciousness. It reflects a sober trade: certainty surrendered for autonomy,零工的流行反映的是以确定性换自主权的清醒权衡,选 A。B 与 not false consciousness 相反;C 无中生有;D 程度失当,作者只承认 trade 合理性,未判孰优。` },
            { qid: 'en-r-4-q5', stem: `The author suggests that the proper policy response to gig work is to`,
              options: [`abolish platform work in favor of standard employment`, `extend existing office regulations to remote work`, `leave the terms of gig work to market forces`, `attach protections and transparency to gig work`],
              answer: 'd',
              explain: `解析:Para 5 第 3 句:The task for policy is not to abolish the trade but to reprice it—to attach portable benefits, earnings floors, and transparent algorithms to work...,即附着保障与透明度而非取缔,选 D。A 与 not to abolish 相反;B 偷换概念,议题是平台零工而非远程办公;C 相反,作者主张政策介入 reprice。` }
          ]
        },

        { type: 'keypoint', title: '逐题解析',
          points: [
            '第 1 题【细节题】选 B。定位 Para 3 第 3 句 deactivate workers whose ratings slip + discipline is exercised by numbers。A 与第 4 句相反；C 相反（appeal is difficult）；D 相反（Income fluctuates）。',
            '第 2 题【细节题】选 A。定位 Para 2 第 3 句 value flexibility above higher pay。B 相反；C 相反；D 无中生有。',
            '第 3 题【词义题】选 D。定位 Para 3 第 4 句，词根 uni-（单）+ 语境 rather than negotiate 印证。A 相反；B 偷换概念；C 无中生有。',
            '第 4 题【推理题】选 A。定位 Para 5 第 1-2 句 sober trade: certainty surrendered for autonomy。B 相反；C 无中生有；D 程度失当。',
            '第 5 题【主旨题】选 D。定位 Para 5 第 3 句 not to abolish...but to reprice。A 相反；B 偷换概念；C 相反。[[口诀]] 尾段 not A but B 句,答案取 B 的具体化。'
          ]
        }
      ]
    },

    /* ==================== Passage 5 博物馆数字化 ==================== */
    {
      id: 'p5', num: 5, title: '博物馆数字化', titleEn: 'Text 5 · Museums Go Digital',
      summary: '数字化拓展了博物馆的触达却不可替代在场体验，还意外强化了文物归还诉求；两种形态应是同一建筑的相连展厅。',
      blocks: [
        { type: 'concept', title: 'Passage 5 原文',
          exam: { freq: '阅读 A 节', forms: ['主旨题','细节题','推理题','词义题','态度题'], score: '10 分' },
          summary: '线上藏品是史上最廉价的触达方式，但复制品不是相遇；数字化削弱了「实物必须留在西方」的论证。',
          details: [
            { h: 'Para 1', body: `During the pandemic closures, the world's great museums discovered that their galleries could travel without their visitors moving at all. Institutions that had spent decades guarding their collections behind ticket desks pushed millions of high-resolution images online, offered virtual walk-throughs, and found audiences far larger than their buildings could ever hold. The experiment, born of necessity, has outlasted the emergency that prompted it—and revived an old argument about what a museum is for.` },
            { h: 'Para 2', body: `The case for digitization rests on access. A student in Lagos can now examine an impressionist canvas at a resolution finer than the naked eye permits in the gallery itself; a researcher can compare manuscripts held on different continents in an afternoon. For institutions, online collections are also an argument for existence: a museum that is visible is a museum that politicians hesitate to defund. Digitization, once viewed as an expensive luxury, has become the cheapest form of outreach ever invented.` },
            { h: 'Para 3', body: `The limits, however, are physical as much as legal. A reproduction, however sharp, is not an encounter: it lacks scale, texture, and the peculiar silence of a room built to hold one object. Curators note that online visitors tend to scan rather than contemplate, spending seconds on images that gallery-goers study for minutes. Copyright complicates matters further, since many museums control images of objects whose creators have been dead for centuries precisely because those images are a source of revenue.` },
            { h: 'Para 4', body: `The deepest consequence may be political. Digital collections have strengthened the case of countries demanding the return of artifacts acquired during the colonial era: an object can now be seen everywhere, so why must it remain in London or Paris? Some museums have countered that digital access satisfies the demand for viewing while the original stays put—an argument that claimants reject, insisting that what they seek is not an image but the thing itself and the sovereignty it embodies.` },
            { h: 'Para 5', body: `What has emerged is a division of labor that would have puzzled an earlier generation of keepers. The digital museum performs the tasks of dissemination; the physical museum preserves the irreplaceable experience of presence. The institutions that flourish will be those that treat the two not as rivals but as successive rooms of the same building—each doing what the other cannot.` }
          ]
        },

        { type: 'table', title: '词汇注释',
          headers: ['词汇/短语', '释义', '备注'],
          rows: [
            ['walk-through', 'n. （虚拟）漫游参观', 'virtual walk-through 线上虚拟展厅'],
            ['outlast', 'v. 比……持续更久', 'out-（超过）+ last（持续）'],
            ['outreach', 'n. 触达（受众的）举措；拓展服务', '[[熟词僻义]] reach 本义「到达」，机构语境指对外服务'],
            ['resolution', 'n. 分辨率', '[[熟词僻义]] 本义「决心；决议」，high-resolution 高清的'],
            ['contemplate', 'v. 注视；沉思', 'scan rather than contemplate 浏览而非凝视'],
            ['artifact', 'n. 文物；人工制品', 'art（技艺）+ fact（做成之物），拼写注意'],
            ['acquire / acquisition', 'v./n. 获得；（文博语境）入藏、购藏', 'acquired during the colonial era 殖民时代获得'],
            ['claimant', 'n. 索偿方；主张者', 'claim v. 索回、主张'],
            ['sovereignty', 'n. 主权', 'the sovereignty it embodies 它所体现的主权'],
            ['successive', 'adj. 相继的；相连的', 'successive rooms of the same building 同一建筑中相衔接的展厅']
          ],
          note: '**结尾比喻**：successive rooms（相连展厅）是全文态度的落点，主旨题与态度题都从这里取答案。'
        },

        { type: 'error', title: '长难句分析',
          summary: '本篇三处难点：三连谓语 + since/because 双层因果 + 分词伴随的嵌套 what 从句。',
          mistakes: [
            { title: '定语从句 + 三个并列谓语 + 比较从句',
              wrong: '花了数十年在售票台后面守护藏品的机构，把数百万高清图像推上了网，提供了虚拟漫游，并发现观众远比他们的建筑大。（比较对象错位）',
              right: '「那些花了几十年把藏品守在售票台后的机构，将数百万张高清图像搬上网、提供虚拟漫游，并收获了远超其场馆容量的观众。」主干：Institutions pushed..., offered..., and found audiences；that had spent decades guarding... 定语从句；far larger than their buildings could ever hold 比较从句修饰 audiences。',
              why: '主干三个并列谓语共享 S=Institutions；比较结构 larger than + 从句，比较的是「观众规模」与「场馆容量」而非观众与建筑本身。' },
            { title: 'since + whose 定语从句 + because 双层因果',
              wrong: '版权使问题进一步复杂，因为许多博物馆控制着其创作者已死去几个世纪的物品的图像，正是因为这些图像是收入的来源。（两层因果未分层）',
              right: '「版权让局面更加复杂：许多博物馆对创作者已去世数世纪的文物图像仍握有控制权，恰恰因为这些图像是收入来源。」主干：Copyright complicates matters；since 引导原因状从，内嵌 whose creators have been dead for centuries 修饰 objects；precisely because 是第二层强调因果。',
              why: '主干 SVO：Copyright（S）complicates（V）matters（O）；since...precisely because... 是嵌套的因果链：整体原因是 since，深层动机是 precisely because。' },
            { title: '破折号 + 分词伴随 + what 从句嵌套',
              wrong: '一些博物馆反驳说，数字访问满足观看需求而原件留在原地——这是索赔方拒绝的一个论点，坚持他们寻求的不是图像而是事物本身以及它所体现的主权。（尚可，但 insisting 逻辑主语与省略 that 层次未交代）',
              right: '「一些博物馆反驳称，既然原件不动，数字访问已满足观看需求——但这一论点遭到索偿方拒绝，他们坚持自己所要的不是一幅图像，而是物本身及其所体现的主权。」主干①：Some museums have countered that...（宾从）；破折号后主干②：an argument is rejected by claimants；insisting... 分词状语逻辑主语是 claimants；what they seek 是 insist 的宾从，it embodies 前省略 that。',
              why: 'counter that + while 让步；an argument that claimants reject 同位语结构；三层嵌套：宾从→分词→what 从句。[[口诀]] 长句先找「主动宾」,每个 that/which 划断一层。' }
          ]
        },

        { type: 'quiz', title: 'Passage 5 题目',
          summary: '5 题：主旨 / 细节 / 推理 / 词义 / 态度。',
          questions: [
            { qid: 'en-r-5-q1', stem: `The text is mainly about`,
              options: [`how the pandemic permanently closed museum galleries`, `the benefits, limits, and political consequences of museum digitization`, `why colonial-era artifacts should be returned home`, `the competition among museums for online visitors`],
              answer: 'b',
              explain: `解析:全文结构:Para 1 现象 → Para 2 益处(access) → Para 3 局限(体验/版权) → Para 4 政治后果(归还) → Para 5 定位(分工互补),综合即数字化的益处、局限与政治后果,选 B。A 程度失当,疫情 closures 只是背景,且未永久关闭展厅;C 以偏概全,归还只是第 4 段的局部话题;D 无中生有。` },
            { qid: 'en-r-5-q2', stem: `Many museums keep control over images of very old objects (Paragraph 3) because`,
              options: [`the images are too fragile to distribute`, `copyright law forbids any reproduction`, `licensing such images generates income`, `online visitors prefer low-resolution scans`],
              answer: 'c',
              explain: `解析:Para 3 第 4 句:museums control images...precisely because those images are a source of revenue,控制图像正是因为它们是收入来源,选 C。A 偷换概念,脆弱的是实物而非图像;B 张冠李戴,whose creators have been dead for centuries 说明版权早已过期,博物馆仍控制是出于收入动机而非法律强制;D 无中生有。` },
            { qid: 'en-r-5-q3', stem: `Digitization has strengthened restitution claims (Paragraph 4) because`,
              options: [`digital copies are now indistinguishable from originals`, `claimant countries lack the technology to display images`, `museums have promised to return photographed objects`, `widespread online viewing weakens the argument for physical retention`],
              answer: 'd',
              explain: `解析:Para 4 第 2 句:an object can now be seen everywhere, so why must it remain in London or Paris?,物品随处可看,「必须留在伦敦或巴黎」的论证被削弱,选 D。A 相反,Para 3 明确 a reproduction...is not an encounter,复制品不能替代原作;B 无中生有;C 无中生有,博物馆并未作此承诺。` },
            { qid: 'en-r-5-q4', stem: `The word "successive" (Paragraph 5) implies that digital and physical museums`,
              options: [`compete for the same audience`, `will eventually merge into one institution`, `form connected stages in a single experience`, `serve entirely separate purposes`],
              answer: 'c',
              explain: `解析:Para 5 第 3 句:successive rooms of the same building—each doing what the other cannot,同一建筑中相连展厅、各展所长,successive 取「相衔接、相继承」义,选 C。A 相反,原文说 not as rivals;B 程度失当,是分工而非合并;D 相反,同属 one building 而非彼此割裂。` },
            { qid: 'en-r-5-q5', stem: `Toward the future of museums, the author's attitude is`,
              options: [`optimistic that the two forms can complement each other`, `pessimistic about the survival of physical galleries`, `critical of institutions that invest in digitization`, `uncertain whether museums will retain their audiences`],
              answer: 'a',
              explain: `解析:Para 5 第 3 句:The institutions that flourish will be those that treat the two not as rivals but as successive rooms,作者认为善用两种形态者将兴盛,态度乐观且指向互补,选 A。B 相反,实体馆 preserves the irreplaceable experience of presence,地位不可替代;C 相反,作者肯定数字化是最廉价的 outreach;D 无中生有。` }
          ]
        },

        { type: 'keypoint', title: '逐题解析',
          points: [
            '第 1 题【主旨题】选 B。定位全文五段结构（现象—益处—局限—政治后果—定位）。A 程度失当；C 以偏概全；D 无中生有。',
            '第 2 题【细节题】选 C。定位 Para 3 第 4 句 precisely because those images are a source of revenue。A 偷换概念；B 张冠李戴；D 无中生有。',
            '第 3 题【推理题】选 D。定位 Para 4 第 2 句 an object can now be seen everywhere, so why must it remain...。A 相反（is not an encounter）；B、C 无中生有。',
            '第 4 题【词义题】选 C。定位 Para 5 第 3 句 successive rooms of the same building + each doing what the other cannot。A 相反（not as rivals）；B 程度失当；D 相反。',
            '第 5 题【态度题】选 A。定位 Para 5 第 3 句 The institutions that flourish...,flourish 一词定调乐观。B 相反；C 相反；D 无中生有。[[口诀]] 态度题盯全文最后一段的将来时判断句,flourish/will be 是信号词。'
          ]
        }
      ]
    }
  ]
});
