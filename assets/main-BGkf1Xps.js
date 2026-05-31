(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const B="kw-chess-save";function U(){try{const e=localStorage.getItem(B);return e?JSON.parse(e):null}catch{return null}}function S(e){try{const a={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames};localStorage.setItem(B,JSON.stringify(a))}catch{}}function C(){const e=U();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,currentLevel:null}}function A(){let e=C();const a=new Set;function s(){return e}function t(i){const c=typeof i=="function"?i(e):i;e={...e,...c},a.forEach(o=>o(e))}function n(i){return a.add(i),()=>a.delete(i)}function r(i,c={}){switch(i){case"navigate":t({screen:c.screen});break;case"select-level":t({screen:"game",currentLevel:c.levelId});break;case"back-to-menu":t({screen:"menu",currentLevel:null});break;case"back-to-levels":t({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:o}=c,l={...e.pieceUpgrades};l[o]?delete l[o]:l[o]=!0,t({pieceUpgrades:l}),S({...e,pieceUpgrades:l});break}case"game-result":{const{newStarBits:o,win:l}=c,p=e.currentLevel,u={...e.starsPerLevel};u[p]=(u[p]||0)|(o||0);const d={starsPerLevel:u,totalWins:e.totalWins+(l?1:0),totalGames:e.totalGames+1};t(d),S({...e,...d});break}default:console.warn(`[Store] 未知 action: ${i}`)}}return{getState:s,setState:t,subscribe:n,dispatch:r}}const b={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},I=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(a=>(e.typesMoved||[]).includes(a))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，无限连踩，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，击杀后连踩不停，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮无需炮架即可隔空轰击敌方棋子。"}]},{id:5,name:"自爆",desc:"八方移动，九宫自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可八方移动，同类合体增强，还能自爆与敌同归于尽。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var a;return(((a=e.redKillsByType)==null?void 0:a.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],g=I.flatMap(e=>e.levels.map(a=>({...a,tierId:e.id,tierName:e.name})));function E(e){return g.find(a=>a.id===e)||null}const M=g.filter(e=>!e.freePlay).length,w=[{levelId:2,piece:"rook",ability:"冲撞",tag:"运输"},{levelId:3,piece:"horse",ability:"连踩",tag:"追击"},{levelId:4,piece:"cannon",ability:"翻山",tag:"远袭"},{levelId:5,piece:"pawn",ability:"自爆",tag:"爆破"},{levelId:6,piece:"advisor",ability:"光波",tag:"出宫"},{levelId:7,piece:"bishop",ability:"地震",tag:"越河"},{levelId:8,piece:"king",ability:"亲征",tag:"帅攻"}];function j(e,a,s="md"){return`<div class="stars stars-${s}">
    ${a.map((t,n)=>`
      <span class="star ${e>>n&1?"star-earned":"star-empty"}"
            title="${t.desc}">
        ${e>>n&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function x(e){let a=0;for(;e;)a+=e&1,e>>=1;return a}function K(e){return Object.entries(e).reduce((a,[,s])=>a+x(s),0)}function O(){return g.reduce((e,a)=>e+a.stars.length,0)}function G(e){return g.filter(a=>a.freePlay?!1:((e[a.id]||0)&(a.winStarBit??1))!==0).length}function $(e,a){return((a[e.id]||0)&(e.winStarBit??1))!==0}function k(e,a){const s=g.find(r=>r.id===e);if(s!=null&&s.freePlay||e===1)return!0;const t=g.find(r=>r.id===e-1);return t?((a[e-1]||0)&(t.winStarBit??1))!==0:!0}function R(e){const a=g.filter(s=>!s.freePlay);return a.find(s=>k(s.id,e)&&!$(s,e))||g.find(s=>s.id===10)||a[0]}function H(e,a,s,t){const n=R(e.starsPerLevel),r=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局",i=g.find(c=>c.id===12)||g.find(c=>c.freePlay);return`
    <section class="home-command-panel" aria-label="今日开局">
      <div class="home-command-main">
        <div class="home-command-seal">帅</div>
        <div class="home-command-copy">
          <span class="home-command-kicker">今日开局</span>
          <h2 class="home-command-title">${n.name}</h2>
          <p class="home-command-desc">${n.desc}</p>
        </div>
      </div>
      <div class="home-command-stats">
        <div><span>${t}</span><em>通关</em></div>
        <div><span>${a}/${s}</span><em>星星</em></div>
        <div><span>${r}</span><em>胜率</em></div>
      </div>
      <div class="home-action-row">
        <button class="home-action-primary" data-select-level="${n.id}">
          <span>▶</span><b>继续挑战</b>
        </button>
        ${i?`
        <button class="home-action-secondary" data-select-level="${i.id}">
          <span>♚</span><b>自由对弈</b>
        </button>`:""}
      </div>
    </section>`}function N(e){return`
    <section class="home-codex-card" aria-label="觉醒图鉴">
      <div class="home-codex-head">
        <div>
          <strong>觉醒图鉴</strong>
          <span>看每枚棋子的拿手招</span>
        </div>
        <em>${w.filter(s=>{const t=g.find(n=>n.id===s.levelId);return t&&$(t,e)}).length}/${w.length}</em>
      </div>
      <div class="home-codex-rail">
        ${w.map(s=>{const t=g.find(o=>o.id===s.levelId),n=t?x(e[t.id]||0):0,r=(t==null?void 0:t.stars.length)||3,i=t?k(t.id,e):!1,c=t?$(t,e):!1;return`
            <button class="codex-token ${i?"is-unlocked":"is-locked"} ${c?"is-mastered":""}"
                    ${i&&t?`data-select-level="${t.id}"`:"disabled"}>
              <span class="codex-piece">${b[s.piece]}</span>
              <span class="codex-info">
                <b>${s.ability}</b>
                <small>${s.tag} · ★ ${n}/${r}</small>
              </span>
            </button>`}).join("")}
      </div>
    </section>`}function W(e,a){const t=(a[e.id]||0)>>0&1;return`
    <button class="freeplay-card" data-select-level="${e.id}">
      <span class="freeplay-icon">♟</span>
      <span class="freeplay-label">自由对弈</span>
      <span class="freeplay-desc">${e.desc}</span>
      <span class="freeplay-star ${t?"star-earned":"star-empty"}" title="${e.stars[0].desc}">
        ${t?"★":"☆"}
      </span>
    </button>`}function F(e,a){const s=a[e.id]||0,t=k(e.id,a),n=(s&(e.winStarBit??1))!==0,r=t?"":"level-card-locked",i=n?"level-card-completed":"",c=e.pieces?e.pieces.map(o=>b[o]):e.piece?[b[e.piece]]:[];return`
    <button class="level-card ${r} ${i}"
            ${t?`data-select-level="${e.id}"`:"disabled"}>
      <div class="level-card-index">
        ${t?`<span class="level-num">${e.id}</span>`:'<span class="level-lock">🔒</span>'}
      </div>
      ${c.length?`<div class="level-card-pieces">${c.map(o=>`<span class="level-piece-icon">${o}</span>`).join("")}</div>`:""}
      <div class="level-card-info">
        <span class="level-card-name">${e.name}</span>
        <span class="level-card-desc">${e.desc}</span>
      </div>
      ${t?j(s,e.stars,"sm"):`<div class="stars stars-sm">${e.stars.map(()=>'<span class="star star-empty">☆</span>').join("")}</div>`}
    </button>`}function q(e,a){const s=e.levels.some(c=>k(c.id,a)),t=e.levels.reduce((c,o)=>c+x(a[o.id]||0),0),n=e.levels.reduce((c,o)=>c+o.stars.length,0),r=e.levels.filter(c=>c.freePlay),i=e.levels.filter(c=>!c.freePlay);return`
    <section class="tier-section ${s?"":"tier-locked"}">
      <div class="tier-header">
        <div class="tier-icon">${e.icon}</div>
        <div class="tier-info">
          <h2 class="tier-name">${e.name}</h2>
          <p class="tier-desc">${e.desc}</p>
        </div>
        <div class="tier-progress">
          <span class="tier-stars-count">★ ${t}/${n}</span>
        </div>
      </div>
      ${r.map(c=>W(c,a)).join("")}
      ${i.length?`
      <div class="tier-levels">
        ${i.map(c=>F(c,a)).join("")}
      </div>`:""}
    </section>`}function _(e){const a=K(e.starsPerLevel),s=O(),t=G(e.starsPerLevel);return`
    <div class="home-page">
      <!-- 顶部栏 -->
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
          <span class="home-subtitle">觉醒棋子、合体战术、AI 对弈</span>
        </div>
        <div class="home-progress-area">
          <div class="progress-badge">
            <span class="progress-icon">📋</span>
            <span class="progress-text">${t} / ${M}</span>
            <span class="progress-label">通关</span>
          </div>
          <div class="progress-badge">
            <span class="progress-icon">★</span>
            <span class="progress-text">${a} / ${s}</span>
            <span class="progress-label">星星</span>
          </div>
        </div>
      </header>

      <!-- 关卡层级列表 -->
      <main class="home-content">
        ${H(e,a,s,t)}
        ${N(e.starsPerLevel)}
        ${I.map(n=>q(n,e.starsPerLevel)).join("")}

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
    </div>`}function D(e){return`
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
    </div>`}function J(e){return`
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
    </div>`}const T={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function V(e){let a=0;for(;e;)a+=e&1,e>>=1;return a}function X(e){return String(e).replace(/"/g,"&quot;")}function Y(e,a){return a.map((s,t)=>{const n=e>>t&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function z(e){var t,n;const a=((t=e.config)==null?void 0:t.mode)??"kw";if(a==="classic")return[];if(a==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([r,i])=>{i&&s.add(r)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(r=>s.add(r)),[...s].filter(r=>T[r])}function Q(e){const a=z(e);return a.length?`<div class="game-codex-mini">
    ${a.map(s=>{const t=T[s];return`<span class="game-codex-chip">
        <b>${t.icon}</b>
        <span>${t.name}<em>${t.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function Z(e){var t,n,r,i,c;const a=new URLSearchParams;a.set("levelId",e.id),(t=e.config)!=null&&t.noAi||(a.set("ai","1"),a.set("aiTime",String(((n=e.config)==null?void 0:n.aiTime)??500)));const s=((r=e.config)==null?void 0:r.mode)??"kw";if(a.set("mode",s),s==="classic"&&a.set("classic","1"),s!=="classic"){const o=((i=e.config)==null?void 0:i.playerUpgrades)||{},l=((c=e.config)==null?void 0:c.aiUpgrades)||{},p=Object.keys(o).filter(d=>o[d]).join(","),u=Object.keys(l).filter(d=>l[d]).join(",");p&&a.set("pu",p),u&&a.set("au",u)}return`./index-legacy.html?${a.toString()}`}function ee(e){var h,v,f,m;const a=E(e.currentLevel);if(!a)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[a.id]||0,t=V(s),n=a.stars.length,r=a.pieces?a.pieces.map(y=>b[y]).join(" "):a.piece?b[a.piece]:"",i=Z(a),c=["","入门","初级","中级","高级"][((h=a.config)==null?void 0:h.aiLevel)??0]||"",o=!((v=a.config)!=null&&v.noAi)&&c,l={classic:"传统",mixed:"觉醒",kw:"科王"}[((f=a.config)==null?void 0:f.mode)??"kw"]||"科王",p=a.freePlay?"双人":"红方",u=a.freePlay?'<span class="game-header-badge">自由对弈</span>':o?`<span class="game-header-badge game-header-ai">AI · ${c}</span>`:'<span class="game-header-badge">双人对局</span>',d=(m=a.tutorial)!=null&&m.length?a.tutorial[0].text:"";return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-header-title">
            ${r?`<span class="game-header-piece">${r}</span>`:""}
            <div class="game-header-text">
              <span class="game-header-name">${a.name}</span>
              <span class="game-header-desc">${a.desc}</span>
            </div>
            ${u}
          </div>
          <div class="game-header-stars">
            ${a.stars.map((y,L)=>`<span class="star ${s>>L&1?"star-earned":"star-empty"}">${s>>L&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${t}/${n}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${l}</span>
          <span class="game-status-chip">${o?`AI ${c}`:p}</span>
          <span class="game-status-chip">目标 ${t}/${n}</span>
          <span class="game-status-chip">${a.freePlay?"练习局":"闯关局"}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${i}"
            title="科王象棋对局"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${d?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${X(d)}">${d||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${Q(a)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${Y(s,a.stars)}
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
    </div>`}function ae(e){switch(e.screen){case"menu":return _(e);case"levels":return D();case"upgrade":return J();case"game":return ee(e);default:return _(e)}}function te(e){const a=A();function s(){const t=a.getState();e.dataset.screen=t.screen,e.innerHTML=ae(t)}a.subscribe(s),e.addEventListener("click",t=>{const n=t.target;if(!(n instanceof HTMLElement))return;const r=n.closest("[data-navigate]");if(r){a.dispatch("navigate",{screen:r.dataset.navigate});return}const i=n.closest("[data-select-level]");if(i){const p=parseInt(i.dataset.selectLevel,10);isNaN(p)||a.dispatch("select-level",{levelId:p});return}if(n.closest('[data-action="start-game"]')){a.dispatch("start-game");return}const o=n.closest("[data-action]");if(o){const p=o.dataset.action;if(p==="back-to-menu"||p==="back-to-levels"){a.dispatch(p);return}}const l=n.closest("[data-toggle-upgrade]");if(l){a.dispatch("toggle-upgrade",{pieceType:l.dataset.toggleUpgrade});return}}),window.addEventListener("message",t=>{if(!t.data)return;const n=a.getState();if(n.screen!=="game"||!n.currentLevel)return;const r=E(n.currentLevel);if(r){if(t.data.type==="piece-selected"){const i=document.getElementById("hint-display");if(!i)return;const c=t.data.hint;if(c)i.textContent=c,i.classList.remove("hint-empty");else{const o=i.dataset.default||"";i.textContent=o||"选择棋子查看走法",i.classList.toggle("hint-empty",!o)}return}if(t.data.type==="game-progress"){const i=t.data.stats||{},c=n.starsPerLevel[r.id]||0,o=document.getElementById("star-goal-list");if(o&&(o.innerHTML=r.stars.map((d,h)=>{const v=c>>h&1,f=!!(d.eval&&d.eval(i)),m=v||f;return`<div class="star-goal ${m?"star-goal-earned":""}">
            <span class="star-goal-icon">${m?"★":"☆"}</span>
            <span class="star-goal-desc">${d.desc}</span>
          </div>`}).join("")),t.data.redPct!==void 0){const d=t.data.redPct,h=100-d,v=document.getElementById("outer-red-pct"),f=document.getElementById("outer-blk-pct"),m=document.getElementById("outer-fill-red"),y=document.getElementById("outer-advantage");v&&(v.textContent=d+"%"),f&&(f.textContent=h+"%"),m&&(m.style.width=d+"%"),y&&t.data.advantage&&(y.textContent=t.data.advantage)}const l=document.getElementById("outer-cap-red"),p=document.getElementById("outer-cap-black");l&&t.data.capturedRed!==void 0&&(l.innerHTML=t.data.capturedRed.length?t.data.capturedRed.map(d=>`<span class="cap-item red">${d}</span>`).join(""):'<span class="cap-empty">—</span>'),p&&t.data.capturedBlack!==void 0&&(p.innerHTML=t.data.capturedBlack.length?t.data.capturedBlack.map(d=>`<span class="cap-item blk">${d}</span>`).join(""):'<span class="cap-empty">—</span>');const u=document.getElementById("outer-move-log");u&&t.data.moves!==void 0&&(t.data.moves.length===0?u.innerHTML='<span class="log-empty">对局尚未开始</span>':(u.innerHTML=t.data.moves.map(d=>`<div class="log-entry ${d.side==="red"?"log-red":"log-blk"}">${d.text}</div>`).join(""),u.scrollTop=u.scrollHeight));return}if(t.data.type==="game-end"){const i=t.data.stats||{};let c=0;r.stars.forEach((o,l)=>{o.eval&&o.eval(i)&&(c|=1<<l)}),a.dispatch("game-result",{newStarBits:c,win:!!i.win})}}}),s()}const P=document.querySelector("#app");if(!P)throw new Error("#app container not found");te(P);
