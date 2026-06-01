(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const L={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},V="https://ypefmpeekfucmarbbdov.supabase.co",G="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",g={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day"};function w(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function Y(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0}}function X(e){const t=e&&typeof e=="object"?e:{};return{totalPv:w(t.totalPv),totalUv:w(t.totalUv),totalGames:w(t.totalGames),todayPv:w(t.todayPv),todayUv:w(t.todayUv),todayGames:w(t.todayGames)}}async function W(){const e=R();return e&&await z(),{stats:await C(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function Z(){if(!R())return{stats:await C(),status:"本地预览不会写入全站统计。"};const e=P();return await Promise.all([S(g.totalGames),S(x(g.dailyGamesPrefix,e))]),{stats:await C(),status:"游玩局数已同步。"}}async function z(){const e=P();await Promise.all([S(g.totalPv),S(x(g.dailyPvPrefix,e))]);const t=localStorage.getItem(L.statsVisitor)==="true",s=localStorage.getItem(L.statsLastUvDate),a=[];t||(a.push(S(g.totalUv)),localStorage.setItem(L.statsVisitor,"true")),s!==e&&(a.push(S(x(g.dailyUvPrefix,e))),localStorage.setItem(L.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function C(){const e=P(),t=x(g.dailyPvPrefix,e),s=x(g.dailyUvPrefix,e),a=x(g.dailyGamesPrefix,e),i=await Q([g.totalPv,g.totalUv,g.totalGames,t,s,a]);return X({totalPv:i[g.totalPv],totalUv:i[g.totalUv],totalGames:i[g.totalGames],todayPv:i[t],todayUv:i[s],todayGames:i[a]})}async function S(e){return N("increment_counter",{counter_id:e})}async function Q(e){const t=await N("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=w(a.count));return s}async function N(e,t){const s=await fetch(`${V}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:G,Authorization:`Bearer ${G}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function R(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function x(e,t=P()){return`${e}_${t.replaceAll("-","")}`}function P(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const K="kw-chess-save";function ee(){try{const e=localStorage.getItem(K);return e?JSON.parse(e):null}catch{return null}}function O(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames};localStorage.setItem(K,JSON.stringify(t))}catch{}}function te(){const e=ee();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,usageStats:Y(),usageStatsStatus:"全站统计读取中。",currentLevel:null}}function ae(){let e=te();const t=new Set;function s(){return e}function a(o){const r=typeof o=="function"?o(e):o;e={...e,...r},t.forEach(c=>c(e))}function i(o){return t.add(o),()=>t.delete(o)}function n(o,r={}){switch(o){case"navigate":a({screen:r.screen});break;case"usage-stats-updated":a({usageStats:r.stats??e.usageStats,usageStatsStatus:r.status??e.usageStatsStatus});break;case"select-level":a({screen:"game",currentLevel:r.levelId});break;case"back-to-menu":a({screen:"menu",currentLevel:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:c}=r,l={...e.pieceUpgrades};l[c]?delete l[c]:l[c]=!0,a({pieceUpgrades:l}),O({...e,pieceUpgrades:l});break}case"game-result":{const{newStarBits:c,win:l}=r,d=e.currentLevel,u={...e.starsPerLevel};u[d]=(u[d]||0)|(c||0);const v={starsPerLevel:u,totalWins:e.totalWins+(l?1:0),totalGames:e.totalGames+1};a(v),O({...e,...v});break}default:console.warn(`[Store] 未知 action: ${o}`)}}return{getState:s,setState:a,subscribe:i,dispatch:n}}const _={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},D=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，无限连踩，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，击杀后连踩不停，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮无需炮架即可隔空轰击敌方棋子。"}]},{id:5,name:"自爆",desc:"八方移动，九宫自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可八方移动，同类合体增强，还能自爆与敌同归于尽。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],f=D.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function H(e){return f.find(t=>t.id===e)||null}const se=f.filter(e=>!e.freePlay).length,U=[{levelId:2,piece:"rook",ability:"冲撞",tag:"运输",desc:"推动友方棋子改变站位，把关键棋子送进战场。"},{levelId:3,piece:"horse",ability:"连踩",tag:"追击",desc:"不再受马腿束缚，击杀后可以继续跳跃追击。"},{levelId:4,piece:"cannon",ability:"翻山",tag:"远袭",desc:"获得更自由的炮线压制，逼迫对手重新布阵。"},{levelId:5,piece:"pawn",ability:"自爆",tag:"爆破",desc:"八方移动并能引爆换子，小兵也能打出决定性破口。"},{levelId:6,piece:"advisor",ability:"光波",tag:"出宫",desc:"突破九宫限制，沿斜线发出远程威胁。"},{levelId:7,piece:"bishop",ability:"地震",tag:"越河",desc:"跨河参与进攻，用十字范围打乱敌方阵型。"},{levelId:8,piece:"king",ability:"亲征",tag:"帅攻",desc:"帅不再只是被保护的目标，也能主动出宫吃子。"}],ne=[{piece:"rook",ability:"直线强攻",tag:"横竖直走",desc:"横竖直线不限格，是正面压制和残局进攻的核心。"},{piece:"horse",ability:"日字跳跃",tag:"注意蹩腿",desc:"先横或竖一步再斜走，路线灵活但会被马腿限制。"},{piece:"cannon",ability:"隔子打击",tag:"炮架吃子",desc:"移动像车，吃子必须隔一个棋子，适合制造远线威胁。"},{piece:"pawn",ability:"过河推进",tag:"小兵压阵",desc:"未过河只能向前，过河后可左右移动，越到后期越烦人。"},{piece:"advisor",ability:"九宫护卫",tag:"斜走一格",desc:"守在九宫内保护帅，防止中路和斜线被突破。"},{piece:"bishop",ability:"田字防线",tag:"不过河",desc:"走田字并受象眼限制，是后场防守的重要骨架。"},{piece:"king",ability:"九宫主将",tag:"帅将照面",desc:"只能在九宫内横竖一格，两帅不能在同一直线相对。"}],ie=[{piece:"rook",extra:"帅",ability:"御驾亲征",tag:"车送帅出宫",desc:"用觉醒车运输觉醒帅，把主将变成主动进攻点。"},{piece:"rook",extra:"兵",ability:"快速运输",tag:"车送兵入阵",desc:"把叠兵快速送入敌阵，再用爆破制造突破。"},{piece:"king",extra:"全员",ability:"科王对决",tag:"全棋子觉醒",desc:"所有技巧同时登场，局面会更快进入连击和反杀。"}];function oe(e,t,s="md"){return`<div class="stars stars-${s}">
    ${t.map((a,i)=>`
      <span class="star ${e>>i&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>i&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function A(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function re(e){return Object.entries(e).reduce((t,[,s])=>t+A(s),0)}function ce(){return f.reduce((e,t)=>e+t.stars.length,0)}function le(e){return f.filter(t=>t.freePlay?!1:((e[t.id]||0)&(t.winStarBit??1))!==0).length}function J(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function I(e,t){const s=f.find(n=>n.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=f.find(n=>n.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function de(e){const t=f.filter(s=>!s.freePlay);return t.find(s=>I(s.id,e)&&!J(s,e))||f.find(s=>s.id===10)||t[0]}function pe(e){const t=de(e.starsPerLevel),s=f.find(a=>a.id===12)||f.find(a=>a.freePlay);return`
    <section class="home-command-panel" aria-label="今日开局">
      <div class="home-command-main">
        <div class="home-command-seal">帅</div>
        <div class="home-command-copy">
          <span class="home-command-kicker">今日开局</span>
          <h2 class="home-command-title">${t.name}</h2>
          <p class="home-command-desc">${t.desc}</p>
        </div>
      </div>
      <div class="home-action-row">
        <button class="home-action-primary" data-select-level="${t.id}">
          <span>▶</span><b>继续挑战</b>
        </button>
        ${s?`
        <button class="home-action-secondary" data-select-level="${s.id}">
          <span>♚</span><b>自由对弈</b>
        </button>`:""}
      </div>
    </section>`}function T(e,t){return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="false" aria-expanded="false">
    <b>${t}</b>
  </button>`}function $(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function ue(e,t,s,a){const i=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局",n=e.usageStats||{};return`
    <article class="home-modal-block info-author-card">
      <div class="info-author-links">
        <div class="info-author-main">
          <p class="info-author-line"><strong>作者</strong><a href="https://xhslink.com/m/A2DFslJF4mb" target="_blank" rel="noreferrer">落星峦</a></p>
          <p>把象棋改造成觉醒棋子、关卡挑战和 AI 对弈的策略小游戏。</p>
        </div>
        <div class="info-link-list">
          <p><a href="https://github.com/kw66/kw-chess" target="_blank" rel="noreferrer"><span>项目地址</span><em>（求个 star）</em></a></p>
          <p><a href="https://xhslink.com/m/A2DFslJF4mb" target="_blank" rel="noreferrer"><span>小红书交流帖</span><em>（预留）</em></a></p>
        </div>
      </div>
      <div class="info-qr-placeholder" aria-label="小红书交流群二维码预留">
        <div class="info-qr-box"><span>QR</span></div>
        <span>交流群二维码预留</span>
      </div>
    </article>
    <article class="home-modal-block info-stats-block">
      <h3>游玩统计</h3>
      <div class="info-stats-group">
        <h4>个人进度</h4>
        <div class="modal-stat-grid">
          <div><b>${a}/${se}</b><span>通关</span></div>
          <div><b>${t}/${s}</b><span>星星</span></div>
          <div><b>${e.totalGames||0}</b><span>对局</span></div>
          <div><b>${i}</b><span>胜率</span></div>
        </div>
      </div>
      <div class="info-stats-group">
        <h4>全站热度</h4>
        <div class="modal-stat-grid usage-stat-grid" aria-live="polite">
          <div><b>${$(n.totalPv)}</b><span>访问</span><em>今日 ${$(n.todayPv)}</em></div>
          <div><b>${$(n.totalUv)}</b><span>访客</span><em>今日 ${$(n.todayUv)}</em></div>
          <div><b>${$(n.totalGames)}</b><span>游玩局数</span><em>今日 ${$(n.todayGames)}</em></div>
        </div>
      </div>
      <p class="info-stats-note">${e.usageStatsStatus||"全站统计读取中。"}</p>
    </article>
    <article class="home-modal-block info-recommend-block">
      <h3>其他游戏推荐</h3>
      <div class="recommend-list">
        <p><a href="https://kw66.github.io/photo-hero/" target="_blank" rel="noreferrer">图片勇者</a>：拍照或画图鉴定装备，带着自己的物品一路爬塔冒险。</p>
        <p><a href="https://kw66.github.io/PhD_Simulator/" target="_blank" rel="noreferrer">研究生模拟器 v1.0</a>：在导师、论文、实验和精神状态之间求生的校园文字模拟器。</p>
      </div>
    </article>`}function E(e,t,s=""){const a=e.levelId?f.find(l=>l.id===e.levelId):null,i=a?A(t[a.id]||0):null,n=(a==null?void 0:a.stars.length)||null,o=a?I(a.id,t):!0,r=_[e.piece]||e.piece,c=e.extra?`<span class="modal-codex-extra">${e.extra}</span>`:"";return`
    <article class="modal-codex-card ${s} ${o?"is-unlocked":"is-locked"}">
      <div class="modal-codex-head">
        <span class="modal-codex-piece">${r}</span>
        ${c}
        <div>
          <strong>${e.ability}</strong>
          <em>${e.tag}${i!==null?` · ★ ${i}/${n}`:""}</em>
        </div>
      </div>
      <p>${e.desc}</p>
    </article>`}function me(e){return`
    <div class="codex-overview">
      <div class="codex-progress-pill"><b>${U.filter(s=>{const a=f.find(i=>i.id===s.levelId);return a&&J(a,e)}).length}/${U.length}</b><span>觉醒掌握</span></div>
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
        ${U.map(s=>E(s,e)).join("")}
      </div>
    </section>
    <section class="modal-codex-section">
      <h3>组合技</h3>
      <div class="modal-codex-grid compact-grid">
        ${ie.map(s=>E(s,e,"combo-card")).join("")}
      </div>
    </section>
    <section class="modal-codex-section">
      <h3>传统走法</h3>
      <div class="modal-codex-grid">
        ${ne.map(s=>E(s,e,"basic-card")).join("")}
      </div>
    </section>`}function ve(){return`
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
    </article>`}function B(e,t,s){return`
    <div class="home-modal" id="home-panel-${e}" data-home-modal="${e}" hidden>
      <section class="home-sheet" role="dialog" aria-modal="true" aria-labelledby="home-panel-title-${e}">
        <header class="home-sheet-head">
          <div>
            <h2 id="home-panel-title-${e}">${t}</h2>
          </div>
          <button class="home-sheet-close" type="button" data-close-home-panel>收起</button>
        </header>
        <div class="home-sheet-body">
          ${s}
        </div>
      </section>
    </div>`}function ge(e,t,s,a){return`
    ${B("author","游戏信息",ue(e,t,s,a))}
    ${B("codex","棋子图鉴",me(e.starsPerLevel))}
    ${B("settings","设置",ve())}`}function fe(e,t){const a=(t[e.id]||0)>>0&1;return`
    <button class="freeplay-card" data-select-level="${e.id}">
      <span class="freeplay-icon">♟</span>
      <span class="freeplay-label">自由对弈</span>
      <span class="freeplay-desc">${e.desc}</span>
      <span class="freeplay-star ${a?"star-earned":"star-empty"}" title="${e.stars[0].desc}">
        ${a?"★":"☆"}
      </span>
    </button>`}function he(e,t){const s=t[e.id]||0,a=I(e.id,t),i=(s&(e.winStarBit??1))!==0,n=a?"":"level-card-locked",o=i?"level-card-completed":"",r=e.pieces?e.pieces.map(c=>_[c]):e.piece?[_[e.piece]]:[];return`
    <button class="level-card ${n} ${o}"
            ${a?`data-select-level="${e.id}"`:"disabled"}>
      <div class="level-card-index">
        ${a?`<span class="level-num">${e.id}</span>`:'<span class="level-lock">🔒</span>'}
      </div>
      ${r.length?`<div class="level-card-pieces">${r.map(c=>`<span class="level-piece-icon">${c}</span>`).join("")}</div>`:""}
      <div class="level-card-info">
        <span class="level-card-name">${e.name}</span>
        <span class="level-card-desc">${e.desc}</span>
      </div>
      ${a?oe(s,e.stars,"sm"):`<div class="stars stars-sm">${e.stars.map(()=>'<span class="star star-empty">☆</span>').join("")}</div>`}
    </button>`}function ye(e,t){const s=e.levels.some(r=>I(r.id,t)),a=e.levels.reduce((r,c)=>r+A(t[c.id]||0),0),i=e.levels.reduce((r,c)=>r+c.stars.length,0),n=e.levels.filter(r=>r.freePlay),o=e.levels.filter(r=>!r.freePlay);return`
    <section class="tier-section ${s?"":"tier-locked"}">
      <div class="tier-header">
        <div class="tier-icon">${e.icon}</div>
        <div class="tier-info">
          <h2 class="tier-name">${e.name}</h2>
          <p class="tier-desc">${e.desc}</p>
        </div>
        <div class="tier-progress">
          <span class="tier-stars-count">★ ${a}/${i}</span>
        </div>
      </div>
      ${n.map(r=>fe(r,t)).join("")}
      ${o.length?`
      <div class="tier-levels">
        ${o.map(r=>he(r,t)).join("")}
      </div>`:""}
    </section>`}function j(e){const t=re(e.starsPerLevel),s=ce(),a=le(e.starsPerLevel);return`
    <div class="home-page">
      <!-- 顶部栏 -->
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${T("author","游戏信息")}
          ${T("codex","棋子图鉴")}
          ${T("settings","设置")}
        </nav>
      </header>

      <!-- 关卡层级列表 -->
      <main class="home-content">
        ${pe(e)}
        ${D.map(i=>ye(i,e.starsPerLevel)).join("")}

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
      ${ge(e,t,s,a)}
    </div>`}function be(e){return`
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
    </div>`}function we(e){return`
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
    </div>`}const F={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function ke(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function $e(e){return String(e).replace(/"/g,"&quot;")}function Se(e,t){return t.map((s,a)=>{const i=e>>a&1;return`<div class="star-goal ${i?"star-goal-earned":""}">
      <span class="star-goal-icon">${i?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function xe(e){var a,i;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((i=e.config)==null?void 0:i.playerUpgrades)||{}).forEach(([n,o])=>{o&&s.add(n)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(n=>s.add(n)),[...s].filter(n=>F[n])}function _e(e){const t=xe(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=F[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function Le(e){var a,i,n,o,r;const t=new URLSearchParams;t.set("levelId",e.id),(a=e.config)!=null&&a.noAi||(t.set("ai","1"),t.set("aiTime",String(((i=e.config)==null?void 0:i.aiTime)??500)));const s=((n=e.config)==null?void 0:n.mode)??"kw";if(t.set("mode",s),s==="classic"&&t.set("classic","1"),s!=="classic"){const c=((o=e.config)==null?void 0:o.playerUpgrades)||{},l=((r=e.config)==null?void 0:r.aiUpgrades)||{},d=Object.keys(c).filter(v=>c[v]).join(","),u=Object.keys(l).filter(v=>l[v]).join(",");d&&t.set("pu",d),u&&t.set("au",u)}return`./index-legacy.html?${t.toString()}`}function Pe(e){var m,p,k,y;const t=H(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=ke(s),i=t.stars.length,n=t.pieces?t.pieces.map(b=>_[b]).join(" "):t.piece?_[t.piece]:"",o=Le(t),r=["","入门","初级","中级","高级"][((m=t.config)==null?void 0:m.aiLevel)??0]||"",c=!((p=t.config)!=null&&p.noAi)&&r,l={classic:"传统",mixed:"觉醒",kw:"科王"}[((k=t.config)==null?void 0:k.mode)??"kw"]||"科王",d=t.freePlay?"双人":"红方",u=t.freePlay?'<span class="game-header-badge">自由对弈</span>':c?`<span class="game-header-badge game-header-ai">AI · ${r}</span>`:'<span class="game-header-badge">双人对局</span>',v=(y=t.tutorial)!=null&&y.length?t.tutorial[0].text:"";return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-header-title">
            ${n?`<span class="game-header-piece">${n}</span>`:""}
            <div class="game-header-text">
              <span class="game-header-name">${t.name}</span>
              <span class="game-header-desc">${t.desc}</span>
            </div>
            ${u}
          </div>
          <div class="game-header-stars">
            ${t.stars.map((b,h)=>`<span class="star ${s>>h&1?"star-earned":"star-empty"}">${s>>h&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${i}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${l}</span>
          <span class="game-status-chip">${c?`AI ${r}`:d}</span>
          <span class="game-status-chip">目标 ${a}/${i}</span>
          <span class="game-status-chip">${t.freePlay?"练习局":"闯关局"}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${o}"
            title="科王象棋对局"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${v?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${$e(v)}">${v||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${_e(t)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${Se(s,t.stars)}
            </div>
            ${t.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
          </div>

          <!-- 3. 胜率（仅有 AI 时显示） -->
          ${c?`
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
    </div>`}function Ie(e){switch(e.screen){case"menu":return j(e);case"levels":return be();case"upgrade":return we();case"game":return Pe(e);default:return j(e)}}function Ue(e){const t=ae();function s(){const n=t.getState();e.dataset.screen=n.screen,e.innerHTML=Ie(n)}t.subscribe(s),W().then(({stats:n,status:o})=>{t.dispatch("usage-stats-updated",{stats:n,status:o})}).catch(n=>{console.warn("全站统计初始化失败:",n),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})});function a(){e.querySelectorAll(".home-modal").forEach(n=>{n.hidden=!0}),e.querySelectorAll("[data-home-panel]").forEach(n=>{n.setAttribute("aria-pressed","false"),n.setAttribute("aria-expanded","false")})}function i(n){a();const o=e.querySelector(`[data-home-modal="${n}"]`);if(!o)return;o.hidden=!1;const r=e.querySelector(`[data-home-panel="${n}"]`);r instanceof HTMLElement&&(r.setAttribute("aria-pressed","true"),r.setAttribute("aria-expanded","true"));const c=o.querySelector("[data-close-home-panel]");c instanceof HTMLElement&&c.focus({preventScroll:!0})}e.addEventListener("click",n=>{const o=n.target;if(!(o instanceof HTMLElement))return;const r=o.closest("[data-home-panel]");if(r){const m=r.dataset.homePanel,p=e.querySelector(`[data-home-modal="${m}"]`);p instanceof HTMLElement&&!p.hidden?a():i(m);return}if(o.closest("[data-close-home-panel]")||o.classList.contains("home-modal")){a();return}const c=o.closest("[data-navigate]");if(c){t.dispatch("navigate",{screen:c.dataset.navigate});return}const l=o.closest("[data-select-level]");if(l){const m=parseInt(l.dataset.selectLevel,10);isNaN(m)||t.dispatch("select-level",{levelId:m});return}if(o.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const u=o.closest("[data-action]");if(u){const m=u.dataset.action;if(m==="back-to-menu"||m==="back-to-levels"){t.dispatch(m);return}}const v=o.closest("[data-toggle-upgrade]");if(v){t.dispatch("toggle-upgrade",{pieceType:v.dataset.toggleUpgrade});return}}),window.addEventListener("keydown",n=>{n.key==="Escape"&&a()}),window.addEventListener("message",n=>{if(!n.data)return;const o=t.getState();if(o.screen!=="game"||!o.currentLevel)return;const r=H(o.currentLevel);if(r){if(n.data.type==="piece-selected"){const c=document.getElementById("hint-display");if(!c)return;const l=n.data.hint;if(l)c.textContent=l,c.classList.remove("hint-empty");else{const d=c.dataset.default||"";c.textContent=d||"选择棋子查看走法",c.classList.toggle("hint-empty",!d)}return}if(n.data.type==="game-progress"){const c=n.data.stats||{},l=o.starsPerLevel[r.id]||0,d=document.getElementById("star-goal-list");if(d&&(d.innerHTML=r.stars.map((p,k)=>{const y=l>>k&1,b=!!(p.eval&&p.eval(c)),h=y||b;return`<div class="star-goal ${h?"star-goal-earned":""}">
            <span class="star-goal-icon">${h?"★":"☆"}</span>
            <span class="star-goal-desc">${p.desc}</span>
          </div>`}).join("")),n.data.redPct!==void 0){const p=n.data.redPct,k=100-p,y=document.getElementById("outer-red-pct"),b=document.getElementById("outer-blk-pct"),h=document.getElementById("outer-fill-red"),M=document.getElementById("outer-advantage");y&&(y.textContent=p+"%"),b&&(b.textContent=k+"%"),h&&(h.style.width=p+"%"),M&&n.data.advantage&&(M.textContent=n.data.advantage)}const u=document.getElementById("outer-cap-red"),v=document.getElementById("outer-cap-black");u&&n.data.capturedRed!==void 0&&(u.innerHTML=n.data.capturedRed.length?n.data.capturedRed.map(p=>`<span class="cap-item red">${p}</span>`).join(""):'<span class="cap-empty">—</span>'),v&&n.data.capturedBlack!==void 0&&(v.innerHTML=n.data.capturedBlack.length?n.data.capturedBlack.map(p=>`<span class="cap-item blk">${p}</span>`).join(""):'<span class="cap-empty">—</span>');const m=document.getElementById("outer-move-log");m&&n.data.moves!==void 0&&(n.data.moves.length===0?m.innerHTML='<span class="log-empty">对局尚未开始</span>':(m.innerHTML=n.data.moves.map(p=>`<div class="log-entry ${p.side==="red"?"log-red":"log-blk"}">${p.text}</div>`).join(""),m.scrollTop=m.scrollHeight));return}if(n.data.type==="game-end"){const c=n.data.stats||{};let l=0;r.stars.forEach((d,u)=>{d.eval&&d.eval(c)&&(l|=1<<u)}),t.dispatch("game-result",{newStarBits:l,win:!!c.win}),Z().then(({stats:d,status:u})=>{t.dispatch("usage-stats-updated",{stats:d,status:u})}).catch(d=>{console.warn("全站游玩统计失败:",d),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}),s()}const q=document.querySelector("#app");if(!q)throw new Error("#app container not found");Ue(q);
