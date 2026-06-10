const STORAGE_KEY = 'kw_chess_story_progress_v5';

const PIECES = [
  {
    key: 'rook',
    name: '车',
    title: '车魂',
    actTitle: '列车冲撞',
    art: './assets/story-art/awakening-rook.webp',
    alt: '战场棋盘上红车化作赤金战车冲破阵线',
    role: '突破封锁，适合打开被堵死的僵局。',
    choice: '你最相信突破。路被堵死，就撞开。',
    quote: '木纹深处亮起赤金轮影，像沉睡多年的战车终于醒来。',
    ability: '直线冲撞。车可以撞开挡路棋子，把堵死的路线撞成突破口。',
    fantasy: '轮声从棋盘底下滚过，横线竖线被赤金魂光烧亮。你第一次感觉到，棋子不是被你移动，而是在替你开路。',
  },
  {
    key: 'horse',
    name: '马',
    title: '马魂',
    actTitle: '马踏飞燕',
    art: './assets/story-art/awakening-horse.webp',
    alt: '棋盘战场上马魂踏风跃起连续踩破敌阵',
    role: '连续踩杀，适合在混乱中撕开第二条路。',
    choice: '你最相信变化。一步之后，还能再踏一步。',
    quote: '马影跃出格线，蹄下的风把旧规则踏成碎光。',
    ability: '不再被蹩马腿束缚。吃子后可以继续连踩，像在敌阵里踏出一条风路。',
    fantasy: '你听见马嘶从棋盒深处传来。它没有等待一条干净的马腿，而是把阻挡都踩成雾。',
  },
  {
    key: 'cannon',
    name: '炮',
    title: '炮魂',
    actTitle: '洲际导弹',
    art: './assets/story-art/awakening-cannon.webp',
    alt: '棋盘战场上炮魂化作远程火光越过阵线',
    role: '远程压制，适合威胁 AI 以为安全的位置。',
    choice: '你最相信远方的杀意。真正的威胁不必站在眼前。',
    quote: '炮魂醒来时，棋盘深处响起一声闷雷。',
    ability: '远程施压。不再只等一个合适炮架，后方也会被突然落下的火光照亮。',
    fantasy: '棋盘上的棋子浮出淡淡影子，像一座座临时架起的桥。炮声越过半盘棋，落在 AI 以为安全的位置。',
  },
  {
    key: 'pawn',
    name: '兵',
    title: '兵魂',
    actTitle: '集束炸弹',
    art: './assets/story-art/awakening-pawn.webp',
    alt: '棋盘战场上小兵燃起火种并引爆前线',
    role: '牺牲爆破，适合用小子换出大空间。',
    choice: '你最相信不退。最小的棋子，也能炸开局面。',
    quote: '兵魂不是王冠，而是一点不肯熄灭的火。',
    ability: '叠层推进，自爆换空间。小兵可以用牺牲把僵局炸出缺口。',
    fantasy: '那枚兵没有变成王者，只是往前一步。层层火光叠在棋身上，像把所有不能后退的夜晚都点燃。',
  },
  {
    key: 'advisor',
    name: '仕',
    title: '仕魂',
    actTitle: 'X 形光波',
    art: './assets/story-art/awakening-advisor.webp',
    alt: '棋盘战场上仕魂守住九宫并斩出X形光波',
    role: '守中反杀，适合把贴近九宫的威胁切开。',
    choice: '你最相信守护。不是挡在王前，而是切开杀意。',
    quote: '守护不只是挡住黑暗，也可以把黑暗切开。',
    ability: '斜线光波。仕落子时沿斜线释放伤害，切开贴近九宫的威胁。',
    fantasy: '九宫线像被无形的手重新描过。仕向斜线落下，四道魂光从宫门劈出。',
  },
  {
    key: 'bishop',
    name: '相',
    title: '相魂',
    actTitle: '十字地震波',
    art: './assets/story-art/awakening-bishop.webp',
    alt: '棋盘战场上相魂踏裂河界并释放十字地震波',
    role: '跨河控场，适合扩大棋盘上的震荡范围。',
    choice: '你最相信边界会碎。河界不是命令，只是旧棋盘的伤口。',
    quote: '不能过河，只是旧棋盘留下的边界；棋魂醒来时，河也会让路。',
    ability: '跨河震荡。相可以越过河界，并在落点释放十字地震波。',
    fantasy: '相站在河边，没有回答你的疑问。它只是向前落下，河界便泛起细密裂纹。',
  },
  {
    key: 'king',
    name: '帅',
    title: '帅魂',
    actTitle: '御驾亲征',
    art: './assets/story-art/awakening-king.webp',
    alt: '棋盘战场上帅魂展开王冠般的九宫光芒',
    role: '御驾亲征，适合主动压迫并寻找斩首机会。',
    choice: '你最相信亲征。王不该永远站在别人身后。',
    quote: '帅魂醒来时，九宫不再是牢笼，而像一顶缓缓展开的冠。',
    ability: '主动吃子成长。觉醒帅可以主动压制对方将帅；若对方未觉醒，甚至能借照面取敌首级。',
    fantasy: '宫线像水面一样荡开，所有棋子低低共鸣。你终于明白，底线也可以变成力量。',
  },
];

const PIECE_BY_KEY = Object.fromEntries(PIECES.map((piece) => [piece.key, piece]));
const ALL_PIECE_KEYS = PIECES.map((piece) => piece.key);
const TYPE_TO_PIECE_KEY = { R: 'rook', H: 'horse', C: 'cannon', P: 'pawn', A: 'advisor', B: 'bishop', K: 'king' };
const SOUL_LIVE_HINTS = {
  rook: '车魂：直线冲撞，能撞开挡路棋子，把堵死的路线撞成突破口。',
  horse: '马魂：不再怕蹩腿，吃子后可以继续连踩，适合在敌阵里连续制造威胁。',
  cannon: '炮魂：远程施压，不必只等一个炮架，可以打到 AI 以为安全的位置。',
  pawn: '兵魂：上下左右推进，可叠层，必要时自爆换空间。',
  advisor: '仕魂：落子释放 X 形光波，适合守住中路并反切贴近的威胁。',
  bishop: '相魂：可以跨河，落点释放十字地震波，适合扩大控场范围。',
  king: '帅魂：主动吃子成长；对方将帅未觉醒且同列无遮挡时，可照面远距击杀。',
};
const app = document.querySelector('#app');
const state = loadState();
let messageListenerBound = false;

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
    ? saved.completedDays.map((day) => Math.trunc(Number(day))).filter((day) => day >= 1 && day <= 9)
    : [];
  return {
    currentScene: Math.max(0, Math.trunc(Number(saved.currentScene) || 0)),
    maxScene: Math.max(0, Math.trunc(Number(saved.maxScene) || 0)),
    selected,
    completedDays,
    activeMatch: typeof saved.activeMatch === 'string' ? saved.activeMatch : null,
    matchResults: saved.matchResults && typeof saved.matchResults === 'object' ? saved.matchResults : {},
    achievements: saved.achievements && typeof saved.achievements === 'object' ? saved.achievements : {},
  };
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentScene: state.currentScene,
      maxScene: state.maxScene,
      selected: state.selected,
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

function buildScenes() {
  const scenes = [
    {
      id: 'prologue',
      act: '序章',
      title: '八冠王',
      kind: 'story',
      scoreHidden: true,
      quote: '那时，没人相信你会输。连你自己也不信。',
      body: [
        '你第一次夺得全国冠军时，还不到十八岁。',
        '从少年赛场到职业棋坛，你像一枚突然落进中路的重子，逼得所有人重新计算局面。',
        '老棋手提起你时，总会停顿一下：这孩子下的不是一两步棋，他像是在和整盘棋说话。',
        '后来第二冠、第三冠、第五冠、第八冠接连到来。八座冠军杯摆在棋院展柜里，灯光落下来，像八枚已经落定的棋子。',
      ],
    },
    {
      id: 'ai-era',
      act: '第一幕',
      title: 'AI 崛起',
      kind: 'story',
      scoreHidden: true,
      art: { src: './assets/story-art/ai-era.webp', alt: '深夜机房里，屏幕上的棋盘被冷光照亮' },
      quote: '它没有师门，没有流派，也没有输棋后睡不着的夜晚。',
      body: [
        'AI 开始击败业余高手和职业新锐时，棋坛并没有轻视它。大家承认它算得快、记得多，也承认它的训练永远不会累。',
        '主流棋类 AI 的方法并不神秘：搜索尽可能多的变化，再用局面打分判断哪条路更好。残局库、开局库、神经网络评估，都是为了把“看得远”和“看得准”叠在一起。',
        '但中国象棋有数百年的技术积累。人们相信，真正站在山顶的棋手，不只是计算器。',
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
        '所以当人机大战被正式提出时，你心里并不只有压力，也有一丝久违的期待。',
        '比赛被包装成一次技术检验：让最强的人类棋手与最新一代象棋 AI 对弈，看看机器是否真的能越过人类经验的顶点。',
        '赛制是十五局八胜。一天一盘。人类可以休息、复盘、准备第二天；AI 的夜晚，则会继续训练。',
        '发布会上，你说会认真对待。心里却很平静：如果它真能带来挑战，那也许是件好事。',
      ],
    },
    {
      id: 'match-1-before',
      act: '第二幕',
      title: '第一局 上',
      kind: 'story',
      scoreHidden: true,
      art: { src: './assets/story-art/human-vs-ai.webp', alt: '聚光灯下的人机大战棋桌' },
      quote: 'AI 的第一步很普通。普通到像一句问候。',
      body: [
        '第一局开赛时，场馆里很安静。镜头对准棋盘，也对准你的手。',
        'AI 的前十几个回合没有任何炫技。它没有冒险，没有挑衅，只是把每一个子都放在最稳的位置。',
        '外行看不出危险，只觉得局面焦灼。可你知道，焦灼是假象。它没有急着扩大优势，是因为最稳的打法已经足够压住你。',
      ],
    },
    {
      id: 'match-1',
      act: '第二幕',
      title: '第一局 下',
      kind: 'match',
      day: 1,
      scoreHidden: true,
      matchTitle: '第一局：旧棋的终点',
      objective: '这一局会很快让你看见差距。你可以亲自下完，也可以认输进入转折。',
      resultText: '第一局结束，比分来到 AI 1 : 0 你。你没有投子，只是看着最后一条路也被算完。',
      quote: '它滴水不漏。你第一次发现，自己连制造混乱的机会都没有。',
      body: [
        '中盘之后，你开始主动变招。弃子、牵制、兑子、转入复杂残局，每一条你熟悉的路都被它提前等住。',
        'AI 占优后没有贪胜。它选择最稳健的推进，把你的反击一点点压窄，像用手掌按住一盏将要熄灭的灯。',
        '这不是一盘普通的输棋。你第一次感觉到，自己熟悉了一生的棋盘，也许已经走到了尽头。',
      ],
    },
  ];

  if (!isDayCompleted(1)) return clampScenes(scenes);

  scenes.push({
    id: 'after-loss',
    act: '第二幕',
    title: '道心崩塌',
    kind: 'story',
    art: { src: './assets/story-art/broken-vow.webp', alt: '棋盒被锁进柜中，冠军杯在暗处失去光泽' },
    quote: '过去的输棋，会让你想下一盘。这一次，你开始怀疑棋盘本身。',
    body: [
      '赛后发布会上，AI 的合成声很平静：经过第一局，我们已经基本掌握了你的棋风。',
      '它把这称作知识蒸馏。你的长考、试探、弃子和搏杀，都在一夜之间变成它训练自己的材料。',
      '那一晚，你把棋盒带回房间。灯灭之后，有一枚棋子在黑暗里轻轻震了一下。',
    ],
  });

  for (let slot = 0; slot < 7; slot += 1) {
    const day = slot + 2;
    scenes.push(makeChoiceScene(day, slot));
    const pieceKey = state.selected[slot];
    if (!pieceKey) break;
    scenes.push(makeAwakeningScene(day, slot, pieceKey));
    scenes.push(makeMatchScene(day, slot, pieceKey));
    if (!isDayCompleted(day)) break;
    scenes.push(makeAfterWinScene(day, slot, pieceKey));
  }

  if (state.selected.length === 7 && isDayCompleted(8)) {
    scenes.push({
      id: 'before-final',
      act: '终幕',
      title: '第九局前夜',
      kind: 'story',
      quote: '比分是 AI 1 : 7 你。只差一局，也只剩一夜。',
      body: [
        '七枚棋魂全部醒来。可这不再只是你的优势。',
        'AI 已经学会了你过去七天展露出的全部能力。它用自博弈把每一次冲撞、连踩、光波和自爆都拆成新的样本。',
        '如果第九局你不能拿下第八胜，后面的夜晚会属于它。到那时，它也许会比你更懂这套新棋。',
      ],
    });
    scenes.push({
      id: 'match-9',
      act: '终幕',
      title: '第九局',
      kind: 'match',
      day: 9,
      matchTitle: '第九局：全魂对决',
      objective: '双方全部觉醒。你必须赢下这一局，以 8 胜结束十五番棋。',
      resultText: '第九局结束，比分定格在 AI 1 : 8 你。AI 还会继续学习，但这一次，胜负已经来不及等它追上。',
      art: { src: './assets/story-art/final-board.webp', alt: '终局赛场上，新棋盘在灯光下展开' },
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
      title: '没有第十局',
      kind: 'ending',
      quote: '十五番棋没有下满。不是因为 AI 不够强，而是因为你没有给它继续学习的时间。',
      body: [
        '三十六小时后，AI 的新版本会更强。一周后，它也许会把棋魂拆成比你更锋利的结构。',
        '可这一次，胜负已经结束。',
        '人类未必算得更深。但当旧规则走到尽头时，人类还能创造新的棋盘。',
      ],
    });
  }

  return clampScenes(scenes);
}

function clampScenes(scenes) {
  state.currentScene = clamp(state.currentScene, 0, scenes.length - 1);
  state.maxScene = clamp(Math.max(state.maxScene, state.currentScene), 0, scenes.length - 1);
  return scenes;
}

function makeChoiceScene(day, slot) {
  const selectedKey = state.selected[slot] || null;
  return {
    id: `choice-${day}`,
    act: `第${day}天`,
    title: selectedKey ? `已选择${PIECE_BY_KEY[selectedKey].name}魂` : '选择棋魂',
    kind: 'choice',
    day,
    slot,
    selectedKey,
    quote: day === 2
      ? '你想起小时候最喜欢、最依靠、也最想成为的那枚棋子。'
      : 'AI 已经学会了昨天的魂。今天，你只能再领先一点。',
    body: [
      day === 2
        ? '第一局之后，AI 以为它蒸馏了你的全部棋风。可它没有蒸馏到棋盒深处那一声回响。'
        : '赛前的机房整夜未熄。AI 复盘了你昨天展露的棋魂，并把它加入今天的模型。',
      '你不能一次把所有底牌都亮出来。每天只唤醒一枚，不是保守，而是让自己始终领先一步的唯一办法。',
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
    art: { src: piece.art, alt: piece.alt },
    quote: piece.quote,
    body: [
      piece.fantasy,
      `棋魂觉醒：${piece.ability}`,
      day === 2
        ? '这是反转的第一步。AI 还不知道，这枚棋子已经不再属于旧规则。'
        : '你知道，今天用出来的奇迹，明天就会变成 AI 的武器。所以这一局必须赢。',
    ],
  };
}

function makeMatchScene(day, slot, pieceKey) {
  const piece = PIECE_BY_KEY[pieceKey];
  const previous = state.selected.slice(0, slot).map((key) => PIECE_BY_KEY[key].name).join('、') || '无';
  const current = state.selected.slice(0, slot + 1).map((key) => PIECE_BY_KEY[key].name).join('、');
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
    resultText: `第${day}局，你赢了。${piece.name}魂的锋芒已经暴露，今晚 AI 会把它蒸馏进自己的棋谱。`,
    quote: `今天的领先，只有这一盘棋的时间。`,
    body: [
      `你没有把所有棋魂都亮出来，只让${piece.name}魂走到台前。`,
      previous === '无'
        ? 'AI 仍按传统象棋估值。它能计算局面，却还不知道棋魂会从规则本身撕开缺口。'
        : `AI 已经带着${previous}魂回到棋盘。它学得很快，但今天的新魂还不在它的训练集里。`,
    ],
  };
}

function makeAfterWinScene(day, slot, pieceKey) {
  const piece = PIECE_BY_KEY[pieceKey];
  const score = getScoreAfterDay(day);
  return {
    id: `after-${day}`,
    act: `第${day}夜`,
    title: day === 8 ? '七魂俱醒' : '蒸馏之夜',
    kind: 'story',
    quote: day === 8
      ? '七枚棋魂已经全部醒来。可 AI 也只落后你一夜。'
      : `比分来到 AI ${score.aiWins} : ${score.playerWins} 你。可机房里的灯没有熄。`,
    body: [
      `${piece.name}魂帮你赢下了这一局。观众席还在欢呼，AI 的训练日志已经开始刷新。`,
      day === 8
        ? '明天没有新的棋魂可以隐藏。第九局，双方都将全部觉醒。'
        : '你看见了危险，也看见了希望：经过一盘棋，你自己的棋魂更稳了，下一枚棋子也开始回应。',
    ],
  };
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
  if (scene.kind === 'choice' && !state.selected[scene.slot]) return;
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
  state.currentScene = clamp(index, 0, Math.min(state.maxScene, scenes.length - 1));
  state.activeMatch = null;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startMatch(scene) {
  state.activeMatch = scene.id;
  saveState();
  render();
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
    <main class="shell">
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
  requestAnimationFrame(() => {
    scrollCurrentTrackItem();
    updateTickerMotion();
  });
}

function renderSceneActions(scene, scenes) {
  return `
    <div class="scene-actions">
      <button type="button" class="nav-btn secondary" data-action="prev" ${state.currentScene > 0 ? '' : 'disabled'}>上一段</button>
      ${
        scene.kind === 'ending'
          ? '<button type="button" class="nav-btn primary" data-action="restart">从头再读</button>'
          : `<button type="button" class="nav-btn primary" data-action="complete" ${(scene.kind === 'choice' && !state.selected[scene.slot]) ? 'disabled' : ''}>${getPrimaryActionLabel(scene)}</button>`
      }
      <button type="button" class="nav-btn secondary" data-action="next" ${
        state.currentScene < state.maxScene && state.currentScene < scenes.length - 1 ? '' : 'disabled'
      }>下一段</button>
    </div>
  `;
}

function renderMobileStoryTrack(scenes) {
  const scene = scenes[state.currentScene];
  return `
    <section class="mobile-story-track" aria-label="剧情进度">
      <div class="mobile-track-title">
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
    ${scene.scoreHidden ? '' : renderScoreStrip()}
    ${renderStoryArt(scene)}
    ${scene.kind === 'choice' ? renderChoiceContext(scene) : `
      <div class="story-text">
        ${scene.body.map((paragraph, index) => `<p>${decorateParagraph(paragraph, index)}</p>`).join('')}
      </div>
    `}
    ${scene.kind === 'choice' ? renderChoice(scene) : ''}
    ${scene.kind === 'awakening' ? renderAbility(scene) : ''}
    ${scene.kind === 'match' ? renderMatchText(scene) : ''}
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

function renderStoryArt(scene) {
  if (!scene.art) return '';
  return `
    <figure class="story-art">
      <img src="${scene.art.src}" alt="${scene.art.alt}" loading="lazy" decoding="async">
    </figure>
  `;
}

function renderChoice(scene) {
  const selectedKey = state.selected[scene.slot] || null;
  const selectedPiece = selectedKey ? PIECE_BY_KEY[selectedKey] : null;
  return `
    <section class="choice-panel" aria-label="选择觉醒棋魂">
      <div class="choice-head">
        <strong>${selectedPiece ? `已选择：${selectedPiece.name}魂` : '今天只亮一枚棋魂'}</strong>
        <span>${selectedPiece ? '确认前仍可改选' : 'AI 明天会学会你今天展示的能力'}</span>
      </div>
      <div class="soul-picker" aria-label="棋魂候选">
        ${PIECES.map((piece) => renderSoulButton(scene, piece, selectedKey)).join('')}
      </div>
      ${selectedPiece ? renderSoulDetail(scene, selectedPiece) : renderSoulEmpty(scene)}
    </section>
  `;
}

function renderSoulButton(scene, piece, selectedKey) {
  const usedElsewhere = state.selected.includes(piece.key) && selectedKey !== piece.key;
  const selected = selectedKey === piece.key;
  return `
    <button
      type="button"
      class="soul-button${selected ? ' selected' : ''}${usedElsewhere ? ' used' : ''}"
      data-action="choose-soul"
      data-slot="${scene.slot}"
      data-piece="${piece.key}"
      ${usedElsewhere ? 'disabled' : ''}
    >
      <span class="choice-piece">${piece.name}</span>
      <span class="soul-button-text">
        <strong>${piece.actTitle}</strong>
        <small>${selected ? '已选' : (usedElsewhere ? '已觉醒' : piece.title)}</small>
      </span>
    </button>
  `;
}

function renderSoulDetail(scene, piece) {
  const previousKeys = state.selected.slice(0, scene.slot);
  const previous = previousKeys.map((key) => PIECE_BY_KEY[key].name).join('、') || '暂无';
  return `
    <div class="soul-detail">
      <figure class="soul-art">
        <img src="${piece.art}" alt="${piece.alt}" loading="lazy" decoding="async">
      </figure>
      <div class="soul-copy">
        <div class="soul-title-row">
          <span class="choice-piece large">${piece.name}</span>
          <div>
            <strong>${piece.title} · ${piece.actTitle}</strong>
            <span>${piece.role}</span>
          </div>
        </div>
        <p class="soul-belief">${piece.choice}</p>
        <p class="soul-ability"><b>走法能力：</b>${piece.ability}</p>
        <p class="soul-warning">你：${previous === '暂无' ? piece.name : `${previous}、${piece.name}`}。AI：${previous}。用新魂赢下时间差。</p>
      </div>
    </div>
  `;
}

function renderSoulEmpty(scene) {
  const remaining = PIECES.filter((piece) => !state.selected.includes(piece.key)).length;
  return `
    <div class="soul-empty">
      <strong>先选一枚棋子。</strong>
      <p>剩余 ${remaining} 枚棋魂可以回应你。点上方棋子后，下方会显示它的觉醒图、战术定位和走法能力。</p>
    </div>
  `;
}

function renderAbility(scene) {
  const pieceKey = scene.pieceKey;
  const piece = PIECE_BY_KEY[pieceKey];
  if (!piece) return '';
  return `
    <section class="ability-card" aria-label="${piece.name}魂走法">
      <strong>${piece.name}魂走法</strong>
      <p>${piece.ability}</p>
      <p>${piece.key === 'king' ? '特别规则：觉醒帅可以主动利用将帅照面；若对方将帅未觉醒，可直接发动远距击杀。' : '叠层规则仍然有效：同类可叠，合体后力量提高，也会让能力范围或伤害更强。'}</p>
      <div class="ability-actions">
        <button type="button" class="nav-btn secondary compact" data-action="back-choice" data-day="${scene.day}">重新选择棋魂</button>
      </div>
    </section>
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
  return `
    <div class="story-text match-text">
      ${completed ? '' : renderMatchBrief(scene)}
      ${completed ? `<p>${scene.resultText}</p>` : ''}
      ${!completed && retryText ? `<p class="retry-text">${retryText}</p>` : ''}
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
  if (scene.day === 1) {
    return {
      badge: '旧棋对决',
      items: [
        { label: '你的棋魂', value: '尚未觉醒' },
        { label: 'AI 状态', value: '传统棋力巅峰' },
        { label: '推进方式', value: '下完或认输' },
      ],
      tip: '这一局不是为了取胜，而是让你看清 AI 在旧棋盘里能把希望算到多干净。',
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
  if (scene.kind === 'choice') return state.selected[scene.slot] ? '确认觉醒' : '选择棋魂';
  if (scene.kind !== 'match') return '继续';
  if (isMatchCompleted(scene)) return '继续';
  return scene.day === 1 ? '观看第一局' : '开始对局';
}

function renderEmbeddedMatch(scene) {
  const firstDay = scene.day === 1;
  return `
    <div class="story-game-shell">
      <div class="story-game-meta">
        <span>${scene.matchTitle}</span>
        <strong>${firstDay ? '可认输推进' : '必须获胜'}</strong>
      </div>
      <div class="story-live-hint" id="story-live-hint" data-default-hint="${escapeAttr(getDefaultLiveHint(scene))}">${getDefaultLiveHint(scene)}</div>
      <iframe
        id="story-game-frame"
        class="story-game-frame"
        src="${buildGameSrc(scene)}"
        title="${scene.matchTitle}"
        allow="fullscreen"
      ></iframe>
      <div class="story-game-actions${firstDay ? ' four' : ''}">
        <button type="button" class="nav-btn secondary compact" data-game-command="restart">重开</button>
        <button type="button" class="nav-btn secondary compact" data-game-command="undo">悔棋</button>
        ${firstDay ? '<button type="button" class="nav-btn primary compact" data-game-command="resign">认输</button>' : ''}
        <button type="button" class="nav-btn secondary compact" data-action="exit-match">返回剧情</button>
      </div>
    </div>
  `;
}

function getDefaultLiveHint(scene) {
  if (scene.day === 1) return '第一局没有棋魂，先感受旧棋盘里的差距。';
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

function buildGameSrc(scene) {
  const params = new URLSearchParams();
  const config = getMatchConfig(scene);
  params.set('levelId', String(config.levelId));
  params.set('ai', '1');
  params.set('aiTime', String(config.aiTime || 4000));
  params.set('aiStrength', config.aiStrength || 'story');
  params.set('mode', config.mode);
  if (config.mode === 'classic') params.set('classic', '1');
  if (config.playerUpgrades.length) params.set('pu', config.playerUpgrades.join(','));
  if (config.aiUpgrades.length) params.set('au', config.aiUpgrades.join(','));
  return `./index-legacy.html?${params.toString()}`;
}

function getMatchConfig(scene) {
  if (scene.day === 1) {
    return { levelId: 101, mode: 'classic', aiTime: 2500, aiStrength: 'story', playerUpgrades: [], aiUpgrades: [] };
  }
  if (scene.day === 9) {
    return { levelId: 109, mode: 'mixed', aiTime: 4500, aiStrength: 'story', playerUpgrades: ALL_PIECE_KEYS, aiUpgrades: ALL_PIECE_KEYS };
  }
  const slot = scene.slot || 0;
  return {
    levelId: 100 + scene.day,
    mode: 'mixed',
    aiTime: 4000,
    aiStrength: 'story',
    playerUpgrades: state.selected.slice(0, slot + 1),
    aiUpgrades: state.selected.slice(0, slot),
  };
}

function postGameCommand(command, payload = {}) {
  const frame = document.querySelector('#story-game-frame');
  if (!(frame instanceof HTMLIFrameElement) || !frame.contentWindow) return;
  frame.contentWindow.postMessage({ type: 'game-command', command, ...payload }, '*');
}

function completeMatchFromGame(scene, stats) {
  state.activeMatch = null;
  state.matchResults[scene.id] = {
    outcome: stats?.outcome || 'unknown',
    win: !!stats?.win,
    totalMoves: Math.max(0, Math.trunc(Number(stats?.totalMoves) || 0)),
    totalKills: Object.values(stats?.redKillsByType || {}).reduce((sum, value) => sum + Math.max(0, Math.trunc(Number(value) || 0)), 0),
  };
  if (!matchGoalReached(scene, stats)) {
    saveState();
    render();
    return;
  }
  if (!state.completedDays.includes(scene.day)) state.completedDays.push(scene.day);
  state.completedDays.sort((a, b) => a - b);
  saveState();
  render();
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

function chooseSoul(slot, pieceKey) {
  if (!PIECE_BY_KEY[pieceKey]) return;
  const oldKey = state.selected[slot];
  if (oldKey === pieceKey) return;
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
  state.maxScene = Math.min(state.maxScene, state.currentScene);
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleGameMessage(event) {
  if (!event.data) return;
  if (event.data.type === 'piece-selected') {
    updateLivePieceHint(event.data);
    return;
  }
  if (event.data.type !== 'game-end') return;
  const scenes = buildScenes();
  const scene = scenes[state.currentScene];
  if (!scene || scene.kind !== 'match' || state.activeMatch !== scene.id) return;
  completeMatchFromGame(scene, event.data.stats || {});
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
  if (data.upgraded && SOUL_LIVE_HINTS[pieceKey]) {
    el.textContent = SOUL_LIVE_HINTS[pieceKey];
    el.classList.add('active');
    return;
  }
  el.textContent = '这枚棋子还没有觉醒，按传统走法行动。';
  el.classList.remove('active');
}

function bindGlobalMessageListener() {
  if (messageListenerBound) return;
  window.addEventListener('message', handleGameMessage);
  messageListenerBound = true;
}

function bindEvents() {
  bindGlobalMessageListener();
  app.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'complete') completeCurrentScene();
      if (action === 'prev') goScene(state.currentScene - 1);
      if (action === 'next') goScene(state.currentScene + 1);
      if (action === 'track') goScene(Number(button.dataset.index));
      if (action === 'exit-match') closeMatch();
      if (action === 'choose-soul') chooseSoul(Number(button.dataset.slot), button.dataset.piece);
      if (action === 'back-choice') {
        const scenes = buildScenes();
        const target = scenes.findIndex((scene) => scene.id === `choice-${button.dataset.day}`);
        if (target >= 0) goScene(target);
      }
      if (action === 'restart') {
        if (state.activeMatch) postGameCommand('abort-ai');
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
  bindStoryArt();
}

function bindStoryArt() {
  app.querySelectorAll('.story-art img').forEach((image) => {
    const figure = image.closest('.story-art');
    if (!figure) return;
    image.addEventListener('load', () => {
      figure.hidden = false;
    });
    image.addEventListener('error', () => {
      figure.hidden = true;
    });
    if (image.complete && image.naturalWidth > 0) figure.hidden = false;
  });
}

function scrollCurrentTrackItem() {
  const current = app.querySelector('.track-item.current');
  if (!current) return;
  current.scrollIntoView({ inline: 'center', block: 'nearest' });
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
