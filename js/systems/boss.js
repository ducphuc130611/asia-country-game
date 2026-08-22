import { RARITIES } from '../data/content.js';
export function fightBoss({makeQuestion,showGame,toast,sound,finishBoss}){
 const defs=[['Goblin Scout','Common',120,6],['Iron Beast','Rare',250,8],['Void Tyrant','Epic',500,10],['Ancient King','Legend',900,12],['Mythic Dragon','Mythic',1500,16],['Divine Seraph','Divine',2500,20]];
 const b=defs[Math.floor(Math.random()*defs.length)];
 const g={mode:'boss',difficulty:'nightmare',index:0,score:0,xp:0,coins:0,lives:3,combo:0,owner:{god:false,infiniteTime:false,infiniteCombo:false,blessing:false},boss:{name:b[0],rarity:b[1],maxHP:b[2],hp:b[2]},questions:Array.from({length:b[3]},()=>makeQuestion('nightmare')),bossDamageMult:1,skin:{time:0},used:{}};
 g.answer=a=>{const q=g.questions[g.index];if(g.used.skip){g.used.skip=false;a=q.answer;}if(a===q.answer){let dmg=Math.round((30+g.combo*5)*g.bossDamageMult);g.boss.hp=Math.max(0,g.boss.hp-dmg);g.combo++;g.xp+=35;g.coins+=20;sound('damage');toast(`⚔️ ${dmg} damage!`);if(g.boss.hp<=0){const idx=RARITIES.indexOf(g.boss.rarity);g.rewardChest=RARITIES[Math.min(idx,6)];g.specialItem=g.boss.rarity==='Divine'?'Divine Core':g.boss.rarity==='Mythic'?'Mythic Fang':'Boss Token';if(g.owner.blessing){g.xp*=10;g.coins*=10;}finishBoss(g);return;}}else{if(!g.owner.infiniteCombo)g.combo=0;if(!g.owner.god){g.lives--;sound('wrong');if(g.lives<=0){toast('💀 Boss battle lost.');return finishBoss({...g,defeat:true,rewardChest:'Common',specialItem:'Boss Token',xp:0,coins:0});}}}g.index++;if(g.index>=g.questions.length)g.questions.push(makeQuestion('nightmare'));showGame(g);};
 showGame(g);sound('boss');
}
