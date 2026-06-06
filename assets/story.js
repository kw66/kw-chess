const STORAGE_KEY = 'kw_chess_story_progress_v2';

const SCENES = [
  {
    id: 'prologue',
    act: '序章',
    title: '八冠王',
    kind: 'story',
    quote: '那时，没人相信你会输。连你自己也不信。',
    body: [
      '你第一次夺冠时，还不到十八岁。',
      '决赛那天，对手是成名已久的老棋王。棋风厚重，残局如山。你没有绕山，而是从中腹撕开一道口子，把整盘棋拖进自己的节奏。',
      '第一次封王之后，掌声没有停过。第二冠，第三冠，第五冠，第八冠。八座冠军杯摆在棋院展柜里，灯光落下来，像八枚沉默的棋子。',
      '人们说你是天才。老棋手说，你不像是在下棋，更像是在提前看见棋盘会往哪里塌。',
    ],
  },
  {
    id: 'ai-arrives',
    act: '第一幕',
    title: '铁幕降临',
    kind: 'story',
    quote: '它没有师门，没有流派，也没有输棋后睡不着的夜晚。',
    body: [
      'AI 出现的时候，最开始没有人把它当成真正的棋手。',
      '它只有版本号、算力、训练数据，和一间永不熄灯的机房。棋院里有人说，机器会算，但不懂棋。',
      '直到它开始连胜。',
      '业余高手倒下，职业新锐倒下，冠军也倒下。人们把输掉的棋谱贴满走廊，第二天清晨，AI 的新版本又把这些答案推翻。',
    ],
  },
  {
    id: 'human-hope',
    act: '第一幕',
    title: '人类的座位',
    kind: 'story',
    quote: '如果你也不能赢，人类还能派谁上场？',
    body: [
      '人机大战公布后，所有镜头都对准了你。',
      '有人说这是一场表演赛，有人说这是技术展示。更多人把它说成一场保卫战。',
      '你坐在发布会中央，听见“人类智慧”四个字一次次落在自己肩上。那不是赞美，是重量。',
      '你没有豪言壮语，只说会尽力。',
    ],
  },
  {
    id: 'match-one',
    act: '第二幕',
    title: '第一局',
    kind: 'match',
    matchTitle: '人机大战 1 / 10',
    objective: '坚持 30 回合、吃子 8 枚、或不败，满足任意一项即可推进。',
    resultText: '这一局你输了。可你至少看清了一件事：AI 不是更冷静的棋手，它像一面没有边界的墙。',
    quote: 'AI 的第一步很普通。普通到像一句问候。',
    body: [
      '棋盘另一侧没有人，只有屏幕亮着。',
      'AI 的第一步落下时，没有声音。那一步很普通，普通到像一句问候。',
      '中盘之后，局面开始失温。你的每一次长考都像在火里捞一枚针，AI 却把所有变招平静地收进胜率曲线。',
      '终局来临时，观众席先安静了几秒，随后响起掌声。掌声很大，像是在替所有人遮住伤口。',
    ],
  },
  {
    id: 'ten-games',
    act: '第二幕',
    title: '十番棋之后',
    kind: 'story',
    quote: '人长考，是犹豫。AI 长考，是它正在把最后的希望算干净。',
    body: [
      '后面的棋没有奇迹。',
      '你试过抢攻。AI 退一步，像退进早已挖好的河道。',
      '你试过缠斗。AI 不急不躁，把每一枚棋子都放到让人难受的位置。',
      '你试过弃子，试过脱离棋谱。可那些所谓灵感，很快就在冰冷的胜率曲线里沉下去。',
      '你不是第一次输棋。可这一次，输掉的不只是一盘棋。',
    ],
  },
  {
    id: 'broken',
    act: '第三幕',
    title: '道心破碎',
    kind: 'story',
    quote: '过去的输棋，会让你想下一盘。这一次，你开始怀疑棋盘本身。',
    body: [
      '你最怕的不是输。',
      '你十几岁就开始下番棋，输过决赛，输过半目，输过一整夜睡不着的棋。',
      '可这一次不一样。',
      '如果人类称作灵感的东西，只是机器还没来得及命名的误差，那你这些年到底在相信什么？',
      '你把棋盒锁进柜子。很长一段时间，棋院再没有人听见那只盒子打开的声音。',
    ],
  },
  {
    id: 'rook',
    act: '第四幕',
    title: '车魂初醒',
    kind: 'match',
    unlock: 'rook',
    matchTitle: '觉醒试炼：车',
    objective: '车觉醒：直线冲撞，撞开挡路棋子，把堵死的路线撞成突破口。',
    resultText: '红车震动的那一刻，你第一次明白：旧路走不通，就不要再走旧路。',
    quote: '像一截沉睡多年的铁轨，忽然等来了火车。',
    body: [
      '雨夜里，你重新打开棋盒。',
      '你不是为了复仇，也不是为了训练。你只是想确认，自己是否还能听见棋子的声音。',
      '红车落在掌心里。木纹已经被岁月磨得发亮。',
      '它忽然震了一下。不是向前走，而是在提醒你：棋盘上也可以有旧规则没有写过的路。',
    ],
  },
  {
    id: 'horse',
    act: '第五幕',
    title: '马踏飞燕',
    kind: 'match',
    unlock: 'horse',
    matchTitle: '觉醒试炼：马',
    objective: '马觉醒：不再被蹩马腿束缚，吃子后可以继续连踩。',
    resultText: '马的第二步落下时，你看见 AI 的评估线第一次迟疑。',
    quote: '一步之后还有一步，旧规则追不上它。',
    body: [
      '车魂之后，你开始反复做一个梦。',
      '梦里有一匹马从九宫外跃起，第一蹄踏碎旧谱，第二蹄落在 AI 从未计算过的空白处。',
      '醒来后，你把马放在棋盘中央。它不再等待一条干净的马腿。',
      '它要自己开路。',
    ],
  },
  {
    id: 'cannon',
    act: '第五幕',
    title: '洲际导弹',
    kind: 'match',
    unlock: 'cannon',
    matchTitle: '觉醒试炼：炮',
    objective: '炮觉醒：距离被折叠，远线压制不再只等一个炮架。',
    resultText: '炮声越过半盘棋。看似安全的后方，忽然不再安全。',
    quote: '真正可怕的不是炮在眼前，而是它忽然从很远的地方抵达。',
    body: [
      '第三枚棋子，你选了炮。',
      '你曾经以为炮最懂等待：等炮架，等对手失误，等一条线被清出来。',
      '但棋魂醒来之后，炮不再只是等待。',
      '它让距离变短，让威胁变早，让 AI 以为安全的后方忽然听见爆炸声。',
    ],
  },
  {
    id: 'pawn',
    act: '第五幕',
    title: '集束炸弹',
    kind: 'match',
    unlock: 'pawn',
    matchTitle: '觉醒试炼：兵',
    objective: '兵觉醒：叠层推进，自爆换空间，让最小的棋子改变局势。',
    resultText: '一枚兵炸开之后，棋盘安静了很久。你忽然想起，最小的棋子也有自己的命运。',
    quote: '过河不是终点，是一枚小棋子第一次拥有自己的命运。',
    body: [
      '第四次觉醒来得最慢。',
      '你盯着兵看了很久。它太小了，小到过去所有棋谱都把它写成消耗品。',
      '可正因为它小，它最懂什么叫不能后退。',
      '当兵魂醒来，它没有变成王者。它只是往前一步，然后把自己点燃。',
    ],
  },
  {
    id: 'advisor',
    act: '第五幕',
    title: 'X 形光波',
    kind: 'match',
    unlock: 'advisor',
    matchTitle: '觉醒试炼：仕',
    objective: '仕觉醒：守护不只在九宫内，斜线光波能切开贴身威胁。',
    resultText: '仕没有离开守护的位置，却让整个九宫都亮了起来。',
    quote: '守护者不是不能进攻，只是过去没人听见它拔剑。',
    body: [
      '第五枚棋魂醒在九宫里。',
      '你一直以为仕的命运就是守在王旁边，斜走一步，再斜走一步。',
      '直到 AI 把杀招压到宫门口。',
      '仕向斜线落下。棋盘上有一道光从它脚下展开，像守夜人终于拔出了剑。',
    ],
  },
  {
    id: 'bishop',
    act: '第五幕',
    title: '十字地震波',
    kind: 'match',
    unlock: 'bishop',
    matchTitle: '觉醒试炼：相',
    objective: '相觉醒：跨河震荡，打破“不能过河”的旧命令。',
    resultText: '相越过河界时，你听见旧棋盘深处传来裂开的声音。',
    quote: '不能过河，是旧时代的命令。',
    body: [
      '第六枚棋魂最沉默。',
      '相站在河边，像一位被规矩困住半生的人。',
      '你问它：你真的不能过河吗？',
      '棋子没有回答。它只是向前落下，河界在那一刻像纸一样薄。',
    ],
  },
  {
    id: 'king',
    act: '第六幕',
    title: '御驾亲征',
    kind: 'match',
    unlock: 'king',
    matchTitle: '觉醒试炼：王',
    objective: '帅觉醒：王不再只是被保护者，也能主动吃子成长。',
    resultText: '你终于明白，真正的王不是永远不动，而是在必须向前时亲自落子。',
    quote: '王第一次离开九宫时，整座棋院都像屏住了呼吸。',
    body: [
      '六枚棋魂醒来后，你以为自己已经听懂了棋盘。',
      '直到帅在九宫里轻轻震了一下。',
      '你迟疑了很久。王是最后的底线，也是所有棋子守护的理由。',
      '可若王永远只站在别人身后，新的棋盘仍然只是旧棋盘的影子。',
      '于是帅向前一步。不是逃，不是躲，是亲征。',
    ],
  },
  {
    id: 'combo',
    act: '第六幕',
    title: '自爆列车',
    kind: 'match',
    unlock: 'combo',
    matchTitle: '觉醒试炼：组合技',
    objective: '组合技觉醒：车的冲撞和兵的自爆连在一起，形成真正的新规则。',
    resultText: '这不再是一枚棋子的奇迹，而是一套规则开始拥有自己的呼吸。',
    quote: '棋魂彼此回应时，你知道自己不只是解锁能力，而是在创造棋。',
    body: [
      '单独的棋魂已经不能满足你。',
      'AI 仍然强大。它适应车，适应马，适应炮，也在适应每一次新的觉醒。',
      '你开始把棋魂连在一起。',
      '车推动兵，兵叠层，前线爆开，炮线接上，马从残阵里连踩而出。',
      '那一刻，棋盘不再只是增加了几条特殊规则。它像换了一套骨骼。',
    ],
  },
  {
    id: 'final-ready',
    act: '终幕',
    title: '复仇之日',
    kind: 'story',
    quote: '这一次，AI 必须走进你创造的新棋盘。',
    body: [
      '你重新站到聚光灯下时，所有人都看见你变了。',
      '你不再背负“人类智慧”的招牌，也不再急着证明机器错了。',
      '你只是把新棋盘摆上桌。',
      '终局仍按三局两胜计算。但你知道，真正的机会只有前两局。',
      'AI 学得太快。第一局它还不懂棋魂，第二局它已经开始模仿。若拖到第三局，它很可能彻底掌握这套规则。',
    ],
  },
  {
    id: 'final-one',
    act: '终幕',
    title: '第一局',
    kind: 'match',
    matchTitle: '终局 1 / 3',
    objective: '你全部觉醒，AI 仍是普通棋子。必须获胜才能继续。',
    resultText: '第一局，你赢了。不是侥幸，不是险胜，而是新规则第一次击穿旧王座。',
    quote: '观众席爆发出十番棋之后从未有过的声音。',
    body: [
      '第一局开始后，AI 仍然试图用旧规则理解一切。',
      '它计算车的直线，却没有算到冲撞。它计算马的落点，却没有算到连踩。它计算兵的价值，却没有算到一枚小棋子会主动爆开。',
      '你赢下第一局。',
      '那一刻，所有曾经沉默的人都站了起来。',
    ],
  },
  {
    id: 'final-two',
    act: '终幕',
    title: '第二局',
    kind: 'match',
    matchTitle: '终局 2 / 3',
    objective: 'AI 已经开始学习棋魂。你必须趁它还没完全掌握，再赢一局。',
    resultText: '第二局，你再次获胜。AI 还在学习，但胜负已经来不及等它学完。',
    quote: '它没有听见棋魂，却已经看见了棋魂的形状。',
    body: [
      '第二局开始前，AI 的机房亮了一整夜。',
      '它没有听见棋魂，却看见了第一局的全部：每一次冲撞，每一次连踩，每一次自爆，每一次合体。',
      '你很清楚，不能让比赛拖到第三局。',
      '所以这一局，你下得更快，也更狠。你不再炫耀新规则，只用它们结束比赛。',
      '第二局结束，比分定格在 2:0。',
    ],
  },
  {
    id: 'no-third',
    act: '尾声',
    title: '没有第三局',
    kind: 'ending',
    quote: '第三局没有开始。不是因为 AI 不够强，而是因为你没有给它学完的时间。',
    body: [
      '三局两胜，2:0 结束。',
      '你知道，如果还有第三局，AI 会比刚才更接近你。它会继续复制、压缩、迭代，把每一次棋魂都变成可训练的形状。',
      '可这一次，胜负已经在它完全掌握之前结束。',
      '人类未必算得更深，但可以在旧规则走到尽头时，创造新的棋盘。',
      '它属于每一个被计算压到尽头之后，仍然想要重新落子的人。',
    ],
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
      unlocked: Array.isArray(saved.unlocked) ? saved.unlocked : [],
      completedMatches: Array.isArray(saved.completedMatches) ? saved.completedMatches : [],
    };
  } catch {
    return { currentScene: 0, maxScene: 0, unlocked: [], completedMatches: [] };
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

function render() {
  const scene = SCENES[state.currentScene];
  app.innerHTML = `
    <main class="shell">
      <article class="story-panel">
        <p class="scene-act">${scene.act}</p>
        <h1>${scene.title}</h1>
        <blockquote>${scene.quote}</blockquote>
        <div class="story-text">
          ${scene.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </div>
        ${scene.kind === 'match' ? renderMatchText(scene) : ''}
        <div class="scene-actions">
          <button type="button" class="nav-btn secondary" data-action="prev" ${state.currentScene > 0 ? '' : 'disabled'}>上一段</button>
          ${
            scene.kind === 'ending'
              ? '<button type="button" class="nav-btn primary" data-action="restart">从头再读</button>'
              : `<button type="button" class="nav-btn primary" data-action="complete">${scene.kind === 'match' ? '完成本局' : '继续'}</button>`
          }
          <button type="button" class="nav-btn secondary" data-action="next" ${
            state.currentScene < state.maxScene && state.currentScene < SCENES.length - 1 ? '' : 'disabled'
          }>下一段</button>
        </div>
      </article>
    </main>
  `;
  bindEvents();
}

function renderMatchText(scene) {
  const completed = state.completedMatches.includes(scene.id);
  return `
    <div class="story-text match-text">
      <p>${scene.matchTitle}：${scene.objective}</p>
      ${completed ? `<p>${scene.resultText}</p>` : ''}
    </div>
  `;
}

function bindEvents() {
  app.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'complete') completeCurrentScene();
      if (action === 'prev') goScene(state.currentScene - 1);
      if (action === 'next') goScene(state.currentScene + 1);
      if (action === 'restart') {
        state.currentScene = 0;
        saveState();
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

window.render_game_to_text = () =>
  JSON.stringify({
    type: 'narrative',
    currentScene: state.currentScene,
    maxScene: state.maxScene,
    sceneId: SCENES[state.currentScene].id,
    sceneTitle: SCENES[state.currentScene].title,
    sceneKind: SCENES[state.currentScene].kind,
    unlockedSouls: state.unlocked,
    completedMatches: state.completedMatches,
    finished: state.currentScene === SCENES.length - 1 && state.maxScene === SCENES.length - 1,
  });

window.advanceTime = () => {};

render();
