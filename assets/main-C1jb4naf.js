(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const G={statsVisitor:"kwChess.stats.visitor",statsLastUvDate:"kwChess.stats.lastUvDate"},Se="https://ypefmpeekfucmarbbdov.supabase.co",ne="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8",f={totalPv:"kw_chess_pv_total",totalUv:"kw_chess_uv_total",totalGames:"kw_chess_game_total",dailyPvPrefix:"kw_chess_pv_day",dailyUvPrefix:"kw_chess_uv_day",dailyGamesPrefix:"kw_chess_game_day",survivalMoves:"kw_chess_survival_moves_total",survivalGames:"kw_chess_survival_games_total",survivalMovePrefix:"kw_chess_survival_moves",survivalGamePrefix:"kw_chess_survival_games",killPrefix:"kw_chess_kill"},x=[{type:"R",label:"车"},{type:"H",label:"马"},{type:"C",label:"炮"},{type:"P",label:"兵"},{type:"A",label:"仕"},{type:"B",label:"相"},{type:"K",label:"帅"}];function $(e,t=0,s=99999999){const a=Number(e);return Number.isFinite(a)?Math.min(s,Math.max(t,Math.trunc(a))):t}function Me(){return{totalPv:0,totalUv:0,totalGames:0,todayPv:0,todayUv:0,todayGames:0,killsByType:ve(),survivalByType:Be(),survivalMoves:0,survivalGames:0,avgSurvivalMoves:0}}function Pe(e){const t=e&&typeof e=="object"?e:{},s=$(t.survivalMoves),a=$(t.survivalGames);return{totalPv:$(t.totalPv),totalUv:$(t.totalUv),totalGames:$(t.totalGames),todayPv:$(t.todayPv),todayUv:$(t.todayUv),todayGames:$(t.todayGames),killsByType:C(t.killsByType),survivalByType:U(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0}}async function _e(){const e=me();return e&&await Te(),{stats:await D(),status:e?"全站统计已同步。":"本地预览不会写入全站统计。"}}async function Le(e={}){if(!me())return{stats:await D(),status:"本地预览不会写入全站统计。"};const t=N(),s=[w(f.totalGames),w(E(f.dailyGamesPrefix,t))],a=C(e.redKillsByType);for(const i of x){const l=a[i.type]||0;for(let p=0;p<l;p+=1)s.push(w(z(i.type)))}const n=$(e.totalMoves,0,300);if(n>0){s.push(w(f.survivalGames));for(let i=0;i<n;i+=1)s.push(w(f.survivalMoves))}const o=U(e.redSurvivalByType);for(const i of x){const l=o[i.type],p=$(l.games,0,16),v=p>0?$(Math.round(l.moves/p),0,300):0;p>0&&s.push(w(J(i.type)));for(let h=0;h<v;h+=1)s.push(w(F(i.type)))}return await Promise.all(s),{stats:await D(),status:"游玩局数已同步。"}}async function Te(){const e=N();await Promise.all([w(f.totalPv),w(E(f.dailyPvPrefix,e))]);const t=localStorage.getItem(G.statsVisitor)==="true",s=localStorage.getItem(G.statsLastUvDate),a=[];t||(a.push(w(f.totalUv)),localStorage.setItem(G.statsVisitor,"true")),s!==e&&(a.push(w(E(f.dailyUvPrefix,e))),localStorage.setItem(G.statsLastUvDate,e)),a.length&&await Promise.all(a)}async function D(){const e=N(),t=E(f.dailyPvPrefix,e),s=E(f.dailyUvPrefix,e),a=E(f.dailyGamesPrefix,e),n=x.map(v=>z(v.type)),o=x.map(v=>F(v.type)),r=x.map(v=>J(v.type)),i=await Ee([f.totalPv,f.totalUv,f.totalGames,f.survivalMoves,f.survivalGames,t,s,a,...n,...o,...r]),l={},p={};return x.forEach(v=>{l[v.type]=i[z(v.type)];const h=i[F(v.type)],m=i[J(v.type)];p[v.type]={moves:h,games:m,avg:m>0?Math.round(h/m):0}}),Pe({totalPv:i[f.totalPv],totalUv:i[f.totalUv],totalGames:i[f.totalGames],todayPv:i[t],todayUv:i[s],todayGames:i[a],survivalMoves:i[f.survivalMoves],survivalGames:i[f.survivalGames],killsByType:l,survivalByType:p})}async function w(e){return ue("increment_counter",{counter_id:e})}async function Ee(e){const t=await ue("get_counters",{counter_ids:e}),s=Object.create(null);for(const a of e)s[a]=0;if(Array.isArray(t))for(const a of t)a!=null&&a.id&&(s[a.id]=$(a.count));return s}async function ue(e,t){const s=await fetch(`${Se}/rest/v1/rpc/${e}`,{method:"POST",headers:{apikey:ne,Authorization:`Bearer ${ne}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok)throw new Error(`统计接口 ${e} 返回 ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function me(){const e=window.location.hostname;return!e||e==="localhost"||e==="127.0.0.1"||e==="::1"?!1:window.location.protocol==="https:"||window.location.protocol==="http:"}function E(e,t=N()){return`${e}_${t.replaceAll("-","")}`}function z(e){return`${f.killPrefix}_${e}`}function F(e){return`${f.survivalMovePrefix}_${e}`}function J(e){return`${f.survivalGamePrefix}_${e}`}function ve(){return Object.fromEntries(x.map(e=>[e.type,0]))}function C(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(x.map(s=>[s.type,$(t[s.type])]))}function Be(){return Object.fromEntries(x.map(e=>[e.type,{moves:0,games:0,avg:0}]))}function U(e){const t=e&&typeof e=="object"?e:{};return Object.fromEntries(x.map(s=>{const a=t[s.type]&&typeof t[s.type]=="object"?t[s.type]:{},n=$(a.moves,0,99999999),o=$(a.games,0,99999999);return[s.type,{moves:n,games:o,avg:o>0?Math.round(n/o):0}]}))}function N(e=new Date){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${a}`}const T={sfxEnabled:!0,sfxVolume:70,bgmEnabled:!0,bgmVolume:35,aiStrength:"fair"},I=[{id:"learn",label:"难度 1",time:1200,note:"熟悉规则稳健落子"},{id:"fair",label:"难度 2",time:4e3,note:"攻防均衡认真对局"},{id:"boss",label:"难度 3",time:12e3,note:"深度搜索挑战极限"}];function ie(e,t){const s=Number(e);return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):t}function j(e){const t=e&&typeof e=="object"?e:{},s=I.some(a=>a.id===t.aiStrength)?t.aiStrength:T.aiStrength;return{sfxEnabled:t.sfxEnabled??T.sfxEnabled,sfxVolume:ie(t.sfxVolume,T.sfxVolume),bgmEnabled:t.bgmEnabled??T.bgmEnabled,bgmVolume:ie(t.bgmVolume,T.bgmVolume),aiStrength:s}}function X(e){const t=j(e);return I.find(s=>s.id===t.aiStrength)||I.find(s=>s.id===T.aiStrength)||I[0]}const ge="kw-chess-save";function Ie(){try{const e=localStorage.getItem(ge);return e?JSON.parse(e):null}catch{return null}}function B(e){try{const t={playerLevel:e.playerLevel,playerExp:e.playerExp,starsPerLevel:e.starsPerLevel,highestLevel:e.highestLevel,upgradePoints:e.upgradePoints,pieceUpgrades:e.pieceUpgrades,totalWins:e.totalWins,totalGames:e.totalGames,personalStats:e.personalStats,settings:e.settings,homeMode:e.homeMode};localStorage.setItem(ge,JSON.stringify(t))}catch{}}function Ce(){const e=Ie(),t=(e==null?void 0:e.personalStats)||{},s=Math.max(0,Math.trunc(Number(t.survivalMoves)||0)),a=Math.max(0,Math.trunc(Number(t.survivalGames)||0));return{screen:"menu",playerLevel:(e==null?void 0:e.playerLevel)??1,playerExp:(e==null?void 0:e.playerExp)??0,starsPerLevel:(e==null?void 0:e.starsPerLevel)??{},highestLevel:(e==null?void 0:e.highestLevel)??1,upgradePoints:(e==null?void 0:e.upgradePoints)??0,pieceUpgrades:(e==null?void 0:e.pieceUpgrades)??{},totalWins:(e==null?void 0:e.totalWins)??0,totalGames:(e==null?void 0:e.totalGames)??0,personalStats:{killsByType:C(t.killsByType),survivalByType:U(t.survivalByType),survivalMoves:s,survivalGames:a,avgSurvivalMoves:a>0?Math.round(s/a):0},usageStats:Me(),usageStatsStatus:"全站统计读取中。",settings:j(e==null?void 0:e.settings),activeHomePanel:null,codexMode:"kw",codexPage:0,homeMode:(e==null?void 0:e.homeMode)==="classic"?"classic":"kw",levelPage:0,currentLevel:null,currentPlaySource:null}}function Ue(){let e=Ce();const t=new Set;function s(){return e}function a(r){const i=typeof r=="function"?r(e):r;e={...e,...i},t.forEach(l=>l(e))}function n(r){return t.add(r),()=>t.delete(r)}function o(r,i={}){var l,p,v,h,m;switch(r){case"navigate":a({screen:i.screen});break;case"usage-stats-updated":a({usageStats:i.stats??e.usageStats,usageStatsStatus:i.status??e.usageStatsStatus});break;case"toggle-home-panel":{const g=i.panel||null;a({activeHomePanel:e.activeHomePanel===g?null:g});break}case"open-home-panel":a({activeHomePanel:i.panel||null});break;case"close-home-panels":a({activeHomePanel:null});break;case"set-codex-mode":a({codexMode:i.mode==="kw"?"kw":"classic",codexPage:0});break;case"set-codex-page":a({codexPage:Math.max(0,Math.trunc(Number(i.page)||0))});break;case"set-home-mode":{const g=i.mode==="classic"?"classic":"kw";a({homeMode:g}),B({...e,homeMode:g});break}case"set-level-page":a({levelPage:Math.max(0,Math.trunc(Number(i.page)||0))});break;case"update-settings":{const g=j({...e.settings,...i});a({settings:g}),B({...e,settings:g});break}case"record-personal-stats":{const g=i.stats||{},k={...C((l=e.personalStats)==null?void 0:l.killsByType)},b=C(g.redKillsByType),L={...U((p=e.personalStats)==null?void 0:p.survivalByType)},Y=U(g.redSurvivalByType);Object.keys(ve()).forEach(P=>{var ee,te,ae,se;k[P]=(k[P]||0)+(b[P]||0);const Q=(((ee=L[P])==null?void 0:ee.moves)||0)+(((te=Y[P])==null?void 0:te.moves)||0),K=(((ae=L[P])==null?void 0:ae.games)||0)+(((se=Y[P])==null?void 0:se.games)||0);L[P]={moves:Q,games:K,avg:K>0?Math.round(Q/K):0}});const Z=Math.max(0,Math.min(300,Math.trunc(Number(g.totalMoves)||0))),O=Z>0?(((v=e.personalStats)==null?void 0:v.survivalGames)||0)+1:((h=e.personalStats)==null?void 0:h.survivalGames)||0,W=(((m=e.personalStats)==null?void 0:m.survivalMoves)||0)+Z,q={killsByType:k,survivalByType:L,survivalMoves:W,survivalGames:O,avgSurvivalMoves:O>0?Math.round(W/O):0};a({personalStats:q}),B({...e,personalStats:q});break}case"select-level":a({screen:"game",currentLevel:i.levelId,currentPlaySource:i.playSource||"challenge"});break;case"back-to-menu":a({screen:"menu",currentLevel:null,currentPlaySource:null});break;case"back-to-levels":a({screen:"levels",currentLevel:null,currentPlaySource:null});break;case"toggle-upgrade":{const{pieceType:g}=i,y={...e.pieceUpgrades};y[g]?delete y[g]:y[g]=!0,a({pieceUpgrades:y}),B({...e,pieceUpgrades:y});break}case"game-result":{const{newStarBits:g,win:y}=i,k=e.currentLevel,b={...e.starsPerLevel};b[k]=(b[k]||0)|(g||0);const M={starsPerLevel:b,totalWins:e.totalWins+(y?1:0),totalGames:e.totalGames+1};a(M),B({...e,...M});break}default:console.warn(`[Store] 未知 action: ${r}`)}}return{getState:s,setState:a,subscribe:n,dispatch:o}}const A={rook:"車",horse:"馬",cannon:"炮",pawn:"兵",advisor:"仕",bishop:"相",king:"帅"},Ge=[{id:1,name:"传统象棋",desc:"传统象棋规则入门",icon:"♟",levels:[{id:11,name:"自由对弈",desc:"传统规则，随时开局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"classic",noAi:!0}},{id:1,name:"初识象棋",desc:"认识传统象棋每种棋子的走法",starsIndependent:!0,winStarBit:4,stars:[{desc:"移动过每种棋子",condition:"move_all_types",eval:e=>["R","H","C","B","A","P","K"].every(t=>(e.typesMoved||[]).includes(t))},{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4},{desc:"获胜",condition:"win",eval:e=>!!e.win}],config:{mode:"classic",aiLevel:1,aiTime:1e3,playerUpgrades:{},aiUpgrades:{}},tutorial:[{trigger:"start",text:"欢迎来到象棋世界！每个棋子都有独特的走法。"},{trigger:"select_rook",text:"【車】横竖直走，不限格数，是最强的棋子。"},{trigger:"select_horse",text:'【馬】走"日"字形，先横/竖一步，再斜一步。注意蹩馬腿！'},{trigger:"select_cannon",text:"【炮】移动时像車一样直走，但吃子必须隔一个棋子（炮架）跳吃。"},{trigger:"select_bishop",text:'【相】走"田"字对角，不能过河，且不能被塞象眼。'},{trigger:"select_advisor",text:"【仕】斜走一格，只能在九宫格内移动。"},{trigger:"select_pawn",text:"【兵】未过河只能前进一步，过河后可以左右移动。"},{trigger:"select_king",text:"【帅】在九宫格内横竖移动一格。两帅不能面对面！"}]}]},{id:2,name:"棋子升级",desc:"觉醒后的棋子获得全新能力",icon:"⚡",levels:[{id:2,name:"冲撞",desc:"冲撞友方棋子快速运输",piece:"rook",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒車击杀达到 3",condition:"rook_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=3}},{desc:"觉醒車击杀达到 5",condition:"rook_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.R)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{rook:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的車已觉醒！觉醒車可冲撞路径上的友方棋子快速运输，同类車还能合体增强。"}]},{id:3,name:"连踩",desc:"十二方位跳跃，借己方棋子连续跳跃，无马脚",piece:"horse",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"一次连踩链 3 个",condition:"chain_kill_3",eval:e=>(e.maxChainKills||0)>=3},{desc:"一次连踩链 5 个",condition:"chain_kill_5",eval:e=>(e.maxChainKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{horse:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的馬已觉醒！觉醒馬可向十二方跳跃，可借己方棋子连续跳跃，无羁不受蹩腿限制，同类还能合体。"}]},{id:4,name:"翻山",desc:"更宽的炮架，可空投移动",piece:"cannon",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒炮击杀达到 3",condition:"cannon_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=3}},{desc:"觉醒炮击杀达到 5",condition:"cannon_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.C)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{cannon:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的炮已觉醒！觉醒炮可以翻过连续炮架，远袭炮架后的敌方棋子。"}]},{id:5,name:"自爆",desc:"四向一步，叠层自爆，合体更大爆炸",piece:"pawn",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"兵自爆击杀达到 3",condition:"pawn_explode_3",eval:e=>(e.pawnExplodeKills||0)>=3},{desc:"兵自爆击杀达到 5",condition:"pawn_explode_5",eval:e=>(e.pawnExplodeKills||0)>=5}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的兵已觉醒！觉醒兵可上下左右一步移动，同类会自动合体，还能自爆清场。"}]},{id:6,name:"光波",desc:"X光波，合体超级光波，可出宫",piece:"advisor",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒仕击杀达到 3",condition:"advisor_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=3}},{desc:"觉醒仕击杀达到 5",condition:"advisor_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.A)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{advisor:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的仕已觉醒！觉醒仕可发射远程光波攻击，突破九宫出宫作战，同类还能合体。"}]},{id:7,name:"地震",desc:"十字地震波，合体超级地震波，可过河",piece:"bishop",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"觉醒相击杀达到 3",condition:"bishop_kills_3",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=3}},{desc:"觉醒相击杀达到 5",condition:"bishop_kills_5",eval:e=>{var t;return(((t=e.redKillsByType)==null?void 0:t.B)||0)>=5}}],config:{mode:"mixed",aiLevel:2,aiTime:500,playerUpgrades:{bishop:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"你的相已觉醒！觉醒相可引发地震范围攻击，越河无羁不受塞象眼限制，同类还能合体。"}]}]},{id:3,name:"组合技",desc:"两种觉醒棋子的联动战术",icon:"⚔",levels:[{id:8,name:"御驾亲征",desc:"車冲撞帅出宫",pieces:["rook","king"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"王出九宫格",condition:"king_left_palace",eval:e=>!!e.kingLeftPalace},{desc:"王击杀叠层棋子",condition:"king_kills_stacked",eval:e=>(e.kingKillsStacked||0)>=1}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,king:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·亲征！觉醒車可运载觉醒帅冲锋陷阵，让帅亲自出征消灭敌人。"}]},{id:9,name:"快速运输",desc:"車冲撞兵快速前进",pieces:["rook","pawn"],winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"車运输叠兵",condition:"rook_transport_stacked_pawn",eval:e=>!!e.rookTransportedStackedPawn},{desc:"叠兵到达底线",condition:"stacked_pawn_reached_bottom",eval:e=>!!e.stackedPawnReachedBottom}],config:{mode:"mixed",aiLevel:3,aiTime:1e3,playerUpgrades:{rook:!0,pawn:!0},aiUpgrades:{}},tutorial:[{trigger:"start",text:"组合技·运送炸弹！用觉醒車运送觉醒兵深入敌阵，引爆自爆消灭敌军。"}]}]},{id:4,name:"科王象棋",desc:"全员觉醒，体验科王象棋完整玩法",icon:"👑",levels:[{id:12,name:"自由对弈",desc:"全觉醒规则，双人对局，无 AI 对手",freePlay:!0,winStarBit:0,starsIndependent:!0,stars:[{desc:"用4种不同棋子吃过子",condition:"capture_4_types",eval:e=>(e.typesCaptured||[]).length>=4}],config:{mode:"kw",noAi:!0,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}}},{id:10,name:"科王对决",desc:"双方全员觉醒，体验科王象棋的完整魅力",winStarBit:1,stars:[{desc:"获胜",condition:"win",eval:e=>!!e.win},{desc:"30 步内获胜",condition:"win_in_30",eval:e=>!!e.win&&(e.totalMoves||999)<=60},{desc:"20 步内获胜",condition:"win_in_20",eval:e=>!!e.win&&(e.totalMoves||999)<=40}],config:{mode:"kw",aiLevel:4,aiTime:2e3,playerUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0},aiUpgrades:{rook:!0,cannon:!0,horse:!0,bishop:!0,advisor:!0,pawn:!0}},tutorial:[{trigger:"start",text:"双方所有棋子完全觉醒！施展所有技巧，体验科王象棋的完整对决。"}]}]}],S=Ge.flatMap(e=>e.levels.map(t=>({...t,tierId:e.id,tierName:e.name})));function he(e){return S.find(t=>t.id===e)||null}const Ae=S.filter(e=>!e.freePlay).length,fe={classic:{label:"传统象棋",short:"传统",emblem:"楚",aiLevelId:1,freeLevelId:11,title:"传统象棋",desc:"按经典规则练基本功：车马炮兵仕相帅，先把每一步走扎实。"},kw:{label:"科王象棋",short:"科王",emblem:"王",aiLevelId:10,freeLevelId:12,title:"科王象棋",desc:"全员觉醒后，叠层、合体、冲撞、连踩和范围技会同时改变战场。"}},H=3;function c(e,t){return e.map(([s,a])=>({x:s,y:a,type:t}))}function d(e,t,s,a={}){return{x:e,y:t,piece:s,owner:a.owner||"red",layer:a.layer||1,groups:a.groups,type:a.type||"",ghost:!!a.ghost}}function u(e,t,s={}){return{title:e,marks:t,...s}}const Ne=[{piece:"車",name:"车",title:"横竖直线走，遇到棋子就停",diagrams:[u("空线可走",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),u("挡子与吃子",[...c([[1,2]],"move"),...c([[0,2,"吃"]],"attack"),...c([[3,2,"挡"]],"block"),...c([[4,2,"不可"]],"blocked")],{pieces:[d(0,2,"卒",{owner:"black",type:"attack"}),d(3,2,"兵",{type:"block"})]})],sections:[{title:"怎么走",items:["车只走横线或竖线，一次可以走任意格数。","绿色格表示中间没有棋子挡住，所以都可以直接到达。"]},{title:"怎么吃",items:["同一条直线上遇到第一枚敌方棋子时，可以走到敌方棋子所在格并吃掉它。","遇到任何棋子都会停住，不能越过它去吃后面的棋子。"]}]},{piece:"馬",name:"马",title:"走“日”字，马腿被占会被蹩",diagrams:[u("日字落点",[...c([[0,1],[0,3],[1,0],[1,4],[3,0],[3,4],[4,1],[4,3]],"move")]),u("蹩马腿",[...c([[2,1,"腿"]],"block"),...c([[1,0,"禁"],[3,0,"禁"]],"blocked"),...c([[0,1],[0,3],[1,4],[3,4],[4,1],[4,3]],"move")],{pieces:[d(2,1,"兵",{type:"block"})]})],sections:[{title:"怎么走",items:["马走“日”字：先横或竖一格，再斜一格，最终落在绿色位置。","马不是直线棋子，可以越过大多数棋子，但有一个关键例外。"]},{title:"蹩马腿",items:["如果马正前、正后、正左、正右的“马腿格”被任何棋子占住，那个方向的两个日字落点都不能走。","示意图里上方马腿被红兵占住，所以对应方向的两个灰色落点都不能去。"]}]},{piece:"炮",name:"炮",title:"移动像车，吃子必须隔一个炮架",diagrams:[u("不吃子移动",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),u("隔架吃子",[...c([[1,2,"架"]],"block"),...c([[3,2,"吃"]],"attack"),...c([[2,2]],"path")],{center:{x:0,y:2},pieces:[d(1,2,"兵",{type:"block"}),d(3,2,"卒",{owner:"black",type:"attack"})]})],sections:[{title:"怎么走",items:["炮不吃子时和车一样，沿横线或竖线移动，不能越过棋子。"]},{title:"怎么吃",items:["炮吃子时必须隔着正好一个棋子，这个被隔着的棋子叫炮架。","炮架可以是双方任意棋子；炮架后遇到的第一枚敌棋才是可吃目标。"]}]},{piece:"兵",name:"兵",title:"未过河只前进，过河后可左右",diagrams:[u("未过河",[...c([[2,2,"进"]],"move"),...c([[1,3,"禁"],[3,3,"禁"],[2,4,"禁"]],"blocked")],{center:{x:2,y:3}}),u("过河后",[...c([[2,1,"进"],[1,2,"左"],[3,2,"右"]],"move"),...c([[2,3,"禁"]],"blocked")])],sections:[{title:"怎么走",items:["兵每次只走一格。红方朝上前进，黑方朝下前进。","没有过河前只能向前走，不能左右走，也不能后退。"]},{title:"过河以后",items:["过河后可以向前、向左、向右走一格。","兵永远不能后退。"]}]},{piece:"仕",name:"仕",title:"只在九宫内斜走一格",diagrams:[u("九宫斜走",[...c([[1,1],[3,1],[1,3],[3,3]],"move"),...c([[0,0,"宫"],[4,0,"宫"],[0,4,"宫"],[4,4,"宫"]],"palace")])],sections:[{title:"活动范围",items:["仕只能留在己方九宫内，不能出宫。","九宫就是帅周围的 3×3 区域。"]},{title:"怎么走",items:["仕每次只能斜走一格，不能横走、竖走，也不能跳。"]}]},{piece:"相",name:"相",title:"走田字，两格斜跳，象眼会挡",diagrams:[u("田字落点",[...c([[0,0],[4,0],[0,4],[4,4]],"move")]),u("塞象眼",[...c([[1,1,"眼"]],"block"),...c([[0,0,"禁"]],"blocked"),...c([[4,0],[0,4],[4,4]],"move")],{pieces:[d(1,1,"兵",{type:"block"})]})],sections:[{title:"怎么走",items:["相沿对角线一次跳两格，也就是走“田”字。","相不能过河，只能在己方半边活动。"]},{title:"塞象眼",items:["如果对角线中间那一格被任何棋子占住，对应方向就不能跳。","示意图里左上方向的象眼被红兵占住，所以左上角的灰色落点不能走。"]}]},{piece:"帅",name:"帅",title:"九宫内一步，将帅不能照面",diagrams:[u("九宫一步",[...c([[2,1],[1,2],[3,2],[2,3]],"move"),...c([[1,1,"宫"],[3,1,"宫"],[1,3,"宫"],[3,3,"宫"]],"palace")]),u("照面禁线",[...c([[2,0,"将"],[2,1,"照"],[2,2,"照"],[2,3,"照"]],"attack")],{center:{x:2,y:4},pieces:[d(2,0,"将",{owner:"black",type:"attack"})]})],sections:[{title:"怎么走",items:["帅只能在九宫内横走或竖走一格。","帅不能主动走出九宫。"]},{title:"将帅照面",items:["双方帅/将如果在同一列，中间没有任何棋子挡住，就是违规局面。","走棋时要避免让两位主帅直接面对面。"]}]}],je=[{piece:"叠",name:"通用叠层",title:"先看这页：叠层、合体、叠层吃子",diagrams:[u("同类叠层",[...c([[1,2,"車"],[2,2,"叠"],[3,2,"2层"],[4,2]],"combo")],{center:{x:0,y:2},piece:"車",pieces:[d(2,2,"車",{type:"combo"}),d(4,2,"車",{layer:2,groups:[1,1],type:"combo"})]}),u("层数吃子",[...c([[3,2,"敌1"],[4,2,"胜"]],"attack"),...c([[1,2,"2层"]],"combo")],{center:{x:1,y:2},piece:"車",centerLayer:2,centerGroups:[2],pieces:[d(4,2,"卒",{owner:"black",type:"attack"})]}),u("层数不足",[...c([[2,2,"敌3"]],"attack"),...c([[3,2,"剩2"],[4,2]],"block"),...c([[1,2,"败"]],"blocked")],{center:{x:0,y:2},piece:"兵",pieces:[d(2,2,"卒",{owner:"black",layer:3,type:"attack"}),d(4,2,"卒",{owner:"black",layer:2,type:"block",ghost:!0})]})],sections:[{title:"怎么叠",items:["同阵营、同种类的觉醒棋子可以走到一起形成叠层；帅/王不能叠层。","兵最多叠到 5 层，并且叠上去后会自动合体；其他棋子叠上去后先保持为多个小组。"]},{title:"怎么操作",items:["单击叠子会默认带最上面一组行动，剩下的小组留在原格。","双击叠子会打开选择环：多个小组可以选“合”，合体后可以整组行动；合体棋子也可以双击拆出部分层数行动。"]},{title:"怎么吃叠子",items:["吃子只看本次出击的层数和目标总层数。出击层数大于或等于目标层数，就能消灭目标并保留自己的层数。","如果出击层数小于目标层数，进攻方会消失，目标只扣掉对应层数。图中 1 层兵打 3 层敌子会失败，敌子剩 2 层。"]}]},{piece:"車",name:"觉醒车",title:"直线移动，冲撞运输",diagrams:[u("直线移动",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),u("冲撞运输",[...c([[1,2,"撞"],[3,2,"推"],[4,2,"落"]],"skill"),...c([[2,2,"友"]],"ally")],{center:{x:0,y:2},pieces:[d(2,2,"兵",{type:"ally"}),d(4,2,"兵",{type:"skill",ghost:!0})]}),u("车车合体",[...c([[1,2,"車"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"車",{type:"combo"}),d(4,2,"車",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒车仍然按车的方式横竖直线移动，不能越过普通阻挡。","遇到敌子时可以按层数规则吃子。"]},{title:"冲撞",items:["如果同一条直线上先有空格、再遇到己方异类棋子，车可以冲到它前一格并把它沿同方向推出。","被推出的棋子遇到己方同类会叠层，遇到敌方会按层数结算；如果把帅推出九宫，就会触发帅的宫外规则。"]},{title:"叠层表现",items:["车车叠层后可合体，合体车能用更高层数吃子或冲撞。","如果被冲撞的是未合体叠子，只推出最底部的小组；合体后才会整体被推出。"]}]},{piece:"馬",name:"觉醒马",title:"十二方跳，不蹩腿，可连踩",diagrams:[u("十二方落点",[...c([[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,2],[4,3]],"move")]),u("借友连跳",[...c([[2,2,"友"],[4,2,"续"]],"skill"),...c([[4,4,"吃"]],"attack"),...c([[2,0,"空"]],"move")],{center:{x:0,y:2},pieces:[d(2,2,"兵",{type:"skill"}),d(4,4,"卒",{owner:"black",type:"attack"})]}),u("马马合体",[...c([[1,2,"馬"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"馬",{type:"combo"}),d(4,2,"馬",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒马可以跳传统“日”字的 8 个点，也可以直线跳 2 格，总共 12 个方向。","觉醒马没有蹩马腿限制，旁边有棋子也不会挡住它。"]},{title:"连踩",items:["跳到己方棋子上时可以继续从那里再跳；己方异类只是踏点，不会停在上面。","跳到己方马的位置时，可以选择叠层，也可以把它当踏点继续跳。跳到敌方棋子时结束并按层数吃子。"]},{title:"叠层表现",items:["马马合体后，本次出击层数更高，连踩到敌方叠子时更容易吃赢。","未合体时通常只有最上面的小组行动，合体后可以整组跳，也可以拆分部分层数行动。"]}]},{piece:"炮",name:"觉醒炮",title:"直线移动，翻过连续炮架",diagrams:[u("直线移动",[...c([[2,0],[2,1],[2,3],[2,4],[0,2],[1,2],[3,2],[4,2]],"move")]),u("连续炮架",[...c([[1,2,"架"],[2,2,"架"]],"block"),...c([[3,2,"落"]],"move"),...c([[4,2,"吃"]],"attack")],{center:{x:0,y:2},pieces:[d(1,2,"兵",{type:"block"}),d(2,2,"卒",{owner:"black",type:"block"}),d(4,2,"卒",{owner:"black",type:"attack"})]}),u("炮炮合体",[...c([[1,2,"炮"],[2,2,"叠"],[3,2,"合"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"炮",{type:"combo"}),d(4,2,"炮",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["不吃子时，觉醒炮可以像车一样沿横线或竖线走。","遇到连续棋子段时，炮可以翻过这段炮架，落到后面的空格。"]},{title:"怎么吃",items:["炮架可以是一段连续棋子；越过炮架后遇到的第一枚敌棋可以被攻击。","如果炮架后遇到的是己方炮，也可以叠层。"]},{title:"叠层表现",items:["炮炮合体后按更高层数远袭，打叠层敌子更强。","未合体炮叠子先是多个小组，双击合体后才会整组行动。"]}]},{piece:"兵",name:"觉醒兵",title:"四向一步，叠层自动合体，自爆连锁",diagrams:[u("四向可走",[...c([[2,1],[1,2],[3,2],[2,3]],"move")]),u("自爆范围",[...c([[1,1,"伤"],[2,1,"伤"],[3,1,"伤"],[1,2,"伤"],[3,2,"伤"],[1,3,"伤"],[2,3,"伤"],[3,3,"伤"]],"attack")],{pieces:[d(1,1,"卒",{owner:"black",type:"attack"}),d(3,3,"马",{type:"attack"})]}),u("兵兵自动合体",[...c([[1,2,"兵"],[2,2,"叠"],[3,2,"合"],[4,2,"爆"]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"兵",{type:"combo"}),d(4,2,"兵",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒兵每次可以向上、下、左、右走一格，不再受过河限制。","遇到敌子时按层数规则吃子。"]},{title:"自爆",items:["双击兵可以选择“爆”。自爆后兵自己消失，并攻击周围范围。","自爆半径等于兵的总层数；对非兵棋子每次造成 1 层伤害，双方棋子都会被波及。被炸到的兵会继续连锁自爆。"]},{title:"叠层表现",items:["兵叠到同类兵上会自动合体，最多 5 层。","层数越高，自爆范围越大，因此叠兵是推进和爆破的核心。"]}]},{piece:"仕",name:"觉醒仕",title:"斜走出宫，落地释放 X 形光波",diagrams:[u("出宫斜走",[...c([[1,1],[3,1],[1,3],[3,3]],"move"),...c([[0,0,"宫外"],[4,4,"宫外"]],"path")]),u("X 形伤害",[...c([[0,0,"伤"],[1,1,"伤"],[3,1,"伤"],[4,0,"伤"],[0,4,"伤"],[1,3,"伤"],[3,3,"伤"],[4,4,"伤"]],"attack")],{pieces:[d(0,0,"卒",{owner:"black",type:"attack"}),d(4,4,"砲",{owner:"black",type:"attack"})]}),u("仕仕合体",[...c([[1,2,"仕"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"仕",{type:"combo"}),d(4,2,"仕",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒仕每次斜走一格，可以出宫，也可以过河。","叠到己方仕时只是叠层，不会触发光波。"]},{title:"光波",items:["仕移动或吃子落地后，会向四条斜线释放 X 形光波。","光波的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["仕仕合体后，顶组层数变高，光波打得更远、伤害更高。","合体后也可以拆出部分层数行动，用小光波试探。"]}]},{piece:"相",name:"觉醒相",title:"无象眼越河，落地释放十字地震",diagrams:[u("斜跳两格",[...c([[0,0],[4,0],[0,4],[4,4]],"move"),...c([[1,1,"无眼"],[3,1,"无眼"]],"path")],{pieces:[d(1,1,"兵",{type:"path"}),d(3,1,"卒",{owner:"black",type:"path"})]}),u("十字伤害",[...c([[2,0,"伤"],[2,1,"伤"],[0,2,"伤"],[1,2,"伤"],[3,2,"伤"],[4,2,"伤"],[2,3,"伤"],[2,4,"伤"]],"attack")],{pieces:[d(2,0,"卒",{owner:"black",type:"attack"}),d(4,2,"馬",{owner:"black",type:"attack"})]}),u("相相合体",[...c([[1,2,"相"],[2,2,"叠"],[3,2,"强"],[4,2]],"combo")],{center:{x:0,y:2},pieces:[d(2,2,"相",{type:"combo"}),d(4,2,"相",{layer:2,groups:[2],type:"combo"})]})],sections:[{title:"怎么走",items:["觉醒相仍然斜跳两格，但不再检查象眼，也可以过河。","叠到己方相时只是叠层，不会触发地震。"]},{title:"地震",items:["相移动或吃子落地后，会向上下左右释放十字地震。","地震的长度和伤害都等于本次出击的顶组层数；只会伤害敌方棋子。"]},{title:"叠层表现",items:["相相合体后，十字地震范围和伤害都会提升。","合体相适合站到中路，用十字线压制大片区域。"]}]},{piece:"帅",name:"觉醒帅",title:"九宫八向，吃子成长，可被车送出宫",diagrams:[u("九宫八向",[...c([[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3]],"move")]),u("吃子成长",[...c([[2,1,"吃"]],"attack"),...c([[2,0,"+1"]],"combo")],{pieces:[d(2,1,"卒",{owner:"black",type:"attack"}),d(2,0,"帅",{layer:2,groups:[2],type:"combo",ghost:!0})]}),u("车送出宫",[...c([[2,4,"車"]],"ally"),...c([[2,3,"撞"],[2,1,"出"]],"skill")],{pieces:[d(2,4,"車",{type:"ally"}),d(2,0,"帅",{type:"skill",ghost:!0})]})],sections:[{title:"怎么走",items:["觉醒帅在九宫内可以向八个方向走一格，但不能自己主动走出九宫。","如果已经被车冲撞送出宫，宫外帅只能上下左右走一格。"]},{title:"成长",items:["帅成功吃掉敌方棋子并站到目标格后，会增加 1 层。","帅不能叠层，成长是帅提升层数的主要方式。"]},{title:"车送出宫",items:["觉醒车可以冲撞己方帅，把帅推出九宫。","被车送出去的帅可以亲自参战，但也会暴露在更危险的位置。"]}]}];function Oe(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function be(e){return e==="classic"?"classic":"kw"}function Ke(e,t=S){return t.reduce((s,a)=>s+Oe(e[a.id]||0),0)}function He(e=S){return e.reduce((t,s)=>t+s.stars.length,0)}function Re(e,t=S){return t.filter(s=>s.freePlay?!1:((e[s.id]||0)&(s.winStarBit??1))!==0).length}function Ve(e,t){return((t[e.id]||0)&(e.winStarBit??1))!==0}function De(e,t){const s=S.find(o=>o.id===e);if(s!=null&&s.freePlay||e===1)return!0;const a=S.find(o=>o.id===e-1);return a?((t[e-1]||0)&(a.winStarBit??1))!==0:!0}function ze(e,t,s="md"){return`<div class="stars stars-${s}">
    ${t.map((a,n)=>`
      <span class="star ${e>>n&1?"star-earned":"star-empty"}"
            title="${a.desc}">
        ${e>>n&1?"★":"☆"}
      </span>
    `).join("")}
  </div>`}function _(e){const t=Math.max(0,Math.trunc(Number(e)||0));return t>=1e5?`${(t/1e4).toFixed(1)}万`:String(t)}function oe(e){return`${Math.max(0,Math.round(Number(e)||0))}步`}function re(e,t){return Math.max(0,Math.trunc(Number(e==null?void 0:e[t])||0))}function ce(e,t){const s=e==null?void 0:e[t];if(!s||typeof s!="object")return 0;const a=Math.max(0,Math.trunc(Number(s.games)||0)),n=Math.max(0,Math.trunc(Number(s.moves)||0));return a>0?Math.round(n/a):0}function Fe(e,t){const s=(e==null?void 0:e.killsByType)||{},a=(t==null?void 0:t.killsByType)||{},n=(e==null?void 0:e.survivalByType)||{},o=(t==null?void 0:t.survivalByType)||{};return`
    <div class="battle-piece-grid" aria-label="棋子游玩统计">
      ${x.map(r=>`
        <div class="battle-piece-card">
          <b>${r.label}</b>
          <span><strong>我</strong><em>杀 ${_(re(s,r.type))}</em><em>活 ${oe(ce(n,r.type))}</em></span>
          <span><strong>全站</strong><em>杀 ${_(re(a,r.type))}</em><em>活 ${oe(ce(o,r.type))}</em></span>
        </div>
      `).join("")}
    </div>`}function R(e,t,s){const a=s===e;return`<button class="home-tool-button" type="button" data-home-panel="${e}" aria-controls="home-panel-${e}" aria-pressed="${a}" aria-expanded="${a}">
    <b>${t}</b>
  </button>`}function le(e,t){const s=fe[e],a=t===e;return`<button class="home-mode-button ${a?"is-active":""}" data-home-mode="${e}" type="button" aria-pressed="${a}">
    <span>${s.emblem}</span><b>${s.label}</b>
  </button>`}function ye(e){return`${(Math.max(0,Number(e)||0)/1e3).toFixed(e%1e3===0?0:1)} 秒`}function Je(e){const t=be(e.homeMode),s=fe[t],a=S.find(i=>i.id===s.aiLevelId),n=S.find(i=>i.id===s.freeLevelId),o=X(e.settings),r=e.totalGames>0?`${Math.round(e.totalWins/e.totalGames*100)}%`:"0%";return`
    <section class="home-play-panel" aria-label="开局选择">
      <div class="home-mode-switch" role="group" aria-label="规则模式">
        ${le("classic",t)}
        ${le("kw",t)}
      </div>
      <div class="home-record-strip" aria-label="战绩">
        <div><span>胜场</span><b>${e.totalWins||0}</b></div>
        <div><span>总场次</span><b>${e.totalGames||0}</b></div>
        <div><span>胜率</span><b>${r}</b></div>
      </div>
      <div class="home-action-row">
        ${a?`
        <button class="home-action-primary" data-select-level="${a.id}" data-play-source="home-ai">
          <span>${o.label}</span><b>人机对弈</b>
        </button>`:""}
        ${n?`
        <button class="home-action-secondary" data-select-level="${n.id}" data-play-source="free">
          <span>双人</span><b>自由对弈</b>
        </button>`:""}
      </div>
    </section>`}function ke(){return S.filter(e=>!e.freePlay)}function Xe(e,t){return`<div class="challenge-goals">
    ${e.stars.map((s,a)=>`
      <span class="${t>>a&1?"is-earned":""}">${s.desc}</span>
    `).join("")}
  </div>`}function Ye(e,t){var l,p,v,h;const s=t[e.id]||0,a=De(e.id,t),n=Ve(e,t),o=e.pieces?e.pieces.map(m=>A[m]):e.piece?[A[e.piece]]:[],r={classic:"传统规则",mixed:"觉醒练习",kw:"科王规则"}[((l=e.config)==null?void 0:l.mode)??"kw"]||"科王规则",i=(p=e.config)!=null&&p.noAi?"双人":`AI ${ye(((v=e.config)==null?void 0:v.aiTime)||500)}`;return`
    <button class="challenge-level-card ${n?"is-completed":""} ${a?"":"is-locked"}"
            ${a?`data-select-level="${e.id}" data-play-source="challenge"`:"disabled"}
            data-mode="${((h=e.config)==null?void 0:h.mode)??"kw"}">
      <div class="challenge-card-top">
        <span class="challenge-index">${a?e.id:"锁"}</span>
        <div class="challenge-card-title">
          <strong>${e.name}</strong>
          <em>${e.tierName} · ${r} · ${i}</em>
        </div>
        ${o.length?`<div class="challenge-piece-list">${o.map(m=>`<span>${m}</span>`).join("")}</div>`:""}
      </div>
      <p>${e.desc}</p>
      ${Xe(e,s)}
      <div class="challenge-card-foot">
        ${ze(s,e.stars,"sm")}
        <span>${n?"已通关":a?"可挑战":"先通前关"}</span>
      </div>
    </button>`}function Ze(e,t,s,a){const n=ke(),o=Math.max(1,Math.ceil(n.length/H)),r=Math.min(Math.max(0,e.levelPage||0),o-1),i=n.slice(r*H,(r+1)*H);return`
    <section class="challenge-panel" aria-label="关卡模式">
      <header class="challenge-head">
        <h2>关卡模式</h2>
        <div class="challenge-summary">
          <span>通关 <b>${t}/${n.length||Ae}</b></span>
          <span>★ <b>${s}/${a}</b></span>
        </div>
      </header>
      <div class="challenge-level-list">
        ${i.map(l=>Ye(l,e.starsPerLevel)).join("")}
      </div>
      <div class="challenge-pager" aria-label="关卡翻页">
        <button type="button" data-level-page="${r-1}" ${r<=0?"disabled":""}>‹</button>
        <span>${r+1} / ${o}</span>
        <button type="button" data-level-page="${r+1}" ${r>=o-1?"disabled":""}>›</button>
      </div>
    </section>`}function We(e){const t=e.usageStats||{},s=e.personalStats||{};return`
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
        <span><b>访问 ${_(t.totalPv)}</b><em>今日 ${_(t.todayPv)}</em></span>
        <span><b>访客 ${_(t.totalUv)}</b><em>今日 ${_(t.todayUv)}</em></span>
        <span><b>游玩 ${_(t.totalGames)}</b><em>今日 ${_(t.todayGames)}</em></span>
      </div>
      <p class="info-stats-note">${e.usageStatsStatus||"全站统计读取中。"}</p>
    </article>
    <article class="home-modal-block info-stats-block">
      <h3>游玩统计</h3>
      ${Fe(s,t)}
    </article>
    <article class="home-modal-block info-recommend-block">
      <h3>其他游戏推荐</h3>
      <div class="recommend-list">
        <p><a href="https://kw66.github.io/photo-hero/" target="_blank" rel="noreferrer">图片勇者</a>：拍照或画图鉴定装备，带着自己的物品一路爬塔冒险。</p>
        <p><a href="https://kw66.github.io/PhD_Simulator/" target="_blank" rel="noreferrer">研究生模拟器 v1.0</a>：在导师、论文、实验和精神状态之间求生的校园文字模拟器。</p>
      </div>
    </article>`}const qe={車:"车",馬:"马",炮:"炮",兵:"兵",仕:"仕",相:"相",帅:"帅",叠:"叠"};function Qe(e,t="red"){return t==="red"&&qe[e]||e}function de(e,t){const s=e.owner==="black"?"black":"red",a=Qe(e.piece||t.piece,s),n=a==="帅"||a==="将"?"is-king-piece":"",o=Math.max(1,Math.trunc(Number(e.layer)||1)),r=Array.isArray(e.groups)&&e.groups.length?e.groups.map(l=>Math.max(1,Math.trunc(Number(l)||1))):o>1?[o]:[],i=r.length>1?"is-unmerged":"is-merged";return`<span class="rule-piece is-${s} ${n} ${e.ghost?"is-ghost":""}" aria-hidden="true">
    <span class="rule-piece-core">${a}</span>
    ${r.length?`<span class="rule-piece-badges ${i}">
      ${r.map(l=>`<i>${l}</i>`).join("")}
    </span>`:""}
  </span>`}function et(e,t){const s=t.size||5,a=t.center||{x:Math.floor(s/2),y:Math.floor(s/2)},n=new Map((t.marks||[]).map(i=>[`${i.x},${i.y}`,i])),o=new Map((t.pieces||[]).map(i=>[`${i.x},${i.y}`,i])),r=[];for(let i=0;i<s;i+=1)for(let l=0;l<s;l+=1){const p=n.get(`${l},${i}`),v=o.get(`${l},${i}`),h=l===a.x&&i===a.y,m=p!=null&&p.type?`is-${p.type}`:"",g=v?de(v,e):h&&t.showCenter!==!1?de({piece:t.piece||e.piece,owner:t.centerOwner||"red",layer:t.centerLayer||1,groups:t.centerGroups},e):"";r.push(`<span class="rule-cell ${h?"is-center":""} ${m}">${g}</span>`)}return`<div class="rule-mini-board" style="--board-size:${s}" aria-hidden="true">${r.join("")}</div>`}function tt(e,t){return`
    <div class="rule-diagram">
      ${et(e,t)}
      <span>${t.title}</span>
    </div>`}function at(e){const t=e.diagrams||(e.diagram?[e.diagram]:[]),s=`diagram-count-${Math.min(t.length,3)}`,a=e.sections||[{title:"规则要点",items:e.lines||[]}];return`
    <article class="rule-card">
      <div class="rule-head">
        <span>${e.piece}</span>
        <div>
          <strong>${e.name}</strong>
          <em>${e.title}</em>
        </div>
      </div>
      <div class="rule-visuals ${s}">${t.map(n=>tt(e,n)).join("")}</div>
      <div class="rule-copy">
        ${a.map(n=>`
          <section>
            <h4>${n.title}</h4>
            <ul>
              ${n.items.map(o=>`<li>${o}</li>`).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
    </article>`}function st(e,t=0){const s=e==="kw"?"kw":"classic",a=s==="kw"?je:Ne,n=Math.min(a.length-1,Math.max(0,Math.trunc(Number(t)||0))),o=a[n],r=n<=0?a.length-1:n-1,i=n>=a.length-1?0:n+1;return`
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
      <button type="button" data-codex-page="${r}" aria-label="上一页">‹</button>
      <div>
        <b>${n+1} / ${a.length}</b>
        <span>${o.name}</span>
      </div>
      <button type="button" data-codex-page="${i}" aria-label="下一页">›</button>
    </div>
    <section class="rules-panel" aria-label="${s==="kw"?"科王象棋走法":"传统象棋走法"}">
      <div class="rules-grid is-paged">
        ${at(o)}
      </div>
    </section>`}function nt(e){const t=j(e),s=X(t);return`
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
        ${I.map(a=>`
          <button class="ai-choice-button ${a.id===s.id?"is-active":""}" type="button" data-setting-ai="${a.id}" aria-pressed="${a.id===s.id}">
            <b>${a.label}</b>
            <span>${ye(a.time)}</span>
            <em>${a.note}</em>
          </button>
        `).join("")}
      </div>
    </article>`}function V(e,t,s,a){return`
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
    </div>`}function it(e){return`
    ${V("author","游戏信息",We(e),e.activeHomePanel)}
    ${V("codex","棋子图鉴",st(e.codexMode,e.codexPage),e.activeHomePanel)}
    ${V("settings","设置",nt(e.settings),e.activeHomePanel)}`}function pe(e){const t=be(e.homeMode),s=ke(),a=Ke(e.starsPerLevel,s),n=He(s),o=Re(e.starsPerLevel,s);return`
    <div class="home-page">
      <header class="home-top-bar">
        <div class="home-title-area">
          <h1 class="home-title">科王象棋</h1>
        </div>
        <nav class="home-tool-bar" aria-label="游戏工具">
          ${R("author","游戏信息",e.activeHomePanel)}
          ${R("codex","棋子图鉴",e.activeHomePanel)}
          ${R("settings","设置",e.activeHomePanel)}
        </nav>
      </header>

      <main class="home-content">
        ${Je({...e,homeMode:t})}
        ${Ze({...e},o,a,n)}
      </main>
      ${it(e)}
    </div>`}function ot(e){return`
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
    </div>`}function rt(e){return`
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
    </div>`}const $e={rook:{icon:"車",name:"冲撞",desc:"运输"},horse:{icon:"馬",name:"连踩",desc:"追击"},cannon:{icon:"炮",name:"翻山",desc:"远袭"},pawn:{icon:"兵",name:"自爆",desc:"爆破"},advisor:{icon:"仕",name:"光波",desc:"出宫"},bishop:{icon:"相",name:"地震",desc:"越河"},king:{icon:"帅",name:"亲征",desc:"帅攻"}};function ct(e){let t=0;for(;e;)t+=e&1,e>>=1;return t}function lt(e){return String(e).replace(/"/g,"&quot;")}function dt(e){const t=Math.max(0,Number(e)||0);return`${(t/1e3).toFixed(t%1e3===0?0:1)} 秒`}function we(e,t,s){var n,o;if((n=e.config)!=null&&n.noAi)return null;if(s==="home-ai")return X(t);const a=Math.max(100,Math.trunc(Number((o=e.config)==null?void 0:o.aiTime)||500));return{id:`level-${a}`,label:dt(a),time:a}}function pt(e,t){return t.map((s,a)=>{const n=e>>a&1;return`<div class="star-goal ${n?"star-goal-earned":""}">
      <span class="star-goal-icon">${n?"★":"☆"}</span>
      <span class="star-goal-desc">${s.desc}</span>
    </div>`}).join("")}function ut(e){var a,n;const t=((a=e.config)==null?void 0:a.mode)??"kw";if(t==="classic")return[];if(t==="kw")return["rook","horse","cannon","pawn","advisor","bishop"];const s=new Set;return Object.entries(((n=e.config)==null?void 0:n.playerUpgrades)||{}).forEach(([o,r])=>{r&&s.add(o)}),e.piece&&s.add(e.piece),(e.pieces||[]).forEach(o=>s.add(o)),[...s].filter(o=>$e[o])}function mt(e){const t=ut(e);return t.length?`<div class="game-codex-mini">
    ${t.map(s=>{const a=$e[s];return`<span class="game-codex-chip">
        <b>${a.icon}</b>
        <span>${a.name}<em>${a.desc}</em></span>
      </span>`}).join("")}
  </div>`:`<div class="game-codex-mini is-classic">
      <span class="game-codex-chip"><b>楚</b><span>传统走法</span></span>
      <span class="game-codex-chip"><b>汉</b><span>经典对局</span></span>
    </div>`}function vt(e,t,s){var r,i,l;const a=new URLSearchParams;a.set("levelId",e.id);const n=we(e,t,s);n&&(a.set("ai","1"),a.set("aiTime",String(n.time)),a.set("aiStrength",n.id));const o=((r=e.config)==null?void 0:r.mode)??"kw";if(a.set("mode",o),o==="classic"&&a.set("classic","1"),o!=="classic"){const p=((i=e.config)==null?void 0:i.playerUpgrades)||{},v=((l=e.config)==null?void 0:l.aiUpgrades)||{},h=Object.keys(p).filter(g=>p[g]).join(","),m=Object.keys(v).filter(g=>v[g]).join(",");h&&a.set("pu",h),m&&a.set("au",m)}return`./index-legacy.html?${a.toString()}`}function gt(e){var y,k,b;const t=he(e.currentLevel);if(!t)return`<div class="game-page">
      <div class="page-header">
        <button class="btn-back" data-action="back-to-menu">&larr; 返回</button>
        <h2 class="page-title">关卡不存在</h2>
      </div>
    </div>`;const s=e.starsPerLevel[t.id]||0,a=ct(s),n=t.stars.length,o=t.pieces?t.pieces.map(M=>A[M]).join(" "):t.piece?A[t.piece]:"",r=we(t,e.settings,e.currentPlaySource),i=vt(t,e.settings,e.currentPlaySource),l=(r==null?void 0:r.label)||"",p=!((y=t.config)!=null&&y.noAi)&&l,v={classic:"传统",mixed:"觉醒",kw:"科王"}[((k=t.config)==null?void 0:k.mode)??"kw"]||"科王",h=t.freePlay?"双人":"红方",m=t.freePlay?'<span class="game-header-badge">自由对弈</span>':p?`<span class="game-header-badge game-header-ai">AI · ${l}</span>`:'<span class="game-header-badge">双人对局</span>',g=(b=t.tutorial)!=null&&b.length?t.tutorial[0].text:"";return`
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
            ${t.stars.map((M,L)=>`<span class="star ${s>>L&1?"star-earned":"star-empty"}">${s>>L&1?"★":"☆"}</span>`).join("")}
            <span class="game-header-star-count">${a}/${n}</span>
          </div>
        </div>
        <div class="game-status-strip" aria-label="本局状态">
          <span class="game-status-chip">♟ ${v}</span>
          <span class="game-status-chip">${p?`AI ${l}`:h}</span>
          <span class="game-status-chip">目标 ${a}/${n}</span>
          <span class="game-status-chip">${t.freePlay?"练习局":"闯关局"}</span>
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
            <div class="hint-display ${g?"":"hint-empty"}"
                 id="hint-display"
                 data-default="${lt(g)}">${g||"选择棋子查看走法"}</div>
          </div>

          <!-- 棋子图鉴 -->
          <div class="info-section panel-codex">
            <div class="info-section-title">棋子图鉴</div>
            ${mt(t)}
          </div>

          <!-- 2. 通关目标 -->
          <div class="info-section panel-goals">
            <div class="info-section-title">通关目标</div>
            <div class="star-goal-list" id="star-goal-list">
              ${pt(s,t.stars)}
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
    </div>`}function ht(e){switch(e.screen){case"menu":return pe(e);case"levels":return ot();case"upgrade":return rt();case"game":return gt(e);default:return pe(e)}}function ft(e){const t=Ue();function s(){const a=t.getState();e.dataset.screen=a.screen,e.innerHTML=ht(a)}t.subscribe(s),_e().then(({stats:a,status:n})=>{t.dispatch("usage-stats-updated",{stats:a,status:n})}).catch(a=>{console.warn("全站统计初始化失败:",a),t.dispatch("usage-stats-updated",{status:"全站统计暂时不可用，稍后再试。"})}),e.addEventListener("click",a=>{const n=a.target;if(!(n instanceof HTMLElement))return;const o=n.closest("[data-home-panel]");if(o){const b=o.dataset.homePanel;t.dispatch("toggle-home-panel",{panel:b});return}if(n.closest("[data-close-home-panel]")||n.classList.contains("home-modal")){t.dispatch("close-home-panels");return}const r=n.closest("[data-codex-mode]");if(r){t.dispatch("set-codex-mode",{mode:r.dataset.codexMode});return}const i=n.closest("[data-codex-page]");if(i){t.dispatch("set-codex-page",{page:i.dataset.codexPage});return}const l=n.closest("[data-home-mode]");if(l){t.dispatch("set-home-mode",{mode:l.dataset.homeMode});return}const p=n.closest("[data-level-page]");if(p){t.dispatch("set-level-page",{page:p.dataset.levelPage});return}const v=n.closest("[data-setting-ai]");if(v){t.dispatch("update-settings",{aiStrength:v.dataset.settingAi});return}const h=n.closest("[data-navigate]");if(h){t.dispatch("navigate",{screen:h.dataset.navigate});return}const m=n.closest("[data-select-level]");if(m){const b=parseInt(m.dataset.selectLevel,10);isNaN(b)||t.dispatch("select-level",{levelId:b,playSource:m.dataset.playSource});return}if(n.closest('[data-action="start-game"]')){t.dispatch("start-game");return}const y=n.closest("[data-action]");if(y){const b=y.dataset.action;if(b==="back-to-menu"||b==="back-to-levels"){t.dispatch(b);return}}const k=n.closest("[data-toggle-upgrade]");if(k){t.dispatch("toggle-upgrade",{pieceType:k.dataset.toggleUpgrade});return}}),e.addEventListener("input",a=>{const n=a.target;if(!(n instanceof HTMLInputElement)||!n.matches("[data-setting-range]"))return;const o=Math.max(0,Math.min(100,Math.round(Number(n.value)||0)));n.style.setProperty("--slider-fill",`${o}%`);const r=n.closest(".sound-slider-row"),i=r==null?void 0:r.querySelector("[data-setting-value]");i&&(i.textContent=`${o}%`)}),e.addEventListener("change",a=>{const n=a.target;if(!(n instanceof HTMLInputElement))return;const o=n.dataset.settingToggle;if(o){t.dispatch("update-settings",{[o]:n.checked});return}const r=n.dataset.settingRange;r&&t.dispatch("update-settings",{[r]:n.value})}),window.addEventListener("keydown",a=>{a.key==="Escape"&&t.dispatch("close-home-panels")}),window.addEventListener("message",a=>{if(!a.data)return;const n=t.getState();if(n.screen!=="game"||!n.currentLevel)return;const o=he(n.currentLevel);if(o){if(a.data.type==="piece-selected"){const r=document.getElementById("hint-display");if(!r)return;const i=a.data.hint;if(i)r.textContent=i,r.classList.remove("hint-empty");else{const l=r.dataset.default||"";r.textContent=l||"选择棋子查看走法",r.classList.toggle("hint-empty",!l)}return}if(a.data.type==="game-progress"){const r=a.data.stats||{},i=n.starsPerLevel[o.id]||0,l=document.getElementById("star-goal-list");if(l&&(l.innerHTML=o.stars.map((m,g)=>{const y=i>>g&1,k=!!(m.eval&&m.eval(r)),b=y||k;return`<div class="star-goal ${b?"star-goal-earned":""}">
            <span class="star-goal-icon">${b?"★":"☆"}</span>
            <span class="star-goal-desc">${m.desc}</span>
          </div>`}).join("")),a.data.redPct!==void 0){const m=a.data.redPct,g=100-m,y=document.getElementById("outer-red-pct"),k=document.getElementById("outer-blk-pct"),b=document.getElementById("outer-fill-red"),M=document.getElementById("outer-advantage");y&&(y.textContent=m+"%"),k&&(k.textContent=g+"%"),b&&(b.style.width=m+"%"),M&&a.data.advantage&&(M.textContent=a.data.advantage)}const p=document.getElementById("outer-cap-red"),v=document.getElementById("outer-cap-black");p&&a.data.capturedRed!==void 0&&(p.innerHTML=a.data.capturedRed.length?a.data.capturedRed.map(m=>`<span class="cap-item red">${m}</span>`).join(""):'<span class="cap-empty">—</span>'),v&&a.data.capturedBlack!==void 0&&(v.innerHTML=a.data.capturedBlack.length?a.data.capturedBlack.map(m=>`<span class="cap-item blk">${m}</span>`).join(""):'<span class="cap-empty">—</span>');const h=document.getElementById("outer-move-log");h&&a.data.moves!==void 0&&(a.data.moves.length===0?h.innerHTML='<span class="log-empty">对局尚未开始</span>':(h.innerHTML=a.data.moves.map(m=>`<div class="log-entry ${m.side==="red"?"log-red":"log-blk"}">${m.text}</div>`).join(""),h.scrollTop=h.scrollHeight));return}if(a.data.type==="game-end"){const r=a.data.stats||{};t.dispatch("record-personal-stats",{stats:r});let i=0;o.stars.forEach((l,p)=>{l.eval&&l.eval(r)&&(i|=1<<p)}),o.freePlay||t.dispatch("game-result",{newStarBits:i,win:!!r.win}),Le(r).then(({stats:l,status:p})=>{t.dispatch("usage-stats-updated",{stats:l,status:p})}).catch(l=>{console.warn("全站游玩统计失败:",l),t.dispatch("usage-stats-updated",{status:"游玩统计同步失败，稍后再试。"})})}}}),s()}const xe=document.querySelector("#app");if(!xe)throw new Error("#app container not found");ft(xe);
