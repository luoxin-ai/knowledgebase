/* ================================================================
 * data/english/translation.js —— 翻译专项（考研英语一）
 * ----------------------------------------------------------------
 * ch1 翻译方法论：评分标准 + 长难句拆分 / 词义选择 / 句式处理 + 典型例题 1 题
 * ch2 例句精练 7 题：英文原句四选一选最佳译文（选择题形式）
 * qid 前缀 en-tr-，answer 小写，explain 以「故选 X。」结尾
 * ================================================================ */
KB.register({
  id: 'translation',
  folder: 'english',
  type: 'book',
  title: '翻译专项',
  source: '考研英语一专项训练',
  updated: '2026-08',
  chapters: [
    /* ==================== 第 1 章 翻译方法论 ==================== */
    {
      id: 'ch1', num: 1, title: '翻译方法论与评分标准', titleEn: 'Translation Method',
      summary: '评分标准、长难句拆分与词义选择。',
      blocks: [
        { type: 'concept', title: '题型特点与评分标准',
          exam: { freq: '高频', forms: ['翻译'], score: '15 分（5 句×3 分）' },
          points: [
            '英语一翻译为英译汉，一篇约 400 词的英文文章中划出 5 句，每句 3 分，共 15 分。',
            '评分坚持「准确性优先」：主干信息、关键从句、特殊结构译错即失分。',
            '「通顺性」其次：译文须符合汉语表达习惯，避免英文式硬译（欧化句式）。',
            '采分点常设在线划部分的定语从句、被动结构、比较结构、代词指代等处。'
          ],
          summary: '翻译拿分靠两翼：准确传达原文信息 + 通顺地道的汉语表达。',
          details: [
            { h: '评分细则', body: '每句 3 分按知识点拆点给分，宁可小词译准，不可大结构译错。' },
            { h: '常见失分点', body: '关键词词义选错、从句层级混乱、语序未按汉语调整、代词指代不清、被动结构处理不当。' }
          ]
        },
        { type: 'keypoint', title: '翻译方法论：拆结构、选词义、顺语序',
          exam: { freq: '高频', forms: ['翻译'], score: '15 分' },
          points: [
            '长难句拆分三步：找主谓宾 → 划从句 → 调语序。先译主干，再逐层添加修饰。',
            '词义选择：根据语境与搭配选义，一词多义靠上下文定夺，抽象名词可具体化。',
            '常见句式：被动语态（转主动或「被/受到/得到」）、定语从句（短句前置、长句拆译）、名词性从句（主语从句先译从句，宾语从句顺译）。',
            '增删得当：形式主语 it 可省略不译，原文省略的主语在汉语中应补出。'
          ],
          summary: '翻译总口诀：==拆结构、选词义、顺语序、调成分==。',
          details: [
            { h: '被动句处理', body: 'They were told to leave 可译为「有人让他们离开」；The plan was approved 译为「该计划获得批准」。英文被动常转成中文主动或无主句。' },
            { h: '定语从句处理', body: '短定语前置：people who work hard 译为「努力工作的人」；长定语拆句：把从句单独译成一句，重复或省略先行词。' },
            { h: '名词性从句处理', body: '主语从句 It is...that 结构先译从句再译主句；宾语从句按原文语序顺译；表语从句译成「是……」形式。' },
            { h: '词义选择要点', body: '结合语境选义，如 address 搭配问题译为「解决」、搭配演讲译为「发表演说」；research 在科学语境译为「研究」，在市场语境可指「调查」。' }
          ]
        },
        { type: 'quiz', title: '典型例题 1',
          exam: { freq: '高频', forms: ['翻译'], score: '15 分' },
          summary: '长难句翻译选择：主谓宾 + 同位语从句 + 比较结构。',
          questions: [
            { qid: 'en-tr-1', stem: 'The question of whether scientific research should be driven by commercial interests has become increasingly controversial.\n\n选出最准确的译文。',
              options: ['科学研究是否应由商业利益驱动，这一问题已变得日益有争议。', '应该被商业利益驱动的科学研究的问题变得越来越反对。', '科学研究应该被商业利益驾驶的问题变成越来越争议。', '日益有争议的问题是如何用商业利益来驱使科学研究。'],
              answer: 'a',
              explain: '解析:句子主干是 The question...has become increasingly controversial，whether 引导同位语从句说明 question 的具体内容。A 将 whether 从句译为「是否……」，用「这一问题」还原主语，语序与表达均符合汉语习惯，故选 A。B 把 controversial 误译「反对」，且「变得越来越反对」不通顺；C 把 drive 直译为「驾驶」，属词义选择错误，句式亦欧化；D 主宾颠倒，把「科学研究是否受商业利益驱动」错译为「用商业利益驱使科学研究」，改变了句子重心。' }
          ]
        }
      ]
    },

    /* ==================== 第 2 章 例句精练 ==================== */
    {
      id: 'ch2', num: 2, title: '例句精练 7 题', titleEn: 'Practice',
      summary: '英文原句四选一选最佳译文，训练长难句拆分与词义选择。',
      blocks: [
        { type: 'concept', title: '进阶翻译意识',
          exam: { freq: '高频', forms: ['翻译'], score: '15 分' },
          points: [
            '翻译选择题的破题顺序：先自己动手译一遍，再对照选项找差距。',
            '警惕三种陷阱选项：直译错译（词义或结构生硬）、过度意译（添加或删改原文信息）、偷换主客（颠倒逻辑关系）。',
            '正确项的特征：忠实 + 通顺 + 信息无增减。'
          ],
          summary: '用「信、达」双标比对选项：信（忠实原文），达（通达顺畅）。',
          details: [
            { h: '信', body: '原文有什么就译什么，不增不减不改换主语，尤其警惕把「否定、比较、转折」译反。' },
            { h: '达', body: '符合汉语语序与表达习惯，避免被字句滥用、定语堆积、欧化长句。' }
          ]
        },
        { type: 'quiz', title: '例句精练 7 题',
          exam: { freq: '高频', forms: ['翻译'], score: '15 分' },
          summary: '覆盖形式主语、定语从句、倒装强调、比较结构、非限制性定语从句等高频考点。',
          questions: [
            { qid: 'en-tr-2', stem: 'It is widely acknowledged that education plays a crucial role in economic development.\n\n选出最准确的译文。',
              options: ['教育在经济发展中起着决定性作用，这是人们普遍承认的。', '人们普遍认为，教育在经济发展中起着至关重要的作用。', '教育的作用被广泛地承认在经济发展中被扮演。', '经济发展在教育中起着重要作用，这是众所周知的。'],
              answer: 'b',
              explain: '解析:形式主语结构 It is widely acknowledged that... 应处理为「人们普遍认为」，把被动转为主动并补出泛指主语，故选 B。A 保留英文原句式「……这是人们普遍承认的」，主语过长且欧化，通顺性不足；C 双重被动「被承认……被扮演」完全不通；D 主宾颠倒，把 education 与 economic development 的关系弄反，违背「信」。' },
            { qid: 'en-tr-3', stem: 'The number of young people who choose to work in rural areas has increased sharply over the past decade.\n\n选出最准确的译文。',
              options: ['过去十年里，选择在农村地区工作的年轻人数量急剧增加。', '年轻人的数量在过去十年里增加，他们选择在农村地区工作。', '选择在农村地区工作的年轻人数目在过去十年被急剧增加。', '过去十年里，大量年轻人被迫到农村地区工作。'],
              answer: 'a',
              explain: '解析:主干 The number...has increased sharply，who 引导的定语从句较短，==短定语前置==译为「选择在农村地区工作的年轻人」，时间状语 over the past decade 提前，故选 A。B 把定语从句拆成并列句，破坏了「数量」的主语限定关系，信息层次受损；C 保留被动痕迹「被增加」，increase 为不及物动词，无被动用法；D 凭空添加「被迫」，原文无此含义，属过度意译。' },
            { qid: 'en-tr-4', stem: 'Only when the government works together with the public can environmental problems be effectively solved.\n\n选出最准确的译文。',
              options: ['只有当政府与公众共同努力时，环境问题才能得到有效解决。', '只有政府与公众一起工作，环境问题被有效地解决。', '当政府与公众一起工作时，只有环境问题才能被解决。', '政府只要与公众合作，就能有效解决环境问题。'],
              answer: 'a',
              explain: '解析:Only when 引导的条件句触发主句部分倒装，强调「只有当……时」这一条件；主句被动 be solved 译为「得到解决」更符合汉语，故选 A。B 缺少「只有……才」的强调意味，且「被解决」生硬；C 把 only 错位修饰 environmental problems，变成「只有环境问题」，改变语义；D 用「只要」弱化了 only 的排他性强调，强调力度不足。' },
            { qid: 'en-tr-5', stem: 'What matters most, he argued, is not how much knowledge students memorize but how well they can apply it.\n\n选出最准确的译文。',
              options: ['他认为，最重要的不是学生记住多少知识，而是他们能把知识运用得多好。', '他争论道，最要紧的不是知识被学生记住多少，而是如何被应用。', '什么最重要，他说，不是学生记忆的知识量，而是运用好不好。', '他认为，学生记不记得住知识不重要，重要的是知识是否有用。'],
              answer: 'a',
              explain: '解析:主干是 What matters most is not...but...（不是……而是……），he argued 为插入语，翻译时前置为「他认为」；宾语从句中 it 指代 knowledge，需译出，故选 A。B 把 argued 误译为「争论」，且被动结构滥用、「如何被应用」缺乏主语，通顺性差；C 未调整插入语语序，把 What matters most 直译为「什么最重要」显得突兀，后半句也啰嗦；D 偷换原意，原文对比的是「记住多少」与「运用多好」，并非「知识是否有用」。' },
            { qid: 'en-tr-6', stem: 'The advances in artificial intelligence have made it possible for machines to perform tasks that were once considered uniquely human.\n\n选出最准确的译文。',
              options: ['人工智能的进步使机器完成曾经被认为只有人类才能胜任的任务成为可能。', '人工智能的进展使机器能够完成曾经被认为只有人类才能胜任的任务。', '人工智能在机器上的进展使人类独有的任务可以被独自完成。', '人工智能的进步让机器能够完成那些一度被认为人类专属的任务，这一变化颇具争议。'],
              answer: 'b',
              explain: '解析:make it possible for...to do 结构可译为「使……能够」；that were once considered uniquely human 是定语从句，前置修饰 tasks，被动 considered 译为「被认为」，故选 B。A 保留「使……成为可能」的英文句式，主谓之间插入过长成分，欧化严重；C 把 uniquely human 错解为「人类独有的任务」且「独自完成」词义失当，还漏掉 make it possible 结构；D 前半句尚可，但结尾「这一变化颇具争议」是原文没有的信息，属过度添加。' },
            { qid: 'en-tr-7', stem: 'It is not difficult to understand why the government is reluctant to abandon the policy despite growing criticism.\n\n选出最准确的译文。',
              options: ['政府尽管面对越来越多的批评，仍不愿放弃这项政策，其原因不难理解。', '政府不愿放弃政策尽管批评增长是不难理解的。', '不难理解，为什么政府尽管有越来越多的批评，仍然不情愿地放弃政策。', '尽管批评增多，政府不难放弃这项政策，这是可以理解的。'],
              answer: 'a',
              explain: '解析:形式主语 It is not difficult to understand 后接 why 从句；reluctant to abandon 意为「不愿放弃」，despite growing criticism 译为「尽管面对越来越多的批评」，故选 A。B 保留英文原语序，「尽管批评增长是不难理解的」欧化且产生歧义；C 把 reluctant to abandon 译成「不情愿地放弃」，方向相反——「不愿」与「不情愿地放弃」含义截然不同；D 同样方向错误，把「不愿放弃」译成「不难放弃」。' },
            { qid: 'en-tr-8', stem: 'The experiment, which involved more than two thousand participants, revealed that sleep quality affects memory more than total sleep time.\n\n选出最准确的译文。',
              options: ['这项涉及两千多名参与者的实验表明，睡眠质量对记忆的影响大于总睡眠时间。', '实验被涉及两千多参与者，揭示了睡眠质量比总睡眠时间影响更多记忆。', '涉及超过两千个参与者的实验显示，总睡眠时间比睡眠质量对记忆的影响更大。', '这项有两千多人的实验发现，睡眠质量影响记忆，而睡眠时间不影响记忆。'],
              answer: 'a',
              explain: '解析:非限制性定语从句 which involved... 较短，前置译为「涉及两千多名参与者的实验」；比较结构 sleep quality affects memory more than total sleep time 译作「睡眠质量对记忆的影响大于总睡眠时间」，故选 A。B 把 reveal 误用为被动（此处无被动含义），且「影响更多记忆」语义含混；C 把比较方向颠倒，说反了；D 把 more than 绝对化为「不影响」，夸大原意，违背忠实原则。' }
          ]
        }
      ]
    }
  ]
});
