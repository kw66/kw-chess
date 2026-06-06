const STORAGE_KEY = 'kw_chess_story_progress_v1';

const SOULS = {
  rook: '车魂',
  horse: '马魂',
  cannon: '炮魂',
  pawn: '兵魂',
  advisor: '仕魂',
  bishop: '相魂',
  king: '王魂',
  combo: '组合技',
};

const SCENES = [
  {
    id: 'prologue-crown',
    act: '序章',
    title: '八冠王',
    tag: '少年成名',
    kind: 'story',
    quote: '那时，没有人相信科王会输。连科王自己也不信。',
    body: [
      '科王第一次夺冠时，还不到十八岁。',
      '那一年，他坐在决赛桌前，脸上还有少年人的瘦削，手却稳得像一块铁。对手是成名已久的老棋王，棋风厚重，残局如山。',
      '可科王没有绕山。他从中腹撕开一道口子，把整盘棋拖进自己的节奏。',
      '第一次封王之后，掌声没有停过。第二冠，第三冠，第五冠，第八冠。八座冠军杯摆在棋院展柜里，灯光落下来，像八枚沉默的棋子。',
      '人们说他是天才。老棋手说，他不像是在下棋，更像是在提前看见棋盘会往哪里塌。',
    ],
    board: {
      title: '八冠陈列',
      subtitle: '人类棋坛的最后高墙',
      pieces: [
        { text: '王', side: 'red', x: 4, y: 8 },
        { text: '车', side: 'red', x: 0, y: 9 },
        { text: '马', side: 'red', x: 1, y: 9 },
        { text: '炮', side: 'red', x: 1, y: 7 },
        { text: '兵', side: 'red', x: 4, y: 6 },
        { text: '冠', side: 'gold', x: 3, y: 2 },
        { text: '冠', side: 'gold', x: 4, y: 2 },
        { text: '冠', side: 'gold', x: 5, y: 2 },
      ],
      marks: [
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
      ],
    },
  },
  {
    id: 'ai-arrives',
    act: '第一幕',
    title: '铁幕降临',
    tag: 'AI 横空出世',
    kind: 'story',
    quote: '它没有少年时背过的残谱，也没有输棋后彻夜难眠的记忆。',
    body: [
      'AI 出现的时候，最开始没有人把它当成真正的棋手。',
      '它没有师门，没有流派，没有少年时背过的残谱，也没有输棋后彻夜难眠的记忆。它只有版本号、算力、训练数据，和一间永不熄灯的机房。',
      '棋院里有人笑它。机器会算，但不懂棋。机器能搜索，却不会骗人。机器可以找最优解，却不懂一枚兵过河之后为什么会让人心里发凉。',
      '直到它开始连胜。',
      '业余高手倒下，职业新锐倒下，冠军也倒下。棋谱被打印出来贴满走廊，研究室里彻夜亮灯，可第二天清晨，AI 的新版本又把人类刚刚总结出的答案推翻。',
    ],
    board: {
      title: '机房亮起',
      subtitle: '版本号代替了姓名',
      pieces: [
        { text: 'AI', side: 'black', x: 4, y: 1 },
        { text: '卒', side: 'black', x: 2, y: 3 },
        { text: '卒', side: 'black', x: 4, y: 3 },
        { text: '卒', side: 'black', x: 6, y: 3 },
        { text: '王', side: 'red', x: 4, y: 9 },
      ],
      beams: [
        { x: 4, y: 1 },
        { x: 4, y: 3 },
        { x: 4, y: 9 },
      ],
    },
  },
  {
    id: 'human-hope',
    act: '第一幕',
    title: '人类最后代表',
    tag: '万众瞩目',
    kind: 'story',
    quote: '如果连科王都不能赢，人类还能派谁上场？',
    body: [
      '人机大战的消息公布后，所有镜头都对准了科王。',
      '有人说这是一场表演赛。有人说这是一场技术发布会。更多人把它说成一场保卫战。',
      '科王坐在发布会中央，听见“人类智慧”四个字一次次落在自己肩上。他知道那不是赞美，是重量。',
      '他没有豪言壮语，只说会尽全力。',
      '那天晚上，他一个人回到棋院，打开棋盒，把每一枚棋子摆回原位。车、马、炮、兵、仕、相、帅。它们安静得像一支旧时代的军队。',
    ],
    board: {
      title: '出征前夜',
      subtitle: '一人背后，是整个旧棋盘',
      pieces: [
        { text: '车', side: 'red', x: 0, y: 9 },
        { text: '马', side: 'red', x: 1, y: 9 },
        { text: '相', side: 'red', x: 2, y: 9 },
        { text: '仕', side: 'red', x: 3, y: 9 },
        { text: '帅', side: 'red', x: 4, y: 9 },
        { text: '仕', side: 'red', x: 5, y: 9 },
        { text: '相', side: 'red', x: 6, y: 9 },
        { text: '马', side: 'red', x: 7, y: 9 },
        { text: '车', side: 'red', x: 8, y: 9 },
      ],
    },
  },
  {
    id: 'match-one',
    act: '第二幕',
    title: '十番棋第一局',
    tag: '人机大战',
    kind: 'match',
    matchTitle: '人机大战 1 / 10',
    objective: '坚持 30 回合、吃子 8 枚、或不败，满足任意一项即可推进剧情。',
    resultText: '这一局你惨败。可你至少看清了一件事：AI 并不是更冷静的棋手，它像一面没有边界的墙。',
    quote: 'AI 的第一步很普通。普通到像一句问候。',
    body: [
      '棋盘另一侧没有人。只有屏幕亮着。',
      'AI 的第一步落下时，没有声音。',
      '那一步很普通。普通到像一句问候。科王低头看棋，那一刻，他还不知道自己将输掉的不是一盘棋。',
      '中盘之后，局面开始失温。科王每一次长考都像在火里捞一枚针，AI 却把所有变招平静地收进胜率曲线。',
      '终局来临时，观众席先安静了几秒，随后响起掌声。掌声很大，像是在替所有人遮住伤口。',
    ],
    board: {
      title: '第一局',
      subtitle: '输也能通关，因为故事从碎裂开始',
      pieces: [
        { text: '帅', side: 'red', x: 4, y: 9 },
        { text: '车', side: 'red', x: 0, y: 8 },
        { text: '马', side: 'red', x: 2, y: 7 },
        { text: 'AI', side: 'black', x: 4, y: 1 },
        { text: '车', side: 'black', x: 4, y: 5 },
        { text: '炮', side: 'black', x: 1, y: 4 },
      ],
      danger: [
        { x: 4, y: 5 },
        { x: 4, y: 6 },
        { x: 4, y: 7 },
        { x: 4, y: 8 },
        { x: 4, y: 9 },
      ],
    },
  },
  {
    id: 'nine-losses',
    act: '第二幕',
    title: '后九局没有奇迹',
    tag: '十番棋',
    kind: 'story',
    quote: '人长考，是犹豫。AI 长考，是它正在把你最后的希望算干净。',
    body: [
      '后九局没有奇迹。',
      '科王试过抢攻。AI 退一步，像退进早已挖好的河道。',
      '他试过缠斗。AI 不急不躁，把每一枚棋子都放到让人难受的位置。',
      '他试过弃子。AI 接受，计算，反击。',
      '他试过不按棋谱走。可那些所谓灵感，很快就在冰冷的胜率曲线里沉下去。',
      '到第七局时，科王开始害怕对方的长考。因为人长考，是犹豫。AI 长考，是它正在把你最后的希望算干净。',
    ],
    board: {
      title: '十番棋战报',
      subtitle: '0 胜 10 败，也可能是 1 胜 9 败，但结局一样疼',
      pieces: [
        { text: '败', side: 'black', x: 0, y: 2 },
        { text: '败', side: 'black', x: 1, y: 2 },
        { text: '败', side: 'black', x: 2, y: 2 },
        { text: '败', side: 'black', x: 3, y: 2 },
        { text: '败', side: 'black', x: 4, y: 2 },
        { text: '败', side: 'black', x: 5, y: 2 },
        { text: '败', side: 'black', x: 6, y: 2 },
        { text: '败', side: 'black', x: 7, y: 2 },
        { text: '败', side: 'black', x: 8, y: 2 },
        { text: '王', side: 'red', x: 4, y: 9 },
      ],
    },
  },
  {
    id: 'broken-heart',
    act: '第三幕',
    title: '道心破碎',
    tag: '旧棋盘关门',
    kind: 'story',
    quote: '过去的输棋，会让他想下一盘。这一次的输棋，让他怀疑棋盘本身。',
    body: [
      '科王最怕的不是输。',
      '他十几岁就开始下番棋，输过决赛，输过半目，输过一整夜睡不着的棋。',
      '可这一次不一样。',
      '过去的输棋，会让他想下一盘。这一次的输棋，让他怀疑棋盘本身。',
      '如果人类称作灵感的东西，只是机器还没来得及命名的误差，那他这十几年，究竟在相信什么？',
      '他把棋盒锁进柜子。很长一段时间，棋院再没有人听见那只盒子打开的声音。',
    ],
    board: {
      title: '棋盒合上',
      subtitle: '不是败给一招，而是败给整套规则',
      pieces: [
        { text: '帅', side: 'red', x: 4, y: 8 },
        { text: '疑', side: 'black', x: 3, y: 4 },
        { text: '败', side: 'black', x: 4, y: 4 },
        { text: '空', side: 'black', x: 5, y: 4 },
      ],
      danger: [
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 },
      ],
    },
  },
  {
    id: 'rook-awakens',
    act: '第四幕',
    title: '车魂初醒',
    tag: '列车冲撞',
    kind: 'match',
    matchTitle: '觉醒试炼 1',
    unlock: 'rook',
    objective: '车觉醒：直线冲撞，撞开挡路棋子，把旧路线变成突破口。后续棋局中需完成全部星级目标才能继续觉醒。',
    resultText: '红车震动的那一刻，科王第一次明白：旧路走不通，就不要再走旧路。',
    quote: '像一截沉睡多年的铁轨，忽然等来了火车。',
    body: [
      '雨夜里，科王重新打开棋盒。',
      '他不是为了复仇，也不是为了训练。他只是想确认，自己是否还能听见棋子的声音。',
      '红车落在掌心里。木纹已经被岁月磨得发亮。',
      '老师曾说，车是直线上的王者。横冲直撞，所向披靡。',
      '可那一晚，红车没有向前走。它震了一下。像一截沉睡多年的铁轨，忽然等来了火车。',
    ],
    board: {
      title: '车魂',
      subtitle: '直线冲撞，把堵死的路撞开',
      pieces: [
        { text: '车', side: 'red', x: 1, y: 6, soul: true },
        { text: '兵', side: 'red', x: 3, y: 6 },
        { text: '卒', side: 'black', x: 5, y: 6 },
        { text: '将', side: 'black', x: 7, y: 6 },
      ],
      beams: [
        { x: 1, y: 6 },
        { x: 2, y: 6 },
        { x: 3, y: 6 },
        { x: 4, y: 6 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
      ],
    },
  },
  {
    id: 'horse-awakens',
    act: '第五幕',
    title: '马踏飞燕',
    tag: '第二枚棋魂',
    kind: 'match',
    matchTitle: '觉醒试炼 2',
    unlock: 'horse',
    objective: '马觉醒：不再被蹩马腿束缚，吃子后可以继续连踩。目标是让马连踩多个关键点。',
    resultText: '马的第二步落下时，科王听见观众席倒吸一口气。棋盘第一次不像棋盘，更像战场。',
    quote: '一步之后还有一步，旧规则追不上它。',
    body: [
      '车魂之后，科王开始反复做一个梦。',
      '梦里有一匹马从九宫外跃起，第一蹄踏碎旧谱，第二蹄落在 AI 从未计算过的空白处。',
      '醒来后，他把马放在棋盘中央。它不再等待一条干净的马腿。',
      '它要自己开路。',
    ],
    board: {
      title: '马魂',
      subtitle: '连踩让进攻变成一串闪电',
      pieces: [
        { text: '马', side: 'red', x: 4, y: 6, soul: true },
        { text: '卒', side: 'black', x: 5, y: 4 },
        { text: '炮', side: 'black', x: 7, y: 3 },
        { text: '车', side: 'black', x: 6, y: 1 },
      ],
      marks: [
        { x: 5, y: 4 },
        { x: 7, y: 3 },
        { x: 6, y: 1 },
      ],
    },
  },
  {
    id: 'cannon-awakens',
    act: '第五幕',
    title: '洲际导弹',
    tag: '第三枚棋魂',
    kind: 'match',
    matchTitle: '觉醒试炼 3',
    unlock: 'cannon',
    objective: '炮觉醒：距离被折叠，远线压制不再只等一个炮架。目标是用炮打开跨区域威胁。',
    resultText: '炮声越过半盘棋。AI 的评估线第一次剧烈摇晃。',
    quote: '真正可怕的不是炮在眼前，而是它忽然从很远的地方抵达。',
    body: [
      '科王把第三枚棋子选给了炮。',
      '他曾经以为炮最懂等待：等炮架，等对手失误，等一条线被清出来。',
      '但棋魂醒来之后，炮不再只是等待。',
      '它让距离变短，让威胁变早，让看似安全的后方忽然听见爆炸声。',
    ],
    board: {
      title: '炮魂',
      subtitle: '远线压制，打穿安全感',
      pieces: [
        { text: '炮', side: 'red', x: 1, y: 7, soul: true },
        { text: '兵', side: 'red', x: 3, y: 7 },
        { text: '卒', side: 'black', x: 5, y: 7 },
        { text: '将', side: 'black', x: 7, y: 7 },
      ],
      danger: [
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 },
        { x: 6, y: 7 },
        { x: 7, y: 7 },
      ],
    },
  },
  {
    id: 'pawn-awakens',
    act: '第五幕',
    title: '集束炸弹',
    tag: '第四枚棋魂',
    kind: 'match',
    matchTitle: '觉醒试炼 4',
    unlock: 'pawn',
    objective: '兵觉醒：叠层推进，自爆换空间。目标是用最小的棋子打出最大的一次改势。',
    resultText: '一枚兵炸开之后，棋盘安静了很久。科王忽然想起，最小的棋子也有尊严。',
    quote: '过河不是终点，是一枚小棋子第一次拥有自己的命运。',
    body: [
      '第四次觉醒来得最慢。',
      '科王盯着兵看了很久。它太小了，小到过去所有棋谱都把它写成消耗品。',
      '可正因为它小，它最懂什么叫不能后退。',
      '当兵魂醒来，它没有变成王者。它只是往前一步，然后把自己点燃。',
    ],
    board: {
      title: '兵魂',
      subtitle: '叠层推进，自爆开路',
      pieces: [
        { text: '兵', side: 'red', x: 4, y: 6, soul: true, stack: 2 },
        { text: '卒', side: 'black', x: 4, y: 5 },
        { text: '马', side: 'black', x: 3, y: 5 },
        { text: '炮', side: 'black', x: 5, y: 5 },
      ],
      danger: [
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 5, y: 5 },
        { x: 4, y: 4 },
      ],
    },
  },
  {
    id: 'advisor-awakens',
    act: '第五幕',
    title: 'X 形光波',
    tag: '第五枚棋魂',
    kind: 'match',
    matchTitle: '觉醒试炼 5',
    unlock: 'advisor',
    objective: '仕觉醒：守护不只在九宫内，斜线光波能切开贴身威胁。目标是用仕保护帅并反击。',
    resultText: '仕没有离开守护的位置，却让整个九宫都亮了起来。',
    quote: '守护者不是不能进攻，只是过去没人听见它拔剑。',
    body: [
      '第五枚棋魂醒在九宫里。',
      '科王一直以为仕的命运就是守在王旁边，斜走一步，再斜走一步。',
      '直到那天，AI 把杀招压到宫门口。',
      '仕向斜线落下。棋盘上有一道光从它脚下展开，像守夜人终于拔出了剑。',
    ],
    board: {
      title: '仕魂',
      subtitle: '斜线光波，守中带攻',
      pieces: [
        { text: '仕', side: 'red', x: 4, y: 8, soul: true },
        { text: '帅', side: 'red', x: 4, y: 9 },
        { text: '车', side: 'black', x: 2, y: 6 },
        { text: '炮', side: 'black', x: 6, y: 6 },
      ],
      beams: [
        { x: 3, y: 7 },
        { x: 2, y: 6 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
      ],
    },
  },
  {
    id: 'bishop-awakens',
    act: '第五幕',
    title: '十字地震波',
    tag: '第六枚棋魂',
    kind: 'match',
    matchTitle: '觉醒试炼 6',
    unlock: 'bishop',
    objective: '相觉醒：不能过河是旧时代的命令。目标是用相跨河震荡，改变中线争夺。',
    resultText: '相越过河界时，科王听见旧棋盘深处传来裂开的声音。',
    quote: '不能过河，是旧时代的命令。',
    body: [
      '第六枚棋魂最沉默。',
      '相站在河边，像一位被规矩困住半生的老人。',
      '科王问它：你真的不能过河吗？',
      '棋子没有回答。它只是向前落下，河界在那一刻像纸一样薄。',
      '十字地震波从落点震开，旧规则第一次承认，它也会疼。',
    ],
    board: {
      title: '相魂',
      subtitle: '跨河震荡，改变中线',
      pieces: [
        { text: '相', side: 'red', x: 4, y: 5, soul: true },
        { text: '卒', side: 'black', x: 4, y: 3 },
        { text: '车', side: 'black', x: 2, y: 5 },
        { text: '炮', side: 'black', x: 6, y: 5 },
      ],
      danger: [
        { x: 4, y: 4 },
        { x: 4, y: 3 },
        { x: 3, y: 5 },
        { x: 5, y: 5 },
      ],
    },
  },
  {
    id: 'king-awakens',
    act: '第六幕',
    title: '御驾亲征',
    tag: '王魂',
    kind: 'match',
    matchTitle: '觉醒试炼 7',
    unlock: 'king',
    objective: '帅觉醒：王不再只是被保护者。目标是让帅主动吃子成长，并承担更危险的进攻选择。',
    resultText: '科王终于明白，真正的王不是永远不动，而是在必须向前时亲自落子。',
    quote: '王第一次离开九宫时，整座棋院都像屏住了呼吸。',
    body: [
      '六枚棋魂醒来后，科王以为自己已经听懂了棋盘。',
      '直到帅在九宫里轻轻震了一下。',
      '他迟疑了很久。王是最后的底线，也是所有棋子守护的理由。',
      '可若王永远只站在别人身后，新的棋盘仍然只是旧棋盘的影子。',
      '于是帅向前一步。不是逃，不是躲，是亲征。',
    ],
    board: {
      title: '王魂',
      subtitle: '主动出征，吃子成长',
      pieces: [
        { text: '帅', side: 'red', x: 4, y: 8, soul: true },
        { text: '卒', side: 'black', x: 4, y: 7 },
        { text: '车', side: 'black', x: 4, y: 5 },
        { text: '将', side: 'black', x: 4, y: 1 },
      ],
      marks: [
        { x: 4, y: 7 },
        { x: 4, y: 6 },
      ],
      danger: [
        { x: 4, y: 5 },
      ],
    },
  },
  {
    id: 'combo-train',
    act: '第六幕',
    title: '自爆列车',
    tag: '组合技',
    kind: 'match',
    matchTitle: '觉醒试炼 8',
    unlock: 'combo',
    objective: '组合技觉醒：车的冲撞和兵的自爆连在一起，形成真正的新规则系统。',
    resultText: '这不再是一枚棋子的奇迹，而是一套规则开始拥有自己的呼吸。',
    quote: '当棋魂彼此回应，科王知道自己不只是解锁能力，而是在创造棋。',
    body: [
      '单独的棋魂已经不能满足科王。',
      'AI 仍然强大。它适应车，适应马，适应炮，也在适应每一次新的觉醒。',
      '科王开始把棋魂连在一起。',
      '车推动兵，兵叠层，前线爆开，炮线接上，马从残阵里连踩而出。',
      '那一刻，棋盘不再只是增加了几条特殊规则。它像换了一套骨骼。',
    ],
    board: {
      title: '组合技',
      subtitle: '冲撞、叠层、自爆连成一口气',
      pieces: [
        { text: '车', side: 'red', x: 1, y: 7, soul: true },
        { text: '兵', side: 'red', x: 3, y: 7, soul: true, stack: 2 },
        { text: '卒', side: 'black', x: 5, y: 7 },
        { text: '炮', side: 'red', x: 1, y: 5, soul: true },
        { text: '将', side: 'black', x: 7, y: 7 },
      ],
      beams: [
        { x: 1, y: 7 },
        { x: 2, y: 7 },
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 },
      ],
      danger: [
        { x: 5, y: 7 },
        { x: 6, y: 7 },
      ],
    },
  },
  {
    id: 'return-to-arena',
    act: '第七幕',
    title: '复仇之日',
    tag: '三局两胜',
    kind: 'story',
    quote: '这一次，AI 必须走进科王创造的新棋盘。',
    body: [
      '科王重新站到聚光灯下时，所有人都看见他变了。',
      '他不再像当年那样背负人类智慧的招牌，也不再急着证明机器错了。',
      '他只是把新棋盘摆上桌。',
      '十番棋之后，AI 仍然是旧规则里的王。可现在，规则已经不只属于 AI。',
      '终局改为三局两胜。第一局，科王全部觉醒，AI 仍按普通象棋应战。',
    ],
    board: {
      title: '决战前夜',
      subtitle: '三局两胜，先让玩家爽一次',
      pieces: [
        { text: '车', side: 'red', x: 0, y: 9, soul: true },
        { text: '马', side: 'red', x: 1, y: 9, soul: true },
        { text: '炮', side: 'red', x: 1, y: 7, soul: true },
        { text: '兵', side: 'red', x: 4, y: 6, soul: true },
        { text: '帅', side: 'red', x: 4, y: 9, soul: true },
        { text: 'AI', side: 'black', x: 4, y: 1 },
      ],
    },
  },
  {
    id: 'final-one',
    act: '终幕',
    title: '第一局：全魂压境',
    tag: '你先下一城',
    kind: 'match',
    matchTitle: '终局 1 / 3',
    objective: '你全部觉醒，AI 仍是普通棋子。目标是用完整棋魂体系赢下第一局。',
    resultText: '第一局，你赢了。不是侥幸，不是险胜，是全魂压境后的痛快复仇。',
    quote: '观众席爆发出十番棋之后从未有过的声音。',
    body: [
      '第一局开始后，AI 仍然试图用旧规则理解一切。',
      '它计算车的直线，却没有算到冲撞。',
      '它计算马的落点，却没有算到连踩。',
      '它计算兵的价值，却没有算到一枚小棋子会主动爆开。',
      '科王赢下第一局。那一刻，所有曾经沉默的人都站了起来。',
    ],
    board: {
      title: '1 : 0',
      subtitle: '新棋盘第一次击穿旧王座',
      pieces: [
        { text: '胜', side: 'gold', x: 4, y: 4 },
        { text: '帅', side: 'red', x: 4, y: 8, soul: true },
        { text: '车', side: 'red', x: 5, y: 6, soul: true },
        { text: '将', side: 'black', x: 4, y: 1 },
      ],
      marks: [
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 5, y: 6 },
      ],
    },
  },
  {
    id: 'final-two',
    act: '终幕',
    title: '第二局：被偷走的棋魂',
    tag: 'AI 学会了',
    kind: 'match',
    matchTitle: '终局 2 / 3',
    objective: 'AI 在第一局后偷学棋魂。它没有听见棋魂，但它看见了棋魂的形状。',
    resultText: '第二局，AI 扳平。黑车第一次冲撞时，科王没有震惊，只是慢慢握紧了棋子。',
    quote: '它不会敬畏奇迹。它只会复制一切能赢的东西。',
    body: [
      '第二局开始前，AI 的机房亮了一整夜。',
      '它没有和科王对练，也没有听见棋魂。',
      '可它看见了第一局的全部：每一次冲撞，每一次连踩，每一次自爆，每一次合体。',
      '它不会敬畏奇迹。它只会复制一切能赢的东西。',
      '黑车冲撞的瞬间，全场安静下来。',
      '科王知道，复仇真正开始了。',
    ],
    board: {
      title: '1 : 1',
      subtitle: 'AI 偷走的不是灵魂，是形状',
      pieces: [
        { text: '帅', side: 'red', x: 4, y: 9, soul: true },
        { text: '车', side: 'red', x: 1, y: 7, soul: true },
        { text: 'AI', side: 'black', x: 4, y: 1, soul: true },
        { text: '车', side: 'black', x: 7, y: 4, soul: true },
      ],
      beams: [
        { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
      ],
    },
  },
  {
    id: 'final-three',
    act: '终幕',
    title: '第三局：先听见的人',
    tag: '巅峰对决',
    kind: 'match',
    matchTitle: '终局 3 / 3',
    objective: '双方全部觉醒。AI 掌握形状，科王掌握来处。赢下第三局，完成真正的科王象棋。',
    resultText: '第三局结束时，科王没有举手庆祝。他只是把帅轻轻扶正。新棋盘从这一刻开始属于所有玩家。',
    quote: '它学会了棋魂的形状。可这套棋，终究是科王先听见的。',
    body: [
      '第三局，双方全部觉醒。',
      'AI 的计算没有退步。相反，它比任何时候都更快，更狠，更像一面会移动的铁墙。',
      '可科王不再害怕那面墙。',
      '因为这一次，AI 必须走进他创造的新棋盘。',
      '它学会了棋魂的形状。可棋魂不是形状。棋魂是十番棋后的雨夜，是被旧规则压到尽头之后，仍然想要重新落子的那口气。',
      '最后一手，科王没有选择最像机器的最优解。',
      '他选择了只有人会走的那步棋。',
    ],
    board: {
      title: '2 : 1',
      subtitle: '巅峰对决，科王胜',
      pieces: [
        { text: '帅', side: 'red', x: 4, y: 5, soul: true },
        { text: '车', side: 'red', x: 3, y: 5, soul: true },
        { text: '马', side: 'red', x: 5, y: 4, soul: true },
        { text: 'AI', side: 'black', x: 4, y: 1, soul: true },
        { text: '将', side: 'black', x: 4, y: 2, soul: true },
      ],
      marks: [
        { x: 4, y: 5 },
        { x: 4, y: 4 },
        { x: 4, y: 3 },
        { x: 4, y: 2 },
      ],
    },
  },
  {
    id: 'ending',
    act: '尾声',
    title: '科王象棋',
    tag: '新的落子',
    kind: 'ending',
    quote: '人类未必算得更深，但可以在旧规则走到尽头时，创造新的棋盘。',
    body: [
      '后来，人们不再只把那场决战叫作复仇。',
      '有人说那是人类赢回尊严的一天。有人说那只是 AI 继续进化前的一个短暂停顿。',
      '科王没有争辩。',
      '他知道，机器还会变强。它会学习每一张棋谱，复制每一次灵感，追赶每一条新规则。',
      '可他也知道，人类未必算得更深，却可以在旧规则走到尽头时，创造新的棋盘。',
      '这就是科王象棋。',
      '它属于每一个被计算压到尽头之后，仍然想要重新落子的人。',
    ],
    board: {
      title: '全剧终',
      subtitle: '后续将把每个棋局事件替换为真实对局',
      pieces: [
        { text: '科', side: 'gold', x: 3, y: 4 },
        { text: '王', side: 'gold', x: 4, y: 4 },
        { text: '棋', side: 'gold', x: 5, y: 4 },
        { text: '魂', side: 'red', x: 4, y: 6, soul: true },
      ],
      beams: [
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 },
        { x: 4, y: 7 },
      ],
    },
  },
];

const app = document.querySelector('#app');
const state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const maxScene = Number.isInteger(saved.maxScene) ? saved.maxScene : 0;
    const currentScene = Number.isInteger(saved.currentScene) ? saved.currentScene : maxScene;
    return {
      currentScene: clamp(currentScene, 0, SCENES.length - 1),
      maxScene: clamp(maxScene, 0, SCENES.length - 1),
      unlocked: Array.isArray(saved.unlocked) ? saved.unlocked.filter((key) => SOULS[key]) : [],
      completedMatches: Array.isArray(saved.completedMatches) ? saved.completedMatches : [],
      textSize: saved.textSize === 'large' ? 'large' : 'normal',
    };
  } catch {
    return { currentScene: 0, maxScene: 0, unlocked: [], completedMatches: [], textSize: 'normal' };
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentScene: state.currentScene,
      maxScene: state.maxScene,
      unlocked: state.unlocked,
      completedMatches: state.completedMatches,
      textSize: state.textSize,
    }),
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function completeCurrentScene() {
  const scene = SCENES[state.currentScene];
  if (scene.unlock && !state.unlocked.includes(scene.unlock)) {
    state.unlocked.push(scene.unlock);
  }
  if (scene.kind === 'match' && !state.completedMatches.includes(scene.id)) {
    state.completedMatches.push(scene.id);
  }
  if (state.currentScene < SCENES.length - 1) {
    state.currentScene += 1;
    state.maxScene = Math.max(state.maxScene, state.currentScene);
  } else {
    state.maxScene = SCENES.length - 1;
  }
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goScene(index) {
  state.currentScene = clamp(index, 0, state.maxScene);
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetProgress() {
  if (!window.confirm('确定要重置剧情进度吗？')) return;
  state.currentScene = 0;
  state.maxScene = 0;
  state.unlocked = [];
  state.completedMatches = [];
  saveState();
  render();
}

function toggleTextSize() {
  state.textSize = state.textSize === 'large' ? 'normal' : 'large';
  saveState();
  render();
}

function render() {
  const scene = SCENES[state.currentScene];
  document.documentElement.dataset.textSize = state.textSize;
  app.innerHTML = `
    <main class="shell">
      ${renderHeader(scene)}
      <section class="stage">
        <article class="story-panel">
          ${renderScene(scene)}
        </article>
        <aside class="side-panel">
          ${renderBoard(scene.board)}
          ${renderSoulList()}
        </aside>
      </section>
      ${renderTimeline()}
    </main>
  `;
  bindEvents();
}

function renderHeader(scene) {
  const progress = Math.round(((state.maxScene + 1) / SCENES.length) * 100);
  return `
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${scene.act} · ${scene.tag}</p>
        <h1>科王象棋</h1>
        <p class="hero-line">八冠王败后，棋魂醒来。</p>
      </div>
      <div class="hero-actions" aria-label="剧情操作">
        <button type="button" class="soft-btn" data-action="text-size">${state.textSize === 'large' ? '标准字' : '大字'}</button>
        <button type="button" class="soft-btn" data-action="reset">重置</button>
      </div>
      <div class="progress-card" aria-label="剧情进度">
        <span>剧情进度</span>
        <strong>${state.maxScene + 1}/${SCENES.length}</strong>
        <div class="progress-track"><i style="width: ${progress}%"></i></div>
      </div>
    </header>
  `;
}

function renderScene(scene) {
  const isLockedEnd = state.currentScene === SCENES.length - 1;
  const canBack = state.currentScene > 0;
  const canNext = state.currentScene < SCENES.length - 1;
  const isCompletedMatch = state.completedMatches.includes(scene.id);
  const primaryLabel =
    scene.kind === 'match'
      ? isCompletedMatch
        ? '继续剧情'
        : '完成本局'
      : scene.kind === 'ending'
        ? '回到开头'
        : '继续';

  return `
    <div class="scene-top">
      <div>
        <p class="scene-act">${scene.act}</p>
        <h2>${scene.title}</h2>
      </div>
      <span class="scene-count">${state.currentScene + 1}/${SCENES.length}</span>
    </div>
    <blockquote>${scene.quote}</blockquote>
    <div class="story-text">
      ${scene.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
    </div>
    ${scene.kind === 'match' ? renderMatchCard(scene) : ''}
    <div class="scene-actions">
      <button type="button" class="nav-btn secondary" data-action="prev" ${canBack ? '' : 'disabled'}>上一段</button>
      ${
        scene.kind === 'ending'
          ? '<button type="button" class="nav-btn primary" data-action="restart-read">从头回看</button>'
          : `<button type="button" class="nav-btn primary" data-action="complete">${primaryLabel}</button>`
      }
      <button type="button" class="nav-btn secondary" data-action="next" ${canNext && state.currentScene < state.maxScene ? '' : 'disabled'}>下一段</button>
    </div>
    ${isLockedEnd ? '<p class="end-note">剧情先行版已可完整通关。下一步会把这些棋局事件逐个替换成真实对局。</p>' : ''}
  `;
}

function renderMatchCard(scene) {
  const completed = state.completedMatches.includes(scene.id);
  return `
    <section class="match-card ${completed ? 'is-complete' : ''}">
      <div class="match-heading">
        <span>${scene.matchTitle}</span>
        <strong>${completed ? '已结算' : '棋局事件'}</strong>
      </div>
      <p>${scene.objective}</p>
      <div class="match-result">${completed ? scene.resultText : '本版先展示完整剧情流程。点击“完成本局”后，会按剧情结果结算并继续。'}</div>
    </section>
  `;
}

function renderBoard(board) {
  const cells = [];
  const piecesByCell = new Map((board.pieces || []).map((piece) => [`${piece.x}-${piece.y}`, piece]));
  const marks = new Set((board.marks || []).map((mark) => `${mark.x}-${mark.y}`));
  const danger = new Set((board.danger || []).map((mark) => `${mark.x}-${mark.y}`));
  const beams = new Set((board.beams || []).map((mark) => `${mark.x}-${mark.y}`));

  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 9; x += 1) {
      const key = `${x}-${y}`;
      const piece = piecesByCell.get(key);
      const classes = ['cell'];
      if (marks.has(key)) classes.push('mark');
      if (danger.has(key)) classes.push('danger');
      if (beams.has(key)) classes.push('beam');
      if (y === 4 || y === 5) classes.push('river');
      cells.push(`
        <span class="${classes.join(' ')}">
          ${piece ? renderPiece(piece) : ''}
        </span>
      `);
    }
  }

  return `
    <section class="board-card">
      <div class="board-title">
        <span>${board.title}</span>
        <small>${board.subtitle}</small>
      </div>
      <div class="mini-board" aria-label="${board.title}">
        ${cells.join('')}
      </div>
    </section>
  `;
}

function renderPiece(piece) {
  const stack = piece.stack ? `<i>${piece.stack}</i>` : '';
  return `<b class="piece ${piece.side}${piece.soul ? ' soul' : ''}">${piece.text}${stack}</b>`;
}

function renderSoulList() {
  const allSouls = Object.entries(SOULS);
  return `
    <section class="soul-card">
      <div class="soul-head">
        <span>棋魂</span>
        <strong>${state.unlocked.length}/${allSouls.length}</strong>
      </div>
      <div class="soul-grid">
        ${allSouls
          .map(([key, label]) => {
            const on = state.unlocked.includes(key);
            return `<span class="${on ? 'on' : ''}">${on ? '✓ ' : ''}${label}</span>`;
          })
          .join('')}
      </div>
    </section>
  `;
}

function renderTimeline() {
  return `
    <nav class="timeline" aria-label="剧情回看">
      <div class="timeline-head">
        <span>剧情回看</span>
        <small>已读章节可随时回看</small>
      </div>
      <div class="timeline-list">
        ${SCENES.map((scene, index) => {
          const unlocked = index <= state.maxScene;
          const active = index === state.currentScene;
          return `
            <button
              type="button"
              class="${active ? 'active' : ''}"
              data-scene="${index}"
              ${unlocked ? '' : 'disabled'}
            >
              <span>${scene.act}</span>
              <strong>${scene.title}</strong>
            </button>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

function bindEvents() {
  app.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'complete') completeCurrentScene();
      if (action === 'prev') goScene(state.currentScene - 1);
      if (action === 'next') goScene(state.currentScene + 1);
      if (action === 'reset') resetProgress();
      if (action === 'text-size') toggleTextSize();
      if (action === 'restart-read') {
        state.currentScene = 0;
        saveState();
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
  app.querySelectorAll('[data-scene]').forEach((button) => {
    button.addEventListener('click', () => goScene(Number(button.dataset.scene)));
  });
}

window.render_game_to_text = () =>
  JSON.stringify({
    type: 'narrative',
    title: '科王象棋',
    currentScene: state.currentScene,
    maxScene: state.maxScene,
    sceneId: SCENES[state.currentScene].id,
    sceneTitle: SCENES[state.currentScene].title,
    sceneKind: SCENES[state.currentScene].kind,
    unlockedSouls: state.unlocked,
    completedMatches: state.completedMatches,
    finished: state.maxScene === SCENES.length - 1,
  });

window.advanceTime = () => {};

render();
