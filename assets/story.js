const STORAGE_KEY = 'kw_chess_story_progress_v5';
const MANUAL_SAVE_KEY = 'kw_chess_story_manual_save_v1';
const STATS_VISITOR_KEY = 'kw_chess_stats_visitor';
const STATS_LAST_UV_DATE_KEY = 'kw_chess_stats_last_uv_date';
const STATS_COUNTER_RPC_URL = 'https://ypefmpeekfucmarbbdov.supabase.co';
const STATS_COUNTER_RPC_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8';
const STATS_COUNTER_IDS = {
  totalPv: 'kw_chess_pv_total',
  totalUv: 'kw_chess_uv_total',
  dailyPvPrefix: 'kw_chess_pv_day',
  dailyUvPrefix: 'kw_chess_uv_day',
};

const PIECES = [
  {
    key: 'rook',
    name: '车',
    title: '车魂',
    actTitle: '列车冲撞',
    image: './assets/story-art/soul-chariot-war-v2.webp',
    imageAlt: '红色车魂棋子与古代战车虚影',
    role: '直线突破，适合把己方棋子送到更深的位置。',
    choice: '你最相信突破。路被堵死，就撞开。',
    quote: '木纹深处亮起赤金轮影，像沉睡多年的战车终于醒来。',
    core: '把己方棋子当成可以推出去的战车载荷，借直线打开通路。',
    ability: '车的基本走法仍为横向或纵向直线移动，不能越过棋子。新增“冲撞”：若同一直线上先有空点，后面第一枚棋子是己方非车棋子，车可移动到该棋子前一格，并将该棋子沿同方向推出。',
    rules: [
      '移动方式：横向或纵向直线移动，路径上不能越子。',
      '普通目标：空点可落子；敌方棋子可吃；己方车可叠层。',
      '冲撞目标：同一直线上，车与目标友军之间至少有一个空点，且目标必须是己方非车棋子。',
      '冲撞效果：车停在目标友军前一格，目标友军沿同方向继续移动。',
      '结算方式：被推出的棋子遇敌按层数结算，遇己方同类叠层，遇己方不同类停在前一格。',
    ],
    example: '例：车前方隔着空点遇到己方兵时，车停在兵前一格，把兵沿同方向推出去；若兵撞到敌子，就按兵的层数结算。',
    shortHint: '车魂：横竖直线移动；同线隔空遇到己方非车棋子时，可停在其前一格并将其推出。',
    fantasy: '轮声从棋盘底下滚过，横线竖线被赤金魂光烧亮。你第一次感觉到，棋子不是被你移动，而是在替你开路。',
    awakening: '这是反击的第一步。AI 用旧棋盘把你压到墙角，而车魂给你的答案很简单：既然路被堵住，就把路撞出来。',
  },
  {
    key: 'horse',
    name: '马',
    title: '马魂',
    actTitle: '马踏飞燕',
    image: './assets/story-art/soul-horse-cavalry-v1.webp',
    imageAlt: '红色马魂棋子与骑兵虚影',
    role: '借友连跳，适合绕过阻挡寻找远处落点。',
    choice: '你最相信变化。一步之后，还能再踏一步。',
    quote: '马影跃出格线，蹄下的风把旧规则踏成碎光。',
    core: '不再被马腿挡住，还能借己方棋子重新起算，寻找更远落点。',
    ability: '马的基本走法包含两类：传统“日”字位置，以及横向或纵向两格位置。觉醒马不受马腿限制。若候选位置为己方非马棋子，该位置不作为落点，而作为新的起算位置继续生成后续走法。',
    rules: [
      '移动方式：从当前位置可到达 8 个“日”字位置，也可到达上下左右各两格的位置。',
      '马腿限制：本规则不检查马腿，邻格有棋子也不阻挡。',
      '中继位置：候选位置若为己方非马棋子，只作为继续计算的起算位置，不是最终落点。',
      '可选目标：空点可落子；敌方棋子可吃；己方马可叠层。',
      '结算限制：选择敌方棋子作为目标后立即结算，本步不会继续生成后续吃子。',
    ],
    example: '例：马的候选位置上有己方兵时，马不能停在兵上，但可以把兵的位置当成新的起点继续找落点。',
    shortHint: '马魂：可走“日”字位置或直线两格位置；不受马腿限制，己方非马棋子可作为继续计算的中继位置。',
    fantasy: '你听见马嘶从棋盒深处传来。它不再等待一条干净的马腿，而是借着己方棋子的站位继续起跳。',
    awakening: '你曾经最擅长在混乱里找到缝隙。马魂醒来后，阻挡不再只是阻挡，也可能成为下一次起跳的踏点。',
  },
  {
    key: 'cannon',
    name: '炮',
    title: '炮魂',
    actTitle: '洲际导弹',
    image: './assets/story-art/soul-cannon-fire-v6.webp',
    imageAlt: '红色炮魂棋子与古代火炮虚影',
    role: '连续炮架，适合打击炮架后的远处目标。',
    choice: '你最相信远方的杀意。真正的威胁不必站在眼前。',
    quote: '炮魂醒来时，棋盘深处响起一声闷雷。',
    core: '连续棋子都可能成为炮架，炮可以选择越过几枚再出手。',
    ability: '炮的移动方向仍为横向或纵向。无炮架时，可沿空线路移动。遇到连续相邻的棋子时，可以选择其中一段作为炮架；越过炮架后，后方空点可作为落点，后方第一枚敌子可作为吃子目标。',
    rules: [
      '移动方式：横向或纵向移动。',
      '无炮架目标：路径全为空时，可移动到任意空点；直线上第一枚己方炮可作为叠层目标。',
      '炮架选择：遇到连续相邻的棋子时，可选择前 1 枚、前 2 枚或更多枚作为炮架。',
      '炮架后目标：越过炮架后，空点可落子；遇到的第一枚敌方棋子可吃。',
      '结算限制：炮架本身不被吃，也不会随炮移动。',
    ],
    example: '例：炮前方连续有两枚棋子时，可以只越过第一枚，也可以把两枚都当作炮架，落到后方空点或吃后方第一枚敌子。',
    shortHint: '炮魂：横竖移动；可选择连续棋子作为炮架，越过炮架后落空点或吃第一枚敌子。',
    fantasy: '棋盘上的棋子浮出淡淡影子，像一座座临时架起的桥。炮声越过连续炮架，落在 AI 以为安全的位置。',
    awakening: 'AI 擅长守住眼前的最优解。炮魂提醒你，真正的威胁可以藏在更远处，越过它已经算好的第一层防线。',
  },
  {
    key: 'pawn',
    name: '兵',
    title: '兵魂',
    actTitle: '集束炸弹',
    image: './assets/story-art/soul-soldier-spear-shield-v4.webp',
    imageAlt: '红色兵魂棋子与持矛士兵虚影',
    role: '四向推进，自爆连锁，适合用小子换空间。',
    choice: '你最相信不退。最小的棋子，也能炸开局面。',
    quote: '兵魂不是王冠，而是一点不肯熄灭的火。',
    core: '兵可以四向行动、同类合体，必要时用自爆换空间。',
    ability: '兵的移动方向扩展为上下左右一格。同兵叠层后自动合体，最高 5 层。双击兵可选择自爆；自爆范围等于兵的当前总层数，范围内棋子按爆炸规则结算。',
    rules: [
      '移动方式：上下左右移动一格，不能斜走。',
      '目标位置：空点可落子；敌方棋子可吃；己方兵可叠层并自动合体。',
      '合体上限：合体后的兵最高为 5 层。',
      '自爆方式：双击兵并选择“爆”，该兵从棋盘上移除，爆炸半径等于当前总层数。',
      '爆炸结算：非兵每受到一波爆炸减少 1 层；兵被爆炸命中时会继续引爆。',
    ],
    example: '例：3 层兵选择自爆时，会以自身为中心影响 3 格范围；范围内的其他兵被命中后还会继续引爆。',
    shortHint: '兵魂：上下左右一格；己方兵叠层后自动合体，双击可按当前层数范围自爆。',
    fantasy: '那枚兵没有变成王者，只是往前一步。层层火光叠在棋身上，像把所有不能后退的夜晚都点燃。',
    awakening: '你过去赢棋，常靠大局和重子。兵魂醒来时，你第一次清楚地看见，最小的棋子也能用自己的牺牲改写整片战场。',
  },
  {
    key: 'advisor',
    name: '仕',
    title: '仕魂',
    actTitle: 'X 形光波',
    image: './assets/story-art/soul-advisor-guard-v5.webp',
    imageAlt: '红色仕魂棋子与双刀护卫虚影',
    role: '斜线打击，适合处理贴近中路的威胁。',
    choice: '你最相信守护。不是挡在王前，而是切开杀意。',
    quote: '守护不只是挡住黑暗，也可以把黑暗切开。',
    core: '仕走到哪里，四条斜线光波就从哪里展开。',
    ability: '仕的基本走法仍为斜向一格，但不再限制在九宫内，也可以过河。仕以移动或吃子方式落子后，会从落点沿四个斜向产生 X 形光波。',
    rules: [
      '移动方式：斜向移动一格。',
      '活动范围：可以离开九宫，也可以过河。',
      '目标位置：空点可落子；敌方棋子可吃；己方仕可叠层。',
      '触发条件：只有移动到空点或吃子落点后，才产生 X 形光波。',
      '光波结算：光波沿四条斜线扩散，距离和伤害等于本次移动带走的层数；叠层不触发光波。',
    ],
    example: '例：2 层仕斜走一格后，会从落点沿四条斜线打出 2 格距离、2 层伤害的光波；单纯叠层不会触发。',
    shortHint: '仕魂：斜向一格，可离宫过河；移动或吃子落点会沿四条斜线产生 X 形光波。',
    fantasy: '九宫线像被无形的手重新描过。仕向斜线落下，四道魂光从宫门劈出。',
    awakening: '输给 AI 之后，你以为守护只剩退让。仕魂让你明白，防守也可以主动出刀，替最危险的地方切开一条生路。',
  },
  {
    key: 'bishop',
    name: '相',
    title: '相魂',
    actTitle: '十字地震波',
    image: './assets/story-art/soul-bishop-war-elephant-v1.webp',
    imageAlt: '红色相魂棋子与战象虚影',
    role: '越河控线，适合用横竖震荡压住中盘。',
    choice: '你最相信边界会碎。河界不是命令，只是旧棋盘的伤口。',
    quote: '不能过河，只是旧棋盘留下的边界；棋魂醒来时，河也会让路。',
    core: '相不再受河界和象眼限制，落点会震开上下左右四条线。',
    ability: '相的基本走法仍为斜向两格，但不受象眼限制，也可以过河。相以移动或吃子方式落子后，会从落点沿上下左右产生十字地震波。',
    rules: [
      '移动方式：斜向移动两格。',
      '象眼限制：本规则不检查象眼，中间有棋子也不阻挡。',
      '活动范围：可以过河。',
      '触发条件：只有移动到空点或吃子落点后，才产生十字地震波。',
      '地震结算：地震沿上下左右扩散，距离和伤害等于本次移动带走的层数；叠层不触发地震。',
    ],
    example: '例：相越过河界斜走两格后，会从落点向上下左右扩散地震；中间有棋子也不会卡住象眼。',
    shortHint: '相魂：斜向两格，不受象眼限制，可过河；移动或吃子落点会沿上下左右产生十字地震。',
    fantasy: '相站在河边，没有回答你的疑问。它只是向前落下，河界便泛起细密裂纹。',
    awakening: 'AI 把旧规则背得越来越熟。相魂醒来时，棋盘上最古老的边界开始松动：有些限制，本来就不该永远存在。',
  },
  {
    key: 'king',
    name: '帅',
    title: '帅魂',
    actTitle: '御驾亲征',
    image: './assets/story-art/soul-king-royal-chariot-v3.webp',
    imageAlt: '红色帅魂棋子与御驾亲征虚影',
    role: '吃子成长，适合亲自压迫关键目标。',
    choice: '你最相信亲征。王不该永远站在别人身后。',
    quote: '帅魂醒来时，九宫不再是牢笼，而像一顶缓缓展开的冠。',
    core: '帅仍以九宫为根基，但吃子会成长，并能斩掉未觉醒的照面将帅。',
    ability: '帅在九宫内可向八个方向移动一格，但不能主动离开九宫。若被觉醒车推出九宫，之后只能横向或纵向移动一格。帅以吃子方式消灭敌子后增加 1 层；与未觉醒敌方将帅同列且中间无子时，可远距吃掉对方将帅。',
    rules: [
      '宫内移动：在九宫内可向横、竖、斜八个方向移动一格。',
      '离宫限制：帅不能主动走出九宫；若被觉醒车推出九宫，宫外只可横向或纵向移动一格。',
      '目标位置：空点可落子；敌方棋子可吃；帅不能与己方帅叠层。',
      '成长规则：帅消灭敌方棋子后增加 1 层。',
      '照面规则：同列无任何棋子阻隔，且敌方将帅未觉醒时，可远距吃掉敌方将帅。',
    ],
    example: '例：帅吃掉敌子后层数加 1；若和未觉醒敌将帅同列且中间没有棋子，可以直接远距吃掉对方。',
    shortHint: '帅魂：九宫内八向一格，不能主动离宫；吃子后加 1 层，同列无遮挡可远距吃未觉醒敌将帅。',
    fantasy: '宫线像水面一样荡开，所有棋子低低共鸣。你终于明白，底线也可以变成力量。',
    awakening: '七局之后，你已经没有继续躲在变化后面的余地。帅魂醒来时，你知道最后必须由自己站到棋盘中央。',
  },
];

const PIECE_BY_KEY = Object.fromEntries(PIECES.map((piece) => [piece.key, piece]));
const ALL_PIECE_KEYS = PIECES.map((piece) => piece.key);
const TYPE_TO_PIECE_KEY = { R: 'rook', H: 'horse', C: 'cannon', P: 'pawn', A: 'advisor', B: 'bishop', K: 'king' };
const HANDICAP_SOUL_SCORES = {
  rook: 12,
  horse: 15,
  cannon: 14,
  pawn: 10,
  advisor: 9,
  bishop: 9,
  king: 16,
};
const HANDICAP_START_PIECES = [
  { id: 'rook-left', key: 'rook', side: '左', col: 0, row: 9 },
  { id: 'rook-right', key: 'rook', side: '右', col: 8, row: 9 },
  { id: 'horse-left', key: 'horse', side: '左', col: 1, row: 9 },
  { id: 'horse-right', key: 'horse', side: '右', col: 7, row: 9 },
  { id: 'bishop-left', key: 'bishop', side: '左', col: 2, row: 9 },
  { id: 'bishop-right', key: 'bishop', side: '右', col: 6, row: 9 },
  { id: 'advisor-left', key: 'advisor', side: '左', col: 3, row: 9 },
  { id: 'advisor-right', key: 'advisor', side: '右', col: 5, row: 9 },
  { id: 'king-main', key: 'king', side: '', col: 4, row: 9 },
  { id: 'cannon-left', key: 'cannon', side: '左', col: 1, row: 7 },
  { id: 'cannon-right', key: 'cannon', side: '右', col: 7, row: 7 },
  { id: 'pawn-1', key: 'pawn', side: '一路', col: 0, row: 6 },
  { id: 'pawn-2', key: 'pawn', side: '二路', col: 2, row: 6 },
  { id: 'pawn-3', key: 'pawn', side: '中路', col: 4, row: 6 },
  { id: 'pawn-4', key: 'pawn', side: '四路', col: 6, row: 6 },
  { id: 'pawn-5', key: 'pawn', side: '五路', col: 8, row: 6 },
];
const HANDICAP_START_BY_ID = Object.fromEntries(HANDICAP_START_PIECES.map((piece) => [piece.id, piece]));
const SOUL_LIVE_HINTS = {
  rook: PIECES[0].shortHint,
  horse: PIECES[1].shortHint,
  cannon: PIECES[2].shortHint,
  pawn: PIECES[3].shortHint,
  advisor: PIECES[4].shortHint,
  bishop: PIECES[5].shortHint,
  king: PIECES[6].shortHint,
};
const SOUL_RULE_NOTES = {
  rook: '规则提醒：冲撞只推动己方非车棋子，车本身不沿线继续前进。',
  horse: '规则提醒：己方非马棋子只是中继位置；最终目标必须是空点、敌方棋子或己方马。',
  cannon: '规则提醒：炮架只用于越过，不随炮移动，也不会被炮消灭。',
  pawn: '规则提醒：自爆不分敌我；爆炸命中其他兵时会继续引发连锁。',
  advisor: '规则提醒：只有移动或吃子会触发 X 形光波，叠层不会触发。',
  bishop: '规则提醒：只有移动或吃子会触发十字地震，叠层不会触发。',
  king: '规则提醒：帅不能主动离宫；照面远距吃将帅只对未觉醒敌方将帅生效。',
};
const app = document.querySelector('#app');
const state = loadState();
let messageListenerBound = false;

const DEFAULT_MATCH_PROGRESS = {
  playerPct: 50,
  aiPct: 50,
  advantage: '均势',
  hint: '选中棋子查看走法。',
  turnText: '红方回合',
  roundText: '第1回合',
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return normalizeState(saved);
  } catch {
    return normalizeState({});
  }
}

function normalizeState(saved) {
  const selected = Array.isArray(saved.selected)
    ? saved.selected.filter((key, index, arr) => PIECE_BY_KEY[key] && arr.indexOf(key) === index).slice(0, 7)
    : [];
  const completedDays = Array.isArray(saved.completedDays)
    ? saved.completedDays.map((day) => Math.trunc(Number(day))).filter((day) => day >= 1 && day <= 10)
    : [];
  const handicapDisabled = sanitizeHandicapIds(saved.handicapDisabled || saved.handicapDisabledPieces || []);
  return {
    currentScene: Math.max(0, Math.trunc(Number(saved.currentScene) || 0)),
    maxScene: Math.max(0, Math.trunc(Number(saved.maxScene) || 0)),
    selected,
    handicapDisabled,
    pendingChoice: {},
    editingSlot: null,
    completedDays,
    activeMatch: typeof saved.activeMatch === 'string' ? saved.activeMatch : null,
    matchResults: saved.matchResults && typeof saved.matchResults === 'object' ? saved.matchResults : {},
    achievements: saved.achievements && typeof saved.achievements === 'object' ? saved.achievements : {},
    gameInfoTab: ['author', 'settings', 'stats'].includes(saved.gameInfoTab) ? saved.gameInfoTab : 'author',
    gameInfoOpen: false,
    gameInfoScrollY: 0,
    globalStats: { totalPv: 0, todayPv: 0, totalUv: 0, todayUv: 0 },
    globalStatsStatus: '正在读取科王战绩...',
    manualSave: loadManualSave(),
    notice: '',
  };
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentScene: state.currentScene,
      maxScene: state.maxScene,
      selected: state.selected,
      handicapDisabled: state.handicapDisabled,
      completedDays: state.completedDays,
      activeMatch: state.activeMatch,
      matchResults: state.matchResults,
      achievements: state.achievements,
    }),
  );
}

function getScore() {
  const playerWins = state.completedDays.filter((day) => day >= 2 && day <= 9).length;
  const aiWins = state.completedDays.includes(1) ? 1 : 0;
  return { playerWins, aiWins };
}

function createSaveSnapshot(extra = {}) {
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    currentScene: state.currentScene,
    maxScene: state.maxScene,
    selected: [...state.selected],
    handicapDisabled: [...state.handicapDisabled],
    completedDays: [...state.completedDays],
    matchResults: JSON.parse(JSON.stringify(state.matchResults || {})),
    achievements: { ...(state.achievements || {}) },
    ...extra,
  };
}

function applySaveSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return false;
  releaseInfoPanelLock();
  Object.assign(state, normalizeState(snapshot));
  state.manualSave = loadManualSave();
  state.notice = '已读档。';
  saveState();
  render();
  return true;
}

function loadManualSave() {
  try {
    const saved = JSON.parse(localStorage.getItem(MANUAL_SAVE_KEY) || 'null');
    return saved && typeof saved === 'object' ? saved : null;
  } catch {
    return null;
  }
}

function saveManualProgress() {
  const snapshot = createSaveSnapshot({ kind: 'manual' });
  localStorage.setItem(MANUAL_SAVE_KEY, JSON.stringify(snapshot));
  state.manualSave = snapshot;
  state.notice = '已保存当前进度。';
  render();
}

function loadManualProgress() {
  const snapshot = loadManualSave();
  if (!snapshot) {
    state.notice = '还没有手动存档。';
    render();
    return;
  }
  applySaveSnapshot(snapshot);
}

function getAutoClearanceSaveKey() {
  return `${STORAGE_KEY}_clearance`;
}

function loadAutoClearanceSave() {
  try {
    const saved = JSON.parse(localStorage.getItem(getAutoClearanceSaveKey()) || 'null');
    return saved && typeof saved === 'object' ? saved : null;
  } catch {
    return null;
  }
}

function saveAutoClearanceIfNeeded() {
  if (!isDayCompleted(9)) return;
  const existing = loadAutoClearanceSave();
  if (existing?.selected?.join('|') === state.selected.join('|')) return;
  const snapshot = createSaveSnapshot({ kind: 'clearance' });
  localStorage.setItem(getAutoClearanceSaveKey(), JSON.stringify(snapshot));
}

function getSnapshotProgressText(snapshot) {
  const completed = Array.isArray(snapshot?.completedDays) ? snapshot.completedDays : [];
  if (completed.includes(9)) return '已通关';
  if (completed.includes(8)) return '最终决战前';
  const latest = completed.length ? Math.max(...completed) : 0;
  return latest ? `第${latest}局后` : '序章';
}

function getSnapshotSoulText(snapshot) {
  const selected = Array.isArray(snapshot?.selected) ? snapshot.selected : [];
  if (!selected.length) return '觉醒顺序：暂无';
  return `觉醒顺序：${selected.map((key) => PIECE_BY_KEY[key]?.name).filter(Boolean).join('、')}`;
}

function getSnapshotSummary(snapshot) {
  return `${getSnapshotProgressText(snapshot)}。${getSnapshotSoulText(snapshot)}`;
}

function formatSaveTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '未知时间';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

async function initGlobalStats() {
  try {
    if (shouldRecordGlobalStats()) {
      await recordGlobalVisit();
      await refreshGlobalStats();
      state.globalStatsStatus = '科王战绩已更新。';
    } else {
      state.globalStatsStatus = '本地预览只显示本机统计。';
    }
  } catch (error) {
    console.warn('科王战绩初始化失败:', error);
    state.globalStatsStatus = '全站统计暂时不可用，已显示本机统计。';
  }
  if (state.gameInfoOpen && state.gameInfoTab === 'stats') render();
}

function shouldRecordGlobalStats() {
  const hostname = window.location.hostname;
  if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return false;
  return window.location.protocol === 'https:' || window.location.protocol === 'http:';
}

async function recordGlobalVisit() {
  const today = getLocalDateKey();
  await incrementStatsCounter(STATS_COUNTER_IDS.totalPv);
  await incrementStatsCounter(makeDailyCounterId(STATS_COUNTER_IDS.dailyPvPrefix, today));
  const isKnownVisitor = localStorage.getItem(STATS_VISITOR_KEY) === 'true';
  const lastUvDate = localStorage.getItem(STATS_LAST_UV_DATE_KEY);
  if (!isKnownVisitor) {
    await incrementStatsCounter(STATS_COUNTER_IDS.totalUv);
    localStorage.setItem(STATS_VISITOR_KEY, 'true');
  }
  if (lastUvDate !== today) {
    await incrementStatsCounter(makeDailyCounterId(STATS_COUNTER_IDS.dailyUvPrefix, today));
    localStorage.setItem(STATS_LAST_UV_DATE_KEY, today);
  }
}

async function refreshGlobalStats() {
  const today = getLocalDateKey();
  const dailyPv = makeDailyCounterId(STATS_COUNTER_IDS.dailyPvPrefix, today);
  const dailyUv = makeDailyCounterId(STATS_COUNTER_IDS.dailyUvPrefix, today);
  const counters = await fetchStatsCounters([
    STATS_COUNTER_IDS.totalPv,
    STATS_COUNTER_IDS.totalUv,
    dailyPv,
    dailyUv,
  ]);
  state.globalStats = {
    totalPv: clampInt(counters[STATS_COUNTER_IDS.totalPv], 0, 99999999),
    totalUv: clampInt(counters[STATS_COUNTER_IDS.totalUv], 0, 99999999),
    todayPv: clampInt(counters[dailyPv], 0, 99999999),
    todayUv: clampInt(counters[dailyUv], 0, 99999999),
  };
}

async function incrementStatsCounter(counterId) {
  return postStatsRpc('increment_counter', { counter_id: counterId });
}

async function fetchStatsCounters(counterIds) {
  const rows = await postStatsRpc('get_counters', { counter_ids: counterIds });
  const result = Object.create(null);
  for (const id of counterIds) result[id] = 0;
  if (Array.isArray(rows)) {
    for (const row of rows) {
      if (row?.id) result[row.id] = clampInt(row.count, 0, 99999999);
    }
  }
  return result;
}

async function postStatsRpc(endpoint, payload) {
  const response = await fetch(`${STATS_COUNTER_RPC_URL}/rest/v1/rpc/${endpoint}`, {
    method: 'POST',
    headers: {
      apikey: STATS_COUNTER_RPC_ANON_KEY,
      Authorization: `Bearer ${STATS_COUNTER_RPC_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`统计接口 ${endpoint} 返回 ${response.status}`);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function getLocalPlayerStats() {
  return {
    finished: isDayCompleted(9),
    progress: getSnapshotProgressText(createSaveSnapshot()),
    souls: state.selected.map((key) => PIECE_BY_KEY[key]?.name).filter(Boolean).join('、'),
  };
}

function makeDailyCounterId(prefix, dateKey = getLocalDateKey()) {
  return `${prefix}_${dateKey.replaceAll('-', '')}`;
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function clampInt(value, min, max) {
  return Math.min(max, Math.max(min, Math.trunc(Number(value) || 0)));
}

function formatCompactCount(value) {
  const count = clampInt(value, 0, 99999999);
  if (count >= 100000) return `${(count / 10000).toFixed(1)}万`;
  return String(count);
}

function formatStatValue(value) {
  return typeof value === 'string' ? value : formatCompactCount(value);
}

function buildScenes() {
  const scenes = [
    {
      id: 'prologue',
      act: '序章',
      title: '八冠王 · 上',
      kind: 'story',
      scoreHidden: true,
      image: {
        src: './assets/story-art/story-prologue-eight-trophies.webp',
        alt: '棋院展柜里陈列着八座冠军奖杯',
      },
      quote: '那时，没人相信你会输。连你自己也不信。',
      body: [
        '你第一次夺得全国冠军时，还不到十八岁。',
        '从少年赛场到职业棋坛，你一路赢过许多成名棋手。别人复盘你的棋时，常常发现你早在十几回合前就埋好了后手。',
        '老棋手提起你时，总会停顿一下：这孩子不只看眼前的得失，他能从开局开始安排中盘和残局。',
        '后来第二冠、第三冠、第五冠、第八冠接连到来。八座冠军杯摆在棋院展柜里，灯光照在杯沿上。所有人都承认，你已经是现役第一人。',
      ],
    },
    {
      id: 'prologue-future',
      act: '序章',
      title: '八冠王 · 下',
      kind: 'story',
      scoreHidden: true,
      quote: '如果没有 AI，你本可以走到棋界历史的最高处。',
      body: [
        '八冠之后，所有人都在等你继续赢。你太年轻，巅峰却已经露出轮廓。',
        '前人的纪录会被你逐个越过，后来者也很难复制这样的统治。那时的棋坛相信，只要时间往前走，你迟早会成为历史第一人。',
        '谁能料到，AI 的时代即将到来。它会把每个局面拆成冷静的答案，下棋也即将变成一场有标准答案的背诵。',
        '到那时，天赋和经验会被重新衡量，棋坛的秩序也将被改写。你原本清晰的未来，开始变得不再确定。',
      ],
    },
    {
      id: 'ai-era',
      act: '第一幕',
      title: 'AI 崛起',
      kind: 'story',
      scoreHidden: true,
      quote: '它没有师门，没有流派，也没有输棋后睡不着的夜晚。',
      body: [
        'AI 不是新鲜话题。很多年前，棋手们就已经用软件查谱、拆招、复盘。',
        '大家承认它算得快、记得多，也承认它的训练永远不会累。可那时，多数人仍觉得机器只是把变化搜得更深。',
        '中国象棋有数百年的技术积累。人们相信，真正站在山顶的棋手，不只是计算器。',
        '后来，AI 开始击败普通棋迷、业余高手和职业新锐。质疑慢慢变成不安。',
        '它可以赢很多人。可要赢你？那似乎还是另一件事。',
      ],
    },
    {
      id: 'human-hope',
      act: '第一幕',
      title: '人机大战',
      kind: 'story',
      scoreHidden: true,
      quote: '当人类棋手已经很难给你压力时，你也想知道，AI 能把你逼到哪里。',
      body: [
        '你已经很久没有遇到真正陌生的对手。人类棋手的强弱、风格、习惯，你大多能在几十回合里摸清。',
        '可 AI 正在赢下越来越多的人。它究竟只是搜索更深，还是已经摸到人类经验的边界，棋坛需要一个答案。',
        '于是人机大战被正式提出：让最强的人类棋手与最新一代象棋 AI 对弈，看看机器是否真的能越过人类经验的顶点。',
        '赛制是十五局八胜。一天一盘。',
        '发布会上，你说会认真对待。心里却很平静：如果它真能带来挑战，那也许是件好事。',
      ],
    },
    {
      id: 'match-1-before',
      act: '第二幕',
      title: '第一局',
      kind: 'story',
      scoreHidden: true,
      image: {
        src: './assets/story-art/story-public-screen-cheering.webp',
        alt: '白天城市广场的大屏幕直播人类棋手与 AI 机器人进行中国象棋人机大战，观众为人类加油',
      },
      quote: 'AI 的第一步很普通。普通到像一句问候。',
      body: [
        '第一局开赛时，场馆里很安静。镜头对准棋盘，也对准你的手。',
        'AI 的前十几回合没有任何奇招。它不抢攻，不冒险，也不故意制造复杂局面，只是在每一次交换和调子里多占一点便宜。',
        '外行看不出危险，只觉得局面平淡。可你知道，平淡不代表安全。下着下着，你的子力位置已经不如开局时从容。',
        '它没有急着扩大优势，是因为最稳的走法已经足够形成压制。',
      ],
    },
    {
      id: 'match-1',
      act: '第二幕',
      title: '旧棋的终点',
      kind: 'match',
      day: 1,
      scoreHidden: true,
      matchTitle: '第一局：旧棋的终点',
      objective: '这一局没有棋魂，也没有新规则。你可以亲自下完，也可以认输进入转折。',
      resultText: '第一局结束，比分来到 AI 1 : 0。你没有投子，只是看着最后一条路也被算完。',
      quote: '它滴水不漏。你第一次发现，自己连制造混乱的机会都没有。',
      body: [
        '中盘之后，你开始主动变招。弃子、牵制、兑子、转入复杂残局，每一条你熟悉的路都被它提前等住。',
        'AI 占优后没有贪胜。它选择最稳的推进，把你的反击一点点压窄。',
        '你想把局面搅乱，可它不给你搏杀的入口。每次看似还有余地，下一手都会被它压回原处。',
        '赛后发布会上，AI 的合成声很平静：经过第一局，我们已经基本掌握了你的棋风。它把这称作知识蒸馏。',
        '你的长考、试探、弃子和搏杀，都在一夜之间变成它训练自己的材料。',
      ],
    },
  ];

  if (!isDayCompleted(1)) return clampScenes(scenes);

  scenes.push({
    id: 'after-loss',
    act: '第二幕',
    title: '道心崩塌',
    kind: 'story',
    image: {
      src: './assets/story-art/story-rainy-defeat.webp',
      alt: '雨夜房间里暗淡的冠军奖杯和棋盘，象征第一局失败后的道心崩塌',
    },
    quote: '过去的输棋，会让你想下一盘。这一次，你开始怀疑棋盘本身。',
    body: [
      '回到房间时，雨水顺着窗玻璃往下流。你坐在棋盘前很久，手指还停在刚才那条变招的起点，却再也推不出下一步。',
      '八座奖杯就在柜子里。过去它们像未来的证明，此刻却只剩下冷冷的反光，照得你连抬头都觉得刺眼。',
      '你不是愤怒，也不是不服。更像是心里某个一直笃定的地方忽然空了：原来自己最相信的直觉，也会被一台机器安静地拆完。',
      '你第一次害怕，害怕从少年时代一路赢来的东西，只是旧棋盘里最后一点余光。',
      '雨夜里，你把棋盒按在桌上。八座奖杯还在柜里发光，可你脑子里反复回放的，只有 AI 最后几手冷静的推进。',
    ],
  });

  for (let slot = 0; slot < 7; slot += 1) {
    const day = slot + 2;
    if (slot === 0) scenes.push(makeAwakeningPreludeScene(day));
    scenes.push(makeChoiceScene(day, slot));
    const pieceKey = state.selected[slot];
    if (!pieceKey) break;
    scenes.push(makeAwakeningScene(day, slot, pieceKey));
    scenes.push(makeMatchScene(day, slot, pieceKey));
    if (!isDayCompleted(day)) break;
  }

  if (state.selected.length === 7 && isDayCompleted(8)) {
    scenes.push({
      id: 'before-final',
      act: '终幕',
      title: '决战前夜',
      kind: 'story',
      image: {
        src: './assets/story-art/cover-kewang-xiangqi.webp',
        alt: '现代人类棋手与人形人工智能机器人在玄幻宇宙背景下进行科王象棋最终对决',
        className: 'final-night-visual',
      },
      quote: '七魂俱醒之后，你已经不再领先，只是暂时还没有被追上。',
      body: [
        '七枚棋魂全部醒来。车、马、炮、兵、仕、相、帅都已经走出旧规则，棋盘终于变成完整的新战场。',
        '可 AI 也看完了全部答案。它不再只是追赶昨天的你，而是在整夜训练这套新棋。',
        '再给它几轮自博弈，它也许会比你更熟悉每一次冲撞、连跳、光波和自爆。你已经不再领先，只是暂时还没有被追上。',
        '第九局必须结束一切。正面击败 AI，率先拿到第八胜，不给它把新棋学透的时间。',
      ],
    });
    scenes.push({
      id: 'match-9',
      act: '终幕',
      title: '最终决战',
      kind: 'match',
      day: 9,
      matchTitle: '最终决战：全魂对决',
      objective: '双方全部觉醒。你必须正面击败 AI，以 8 胜结束十五番棋。',
      resultText: '最终决战结束，比分定格在 AI 1 : 8 你。AI 还会继续学习，但这一次，胜负已经来不及等它追上。',
      quote: '这一次，AI 必须在你创造的新棋盘里分出胜负。',
      body: [
        'AI 不再是传统棋子。它带着七枚觉醒棋魂坐到你对面。',
        '你也没有新的底牌。剩下的只有理解、选择，以及这些天你亲手唤醒又亲手暴露的棋魂。',
      ],
    });
  }

  if (isDayCompleted(9)) {
    scenes.push({
      id: 'ending',
      act: '尾声',
      title: '人类的奖杯',
      kind: 'story',
      image: {
        src: './assets/story-art/story-final-ai-trophy.webp',
        alt: '明亮展柜里八座冠军奖杯旁新增一座战胜 AI 的奖杯',
      },
      quote: '第九座奖杯被放进展柜时，所有人都知道它和前八座不一样。',
      body: [
        '前八座奖杯属于过去的棋坛。新放进去的这一座，记录的是另一件事：在人类与 AI 的第一次新棋大战里，人类先赢了。',
        '也许很多年后，AI 会把棋魂拆得更细，把每一种变化都背成新的标准答案。也许这真的是人类最后一次在这样的对决里击败 AI。',
        '但这一刻仍然属于人类。展柜的灯没有回答未来，只照着那座新的奖杯，也照着棋盘上还没有被完全解释的光。',
      ],
    });
    scenes.push({
      id: 'handicap-intro',
      act: '终幕之后',
      title: '让魂挑战',
      kind: 'story',
      quote: '战胜 AI 之后，你忽然想知道：如果把力量还给旧棋盘，自己还能让到哪里。',
      body: [
        '全魂对决已经结束。你赢了，但你也知道，AI 会继续训练。单纯赢一盘，并不是你能力的极限。真正能留下来的，是你能让出多少棋魂之后仍然获胜。',
        '这一次双方开局都按七魂全开准备。不同的是，你在第一手之前主动选择若干棋魂不觉醒，让 AI 保持完整全魂。',
        '让出的棋魂越关键，得分越高；车、马、炮、兵、仕、相这类成双棋子还会有额外加成。挑战获胜后，当前让魂分会成为你的最终分数。',
      ],
    });
    scenes.push({
      id: 'handicap-choice',
      act: '终幕之后',
      title: '选择让魂',
      kind: 'handicap-choice',
      quote: '不是删掉棋子，而是让它们回到未觉醒的旧规则里。',
      body: [
        '点击棋魂即可切换是否让出。你仍然先手执红，AI 执黑并保持七魂全开。',
        '可以只让一枚棋魂，也可以尝试全部让出。选择越激进，获胜后的分数越高。',
      ],
    });
    scenes.push({
      id: 'match-handicap',
      act: '最终挑战',
      title: '极限让魂',
      kind: 'match',
      day: 10,
      matchTitle: '极限让魂：最终分数',
      objective: '你先手执红。AI 七魂全开，你按选择让出对应棋魂。获胜后记录让魂分。',
      resultText: '让魂挑战完成。这个分数不是主线胜场，而是你在新棋盘里给自己留下的极限刻度。',
      quote: '真正的极限，不是拥有全部力量时能不能赢，而是让出多少之后仍然能赢。',
      body: [
        'AI 没有退让。它仍然带着七枚觉醒棋魂坐在对面。',
        '你把一部分棋魂按回旧规则里。棋盘变得更窄，也更像一次诚实的自测。',
      ],
    });
    if (isDayCompleted(10)) {
      scenes.push({
        id: 'handicap-ending',
        act: '挑战结算',
        title: '最终分数',
        kind: 'ending',
        quote: '你把胜利从全魂对决里拿出来，又放回更窄的棋盘上称了一遍。',
        body: [
          `当前最佳让魂分：${getBestHandicapScore()}。`,
          `最佳让魂组合：${formatHandicapKeys(state.achievements?.handicapBestSouls || [])}。`,
          '这个分数会保存在本机进度里。以后你可以回到让魂挑战，选择更激进的组合刷新它。',
        ],
      });
    }
  }

  return clampScenes(scenes);
}

function clampScenes(scenes) {
  state.currentScene = clamp(state.currentScene, 0, scenes.length - 1);
  state.maxScene = clamp(Math.max(state.maxScene, state.currentScene), 0, scenes.length - 1);
  return scenes;
}

function makeAwakeningPreludeScene(day) {
  return {
    id: `awakening-prelude-${day}`,
    act: `第${day}天`,
    title: '棋魂觉醒 · 上',
    kind: 'story',
    image: {
      src: './assets/story-art/story-soul-awakening.webp',
      alt: '棋盘上七枚红色棋魂棋子悬浮觉醒，光芒从棋子内部迸发',
    },
    quote: '你十几岁横扫棋坛，却第一次被逼到无路可退。',
    body: [
      '灯灭之后，房间只剩雨声。就在你快要合上棋盒时，有一枚棋子在黑暗里轻轻震了一下。',
      '你曾经看见别人看不见的棋路，习惯在最乱的局面里找到胜机，习惯让对手跟着你的节奏计算。可这一局，AI 像一堵没有情绪的墙，把你的锋芒、直觉和骄傲全都压回棋盘里。',
      '棋盒忽然震了一下。你先以为是窗外的雷，直到河界泛起暗红的光，七枚红子一枚接一枚离开格线。',
      '车、马、炮、兵、仕、相、帅悬在半空，像被你压到极限的心气点燃。旧规则在光里发出细碎的裂响。',
      '你愣在原地，终于明白：棋魂不是凭空出现的奇迹。它们是你的天赋、败局后的不甘，和那一瞬间不肯认输的求胜心，一起从棋盘深处唤醒的力量。',
    ],
  };
}

function makeChoiceScene(day, slot) {
  const selectedKey = state.selected[slot] || null;
  return {
    id: `choice-${day}`,
    act: `第${day}天`,
    title: day === 2 ? '棋魂觉醒 · 下' : '选择棋魂',
    kind: 'choice',
    day,
    slot,
    selectedKey,
    quote: day === 2
      ? '七枚棋魂都在等你。第一枚登场的棋子，会决定反攻从哪里开始。'
      : 'AI 已经学会了昨天的魂。今天，你只能再领先一点。',
    body: [
      day === 2
        ? '你不能一次把所有变化都亮出来。AI 学得太快，今天暴露的能力，明天就会出现在它的棋谱里。'
        : '赛前的机房整夜未熄。AI 复盘了你昨天展露的棋魂，并把它加入今天的模型。',
      day === 2
        ? '所以第一枚棋魂必须慎重。选它，不只是选一种走法，也是选你准备用哪种方式打破旧棋盘。'
        : '你不能一次把所有底牌都亮出来。每天只唤醒一枚，不是保守，而是让自己始终领先一步的唯一办法。',
    ],
  };
}

function makeAwakeningScene(day, slot, pieceKey) {
  const piece = PIECE_BY_KEY[pieceKey];
  return {
    id: `awakening-${day}`,
    act: `第${day}天`,
    title: piece.actTitle,
    kind: 'awakening',
    day,
    slot,
    pieceKey,
    image: {
      src: piece.image,
      alt: piece.imageAlt,
      className: 'soul-awakening-visual',
    },
    quote: piece.quote,
    body: [
      piece.fantasy,
      piece.awakening,
      day === 8
        ? '这是最后一枚新魂。明天不会再有新的底牌，只有你和 AI 对同一套规则的理解。'
        : '今天用出来的奇迹，明天就会变成 AI 的武器。所以这一局必须赢。',
    ],
  };
}

function makeMatchScene(day, slot, pieceKey) {
  const piece = PIECE_BY_KEY[pieceKey];
  const previous = state.selected.slice(0, slot).map((key) => PIECE_BY_KEY[key].name).join('、') || '无';
  const current = state.selected.slice(0, slot + 1).map((key) => PIECE_BY_KEY[key].name).join('、');
  const resultText = day === 8
    ? `第${day}局，你赢了。${piece.name}魂的锋芒已经暴露，七枚棋魂也终于全部醒来。今晚 AI 还会继续蒸馏这套新棋，但明天已经没有新的棋魂可以隐藏。`
    : `第${day}局，你赢了。${piece.name}魂帮你争下了今天的时间差。观众席还在欢呼，AI 的训练日志已经开始刷新；今晚，它会把这枚棋魂蒸馏进自己的棋谱，而下一枚棋子也开始回应你。`;
  return {
    id: `match-${day}`,
    act: `第${day}天`,
    title: `第${day}局`,
    kind: 'match',
    day,
    slot,
    pieceKey,
    matchTitle: `第${day}局：${piece.title}登场`,
    objective: `你方觉醒：${current}。AI 已掌握：${previous}。必须获胜才能进入下一天。`,
    resultText,
    quote: `今天的领先，只有这一盘棋的时间。`,
    body: [
      `你没有把所有棋魂都亮出来，只让${piece.name}魂走到台前。`,
      previous === '无'
        ? 'AI 仍按传统象棋估值。它能计算局面，却还不知道棋魂会从规则本身撕开缺口。'
        : `AI 已经带着${previous}魂回到棋盘。它学得很快，但今天的新魂还不在它的训练集里。`,
    ],
  };
}

function getHandicapPairBonus(pieceKey) {
  if (pieceKey === 'king') return 0;
  return Math.ceil((HANDICAP_SOUL_SCORES[pieceKey] || 0) * 0.25);
}

function getHandicapPiecesByKey(pieceKey) {
  return HANDICAP_START_PIECES.filter((piece) => piece.key === pieceKey);
}

function getHandicapSingleScore(pieceId) {
  const piece = HANDICAP_START_BY_ID[pieceId];
  if (!piece) return 0;
  const count = getHandicapPiecesByKey(piece.key).length || 1;
  return Math.ceil((HANDICAP_SOUL_SCORES[piece.key] || 0) / count);
}

function getHandicapScore(ids = state.handicapDisabled) {
  const clean = sanitizeHandicapIds(ids);
  const base = clean.reduce((sum, id) => sum + getHandicapSingleScore(id), 0);
  const combo = ALL_PIECE_KEYS.reduce((sum, key) => {
    const pieces = getHandicapPiecesByKey(key);
    if (pieces.length <= 1) return sum;
    return pieces.every((piece) => clean.includes(piece.id)) ? sum + getHandicapPairBonus(key) : sum;
  }, 0);
  return base + combo;
}

function getBestHandicapScore() {
  return Math.max(0, Math.trunc(Number(state.achievements?.handicapBestScore) || 0));
}

function sanitizeHandicapIds(ids) {
  if (!Array.isArray(ids)) return [];
  const expanded = ids.flatMap((id) => {
    if (HANDICAP_START_BY_ID[id]) return [id];
    if (PIECE_BY_KEY[id]) return getHandicapPiecesByKey(id).map((piece) => piece.id);
    return [];
  });
  return expanded.filter((id, index, arr) => HANDICAP_START_BY_ID[id] && arr.indexOf(id) === index);
}

function getHandicapDisabledKeys(ids = state.handicapDisabled) {
  const clean = sanitizeHandicapIds(ids);
  return ALL_PIECE_KEYS.filter((key) => getHandicapPiecesByKey(key).some((piece) => clean.includes(piece.id)));
}

function getHandicapEnabledKeys(ids = state.handicapDisabled) {
  const clean = sanitizeHandicapIds(ids);
  return ALL_PIECE_KEYS.filter((key) => getHandicapPiecesByKey(key).some((piece) => !clean.includes(piece.id)));
}

function formatHandicapKeys(ids = state.handicapDisabled) {
  const clean = sanitizeHandicapIds(ids);
  if (!clean.length) return '未让魂';
  return clean.map((id) => formatHandicapPiece(id)).join('、');
}

function formatHandicapPiece(id) {
  const item = HANDICAP_START_BY_ID[id];
  if (!item) return '';
  const piece = PIECE_BY_KEY[item.key];
  return `${item.side}${piece.name}`;
}

function formatSoulKeys(keys, emptyText = '无') {
  const clean = Array.isArray(keys)
    ? keys.filter((key, index, arr) => PIECE_BY_KEY[key] && arr.indexOf(key) === index)
    : [];
  if (!clean.length) return emptyText;
  return clean.map((key) => `${PIECE_BY_KEY[key].name}魂`).join('、');
}

function getScoreAfterDay(day) {
  const aiWins = day >= 1 ? 1 : 0;
  const playerWins = Math.max(0, Math.min(8, day - 1));
  return { aiWins, playerWins };
}

function isDayCompleted(day) {
  return state.completedDays.includes(day);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isCurrentMatchActive(scene) {
  return scene.kind === 'match' && state.activeMatch === scene.id;
}

function isMatchCompleted(scene) {
  return scene.kind === 'match' && isDayCompleted(scene.day);
}

function completeCurrentScene() {
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  if (!scene) return;
  if (scene.kind === 'match' && !isMatchCompleted(scene)) {
    startMatch(scene);
    return;
  }
  if (scene.kind === 'choice') {
    const editing = isChoiceEditing(scene.slot);
    const pendingKey = state.pendingChoice?.[scene.slot] || null;
    if (!editing) {
      delete state.pendingChoice?.[scene.slot];
      moveToScene(state.currentScene + 1);
      return;
    }
    if (pendingKey) {
      confirmSoulChoice(scene.slot);
      return;
    }
    return;
  }
  if (scene.kind === 'handicap-choice') {
    state.handicapDisabled = sanitizeHandicapIds(state.handicapDisabled);
    saveState();
    moveToScene(state.currentScene + 1);
    return;
  }
  moveToScene(state.currentScene + 1);
}

function moveToScene(index) {
  const scenes = buildScenes();
  state.currentScene = clamp(index, 0, scenes.length - 1);
  state.maxScene = Math.max(state.maxScene, state.currentScene);
  state.activeMatch = null;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goScene(index) {
  if (state.activeMatch) postGameCommand('abort-ai');
  const scenes = buildScenes();
  const currentScene = scenes[state.currentScene];
  const nextIndex = clamp(index, 0, Math.min(state.maxScene, scenes.length - 1));
  const nextScene = scenes[nextIndex];
  if (currentScene?.kind === 'choice' && (!nextScene || nextScene.slot !== currentScene.slot)) {
    delete state.pendingChoice?.[currentScene.slot];
  }
  if (!nextScene || nextScene.kind !== 'choice' || nextScene.slot !== state.editingSlot) {
    state.editingSlot = null;
  }
  state.currentScene = nextIndex;
  state.activeMatch = null;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startMatch(scene) {
  state.activeMatch = scene.id;
  saveState();
  render();
  resetMatchPanel();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeMatch() {
  state.activeMatch = null;
  postGameCommand('abort-ai');
  saveState();
  render();
}

function render() {
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  const activeMatch = isCurrentMatchActive(scene);
  app.innerHTML = `
    <main class="shell${activeMatch ? ' is-playing' : ''}">
      ${renderGameInfoPanel()}
      ${renderMobileStoryTrack(scenes)}
      <article class="story-panel kind-${scene.kind}${activeMatch ? ' is-playing' : ''}">
        <div class="story-content">
          ${activeMatch ? renderEmbeddedMatch(scene) : renderStoryScene(scene)}
        </div>
      </article>
      ${activeMatch ? '' : renderSceneActions(scene, scenes)}
    </main>
  `;
  bindEvents();
  const alignTrack = () => scrollCurrentTrackItem();
  alignTrack();
  requestAnimationFrame(() => {
    alignTrack();
    updateTickerMotion();
    requestAnimationFrame(alignTrack);
    setTimeout(alignTrack, 80);
  });
}

function renderSceneActions(scene, scenes) {
  const isEnding = scene.kind === 'ending';
  const previewKey = scene.kind === 'choice' ? getChoicePreviewKey(scene.slot) : null;
  const primaryDisabled = !isEnding
    && scene.kind === 'choice'
    && isChoiceEditing(scene.slot)
    && (!previewKey || !canUseSoulAtSlot(scene.slot, previewKey));
  return `
    <div class="scene-actions">
      <button type="button" class="nav-btn secondary" data-action="prev" ${state.currentScene > 0 ? '' : 'disabled'}>上一段</button>
      <button type="button" class="nav-btn primary" data-action="complete" ${isEnding || primaryDisabled ? 'disabled' : ''}>${getPrimaryActionLabel(scene)}</button>
    </div>
  `;
}

function renderMobileStoryTrack(scenes) {
  const scene = scenes[state.currentScene];
  return `
    <section class="mobile-story-track" aria-label="剧情进度">
      <div class="mobile-track-title">
        <button type="button" class="story-info-button" data-action="toggle-info" aria-label="信息与设置" aria-expanded="${state.gameInfoOpen ? 'true' : 'false'}">设置</button>
        <h2><span>${scene.act}</span>${scene.title}</h2>
        <p class="mobile-count">${state.currentScene + 1} / ${scenes.length}</p>
      </div>
      <div class="track-scroll" role="list">
        ${scenes.map((item, index) => renderTrackItem(item, index)).join('')}
      </div>
    </section>
  `;
}

function renderTrackItem(scene, index) {
  const unlocked = index <= state.maxScene;
  const current = index === state.currentScene;
  return `
    <button
      type="button"
      class="track-item${current ? ' current' : ''}${unlocked ? '' : ' locked'}"
      data-action="track"
      data-index="${index}"
      ${unlocked ? '' : 'disabled'}
      role="listitem"
      aria-current="${current ? 'step' : 'false'}"
    >
      <span class="track-dot"></span>
      <span class="track-label">${unlocked ? scene.title : '???'}</span>
    </button>
  `;
}

function renderGameInfoPanel() {
  if (!state.gameInfoOpen) return '';
  const tabs = [
    ['author', '作者'],
    ['settings', '设置'],
    ['stats', '统计'],
  ];
  return `
    <section class="game-info-panel" aria-label="信息与设置" aria-modal="true" role="dialog" data-action="info-backdrop">
      <div class="game-info-dialog">
        <div class="game-info-head">
          <strong>信息与设置</strong>
          <button type="button" class="nav-btn secondary compact" data-action="close-info">收起</button>
        </div>
        <div class="game-info-tabs" role="tablist" aria-label="信息与设置分类">
          ${tabs.map(([key, label]) => `
            <button
              type="button"
              class="game-info-tab${state.gameInfoTab === key ? ' active' : ''}"
              data-action="info-tab"
              data-tab="${key}"
              role="tab"
              aria-selected="${state.gameInfoTab === key ? 'true' : 'false'}"
            >${label}</button>
          `).join('')}
        </div>
        <div class="game-info-content">
          ${state.gameInfoTab === 'author' ? renderInfoAuthorPage() : ''}
          ${state.gameInfoTab === 'settings' ? renderInfoSettingsPage() : ''}
          ${state.gameInfoTab === 'stats' ? renderInfoStatsPage() : ''}
        </div>
      </div>
    </section>
  `;
}

function renderInfoAuthorPage() {
  return `
    <div class="game-info-page author-page">
      <article class="game-info-card author-card">
        <p class="author-inline"><strong>作者</strong><a href="https://kw66.github.io/games/" target="_blank" rel="noreferrer">落星峦</a></p>
        <p class="author-inline"><a href="https://kw66.github.io/games/" target="_blank" rel="noreferrer">作者游戏合集</a></p>
      </article>
      <article class="game-info-card project-card">
        <p><a href="https://github.com/kw66/kw-chess" target="_blank" rel="noreferrer"><span>项目地址</span></a><em>（求个 star）</em></p>
        <p><span>小红书交流帖</span><em>暂未开放链接</em></p>
      </article>
    </div>
  `;
}

function renderInfoSettingsPage() {
  const current = createSaveSnapshot();
  const manual = state.manualSave;
  const auto = loadAutoClearanceSave();
  return `
    <div class="game-info-page settings-page">
      <article class="game-info-card save-card">
        <div class="save-card-head">
          <h2>当前进度</h2>
          <span>${escapeHtml(getSnapshotProgressText(current))}</span>
        </div>
        <p>${escapeHtml(getSnapshotSoulText(current))}</p>
        ${state.notice ? `<p class="game-info-notice">${escapeHtml(state.notice)}</p>` : ''}
        <div class="save-actions">
          <button type="button" class="nav-btn secondary compact" data-action="manual-save">存档</button>
          <button type="button" class="nav-btn secondary compact" data-action="manual-load" ${manual ? '' : 'disabled'}>读档</button>
          <button type="button" class="nav-btn secondary compact danger" data-action="restart">重开</button>
        </div>
      </article>
      <article class="game-info-card save-card">
        <div class="save-card-head">
          <h2>手动存档</h2>
          <span>${manual ? escapeHtml(formatSaveTime(manual.savedAt)) : '暂无'}</span>
        </div>
        <p>${manual ? escapeHtml(getSnapshotSummary(manual)) : '点击“存档”保存当前进度和觉醒顺序。'}</p>
      </article>
      <article class="game-info-card save-card">
        <div class="save-card-head">
          <h2>通关存档</h2>
          <span>${auto ? escapeHtml(formatSaveTime(auto.savedAt)) : '暂无'}</span>
        </div>
        <p>${auto ? escapeHtml(getSnapshotSummary(auto)) : '通关后会自动保存最终觉醒顺序。'}</p>
      </article>
    </div>
  `;
}

function renderInfoStatsPage() {
  const local = getLocalPlayerStats();
  const stats = state.globalStats || {};
  const groups = [
    {
      title: '全部玩家',
      items: [
        ['访问', stats.totalPv || 0, stats.todayPv || 0],
        ['访客', stats.totalUv || 0, stats.todayUv || 0],
      ],
    },
    {
      title: '我的战绩',
      items: [
        ['通关', local.finished ? '已通关' : '未通关', ''],
        ['进度', local.progress, ''],
        ['觉醒', local.souls || '暂无', ''],
      ],
    },
  ];
  return `
    <div class="game-info-page stats-page">
      <article class="game-info-card stats-card">
        <h2>科王战绩</h2>
        <div class="stats-panel">
          ${groups.map((group) => `
            <section class="stat-group" aria-label="${escapeAttr(group.title)}统计">
              <h3>${escapeHtml(group.title)}</h3>
              <div class="stat-grid">
                ${group.items.map(([label, total, today]) => `
                  <div class="stat-card${label === '觉醒' ? ' wide' : ''}">
                    <span>${escapeHtml(label)}</span>
                    <strong>${escapeHtml(formatStatValue(total))}</strong>
                    ${today === '' ? '' : `<em>今日 ${escapeHtml(formatCompactCount(today))}</em>`}
                  </div>
                `).join('')}
              </div>
            </section>
          `).join('')}
        </div>
        <p class="stats-note">${escapeHtml(state.globalStatsStatus || '')}</p>
      </article>
    </div>
  `;
}

function renderStoryScene(scene) {
  return `
    <div class="desktop-heading">
      <div class="scene-heading">
        <p class="scene-act">${scene.act}</p>
        <h1>${scene.title}</h1>
      </div>
      <blockquote>${scene.quote}</blockquote>
    </div>
    <div class="story-ticker" aria-label="剧情短句">
      <span>${scene.quote}</span>
    </div>
    ${shouldShowScoreStrip(scene) ? renderScoreStrip() : ''}
    ${renderSceneImage(scene)}
    ${scene.kind === 'choice' ? renderChoiceContext(scene) : (scene.kind === 'match' || scene.kind === 'handicap-choice') ? '' : `
      <div class="story-text">
        ${scene.body.map((paragraph, index) => `<p>${decorateParagraph(paragraph, index)}</p>`).join('')}
      </div>
    `}
    ${scene.kind === 'choice' ? renderChoice(scene) : ''}
    ${scene.kind === 'handicap-choice' ? renderHandicapChoice(scene) : ''}
    ${scene.kind === 'awakening' ? renderAbility(scene) : ''}
    ${scene.kind === 'match' ? renderMatchBrief(scene) : ''}
    ${scene.kind === 'match' ? renderMatchText(scene) : ''}
  `;
}

function renderSceneImage(scene) {
  if (!scene.image) return '';
  return `
    <figure class="story-visual ${scene.image.className || ''}">
      <img src="${escapeAttr(scene.image.src)}" alt="${escapeAttr(scene.image.alt || '')}" loading="eager" decoding="async">
    </figure>
  `;
}

function renderChoiceContext(scene) {
  return `
    <div class="choice-context">
      <p>${scene.body[0]}</p>
      <p>${scene.body[1]}</p>
    </div>
  `;
}

function shouldShowScoreStrip(scene) {
  if (scene.scoreHidden) return false;
  if (scene.kind === 'match') return true;
  return scene.id === 'before-final' || scene.id === 'ending';
}

function renderScoreStrip() {
  const score = getScore();
  return `
    <div class="story-score">
      <span>十五局八胜</span>
      <strong>AI ${score.aiWins} : ${score.playerWins} 你</strong>
      <span>成就 ${Object.keys(state.achievements).length}</span>
    </div>
  `;
}

function renderChoice(scene) {
  const selectedKey = getChoicePreviewKey(scene.slot);
  const selectedPiece = selectedKey ? PIECE_BY_KEY[selectedKey] : null;
  const confirmed = state.selected[scene.slot] === selectedKey;
  const editing = isChoiceEditing(scene.slot);
  const usable = !selectedKey || canUseSoulAtSlot(scene.slot, selectedKey);
  const heading = selectedPiece
    ? `${confirmed ? '已选择' : (editing ? '改选' : '预览')}：${selectedPiece.name}魂`
    : '今天只亮一枚棋魂';
  const hint = selectedPiece
    ? (confirmed
      ? '下一段进入觉醒'
      : (editing
        ? (usable ? '下一段会更新这一天之后的路线' : '这枚棋魂已经在前面觉醒，不能重复选择')
        : '这里只是查看，下一段仍按当前路线继续'))
    : 'AI 明天会学会你今天展示的能力';
  return `
    <section class="choice-panel" aria-label="选择觉醒棋魂">
      <div class="choice-head">
        <strong>${heading}</strong>
        <span>${hint}</span>
      </div>
      <div class="soul-picker" aria-label="棋魂候选">
        ${PIECES.map((piece) => renderSoulButton(scene, piece, selectedKey)).join('')}
      </div>
      ${renderSoulSelectionNote(scene, selectedPiece)}
      ${selectedPiece ? renderChoiceRules(selectedPiece) : ''}
    </section>
  `;
}

function renderHandicapChoice(scene) {
  const disabled = sanitizeHandicapIds(state.handicapDisabled);
  const score = getHandicapScore(disabled);
  const bestScore = getBestHandicapScore();
  return `
    <section class="choice-panel handicap-panel" aria-label="选择让魂棋子">
      <div class="choice-head">
        <strong>当前让魂分 ${score}</strong>
        <span>历史最佳 ${bestScore}</span>
      </div>
      <div class="choice-context compact">
        <p>${scene.body[0]}</p>
        <p>${scene.body[1]}</p>
      </div>
      ${renderHandicapBoard(disabled)}
      <div class="handicap-summary">
        <strong>${formatHandicapKeys(disabled)}</strong>
        <p>${renderHandicapScoreFormula(disabled)}</p>
      </div>
    </section>
  `;
}

function renderHandicapBoard(disabled) {
  const cells = [];
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const item = HANDICAP_START_PIECES.find((piece) => piece.row === row && piece.col === col);
      cells.push(renderHandicapBoardCell(row, col, item, item ? disabled.includes(item.id) : false));
    }
  }
  return `
    <div class="handicap-board-wrap" aria-label="开局棋盘让魂选择">
      <div class="handicap-board" role="grid" aria-label="点击红方棋子切换让魂">
        ${cells.join('')}
      </div>
    </div>
  `;
}

function renderHandicapBoardCell(row, col, item, selected) {
  if (!item) return `<span class="handicap-cell" role="gridcell" data-row="${row}" data-col="${col}"></span>`;
  const piece = PIECE_BY_KEY[item.key];
  const single = getHandicapSingleScore(item.id);
  const selectedText = selected ? '已让' : '保留';
  return `
    <button
      type="button"
      class="handicap-cell has-piece${selected ? ' selected' : ''}"
      role="gridcell"
      data-action="toggle-handicap-soul"
      data-piece="${item.id}"
      data-row="${row}"
      data-col="${col}"
      aria-pressed="${selected ? 'true' : 'false'}"
      aria-label="${selectedText}${formatHandicapPiece(item.id)}，${single}分"
    >
      <span class="handicap-piece-glyph">${piece.name}</span>
      <small>${selected ? '让' : single}</small>
    </button>
  `;
}

function renderHandicapScoreFormula(ids) {
  const clean = sanitizeHandicapIds(ids);
  if (!clean.length) return '未让出棋魂，获胜后分数为 0。';
  const baseText = clean.map((id) => `${formatHandicapPiece(id)} ${getHandicapSingleScore(id)}`).join('，');
  const comboText = ALL_PIECE_KEYS.map((key) => {
    const pieces = getHandicapPiecesByKey(key);
    if (pieces.length <= 1 || !pieces.every((piece) => clean.includes(piece.id))) return '';
    return `${PIECE_BY_KEY[key].name}类全让 +${getHandicapPairBonus(key)}`;
  }).filter(Boolean).join('，');
  return comboText ? `${baseText}；${comboText}` : baseText;
}

function renderSoulButton(scene, piece, selectedKey) {
  const usedSlot = state.selected.indexOf(piece.key);
  const usedElsewhere = usedSlot >= 0 && usedSlot !== scene.slot && selectedKey !== piece.key;
  const usedLater = usedSlot > scene.slot;
  const usedEarlier = usedSlot >= 0 && usedSlot < scene.slot;
  const selected = selectedKey === piece.key;
  const confirmed = state.selected[scene.slot] === piece.key;
  const currentRoute = state.selected[scene.slot] === piece.key;
  const disabled = isChoiceEditing(scene.slot) && usedEarlier;
  const status = selected
    ? (confirmed ? '已确认' : '待确认')
    : (currentRoute ? '当前路线' : (usedLater ? '改写后续' : (usedEarlier ? '已在前面' : piece.title)));
  return `
    <button
      type="button"
      class="soul-button${selected ? ' selected' : ''}${usedElsewhere ? ' used' : ''}"
      data-action="choose-soul"
      data-slot="${scene.slot}"
      data-piece="${piece.key}"
      ${disabled ? 'disabled' : ''}
    >
      <span class="choice-piece" data-piece="${piece.name}"><span class="choice-piece-glyph">${piece.name}</span></span>
      <span class="soul-button-text">
        <strong>${piece.actTitle}</strong>
        <small>${status}</small>
      </span>
    </button>
  `;
}

function renderSoulSelectionNote(scene, piece) {
  if (!piece) return renderSoulEmpty(scene);
  const confirmed = state.selected[scene.slot] === piece.key;
  const editing = isChoiceEditing(scene.slot);
  const blocked = editing && !canUseSoulAtSlot(scene.slot, piece.key);
  return `
    <div class="soul-confirm">
      <strong>${piece.name}魂${confirmed ? '已确认' : (blocked ? '不能重复选择' : '待确认')}</strong>
      <p>${blocked
        ? '这枚棋魂已经在前面觉醒。'
        : (confirmed ? '下一页查看棋魂图和觉醒描述。' : '下方可以先查看走法，点击底部按钮确认觉醒。')}</p>
    </div>
  `;
}

function renderSoulEmpty(scene) {
  return `
    <div class="soul-empty">
      <strong>先选一枚棋魂。</strong>
    </div>
  `;
}

function renderChoiceRules(piece) {
  return `
    <div class="choice-rules" aria-label="${piece.name}魂走法">
      <strong>${piece.name}魂走法</strong>
      <p class="choice-rule-core">${piece.core}</p>
      <p>${piece.ability}</p>
      ${renderRuleList(piece)}
      <p class="choice-rule-example">${piece.example}</p>
      <p class="choice-rule-note">${SOUL_RULE_NOTES[piece.key]}</p>
    </div>
  `;
}

function renderAbility(scene) {
  const pieceKey = scene.pieceKey;
  const piece = PIECE_BY_KEY[pieceKey];
  if (!piece) return '';
  return `
    <div class="awakening-actions" aria-label="${piece.name}魂调整">
      <button type="button" class="nav-btn secondary compact" data-action="back-choice" data-day="${scene.day}" data-slot="${scene.slot}">重新选择棋魂</button>
    </div>
  `;
}

function renderRuleList(piece) {
  return `
    <ul class="soul-rule-list">
      ${piece.rules.map((rule) => `<li>${rule}</li>`).join('')}
    </ul>
  `;
}

function decorateParagraph(paragraph, index) {
  const marks = ['♟️', '🔥', '⚔️', '✨'];
  if (index === 0 || index > 3) return paragraph;
  return `<span class="story-mark">${marks[(index - 1) % marks.length]}</span>${paragraph}`;
}

function renderMatchText(scene) {
  const completed = isMatchCompleted(scene);
  const retryText = getRetryText(scene);
  if (!completed && !retryText) return '';
  return `
    <div class="story-text match-text">
      ${completed ? `<p>${scene.resultText}</p>${scene.body.map((paragraph, index) => `<p>${decorateParagraph(paragraph, index + 1)}</p>`).join('')}` : ''}
      ${!completed && retryText ? `<p class="retry-text">${retryText}</p>` : ''}
      ${completed ? '<div class="match-inline-actions"><button type="button" class="nav-btn secondary compact" data-action="replay-match">重下本局</button></div>' : ''}
    </div>
  `;
}

function renderMatchBrief(scene) {
  const brief = getMatchBrief(scene);
  return `
    <section class="match-brief" aria-label="本局提示">
      <div class="match-brief-title">
        <strong>${scene.matchTitle}</strong>
        <span>${brief.badge}</span>
      </div>
      <div class="match-brief-grid">
        ${brief.items.map((item) => `
          <div class="match-brief-item">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
          </div>
        `).join('')}
      </div>
      <p>${brief.tip}</p>
    </section>
  `;
}

function getMatchBrief(scene) {
  if (scene.day === 10) {
    return {
      badge: `让魂分 ${getHandicapScore()}`,
      items: [
        { label: '保留觉醒', value: formatSoulKeys(getHandicapEnabledKeys()) },
        { label: '你方让出', value: formatHandicapKeys() },
        { label: 'AI 状态', value: '七魂全开' },
      ],
      tip: '你先手执红。获胜后，当前让魂分会写入最佳挑战分。',
    };
  }
  if (scene.day === 1) {
    return {
      badge: '旧棋对决',
      items: [
        { label: '你的棋魂', value: '尚未觉醒' },
        { label: 'AI 状态', value: '传统棋力巅峰' },
        { label: '推进方式', value: '下完或认输' },
      ],
      tip: '这一局没有棋魂，也没有新规则。先亲自感受旧棋盘里的差距。',
    };
  }
  if (scene.day === 9) {
    return {
      badge: '全魂决战',
      items: [
        { label: '你方觉醒', value: '车、马、炮、兵、仕、相、帅' },
        { label: 'AI 已掌握', value: '七枚棋魂' },
        { label: '比分', value: 'AI 1 : 7 你' },
      ],
      tip: '这是第八胜的窗口。若今天不能结束十五番棋，AI 后续会用自博弈继续打磨这套新规则。',
    };
  }
  const piece = PIECE_BY_KEY[scene.pieceKey];
  const player = state.selected.slice(0, scene.slot + 1).map((key) => PIECE_BY_KEY[key].name).join('、');
  const ai = state.selected.slice(0, scene.slot).map((key) => PIECE_BY_KEY[key].name).join('、') || '仍是旧棋';
  return {
    badge: '时间差',
    items: [
      { label: '今日新魂', value: `${piece.name}魂` },
      { label: '你方觉醒', value: player },
      { label: 'AI 已掌握', value: ai },
    ],
    tip: `本局重点：用${piece.name}魂打出今天唯一的新信息。${piece.role}`,
  };
}

function getPrimaryActionLabel(scene) {
  if (scene.kind === 'handicap-choice') return '开始让魂挑战';
  if (scene.kind === 'choice') {
    const previewKey = getChoicePreviewKey(scene.slot);
    if (!previewKey) return '选择棋魂';
    if (isChoiceEditing(scene.slot)) return '确认觉醒';
    return '下一段';
  }
  if (scene.kind !== 'match') return '下一段';
  if (isMatchCompleted(scene)) return '下一段';
  return scene.day === 1 ? '观看第一局' : '开始对局';
}

function renderEmbeddedMatch(scene) {
  const firstDay = scene.day === 1;
  const actionClass = firstDay ? ' four' : ' three';
  return `
    <div class="story-game-shell">
      <div class="story-game-board">
        <iframe
          id="story-game-frame"
          class="story-game-frame"
          src="${buildGameSrc(scene)}"
          title="${scene.matchTitle}"
          allow="fullscreen"
        ></iframe>
        <div class="story-game-actions${actionClass}">
          <button type="button" class="nav-btn secondary compact" data-game-command="restart">重开</button>
          <button type="button" class="nav-btn secondary compact" data-game-command="undo">悔棋</button>
          ${firstDay ? '<button type="button" class="nav-btn primary compact" data-game-command="resign">认输</button>' : ''}
          <button type="button" class="nav-btn secondary compact" data-action="exit-match">返回剧情</button>
        </div>
      </div>
      <div class="story-game-side">
        <div class="story-game-meta">
          <span>${scene.matchTitle}</span>
          <strong>${firstDay ? '可认输推进' : '必须获胜'}</strong>
        </div>
        <section class="story-side-card story-winrate" aria-label="你的胜率">
          <div class="story-side-title">
            <span>你的胜率</span>
            <strong id="story-player-pct">${DEFAULT_MATCH_PROGRESS.playerPct}%</strong>
          </div>
          <div class="story-winrate-track" aria-hidden="true">
            <div id="story-player-fill" class="story-player-fill" style="width:${DEFAULT_MATCH_PROGRESS.playerPct}%"></div>
          </div>
        </section>
        <section class="story-side-card story-hint-card" aria-label="走法提示">
          <div class="story-side-title">
            <span>走法提示</span>
            <b id="story-turn-text">${DEFAULT_MATCH_PROGRESS.turnText}</b>
            <small id="story-round-text">${DEFAULT_MATCH_PROGRESS.roundText}</small>
          </div>
          <div class="story-live-hint" id="story-live-hint" data-default-hint="${escapeAttr(getDefaultLiveHint(scene))}">${DEFAULT_MATCH_PROGRESS.hint}</div>
        </section>
      </div>
    </div>
  `;
}

function getDefaultLiveHint(scene) {
  if (scene.day === 1) return '第一局没有棋魂，先感受旧棋盘里的差距。';
  if (scene.day === 10) return `让魂挑战：你已让出${formatHandicapKeys()}，当前让魂分 ${getHandicapScore()}。`;
  if (scene.day === 9) return '双方全魂觉醒。点击带星棋子，查看它此刻能打出的能力。';
  const piece = PIECE_BY_KEY[scene.pieceKey];
  return `今日新魂：${piece.name}。点击带星棋子，查看棋魂能力提示。`;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(value) {
  return escapeAttr(value).replace(/'/g, '&#39;');
}

function buildGameSrc(scene) {
  const params = new URLSearchParams();
  const config = getMatchConfig(scene);
  params.set('levelId', String(config.levelId));
  params.set('ai', '1');
  params.set('aiSide', config.aiSide);
  params.set('aiTime', String(config.aiTime || 4000));
  params.set('aiStrength', config.aiStrength || 'story');
  params.set('mode', config.mode);
  if (config.mode === 'classic') params.set('classic', '1');
  if (config.redUpgrades.length) params.set('pu', config.redUpgrades.join(','));
  if (config.blackUpgrades.length) params.set('au', config.blackUpgrades.join(','));
  if (config.redHandicapDisabled?.length) {
    params.set('phu', config.redHandicapDisabled.map((id) => {
      const item = HANDICAP_START_BY_ID[id];
      return `${item.col}_${item.row}`;
    }).join(','));
  }
  return `./index-legacy.html?${params.toString()}`;
}

function getPlayerSideForDay(day) {
  if (Number(day) === 10) return 'red';
  return Number(day) % 2 === 0 ? 'black' : 'red';
}

function getAiSideForDay(day) {
  return getPlayerSideForDay(day) === 'red' ? 'black' : 'red';
}

function buildSideMatchConfig(day, playerUpgrades, aiUpgrades) {
  const playerSide = getPlayerSideForDay(day);
  const aiSide = getAiSideForDay(day);
  return {
    playerSide,
    aiSide,
    playerUpgrades,
    aiUpgrades,
    redUpgrades: playerSide === 'red' ? playerUpgrades : aiUpgrades,
    blackUpgrades: playerSide === 'black' ? playerUpgrades : aiUpgrades,
  };
}

function getMatchConfig(scene) {
  if (scene.day === 10) {
    const disabled = sanitizeHandicapIds(state.handicapDisabled);
    const playerUpgrades = getHandicapEnabledKeys(disabled);
    return {
      levelId: 110,
      mode: 'mixed',
      aiTime: 5000,
      aiStrength: 'story',
      playerSide: 'red',
      aiSide: 'black',
      playerUpgrades,
      aiUpgrades: ALL_PIECE_KEYS,
      redHandicapDisabled: disabled,
      redUpgrades: playerUpgrades,
      blackUpgrades: ALL_PIECE_KEYS,
    };
  }
  if (scene.day === 1) {
    return {
      levelId: 101,
      mode: 'classic',
      aiTime: 5000,
      aiStrength: 'story',
      ...buildSideMatchConfig(scene.day, [], []),
    };
  }
  if (scene.day === 9) {
    return {
      levelId: 109,
      mode: 'mixed',
      aiTime: 5000,
      aiStrength: 'story',
      ...buildSideMatchConfig(scene.day, ALL_PIECE_KEYS, ALL_PIECE_KEYS),
    };
  }
  const slot = scene.slot || 0;
  const playerUpgrades = state.selected.slice(0, slot + 1);
  const aiUpgrades = state.selected.slice(0, slot);
  return {
    levelId: 100 + scene.day,
    mode: 'mixed',
    aiTime: 5000,
    aiStrength: 'story',
    ...buildSideMatchConfig(scene.day, playerUpgrades, aiUpgrades),
  };
}

function postGameCommand(command, payload = {}) {
  const frame = document.querySelector('#story-game-frame');
  if (!(frame instanceof HTMLIFrameElement) || !frame.contentWindow) return;
  frame.contentWindow.postMessage({ type: 'game-command', command, ...payload }, '*');
}

function completeMatchFromGame(scene, stats) {
  const handicapScore = scene.day === 10 ? getHandicapScore() : null;
  state.matchResults[scene.id] = {
    outcome: stats?.outcome || 'unknown',
    win: !!stats?.win,
    totalMoves: Math.max(0, Math.trunc(Number(stats?.totalMoves) || 0)),
    totalKills: Object.values(stats?.redKillsByType || {}).reduce((sum, value) => sum + Math.max(0, Math.trunc(Number(value) || 0)), 0),
    ...(handicapScore === null ? {} : {
      handicapScore,
      handicapDisabled: sanitizeHandicapIds(state.handicapDisabled),
    }),
  };
  if (!matchGoalReached(scene, stats)) {
    saveState();
    showMatchFinishedPanel(scene, false);
    return;
  }
  if (!state.completedDays.includes(scene.day)) state.completedDays.push(scene.day);
  state.completedDays.sort((a, b) => a - b);
  if (scene.day === 10) {
    const bestScore = getBestHandicapScore();
    if (handicapScore >= bestScore) {
      state.achievements.handicapBestScore = handicapScore;
      state.achievements.handicapBestSouls = sanitizeHandicapIds(state.handicapDisabled);
      state.achievements.handicapBestAt = new Date().toISOString();
    }
  }
  saveAutoClearanceIfNeeded();
  saveState();
  showMatchFinishedPanel(scene, true);
}

function matchGoalReached(scene, stats) {
  if (scene.day === 1) return true;
  return !!stats?.win;
}

function getRetryText(scene) {
  if (isMatchCompleted(scene)) return '';
  const result = state.matchResults[scene.id];
  if (!result) return '';
  if (scene.day === 1) return '';
  return '这一局必须获胜。失败不会推进剧情，请重开或悔棋再试。';
}

function getChoicePreviewKey(slot) {
  if (state.pendingChoice?.[slot]) return state.pendingChoice[slot];
  if (state.editingSlot === slot) return null;
  return state.selected[slot] || null;
}

function isChoiceEditing(slot) {
  return state.editingSlot === slot || !state.selected[slot];
}

function canUseSoulAtSlot(slot, pieceKey) {
  const usedSlot = state.selected.indexOf(pieceKey);
  return usedSlot < 0 || usedSlot >= slot;
}

function toggleHandicapSoul(pieceId) {
  if (!HANDICAP_START_BY_ID[pieceId]) return;
  const current = sanitizeHandicapIds(state.handicapDisabled);
  state.handicapDisabled = current.includes(pieceId)
    ? current.filter((id) => id !== pieceId)
    : [...current, pieceId];
  saveState();
  render();
}

function previewSoulChoice(slot, pieceKey) {
  if (!PIECE_BY_KEY[pieceKey]) return;
  if (isChoiceEditing(slot) && !canUseSoulAtSlot(slot, pieceKey)) return;
  if (state.selected[slot] === pieceKey && state.editingSlot !== slot) {
    if (state.pendingChoice?.[slot]) {
      delete state.pendingChoice[slot];
      render();
    }
    return;
  }
  if (state.pendingChoice?.[slot] === pieceKey) return;
  state.pendingChoice = { ...state.pendingChoice, [slot]: pieceKey };
  render();
}

function confirmSoulChoice(slot) {
  const pieceKey = getChoicePreviewKey(slot);
  if (!PIECE_BY_KEY[pieceKey]) return;
  if (!canUseSoulAtSlot(slot, pieceKey)) return;
  const oldKey = state.selected[slot];
  if (oldKey === pieceKey) {
    state.editingSlot = null;
    delete state.pendingChoice?.[slot];
    moveToScene(state.currentScene + 1);
    return;
  }
  const willRewrite = oldKey || state.selected.length > slot || state.completedDays.some((day) => day >= slot + 2);
  if (willRewrite) {
    const ok = window.confirm('重新选择会清除这一天之后的觉醒路线和对局结果。确定要开启新路线吗？');
    if (!ok) return;
  }
  const day = slot + 2;
  state.selected = state.selected.slice(0, slot);
  state.selected[slot] = pieceKey;
  state.completedDays = state.completedDays.filter((doneDay) => doneDay < day);
  for (const key of Object.keys(state.matchResults)) {
    const matchDay = Number(key.replace('match-', ''));
    if (Number.isFinite(matchDay) && matchDay >= day) delete state.matchResults[key];
  }
  state.activeMatch = null;
  state.editingSlot = null;
  delete state.pendingChoice?.[slot];
  state.maxScene = Math.min(state.maxScene, state.currentScene);
  saveState();
  moveToScene(state.currentScene + 1);
}

function handleGameMessage(event) {
  if (!event.data) return;
  if (event.data.type === 'piece-selected') {
    updateLivePieceHint(event.data);
    return;
  }
  if (event.data.type === 'game-status') {
    updateMatchStatusPanel(event.data);
    return;
  }
  if (event.data.type === 'game-progress') {
    updateMatchProgressPanel(event.data);
    return;
  }
  if (event.data.type !== 'game-end') return;
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  if (!scene || scene.kind !== 'match' || state.activeMatch !== scene.id) return;
  completeMatchFromGame(scene, event.data.stats || {});
}

function resetMatchPanel() {
  requestAnimationFrame(() => {
    setText('#story-player-pct', `${DEFAULT_MATCH_PROGRESS.playerPct}%`);
    setText('#story-turn-text', DEFAULT_MATCH_PROGRESS.turnText);
    setText('#story-round-text', DEFAULT_MATCH_PROGRESS.roundText);
    const fill = document.querySelector('#story-player-fill');
    if (fill) fill.style.width = `${DEFAULT_MATCH_PROGRESS.playerPct}%`;
    const hint = document.querySelector('#story-live-hint');
    if (hint) {
      hint.textContent = DEFAULT_MATCH_PROGRESS.hint;
      hint.classList.remove('active');
    }
  });
}

function updateMatchStatusPanel(data) {
  if (data.turnText) setText('#story-turn-text', data.turnText);
  if (data.roundText) setText('#story-round-text', data.roundText);
}

function updateMatchProgressPanel(data) {
  if (data.redPct === undefined) return;
  const redPct = clamp(Math.round(Number(data.redPct) || 0), 0, 100);
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  const playerPct = scene?.kind === 'match' && getPlayerSideForDay(scene.day) === 'black'
    ? 100 - redPct
    : redPct;
  setText('#story-player-pct', `${playerPct}%`);
  const fill = document.querySelector('#story-player-fill');
  if (fill) fill.style.width = `${playerPct}%`;
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function showMatchFinishedPanel(scene, goalReached) {
  const result = state.matchResults[scene.id];
  const hint = document.querySelector('#story-live-hint');
  if (hint) {
    if (scene.day === 1) {
      hint.textContent = result?.win
        ? '第一局结束。你赢下了旧棋盘上的最后一段路。'
        : '第一局结束。旧棋盘里的路被 AI 一点点算完了。';
    } else if (scene.day === 10) {
      hint.textContent = goalReached
        ? `让魂挑战成功，当前让魂分 ${result?.handicapScore || 0}。`
        : '让魂挑战失败。可以减少让魂，或重开再冲一次。';
    } else {
      hint.textContent = goalReached
        ? '本局获胜。今天的新信息已经留在棋盘上。'
        : '这一局还没有达成目标，可以悔棋或重开再试。';
    }
    hint.classList.add('active');
  }
  const exitButton = document.querySelector('[data-action="exit-match"]');
  if (exitButton) exitButton.textContent = goalReached ? '继续剧情' : '返回剧情';
}

function updateLivePieceHint(data) {
  const el = document.querySelector('#story-live-hint');
  if (!el) return;
  if (!data.pieceType) {
    el.textContent = el.dataset.defaultHint || '点击带星棋子查看棋魂提示。';
    el.classList.remove('active');
    return;
  }
  const pieceKey = TYPE_TO_PIECE_KEY[data.pieceType];
  if (data.upgraded && pieceKey) {
    el.textContent = data.hint || SOUL_LIVE_HINTS[pieceKey] || '选中棋子查看觉醒走法。';
    el.classList.add('active');
    return;
  }
  el.textContent = data.hint || '这枚棋子还没有觉醒，按传统走法行动。';
  el.classList.remove('active');
}

function bindGlobalMessageListener() {
  if (messageListenerBound) return;
  window.addEventListener('message', handleGameMessage);
  messageListenerBound = true;
}

function bindEvents() {
  bindGlobalMessageListener();
  if (!window.__kwStoryInfoEscBound) {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && state.gameInfoOpen) toggleGameInfoPanel(false);
    });
    window.__kwStoryInfoEscBound = true;
  }
  if (!window.__kwStoryDelegatedClickBound) {
    app.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action], [data-game-command]');
      if (!button || !app.contains(button)) return;
      if (button.dataset.gameCommand) {
        postGameCommand(button.dataset.gameCommand);
        return;
      }
      handleStoryAction(button, event);
    });
    window.__kwStoryDelegatedClickBound = true;
  }
}

function handleStoryAction(button, event) {
  const action = button.dataset.action;
  if (action === 'complete') completeCurrentScene();
  if (action === 'replay-match') startMatch(buildScenes()[state.currentScene]);
  if (action === 'prev') goScene(state.currentScene - 1);
  if (action === 'next') goScene(state.currentScene + 1);
  if (action === 'track') goScene(Number(button.dataset.index));
  if (action === 'exit-match') closeMatch();
  if (action === 'choose-soul') previewSoulChoice(Number(button.dataset.slot), button.dataset.piece);
  if (action === 'toggle-handicap-soul') toggleHandicapSoul(button.dataset.piece);
  if (action === 'toggle-info') toggleGameInfoPanel();
  if (action === 'close-info') toggleGameInfoPanel(false);
  if (action === 'info-backdrop' && button === event.target) toggleGameInfoPanel(false);
  if (action === 'info-tab') setGameInfoTab(button.dataset.tab || 'author');
  if (action === 'manual-save') saveManualProgress();
  if (action === 'manual-load') loadManualProgress();
  if (action === 'back-choice') {
    const scenes = buildScenes();
    const target = scenes.findIndex((scene) => scene.id === `choice-${button.dataset.day}`);
    if (target >= 0) {
      state.editingSlot = Number(button.dataset.slot);
      if (state.pendingChoice) delete state.pendingChoice[state.editingSlot];
      goScene(target);
    }
  }
  if (action === 'restart') {
    if (state.activeMatch) postGameCommand('abort-ai');
    releaseInfoPanelLock();
    localStorage.removeItem(STORAGE_KEY);
    Object.assign(state, normalizeState({}));
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function bindLegacyEvents() {
  app.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const action = button.dataset.action;
      if (action === 'complete') completeCurrentScene();
      if (action === 'replay-match') startMatch(buildScenes()[state.currentScene]);
      if (action === 'prev') goScene(state.currentScene - 1);
      if (action === 'next') goScene(state.currentScene + 1);
      if (action === 'track') goScene(Number(button.dataset.index));
      if (action === 'exit-match') closeMatch();
      if (action === 'choose-soul') previewSoulChoice(Number(button.dataset.slot), button.dataset.piece);
      if (action === 'toggle-handicap-soul') toggleHandicapSoul(button.dataset.piece);
      if (action === 'toggle-info') toggleGameInfoPanel();
      if (action === 'close-info') toggleGameInfoPanel(false);
      if (action === 'info-backdrop' && button === event.target) toggleGameInfoPanel(false);
      if (action === 'info-tab') setGameInfoTab(button.dataset.tab || 'author');
      if (action === 'manual-save') saveManualProgress();
      if (action === 'manual-load') loadManualProgress();
      if (action === 'back-choice') {
        const scenes = buildScenes();
        const target = scenes.findIndex((scene) => scene.id === `choice-${button.dataset.day}`);
        if (target >= 0) {
          state.editingSlot = Number(button.dataset.slot);
          if (state.pendingChoice) delete state.pendingChoice[state.editingSlot];
          goScene(target);
        }
      }
      if (action === 'restart') {
        if (state.activeMatch) postGameCommand('abort-ai');
        releaseInfoPanelLock();
        localStorage.removeItem(STORAGE_KEY);
        Object.assign(state, normalizeState({}));
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
  app.querySelectorAll('[data-game-command]').forEach((button) => {
    button.addEventListener('click', () => {
      postGameCommand(button.dataset.gameCommand);
    });
  });
}

function setGameInfoTab(tab) {
  state.gameInfoTab = ['author', 'settings', 'stats'].includes(tab) ? tab : 'author';
  if (state.gameInfoTab === 'stats') void refreshGlobalStats().then(() => {
    if (state.gameInfoOpen && state.gameInfoTab === 'stats') render();
  }).catch(() => {});
  render();
}

function toggleGameInfoPanel(forceOpen = null) {
  const wasOpen = state.gameInfoOpen;
  const open = forceOpen === null ? !state.gameInfoOpen : Boolean(forceOpen);
  if (open && !wasOpen) {
    state.gameInfoScrollY = window.scrollY || 0;
    document.body.style.top = `-${state.gameInfoScrollY}px`;
  }
  state.gameInfoOpen = open;
  document.body.classList.toggle('game-info-open', open);
  if (!open && wasOpen) {
    const scrollY = state.gameInfoScrollY || 0;
    releaseInfoPanelLock();
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
  }
  render();
}

function releaseInfoPanelLock() {
  document.body.classList.remove('game-info-open');
  document.body.style.top = '';
}

function completeCurrentMatchForTest() {
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  if (!scene || scene.kind !== 'match') return;
  if (state.activeMatch !== scene.id) state.activeMatch = scene.id;
  postGameCommand('abort-ai');
  completeMatchFromGame(scene, {
    outcome: 'win',
    win: true,
    totalMoves: 0,
    redKillsByType: {},
  });
}

function scrollCurrentTrackItem() {
  const current = app.querySelector('.track-item.current');
  const scroller = current?.closest('.track-scroll');
  if (!current || !scroller) return;
  const index = Math.max(0, Math.trunc(Number(current.dataset.index) || 0));
  const count = scroller.querySelectorAll('.track-item').length;
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  let target = current.offsetLeft + current.offsetWidth / 2 - scroller.clientWidth / 2;
  if (index <= 2) target = 0;
  else if (index >= count - 3) target = max;
  scroller.scrollLeft = clamp(target, 0, max);
}

function updateTickerMotion() {
  app.querySelectorAll('.story-ticker').forEach((ticker) => {
    const span = ticker.querySelector('span');
    if (!span) return;
    ticker.classList.remove('is-long');
    span.style.removeProperty('--ticker-shift');
    span.style.removeProperty('--ticker-duration');
    const overflow = Math.ceil(span.scrollWidth - ticker.clientWidth);
    if (overflow <= 2) return;
    const shift = overflow + 20;
    const duration = Math.min(6, Math.max(3.2, shift / 24));
    span.style.setProperty('--ticker-shift', `-${shift}px`);
    span.style.setProperty('--ticker-duration', `${duration}s`);
    ticker.classList.add('is-long');
  });
}

window.render_game_to_text = () => {
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  return JSON.stringify({
    type: 'narrative',
    currentScene: state.currentScene,
    maxScene: state.maxScene,
    sceneId: scene?.id,
    sceneTitle: scene?.title,
    sceneKind: scene?.kind,
    selectedSouls: state.selected,
    completedDays: state.completedDays,
    score: getScore(),
    finished: isDayCompleted(9),
  });
};

window.advanceTime = () => {};

render();
void initGlobalStats();
