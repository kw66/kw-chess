(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const L={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},ee="https://ypefmpeekfucmarbbdov.supabase.co",N="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",v={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day"};function b(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function te(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0}}function ae(e){const t=e&&typeof e=="object"?e:{};return{totalPv:b(t.totalPv),totalUv:b(t.totalUv),totalGames:b(t.totalGames),todayPv:b(t.todayPv),todayUv:b(t.todayUv),todayGames:b(t.todayGames)}}async function se(){const e=J();return e&&await ie(),{stats:await A(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function ne(){if(!J())return{stats:await A(),status:"本地预览不会写入全站统计。"};const e=U();return await Promise.all([$(v.totalGames),$(w(v.dailyGamesPrefix,e))]),{stats:await A(),status:"游玩局数已同步。"}}async function ie(){const e=U();await Promise.all([$(v.totalPv),$(w(v.dailyPvPrefix,e))]);const t=localStorage.getItem(L.statsVisitor)==="true",s=localStorage.getItem(L.statsLastUvDate),a=[];t||(a.push($(v.totalUv)),localStorage.setItem(L.statsVisitor,"true")),s!==e&&(a.push($(w(v.dailyUvPrefix,e))),localStorage.setItem(L.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function A(){const e=U(),t=w(v.dailyPvPrefix,e),s=w(v.dailyUvPrefix,e),a=w(v.dailyGamesPrefix,e),n=await oe([v.totalPv,v.totalUv,v.totalGames,t,s,a]);return ae({totalPv:n[v.totalPv],totalUv:n[v.totalUv],totalGames:n[v.totalGames],todayPv:n[t],todayUv:n[s],todayGames:n[a]})}async function $(e){return D("increment_counter",{counter_id:e})}async function oe(e){const t=await D("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=b(a.count));return s}async function D(e,t){const s=await fetch(`${ee}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:N,Authorization:`Bearer ${N}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function J(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function w(e,t=U()){return`${e}_${t.replaceAll("-","")}`}function U(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const k={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"normal"},_=[{id:"entry",label:"入门",time:300,note:"快速落子，适合熟悉规则。"},{id:"easy",label:"初级",time:700,note:"会看吃子与基础防守。"},{id:"normal",label:"中级",time:1300,note:"兼顾布局、叠层和攻防。"},{id:"hard",label:"高级",time:2400,note:"搜索更久，压迫感更强。"}];function H(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function I(e){const t=e&&typeof e=="object"?e:{},s=_.some(a=>a.id===t.aiStrength)?t.aiStrength:k.aiStrength;return{sfxEnabled:t.sfxEnabled??k.sfxEnabled,sfxVolume:H(t.sfxVolume,k.sfxVolume),bgmEnabled:t.bgmEnabled??k.bgmEnabled,bgmVolume:H(t.bgmVolume,k.bgmVolume),aiStrength:s}}function T(e){const t=I(e);return _.find(s=>s.id===t.aiStrength)||_.find(s=>s.id===k.aiStrength)||_[0]}const F="kw-chess-save";function le(){try{const e=localStorage.getItem(F);return e?JSON.parse(e):null}catch{return null}}function P(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(F,JSON.stringify(t))}catch{}}function re(){const e=le();return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,usageStats:te(),usageStatsStatus:"全站统计读取中。",settings:I(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"classic",homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,currentLevel:null}}function ce(){let e=re();const t=new Set;function s(){return e}function a(i){const r=typeof i=="function"?i(e):i;e={...e,...r},t.forEach(l=>l(e))}function n(i){return t.add(i),()=>t.delete(i)}function o(i,r={}){switch(i){case"navigate":a({screen:r.screen});break;case"usage-stats-updated":a({usageStats:r.stats??e.usageStats,usageStatsStatus:r.status??e.usageStatsStatus});break;case"toggle-home-panel":{const l=r.panel||null;a({activeHomePanel:e.activeHomePanel===l?null:l});break}case"open-home-panel":a({activeHomePanel:r.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:r.mode==="kw"?"kw":"classic"});break;case"set-home-mode":{const l=r.mode==="classic"?"classic":"kw";a({homeMode:l}),P({...e,homeMode:l});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(r.page)||0))});break;case"update-settings":{const l=I({...e.settings,...r});a({settings:l}),P({...e,settings:l});break}case"select-level":a({screen:"game",currentLevel:r.levelId});break;case"back-to-menu":a({screen:"menu",currentLevel:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null});break;case"toggle-upgrade":{const{pieceType:l}=r,c={...e.pieceUpgrades};c[l]?delete c[l]:c[l]=!0,a({pieceUpgrades:c}),P({...e,pieceUpgrades:c});break}case"game-result":{const{newStarBits:l,win:c}=r,m=e.currentLevel,p={...e.starsPerLevel};p[m]=(p[m]||0)|(l||0);const d={starsPerLevel:p,totalWins:e.totalWins+(c?1:0),totalGames:e.totalGames+1};a(d),P({...e,...d});break}default:console.warn(`[Store] 未知 action: ${i}`)}}return{getState:s,setState:a,subscribe:n,dispatch:o}}const E={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},de=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，无限连踩，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，击杀后连踩不停，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮无需炮架即可隔空轰击敌方棋子。"}]},{id:5,name:"自爆",desc:"八方移动，九宫自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可八方移动，同类合体增强，还能自爆与敌同归于尽。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],h=de.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function z(e){return h.find(t=>t.id===e)||null}const W=h.filter(e=>!e.freePlay).length,Y={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"全员觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},M=3,pe=[{piece:"車",name:"车",title:"横竖直线",diagram:{marks:[{x:2,y:0,type:"move"},{x:2,y:1,type:"move"},{x:2,y:3,type:"move"},{x:2,y:4,type:"move"},{x:0,y:2,type:"move"},{x:1,y:2,type:"move"},{x:3,y:2,type:"move"},{x:4,y:2,type:"move"}]},lines:["横线或竖线走任意格。","中间不能有棋子挡路，终点有敌子就吃。"]},{piece:"馬",name:"马",title:"日字跳跃",diagram:{marks:[{x:0,y:1,type:"move"},{x:0,y:3,type:"move"},{x:1,y:0,type:"move"},{x:1,y:4,type:"move"},{x:3,y:0,type:"move"},{x:3,y:4,type:"move"},{x:4,y:1,type:"move"},{x:4,y:3,type:"move"},{x:2,y:1,type:"block",label:"腿"},{x:3,y:2,type:"block",label:"腿"}]},lines:["走“日”字：一横一斜，或一竖一斜。","马腿位置有棋子时，对应方向不能跳。"]},{piece:"炮",name:"炮",title:"隔子打击",diagram:{marks:[{x:3,y:2,type:"block",label:"架"},{x:4,y:2,type:"attack",label:"吃"},{x:2,y:0,type:"move"},{x:2,y:1,type:"move"},{x:0,y:2,type:"move"},{x:1,y:2,type:"move"}]},lines:["不吃子时像车一样横竖直走。","吃子时必须隔一个棋子当炮架。"]},{piece:"兵",name:"兵",title:"过河推进",diagram:{marks:[{x:2,y:1,type:"move",label:"进"},{x:1,y:2,type:"move",label:"河"},{x:3,y:2,type:"move",label:"河"}]},lines:["未过河只能向前走一格。","过河后可以向前或左右走一格，不能后退。"]},{piece:"仕",name:"仕",title:"九宫斜守",diagram:{marks:[{x:1,y:1,type:"move"},{x:3,y:1,type:"move"},{x:1,y:3,type:"move"},{x:3,y:3,type:"move"}]},lines:["只能在九宫内活动。","每次斜走一格，主要负责守帅。"]},{piece:"相",name:"相",title:"田字防线",diagram:{marks:[{x:0,y:0,type:"move"},{x:4,y:0,type:"move"},{x:0,y:4,type:"move"},{x:4,y:4,type:"move"},{x:1,y:1,type:"block",label:"眼"},{x:3,y:1,type:"block",label:"眼"}]},lines:["沿对角线走两格，也就是“田”字。","不能过河；象眼有棋子时不能走。"]},{piece:"帅",name:"帅",title:"九宫主将",diagram:{marks:[{x:2,y:1,type:"move"},{x:1,y:2,type:"move"},{x:3,y:2,type:"move"},{x:2,y:3,type:"move"},{x:2,y:0,type:"attack",label:"将"}]},lines:["只能在九宫内横竖走一格。","两帅中间无遮挡时不能直接照面。"]}],me=[{piece:"車",name:"觉醒车",title:"冲撞运输",diagram:{center:{x:1,y:2},marks:[{x:2,y:2,type:"move"},{x:3,y:2,type:"ally",label:"友"},{x:4,y:2,type:"skill",label:"推"},{x:1,y:0,type:"move"},{x:1,y:1,type:"move"},{x:1,y:3,type:"move"},{x:1,y:4,type:"move"}]},lines:["保留传统车的横竖直线移动。","同线对准友方异类棋子时，可把它沿方向推出去。","同类车可以叠层，双击后合体。"]},{piece:"馬",name:"觉醒马",title:"十二方跳",diagram:{marks:[{x:0,y:1,type:"move"},{x:0,y:3,type:"move"},{x:1,y:0,type:"move"},{x:1,y:4,type:"move"},{x:3,y:0,type:"move"},{x:3,y:4,type:"move"},{x:4,y:1,type:"move"},{x:4,y:3,type:"move"},{x:2,y:0,type:"skill"},{x:4,y:2,type:"skill"},{x:2,y:4,type:"skill"},{x:0,y:2,type:"skill"}]},lines:["可向十二个落点跳跃，不受蹩马腿限制。","吃子后还能继续连踩，借友方落点扩大追击路线。"]},{piece:"炮",name:"觉醒炮",title:"翻山远袭",diagram:{center:{x:1,y:2},marks:[{x:2,y:2,type:"block",label:"架"},{x:3,y:2,type:"block",label:"架"},{x:4,y:2,type:"attack",label:"吃"},{x:1,y:0,type:"move"},{x:1,y:1,type:"move"},{x:1,y:3,type:"move"},{x:1,y:4,type:"move"}]},lines:["移动仍沿横竖线。","远袭时可以利用连续棋子段当炮架，压制更自由。","同类炮可以叠层并合体。"]},{piece:"兵",name:"觉醒兵",title:"四向与爆破",diagram:{marks:[{x:2,y:1,type:"move"},{x:1,y:2,type:"move"},{x:3,y:2,type:"move"},{x:2,y:3,type:"move"},{x:1,y:1,type:"skill",label:"爆"},{x:3,y:1,type:"skill",label:"爆"},{x:1,y:3,type:"skill",label:"爆"},{x:3,y:3,type:"skill",label:"爆"}]},lines:["可向上下左右移动一格。","同类叠层上限 5，叠层后自动合体。","可自爆，爆炸半径等于层数，兵能连锁引爆。"]},{piece:"仕",name:"觉醒仕",title:"出宫光波",diagram:{marks:[{x:1,y:1,type:"move"},{x:3,y:1,type:"move"},{x:1,y:3,type:"move"},{x:3,y:3,type:"move"},{x:0,y:0,type:"skill",label:"波"},{x:4,y:0,type:"skill",label:"波"},{x:0,y:4,type:"skill",label:"波"},{x:4,y:4,type:"skill",label:"波"}]},lines:["可以出宫并过河，斜走参与进攻。","落地触发 X 形光波，范围和伤害取顶组合体层数。"]},{piece:"相",name:"觉醒相",title:"越河地震",diagram:{marks:[{x:0,y:0,type:"move"},{x:4,y:0,type:"move"},{x:0,y:4,type:"move"},{x:4,y:4,type:"move"},{x:2,y:0,type:"skill",label:"震"},{x:4,y:2,type:"skill",label:"震"},{x:2,y:4,type:"skill",label:"震"},{x:0,y:2,type:"skill",label:"震"}]},lines:["斜跳两格，无象眼限制，也可以过河。","落地触发十字地震波，范围和伤害取顶组合体层数。"]},{piece:"帅",name:"觉醒帅",title:"亲征成长",diagram:{marks:[{x:1,y:1,type:"move"},{x:2,y:1,type:"move"},{x:3,y:1,type:"move"},{x:1,y:2,type:"move"},{x:3,y:2,type:"move"},{x:1,y:3,type:"move"},{x:2,y:3,type:"move"},{x:3,y:3,type:"move"},{x:2,y:0,type:"skill",label:"出"}]},lines:["九宫内可八方向走一格；出宫后横竖走一格。","吃子后成长 +1，可被觉醒车冲撞送出宫。","王不能叠层。"]},{piece:"合",name:"叠层合体",title:"同类强化",diagram:{marks:[{x:1,y:2,type:"ally",label:"同"},{x:2,y:2,type:"skill",label:"合"},{x:3,y:2,type:"ally",label:"同"},{x:2,y:1,type:"skill",label:"+层"},{x:2,y:3,type:"skill",label:"拆"}]},lines:["同类觉醒棋子可叠层，双击可合体。","合体后可以拆分，层数会影响爆炸、光波和地震。","兵叠层后自动合体，王不能叠层。"]}];function ue(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Z(e){return e==="classic"?"classic":"kw"}function O(e,t=h){return t.reduce((s,a)=>s+ue(e[a.id]||0),0)}function R(e=h){return e.reduce((t,s)=>t+s.stars.length,0)}function j(e,t=h){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function ve(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function ge(e,t){const s=h.find(o=>o.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=h.find(o=>o.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function ye(e,t,s="md"){return`<div class="stars stars-${s}">
    ${t.map((a,n)=>`
      <span class="star ${e>>n&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>n&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function x(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function B(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function V(e,t){const s=Y[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>
  </button>`}function he(e){const t=Z(e.homeMode),s=Y[t],a=h.find(i=>i.id===s.aiLevelId),n=h.find(i=>i.id===s.freeLevelId),o=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-mode-switch" role="group" aria-label="规则模式">
        ${V("classic",t)}
        ${V("kw",t)}
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
    </section>`}function q(){return h.filter(e=>!e.freePlay)}function fe(e,t){return`<div class="challenge-goals">
    ${e.stars.map((s,a)=>`
      <span class="${t>>a&1?"is-earned":""}">${s.desc}</span>
    `).join("")}
  </div>`}function be(e,t,s){var c,m,p;const a=t[e.id]||0,n=ge(e.id,t),o=ve(e,t),i=e.pieces?e.pieces.map(d=>E[d]):e.piece?[E[e.piece]]:[],r={classic:"传统规则",mixed:"觉醒练习",kw:"科王规则"}[((c=e.config)==null?void 0:c.mode)??"kw"]||"科王规则",l=(m=e.config)!=null&&m.noAi?"双人":`AI ${T(s).label}`;return`
    <button class="challenge-level-card ${o?"is-completed":""} ${n?"":"is-locked"}"
            ${n?`data-select-level="${e.id}"`:"disabled"}
            data-mode="${((p=e.config)==null?void 0:p.mode)??"kw"}">
      <div class="challenge-card-top">
        <span class="challenge-index">${n?e.id:"锁"}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${e.tierName} · ${r} · ${l}</em>
        </div>
        ${i.length?`<div class="challenge-piece-list">${i.map(d=>`<span>${d}</span>`).join("")}</div>`:""}
      </div>
      <p>${e.desc}</p>
      ${fe(e,a)}
      <div class="challenge-card-foot">
        ${ye(a,e.stars,"sm")}
        <span>${o?"已通关":n?"可挑战":"先通前关"}</span>
      </div>
    </button>`}function xe(e,t,s,a){const n=q(),o=Math.max(1,Math.ceil(n.length/M)),i=Math.min(Math.max(0,e.levelPage||0),o-1),r=n.slice(i*M,(i+1)*M);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <div>
          <h2>关卡模式</h2>
          <p>全部关卡</p>
        </div>
        <div class="challenge-summary">
          <span><b>${t}/${n.length||W}</b>通关</span>
          <span><b>${s}/${a}</b>总星</span>
        </div>
      </header>
      <div class="challenge-level-list">
        ${r.map(l=>be(l,e.starsPerLevel,e.settings)).join("")}
      </div>
      <div class="challenge-pager" aria-label="关卡翻页">
        <button type="button" data-level-page="${i-1}" ${i<=0?"disabled":""}>‹</button>
        <span>${i+1} / ${o}</span>
        <button type="button" data-level-page="${i+1}" ${i>=o-1?"disabled":""}>›</button>
      </div>
    </section>`}function ke(e,t,s,a){const n=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"新局",o=e.usageStats||{};return`
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
          <div><b>${a}/${W}</b><span>通关</span></div>
          <div><b>${t}/${s}</b><span>星星</span></div>
          <div><b>${e.totalGames||0}</b><span>对局</span></div>
          <div><b>${n}</b><span>胜率</span></div>
        </div>
      </div>
      <div class="info-stats-group">
        <h4>全站热度</h4>
        <div class="modal-stat-grid usage-stat-grid" aria-live="polite">
          <div><b>${x(o.totalPv)}</b><span>访问</span><em>今日 ${x(o.todayPv)}</em></div>
          <div><b>${x(o.totalUv)}</b><span>访客</span><em>今日 ${x(o.todayUv)}</em></div>
          <div><b>${x(o.totalGames)}</b><span>游玩局数</span><em>今日 ${x(o.todayGames)}</em></div>
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
    </article>`}function $e(e){const t=e.diagram||{},s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map((t.marks||[]).map(i=>[`${i.x},${i.y}`,i])),o=[];for(let i=0;i<s;i+=1)for(let r=0;r<s;r+=1){const l=n.get(`${r},${i}`),c=r===a.x&&i===a.y,m=l!=null&&l.type?`is-${l.type}`:"",p=c?`<b>${t.piece||e.piece}</b>`:(l==null?void 0:l.label)||"";o.push(`<span class="rule-cell ${c?"is-center":""} ${m}">${p}</span>`)}return`<div class="rule-mini-board" style="--board-size:${s}" aria-hidden="true">${o.join("")}</div>`}function we(e){return`
    <article class="rule-card">
      <div class="rule-visual">${$e(e)}</div>
      <div class="rule-copy">
        <div class="rule-head">
          <span>${e.piece}</span>
          <div>
            <strong>${e.name}</strong>
            <em>${e.title}</em>
          </div>
        </div>
        <ul>
          ${e.lines.map(t=>`<li>${t}</li>`).join("")}
        </ul>
      </div>
    </article>`}function Se(e){const t=e==="kw"?"kw":"classic";return`
    <div class="rules-switch" role="group" aria-label="棋子图鉴分类">
      <button type="button" data-codex-mode="classic" class="${t==="classic"?"is-active":""}" aria-pressed="${t==="classic"}">传统象棋</button>
      <button type="button" data-codex-mode="kw" class="${t==="kw"?"is-active":""}" aria-pressed="${t==="kw"}">科王象棋</button>
    </div>
    <section class="rules-panel" aria-label="${t==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid">
        ${(t==="kw"?me:pe).map(we).join("")}
      </div>
    </section>`}function _e(e){const t=I(e),s=T(t);return`
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
        ${_.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>${(a.time/1e3).toFixed(a.time%1e3===0?0:1)} 秒</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function C(e,t,s,a){return`
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
    </div>`}function Le(e,t,s,a){return`
    ${C("author","游戏信息",ke(e,t,s,a),e.activeHomePanel)}
    ${C("codex","棋子图鉴",Se(e.codexMode),e.activeHomePanel)}
    ${C("settings","设置",_e(e.settings),e.activeHomePanel)}`}function K(e){const t=Z(e.homeMode),s=q(),a=O(e.starsPerLevel,s),n=R(s),o=j(e.starsPerLevel,s),i=O(e.starsPerLevel),r=R(),l=j(e.starsPerLevel);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${B("author","游戏信息",e.activeHomePanel)}
          ${B("codex","棋子图鉴",e.activeHomePanel)}
          ${B("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${he({...e,homeMode:t})}
        ${xe({...e},o,a,n)}
      </main>
      ${Le(e,i,r,l)}
    </div>`}function Pe(e){return`
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
    </div>`}function Ee(e){return`
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
    </div>`}const X={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function Ue(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function Ie(e){return String(e).replace(/"/g,"&quot;")}function Te(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function Me(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([o,i])=>{i&&s.add(o)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(o=>s.add(o)),[...s].filter(o=>X[o])}function Be(e){const t=Me(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=X[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function Ce(e,t){var n,o,i,r;const s=new URLSearchParams;if(s.set("levelId",e.id),!((n=e.config)!=null&&n.noAi)){const l=T(t);s.set("ai","1"),s.set("aiTime",String(l.time)),s.set("aiStrength",l.id)}const a=((o=e.config)==null?void 0:o.mode)??"kw";if(s.set("mode",a),a==="classic"&&s.set("classic","1"),a!=="classic"){const l=((i=e.config)==null?void 0:i.playerUpgrades)||{},c=((r=e.config)==null?void 0:r.aiUpgrades)||{},m=Object.keys(l).filter(d=>l[d]).join(","),p=Object.keys(c).filter(d=>c[d]).join(",");m&&s.set("pu",m),p&&s.set("au",p)}return`./index-legacy.html?${s.toString()}`}function Ae(e){var y,u,f;const t=z(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=Ue(s),n=t.stars.length,o=t.pieces?t.pieces.map(S=>E[S]).join(" "):t.piece?E[t.piece]:"",i=T(e.settings),r=Ce(t,e.settings),l=i.label,c=!((y=t.config)!=null&&y.noAi)&&l,m={classic:"传统",mixed:"觉醒",kw:"科王"}[((u=t.config)==null?void 0:u.mode)??"kw"]||"科王",p=t.freePlay?"双人":"红方",d=t.freePlay?'<span class="game-header-badge">自由对弈</span>':c?`<span class="game-header-badge game-header-ai">AI · ${l}</span>`:'<span class="game-header-badge">双人对局</span>',g=(f=t.tutorial)!=null&&f.length?t.tutorial[0].text:"";return`
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
            ${d}
          </div>
          <div class="game-header-stars">
            ${t.stars.map((S,G)=>`<span class="star ${s>>G&1?"star-earned":"star-empty"}">${s>>G&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${n}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${m}</span>
          <span class="game-status-chip">${c?`AI ${l}`:p}</span>
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
            <div class="hint-display ${g?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${Ie(g)}">${g||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${Be(t)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${Te(s,t.stars)}
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
    </div>`}function Ge(e){switch(e.screen){case"menu":return K(e);case"levels":return Pe();case"upgrade":return Ee();case"game":return Ae(e);default:return K(e)}}function Ne(e){const t=ce();function s(){const a=t.getState();e.dataset.screen=a.screen,e.innerHTML=Ge(a)}t.subscribe(s),se().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{const n=a.target;if(!(n instanceof HTMLElement))return;const o=n.closest("[data-home-panel]");if(o){const u=o.dataset.homePanel;t.dispatch("toggle-home-panel",{panel:u});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){t.dispatch("close-home-panels");return}const i=n.closest("[data-codex-mode]");if(i){t.dispatch("set-codex-mode",{mode:i.dataset.codexMode});return}const r=n.closest("[data-home-mode]");if(r){t.dispatch("set-home-mode",{mode:r.dataset.homeMode});return}const l=n.closest("[data-level-page]");if(l){t.dispatch("set-level-page",{page:l.dataset.levelPage});return}const c=n.closest("[data-setting-ai]");if(c){t.dispatch("update-settings",{aiStrength:c.dataset.settingAi});return}const m=n.closest("[data-navigate]");if(m){t.dispatch("navigate",{screen:m.dataset.navigate});return}const p=n.closest("[data-select-level]");if(p){const u=parseInt(p.dataset.selectLevel,10);isNaN(u)||t.dispatch("select-level",{levelId:u});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const g=n.closest("[data-action]");if(g){const u=g.dataset.action;if(u==="back-to-menu"||u==="back-to-levels"){t.dispatch(u);return}}const y=n.closest("[data-toggle-upgrade]");if(y){t.dispatch("toggle-upgrade",{pieceType:y.dataset.toggleUpgrade});return}}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const o=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${o}%`);const i=n.closest(".sound-slider-row"),r=i==null?void 0:i.querySelector("[data-setting-value]");r&&(r.textContent=`${o}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const o=n.dataset.settingToggle;if(o){t.dispatch("update-settings",{[o]:n.checked});return}const i=n.dataset.settingRange;i&&t.dispatch("update-settings",{[i]:n.value})}),window.addEventListener("keydown",a=>{a.key==="Escape"&&t.dispatch("close-home-panels")}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const o=z(n.currentLevel);if(o){if(a.data.type==="piece-selected"){const i=document.getElementById("hint-display");if(!i)return;const r=a.data.hint;if(r)i.textContent=r,i.classList.remove("hint-empty");else{const l=i.dataset.default||"";i.textContent=l||"选择棋子查看走法",i.classList.toggle("hint-empty",!l)}return}if(a.data.type==="game-progress"){const i=a.data.stats||{},r=n.starsPerLevel[o.id]||0,l=document.getElementById("star-goal-list");if(l&&(l.innerHTML=o.stars.map((d,g)=>{const y=r>>g&1,u=!!(d.eval&&d.eval(i)),f=y||u;return`<div class="star-goal ${f?"star-goal-earned":""}">
            <span class="star-goal-icon">${f?"★":"☆"}</span>
            <span class="star-goal-desc">${d.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const d=a.data.redPct,g=100-d,y=document.getElementById("outer-red-pct"),u=document.getElementById("outer-blk-pct"),f=document.getElementById("outer-fill-red"),S=document.getElementById("outer-advantage");y&&(y.textContent=d+"%"),u&&(u.textContent=g+"%"),f&&(f.style.width=d+"%"),S&&a.data.advantage&&(S.textContent=a.data.advantage)}const c=document.getElementById("outer-cap-red"),m=document.getElementById("outer-cap-black");c&&a.data.capturedRed!==void 0&&(c.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(d=>`<span class="cap-item red">${d}</span>`).join(""):'<span class="cap-empty">—</span>'),m&&a.data.capturedBlack!==void 0&&(m.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(d=>`<span class="cap-item blk">${d}</span>`).join(""):'<span class="cap-empty">—</span>');const p=document.getElementById("outer-move-log");p&&a.data.moves!==void 0&&(a.data.moves.length===0?p.innerHTML='<span class="log-empty">对局尚未开始</span>':(p.innerHTML=a.data.moves.map(d=>`<div class="log-entry ${d.side==="red"?"log-red":"log-blk"}">${d.text}</div>`).join(""),p.scrollTop=p.scrollHeight));return}if(a.data.type==="game-end"){const i=a.data.stats||{};let r=0;o.stars.forEach((l,c)=>{l.eval&&l.eval(i)&&(r|=1<<c)}),t.dispatch("game-result",{newStarBits:r,win:!!i.win}),ne().then(({stats:l,status:c})=>{t.dispatch("usage-stats-updated",{stats:l,status:c})}).catch(l=>{console.warn("全站游玩统计失败:",l),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}),s()}const Q=document.querySelector("#app");if(!Q)throw new Error("#app container not found");Ne(Q);
