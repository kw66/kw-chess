(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const E={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},ae="https://ypefmpeekfucmarbbdov.supabase.co",R="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",h={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day"};function k(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function se(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0}}function ne(e){const t=e&&typeof e=="object"?e:{};return{totalPv:k(t.totalPv),totalUv:k(t.totalUv),totalGames:k(t.totalGames),todayPv:k(t.todayPv),todayUv:k(t.todayUv),todayGames:k(t.todayGames)}}async function ie(){const e=z();return e&&await ce(),{stats:await N(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function oe(){if(!z())return{stats:await N(),status:"本地预览不会写入全站统计。"};const e=M();return await Promise.all([S(h.totalGames),S(_(h.dailyGamesPrefix,e))]),{stats:await N(),status:"游玩局数已同步。"}}async function ce(){const e=M();await Promise.all([S(h.totalPv),S(_(h.dailyPvPrefix,e))]);const t=localStorage.getItem(E.statsVisitor)==="true",s=localStorage.getItem(E.statsLastUvDate),a=[];t||(a.push(S(h.totalUv)),localStorage.setItem(E.statsVisitor,"true")),s!==e&&(a.push(S(_(h.dailyUvPrefix,e))),localStorage.setItem(E.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function N(){const e=M(),t=_(h.dailyPvPrefix,e),s=_(h.dailyUvPrefix,e),a=_(h.dailyGamesPrefix,e),n=await re([h.totalPv,h.totalUv,h.totalGames,t,s,a]);return ne({totalPv:n[h.totalPv],totalUv:n[h.totalUv],totalGames:n[h.totalGames],todayPv:n[t],todayUv:n[s],todayGames:n[a]})}async function S(e){return F("increment_counter",{counter_id:e})}async function re(e){const t=await F("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=k(a.count));return s}async function F(e,t){const s=await fetch(`${ae}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:R,Authorization:`Bearer ${R}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function z(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function _(e,t=M()){return`${e}_${t.replaceAll("-","")}`}function M(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const x={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"normal"},P=[{id:"entry",label:"入门",time:300,note:"快速落子，适合熟悉规则。"},{id:"easy",label:"初级",time:700,note:"会看吃子与基础防守。"},{id:"normal",label:"中级",time:1300,note:"兼顾布局、叠层和攻防。"},{id:"hard",label:"高级",time:2400,note:"搜索更久，压迫感更强。"}];function j(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function T(e){const t=e&&typeof e=="object"?e:{},s=P.some(a=>a.id===t.aiStrength)?t.aiStrength:x.aiStrength;return{sfxEnabled:t.sfxEnabled??x.sfxEnabled,sfxVolume:j(t.sfxVolume,x.sfxVolume),bgmEnabled:t.bgmEnabled??x.bgmEnabled,bgmVolume:j(t.bgmVolume,x.bgmVolume),aiStrength:s}}function B(e){const t=T(e);return P.find(s=>s.id===t.aiStrength)||P.find(s=>s.id===x.aiStrength)||P[0]}const W="kw-chess-save";function le(){try{const e=localStorage.getItem(W);return e?JSON.parse(e):null}catch{return null}}function U(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(W,JSON.stringify(t))}catch{}}function de(){const e=le();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,usageStats:se(),usageStatsStatus:"全站统计读取中。",settings:T(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"classic",homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,currentLevel:null}}function pe(){let e=de();const t=new Set;function s(){return e}function a(i){const l=typeof i=="function"?i(e):i;e={...e,...l},t.forEach(c=>c(e))}function n(i){return t.add(i),()=>t.delete(i)}function o(i,l={}){switch(i){case"navigate":a({screen:l.screen});break;case"usage-stats-updated":a({usageStats:l.stats??e.usageStats,usageStatsStatus:l.status??e.usageStatsStatus});break;case"toggle-home-panel":{const c=l.panel||null;a({activeHomePanel:e.activeHomePanel===c?null:c});break}case"open-home-panel":a({activeHomePanel:l.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:l.mode==="kw"?"kw":"classic"});break;case"set-home-mode":{const c=l.mode==="classic"?"classic":"kw";a({homeMode:c}),U({...e,homeMode:c});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(l.page)||0))});break;case"update-settings":{const c=T({...e.settings,...l});a({settings:c}),U({...e,settings:c});break}case"select-level":a({screen:"game",currentLevel:l.levelId});break;case"back-to-menu":a({screen:"menu",currentLevel:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:c}=l,p={...e.pieceUpgrades};p[c]?delete p[c]:p[c]=!0,a({pieceUpgrades:p}),U({...e,pieceUpgrades:p});break}case"game-result":{const{newStarBits:c,win:p}=l,g=e.currentLevel,u={...e.starsPerLevel};u[g]=(u[g]||0)|(c||0);const m={starsPerLevel:u,totalWins:e.totalWins+(p?1:0),totalGames:e.totalGames+1};a(m),U({...e,...m});break}default:console.warn(`[Store] 未知 action: ${i}`)}}return{getState:s,setState:a,subscribe:n,dispatch:o}}const I={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},me=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，无限连踩，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，击杀后连踩不停，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮无需炮架即可隔空轰击敌方棋子。"}]},{id:5,name:"自爆",desc:"八方移动，九宫自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可八方移动，同类合体增强，还能自爆与敌同归于尽。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],y=me.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function Y(e){return y.find(t=>t.id===e)||null}const X=y.filter(e=>!e.freePlay).length,Z={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"全员觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},C=3;function r(e,t,s=""){return e.map(([a,n,o])=>({x:a,y:n,type:t,label:o??s}))}function d(e,t,s={}){return{title:e,marks:t,...s}}const ue=[{piece:"車",name:"车",title:"横竖直线，不可越子",diagrams:[d("直线可走",[...r([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),d("挡子与吃子",[...r([[1,2]],"move"),...r([[0,2,"吃"]],"attack"),...r([[3,2,"挡"]],"block"),...r([[4,2,"禁"]],"blocked")])],lines:["绿色格可以直走，红色格是同线第一枚敌子。","遇到任意棋子都会停住，不能越过挡子。"]},{piece:"馬",name:"马",title:"日字跳跃，注意蹩腿",diagrams:[d("日字落点",[...r([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")]),d("蹩马腿",[...r([[2,1,"腿"]],"block"),...r([[1,0,"禁"],[3,0,"禁"]],"blocked"),...r([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")])],lines:["绿色为马的“日”字落点。","马腿格被占住时，同方向两个落点都不能去。"]},{piece:"炮",name:"炮",title:"移动像车，吃子隔架",diagrams:[d("空线移动",[...r([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),d("隔架吃子",[...r([[1,2,"架"]],"block"),...r([[3,2,"吃"]],"attack"),...r([[2,2]],"path")],{center:{x:0,y:2}})],lines:["不吃子时按车的直线走法移动。","吃子必须隔一个炮架，红色目标才可以被打。"]},{piece:"兵",name:"兵",title:"过河前后不同",diagrams:[d("未过河",[...r([[2,2,"进"]],"move"),...r([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3}}),d("过河后",[...r([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...r([[2,3,"禁"]],"blocked")])],lines:["未过河只能向前一步。","过河后可向前或左右一步，仍然不能后退。"]},{piece:"仕",name:"仕",title:"九宫内斜一步",diagrams:[d("九宫斜走",[...r([[1,1],[3,1],[1,3],[3,3]],"move"),...r([[0,0,"宫"],[4,0,"宫"],[0,4,"宫"],[4,4,"宫"]],"palace")])],lines:["只在九宫内活动。","每次只能斜走一格，绿色为当前可走格。"]},{piece:"相",name:"相",title:"田字两格，象眼会挡",diagrams:[d("田字落点",[...r([[0,0],[4,0],[0,4],[4,4]],"move")]),d("塞象眼",[...r([[1,1,"眼"]],"block"),...r([[0,0,"禁"]],"blocked"),...r([[4,0],[0,4],[4,4]],"move")])],lines:["沿对角线跳两格，不能过河。","象眼格被占住时，对应田字落点不可走。"]},{piece:"帅",name:"帅",title:"九宫一步，将帅照面",diagrams:[d("九宫一步",[...r([[2,1],[1,2],[3,2],[2,3]],"move"),...r([[1,1,"宫"],[3,1,"宫"],[1,3,"宫"],[3,3,"宫"]],"palace")]),d("照面禁线",[...r([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4}})],lines:["在九宫内横竖走一格。","两帅中间无遮挡时，红色直线表示不能照面。"]}],ge=[{piece:"車",name:"觉醒车",title:"直线移动，冲撞友军",diagrams:[d("直线移动",[...r([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),d("冲撞运输",[...r([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...r([[2,2,"友"]],"ally")],{center:{x:0,y:2}}),d("车车合体",[...r([[1,2,"車"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}})],lines:["绿色仍是车的直线可走格。","蓝色表示车撞向友方异类棋子，并把它推出去。","紫色表示同类车叠层，双击后合体。"]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[d("十二方落点",[...r([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")]),d("连踩链",[...r([[3,1,"踩1"],[4,3,"踩2"]],"attack"),...r([[2,0,"续"],[3,4,"续"]],"skill")],{center:{x:1,y:2}}),d("马马合体",[...r([[1,2,"馬"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}})],lines:["绿色十二格都能跳，不再受马腿限制。","红色为连续吃子落点，吃到后可继续找下一跳。","紫色表示同类马叠层合体。"]},{piece:"炮",name:"觉醒炮",title:"直线移动，连续炮架远袭",diagrams:[d("直线移动",[...r([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),d("连续炮架",[...r([[1,2,"架"],[2,2,"架"]],"block"),...r([[3,2,"吃"],[4,2,"远"]],"attack")],{center:{x:0,y:2}}),d("炮炮合体",[...r([[1,2,"炮"],[2,2,"叠"],[3,2,"合"]],"combo")],{center:{x:0,y:2}})],lines:["绿色为横竖移动。","灰色连续棋子段可作为炮架，红色目标会被远袭。","紫色表示同类炮叠层合体。"]},{piece:"兵",name:"觉醒兵",title:"四向移动，叠层自爆",diagrams:[d("四向可走",[...r([[2,1],[1,2],[3,2],[2,3]],"move")]),d("自爆范围",[...r([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")]),d("兵兵自动合体",[...r([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2}})],lines:["绿色为上下左右一步。","红色为自爆伤害范围，层数越高半径越大。","兵叠层后自动合体，多个兵可连锁引爆。"]},{piece:"仕",name:"觉醒仕",title:"出宫斜走，X 形光波",diagrams:[d("出宫斜走",[...r([[1,1],[3,1],[1,3],[3,3]],"move"),...r([[0,0,"宫外"],[4,4,"宫外"]],"path")]),d("X 形伤害",[...r([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")]),d("仕仕合体",[...r([[1,2,"仕"],[2,2,"叠"],[3,2,"合"],[4,2,"强"]],"combo")],{center:{x:0,y:2}})],lines:["绿色斜格可以出宫、过河。","红色 X 线是落地后光波伤害范围。","同类仕合体后，光波范围和伤害按顶组层数提升。"]},{piece:"相",name:"觉醒相",title:"无眼越河，十字地震",diagrams:[d("斜跳两格",[...r([[0,0],[4,0],[0,4],[4,4]],"move"),...r([[1,1,"无眼"],[3,1,"无眼"]],"path")]),d("十字伤害",[...r([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")]),d("相相合体",[...r([[1,2,"相"],[2,2,"叠"],[3,2,"合"],[4,2,"强"]],"combo")],{center:{x:0,y:2}})],lines:["绿色为斜跳两格；蓝色表示不再检查象眼，也可以过河。","红色十字线是落地后的地震伤害。","同类相合体后，地震范围和伤害按顶组层数提升。"]},{piece:"帅",name:"觉醒帅",title:"八向亲征，车送出宫",diagrams:[d("九宫八向",[...r([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")]),d("吃子成长",[...r([[2,1,"吃"]],"attack"),...r([[2,0,"+1"]],"combo")]),d("车送出宫",[...r([[2,4,"車"]],"ally"),...r([[2,3,"撞"],[2,1,"出"]],"skill")])],lines:["九宫内绿色八格都可走；出宫后改为横竖一步。","红色吃子后成长 +1。","可被觉醒车冲撞送出宫，但王不能叠层。"]}];function ve(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function q(e){return e==="classic"?"classic":"kw"}function O(e,t=y){return t.reduce((s,a)=>s+ve(e[a.id]||0),0)}function V(e=y){return e.reduce((t,s)=>t+s.stars.length,0)}function K(e,t=y){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function he(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function fe(e,t){const s=y.find(o=>o.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=y.find(o=>o.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function be(e,t,s="md"){return`<div class="stars stars-${s}">
    ${t.map((a,n)=>`
      <span class="star ${e>>n&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>n&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function w(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function A(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function D(e,t){const s=Z[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>
  </button>`}function ye(e){const t=q(e.homeMode),s=Z[t],a=y.find(i=>i.id===s.aiLevelId),n=y.find(i=>i.id===s.freeLevelId),o=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局";return`
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
        ${n?`
        <button class="home-action-secondary" data-select-level="${n.id}">
          <span>双人</span><b>自由对弈</b>
        </button>`:""}
      </div>
    </section>`}function Q(){return y.filter(e=>!e.freePlay)}function $e(e,t){return`<div class="challenge-goals">
    ${e.stars.map((s,a)=>`
      <span class="${t>>a&1?"is-earned":""}">${s.desc}</span>
    `).join("")}
  </div>`}function ke(e,t,s){var p,g,u;const a=t[e.id]||0,n=fe(e.id,t),o=he(e,t),i=e.pieces?e.pieces.map(m=>I[m]):e.piece?[I[e.piece]]:[],l={classic:"传统规则",mixed:"觉醒练习",kw:"科王规则"}[((p=e.config)==null?void 0:p.mode)??"kw"]||"科王规则",c=(g=e.config)!=null&&g.noAi?"双人":`AI ${B(s).label}`;return`
    <button class="challenge-level-card ${o?"is-completed":""} ${n?"":"is-locked"}"
            ${n?`data-select-level="${e.id}"`:"disabled"}
            data-mode="${((u=e.config)==null?void 0:u.mode)??"kw"}">
      <div class="challenge-card-top">
        <span class="challenge-index">${n?e.id:"锁"}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${e.tierName} · ${l} · ${c}</em>
        </div>
        ${i.length?`<div class="challenge-piece-list">${i.map(m=>`<span>${m}</span>`).join("")}</div>`:""}
      </div>
      <p>${e.desc}</p>
      ${$e(e,a)}
      <div class="challenge-card-foot">
        ${be(a,e.stars,"sm")}
        <span>${o?"已通关":n?"可挑战":"先通前关"}</span>
      </div>
    </button>`}function we(e,t,s,a){const n=Q(),o=Math.max(1,Math.ceil(n.length/C)),i=Math.min(Math.max(0,e.levelPage||0),o-1),l=n.slice(i*C,(i+1)*C);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <div>
          <h2>关卡模式</h2>
          <p>全部关卡</p>
        </div>
        <div class="challenge-summary">
          <span><b>${t}/${n.length||X}</b>通关</span>
          <span><b>${s}/${a}</b>总星</span>
        </div>
      </header>
      <div class="challenge-level-list">
        ${l.map(c=>ke(c,e.starsPerLevel,e.settings)).join("")}
      </div>
      <div class="challenge-pager" aria-label="关卡翻页">
        <button type="button" data-level-page="${i-1}" ${i<=0?"disabled":""}>‹</button>
        <span>${i+1} / ${o}</span>
        <button type="button" data-level-page="${i+1}" ${i>=o-1?"disabled":""}>›</button>
      </div>
    </section>`}function xe(e,t,s,a){const n=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局",o=e.usageStats||{};return`
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
          <div><b>${a}/${X}</b><span>通关</span></div>
          <div><b>${t}/${s}</b><span>星星</span></div>
          <div><b>${e.totalGames||0}</b><span>对局</span></div>
          <div><b>${n}</b><span>胜率</span></div>
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
    </article>`}function Se(e,t){const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map((t.marks||[]).map(i=>[`${i.x},${i.y}`,i])),o=[];for(let i=0;i<s;i+=1)for(let l=0;l<s;l+=1){const c=n.get(`${l},${i}`),p=l===a.x&&i===a.y,g=c!=null&&c.type?`is-${c.type}`:"",u=p?`<b>${t.piece||e.piece}</b>`:(c==null?void 0:c.label)||"";o.push(`<span class="rule-cell ${p?"is-center":""} ${g}">${u}</span>`)}return`<div class="rule-mini-board" style="--board-size:${s}" aria-hidden="true">${o.join("")}</div>`}function _e(e,t){return`
    <div class="rule-diagram">
      ${Se(e,t)}
      <span>${t.title}</span>
    </div>`}function Le(e){const t=e.diagrams||(e.diagram?[e.diagram]:[]),s=`diagram-count-${Math.min(t.length,3)}`;return`
    <article class="rule-card">
      <div class="rule-head">
        <span>${e.piece}</span>
        <div>
          <strong>${e.name}</strong>
          <em>${e.title}</em>
        </div>
      </div>
      <div class="rule-visuals ${s}">${t.map(a=>_e(e,a)).join("")}</div>
      <div class="rule-copy">
        <ul>
          ${e.lines.map(a=>`<li>${a}</li>`).join("")}
        </ul>
      </div>
    </article>`}function Pe(e){const t=e==="kw"?"kw":"classic";return`
    <div class="rules-switch" role="group" aria-label="棋子图鉴分类">
      <button type="button" data-codex-mode="classic" class="${t==="classic"?"is-active":""}" aria-pressed="${t==="classic"}">传统象棋</button>
      <button type="button" data-codex-mode="kw" class="${t==="kw"?"is-active":""}" aria-pressed="${t==="kw"}">科王象棋</button>
    </div>
    <div class="rules-legend" aria-label="图例">
      <span class="legend-move">绿=可走</span>
      <span class="legend-attack">红=吃子/伤害</span>
      <span class="legend-skill">蓝=技能路径</span>
      <span class="legend-combo">紫=叠层/合体</span>
    </div>
    <section class="rules-panel" aria-label="${t==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid">
        ${(t==="kw"?ge:ue).map(Le).join("")}
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
        ${P.map(a=>`
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
    </div>`}function Ue(e,t,s,a){return`
    ${G("author","游戏信息",xe(e,t,s,a),e.activeHomePanel)}
    ${G("codex","棋子图鉴",Pe(e.codexMode),e.activeHomePanel)}
    ${G("settings","设置",Ee(e.settings),e.activeHomePanel)}`}function J(e){const t=q(e.homeMode),s=Q(),a=O(e.starsPerLevel,s),n=V(s),o=K(e.starsPerLevel,s),i=O(e.starsPerLevel),l=V(),c=K(e.starsPerLevel);return`
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
        ${we({...e},o,a,n)}
      </main>
      ${Ue(e,i,l,c)}
    </div>`}function Ie(e){return`
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
    </div>`}function Me(e){return`
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
    </div>`}const ee={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function Te(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Be(e){return String(e).replace(/"/g,"&quot;")}function Ce(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function Ae(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([o,i])=>{i&&s.add(o)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(o=>s.add(o)),[...s].filter(o=>ee[o])}function Ge(e){const t=Ae(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=ee[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function Ne(e,t){var n,o,i,l;const s=new URLSearchParams;if(s.set("levelId",e.id),!((n=e.config)!=null&&n.noAi)){const c=B(t);s.set("ai","1"),s.set("aiTime",String(c.time)),s.set("aiStrength",c.id)}const a=((o=e.config)==null?void 0:o.mode)??"kw";if(s.set("mode",a),a==="classic"&&s.set("classic","1"),a!=="classic"){const c=((i=e.config)==null?void 0:i.playerUpgrades)||{},p=((l=e.config)==null?void 0:l.aiUpgrades)||{},g=Object.keys(c).filter(m=>c[m]).join(","),u=Object.keys(p).filter(m=>p[m]).join(",");g&&s.set("pu",g),u&&s.set("au",u)}return`./index-legacy.html?${s.toString()}`}function He(e){var b,v,$;const t=Y(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=Te(s),n=t.stars.length,o=t.pieces?t.pieces.map(L=>I[L]).join(" "):t.piece?I[t.piece]:"",i=B(e.settings),l=Ne(t,e.settings),c=i.label,p=!((b=t.config)!=null&&b.noAi)&&c,g={classic:"传统",mixed:"觉醒",kw:"科王"}[((v=t.config)==null?void 0:v.mode)??"kw"]||"科王",u=t.freePlay?"双人":"红方",m=t.freePlay?'<span class="game-header-badge">自由对弈</span>':p?`<span class="game-header-badge game-header-ai">AI · ${c}</span>`:'<span class="game-header-badge">双人对局</span>',f=($=t.tutorial)!=null&&$.length?t.tutorial[0].text:"";return`
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
            ${m}
          </div>
          <div class="game-header-stars">
            ${t.stars.map((L,H)=>`<span class="star ${s>>H&1?"star-earned":"star-empty"}">${s>>H&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${n}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${g}</span>
          <span class="game-status-chip">${p?`AI ${c}`:u}</span>
          <span class="game-status-chip">目标 ${a}/${n}</span>
          <span class="game-status-chip">${t.freePlay?"练习局":"闯关局"}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${l}"
            title="科王象棋对局"
            allowfullscreen
          ></iframe>
        </div>

        <!-- ── 信息面板（5个区块） ── -->
        <div class="game-info-panel" id="game-info-panel">

          <!-- 1. 走法提示 -->
          <div class="info-section panel-hint">
            <div class="info-section-title">走法提示</div>
            <div class="hint-display ${f?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${Be(f)}">${f||"选择棋子查看走法"}</div>
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
          ${p?`
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
    </div>`}function Re(e){switch(e.screen){case"menu":return J(e);case"levels":return Ie();case"upgrade":return Me();case"game":return He(e);default:return J(e)}}function je(e){const t=pe();function s(){const a=t.getState();e.dataset.screen=a.screen,e.innerHTML=Re(a)}t.subscribe(s),ie().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{const n=a.target;if(!(n instanceof HTMLElement))return;const o=n.closest("[data-home-panel]");if(o){const v=o.dataset.homePanel;t.dispatch("toggle-home-panel",{panel:v});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){t.dispatch("close-home-panels");return}const i=n.closest("[data-codex-mode]");if(i){t.dispatch("set-codex-mode",{mode:i.dataset.codexMode});return}const l=n.closest("[data-home-mode]");if(l){t.dispatch("set-home-mode",{mode:l.dataset.homeMode});return}const c=n.closest("[data-level-page]");if(c){t.dispatch("set-level-page",{page:c.dataset.levelPage});return}const p=n.closest("[data-setting-ai]");if(p){t.dispatch("update-settings",{aiStrength:p.dataset.settingAi});return}const g=n.closest("[data-navigate]");if(g){t.dispatch("navigate",{screen:g.dataset.navigate});return}const u=n.closest("[data-select-level]");if(u){const v=parseInt(u.dataset.selectLevel,10);isNaN(v)||t.dispatch("select-level",{levelId:v});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const f=n.closest("[data-action]");if(f){const v=f.dataset.action;if(v==="back-to-menu"||v==="back-to-levels"){t.dispatch(v);return}}const b=n.closest("[data-toggle-upgrade]");if(b){t.dispatch("toggle-upgrade",{pieceType:b.dataset.toggleUpgrade});return}}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const o=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${o}%`);const i=n.closest(".sound-slider-row"),l=i==null?void 0:i.querySelector("[data-setting-value]");l&&(l.textContent=`${o}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const o=n.dataset.settingToggle;if(o){t.dispatch("update-settings",{[o]:n.checked});return}const i=n.dataset.settingRange;i&&t.dispatch("update-settings",{[i]:n.value})}),window.addEventListener("keydown",a=>{a.key==="Escape"&&t.dispatch("close-home-panels")}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const o=Y(n.currentLevel);if(o){if(a.data.type==="piece-selected"){const i=document.getElementById("hint-display");if(!i)return;const l=a.data.hint;if(l)i.textContent=l,i.classList.remove("hint-empty");else{const c=i.dataset.default||"";i.textContent=c||"选择棋子查看走法",i.classList.toggle("hint-empty",!c)}return}if(a.data.type==="game-progress"){const i=a.data.stats||{},l=n.starsPerLevel[o.id]||0,c=document.getElementById("star-goal-list");if(c&&(c.innerHTML=o.stars.map((m,f)=>{const b=l>>f&1,v=!!(m.eval&&m.eval(i)),$=b||v;return`<div class="star-goal ${$?"star-goal-earned":""}">
            <span class="star-goal-icon">${$?"★":"☆"}</span>
            <span class="star-goal-desc">${m.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const m=a.data.redPct,f=100-m,b=document.getElementById("outer-red-pct"),v=document.getElementById("outer-blk-pct"),$=document.getElementById("outer-fill-red"),L=document.getElementById("outer-advantage");b&&(b.textContent=m+"%"),v&&(v.textContent=f+"%"),$&&($.style.width=m+"%"),L&&a.data.advantage&&(L.textContent=a.data.advantage)}const p=document.getElementById("outer-cap-red"),g=document.getElementById("outer-cap-black");p&&a.data.capturedRed!==void 0&&(p.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(m=>`<span class="cap-item red">${m}</span>`).join(""):'<span class="cap-empty">—</span>'),g&&a.data.capturedBlack!==void 0&&(g.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(m=>`<span class="cap-item blk">${m}</span>`).join(""):'<span class="cap-empty">—</span>');const u=document.getElementById("outer-move-log");u&&a.data.moves!==void 0&&(a.data.moves.length===0?u.innerHTML='<span class="log-empty">对局尚未开始</span>':(u.innerHTML=a.data.moves.map(m=>`<div class="log-entry ${m.side==="red"?"log-red":"log-blk"}">${m.text}</div>`).join(""),u.scrollTop=u.scrollHeight));return}if(a.data.type==="game-end"){const i=a.data.stats||{};let l=0;o.stars.forEach((c,p)=>{c.eval&&c.eval(i)&&(l|=1<<p)}),t.dispatch("game-result",{newStarBits:l,win:!!i.win}),oe().then(({stats:c,status:p})=>{t.dispatch("usage-stats-updated",{stats:c,status:p})}).catch(c=>{console.warn("全站游玩统计失败:",c),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}),s()}const te=document.querySelector("#app");if(!te)throw new Error("#app container not found");je(te);
