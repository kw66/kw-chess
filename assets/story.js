const STORAGE_KEY = 'kw_chess_story_progress_v3';

const SCENES = [
  {
    id: 'prologue',
    act: '序章',
    title: '八冠王',
    kind: 'story',
    quote: '那时，没人相信你会输。连你自己也不信。',
    body: [
      '你第一次夺冠时，还不到十八岁。',
      '决赛那天，对手是成名已久的老棋王。棋风厚重，最擅长把人拖进残局。你没有和他慢慢磨，而是在中盘主动变招，把整盘棋带进自己的节奏。',
      '第一次封王之后，掌声没有停过。第二冠，第三冠，第五冠，第八冠。八座冠军杯摆在棋院展柜里，灯光落下来，安静得像八枚棋子。',
      '人们说你是天才。老棋手说，你下棋时总能比别人早一步看见局势的去向。',
    ],
  },
  {
    id: 'ai-arrives',
    act: '第一幕',
    title: 'AI 时代',
    kind: 'story',
    art: {
      src: './assets/story-art/ai-era.webp',
      alt: '深夜机房里，屏幕上的棋盘被冷光照亮',
    },
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
    title: '人类代表',
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
    art: {
      src: './assets/story-art/human-vs-ai.webp',
      alt: '聚光灯下的人机大战棋桌',
    },
    matchTitle: '人机大战 1 / 10',
    objective: '坚持 30 回合、吃子 8 枚、或不败，满足任意一项即可推进。',
    resultText: '这一局你输了。可你至少看清了一件事：AI 不会失误，也不会被情绪拖慢。',
    quote: 'AI 的第一步很普通。普通到像一句问候。',
    body: [
      '棋盘另一侧没有人，只有屏幕亮着。',
      'AI 的第一步落下时，没有声音。那一步很普通，普通到像一句问候。',
      '中盘之后，局面开始失控。你的每一次长考都只能多争取一点可能，AI 却平静地拆掉所有变招。',
      '终局来临时，观众席先安静了几秒，随后响起掌声。掌声很大，却没有人真的轻松。',
    ],
  },
  {
    id: 'ten-games',
    act: '第二幕',
    title: '十番棋之后',
    kind: 'story',
    quote: '人长考，是犹豫。AI 长考，是它正在把最后的退路也算完。',
    body: [
      '后面的棋没有奇迹。',
      '你试过抢攻。AI 退一步，就把你的攻势带到更被动的位置。',
      '你试过缠斗。AI 不急不躁，把每一枚棋子都放到最别扭的位置。',
      '你试过弃子，试过脱离棋谱。可那些临场想出来的变化，很快都被它逐一拆掉。',
      '你不是第一次输棋。可这一次，输掉的不只是一盘棋。',
    ],
  },
  {
    id: 'broken',
    act: '第三幕',
    title: '信念崩塌',
    kind: 'story',
    art: {
      src: './assets/story-art/broken-vow.webp',
      alt: '棋盒被锁进柜中，冠军杯在暗处失去光泽',
    },
    quote: '过去的输棋，会让你想下一盘。这一次，你开始怀疑棋盘本身。',
    body: [
      '你最怕的不是输。',
      '你十几岁就开始下番棋，输过决赛，输过一步错手，也输过一整夜睡不着的棋。',
      '可这一次不一样。',
      '如果人类称作灵感的东西，只是机器暂时还没算到的分支，那你这些年到底在相信什么？',
      '你把棋盒锁进柜子。很长一段时间，棋院再没有人听见那只盒子打开的声音。',
    ],
  },
  {
    id: 'rook',
    act: '第四幕',
    title: '车魂初醒',
    kind: 'match',
    art: {
      src: './assets/story-art/rook-awakening.webp',
      alt: '雨夜棋盘上，红车浮起金色棋魂',
    },
    unlock: 'rook',
    matchTitle: '觉醒试炼：车',
    objective: '车觉醒：直线冲撞，撞开挡路棋子，把堵死的路线撞成突破口。',
    resultText: '红车震动的那一刻，你第一次明白：旧路走不通，就让棋魂替你撞开旧路。',
    quote: '木纹深处亮起一线赤金，像沉睡多年的魂魄终于睁眼。',
    body: [
      '雨夜里，你重新打开棋盒。窗外的雷声很远，像有人在黑暗里敲响另一副棋盘。',
      '你不是为了立刻复仇，也不是为了准备下一场比赛。你只是想确认，自己是否还能听见棋子的声音。',
      '红车落在掌心里。木纹已经被岁月磨得发亮，纹路却忽然像血脉一样一点点亮起。',
      '棋盘上的横线竖线微微发颤。你听见一声很轻的轮响，像有一辆看不见的战车从旧规则深处驶来。',
      '它不是催你向前，而是在提醒你：如果路被堵死，就让它撞开。',
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
    resultText: '马的第二步落下时，你看见 AI 的评估线第一次迟疑。它能计算落点，却计算不了那一瞬间的腾空。',
    quote: '马影从棋盘上跃起，像踏过风，又像踏过旧规则的影子。',
    body: [
      '车魂之后，你开始反复做一个梦。',
      '梦里有一匹马从九宫外跃起。它的蹄下没有格线，只有一圈圈被踏碎的光。',
      '第一步越过阻挡，第二步落到 AI 没算到的位置。梦醒时，你耳边还残着风声。',
      '你把马放在棋盘中央。它不再等待一条干净的马腿，棋盘上所有阻挡都像临时结成的雾。',
      '它要自己开路，也要把下一步从命运里踏出来。',
    ],
  },
  {
    id: 'cannon',
    act: '第五幕',
    title: '洲际导弹',
    kind: 'match',
    unlock: 'cannon',
    matchTitle: '觉醒试炼：炮',
    objective: '炮觉醒：可以从更远处施压，不再只等一个合适的炮架。',
    resultText: '炮声越过半盘棋。看似安全的后方，被一束从远处落下的火光照亮。',
    quote: '炮魂醒来时，棋盘深处响起一声闷雷。',
    body: [
      '第三枚棋子，你选了炮。',
      '你曾经以为炮最懂等待：等炮架，等对手失误，等一条线被清出来。',
      '但棋魂醒来之后，炮不再只是等待。棋盘上的棋子一枚枚浮出淡淡的影，像为它临时搭起通往远方的桥。',
      '它让威胁更早出现，也让 AI 以为安全的后方突然暴露在火力之下。',
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
    resultText: '一枚兵炸开之后，棋盘安静了很久。你终于看见，最小的棋子也能把命运炸出缺口。',
    quote: '兵魂不是王冠，而是一点不肯熄灭的火。',
    body: [
      '第四次觉醒来得最慢。',
      '你盯着兵看了很久。它太小了，小到过去所有棋谱都把它写成消耗品。',
      '可正因为它小，它最懂什么叫不能后退。',
      '当兵魂醒来，它没有变成王者。它只是往前一步，层层微光在棋身上叠起，然后把自己点燃。',
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
    resultText: '仕没有离开守护的位置，却让整个九宫像阵法一样亮了起来。',
    quote: '守护不只是挡在王前，也可以把黑暗切开。',
    body: [
      '第五枚棋魂醒在九宫里。',
      '你一直以为仕的命运就是守在王旁边，斜走一步，再斜走一步。',
      '直到 AI 把杀招压到宫门口。',
      '仕向斜线落下。九宫线像被无形的手重新描过，四道斜光从落点亮起，把贴近宫门的威胁直接切开。',
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
    resultText: '相越过河界时，你知道一条最古老的限制被震碎了。',
    quote: '不能过河，只是旧棋盘留下的边界；棋魂醒来时，河也会让路。',
    body: [
      '第六枚棋魂最沉默。',
      '相站在河边，过去的规则把它挡在自己半场。',
      '你问它：你真的不能过河吗？',
      '棋子没有回答。它只是向前落下。河界在那一刻泛起细密裂纹，十字形的震荡从落点扩散到更远的格子。',
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
    resultText: '你终于明白，真正的王不是永远不动，而是在必须向前时让整座九宫随自己起身。',
    quote: '帅魂醒来时，九宫不再是牢笼，而像一顶缓缓展开的冠。',
    body: [
      '六枚棋魂醒来后，你以为自己已经听懂了棋盘。',
      '直到帅在九宫里轻轻震了一下。宫线像水面一样荡开，所有棋子都在那一瞬间低低共鸣。',
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
    art: {
      src: './assets/story-art/soul-combo.webp',
      alt: '多枚觉醒棋魂在棋盘上连成战阵',
    },
    unlock: 'combo',
    matchTitle: '觉醒试炼：组合技',
    objective: '组合技觉醒：车的冲撞和兵的自爆连在一起，形成真正的新规则。',
    resultText: '这不再是一枚棋子的单独能力，而是一座由棋魂连成的新棋盘。',
    quote: '当不同魂光连在一起，你知道自己不只是在变强，而是在创造棋。',
    body: [
      '单独的能力已经不够。',
      'AI 仍然强大。它适应车，适应马，适应炮，也在适应每一次新的觉醒。',
      '你开始把棋魂连在一起。红车的轮声、兵魂的火、炮魂的雷、马影的风，在棋盘上交错成一张新的阵图。',
      '车推动兵，兵叠层，前线爆开，炮线接上，马从残阵里连踩而出。',
      '那一刻，棋盘不再只是多了几条特殊规则。每一种能力都开始呼应下一种能力，像一场终于成形的法阵。',
    ],
  },
  {
    id: 'final-ready',
    act: '终幕',
    title: '重回赛场',
    kind: 'story',
    art: {
      src: './assets/story-art/final-board.webp',
      alt: '终局赛场上，新棋盘在灯光下展开',
    },
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
    resultText: '第一局，你赢了。不是侥幸，不是险胜，而是新规则第一次正面击败旧规则。',
    quote: '观众席爆发出十番棋之后从未有过的欢呼。',
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
      '你知道，如果还有第三局，AI 会比刚才更接近你。它会继续复盘、模仿、训练，把每一次棋魂都变成新的样本。',
      '可这一次，胜负已经在它完全掌握之前结束。',
      '人类未必算得更深，但可以在旧规则走到尽头时，创造新的棋盘。',
      '这盘棋属于每一个被计算压到尽头之后，仍然想要重新落子的人。',
    ],
  },
];

const app = document.querySelector('#app');
const state = loadState();
let messageListenerBound = false;

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
      activeMatch: typeof saved.activeMatch === 'string' ? saved.activeMatch : null,
      matchResults: saved.matchResults && typeof saved.matchResults === 'object' ? saved.matchResults : {},
    };
  } catch {
    return { currentScene: 0, maxScene: 0, unlocked: [], completedMatches: [], activeMatch: null, matchResults: {} };
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
      activeMatch: state.activeMatch,
      matchResults: state.matchResults,
    }),
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isCurrentMatchActive(scene) {
  return scene.kind === 'match' && state.activeMatch === scene.id;
}

function isMatchCompleted(scene) {
  return scene.kind === 'match' && state.completedMatches.includes(scene.id);
}

function completeCurrentScene() {
  const scene = SCENES[state.currentScene];
  if (scene.kind === 'match' && !isMatchCompleted(scene)) {
    startMatch(scene);
    return;
  }
  if (scene.unlock && !state.unlocked.includes(scene.unlock)) {
    state.unlocked.push(scene.unlock);
  }
  if (scene.kind === 'match') state.activeMatch = null;
  if (state.currentScene < SCENES.length - 1) {
    state.currentScene += 1;
    state.maxScene = Math.max(state.maxScene, state.currentScene);
  }
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goScene(index) {
  if (state.activeMatch) postGameCommand('abort-ai');
  state.currentScene = clamp(index, 0, state.maxScene);
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
  const scene = SCENES[state.currentScene];
  const activeMatch = isCurrentMatchActive(scene);
  app.innerHTML = `
    <main class="shell">
      ${renderMobileStoryTrack()}
      <article class="story-panel${activeMatch ? ' is-playing' : ''}">
        <div class="story-content">
          ${activeMatch ? renderEmbeddedMatch(scene) : renderStoryScene(scene)}
        </div>
      </article>
      <div class="scene-actions">
        <button type="button" class="nav-btn secondary" data-action="prev" ${state.currentScene > 0 ? '' : 'disabled'}>上一段</button>
        ${
          scene.kind === 'ending'
            ? '<button type="button" class="nav-btn primary" data-action="restart">从头再读</button>'
            : `<button type="button" class="nav-btn primary" data-action="complete" ${activeMatch ? 'disabled' : ''}>${activeMatch ? '对局中' : getPrimaryActionLabel(scene)}</button>`
        }
        <button type="button" class="nav-btn secondary" data-action="next" ${
          state.currentScene < state.maxScene && state.currentScene < SCENES.length - 1 ? '' : 'disabled'
        }>下一段</button>
      </div>
    </main>
  `;
  bindEvents();
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scrollCurrentTrackItem);
  } else {
    scrollCurrentTrackItem();
  }
}

function renderMobileStoryTrack() {
  return `
    <section class="mobile-story-track" aria-label="剧情进度">
      <div class="mobile-track-title">
        <h2><span>${SCENES[state.currentScene].act}</span>${SCENES[state.currentScene].title}</h2>
        <p class="mobile-count">${state.currentScene + 1} / ${SCENES.length}</p>
      </div>
      <div class="track-scroll" role="list">
        ${SCENES.map((scene, index) => renderTrackItem(scene, index)).join('')}
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
    ${renderStoryArt(scene)}
    <div class="story-text">
      ${scene.body.map((paragraph, index) => `<p>${decorateParagraph(paragraph, index)}</p>`).join('')}
    </div>
    ${scene.kind === 'match' ? renderMatchText(scene) : ''}
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

function decorateParagraph(paragraph, index) {
  const marks = ['♟️', '🔥', '⚔️', '✨'];
  if (index === 0) return paragraph;
  if (index > 3) return paragraph;
  return `<span class="story-mark">${marks[(index - 1) % marks.length]}</span>${paragraph}`;
}

function renderMatchText(scene) {
  const completed = isMatchCompleted(scene);
  const retryText = getRetryText(scene);
  return `
    <div class="story-text match-text">
      <p>${scene.matchTitle}：${scene.objective}</p>
      ${completed ? `<p>${scene.resultText}</p>` : ''}
      ${!completed && retryText ? `<p class="retry-text">${retryText}</p>` : ''}
    </div>
  `;
}

function getPrimaryActionLabel(scene) {
  if (scene.kind !== 'match') return '继续';
  return isMatchCompleted(scene) ? '继续' : '开始对局';
}

function renderEmbeddedMatch(scene) {
  return `
    <div class="story-game-shell">
      <iframe
        id="story-game-frame"
        class="story-game-frame"
        src="${buildGameSrc(scene)}"
        title="${scene.matchTitle}"
        allow="fullscreen"
      ></iframe>
      <div class="story-game-actions">
        <button type="button" class="nav-btn secondary compact" data-game-command="restart">重开</button>
        <button type="button" class="nav-btn secondary compact" data-game-command="resign">认输</button>
        <button type="button" class="nav-btn secondary compact" data-action="exit-match">返回剧情</button>
      </div>
    </div>
  `;
}

function buildGameSrc(scene) {
  const params = new URLSearchParams();
  const config = getMatchConfig(scene.id);
  params.set('levelId', String(config.levelId));
  params.set('ai', '1');
  params.set('aiTime', String(config.aiTime || 4000));
  params.set('aiStrength', config.aiStrength || 'story');
  params.set('mode', config.mode);
  if (config.mode === 'classic') params.set('classic', '1');
  if (config.playerUpgrades && config.playerUpgrades.length) params.set('pu', config.playerUpgrades.join(','));
  if (config.aiUpgrades && config.aiUpgrades.length) params.set('au', config.aiUpgrades.join(','));
  return `./index-legacy.html?${params.toString()}`;
}

function getMatchConfig(sceneId) {
  const all = ['rook', 'cannon', 'horse', 'bishop', 'advisor', 'pawn', 'king'];
  const trial = (levelId, piece) => ({
    levelId,
    mode: 'mixed',
    aiTime: 4000,
    aiStrength: 'story',
    playerUpgrades: [piece],
    aiUpgrades: [],
  });
  const configs = {
    'match-one': { levelId: 101, mode: 'classic', aiTime: 4000, aiStrength: 'story', playerUpgrades: [], aiUpgrades: [] },
    rook: trial(102, 'rook'),
    horse: trial(103, 'horse'),
    cannon: trial(104, 'cannon'),
    pawn: trial(105, 'pawn'),
    advisor: trial(106, 'advisor'),
    bishop: trial(107, 'bishop'),
    king: { levelId: 108, mode: 'mixed', aiTime: 4000, aiStrength: 'story', playerUpgrades: ['rook', 'king'], aiUpgrades: [] },
    combo: { levelId: 109, mode: 'mixed', aiTime: 4000, aiStrength: 'story', playerUpgrades: ['rook', 'pawn'], aiUpgrades: [] },
    'final-one': { levelId: 110, mode: 'mixed', aiTime: 4000, aiStrength: 'story', playerUpgrades: all, aiUpgrades: [] },
    'final-two': { levelId: 111, mode: 'mixed', aiTime: 4000, aiStrength: 'story', playerUpgrades: all, aiUpgrades: ['rook', 'horse', 'pawn'] },
  };
  return configs[sceneId] || configs['match-one'];
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
  if (!state.completedMatches.includes(scene.id)) state.completedMatches.push(scene.id);
  if (scene.unlock && !state.unlocked.includes(scene.unlock)) state.unlocked.push(scene.unlock);
  saveState();
  render();
}

function matchGoalReached(scene, stats) {
  if (scene.id === 'match-one') {
    const kills = Object.values(stats?.redKillsByType || {}).reduce((sum, value) => sum + Math.max(0, Math.trunc(Number(value) || 0)), 0);
    return Math.max(0, Math.trunc(Number(stats?.totalMoves) || 0)) >= 30 || kills >= 8 || stats?.win || stats?.outcome === 'draw';
  }
  if (scene.id === 'final-one' || scene.id === 'final-two') return !!stats?.win;
  return !!stats?.complete;
}

function getRetryText(scene) {
  if (isMatchCompleted(scene)) return '';
  const result = state.matchResults[scene.id];
  if (!result) return '';
  if (scene.id === 'match-one') return '这一局还没撑到转折点，再试一次。';
  if (scene.id === 'final-one' || scene.id === 'final-two') return '这一局必须获胜，再来一次。';
  return '这次试炼没有完成，再来一次。';
}

function handleGameMessage(event) {
  if (!event.data || event.data.type !== 'game-end') return;
  const scene = SCENES[state.currentScene];
  if (!scene || scene.kind !== 'match' || state.activeMatch !== scene.id) return;
  completeMatchFromGame(scene, event.data.stats || {});
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
      if (action === 'restart') {
        if (state.activeMatch) postGameCommand('abort-ai');
        state.currentScene = 0;
        state.activeMatch = null;
        saveState();
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
