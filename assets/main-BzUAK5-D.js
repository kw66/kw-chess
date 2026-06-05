(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const Z={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},Ve="https://ypefmpeekfucmarbbdov.supabase.co",be="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",b={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day",survivalMoves:"kw_chess_survival_moves_total",survivalGames:"kw_chess_survival_games_total",survivalMovePrefix:"kw_chess_survival_moves",survivalGamePrefix:"kw_chess_survival_games",killPrefix:"kw_chess_kill"},P=[{type:"R",label:"车"},{type:"H",label:"马"},{type:"C",label:"炮"},{type:"P",label:"兵"},{type:"A",label:"仕"},{type:"B",label:"相"},{type:"K",label:"帅"}];function M(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function Je(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0,killsByType:Ie(),survivalByType:ze(),survivalMoves:0,survivalGames:0,avgSurvivalMoves:0}}function Xe(e){const t=e&&typeof e=="object"?e:{},s=M(t.survivalMoves),a=M(t.survivalGames);return{totalPv:M(t.totalPv),totalUv:M(t.totalUv),totalGames:M(t.totalGames),todayPv:M(t.todayPv),todayUv:M(t.todayUv),todayGames:M(t.todayGames),killsByType:J(t.killsByType),survivalByType:X(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0}}async function We(){const e=Le();return e&&await Ze(),{stats:await ne(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function Ye(e={}){if(!Le())return{stats:await ne(),status:"本地预览不会写入全站统计。"};const t=ee(),s=[I(b.totalGames),I(D(b.dailyGamesPrefix,t))],a=J(e.redKillsByType);for(const o of P){const c=a[o.type]||0;for(let d=0;d<c;d+=1)s.push(I(ie(o.type)))}const n=M(e.totalMoves,0,300);if(n>0){s.push(I(b.survivalGames));for(let o=0;o<n;o+=1)s.push(I(b.survivalMoves))}const i=X(e.redSurvivalByType);for(const o of P){const c=i[o.type],d=M(c.games,0,16),u=d>0?M(Math.round(c.moves/d),0,300):0;d>0&&s.push(I(re(o.type)));for(let f=0;f<u;f+=1)s.push(I(oe(o.type)))}return await Promise.all(s),{stats:await ne(),status:"游玩局数已同步。"}}async function Ze(){const e=ee();await Promise.all([I(b.totalPv),I(D(b.dailyPvPrefix,e))]);const t=localStorage.getItem(Z.statsVisitor)==="true",s=localStorage.getItem(Z.statsLastUvDate),a=[];t||(a.push(I(b.totalUv)),localStorage.setItem(Z.statsVisitor,"true")),s!==e&&(a.push(I(D(b.dailyUvPrefix,e))),localStorage.setItem(Z.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function ne(){const e=ee(),t=D(b.dailyPvPrefix,e),s=D(b.dailyUvPrefix,e),a=D(b.dailyGamesPrefix,e),n=P.map(u=>ie(u.type)),i=P.map(u=>oe(u.type)),r=P.map(u=>re(u.type)),o=await qe([b.totalPv,b.totalUv,b.totalGames,b.survivalMoves,b.survivalGames,t,s,a,...n,...i,...r]),c={},d={};return P.forEach(u=>{c[u.type]=o[ie(u.type)];const f=o[oe(u.type)],g=o[re(u.type)];d[u.type]={moves:f,games:g,avg:g>0?Math.round(f/g):0}}),Xe({totalPv:o[b.totalPv],totalUv:o[b.totalUv],totalGames:o[b.totalGames],todayPv:o[t],todayUv:o[s],todayGames:o[a],survivalMoves:o[b.survivalMoves],survivalGames:o[b.survivalGames],killsByType:c,survivalByType:d})}async function I(e){return Ee("increment_counter",{counter_id:e})}async function qe(e){const t=await Ee("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=M(a.count));return s}async function Ee(e,t){const s=await fetch(`${Ve}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:be,Authorization:`Bearer ${be}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function Le(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function D(e,t=ee()){return`${e}_${t.replaceAll("-","")}`}function ie(e){return`${b.killPrefix}_${e}`}function oe(e){return`${b.survivalMovePrefix}_${e}`}function re(e){return`${b.survivalGamePrefix}_${e}`}function Ie(){return Object.fromEntries(P.map(e=>[e.type,0]))}function J(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(P.map(s=>[s.type,M(t[s.type])]))}function ze(){return Object.fromEntries(P.map(e=>[e.type,{moves:0,games:0,avg:0}]))}function X(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(P.map(s=>{const a=t[s.type]&&typeof t[s.type]=="object"?t[s.type]:{},n=M(a.moves,0,99999999),i=M(a.games,0,99999999);return[s.type,{moves:n,games:i,avg:i>0?Math.round(n/i):0}]}))}function ee(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const K={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"fair"},C=[{id:"learn",label:"难度 1",time:2e3,note:"熟悉规则稳健落子"},{id:"fair",label:"难度 2",time:4e3,note:"攻防均衡认真对局"},{id:"boss",label:"难度 3",time:6e3,note:"深度搜索挑战极限"}];function ye(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function te(e){const t=e&&typeof e=="object"?e:{},s=C.some(a=>a.id===t.aiStrength)?t.aiStrength:K.aiStrength;return{sfxEnabled:t.sfxEnabled??K.sfxEnabled,sfxVolume:ye(t.sfxVolume,K.sfxVolume),bgmEnabled:t.bgmEnabled??K.bgmEnabled,bgmVolume:ye(t.bgmVolume,K.bgmVolume),aiStrength:s}}function W(e){const t=te(e);return C.find(s=>s.id===t.aiStrength)||C.find(s=>s.id===K.aiStrength)||C[0]}const Te="kw-chess-save";function Qe(){try{const e=localStorage.getItem(Te);return e?JSON.parse(e):null}catch{return null}}function F(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,personalStats:e.personalStats,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(Te,JSON.stringify(t))}catch{}}function et(){const e=Qe(),t=(e==null?void 0:e.personalStats)||{},s=Math.max(0,Math.trunc(Number(t.survivalMoves)||0)),a=Math.max(0,Math.trunc(Number(t.survivalGames)||0));return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,personalStats:{killsByType:J(t.killsByType),survivalByType:X(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0},usageStats:Je(),usageStatsStatus:"全站统计读取中。",settings:te(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"kw",codexPage:0,homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,selectedChallengeLevel:null,statsScope:"personal",currentLevel:null,currentPlaySource:null}}function tt(){let e=et();const t=new Set;function s(){return e}function a(r){const o=typeof r=="function"?r(e):r;e={...e,...o},t.forEach(c=>c(e))}function n(r){return t.add(r),()=>t.delete(r)}function i(r,o={}){var c,d,u,f,g;switch(r){case"navigate":a({screen:o.screen});break;case"usage-stats-updated":a({usageStats:o.stats??e.usageStats,usageStatsStatus:o.status??e.usageStatsStatus});break;case"toggle-home-panel":{const v=o.panel||null;a({activeHomePanel:e.activeHomePanel===v?null:v});break}case"open-home-panel":a({activeHomePanel:o.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:o.mode==="kw"?"kw":"classic",codexPage:0});break;case"set-codex-page":a({codexPage:Math.max(0,Math.trunc(Number(o.page)||0))});break;case"set-home-mode":{const v=o.mode==="classic"?"classic":"kw";a({homeMode:v}),F({...e,homeMode:v});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(o.page)||0)),selectedChallengeLevel:null});break;case"set-selected-challenge-level":a({selectedChallengeLevel:Math.max(1,Math.trunc(Number(o.levelId)||1))});break;case"set-stats-scope":a({statsScope:o.scope==="global"?"global":"personal"});break;case"update-settings":{const v=te({...e.settings,...o});a({settings:v}),F({...e,settings:v});break}case"record-personal-stats":{const v=o.stats||{},x={...J((c=e.personalStats)==null?void 0:c.killsByType)},$=J(v.redKillsByType),_={...X((d=e.personalStats)==null?void 0:d.survivalByType)},A=X(v.redSurvivalByType);Object.keys(Ie()).forEach(w=>{var B,Y,fe,he;x[w]=(x[w]||0)+($[w]||0);const y=(((B=_[w])==null?void 0:B.moves)||0)+(((Y=A[w])==null?void 0:Y.moves)||0),S=(((fe=_[w])==null?void 0:fe.games)||0)+(((he=A[w])==null?void 0:he.games)||0);_[w]={moves:y,games:S,avg:S>0?Math.round(y/S):0}});const L=Math.max(0,Math.min(300,Math.trunc(Number(v.totalMoves)||0))),O=L>0?(((u=e.personalStats)==null?void 0:u.survivalGames)||0)+1:((f=e.personalStats)==null?void 0:f.survivalGames)||0,N=(((g=e.personalStats)==null?void 0:g.survivalMoves)||0)+L,G={killsByType:x,survivalByType:_,survivalMoves:N,survivalGames:O,avgSurvivalMoves:O>0?Math.round(N/O):0};a({personalStats:G}),F({...e,personalStats:G});break}case"select-level":a({screen:"game",currentLevel:o.levelId,currentPlaySource:o.playSource||"challenge"});break;case"back-to-menu":a({screen:"menu",currentLevel:null,currentPlaySource:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null,currentPlaySource:null});break;case"toggle-upgrade":{const{pieceType:v}=o,k={...e.pieceUpgrades};k[v]?delete k[v]:k[v]=!0,a({pieceUpgrades:k}),F({...e,pieceUpgrades:k});break}case"game-result":{const{newStarBits:v,win:k}=o,x=e.currentLevel,$={...e.starsPerLevel};$[x]=($[x]||0)|(v||0);const E={starsPerLevel:$,totalWins:e.totalWins+(k?1:0),totalGames:e.totalGames+1};a(E),F({...e,...E});break}default:console.warn(`[Store] 未知 action: ${r}`)}}return{getState:s,setState:a,subscribe:n,dispatch:i}}const ke={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},ue=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:4e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"列车冲撞",desc:"车沿直线冲撞友军，把棋子推上战线",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"列车冲撞！车可以沿直线冲撞友军，把棋子推向更深的位置；同类车叠在一起后还能合体。"}]},{id:3,name:"马踏飞燕",desc:"马借己方棋子连续起跳，追吃多个目标",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"马踏飞燕！马可以向十二方跳跃，借己方棋子连续起跳，不受蹩马腿限制；同类马还能合体。"}]},{id:4,name:"洲际导弹",desc:"炮翻过连续炮架，远程打击后排",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"洲际导弹！炮可以翻过连续炮架，远袭炮架后的敌方棋子。"}]},{id:5,name:"集束炸弹",desc:"兵叠层合体后自爆，覆盖周围目标",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"集束炸弹！兵可以上下左右一步移动，同类兵会自动合体；双击自爆可以清掉周围目标。"}]},{id:6,name:"X形光波",desc:"仕斜走出宫，落地释放 X 形光波",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"X形光波！仕可以斜走出宫，落地时沿四条斜线释放光波；同类仕还能合体。"}]},{id:7,name:"十字地震波",desc:"相过河跳田，落地释放十字地震波",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:4e3,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"十字地震波！相可以过河跳田，落地时沿横竖方向打出地震波；同类相还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:4e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"自爆列车",desc:"车运叠兵深入敌阵，引爆自爆连锁",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:4e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"自爆列车！用车把叠兵送进敌阵，再引爆自爆连锁消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"车马炮兵仕相帅觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"车马炮兵仕相帅觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"巅峰对决",desc:"车马炮兵仕相帅觉醒，完整对决",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:4e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"巅峰对决！车、马、炮、兵、仕、相、帅都觉醒，冲撞、连踩、光波、地震和自爆会一起改变局势。"}]}]}],T=ue.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function Q(e){return T.find(t=>t.id===e)||null}const at=T.filter(e=>!e.freePlay).length,_e={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"车马炮兵仕相帅觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},st=2,nt=6,it={1:"从基础走法开始",2:"用冲撞打开直线",3:"连续追吃多个目标",4:"隔着炮架打后排",5:"把爆点送进敌阵",6:"用斜线覆盖目标",7:"用横竖线控场",8:"送帅出宫亲征",9:"运叠兵进阵自爆",10:"冲撞、连踩、光波、地震、自爆同场"},ot={1:{setupLabel:"规则",setup:"基础象棋",focus:"移动七类棋子，再用不同棋子吃子"},2:{setupLabel:"棋子",setup:"车觉醒",focus:"车冲到友军前一格，把它推出去"},3:{setupLabel:"棋子",setup:"马觉醒",focus:"踩己方棋子继续跳，直到吃到目标"},4:{setupLabel:"棋子",setup:"炮觉醒",focus:"选连续炮架后的敌子，优先打后排"},5:{setupLabel:"棋子",setup:"兵觉醒",focus:"叠到更高层，再在敌阵中心爆开"},6:{setupLabel:"棋子",setup:"仕觉醒",focus:"落在斜线交叉点，用 X 形伤害扫敌"},7:{setupLabel:"棋子",setup:"相觉醒",focus:"落在中线附近，用十字波覆盖目标"},8:{setupLabel:"棋子",setup:"车、帅觉醒",focus:"车把帅推出九宫，帅吃叠子成长"},9:{setupLabel:"棋子",setup:"车、兵觉醒",focus:"车运叠兵到底线或敌阵中心再爆"},10:{setupLabel:"棋子",setup:"车、马、炮、兵、仕、相、帅觉醒",focus:"组合技能争中路，别让帅暴露"}};function l(e,t){return e.map(([s,a])=>({x:s,y:a,type:t}))}function p(e,t,s,a={}){return{x:e,y:t,piece:s,owner:a.owner||"red",layer:a.layer||1,groups:a.groups,type:a.type||"",ghost:!!a.ghost}}function j(e=1,t=1,s=3){const a=[];for(let n=t;n<t+s;n+=1)for(let i=e;i<e+s;i+=1)a.push({x:i,y:n,type:"palace"});return a}function H(e=1,t=1,s=3){return{x:e,y:t,size:s}}function V(e=2.5){return{y:e}}function h(e,t,s={}){return{from:e,to:t,...s}}function m(e,t,s={}){return{title:e,marks:t,...s}}const Be=[{piece:"車",name:"车",title:"横竖直线走，遇到棋子就停",diagrams:[m("空线可走",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"車"})}),m("挡子与吃子",[...l([[1,2]],"move"),...l([[0,2,"吃"]],"attack"),...l([[3,2,"挡"]],"block"),...l([[4,2,"不可"]],"blocked")],{pieces:[p(0,2,"卒",{owner:"black",type:"attack"}),p(3,2,"兵",{type:"block"})],animation:h([2,2],[0,2],{piece:"車",kind:"attack"})})],sections:[{title:"怎么走",items:["车只走横线或竖线，一次可以走任意格数。","绿色格表示中间没有棋子挡住，所以都可以直接到达。"]},{title:"怎么吃",items:["同一条直线上遇到第一枚敌方棋子时，可以走到敌方棋子所在格并吃掉它。","遇到任何棋子都会停住，不能越过它去吃后面的棋子。"]}]},{piece:"馬",name:"马",title:"走“日”字，马腿被占会被蹩",diagrams:[m("日字落点",[...l([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")],{animation:h([2,2],[0,1],{piece:"馬"})}),m("蹩马腿",[...l([[2,1,"腿"]],"block"),...l([[1,0,"禁"],[3,0,"禁"]],"blocked"),...l([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")],{pieces:[p(2,1,"兵",{type:"block"})],animation:h([2,2],[1,0],{piece:"馬",kind:"denied"})})],sections:[{title:"怎么走",items:["马走“日”字：先横或竖一格，再斜一格，最终落在绿色位置。","马不是直线棋子，可以越过大多数棋子，但有一个关键例外。"]},{title:"蹩马腿",items:["如果马正前、正后、正左、正右的“马腿格”被任何棋子占住，那个方向的两个日字落点都不能走。","示意图里上方马腿被红兵占住，所以对应方向的两个灰色落点都不能去。"]}]},{piece:"炮",name:"炮",title:"移动像车，吃子必须隔一个炮架",diagrams:[m("不吃子移动",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"炮"})}),m("隔架吃子",[...l([[1,2,"架"]],"block"),...l([[3,2,"吃"]],"attack"),...l([[2,2]],"path")],{center:{x:0,y:2},pieces:[p(1,2,"兵",{type:"block"}),p(3,2,"卒",{owner:"black",type:"attack"})],animation:h([0,2],[3,2],{piece:"炮",kind:"attack"})})],sections:[{title:"怎么走",items:["炮不吃子时和车一样，沿横线或竖线移动，不能越过棋子。"]},{title:"怎么吃",items:["炮吃子时必须隔着正好一个棋子，这个被隔着的棋子叫炮架。","炮架可以是双方任意棋子；炮架后遇到的第一枚敌棋才是可吃目标。"]}]},{piece:"兵",name:"兵",title:"未过河只前进，过河后可左右",diagrams:[m("未过河",[...l([[2,2,"进"]],"move"),...l([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3},river:V(1.5),animation:h([2,3],[2,2],{piece:"兵"})}),m("过河后",[...l([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...l([[2,3,"禁"]],"blocked")],{river:V(2.5),animation:h([2,2],[1,2],{piece:"兵"})})],sections:[{title:"怎么走",items:["兵每次只走一格。红方朝上前进，黑方朝下前进。","没有过河前只能向前走，不能左右走，也不能后退。"]},{title:"过河以后",items:["过河后可以向前、向左、向右走一格。","兵永远不能后退。"]}]},{piece:"仕",name:"仕",title:"只在九宫内斜走一格",diagrams:[m("九宫内可达",[...j(),...l([[1,1],[3,1],[1,3],[3,3]],"move")],{palace:H(),animation:h([2,2],[1,1],{piece:"仕"})}),m("不能出宫",[...j(),...l([[2,2]],"move"),...l([[0,0],[0,2],[2,0]],"blocked")],{center:{x:1,y:1},palace:H(),animation:h([1,1],[0,0],{piece:"仕",kind:"denied"})})],sections:[{title:"活动范围",items:["仕只能留在己方九宫内，不能出宫。","九宫就是帅周围的 3×3 区域。"]},{title:"不能出宫",items:["仕在九宫角上时，只有仍落在九宫里的斜向格可以走。","灰色叉号表示看起来是斜一步，但落点已经出了九宫，所以不能走。"]}]},{piece:"相",name:"相",title:"走田字，两格斜跳，象眼会挡",diagrams:[m("田字落点",[...l([[0,0],[4,0],[0,4],[4,4]],"move")],{animation:h([2,2],[0,0],{piece:"相"})}),m("塞象眼",[...l([[1,1,"眼"]],"block"),...l([[0,0,"禁"]],"blocked"),...l([[4,0],[0,4],[4,4]],"move")],{pieces:[p(1,1,"兵",{type:"block"})],animation:h([2,2],[0,0],{piece:"相",kind:"denied"})}),m("不能过河",[...l([[0,1],[4,1]],"blocked")],{center:{x:2,y:3},river:V(2.5),animation:h([2,3],[0,1],{piece:"相",kind:"denied"})})],sections:[{title:"怎么走",items:["相沿对角线一次跳两格，也就是走“田”字。","相不能过河，只能在己方半边活动。"]},{title:"塞象眼",items:["如果对角线中间那一格被任何棋子占住，对应方向就不能跳。","示意图里左上方向的象眼被红兵占住，所以左上角的灰色落点不能走。"]},{title:"不能过河",items:["相的落点不能越过河界。","即使“田”字落点看起来对，也不能跳到河对岸的灰色格。"]}]},{piece:"帅",name:"帅",title:"九宫内一步，将帅不能照面",diagrams:[m("九宫一步",[...j(),...l([[2,1],[1,2],[3,2],[2,3]],"move")],{palace:H(),animation:h([2,2],[2,1],{piece:"帅"})}),m("照面禁线",[...j(1,2,3),...l([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4},palace:H(1,2,3),pieces:[p(2,0,"将",{owner:"black",type:"attack"})]})],sections:[{title:"怎么走",items:["帅只能在九宫内横走或竖走一格。","帅不能主动走出九宫。"]},{title:"将帅照面",items:["双方帅/将如果在同一列，中间没有任何棋子挡住，就是违规局面。","走棋时要避免让两位主帅直接面对面。"]}]}],Ce=[{piece:"叠",name:"通用叠层",title:"先看这页：叠层、合体、叠层吃子",diagrams:[m("同类叠层",[...l([[1,2,"車"],[2,2,"叠"],[3,2,"2层"],[4,2]],"combo")],{center:{x:0,y:2},piece:"車",pieces:[p(2,2,"車",{type:"combo"}),p(4,2,"車",{layer:2,groups:[1,1],type:"combo"})],animation:h([0,2],[2,2],{piece:"車",kind:"combo"})}),m("层数吃子",[...l([[3,2,"敌1"],[4,2,"胜"]],"attack"),...l([[1,2,"2层"]],"combo")],{center:{x:1,y:2},piece:"車",centerLayer:2,centerGroups:[2],pieces:[p(4,2,"卒",{owner:"black",type:"attack"})],animation:h([1,2],[4,2],{piece:"車",layer:2,groups:[2],kind:"attack"})}),m("层数不足",[...l([[2,2,"敌3"]],"attack"),...l([[3,2,"剩2"],[4,2]],"block"),...l([[1,2,"败"]],"blocked")],{center:{x:0,y:2},piece:"兵",pieces:[p(2,2,"卒",{owner:"black",layer:3,type:"attack"}),p(4,2,"卒",{owner:"black",layer:2,type:"block",ghost:!0})],animation:h([0,2],[2,2],{piece:"兵",kind:"denied"})})],sections:[{title:"怎么叠",items:["同阵营、同种类的觉醒棋子可以走到一起形成叠层；帅/王不能叠层。","兵最多叠到 5 层，并且叠上去后会自动合体；其他棋子叠上去后先保持为多个小组。"]},{title:"怎么操作",items:["单击叠子会默认带最上面一组行动，剩下的小组留在原格。","双击叠子会打开选择环：多个小组可以选“合”，合体后可以整组行动；合体棋子也可以双击拆出部分层数行动。"]},{title:"怎么吃叠子",items:["吃子只看本次出击的层数和目标总层数。出击层数大于或等于目标层数，就能消灭目标并保留自己的层数。","如果出击层数小于目标层数，进攻方会消失，目标只扣掉对应层数。图中 1 层兵打 3 层敌子会失败，敌子剩 2 层。"]}]},{piece:"車",name:"觉醒车",title:"直线移动，冲撞运输",diagrams:[m("直线移动",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"車"})}),m("冲撞运输",[...l([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...l([[2,2,"友"]],"ally")],{center:{x:0,y:2},pieces:[p(2,2,"兵",{type:"ally"}),p(4,2,"兵",{type:"skill",ghost:!0})],animations:[h([0,2],[1,2],{piece:"車",kind:"skill"}),h([2,2],[4,2],{piece:"兵",kind:"skill",delay:520})]}),m("车车合体",[...l([[1,2,"車"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"車",{type:"combo"}),p(4,2,"車",{layer:2,groups:[2],type:"combo"})],animation:h([0,2],[2,2],{piece:"車",kind:"combo"})})],sections:[{title:"怎么走",items:["觉醒车仍然按车的方式横竖直线移动，不能越过普通阻挡。","遇到敌子时可以按层数规则吃子。"]},{title:"冲撞",items:["如果同一条直线上先有空格、再遇到己方异类棋子，车可以冲到它前一格并把它沿同方向推出。","被推出的棋子遇到己方同类会叠层，遇到敌方会按层数结算；如果把帅推出九宫，就会触发帅的宫外规则。"]},{title:"叠层表现",items:["车车叠层后可合体，合体车能用更高层数吃子或冲撞。","如果被冲撞的是未合体叠子，只推出最底部的小组；合体后才会整体被推出。"]}]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[m("十二方落点",[...l([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")],{animation:h([2,2],[0,1],{piece:"馬"})}),m("借友连跳",[...l([[2,2,"友"],[4,2,"续"]],"skill"),...l([[4,4,"吃"]],"attack"),...l([[2,0,"空"]],"move")],{center:{x:0,y:2},pieces:[p(2,2,"兵",{type:"skill"}),p(4,4,"卒",{owner:"black",type:"attack"})],animations:[h([0,2],[2,2],{piece:"馬",kind:"skill"}),h([2,2],[4,4],{piece:"馬",kind:"attack",delay:520})]}),m("马马合体",[...l([[1,2,"馬"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"馬",{type:"combo"}),p(4,2,"馬",{layer:2,groups:[2],type:"combo"})],animation:h([0,2],[2,2],{piece:"馬",kind:"combo"})})],sections:[{title:"怎么走",items:["觉醒马可以跳传统“日”字的 8 个点，也可以直线跳 2 格，总共 12 个方向。","觉醒马没有蹩马腿限制，旁边有棋子也不会挡住它。"]},{title:"连踩",items:["跳到己方棋子上时可以继续从那里再跳；己方异类只是踏点，不会停在上面。","跳到己方马的位置时，可以选择叠层，也可以把它当踏点继续跳。跳到敌方棋子时结束并按层数吃子。"]},{title:"叠层表现",items:["马马合体后，本次出击层数更高，连踩到敌方叠子时更容易吃赢。","未合体时通常只有最上面的小组行动，合体后可以整组跳，也可以拆分部分层数行动。"]}]},{piece:"炮",name:"觉醒炮",title:"直线移动，翻过连续炮架",diagrams:[m("直线移动",[...l([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")],{animation:h([2,2],[2,0],{piece:"炮"})}),m("连续炮架",[...l([[1,2,"架"],[2,2,"架"]],"block"),...l([[3,2,"落"]],"move"),...l([[4,2,"吃"]],"attack")],{center:{x:0,y:2},pieces:[p(1,2,"兵",{type:"block"}),p(2,2,"卒",{owner:"black",type:"block"}),p(4,2,"卒",{owner:"black",type:"attack"})],animation:h([0,2],[4,2],{piece:"炮",kind:"attack"})}),m("炮炮合体",[...l([[1,2,"炮"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"炮",{type:"combo"}),p(4,2,"炮",{layer:2,groups:[2],type:"combo"})],animation:h([0,2],[2,2],{piece:"炮",kind:"combo"})})],sections:[{title:"怎么走",items:["不吃子时，觉醒炮可以像车一样沿横线或竖线走。","遇到连续棋子段时，炮可以翻过这段炮架，落到后面的空格。"]},{title:"怎么吃",items:["炮架可以是一段连续棋子；越过炮架后遇到的第一枚敌棋可以被攻击。","如果炮架后遇到的是己方炮，也可以叠层。"]},{title:"叠层表现",items:["炮炮合体后按更高层数远袭，打叠层敌子更强。","未合体炮叠子先是多个小组，双击合体后才会整组行动。"]}]},{piece:"兵",name:"觉醒兵",title:"四向一步，叠层自动合体，自爆连锁",diagrams:[m("四向可走",[...l([[2,1],[1,2],[3,2],[2,3]],"move")],{river:V(2.5),animation:h([2,2],[2,3],{piece:"兵"})}),m("自爆范围",[...l([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")],{pieces:[p(1,1,"卒",{owner:"black",type:"attack"}),p(3,3,"马",{type:"attack"})]}),m("兵兵自动合体",[...l([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"兵",{type:"combo"}),p(4,2,"兵",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒兵每次可以向上、下、左、右走一格，不再受过河限制。","遇到敌子时按层数规则吃子。"]},{title:"自爆",items:["双击兵可以选择“爆”。自爆后兵自己消失，并攻击周围范围。","自爆半径等于兵的总层数；对非兵棋子每次造成 1 层伤害，双方棋子都会被波及。被炸到的兵会继续连锁自爆。"]},{title:"叠层表现",items:["兵叠到同类兵上会自动合体，最多 5 层。","层数越高，自爆范围越大，因此叠兵是推进和爆破的核心。"]}]},{piece:"仕",name:"觉醒仕",title:"斜走出宫，落地释放 X 形光波",diagrams:[m("出宫斜走",[...j(),...l([[0,0],[0,2],[2,0],[2,2]],"move")],{center:{x:1,y:1},palace:H(),animation:h([1,1],[0,0],{piece:"仕"})}),m("X 形伤害",[...l([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")],{pieces:[p(0,0,"卒",{owner:"black",type:"attack"}),p(4,4,"砲",{owner:"black",type:"attack"})]}),m("仕仕合体",[...l([[1,2,"仕"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"仕",{type:"combo"}),p(4,2,"仕",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒仕每次斜走一格，可以出宫，也可以过河。","叠到己方仕时只是叠层，不会触发光波。"]},{title:"光波",items:["仕移动或吃子落地后，会向四条斜线释放 X 形光波。","光波的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["仕仕合体后，顶组层数变高，光波打得更远、伤害更高。","合体后也可以拆出部分层数行动，用小光波试探。"]}]},{piece:"相",name:"觉醒相",title:"无象眼越河，落地释放十字地震",diagrams:[m("斜跳两格",[...l([[0,1],[4,1]],"move"),...l([[1,2],[3,2]],"path")],{center:{x:2,y:3},river:V(2.5),pieces:[p(1,2,"兵",{type:"path"}),p(3,2,"卒",{owner:"black",type:"path"})],animation:h([2,3],[0,1],{piece:"相"})}),m("十字伤害",[...l([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")],{pieces:[p(2,0,"卒",{owner:"black",type:"attack"}),p(4,2,"馬",{owner:"black",type:"attack"})]}),m("相相合体",[...l([[1,2,"相"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[p(2,2,"相",{type:"combo"}),p(4,2,"相",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒相仍然斜跳两格，但不再检查象眼，也可以过河。","叠到己方相时只是叠层，不会触发地震。"]},{title:"地震",items:["相移动或吃子落地后，会向上下左右释放十字地震。","地震的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["相相合体后，十字地震范围和伤害都会提升。","合体相适合站到中路，用十字线压制大片区域。"]}]},{piece:"帅",name:"觉醒帅",title:"九宫八向，吃子成长，可被车送出宫",diagrams:[m("九宫八向",[...j(),...l([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")],{palace:H(),animation:h([2,2],[1,1],{piece:"帅"})}),m("吃子成长",[...l([[2,1,"吃"]],"attack"),...l([[2,0,"+1"]],"combo")],{pieces:[p(2,1,"卒",{owner:"black",type:"attack"}),p(2,0,"帅",{layer:2,groups:[2],type:"combo",ghost:!0})]}),m("车送出宫",[...j(),...l([[2,4,"車"]],"ally"),...l([[2,3,"撞"],[2,1,"出"]],"skill")],{palace:H(),showCenter:!1,pieces:[p(2,4,"車",{type:"ally"}),p(2,0,"帅",{type:"skill",ghost:!0})],animation:h([2,2],[2,0],{piece:"帅",kind:"skill"})})],sections:[{title:"怎么走",items:["觉醒帅在九宫内可以向八个方向走一格，但不能自己主动走出九宫。","如果已经被车冲撞送出宫，宫外帅只能上下左右走一格。"]},{title:"成长",items:["帅成功吃掉敌方棋子并站到目标格后，会增加 1 层。","帅不能叠层，成长是帅提升层数的主要方式。"]},{title:"车送出宫",items:["觉醒车可以冲撞己方帅，把帅推出九宫。","被车送出去的帅可以亲自参战，但也会暴露在更危险的位置。"]}]}];function rt(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Ae(e){return e==="classic"?"classic":"kw"}function ct(e,t=T){return t.reduce((s,a)=>s+rt(e[a.id]||0),0)}function lt(e=T){return e.reduce((t,s)=>t+s.stars.length,0)}function dt(e,t=T){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function ut(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function ce(e,t){const s=T.find(i=>i.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=T.find(i=>i.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function U(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function Ne(e){return`${Math.max(0,Math.round(Number(e)||0))}步`}function Ge(e,t){return Math.max(0,Math.trunc(Number(e==null?void 0:e[t])||0))}function Ue(e,t){const s=e==null?void 0:e[t];if(!s||typeof s!="object")return 0;const a=Math.max(0,Math.trunc(Number(s.games)||0)),n=Math.max(0,Math.trunc(Number(s.moves)||0));return a>0?Math.round(n/a):0}function Oe(e){return e==="global"?"global":"personal"}function $e(e,t,s){const a=t===e;return`<button class="stats-scope-button ${a?"is-active":""}" type="button" data-info-stats-scope="${e}" aria-pressed="${a}">${s}</button>`}function pt(e,t,s="personal"){const a=Oe(s),n=a==="global"?t:e,i=(n==null?void 0:n.killsByType)||{},r=(n==null?void 0:n.survivalByType)||{};return`
    <div class="battle-piece-grid" aria-label="${a==="global"?"全站棋子游玩统计":"玩家棋子游玩统计"}">
      ${P.map(o=>`
        <div class="battle-piece-card">
          <b>${o.label}</b>
          <span><em>击杀${U(Ge(i,o.type))}</em><em>存活${Ne(Ue(r,o.type))}</em></span>
        </div>
      `).join("")}
    </div>`}function mt(e={}){const t=(e==null?void 0:e.killsByType)||{},s=(e==null?void 0:e.survivalByType)||{};return`
    <div class="home-desktop-stats" aria-label="玩家棋子表现">
      <strong>玩家棋子表现</strong>
      <div class="home-desktop-piece-grid">
        ${P.map(a=>`
          <span class="home-desktop-piece">
            <b>${a.label}</b>
            <em>击杀${U(Ge(t,a.type))}</em>
            <i>存活${Ne(Ue(s,a.type))}</i>
          </span>
        `).join("")}
      </div>
    </div>`}function ae(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function xe(e,t){const s=_e[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>${a?'<i aria-hidden="true">✔</i>':""}
  </button>`}function gt(e){return`${(Math.max(0,Number(e)||0)/1e3).toFixed(e%1e3===0?0:1)} 秒`}function vt(e){return it[e.id]||e.desc}function ft(e){var a;const t=ot[e.id]||{setupLabel:"规则",setup:((a=e.config)==null?void 0:a.mode)==="classic"?"基础象棋":"本关规则",focus:e.desc||"赢下本局"};return`
    <div class="challenge-force-brief">
      <p><b>${t.setupLabel||"觉醒"}</b><span>${t.setup}</span></p>
      <p><b>打法</b><span>${t.focus}</span></p>
    </div>`}function ht(e){const t=String(e||"").replace(/\s+/g,""),s={移动过每种棋子:"移动全部棋子",用4种不同棋子吃过子:"4种棋子吃子",获胜:"获胜",車运输叠兵:"车运叠兵",叠兵到达底线:"叠兵到底线",王出九宫格:"帅出九宫",王击杀叠层棋子:"帅吃叠子"};return s[t]?s[t]:t.replace(/觉醒車/g,"觉醒车").replace(/^觉醒/g,"").replace(/擊/g,"击").replace(/达到/g,"").replace(/一次连踩链/g,"马连踩").replace(/步内获胜/g,"步内胜")}function bt(e){const t=Ae(e.homeMode),s=_e[t],a=T.find(o=>o.id===s.aiLevelId),n=T.find(o=>o.id===s.freeLevelId),i=W(e.settings),r=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-step-block home-rule-step">
        <div class="home-step-head">
          <span>1</span><b>选择规则</b>
        </div>
        <div class="home-mode-switch" role="group" aria-label="规则模式">
          ${xe("classic",t)}
          ${xe("kw",t)}
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
      ${mt(e.personalStats)}
    </section>`}function pe(){return T.filter(e=>!e.freePlay)}function yt(e){return ue.find(t=>Number(t.id)===Number(e.tierId))||null}function kt(e){const t=yt(e),a=((t==null?void 0:t.levels)||[]).filter(n=>!n.freePlay).findIndex(n=>Number(n.id)===Number(e.id));return`${e.tierId||1}-${Math.max(1,a+1)}`}function $t(e){const t=pe(),s=[];return ue.forEach(a=>{const n=t.filter(r=>Number(r.tierId)===Number(a.id)),i=Math.max(1,Math.ceil(n.length/e));for(let r=0;r<n.length;r+=e)s.push({tierId:a.id,tierName:a.name,tierPage:Math.floor(r/e)+1,tierPageCount:i,levels:n.slice(r,r+e)})}),s}function xt(e,t){return`<div class="challenge-star-goals" aria-label="星级条件">
    ${e.stars.map((s,a)=>{const n=t>>a&1;return`<span class="challenge-star-chip ${n?"is-earned":""}"><b>${n?"★":"☆"}</b><em>${ht(s.desc)}</em></span>`}).join("")}
  </div>`}function wt(e,t,s){var c;const a=t[e.id]||0,n=ce(e.id,t),i=ut(e,t),r=kt(e),o=n&&Number(e.id)===Number(s);return`
    <article class="challenge-level-card ${i?"is-completed":""} ${o?"is-selected":""} ${n?"is-playable":"is-locked"}"
             data-mode="${((c=e.config)==null?void 0:c.mode)??"kw"}"
             ${n?`data-challenge-level="${e.id}" role="button" tabindex="0" aria-pressed="${o}"`:""}>
      <div class="challenge-card-head">
        <span class="challenge-index">${r}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${vt(e)}</em>
        </div>
      </div>
      ${ft(e)}
      ${xt(e,a)}
    </article>`}function St(e,t,s){const a=e.find(n=>Number(n.id)===Number(s)&&ce(n.id,t));return a||e.find(n=>ce(n.id,t))||null}function Mt(e,t){return t<=1?"":`<div class="challenge-pager" aria-label="关卡翻页">
    <button type="button" data-level-page="${e-1}" ${e<=0?"disabled":""}>‹</button>
    <span>${e+1} / ${t}</span>
    <button type="button" data-level-page="${e+1}" ${e>=t-1?"disabled":""}>›</button>
  </div>`}function Pt(e,t,s,a){var g;const n=typeof window<"u"&&((g=window.matchMedia)!=null&&g.call(window,"(min-width: 1024px)").matches)?nt:st,i=pe(),r=$t(n),o=Math.max(1,r.length),c=Math.min(Math.max(0,e.levelPage||0),o-1),d=r[c]||{tierId:1,tierName:"传统象棋",levels:[]},u=d.levels,f=St(u,e.starsPerLevel,e.selectedChallengeLevel);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <h2>关卡模式</h2>
        <button class="challenge-head-start" type="button" ${f?`data-select-level="${f.id}" data-play-source="challenge"`:"disabled"}>开始挑战</button>
        <div class="challenge-summary">
          <span>通关 <b>${t}/${i.length||at}</b></span>
          <span>★ <b>${s}/${a}</b></span>
        </div>
      </header>
      <div class="challenge-level-list">
        <div class="challenge-tier-group" data-tier="${d.tierId}">
          <div class="challenge-tier-head">
            <span>第${d.tierId}层</span>
            <b>${d.tierName}</b>
            ${Mt(c,o)}
          </div>
          <div class="challenge-tier-list">
            ${u.map(v=>wt(v,e.starsPerLevel,f==null?void 0:f.id)).join("")}
          </div>
        </div>
      </div>
    </section>`}function Et(e){const t=e.usageStats||{},s=e.personalStats||{},a=Oe(e.statsScope);return`
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
        <span><b>访问 ${U(t.totalPv)}</b><em>今日 ${U(t.todayPv)}</em></span>
        <span><b>访客 ${U(t.totalUv)}</b><em>今日 ${U(t.todayUv)}</em></span>
        <span><b>游玩 ${U(t.totalGames)}</b><em>今日 ${U(t.todayGames)}</em></span>
      </div>
      <p class="info-stats-note">${e.usageStatsStatus||"全站统计读取中。"}</p>
    </article>
    <article class="home-modal-block info-stats-block">
      <div class="info-stats-head">
        <h3>游玩统计</h3>
        <div class="stats-scope-switch" role="group" aria-label="游玩统计范围">
          ${$e("personal",a,"玩家")}
          ${$e("global",a,"全站")}
        </div>
      </div>
      ${pt(s,t,a)}
    </article>
    <article class="home-modal-block info-recommend-block">
      <h3>其他游戏推荐</h3>
      <div class="recommend-list">
        <p><a href="https://kw66.github.io/photo-hero/" target="_blank" rel="noreferrer">图片勇者</a>：拍照或画图鉴定装备，带着自己的物品一路爬塔冒险。</p>
        <p><a href="https://kw66.github.io/PhD_Simulator/" target="_blank" rel="noreferrer">研究生模拟器 v1.0</a>：在导师、论文、实验和精神状态之间求生的校园文字模拟器。</p>
      </div>
    </article>`}const Lt={車:"车",馬:"马",炮:"炮",兵:"兵",仕:"仕",相:"相",帅:"帅",叠:"叠"};function It(e,t="red"){return t==="red"&&Lt[e]||e}function le(e,t){const s=e.owner==="black"?"black":"red",a=It(e.piece||t.piece,s),n=a==="帅"||a==="将"?"is-king-piece":"",i=Math.max(1,Math.trunc(Number(e.layer)||1)),r=Array.isArray(e.groups)&&e.groups.length?e.groups.map(c=>Math.max(1,Math.trunc(Number(c)||1))):i>1?[i]:[],o=r.length>1?"is-unmerged":"is-merged";return`<span class="rule-piece is-${s} ${n} ${e.ghost?"is-ghost":""}" aria-hidden="true">
    <span class="rule-piece-core">${a}</span>
    ${r.length?`<span class="rule-piece-badges ${o}">
      ${r.map(c=>`<i>${c}</i>`).join("")}
    </span>`:""}
  </span>`}function je(e){return Array.isArray(e.animations)?e.animations:e.animation?[e.animation]:[]}function Tt(e,t,s,a){const n=Array.isArray(t.from)?t.from:[Math.floor(s/2),Math.floor(s/2)],i=Array.isArray(t.to)?t.to:n,r=(Number(n[0])+.5)/s*100,o=(Number(n[1])+.5)/s*100,c=(Number(i[0])+.5)/s*100,d=(Number(i[1])+.5)/s*100,u=r+(c-r)*.42,f=o+(d-o)*.42,g=["move","attack","skill","combo","denied"].includes(t.kind)?t.kind:"move",v=[`--from-left:${r.toFixed(4)}%`,`--from-top:${o.toFixed(4)}%`,`--to-left:${c.toFixed(4)}%`,`--to-top:${d.toFixed(4)}%`,`--bump-left:${u.toFixed(4)}%`,`--bump-top:${f.toFixed(4)}%`,`--anim-delay:${Number(t.delay??a*180)}ms`].join(";");return`<span class="rule-anim-piece is-${g}-demo" style="${v}">
    ${le({piece:t.piece||e.piece,owner:t.owner||"red",layer:t.layer||1,groups:t.groups,ghost:t.ghost},e)}
  </span>`}function _t(e,t,s){const a=[];if(e.palace){const n=e.palace,i=Number(n.size||3),r=Number(n.x||0)/t*100,o=Number(n.y||0)/t*100,c=i/t*100;a.push(`<span class="rule-palace-frame" style="--palace-left:${r.toFixed(4)}%;--palace-top:${o.toFixed(4)}%;--palace-size:${c.toFixed(4)}%"></span>`)}if(e.river){const n=Number(e.river.y||0)/t*100;a.push(`<span class="rule-river-line" style="--river-top:${n.toFixed(4)}%"></span>`)}return je(e).forEach((n,i)=>{a.push(Tt(s,n,t,i))}),a.join("")}function Bt(e,t){const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map;(t.marks||[]).forEach(c=>{const d=`${c.x},${c.y}`,u=n.get(d)||[];u.push(c),n.set(d,u)});const i=new Map((t.pieces||[]).map(c=>[`${c.x},${c.y}`,c])),r=je(t),o=[];for(let c=0;c<s;c+=1)for(let d=0;d<s;d+=1){const u=n.get(`${d},${c}`)||[],f=i.get(`${d},${c}`),g=d===a.x&&c===a.y,v=t.showCenter!==!1&&!r.length,k=[...new Set(u.map($=>$.type).filter(Boolean))].map($=>`is-${$}`).join(" "),x=f?le(f,e):g&&v?le({piece:t.piece||e.piece,owner:t.centerOwner||"red",layer:t.centerLayer||1,groups:t.centerGroups},e):"";o.push(`<span class="rule-cell ${g?"is-center":""} ${k}">${x}</span>`)}return`<div class="rule-mini-board ${r.length?"has-animation":""}" style="--board-size:${s}" aria-hidden="true">${o.join("")}${_t(t,s,e)}</div>`}function Ct(e,t){return`
    <div class="rule-diagram">
      ${Bt(e,t)}
    </div>`}function At(e){const t=e==="kw"?Ce:Be,s=[];return t.forEach((a,n)=>{const i=a.diagrams||(a.diagram?[a.diagram]:[]),r=i.length?i:[m(a.name,[],{showCenter:!0})];r.forEach((o,c)=>{s.push({rule:a,ruleIndex:n,diagramIndex:c,diagram:o,pageInRule:c,pagesInRule:r.length})})}),s}function Nt(e,t,s){return(e==="kw"?Ce:Be).map((n,i)=>{const r=t.findIndex(d=>d.ruleIndex===i),o=r>=0?r:0,c=n.piece==="叠"?"叠层":n.name.replace(/^觉醒/,"").replace(/^通用/,"");return`
      <button type="button" data-codex-page="${o}" class="${s===i?"is-active":""}" aria-pressed="${s===i}">
        <b>${c}</b>
      </button>`}).join("")}function Gt(e,t){var c,d;const{rule:s,diagram:a,diagramIndex:n,pageInRule:i,pagesInRule:r}=e,o=((c=s.sections)==null?void 0:c[n])||((d=s.sections)==null?void 0:d[0])||{items:s.lines||[]};return`
    <article class="rule-card" aria-label="${s.name} ${r>1?`${i+1}/${r} `:""}${a.title}">
      <div class="rule-visuals diagram-count-1">${Ct(s,a)}</div>
      <div class="rule-copy">
        <section>
          <ul>
            ${(o.items||[]).map(u=>`<li>${u}</li>`).join("")}
          </ul>
        </section>
      </div>
    </article>`}function me(e){const t=e==="kw"?"kw":"classic";return`
    <div class="rules-switch rules-switch-head" role="group" aria-label="棋子图鉴分类">
      <button type="button" data-codex-mode="classic" class="${t==="classic"?"is-active":""}" aria-pressed="${t==="classic"}">传统象棋</button>
      <button type="button" data-codex-mode="kw" class="${t==="kw"?"is-active":""}" aria-pressed="${t==="kw"}">科王象棋</button>
    </div>`}function ge(e,t=0){const s=e==="kw"?"kw":"classic",a=At(s),n=Math.min(a.length-1,Math.max(0,Math.trunc(Number(t)||0))),i=a[n],r=n<=0?a.length-1:n-1,o=n>=a.length-1?0:n+1;return`
    <div class="codex-piece-tabs" role="group" aria-label="棋子选择">
      ${Nt(s,a,i.ruleIndex)}
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
        ${Gt(i)}
      </div>
    </section>`}function Ut(e){const t=te(e),s=W(t);return`
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
        ${C.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>AI回合 ${gt(a.time)}</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function se(e,t,s,a,n=""){return`
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
    </div>`}function Ot(e){return`
    ${se("author","游戏信息",Et(e),e.activeHomePanel)}
    ${se("codex","棋子图鉴",ge(e.codexMode,e.codexPage),e.activeHomePanel,me(e.codexMode))}
    ${se("settings","设置",Ut(e.settings),e.activeHomePanel)}`}function we(e){const t=Ae(e.homeMode),s=pe(),a=ct(e.starsPerLevel,s),n=lt(s),i=dt(e.starsPerLevel,s);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${ae("author","游戏信息",e.activeHomePanel)}
          ${ae("codex","棋子图鉴",e.activeHomePanel)}
          ${ae("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${bt({...e,homeMode:t})}
        ${Pt({...e},i,a,n)}
      </main>
      ${Ot(e)}
    </div>`}function jt(e){return`
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
    </div>`}function Ht(e){return`
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
    </div>`}const He={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function Se(e){return String(e).replace(/"/g,"&quot;")}function ve(e){const t=Math.max(0,Number(e)||0);return`${(t/1e3).toFixed(t%1e3===0?0:1)} 秒`}function Re(e,t,s){var n,i;if(s==="free"||e.freePlay||(n=e.config)!=null&&n.noAi)return null;if(s==="home-ai")return W(t);const a=Math.max(100,Math.trunc(Number((i=e.config)==null?void 0:i.aiTime)||500));return{id:`level-${a}`,label:ve(a),time:a}}function Rt(e,t){var a;const s=((a=e.config)==null?void 0:a.mode)??"kw";return t==="home-ai"?s==="classic"?{name:"传统对弈",desc:"经典规则人机局：车马炮兵仕相帅都按传统象棋走法行动。"}:{name:"科王对弈",desc:"完整觉醒规则人机局：用叠层、合体和范围技与 AI 对攻。"}:t==="free"?s==="classic"?{name:"传统自由对弈",desc:"经典规则本地双人局，不计入战绩。"}:{name:"科王自由对弈",desc:"完整觉醒规则本地双人局，不计入战绩。"}:{name:e.name,desc:e.desc}}function Kt(e,t){var i,r;const s=((i=e.config)==null?void 0:i.mode)??"kw";return[t==="challenge"&&((r=e.tutorial)!=null&&r.length)?e.tutorial[0].text:"",s==="classic"?"单击棋子查看落点，再点目标落子。":"单击棋子查看落点；双击叠子可拆分/合体，双击兵可自爆。"].filter(Boolean).join(" ")}function Dt(e){const t=`
    <span><i class="move-mark move-mark-safe"></i>可落子</span>
    <span><i class="move-mark move-mark-warning"></i>王受伤</span>
    <span><i class="move-mark move-mark-danger"></i>王危险</span>`;return e==="classic"?t:`${t}
    <span><i class="move-mark move-mark-stack"></i>叠子</span>
    <span><i class="move-mark move-mark-charge"></i>冲撞</span>`}function Ft(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function Vt(e,t,s){return`<button class="game-info-tab ${s?"is-active":""}" type="button" data-game-info-tab="${e}" aria-pressed="${s}">${t}</button>`}function R(e,t,s,a){return`<section class="info-section info-tab-panel panel-${e} ${a?"is-active":""}" data-info-panel="${e}" aria-label="${t}">
    <div class="info-section-title">${t}</div>
    ${s}
  </section>`}function Jt(e,t){const s=e.id===t.id;return`<button class="game-ai-strength-button ${s?"is-active":""}" type="button" data-game-ai-strength="${e.id}" aria-pressed="${s}">
    <b>${e.label.replace("难度 ","")}</b><span>${ve(e.time)}</span>
  </button>`}function Me(e,t={}){const s=W(e),a=!!t.allowToggle,n=t.label||"AI难度";return`<div class="game-ai-control-row ${a?"can-toggle-ai":"is-ai-locked"}" aria-label="${n}">
    ${a?'<button class="game-ai-toggle" type="button" data-game-ai-toggle data-ai-enabled="false">开启AI</button>':`<span class="game-ai-lock">${n}</span>`}
    <div class="game-ai-strengths" role="group" aria-label="AI 难度">
      ${C.map(i=>Jt(i,s)).join("")}
    </div>
  </div>`}function Xt(e){return`<div class="home-modal game-codex-modal" id="home-panel-codex" data-home-modal="codex" hidden>
    <section class="home-sheet" role="dialog" aria-modal="true" aria-labelledby="game-codex-title">
      <header class="home-sheet-head">
        <div>
          <h2 id="game-codex-title">棋子图鉴</h2>
        </div>
        <div id="game-codex-mode-switch">${me(e.codexMode)}</div>
        <button class="home-sheet-close" type="button" data-close-home-panel>收起</button>
      </header>
      <div class="home-sheet-body" id="game-codex-body">
        ${ge(e.codexMode,e.codexPage)}
      </div>
    </section>
  </div>`}function Ke(e){if(!(e!=null&&e.tierId))return"";const s=T.filter(a=>!a.freePlay&&Number(a.tierId)===Number(e.tierId)).findIndex(a=>Number(a.id)===Number(e.id));return`${e.tierId}-${Math.max(1,s+1)}`}function Wt(e,t,s){var r,o;const a=Yt(e),n=a.length?a.map(c=>{var d;return(d=He[c])==null?void 0:d.name}).filter(Boolean).join("、"):((r=e.config)==null?void 0:r.mode)==="classic"?"传统规则":"本关规则";return`
    <div class="challenge-play-brief">
      <div class="challenge-play-title">
        <span>${Ke(e)||"关卡"}</span>
        <b>${e.name}</b>
      </div>
      <p><b>本关规则</b><span>${n}</span></p>
      <p><b>对手</b><span>AI ${(s==null?void 0:s.label)||ve(((o=e.config)==null?void 0:o.aiTime)||4e3)}</span></p>
      <p><b>开局提示</b><span>${t||e.desc||"先观察局面，再选择棋子。"}</span></p>
    </div>`}function Yt(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop","king"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,r])=>{r&&s.add(i)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(i=>s.add(i)),[...s].filter(i=>He[i])}function Zt(e,t,s){var r,o,c;const a=new URLSearchParams;a.set("levelId",e.id);const n=Re(e,t,s);n&&(a.set("ai","1"),a.set("aiTime",String(n.time)),a.set("aiStrength",n.id));const i=((r=e.config)==null?void 0:r.mode)??"kw";if(a.set("mode",i),i==="classic"&&a.set("classic","1"),i!=="classic"){const d=((o=e.config)==null?void 0:o.playerUpgrades)||{},u=((c=e.config)==null?void 0:c.aiUpgrades)||{},f=Object.keys(d).filter(v=>d[v]).join(","),g=Object.keys(u).filter(v=>u[v]).join(",");f&&a.set("pu",f),g&&a.set("au",g)}return`./index-legacy.html?${a.toString()}`}function qt(e){var O,N,G;const t=Q(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0;t.stars.length;const a=e.currentPlaySource==="free"||!!t.freePlay,n=e.currentPlaySource==="home-ai",i=e.currentPlaySource==="challenge",r=i&&!a;t.pieces?t.pieces.map(w=>ke[w]).join(" "):t.piece&&ke[t.piece];const o=Re(t,e.settings,e.currentPlaySource),c=Zt(t,e.settings,e.currentPlaySource),d=Rt(t,e.currentPlaySource),u=(o==null?void 0:o.label)||"",f=!((O=t.config)!=null&&O.noAi)&&u,g=((N=t.config)==null?void 0:N.mode)??"kw",v={classic:"传统",mixed:"觉醒",kw:"科王"}[g]||"科王",k=g==="classic"?"classic":"kw",x=a?"双人":f?`AI ${u}`:"红方",$=["game-page",a?"is-free-play":"",n?"is-home-ai-play":"",i?"is-challenge-play":"is-casual-play"].filter(Boolean).join(" "),E=Kt(t,e.currentPlaySource),_=i?Ke(t):"",A=[{id:"hint",label:"走法"},...i?[{id:"stage",label:"关卡"}]:[],...r?[{id:"goals",label:"目标"}]:[],{id:"winrate",label:"胜率"},{id:"captures",label:"损失"},{id:"history",label:"历史"}],L=((G=A[0])==null?void 0:G.id)||"hint";return`
    <div class="${$}">
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-status-strip" aria-label="本局状态">
            <span class="game-status-chip game-mode-chip">${v}</span>
            ${i?`<span class="game-status-chip game-level-chip">${_} ${t.name}</span>`:""}
            <span class="game-status-chip" id="outer-ai-mode">${x}</span>
            <span class="game-status-chip game-live-round" id="outer-live-round">第1回合</span>
            <span class="game-status-chip game-live-turn" id="outer-live-turn">红方回合</span>
            <span class="game-status-chip game-live-message" id="outer-live-message" hidden></span>
          </div>

          <div class="game-action-bar" aria-label="对局操作">
            <button class="game-action-button" type="button" data-game-command="restart">重开</button>
            ${a?'<button class="game-action-button" type="button" data-game-command="undo">悔棋</button>':""}
            ${n||i?'<button class="game-action-button" type="button" data-game-command="draw">求和</button>':""}
            <button class="game-action-button" type="button" data-game-panel="codex" data-game-codex-mode="${k}">图鉴</button>
          </div>
        </div>
        ${a?Me(e.settings,{allowToggle:!0,label:"自由对弈 AI"}):""}
        ${n?Me(e.settings,{allowToggle:!1,label:"AI难度"}):""}
      </div>

      <div class="game-layout">
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${c}"
            title="${Se(d.name)}"
            allowfullscreen
          ></iframe>
        </div>

        <div class="game-info-panel" id="game-info-panel">
          <div class="game-info-tabs" role="group" aria-label="对局信息">
            ${A.map(w=>Vt(w.id,w.label,w.id===L)).join("")}
          </div>
          <div class="game-info-content">
            ${R("hint","走法提示",`
              <div class="hint-display ${E?"":"hint-empty"}"
                   id="hint-display"
                   data-default="${Se(E)}">${E||"选择棋子查看走法"}</div>
              <div class="move-legend" aria-label="落点颜色说明">
                ${Dt(g)}
              </div>
            `,L==="hint")}

            ${i?R("stage","关卡信息",`
              ${Wt(t,E,o)}
            `,L==="stage"):""}

            ${r?R("goals","通关目标",`
              <div class="star-goal-list" id="star-goal-list">
                ${Ft(s,t.stars)}
              </div>
              ${t.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
            `,L==="goals"):""}

            ${R("winrate","AI胜率分析",`
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
            `,L==="winrate")}

            ${R("captures","损失棋子",`
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
            `,L==="captures")}

            ${R("history","历史步骤",`
              <div class="move-log" id="outer-move-log">
                <span class="log-empty">对局尚未开始</span>
              </div>
            `,L==="history")}
          </div>
        </div>
      </div>
      ${Xt({...e,codexMode:k})}
    </div>`}function zt(e){switch(e.screen){case"menu":return we(e);case"levels":return jt();case"upgrade":return Ht();case"game":return qt(e);default:return we(e)}}const Qt={rook:"R",horse:"H",cannon:"C",pawn:"P",advisor:"A",bishop:"B",king:"K"};function De(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return new Set;if(t==="kw")return new Set(P.map(i=>i.type));const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,r])=>{const o=Qt[i];r&&o&&s.add(o)}),s}function ea(e,t){return Object.fromEntries(P.map(s=>[s.type,t.has(s.type)?Math.max(0,Math.trunc(Number(e==null?void 0:e[s.type])||0)):0]))}function ta(e,t){return Object.fromEntries(P.map(s=>{const a=(e==null?void 0:e[s.type])||{};return[s.type,t.has(s.type)?{moves:Math.max(0,Math.trunc(Number(a.moves)||0)),games:Math.max(0,Math.trunc(Number(a.games)||0))}:{moves:0,games:0}]}))}function aa(e,t,s){var a;return!(s!=null&&s.complete)||e.freePlay||(a=e.config)!=null&&a.noAi||t==="free"?!1:De(e).size>0}function sa(e,t){const s=De(e);return{...t,redKillsByType:ea(t.redKillsByType,s),redSurvivalByType:ta(t.redSurvivalByType,s)}}function na(){const e=document.getElementById("game-iframe");return e instanceof HTMLIFrameElement?e.contentWindow:null}function q(e,t={}){const s=na();s&&s.postMessage({type:"game-command",command:e,...t},"*")}function ia(e){const t=document.getElementById("game-info-panel");t&&(t.querySelectorAll("[data-game-info-tab]").forEach(s=>{const a=s.dataset.gameInfoTab===e;s.classList.toggle("is-active",a),s.setAttribute("aria-pressed",String(a))}),t.querySelectorAll("[data-info-panel]").forEach(s=>{s.classList.toggle("is-active",s.dataset.infoPanel===e)}))}function de(e,t=""){const s=t||e.codexMode,a=t&&t!==e.codexMode?0:e.codexPage,n=document.getElementById("game-codex-mode-switch"),i=document.getElementById("game-codex-body");n&&(n.innerHTML=me(s)),i&&(i.innerHTML=ge(s,a))}function z(e,t,s=""){const a=document.getElementById("home-panel-codex");a&&(e&&de(t,s),a.hidden=!e)}function oa(e){document.querySelectorAll("[data-game-ai-strength]").forEach(t=>{const s=t.dataset.gameAiStrength===e;t.classList.toggle("is-active",s),t.setAttribute("aria-pressed",String(s))})}function ra(e){const t=C.find(s=>Number(s.time)===Number(e));return t?`AI ${t.label}`:e?`AI ${Math.round(Number(e)/1e3)}秒`:"AI"}function ca(e){var i,r;const t=e.getState(),s=Q(t.currentLevel)||Q(Number(t.currentLevel)),a=((i=document.getElementById("game-iframe"))==null?void 0:i.getAttribute("src"))||"",n=a.includes("?")?new URLSearchParams(a.slice(a.indexOf("?")+1)).get("mode"):"";return((r=s==null?void 0:s.config)==null?void 0:r.mode)==="classic"||n==="classic"?"classic":"kw"}function Pe(e){const t=e.getState(),s=ca(e);return t.codexMode!==s&&e.dispatch("set-codex-mode",{mode:s}),s}function la(e){const t=tt();function s(){const a=t.getState();if(e.dataset.screen==="game"&&a.screen==="game"&&e.dataset.levelId===String(a.currentLevel??"")&&e.dataset.playSource===String(a.currentPlaySource??"")){e.dataset.screen=a.screen;return}e.dataset.screen=a.screen,e.dataset.levelId=String(a.currentLevel??""),e.dataset.playSource=String(a.currentPlaySource??""),e.innerHTML=zt(a)}t.subscribe(s),We().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{var w;const n=a.target;if(!(n instanceof HTMLElement))return;const i=t.getState(),r=n.closest("[data-game-info-tab]");if(r){ia(r.dataset.gameInfoTab||"hint");return}const o=n.closest("[data-game-panel]");if(o){if(o.dataset.gamePanel==="codex"){const y=document.getElementById("home-panel-codex"),S=!y||y.hidden,B=o.dataset.gameCodexMode==="classic"?"classic":o.dataset.gameCodexMode==="kw"?"kw":"",Y=S?B||Pe(t):"";S&&B&&t.getState().codexMode!==B&&t.dispatch("set-codex-mode",{mode:B}),z(S,t.getState(),Y)}return}const c=n.closest("[data-game-ai-toggle]");if(c){const y=W(t.getState().settings),S=c.dataset.aiEnabled!=="true";q("set-ai",{enabled:S,aiTime:y.time,aiStrength:y.id}),c.dataset.aiEnabled=String(S),c.textContent=S?"关闭AI":"开启AI";return}const d=n.closest("[data-game-ai-strength]");if(d){const y=C.find(S=>S.id===d.dataset.gameAiStrength)||C[0];t.dispatch("update-settings",{aiStrength:y.id}),oa(y.id),q("set-ai-time",{aiTime:y.time,aiStrength:y.id});return}const u=n.closest("[data-home-panel]");if(u){const y=u.dataset.homePanel;if(i.screen==="game"){const S=y==="codex"&&((w=document.getElementById("home-panel-codex"))==null?void 0:w.hidden)!==!1,B=S?Pe(t):"";z(S,t.getState(),B);return}t.dispatch("toggle-home-panel",{panel:y});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){if(i.screen==="game"){z(!1,t.getState());return}t.dispatch("close-home-panels");return}const f=n.closest("[data-codex-mode]");if(f){t.dispatch("set-codex-mode",{mode:f.dataset.codexMode}),i.screen==="game"&&de(t.getState());return}const g=n.closest("[data-codex-page]");if(g){t.dispatch("set-codex-page",{page:g.dataset.codexPage}),i.screen==="game"&&de(t.getState());return}const v=n.closest("[data-home-mode]");if(v){t.dispatch("set-home-mode",{mode:v.dataset.homeMode});return}const k=n.closest("[data-level-page]");if(k){t.dispatch("set-level-page",{page:k.dataset.levelPage});return}const x=n.closest("[data-challenge-level]");if(x){t.dispatch("set-selected-challenge-level",{levelId:x.dataset.challengeLevel});return}const $=n.closest("[data-info-stats-scope]");if($){t.dispatch("set-stats-scope",{scope:$.dataset.infoStatsScope});return}const E=n.closest("[data-setting-ai]");if(E){t.dispatch("update-settings",{aiStrength:E.dataset.settingAi});return}const _=n.closest("[data-game-command]");if(_){q(_.dataset.gameCommand);return}const A=n.closest("[data-navigate]");if(A){t.dispatch("navigate",{screen:A.dataset.navigate});return}const L=n.closest("[data-select-level]");if(L){const y=parseInt(L.dataset.selectLevel,10);isNaN(y)||t.dispatch("select-level",{levelId:y,playSource:L.dataset.playSource});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const N=n.closest("[data-action]");if(N){const y=N.dataset.action;if(y==="back-to-menu"||y==="back-to-levels"){q("abort-ai"),t.dispatch(y);return}}const G=n.closest("[data-toggle-upgrade]");if(G){t.dispatch("toggle-upgrade",{pieceType:G.dataset.toggleUpgrade});return}}),e.addEventListener("keydown",a=>{if(a.key!=="Enter"&&a.key!==" ")return;const n=a.target;if(!(n instanceof HTMLElement))return;const i=n.closest("[data-challenge-level]");i&&(a.preventDefault(),t.dispatch("set-selected-challenge-level",{levelId:i.dataset.challengeLevel}))}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const i=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${i}%`);const r=n.closest(".sound-slider-row"),o=r==null?void 0:r.querySelector("[data-setting-value]");o&&(o.textContent=`${i}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const i=n.dataset.settingToggle;if(i){t.dispatch("update-settings",{[i]:n.checked});return}const r=n.dataset.settingRange;r&&t.dispatch("update-settings",{[r]:n.value})}),window.addEventListener("keydown",a=>{if(a.key==="Escape"){if(t.getState().screen==="game"){z(!1,t.getState());return}t.dispatch("close-home-panels")}}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const i=Q(n.currentLevel);if(i){if(a.data.type==="piece-selected"){const r=document.getElementById("hint-display");if(!r)return;const o=a.data.hint;if(o)r.textContent=o,r.classList.remove("hint-empty");else{const c=r.dataset.default||"";r.textContent=c||"选择棋子查看走法",r.classList.toggle("hint-empty",!c)}return}if(a.data.type==="game-status"){const r=document.getElementById("outer-live-turn"),o=document.getElementById("outer-live-round"),c=document.getElementById("outer-live-message"),d=document.getElementById("outer-ai-mode"),u=document.querySelector("[data-game-ai-toggle]");if(r&&a.data.turnText&&(r.textContent=a.data.turnText,r.classList.toggle("is-black-turn",a.data.turn==="black"),r.classList.toggle("is-red-turn",a.data.turn==="red"),r.classList.toggle("is-draw-turn",a.data.turn==="draw")),o&&a.data.roundText&&(o.textContent=a.data.roundText),d&&a.data.aiEnabled!==void 0&&(d.textContent=a.data.aiEnabled?ra(a.data.aiTime):"双人"),u&&a.data.aiEnabled!==void 0&&(u.dataset.aiEnabled=String(!!a.data.aiEnabled),u.textContent=a.data.aiEnabled?"关闭AI":"开启AI"),c){const f=a.data.message||"";c.textContent=f,c.hidden=!f}return}if(a.data.type==="game-progress"){const r=a.data.stats||{},o=n.starsPerLevel[i.id]||0,c=document.getElementById("star-goal-list");if(c&&(c.innerHTML=i.stars.map((g,v)=>{const k=o>>v&1,x=!!(g.eval&&g.eval(r)),$=k||x;return`<div class="star-goal ${$?"star-goal-earned":""}">
            <span class="star-goal-icon">${$?"★":"☆"}</span>
            <span class="star-goal-desc">${g.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const g=a.data.redPct,v=100-g,k=document.getElementById("outer-red-pct"),x=document.getElementById("outer-blk-pct"),$=document.getElementById("outer-fill-red"),E=document.getElementById("outer-advantage");k&&(k.textContent=g+"%"),x&&(x.textContent=v+"%"),$&&($.style.width=g+"%"),E&&a.data.advantage&&(E.textContent=a.data.advantage)}const d=document.getElementById("outer-cap-red"),u=document.getElementById("outer-cap-black");d&&a.data.capturedRed!==void 0&&(d.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(g=>`<span class="cap-item red">${g}</span>`).join(""):'<span class="cap-empty">—</span>'),u&&a.data.capturedBlack!==void 0&&(u.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(g=>`<span class="cap-item blk">${g}</span>`).join(""):'<span class="cap-empty">—</span>');const f=document.getElementById("outer-move-log");f&&a.data.moves!==void 0&&(a.data.moves.length===0?f.innerHTML='<span class="log-empty">对局尚未开始</span>':(f.innerHTML=a.data.moves.map(g=>`<div class="log-entry ${g.side==="red"?"log-red":"log-blk"}">${g.text}</div>`).join(""),f.scrollTop=f.scrollHeight));return}if(a.data.type==="game-end"){const r=a.data.stats||{};let o=0;if(i.stars.forEach((c,d)=>{c.eval&&c.eval(r)&&(o|=1<<d)}),i.freePlay||t.dispatch("game-result",{newStarBits:o,win:!!r.win}),aa(i,n.currentPlaySource,r)){const c=sa(i,r);t.dispatch("record-personal-stats",{stats:c}),Ye(c).then(({stats:d,status:u})=>{t.dispatch("usage-stats-updated",{stats:d,status:u})}).catch(d=>{console.warn("全站游玩统计失败:",d),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}}),s()}const Fe=document.querySelector("#app");if(!Fe)throw new Error("#app container not found");la(Fe);
