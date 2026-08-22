export const RARITIES=['Common','Rare','Epic','Legend','Mythic','Divine','Transcendent'];
export const ITEMS={
 Hint:{icon:'💡',price:100,desc:'Remove one incorrect answer.'},
 'Mega Hint':{icon:'✨',price:500,desc:'Remove two incorrect answers.'},
 'Double XP':{icon:'⚡',price:900,desc:'2× XP for the current run.'},
 'Score Boost':{icon:'⭐',price:1100,desc:'2× score for the current run.'},
 'Second Chance':{icon:'❤️',price:1400,desc:'Restore one lost life.'},
 'Extra Lives':{icon:'💖',price:1800,desc:'+2 lives for the current run.'},
 'Lucky Answer':{icon:'🍀',price:2500,desc:'Automatically answers the current question correctly.'},
 'Time Freeze':{icon:'❄️',price:1600,desc:'Freeze the timer for exactly 5 seconds.'},
 'Coin Magnet':{icon:'🪙',price:3000,desc:'+50% coins for the current run.'},
 'Boss Slayer':{icon:'⚔️',price:5000,desc:'+50% boss damage for the current battle.'}
};
export const SKINS={
 Explorer:{price:0,xp:1,coins:1,time:0,drop:1,rarity:'common'},
 Scout:{price:3000,xp:1.1,coins:1.1,time:1,drop:1.05,rarity:'rare'},
 Champion:{price:10000,xp:1.25,coins:1.25,time:2,drop:1.15,rarity:'epic'},
 Mythic:{price:30000,xp:1.5,coins:1.5,time:3,drop:1.35,rarity:'mythic'},
 Divine:{price:100000,xp:2,coins:2,time:5,drop:1.75,rarity:'divine'},
 Transcendent:{price:500000,xp:3,coins:3,time:8,drop:2.5,rarity:'transcendent'},
 '👑 OWNER':{price:0,xp:10001,coins:10001,time:999,drop:11,rarity:'transcendent',owner:true,lives:9999}
};
export const CHEST_PRICES={Common:500,Rare:1500,Epic:5000,Legend:15000,Mythic:50000,Divine:200000,Transcendent:5000000};
export const ACHIEVEMENTS=[
 {id:'first',name:'🌱 First Steps',desc:'Finish your first game.',reward:100,check:p=>p.totalGames>=1},
 {id:'correct10',name:'🎯 Sharpshooter',desc:'Answer 10 questions correctly.',reward:300,check:p=>p.totalCorrect>=10},
 {id:'combo10',name:'🔥 Combo Master',desc:'Reach a ×10 combo.',reward:500,check:p=>p.bestCombo>=10},
 {id:'rich',name:'🪙 Treasure Hunter',desc:'Own 10,000 coins.',reward:1000,check:p=>p.coins>=10000},
 {id:'boss1',name:'👹 Boss Hunter',desc:'Defeat a boss.',reward:1000,check:p=>p.bossesDefeated>=1},
 {id:'boss10',name:'⚔️ Boss Slayer',desc:'Defeat 10 bosses.',reward:5000,check:p=>p.bossesDefeated>=10},
 {id:'daily7',name:'📅 Dedicated',desc:'Complete 7 Daily Challenges.',reward:2500,check:p=>p.dailyStreak>=7},
 {id:'collector',name:'🎁 Collector',desc:'Own a Divine or Transcendent chest.',reward:3000,check:p=>(p.chests.Divine||0)+(p.chests.Transcendent||0)>=1},
 {id:'legend',name:'💎 Legendary',desc:'Open a Legend+ chest.',reward:5000,check:p=>p.bestChestRarity&&RARITIES.indexOf(p.bestChestRarity)>=3},
 {id:'world',name:'🌍 World Traveler',desc:'Discover 100 countries.',reward:5000,check:p=>(p.discovered||0)>=100},
 {id:'nightmare',name:'💀 Nightmare',desc:'Finish Classic Nightmare.',reward:5000,check:p=>(p.stats.nightmare||0)>=1},
 {id:'perfect',name:'✨ Perfect Run',desc:'Finish a run with no wrong answers.',reward:5000,check:p=>(p.perfectRuns||0)>=1},
 {id:'extreme',name:'🟣 Extreme',desc:'Finish Classic Extreme.',reward:3000,check:p=>(p.stats.extreme||0)>=1},
 {id:'collector10',name:'🎒 Hoarder',desc:'Own 10 different item types.',reward:3000,check:p=>Object.values(p.inventory).filter(v=>v>0).length>=10}
];
export const RULES=['All game modes are inside Start Game.','Classic contains Easy, Normal, Hard, Extreme and Nightmare.','Classic gives 12 seconds per question; skins can add time.','Hard Currency and Region questions include a capital clue so the correct country is unique.','Extreme adds Population and Area. Nightmare uses all available knowledge.','Survival starts with 5 lives. Sudden Death starts with 1 life.','Endless has no fixed question limit.','Bosses reward Coins, XP, Chests and boss-exclusive items.','Time Freeze freezes the timer for exactly 5 seconds and cannot be used while already frozen.','Items are persistent and are used from the Item Bar.','Profiles are saved locally and migrated when the save format changes.','Owner tools are testing tools and are hidden behind the O key.'];
export const UPDATE_LOG=[
 {title:'🚀 Version 3.5.5 — Modular Stability Update',items:['🧩 Split the frontend JavaScript into dedicated modules instead of one giant game.js.','🎮 Restored all previous game modes inside Start Game: Classic, Survival, Time Attack, Sudden Death, Endless, Boss and Daily Challenge.','🎯 Restored Classic difficulty hierarchy: Easy, Normal, Hard, Extreme and Nightmare.','🛒 Shop is separated into Items, Skins and Chests while preserving previous content.','🎒 Reworked Inventory into an Item Bar with per-item Use buttons.','❄️ Time Freeze now freezes the timer for exactly 5 seconds and cannot stack.','🔊 Added UI, gameplay, reward and boss sound feedback with different rarity tones.','👑 Preserved Owner testing tools and the O-key panel without putting them into public update notes.','🌍 Country Database now supports search and Asia/Europe/Africa filtering.','👥 Population, 📏 Area and 🌐 Languages are displayed in the Country Database.','💾 Added profile migration so updates do not intentionally wipe existing profiles.','🐛 Fixed Mega Hint and boss damage item paths so they work during gameplay.']},
 {title:'🚀 Version 3.5',items:['Restored Double XP, Score Boost, Second Chance, Lucky Answer and Extra Lives.','Reworked Time Freeze into a 5-second freeze.','Added rarity-aware sound direction.','Added Owner testing items and Item Bar usage.','Added Population, Area and Languages.','Added Extreme and Nightmare.','Added Country Database search.']},
 {title:'🚀 Version 3.0',items:['Added Survival, Time Attack, Sudden Death and Endless.','Expanded Asia + Europe + Africa coverage.','Added more achievements and boss item effects.','Expanded chest rewards and Transcendent rarity.','Reworked UI and removed the level cap.']},
 {title:'🚀 Version 2.5',items:['Added Skins with gameplay bonuses.','Added Boss Mode and Boss-exclusive items.','Restored unique Currency and Region Hard questions.','Added Profile view and Mega Hint.','Added Chest rarity progression.']},
 {title:'🚀 Version 2.0',items:['Added multiple game modes.','Added Achievement System.','Added Daily Challenge.','Added Chest System and rarity progression.','Expanded Rank System.']}
];
