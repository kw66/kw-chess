(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const M={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},ne="https://ypefmpeekfucmarbbdov.supabase.co",R="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",b={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day"};function w(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function ie(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0}}function oe(e){const t=e&&typeof e=="object"?e:{};return{totalPv:w(t.totalPv),totalUv:w(t.totalUv),totalGames:w(t.totalGames),todayPv:w(t.todayPv),todayUv:w(t.todayUv),todayGames:w(t.todayGames)}}async function ce(){const e=W();return e&&await le(),{stats:await O(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function re(){if(!W())return{stats:await O(),status:"本地预览不会写入全站统计。"};const e=T();return await Promise.all([P(b.totalGames),P(_(b.dailyGamesPrefix,e))]),{stats:await O(),status:"游玩局数已同步。"}}async function le(){const e=T();await Promise.all([P(b.totalPv),P(_(b.dailyPvPrefix,e))]);const t=localStorage.getItem(M.statsVisitor)==="true",s=localStorage.getItem(M.statsLastUvDate),a=[];t||(a.push(P(b.totalUv)),localStorage.setItem(M.statsVisitor,"true")),s!==e&&(a.push(P(_(b.dailyUvPrefix,e))),localStorage.setItem(M.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function O(){const e=T(),t=_(b.dailyPvPrefix,e),s=_(b.dailyUvPrefix,e),a=_(b.dailyGamesPrefix,e),n=await de([b.totalPv,b.totalUv,b.totalGames,t,s,a]);return oe({totalPv:n[b.totalPv],totalUv:n[b.totalUv],totalGames:n[b.totalGames],todayPv:n[t],todayUv:n[s],todayGames:n[a]})}async function P(e){return X("increment_counter",{counter_id:e})}async function de(e){const t=await X("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=w(a.count));return s}async function X(e,t){const s=await fetch(`${ne}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:R,Authorization:`Bearer ${R}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function W(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function _(e,t=T()){return`${e}_${t.replaceAll("-","")}`}function T(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const S={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"normal"},E=[{id:"entry",label:"入门",time:300,note:"快速落子，适合熟悉规则。"},{id:"easy",label:"初级",time:700,note:"会看吃子与基础防守。"},{id:"normal",label:"中级",time:1300,note:"兼顾布局、叠层和攻防。"},{id:"hard",label:"高级",time:2400,note:"搜索更久，压迫感更强。"}];function j(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function C(e){const t=e&&typeof e=="object"?e:{},s=E.some(a=>a.id===t.aiStrength)?t.aiStrength:S.aiStrength;return{sfxEnabled:t.sfxEnabled??S.sfxEnabled,sfxVolume:j(t.sfxVolume,S.sfxVolume),bgmEnabled:t.bgmEnabled??S.bgmEnabled,bgmVolume:j(t.bgmVolume,S.bgmVolume),aiStrength:s}}function B(e){const t=C(e);return E.find(s=>s.id===t.aiStrength)||E.find(s=>s.id===S.aiStrength)||E[0]}const Y="kw-chess-save";function pe(){try{const e=localStorage.getItem(Y);return e?JSON.parse(e):null}catch{return null}}function U(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(Y,JSON.stringify(t))}catch{}}function me(){const e=pe();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,usageStats:ie(),usageStatsStatus:"全站统计读取中。",settings:C(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"kw",codexPage:0,homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,currentLevel:null}}function ue(){let e=me();const t=new Set;function s(){return e}function a(o){const r=typeof o=="function"?o(e):o;e={...e,...r},t.forEach(l=>l(e))}function n(o){return t.add(o),()=>t.delete(o)}function i(o,r={}){switch(o){case"navigate":a({screen:r.screen});break;case"usage-stats-updated":a({usageStats:r.stats??e.usageStats,usageStatsStatus:r.status??e.usageStatsStatus});break;case"toggle-home-panel":{const l=r.panel||null;a({activeHomePanel:e.activeHomePanel===l?null:l});break}case"open-home-panel":a({activeHomePanel:r.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:r.mode==="kw"?"kw":"classic",codexPage:0});break;case"set-codex-page":a({codexPage:Math.max(0,Math.trunc(Number(r.page)||0))});break;case"set-home-mode":{const l=r.mode==="classic"?"classic":"kw";a({homeMode:l}),U({...e,homeMode:l});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(r.page)||0))});break;case"update-settings":{const l=C({...e.settings,...r});a({settings:l}),U({...e,settings:l});break}case"select-level":a({screen:"game",currentLevel:r.levelId});break;case"back-to-menu":a({screen:"menu",currentLevel:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:l}=r,m={...e.pieceUpgrades};m[l]?delete m[l]:m[l]=!0,a({pieceUpgrades:m}),U({...e,pieceUpgrades:m});break}case"game-result":{const{newStarBits:l,win:m}=r,v=e.currentLevel,g={...e.starsPerLevel};g[v]=(g[v]||0)|(l||0);const u={starsPerLevel:g,totalWins:e.totalWins+(m?1:0),totalGames:e.totalGames+1};a(u),U({...e,...u});break}default:console.warn(`[Store] 未知 action: ${o}`)}}return{getState:s,setState:a,subscribe:n,dispatch:i}}const I={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},ge=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，借己方棋子连续跳跃，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，可借己方棋子连续跳跃，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮可以翻过连续炮架，远袭炮架后的敌方棋子。"}]},{id:5,name:"自爆",desc:"四向一步，叠层自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可上下左右一步移动，同类会自动合体，还能自爆清场。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],$=ge.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function Z(e){return $.find(t=>t.id===e)||null}const q=$.filter(e=>!e.freePlay).length,Q={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"全员觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},A=3;function c(e,t){return e.map(([s,a])=>({x:s,y:a,type:t}))}function d(e,t,s,a={}){return{x:e,y:t,piece:s,owner:a.owner||"red",layer:a.layer||1,groups:a.groups,type:a.type||"",ghost:!!a.ghost}}function p(e,t,s={}){return{title:e,marks:t,...s}}const ve=[{piece:"車",name:"车",title:"横竖直线走，遇到棋子就停",diagrams:[p("空线可走",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),p("挡子与吃子",[...c([[1,2]],"move"),...c([[0,2,"吃"]],"attack"),...c([[3,2,"挡"]],"block"),...c([[4,2,"不可"]],"blocked")],{pieces:[d(0,2,"卒",{owner:"black",type:"attack"}),d(3,2,"兵",{type:"block"})]})],sections:[{title:"怎么走",items:["车只走横线或竖线，一次可以走任意格数。","绿色格表示中间没有棋子挡住，所以都可以直接到达。"]},{title:"怎么吃",items:["同一条直线上遇到第一枚敌方棋子时，可以走到敌方棋子所在格并吃掉它。","遇到任何棋子都会停住，不能越过它去吃后面的棋子。"]}]},{piece:"馬",name:"马",title:"走“日”字，马腿被占会被蹩",diagrams:[p("日字落点",[...c([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")]),p("蹩马腿",[...c([[2,1,"腿"]],"block"),...c([[1,0,"禁"],[3,0,"禁"]],"blocked"),...c([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")],{pieces:[d(2,1,"兵",{type:"block"})]})],sections:[{title:"怎么走",items:["马走“日”字：先横或竖一格，再斜一格，最终落在绿色位置。","马不是直线棋子，可以越过大多数棋子，但有一个关键例外。"]},{title:"蹩马腿",items:["如果马正前、正后、正左、正右的“马腿格”被任何棋子占住，那个方向的两个日字落点都不能走。","示意图里上方马腿被红兵占住，所以对应方向的两个灰色落点都不能去。"]}]},{piece:"炮",name:"炮",title:"移动像车，吃子必须隔一个炮架",diagrams:[p("不吃子移动",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),p("隔架吃子",[...c([[1,2,"架"]],"block"),...c([[3,2,"吃"]],"attack"),...c([[2,2]],"path")],{center:{x:0,y:2},pieces:[d(1,2,"兵",{type:"block"}),d(3,2,"卒",{owner:"black",type:"attack"})]})],sections:[{title:"怎么走",items:["炮不吃子时和车一样，沿横线或竖线移动，不能越过棋子。"]},{title:"怎么吃",items:["炮吃子时必须隔着正好一个棋子，这个被隔着的棋子叫炮架。","炮架可以是双方任意棋子；炮架后遇到的第一枚敌棋才是可吃目标。"]}]},{piece:"兵",name:"兵",title:"未过河只前进，过河后可左右",diagrams:[p("未过河",[...c([[2,2,"进"]],"move"),...c([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3}}),p("过河后",[...c([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...c([[2,3,"禁"]],"blocked")])],sections:[{title:"怎么走",items:["兵每次只走一格。红方朝上前进，黑方朝下前进。","没有过河前只能向前走，不能左右走，也不能后退。"]},{title:"过河以后",items:["过河后可以向前、向左、向右走一格。","兵永远不能后退。"]}]},{piece:"仕",name:"仕",title:"只在九宫内斜走一格",diagrams:[p("九宫斜走",[...c([[1,1],[3,1],[1,3],[3,3]],"move"),...c([[0,0,"宫"],[4,0,"宫"],[0,4,"宫"],[4,4,"宫"]],"palace")])],sections:[{title:"活动范围",items:["仕只能留在己方九宫内，不能出宫。","九宫就是帅周围的 3×3 区域。"]},{title:"怎么走",items:["仕每次只能斜走一格，不能横走、竖走，也不能跳。"]}]},{piece:"相",name:"相",title:"走田字，两格斜跳，象眼会挡",diagrams:[p("田字落点",[...c([[0,0],[4,0],[0,4],[4,4]],"move")]),p("塞象眼",[...c([[1,1,"眼"]],"block"),...c([[0,0,"禁"]],"blocked"),...c([[4,0],[0,4],[4,4]],"move")],{pieces:[d(1,1,"兵",{type:"block"})]})],sections:[{title:"怎么走",items:["相沿对角线一次跳两格，也就是走“田”字。","相不能过河，只能在己方半边活动。"]},{title:"塞象眼",items:["如果对角线中间那一格被任何棋子占住，对应方向就不能跳。","示意图里左上方向的象眼被红兵占住，所以左上角的灰色落点不能走。"]}]},{piece:"帅",name:"帅",title:"九宫内一步，将帅不能照面",diagrams:[p("九宫一步",[...c([[2,1],[1,2],[3,2],[2,3]],"move"),...c([[1,1,"宫"],[3,1,"宫"],[1,3,"宫"],[3,3,"宫"]],"palace")]),p("照面禁线",[...c([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4},pieces:[d(2,0,"将",{owner:"black",type:"attack"})]})],sections:[{title:"怎么走",items:["帅只能在九宫内横走或竖走一格。","帅不能主动走出九宫。"]},{title:"将帅照面",items:["双方帅/将如果在同一列，中间没有任何棋子挡住，就是违规局面。","走棋时要避免让两位主帅直接面对面。"]}]}],he=[{piece:"叠",name:"通用叠层",title:"先看这页：叠层、合体、叠层吃子",diagrams:[p("同类叠层",[...c([[1,2,"車"],[2,2,"叠"],[3,2,"2层"],[4,2]],"combo")],{center:{x:0,y:2},piece:"車",pieces:[d(2,2,"車",{type:"combo"}),d(4,2,"車",{layer:2,groups:[1,1],type:"combo"})]}),p("层数吃子",[...c([[3,2,"敌1"],[4,2,"胜"]],"attack"),...c([[1,2,"2层"]],"combo")],{center:{x:1,y:2},piece:"車",centerLayer:2,centerGroups:[2],pieces:[d(4,2,"卒",{owner:"black",type:"attack"})]}),p("层数不足",[...c([[2,2,"敌3"]],"attack"),...c([[3,2,"剩2"],[4,2]],"block"),...c([[1,2,"败"]],"blocked")],{center:{x:0,y:2},piece:"兵",pieces:[d(2,2,"卒",{owner:"black",layer:3,type:"attack"}),d(4,2,"卒",{owner:"black",layer:2,type:"block",ghost:!0})]})],sections:[{title:"怎么叠",items:["同阵营、同种类的觉醒棋子可以走到一起形成叠层；帅/王不能叠层。","兵最多叠到 5 层，并且叠上去后会自动合体；其他棋子叠上去后先保持为多个小组。"]},{title:"怎么操作",items:["单击叠子会默认带最上面一组行动，剩下的小组留在原格。","双击叠子会打开选择环：多个小组可以选“合”，合体后可以整组行动；合体棋子也可以双击拆出部分层数行动。"]},{title:"怎么吃叠子",items:["吃子只看本次出击的层数和目标总层数。出击层数大于或等于目标层数，就能消灭目标并保留自己的层数。","如果出击层数小于目标层数，进攻方会消失，目标只扣掉对应层数。图中 1 层兵打 3 层敌子会失败，敌子剩 2 层。"]}]},{piece:"車",name:"觉醒车",title:"直线移动，冲撞运输",diagrams:[p("直线移动",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),p("冲撞运输",[...c([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...c([[2,2,"友"]],"ally")],{center:{x:0,y:2},pieces:[d(2,2,"兵",{type:"ally"}),d(4,2,"兵",{type:"skill",ghost:!0})]}),p("车车合体",[...c([[1,2,"車"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"車",{type:"combo"}),d(4,2,"車",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒车仍然按车的方式横竖直线移动，不能越过普通阻挡。","遇到敌子时可以按层数规则吃子。"]},{title:"冲撞",items:["如果同一条直线上先有空格、再遇到己方异类棋子，车可以冲到它前一格并把它沿同方向推出。","被推出的棋子遇到己方同类会叠层，遇到敌方会按层数结算；如果把帅推出九宫，就会触发帅的宫外规则。"]},{title:"叠层表现",items:["车车叠层后可合体，合体车能用更高层数吃子或冲撞。","如果被冲撞的是未合体叠子，只推出最底部的小组；合体后才会整体被推出。"]}]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[p("十二方落点",[...c([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")]),p("借友连跳",[...c([[2,2,"友"],[4,2,"续"]],"skill"),...c([[4,4,"吃"]],"attack"),...c([[2,0,"空"]],"move")],{center:{x:0,y:2},pieces:[d(2,2,"兵",{type:"skill"}),d(4,4,"卒",{owner:"black",type:"attack"})]}),p("马马合体",[...c([[1,2,"馬"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"馬",{type:"combo"}),d(4,2,"馬",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒马可以跳传统“日”字的 8 个点，也可以直线跳 2 格，总共 12 个方向。","觉醒马没有蹩马腿限制，旁边有棋子也不会挡住它。"]},{title:"连踩",items:["跳到己方棋子上时可以继续从那里再跳；己方异类只是踏点，不会停在上面。","跳到己方马的位置时，可以选择叠层，也可以把它当踏点继续跳。跳到敌方棋子时结束并按层数吃子。"]},{title:"叠层表现",items:["马马合体后，本次出击层数更高，连踩到敌方叠子时更容易吃赢。","未合体时通常只有最上面的小组行动，合体后可以整组跳，也可以拆分部分层数行动。"]}]},{piece:"炮",name:"觉醒炮",title:"直线移动，翻过连续炮架",diagrams:[p("直线移动",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),p("连续炮架",[...c([[1,2,"架"],[2,2,"架"]],"block"),...c([[3,2,"落"]],"move"),...c([[4,2,"吃"]],"attack")],{center:{x:0,y:2},pieces:[d(1,2,"兵",{type:"block"}),d(2,2,"卒",{owner:"black",type:"block"}),d(4,2,"卒",{owner:"black",type:"attack"})]}),p("炮炮合体",[...c([[1,2,"炮"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"炮",{type:"combo"}),d(4,2,"炮",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["不吃子时，觉醒炮可以像车一样沿横线或竖线走。","遇到连续棋子段时，炮可以翻过这段炮架，落到后面的空格。"]},{title:"怎么吃",items:["炮架可以是一段连续棋子；越过炮架后遇到的第一枚敌棋可以被攻击。","如果炮架后遇到的是己方炮，也可以叠层。"]},{title:"叠层表现",items:["炮炮合体后按更高层数远袭，打叠层敌子更强。","未合体炮叠子先是多个小组，双击合体后才会整组行动。"]}]},{piece:"兵",name:"觉醒兵",title:"四向一步，叠层自动合体，自爆连锁",diagrams:[p("四向可走",[...c([[2,1],[1,2],[3,2],[2,3]],"move")]),p("自爆范围",[...c([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")],{pieces:[d(1,1,"卒",{owner:"black",type:"attack"}),d(3,3,"马",{type:"attack"})]}),p("兵兵自动合体",[...c([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"兵",{type:"combo"}),d(4,2,"兵",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒兵每次可以向上、下、左、右走一格，不再受过河限制。","遇到敌子时按层数规则吃子。"]},{title:"自爆",items:["双击兵可以选择“爆”。自爆后兵自己消失，并攻击周围范围。","自爆半径等于兵的总层数；对非兵棋子每次造成 1 层伤害，双方棋子都会被波及。被炸到的兵会继续连锁自爆。"]},{title:"叠层表现",items:["兵叠到同类兵上会自动合体，最多 5 层。","层数越高，自爆范围越大，因此叠兵是推进和爆破的核心。"]}]},{piece:"仕",name:"觉醒仕",title:"斜走出宫，落地释放 X 形光波",diagrams:[p("出宫斜走",[...c([[1,1],[3,1],[1,3],[3,3]],"move"),...c([[0,0,"宫外"],[4,4,"宫外"]],"path")]),p("X 形伤害",[...c([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")],{pieces:[d(0,0,"卒",{owner:"black",type:"attack"}),d(4,4,"砲",{owner:"black",type:"attack"})]}),p("仕仕合体",[...c([[1,2,"仕"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"仕",{type:"combo"}),d(4,2,"仕",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒仕每次斜走一格，可以出宫，也可以过河。","叠到己方仕时只是叠层，不会触发光波。"]},{title:"光波",items:["仕移动或吃子落地后，会向四条斜线释放 X 形光波。","光波的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["仕仕合体后，顶组层数变高，光波打得更远、伤害更高。","合体后也可以拆出部分层数行动，用小光波试探。"]}]},{piece:"相",name:"觉醒相",title:"无象眼越河，落地释放十字地震",diagrams:[p("斜跳两格",[...c([[0,0],[4,0],[0,4],[4,4]],"move"),...c([[1,1,"无眼"],[3,1,"无眼"]],"path")],{pieces:[d(1,1,"兵",{type:"path"}),d(3,1,"卒",{owner:"black",type:"path"})]}),p("十字伤害",[...c([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")],{pieces:[d(2,0,"卒",{owner:"black",type:"attack"}),d(4,2,"馬",{owner:"black",type:"attack"})]}),p("相相合体",[...c([[1,2,"相"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"相",{type:"combo"}),d(4,2,"相",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒相仍然斜跳两格，但不再检查象眼，也可以过河。","叠到己方相时只是叠层，不会触发地震。"]},{title:"地震",items:["相移动或吃子落地后，会向上下左右释放十字地震。","地震的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["相相合体后，十字地震范围和伤害都会提升。","合体相适合站到中路，用十字线压制大片区域。"]}]},{piece:"帅",name:"觉醒帅",title:"九宫八向，吃子成长，可被车送出宫",diagrams:[p("九宫八向",[...c([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")]),p("吃子成长",[...c([[2,1,"吃"]],"attack"),...c([[2,0,"+1"]],"combo")],{pieces:[d(2,1,"卒",{owner:"black",type:"attack"}),d(2,0,"帅",{layer:2,groups:[2],type:"combo",ghost:!0})]}),p("车送出宫",[...c([[2,4,"車"]],"ally"),...c([[2,3,"撞"],[2,1,"出"]],"skill")],{pieces:[d(2,4,"車",{type:"ally"}),d(2,0,"帅",{type:"skill",ghost:!0})]})],sections:[{title:"怎么走",items:["觉醒帅在九宫内可以向八个方向走一格，但不能自己主动走出九宫。","如果已经被车冲撞送出宫，宫外帅只能上下左右走一格。"]},{title:"成长",items:["帅成功吃掉敌方棋子并站到目标格后，会增加 1 层。","帅不能叠层，成长是帅提升层数的主要方式。"]},{title:"车送出宫",items:["觉醒车可以冲撞己方帅，把帅推出九宫。","被车送出去的帅可以亲自参战，但也会暴露在更危险的位置。"]}]}];function be(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function ee(e){return e==="classic"?"classic":"kw"}function V(e,t=$){return t.reduce((s,a)=>s+be(e[a.id]||0),0)}function K(e=$){return e.reduce((t,s)=>t+s.stars.length,0)}function D(e,t=$){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function fe(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function ye(e,t){const s=$.find(i=>i.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=$.find(i=>i.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function ke(e,t,s="md"){return`<div class="stars stars-${s}">
    ${t.map((a,n)=>`
      <span class="star ${e>>n&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>n&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function x(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function G(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function J(e,t){const s=Q[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>
  </button>`}function $e(e){const t=ee(e.homeMode),s=Q[t],a=$.find(o=>o.id===s.aiLevelId),n=$.find(o=>o.id===s.freeLevelId),i=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-mode-switch" role="group" aria-label="规则模式">
        ${J("classic",t)}
        ${J("kw",t)}
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
          <div><b>${i}</b><span>胜率</span></div>
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
    </section>`}function te(){return $.filter(e=>!e.freePlay)}function we(e,t){return`<div class="challenge-goals">
    ${e.stars.map((s,a)=>`
      <span class="${t>>a&1?"is-earned":""}">${s.desc}</span>
    `).join("")}
  </div>`}function xe(e,t,s){var m,v,g;const a=t[e.id]||0,n=ye(e.id,t),i=fe(e,t),o=e.pieces?e.pieces.map(u=>I[u]):e.piece?[I[e.piece]]:[],r={classic:"传统规则",mixed:"觉醒练习",kw:"科王规则"}[((m=e.config)==null?void 0:m.mode)??"kw"]||"科王规则",l=(v=e.config)!=null&&v.noAi?"双人":`AI ${B(s).label}`;return`
    <button class="challenge-level-card ${i?"is-completed":""} ${n?"":"is-locked"}"
            ${n?`data-select-level="${e.id}"`:"disabled"}
            data-mode="${((g=e.config)==null?void 0:g.mode)??"kw"}">
      <div class="challenge-card-top">
        <span class="challenge-index">${n?e.id:"锁"}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${e.tierName} · ${r} · ${l}</em>
        </div>
        ${o.length?`<div class="challenge-piece-list">${o.map(u=>`<span>${u}</span>`).join("")}</div>`:""}
      </div>
      <p>${e.desc}</p>
      ${we(e,a)}
      <div class="challenge-card-foot">
        ${ke(a,e.stars,"sm")}
        <span>${i?"已通关":n?"可挑战":"先通前关"}</span>
      </div>
    </button>`}function Se(e,t,s,a){const n=te(),i=Math.max(1,Math.ceil(n.length/A)),o=Math.min(Math.max(0,e.levelPage||0),i-1),r=n.slice(o*A,(o+1)*A);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <div>
          <h2>关卡模式</h2>
          <p>全部关卡</p>
        </div>
        <div class="challenge-summary">
          <span><b>${t}/${n.length||q}</b>通关</span>
          <span><b>${s}/${a}</b>总星</span>
        </div>
      </header>
      <div class="challenge-level-list">
        ${r.map(l=>xe(l,e.starsPerLevel,e.settings)).join("")}
      </div>
      <div class="challenge-pager" aria-label="关卡翻页">
        <button type="button" data-level-page="${o-1}" ${o<=0?"disabled":""}>‹</button>
        <span>${o+1} / ${i}</span>
        <button type="button" data-level-page="${o+1}" ${o>=i-1?"disabled":""}>›</button>
      </div>
    </section>`}function Pe(e,t,s,a){const n=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%",i=e.usageStats||{};return`
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
          <div><b>${a}/${q}</b><span>通关</span></div>
          <div><b>${t}/${s}</b><span>星星</span></div>
          <div><b>${e.totalGames||0}</b><span>对局</span></div>
          <div><b>${n}</b><span>胜率</span></div>
        </div>
      </div>
      <div class="info-stats-group">
        <h4>全站热度</h4>
        <div class="modal-stat-grid usage-stat-grid" aria-live="polite">
          <div><b>${x(i.totalPv)}</b><span>访问</span><em>今日 ${x(i.todayPv)}</em></div>
          <div><b>${x(i.totalUv)}</b><span>访客</span><em>今日 ${x(i.todayUv)}</em></div>
          <div><b>${x(i.totalGames)}</b><span>游玩局数</span><em>今日 ${x(i.todayGames)}</em></div>
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
    </article>`}const _e={車:"车",馬:"马",炮:"炮",兵:"兵",仕:"仕",相:"相",帅:"帅",叠:"叠"};function Le(e,t="red"){return t==="red"&&_e[e]||e}function F(e,t){const s=e.owner==="black"?"black":"red",a=Le(e.piece||t.piece,s),n=a==="帅"||a==="将"?"is-king-piece":"",i=Math.max(1,Math.trunc(Number(e.layer)||1)),o=Array.isArray(e.groups)&&e.groups.length?e.groups.map(l=>Math.max(1,Math.trunc(Number(l)||1))):i>1?[i]:[],r=o.length>1?"is-unmerged":"is-merged";return`<span class="rule-piece is-${s} ${n} ${e.ghost?"is-ghost":""}" aria-hidden="true">
    <span class="rule-piece-core">${a}</span>
    ${o.length?`<span class="rule-piece-badges ${r}">
      ${o.map(l=>`<i>${l}</i>`).join("")}
    </span>`:""}
  </span>`}function Ee(e,t){const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map((t.marks||[]).map(r=>[`${r.x},${r.y}`,r])),i=new Map((t.pieces||[]).map(r=>[`${r.x},${r.y}`,r])),o=[];for(let r=0;r<s;r+=1)for(let l=0;l<s;l+=1){const m=n.get(`${l},${r}`),v=i.get(`${l},${r}`),g=l===a.x&&r===a.y,u=m!=null&&m.type?`is-${m.type}`:"",f=v?F(v,e):g&&t.showCenter!==!1?F({piece:t.piece||e.piece,owner:t.centerOwner||"red",layer:t.centerLayer||1,groups:t.centerGroups},e):"";o.push(`<span class="rule-cell ${g?"is-center":""} ${u}">${f}</span>`)}return`<div class="rule-mini-board" style="--board-size:${s}" aria-hidden="true">${o.join("")}</div>`}function Me(e,t){return`
    <div class="rule-diagram">
      ${Ee(e,t)}
      <span>${t.title}</span>
    </div>`}function Ue(e){const t=e.diagrams||(e.diagram?[e.diagram]:[]),s=`diagram-count-${Math.min(t.length,3)}`,a=e.sections||[{title:"规则要点",items:e.lines||[]}];return`
    <article class="rule-card">
      <div class="rule-head">
        <span>${e.piece}</span>
        <div>
          <strong>${e.name}</strong>
          <em>${e.title}</em>
        </div>
      </div>
      <div class="rule-visuals ${s}">${t.map(n=>Me(e,n)).join("")}</div>
      <div class="rule-copy">
        ${a.map(n=>`
          <section>
            <h4>${n.title}</h4>
            <ul>
              ${n.items.map(i=>`<li>${i}</li>`).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
    </article>`}function Ie(e,t=0){const s=e==="kw"?"kw":"classic",a=s==="kw"?he:ve,n=Math.min(a.length-1,Math.max(0,Math.trunc(Number(t)||0))),i=a[n],o=n<=0?a.length-1:n-1,r=n>=a.length-1?0:n+1;return`
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
      <button type="button" data-codex-page="${o}" aria-label="上一页">‹</button>
      <div>
        <b>${n+1} / ${a.length}</b>
        <span>${i.name}</span>
      </div>
      <button type="button" data-codex-page="${r}" aria-label="下一页">›</button>
    </div>
    <section class="rules-panel" aria-label="${s==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid is-paged">
        ${Ue(i)}
      </div>
    </section>`}function Te(e){const t=C(e),s=B(t);return`
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
        ${E.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>${(a.time/1e3).toFixed(a.time%1e3===0?0:1)} 秒</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function N(e,t,s,a){return`
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
    </div>`}function Ce(e,t,s,a){return`
    ${N("author","游戏信息",Pe(e,t,s,a),e.activeHomePanel)}
    ${N("codex","棋子图鉴",Ie(e.codexMode,e.codexPage),e.activeHomePanel)}
    ${N("settings","设置",Te(e.settings),e.activeHomePanel)}`}function z(e){const t=ee(e.homeMode),s=te(),a=V(e.starsPerLevel,s),n=K(s),i=D(e.starsPerLevel,s),o=V(e.starsPerLevel),r=K(),l=D(e.starsPerLevel);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${G("author","游戏信息",e.activeHomePanel)}
          ${G("codex","棋子图鉴",e.activeHomePanel)}
          ${G("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${$e({...e,homeMode:t})}
        ${Se({...e},i,a,n)}
      </main>
      ${Ce(e,o,r,l)}
    </div>`}function Be(e){return`
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
    </div>`}function Ae(e){return`
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
    </div>`}const ae={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function Ge(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Ne(e){return String(e).replace(/"/g,"&quot;")}function Oe(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function He(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([i,o])=>{o&&s.add(i)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(i=>s.add(i)),[...s].filter(i=>ae[i])}function Re(e){const t=He(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=ae[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function je(e,t){var n,i,o,r;const s=new URLSearchParams;if(s.set("levelId",e.id),!((n=e.config)!=null&&n.noAi)){const l=B(t);s.set("ai","1"),s.set("aiTime",String(l.time)),s.set("aiStrength",l.id)}const a=((i=e.config)==null?void 0:i.mode)??"kw";if(s.set("mode",a),a==="classic"&&s.set("classic","1"),a!=="classic"){const l=((o=e.config)==null?void 0:o.playerUpgrades)||{},m=((r=e.config)==null?void 0:r.aiUpgrades)||{},v=Object.keys(l).filter(u=>l[u]).join(","),g=Object.keys(m).filter(u=>m[u]).join(",");v&&s.set("pu",v),g&&s.set("au",g)}return`./index-legacy.html?${s.toString()}`}function Ve(e){var y,k,h;const t=Z(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=Ge(s),n=t.stars.length,i=t.pieces?t.pieces.map(L=>I[L]).join(" "):t.piece?I[t.piece]:"",o=B(e.settings),r=je(t,e.settings),l=o.label,m=!((y=t.config)!=null&&y.noAi)&&l,v={classic:"传统",mixed:"觉醒",kw:"科王"}[((k=t.config)==null?void 0:k.mode)??"kw"]||"科王",g=t.freePlay?"双人":"红方",u=t.freePlay?'<span class="game-header-badge">自由对弈</span>':m?`<span class="game-header-badge game-header-ai">AI · ${l}</span>`:'<span class="game-header-badge">双人对局</span>',f=(h=t.tutorial)!=null&&h.length?t.tutorial[0].text:"";return`
    <div class="game-page">
      <!-- ── 页头：关卡名 + AI强度 + 星星 ── -->
      <div class="game-header">
        <div class="game-header-main">
          <button class="btn-back btn-back-game" data-action="back-to-menu">&larr; 返回</button>
          <div class="game-header-title">
            ${i?`<span class="game-header-piece">${i}</span>`:""}
            <div class="game-header-text">
              <span class="game-header-name">${t.name}</span>
              <span class="game-header-desc">${t.desc}</span>
            </div>
            ${u}
          </div>
          <div class="game-header-stars">
            ${t.stars.map((L,H)=>`<span class="star ${s>>H&1?"star-earned":"star-empty"}">${s>>H&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${n}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${v}</span>
          <span class="game-status-chip">${m?`AI ${l}`:g}</span>
          <span class="game-status-chip">目标 ${a}/${n}</span>
          <span class="game-status-chip">${t.freePlay?"练习局":"闯关局"}</span>
        </div>
      </div>

      <div class="game-layout">
        <!-- 棋盘区域 -->
        <div class="game-board-area">
          <iframe
            id="game-iframe"
            src="${r}"
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
                 data-default="${Ne(f)}">${f||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${Re(t)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${Oe(s,t.stars)}
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
    </div>`}function Ke(e){switch(e.screen){case"menu":return z(e);case"levels":return Be();case"upgrade":return Ae();case"game":return Ve(e);default:return z(e)}}function De(e){const t=ue();function s(){const a=t.getState();e.dataset.screen=a.screen,e.innerHTML=Ke(a)}t.subscribe(s),ce().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{const n=a.target;if(!(n instanceof HTMLElement))return;const i=n.closest("[data-home-panel]");if(i){const h=i.dataset.homePanel;t.dispatch("toggle-home-panel",{panel:h});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){t.dispatch("close-home-panels");return}const o=n.closest("[data-codex-mode]");if(o){t.dispatch("set-codex-mode",{mode:o.dataset.codexMode});return}const r=n.closest("[data-codex-page]");if(r){t.dispatch("set-codex-page",{page:r.dataset.codexPage});return}const l=n.closest("[data-home-mode]");if(l){t.dispatch("set-home-mode",{mode:l.dataset.homeMode});return}const m=n.closest("[data-level-page]");if(m){t.dispatch("set-level-page",{page:m.dataset.levelPage});return}const v=n.closest("[data-setting-ai]");if(v){t.dispatch("update-settings",{aiStrength:v.dataset.settingAi});return}const g=n.closest("[data-navigate]");if(g){t.dispatch("navigate",{screen:g.dataset.navigate});return}const u=n.closest("[data-select-level]");if(u){const h=parseInt(u.dataset.selectLevel,10);isNaN(h)||t.dispatch("select-level",{levelId:h});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const y=n.closest("[data-action]");if(y){const h=y.dataset.action;if(h==="back-to-menu"||h==="back-to-levels"){t.dispatch(h);return}}const k=n.closest("[data-toggle-upgrade]");if(k){t.dispatch("toggle-upgrade",{pieceType:k.dataset.toggleUpgrade});return}}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const i=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${i}%`);const o=n.closest(".sound-slider-row"),r=o==null?void 0:o.querySelector("[data-setting-value]");r&&(r.textContent=`${i}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const i=n.dataset.settingToggle;if(i){t.dispatch("update-settings",{[i]:n.checked});return}const o=n.dataset.settingRange;o&&t.dispatch("update-settings",{[o]:n.value})}),window.addEventListener("keydown",a=>{a.key==="Escape"&&t.dispatch("close-home-panels")}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const i=Z(n.currentLevel);if(i){if(a.data.type==="piece-selected"){const o=document.getElementById("hint-display");if(!o)return;const r=a.data.hint;if(r)o.textContent=r,o.classList.remove("hint-empty");else{const l=o.dataset.default||"";o.textContent=l||"选择棋子查看走法",o.classList.toggle("hint-empty",!l)}return}if(a.data.type==="game-progress"){const o=a.data.stats||{},r=n.starsPerLevel[i.id]||0,l=document.getElementById("star-goal-list");if(l&&(l.innerHTML=i.stars.map((u,f)=>{const y=r>>f&1,k=!!(u.eval&&u.eval(o)),h=y||k;return`<div class="star-goal ${h?"star-goal-earned":""}">
            <span class="star-goal-icon">${h?"★":"☆"}</span>
            <span class="star-goal-desc">${u.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const u=a.data.redPct,f=100-u,y=document.getElementById("outer-red-pct"),k=document.getElementById("outer-blk-pct"),h=document.getElementById("outer-fill-red"),L=document.getElementById("outer-advantage");y&&(y.textContent=u+"%"),k&&(k.textContent=f+"%"),h&&(h.style.width=u+"%"),L&&a.data.advantage&&(L.textContent=a.data.advantage)}const m=document.getElementById("outer-cap-red"),v=document.getElementById("outer-cap-black");m&&a.data.capturedRed!==void 0&&(m.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(u=>`<span class="cap-item red">${u}</span>`).join(""):'<span class="cap-empty">—</span>'),v&&a.data.capturedBlack!==void 0&&(v.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(u=>`<span class="cap-item blk">${u}</span>`).join(""):'<span class="cap-empty">—</span>');const g=document.getElementById("outer-move-log");g&&a.data.moves!==void 0&&(a.data.moves.length===0?g.innerHTML='<span class="log-empty">对局尚未开始</span>':(g.innerHTML=a.data.moves.map(u=>`<div class="log-entry ${u.side==="red"?"log-red":"log-blk"}">${u.text}</div>`).join(""),g.scrollTop=g.scrollHeight));return}if(a.data.type==="game-end"){const o=a.data.stats||{};let r=0;i.stars.forEach((l,m)=>{l.eval&&l.eval(o)&&(r|=1<<m)}),t.dispatch("game-result",{newStarBits:r,win:!!o.win}),re().then(({stats:l,status:m})=>{t.dispatch("usage-stats-updated",{stats:l,status:m})}).catch(l=>{console.warn("全站游玩统计失败:",l),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}),s()}const se=document.querySelector("#app");if(!se)throw new Error("#app container not found");De(se);
