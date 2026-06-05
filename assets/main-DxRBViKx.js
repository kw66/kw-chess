(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const ee={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},Qe="https://ypefmpeekfucmarbbdov.supabase.co",xe="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",y={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day",survivalMoves:"kw_chess_survival_moves_total",survivalGames:"kw_chess_survival_games_total",survivalMovePrefix:"kw_chess_survival_moves",survivalGamePrefix:"kw_chess_survival_games",killPrefix:"kw_chess_kill"},I=[{type:"R",label:"车"},{type:"H",label:"马"},{type:"C",label:"炮"},{type:"P",label:"兵"},{type:"A",label:"仕"},{type:"B",label:"相"},{type:"K",label:"帅"}];function L(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function et(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0,killsByType:Ne(),survivalByType:rt(),survivalMoves:0,survivalGames:0,avgSurvivalMoves:0}}function tt(e){const t=e&&typeof e=="object"?e:{},s=L(t.survivalMoves),a=L(t.survivalGames);return{totalPv:L(t.totalPv),totalUv:L(t.totalUv),totalGames:L(t.totalGames),todayPv:L(t.todayPv),todayUv:L(t.todayUv),todayGames:L(t.todayGames),killsByType:W(t.killsByType),survivalByType:Y(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0}}async function at(){const e=Ge();return e&&await nt(),{stats:await ce(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function st(e={}){if(!Ge())return{stats:await ce(),status:"本地预览不会写入全站统计。"};const t=ne(),s=[C(y.totalGames),C(D(y.dailyGamesPrefix,t))],a=W(e.redKillsByType);for(const o of I){const c=a[o.type]||0;for(let d=0;d<c;d+=1)s.push(C(le(o.type)))}const n=L(e.totalMoves,0,300);if(n>0){s.push(C(y.survivalGames));for(let o=0;o<n;o+=1)s.push(C(y.survivalMoves))}const i=Y(e.redSurvivalByType);for(const o of I){const c=i[o.type],d=L(c.games,0,16),u=d>0?L(Math.round(c.moves/d),0,300):0;d>0&&s.push(C(ue(o.type)));for(let m=0;m<u;m+=1)s.push(C(de(o.type)))}return await Promise.all(s),{stats:await ce(),status:"游玩局数已同步。"}}async function nt(){const e=ne();await Promise.all([C(y.totalPv),C(D(y.dailyPvPrefix,e))]);const t=localStorage.getItem(ee.statsVisitor)==="true",s=localStorage.getItem(ee.statsLastUvDate),a=[];t||(a.push(C(y.totalUv)),localStorage.setItem(ee.statsVisitor,"true")),s!==e&&(a.push(C(D(y.dailyUvPrefix,e))),localStorage.setItem(ee.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function ce(){const e=ne(),t=D(y.dailyPvPrefix,e),s=D(y.dailyUvPrefix,e),a=D(y.dailyGamesPrefix,e),n=I.map(u=>le(u.type)),i=I.map(u=>de(u.type)),r=I.map(u=>ue(u.type)),o=await it([y.totalPv,y.totalUv,y.totalGames,y.survivalMoves,y.survivalGames,t,s,a,...n,...i,...r]),c={},d={};return I.forEach(u=>{c[u.type]=o[le(u.type)];const m=o[de(u.type)],g=o[ue(u.type)];d[u.type]={moves:m,games:g,avg:g>0?Math.round(m/g):0}}),tt({totalPv:o[y.totalPv],totalUv:o[y.totalUv],totalGames:o[y.totalGames],todayPv:o[t],todayUv:o[s],todayGames:o[a],survivalMoves:o[y.survivalMoves],survivalGames:o[y.survivalGames],killsByType:c,survivalByType:d})}async function C(e){return Be("increment_counter",{counter_id:e})}async function it(e){const t=await Be("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=L(a.count));return s}async function Be(e,t){const s=await fetch(`${Qe}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:xe,Authorization:`Bearer ${xe}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function Ge(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function D(e,t=ne()){return`${e}_${t.replaceAll("-","")}`}function le(e){return`${y.killPrefix}_${e}`}function de(e){return`${y.survivalMovePrefix}_${e}`}function ue(e){return`${y.survivalGamePrefix}_${e}`}function Ne(){return Object.fromEntries(I.map(e=>[e.type,0]))}function W(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(I.map(s=>[s.type,L(t[s.type])]))}function rt(){return Object.fromEntries(I.map(e=>[e.type,{moves:0,games:0,avg:0}]))}function Y(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(I.map(s=>{const a=t[s.type]&&typeof t[s.type]=="object"?t[s.type]:{},n=L(a.moves,0,99999999),i=L(a.games,0,99999999);return[s.type,{moves:n,games:i,avg:i>0?Math.round(n/i):0}]}))}function ne(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const F={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"fair"},N=[{id:"learn",label:"难度 1",time:2e3,note:"熟悉规则稳健落子"},{id:"fair",label:"难度 2",time:4e3,note:"攻防均衡认真对局"},{id:"boss",label:"难度 3",time:6e3,note:"深度搜索挑战极限"}];function we(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function ie(e){const t=e&&typeof e=="object"?e:{},s=N.some(a=>a.id===t.aiStrength)?t.aiStrength:F.aiStrength;return{sfxEnabled:t.sfxEnabled??F.sfxEnabled,sfxVolume:we(t.sfxVolume,F.sfxVolume),bgmEnabled:t.bgmEnabled??F.bgmEnabled,bgmVolume:we(t.bgmVolume,F.bgmVolume),aiStrength:s}}function z(e){const t=ie(e);return N.find(s=>s.id===t.aiStrength)||N.find(s=>s.id===F.aiStrength)||N[0]}const Ue="kw-chess-save";function ot(){try{const e=localStorage.getItem(Ue);return e?JSON.parse(e):null}catch{return null}}function V(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,personalStats:e.personalStats,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(Ue,JSON.stringify(t))}catch{}}function ct(){const e=ot(),t=(e==null?void 0:e.personalStats)||{},s=Math.max(0,Math.trunc(Number(t.survivalMoves)||0)),a=Math.max(0,Math.trunc(Number(t.survivalGames)||0));return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,personalStats:{killsByType:W(t.killsByType),survivalByType:Y(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0},usageStats:et(),usageStatsStatus:"全站统计读取中。",settings:ie(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"kw",codexPage:0,homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,selectedChallengeLevel:null,statsScope:"personal",currentLevel:null,currentPlaySource:null}}function lt(){let e=ct();const t=new Set;function s(){return e}function a(r){const o=typeof r=="function"?r(e):r;e={...e,...o},t.forEach(c=>c(e))}function n(r){return t.add(r),()=>t.delete(r)}function i(r,o={}){var c,d,u,m,g;switch(r){case"navigate":a({screen:o.screen});break;case"usage-stats-updated":a({usageStats:o.stats??e.usageStats,usageStatsStatus:o.status??e.usageStatsStatus});break;case"toggle-home-panel":{const v=o.panel||null;a({activeHomePanel:e.activeHomePanel===v?null:v});break}case"open-home-panel":a({activeHomePanel:o.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:o.mode==="kw"?"kw":"classic",codexPage:0});break;case"set-codex-page":a({codexPage:Math.max(0,Math.trunc(Number(o.page)||0))});break;case"set-home-mode":{const v=o.mode==="classic"?"classic":"kw";a({homeMode:v}),V({...e,homeMode:v});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(o.page)||0)),selectedChallengeLevel:null});break;case"set-selected-challenge-level":a({selectedChallengeLevel:Math.max(1,Math.trunc(Number(o.levelId)||1))});break;case"set-stats-scope":a({statsScope:o.scope==="global"?"global":"personal"});break;case"update-settings":{const v=ie({...e.settings,...o});a({settings:v}),V({...e,settings:v});break}case"record-personal-stats":{const v=o.stats||{},S={...W((c=e.personalStats)==null?void 0:c.killsByType)},x=W(v.redKillsByType),B={...Y((d=e.personalStats)==null?void 0:d.survivalByType)},U=Y(v.redSurvivalByType);Object.keys(Ne()).forEach(M=>{var G,Q,$e,ke;S[M]=(S[M]||0)+(x[M]||0);const $=(((G=B[M])==null?void 0:G.moves)||0)+(((Q=U[M])==null?void 0:Q.moves)||0),E=((($e=B[M])==null?void 0:$e.games)||0)+(((ke=U[M])==null?void 0:ke.games)||0);B[M]={moves:$,games:E,avg:E>0?Math.round($/E):0}});const _=Math.max(0,Math.min(300,Math.trunc(Number(v.totalMoves)||0))),H=_>0?(((u=e.personalStats)==null?void 0:u.survivalGames)||0)+1:((m=e.personalStats)==null?void 0:m.survivalGames)||0,j=(((g=e.personalStats)==null?void 0:g.survivalMoves)||0)+_,O={killsByType:S,survivalByType:B,survivalMoves:j,survivalGames:H,avgSurvivalMoves:H>0?Math.round(j/H):0};a({personalStats:O}),V({...e,personalStats:O});break}case"select-level":a({screen:"game",currentLevel:o.levelId,currentPlaySource:o.playSource||"challenge"});break;case"back-to-menu":a({screen:"menu",currentLevel:null,currentPlaySource:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null,currentPlaySource:null});break;case"toggle-upgrade":{const{pieceType:v}=o,b={...e.pieceUpgrades};b[v]?delete b[v]:b[v]=!0,a({pieceUpgrades:b}),V({...e,pieceUpgrades:b});break}case"game-result":{const{newStarBits:v,win:b}=o,S=e.currentLevel,x={...e.starsPerLevel};x[S]=(x[S]||0)|(v||0);const T={starsPerLevel:x,totalWins:e.totalWins+(b?1:0),totalGames:e.totalGames+1};a(T),V({...e,...T});break}default:console.warn(`[Store] 未知 action: ${r}`)}}return{getState:s,setState:a,subscribe:n,dispatch:i}}const Se={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},ge=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:4e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"列车冲撞",desc:"车沿直线冲撞友军，把棋子推上战线",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"列车冲撞！车可以沿直线冲撞友军，把棋子推向更深的位置；同类车叠在一起后还能合体。"}]},{id:3,name:"马踏飞燕",desc:"马借己方棋子连续起跳，追吃多个目标",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"马踏飞燕！马可以向十二方跳跃，借己方棋子连续起跳，不受蹩马腿限制；同类马还能合体。"}]},{id:4,name:"洲际导弹",desc:"炮翻过连续炮架，远程打击后排",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"洲际导弹！炮可以翻过连续炮架，远袭炮架后的敌方棋子。"}]},{id:5,name:"集束炸弹",desc:"兵叠层合体后自爆，覆盖周围目标",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"集束炸弹！兵可以上下左右一步移动，同类兵会自动合体；双击自爆可以清掉周围目标。"}]},{id:6,name:"X形光波",desc:"仕斜走出宫，落地释放 X 形光波",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"X形光波！仕可以斜走出宫，落地时沿四条斜线释放光波；同类仕还能合体。"}]},{id:7,name:"十字地震波",desc:"相过河跳田，落地释放十字地震波",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"十字地震波！相可以过河跳田，落地时沿横竖方向打出地震波；同类相还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:4e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"自爆列车",desc:"车运叠兵深入敌阵，引爆自爆连锁",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:4e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"自爆列车！用车把叠兵送进敌阵，再引爆自爆连锁消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"车马炮兵仕相帅觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"车马炮兵仕相帅觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"巅峰对决",desc:"车马炮兵仕相帅觉醒，完整对决",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:4e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"巅峰对决！车、马、炮、兵、仕、相、帅都觉醒，冲撞、连踩、光波、地震和自爆会一起改变局势。"}]}]}],A=ge.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function se(e){return A.find(t=>t.id===e)||null}const dt=A.filter(e=>!e.freePlay).length,je={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"车马炮兵仕相帅觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},ut=2,pt=6,mt={1:"从基础走法开始",2:"用冲撞打开直线",3:"连续追吃多个目标",4:"隔着炮架打后排",5:"把爆点送进敌阵",6:"用斜线覆盖目标",7:"用横竖线控场",8:"送帅出宫亲征",9:"运叠兵进阵自爆",10:"冲撞、连踩、光波、地震、自爆同场"},gt={1:{setupLabel:"规则",setup:"基础象棋",focus:"移动七类棋子，再用不同棋子吃子"},2:{setupLabel:"棋子",setup:"车觉醒",focus:"车冲到友军前一格，把它推出去"},3:{setupLabel:"棋子",setup:"马觉醒",focus:"踩己方棋子继续跳，直到吃到目标"},4:{setupLabel:"棋子",setup:"炮觉醒",focus:"选连续炮架后的敌子，优先打后排"},5:{setupLabel:"棋子",setup:"兵觉醒",focus:"叠到更高层，再在敌阵中心爆开"},6:{setupLabel:"棋子",setup:"仕觉醒",focus:"落在斜线交叉点，用 X 形伤害扫敌"},7:{setupLabel:"棋子",setup:"相觉醒",focus:"落在中线附近，用十字波覆盖目标"},8:{setupLabel:"棋子",setup:"车、帅觉醒",focus:"车把帅推出九宫，帅吃叠子成长"},9:{setupLabel:"棋子",setup:"车、兵觉醒",focus:"车运叠兵到底线或敌阵中心再爆"},10:{setupLabel:"棋子",setup:"车、马、炮、兵、仕、相、帅觉醒",focus:"组合技能争中路，别让帅暴露"}};function p(e,t,s={}){return e.map(([a,n,i])=>({x:a,y:n,type:t,danger:i||s.danger||"safe"}))}function l(e,t,s,a={}){return{x:e,y:t,piece:s,owner:a.owner||"red",layer:a.layer||1,groups:a.groups,type:a.type||"",ghost:!!a.ghost,selected:!!a.selected,result:!!a.result}}function X(e=1,t=1,s=3){return{x:e,y:t,size:s}}function h(e,t,s={}){return{from:e,to:t,...s}}function Oe(e,t,s={}){return{title:e,marks:t,...s}}function f(e,t,s={}){return Oe(e,t,{board:"game",cols:9,rows:10,...s})}function J(e,t="preview"){return e.map(([s,a])=>({x:s,y:a,type:t}))}function Pe(e,t){return{from:e,to:t}}const Re=[{piece:"車",name:"车",title:"横竖直线走，遇到棋子就停",diagrams:[f("空线可走",[...p([[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,7],[4,8],[4,9],[0,6],[1,6],[2,6],[3,6],[5,6],[6,6],[7,6],[8,6]],"move")],{pieces:[l(4,6,"車",{selected:!0})],animation:h([4,6],[4,2],{piece:"車"})}),f("挡子与吃子",[...p([[4,4]],"eat"),...p([[4,5],[0,6],[1,6],[2,6],[3,6],[4,7],[4,8],[4,9],[5,6]],"move")],{pieces:[l(4,6,"車",{selected:!0}),l(4,4,"卒",{owner:"black"}),l(6,6,"兵")],animation:h([4,6],[4,4],{piece:"車",kind:"eat"})})],sections:[{title:"怎么走",items:["车只沿横线或竖线走，空交点会显示绿色实心点。","从选中的车到绿色点之间不能有任何棋子。"]},{title:"怎么吃",items:["同一直线上遇到第一枚敌棋时，敌棋外圈会亮起，点击即可吃子。","己方棋子会挡住后面的路线，游戏里不会给被挡住的位置画落点。"]}]},{piece:"馬",name:"马",title:"走“日”字，马腿被占会被蹩",diagrams:[f("日字落点",[...p([[3,3],[5,3],[2,4],[6,4],[2,6],[6,6],[3,7],[5,7]],"move")],{pieces:[l(4,5,"馬",{selected:!0})],animation:h([4,5],[2,4],{piece:"馬"})}),f("蹩马腿",[...p([[2,4],[6,4],[2,6],[6,6],[3,7],[5,7]],"move")],{pieces:[l(4,5,"馬",{selected:!0}),l(4,4,"兵")]})],sections:[{title:"怎么走",items:["马走“日”字，选中后 8 个合法落点会显示绿色实心点。","落点上如果是敌棋，会显示外圈；空点才是实心点。"]},{title:"蹩马腿",items:["马正上方的马腿被兵占住后，上方两个日字落点不会出现。","图中没有灰色叉号，因为真实游戏只显示能走的位置。"]}]},{piece:"炮",name:"炮",title:"移动像车，吃子必须隔一个炮架",diagrams:[f("不吃子移动",[...p([[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,7],[4,8],[4,9],[0,6],[1,6],[2,6],[3,6],[5,6],[6,6],[7,6],[8,6]],"move")],{pieces:[l(4,6,"炮",{selected:!0})],animation:h([4,6],[4,2],{piece:"炮"})}),f("隔架吃子",[...p([[2,7],[3,7]],"move"),...p([[6,7]],"eat")],{pieces:[l(1,7,"炮",{selected:!0}),l(4,7,"兵"),l(6,7,"卒",{owner:"black"})],animation:h([1,7],[6,7],{piece:"炮",kind:"eat"})})],sections:[{title:"怎么走",items:["炮不吃子时和车一样，空交点显示绿色实心点，不能越过棋子。"]},{title:"怎么吃",items:["炮吃子必须隔着正好一个棋子作为炮架。","炮架后的第一枚敌棋外圈会亮起；炮架本身不会被吃。"]}]},{piece:"兵",name:"兵",title:"未过河只前进，过河后可左右",diagrams:[f("未过河",[...p([[4,5]],"move")],{pieces:[l(4,6,"兵",{selected:!0})],animation:h([4,6],[4,5],{piece:"兵"})}),f("过河后",[...p([[4,3],[3,4],[5,4]],"move")],{pieces:[l(4,4,"兵",{selected:!0})],animation:h([4,4],[3,4],{piece:"兵"})})],sections:[{title:"怎么走",items:["红兵朝上走，未过河时只有正前方会显示绿色点。","左右和后退都不会出现落点。"]},{title:"过河以后",items:["红兵到河界上方后，可以向前、向左、向右走一格。","仍然不能后退，所以身后没有绿色点。"]}]},{piece:"仕",name:"仕",title:"只在九宫内斜走一格",diagrams:[f("九宫内可达",[...p([[3,7],[5,7],[3,9],[5,9]],"move")],{pieces:[l(4,8,"仕",{selected:!0})],animation:h([4,8],[3,7],{piece:"仕"})}),f("不能出宫",[...p([[4,8]],"move")],{pieces:[l(3,7,"仕",{selected:!0})]})],sections:[{title:"活动范围",items:["仕只能在己方九宫内斜走一格。","九宫线按真实棋盘画出，绿色点只出现在宫内。"]},{title:"不能出宫",items:["仕在九宫角上时，只有回到宫内的斜点可走。","宫外位置不会出现合法落点。"]}]},{piece:"相",name:"相",title:"走田字，两格斜跳，象眼会挡",diagrams:[f("田字落点",[...p([[2,5],[6,5],[2,9],[6,9]],"move")],{pieces:[l(4,7,"相",{selected:!0})],animation:h([4,7],[2,5],{piece:"相"})}),f("塞象眼",[...p([[6,5],[2,9],[6,9]],"move")],{pieces:[l(4,7,"相",{selected:!0}),l(3,6,"兵")]}),f("不能过河",[...p([[0,7],[4,7]],"move")],{pieces:[l(2,5,"相",{selected:!0})]})],sections:[{title:"怎么走",items:["相沿对角线一次跳两格，合法落点显示为绿色点。","传统相不能过河，河对岸不会出现落点。"]},{title:"塞象眼",items:["对角线中间的象眼被占住时，对应方向的落点不会显示。","图中左上象眼有兵，所以左上方向不能跳。"]},{title:"不能过河",items:["相站在河边时，只有仍在己方半边的田字点会显示。","跨过楚河汉界的点在真实游戏里不会亮。"]}]},{piece:"帅",name:"帅",title:"九宫内一步，将帅不能照面",diagrams:[f("九宫一步",[...p([[4,7],[3,8],[5,8],[4,9]],"move")],{pieces:[l(4,8,"帅",{selected:!0})],animation:h([4,8],[4,7],{piece:"帅"})}),f("将帅照面",[...p([[3,9],[5,9]],"move")],{pieces:[l(4,9,"帅",{selected:!0}),l(4,0,"将",{owner:"black"})]})],sections:[{title:"怎么走",items:["帅只能在九宫内横竖走一格，合法点显示为绿色点。","传统帅不能斜走，也不能主动走出九宫。"]},{title:"将帅照面",items:["双方主帅同列且中间没有棋子时，向前走会造成照面，所以不会出现绿色点。","图中只有左右两点可走，正前方没有落点。"]}]}],He=[{piece:"叠",name:"通用叠层",title:"先看这页：叠层、合体、叠层吃子",diagrams:[f("同类叠层",[...p([[3,6],[4,6]],"move"),...p([[5,6]],"stack")],{pieces:[l(2,6,"車",{selected:!0}),l(5,6,"車")],animation:h([2,6],[5,6],{piece:"車",kind:"combo"}),resultPieces:[l(5,6,"車",{layer:2,groups:[1,1],result:!0})]}),f("双击合体",[],{pieces:[l(4,6,"車",{selected:!0,layer:2,groups:[1,1]})],picker:{x:4,y:6,sectors:[{label:"合",value:"merge"}],highlight:0},resultPieces:[l(4,6,"車",{layer:2,groups:[2],result:!0})]}),f("层数吃子",[...p([[3,6],[4,6]],"move"),...p([[5,6]],"eat")],{pieces:[l(2,6,"車",{selected:!0,layer:2,groups:[2]}),l(5,6,"卒",{owner:"black",layer:2,groups:[2]})],animation:h([2,6],[5,6],{piece:"車",layer:2,groups:[2],kind:"attack"}),resultPieces:[l(5,6,"車",{layer:2,groups:[2],result:!0})]}),f("层数不足",[...p([[3,6],[5,6],[4,7]],"move"),...p([[4,5]],"eat")],{pieces:[l(4,6,"兵",{selected:!0}),l(4,5,"卒",{owner:"black",layer:3,groups:[3]})],animation:h([4,6],[4,5],{piece:"兵",kind:"attack"}),resultPieces:[l(4,5,"卒",{owner:"black",layer:2,groups:[2],result:!0})]})],sections:[{title:"怎么叠",items:["选中同阵营、同种类的觉醒棋子时，目标棋子会出现蓝色双环；点蓝环就是叠上去。","车、马、炮、仕、相叠上去后先显示为多个小组；右侧多个小圆点代表还没有合体。"]},{title:"怎么合体",items:["双击未合体叠子会出现扇形选择环；绿色“合”表示把多个小组并成一个整体。","合体后右下角只显示一个层数徽标，之后单击会默认整组行动。"]},{title:"怎么吃赢",items:["吃子时看本次出击层数和目标总层数；出击层数大于或等于目标层数，目标消失，攻方站到目标位置。","图中 2 层车吃 2 层卒，动画结束后仍是 2 层车。"]},{title:"吃不动时",items:["层数不够也会出现敌子外圈，说明可以点，但结算会输。","图中 1 层兵打 3 层卒，兵消失，卒只被扣到 2 层。"]}]},{piece:"車",name:"觉醒车",title:"直线移动，冲撞运输",diagrams:[f("直线移动",[...p([[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,7],[4,8],[4,9],[0,6],[1,6],[2,6],[3,6],[5,6],[6,6],[7,6],[8,6]],"move")],{pieces:[l(4,6,"車",{selected:!0})],animation:h([4,6],[4,2],{piece:"車"})}),f("冲撞运输",[...p([[2,6],[3,6]],"move"),...p([[4,6]],"charge")],{pieces:[l(1,6,"車",{selected:!0}),l(4,6,"兵"),l(7,6,"卒",{owner:"black"})],previews:J([[5,6],[6,6],[7,6]],"preview"),animations:[h([1,6],[3,6],{piece:"車",kind:"skill"}),h([4,6],[7,6],{piece:"兵",kind:"skill",delay:620})],resultPieces:[l(3,6,"車",{result:!0}),l(7,6,"兵",{result:!0})]}),f("车车叠层",[...p([[3,6]],"move"),...p([[4,6]],"stack")],{pieces:[l(2,6,"車",{selected:!0}),l(4,6,"車")],animation:h([2,6],[4,6],{piece:"車",kind:"combo"}),resultPieces:[l(4,6,"車",{layer:2,groups:[1,1],result:!0})]})],sections:[{title:"怎么走",items:["觉醒车仍按车的直线规则行动：空点是绿色实心点，敌子是外圈。","己方异类棋子会挡住普通移动，但可能成为冲撞目标。"]},{title:"怎么冲撞",items:["同一直线上先有至少一个空点，再遇到己方异类棋子时，目标会出现虚线圆圈。","点虚线圈后，车停在目标前一格；被撞棋子沿红框方向推出，撞到敌子会按层数结算。"]},{title:"车车叠层",items:["己方车遇到己方车不是冲撞，而是蓝色双环叠层。","叠层车可继续合体，用更高层数吃子或发起冲撞。"]}]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[f("十二方落点",[...p([[3,3],[5,3],[2,4],[6,4],[2,6],[6,6],[3,7],[5,7],[4,3],[4,7],[2,5],[6,5]],"move")],{pieces:[l(4,5,"馬",{selected:!0})],animation:h([4,5],[6,5],{piece:"馬"})}),f("借友连踩",[...p([[6,5]],"eat")],{pieces:[l(2,7,"馬",{selected:!0}),l(4,6,"兵"),l(6,5,"卒",{owner:"black"})],pathLines:[Pe([2,7],[4,6]),Pe([4,6],[6,5])],animations:[h([2,7],[4,6],{piece:"馬",kind:"skill"}),h([4,6],[6,5],{piece:"馬",kind:"attack",delay:560})],resultPieces:[l(6,5,"馬",{result:!0})]}),f("马马叠层",[...p([[4,5]],"stack")],{pieces:[l(2,6,"馬",{selected:!0}),l(4,5,"馬")],animation:h([2,6],[4,5],{piece:"馬",kind:"combo"}),resultPieces:[l(4,5,"馬",{layer:2,groups:[1,1],result:!0})]})],sections:[{title:"十二方",items:["觉醒马有 12 个基础落点：8 个日字点，加上下左右各跳 2 格。","没有蹩马腿限制，旁边有棋子也不会挡住绿色点。"]},{title:"连踩",items:["马跳到己方棋子上时不会停下，而是把它当踏点继续跳。","真实游戏会用绿色虚线路径标出连踩路线；最后落到敌子外圈时才结算吃子。"]},{title:"马马叠层",items:["跳到己方马的位置时会出现蓝色双环，表示可以叠层。","也可以把己方马当踏点继续连踩；要停下叠层还是继续追击，看当前目标。"]}]},{piece:"炮",name:"觉醒炮",title:"直线移动，翻过连续炮架",diagrams:[f("直线移动",[...p([[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,7],[4,8],[4,9],[0,6],[1,6],[2,6],[3,6],[5,6],[6,6],[7,6],[8,6]],"move")],{pieces:[l(4,6,"炮",{selected:!0})],animation:h([4,6],[4,2],{piece:"炮"})}),f("连续炮架",[...p([[1,7],[4,7]],"move"),...p([[5,7]],"eat")],{pieces:[l(0,7,"炮",{selected:!0}),l(2,7,"兵"),l(3,7,"马"),l(5,7,"卒",{owner:"black"})],animation:h([0,7],[5,7],{piece:"炮",kind:"attack"}),resultPieces:[l(5,7,"炮",{result:!0})]}),f("炮炮叠层",[...p([[2,6],[3,6]],"move"),...p([[4,6]],"stack")],{pieces:[l(1,6,"炮",{selected:!0}),l(4,6,"炮")],animation:h([1,6],[4,6],{piece:"炮",kind:"combo"}),resultPieces:[l(4,6,"炮",{layer:2,groups:[1,1],result:!0})]})],sections:[{title:"直线移动",items:["不吃子时，觉醒炮像车一样沿横线或竖线走，空点显示绿色实心点。","前方第一段空线可以直接落子，遇到棋子后进入炮架判断。"]},{title:"连续炮架",items:["炮架可以是一段连续棋子；炮架本身不会被染色，也不会被吃。","翻过炮架后，空点显示绿色点；炮架后的第一枚敌棋显示外圈。"]},{title:"炮炮叠层",items:["炮无炮架时也能平移叠到己方炮上，目标显示蓝色双环。","炮炮叠层后可以合体，用更高层数远程吃子。"]}]},{piece:"兵",name:"觉醒兵",title:"四向一步，叠层自动合体，自爆连锁",diagrams:[f("四向可走",[...p([[4,5],[3,6],[5,6],[4,7]],"move")],{pieces:[l(4,6,"兵",{selected:!0})],animation:h([4,6],[4,5],{piece:"兵"})}),f("双击自爆",[],{pieces:[l(4,6,"兵",{selected:!0,layer:2,groups:[2]}),l(3,5,"卒",{owner:"black"}),l(6,7,"马")],previews:J([[2,4],[3,4],[4,4],[5,4],[6,4],[2,5],[3,5],[4,5],[5,5],[6,5],[2,6],[3,6],[5,6],[6,6],[2,7],[3,7],[4,7],[5,7],[6,7],[2,8],[3,8],[4,8],[5,8],[6,8]],"explode-preview"),picker:{x:4,y:6,sectors:[{label:"爆",value:"explode"}],highlight:0}}),f("兵兵自动合体",[...p([[4,5],[3,6],[4,7]],"move"),...p([[5,6]],"stack")],{pieces:[l(4,6,"兵",{selected:!0}),l(5,6,"兵")],animation:h([4,6],[5,6],{piece:"兵",kind:"combo"}),resultPieces:[l(5,6,"兵",{layer:2,groups:[2],result:!0})]})],sections:[{title:"四向一步",items:["觉醒兵每次可以向上、下、左、右走一格，不再受过河限制。","空点是绿色实心点；敌子会显示外圈并按层数结算。"]},{title:"双击自爆",items:["双击兵会出现红色“爆”扇区，同时棋盘上用红框显示会被波及的交点。","自爆范围等于兵的总层数；被炸到的非兵棋子每次掉 1 层，双方棋子都会受影响。"]},{title:"自动合体",items:["兵叠到己方兵上会立刻合体，右下角显示总层数，不需要再点“合”。","兵最多叠到 5 层，层数越高，自爆范围越大。"]}]},{piece:"仕",name:"觉醒仕",title:"斜走出宫，落地释放 X 形光波",diagrams:[f("出宫斜走",[...p([[4,8],[4,6],[2,8],[2,6]],"move")],{pieces:[l(3,7,"仕",{selected:!0})],palace:X(3,7,3),animation:h([3,7],[2,6],{piece:"仕"})}),f("X 形光波",[...p([[3,5]],"move")],{pieces:[l(4,6,"仕",{selected:!0,layer:2,groups:[2]}),l(5,7,"卒",{owner:"black"}),l(1,3,"砲",{owner:"black"})],previews:J([[4,6],[5,7],[4,4],[5,3],[2,6],[1,7],[2,4],[1,3]],"preview"),animation:h([4,6],[3,5],{piece:"仕",layer:2,groups:[2],kind:"skill"})}),f("仕仕叠层",[...p([[5,7]],"stack")],{pieces:[l(4,8,"仕",{selected:!0}),l(5,7,"仕")],palace:X(3,7,3),animation:h([4,8],[5,7],{piece:"仕",kind:"combo"}),resultPieces:[l(5,7,"仕",{layer:2,groups:[1,1],result:!0})]})],sections:[{title:"出宫斜走",items:["觉醒仕每次斜走一格，可以离开九宫，也可以过河。","绿色点只表示真实可走的位置，九宫外不会额外画禁区。"]},{title:"X 形光波",items:["仕移动或吃子落地后，会沿四条斜线释放光波；悬停落点时用红框预览范围。","光波长度和伤害等于本次出击层数；叠层时不会触发光波。"]},{title:"仕仕叠层",items:["落到己方仕上时只显示蓝色双环，表示叠层。","仕仕合体后再移动，X 形光波会打得更远。"]}]},{piece:"相",name:"觉醒相",title:"无象眼越河，落地释放十字地震",diagrams:[f("斜跳两格",[...p([[2,4],[6,4],[2,8],[6,8]],"move")],{pieces:[l(4,6,"相",{selected:!0}),l(3,5,"兵"),l(5,5,"卒",{owner:"black"})],animation:h([4,6],[2,4],{piece:"相"})}),f("十字地震",[...p([[2,4]],"move")],{pieces:[l(4,6,"相",{selected:!0,layer:2,groups:[2]}),l(4,4,"卒",{owner:"black"}),l(2,2,"車",{owner:"black"})],previews:J([[3,4],[4,4],[1,4],[0,4],[2,5],[2,6],[2,3],[2,2]],"preview"),animation:h([4,6],[2,4],{piece:"相",layer:2,groups:[2],kind:"skill"})}),f("相相叠层",[...p([[2,4]],"stack")],{pieces:[l(4,6,"相",{selected:!0}),l(2,4,"相")],animation:h([4,6],[2,4],{piece:"相",kind:"combo"}),resultPieces:[l(2,4,"相",{layer:2,groups:[1,1],result:!0})]})],sections:[{title:"斜跳两格",items:["觉醒相仍然斜跳两格，但不检查象眼，也可以过河。","图中象眼位置有棋子，合法落点仍然显示绿色点。"]},{title:"十字地震",items:["相移动或吃子落地后，会沿上下左右释放地震；悬停落点时用红框预览范围。","地震长度和伤害等于本次出击层数；叠层时不会触发地震。"]},{title:"相相叠层",items:["落到己方相上时只显示蓝色双环，表示叠层。","合体相适合落到中路，用十字线控制横竖方向。"]}]},{piece:"帅",name:"觉醒帅",title:"九宫八向，吃子成长，可被车送出宫",diagrams:[f("九宫八向",[...p([[3,7],[4,7],[5,7],[3,8],[5,8],[3,9],[4,9],[5,9]],"move")],{pieces:[l(4,8,"帅",{selected:!0})],palace:X(3,7,3),animation:h([4,8],[3,7],{piece:"帅"})}),f("吃子成长",[...p([[4,7]],"eat")],{pieces:[l(4,8,"帅",{selected:!0}),l(4,7,"卒",{owner:"black"})],palace:X(3,7,3),animation:h([4,8],[4,7],{piece:"帅",kind:"attack"}),resultPieces:[l(4,7,"帅",{layer:2,groups:[2],result:!0})]}),f("车送出宫",[...p([[4,8]],"move"),...p([[4,7]],"charge")],{pieces:[l(4,9,"車",{selected:!0}),l(4,7,"帅")],palace:X(3,7,3),previews:J([[4,6],[4,5],[4,4],[4,3],[4,2],[4,1],[4,0]],"preview"),animations:[h([4,9],[4,8],{piece:"車",kind:"skill"}),h([4,7],[4,0],{piece:"帅",kind:"skill",delay:620})],resultPieces:[l(4,8,"車",{result:!0}),l(4,0,"帅",{result:!0})]})],sections:[{title:"九宫八向",items:["觉醒帅在九宫内可以向八个方向走一格。","它不能自己主动走出九宫；宫外位置不会出现绿色点。"]},{title:"吃子成长",items:["帅成功吃掉敌方棋子并站到目标点后，会固定增加 1 层。","帅不能叠层，右下角紫色层数来自吃子成长。"]},{title:"车送出宫",items:["帅不是自己飞出宫；真实操作是选中觉醒车，冲撞己方帅。","点虚线圈后，车停在帅前一格，帅沿红框路径被推出九宫。"]}]}];function vt(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Ke(e){return e==="classic"?"classic":"kw"}function ft(e,t=A){return t.reduce((s,a)=>s+vt(e[a.id]||0),0)}function ht(e=A){return e.reduce((t,s)=>t+s.stars.length,0)}function bt(e,t=A){return t.filter(s=>s.freePlay?!1:(e[s.id]||0)!==0).length}function yt(e,t){return(t[e.id]||0)!==0}function pe(e,t){const s=A.find(i=>i.id===e);return s!=null&&s.freePlay||e===1||!A.find(i=>i.id===e-1)?!0:(t[e-1]||0)!==0}function R(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function Fe(e){return`${Math.max(0,Math.round(Number(e)||0))}步`}function De(e,t){return Math.max(0,Math.trunc(Number(e==null?void 0:e[t])||0))}function Ve(e,t){const s=e==null?void 0:e[t];if(!s||typeof s!="object")return 0;const a=Math.max(0,Math.trunc(Number(s.games)||0)),n=Math.max(0,Math.trunc(Number(s.moves)||0));return a>0?Math.round(n/a):0}function Xe(e){return e==="global"?"global":"personal"}function Me(e,t,s){const a=t===e;return`<button class="stats-scope-button ${a?"is-active":""}" type="button" data-info-stats-scope="${e}" aria-pressed="${a}">${s}</button>`}function $t(e,t,s="personal"){const a=Xe(s),n=a==="global"?t:e,i=(n==null?void 0:n.killsByType)||{},r=(n==null?void 0:n.survivalByType)||{};return`
    <div class="battle-piece-grid" aria-label="${a==="global"?"全站棋子游玩统计":"玩家棋子游玩统计"}">
      ${I.map(o=>`
        <div class="battle-piece-card">
          <b>${o.label}</b>
          <span><em>击杀${R(De(i,o.type))}</em><em>存活${Fe(Ve(r,o.type))}</em></span>
        </div>
      `).join("")}
    </div>`}function kt(e={}){const t=(e==null?void 0:e.killsByType)||{},s=(e==null?void 0:e.survivalByType)||{};return`
    <div class="home-desktop-stats" aria-label="玩家棋子表现">
      <strong>玩家棋子表现</strong>
      <div class="home-desktop-piece-grid">
        ${I.map(a=>`
          <span class="home-desktop-piece">
            <b>${a.label}</b>
            <em>击杀${R(De(t,a.type))}</em>
            <i>存活${Fe(Ve(s,a.type))}</i>
          </span>
        `).join("")}
      </div>
    </div>`}function re(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function Ee(e,t){const s=je[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>${a?'<i aria-hidden="true">✔</i>':""}
  </button>`}function xt(e){return`${(Math.max(0,Number(e)||0)/1e3).toFixed(e%1e3===0?0:1)} 秒`}function wt(e){return mt[e.id]||e.desc}function St(e){var a;const t=gt[e.id]||{setupLabel:"规则",setup:((a=e.config)==null?void 0:a.mode)==="classic"?"基础象棋":"本关规则",focus:e.desc||"赢下本局"};return`
    <div class="challenge-force-brief">
      <p><b>${t.setupLabel||"觉醒"}</b><span>${t.setup}</span></p>
      <p><b>打法</b><span>${t.focus}</span></p>
    </div>`}function Pt(e){const t=String(e||"").replace(/\s+/g,""),s={移动过每种棋子:"移动全部棋子",用4种不同棋子吃过子:"4种棋子吃子",获胜:"获胜",車运输叠兵:"车运叠兵",叠兵到达底线:"叠兵到底线",王出九宫格:"帅出九宫",王击杀叠层棋子:"帅吃叠子"};return s[t]?s[t]:t.replace(/觉醒車/g,"觉醒车").replace(/^觉醒/g,"").replace(/擊/g,"击").replace(/达到/g,"").replace(/一次连踩链/g,"马连踩").replace(/步内获胜/g,"步内胜")}function Mt(e){const t=Ke(e.homeMode),s=je[t],a=A.find(o=>o.id===s.aiLevelId),n=A.find(o=>o.id===s.freeLevelId),i=z(e.settings),r=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-step-block home-rule-step">
        <div class="home-step-head">
          <span>1</span><b>选择规则</b>
        </div>
        <div class="home-mode-switch" role="group" aria-label="规则模式">
          ${Ee("classic",t)}
          ${Ee("kw",t)}
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
        <div><i aria-hidden="true">率</i><span>胜率</span><b>${r}</b></div>
      </div>
      <div class="home-desktop-play-info" aria-label="当前对局说明">
        <p><b>${s.title}</b><span>${s.desc}</span></p>
        <p><b>人机对弈</b><span>使用自由对弈AI强度，胜负计入战绩。</span></p>
        <p><b>自由对弈</b><span>本地双人练规则，不计入战绩。</span></p>
      </div>
      ${kt(e.personalStats)}
    </section>`}function ve(){return A.filter(e=>!e.freePlay)}function Et(e){return ge.find(t=>Number(t.id)===Number(e.tierId))||null}function Lt(e){const t=Et(e),a=((t==null?void 0:t.levels)||[]).filter(n=>!n.freePlay).findIndex(n=>Number(n.id)===Number(e.id));return`${e.tierId||1}-${Math.max(1,a+1)}`}function It(e){const t=ve(),s=[];return ge.forEach(a=>{const n=t.filter(r=>Number(r.tierId)===Number(a.id)),i=Math.max(1,Math.ceil(n.length/e));for(let r=0;r<n.length;r+=e)s.push({tierId:a.id,tierName:a.name,tierPage:Math.floor(r/e)+1,tierPageCount:i,levels:n.slice(r,r+e)})}),s}function Tt(e,t){return`<div class="challenge-star-goals" aria-label="星级条件">
    ${e.stars.map((s,a)=>{const n=t>>a&1;return`<span class="challenge-star-chip ${n?"is-earned":""}"><b>${n?"★":"☆"}</b><em>${Pt(s.desc)}</em></span>`}).join("")}
  </div>`}function _t(e,t,s){var c;const a=t[e.id]||0,n=pe(e.id,t),i=yt(e,t),r=Lt(e),o=n&&Number(e.id)===Number(s);return`
    <article class="challenge-level-card ${i?"is-completed":""} ${o?"is-selected":""} ${n?"is-playable":"is-locked"}"
             data-mode="${((c=e.config)==null?void 0:c.mode)??"kw"}"
             ${n?`data-challenge-level="${e.id}" role="button" tabindex="0" aria-pressed="${o}"`:""}>
      <div class="challenge-card-head">
        <span class="challenge-index">${r}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${wt(e)}</em>
        </div>
      </div>
      ${St(e)}
      ${Tt(e,a)}
    </article>`}function Ct(e,t,s){const a=e.find(n=>Number(n.id)===Number(s)&&pe(n.id,t));return a||e.find(n=>pe(n.id,t))||null}function At(e,t){return t<=1?"":`<div class="challenge-pager" aria-label="关卡翻页">
    <button type="button" data-level-page="${e-1}" ${e<=0?"disabled":""}>‹</button>
    <span>${e+1} / ${t}</span>
    <button type="button" data-level-page="${e+1}" ${e>=t-1?"disabled":""}>›</button>
  </div>`}function Bt(e,t,s,a){var g;const n=typeof window<"u"&&((g=window.matchMedia)!=null&&g.call(window,"(min-width: 1024px)").matches)?pt:ut,i=ve(),r=It(n),o=Math.max(1,r.length),c=Math.min(Math.max(0,e.levelPage||0),o-1),d=r[c]||{tierId:1,tierName:"传统象棋",levels:[]},u=d.levels,m=Ct(u,e.starsPerLevel,e.selectedChallengeLevel);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <h2>关卡模式</h2>
        <button class="challenge-head-start" type="button" ${m?`data-select-level="${m.id}" data-play-source="challenge"`:"disabled"}>开始挑战</button>
        <div class="challenge-summary">
          <span>通关 <b>${t}/${i.length||dt}</b></span>
          <span>★ <b>${s}/${a}</b></span>
        </div>
      </header>
      <div class="challenge-level-list">
        <div class="challenge-tier-group" data-tier="${d.tierId}">
          <div class="challenge-tier-head">
            <span>第${d.tierId}层</span>
            <b>${d.tierName}</b>
            ${At(c,o)}
          </div>
          <div class="challenge-tier-list">
            ${u.map(v=>_t(v,e.starsPerLevel,m==null?void 0:m.id)).join("")}
          </div>
        </div>
      </div>
    </section>`}function Gt(e){const t=e.usageStats||{},s=e.personalStats||{},a=Xe(e.statsScope);return`
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
        <span><b>访问 ${R(t.totalPv)}</b><em>今日 ${R(t.todayPv)}</em></span>
        <span><b>访客 ${R(t.totalUv)}</b><em>今日 ${R(t.todayUv)}</em></span>
        <span><b>游玩 ${R(t.totalGames)}</b><em>今日 ${R(t.todayGames)}</em></span>
      </div>
      <p class="info-stats-note">${e.usageStatsStatus||"全站统计读取中。"}</p>
    </article>
    <article class="home-modal-block info-stats-block">
      <div class="info-stats-head">
        <h3>游玩统计</h3>
        <div class="stats-scope-switch" role="group" aria-label="游玩统计范围">
          ${Me("personal",a,"玩家")}
          ${Me("global",a,"全站")}
        </div>
      </div>
      ${$t(s,t,a)}
    </article>
    <article class="home-modal-block info-recommend-block">
      <h3>其他游戏推荐</h3>
      <div class="recommend-list">
        <p><a href="https://kw66.github.io/photo-hero/" target="_blank" rel="noreferrer">图片勇者</a>：拍照或画图鉴定装备，带着自己的物品一路爬塔冒险。</p>
        <p><a href="https://kw66.github.io/PhD_Simulator/" target="_blank" rel="noreferrer">研究生模拟器 v1.0</a>：在导师、论文、实验和精神状态之间求生的校园文字模拟器。</p>
      </div>
    </article>`}const Nt={車:"车",馬:"马",炮:"炮",兵:"兵",仕:"仕",相:"相",帅:"帅",叠:"叠"},w={cols:9,rows:10,width:600,height:664,pad:44,cell:64};function P(e){return w.pad+Number(e)*w.cell}function k(e){return w.pad+Number(e)*w.cell}function Z(e,t){const s=P(e)/w.width*100,a=k(t)/w.height*100;return`--gx:${s.toFixed(4)}%;--gy:${a.toFixed(4)}%`}function Je(e,t){const s=(P(e)-w.cell/2)/w.width*100,a=(k(t)-w.cell/2)/w.height*100,n=w.cell/w.width*100,i=w.cell/w.height*100;return`--cell-left:${s.toFixed(4)}%;--cell-top:${a.toFixed(4)}%;--cell-width:${n.toFixed(4)}%;--cell-height:${i.toFixed(4)}%`}function Ut(e,t="red"){return t==="red"&&Nt[e]||e}function q(e,t){const s=e.owner==="black"?"black":"red",a=Ut(e.piece||t.piece,s),n=a==="帅"||a==="将"?"is-king-piece":"",i=e.selected?"is-selected":"",r=e.result?"is-result":"",o=Math.max(1,Math.trunc(Number(e.layer)||1)),c=Array.isArray(e.groups)&&e.groups.length?e.groups.map(u=>Math.max(1,Math.trunc(Number(u)||1))):o>1?[o]:[],d=c.length>1?"is-unmerged":"is-merged";return`<span class="rule-piece is-${s} ${n} ${i} ${r} ${e.ghost?"is-ghost":""}" aria-hidden="true">
    <span class="rule-piece-core">${a}</span>
    ${c.length?`<span class="rule-piece-badges ${d}">
      ${c.map(u=>`<i>${u}</i>`).join("")}
    </span>`:""}
  </span>`}function jt(){const{cols:e,rows:t,width:s,height:a,pad:n,cell:i}=w,r=[];r.push(`<rect class="rule-game-outer" x="${n-24}" y="${n-24}" width="${i*(e-1)+48}" height="${i*(t-1)+48}" rx="0"></rect>`),r.push(`<rect class="rule-game-inner" x="${n-17}" y="${n-17}" width="${i*(e-1)+34}" height="${i*(t-1)+34}" rx="0"></rect>`);for(let c=0;c<e;c+=1){const d=P(c);c===0||c===e-1?r.push(`<line x1="${d}" y1="${k(0)}" x2="${d}" y2="${k(9)}"></line>`):(r.push(`<line x1="${d}" y1="${k(0)}" x2="${d}" y2="${k(4)}"></line>`),r.push(`<line x1="${d}" y1="${k(5)}" x2="${d}" y2="${k(9)}"></line>`))}for(let c=0;c<t;c+=1)r.push(`<line x1="${P(0)}" y1="${k(c)}" x2="${P(8)}" y2="${k(c)}"></line>`);return[[3,0,5,2],[3,7,5,9]].forEach(([c,d,u,m])=>{r.push(`<line x1="${P(c)}" y1="${k(d)}" x2="${P(u)}" y2="${k(m)}"></line>`),r.push(`<line x1="${P(u)}" y1="${k(d)}" x2="${P(c)}" y2="${k(m)}"></line>`)}),[[1,2],[7,2],[1,7],[7,7],[0,3],[2,3],[4,3],[6,3],[8,3],[0,6],[2,6],[4,6],[6,6],[8,6]].forEach(([c,d])=>{const u=P(c),m=k(d),g=5;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([v,b])=>{r.push(`<path class="rule-game-corner" d="M ${u+v*3} ${m+b*g} L ${u+v*g} ${m+b*g} L ${u+v*g} ${m+b*3}"></path>`)})}),`<svg class="rule-game-grid" viewBox="0 0 ${s} ${a}" aria-hidden="true" focusable="false">
    <g class="rule-game-lines">${r.join("")}</g>
    <text class="rule-game-river" x="${P(1.5)}" y="${k(4.5)}">楚  河</text>
    <text class="rule-game-river" x="${P(6.5)}" y="${k(4.5)}">汉  界</text>
    <text class="rule-game-title" x="${P(4)}" y="${k(4.5)}">科  王  象  棋</text>
  </svg>`}function Ot(e){return e==="attack"?"eat":e==="combo"?"stack":e==="skill"?"charge":e||"move"}function Rt(e){const t=Ot(e.type);if(t==="preview"||t==="explode-preview")return`<span class="rule-game-preview is-${t}" style="${Je(e.x,e.y)}"></span>`;const s=["move","eat","stack","charge"].includes(t)?t:"move",a=["hurt","fatal"].includes(e.danger)?e.danger:"safe";return`<span class="rule-game-mark is-${s} is-${a}" style="${Z(e.x,e.y)}"></span>`}function Ht(e=[]){return e.map(t=>`<span class="rule-game-preview is-${t.type==="explode-preview"?"explode-preview":"preview"}" style="${Je(t.x,t.y)}"></span>`).join("")}function Le(e,t,s=""){return`<span class="rule-game-piece ${s}" style="${Z(t.x,t.y)}">
    ${q(t,e)}
  </span>`}function Kt(e=[]){if(!e.length)return"";const t=e.map(s=>{const a=Array.isArray(s.from)?s.from:[s.fromCol,s.fromRow],n=Array.isArray(s.to)?s.to:[s.toCol,s.toRow];return`<line x1="${P(a[0])}" y1="${k(a[1])}" x2="${P(n[0])}" y2="${k(n[1])}"></line>`}).join("");return`<svg class="rule-game-paths" viewBox="0 0 ${w.width} ${w.height}" aria-hidden="true" focusable="false">${t}</svg>`}function Ie(e){return e==="explode"?"rgba(231, 76, 60, 0.78)":e==="merge"?"rgba(39, 174, 96, 0.78)":"rgba(41, 128, 185, 0.78)"}function Ft(e){if(!e||!Array.isArray(e.sectors)||!e.sectors.length)return"";const t=e.sectors,s=t.length,a=t.map((r,o)=>{const c=o/s*100,d=(o+1)/s*100;return`${Ie(r.value)} ${c}% ${d}%`}).join(", "),n=s===1?Ie(t[0].value):`conic-gradient(from -90deg, ${a})`,i=t.map((r,o)=>{const c=-Math.PI/2+Math.PI*2*((o+.5)/s),d=38,u=50+Math.cos(c)*d,m=50+Math.sin(c)*d;return`<i class="${e.highlight===o?"is-active":""}" style="--label-x:${u.toFixed(2)}%;--label-y:${m.toFixed(2)}%">${r.label}</i>`}).join("");return`<span class="rule-layer-picker" style="${Z(e.x,e.y)};--picker-bg:${n}">${i}</span>`}function fe(e){return Array.isArray(e.animations)?e.animations:e.animation?[e.animation]:[]}function Dt(e,t,s){const a=Array.isArray(t.from)?t.from:[4,5],n=Array.isArray(t.to)?t.to:a,i=(P(a[0])+(P(n[0])-P(a[0]))*.42)/w.width*100,r=(k(a[1])+(k(n[1])-k(a[1]))*.42)/w.height*100,o=["move","attack","skill","combo","denied"].includes(t.kind)?t.kind:"move",c=[Z(a[0],a[1]),"--from-left:var(--gx)","--from-top:var(--gy)",Z(n[0],n[1]).replace(/--gx/g,"--to-left").replace(/--gy/g,"--to-top"),`--bump-left:${i.toFixed(4)}%`,`--bump-top:${r.toFixed(4)}%`,`--anim-delay:${Number(t.delay??s*180)}ms`].join(";");return`<span class="rule-anim-piece is-game-piece is-${o}-demo" style="${c}">
    ${q({piece:t.piece||e.piece,owner:t.owner||"red",layer:t.layer||1,groups:t.groups,ghost:t.ghost},e)}
  </span>`}function Vt(e,t,s,a){const n=Array.isArray(t.from)?t.from:[Math.floor(s/2),Math.floor(s/2)],i=Array.isArray(t.to)?t.to:n,r=(Number(n[0])+.5)/s*100,o=(Number(n[1])+.5)/s*100,c=(Number(i[0])+.5)/s*100,d=(Number(i[1])+.5)/s*100,u=r+(c-r)*.42,m=o+(d-o)*.42,g=["move","attack","skill","combo","denied"].includes(t.kind)?t.kind:"move",v=[`--from-left:${r.toFixed(4)}%`,`--from-top:${o.toFixed(4)}%`,`--to-left:${c.toFixed(4)}%`,`--to-top:${d.toFixed(4)}%`,`--bump-left:${u.toFixed(4)}%`,`--bump-top:${m.toFixed(4)}%`,`--anim-delay:${Number(t.delay??a*180)}ms`].join(";");return`<span class="rule-anim-piece is-${g}-demo" style="${v}">
    ${q({piece:t.piece||e.piece,owner:t.owner||"red",layer:t.layer||1,groups:t.groups,ghost:t.ghost},e)}
  </span>`}function Xt(e,t,s){const a=[];if(e.palace){const n=e.palace,i=Number(n.size||3),r=Number(n.x||0)/t*100,o=Number(n.y||0)/t*100,c=i/t*100;a.push(`<span class="rule-palace-frame" style="--palace-left:${r.toFixed(4)}%;--palace-top:${o.toFixed(4)}%;--palace-size:${c.toFixed(4)}%"></span>`)}if(e.river){const n=Number(e.river.y||0)/t*100;a.push(`<span class="rule-river-line" style="--river-top:${n.toFixed(4)}%"></span>`)}return fe(e).forEach((n,i)=>{a.push(Vt(s,n,t,i))}),a.join("")}function Jt(e,t){const s=fe(t),a=Array.isArray(t.pieces)?t.pieces:[],n=Array.isArray(t.resultPieces)?t.resultPieces:[],i=Array.isArray(t.marks)?t.marks:[],r=new Set;n.length&&(s.forEach(c=>{Array.isArray(c.from)&&r.add(`${c.from[0]},${c.from[1]}`),Array.isArray(c.to)&&r.add(`${c.to[0]},${c.to[1]}`)}),n.forEach(c=>r.add(`${c.x},${c.y}`)));const o=[jt(),Ht(t.previews||[]),i.map(Rt).join(""),Kt(t.pathLines||[]),a.map(c=>{const d=r.has(`${c.x},${c.y}`)?"is-hidden-during-result":"";return Le(e,c,d)}).join(""),s.map((c,d)=>Dt(e,c,d)).join(""),n.map(c=>Le(e,c,"is-result-piece")).join(""),Ft(t.picker)].join("");return`<div class="rule-mini-board is-game ${s.length?"has-animation":""} ${n.length?"has-result":""}" aria-hidden="true">${o}</div>`}function Wt(e,t){if(t.board==="game")return Jt(e,t);const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map;(t.marks||[]).forEach(c=>{const d=`${c.x},${c.y}`,u=n.get(d)||[];u.push(c),n.set(d,u)});const i=new Map((t.pieces||[]).map(c=>[`${c.x},${c.y}`,c])),r=fe(t),o=[];for(let c=0;c<s;c+=1)for(let d=0;d<s;d+=1){const u=n.get(`${d},${c}`)||[],m=i.get(`${d},${c}`),g=d===a.x&&c===a.y,v=t.showCenter!==!1&&!r.length,b=[...new Set(u.map(x=>x.type).filter(Boolean))].map(x=>`is-${x}`).join(" "),S=m?q(m,e):g&&v?q({piece:t.piece||e.piece,owner:t.centerOwner||"red",layer:t.centerLayer||1,groups:t.centerGroups},e):"";o.push(`<span class="rule-cell ${g?"is-center":""} ${b}">${S}</span>`)}return`<div class="rule-mini-board ${r.length?"has-animation":""}" style="--board-size:${s}" aria-hidden="true">${o.join("")}${Xt(t,s,e)}</div>`}function Yt(e,t){return`
    <div class="rule-diagram">
      ${Wt(e,t)}
    </div>`}function Zt(e){const t=e==="kw"?He:Re,s=[];return t.forEach((a,n)=>{const i=a.diagrams||(a.diagram?[a.diagram]:[]),r=i.length?i:[Oe(a.name,[],{showCenter:!0})];r.forEach((o,c)=>{s.push({rule:a,ruleIndex:n,diagramIndex:c,diagram:o,pageInRule:c,pagesInRule:r.length})})}),s}function qt(e,t,s){return(e==="kw"?He:Re).map((n,i)=>{const r=t.findIndex(d=>d.ruleIndex===i),o=r>=0?r:0,c=n.piece==="叠"?"叠层":n.name.replace(/^觉醒/,"").replace(/^通用/,"");return`
      <button type="button" data-codex-page="${o}" class="${s===i?"is-active":""}" aria-pressed="${s===i}">
        <b>${c}</b>
      </button>`}).join("")}function zt(e,t){var c,d;const{rule:s,diagram:a,diagramIndex:n,pageInRule:i,pagesInRule:r}=e,o=((c=s.sections)==null?void 0:c[n])||((d=s.sections)==null?void 0:d[0])||{items:s.lines||[]};return`
    <article class="rule-card" aria-label="${s.name} ${r>1?`${i+1}/${r} `:""}${a.title}">
      <div class="rule-visuals diagram-count-1">${Yt(s,a)}</div>
      <div class="rule-copy">
        <section>
          <ul>
            ${(o.items||[]).map(u=>`<li>${u}</li>`).join("")}
          </ul>
        </section>
      </div>
    </article>`}function he(e){const t=e==="kw"?"kw":"classic";return`
    <div class="rules-switch rules-switch-head" role="group" aria-label="棋子图鉴分类">
      <button type="button" data-codex-mode="classic" class="${t==="classic"?"is-active":""}" aria-pressed="${t==="classic"}">传统象棋</button>
      <button type="button" data-codex-mode="kw" class="${t==="kw"?"is-active":""}" aria-pressed="${t==="kw"}">科王象棋</button>
    </div>`}function be(e,t=0){const s=e==="kw"?"kw":"classic",a=Zt(s),n=Math.min(a.length-1,Math.max(0,Math.trunc(Number(t)||0))),i=a[n],r=n<=0?a.length-1:n-1,o=n>=a.length-1?0:n+1;return`
    <div class="codex-piece-tabs" role="group" aria-label="棋子选择">
      ${qt(s,a,i.ruleIndex)}
    </div>
    <div class="rules-pager" aria-label="图鉴翻页">
      <button type="button" data-codex-page="${r}" aria-label="上一页">‹</button>
      <div>
        <b>${i.pageInRule+1} / ${i.pagesInRule}</b>
      </div>
      <button type="button" data-codex-page="${o}" aria-label="下一页">›</button>
    </div>
    <section class="rules-panel" aria-label="${s==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid is-paged">
        ${zt(i)}
      </div>
    </section>`}function Qt(e){const t=ie(e),s=z(t);return`
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
        ${N.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>AI回合 ${xt(a.time)}</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function oe(e,t,s,a,n=""){return`
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
    </div>`}function ea(e){return`
    ${oe("author","游戏信息",Gt(e),e.activeHomePanel)}
    ${oe("codex","棋子图鉴",be(e.codexMode,e.codexPage),e.activeHomePanel,he(e.codexMode))}
    ${oe("settings","设置",Qt(e.settings),e.activeHomePanel)}`}function Te(e){const t=Ke(e.homeMode),s=ve(),a=ft(e.starsPerLevel,s),n=ht(s),i=bt(e.starsPerLevel,s);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${re("author","游戏信息",e.activeHomePanel)}
          ${re("codex","棋子图鉴",e.activeHomePanel)}
          ${re("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${Mt({...e,homeMode:t})}
        ${Bt({...e},i,a,n)}
      </main>
      ${ea(e)}
    </div>`}function ta(e){return`
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
    </div>`}function aa(e){return`
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
    </div>`}const We={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function _e(e){return String(e).replace(/"/g,"&quot;")}function ye(e){const t=Math.max(0,Number(e)||0);return`${(t/1e3).toFixed(t%1e3===0?0:1)} 秒`}function Ye(e,t,s){var n,i;if(s==="free"||e.freePlay||(n=e.config)!=null&&n.noAi)return null;if(s==="home-ai")return z(t);const a=Math.max(100,Math.trunc(Number((i=e.config)==null?void 0:i.aiTime)||500));return{id:`level-${a}`,label:ye(a),time:a}}function sa(e,t){var a;const s=((a=e.config)==null?void 0:a.mode)??"kw";return t==="home-ai"?s==="classic"?{name:"传统对弈",desc:"经典规则人机局：车马炮兵仕相帅都按传统象棋走法行动。"}:{name:"科王对弈",desc:"完整觉醒规则人机局：用叠层、合体和范围技与 AI 对攻。"}:t==="free"?s==="classic"?{name:"传统自由对弈",desc:"经典规则本地双人局，不计入战绩。"}:{name:"科王自由对弈",desc:"完整觉醒规则本地双人局，不计入战绩。"}:{name:e.name,desc:e.desc}}function na(e,t){var i,r;const s=((i=e.config)==null?void 0:i.mode)??"kw";return[t==="challenge"&&((r=e.tutorial)!=null&&r.length)?e.tutorial[0].text:"",s==="classic"?"单击棋子查看落点，再点目标落子。":"单击棋子查看落点；双击叠子可拆分/合体，双击兵可自爆。"].filter(Boolean).join(" ")}function ia(e){const t=`
    <span><i class="move-mark move-mark-safe"></i>可落子</span>
    <span><i class="move-mark move-mark-warning"></i>王受伤</span>
    <span><i class="move-mark move-mark-danger"></i>王危险</span>`;return e==="classic"?t:`${t}
    <span><i class="move-mark move-mark-stack"></i>叠子</span>
    <span><i class="move-mark move-mark-charge"></i>冲撞</span>`}function ra(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function oa(e,t,s){return`<button class="game-info-tab ${s?"is-active":""}" type="button" data-game-info-tab="${e}" aria-pressed="${s}">${t}</button>`}function K(e,t,s,a){return`<section class="info-section info-tab-panel panel-${e} ${a?"is-active":""}" data-info-panel="${e}" aria-label="${t}">
    <div class="info-section-title">${t}</div>
    ${s}
  </section>`}function ca(e,t){const s=e.id===t.id;return`<button class="game-ai-strength-button ${s?"is-active":""}" type="button" data-game-ai-strength="${e.id}" aria-pressed="${s}">
    <b>${e.label.replace("难度 ","")}</b><span>${ye(e.time)}</span>
  </button>`}function Ce(e,t={}){const s=z(e),a=!!t.allowToggle,n=t.label||"AI难度";return`<div class="game-ai-control-row ${a?"can-toggle-ai":"is-ai-locked"}" aria-label="${n}">
    ${a?'<button class="game-ai-toggle" type="button" data-game-ai-toggle data-ai-enabled="false">开启AI</button>':`<span class="game-ai-lock">${n}</span>`}
    <div class="game-ai-strengths" role="group" aria-label="AI 难度">
      ${N.map(i=>ca(i,s)).join("")}
    </div>
  </div>`}function la(e){return`<div class="home-modal game-codex-modal" id="home-panel-codex" data-home-modal="codex" hidden>
    <section class="home-sheet" role="dialog" aria-modal="true" aria-labelledby="game-codex-title">
      <header class="home-sheet-head">
        <div>
          <h2 id="game-codex-title">棋子图鉴</h2>
        </div>
        <div id="game-codex-mode-switch">${he(e.codexMode)}</div>
        <button class="home-sheet-close" type="button" data-close-home-panel>收起</button>
      </header>
      <div class="home-sheet-body" id="game-codex-body">
        ${be(e.codexMode,e.codexPage)}
      </div>
    </section>
  </div>`}function Ze(e){if(!(e!=null&&e.tierId))return"";const s=A.filter(a=>!a.freePlay&&Number(a.tierId)===Number(e.tierId)).findIndex(a=>Number(a.id)===Number(e.id));return`${e.tierId}-${Math.max(1,s+1)}`}function da(e,t,s){var r,o;const a=ua(e),n=a.length?a.map(c=>{var d;return(d=We[c])==null?void 0:d.name}).filter(Boolean).join("、"):((r=e.config)==null?void 0:r.mode)==="classic"?"传统规则":"本关规则";return`
    <div class="challenge-play-brief">
      <div class="challenge-play-title">
        <span>${Ze(e)||"关卡"}</span>
        <b>${e.name}</b>
      </div>
      <p><b>本关规则</b><span>${n}</span></p>
      <p><b>对手</b><span>AI ${(s==null?void 0:s.label)||ye(((o=e.config)==null?void 0:o.aiTime)||4e3)}</span></p>
      <p><b>开局提示</b><span>${t||e.desc||"先观察局面，再选择棋子。"}</span></p>
    </div>`}function ua(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop","king"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,r])=>{r&&s.add(i)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(i=>s.add(i)),[...s].filter(i=>We[i])}function pa(e,t,s){var r,o,c;const a=new URLSearchParams;a.set("levelId",e.id);const n=Ye(e,t,s);n&&(a.set("ai","1"),a.set("aiTime",String(n.time)),a.set("aiStrength",n.id));const i=((r=e.config)==null?void 0:r.mode)??"kw";if(a.set("mode",i),i==="classic"&&a.set("classic","1"),i!=="classic"){const d=((o=e.config)==null?void 0:o.playerUpgrades)||{},u=((c=e.config)==null?void 0:c.aiUpgrades)||{},m=Object.keys(d).filter(v=>d[v]).join(","),g=Object.keys(u).filter(v=>u[v]).join(",");m&&a.set("pu",m),g&&a.set("au",g)}return`./index-legacy.html?${a.toString()}`}function ma(e){var H,j,O;const t=se(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0;t.stars.length;const a=e.currentPlaySource==="free"||!!t.freePlay,n=e.currentPlaySource==="home-ai",i=e.currentPlaySource==="challenge",r=i&&!a;t.pieces?t.pieces.map(M=>Se[M]).join(" "):t.piece&&Se[t.piece];const o=Ye(t,e.settings,e.currentPlaySource),c=pa(t,e.settings,e.currentPlaySource),d=sa(t,e.currentPlaySource),u=(o==null?void 0:o.label)||"",m=!((H=t.config)!=null&&H.noAi)&&u,g=((j=t.config)==null?void 0:j.mode)??"kw",v={classic:"传统",mixed:"觉醒",kw:"科王"}[g]||"科王",b=g==="classic"?"classic":"kw",S=a?"双人":m?`AI ${u}`:"红方",x=["game-page",a?"is-free-play":"",n?"is-home-ai-play":"",i?"is-challenge-play":"is-casual-play"].filter(Boolean).join(" "),T=na(t,e.currentPlaySource),B=i?Ze(t):"",U=[{id:"hint",label:"走法"},...i?[{id:"stage",label:"关卡"}]:[],...r?[{id:"goals",label:"目标"}]:[],{id:"winrate",label:"胜率"},{id:"captures",label:"损失"},{id:"history",label:"历史"}],_=((O=U[0])==null?void 0:O.id)||"hint";return`
    <div class="${x}">
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-status-strip" aria-label="本局状态">
            <span class="game-status-chip game-mode-chip">${v}</span>
            ${i?`<span class="game-status-chip game-level-chip">${B} ${t.name}</span>`:""}
            <span class="game-status-chip" id="outer-ai-mode">${S}</span>
            <span class="game-status-chip game-live-round" id="outer-live-round">第1回合</span>
            <span class="game-status-chip game-live-turn" id="outer-live-turn">红方回合</span>
            <span class="game-status-chip game-live-message" id="outer-live-message" hidden></span>
          </div>
          
          <div class="game-action-bar" aria-label="对局操作">
            <button class="game-action-button" type="button" data-game-command="restart">重开</button>
            ${a?'<button class="game-action-button" type="button" data-game-command="undo">悔棋</button>':""}
            ${n||i?'<button class="game-action-button" type="button" data-game-command="draw">求和</button>':""}
            <button class="game-action-button" type="button" data-game-command="resign">认输</button>
            <button class="game-action-button" type="button" data-game-panel="codex" data-game-codex-mode="${b}">图鉴</button>
          </div>
        </div>
        ${a?Ce(e.settings,{allowToggle:!0,label:"自由对弈 AI"}):""}
        ${n?Ce(e.settings,{allowToggle:!1,label:"AI难度"}):""}
      </div>

      <div class="game-layout">
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${c}"
            title="${_e(d.name)}"
            allowfullscreen
          ></iframe>
        </div>

        <div class="game-info-panel" id="game-info-panel">
          <div class="game-info-tabs" role="group" aria-label="对局信息">
            ${U.map(M=>oa(M.id,M.label,M.id===_)).join("")}
          </div>
          <div class="game-info-content">
            ${K("hint","走法提示",`
              <div class="hint-display ${T?"":"hint-empty"}"
                   id="hint-display"
                   data-default="${_e(T)}">${T||"选择棋子查看走法"}</div>
              <div class="move-legend" aria-label="落点颜色说明">
                ${ia(g)}
              </div>
            `,_==="hint")}

            ${i?K("stage","关卡信息",`
              ${da(t,T,o)}
            `,_==="stage"):""}

            ${r?K("goals","通关目标",`
              <div class="star-goal-list" id="star-goal-list">
                ${ra(s,t.stars)}
              </div>
              ${t.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
            `,_==="goals"):""}

            ${K("winrate","AI胜率分析",`
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
            `,_==="winrate")}

            ${K("captures","损失棋子",`
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
            `,_==="captures")}

            ${K("history","历史步骤",`
              <div class="move-log" id="outer-move-log">
                <span class="log-empty">对局尚未开始</span>
              </div>
            `,_==="history")}
          </div>
        </div>
      </div>
      ${la({...e,codexMode:b})}
    </div>`}function ga(e){switch(e.screen){case"menu":return Te(e);case"levels":return ta();case"upgrade":return aa();case"game":return ma(e);default:return Te(e)}}const va={rook:"R",horse:"H",cannon:"C",pawn:"P",advisor:"A",bishop:"B",king:"K"};function qe(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return new Set;if(t==="kw")return new Set(I.map(i=>i.type));const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,r])=>{const o=va[i];r&&o&&s.add(o)}),s}function fa(e,t){return Object.fromEntries(I.map(s=>[s.type,t.has(s.type)?Math.max(0,Math.trunc(Number(e==null?void 0:e[s.type])||0)):0]))}function ha(e,t){return Object.fromEntries(I.map(s=>{const a=(e==null?void 0:e[s.type])||{};return[s.type,t.has(s.type)?{moves:Math.max(0,Math.trunc(Number(a.moves)||0)),games:Math.max(0,Math.trunc(Number(a.games)||0))}:{moves:0,games:0}]}))}function ba(e,t,s){var a;return!(s!=null&&s.complete)||e.freePlay||(a=e.config)!=null&&a.noAi||t==="free"?!1:qe(e).size>0}function ya(e,t){const s=qe(e);return{...t,redKillsByType:fa(t.redKillsByType,s),redSurvivalByType:ha(t.redSurvivalByType,s)}}function $a(){const e=document.getElementById("game-iframe");return e instanceof HTMLIFrameElement?e.contentWindow:null}function te(e,t={}){const s=$a();s&&s.postMessage({type:"game-command",command:e,...t},"*")}function ka(e){const t=document.getElementById("game-info-panel");t&&(t.querySelectorAll("[data-game-info-tab]").forEach(s=>{const a=s.dataset.gameInfoTab===e;s.classList.toggle("is-active",a),s.setAttribute("aria-pressed",String(a))}),t.querySelectorAll("[data-info-panel]").forEach(s=>{s.classList.toggle("is-active",s.dataset.infoPanel===e)}))}function me(e,t=""){const s=t||e.codexMode,a=t&&t!==e.codexMode?0:e.codexPage,n=document.getElementById("game-codex-mode-switch"),i=document.getElementById("game-codex-body");n&&(n.innerHTML=he(s)),i&&(i.innerHTML=be(s,a))}function ae(e,t,s=""){const a=document.getElementById("home-panel-codex");a&&(e&&me(t,s),a.hidden=!e)}function xa(e){document.querySelectorAll("[data-game-ai-strength]").forEach(t=>{const s=t.dataset.gameAiStrength===e;t.classList.toggle("is-active",s),t.setAttribute("aria-pressed",String(s))})}function wa(e){const t=N.find(s=>Number(s.time)===Number(e));return t?`AI ${t.label}`:e?`AI ${Math.round(Number(e)/1e3)}秒`:"AI"}function Sa(e){var i,r;const t=e.getState(),s=se(t.currentLevel)||se(Number(t.currentLevel)),a=((i=document.getElementById("game-iframe"))==null?void 0:i.getAttribute("src"))||"",n=a.includes("?")?new URLSearchParams(a.slice(a.indexOf("?")+1)).get("mode"):"";return((r=s==null?void 0:s.config)==null?void 0:r.mode)==="classic"||n==="classic"?"classic":"kw"}function Ae(e){const t=e.getState(),s=Sa(e);return t.codexMode!==s&&e.dispatch("set-codex-mode",{mode:s}),s}function Pa(e){const t=lt();function s(){const a=t.getState();if(e.dataset.screen==="game"&&a.screen==="game"&&e.dataset.levelId===String(a.currentLevel??"")&&e.dataset.playSource===String(a.currentPlaySource??"")){e.dataset.screen=a.screen;return}e.dataset.screen=a.screen,e.dataset.levelId=String(a.currentLevel??""),e.dataset.playSource=String(a.currentPlaySource??""),e.innerHTML=ga(a)}t.subscribe(s),at().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{var M;const n=a.target;if(!(n instanceof HTMLElement))return;const i=t.getState(),r=n.closest("[data-game-info-tab]");if(r){ka(r.dataset.gameInfoTab||"hint");return}const o=n.closest("[data-game-panel]");if(o){if(o.dataset.gamePanel==="codex"){const $=document.getElementById("home-panel-codex"),E=!$||$.hidden,G=o.dataset.gameCodexMode==="classic"?"classic":o.dataset.gameCodexMode==="kw"?"kw":"",Q=E?G||Ae(t):"";E&&G&&t.getState().codexMode!==G&&t.dispatch("set-codex-mode",{mode:G}),ae(E,t.getState(),Q)}return}const c=n.closest("[data-game-ai-toggle]");if(c){const $=z(t.getState().settings),E=c.dataset.aiEnabled!=="true";te("set-ai",{enabled:E,aiTime:$.time,aiStrength:$.id}),c.dataset.aiEnabled=String(E),c.textContent=E?"关闭AI":"开启AI";return}const d=n.closest("[data-game-ai-strength]");if(d){const $=N.find(E=>E.id===d.dataset.gameAiStrength)||N[0];t.dispatch("update-settings",{aiStrength:$.id}),xa($.id),te("set-ai-time",{aiTime:$.time,aiStrength:$.id});return}const u=n.closest("[data-home-panel]");if(u){const $=u.dataset.homePanel;if(i.screen==="game"){const E=$==="codex"&&((M=document.getElementById("home-panel-codex"))==null?void 0:M.hidden)!==!1,G=E?Ae(t):"";ae(E,t.getState(),G);return}t.dispatch("toggle-home-panel",{panel:$});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){if(i.screen==="game"){ae(!1,t.getState());return}t.dispatch("close-home-panels");return}const m=n.closest("[data-codex-mode]");if(m){t.dispatch("set-codex-mode",{mode:m.dataset.codexMode}),i.screen==="game"&&me(t.getState());return}const g=n.closest("[data-codex-page]");if(g){t.dispatch("set-codex-page",{page:g.dataset.codexPage}),i.screen==="game"&&me(t.getState());return}const v=n.closest("[data-home-mode]");if(v){t.dispatch("set-home-mode",{mode:v.dataset.homeMode});return}const b=n.closest("[data-level-page]");if(b){t.dispatch("set-level-page",{page:b.dataset.levelPage});return}const S=n.closest("[data-challenge-level]");if(S){t.dispatch("set-selected-challenge-level",{levelId:S.dataset.challengeLevel});return}const x=n.closest("[data-info-stats-scope]");if(x){t.dispatch("set-stats-scope",{scope:x.dataset.infoStatsScope});return}const T=n.closest("[data-setting-ai]");if(T){t.dispatch("update-settings",{aiStrength:T.dataset.settingAi});return}const B=n.closest("[data-game-command]");if(B){te(B.dataset.gameCommand);return}const U=n.closest("[data-navigate]");if(U){t.dispatch("navigate",{screen:U.dataset.navigate});return}const _=n.closest("[data-select-level]");if(_){const $=parseInt(_.dataset.selectLevel,10);isNaN($)||t.dispatch("select-level",{levelId:$,playSource:_.dataset.playSource});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const j=n.closest("[data-action]");if(j){const $=j.dataset.action;if($==="back-to-menu"||$==="back-to-levels"){te("abort-ai"),t.dispatch($);return}}const O=n.closest("[data-toggle-upgrade]");if(O){t.dispatch("toggle-upgrade",{pieceType:O.dataset.toggleUpgrade});return}}),e.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" ")return;const n=a.target;if(!(n instanceof HTMLElement))return;const i=n.closest("[data-challenge-level]");i&&(a.preventDefault(),t.dispatch("set-selected-challenge-level",{levelId:i.dataset.challengeLevel}))}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const i=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${i}%`);const r=n.closest(".sound-slider-row"),o=r==null?void 0:r.querySelector("[data-setting-value]");o&&(o.textContent=`${i}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const i=n.dataset.settingToggle;if(i){t.dispatch("update-settings",{[i]:n.checked});return}const r=n.dataset.settingRange;r&&t.dispatch("update-settings",{[r]:n.value})}),window.addEventListener("keydown",a=>{if(a.key==="Escape"){if(t.getState().screen==="game"){ae(!1,t.getState());return}t.dispatch("close-home-panels")}}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const i=se(n.currentLevel);if(i){if(a.data.type==="piece-selected"){const r=document.getElementById("hint-display");if(!r)return;const o=a.data.hint;if(o)r.textContent=o,r.classList.remove("hint-empty");else{const c=r.dataset.default||"";r.textContent=c||"选择棋子查看走法",r.classList.toggle("hint-empty",!c)}return}if(a.data.type==="game-status"){const r=document.getElementById("outer-live-turn"),o=document.getElementById("outer-live-round"),c=document.getElementById("outer-live-message"),d=document.getElementById("outer-ai-mode"),u=document.querySelector("[data-game-ai-toggle]");if(r&&a.data.turnText&&(r.textContent=a.data.turnText,r.classList.toggle("is-black-turn",a.data.turn==="black"),r.classList.toggle("is-red-turn",a.data.turn==="red"),r.classList.toggle("is-draw-turn",a.data.turn==="draw")),o&&a.data.roundText&&(o.textContent=a.data.roundText),d&&a.data.aiEnabled!==void 0&&(d.textContent=a.data.aiEnabled?wa(a.data.aiTime):"双人"),u&&a.data.aiEnabled!==void 0&&(u.dataset.aiEnabled=String(!!a.data.aiEnabled),u.textContent=a.data.aiEnabled?"关闭AI":"开启AI"),c){const m=a.data.message||"";c.textContent=m,c.hidden=!m}return}if(a.data.type==="game-progress"){const r=a.data.stats||{},o=n.starsPerLevel[i.id]||0,c=document.getElementById("star-goal-list");if(c&&(c.innerHTML=i.stars.map((g,v)=>{const b=o>>v&1,S=!!(g.eval&&g.eval(r)),x=b||S;return`<div class="star-goal ${x?"star-goal-earned":""}">
            <span class="star-goal-icon">${x?"★":"☆"}</span>
            <span class="star-goal-desc">${g.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const g=a.data.redPct,v=100-g,b=document.getElementById("outer-red-pct"),S=document.getElementById("outer-blk-pct"),x=document.getElementById("outer-fill-red"),T=document.getElementById("outer-advantage");b&&(b.textContent=g+"%"),S&&(S.textContent=v+"%"),x&&(x.style.width=g+"%"),T&&a.data.advantage&&(T.textContent=a.data.advantage)}const d=document.getElementById("outer-cap-red"),u=document.getElementById("outer-cap-black");d&&a.data.capturedRed!==void 0&&(d.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(g=>`<span class="cap-item red">${g}</span>`).join(""):'<span class="cap-empty">—</span>'),u&&a.data.capturedBlack!==void 0&&(u.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(g=>`<span class="cap-item blk">${g}</span>`).join(""):'<span class="cap-empty">—</span>');const m=document.getElementById("outer-move-log");m&&a.data.moves!==void 0&&(a.data.moves.length===0?m.innerHTML='<span class="log-empty">对局尚未开始</span>':(m.innerHTML=a.data.moves.map(g=>`<div class="log-entry ${g.side==="red"?"log-red":"log-blk"}">${g.text}</div>`).join(""),m.scrollTop=m.scrollHeight));return}if(a.data.type==="game-end"){const r=a.data.stats||{};let o=0;if(i.stars.forEach((c,d)=>{c.eval&&c.eval(r)&&(o|=1<<d)}),i.freePlay||t.dispatch("game-result",{newStarBits:o,win:!!r.win}),ba(i,n.currentPlaySource,r)){const c=ya(i,r);t.dispatch("record-personal-stats",{stats:c}),st(c).then(({stats:d,status:u})=>{t.dispatch("usage-stats-updated",{stats:d,status:u})}).catch(d=>{console.warn("全站游玩统计失败:",d),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}}),s()}const ze=document.querySelector("#app");if(!ze)throw new Error("#app container not found");Pa(ze);
