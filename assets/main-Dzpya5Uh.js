(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const R={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},Ne="https://ypefmpeekfucmarbbdov.supabase.co",de="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",b={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day",survivalMoves:"kw_chess_survival_moves_total",survivalGames:"kw_chess_survival_games_total",survivalMovePrefix:"kw_chess_survival_moves",survivalGamePrefix:"kw_chess_survival_games",killPrefix:"kw_chess_kill"},S=[{type:"R",label:"车"},{type:"H",label:"马"},{type:"C",label:"炮"},{type:"P",label:"兵"},{type:"A",label:"仕"},{type:"B",label:"相"},{type:"K",label:"帅"}];function x(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function Ue(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0,killsByType:ye(),survivalByType:Ke(),survivalMoves:0,survivalGames:0,avgSurvivalMoves:0}}function Ge(e){const t=e&&typeof e=="object"?e:{},s=x(t.survivalMoves),a=x(t.survivalGames);return{totalPv:x(t.totalPv),totalUv:x(t.totalUv),totalGames:x(t.totalGames),todayPv:x(t.todayPv),todayUv:x(t.todayUv),todayGames:x(t.todayGames),killsByType:j(t.killsByType),survivalByType:H(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0}}async function Oe(){const e=be();return e&&await He(),{stats:await W(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function je(e={}){if(!be())return{stats:await W(),status:"本地预览不会写入全站统计。"};const t=K(),s=[M(b.totalGames),M(N(b.dailyGamesPrefix,t))],a=j(e.redKillsByType);for(const r of S){const c=a[r.type]||0;for(let d=0;d<c;d+=1)s.push(M(Y(r.type)))}const n=x(e.totalMoves,0,300);if(n>0){s.push(M(b.survivalGames));for(let r=0;r<n;r+=1)s.push(M(b.survivalMoves))}const i=H(e.redSurvivalByType);for(const r of S){const c=i[r.type],d=x(c.games,0,16),u=d>0?x(Math.round(c.moves/d),0,300):0;d>0&&s.push(M(z(r.type)));for(let f=0;f<u;f+=1)s.push(M(Z(r.type)))}return await Promise.all(s),{stats:await W(),status:"游玩局数已同步。"}}async function He(){const e=K();await Promise.all([M(b.totalPv),M(N(b.dailyPvPrefix,e))]);const t=localStorage.getItem(R.statsVisitor)==="true",s=localStorage.getItem(R.statsLastUvDate),a=[];t||(a.push(M(b.totalUv)),localStorage.setItem(R.statsVisitor,"true")),s!==e&&(a.push(M(N(b.dailyUvPrefix,e))),localStorage.setItem(R.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function W(){const e=K(),t=N(b.dailyPvPrefix,e),s=N(b.dailyUvPrefix,e),a=N(b.dailyGamesPrefix,e),n=S.map(u=>Y(u.type)),i=S.map(u=>Z(u.type)),o=S.map(u=>z(u.type)),r=await Re([b.totalPv,b.totalUv,b.totalGames,b.survivalMoves,b.survivalGames,t,s,a,...n,...i,...o]),c={},d={};return S.forEach(u=>{c[u.type]=r[Y(u.type)];const f=r[Z(u.type)],g=r[z(u.type)];d[u.type]={moves:f,games:g,avg:g>0?Math.round(f/g):0}}),Ge({totalPv:r[b.totalPv],totalUv:r[b.totalUv],totalGames:r[b.totalGames],todayPv:r[t],todayUv:r[s],todayGames:r[a],survivalMoves:r[b.survivalMoves],survivalGames:r[b.survivalGames],killsByType:c,survivalByType:d})}async function M(e){return he("increment_counter",{counter_id:e})}async function Re(e){const t=await he("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=x(a.count));return s}async function he(e,t){const s=await fetch(`${Ne}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:de,Authorization:`Bearer ${de}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function be(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function N(e,t=K()){return`${e}_${t.replaceAll("-","")}`}function Y(e){return`${b.killPrefix}_${e}`}function Z(e){return`${b.survivalMovePrefix}_${e}`}function z(e){return`${b.survivalGamePrefix}_${e}`}function ye(){return Object.fromEntries(S.map(e=>[e.type,0]))}function j(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(S.map(s=>[s.type,x(t[s.type])]))}function Ke(){return Object.fromEntries(S.map(e=>[e.type,{moves:0,games:0,avg:0}]))}function H(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(S.map(s=>{const a=t[s.type]&&typeof t[s.type]=="object"?t[s.type]:{},n=x(a.moves,0,99999999),i=x(a.games,0,99999999);return[s.type,{moves:n,games:i,avg:i>0?Math.round(n/i):0}]}))}function K(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const A={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"fair"},G=[{id:"learn",label:"难度 1",time:2e3,note:"熟悉规则稳健落子"},{id:"fair",label:"难度 2",time:4e3,note:"攻防均衡认真对局"},{id:"boss",label:"难度 3",time:6e3,note:"深度搜索挑战极限"}];function ue(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function D(e){const t=e&&typeof e=="object"?e:{},s=G.some(a=>a.id===t.aiStrength)?t.aiStrength:A.aiStrength;return{sfxEnabled:t.sfxEnabled??A.sfxEnabled,sfxVolume:ue(t.sfxVolume,A.sfxVolume),bgmEnabled:t.bgmEnabled??A.bgmEnabled,bgmVolume:ue(t.bgmVolume,A.bgmVolume),aiStrength:s}}function ee(e){const t=D(e);return G.find(s=>s.id===t.aiStrength)||G.find(s=>s.id===A.aiStrength)||G[0]}const ke="kw-chess-save";function De(){try{const e=localStorage.getItem(ke);return e?JSON.parse(e):null}catch{return null}}function U(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,personalStats:e.personalStats,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(ke,JSON.stringify(t))}catch{}}function Fe(){const e=De(),t=(e==null?void 0:e.personalStats)||{},s=Math.max(0,Math.trunc(Number(t.survivalMoves)||0)),a=Math.max(0,Math.trunc(Number(t.survivalGames)||0));return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,personalStats:{killsByType:j(t.killsByType),survivalByType:H(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0},usageStats:Ue(),usageStatsStatus:"全站统计读取中。",settings:D(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"kw",codexPage:0,homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,selectedChallengeLevel:null,statsScope:"personal",currentLevel:null,currentPlaySource:null}}function Ve(){let e=Fe();const t=new Set;function s(){return e}function a(o){const r=typeof o=="function"?o(e):o;e={...e,...r},t.forEach(c=>c(e))}function n(o){return t.add(o),()=>t.delete(o)}function i(o,r={}){var c,d,u,f,g;switch(o){case"navigate":a({screen:r.screen});break;case"usage-stats-updated":a({usageStats:r.stats??e.usageStats,usageStatsStatus:r.status??e.usageStatsStatus});break;case"toggle-home-panel":{const v=r.panel||null;a({activeHomePanel:e.activeHomePanel===v?null:v});break}case"open-home-panel":a({activeHomePanel:r.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:r.mode==="kw"?"kw":"classic",codexPage:0});break;case"set-codex-page":a({codexPage:Math.max(0,Math.trunc(Number(r.page)||0))});break;case"set-home-mode":{const v=r.mode==="classic"?"classic":"kw";a({homeMode:v}),U({...e,homeMode:v});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(r.page)||0)),selectedChallengeLevel:null});break;case"set-selected-challenge-level":a({selectedChallengeLevel:Math.max(1,Math.trunc(Number(r.levelId)||1))});break;case"set-stats-scope":a({statsScope:r.scope==="global"?"global":"personal"});break;case"update-settings":{const v=D({...e.settings,...r});a({settings:v}),U({...e,settings:v});break}case"record-personal-stats":{const v=r.stats||{},y={...j((c=e.personalStats)==null?void 0:c.killsByType)},$=j(v.redKillsByType),L={...H((d=e.personalStats)==null?void 0:d.survivalByType)},w=H(v.redSurvivalByType);Object.keys(ye()).forEach(E=>{var oe,re,ce,le;y[E]=(y[E]||0)+($[E]||0);const ie=(((oe=L[E])==null?void 0:oe.moves)||0)+(((re=w[E])==null?void 0:re.moves)||0),V=(((ce=L[E])==null?void 0:ce.games)||0)+(((le=w[E])==null?void 0:le.games)||0);L[E]={moves:ie,games:V,avg:V>0?Math.round(ie/V):0}});const C=Math.max(0,Math.min(300,Math.trunc(Number(v.totalMoves)||0))),F=C>0?(((u=e.personalStats)==null?void 0:u.survivalGames)||0)+1:((f=e.personalStats)==null?void 0:f.survivalGames)||0,se=(((g=e.personalStats)==null?void 0:g.survivalMoves)||0)+C,ne={killsByType:y,survivalByType:L,survivalMoves:se,survivalGames:F,avgSurvivalMoves:F>0?Math.round(se/F):0};a({personalStats:ne}),U({...e,personalStats:ne});break}case"select-level":a({screen:"game",currentLevel:r.levelId,currentPlaySource:r.playSource||"challenge"});break;case"back-to-menu":a({screen:"menu",currentLevel:null,currentPlaySource:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null,currentPlaySource:null});break;case"toggle-upgrade":{const{pieceType:v}=r,k={...e.pieceUpgrades};k[v]?delete k[v]:k[v]=!0,a({pieceUpgrades:k}),U({...e,pieceUpgrades:k});break}case"game-result":{const{newStarBits:v,win:k}=r,y=e.currentLevel,$={...e.starsPerLevel};$[y]=($[y]||0)|(v||0);const P={starsPerLevel:$,totalWins:e.totalWins+(k?1:0),totalGames:e.totalGames+1};a(P),U({...e,...P});break}default:console.warn(`[Store] 未知 action: ${o}`)}}return{getState:s,setState:a,subscribe:n,dispatch:i}}const pe={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},te=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:4e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"列车冲撞",desc:"车沿直线冲撞友军，把棋子推上战线",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"列车冲撞！车可以沿直线冲撞友军，把棋子推向更深的位置；同类车叠在一起后还能合体。"}]},{id:3,name:"马踏飞燕",desc:"马借己方棋子连续起跳，追吃多个目标",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"马踏飞燕！马可以向十二方跳跃，借己方棋子连续起跳，不受蹩马腿限制；同类马还能合体。"}]},{id:4,name:"洲际导弹",desc:"炮翻过连续炮架，远程打击后排",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"洲际导弹！炮可以翻过连续炮架，远袭炮架后的敌方棋子。"}]},{id:5,name:"集束炸弹",desc:"兵叠层合体后自爆，覆盖周围目标",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"集束炸弹！兵可以上下左右一步移动，同类兵会自动合体；双击自爆可以清掉周围目标。"}]},{id:6,name:"X形光波",desc:"仕斜走出宫，落地释放 X 形光波",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"X形光波！仕可以斜走出宫，落地时沿四条斜线释放光波；同类仕还能合体。"}]},{id:7,name:"十字地震波",desc:"相过河跳田，落地释放十字地震波",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"十字地震波！相可以过河跳田，落地时沿横竖方向打出地震波；同类相还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:4e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"自爆列车",desc:"车运叠兵深入敌阵，引爆自爆连锁",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:4e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"自爆列车！用车把叠兵送进敌阵，再引爆自爆连锁消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"车马炮兵仕相帅觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"车马炮兵仕相帅觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"巅峰对决",desc:"车马炮兵仕相帅觉醒，完整对决",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:4e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"巅峰对决！车、马、炮、兵、仕、相、帅都觉醒，冲撞、连踩、光波、地震和自爆会一起改变局势。"}]}]}],_=te.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function $e(e){return _.find(t=>t.id===e)||null}const Je=_.filter(e=>!e.freePlay).length,we={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"车马炮兵仕相帅觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},Xe=2,We=6,Ye={1:"从基础走法开始",2:"用冲撞打开直线",3:"连续追吃多个目标",4:"隔着炮架打后排",5:"把爆点送进敌阵",6:"用斜线覆盖目标",7:"用横竖线控场",8:"送帅出宫亲征",9:"运叠兵进阵自爆",10:"冲撞、连踩、光波、地震、自爆同场"},Ze={1:{setupLabel:"规则",setup:"基础象棋",focus:"移动七类棋子，再用不同棋子吃子"},2:{setupLabel:"棋子",setup:"车觉醒",focus:"车冲到友军前一格，把它推出去"},3:{setupLabel:"棋子",setup:"马觉醒",focus:"踩己方棋子继续跳，直到吃到目标"},4:{setupLabel:"棋子",setup:"炮觉醒",focus:"选连续炮架后的敌子，优先打后排"},5:{setupLabel:"棋子",setup:"兵觉醒",focus:"叠到更高层，再在敌阵中心爆开"},6:{setupLabel:"棋子",setup:"仕觉醒",focus:"落在斜线交叉点，用 X 形伤害扫敌"},7:{setupLabel:"棋子",setup:"相觉醒",focus:"落在中线附近，用十字波覆盖目标"},8:{setupLabel:"棋子",setup:"车、帅觉醒",focus:"车把帅推出九宫，帅吃叠子成长"},9:{setupLabel:"棋子",setup:"车、兵觉醒",focus:"车运叠兵到底线或敌阵中心再爆"},10:{setupLabel:"棋子",setup:"车、马、炮、兵、仕、相、帅觉醒",focus:"组合技能争中路，别让帅暴露"}};function l(e,t){return e.map(([s,a])=>({x:s,y:a,type:t}))}function p(e,t,s,a={}){return{x:e,y:t,piece:s,owner:a.owner||"red",layer:a.layer||1,groups:a.groups,type:a.type||"",ghost:!!a.ghost}}function I(e=1,t=1,s=3){const a=[];for(let n=t;n<t+s;n+=1)for(let i=e;i<e+s;i+=1)a.push({x:i,y:n,type:"palace"});return a}function B(e=1,t=1,s=3){return{x:e,y:t,size:s}}function O(e=2.5){return{y:e}}function h(e,t,s={}){return{from:e,to:t,...s}}function m(e,t,s={}){return{title:e,marks:t,...s}}const xe=[{piece:"車",name:"车",title:"横竖直线走，遇到棋子就停",diagrams:[m("空线可走",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"車"})}),m("挡子与吃子",[...l([[1,2]],"move"),...l([[0,2,"吃"]],"attack"),...l([[3,2,"挡"]],"block"),...l([[4,2,"不可"]],"blocked")],{pieces:[p(0,2,"卒",{owner:"black",type:"attack"}),p(3,2,"兵",{type:"block"})],animation:h([2,2],[0,2],{piece:"車",kind:"attack"})})],sections:[{title:"怎么走",items:["车只走横线或竖线，一次可以走任意格数。","绿色格表示中间没有棋子挡住，所以都可以直接到达。"]},{title:"怎么吃",items:["同一条直线上遇到第一枚敌方棋子时，可以走到敌方棋子所在格并吃掉它。","遇到任何棋子都会停住，不能越过它去吃后面的棋子。"]}]},{piece:"馬",name:"马",title:"走“日”字，马腿被占会被蹩",diagrams:[m("日字落点",[...l([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")],{animation:h([2,2],[0,1],{piece:"馬"})}),m("蹩马腿",[...l([[2,1,"腿"]],"block"),...l([[1,0,"禁"],[3,0,"禁"]],"blocked"),...l([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")],{pieces:[p(2,1,"兵",{type:"block"})],animation:h([2,2],[1,0],{piece:"馬",kind:"denied"})})],sections:[{title:"怎么走",items:["马走“日”字：先横或竖一格，再斜一格，最终落在绿色位置。","马不是直线棋子，可以越过大多数棋子，但有一个关键例外。"]},{title:"蹩马腿",items:["如果马正前、正后、正左、正右的“马腿格”被任何棋子占住，那个方向的两个日字落点都不能走。","示意图里上方马腿被红兵占住，所以对应方向的两个灰色落点都不能去。"]}]},{piece:"炮",name:"炮",title:"移动像车，吃子必须隔一个炮架",diagrams:[m("不吃子移动",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"炮"})}),m("隔架吃子",[...l([[1,2,"架"]],"block"),...l([[3,2,"吃"]],"attack"),...l([[2,2]],"path")],{center:{x:0,y:2},pieces:[p(1,2,"兵",{type:"block"}),p(3,2,"卒",{owner:"black",type:"attack"})],animation:h([0,2],[3,2],{piece:"炮",kind:"attack"})})],sections:[{title:"怎么走",items:["炮不吃子时和车一样，沿横线或竖线移动，不能越过棋子。"]},{title:"怎么吃",items:["炮吃子时必须隔着正好一个棋子，这个被隔着的棋子叫炮架。","炮架可以是双方任意棋子；炮架后遇到的第一枚敌棋才是可吃目标。"]}]},{piece:"兵",name:"兵",title:"未过河只前进，过河后可左右",diagrams:[m("未过河",[...l([[2,2,"进"]],"move"),...l([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3},river:O(1.5),animation:h([2,3],[2,2],{piece:"兵"})}),m("过河后",[...l([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...l([[2,3,"禁"]],"blocked")],{river:O(2.5),animation:h([2,2],[1,2],{piece:"兵"})})],sections:[{title:"怎么走",items:["兵每次只走一格。红方朝上前进，黑方朝下前进。","没有过河前只能向前走，不能左右走，也不能后退。"]},{title:"过河以后",items:["过河后可以向前、向左、向右走一格。","兵永远不能后退。"]}]},{piece:"仕",name:"仕",title:"只在九宫内斜走一格",diagrams:[m("九宫内可达",[...I(),...l([[1,1],[3,1],[1,3],[3,3]],"move")],{palace:B(),animation:h([2,2],[1,1],{piece:"仕"})}),m("不能出宫",[...I(),...l([[2,2]],"move"),...l([[0,0],[0,2],[2,0]],"blocked")],{center:{x:1,y:1},palace:B(),animation:h([1,1],[0,0],{piece:"仕",kind:"denied"})})],sections:[{title:"活动范围",items:["仕只能留在己方九宫内，不能出宫。","九宫就是帅周围的 3×3 区域。"]},{title:"不能出宫",items:["仕在九宫角上时，只有仍落在九宫里的斜向格可以走。","灰色叉号表示看起来是斜一步，但落点已经出了九宫，所以不能走。"]}]},{piece:"相",name:"相",title:"走田字，两格斜跳，象眼会挡",diagrams:[m("田字落点",[...l([[0,0],[4,0],[0,4],[4,4]],"move")],{animation:h([2,2],[0,0],{piece:"相"})}),m("塞象眼",[...l([[1,1,"眼"]],"block"),...l([[0,0,"禁"]],"blocked"),...l([[4,0],[0,4],[4,4]],"move")],{pieces:[p(1,1,"兵",{type:"block"})],animation:h([2,2],[0,0],{piece:"相",kind:"denied"})}),m("不能过河",[...l([[0,1],[4,1]],"blocked")],{center:{x:2,y:3},river:O(2.5),animation:h([2,3],[0,1],{piece:"相",kind:"denied"})})],sections:[{title:"怎么走",items:["相沿对角线一次跳两格，也就是走“田”字。","相不能过河，只能在己方半边活动。"]},{title:"塞象眼",items:["如果对角线中间那一格被任何棋子占住，对应方向就不能跳。","示意图里左上方向的象眼被红兵占住，所以左上角的灰色落点不能走。"]},{title:"不能过河",items:["相的落点不能越过河界。","即使“田”字落点看起来对，也不能跳到河对岸的灰色格。"]}]},{piece:"帅",name:"帅",title:"九宫内一步，将帅不能照面",diagrams:[m("九宫一步",[...I(),...l([[2,1],[1,2],[3,2],[2,3]],"move")],{palace:B(),animation:h([2,2],[2,1],{piece:"帅"})}),m("照面禁线",[...I(1,2,3),...l([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4},palace:B(1,2,3),pieces:[p(2,0,"将",{owner:"black",type:"attack"})]})],sections:[{title:"怎么走",items:["帅只能在九宫内横走或竖走一格。","帅不能主动走出九宫。"]},{title:"将帅照面",items:["双方帅/将如果在同一列，中间没有任何棋子挡住，就是违规局面。","走棋时要避免让两位主帅直接面对面。"]}]}],Se=[{piece:"叠",name:"通用叠层",title:"先看这页：叠层、合体、叠层吃子",diagrams:[m("同类叠层",[...l([[1,2,"車"],[2,2,"叠"],[3,2,"2层"],[4,2]],"combo")],{center:{x:0,y:2},piece:"車",pieces:[p(2,2,"車",{type:"combo"}),p(4,2,"車",{layer:2,groups:[1,1],type:"combo"})],animation:h([0,2],[2,2],{piece:"車",kind:"combo"})}),m("层数吃子",[...l([[3,2,"敌1"],[4,2,"胜"]],"attack"),...l([[1,2,"2层"]],"combo")],{center:{x:1,y:2},piece:"車",centerLayer:2,centerGroups:[2],pieces:[p(4,2,"卒",{owner:"black",type:"attack"})],animation:h([1,2],[4,2],{piece:"車",layer:2,groups:[2],kind:"attack"})}),m("层数不足",[...l([[2,2,"敌3"]],"attack"),...l([[3,2,"剩2"],[4,2]],"block"),...l([[1,2,"败"]],"blocked")],{center:{x:0,y:2},piece:"兵",pieces:[p(2,2,"卒",{owner:"black",layer:3,type:"attack"}),p(4,2,"卒",{owner:"black",layer:2,type:"block",ghost:!0})],animation:h([0,2],[2,2],{piece:"兵",kind:"denied"})})],sections:[{title:"怎么叠",items:["同阵营、同种类的觉醒棋子可以走到一起形成叠层；帅/王不能叠层。","兵最多叠到 5 层，并且叠上去后会自动合体；其他棋子叠上去后先保持为多个小组。"]},{title:"怎么操作",items:["单击叠子会默认带最上面一组行动，剩下的小组留在原格。","双击叠子会打开选择环：多个小组可以选“合”，合体后可以整组行动；合体棋子也可以双击拆出部分层数行动。"]},{title:"怎么吃叠子",items:["吃子只看本次出击的层数和目标总层数。出击层数大于或等于目标层数，就能消灭目标并保留自己的层数。","如果出击层数小于目标层数，进攻方会消失，目标只扣掉对应层数。图中 1 层兵打 3 层敌子会失败，敌子剩 2 层。"]}]},{piece:"車",name:"觉醒车",title:"直线移动，冲撞运输",diagrams:[m("直线移动",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"車"})}),m("冲撞运输",[...l([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...l([[2,2,"友"]],"ally")],{center:{x:0,y:2},pieces:[p(2,2,"兵",{type:"ally"}),p(4,2,"兵",{type:"skill",ghost:!0})],animations:[h([0,2],[1,2],{piece:"車",kind:"skill"}),h([2,2],[4,2],{piece:"兵",kind:"skill",delay:520})]}),m("车车合体",[...l([[1,2,"車"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"車",{type:"combo"}),p(4,2,"車",{layer:2,groups:[2],type:"combo"})],animation:h([0,2],[2,2],{piece:"車",kind:"combo"})})],sections:[{title:"怎么走",items:["觉醒车仍然按车的方式横竖直线移动，不能越过普通阻挡。","遇到敌子时可以按层数规则吃子。"]},{title:"冲撞",items:["如果同一条直线上先有空格、再遇到己方异类棋子，车可以冲到它前一格并把它沿同方向推出。","被推出的棋子遇到己方同类会叠层，遇到敌方会按层数结算；如果把帅推出九宫，就会触发帅的宫外规则。"]},{title:"叠层表现",items:["车车叠层后可合体，合体车能用更高层数吃子或冲撞。","如果被冲撞的是未合体叠子，只推出最底部的小组；合体后才会整体被推出。"]}]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[m("十二方落点",[...l([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")],{animation:h([2,2],[0,1],{piece:"馬"})}),m("借友连跳",[...l([[2,2,"友"],[4,2,"续"]],"skill"),...l([[4,4,"吃"]],"attack"),...l([[2,0,"空"]],"move")],{center:{x:0,y:2},pieces:[p(2,2,"兵",{type:"skill"}),p(4,4,"卒",{owner:"black",type:"attack"})],animations:[h([0,2],[2,2],{piece:"馬",kind:"skill"}),h([2,2],[4,4],{piece:"馬",kind:"attack",delay:520})]}),m("马马合体",[...l([[1,2,"馬"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"馬",{type:"combo"}),p(4,2,"馬",{layer:2,groups:[2],type:"combo"})],animation:h([0,2],[2,2],{piece:"馬",kind:"combo"})})],sections:[{title:"怎么走",items:["觉醒马可以跳传统“日”字的 8 个点，也可以直线跳 2 格，总共 12 个方向。","觉醒马没有蹩马腿限制，旁边有棋子也不会挡住它。"]},{title:"连踩",items:["跳到己方棋子上时可以继续从那里再跳；己方异类只是踏点，不会停在上面。","跳到己方马的位置时，可以选择叠层，也可以把它当踏点继续跳。跳到敌方棋子时结束并按层数吃子。"]},{title:"叠层表现",items:["马马合体后，本次出击层数更高，连踩到敌方叠子时更容易吃赢。","未合体时通常只有最上面的小组行动，合体后可以整组跳，也可以拆分部分层数行动。"]}]},{piece:"炮",name:"觉醒炮",title:"直线移动，翻过连续炮架",diagrams:[m("直线移动",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"炮"})}),m("连续炮架",[...l([[1,2,"架"],[2,2,"架"]],"block"),...l([[3,2,"落"]],"move"),...l([[4,2,"吃"]],"attack")],{center:{x:0,y:2},pieces:[p(1,2,"兵",{type:"block"}),p(2,2,"卒",{owner:"black",type:"block"}),p(4,2,"卒",{owner:"black",type:"attack"})],animation:h([0,2],[4,2],{piece:"炮",kind:"attack"})}),m("炮炮合体",[...l([[1,2,"炮"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"炮",{type:"combo"}),p(4,2,"炮",{layer:2,groups:[2],type:"combo"})],animation:h([0,2],[2,2],{piece:"炮",kind:"combo"})})],sections:[{title:"怎么走",items:["不吃子时，觉醒炮可以像车一样沿横线或竖线走。","遇到连续棋子段时，炮可以翻过这段炮架，落到后面的空格。"]},{title:"怎么吃",items:["炮架可以是一段连续棋子；越过炮架后遇到的第一枚敌棋可以被攻击。","如果炮架后遇到的是己方炮，也可以叠层。"]},{title:"叠层表现",items:["炮炮合体后按更高层数远袭，打叠层敌子更强。","未合体炮叠子先是多个小组，双击合体后才会整组行动。"]}]},{piece:"兵",name:"觉醒兵",title:"四向一步，叠层自动合体，自爆连锁",diagrams:[m("四向可走",[...l([[2,1],[1,2],[3,2],[2,3]],"move")],{river:O(2.5),animation:h([2,2],[2,3],{piece:"兵"})}),m("自爆范围",[...l([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")],{pieces:[p(1,1,"卒",{owner:"black",type:"attack"}),p(3,3,"马",{type:"attack"})]}),m("兵兵自动合体",[...l([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"兵",{type:"combo"}),p(4,2,"兵",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒兵每次可以向上、下、左、右走一格，不再受过河限制。","遇到敌子时按层数规则吃子。"]},{title:"自爆",items:["双击兵可以选择“爆”。自爆后兵自己消失，并攻击周围范围。","自爆半径等于兵的总层数；对非兵棋子每次造成 1 层伤害，双方棋子都会被波及。被炸到的兵会继续连锁自爆。"]},{title:"叠层表现",items:["兵叠到同类兵上会自动合体，最多 5 层。","层数越高，自爆范围越大，因此叠兵是推进和爆破的核心。"]}]},{piece:"仕",name:"觉醒仕",title:"斜走出宫，落地释放 X 形光波",diagrams:[m("出宫斜走",[...I(),...l([[0,0],[0,2],[2,0],[2,2]],"move")],{center:{x:1,y:1},palace:B(),animation:h([1,1],[0,0],{piece:"仕"})}),m("X 形伤害",[...l([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")],{pieces:[p(0,0,"卒",{owner:"black",type:"attack"}),p(4,4,"砲",{owner:"black",type:"attack"})]}),m("仕仕合体",[...l([[1,2,"仕"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"仕",{type:"combo"}),p(4,2,"仕",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒仕每次斜走一格，可以出宫，也可以过河。","叠到己方仕时只是叠层，不会触发光波。"]},{title:"光波",items:["仕移动或吃子落地后，会向四条斜线释放 X 形光波。","光波的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["仕仕合体后，顶组层数变高，光波打得更远、伤害更高。","合体后也可以拆出部分层数行动，用小光波试探。"]}]},{piece:"相",name:"觉醒相",title:"无象眼越河，落地释放十字地震",diagrams:[m("斜跳两格",[...l([[0,1],[4,1]],"move"),...l([[1,2],[3,2]],"path")],{center:{x:2,y:3},river:O(2.5),pieces:[p(1,2,"兵",{type:"path"}),p(3,2,"卒",{owner:"black",type:"path"})],animation:h([2,3],[0,1],{piece:"相"})}),m("十字伤害",[...l([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")],{pieces:[p(2,0,"卒",{owner:"black",type:"attack"}),p(4,2,"馬",{owner:"black",type:"attack"})]}),m("相相合体",[...l([[1,2,"相"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"相",{type:"combo"}),p(4,2,"相",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒相仍然斜跳两格，但不再检查象眼，也可以过河。","叠到己方相时只是叠层，不会触发地震。"]},{title:"地震",items:["相移动或吃子落地后，会向上下左右释放十字地震。","地震的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["相相合体后，十字地震范围和伤害都会提升。","合体相适合站到中路，用十字线压制大片区域。"]}]},{piece:"帅",name:"觉醒帅",title:"九宫八向，吃子成长，可被车送出宫",diagrams:[m("九宫八向",[...I(),...l([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")],{palace:B(),animation:h([2,2],[1,1],{piece:"帅"})}),m("吃子成长",[...l([[2,1,"吃"]],"attack"),...l([[2,0,"+1"]],"combo")],{pieces:[p(2,1,"卒",{owner:"black",type:"attack"}),p(2,0,"帅",{layer:2,groups:[2],type:"combo",ghost:!0})]}),m("车送出宫",[...I(),...l([[2,4,"車"]],"ally"),...l([[2,3,"撞"],[2,1,"出"]],"skill")],{palace:B(),showCenter:!1,pieces:[p(2,4,"車",{type:"ally"}),p(2,0,"帅",{type:"skill",ghost:!0})],animation:h([2,2],[2,0],{piece:"帅",kind:"skill"})})],sections:[{title:"怎么走",items:["觉醒帅在九宫内可以向八个方向走一格，但不能自己主动走出九宫。","如果已经被车冲撞送出宫，宫外帅只能上下左右走一格。"]},{title:"成长",items:["帅成功吃掉敌方棋子并站到目标格后，会增加 1 层。","帅不能叠层，成长是帅提升层数的主要方式。"]},{title:"车送出宫",items:["觉醒车可以冲撞己方帅，把帅推出九宫。","被车送出去的帅可以亲自参战，但也会暴露在更危险的位置。"]}]}];function ze(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Pe(e){return e==="classic"?"classic":"kw"}function qe(e,t=_){return t.reduce((s,a)=>s+ze(e[a.id]||0),0)}function Qe(e=_){return e.reduce((t,s)=>t+s.stars.length,0)}function et(e,t=_){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function tt(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function q(e,t){const s=_.find(i=>i.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=_.find(i=>i.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function T(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function Me(e){return`${Math.max(0,Math.round(Number(e)||0))}步`}function Le(e,t){return Math.max(0,Math.trunc(Number(e==null?void 0:e[t])||0))}function _e(e,t){const s=e==null?void 0:e[t];if(!s||typeof s!="object")return 0;const a=Math.max(0,Math.trunc(Number(s.games)||0)),n=Math.max(0,Math.trunc(Number(s.moves)||0));return a>0?Math.round(n/a):0}function Ee(e){return e==="global"?"global":"personal"}function me(e,t,s){const a=t===e;return`<button class="stats-scope-button ${a?"is-active":""}" type="button" data-info-stats-scope="${e}" aria-pressed="${a}">${s}</button>`}function at(e,t,s="personal"){const a=Ee(s),n=a==="global"?t:e,i=(n==null?void 0:n.killsByType)||{},o=(n==null?void 0:n.survivalByType)||{};return`
    <div class="battle-piece-grid" aria-label="${a==="global"?"全站棋子游玩统计":"玩家棋子游玩统计"}">
      ${S.map(r=>`
        <div class="battle-piece-card">
          <b>${r.label}</b>
          <span><em>击杀${T(Le(i,r.type))}</em><em>存活${Me(_e(o,r.type))}</em></span>
        </div>
      `).join("")}
    </div>`}function st(e={}){const t=(e==null?void 0:e.killsByType)||{},s=(e==null?void 0:e.survivalByType)||{};return`
    <div class="home-desktop-stats" aria-label="玩家棋子表现">
      <strong>玩家棋子表现</strong>
      <div class="home-desktop-piece-grid">
        ${S.map(a=>`
          <span class="home-desktop-piece">
            <b>${a.label}</b>
            <em>击杀${T(Le(t,a.type))}</em>
            <i>存活${Me(_e(s,a.type))}</i>
          </span>
        `).join("")}
      </div>
    </div>`}function J(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function ge(e,t){const s=we[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>${a?'<i aria-hidden="true">✔</i>':""}
  </button>`}function nt(e){return`${(Math.max(0,Number(e)||0)/1e3).toFixed(e%1e3===0?0:1)} 秒`}function it(e){return Ye[e.id]||e.desc}function ot(e){var a;const t=Ze[e.id]||{setupLabel:"规则",setup:((a=e.config)==null?void 0:a.mode)==="classic"?"基础象棋":"本关规则",focus:e.desc||"赢下本局"};return`
    <div class="challenge-force-brief">
      <p><b>${t.setupLabel||"觉醒"}</b><span>${t.setup}</span></p>
      <p><b>打法</b><span>${t.focus}</span></p>
    </div>`}function rt(e){const t=String(e||"").replace(/\s+/g,""),s={移动过每种棋子:"移动全部棋子",用4种不同棋子吃过子:"4种棋子吃子",获胜:"获胜",車运输叠兵:"车运叠兵",叠兵到达底线:"叠兵到底线",王出九宫格:"帅出九宫",王击杀叠层棋子:"帅吃叠子"};return s[t]?s[t]:t.replace(/觉醒車/g,"觉醒车").replace(/^觉醒/g,"").replace(/擊/g,"击").replace(/达到/g,"").replace(/一次连踩链/g,"马连踩").replace(/步内获胜/g,"步内胜")}function ct(e){const t=Pe(e.homeMode),s=we[t],a=_.find(r=>r.id===s.aiLevelId),n=_.find(r=>r.id===s.freeLevelId),i=ee(e.settings),o=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-step-block home-rule-step">
        <div class="home-step-head">
          <span>1</span><b>选择规则</b>
        </div>
        <div class="home-mode-switch" role="group" aria-label="规则模式">
          ${ge("classic",t)}
          ${ge("kw",t)}
        </div>
      </div>
      <div class="home-step-block home-play-step">
        <div class="home-step-head">
          <span>2</span><b>开始对局</b>
        </div>
        <div class="home-action-row">
          ${a?`
          <button class="home-action-primary" data-select-level="${a.id}" data-play-source="home-ai">
            <span>${i.label}</span><b>人机对弈</b>
          </button>`:""}
          ${n?`
          <button class="home-action-secondary" data-select-level="${n.id}" data-play-source="free">
            <span>双人</span><b>自由对弈</b>
          </button>`:""}
        </div>
      </div>
      <div class="home-record-strip" aria-label="战绩">
        <div><i aria-hidden="true">胜</i><span>胜场</span><b>${e.totalWins||0}</b></div>
        <div><i aria-hidden="true">局</i><span>总场次</span><b>${e.totalGames||0}</b></div>
        <div><i aria-hidden="true">率</i><span>胜率</span><b>${o}</b></div>
      </div>
      <div class="home-desktop-play-info" aria-label="当前对局说明">
        <p><b>${s.title}</b><span>${s.desc}</span></p>
        <p><b>人机对弈</b><span>使用自由对弈AI强度，胜负计入战绩。</span></p>
        <p><b>自由对弈</b><span>本地双人练规则，不计入战绩。</span></p>
      </div>
      ${st(e.personalStats)}
    </section>`}function ae(){return _.filter(e=>!e.freePlay)}function lt(e){return te.find(t=>Number(t.id)===Number(e.tierId))||null}function dt(e){const t=lt(e),a=((t==null?void 0:t.levels)||[]).filter(n=>!n.freePlay).findIndex(n=>Number(n.id)===Number(e.id));return`${e.tierId||1}-${Math.max(1,a+1)}`}function ut(e){const t=ae(),s=[];return te.forEach(a=>{const n=t.filter(o=>Number(o.tierId)===Number(a.id)),i=Math.max(1,Math.ceil(n.length/e));for(let o=0;o<n.length;o+=e)s.push({tierId:a.id,tierName:a.name,tierPage:Math.floor(o/e)+1,tierPageCount:i,levels:n.slice(o,o+e)})}),s}function pt(e,t){return`<div class="challenge-star-goals" aria-label="星级条件">
    ${e.stars.map((s,a)=>{const n=t>>a&1;return`<span class="challenge-star-chip ${n?"is-earned":""}"><b>${n?"★":"☆"}</b><em>${rt(s.desc)}</em></span>`}).join("")}
  </div>`}function mt(e,t,s){var c;const a=t[e.id]||0,n=q(e.id,t),i=tt(e,t),o=dt(e),r=n&&Number(e.id)===Number(s);return`
    <article class="challenge-level-card ${i?"is-completed":""} ${r?"is-selected":""} ${n?"is-playable":"is-locked"}"
             data-mode="${((c=e.config)==null?void 0:c.mode)??"kw"}"
             ${n?`data-challenge-level="${e.id}" role="button" tabindex="0" aria-pressed="${r}"`:""}>
      <div class="challenge-card-head">
        <span class="challenge-index">${o}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${it(e)}</em>
        </div>
      </div>
      ${ot(e)}
      ${pt(e,a)}
    </article>`}function gt(e,t,s){const a=e.find(n=>Number(n.id)===Number(s)&&q(n.id,t));return a||e.find(n=>q(n.id,t))||null}function vt(e,t){return t<=1?"":`<div class="challenge-pager" aria-label="关卡翻页">
    <button type="button" data-level-page="${e-1}" ${e<=0?"disabled":""}>‹</button>
    <span>${e+1} / ${t}</span>
    <button type="button" data-level-page="${e+1}" ${e>=t-1?"disabled":""}>›</button>
  </div>`}function ft(e,t,s,a){var g;const n=typeof window<"u"&&((g=window.matchMedia)!=null&&g.call(window,"(min-width: 1024px)").matches)?We:Xe,i=ae(),o=ut(n),r=Math.max(1,o.length),c=Math.min(Math.max(0,e.levelPage||0),r-1),d=o[c]||{tierId:1,tierName:"传统象棋",levels:[]},u=d.levels,f=gt(u,e.starsPerLevel,e.selectedChallengeLevel);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <h2>关卡模式</h2>
        <button class="challenge-head-start" type="button" ${f?`data-select-level="${f.id}" data-play-source="challenge"`:"disabled"}>开始挑战</button>
        <div class="challenge-summary">
          <span>通关 <b>${t}/${i.length||Je}</b></span>
          <span>★ <b>${s}/${a}</b></span>
        </div>
      </header>
      <div class="challenge-level-list">
        <div class="challenge-tier-group" data-tier="${d.tierId}">
          <div class="challenge-tier-head">
            <span>第${d.tierId}层</span>
            <b>${d.tierName}</b>
            ${vt(c,r)}
          </div>
          <div class="challenge-tier-list">
            ${u.map(v=>mt(v,e.starsPerLevel,f==null?void 0:f.id)).join("")}
          </div>
        </div>
      </div>
    </section>`}function ht(e){const t=e.usageStats||{},s=e.personalStats||{},a=Ee(e.statsScope);return`
    <article class="home-modal-block info-author-card">
      <div class="info-author-links">
        <div class="info-author-main">
          <p class="info-author-line"><strong>作者</strong><a href="https://xhslink.com/m/A2DFslJF4mb" target="_blank" rel="noreferrer">落星峦</a></p>
        </div>
        <div class="info-link-list">
          <p><a href="https://github.com/kw66/kw-chess" target="_blank" rel="noreferrer"><span>项目地址</span><em>⭐ 求个 star</em></a></p>
          <p><a href="https://xhslink.com/m/A2DFslJF4mb" target="_blank" rel="noreferrer"><span>小红书交流帖</span><em>❤️ 求点赞</em></a></p>
        </div>
      </div>
      <div class="info-qr-placeholder" aria-label="小红书交流群二维码预留">
        <div class="info-qr-box"><span>QR</span></div>
        <span>交流群二维码预留</span>
      </div>
    </article>
    <article class="home-modal-block info-stats-block">
      <h3>全站热度</h3>
      <div class="usage-inline-stats" aria-live="polite">
        <span><b>访问 ${T(t.totalPv)}</b><em>今日 ${T(t.todayPv)}</em></span>
        <span><b>访客 ${T(t.totalUv)}</b><em>今日 ${T(t.todayUv)}</em></span>
        <span><b>游玩 ${T(t.totalGames)}</b><em>今日 ${T(t.todayGames)}</em></span>
      </div>
      <p class="info-stats-note">${e.usageStatsStatus||"全站统计读取中。"}</p>
    </article>
    <article class="home-modal-block info-stats-block">
      <div class="info-stats-head">
        <h3>游玩统计</h3>
        <div class="stats-scope-switch" role="group" aria-label="游玩统计范围">
          ${me("personal",a,"玩家")}
          ${me("global",a,"全站")}
        </div>
      </div>
      ${at(s,t,a)}
    </article>
    <article class="home-modal-block info-recommend-block">
      <h3>其他游戏推荐</h3>
      <div class="recommend-list">
        <p><a href="https://kw66.github.io/photo-hero/" target="_blank" rel="noreferrer">图片勇者</a>：拍照或画图鉴定装备，带着自己的物品一路爬塔冒险。</p>
        <p><a href="https://kw66.github.io/PhD_Simulator/" target="_blank" rel="noreferrer">研究生模拟器 v1.0</a>：在导师、论文、实验和精神状态之间求生的校园文字模拟器。</p>
      </div>
    </article>`}const bt={車:"车",馬:"马",炮:"炮",兵:"兵",仕:"仕",相:"相",帅:"帅",叠:"叠"};function yt(e,t="red"){return t==="red"&&bt[e]||e}function Q(e,t){const s=e.owner==="black"?"black":"red",a=yt(e.piece||t.piece,s),n=a==="帅"||a==="将"?"is-king-piece":"",i=Math.max(1,Math.trunc(Number(e.layer)||1)),o=Array.isArray(e.groups)&&e.groups.length?e.groups.map(c=>Math.max(1,Math.trunc(Number(c)||1))):i>1?[i]:[],r=o.length>1?"is-unmerged":"is-merged";return`<span class="rule-piece is-${s} ${n} ${e.ghost?"is-ghost":""}" aria-hidden="true">
    <span class="rule-piece-core">${a}</span>
    ${o.length?`<span class="rule-piece-badges ${r}">
      ${o.map(c=>`<i>${c}</i>`).join("")}
    </span>`:""}
  </span>`}function Te(e){return Array.isArray(e.animations)?e.animations:e.animation?[e.animation]:[]}function kt(e,t,s,a){const n=Array.isArray(t.from)?t.from:[Math.floor(s/2),Math.floor(s/2)],i=Array.isArray(t.to)?t.to:n,o=(Number(n[0])+.5)/s*100,r=(Number(n[1])+.5)/s*100,c=(Number(i[0])+.5)/s*100,d=(Number(i[1])+.5)/s*100,u=o+(c-o)*.42,f=r+(d-r)*.42,g=["move","attack","skill","combo","denied"].includes(t.kind)?t.kind:"move",v=[`--from-left:${o.toFixed(4)}%`,`--from-top:${r.toFixed(4)}%`,`--to-left:${c.toFixed(4)}%`,`--to-top:${d.toFixed(4)}%`,`--bump-left:${u.toFixed(4)}%`,`--bump-top:${f.toFixed(4)}%`,`--anim-delay:${Number(t.delay??a*180)}ms`].join(";");return`<span class="rule-anim-piece is-${g}-demo" style="${v}">
    ${Q({piece:t.piece||e.piece,owner:t.owner||"red",layer:t.layer||1,groups:t.groups,ghost:t.ghost},e)}
  </span>`}function $t(e,t,s){const a=[];if(e.palace){const n=e.palace,i=Number(n.size||3),o=Number(n.x||0)/t*100,r=Number(n.y||0)/t*100,c=i/t*100;a.push(`<span class="rule-palace-frame" style="--palace-left:${o.toFixed(4)}%;--palace-top:${r.toFixed(4)}%;--palace-size:${c.toFixed(4)}%"></span>`)}if(e.river){const n=Number(e.river.y||0)/t*100;a.push(`<span class="rule-river-line" style="--river-top:${n.toFixed(4)}%"></span>`)}return Te(e).forEach((n,i)=>{a.push(kt(s,n,t,i))}),a.join("")}function wt(e,t){const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map;(t.marks||[]).forEach(c=>{const d=`${c.x},${c.y}`,u=n.get(d)||[];u.push(c),n.set(d,u)});const i=new Map((t.pieces||[]).map(c=>[`${c.x},${c.y}`,c])),o=Te(t),r=[];for(let c=0;c<s;c+=1)for(let d=0;d<s;d+=1){const u=n.get(`${d},${c}`)||[],f=i.get(`${d},${c}`),g=d===a.x&&c===a.y,v=t.showCenter!==!1&&!o.length,k=[...new Set(u.map($=>$.type).filter(Boolean))].map($=>`is-${$}`).join(" "),y=f?Q(f,e):g&&v?Q({piece:t.piece||e.piece,owner:t.centerOwner||"red",layer:t.centerLayer||1,groups:t.centerGroups},e):"";r.push(`<span class="rule-cell ${g?"is-center":""} ${k}">${y}</span>`)}return`<div class="rule-mini-board ${o.length?"has-animation":""}" style="--board-size:${s}" aria-hidden="true">${r.join("")}${$t(t,s,e)}</div>`}function xt(e,t){return`
    <div class="rule-diagram">
      ${wt(e,t)}
    </div>`}function St(e){const t=e==="kw"?Se:xe,s=[];return t.forEach((a,n)=>{const i=a.diagrams||(a.diagram?[a.diagram]:[]),o=i.length?i:[m(a.name,[],{showCenter:!0})];o.forEach((r,c)=>{s.push({rule:a,ruleIndex:n,diagramIndex:c,diagram:r,pageInRule:c,pagesInRule:o.length})})}),s}function Pt(e,t,s){return(e==="kw"?Se:xe).map((n,i)=>{const o=t.findIndex(d=>d.ruleIndex===i),r=o>=0?o:0,c=n.piece==="叠"?"叠层":n.name.replace(/^觉醒/,"").replace(/^通用/,"");return`
      <button type="button" data-codex-page="${r}" class="${s===i?"is-active":""}" aria-pressed="${s===i}">
        <b>${c}</b>
      </button>`}).join("")}function Mt(e,t){var c,d;const{rule:s,diagram:a,diagramIndex:n,pageInRule:i,pagesInRule:o}=e,r=((c=s.sections)==null?void 0:c[n])||((d=s.sections)==null?void 0:d[0])||{items:s.lines||[]};return`
    <article class="rule-card" aria-label="${s.name} ${o>1?`${i+1}/${o} `:""}${a.title}">
      <div class="rule-visuals diagram-count-1">${xt(s,a)}</div>
      <div class="rule-copy">
        <section>
          <ul>
            ${(r.items||[]).map(u=>`<li>${u}</li>`).join("")}
          </ul>
        </section>
      </div>
    </article>`}function Lt(e){const t=e==="kw"?"kw":"classic";return`
    <div class="rules-switch rules-switch-head" role="group" aria-label="棋子图鉴分类">
      <button type="button" data-codex-mode="classic" class="${t==="classic"?"is-active":""}" aria-pressed="${t==="classic"}">传统象棋</button>
      <button type="button" data-codex-mode="kw" class="${t==="kw"?"is-active":""}" aria-pressed="${t==="kw"}">科王象棋</button>
    </div>`}function _t(e,t=0){const s=e==="kw"?"kw":"classic",a=St(s),n=Math.min(a.length-1,Math.max(0,Math.trunc(Number(t)||0))),i=a[n],o=n<=0?a.length-1:n-1,r=n>=a.length-1?0:n+1;return`
    <div class="codex-piece-tabs" role="group" aria-label="棋子选择">
      ${Pt(s,a,i.ruleIndex)}
    </div>
    <div class="rules-pager" aria-label="图鉴翻页">
      <button type="button" data-codex-page="${o}" aria-label="上一页">‹</button>
      <div>
        <b>${i.pageInRule+1} / ${i.pagesInRule}</b>
      </div>
      <button type="button" data-codex-page="${r}" aria-label="下一页">›</button>
    </div>
    <section class="rules-panel" aria-label="${s==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid is-paged">
        ${Mt(i)}
      </div>
    </section>`}function Et(e){const t=D(e),s=ee(t);return`
    <article class="home-modal-block settings-panel">
      <h3>声音</h3>
      <div class="sound-control-grid">
        <label class="sound-toggle-row">
          <span>音效</span>
          <input class="setting-toggle-input" data-setting-toggle="sfxEnabled" type="checkbox" ${t.sfxEnabled?"checked":""}>
        </label>
        <label class="sound-slider-row">
          <span>音效音量</span>
          <input data-setting-range="sfxVolume" type="range" min="0" max="100" value="${t.sfxVolume}" style="--slider-fill:${t.sfxVolume}%">
          <strong data-setting-value>${t.sfxVolume}%</strong>
        </label>
        <label class="sound-toggle-row">
          <span>背景音乐</span>
          <input class="setting-toggle-input" data-setting-toggle="bgmEnabled" type="checkbox" ${t.bgmEnabled?"checked":""}>
        </label>
        <label class="sound-slider-row">
          <span>音乐音量</span>
          <input data-setting-range="bgmVolume" type="range" min="0" max="100" value="${t.bgmVolume}" style="--slider-fill:${t.bgmVolume}%">
          <strong data-setting-value>${t.bgmVolume}%</strong>
        </label>
      </div>
    </article>
    <article class="home-modal-block settings-panel">
      <h3>自由对弈AI强度</h3>
      <div class="ai-choice-grid" role="group" aria-label="自由对弈AI强度">
        ${G.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>AI回合 ${nt(a.time)}</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function X(e,t,s,a,n=""){return`
    <div class="home-modal" id="home-panel-${e}" data-home-modal="${e}"${a===e?"":" hidden"}>
      <section class="home-sheet" role="dialog" aria-modal="true" aria-labelledby="home-panel-title-${e}">
        <header class="home-sheet-head">
          <div>
            <h2 id="home-panel-title-${e}">${t}</h2>
          </div>
          ${n}
          <button class="home-sheet-close" type="button" data-close-home-panel>收起</button>
        </header>
        <div class="home-sheet-body">
          ${s}
        </div>
      </section>
    </div>`}function Tt(e){return`
    ${X("author","游戏信息",ht(e),e.activeHomePanel)}
    ${X("codex","棋子图鉴",_t(e.codexMode,e.codexPage),e.activeHomePanel,Lt(e.codexMode))}
    ${X("settings","设置",Et(e.settings),e.activeHomePanel)}`}function ve(e){const t=Pe(e.homeMode),s=ae(),a=qe(e.starsPerLevel,s),n=Qe(s),i=et(e.starsPerLevel,s);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${J("author","游戏信息",e.activeHomePanel)}
          ${J("codex","棋子图鉴",e.activeHomePanel)}
          ${J("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${ct({...e,homeMode:t})}
        ${ft({...e},i,a,n)}
      </main>
      ${Tt(e)}
    </div>`}function It(e){return`
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
    </div>`}function Bt(e){return`
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
    </div>`}const Ie={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function Ct(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function fe(e){return String(e).replace(/"/g,"&quot;")}function At(e){const t=Math.max(0,Number(e)||0);return`${(t/1e3).toFixed(t%1e3===0?0:1)} 秒`}function Be(e,t,s){var n,i;if((n=e.config)!=null&&n.noAi)return null;if(s==="home-ai")return ee(t);const a=Math.max(100,Math.trunc(Number((i=e.config)==null?void 0:i.aiTime)||500));return{id:`level-${a}`,label:At(a),time:a}}function Nt(e,t){var a;const s=((a=e.config)==null?void 0:a.mode)??"kw";return t==="home-ai"?s==="classic"?{name:"传统对弈",desc:"经典规则人机局：车马炮兵仕相帅都按传统象棋走法行动。"}:{name:"科王对弈",desc:"完整觉醒规则人机局：用叠层、合体和范围技与 AI 对攻。"}:t==="free"?s==="classic"?{name:"传统自由对弈",desc:"经典规则本地双人局，不计入战绩。"}:{name:"科王自由对弈",desc:"完整觉醒规则本地双人局，不计入战绩。"}:{name:e.name,desc:e.desc}}function Ut(e,t){var i,o;const s=((i=e.config)==null?void 0:i.mode)??"kw";return[t==="challenge"&&((o=e.tutorial)!=null&&o.length)?e.tutorial[0].text:"",s==="classic"?"单击棋子查看落点，再点目标落子。":"单击棋子查看落点；双击叠子可拆分/合体，双击兵可自爆。"].filter(Boolean).join(" ")}function Gt(e){const t=`
    <span><i class="move-mark move-mark-safe"></i>可落子</span>
    <span><i class="move-mark move-mark-warning"></i>王受伤</span>
    <span><i class="move-mark move-mark-danger"></i>王危险</span>`;return e==="classic"?t:`${t}
    <span><i class="move-mark move-mark-stack"></i>叠子</span>
    <span><i class="move-mark move-mark-charge"></i>冲撞</span>`}function Ot(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function jt(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop","king"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,o])=>{o&&s.add(i)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(i=>s.add(i)),[...s].filter(i=>Ie[i])}function Ht(e){const t=jt(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=Ie[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function Rt(e,t,s){var o,r,c;const a=new URLSearchParams;a.set("levelId",e.id);const n=Be(e,t,s);n&&(a.set("ai","1"),a.set("aiTime",String(n.time)),a.set("aiStrength",n.id));const i=((o=e.config)==null?void 0:o.mode)??"kw";if(a.set("mode",i),i==="classic"&&a.set("classic","1"),i!=="classic"){const d=((r=e.config)==null?void 0:r.playerUpgrades)||{},u=((c=e.config)==null?void 0:c.aiUpgrades)||{},f=Object.keys(d).filter(v=>d[v]).join(","),g=Object.keys(u).filter(v=>u[v]).join(",");f&&a.set("pu",f),g&&a.set("au",g)}return`./index-legacy.html?${a.toString()}`}function Kt(e){var $,P;const t=$e(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=Ct(s),n=t.stars.length,i=t.pieces?t.pieces.map(L=>pe[L]).join(" "):t.piece?pe[t.piece]:"",o=Be(t,e.settings,e.currentPlaySource),r=Rt(t,e.settings,e.currentPlaySource),c=Nt(t,e.currentPlaySource),d=(o==null?void 0:o.label)||"",u=!(($=t.config)!=null&&$.noAi)&&d,f=((P=t.config)==null?void 0:P.mode)??"kw",g={classic:"传统",mixed:"觉醒",kw:"科王"}[f]||"科王",v=t.freePlay?"双人":"红方",k=t.freePlay?'<span class="game-header-badge">自由对弈</span>':u?`<span class="game-header-badge game-header-ai">AI · ${d}</span>`:'<span class="game-header-badge">双人对局</span>',y=Ut(t,e.currentPlaySource);return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-header-title">
            ${i?`<span class="game-header-piece">${i}</span>`:""}
            <div class="game-header-text">
              <span class="game-header-name">${c.name}</span>
              <span class="game-header-desc">${c.desc}</span>
            </div>
            ${k}
          </div>
          <div class="game-header-stars">
            ${t.stars.map((L,w)=>`<span class="star ${s>>w&1?"star-earned":"star-empty"}">${s>>w&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${n}</span>
          </div>
        </div>
        <div class="game-toolbar-row">
          <div class="game-status-strip" aria-label="本局状态">
            <span class="game-status-chip">♟ ${g}</span>
            <span class="game-status-chip">${u?`AI ${d}`:v}</span>
            <span class="game-status-chip game-live-turn" id="outer-live-turn">红方回合</span>
            <span class="game-status-chip game-live-message" id="outer-live-message" hidden></span>
          </div>
          <div class="game-action-bar" aria-label="对局操作">
            <button class="game-action-button" type="button" data-game-command="restart">重开</button>
            <button class="game-action-button" type="button" data-game-command="draw">求和</button>
          </div>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${r}"
            title="${fe(c.name)}"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${y?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${fe(y)}">${y||"选择棋子查看走法"}</div>
            <div class="move-legend" aria-label="落点颜色说明">
              ${Gt(f)}
            </div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${Ht(t)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${Ot(s,t.stars)}
            </div>
            ${t.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
          </div>

          <!-- 3. 胜率（仅有 AI 时显示） -->
          ${u?`
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
    </div>`}function Dt(e){switch(e.screen){case"menu":return ve(e);case"levels":return It();case"upgrade":return Bt();case"game":return Kt(e);default:return ve(e)}}const Ft={rook:"R",horse:"H",cannon:"C",pawn:"P",advisor:"A",bishop:"B",king:"K"};function Ce(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return new Set;if(t==="kw")return new Set(S.map(i=>i.type));const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,o])=>{const r=Ft[i];o&&r&&s.add(r)}),s}function Vt(e,t){return Object.fromEntries(S.map(s=>[s.type,t.has(s.type)?Math.max(0,Math.trunc(Number(e==null?void 0:e[s.type])||0)):0]))}function Jt(e,t){return Object.fromEntries(S.map(s=>{const a=(e==null?void 0:e[s.type])||{};return[s.type,t.has(s.type)?{moves:Math.max(0,Math.trunc(Number(a.moves)||0)),games:Math.max(0,Math.trunc(Number(a.games)||0))}:{moves:0,games:0}]}))}function Xt(e,t,s){var a;return!(s!=null&&s.complete)||e.freePlay||(a=e.config)!=null&&a.noAi||t==="free"?!1:Ce(e).size>0}function Wt(e,t){const s=Ce(e);return{...t,redKillsByType:Vt(t.redKillsByType,s),redSurvivalByType:Jt(t.redSurvivalByType,s)}}function Yt(e){const t=Ve();function s(){const a=t.getState();if(e.dataset.screen==="game"&&a.screen==="game"&&e.dataset.levelId===String(a.currentLevel??"")&&e.dataset.playSource===String(a.currentPlaySource??"")){e.dataset.screen=a.screen;return}e.dataset.screen=a.screen,e.dataset.levelId=String(a.currentLevel??""),e.dataset.playSource=String(a.currentPlaySource??""),e.innerHTML=Dt(a)}t.subscribe(s),Oe().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{const n=a.target;if(!(n instanceof HTMLElement))return;const i=n.closest("[data-home-panel]");if(i){const w=i.dataset.homePanel;t.dispatch("toggle-home-panel",{panel:w});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){t.dispatch("close-home-panels");return}const o=n.closest("[data-codex-mode]");if(o){t.dispatch("set-codex-mode",{mode:o.dataset.codexMode});return}const r=n.closest("[data-codex-page]");if(r){t.dispatch("set-codex-page",{page:r.dataset.codexPage});return}const c=n.closest("[data-home-mode]");if(c){t.dispatch("set-home-mode",{mode:c.dataset.homeMode});return}const d=n.closest("[data-level-page]");if(d){t.dispatch("set-level-page",{page:d.dataset.levelPage});return}const u=n.closest("[data-challenge-level]");if(u){t.dispatch("set-selected-challenge-level",{levelId:u.dataset.challengeLevel});return}const f=n.closest("[data-info-stats-scope]");if(f){t.dispatch("set-stats-scope",{scope:f.dataset.infoStatsScope});return}const g=n.closest("[data-setting-ai]");if(g){t.dispatch("update-settings",{aiStrength:g.dataset.settingAi});return}const v=n.closest("[data-game-command]");if(v){const w=document.getElementById("game-iframe");w instanceof HTMLIFrameElement&&w.contentWindow&&w.contentWindow.postMessage({type:"game-command",command:v.dataset.gameCommand},"*");return}const k=n.closest("[data-navigate]");if(k){t.dispatch("navigate",{screen:k.dataset.navigate});return}const y=n.closest("[data-select-level]");if(y){const w=parseInt(y.dataset.selectLevel,10);isNaN(w)||t.dispatch("select-level",{levelId:w,playSource:y.dataset.playSource});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const P=n.closest("[data-action]");if(P){const w=P.dataset.action;if(w==="back-to-menu"||w==="back-to-levels"){const C=document.getElementById("game-iframe");C instanceof HTMLIFrameElement&&C.contentWindow&&C.contentWindow.postMessage({type:"game-command",command:"abort-ai"},"*"),t.dispatch(w);return}}const L=n.closest("[data-toggle-upgrade]");if(L){t.dispatch("toggle-upgrade",{pieceType:L.dataset.toggleUpgrade});return}}),e.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" ")return;const n=a.target;if(!(n instanceof HTMLElement))return;const i=n.closest("[data-challenge-level]");i&&(a.preventDefault(),t.dispatch("set-selected-challenge-level",{levelId:i.dataset.challengeLevel}))}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const i=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${i}%`);const o=n.closest(".sound-slider-row"),r=o==null?void 0:o.querySelector("[data-setting-value]");r&&(r.textContent=`${i}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const i=n.dataset.settingToggle;if(i){t.dispatch("update-settings",{[i]:n.checked});return}const o=n.dataset.settingRange;o&&t.dispatch("update-settings",{[o]:n.value})}),window.addEventListener("keydown",a=>{a.key==="Escape"&&t.dispatch("close-home-panels")}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const i=$e(n.currentLevel);if(i){if(a.data.type==="piece-selected"){const o=document.getElementById("hint-display");if(!o)return;const r=a.data.hint;if(r)o.textContent=r,o.classList.remove("hint-empty");else{const c=o.dataset.default||"";o.textContent=c||"选择棋子查看走法",o.classList.toggle("hint-empty",!c)}return}if(a.data.type==="game-status"){const o=document.getElementById("outer-live-turn"),r=document.getElementById("outer-live-message");if(o&&a.data.turnText&&(o.textContent=a.data.turnText,o.classList.toggle("is-black-turn",a.data.turn==="black"),o.classList.toggle("is-red-turn",a.data.turn==="red"),o.classList.toggle("is-draw-turn",a.data.turn==="draw")),r){const c=a.data.message||"";r.textContent=c,r.hidden=!c}return}if(a.data.type==="game-progress"){const o=a.data.stats||{},r=n.starsPerLevel[i.id]||0,c=document.getElementById("star-goal-list");if(c&&(c.innerHTML=i.stars.map((g,v)=>{const k=r>>v&1,y=!!(g.eval&&g.eval(o)),$=k||y;return`<div class="star-goal ${$?"star-goal-earned":""}">
            <span class="star-goal-icon">${$?"★":"☆"}</span>
            <span class="star-goal-desc">${g.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const g=a.data.redPct,v=100-g,k=document.getElementById("outer-red-pct"),y=document.getElementById("outer-blk-pct"),$=document.getElementById("outer-fill-red"),P=document.getElementById("outer-advantage");k&&(k.textContent=g+"%"),y&&(y.textContent=v+"%"),$&&($.style.width=g+"%"),P&&a.data.advantage&&(P.textContent=a.data.advantage)}const d=document.getElementById("outer-cap-red"),u=document.getElementById("outer-cap-black");d&&a.data.capturedRed!==void 0&&(d.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(g=>`<span class="cap-item red">${g}</span>`).join(""):'<span class="cap-empty">—</span>'),u&&a.data.capturedBlack!==void 0&&(u.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(g=>`<span class="cap-item blk">${g}</span>`).join(""):'<span class="cap-empty">—</span>');const f=document.getElementById("outer-move-log");f&&a.data.moves!==void 0&&(a.data.moves.length===0?f.innerHTML='<span class="log-empty">对局尚未开始</span>':(f.innerHTML=a.data.moves.map(g=>`<div class="log-entry ${g.side==="red"?"log-red":"log-blk"}">${g.text}</div>`).join(""),f.scrollTop=f.scrollHeight));return}if(a.data.type==="game-end"){const o=a.data.stats||{};let r=0;if(i.stars.forEach((c,d)=>{c.eval&&c.eval(o)&&(r|=1<<d)}),i.freePlay||t.dispatch("game-result",{newStarBits:r,win:!!o.win}),Xt(i,n.currentPlaySource,o)){const c=Wt(i,o);t.dispatch("record-personal-stats",{stats:c}),je(c).then(({stats:d,status:u})=>{t.dispatch("usage-stats-updated",{stats:d,status:u})}).catch(d=>{console.warn("全站游玩统计失败:",d),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}}),s()}const Ae=document.querySelector("#app");if(!Ae)throw new Error("#app container not found");Yt(Ae);
