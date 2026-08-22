export const RARITIES=['Common','Rare','Epic','Legend','Mythic','Divine','Transcendent','Cosmic'];
export const ITEMS={
 Hint:{icon:'💡',price:300,desc:'Remove one incorrect answer.'},'Mega Hint':{icon:'✨',price:1500,desc:'Remove two incorrect answers.'},'Double XP':{icon:'⚡',price:3000,desc:'2× XP for the current run.'},'Score Boost':{icon:'⭐',price:4000,desc:'2× score for the current run.'},'Second Chance':{icon:'❤️',price:5000,desc:'Restore one lost life.'},'Extra Lives':{icon:'💖',price:7000,desc:'+2 lives for the current run.'},'Lucky Answer':{icon:'🍀',price:10000,desc:'Automatically answers the current question correctly.'},'Time Freeze':{icon:'❄️',price:8000,desc:'Freeze the timer for 5 seconds.'},'Coin Magnet':{icon:'🪙',price:12500,desc:'+50% coins for the current run.'},'Boss Slayer':{icon:'⚔️',price:0,desc:'Boss-only relic. When a boss battle starts, the first hit deals 3× damage and every later hit gains +20 damage.',bossOnly:true},'Boss Damage':{icon:'💥',price:14000,desc:'+50% boss damage for the current battle.'},'Streak Shield':{icon:'🛡️',price:22000,desc:'Protect one Streak Mode mistake.'},'Rank Boost':{icon:'📈',price:30000,desc:'+25 bonus rating for a completed Ranked run.'},'World Scanner':{icon:'🌐',price:35000,desc:'Reveals one clue category in Hardcore.'},'Boss Token':{icon:'🪙',price:0,desc:'Boss-exclusive: +500 coins.',bossOnly:true},'Mythic Fang':{icon:'🦷',price:0,desc:'Boss-exclusive: +100% boss damage.',bossOnly:true},'Divine Core':{icon:'💎',price:0,desc:'Boss-exclusive: +1000 XP and +1000 coins.',bossOnly:true},'Cosmic Shard':{icon:'🌌',price:0,desc:'Cosmic reward. +5000 XP and +5000 coins.',bossOnly:true}
};
export const SKINS={
 Explorer:{price:0,xp:1,coins:1,time:0,drop:1,rarity:'common',power:'Starter'},
 Scout:{price:9000,xp:1.12,coins:1.15,time:1,drop:1.08,rarity:'rare',power:'Quick Learner'},
 Champion:{price:30000,xp:1.35,coins:1.32,time:2,drop:1.2,rarity:'epic',power:'Score Hunter'},
 Mythic:{price:110000,xp:1.7,coins:1.65,time:3,drop:1.5,rarity:'mythic',power:'Mythic Focus'},
 Divine:{price:360000,xp:2.2,coins:2.1,time:5,drop:1.9,rarity:'divine',power:'Divine Fortune'},
 Transcendent:{price:1800000,xp:3.15,coins:3.1,time:8,drop:2.7,rarity:'transcendent',power:'Transcendent Mind'},
 Cosmic:{price:30000000,xp:4.75,coins:4.25,time:12,drop:4.25,rarity:'cosmic',power:'Cosmic Knowledge'},
 '👑 OWNER':{price:0,xp:10001,coins:10001,time:999,drop:11,rarity:'cosmic',owner:true,lives:9999,power:'Developer'}
};
export const CHEST_PRICES={Common:1200,Rare:5000,Epic:18000,Legend:60000,Mythic:220000,Divine:900000,Transcendent:10000000,Cosmic:100000000};
export const ACHIEVEMENTS=[
{id:'first',name:'🌱 First Steps',desc:'Finish your first game.',reward:250,check:p=>p.totalGames>=1},
{id:'correct10',name:'🎯 Sharpshooter',desc:'Answer 10 questions correctly.',reward:500,check:p=>p.totalCorrect>=10},
{id:'combo10',name:'🔥 Combo Master',desc:'Reach a ×10 combo.',reward:1000,check:p=>p.bestCombo>=10},
{id:'combo25',name:'🔥 Inferno',desc:'Reach a ×25 combo.',reward:4000,check:p=>p.bestCombo>=25},
{id:'rich',name:'🪙 Treasure Hunter',desc:'Own 100,000 coins.',reward:5000,check:p=>p.coins>=100000},
{id:'boss1',name:'👹 Boss Hunter',desc:'Defeat a boss.',reward:1500,check:p=>p.bossesDefeated>=1},
{id:'boss10',name:'⚔️ Boss Slayer',desc:'Defeat 10 bosses.',reward:8000,check:p=>p.bossesDefeated>=10},
{id:'daily7',name:'📅 Dedicated',desc:'Complete 7 Daily Challenges.',reward:5000,check:p=>p.dailyStreak>=7},
{id:'collector',name:'🎁 Collector',desc:'Own a Divine, Transcendent or Cosmic chest.',reward:7000,check:p=>(p.chests.Divine||0)+(p.chests.Transcendent||0)+(p.chests.Cosmic||0)>=1},
{id:'legend',name:'💎 Legendary',desc:'Open a Legend+ chest.',reward:7500,check:p=>p.bestChestRarity&&RARITIES.indexOf(p.bestChestRarity)>=3},
{id:'cosmicChest',name:'🌌 Cosmic Fortune',desc:'Open a Cosmic Chest.',reward:50000,check:p=>p.bestChestRarity==='Cosmic'},
{id:'world',name:'🌍 World Traveler',desc:'Discover 100 countries.',reward:10000,check:p=>(p.discovered||0)>=100},
{id:'allWorld',name:'🌐 World Master',desc:'Discover every country in the database.',reward:100000,check:p=>p.discovered>=190},
{id:'nightmare',name:'💀 Nightmare',desc:'Finish Classic Nightmare.',reward:7500,check:p=>(p.stats.nightmare||0)>=1},
{id:'hardcore',name:'☠️ Hardcore Survivor',desc:'Complete Hardcore Classic.',reward:12000,check:p=>(p.stats.hardcore||0)>=1},
{id:'streak10',name:'🔥 Streak Legend',desc:'Finish Streak Mode with a streak of 10+.',reward:10000,check:p=>(p.streakBest||0)>=10},
{id:'streak25',name:'⚡ Unbreakable',desc:'Reach a Streak of 25.',reward:30000,check:p=>(p.streakBest||0)>=25},
{id:'ranked1',name:'🏆 Ranked Debut',desc:'Complete your first Ranked run.',reward:3000,check:p=>(p.stats.ranked||0)>=1},
{id:'ranked1500',name:'💠 Ranked Climber',desc:'Reach 1500 rating.',reward:10000,check:p=>p.rating>=1500},
{id:'ranked2000',name:'👑 Ranked Master',desc:'Reach 2000 rating.',reward:30000,check:p=>p.rating>=2000},
{id:'perfect',name:'✨ Perfect Run',desc:'Finish a run with no wrong answers.',reward:7500,check:p=>(p.perfectRuns||0)>=1},
{id:'extreme',name:'🟣 Extreme',desc:'Finish Classic Extreme.',reward:5000,check:p=>(p.stats.extreme||0)>=1},
{id:'collector10',name:'🎒 Hoarder',desc:'Own 10 different item types.',reward:5000,check:p=>Object.values(p.inventory).filter(v=>v>0).length>=10},
{id:'cosmicSkin',name:'🌌 Cosmic Collector',desc:'Own the Cosmic skin.',reward:100000,check:p=>!!p.skins.Cosmic},
{id:'level25',name:'📈 Veteran',desc:'Reach level 25.',reward:10000,check:p=>p.level>=25},
{id:'level50',name:'🚀 Elite',desc:'Reach level 50.',reward:30000,check:p=>p.level>=50},
{id:'streak50',name:'🔥 Eternal Flame',desc:'Reach a ×50 Streak.',reward:75000,check:p=>(p.streakBest||0)>=50},
{id:'ranked2500',name:'🌌 Cosmic Ranked',desc:'Reach 2500 rating.',reward:100000,check:p=>p.rating>=2500},
{id:'world50',name:'🧭 Global Scholar',desc:'Discover 50 countries.',reward:5000,check:p=>(p.discovered||0)>=50},
{id:'boss25',name:'👑 Boss Conqueror',desc:'Defeat 25 bosses.',reward:25000,check:p=>p.bossesDefeated>=25}
];
export const LEVEL_REWARDS={5:{coins:5000,item:'Hint'},10:{coins:10000,item:'Double XP'},15:{coins:20000,item:'Second Chance'},20:{coins:30000,item:'Time Freeze'},25:{coins:50000,item:'Mega Hint'},30:{coins:75000,item:'Score Boost'},40:{coins:125000,item:'Streak Shield'},50:{coins:250000,item:'Rank Boost'}};
export const UPGRADES={'Coin Engine':{icon:'🪙',base:50000,step:1.15,desc:'+5% coins per level.',max:10},'XP Engine':{icon:'✨',base:65000,step:1.15,desc:'+5% XP per level.',max:10},'Time Core':{icon:'⏱️',base:90000,step:1.2,desc:'+1 second per question in non-ranked modes.',max:5},'Streak Core':{icon:'🔥',base:120000,step:1.2,desc:'+5% Streak rewards.',max:10}};
export const RULES=['All previous game modes remain available.','Classic keeps Easy, Normal, Hard, Extreme and Nightmare.','Hardcore is a Classic variant: 1 life, no hints and mixed knowledge questions.','Streak Mode ends immediately when you answer incorrectly or run out of time.','Ranked is a 10-question Elo climb. Questions become harder as you progress.','Ranked uses rating instead of the old level-based rank system. Level is now progression and unlocks rewards/perks.','Cosmic Chests are the rarest chest and cost far more than Transcendent Chests.','Boss Slayer is now a boss-only relic with a unique opening strike effect; Boss Damage remains the direct damage multiplier.','Bosses can reward coins, XP, chests, skins and boss-exclusive items.','Profiles are migrated from v3.5.5 and older local saves.','Population, Area and Languages are refreshed from live country metadata when available.','Owner Panel is a developer/testing tool and requires the V4 password.'];
export const UPDATE_LOG=[
{title:'🛠️ Version 4.1.0 — HOTFIX',items:['🧩 Fixed the three new V4.0 modes — Streak Mode, Hardcore Classic and Ranked — not appearing reliably in the Game Modes screen.','⚔️ Reworked Boss Slayer so it no longer duplicates Boss Damage: it is now a boss-only relic with a unique opening strike and flat damage bonus.','📊 Improved Population, Area and Languages data loading with persistent local caching when live country metadata is available.','🌍 Improved country-data fallback handling so the database does not permanently show missing statistics after a temporary API failure.','🐛 Fixed remaining V4.0 UI, mode navigation and data-refresh edge cases.']},
{title:'🌌 Version 4.0.0 — WORLD DOMINATION UPDATE',items:['🏆 Expanded the Achievement system with many new achievements and completion notifications.','🔥 Added Streak Mode: one mistake breaks the run.','☠️ Added Hardcore Classic: one life, no hints and diverse knowledge questions.','🏆 Added Ranked Mode with 10-question Elo climbs and progressive difficulty.','📈 Replaced level-based rank names with rating-based competitive ranks. Level now focuses on progression and rewards.','🌌 Added Cosmic Chest rarity, much more expensive than Transcendent with multi-reward drops.','🛒 Added many new items, skins and permanent coin-purchased upgrades without removing old content.','🌍 Expanded the playable country registry to the whole world and rebuilt the database around global metadata.','👹 Added Transcendent Tyrant Boss with a 50% Transcendent Chest chance and 1% Cosmic Chest jackpot chance.','❤️ Reworked Boss UI with HP, question progress and stronger boss difficulty.','⚔️ Buffed boss-exclusive rewards and gameplay bonuses.','🪙 Increased item and chest prices to fight economy inflation.','🎨 Reworked the entire UI and Owner Panel.','🔐 Added password protection to Owner Panel: OWNERV40.','💾 Added V4 save migration while preserving existing v3.5.5 progress.','🌐 Added V5-ready backend foundations for accounts, cloud profiles, leaderboard and cross-device progress.']},
{title:'🚀 Version 3.5.5 — Modular Stability Update',items:['🧩 Split the frontend JavaScript into dedicated modules.','🎮 Restored Classic, Survival, Time Attack, Sudden Death, Endless, Boss and Daily Challenge.','🎯 Restored Easy, Normal, Hard, Extreme and Nightmare.','🛒 Preserved Shop, Inventory, Skins, Chests and previous content.','❄️ Time Freeze freezes the timer for exactly 5 seconds.','🔊 Added UI, gameplay, reward and boss sound feedback.','🌍 Country Database search and regional filtering.','👥 Population, 📏 Area and 🌐 Languages displayed in the database.','💾 Added profile migration so updates do not intentionally wipe existing profiles.','🐛 Fixed Mega Hint and Boss Damage paths.']},
{title:'🚀 Version 3.5',items:['Restored Double XP, Score Boost, Second Chance, Lucky Answer and Extra Lives.','Reworked Time Freeze.','Added rarity-aware sound direction.','Added Owner testing items and Item Bar usage.','Added Population, Area and Languages.','Added Extreme and Nightmare.','Added Country Database search.']},
{title:'🚀 Version 3.0',items:['Added Survival, Time Attack, Sudden Death and Endless.','Expanded Asia + Europe + Africa coverage.','Added more achievements and boss item effects.','Expanded chest rewards and Transcendent rarity.','Reworked UI and removed the level cap.']},
{title:'🚀 Version 2.5',items:['Added Skins with gameplay bonuses.','Added Boss Mode and Boss-exclusive items.','Restored Currency and Region questions.','Added Profile view and Mega Hint.','Added Chest rarity progression.']},
{title:'🚀 Version 2.0',items:['Added multiple game modes.','Added Achievement System.','Added Daily Challenge.','Added Chest System and rarity progression.','Expanded Rank System.']}
];