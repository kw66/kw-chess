(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const t of i)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?t.credentials="include":i.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(i){if(i.ep)return;i.ep=!0;const t=s(i);fetch(i.href,t)}})();const T="kw-chess-save";function j(){try{const e=localStorage.getItem(T);return e?JSON.parse(e):null}catch{return null}}function E(e){try{const a={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames};localStorage.setItem(T,JSON.stringify(a))}catch{}}function O(){const e=j();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,currentLevel:null}}function K(){let e=O();const a=new Set;function s(){return e}function n(c){const r=typeof c=="function"?c(e):c;e={...e,...r},a.forEach(o=>o(e))}function i(c){return a.add(c),()=>a.delete(c)}function t(c,r={}){switch(c){case"navigate":n({screen:r.screen});break;case"select-level":n({screen:"game",currentLevel:r.levelId});break;case"back-to-menu":n({screen:"menu",currentLevel:null});break;case"back-to-levels":n({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:o}=r,l={...e.pieceUpgrades};l[o]?delete l[o]:l[o]=!0,n({pieceUpgrades:l}),E({...e,pieceUpgrades:l});break}case"game-result":{const{newStarBits:o,win:l}=r,u=e.currentLevel,m={...e.starsPerLevel};m[u]=(m[u]||0)|(o||0);const g={starsPerLevel:m,totalWins:e.totalWins+(l?1:0),totalGames:e.totalGames+1};n(g),E({...e,...g});break}default:console.warn(`[Store] 未知 action: ${c}`)}}return{getState:s,setState:n,subscribe:i,dispatch:t}}const k={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},P=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(a=>(e.typesMoved||[]).includes(a))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，无限连踩，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，击杀后连踩不停，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮无需炮架即可隔空轰击敌方棋子。"}]},{id:5,name:"自爆",desc:"八方移动，九宫自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可八方移动，同类合体增强，还能自爆与敌同归于尽。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],v=P.flatMap(e=>e.levels.map(a=>({...a,tierId:e.id,tierName:e.name})));function U(e){return v.find(a=>a.id===e)||null}const H=v.filter(e=>!e.freePlay).length,$=[{levelId:2,piece:"rook",ability:"冲撞",tag:"运输",desc:"推动友方棋子改变站位，把关键棋子送进战场。"},{levelId:3,piece:"horse",ability:"连踩",tag:"追击",desc:"不再受马腿束缚，击杀后可以继续跳跃追击。"},{levelId:4,piece:"cannon",ability:"翻山",tag:"远袭",desc:"获得更自由的炮线压制，逼迫对手重新布阵。"},{levelId:5,piece:"pawn",ability:"自爆",tag:"爆破",desc:"八方移动并能引爆换子，小兵也能打出决定性破口。"},{levelId:6,piece:"advisor",ability:"光波",tag:"出宫",desc:"突破九宫限制，沿斜线发出远程威胁。"},{levelId:7,piece:"bishop",ability:"地震",tag:"越河",desc:"跨河参与进攻，用十字范围打乱敌方阵型。"},{levelId:8,piece:"king",ability:"亲征",tag:"帅攻",desc:"帅不再只是被保护的目标，也能主动出宫吃子。"}],G=[{piece:"rook",ability:"直线强攻",tag:"横竖直走",desc:"横竖直线不限格，是正面压制和残局进攻的核心。"},{piece:"horse",ability:"日字跳跃",tag:"注意蹩腿",desc:"先横或竖一步再斜走，路线灵活但会被马腿限制。"},{piece:"cannon",ability:"隔子打击",tag:"炮架吃子",desc:"移动像车，吃子必须隔一个棋子，适合制造远线威胁。"},{piece:"pawn",ability:"过河推进",tag:"小兵压阵",desc:"未过河只能向前，过河后可左右移动，越到后期越烦人。"},{piece:"advisor",ability:"九宫护卫",tag:"斜走一格",desc:"守在九宫内保护帅，防止中路和斜线被突破。"},{piece:"bishop",ability:"田字防线",tag:"不过河",desc:"走田字并受象眼限制，是后场防守的重要骨架。"},{piece:"king",ability:"九宫主将",tag:"帅将照面",desc:"只能在九宫内横竖一格，两帅不能在同一直线相对。"}],R=[{piece:"rook",extra:"帅",ability:"御驾亲征",tag:"车送帅出宫",desc:"用觉醒车运输觉醒帅，把主将变成主动进攻点。"},{piece:"rook",extra:"兵",ability:"快速运输",tag:"车送兵入阵",desc:"把叠兵快速送入敌阵，再用爆破制造突破。"},{piece:"king",extra:"全员",ability:"科王对决",tag:"全棋子觉醒",desc:"所有技巧同时登场，局面会更快进入连击和反杀。"}];function q(e,a,s="md"){return`<div class="stars stars-${s}">
    ${a.map((n,i)=>`
      <span class="star ${e>>i&1?"star-earned":"star-empty"}"
            title="${n.desc}">
        ${e>>i&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function _(e){let a=0;for(;e;)a+=e&1,e>>=1;return a}function N(e){return Object.entries(e).reduce((a,[,s])=>a+_(s),0)}function W(){return v.reduce((e,a)=>e+a.stars.length,0)}function D(e){return v.filter(a=>a.freePlay?!1:((e[a.id]||0)&(a.winStarBit??1))!==0).length}function A(e,a){return((a[e.id]||0)&(e.winStarBit??1))!==0}function w(e,a){const s=v.find(t=>t.id===e);if(s!=null&&s.freePlay||e===1)return!0;const n=v.find(t=>t.id===e-1);return n?((a[e-1]||0)&(n.winStarBit??1))!==0:!0}function F(e){const a=v.filter(s=>!s.freePlay);return a.find(s=>w(s.id,e)&&!A(s,e))||v.find(s=>s.id===10)||a[0]}function X(e){const a=F(e.starsPerLevel),s=v.find(n=>n.id===12)||v.find(n=>n.freePlay);return`
    <section class="home-command-panel" aria-label="今日开局">
      <div class="home-command-main">
        <div class="home-command-seal">帅</div>
        <div class="home-command-copy">
          <span class="home-command-kicker">今日开局</span>
          <h2 class="home-command-title">${a.name}</h2>
          <p class="home-command-desc">${a.desc}</p>
        </div>
      </div>
      <div class="home-action-row">
        <button class="home-action-primary" data-select-level="${a.id}">
          <span>▶</span><b>继续挑战</b>
        </button>
        ${s?`
        <button class="home-action-secondary" data-select-level="${s.id}">
          <span>♚</span><b>自由对弈</b>
        </button>`:""}
      </div>
    </section>`}function x(e,a){return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="false" aria-expanded="false">
    <b>${a}</b>
  </button>`}function J(e,a,s,n){const i=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局";return`
    <article class="home-modal-block author-card">
      <h3>作者</h3>
      <p><strong>落星峦</strong></p>
      <p>喜欢把熟悉规则改造成新系统，这次把象棋做成了觉醒棋子和 AI 对弈挑战。</p>
    </article>
    <article class="home-modal-block">
      <h3>项目地址</h3>
      <p><a href="https://github.com/kw66/kw-chess" target="_blank" rel="noreferrer">github.com/kw66/kw-chess</a></p>
    </article>
    <article class="home-modal-block">
      <h3>其他游戏推荐</h3>
      <div class="recommend-list">
        <a href="https://kw66.github.io/photo-hero/" target="_blank" rel="noreferrer">图片勇者</a>
        <a href="https://kw66.github.io/PhD_Simulator/" target="_blank" rel="noreferrer">研究生模拟器</a>
      </div>
    </article>
    <article class="home-modal-block">
      <h3>游玩统计</h3>
      <div class="modal-stat-grid">
        <div><b>${n}/${H}</b><span>通关</span></div>
        <div><b>${a}/${s}</b><span>星星</span></div>
        <div><b>${e.totalGames||0}</b><span>对局</span></div>
        <div><b>${i}</b><span>胜率</span></div>
      </div>
    </article>`}function L(e,a,s=""){const n=e.levelId?v.find(l=>l.id===e.levelId):null,i=n?_(a[n.id]||0):null,t=(n==null?void 0:n.stars.length)||null,c=n?w(n.id,a):!0,r=k[e.piece]||e.piece,o=e.extra?`<span class="modal-codex-extra">${e.extra}</span>`:"";return`
    <article class="modal-codex-card ${s} ${c?"is-unlocked":"is-locked"}">
      <div class="modal-codex-head">
        <span class="modal-codex-piece">${r}</span>
        ${o}
        <div>
          <strong>${e.ability}</strong>
          <em>${e.tag}${i!==null?` · ★ ${i}/${t}`:""}</em>
        </div>
      </div>
      <p>${e.desc}</p>
    </article>`}function V(e){return`
    <div class="codex-overview">
      <div class="codex-progress-pill"><b>${$.filter(s=>{const n=v.find(i=>i.id===s.levelId);return n&&A(n,e)}).length}/${$.length}</b><span>觉醒掌握</span></div>
      <p>先看棋子能力，再回关卡里试招。传统走法、觉醒能力和组合技分开列出，避免边下边猜。</p>
    </div>
    <div class="codex-tab-row" aria-label="图鉴分类">
      <span>觉醒棋子</span>
      <span>组合技</span>
      <span>传统走法</span>
    </div>
    <section class="modal-codex-section">
      <h3>觉醒棋子</h3>
      <div class="modal-codex-grid">
        ${$.map(s=>L(s,e)).join("")}
      </div>
    </section>
    <section class="modal-codex-section">
      <h3>组合技</h3>
      <div class="modal-codex-grid compact-grid">
        ${R.map(s=>L(s,e,"combo-card")).join("")}
      </div>
    </section>
    <section class="modal-codex-section">
      <h3>传统走法</h3>
      <div class="modal-codex-grid">
        ${G.map(s=>L(s,e,"basic-card")).join("")}
      </div>
    </section>`}function Y(){return`
    <article class="home-modal-block settings-block">
      <h3>声音</h3>
      <label class="setting-row">
        <span><b>背景音乐</b><small>预留设置，暂不影响当前版本</small></span>
        <input type="range" min="0" max="100" value="45" aria-label="背景音乐音量">
      </label>
      <label class="setting-row">
        <span><b>音效</b><small>落子、吃子、提示音</small></span>
        <input type="range" min="0" max="100" value="70" aria-label="音效音量">
      </label>
    </article>
    <article class="home-modal-block settings-block">
      <h3>AI 强度</h3>
      <div class="setting-segment" role="group" aria-label="AI 强度">
        <button type="button">入门</button>
        <button type="button">初级</button>
        <button class="is-active" type="button">中级</button>
        <button type="button">高级</button>
      </div>
      <p class="setting-note">当前只是界面预设，关卡 AI 强度仍由关卡规则决定。</p>
    </article>`}function S(e,a,s){return`
    <div class="home-modal" id="home-panel-${e}" data-home-modal="${e}" hidden>
      <section class="home-sheet" role="dialog" aria-modal="true" aria-labelledby="home-panel-title-${e}">
        <header class="home-sheet-head">
          <div>
            <h2 id="home-panel-title-${e}">${a}</h2>
          </div>
          <button class="home-sheet-close" type="button" data-close-home-panel>收起</button>
        </header>
        <div class="home-sheet-body">
          ${s}
        </div>
      </section>
    </div>`}function z(e,a,s,n){return`
    ${S("author","游戏信息",J(e,a,s,n))}
    ${S("codex","棋子图鉴",V(e.starsPerLevel))}
    ${S("settings","设置",Y())}`}function Q(e,a){const n=(a[e.id]||0)>>0&1;return`
    <button class="freeplay-card" data-select-level="${e.id}">
      <span class="freeplay-icon">♟</span>
      <span class="freeplay-label">自由对弈</span>
      <span class="freeplay-desc">${e.desc}</span>
      <span class="freeplay-star ${n?"star-earned":"star-empty"}" title="${e.stars[0].desc}">
        ${n?"★":"☆"}
      </span>
    </button>`}function Z(e,a){const s=a[e.id]||0,n=w(e.id,a),i=(s&(e.winStarBit??1))!==0,t=n?"":"level-card-locked",c=i?"level-card-completed":"",r=e.pieces?e.pieces.map(o=>k[o]):e.piece?[k[e.piece]]:[];return`
    <button class="level-card ${t} ${c}"
            ${n?`data-select-level="${e.id}"`:"disabled"}>
      <div class="level-card-index">
        ${n?`<span class="level-num">${e.id}</span>`:'<span class="level-lock">🔒</span>'}
      </div>
      ${r.length?`<div class="level-card-pieces">${r.map(o=>`<span class="level-piece-icon">${o}</span>`).join("")}</div>`:""}
      <div class="level-card-info">
        <span class="level-card-name">${e.name}</span>
        <span class="level-card-desc">${e.desc}</span>
      </div>
      ${n?q(s,e.stars,"sm"):`<div class="stars stars-sm">${e.stars.map(()=>'<span class="star star-empty">☆</span>').join("")}</div>`}
    </button>`}function ee(e,a){const s=e.levels.some(r=>w(r.id,a)),n=e.levels.reduce((r,o)=>r+_(a[o.id]||0),0),i=e.levels.reduce((r,o)=>r+o.stars.length,0),t=e.levels.filter(r=>r.freePlay),c=e.levels.filter(r=>!r.freePlay);return`
    <section class="tier-section ${s?"":"tier-locked"}">
      <div class="tier-header">
        <div class="tier-icon">${e.icon}</div>
        <div class="tier-info">
          <h2 class="tier-name">${e.name}</h2>
          <p class="tier-desc">${e.desc}</p>
        </div>
        <div class="tier-progress">
          <span class="tier-stars-count">★ ${n}/${i}</span>
        </div>
      </div>
      ${t.map(r=>Q(r,a)).join("")}
      ${c.length?`
      <div class="tier-levels">
        ${c.map(r=>Z(r,a)).join("")}
      </div>`:""}
    </section>`}function I(e){const a=N(e.starsPerLevel),s=W(),n=D(e.starsPerLevel);return`
    <div class="home-page">
      <!-- 顶部栏 -->
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${x("author","游戏信息")}
          ${x("codex","棋子图鉴")}
          ${x("settings","设置")}
        </nav>
      </header>

      <!-- 关卡层级列表 -->
      <main class="home-content">
        ${X(e)}
        ${P.map(i=>ee(i,e.starsPerLevel)).join("")}

        <!-- 挑战模式预告 -->
        <section class="tier-section tier-coming">
          <div class="tier-header">
            <div class="tier-icon">🔮</div>
            <div class="tier-info">
              <h2 class="tier-name">挑战模式</h2>
              <p class="tier-desc">敬请期待</p>
            </div>
          </div>
        </section>
      </main>
      ${z(e,a,s,n)}
    </div>`}function ae(e){return`
    <div class="levels-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡选择</h2>
      </div>
      <div class="page-body">
        <p style="color: var(--text-soft); text-align: center; margin-top: 80px;">
          关卡选择页面开发中...
        </p>
      </div>
    </div>`}function te(e){return`
    <div class="upgrade-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-levels">&larr; 返回</button>
        <h2 class="page-title">备战</h2>
      </div>
      <div class="page-body">
        <p style="color: var(--text-soft); text-align: center; margin-top: 80px;">
          棋子升级页面开发中...
        </p>
      </div>
    </div>`}const C={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function se(e){let a=0;for(;e;)a+=e&1,e>>=1;return a}function ne(e){return String(e).replace(/"/g,"&quot;")}function ie(e,a){return a.map((s,n)=>{const i=e>>n&1;return`<div class="star-goal ${i?"star-goal-earned":""}">
      <span class="star-goal-icon">${i?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function ce(e){var n,i;const a=((n=e.config)==null?void 0:n.mode)??"kw";if(a==="classic")return[];if(a==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((i=e.config)==null?void 0:i.playerUpgrades)||{}).forEach(([t,c])=>{c&&s.add(t)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(t=>s.add(t)),[...s].filter(t=>C[t])}function re(e){const a=ce(e);return a.length?`<div class="game-codex-mini">
    ${a.map(s=>{const n=C[s];return`<span class="game-codex-chip">
        <b>${n.icon}</b>
        <span>${n.name}<em>${n.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function oe(e){var n,i,t,c,r;const a=new URLSearchParams;a.set("levelId",e.id),(n=e.config)!=null&&n.noAi||(a.set("ai","1"),a.set("aiTime",String(((i=e.config)==null?void 0:i.aiTime)??500)));const s=((t=e.config)==null?void 0:t.mode)??"kw";if(a.set("mode",s),s==="classic"&&a.set("classic","1"),s!=="classic"){const o=((c=e.config)==null?void 0:c.playerUpgrades)||{},l=((r=e.config)==null?void 0:r.aiUpgrades)||{},u=Object.keys(o).filter(g=>o[g]).join(","),m=Object.keys(l).filter(g=>l[g]).join(",");u&&a.set("pu",u),m&&a.set("au",m)}return`./index-legacy.html?${a.toString()}`}function le(e){var p,d,y,h;const a=U(e.currentLevel);if(!a)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[a.id]||0,n=se(s),i=a.stars.length,t=a.pieces?a.pieces.map(b=>k[b]).join(" "):a.piece?k[a.piece]:"",c=oe(a),r=["","入门","初级","中级","高级"][((p=a.config)==null?void 0:p.aiLevel)??0]||"",o=!((d=a.config)!=null&&d.noAi)&&r,l={classic:"传统",mixed:"觉醒",kw:"科王"}[((y=a.config)==null?void 0:y.mode)??"kw"]||"科王",u=a.freePlay?"双人":"红方",m=a.freePlay?'<span class="game-header-badge">自由对弈</span>':o?`<span class="game-header-badge game-header-ai">AI · ${r}</span>`:'<span class="game-header-badge">双人对局</span>',g=(h=a.tutorial)!=null&&h.length?a.tutorial[0].text:"";return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-header-title">
            ${t?`<span class="game-header-piece">${t}</span>`:""}
            <div class="game-header-text">
              <span class="game-header-name">${a.name}</span>
              <span class="game-header-desc">${a.desc}</span>
            </div>
            ${m}
          </div>
          <div class="game-header-stars">
            ${a.stars.map((b,f)=>`<span class="star ${s>>f&1?"star-earned":"star-empty"}">${s>>f&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${n}/${i}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${l}</span>
          <span class="game-status-chip">${o?`AI ${r}`:u}</span>
          <span class="game-status-chip">目标 ${n}/${i}</span>
          <span class="game-status-chip">${a.freePlay?"练习局":"闯关局"}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${c}"
            title="科王象棋对局"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${g?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${ne(g)}">${g||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${re(a)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${ie(s,a.stars)}
            </div>
            ${a.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
          </div>

          <!-- 3. 胜率（仅有 AI 时显示） -->
          ${o?`
          <div class="info-section panel-winrate">
            <div class="info-section-title">胜率</div>
            <div class="winrate-wrap">
              <div class="winrate-labels">
                <span class="wr-red" id="outer-red-pct">50%</span>
                <span class="wr-center">红 ↔ 黑</span>
                <span class="wr-blk" id="outer-blk-pct">50%</span>
              </div>
              <div class="winrate-bar">
                <div class="winrate-fill-red" id="outer-fill-red" style="width:50%"></div>
              </div>
              <div class="winrate-advantage" id="outer-advantage">均势</div>
            </div>
          </div>`:""}

          <!-- 4. 损失棋子 -->
          <div class="info-section panel-captures">
            <div class="info-section-title">损失棋子</div>
            <div class="cap-rows">
              <div class="cap-row">
                <span class="cap-row-label red">红</span>
                <div class="cap-list" id="outer-cap-red"><span class="cap-empty">—</span></div>
              </div>
              <div class="cap-row">
                <span class="cap-row-label blk">黑</span>
                <div class="cap-list" id="outer-cap-black"><span class="cap-empty">—</span></div>
              </div>
            </div>
          </div>

          <!-- 5. 历史步骤 -->
          <div class="info-section panel-history">
            <div class="info-section-title">历史步骤</div>
            <div class="move-log" id="outer-move-log">
              <span class="log-empty">对局尚未开始</span>
            </div>
          </div>

        </div>
      </div>
    </div>`}function de(e){switch(e.screen){case"menu":return I(e);case"levels":return ae();case"upgrade":return te();case"game":return le(e);default:return I(e)}}function pe(e){const a=K();function s(){const t=a.getState();e.dataset.screen=t.screen,e.innerHTML=de(t)}a.subscribe(s);function n(){e.querySelectorAll(".home-modal").forEach(t=>{t.hidden=!0}),e.querySelectorAll("[data-home-panel]").forEach(t=>{t.setAttribute("aria-pressed","false"),t.setAttribute("aria-expanded","false")})}function i(t){n();const c=e.querySelector(`[data-home-modal="${t}"]`);if(!c)return;c.hidden=!1;const r=e.querySelector(`[data-home-panel="${t}"]`);r instanceof HTMLElement&&(r.setAttribute("aria-pressed","true"),r.setAttribute("aria-expanded","true"));const o=c.querySelector("[data-close-home-panel]");o instanceof HTMLElement&&o.focus({preventScroll:!0})}e.addEventListener("click",t=>{const c=t.target;if(!(c instanceof HTMLElement))return;const r=c.closest("[data-home-panel]");if(r){const p=r.dataset.homePanel,d=e.querySelector(`[data-home-modal="${p}"]`);d instanceof HTMLElement&&!d.hidden?n():i(p);return}if(c.closest("[data-close-home-panel]")||c.classList.contains("home-modal")){n();return}const o=c.closest("[data-navigate]");if(o){a.dispatch("navigate",{screen:o.dataset.navigate});return}const l=c.closest("[data-select-level]");if(l){const p=parseInt(l.dataset.selectLevel,10);isNaN(p)||a.dispatch("select-level",{levelId:p});return}if(c.closest('[data-action="start-game"]')){a.dispatch("start-game");return}const m=c.closest("[data-action]");if(m){const p=m.dataset.action;if(p==="back-to-menu"||p==="back-to-levels"){a.dispatch(p);return}}const g=c.closest("[data-toggle-upgrade]");if(g){a.dispatch("toggle-upgrade",{pieceType:g.dataset.toggleUpgrade});return}}),window.addEventListener("keydown",t=>{t.key==="Escape"&&n()}),window.addEventListener("message",t=>{if(!t.data)return;const c=a.getState();if(c.screen!=="game"||!c.currentLevel)return;const r=U(c.currentLevel);if(r){if(t.data.type==="piece-selected"){const o=document.getElementById("hint-display");if(!o)return;const l=t.data.hint;if(l)o.textContent=l,o.classList.remove("hint-empty");else{const u=o.dataset.default||"";o.textContent=u||"选择棋子查看走法",o.classList.toggle("hint-empty",!u)}return}if(t.data.type==="game-progress"){const o=t.data.stats||{},l=c.starsPerLevel[r.id]||0,u=document.getElementById("star-goal-list");if(u&&(u.innerHTML=r.stars.map((d,y)=>{const h=l>>y&1,b=!!(d.eval&&d.eval(o)),f=h||b;return`<div class="star-goal ${f?"star-goal-earned":""}">
            <span class="star-goal-icon">${f?"★":"☆"}</span>
            <span class="star-goal-desc">${d.desc}</span>
          </div>`}).join("")),t.data.redPct!==void 0){const d=t.data.redPct,y=100-d,h=document.getElementById("outer-red-pct"),b=document.getElementById("outer-blk-pct"),f=document.getElementById("outer-fill-red"),B=document.getElementById("outer-advantage");h&&(h.textContent=d+"%"),b&&(b.textContent=y+"%"),f&&(f.style.width=d+"%"),B&&t.data.advantage&&(B.textContent=t.data.advantage)}const m=document.getElementById("outer-cap-red"),g=document.getElementById("outer-cap-black");m&&t.data.capturedRed!==void 0&&(m.innerHTML=t.data.capturedRed.length?t.data.capturedRed.map(d=>`<span class="cap-item red">${d}</span>`).join(""):'<span class="cap-empty">—</span>'),g&&t.data.capturedBlack!==void 0&&(g.innerHTML=t.data.capturedBlack.length?t.data.capturedBlack.map(d=>`<span class="cap-item blk">${d}</span>`).join(""):'<span class="cap-empty">—</span>');const p=document.getElementById("outer-move-log");p&&t.data.moves!==void 0&&(t.data.moves.length===0?p.innerHTML='<span class="log-empty">对局尚未开始</span>':(p.innerHTML=t.data.moves.map(d=>`<div class="log-entry ${d.side==="red"?"log-red":"log-blk"}">${d.text}</div>`).join(""),p.scrollTop=p.scrollHeight));return}if(t.data.type==="game-end"){const o=t.data.stats||{};let l=0;r.stars.forEach((u,m)=>{u.eval&&u.eval(o)&&(l|=1<<m)}),a.dispatch("game-result",{newStarBits:l,win:!!o.win})}}}),s()}const M=document.querySelector("#app");if(!M)throw new Error("#app container not found");pe(M);
