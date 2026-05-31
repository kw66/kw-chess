(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function c(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=c(s);fetch(s.href,r)}})();const L="kw-chess-save";function E(){try{const e=localStorage.getItem(L);return e?JSON.parse(e):null}catch{return null}}function k(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames};localStorage.setItem(L,JSON.stringify(t))}catch{}}function T(){const e=E();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,currentLevel:null}}function U(){let e=T();const t=new Set;function c(){return e}function a(n){const i=typeof n=="function"?n(e):n;e={...e,...i},t.forEach(o=>o(e))}function s(n){return t.add(n),()=>t.delete(n)}function r(n,i={}){switch(n){case"navigate":a({screen:i.screen});break;case"select-level":a({screen:"game",currentLevel:i.levelId});break;case"back-to-menu":a({screen:"menu",currentLevel:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:o}=i,d={...e.pieceUpgrades};d[o]?delete d[o]:d[o]=!0,a({pieceUpgrades:d}),k({...e,pieceUpgrades:d});break}case"game-result":{const{newStarBits:o,win:d}=i,p=e.currentLevel,u={...e.starsPerLevel};u[p]=(u[p]||0)|(o||0);const l={starsPerLevel:u,totalWins:e.totalWins+(d?1:0),totalGames:e.totalGames+1};a(l),k({...e,...l});break}default:console.warn(`[Store] 未知 action: ${n}`)}}return{getState:c,setState:a,subscribe:s,dispatch:r}}const y={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},$=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，无限连踩，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，击杀后连踩不停，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮无需炮架即可隔空轰击敌方棋子。"}]},{id:5,name:"自爆",desc:"八方移动，九宫自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可八方移动，同类合体增强，还能自爆与敌同归于尽。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],f=$.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function x(e){return f.find(t=>t.id===e)||null}const I=f.filter(e=>!e.freePlay).length;function P(e,t,c="md"){return`<div class="stars stars-${c}">
    ${t.map((a,s)=>`
      <span class="star ${e>>s&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>s&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function S(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function C(e){return Object.entries(e).reduce((t,[,c])=>t+S(c),0)}function A(){return f.reduce((e,t)=>e+t.stars.length,0)}function M(e){return f.filter(t=>t.freePlay?!1:((e[t.id]||0)&(t.winStarBit??1))!==0).length}function _(e,t){const c=f.find(r=>r.id===e);if(c!=null&&c.freePlay||e===1)return!0;const a=f.find(r=>r.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function j(e,t){const a=(t[e.id]||0)>>0&1;return`
    <button class="freeplay-card" data-select-level="${e.id}">
      <span class="freeplay-icon">♟</span>
      <span class="freeplay-label">自由对弈</span>
      <span class="freeplay-desc">${e.desc}</span>
      <span class="freeplay-star ${a?"star-earned":"star-empty"}" title="${e.stars[0].desc}">
        ${a?"★":"☆"}
      </span>
    </button>`}function K(e,t){const c=t[e.id]||0,a=_(e.id,t),s=(c&(e.winStarBit??1))!==0,r=a?"":"level-card-locked",n=s?"level-card-completed":"",i=e.pieces?e.pieces.map(o=>y[o]):e.piece?[y[e.piece]]:[];return`
    <button class="level-card ${r} ${n}"
            ${a?`data-select-level="${e.id}"`:"disabled"}>
      <div class="level-card-index">
        ${a?`<span class="level-num">${e.id}</span>`:'<span class="level-lock">🔒</span>'}
      </div>
      ${i.length?`<div class="level-card-pieces">${i.map(o=>`<span class="level-piece-icon">${o}</span>`).join("")}</div>`:""}
      <div class="level-card-info">
        <span class="level-card-name">${e.name}</span>
        <span class="level-card-desc">${e.desc}</span>
      </div>
      ${a?P(c,e.stars,"sm"):`<div class="stars stars-sm">${e.stars.map(()=>'<span class="star star-empty">☆</span>').join("")}</div>`}
    </button>`}function O(e,t){const c=e.levels.some(i=>_(i.id,t)),a=e.levels.reduce((i,o)=>i+S(t[o.id]||0),0),s=e.levels.reduce((i,o)=>i+o.stars.length,0),r=e.levels.filter(i=>i.freePlay),n=e.levels.filter(i=>!i.freePlay);return`
    <section class="tier-section ${c?"":"tier-locked"}">
      <div class="tier-header">
        <div class="tier-icon">${e.icon}</div>
        <div class="tier-info">
          <h2 class="tier-name">${e.name}</h2>
          <p class="tier-desc">${e.desc}</p>
        </div>
        <div class="tier-progress">
          <span class="tier-stars-count">★ ${a}/${s}</span>
        </div>
      </div>
      ${r.map(i=>j(i,t)).join("")}
      ${n.length?`
      <div class="tier-levels">
        ${n.map(i=>K(i,t)).join("")}
      </div>`:""}
    </section>`}function b(e){const t=C(e.starsPerLevel),c=A();return`
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
            <span class="progress-text">${M(e.starsPerLevel)} / ${I}</span>
            <span class="progress-label">通关</span>
          </div>
          <div class="progress-badge">
            <span class="progress-icon">★</span>
            <span class="progress-text">${t} / ${c}</span>
            <span class="progress-label">星星</span>
          </div>
        </div>
      </header>

      <!-- 关卡层级列表 -->
      <main class="home-content">
        ${$.map(s=>O(s,e.starsPerLevel)).join("")}

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
    </div>`}function R(e){return`
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
    </div>`}function H(e){return`
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
    </div>`}function G(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function N(e){return String(e).replace(/"/g,"&quot;")}function W(e,t){return t.map((c,a)=>{const s=e>>a&1;return`<div class="star-goal ${s?"star-goal-earned":""}">
      <span class="star-goal-icon">${s?"★":"☆"}</span>
      <span class="star-goal-desc">${c.desc}</span>
    </div>`}).join("")}function q(e){var a,s,r,n,i;const t=new URLSearchParams;t.set("levelId",e.id),(a=e.config)!=null&&a.noAi||(t.set("ai","1"),t.set("aiTime",String(((s=e.config)==null?void 0:s.aiTime)??500)));const c=((r=e.config)==null?void 0:r.mode)??"kw";if(t.set("mode",c),c==="classic"&&t.set("classic","1"),c!=="classic"){const o=((n=e.config)==null?void 0:n.playerUpgrades)||{},d=((i=e.config)==null?void 0:i.aiUpgrades)||{},p=Object.keys(o).filter(l=>o[l]).join(","),u=Object.keys(d).filter(l=>d[l]).join(",");p&&t.set("pu",p),u&&t.set("au",u)}return`./index-legacy.html?${t.toString()}`}function F(e){var u,l,m;const t=x(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const c=e.starsPerLevel[t.id]||0,a=G(c),s=t.stars.length,r=t.pieces?t.pieces.map(g=>y[g]).join(" "):t.piece?y[t.piece]:"",n=q(t),i=["","入门","初级","中级","高级"][((u=t.config)==null?void 0:u.aiLevel)??0]||"",o=!((l=t.config)!=null&&l.noAi)&&i,d=t.freePlay?'<span class="game-header-badge">自由对弈</span>':o?`<span class="game-header-badge game-header-ai">AI · ${i}</span>`:'<span class="game-header-badge">双人对局</span>',p=(m=t.tutorial)!=null&&m.length?t.tutorial[0].text:"";return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
        <div class="game-header-title">
          ${r?`<span class="game-header-piece">${r}</span>`:""}
          <div class="game-header-text">
            <span class="game-header-name">${t.name}</span>
            <span class="game-header-desc">${t.desc}</span>
          </div>
          ${d}
        </div>
        <div class="game-header-stars">
          ${t.stars.map((g,v)=>`<span class="star ${c>>v&1?"star-earned":"star-empty"}">${c>>v&1?"★":"☆"}</span>`).join("")}
          <span class="game-header-star-count">${a}/${s}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${n}"
            title="科王象棋对局"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${p?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${N(p)}">${p||"选择棋子查看走法"}</div>
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${W(c,t.stars)}
            </div>
            ${t.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
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
    </div>`}function J(e){switch(e.screen){case"menu":return b(e);case"levels":return R();case"upgrade":return H();case"game":return F(e);default:return b(e)}}function V(e){const t=U();function c(){const a=t.getState();e.dataset.screen=a.screen,e.innerHTML=J(a)}t.subscribe(c),e.addEventListener("click",a=>{const s=a.target;if(!(s instanceof HTMLElement))return;const r=s.closest("[data-navigate]");if(r){t.dispatch("navigate",{screen:r.dataset.navigate});return}const n=s.closest("[data-select-level]");if(n){const p=parseInt(n.dataset.selectLevel,10);isNaN(p)||t.dispatch("select-level",{levelId:p});return}if(s.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const o=s.closest("[data-action]");if(o){const p=o.dataset.action;if(p==="back-to-menu"||p==="back-to-levels"){t.dispatch(p);return}}const d=s.closest("[data-toggle-upgrade]");if(d){t.dispatch("toggle-upgrade",{pieceType:d.dataset.toggleUpgrade});return}}),window.addEventListener("message",a=>{if(!a.data)return;const s=t.getState();if(s.screen!=="game"||!s.currentLevel)return;const r=x(s.currentLevel);if(r){if(a.data.type==="piece-selected"){const n=document.getElementById("hint-display");if(!n)return;const i=a.data.hint;if(i)n.textContent=i,n.classList.remove("hint-empty");else{const o=n.dataset.default||"";n.textContent=o||"选择棋子查看走法",n.classList.toggle("hint-empty",!o)}return}if(a.data.type==="game-progress"){const n=a.data.stats||{},i=s.starsPerLevel[r.id]||0,o=document.getElementById("star-goal-list");if(o&&(o.innerHTML=r.stars.map((l,m)=>{const g=i>>m&1,v=!!(l.eval&&l.eval(n)),h=g||v;return`<div class="star-goal ${h?"star-goal-earned":""}">
            <span class="star-goal-icon">${h?"★":"☆"}</span>
            <span class="star-goal-desc">${l.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const l=a.data.redPct,m=100-l,g=document.getElementById("outer-red-pct"),v=document.getElementById("outer-blk-pct"),h=document.getElementById("outer-fill-red"),w=document.getElementById("outer-advantage");g&&(g.textContent=l+"%"),v&&(v.textContent=m+"%"),h&&(h.style.width=l+"%"),w&&a.data.advantage&&(w.textContent=a.data.advantage)}const d=document.getElementById("outer-cap-red"),p=document.getElementById("outer-cap-black");d&&a.data.capturedRed!==void 0&&(d.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(l=>`<span class="cap-item red">${l}</span>`).join(""):'<span class="cap-empty">—</span>'),p&&a.data.capturedBlack!==void 0&&(p.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(l=>`<span class="cap-item blk">${l}</span>`).join(""):'<span class="cap-empty">—</span>');const u=document.getElementById("outer-move-log");u&&a.data.moves!==void 0&&(a.data.moves.length===0?u.innerHTML='<span class="log-empty">对局尚未开始</span>':(u.innerHTML=a.data.moves.map(l=>`<div class="log-entry ${l.side==="red"?"log-red":"log-blk"}">${l.text}</div>`).join(""),u.scrollTop=u.scrollHeight));return}if(a.data.type==="game-end"){const n=a.data.stats||{};let i=0;r.stars.forEach((o,d)=>{o.eval&&o.eval(n)&&(i|=1<<d)}),t.dispatch("game-result",{newStarBits:i,win:!!n.win})}}}),c()}const B=document.querySelector("#app");if(!B)throw new Error("#app container not found");V(B);
