(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const E={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},ae="https://ypefmpeekfucmarbbdov.supabase.co",H="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",h={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day"};function $(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function se(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0}}function ne(e){const t=e&&typeof e=="object"?e:{};return{totalPv:$(t.totalPv),totalUv:$(t.totalUv),totalGames:$(t.totalGames),todayPv:$(t.todayPv),todayUv:$(t.todayUv),todayGames:$(t.todayGames)}}async function ie(){const e=X();return e&&await ce(),{stats:await N(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function oe(){if(!X())return{stats:await N(),status:"本地预览不会写入全站统计。"};const e=I();return await Promise.all([S(h.totalGames),S(P(h.dailyGamesPrefix,e))]),{stats:await N(),status:"游玩局数已同步。"}}async function ce(){const e=I();await Promise.all([S(h.totalPv),S(P(h.dailyPvPrefix,e))]);const t=localStorage.getItem(E.statsVisitor)==="true",s=localStorage.getItem(E.statsLastUvDate),a=[];t||(a.push(S(h.totalUv)),localStorage.setItem(E.statsVisitor,"true")),s!==e&&(a.push(S(P(h.dailyUvPrefix,e))),localStorage.setItem(E.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function N(){const e=I(),t=P(h.dailyPvPrefix,e),s=P(h.dailyUvPrefix,e),a=P(h.dailyGamesPrefix,e),i=await le([h.totalPv,h.totalUv,h.totalGames,t,s,a]);return ne({totalPv:i[h.totalPv],totalUv:i[h.totalUv],totalGames:i[h.totalGames],todayPv:i[t],todayUv:i[s],todayGames:i[a]})}async function S(e){return F("increment_counter",{counter_id:e})}async function le(e){const t=await F("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=$(a.count));return s}async function F(e,t){const s=await fetch(`${ae}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:H,Authorization:`Bearer ${H}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function X(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function P(e,t=I()){return`${e}_${t.replaceAll("-","")}`}function I(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const x={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"normal"},L=[{id:"entry",label:"入门",time:300,note:"快速落子，适合熟悉规则。"},{id:"easy",label:"初级",time:700,note:"会看吃子与基础防守。"},{id:"normal",label:"中级",time:1300,note:"兼顾布局、叠层和攻防。"},{id:"hard",label:"高级",time:2400,note:"搜索更久，压迫感更强。"}];function j(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function T(e){const t=e&&typeof e=="object"?e:{},s=L.some(a=>a.id===t.aiStrength)?t.aiStrength:x.aiStrength;return{sfxEnabled:t.sfxEnabled??x.sfxEnabled,sfxVolume:j(t.sfxVolume,x.sfxVolume),bgmEnabled:t.bgmEnabled??x.bgmEnabled,bgmVolume:j(t.bgmVolume,x.bgmVolume),aiStrength:s}}function B(e){const t=T(e);return L.find(s=>s.id===t.aiStrength)||L.find(s=>s.id===x.aiStrength)||L[0]}const z="kw-chess-save";function re(){try{const e=localStorage.getItem(z);return e?JSON.parse(e):null}catch{return null}}function M(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(z,JSON.stringify(t))}catch{}}function de(){const e=re();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,usageStats:se(),usageStatsStatus:"全站统计读取中。",settings:T(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"kw",codexPage:0,homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,currentLevel:null}}function me(){let e=de();const t=new Set;function s(){return e}function a(l){const d=typeof l=="function"?l(e):l;e={...e,...d},t.forEach(r=>r(e))}function i(l){return t.add(l),()=>t.delete(l)}function o(l,d={}){switch(l){case"navigate":a({screen:d.screen});break;case"usage-stats-updated":a({usageStats:d.stats??e.usageStats,usageStatsStatus:d.status??e.usageStatsStatus});break;case"toggle-home-panel":{const r=d.panel||null;a({activeHomePanel:e.activeHomePanel===r?null:r});break}case"open-home-panel":a({activeHomePanel:d.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:d.mode==="kw"?"kw":"classic",codexPage:0});break;case"set-codex-page":a({codexPage:Math.max(0,Math.trunc(Number(d.page)||0))});break;case"set-home-mode":{const r=d.mode==="classic"?"classic":"kw";a({homeMode:r}),M({...e,homeMode:r});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(d.page)||0))});break;case"update-settings":{const r=T({...e.settings,...d});a({settings:r}),M({...e,settings:r});break}case"select-level":a({screen:"game",currentLevel:d.levelId});break;case"back-to-menu":a({screen:"menu",currentLevel:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:r}=d,m={...e.pieceUpgrades};m[r]?delete m[r]:m[r]=!0,a({pieceUpgrades:m}),M({...e,pieceUpgrades:m});break}case"game-result":{const{newStarBits:r,win:m}=d,g=e.currentLevel,u={...e.starsPerLevel};u[g]=(u[g]||0)|(r||0);const p={starsPerLevel:u,totalWins:e.totalWins+(m?1:0),totalGames:e.totalGames+1};a(p),M({...e,...p});break}default:console.warn(`[Store] 未知 action: ${l}`)}}return{getState:s,setState:a,subscribe:i,dispatch:o}}const U={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},pe=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，借己方棋子连续跳跃，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，可借己方棋子连续跳跃，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮可以翻过连续炮架，远袭炮架后的敌方棋子。"}]},{id:5,name:"自爆",desc:"四向一步，叠层自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可上下左右一步移动，同类会自动合体，还能自爆清场。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],y=pe.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function W(e){return y.find(t=>t.id===e)||null}const Y=y.filter(e=>!e.freePlay).length,Z={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"全员觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},C=3;function n(e,t,s=""){return e.map(([a,i,o])=>({x:a,y:i,type:t,label:o??s}))}function c(e,t,s={}){return{title:e,marks:t,...s}}c("直线可走",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("挡子与吃子",[...n([[1,2]],"move"),...n([[0,2,"吃"]],"attack"),...n([[3,2,"挡"]],"block"),...n([[4,2,"禁"]],"blocked")]),c("日字落点",[...n([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")]),c("蹩马腿",[...n([[2,1,"腿"]],"block"),...n([[1,0,"禁"],[3,0,"禁"]],"blocked"),...n([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")]),c("空线移动",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("隔架吃子",[...n([[1,2,"架"]],"block"),...n([[3,2,"吃"]],"attack"),...n([[2,2]],"path")],{center:{x:0,y:2}}),c("未过河",[...n([[2,2,"进"]],"move"),...n([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3}}),c("过河后",[...n([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...n([[2,3,"禁"]],"blocked")]),c("九宫斜走",[...n([[1,1],[3,1],[1,3],[3,3]],"move"),...n([[0,0,"宫"],[4,0,"宫"],[0,4,"宫"],[4,4,"宫"]],"palace")]),c("田字落点",[...n([[0,0],[4,0],[0,4],[4,4]],"move")]),c("塞象眼",[...n([[1,1,"眼"]],"block"),...n([[0,0,"禁"]],"blocked"),...n([[4,0],[0,4],[4,4]],"move")]),c("九宫一步",[...n([[2,1],[1,2],[3,2],[2,3]],"move"),...n([[1,1,"宫"],[3,1,"宫"],[1,3,"宫"],[3,3,"宫"]],"palace")]),c("照面禁线",[...n([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4}});c("直线移动",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("冲撞运输",[...n([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...n([[2,2,"友"]],"ally")],{center:{x:0,y:2}}),c("车车合体",[...n([[1,2,"車"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}}),c("十二方落点",[...n([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")]),c("借友连跳",[...n([[2,2,"友"],[4,2,"续"]],"skill"),...n([[4,4,"吃"]],"attack"),...n([[2,0,"空"]],"move")],{center:{x:0,y:2}}),c("马马合体",[...n([[1,2,"馬"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}}),c("直线移动",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("连续炮架",[...n([[1,2,"架"],[2,2,"架"]],"block"),...n([[3,2,"落"]],"move"),...n([[4,2,"吃"]],"attack")],{center:{x:0,y:2}}),c("炮炮合体",[...n([[1,2,"炮"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}}),c("四向可走",[...n([[2,1],[1,2],[3,2],[2,3]],"move")]),c("自爆范围",[...n([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")]),c("兵兵自动合体",[...n([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2}}),c("出宫斜走",[...n([[1,1],[3,1],[1,3],[3,3]],"move"),...n([[0,0,"宫外"],[4,4,"宫外"]],"path")]),c("X 形伤害",[...n([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")]),c("仕仕合体",[...n([[1,2,"仕"],[2,2,"叠"],[3,2,"合"],[4,2,"强"]],"combo")],{center:{x:0,y:2}}),c("斜跳两格",[...n([[0,0],[4,0],[0,4],[4,4]],"move"),...n([[1,1,"无眼"],[3,1,"无眼"]],"path")]),c("十字伤害",[...n([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")]),c("相相合体",[...n([[1,2,"相"],[2,2,"叠"],[3,2,"合"],[4,2,"强"]],"combo")],{center:{x:0,y:2}}),c("九宫八向",[...n([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")]),c("吃子成长",[...n([[2,1,"吃"]],"attack"),...n([[2,0,"+1"]],"combo")]),c("车送出宫",[...n([[2,4,"車"]],"ally"),...n([[2,3,"撞"],[2,1,"出"]],"skill")]);const ue=[{piece:"車",name:"车",title:"横竖直线走，遇到棋子就停",diagrams:[c("空线可走",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("挡子与吃子",[...n([[1,2]],"move"),...n([[0,2,"吃"]],"attack"),...n([[3,2,"挡"]],"block"),...n([[4,2,"不可"]],"blocked")])],sections:[{title:"怎么走",items:["车只走横线或竖线，一次可以走任意格数。","绿色格表示中间没有棋子挡住，所以都可以直接到达。"]},{title:"怎么吃",items:["同一条直线上遇到第一枚敌方棋子时，可以走到敌方棋子所在格并吃掉它。","遇到任何棋子都会停住，不能越过它去吃后面的棋子。"]}]},{piece:"馬",name:"马",title:"走“日”字，马腿被占会被蹩",diagrams:[c("日字落点",[...n([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")]),c("蹩马腿",[...n([[2,1,"腿"]],"block"),...n([[1,0,"禁"],[3,0,"禁"]],"blocked"),...n([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")])],sections:[{title:"怎么走",items:["马走“日”字：先横或竖一格，再斜一格，最终落在绿色位置。","马不是直线棋子，可以越过大多数棋子，但有一个关键例外。"]},{title:"蹩马腿",items:["如果马正前、正后、正左、正右的“马腿格”被任何棋子占住，那个方向的两个日字落点都不能走。","图中灰色“腿”被占住，所以上方两个“禁”格不能去。"]}]},{piece:"炮",name:"炮",title:"移动像车，吃子必须隔一个炮架",diagrams:[c("不吃子移动",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("隔架吃子",[...n([[1,2,"架"]],"block"),...n([[3,2,"吃"]],"attack"),...n([[2,2]],"path")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["炮不吃子时和车一样，沿横线或竖线移动，不能越过棋子。"]},{title:"怎么吃",items:["炮吃子时必须隔着正好一个棋子，这个被隔着的棋子叫炮架。","炮架可以是双方任意棋子；炮架后遇到的第一枚敌棋才是可吃目标。"]}]},{piece:"兵",name:"兵",title:"未过河只前进，过河后可左右",diagrams:[c("未过河",[...n([[2,2,"进"]],"move"),...n([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3}}),c("过河后",[...n([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...n([[2,3,"禁"]],"blocked")])],sections:[{title:"怎么走",items:["兵每次只走一格。红方朝上前进，黑方朝下前进。","没有过河前只能向前走，不能左右走，也不能后退。"]},{title:"过河以后",items:["过河后可以向前、向左、向右走一格。","兵永远不能后退。"]}]},{piece:"仕",name:"仕",title:"只在九宫内斜走一格",diagrams:[c("九宫斜走",[...n([[1,1],[3,1],[1,3],[3,3]],"move"),...n([[0,0,"宫"],[4,0,"宫"],[0,4,"宫"],[4,4,"宫"]],"palace")])],sections:[{title:"活动范围",items:["仕只能留在己方九宫内，不能出宫。","九宫就是帅周围的 3×3 区域。"]},{title:"怎么走",items:["仕每次只能斜走一格，不能横走、竖走，也不能跳。"]}]},{piece:"相",name:"相",title:"走田字，两格斜跳，象眼会挡",diagrams:[c("田字落点",[...n([[0,0],[4,0],[0,4],[4,4]],"move")]),c("塞象眼",[...n([[1,1,"眼"]],"block"),...n([[0,0,"禁"]],"blocked"),...n([[4,0],[0,4],[4,4]],"move")])],sections:[{title:"怎么走",items:["相沿对角线一次跳两格，也就是走“田”字。","相不能过河，只能在己方半边活动。"]},{title:"塞象眼",items:["如果对角线中间那一格被任何棋子占住，对应方向就不能跳。","图中“眼”被占住，所以左上角的“禁”格不能走。"]}]},{piece:"帅",name:"帅",title:"九宫内一步，将帅不能照面",diagrams:[c("九宫一步",[...n([[2,1],[1,2],[3,2],[2,3]],"move"),...n([[1,1,"宫"],[3,1,"宫"],[1,3,"宫"],[3,3,"宫"]],"palace")]),c("照面禁线",[...n([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4}})],sections:[{title:"怎么走",items:["帅只能在九宫内横走或竖走一格。","帅不能主动走出九宫。"]},{title:"将帅照面",items:["双方帅/将如果在同一列，中间没有任何棋子挡住，就是违规局面。","走棋时要避免让两位主帅直接面对面。"]}]}],ge=[{piece:"叠",name:"通用叠层",title:"先看这页：叠层、合体、叠层吃子",diagrams:[c("同类叠层",[...n([[1,2,"車"],[2,2,"叠"],[3,2,"2层"]],"combo")],{center:{x:0,y:2},piece:"車"}),c("层数吃子",[...n([[3,2,"敌1"],[4,2,"胜"]],"attack"),...n([[1,2,"2层"]],"combo")],{center:{x:1,y:2},piece:"車"}),c("层数不足",[...n([[2,2,"敌3"]],"attack"),...n([[3,2,"剩2"]],"block"),...n([[1,2,"败"]],"blocked")],{center:{x:0,y:2},piece:"兵"})],sections:[{title:"怎么叠",items:["同阵营、同种类的觉醒棋子可以走到一起形成叠层；帅/王不能叠层。","兵最多叠到 5 层，并且叠上去后会自动合体；其他棋子叠上去后先保持为多个小组。"]},{title:"怎么操作",items:["单击叠子会默认带最上面一组行动，剩下的小组留在原格。","双击叠子会打开选择环：多个小组可以选“合”，合体后可以整组行动；合体棋子也可以双击拆出部分层数行动。"]},{title:"怎么吃叠子",items:["吃子只看本次出击的层数和目标总层数。出击层数大于或等于目标层数，就能消灭目标并保留自己的层数。","如果出击层数小于目标层数，进攻方会消失，目标只扣掉对应层数。图中 1 层兵打 3 层敌子会失败，敌子剩 2 层。"]}]},{piece:"車",name:"觉醒车",title:"直线移动，冲撞运输",diagrams:[c("直线移动",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("冲撞运输",[...n([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...n([[2,2,"友"]],"ally")],{center:{x:0,y:2}}),c("车车合体",[...n([[1,2,"車"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["觉醒车仍然按车的方式横竖直线移动，不能越过普通阻挡。","遇到敌子时可以按层数规则吃子。"]},{title:"冲撞",items:["如果同一条直线上先有空格、再遇到己方异类棋子，车可以冲到它前一格并把它沿同方向推出。","被推出的棋子遇到己方同类会叠层，遇到敌方会按层数结算；如果把帅推出九宫，就会触发帅的宫外规则。"]},{title:"叠层表现",items:["车车叠层后可合体，合体车能用更高层数吃子或冲撞。","如果被冲撞的是未合体叠子，只推出最底部的小组；合体后才会整体被推出。"]}]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[c("十二方落点",[...n([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")]),c("借友连跳",[...n([[2,2,"友"],[4,2,"续"]],"skill"),...n([[4,4,"吃"]],"attack"),...n([[2,0,"空"]],"move")],{center:{x:0,y:2}}),c("马马合体",[...n([[1,2,"馬"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["觉醒马可以跳传统“日”字的 8 个点，也可以直线跳 2 格，总共 12 个方向。","觉醒马没有蹩马腿限制，旁边有棋子也不会挡住它。"]},{title:"连踩",items:["跳到己方棋子上时可以继续从那里再跳；己方异类只是踏点，不会停在上面。","跳到己方马的位置时，可以选择叠层，也可以把它当踏点继续跳。跳到敌方棋子时结束并按层数吃子。"]},{title:"叠层表现",items:["马马合体后，本次出击层数更高，连踩到敌方叠子时更容易吃赢。","未合体时通常只有最上面的小组行动，合体后可以整组跳，也可以拆分部分层数行动。"]}]},{piece:"炮",name:"觉醒炮",title:"直线移动，翻过连续炮架",diagrams:[c("直线移动",[...n([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),c("连续炮架",[...n([[1,2,"架"],[2,2,"架"]],"block"),...n([[3,2,"落"]],"move"),...n([[4,2,"吃"]],"attack")],{center:{x:0,y:2}}),c("炮炮合体",[...n([[1,2,"炮"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["不吃子时，觉醒炮可以像车一样沿横线或竖线走。","遇到连续棋子段时，炮可以翻过这段炮架，落到后面的空格。"]},{title:"怎么吃",items:["炮架可以是一段连续棋子；越过炮架后遇到的第一枚敌棋可以被攻击。","如果炮架后遇到的是己方炮，也可以叠层。"]},{title:"叠层表现",items:["炮炮合体后按更高层数远袭，打叠层敌子更强。","未合体炮叠子先是多个小组，双击合体后才会整组行动。"]}]},{piece:"兵",name:"觉醒兵",title:"四向一步，叠层自动合体，自爆连锁",diagrams:[c("四向可走",[...n([[2,1],[1,2],[3,2],[2,3]],"move")]),c("自爆范围",[...n([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")]),c("兵兵自动合体",[...n([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["觉醒兵每次可以向上、下、左、右走一格，不再受过河限制。","遇到敌子时按层数规则吃子。"]},{title:"自爆",items:["双击兵可以选择“爆”。自爆后兵自己消失，并攻击周围范围。","自爆半径等于兵的总层数；对非兵棋子每次造成 1 层伤害，双方棋子都会被波及。被炸到的兵会继续连锁自爆。"]},{title:"叠层表现",items:["兵叠到同类兵上会自动合体，最多 5 层。","层数越高，自爆范围越大，因此叠兵是推进和爆破的核心。"]}]},{piece:"仕",name:"觉醒仕",title:"斜走出宫，落地释放 X 形光波",diagrams:[c("出宫斜走",[...n([[1,1],[3,1],[1,3],[3,3]],"move"),...n([[0,0,"宫外"],[4,4,"宫外"]],"path")]),c("X 形伤害",[...n([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")]),c("仕仕合体",[...n([[1,2,"仕"],[2,2,"叠"],[3,2,"强"]],"combo")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["觉醒仕每次斜走一格，可以出宫，也可以过河。","叠到己方仕时只是叠层，不会触发光波。"]},{title:"光波",items:["仕移动或吃子落地后，会向四条斜线释放 X 形光波。","光波的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["仕仕合体后，顶组层数变高，光波打得更远、伤害更高。","合体后也可以拆出部分层数行动，用小光波试探。"]}]},{piece:"相",name:"觉醒相",title:"无象眼越河，落地释放十字地震",diagrams:[c("斜跳两格",[...n([[0,0],[4,0],[0,4],[4,4]],"move"),...n([[1,1,"无眼"],[3,1,"无眼"]],"path")]),c("十字伤害",[...n([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")]),c("相相合体",[...n([[1,2,"相"],[2,2,"叠"],[3,2,"强"]],"combo")],{center:{x:0,y:2}})],sections:[{title:"怎么走",items:["觉醒相仍然斜跳两格，但不再检查象眼，也可以过河。","叠到己方相时只是叠层，不会触发地震。"]},{title:"地震",items:["相移动或吃子落地后，会向上下左右释放十字地震。","地震的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["相相合体后，十字地震范围和伤害都会提升。","合体相适合站到中路，用十字线压制大片区域。"]}]},{piece:"帅",name:"觉醒帅",title:"九宫八向，吃子成长，可被车送出宫",diagrams:[c("九宫八向",[...n([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")]),c("吃子成长",[...n([[2,1,"吃"]],"attack"),...n([[2,0,"+1"]],"combo")]),c("车送出宫",[...n([[2,4,"車"]],"ally"),...n([[2,3,"撞"],[2,1,"出"]],"skill")])],sections:[{title:"怎么走",items:["觉醒帅在九宫内可以向八个方向走一格，但不能自己主动走出九宫。","如果已经被车冲撞送出宫，宫外帅只能上下左右走一格。"]},{title:"成长",items:["帅成功吃掉敌方棋子并站到目标格后，会增加 1 层。","帅不能叠层，成长是帅提升层数的主要方式。"]},{title:"车送出宫",items:["觉醒车可以冲撞己方帅，把帅推出九宫。","被车送出去的帅可以亲自参战，但也会暴露在更危险的位置。"]}]}];function ve(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function q(e){return e==="classic"?"classic":"kw"}function R(e,t=y){return t.reduce((s,a)=>s+ve(e[a.id]||0),0)}function V(e=y){return e.reduce((t,s)=>t+s.stars.length,0)}function K(e,t=y){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function he(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function fe(e,t){const s=y.find(o=>o.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=y.find(o=>o.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function be(e,t,s="md"){return`<div class="stars stars-${s}">
    ${t.map((a,i)=>`
      <span class="star ${e>>i&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>i&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function w(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function A(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function D(e,t){const s=Z[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>
  </button>`}function ye(e){const t=q(e.homeMode),s=Z[t],a=y.find(l=>l.id===s.aiLevelId),i=y.find(l=>l.id===s.freeLevelId),o=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-mode-switch" role="group" aria-label="规则模式">
        ${D("classic",t)}
        ${D("kw",t)}
      </div>
      <div class="home-mode-card" data-mode="${t}">
        <div class="home-command-seal">${s.emblem}</div>
        <div class="home-mode-copy">
          <span>${t==="classic"?"经典规则":"完整规则"}</span>
          <h2>${s.title}</h2>
          <p>${s.desc}</p>
        </div>
        <div class="home-record-strip" aria-label="战绩">
          <div><b>${e.totalWins||0}</b><span>胜场</span></div>
          <div><b>${e.totalGames||0}</b><span>总场次</span></div>
          <div><b>${o}</b><span>胜率</span></div>
        </div>
      </div>
      <div class="home-action-row">
        ${a?`
        <button class="home-action-primary" data-select-level="${a.id}">
          <span>人机</span><b>人机对弈</b>
        </button>`:""}
        ${i?`
        <button class="home-action-secondary" data-select-level="${i.id}">
          <span>双人</span><b>自由对弈</b>
        </button>`:""}
      </div>
    </section>`}function Q(){return y.filter(e=>!e.freePlay)}function ke(e,t){return`<div class="challenge-goals">
    ${e.stars.map((s,a)=>`
      <span class="${t>>a&1?"is-earned":""}">${s.desc}</span>
    `).join("")}
  </div>`}function $e(e,t,s){var m,g,u;const a=t[e.id]||0,i=fe(e.id,t),o=he(e,t),l=e.pieces?e.pieces.map(p=>U[p]):e.piece?[U[e.piece]]:[],d={classic:"传统规则",mixed:"觉醒练习",kw:"科王规则"}[((m=e.config)==null?void 0:m.mode)??"kw"]||"科王规则",r=(g=e.config)!=null&&g.noAi?"双人":`AI ${B(s).label}`;return`
    <button class="challenge-level-card ${o?"is-completed":""} ${i?"":"is-locked"}"
            ${i?`data-select-level="${e.id}"`:"disabled"}
            data-mode="${((u=e.config)==null?void 0:u.mode)??"kw"}">
      <div class="challenge-card-top">
        <span class="challenge-index">${i?e.id:"锁"}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${e.tierName} · ${d} · ${r}</em>
        </div>
        ${l.length?`<div class="challenge-piece-list">${l.map(p=>`<span>${p}</span>`).join("")}</div>`:""}
      </div>
      <p>${e.desc}</p>
      ${ke(e,a)}
      <div class="challenge-card-foot">
        ${be(a,e.stars,"sm")}
        <span>${o?"已通关":i?"可挑战":"先通前关"}</span>
      </div>
    </button>`}function we(e,t,s,a){const i=Q(),o=Math.max(1,Math.ceil(i.length/C)),l=Math.min(Math.max(0,e.levelPage||0),o-1),d=i.slice(l*C,(l+1)*C);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <div>
          <h2>关卡模式</h2>
          <p>全部关卡</p>
        </div>
        <div class="challenge-summary">
          <span><b>${t}/${i.length||Y}</b>通关</span>
          <span><b>${s}/${a}</b>总星</span>
        </div>
      </header>
      <div class="challenge-level-list">
        ${d.map(r=>$e(r,e.starsPerLevel,e.settings)).join("")}
      </div>
      <div class="challenge-pager" aria-label="关卡翻页">
        <button type="button" data-level-page="${l-1}" ${l<=0?"disabled":""}>‹</button>
        <span>${l+1} / ${o}</span>
        <button type="button" data-level-page="${l+1}" ${l>=o-1?"disabled":""}>›</button>
      </div>
    </section>`}function xe(e,t,s,a){const i=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%",o=e.usageStats||{};return`
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
      <h3>游玩统计</h3>
      <div class="info-stats-group">
        <h4>个人进度</h4>
        <div class="modal-stat-grid">
          <div><b>${a}/${Y}</b><span>通关</span></div>
          <div><b>${t}/${s}</b><span>星星</span></div>
          <div><b>${e.totalGames||0}</b><span>对局</span></div>
          <div><b>${i}</b><span>胜率</span></div>
        </div>
      </div>
      <div class="info-stats-group">
        <h4>全站热度</h4>
        <div class="modal-stat-grid usage-stat-grid" aria-live="polite">
          <div><b>${w(o.totalPv)}</b><span>访问</span><em>今日 ${w(o.todayPv)}</em></div>
          <div><b>${w(o.totalUv)}</b><span>访客</span><em>今日 ${w(o.todayUv)}</em></div>
          <div><b>${w(o.totalGames)}</b><span>游玩局数</span><em>今日 ${w(o.todayGames)}</em></div>
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
    </article>`}function Se(e,t){const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},i=new Map((t.marks||[]).map(l=>[`${l.x},${l.y}`,l])),o=[];for(let l=0;l<s;l+=1)for(let d=0;d<s;d+=1){const r=i.get(`${d},${l}`),m=d===a.x&&l===a.y,g=r!=null&&r.type?`is-${r.type}`:"",u=m?`<b>${t.piece||e.piece}</b>`:(r==null?void 0:r.label)||"";o.push(`<span class="rule-cell ${m?"is-center":""} ${g}">${u}</span>`)}return`<div class="rule-mini-board" style="--board-size:${s}" aria-hidden="true">${o.join("")}</div>`}function Pe(e,t){return`
    <div class="rule-diagram">
      ${Se(e,t)}
      <span>${t.title}</span>
    </div>`}function _e(e){const t=e.diagrams||(e.diagram?[e.diagram]:[]),s=`diagram-count-${Math.min(t.length,3)}`,a=e.sections||[{title:"规则要点",items:e.lines||[]}];return`
    <article class="rule-card">
      <div class="rule-head">
        <span>${e.piece}</span>
        <div>
          <strong>${e.name}</strong>
          <em>${e.title}</em>
        </div>
      </div>
      <div class="rule-visuals ${s}">${t.map(i=>Pe(e,i)).join("")}</div>
      <div class="rule-copy">
        ${a.map(i=>`
          <section>
            <h4>${i.title}</h4>
            <ul>
              ${i.items.map(o=>`<li>${o}</li>`).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
    </article>`}function Le(e,t=0){const s=e==="kw"?"kw":"classic",a=s==="kw"?ge:ue,i=Math.min(a.length-1,Math.max(0,Math.trunc(Number(t)||0))),o=a[i],l=i<=0?a.length-1:i-1,d=i>=a.length-1?0:i+1;return`
    <div class="rules-switch" role="group" aria-label="棋子图鉴分类">
      <button type="button" data-codex-mode="classic" class="${s==="classic"?"is-active":""}" aria-pressed="${s==="classic"}">传统象棋</button>
      <button type="button" data-codex-mode="kw" class="${s==="kw"?"is-active":""}" aria-pressed="${s==="kw"}">科王象棋</button>
    </div>
    <div class="rules-legend" aria-label="图例">
      <span class="legend-move">绿=可走</span>
      <span class="legend-attack">红=吃子/伤害</span>
      <span class="legend-skill">蓝=技能路径</span>
      <span class="legend-combo">紫=叠层/合体</span>
    </div>
    <div class="rules-pager" aria-label="图鉴翻页">
      <button type="button" data-codex-page="${l}" aria-label="上一页">‹</button>
      <div>
        <b>${i+1} / ${a.length}</b>
        <span>${o.name}</span>
      </div>
      <button type="button" data-codex-page="${d}" aria-label="下一页">›</button>
    </div>
    <section class="rules-panel" aria-label="${s==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid is-paged">
        ${_e(o)}
      </div>
    </section>`}function Ee(e){const t=T(e),s=B(t);return`
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
      <h3>AI 强度</h3>
      <div class="ai-choice-grid" role="group" aria-label="AI 强度">
        ${L.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>${(a.time/1e3).toFixed(a.time%1e3===0?0:1)} 秒</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function G(e,t,s,a){return`
    <div class="home-modal" id="home-panel-${e}" data-home-modal="${e}"${a===e?"":" hidden"}>
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
    </div>`}function Me(e,t,s,a){return`
    ${G("author","游戏信息",xe(e,t,s,a),e.activeHomePanel)}
    ${G("codex","棋子图鉴",Le(e.codexMode,e.codexPage),e.activeHomePanel)}
    ${G("settings","设置",Ee(e.settings),e.activeHomePanel)}`}function J(e){const t=q(e.homeMode),s=Q(),a=R(e.starsPerLevel,s),i=V(s),o=K(e.starsPerLevel,s),l=R(e.starsPerLevel),d=V(),r=K(e.starsPerLevel);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${A("author","游戏信息",e.activeHomePanel)}
          ${A("codex","棋子图鉴",e.activeHomePanel)}
          ${A("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${ye({...e,homeMode:t})}
        ${we({...e},o,a,i)}
      </main>
      ${Me(e,l,d,r)}
    </div>`}function Ue(e){return`
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
    </div>`}function Ie(e){return`
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
    </div>`}const ee={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function Te(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Be(e){return String(e).replace(/"/g,"&quot;")}function Ce(e,t){return t.map((s,a)=>{const i=e>>a&1;return`<div class="star-goal ${i?"star-goal-earned":""}">
      <span class="star-goal-icon">${i?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function Ae(e){var a,i;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((i=e.config)==null?void 0:i.playerUpgrades)||{}).forEach(([o,l])=>{l&&s.add(o)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(o=>s.add(o)),[...s].filter(o=>ee[o])}function Ge(e){const t=Ae(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=ee[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function Ne(e,t){var i,o,l,d;const s=new URLSearchParams;if(s.set("levelId",e.id),!((i=e.config)!=null&&i.noAi)){const r=B(t);s.set("ai","1"),s.set("aiTime",String(r.time)),s.set("aiStrength",r.id)}const a=((o=e.config)==null?void 0:o.mode)??"kw";if(s.set("mode",a),a==="classic"&&s.set("classic","1"),a!=="classic"){const r=((l=e.config)==null?void 0:l.playerUpgrades)||{},m=((d=e.config)==null?void 0:d.aiUpgrades)||{},g=Object.keys(r).filter(p=>r[p]).join(","),u=Object.keys(m).filter(p=>m[p]).join(",");g&&s.set("pu",g),u&&s.set("au",u)}return`./index-legacy.html?${s.toString()}`}function Oe(e){var f,b,v;const t=W(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=Te(s),i=t.stars.length,o=t.pieces?t.pieces.map(_=>U[_]).join(" "):t.piece?U[t.piece]:"",l=B(e.settings),d=Ne(t,e.settings),r=l.label,m=!((f=t.config)!=null&&f.noAi)&&r,g={classic:"传统",mixed:"觉醒",kw:"科王"}[((b=t.config)==null?void 0:b.mode)??"kw"]||"科王",u=t.freePlay?"双人":"红方",p=t.freePlay?'<span class="game-header-badge">自由对弈</span>':m?`<span class="game-header-badge game-header-ai">AI · ${r}</span>`:'<span class="game-header-badge">双人对局</span>',k=(v=t.tutorial)!=null&&v.length?t.tutorial[0].text:"";return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-header-title">
            ${o?`<span class="game-header-piece">${o}</span>`:""}
            <div class="game-header-text">
              <span class="game-header-name">${t.name}</span>
              <span class="game-header-desc">${t.desc}</span>
            </div>
            ${p}
          </div>
          <div class="game-header-stars">
            ${t.stars.map((_,O)=>`<span class="star ${s>>O&1?"star-earned":"star-empty"}">${s>>O&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${i}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${g}</span>
          <span class="game-status-chip">${m?`AI ${r}`:u}</span>
          <span class="game-status-chip">目标 ${a}/${i}</span>
          <span class="game-status-chip">${t.freePlay?"练习局":"闯关局"}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${d}"
            title="科王象棋对局"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${k?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${Be(k)}">${k||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${Ge(t)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${Ce(s,t.stars)}
            </div>
            ${t.starsIndependent?'<div class="info-note">可分多局累积获取</div>':""}
          </div>

          <!-- 3. 胜率（仅有 AI 时显示） -->
          ${m?`
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
    </div>`}function He(e){switch(e.screen){case"menu":return J(e);case"levels":return Ue();case"upgrade":return Ie();case"game":return Oe(e);default:return J(e)}}function je(e){const t=me();function s(){const a=t.getState();e.dataset.screen=a.screen,e.innerHTML=He(a)}t.subscribe(s),ie().then(({stats:a,status:i})=>{t.dispatch("usage-stats-updated",{stats:a,status:i})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{const i=a.target;if(!(i instanceof HTMLElement))return;const o=i.closest("[data-home-panel]");if(o){const v=o.dataset.homePanel;t.dispatch("toggle-home-panel",{panel:v});return}if(i.closest("[data-close-home-panel]")||i.classList.contains("home-modal")){t.dispatch("close-home-panels");return}const l=i.closest("[data-codex-mode]");if(l){t.dispatch("set-codex-mode",{mode:l.dataset.codexMode});return}const d=i.closest("[data-codex-page]");if(d){t.dispatch("set-codex-page",{page:d.dataset.codexPage});return}const r=i.closest("[data-home-mode]");if(r){t.dispatch("set-home-mode",{mode:r.dataset.homeMode});return}const m=i.closest("[data-level-page]");if(m){t.dispatch("set-level-page",{page:m.dataset.levelPage});return}const g=i.closest("[data-setting-ai]");if(g){t.dispatch("update-settings",{aiStrength:g.dataset.settingAi});return}const u=i.closest("[data-navigate]");if(u){t.dispatch("navigate",{screen:u.dataset.navigate});return}const p=i.closest("[data-select-level]");if(p){const v=parseInt(p.dataset.selectLevel,10);isNaN(v)||t.dispatch("select-level",{levelId:v});return}if(i.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const f=i.closest("[data-action]");if(f){const v=f.dataset.action;if(v==="back-to-menu"||v==="back-to-levels"){t.dispatch(v);return}}const b=i.closest("[data-toggle-upgrade]");if(b){t.dispatch("toggle-upgrade",{pieceType:b.dataset.toggleUpgrade});return}}),e.addEventListener("input",a=>{const i=a.target;if(!(i instanceof HTMLInputElement)||!i.matches("[data-setting-range]"))return;const o=Math.max(0,Math.min(100,Math.round(Number(i.value)||0)));i.style.setProperty("--slider-fill",`${o}%`);const l=i.closest(".sound-slider-row"),d=l==null?void 0:l.querySelector("[data-setting-value]");d&&(d.textContent=`${o}%`)}),e.addEventListener("change",a=>{const i=a.target;if(!(i instanceof HTMLInputElement))return;const o=i.dataset.settingToggle;if(o){t.dispatch("update-settings",{[o]:i.checked});return}const l=i.dataset.settingRange;l&&t.dispatch("update-settings",{[l]:i.value})}),window.addEventListener("keydown",a=>{a.key==="Escape"&&t.dispatch("close-home-panels")}),window.addEventListener("message",a=>{if(!a.data)return;const i=t.getState();if(i.screen!=="game"||!i.currentLevel)return;const o=W(i.currentLevel);if(o){if(a.data.type==="piece-selected"){const l=document.getElementById("hint-display");if(!l)return;const d=a.data.hint;if(d)l.textContent=d,l.classList.remove("hint-empty");else{const r=l.dataset.default||"";l.textContent=r||"选择棋子查看走法",l.classList.toggle("hint-empty",!r)}return}if(a.data.type==="game-progress"){const l=a.data.stats||{},d=i.starsPerLevel[o.id]||0,r=document.getElementById("star-goal-list");if(r&&(r.innerHTML=o.stars.map((p,k)=>{const f=d>>k&1,b=!!(p.eval&&p.eval(l)),v=f||b;return`<div class="star-goal ${v?"star-goal-earned":""}">
            <span class="star-goal-icon">${v?"★":"☆"}</span>
            <span class="star-goal-desc">${p.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const p=a.data.redPct,k=100-p,f=document.getElementById("outer-red-pct"),b=document.getElementById("outer-blk-pct"),v=document.getElementById("outer-fill-red"),_=document.getElementById("outer-advantage");f&&(f.textContent=p+"%"),b&&(b.textContent=k+"%"),v&&(v.style.width=p+"%"),_&&a.data.advantage&&(_.textContent=a.data.advantage)}const m=document.getElementById("outer-cap-red"),g=document.getElementById("outer-cap-black");m&&a.data.capturedRed!==void 0&&(m.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(p=>`<span class="cap-item red">${p}</span>`).join(""):'<span class="cap-empty">—</span>'),g&&a.data.capturedBlack!==void 0&&(g.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(p=>`<span class="cap-item blk">${p}</span>`).join(""):'<span class="cap-empty">—</span>');const u=document.getElementById("outer-move-log");u&&a.data.moves!==void 0&&(a.data.moves.length===0?u.innerHTML='<span class="log-empty">对局尚未开始</span>':(u.innerHTML=a.data.moves.map(p=>`<div class="log-entry ${p.side==="red"?"log-red":"log-blk"}">${p.text}</div>`).join(""),u.scrollTop=u.scrollHeight));return}if(a.data.type==="game-end"){const l=a.data.stats||{};let d=0;o.stars.forEach((r,m)=>{r.eval&&r.eval(l)&&(d|=1<<m)}),t.dispatch("game-result",{newStarBits:d,win:!!l.win}),oe().then(({stats:r,status:m})=>{t.dispatch("usage-stats-updated",{stats:r,status:m})}).catch(r=>{console.warn("全站游玩统计失败:",r),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}),s()}const te=document.querySelector("#app");if(!te)throw new Error("#app container not found");je(te);
